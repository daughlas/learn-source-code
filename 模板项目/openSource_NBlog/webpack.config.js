const path = require("path");

module.exports = {
    entry: "./src/Server.js",
    output: {
        path: path.join(__dirname, "build"),
        filename: "server.bundle.js"
    },
    externals: {
        "http": "require('http')",
        "orm": "require('orm')",
        "q-orm": "require('q-orm')",
        "md5-js": "require('md5-js')",
        "body-parser": "require('body-parser')",
        "express-session": "require('express-session')",
        "mysql": "require('mysql')",
        "connect-redis": "require('connect-redis')",
        "multer": "require('multer')",
        "verify-code": "require('verify-code')",
        "express": "require('express')"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader"
            }
        ]
    }
};