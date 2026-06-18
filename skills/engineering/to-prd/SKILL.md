---
name: to-prd
description: 将当前对话转化为 PRD 并发布到项目 issue 跟踪器——无需面试，只需综合你已讨论过的内容。
disable-model-invocation: true
---

本技能利用当前对话上下文和代码库理解来生成 PRD。**不要**采访用户——只需综合你已经知道的内容。

issue 跟踪器和分类标签词汇应已提供给你——如果没有，请运行 `/setup-matt-pocock-skills`。

## 流程

1. 探索仓库以了解代码库的当前状态（如果你尚未这样做）。在整个 PRD 中使用项目的领域术语表词汇，并尊重你正在接触区域的任何 ADR。

2. 勾画出你要测试功能的接缝（seams）。优先使用现有接缝而非创建新的。使用尽可能高的接缝。如果需要新的接缝，在你能找到的最高点提出。代码库中的接缝越少越好——理想数量是一个。

与用户确认这些接缝是否符合他们的预期。

3. 使用下面的模板编写 PRD，然后将其发布到项目 issue 跟踪器。应用 `ready-for-agent` 分类标签——无需额外的分类。

<prd-template>

## Problem Statement

用户面临的问题，从用户的角度出发。

## Solution

问题的解决方案，从用户的角度出发。

## User Stories

一个**长**的、编号的用户故事列表。每个用户故事的格式应为：

1. As an <actor>, I want a <feature>, so that <benefit>

<user-story-example>
1. As a mobile bank customer, I want to see balance on my accounts, so that I can make better informed decisions about my spending
</user-story-example>

这个用户故事列表应非常详尽，覆盖功能的所有方面。

## Implementation Decisions

已做出的实现决策列表。可以包括：

- 将构建/修改的模块
- 将被修改的模块接口
- 来自开发者的技术澄清
- 架构决策
- Schema 变更
- API 契约
- 特定的交互

不要包含具体的文件路径或代码片段。它们可能会很快过时。

例外：如果原型产生了一段比文字更能精确编码决策的代码片段（状态机、reducer、schema、类型结构），将其内联在相关决策中，并简要说明来自原型。精简到决策密集的部分——不是工作演示，只是重要的内容。

## Testing Decisions

已做出的测试决策列表。包括：

- 什么构成了一个好的测试的描述（仅测试外部行为，而非实现细节）
- 哪些模块将被测试
- 测试的先例（即代码库中类似类型的测试）

## Out of Scope

对此 PRD 范围之外的描述。

## Further Notes

关于该功能的任何进一步说明。

</prd-template>
