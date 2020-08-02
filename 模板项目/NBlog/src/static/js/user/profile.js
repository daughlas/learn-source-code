/**
 * Created by plter on 2016/12/22.
 */

(function () {

    $(".form-profile").submit(function (event) {
        event.preventDefault();

        $.post(nblog.ServerApiUrls.USER_UPDATE, {
            id: this['id'].value,
            user: this['user'].value,
            email: this['email'].value
        }).done(function (data) {
            console.log(data);

            switch (data.code) {
                case 1:
                    nblog.showAlert("保存成功", nblog.AlertLevel.SUCCESS, 3000);
                    break;
                case 1062:
                    nblog.showAlert("用户名或者邮箱被占用", nblog.AlertLevel.DANGER);
                    break;
                default:
                    nblog.showAlert("未知错误", nblog.AlertLevel.DANGER, 2000);
                    break;
            }
        }).fail(function (err) {
            nblog.showAlert("无法连接服务器", nblog.AlertLevel.DANGER);
        });
    });

})();