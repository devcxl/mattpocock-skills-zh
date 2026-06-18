---
name: to-issues
description: 将计划、规范或 PRD 拆解为项目 issue 跟踪器中可独立抓取的 issue，使用 tracer-bullet 垂直切片方式。
disable-model-invocation: true
---

# 拆解为 Issue

使用垂直切片（tracer bullets）将计划拆解为可独立抓取的 issue。

issue 跟踪器和分类标签词汇应已提供给你——如果没有，请运行 `/setup-matt-pocock-skills`。

## 流程

### 1. 收集上下文

从对话上下文中已有的内容开始。如果用户传入了 issue 引用（issue 编号、URL 或路径），从 issue 跟踪器中获取并读取其完整正文和评论。

### 2. 探索代码库（可选）

如果你尚未探索代码库，请先了解代码的当前状态。Issue 标题和描述应使用项目的领域术语表词汇，并尊重你正在接触的区域的 ADR。

寻找预重构代码的机会，使实现更简单。"让改动变得容易，然后再做容易的改动。"

### 3. 起草垂直切片

将计划拆解为 **tracer bullet** issue。每个 issue 是一个薄的垂直切片，贯穿所有集成层——而不是某个层面的水平切片。

<vertical-slice-rules>

- 每个切片在每个层面（schema、API、UI、测试）提供一条狭窄但**完整**的通路
- 一个完成的切片本身是可演示或可验证的
- 任何预重构应首先完成

</vertical-slice-rules>

### 4. 征求用户意见

以编号列表的形式展示提议的拆解方案。对每个切片展示：

- **标题**：简短描述性名称
- **被以下阻塞**：哪些其他切片（如果有）必须先完成
- **覆盖的用户故事**：这解决了哪些用户故事（如果源材料中有）

询问用户：

- 粒度是否合适？（太粗 / 太细）
- 依赖关系是否正确？
- 是否有任何切片需要合并或进一步拆分？

迭代直到用户批准拆解方案。

### 5. 将 issue 发布到 issue 跟踪器

对于每个批准的切片，向 issue 跟踪器发布一个新的 issue。使用下面的 issue 正文模板。这些 issue 被认为是面向 AFK agent 的就绪状态，因此除非另有指示，请使用正确的分类标签发布。

按依赖顺序发布 issue（先发布阻塞项），以便你可以在"被以下阻塞"字段中引用真实的 issue 标识符。

<issue-template>
## Parent

issue 跟踪器中父 issue 的引用（如果源材料是现有 issue，否则省略此部分）。

## What to build

对此垂直切片的简洁描述。描述端到端行为，而不是逐层实现。

避免具体的文件路径或代码片段——它们很快就会过时。例外：如果原型产生了一段比文字更能精确编码决策的代码片段（状态机、reducer、schema、类型结构），将其内联在此处，并简要说明来自原型。精简到决策密集的部分——不是工作演示，只是重要的内容。

## Acceptance criteria

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Blocked by

- 阻塞票证的引用（如果有）

或者如果没有阻塞项，则写 "None - can start immediately"。

</issue-template>

不要关闭或修改任何父 issue。
