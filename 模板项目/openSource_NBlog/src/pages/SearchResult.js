/**
 * Created by plter on 2016/12/24.
 */

const ArticlesList = require("./ArticlesList");

class SearchResult extends ArticlesList {


    constructor(req, res, data) {
        super(req, res, data);
    }
}

module.exports = SearchResult;