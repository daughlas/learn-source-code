/**
 * Created by plter on 2016/12/22.
 */

const Status = require("./Status");

module.exports = {
    checkUserInput: function (req, res, next) {
        if (req.body.user) {
            next();
        } else {
            res.json(Status.makeResult(Status.STATE_CODE_NO_USER_INPUT, Status.STATE_MESSAGE_NO_USER_INPUT));
        }
    },
    checkPasswordInput: function (req, res, next) {
        if (req.body.pass) {
            next();
        } else {
            res.json(Status.makeResult(Status.STATE_CODE_NO_PASSWORD_INPUT, Status.STATE_MESSAGE_NO_PASSWORD_INPUT));
        }
    },
    checkUserIdInput: function (req, res, next) {
        if (req.body.id) {
            next();
        } else {
            res.json(Status.makeResult(Status.STATE_CODE_NO_USER_ID_INPUT, Status.STATE_MESSAGE_NO_USER_ID_INPUT));
        }
    },
    checkEmailInput: function (req, res, next) {
        if (req.body.email) {
            next();
        } else {
            res.json(Status.makeResult(Status.STATE_CODE_NO_EMAIL_INPUT, Status.STATE_MESSAGE_NO_EMAIL_INPUT));
        }
    },
    checkCurrentUserById: function (req, res, next) {
        if (req.body.id == req.session.currentUserId) {
            next();
        } else {
            res.json(Status.makeResult(Status.STATE_CODE_INVALID_USER, Status.STATE_MESSAGE_INVALID_USER));
        }
    },
    checkArticleTitleInput: function (req, res, next) {
        if (req.body.title) {
            next();
        } else {
            res.json(Status.makeResult(Status.STATE_CODE_NO_ARTICLE_TITLE_INPUT, Status.STATE_MESSAGE_NO_ARTICLE_TITLE_INPUT));
        }
    },
    checkArticleIdInput: function (req, res, next) {
        if (req.body.article_id) {
            next();
        } else {
            res.json(Status.makeResult(Status.STATE_CODE_NO_ARTICLE_ID_INPUT, Status.STATE_MESSAGE_NO_ARTICLE_ID_INPUT));
        }
    },
    checkArticleContentInput: function (req, res, next) {
        if (req.body.content) {
            next();
        } else {
            res.json(Status.makeResult(Status.STATE_CODE_NO_ARTICLE_CONTENT_INPUT, Status.STATE_MESSAGE_NO_ARTICLE_CONTENT_INPUT));
        }
    },
    checkCommentContentInput: function (req, res, next) {
        if (req.body.comment_content) {
            next();
        } else {
            res.json(Status.makeResult(Status.STATE_CODE_NO_COMMENT_CONTENT_INPUT, Status.STATE_MESSAGE_NO_COMMENT_CONTENT_INPUT));
        }
    },
    checkIfUserLogged: function (req, res, next) {
        if (req.session.currentUserId) {
            next();
        } else {
            res.json(Status.makeResult(Status.STATE_CODE_NO_USER_LOGGED, Status.STATE_MESSAGE_NO_USER_LOGGED));
        }
    },
    checkIfUserHasEditorPermission: async function (req, res, next) {
        try {
            let editorGroupResult = await req.models.Group.qFind({name: "editor"});
            if (editorGroupResult && editorGroupResult.length) {
                let editorGroup = editorGroupResult[0];

                let membershipResult = await req.models.Membership.qFind({
                    user_id: req.session.currentUserId,
                    group_id: editorGroup.id
                });

                if (membershipResult && membershipResult.length) {
                    next();
                } else {
                    res.json(Status.makeResult(Status.STATE_CODE_NO_PERMISSION_TO_EDIT_ARTICLE, Status.STATE_MESSAGE_NO_PERMISSION_TO_EDIT_ARTICLE));
                }
            } else {
                res.json(Status.makeResult(Status.STATE_CODE_NO_PERMISSION_TO_EDIT_ARTICLE, Status.STATE_MESSAGE_NO_PERMISSION_TO_EDIT_ARTICLE));
            }
        } catch (err) {
            res.json(Status.makeResultFromOrmError(err));
        }
    },
    checkMediaTypeInput: function (req, res, next) {
        if (req.body.media_type) {
            next();
        } else {
            res.json(Status.makeResult(Status.STATE_CODE_NO_MEDIA_TYPE_INPUT, Status.STATE_MESSAGE_NO_MEDIA_TYPE_INPUT));
        }
    },
    checkVerifyCode: function (req, res, next) {
        if (req.body.verify_code && req.body.verify_code == req.session.currentVerifyCode) {
            next();
        } else {
            res.json(Status.makeResult(Status.STATE_CODE_VERIFY_CODE_ERROR, Status.STATE_MESSAGE_VERIFY_CODE_ERROR));
        }
    }
};