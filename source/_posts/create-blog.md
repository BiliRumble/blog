---
title: Hexo 部署
date: 2019-2-6 12:00:00
---

# 创建 Hexo Blog.
Hexo 是一个基于Nodejs的强大的 Blog 框架。

## 安装 Hexo-cil
所有必备的应用程序安装完成后，即可使用 npm 安装 Hexo。

```shell
npm install -g hexo-cli
```
进阶安装和使用
对于熟悉 npm 的进阶用户，可以仅局部安装 hexo 包。
```shell
npm install hexo
```
安装以后，可以使用以下两种方式执行 Hexo：

```shell
npx hexo <command>
```
Linux 用户可以将 Hexo 所在的目录下的 node_modules 添加到环境变量之中即可直接使用 `hexo <command>`：
```shell
echo 'PATH="$PATH:./node_modules/.bin"' >> ~/.profile
```

## 创建项目
安装 Hexo 完成后，请执行下列命令，Hexo 将会在指定文件夹中新建所需要的文件。
```shell
hexo init <folder>
cd <folder>
npm install
```
新建完成后，指定文件夹的目录如下：
```
.
├── _config.yml
├── package.json
├── scaffolds
├── source
|   ├── _drafts
|   └── _posts
└── themes
```

## 运行项目

### 预览
运行以下命令后访问`<host>:4000`即可。
```shell
npm run server
```

### 构建
```
npm run build
```
