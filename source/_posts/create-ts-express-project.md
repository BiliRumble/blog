---
title: 创建express+ts项目
date: 2023-9-1 12:00:00
update: 2023-9-17 20:16:00
tags: express+ts 开发
---

# 简介
TypeScript 和 Express 是一对非常强大的组合，可以帮助你构建可靠、可扩展的 Web 应用和 API。
> Express 是一个简洁、灵活的 Node.js Web 应用框架，用于构建 Web 应用和 API，提供了一套简单易用的 API，使开发者能够快速创建基于 Node.js 的 Web 应用，具有中间件架构，允许开发者通过添加中间件来处理请求和响应，提供了路由功能，可以根据不同的 URL 和 HTTP 方法来定义不同的处理程序，支持模板引擎，用于动态生成 HTML 页面,是非常流行和广泛使用的 Web 框架，许多大型项目和企业都在使用它。

> TypeScript 是一种由微软开发和维护的开源编程语言，它是 JavaScript 的超集， 扩展了 JavaScript，添加了静态类型检查和更多的面向对象编程特性，以提供更好的开发工具支持和代码可维护性，通过在编译时进行静态类型检查，可以帮助开发者捕获潜在的错误，并提供更好的代码提示和自动完成功能，代码可以被编译为普通的 JavaScript 代码，然后在任何支持 JavaScript 的环境中运行,与 JavaScript 代码可以无缝地集成，可以使用现有的 JavaScript 库和框架，并逐步将代码迁移到 TypeScript。

## 开始之前
此文章内容要求你掌握了关于TypeScript的基础知识和对ExpressAPI的基本知识。

# 搭建
下面是使用 TypeScript 和 Express 来创建一个简单的 Web 应用的步骤：

## 初始化项目
创建一个新的目录，并在该目录中初始化一个新的 npm 项目：
```bash
mkdir my-express-app
cd my-express-app
npm init -y
```

## 安装依赖项
这将安装 Express、TypeScript 和与 Express 相关的类型定义文件：
```bash
npm install express typescript ts-node @types/express nodemon
```

## 创建 TypeScript 配置文件
这将在项目根目录中创建一个 tsconfig.json 文件，用于配置 TypeScript 编译器：
```bash
npx tsc --init
```

## 创建 Express 应用
在项目根目录中创建一个 src 文件夹，并在其中创建一个 app.ts 文件。
```bash
mkdir src
touch src/app.ts
```
在 `app.ts` 文件中编写以下代码：
```typescript
import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Express!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

## 启动 Express 服务器
在 `package.json` 文件中添加以下脚本命令：
```json
"scripts": {
    "start": "ts-node src/app.ts",
    "dev": "nodemon src/app.ts"
}
```
不带自动刷新的启动
```bash
npm run start
```
带自动刷新的启动
```bash
npm run dev
```


> 现在，你已经成功创建了一个使用 TypeScript 和 Express 的简单 Web 应用。当你访问 http://localhost:3000 时，你将在浏览器中看到 "Hello, Express!" 的消息。你可以根据需要在 index.ts 文件中添加更多的路由和中间件来构建你的应用程序。使用 TypeScript 可以为你的 Express 应用提供更好的类型检查和智能提示，以提高开发效率和代码质量。