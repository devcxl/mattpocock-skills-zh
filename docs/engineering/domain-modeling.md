快速入门：

```bash
npx skills add mattpocock/skills --skill=domain-modeling
```

```bash
npx skills update domain-modeling
```

[源仓库](https://github.com/mattpocock/skills/tree/main/skills/engineering/domain-modeling)

## 功能

`domain-modeling` 在你设计时构建并锤炼项目的**通用语言**——挑战模糊术语、用具体场景压力测试关系，并在术语和决策确定时立即写入。

这是**主动**的学科，而非被动的。仅仅阅读 `CONTEXT.md` 来借用其词汇表，是任何技能都可以做到的一行习惯；这个技能是当你*改变*模型时用的——创造一个规范术语、发现代码和你刚才所说的之间的矛盾、记录一个难以撤销的决策。而且它保持术语表干净：`CONTEXT.md` 只是术语表，仅此而已——没有实现细节、没有规格说明、没有草稿板。

## 何时使用

输入 `/domain-modeling`，或者当任务合适时 Agent 会自动调用——当你确认术语、解决过载的词或记录架构决策时。

当*词语*是问题时使用：两个人对"cancellation"有不同含义、"account"身兼三职、或一个设计对话反复被一个从未被精确定义的概念绊倒。如果相反，模块的*形状*是问题——接缝放在哪里、接口有多深——使用 [codebase-design](https://aihero.dev/skills-codebase-design)。如果你希望计划本身在构建之前被盘问，使用 [grilling](https://aihero.dev/skills-grilling)。

## 前置条件

该技能写入两个位置，都是惰性创建的——只有在有内容需要记录时才创建。已确定的术语进入根目录的 `CONTEXT.md`（或者，在由 `CONTEXT-MAP.md` 标记的多上下文仓库中，进入每个上下文的 `CONTEXT.md`）。决策进入 `docs/adr/`。没有任何东西需要预先存在；第一个确定的术语创建术语表，第一个真实权衡创建 ADR。

## 术语表 vs. ADR

两种制品，两道不同的门槛：

- **术语表**（`CONTEXT.md`）捕捉语言。每次一个模糊的术语被规范化时，它被内联写入——而不是批量处理——因此共享词汇表始终与对话保持同步。它无情地保持免受实现细节的污染。
- **ADR** 捕捉决策，门槛很高：仅当选择是**难以撤销的**、**在没有上下文的情况下令人惊讶的**、以及**真实权衡的结果**时才提出。三个条件中缺失任何一个就没有 ADR。这正是让 `docs/adr/` 成为重要分叉的记录而非日记的关键。

让人觉得巧妙的操作是：当你陈述某样东西如何工作时，该技能交叉引用代码并揭示矛盾——"你的代码取消了整个 Order，但你刚才说部分取消是可能的——哪个是对的？"语言和代码被迫保持一致。

## 有意提取出来

`domain-modeling` 是构建项目通用语言的**唯一真实来源**，被拆分为独立的模型调用技能，以便其他任何技能可以调用它。[grill-with-docs](https://aihero.dev/skills-grill-with-docs) 依赖它在盘问会话进行时记录术语和决策，[triage](https://aihero.dev/skills-triage) 使用它来保持 ticket 使用项目自身的语言，[improve-codebase-architecture](https://aihero.dev/skills-improve-codebase-architecture) 在工作时会调用它。

保持独立意味着你也可以直接调用它——作为如何锤炼模型的**参考**——而无需承诺任何这些技能所要求的步骤。语言存在于一个地方，所有需要它的东西都指向那里。

## 在生态中的位置

`domain-modeling` 是一个**随时可用的独立技能**，它运行在*其他技能之下*的频率与作为固定步骤一样高。其最近的邻居是 [codebase-design](https://aihero.dev/skills-codebase-design)，因为共享语言正是让你精确命名深度模块及其接缝所需的东西；下游，确定好的术语表正是 [to-spec](https://aihero.dev/skills-to-spec) 综合为项目自身语言编写的规格说明的内容。当你不确定哪个技能或流程适合时，[ask-matt](https://aihero.dev/skills-ask-matt) 会引导你。
