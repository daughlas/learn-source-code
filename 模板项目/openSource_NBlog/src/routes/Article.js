/**
 * Created by plter on 2016/12/23.
 */

const express = require("express");
const Add = require("../pages/article/Add");
const ArticleTool = require("../tools/ArticleTool");
const Page = require("../pages/article/Page");

class Article {

    constructor() {
        this._router = express.Router();
        this.configAddPage();
        this.configArticlePage();
    }

    configAddPage() {
        this.router.get("/add", (req, res) => {
            res.sendPage(new Add(req, res, {title: "发表文章"}));
        });
    }

    configArticlePage() {
        this.router.get("/page/:id", async function (req, res) {
            if (req.params.id) {
                let article = await req.models.Article.qGet(req.params.id);
                await ArticleTool.appendAuthorNameToArticle(req, res, article);
                res.sendPage(new Page(req, res, {
                    title: article.title,
                    article: article
                }));
            } else {
                res.redirect("/");
            }
        });
    }

    get router() {
        return this._router;
    }
}

module.exports = Article;