const express = require("express");
const fs = require("fs");
const util = require("util");

const path = require("path");

const statAsync = util.promisify(fs.stat);
const readdirAsync = util.promisify(fs.readdir);

const { PAGE_PATH, PUBLIC_PATH, ROOT_PATH, init } = require("./init");

const app = express();

app.PAGE_PATH = PAGE_PATH;
app.PUBLIC_PATH = PUBLIC_PATH;
app.ROOT_PATH = ROOT_PATH;
app.init = init;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(PUBLIC_PATH));

app.set("views", PAGE_PATH);
app.set("view engine", "ejs");

async function getFiles(dir) {
    const subdirs = await readdirAsync(dir);
    const files = await Promise.all(
        subdirs.map(async (subdir) => {
            const res = path.resolve(dir, subdir);
            return (await statAsync(res)).isDirectory() ? getFiles(res) : res;
        })
    );

    return files.reduce((a, f) => a.concat(f), []);
}

app.use((req, res, next) => {
    req._headerRequest = {
        parameter: req.query,
        queryParameter: req.query,
        namedRouteParameter: req.params,
        method: req.method,
        baseUrl: req.baseUrl,
        originalUrl: req.originalUrl,
        path: req.path,
        isHttps: req.secure,
        subdomain: req.subdomain,
        hostname: req.hostname,
        ip: req.ip,
    };

    req._bodyRequest = {
        parameter: req.body,
        queryParameter: req.query,
        namedRouteParameter: req.params,
        method: req.method,
        baseUrl: req.baseUrl,
        originalUrl: req.originalUrl,
        path: req.path,
        isHttps: req.secure,
        subdomain: req.subdomain,
        hostname: req.hostname,
        ip: req.ip,
    };

    next();
});

app.start = async () => {
    await app.init();
    (await getFiles(app.PAGE_PATH)).forEach((filename) => {
        const pathTextArray = String(
            path.relative(app.ROOT_PATH, filename).replace(/\\/g, `/`)
        ).split("");
        const word = pathTextArray.indexOf("/");
        for (let i = 0; i < word; i++) {
            pathTextArray.shift();
        }
        const PATH = pathTextArray.join("");

        app.get(PATH, (req, res) => {
            res.render(filename, {
                method: "get",
                request: req._headerRequest,
            });
        });
        app.post(PATH, (req, res) => {
            res.render(filename, { method: "post", request: req._bodyRequest });
        });
        app.delete(PATH, (req, res) => {
            res.render(filename, {
                method: "delete",
                request: req._headerRequest,
            });
        });
        app.put(PATH, (req, res) => {
            res.render(filename, { method: "put", request: req._bodyRequest });
        });

        if (PATH === "/index.ejs") {
            app.get("/", (req, res) => {
                res.render(filename, {
                    method: "get",
                    request: req._headerRequest,
                });
            });
            app.post("/", (req, res) => {
                res.render(filename, {
                    method: "post",
                    request: req._bodyRequest,
                });
            });
            app.delete("/", (req, res) => {
                res.render(filename, {
                    method: "delete",
                    request: req._headerRequest,
                });
            });
            app.put("/", (req, res) => {
                res.render(filename, {
                    method: "put",
                    request: req._bodyRequest,
                });
            });
        }
    });

    const port = app.port || 12345;

    app.listen(port, () => {
        console.log(`>>>> App started ${port}`);
    });
};

module.exports = app;
