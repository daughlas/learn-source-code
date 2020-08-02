/**
 * Created by plter on 2016/12/22.
 */

const Layout = require("./Layout");

class ErrorPage extends Layout {


    constructor(req, res, data) {
        super(req, res, data);
    }


    getContent() {
        return `<div class="container">
<h1>${this.data.title}</h1>
<div>${this.data.reason}</div>
</div>`;
    }
}

module.exports = ErrorPage;