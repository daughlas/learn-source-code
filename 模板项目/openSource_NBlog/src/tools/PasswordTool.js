/**
 * Created by plter on 2016/12/22.
 */

const md5 = require("md5-js");

module.exports = {
    translatePassword: function (user, fontPassword) {
        return md5(md5(user) + md5(fontPassword))
    }
};