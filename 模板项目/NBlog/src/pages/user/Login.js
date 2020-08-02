/**
 * Created by plter on 2016/12/22.
 */

const Layout = require("../Layout");

class Login extends Layout {


    constructor(req, res, data) {
        super(req, res, data);
    }


    getContent() {
        return `<div class="container">
<form class="form-login">
    <div class="input-group">
        <span class="input-group-addon">用户名：</span>
        <input name="user" type="text" class="form-control" placeholder="登陆名">
    </div>
    <div class="input-group">
        <span class="input-group-addon">密码：</span>
        <input name="pass" type="password" class="form-control" placeholder="密码">
    </div>
    <div class="input-group">
        <input class="btn btn-primary" type="submit" value="登陆">
        <span style="margin-left: 10px;"><a href="/user/register">还没有帐号？点此注册</a></span>
    </div>
</form>
</div>
<script src="/js/user/login-min.js"></script>`;
    }
}

module.exports = Login;