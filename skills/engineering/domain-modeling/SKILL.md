---
name: domain-modeling
description: 构建和完善项目的领域模型。当讨论代码库术语、编写或编辑 CONTEXT.md，或记录或编辑 ADR 时使用。
---

# Domain Modeling（领域建模）

在设计过程中主动构建和完善项目的领域模型。这是一门**主动**的学科——质疑术语、创造边界场景、在术语和决策形成的瞬间将其记录在案。（仅仅*阅读* `CONTEXT.md` 来获取词汇不是此 skill 的用途——那是任何 skill 都能做的单行习惯。此 skill 用于你在*修改*模型，而非仅仅消费它。）

## 文件结构

大多数 repo 只有一个 context：

```
/
├── CONTEXT.md
├── docs/
│   └── adr/
│       ├── 0001-event-sourced-orders.md
│       └── 0002-postgres-for-write-model.md
└── src/
```

如果根目录存在 `CONTEXT-MAP.md`，则该 repo 有多个 context。该 map 指向每个 context 的位置：

```
/
├── CONTEXT-MAP.md
├── docs/
│   └── adr/                          ← 系统级决策
├── src/
│   ├── ordering/
│   │   ├── CONTEXT.md
│   │   └── docs/adr/                 ← context 特定决策
│   └── billing/
│       ├── CONTEXT.md
│       └── docs/adr/
```

懒加载创建文件——仅当有内容需要写入时才创建。如果 `CONTEXT.md` 不存在，在第一个术语确定时创建。如果 `docs/adr/` 不存在，在第一个 ADR 需要时创建。

## 在会话期间

### 对照 glossary 提出质疑

当用户使用与 `CONTEXT.md` 中已有语言冲突的术语时，立即指出。"你的 glossary 将 'cancellation' 定义为 X，但你似乎指的是 Y——到底是哪个？"

### 优化模糊语言

当用户使用模糊或过载的术语时，提出精确的标准术语。"你说 'account'——指的是 Customer 还是 User？它们是不同的东西。"

### 讨论具体场景

当领域关系被讨论时，用具体的场景进行压力测试。创造能够探测边界案例的场景，迫使用户精确描述概念之间的界限。

### 与代码交叉引用

当用户陈述某事物的工作方式时，检查代码是否一致。如果发现矛盾，指出："你的代码取消了整个 Orders，但你刚才说部分取消是可能的——哪个是对的？"

### 内联更新 CONTEXT.md

当术语确定时，立即更新 `CONTEXT.md`。不要批量处理——在发生时即时捕获。使用 [CONTEXT-FORMAT.md](./CONTEXT-FORMAT.md) 中的格式。

`CONTEXT.md` 应完全不含实现细节。不要将 `CONTEXT.md` 视为 spec、草稿本或实现决策的仓库。它是 glossary，仅此而已。

### 谨慎提供 ADR

仅当以下三个条件同时满足时才提供创建 ADR：

1. **难以逆转**——事后改变想法的成本很高
2. **脱离上下文会令人困惑**——未来的读者会想"他们为什么这样做？"
3. **是真实权衡的结果**——存在真正的替代方案，你因特定原因选择了其中一个

如果缺少任何一条，跳过 ADR。使用 [ADR-FORMAT.md](./ADR-FORMAT.md) 中的格式。
