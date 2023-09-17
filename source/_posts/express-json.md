---
title: Express 解析Post请求的Json内容
date: 2023-9-17 12:00:00
update: 2023-9-17 00:00:00
tags: [nodejs, express, http, json]
categories: [开发]
---

# 开始之前
此文章内容要求你掌握了关于TypeScript、ExpressAPI、HTTP、JSON等基本知识，以及一个搭建完成的Express项目。

# 实现功能
Express 可以很容易地为 POST 请求注册路由处理程序。下面是一个基本的 POST 请求处理程序。
```typescript
import express, { Request, Response } from 'express';

const app = express();

// 解析此应用程序的 JSON 数据。确保在路由处理程序之前放置 app.use(express.json())
app.use(express.json())

app.post('/', (req: Request, res: Response) => {
    console.log(req.body);
    res.status(200).json(message: "post has ok!", data: req.body); // 发送一个json返回内容，应该为 {"message":"post has ok!", "data": 收到的请求内容，若没有则为空。}
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```
> 默认情况下，Express 不解析 HTTP 请求体，但它有一个内置中间件，用解析的请求体填充 req.body 属性。例如，app.use(express.json()) 是告诉 express 为您自动解析 json 请求体的方式，也可以使用官方支持的[Body-parser](https://www.npmjs.com/package/body-parser)中间件代替。