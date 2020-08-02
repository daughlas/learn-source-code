/**
 * Created by plter on 2016/12/24.
 */

const precheck = require("./precheck");
const Status = require("./Status");
const CommentTool = require("../../tools/CommentTool");

class Comment {

    constructor(router) {
        this._router = router;

        this.configGetCommentsApi();
        this.configAddCommentApi();
    }

    get router() {
        return this._router;
    }

    configGetCommentsApi() {
        this.router.post("/comment/get",
            precheck.checkArticleIdInput,
            async function (req, res) {
                try {
                    let comments = await req.models.Comment.qFind({
                        article_id: req.body.article_id
                    }, ["creation_time", "Z"]);

                    await CommentTool.appendInfoToComments(req, res, comments);

                    res.json(Status.makeOkResult(comments));
                } catch (err) {
                    res.json(Status.makeResultFromOrmError(err));
                }
            }
        );
    }

    configAddCommentApi() {
        this.router.post("/comment/add",
            precheck.checkArticleIdInput,
            precheck.checkCommentContentInput,
            precheck.checkIfUserLogged,
            async function (req, res) {
                try {
                    let comment = await req.models.Comment.qCreate({
                        article_id: req.body.article_id,
                        user_id: req.session.currentUserId,
                        content: req.body.comment_content,
                        creation_time: new Date()
                    });

                    res.json(Status.makeOkResult(comment));
                } catch (err) {
                    res.json(Status.makeResultFromOrmError(err));
                }
            }
        );
    }
}

module.exports = Comment;