/**
 * Created by plter on 2016/12/21.
 */

const express = require("express");
const RootPage = require("../pages/Root");
const ArticleTool = require("../tools/ArticleTool");

class Root {

    constructor(router) {

        this._router = express.Router();
        this.configRootPage();
    }

    configRootPage() {
        this.router.get("/", async function (req, res) {
            let articles = await req.models.Article.qFind({}, ["creation_time", "Z"]);
            await ArticleTool.appendAuthorNameToArticles(req, res, articles);
            res.sendPage(new RootPage(req, res, {title: "NBlog", articles: articles}));
        });
    }


    get router() {
        return this._router;
    }
}

module.exports = Root;