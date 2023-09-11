---
title: express+ts 使用jwt验证身份
date: 2023-9-2 12:00:00
update: 2023-9-10 00:00:00
tags: express+ts 开发
---

# JWT简介
JWT是指JSON Web Token，它是一种用于身份验证和授权的开放标准。JWT由三部分组成：头部（Header）、载荷（Payload）和签名（Signature）。

头部（Header）包含了关于该令牌的元数据信息，如令牌的类型（即JWT）和所使用的签名算法。载荷包含了一些声明，用于存储有关实体（例如用户）和其他元数据的信息。一些常见的声明包括iss（发行者）、sub（主题）、exp（过期时间）等。

签名是对头部（Header）和载荷进行签名的结果，用于验证令牌的真实性和完整性。签名通常使用密钥进行加密，以确保只有持有正确密钥的人才能验证和解析JWT。

JWT具有以下优点：

无状态：服务端不需要保存用户的会话信息，每次请求都携带JWT进行验证。
可扩展性：JWT的载荷可以自定义，可以包含一些额外的信息。
安全性：通过签名验证，可以确保JWT的真实性和完整性，防止篡改和伪造。
在使用JWT时，客户端通常在登录成功后，服务端会生成一个JWT并返回给客户端。客户端在后续的请求中会携带该JWT作为身份验证凭证。服务端通过验证JWT的签名和有效性来确认用户的身份和权限。

总的来说，JWT是一种轻量级、安全可靠的身份验证和授权机制，适用于分布式系统和前后端分离的应用场景。

# JWT在EXPRESS+TS环境下的简单使用教程
此篇不交授如何创建EXPRESS+TS环境,若需要请自行搜索。
在 TypeScript 和 Express 应用中使用 JWT（JSON Web Token）进行身份验证的步骤如下：
- 安装依赖：
 ```bash
  npm install jsonwebtoken @types/jsonwebtoken
 ```
上述命令会安装 JSON Web Token 的依赖，以及 TypeScript 的类型定义文件。

## 创建一个JWT工具
```typescript
// JwtTools
/// <reference path="../custom.d.ts" /> //引入 custom.d.ts
import express, {Request,Response,Application} from 'express';
import jwt from 'jsonwebtoken';
import config  from '../config';

const secretKey = "your-key"; //你的密钥

export function generateToken(payload: any): string { // 创建Token
  return jwt.sign(
   payload,
   secretKey,
   {
       expiresIn: '1h' //密钥时间限制
   }
   );
}

export function authenticateToken(req: Request, res: Response, next: Function) { // 验证Token
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.send("权限验证未通过/未登录。").status(401);
  }
 
  jwt.verify(
   token,
   secretKey,
   (err, decoded) => {
    if (err) {
      console.error(`出现错误: ${err}`);
      res.send("服务器错误。").status(500);
      return;
    }
    req.user = decoded; // 定义 req.user
    next();
   }
  );
}
```
在这个例子中，我们将 JWT 密钥设置为 "your-key"。generateToken：生成Token,并返回; authenticateToken：它从请求头中获取 JWT 令牌，使用 jsonwebtoken 库的 verify 方法验证令牌，并将解码后的用户信息存储在 req.user 中。如果令牌无效，将返回 401 错误。

## 使用JWT工具
```typescript
// app.js
/// <reference path="../custom.d.ts" /> //引入 custom.d.ts
import { authenticateToken, generateToken } from './JwtTools'; // 引入方法,不要照抄

app.get('/', (req: Request, res: Response) => { // 生成并下发Token
   const payload = { 
       "name": "test" // 需要携带的内容，可以是任何类型的
   };
   const token = generateToken(payload); // token
   res.send(`${token}`).status(200); // 发送token
});

app.get("/protected", authenticateToken, (req: Request, res: Response) => { // 保护的路由
    res.json({ message: "You are authorized!", user: req.user });
 });
```
在这个例子中，我们创建了一个 生成和下发Token的路由，还有一个受保护的路由 /protected，它需要进行身份验证。在路由处理程序中，我们可以访问 req.user 来获取解码后的用户信息，并返回相应的数据。

## 创建自定义类型: req.user
```typescript
// custom.d.ts
declare namespace Express {
   interface Request {
     user?: any;
   }
}
```
我们在这里创建了一个文件扩展声明。
### *.d.ts 简介
.d.ts 是 TypeScript 中的声明文件的文件扩展名，它用于描述 JavaScript 库、框架或模块的类型信息。声明文件通常用于提供类型定义，以便在使用 JavaScript 库时能够获得更好的类型检查和智能提示。

当使用第三方 JavaScript 库或模块时，如果没有相应的声明文件，TypeScript 可能无法正确推断出库的类型，导致类型检查错误或缺少智能提示。为了解决这个问题，可以创建一个 .d.ts 文件来描述库的类型信息。

一个 .d.ts 文件通常包含以下内容：

导入语句（如果需要）：如果你的声明文件依赖其他的类型，你可以使用 import 或 /// <reference types="..." /> 导入它们。

声明模块或全局变量：使用 declare module 或 declare global 关键字来声明模块或全局变量，并指定它们的类型。

导出类型声明：使用 export 关键字来导出类型声明，包括接口、类、类型别名、枚举等。