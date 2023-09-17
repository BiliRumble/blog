---
title: Express+TypeScript 使用sqlit作为数据库
date: 2023-9-11 12:00:00
update: 2023-9-17 00:00:00
tags: [nodejs, typescript, express, sqlite]
categories: [开发]
---

# 开始之前
此文章内容要求你掌握了关于TypeScript、ExpressAPI、SQL等基本知识。
在{% post_link 'create-ts-express-project' '搭建TypeScript+Express项目' %}文章中，我们介绍了Express+TypeScript的搭建方法，本片文章将在此基础上添加SQLIT功能。

# 实现功能
养成良好开发习惯，正确命名文件夹，细分文件，参照{% post_link 'express-files' 'Express 推荐项目结构' %}文章。

修改 app.js
```typescript
import express, { Request, Response } from 'express';

const app = express();
const db = new sqlite3.Database(':memory:'); // 引入sqlit功能, :memory: 代表将数据库写入内存，可替换为文件名

// 创建数据库表
db.serialize(() => {
  db.run('CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');
});

// 添加用户
app.post('/', (req: Request, res: Response) => {
  const { name } = req.body;
  db.run('INSERT INTO users (name) VALUES (?)', [name], (err) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add user' });
    } else {
      res.status(200).json({ success: true });
    }
  });
});

app.get('/', (req: Request, res: Response) => {
    db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Failed to get users' });
    } else {
      res.status(200).json(rows);
    }
  });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```
上述代码示例中，我们创建了一个用户表，并通过POST请求添加用户，通过GET请求获取所有用户。在处理数据库操作时，使用了SQLite的API来执行SQL语句。通过Express的路由功能，我们可以轻松定义不同的API端点，并处理不同的HTTP请求。

总结来说，结合使用SQLite、TypeScript和Express可以创建一个高效、可靠的Web应用程序。SQLite提供了一个轻量级的嵌入式数据库，TypeScript增强了代码的可读性和可维护性，Express提供了一套简洁灵活的API来构建Web应用程序。这个组合能够满足大部分Web开发的需求，并提供更好的开发体验。