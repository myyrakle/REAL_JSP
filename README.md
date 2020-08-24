# Java Script Page

![](https://img.shields.io/badge/language-Javascript-red) ![](https://img.shields.io/badge/version-0.2.5-brightgreen) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/myyrakle/REAL_JSP/blob/master/LICENSE)

##

It can be installed as follows:

```
npm install --save javascriptpage
```

##

And you can start with: Import the module, set the port, and start with the start method.

```
const jsp = require("javascriptpage");
jsp.port = 3333;
jsp.start();
```

Then, as the server starts up, a public directory and a page directory will be created.

The page directory is the path to the page sources. All .ejs files entered here are automatically registered in the URL.
The public directory is where static files such as js and css files are stored.
