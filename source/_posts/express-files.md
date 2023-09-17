---
title: Express 推荐项目结构
date: 2023-9-17 12:00:00
update: 2023-9-17 00:00:00
tags: [nodejs, express]
categories: [开发]
---

# 开始之前
此文章内容要求你掌握了关于Nodejs、ExpressAPI等基本知识。

# 结构及简介
在使用express框架构建项目时，推荐以下的项目结构：
```
- project
  - api
    - db.js // 工具文件夹
  - bin
    - www  // 启动文件
  - public  // 静态资源文件夹
    - css
    - js
    - images
  - routes  // 路由文件夹
    - index.js
    - user.js
  - views  // 视图文件夹
    - index.ejs
    - user.ejs
  - controllers  // 控制器文件夹
    - indexController.js
    - userController.js
  - models  // 数据模型文件夹
    - indexModel.js
    - userModel.js
  - app.js  // 项目主文件
  - package.json  // 项目配置文件
```

以上是一个常见的express项目结构示例，每个文件夹的作用如下：
- api: 存放供项目调用的应用程序接口，如db.js。
- bin: 存放启动文件，例如www文件用于启动项目。
- public: 存放静态资源文件，如css、js和images。
- routes: 存放路由文件，包含不同路径的路由处理逻辑，例如index.js和user.js。
- views: 存放视图文件，例如使用ejs模板引擎的index.ejs和user.ejs。
- controllers: 存放控制器文件，用于处理路由请求，例如indexController.js和userController.js。
- models: 存放数据模型文件，用于操作数据库，例如indexModel.js和userModel.js。
- app.js: 项目的主文件，包含了express的初始化和中间件配置。
- package.json: 项目的配置文件，包含了项目的依赖和脚本等信息。
这种项目结构将不同的功能模块分离，使代码更加清晰和易于维护。当项目规模变大时，可以进一步划分子文件夹，例如将controllers和models进一步细分为不同模块的文件夹。