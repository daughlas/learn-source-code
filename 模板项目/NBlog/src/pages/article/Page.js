/**
 * Created by plter on 2016/12/24.
 */

const Layout = require("../Layout");

class Page extends Layout {


    constructor(req, res, data) {
        super(req, res, data);
    }


    getContent() {
        return `<script src="/js/article/comment.component.js"></script>
<script>
    window.nblog = window.nblog||{};
    (function() {
      nblog.pageInfo = {
          currentArticleId:${this.data.article.id}
      };
    })();
</script>
<div class="container">
<div class="article article-in-page panel panel-default">
    <h1>${this.data.article.title}</h1>
    <div class="info">作者：${this.data.article.author_name}，发表时间：${this.data.article.getCreationTimeString()}</div>
    <div class="content">${this.data.article.content}</div>
</div>
<comment></comment>
</div>`;
    }
}

module.exports = Page;