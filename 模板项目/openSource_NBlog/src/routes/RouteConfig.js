/**
 * Created by plter on 2016/12/21.
 */


const express = require("express");
const Root = require("./Root");
const User = require("./User");
const Api = require("./api/Api");
const Article = require("./Article");
const Search = require("./Search");
const VerifyCode = require("./VerifyCode");

class RouteConfig {

    constructor(server) {
        this._nodeHttpServer = server;

        this.configRoot();
        this.configUser();
        this.configStatic();
        this.configApi();
        this.configArticle();
        this.configSearch();

        //config verify code
        this.server.app.use("/verifycode", new VerifyCode().router);
    }

    configStatic() {
        this.server.app.use(express.static("static"));
    }

    configRoot() {
        this._root = new Root();
        this.server.app.use("/", this._root.router);
    }

    configUser() {
        this._user = new User();
        this.server.app.use("/user", this._user.router);
    }

    configApi() {
        this.server.app.use("/api", new Api().router);
    }

    configArticle() {
        this.server.app.use("/article", new Article().router);
    }

    configSearch() {
        this.server.app.use("/search", new Search().router);
    }

    get server() {
        return this._nodeHttpServer;
    }
}

module.exports = RouteConfig;