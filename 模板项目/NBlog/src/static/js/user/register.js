/**
 * Created by plter on 2016/12/22.
 */
(function () {

    var verifyCodeImageContainer = $(".verify-code-image-container");

    function formRegisterSubmitHandler(e) {

        e.preventDefault();

        var user = this['user'].value;
        var pass = this['pass'].value;
        var passConfirm = this['pass-confirm'].value;

        if (pass != passConfirm) {
            nblog.showAlert("确认密码不一致", nblog.AlertLevel.WARNING, 5000);
            return;
        }

        nblog.showAlert("正在连接服务器...", nblog.AlertLevel.INFO, 3000);
        $.post(nblog.ServerApiUrls.USER_REGISTER, {
            user: user,
            pass: md5(pass),
            verify_code: this['verify-code'].value
        }).done(function (data) {
            console.log(data);

            switch (data.code) {
                case 1:
                    nblog.showAlert("注册成功", nblog.AlertLevel.SUCCESS, 3000);
                    location.href = "/user/profile";
                    break;
                case 10007:
                    nblog.showAlert("验证码错误", nblog.AlertLevel.WARNING, 3000);
                    break;
                case 1062:
                    nblog.showAlert("重复的用户名", nblog.AlertLevel.DANGER);
                    break;
                default:
                    nblog.showAlert("未知错误", nblog.AlertLevel.DANGER, 2000);
                    break;
            }
        }).fail(function (err) {
            nblog.showAlert("无法连接服务器", nblog.AlertLevel.DANGER);
        });
    }

    function loadVerifyCode() {
        verifyCodeImageContainer.load(nblog.ServerApiUrls.VERIFY_CODE);
    }

    function addListeners() {
        $(".form-register").submit(formRegisterSubmitHandler);
        verifyCodeImageContainer.click(function () {
            loadVerifyCode();
        });
    }

    function init() {
        addListeners();
        loadVerifyCode();
    }

    init();


})();