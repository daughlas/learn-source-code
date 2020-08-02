/**
 * Created by plter on 2016/12/24.
 */

const Layout = require("./Layout");

class ArticlesList extends Layout {

    constructor(req, res, data) {
        super(req, res, data);
    }

    getArticlesHtml() {
        let html = ``;
        for (let article of this.data.articles) {
            html += `<div class="article panel panel-default">
<div class="title panel-heading"><a href="/article/page/${article.id}">${article.title}</a></div>
<div class="info">作者：${article.author_name}，发表时间：${article.getCreationTimeString()}</div>
<div class="content panel-body">${article.content}</div>
</div>`;
        }
        return html;
    }


    getContent() {
        return `<div class="container">${this.getArticlesHtml()}</div>`;
    }

}

module.exports = ArticlesList;