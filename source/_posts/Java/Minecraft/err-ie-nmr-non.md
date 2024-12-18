---
title: >-
  [氵] 农夫乐事进入bukkit服务器 net.minecraft.ResouceLocationException: Non [a-z0-9/._-]
  character in path of location
keywords: 'Minecraft, Forge, Mod, 农夫乐事'
summary: 'ResouceLocationException Non [a-z0-9/._-] character in path of location'
tags:
  - Java
  - Minecraft
  - Forge
  - Bukkit
categories: 杂谈
abbrlink: 2c163bea
date: 2024-11-17 16:45:24
updated: 2024-12-18 21:49:15
---
# 开始之前
怪异的bugjump构式代码

# 解决过程
## 问题发现
今天在配置客户端的时候进群组服(Velocity->Bukkit->Forge)的时候发现了一个问题，在渲染区块之前被踢出服务器：
![Bugjump的奇妙bug](/assets/images/J-Game-Minecraft-err-ie-nmr-non.png)

## 问题分析
看到那大大的ResouceLocationException了吗? 为什么在这时候抛出这个东西? 而且内容还都是原版的? 不用猜都知道是bugjump的锅。

## 解决方案
下一个[现代化修复(ModernFix)](https://www.mcmod.cn/class/8714.html)

# 后记
> 好了氵完了我逃( )
> 不要闲着没事去开群组mod服，会变得不幸!