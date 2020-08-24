const root = require("app-root-path");
const fs = require("fs");
const path = require("path");

const download = require("./lib/image-download");

const PAGE_PATH = path.join(root.path, "page");
const PUBLIC_PATH = path.join(root.path, "public");

async function init() {
    try {
        if (fs.statSync(PAGE_PATH).isDirectory() == false) throw null;
    } catch {
        fs.mkdirSync(PAGE_PATH);
        fs.writeFileSync(
            path.join(PAGE_PATH, "index.ejs"),
            `<html>
        <head>
            test
        </head>
        <body>
            <h1><%=message%></h1>
        </body>
</html>`
        );
    }

    try {
        if (fs.statSync(PUBLIC_PATH).isDirectory() == false) throw null;
    } catch {
        fs.mkdirSync(PUBLIC_PATH);
        fs.writeFileSync(
            path.join(PUBLIC_PATH, "bonobono.jpg"),
            await download(
                "https://raw.githubusercontent.com/myyrakle/REAL_JSP/master/public/bonobono.jpg"
            )
        );
    }
}

module.exports = { PAGE_PATH, PUBLIC_PATH, ROOT_PATH: root.path, init };
