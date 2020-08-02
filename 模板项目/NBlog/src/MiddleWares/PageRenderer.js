/**
 * Created by plter on 2016/12/21.
 */

module.exports = function (req, res, next) {

    res.sendPage = function (page) {
        res.send(page.toHtml());
    };

    next();
};