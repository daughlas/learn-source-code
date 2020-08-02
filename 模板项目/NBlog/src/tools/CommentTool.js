/**
 * Created by plter on 2016/12/24.
 */

const TimeTool = require("./TimeTool");

const CommentTool = {
    appendInfoToComment: async function (req, res, comment) {
        comment.creation_time_string = TimeTool.getFormattedDateString(comment.creation_time);
        let user = await req.models.User.qGet(comment.user_id);
        if (user) {
            comment.user_name = user.user;
        }
    },
    appendInfoToComments: async function (req, res, comments) {
        for (let c of comments) {
            await CommentTool.appendInfoToComment(req, res, c);
        }
    }
};

module.exports = CommentTool;