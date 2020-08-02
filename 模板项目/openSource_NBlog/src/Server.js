/**
 * Created by plter on 2016/12/21.
 */

const express = require("express");
const http = require("http");
const RouteConfig = require("./routes/RouteConfig");
const OrmConfig = require("./db/OrmConfig");
const PageRenderer = require("./MiddleWares/PageRenderer");
const bodyParser = require("body-parser");
const session = require("express-session");
const ConnectRedis = require("connect-redis");

class Server {


    constructor(port) {
        this._serverDirectoryPath = __dirname;
        this._port = port;
        this._app = express();
        this._nodeHttpServer = http.createServer(this._app);
        this._nodeHttpServer.listen(port, () => {
            console.log("Server started");
        });

        this.configSession();
        this.configOrm();
        this.configBodyParser();
        this.configPageRender();
        this.configRoute();
    }

    get port() {
        return this._port;
    }

    get app() {
        return this._app;
    }

    get nodeHttpServer() {
        return this._nodeHttpServer;
    }

    configRoute() {
        this._routeConfig = new RouteConfig(this);
    }

    configOrm() {
        this._ormConfig = new OrmConfig(this);
    }

    configPageRender() {
        this.app.use(PageRenderer);
    }

    configBodyParser() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
    }

    configSession() {
        const RedisStore = ConnectRedis(session);

        this.app.use(session({
            secret: "session",
            resave: false,
            saveUninitialized: false,
            store: new RedisStore()
        }));
    }

    get serverDirectoryPath() {
        return this._serverDirectoryPath;
    }
}

new Server(8000);