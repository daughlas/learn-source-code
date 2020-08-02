/**
 * Created by plter on 2016/12/24.
 */

const express = require("express");
const orm = require("orm");
const SearchResult = require("../pages/SearchResult");
const ArticleTool = require("../tools/ArticleTool");

class Search {


    constructor() {
        this._router = express.Router();

        this.configArticleSearch();
    }


    get router() {
        return this._router;
    }

    configArticleSearch() {
        this.router.get("/article", async function (req, res) {
            if (req.query.word) {
                let articles = await req.models.Article.qFind(
                    {title: orm.like(`%${req.query.word}%`)},
                    ["creation_time", "Z"]
                );
                await ArticleTool.appendAuthorNameToArticles(req, res, articles);
                res.sendPage(new SearchResult(req, res, {
                    "title": `${req.query.word} 的搜索结果`,
                    articles: articles
                }));
            } else {
                res.redirect("/");
            }
        });
    }
}

module.exports = Search;