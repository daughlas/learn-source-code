/**
 * Created by plter on 2016/12/26.
 */

const express = require("express");
const verifyCode = require("verify-code");

class VerifyCode {

    constructor() {
        this._router = express.Router();

        this._router.get("/", function (req, res) {
            var vc = verifyCode.Generate();
            req.session.currentVerifyCode = vc.code;
            res.send(`<img height="20" src="${vc.dataURL}">`);
        });
    }

    get router() {
        return this._router;
    }
}

module.exports = VerifyCode;