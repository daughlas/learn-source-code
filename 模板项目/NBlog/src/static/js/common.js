/**
 * Created by plter on 2016/12/22.
 */

window.nblog = window.nblog || {};

(function () {

    /**
     *
     * @param message
     * @param level
     * @param delay 为该提示框自动消失的时间，单位是毫秒，如果传值为0则该对话框永不消失
     */
    nblog.showAlert = function (message, level, delay) {

        var alertContainer = $(".alert-container");

        level = level || nblog.AlertLevel.WARNING;
        delay = delay || 0;

        var alertDiv = $(document.createElement("div"));
        alertDiv.addClass("alert");
        alertDiv.attr("role", "alert");

        switch (level) {
            case nblog.AlertLevel.SUCCESS:
                alertDiv.addClass("alert-success");
                break;
            case nblog.AlertLevel.INFO:
                alertDiv.addClass("alert-info");
                break;
            case nblog.AlertLevel.WARNING:
                alertDiv.addClass("alert-warning");
                break;
            case nblog.AlertLevel.DANGER:
                alertDiv.addClass("alert-danger");
                break;
        }

        alertDiv.append("<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>");
        alertDiv.append("<span>" + message + "</span>");
        alertContainer.append(alertDiv);

        if (delay > 0) {
            setTimeout(function () {
                alertDiv.remove();
            }, delay);
        }
    };

    nblog.AlertLevel = {
        SUCCESS: 1,
        INFO: 2,
        WARNING: 3,
        DANGER: 4
    };

    nblog.ServerApiUrls = {
        USER_REGISTER: "/api/user/register",
        USER_UPDATE: "/api/user/update",
        USER_LOGIN: "/api/user/login",
        ARTICLE_ADD: "/api/article/add",
        COMMENT_GET: "/api/comment/get",
        COMMENT_ADD: "/api/comment/add",
        MEDIA_UPLOAD: "/api/media/upload",
        MEDIA_GET: "/api/media/get",
        VERIFY_CODE: "/verifycode"
    };

})();