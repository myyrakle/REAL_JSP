# Java Script Page

![](https://img.shields.io/badge/language-Javascript-red) ![](https://img.shields.io/badge/version-0.3.1-brightgreen) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/myyrakle/REAL_JSP/blob/master/LICENSE)

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

##

Then, as the server starts up, a public directory and a page directory will be created.

![](https://raw.githubusercontent.com/myyrakle/REAL_JSP/master/public/init.png)

The page directory is the path to the page sources. All .ejs files entered here are automatically registered in the URL.  
The public directory is where static files such as js and css files are stored.

##

## Route

The automatically created index.ejs page file can be accessed as follows.
![](https://raw.githubusercontent.com/myyrakle/REAL_JSP/master/public/first_test.PNG)
In addition, if you add test.ejs, you can access "localhost:3333/test.ejs".

And static files can be accessed through the /public path.
![](https://raw.githubusercontent.com/myyrakle/REAL_JSP/master/public/public.PNG)

##

## With Express

This is actually based on express and ejs. So, you can use express's method as it is.

```
const jsp = require("javascriptpage");
jsp.port = 3333;

jsp.use((req, res, next) => {
    //...
    next();
});

jsp.get("/foo", (req, res) => res.json({ msg: "boom" }));

jsp.start();
```

However, it is not recommended to use. Pages are the best.
