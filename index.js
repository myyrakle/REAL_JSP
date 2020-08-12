const VIEW_DIRECTORY_NAME = "views";

const root = require("app-root-path");
const fs = require("fs");
const path = require("path");

const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./public"));

app.set("views", `./${VIEW_DIRECTORY_NAME}`);
app.set("view engine", "ejs");

const filenames = fs.readdirSync(
    path.join(`${root.path}`, VIEW_DIRECTORY_NAME)
);

filenames.forEach((filename) => {
    app.get(filename, (req, res) => {
        return res.render(filename, { request: req.query });
    });
    app.post(filename, (req, res) => {
        return res.render(filename, { request: req.body });
    });
});

app.start = async () => {
    const port = app.port || 8888;
    console.log("!!!!!!");
    console.log(root.path);
    app.listen(port, () => {
        console.log(`>>>> App started ${port}`);
    });
};

module.exports = app;
