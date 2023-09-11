# 博客
我的个人博客，基于Hexo框架，使用Butterfly主题。
关于commit: 以后基本就更新文章。

## 部署

* **安装** [node.js](https://nodejs.org/zh-cn/) **环境**

  > node > 16.16.0  
  > npm > 8.15.0  
  > yarn > 1.22.19
  
* 然后以 **管理员权限** 运行 `cmd` 终端，并 `cd` 到 项目根目录
* 在 `终端` 中输入：

```bash
# 安装依赖
yarn install

# 预览
yarn dev

# 构建
yarn build
```
> 构建完成后，静态资源会在 **`public` 目录** 中生成，可将 **`public` 文件夹下的文件**上传至服务器，也可使用 `Vercel` 等托管平台一键导入并自动部署