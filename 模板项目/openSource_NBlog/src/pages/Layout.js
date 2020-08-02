/**
 * Created by plter on 2016/12/21.
 */

const Page = require("./Page");

class Layout extends Page {

    constructor(req, res, data) {
        super(req, res);

        this._data = data;
    }

    get data() {
        return this._data;
    }

    getTopRightMenuItem() {
        if (this.req.session.currentUserId) {
            return `<li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">管理<span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="/user/profile">我的信息</a></li>
            <li><a href="/article/add">发表文章</a></li>
          </ul>
        </li>`;
        } else {
            return `<li><a href="/user/login">登陆</a></li>
<li><a href="/user/register">注册</a></li>`;
        }
    }

    getHeader() {
        return `<nav class="navbar navbar-default">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="/">NBlog</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <!--<li><a href="#">Link</a></li>-->
      </ul>
      <form method="get" action="/search/article" class="navbar-form navbar-left">
        <div class="form-group">
          <input name="word" type="text" class="form-control" placeholder="关键字">
        </div>
        <button type="submit" class="btn btn-default">搜索</button>
      </form>
      <ul class="nav navbar-nav navbar-right">
        ${this.getTopRightMenuItem()}
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>`;
    }

    getContent() {
        return "";
    }

    toHtml() {
        return `<html ng-app="app">
<head>
<meta charset="UTF-8">
             <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
                         <meta http-equiv="X-UA-Compatible" content="ie=edge">
             <title>${this.data.title}</title>
    <link href="/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">        
    <link href="/bower_components/bootstrap/dist/css/bootstrap-theme.min.css" rel="stylesheet">        
             
    <script src="/bower_components/jquery/dist/jquery.min.js"></script>
    <script src="/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    
    <link href="/style.css" rel="stylesheet">
    
    <script src="/jslib/md5.min.js"></script>
    <script src="/js/common-min.js"></script>
    
    <script src="/bower_components/angular/angular.min.js"></script>
    <script src="/js/angular.app.module.js"></script>
</head>
<body>
${this.getHeader()}
<div class="alert-container container"></div>
${this.getContent()}
</body>
</html>`;
    }
}

module.exports = Layout;