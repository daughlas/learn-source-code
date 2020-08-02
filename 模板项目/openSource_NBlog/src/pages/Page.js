/**
 * Created by plter on 2016/12/21.
 */

class Page {

    constructor(req, res) {
        this._req = req;
        this._res = res;
    }

    toHtml() {
        return `<html><body>Empty</body></html>`
    }


    get req() {
        return this._req;
    }

    get res() {
        return this._res;
    }
}

module.exports = Page;