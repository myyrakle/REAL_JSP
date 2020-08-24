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
        await download(
            "https://raw.githubusercontent.com/myyrakle/REAL_JSP/master/page/index.ejs",
            path.join(PAGE_PATH, "index.ejs")
        );
    }

    try {
        if (fs.statSync(PUBLIC_PATH).isDirectory() == false) throw null;
    } catch {
        fs.mkdirSync(PUBLIC_PATH);
        await download(
            "https://raw.githubusercontent.com/myyrakle/REAL_JSP/master/public/bonobono.jpg",
            path.join(PUBLIC_PATH, "bonobono.jpg")
        );
    }
}

module.exports = { PAGE_PATH, PUBLIC_PATH, ROOT_PATH: root.path, init };
