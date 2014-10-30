The Secrets Of The Full Stack Ninja - The Client Side Boilerplate
======

A modern fullstack web application boilerplate. 

Technology Stack: node, npm, git, grunt, expressjs, requirejs, backbonejs, marionettejs, twitter bootstrap

Install
----
```sh
git clone --depth 1 -b boilerplate --single-branch git@github.com:hamecoded/myBlog.git
```

Develop
----
```sh
npm install & bower install
grunt
```

once every while run `npm-check-updates -u` to update version in package.json and then `npm install`.

Distribute
----
```sh
npm install
grunt build
```

```sh
NODE_ENV=production node server.js
```

Common Pitfalls
----
For the application to run off of dist folder you must set an http server to root into that directory, otherwize routing won't take place. Consider using ngrok.com for that task if you aren't on the root http dir `./ngrok 127.0.0.1:80/myBlog/dist/`.  

License
----

MIT


