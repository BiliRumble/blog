---
title: Vite+React类似Next.js的文件路由
keywords: Vite, React, 文件路由, 动态路由
summary: Vite+React实现类似Next.js的文件路由
tags: [React, Vite]
categories: React
abbrlink: c9dd71be
date: 2024-11-14 12:32:48
updated: 2024-12-18 21:49:15
---
# 开始之前
> 懒得配置可以试试[Kor](https://github.com/MoratoMC/kor-template), 这是一个基于react的模板, 可以快速搭建一个react项目
1. 请确保你已经安装的相关依赖(react-router-dom, react-router-dom等)

# 形式
在Next.js中, 将文件添加到`pages`文件夹中, 就会自动生成对应的路由.

1. 将 `index.js|jsx|ts|tsx` 映射成当前目录的根路由:
* `pages/index.tsx` ->  `/`
* `pages/about/index.tsx` -> `/about`
2. 支持嵌套目录文件, 以目录结构生成路由:
* `pages/about.tsx` -> `/about`
* `pages/about/detail.tsx` -> `/about/detail`
3. 使用括号语法, 匹配动态命名参数:
* `pages/user/[id].tsx` -> `/user/:id(/user/1)`
* `pages/user/[id]/info.tsx` -> `/user/:id/info(/user/1/info)`

怎么样, 是不是很方便? 那么在react中, 我们可以怎么实现呢?

# 实现
## 导入多个模块
> `Vite` 支持使用特殊的 [`import.meta.glob('./pages/*.tsx')`](https://cn.vitejs.dev/guide/features#glob-import) 函数从文件系统导入多个模块
```ts
const modules = import.meta.glob('./pages/*.tsx');
```
等价于
```ts
const modules = {
    './dir/one.js': () => import('./dir/one.js'),
    './dir/two.js': () => import('./dir/two.js'),
};
```
其类似于`require.context`. 我们可以将其转换为`react-router-dom`所需要的格式
我们先来看看`react-router-dom`的`useRoutes`方法
```ts
const routes = useRoutes([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
]);

export default function PageRoutes() {
    return useRoutes(routes);
}
```
我们只需要将`modules`转换为`react-router-dom`所需要的格式即可.

## 路由规则
上面已经提到了映射的规则, 现在我们还需要**避免映射不需要的组件**, 最简单的解决方法是**添加特定前缀**. 这里使用`_`作为前缀.

## 读取
通过通配符匹配当前目录下的.ts|tsx文件

```ts
const modules = import.meta.glob('/src/pages/**/_*.{ts,tsx}');
```
我们有如下的目录结构:
```
pages
│  _index.tsx
│
└─about
    │  _index.tsx
    │
    └─child
            _index.tsx
            _[name].tsx
```
现在, `modules`的输出如下:
![module控制台输出](assets/images/TS-FontEnd-react-file-route-moduleoutput.png "输出")

## 生成路由配置
我们可以先将 modules 变量转换为嵌套结构的 JSON, 然后将其转换为 react-router-dom 所需的格式.
```ts
import { set } from 'lodash-es';

/**
 * 根据 pages 目录生成路径配置
 */

function generatePathConfig(): Record<string, any> {
  // 扫描 src/pages 下的所有具有路由文件
  const modules = import.meta.glob('/src/pages/**/$*.{ts,tsx}');

  const pathConfig = {};
  Object.keys(modules).forEach((filePath) => {
    const routePath = filePath
      // 去除 src/pages 不相关的字符
      .replace('/src/pages/', '')
      // 去除文件名后缀
      .replace(/.tsx?/, '')
      // 转换动态路由 $[foo].tsx => :foo
      .replace(/\$\[([\w-]+)]/, ':$1')
      // 以目录分隔
      .split('/');
    // 使用 lodash.set 合并为一个对象
    set(pathConfig, routePath, modules[filePath]);
  });
  return pathConfig;
}
```
只需要将 `import()` 语法稍微封装一下 `() => import('./about/index.tsx')` 基础上包一层 `React.lazy` 将其转换为组件即可
```tsx
/**
 * 为动态 import 包裹 lazy 和 Suspense
 */
function wrapSuspense(importer: () => Promise<{ default: ComponentType }>) {
  if (!importer) {
    return undefined;
  }
  // 使用 React.lazy 包裹 () => import() 语法
  const Component = lazy(importer);
  // 结合 Suspense，这里可以自定义 loading 组件
  return (
    <Suspense fallback={null}>
      <Component />
    </Suspense>
  );
}
```
将 `pathConfig` 递归将其转换为 `React-Router` 的配置
```tsx
/**
 * 将文件路径配置映射为 react-router 路由
 */
function mapPathConfigToRoute(cfg: Record<string, any>): RouteObject[] {
  // route 的子节点为数组
  return Object.entries(cfg).map(([routePath, child]) => {
    // () => import() 语法判断
    if (typeof child === 'function') {
      // 等于 index 则映射为当前根路由
      const isIndex = routePath === 'index';
      return {
        index: isIndex,
        path: isIndex ? undefined : routePath,
        // 转换为组件
        element: wrapSuspense(child),
      };
    }
    // 否则为目录，则查找下一层级
    const { $, ...rest } = child;
    return {
      path: routePath,
      // layout 处理
      element: wrapSuspense($),
      // 递归 children
      children: mapPathConfigToRoute(rest),
    };
  });
}
```
最后, 我们只需要将 `pathConfig` 转换为 `react-router-dom` 所需的格式即可
```tsx
function generateRouteConfig(): RouteObject[] {
  const { $, ...pathConfig } = generatePathConfig();
  // 提取跟路由的 layout
  return [
    {
      path: '/',
      element: wrapSuspense($),
      children: mapPathConfigToRoute(pathConfig),
    },
  ];
}

const routeConfig = generateRouteConfig();
```
它的输出结果如下:
![route输出结果](assets/images/TS-FontEnd-react-file-route-routeoutput.png "输出")

## 使用
```tsx
export function PageRoutes() {
  return useRoutes(routeConfig);
}
```
```tsx
function App() {
  return (
    <BrowserRouter>
      <PageRoutes />
    </BrowserRouter>
  );
}
```

# 一些问题
> 实践的时候发现一个问题，由于路由组件都是懒加载，会导致 Vite 在启动的时候无法扫描到依赖，可以配置 optimizeDeps.include 强制进行依赖预构建，优化启动性能。
>文档说动态导入打包就会成很多chunk,路由多了那么载入上百个chunk是常态。全都用globEager也不太好，文件过大,遇到那种不活跃路径没有可优化。解决不活跃的路由需求分片这种问题最好就又得加配置,从文件声明上下手不太好。第二个点就是import这种vite提供的替换方法是否高效。没看过源码，是否有缓存,监听到文件路径发生改变再单独的去替换变化的路径进行替换。还是说次次都遍历。