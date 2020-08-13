const { PAGE_PATH, PUBLIC_PATH, ROOT_PATH } = require("./init");

const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(PUBLIC_PATH));

app.set("views", PAGE_PATH);
app.set("view engine", "ejs");

const fs = require("fs");
const filenames = fs.readdirSync(PAGE_PATH);

filenames.forEach((filename) => {
    console.log(filename);
    app.get(filename, (req, res) => {
        return res.render(filename, { request: req.query });
    });
    app.post(filename, (req, res) => {
        return res.render(filename, { request: req.body });
    });
    app.delete(filename, (req, res) => {
        return res.render(filename, { request: req.query });
    });
    app.put(filename, (req, res) => {
        return res.render(filename, { request: req.body });
    });
});

app.start = async () => {
    const port = app.port || 8888;
    console.log("!!!!!!");
    console.log(ROOT_PATH);
    app.listen(port, () => {
        console.log(`>>>> App started ${port}`);
    });
};

module.exports = app;
