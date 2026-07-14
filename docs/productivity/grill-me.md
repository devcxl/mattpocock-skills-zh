Quickstart:

```bash
npx skills add mattpocock/skills --skill=grill-me
```

```bash
npx skills update grill-me
```

[Source](https://github.com/mattpocock/skills/tree/main/skills/productivity/grill-me)

## 它的作用

`grill-me` 对一个计划、决策或想法进行无情的访谈，走遍决策树的每一个分支，直到你和代理达成**共同理解**。

它**一次只问一个问题**并等待回答。它绝不会一次性抛出大量问题——那会让人不知所措——并且如果某个问题可以通过阅读代码库来回答，它会主动去查阅而不是问你。每个问题都附带代理自己的推荐答案，因此你是在对提案做出反应，而不是面对一个空白提示。

## 何时使用

你通过键入 `/grill-me` 来调用它——代理不会主动使用它。

在构建之前使用它，当你感觉一个计划大致正确，但能感觉到其中隐藏着尚未解决的决策时——在你希望发现薄弱环节并将其暴露出来的时候。如果你希望同样的盘问过程还能留下 ADR 的纸质记录和术语表，使用 [grill-with-docs](https://aihero.dev/skills-grill-with-docs) 代替。如果工作大到一次会话装不下，到达目标的路线仍然模糊——一个全新项目、一个大型功能构建——先使用 [wayfinder](https://aihero.dev/skills-wayfinder) 更上游地开始，它将其绘制为决策地图，然后合并回此流程。

## 决策树

盘问过程将计划作为一棵决策树来遍历，逐个解决决策之间的依赖关系——先确定父级决策，再处理依附于它的子级选项。目的不是快速达成一致；而是让每个隐式决策都变得显式，这样就没有重要的东西被默默地假定。你最终得到的是一个所有分支都已被遍历过的计划。

`grill-me` 是**无状态的**：它不写入任何内容，也不在工作区留下任何痕迹。它可以在任何地方运行，唯一的产物是对话本身中被锐化了的理解。这与 [grill-with-docs](https://aihero.dev/skills-grill-with-docs) 形成了刻意的对比，后者将同样的盘问过程捕捉为持久的 ADR 和术语表。

## 它的定位

`grill-me` 是一项可以随时使用的独立工具——你在计划需要敲定之前运行的构建前压力测试。它是 [grilling](https://aihero.dev/skills-grilling) 原语的无状态、用户调用的前端入口；它的近邻是 [grill-with-docs](https://aihero.dev/skills-grill-with-docs)，其有状态的兄弟执行相同的盘问，但额外将决策记录为 ADR 和术语表。如果最终结果是想要写下来的规范，交给 [to-spec](https://aihero.dev/skills-to-spec)，它会将已确定的综合理解转变为 spec，而无需重新盘问你。当你不确定适合哪种流程时，[ask-matt](https://aihero.dev/skills-ask-matt) 会为你指引方向。
