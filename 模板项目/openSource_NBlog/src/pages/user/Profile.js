/**
 * Created by plter on 2016/12/22.
 */

const Layout = require("../Layout");

class Profile extends Layout {


    constructor(req, res, data) {
        super(req, res, data);
    }


    getContent() {
        return `<div class="container">
<form class="form-profile">
    <div class="input-group">
        <span class="input-group-addon">id：</span>
        <input disabled="disabled" required="required" name="id" type="text" value="${this.data.user.id}" class="form-control">
    </div>
    <div class="input-group">
        <span class="input-group-addon">用户名：</span>
        <input disabled="disabled" type="text" name="user" required="required" class="form-control" value="${this.data.user.user}" placeholder="用户名">
    </div>
    <div class="input-group">
        <span class="input-group-addon">邮箱：</span>
        <input type="email" required="required" name="email" value="${this.data.user.email}" class="form-control" placeholder="邮箱">
    </div>
    <div class="input-group">
        <input class="btn btn-primary" type="submit" value="保存">
    </div>
</form>
</div>
<script src="/js/user/profile-min.js"></script>`;
    }
}

module.exports = Profile;