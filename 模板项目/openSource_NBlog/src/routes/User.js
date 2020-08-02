/**
 * Created by plter on 2016/12/21.
 */

const express = require("express");
const Register = require("../pages/user/Register");
const Login = require("../pages/user/Login");
const Profile = require("../pages/user/Profile");
const ErrorPage = require("../pages/ErrorPage");

class User {
    constructor() {
        this._router = express.Router();

        this.configRegisterPage();
        this.configLoginPage();
        this.configProfilePage();
    }

    get router() {
        return this._router;
    }

    configRegisterPage() {
        this.router.get("/register", (req, res) => {
            res.sendPage(new Register(req, res, {title: "注册"}));
        });
    }

    configLoginPage() {
        this.router.get("/login", (req, res) => {
            res.sendPage(new Login(req, res, {title: "登陆"}))
        });
    }

    configProfilePage() {
        this.router.get("/profile", async function (req, res) {
            if (req.session.currentUserId) {
                try {
                    let user = await req.models.User.qGet(req.session.currentUserId);
                    user.email = user.email || "";
                    res.sendPage(new Profile(req, res, {title: "用户信息", user: user}));
                } catch (err) {
                    res.sendPage(new ErrorPage(req, res, {title: "无法获取登陆的用户信息", reason: "无法获取用户信息"}));
                }
            } else {
                res.sendPage(new ErrorPage(req, res, {title: "无法访问该页面", reason: "您还没有登陆"}));
            }
        });
    }
}

module.exports = User;