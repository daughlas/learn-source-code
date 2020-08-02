/**
 * Created by plter on 2016/12/22.
 */

const Status = {
    STATE_CODE_OK: 1,
    STATE_MESSAGE_OK: "Ok",
    STATE_CODE_NO_USER_INPUT: 10001,//用户相关的状态码为1开头
    STATE_MESSAGE_NO_USER_INPUT: "No user input",
    STATE_CODE_NO_PASSWORD_INPUT: 10002,
    STATE_MESSAGE_NO_PASSWORD_INPUT: "No password input",
    STATE_CODE_NO_USER_ID_INPUT: 10003,
    STATE_MESSAGE_NO_USER_ID_INPUT: "No user id input",
    STATE_CODE_NO_EMAIL_INPUT: 10004,
    STATE_MESSAGE_NO_EMAIL_INPUT: "No email input",
    STATE_CODE_NO_SUCH_USER: 10005,
    STATE_MESSAGE_NO_SUCH_USER: "No such user",
    STATE_CODE_PASSWORD_ERROR: 10006,
    STATE_MESSAGE_PASSWORD_ERROR: "Password error",
    STATE_CODE_VERIFY_CODE_ERROR: 10007,
    STATE_MESSAGE_VERIFY_CODE_ERROR: "Verify code error",
    STATE_CODE_INVALID_USER: 20001,//权限相关状态码为2开头
    STATE_MESSAGE_INVALID_USER: "Invalid user",//通常引发该错误的原因是当前登陆的用户不是你要更新的用户，也就是说某用户登陆成功后在尝试修改其它用户的信息
    STATE_CODE_NO_USER_LOGGED: 20002,
    STATE_MESSAGE_NO_USER_LOGGED: "No user logged,require user log in",
    STATE_CODE_NO_ARTICLE_TITLE_INPUT: 30001,//文章相关状态码为3开头
    STATE_MESSAGE_NO_ARTICLE_TITLE_INPUT: "No article title input",
    STATE_CODE_NO_ARTICLE_CONTENT_INPUT: 30002,
    STATE_MESSAGE_NO_ARTICLE_CONTENT_INPUT: "No article content input",
    STATE_CODE_NO_PERMISSION_TO_EDIT_ARTICLE: 30003,
    STATE_MESSAGE_NO_PERMISSION_TO_EDIT_ARTICLE: "No permission to edit article",
    STATE_CODE_NO_ARTICLE_ID_INPUT: 30004,
    STATE_MESSAGE_NO_ARTICLE_ID_INPUT: "No article id input",
    STATE_CODE_NO_COMMENT_CONTENT_INPUT: 30005,
    STATE_MESSAGE_NO_COMMENT_CONTENT_INPUT: "No comment content input",
    STATE_CODE_NO_MEDIA_TYPE_INPUT: 40001,
    STATE_MESSAGE_NO_MEDIA_TYPE_INPUT: "No media type input",

    makeResult: function (code, message, result) {
        return {code: code, message: message, result: result};
    },
    makeOkResult: function (result) {
        return Status.makeResult(Status.STATE_CODE_OK, Status.STATE_MESSAGE_OK, result);
    },
    makeResultFromOrmError: function (ormError) {
        return Status.makeResult(ormError.errno, ormError.code);
    }
};


module.exports = Status;