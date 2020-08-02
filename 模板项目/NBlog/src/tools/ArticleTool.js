/**
 * Created by plter on 2016/12/24.
 */

const ArticleTool = {
    appendAuthorNameToArticle: async function (req, res, article) {
        let user = await req.models.User.qGet(article.author);
        if (user) {
            article.author_name = user.user;
        }
    },
    appendAuthorNameToArticles: async function (req, res, articles) {
        for (let article of articles) {
            await ArticleTool.appendAuthorNameToArticle(req, res, article);
        }
    }
};

module.exports = ArticleTool;