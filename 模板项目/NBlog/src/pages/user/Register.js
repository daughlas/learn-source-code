/**
 * Created by plter on 2016/12/21.
 */

const Layout = require("../Layout");
const verifyCode = require("verify-code");

class Register extends Layout {


    constructor(req, res, data) {
        super(req, res, data);
    }

    getContent() {
        return `<div class="container">
<form class="form-register">
    <div class="input-group">
        <span class="input-group-addon">用户名：</span>
        <input name="user" required="required" type="text" class="form-control" placeholder="登陆名">
    </div>
    <div class="input-group">
        <span class="input-group-addon">密码：</span>
        <input name="pass" required="required" type="password" class="form-control" placeholder="密码">
    </div>
    <div class="input-group">
        <span class="input-group-addon">密码确认：</span>
        <input name="pass-confirm" required="required" type="password" class="form-control" placeholder="确认">
    </div>
    <div class="input-group">
        <span class="input-group-addon">验证码：</span>
        <input name="verify-code" required="required" type="text" class="form-control" placeholder="验证码">
        <span class="input-group-addon verify-code-image-container"></span>
    </div>
    <div class="input-group">
        <input class="btn btn-primary" type="submit" value="注册">
        <span style="margin-left: 10px;"><a href="/user/login">已有帐号，点此登陆</a></span>
    </div>
</form>
</div>
<script src="/js/user/register.js"></script>
`
    }
}

module.exports = Register;