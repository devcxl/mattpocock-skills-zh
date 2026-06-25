---
name: decision-mapping
description: 将一个松散的想法转化为一系列有序的调研 Ticket，然后逐个驱动它们直至解决。
disable-model-invocation: true
---

当某个松散的想法需要不止一个 Agent 会话才能转化为计划时，会调用此技能。它在一个 Markdown 文件中创建一个有状态的决策映射（decision map），并引导用户依次处理一系列 Ticket，以解决悬而未决的问题——这些问题可能涉及原型开发、调研或讨论。

## 决策映射（Decision Map）

决策映射是一个紧凑的 Markdown 文件，每个规划工作对应一个文件，与项目一起进行 git 追踪。它是规范性制品——**每个会话都会将整个映射加载为上下文**，因此必须保持紧凑。

Ticket 期间创建的资产应从映射中链接引用，而非复制到映射内。

### 结构

编号条目（"Ticket"），每个条目以其编号为键，自成一个小节：

```markdown
## #1: 关系型还是非关系型数据库？

Blocked by: #<ticket-number>, #<ticket-number>
Type: Research | Prototype | Grilling

### Question

<question-here>

### Answer

<answer-here>
```

每个 Ticket 的大小必须适配一个 100K token 的 Agent 会话。

## Ticket 类型

共有三种类型的 Ticket：

- **Research（调研）**：阅读文档、第三方 API 或本地资源（如知识库）。创建一个 Markdown 摘要作为资产。当需要当前工作目录之外的知识时使用此类型。
- **Prototype（原型）**：编写 UI 或逻辑代码来验证假设，或探索设计方案。使用 /prototype 技能。创建一个原型作为资产。当核心问题是"应该长什么样"或"应该怎么表现"时使用此类型。
- **Grilling（盘问）**：与 Agent 进行对话。使用 /grilling 和 /domain-modeling 技能。一次只问一个问题。这是默认类型。

## 战争迷雾（Fog of War）

决策映射在前沿之外**有意地**不完整。你的任务是探索前沿，并解决 Ticket 以推动前沿向前发展。一次推进一个节点。

在某个时刻，战争迷雾应该已经被推回到足够远的距离，使得通往终点的路径变得清晰。到那时，不再需要更多的 Ticket，决策映射可被视为"完成"。

## 调用方式

此技能有两种调用方式：**引导（Bootstrap）** 和 **恢复（Resume）**。

### 引导（Bootstrap）

用户用一个松散的想法发起调用。

1. 运行一个 /grilling + /domain-modeling 会话，以揭示未解决的决策。一次只问一个问题。
2. 编写一个新的决策映射——大部分是迷雾，前沿已被识别，可简单决定的条目已内联解决。
3. 停止。构建映射是一个会话的工作量；不要同时解决 Ticket。

### 恢复（Resume）

用户传入现有映射的路径和一个 Ticket 编号来发起调用。

1. 将**整个映射**加载为上下文。
2. 运行一个会话来解决该 Ticket，根据需要调用其他技能。如有疑问，使用 `/grilling` 和 `/domain-modeling`。
3. 在 Ticket 正文中记录会话解决的内容。
4. 添加新发现的 Ticket（附带正确的 `blocked_by` 边）。
5. 停止。

如果所做的决策使映射的其他部分失效，更新或删除那些节点。

## 并行

用户可能会选择并行运行 Ticket，因此应预期其他 Agent 会对映射进行更改。

## 跳过决策映射

很多时候，初始的 grilling 不会产生任何战争迷雾。没有未解决的 Ticket。除了实现之外无事可做。

在这种情况下，你应该让用户选择跳过决策映射——因为只有在需要做出跨多个会话的决策时，才需要决策映射。

如果用户选择跳过，你应该建议直接实现，或使用 `/to-prd` 来安排多会话的实现。
