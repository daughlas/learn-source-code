/**
 * Created by plter on 2016/12/23.
 */

const precheck = require("./precheck");
const Status = require("./Status");

class Article {

    constructor(router) {

        this._router = router;
        this.configAddArticleApi();
    }

    configAddArticleApi() {
        this.router.post("/article/add",
            precheck.checkArticleTitleInput,
            precheck.checkArticleContentInput,
            precheck.checkIfUserLogged,
            precheck.checkIfUserHasEditorPermission,
            async function (req, res) {

                try {
                    let article;

                    if (req.body.article_id) {
                        article = await req.models.Article.qGet(req.body.article_id);
                    }
                    if (!article) {
                        let articles = await req.models.Article.qFind({title: req.body.title});
                        if (articles && articles.length) {
                            article = articles[0];
                        }
                    }

                    if (!article) {
                        article = await req.models.Article.qCreate({
                            title: req.body.title,
                            content: req.body.content,
                            creation_time: new Date(),
                            author: req.session.currentUserId
                        });
                    } else {
                        article.title = req.body.title;
                        article.content = req.body.content;
                        await article.qSave();
                    }

                    res.json(Status.makeOkResult());
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

module.exports = Article;