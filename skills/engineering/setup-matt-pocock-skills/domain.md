# 领域文档

工程技能在探索代码库时应当如何消费本仓库的领域文档。

## 在探索之前，阅读这些文件

- **仓库根目录下的 `CONTEXT.md`**，或者
- **仓库根目录下的 `CONTEXT-MAP.md`**（如果存在）——它指向每个上下文的 `CONTEXT.md`。阅读与当前主题相关的每一个。
- **`docs/adr/`**——阅读与你即将工作的区域相关的 ADR。在多上下文仓库中，同时检查 `src/<context>/docs/adr/` 中上下文范围内的决策。

如果这些文件不存在，**静默继续**。不要标记它们的缺失，也不要建议提前创建它们。`/domain-modeling` 技能（通过 `/grill-with-docs` 和 `/improve-codebase-architecture` 访问）会在术语或决策实际需要解决时延迟创建它们。

## 文件结构

单上下文仓库（大多数仓库）：

```
/
├── CONTEXT.md
├── docs/adr/
│   ├── 0001-event-sourced-orders.md
│   └── 0002-postgres-for-write-model.md
└── src/
```

多上下文仓库（根目录下存在 `CONTEXT-MAP.md`）：

```
/
├── CONTEXT-MAP.md
├── docs/adr/                          ← 全局决策
└── src/
    ├── ordering/
    │   ├── CONTEXT.md
    │   └── docs/adr/                  ← 上下文特定决策
    └── billing/
        ├── CONTEXT.md
        └── docs/adr/
```

## 使用术语表的词汇

当你的输出命名了一个领域概念时（在 issue 标题、重构提案、假设或测试名称中），请使用 `CONTEXT.md` 中定义的术语。不要偏离术语表明确排除的同义词。

如果你需要的概念尚未出现在术语表中，那是一个信号——要么你正在发明项目不使用的语言（重新考虑），要么存在真正的空白（将其记录给 `/domain-modeling`）。

## 标记 ADR 冲突

如果你的输出与现有 ADR 相矛盾，请明确提出来，而不是静默覆盖：

> _与 ADR-0007（event-sourced orders）矛盾——但值得重新讨论，因为……_
