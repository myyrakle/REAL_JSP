const root = require("app-root-path");
const fs = require("fs");
const path = require("path");

const PAGE_PATH = path.join(root.path, "page");
const PUBLIC_PATH = path.join(root.path, "public");

function init() {
    try {
        if (fs.statSync(PAGE_PATH).isDirectory() == false) throw null;
    } catch {
        fs.mkdirSync(PAGE_PATH);
    }

    try {
        if (fs.statSync(PUBLIC_PATH).isDirectory() == false) throw null;
    } catch {
        fs.mkdirSync(PUBLIC_PATH);
    }
}

module.exports = { PAGE_PATH, PUBLIC_PATH, ROOT_PATH: root.path, init };
