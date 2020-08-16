const { PAGE_PATH, PUBLIC_PATH, ROOT_PATH } = require("./init");

const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(PUBLIC_PATH));

app.set("views", PAGE_PATH);
app.set("view engine", "ejs");

const fs = require("fs");
const path = require("path");

function getFiles(dir) {
  const subdirs = fs.readdirSync(dir);
  const files = subdirs.map((subdir) => {
    const res = path.resolve(dir, subdir);
    return fs.statSync(res).isDirectory() ? getFiles(res) : res;
  });

  return files.reduce((a, f) => a.concat(f), []);
}

getFiles(PAGE_PATH).forEach((filename) => {
  const PATH = path.relative(ROOT_PATH, filename).replace(/\\/g, `/`);

  app.get(PATH, (req, res) => {
    res.render(filename, { method: "get", request: req.query });
  });
  app.post(PATH, (req, res) => {
    res.render(filename, { method: "post", request: req.body });
  });
  app.delete(PATH, (req, res) => {
    res.render(filename, { method: "delete", request: req.query });
  });
  app.put(PATH, (req, res) => {
    res.render(filename, { method: "put", request: req.body });
  });
});

app.start = async () => {
  const port = app.port || 12345;
  console.log("!!!!!!");
  console.log(ROOT_PATH);
  app.listen(port, () => {
    console.log(`>>>> App started ${port}`);
  });
};

module.exports = app;
