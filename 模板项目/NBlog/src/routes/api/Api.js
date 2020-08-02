/**
 * Created by plter on 2016/12/22.
 */


const express = require("express");
const User = require("./User");
const Article = require("./Article");
const Comment = require("./Comment");
const Media = require("./Media");

class Api {

    constructor() {
        this._router = express.Router();

        this.configUserApi();
        this.configArticleApi();
        this.configCommentApi();
        this.configUploaderApi();
    }

    configUserApi() {
        new User(this.router);
    }

    configArticleApi() {
        new Article(this.router);
    }

    configCommentApi() {
        new Comment(this.router);
    }

    configUploaderApi() {
        new Media(this.router);
    }

    get router() {
        return this._router;
    }
}

module.exports = Api;