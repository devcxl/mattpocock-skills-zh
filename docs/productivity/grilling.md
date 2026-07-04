Quickstart:

```bash
npx skills add mattpocock/skills --skill=grilling
```

```bash
npx skills update grilling
```

[Source](https://github.com/mattpocock/skills/tree/main/skills/productivity/grilling)

## 它的作用

`grilling` 是一种无情的访谈，在你构建之前对计划或设计进行压力测试。它沿着设计树逐分支遍历，逐个解决决策之间的依赖关系，直到你和代理拥有相同的理解。

它**一次只问一个问题**，并在下一个问题之前等待你的回答——绝不会是一个大列表，那会让人不知所措。每个问题都附带代理自己的推荐答案，并且任何可以通过代码库解决的问题，它都会去探索而不是问你。在你确认达成共识之前，它不会开始着手实施计划。

## 何时使用

键入 `/grilling`，或者当任务适合时代理会自动使用它——这是底层原语，而不仅仅是用户的入口点。

当一个计划或设计仍然有薄弱环节，并且你希望在编写代码之前将其暴露出来时使用。在实践中，你通常通过它的两个封装之一来调用它，而不是通过名称：对于一次纯粹的盘问会话，使用 [grill-me](https://aihero.dev/skills-grill-me)；要将会话同时记录为 ADR 和术语表，使用 [grill-with-docs](https://aihero.dev/skills-grill-with-docs)。

## 决策树

心智模型是一棵**决策树**：每个计划都会分支成决策，而决策之间相互依赖。`grilling` 逐个节点地遍历这棵树，因此一个早期的回答可以重塑接下来要提出哪些问题。这就是为什么问题逐个出现并按依赖顺序排列——并行提问的洪流会失去使访谈收敛到共同理解的结构。

## 有意提取出来

`grilling` 是访谈技术的**唯一真实来源**，作为一个由模型调用的**原语**被提取出来，以便每个需要访谈的技能都可以使用它，而不是重新发明轮子。[grill-me](https://aihero.dev/skills-grill-me) 和 [grill-with-docs](https://aihero.dev/skills-grill-with-docs) 是其两个由用户调用的前端入口，但 [improve-codebase-architecture](https://aihero.dev/skills-improve-codebase-architecture) 和 [triage](https://aihero.dev/skills-triage) 也依赖它来压力测试它们自己的决策。

将技术保留在一个地方意味着你也可以直接使用它，当你只想要访谈——而不需要其封装添加的 ADR 编写或工单成形功能时。

## 它的定位

`grilling` 是主构建链下的访谈**原语**：[grill-with-docs](https://aihero.dev/skills-grill-with-docs) 在 [to-prd](https://aihero.dev/skills-to-prd) 编写规范之前运行它以锐化上下文。当你不确定适合哪种入口点时，[ask-matt](https://aihero.dev/skills-ask-matt) 会为你指引方向。
