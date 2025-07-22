---
title: 临时解决 Arch Linux 原生运行 星露谷物语 时由 glibc 导致的 Galaxy API 初始化错误
keywords: 'Arch Linux, Stardew Valley, 星露谷物语, SMAPI, Galaxy API, 多人游戏, 合作, glibc, patchelf'
summary: 解决因 glibc 更新导致的 Galaxy API 初始化失败问题，修复多人游戏连接故障
tags:
  - Linux
  - Arch Linux
  - Stardew Valley
categories: 杂谈
abbrlink: 59c3a999
date: 2025-07-21 10:30:00
updated: 2025-07-21 14:20:00
---

# 问题现象
在 Arch Linux 原生运行《星露谷物语》并使用 SMAPI 加载 Mod 时，出现以下错误：
```
[game] Error initializing the Galaxy api.
TypeInitializationException: The type initializer for 'Galaxy.Api.GalaxyInstancePINVOKE' threw an exception.
 ---> ...其他错误信息...
[SMAPI] Type 'help' for help, or 'help <cmd> for a command's usage
[game] Galaxy SignInSteam failed with an exception:
TypeInitializationException: The type initializer for 'Galaxy.Api.GalaxyInstance' threw an exception.
 ---> ...其他错误信息...
```
导致合作界面卡在 **"正在连接到在线服务..."** 无法联机。

# 问题解析
glibc 2.41 版本引入的兼容性变化，导致 GOG Galaxy API 库（`libGalaxy64.so` 和 `libGalaxyCSharpGlue.so`）加载失败。具体原因是新版本对 `GNU_STACK` 段进行了更严格的检查。

> **尽量不要**尝试降级 glibc！这可能会导致严重问题。

# 临时解决方案
本方案使用 `patchelf` 清除库文件的 execstack 标志：

1. **安装工具**：
   ```bash
   sudo pacman -S patchelf
   ```

2. **切换到游戏根目录（请使用实际目录）**：
   ```bash
   cd ~/.steam/steam/steamapps/common/Stardew\ Valley
   ```

3. **修复库文件**：
   ```bash
   patchelf --clear-execstack libGalaxy64.so
   patchelf --clear-execstack libGalaxyCSharpGlue.so
   ```

> Steam Deck 同样适用，不过需要替换第二步的路径为实际游戏目录。