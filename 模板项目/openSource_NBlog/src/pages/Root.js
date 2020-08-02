/**
 * Created by plter on 2016/12/23.
 */

const ArticlesList = require("./ArticlesList");

class Root extends ArticlesList {


    constructor(req, res, data) {
        super(req, res, data);
    }
}

module.exports = Root;