/**
 * Created by plter on 2016/12/21.
 */

const orm = require("orm");
const qOrm = require("q-orm");
const TimeTool = require("../tools/TimeTool");

class OrmConfig {

    constructor(server) {

        this._server = server;

        this._server.app.use(qOrm.qExpress("mysql://root:@localhost/nblog", {
            define: (db, models, next) => {
                this.defineUserTable(db, models);
                this.defineArticleTable(db, models);
                this.defineGroupTable(db, models);
                this.defineMembershipTable(db, models);
                this.defineCommentTable(db, models);
                this.defineMediaTable(db, models);

                next();
            }
        }));
    }

    defineUserTable(db, models) {
        models.User = db.qDefine("user", {
            id: Number,
            user: String,
            pass: String,
            email: String
        });
    }

    defineArticleTable(db, models) {
        models.Article = db.qDefine("article", {
            id: Number,
            title: String,
            content: String,
            author: Number,
            creation_time: Date
        }, {
            methods: {
                getCreationTimeString: function () {
                    return TimeTool.getFormattedDateString(this.creation_time);
                }
            }
        });
    }

    defineGroupTable(db, models) {
        models.Group = db.qDefine("user_group", {
            id: Number,
            name: String
        });
    }

    defineMembershipTable(db, models) {
        models.Membership = db.qDefine("membership", {
            id: Number,
            group_id: Number,
            user_id: Number
        })
    }

    defineCommentTable(db, models) {
        models.Comment = db.qDefine("comment", {
            id: Number,
            user_id: Number,
            article_id: Number,
            content: String,
            creation_time: Date
        });
    }

    defineMediaTable(db, models) {
        models.Media = db.qDefine("media", {
            id: Number,
            user_id: Number,
            name: String,
            path: String,
            type: String,
            creation_time: Date
        });
    }

    get server() {
        return this._server;
    }
}

module.exports = OrmConfig;