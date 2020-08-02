/**
 * Created by plter on 2016/12/23.
 */

(function () {

    $(".form-login").submit(function (e) {
        e.preventDefault();

        $.post(nblog.ServerApiUrls.USER_LOGIN, {
            user: this['user'].value,
            pass: md5(this['pass'].value)
        }).done(function (data) {
            console.log(data);

            switch (data.code) {
                case 1:
                    nblog.showAlert("登陆成功", nblog.AlertLevel.SUCCESS, 3000);
                    location.href = "/user/profile";
                    break;
                case 10005:
                case 10006:
                    nblog.showAlert("用户名或者密码错误", nblog.AlertLevel.DANGER);
                    break;
                default:
                    nblog.showAlert("未知错误");
                    break;
            }
        }).fail(function (err) {
            nblog.showAlert("无法连接服务器", nblog.AlertLevel.DANGER);
        });
    });
})();