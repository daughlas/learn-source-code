/**
 * Created by plter on 2016/12/22.
 */

const precheck = require("./precheck");
const Status = require("./Status");
const PasswordTool = require("../../tools/PasswordTool");

class User {

    constructor(router) {
        this._router = router;

        this.configRegisterApi();
        this.configUpdateApi();
        this.configLoginApi();
    }

    configRegisterApi() {
        this.router.post("/user/register",
            precheck.checkVerifyCode,
            precheck.checkUserInput,
            precheck.checkPasswordInput,
            async function (req, res) {
                try {
                    let newUser = await req.models.User.qCreate({
                        user: req.body.user,
                        pass: PasswordTool.translatePassword(req.body.user, req.body.pass)
                    });

                    req.session.currentUserId = newUser.id;
                    res.json(Status.makeOkResult());
                } catch (err) {
                    res.json(Status.makeResultFromOrmError(err));
                }
            })
    }

    configUpdateApi() {
        this.router.post("/user/update",
            precheck.checkUserIdInput,
            precheck.checkUserInput,
            precheck.checkEmailInput,
            precheck.checkCurrentUserById,
            async function (req, res) {
                try {
                    let user = await req.models.User.qGet(req.body.id);
                    user.user = req.body.user;
                    user.email = req.body.email;

                    await user.qSave();
                    res.json(Status.makeOkResult());
                } catch (err) {
                    res.json(Status.makeResultFromOrmError(err));
                }
            }
        );
    }

    configLoginApi() {
        this.router.post("/user/login",
            precheck.checkUserInput,
            precheck.checkPasswordInput,
            async function (req, res) {
                try {
                    let users = await req.models.User.qFind({user: req.body.user});
                    if (users && users.length) {
                        let user = users[0];
                        if (user.pass == PasswordTool.translatePassword(req.body.user, req.body.pass)) {
                            req.session.currentUserId = user.id;
                            res.json(Status.makeOkResult());
                        } else {
                            res.json(Status.makeResult(Status.STATE_CODE_PASSWORD_ERROR, Status.STATE_MESSAGE_PASSWORD_ERROR));
                        }
                    } else {
                        res.json(Status.makeResult(Status.STATE_CODE_NO_SUCH_USER, Status.STATE_MESSAGE_NO_SUCH_USER));
                    }
                } catch (err) {
                    res.json(Status.makeResultFromOrmError(err));
                }
            }
        );
    }

    get router() {
        return this._router;
    }
}

module.exports = User;