/**
 * Created by plter on 2016/12/23.
 */

const Layout = require("../Layout");

class Add extends Layout {

    constructor(req, res, data) {
        super(req, res, data);
    }


    getContent() {
        return `<div class="container">
<form class="form-add-article">
    <div class="input-group">
        <span class="input-group-addon">标题：</span>
        <input name="title" required="required" type="text" class="form-control" placeholder="标题">
    </div>
    <div class="input-group">
        <span class="input-group-addon">内容：</span>
        <div class="editor">
            <div class="header">
                <a href="#" class="btn btn-default btn-add-ul">ul</a>
                <a href="#" class="btn btn-default btn-add-ol">ol</a>
                <a href="#" class="btn btn-default btn-add-image">img</a>
            </div>
            <div name="content" class="content" contenteditable="true"></div>
        </div>
    </div>
    
    <div class="input-group">
        <input type="submit" class="btn btn-primary" value="发表文章">
    </div>
</form>
</div>

<form id="upload-image-form">
    <input name="file" style="display: none" type="file" id="image-file-input">
</form>

<!-- Modal -->
<div class="modal fade" id="select-image-dialog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">选择一个图片</h4>
      </div>
      <div class="modal-body">
        <div class="image-preview"></div>
        <div class="image-list-container"></div>
      </div>
      <div class="modal-footer">
        <span>
            <label>
               <span>宽度：</span>
               <input type="number" style="width: 60px" class="image-width-input">
            </label>
            <label>
                <span>高度：</span>
                <input type="number" style="width: 60px" class="image-height-input">
            </label>
        </span>
        <button style="display: none" type="button" class="btn btn-primary btn-add-image-to-article">使用该图</button>
        <button type="button" class="btn btn-default btn-select-image">上传图片</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
      </div>
    </div>
  </div>
</div>

<script src="/js/article/editor.js"></script>`;
    }
}

module.exports = Add;