---
title: wayfinder（文档）
description: Wayfinding（探路法）的概念、行为及跟踪器操作参考。
---

# Wayfinding（探路法）

Wayfinding 是一种规划大型工作的方法——当一个工作块太大以至于一个 agent 会话无法完成时——通过在 Issue 跟踪器上将其绘制为一组调研 ticket 的**地图（map）**。在阅读本文档之前，请先阅读 `/engineering/wayfinder` 技能规范。

## 跟踪器操作

在 GitHub Issue 跟踪器中，地图、ticket 及其关系表达如下：

- **地图（Map）** 是一个带有 `wayfinder:map` 标签的 Issue。其标题即为地图的名称。
- **Ticket** 是一个带有 `wayfinder:<type>` 标签的 Issue——类型为 `research`、`prototype`、`grilling` 或 `task`。它通过 GitHub Issue 跟踪器的 **sub-issues（子 Issue）** 功能作为其地图的子项（嵌套在父级下方）。
- **阻塞依赖（Blocking）** 通过 GitHub Issue 跟踪器原生的阻塞关系来表达。
- 已被认领的 ticket 会分配给驱动该地图的开发者。
- **前沿（Frontier）** 是指地图中所有处于开放状态、未被分配、且未被阻塞的子 Issue。
- 地图正文、ticket 类型、迷雾（fog of war）以及范围外规则与技能规范中的定义完全相同。

`/setup-matt-pocock-skills` 技能为项目配置标签词汇表。

### 在跟踪器中操作

在 GitHub Issue 跟踪器上操作地图时，通过 `gh` 工具与 Issue 交互：

- 使用 `gh issue create` 创建 Issue
- 使用 `gh issue edit <id> --add-label` 为 Issue 添加标签
- 使用 `gh sub-issue add <parent-id> <child-id>` 添加子 Issue
- 使用 `gh issue edit <id> --add-blocked-by <blocker-id>` 和 `gh issue edit <id> --add-blocks <dependent-id>`（或跟踪器支持的其他关系字段名）添加阻塞关系
- 使用 `gh issue edit <id> --add-assignee @me` 分配 Issue
- 使用 `gh issue comment <id> --body` 发表评论
- 使用 `gh issue close <id>` 关闭 Issue
