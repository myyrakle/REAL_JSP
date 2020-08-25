# Java Script Page

![](https://img.shields.io/badge/language-Javascript-red) ![](https://img.shields.io/badge/version-0.3.2-brightgreen) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/myyrakle/REAL_JSP/blob/master/LICENSE)

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

## EJS built-in object

This is a basic object that can be used on all pages.
| name | description | example |
| ------- | ----------- | ------------------------------ |
| method | http method | 'get', 'post', 'delete', 'put' |
| request | request info object | { paramter, queryParameter, ... } |
| request.paramter | Query parameter if get/delete. body parameter if post/put | {...} |
| request.queryParameter | URL Query parameter | {...} |
| request.namedRouteParameter | URL namedRouteParameter | {...} |
| request.method | Same as above | |
| request.baseUrl | baseUrl | '/greet' |
| request.originalUrl | originalUrl | '/search?q=something' |
| request.path | router path | '/users' |
| request.isHttps | https yes or no | true |
| request.subdomain | subdomain | 'ferrets' |
| request.hostname | hostname | 'example.com' |
| request.ip | request ip | '127.0.0.1' |

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
