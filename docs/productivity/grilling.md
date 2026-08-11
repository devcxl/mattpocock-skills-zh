## 它的作用

`grilling` 是在任何人付诸行动之前，对计划、决策或想法进行压力测试的访谈循环。它将主题映射为一棵**设计树（design tree）**——每个决策都会分支出一系列依赖它的子决策——然后逐分支访谈，直到没有任何东西被默默假设。

它不会一次只问一个问题，也不会一次全问。每一**轮（round）**问整个**前沿（frontier）**：所有前提已确定的决策，仅此而已。两个问题若存在依赖关系，绝不会出现在同一轮——某个问题的答案依赖一个仍悬而未决的答案时，它属于更晚的轮次。你的回答确定决策，前沿向外扩展，下一轮再问被解锁的问题。十三个问题通常在大约三轮内问完，而不是十三轮。

## 何时使用

输入 `/grilling`，或当任务匹配时由 [agent](https://www.aihero.dev/ai-coding-dictionary/agent) 自行选用。它是 grilling 家族中唯一由模型调用的 [skill](https://www.aihero.dev/ai-coding-dictionary/skill)，这也是你很少直接输入它的原因：通常是你*确实*输入的那个技能在替你运行它。

直接输入 `/grilling` 得到的就是纯访谈，没有其他。当你需要更多时：

| 你的情况 | 使用 |
| --- | --- |
| 你不在工作目录中 | [grill-me](https://aihero.dev/skills-grill-me) — 同一个 [session](https://www.aihero.dev/ai-coding-dictionary/session)，但挂在一个 agent 永远不会自行触发的名字下 |
| 你在工作目录中 | [grill-with-docs](https://aihero.dev/skills-grill-with-docs) — 同一个会话，并且边进行边写 `CONTEXT.md` 和 ADR |
| 一个太大、一个会话装不下的工作 | [wayfinder](https://aihero.dev/skills-wayfinder) — 它绘制地图，并在决策 ticket 内部运行 grilling |
| 一个靠谈话无法解决的问题——某事应该长什么样或感觉如何 | [prototype](https://aihero.dev/skills-prototype) — 先构建可抛弃的版本，再回来 |
| 你自己的技能需要一次访谈 | 从它内部调用 `/grilling`，而不是另写一套访谈 |

## 轮次、前沿，以及谁来做决策

三个概念承载了整个技能。

**设计树（design tree）**是主题的模型：决策挂着决策。**前沿（frontier）**是所有前提已确定的决策集合——目前唯一能诚实提出的问题。**一轮（round）**是一个前沿，完整地问出，完整地答完。

一轮之内，每个问题都有固定形状：以 `❓` 开头编号并命名，然后是正文，最后是单独一行的 agent 推荐答案（`➡️`）。正是这个格式让一轮可以按编号回答——"1 同意，2 选第二个选项，3 不同意，原因如下"——而不是把问题原样复述回去。这个格式有一个已知的粗糙边：推荐有时会*反对*问题本身的措辞，所以同意推荐意味着对问题回答"否"。遇到这种情况，回答推荐并说明即可。

设计的另一半是事实与决策的分离。事实是技能自己的工作：当前沿问题需要 [environment](https://www.aihero.dev/ai-coding-dictionary/environment) 能解决的东西时，它派一个 [sub-agent](https://www.aihero.dev/ai-coding-dictionary/subagent) 去查，而不是问你。它不会为此阻塞——只有正在进行探查的下游问题需要等待。决策是你的，它必须等。一个运行 `grilling` 却替用户回答自己决策的 agent 是破坏了技能，而不是灵活解读。当前沿为空时会话结束，并且在你确认达成共识之前，它不会按已商定的内容行动。

诚实的局限：前沿是 agent 的判断，不是计算出来的图。它可能把两个问题放进同一轮，之后才发现一个答案本应改变另一个。除了告诉它之外没有别的防护——下一轮会重新打开受影响的支线。

## 什么留在这里，什么留给封装

本页覆盖机制本身。人们最常想要的东西记录在上一层。

| 问题 | 在哪里解答 |
| --- | --- |
| 树、前沿、轮次、问题格式、事实与决策 | 本页 |
| 会话应该跑多久、对无法靠谈话回答的问题怎么办、如何避免点头附和 | [grill-me](https://aihero.dev/skills-grill-me) |
| 什么写入 `CONTEXT.md`、什么成为 ADR | [grill-with-docs](https://aihero.dev/skills-grill-with-docs) |

## 常见问题

**能不能回到一次只问一个问题的模式？**
可以，而且相当一部分用户就是这样做的。在你的全局 `CLAUDE.md` 里加一行：

```
When grilling, ask one question at a time.
```

基于轮次的默认模式确实有争议。阅读慢的人、用第二语言工作的人、以及把顺序格式当作专注脚手架的人，都反馈一次一个问题对他们更好，而这个退出通道是被支持而非被容忍的。

**`/batch-grill-me` 去哪了？**
并入了这个技能。基于轮次的提问曾短暂作为独立技能发布，然后移入 `grilling` 本身，于是所有构建在它之上的东西——`grill-me`、`grill-with-docs`、`triage`、`wayfinder`——立刻都获得了它。没有需要安装的 `batch-grill-me`，也没有独立的顺序技能；上面那行 `CLAUDE.md` 就是回到一次一个问题的路径。

**一轮全问，肯定会丢掉我早先回答本会引出的问题，不是吗？**
这是对轮次设计最常见的反对意见，而前沿就是答案：一轮只包含互不依赖的问题，所以一轮中的任何回答都不可能推翻该轮中的另一个问题。回答仍然重塑下游的一切——下一轮是重新计算的，而不是预先写好的。你失去的东西比"所有问题一次问"所暗示的要小，比"什么都没失去"要大：见上文前沿的局限。

**它问完了问题，然后开始动手构建了。**
确认门禁正是为此而设：当前沿清空时技能并未结束，当你说共识已达成时才算结束。更弱更快的 [model](https://www.aihero.dev/ai-coding-dictionary/model) 仍然会破坏它——这在低档或非前沿模型上报告最多，它们会把"访谈直到达成共识"塌缩成几个问题加一个大纲。如果你的模型这样，可靠的修复是在你自己的 `AGENTS.md` 或 `CLAUDE.md` 里加一行，告诉 agent 未经许可不得实现。

**它自己回答了问题，而不是问我。**
那是运行中的 bug，不是预期行为，也是技能文本把事实与决策分开的原因。它最常出现在另一个技能以"解决这个 ticket"的框架运行 `grilling` 时——周围的任务被读作继续推进的许可。同样的约束也是没有异步模式的原因：人们要求过一种变体，读取 GitHub issue 并发布一份整合的决策备忘录，但那是另一个技能，因为一个无人回答的 grilling 会话产出的是 agent 的意见，而不是你的。

**能不能限制问题数量？**
不能，上限被刻意排除在范围之外。有些计划需要三个问题，有些需要五十个；固定上限要么截断困难案例，要么在简单案例上显得武断。用平实的语言引导才是预期的控制方式——告诉它收尾，或者就地停下接受当前计划。如果会话运行很久，原因通常是范围太大；把工作拆开，逐个 grilling。

**我只装了 `grill-me`，什么反应都没有。**
`grill-me` 是一个单行技能，整个正文就是"运行一次 `/grilling` 会话"，所以它也需要安装本技能。`grill-with-docs` 同理，它还需要 [domain-modeling](https://aihero.dev/skills-domain-modeling)。整套安装可以避免这个问题；选择性安装意味着也要装上原语。

**`grill-with-docs` 运行了，但从未加载 `grilling`。**
一个真实且未修复的粗糙边，跨 [harness](https://www.aihero.dev/ai-coding-dictionary/harness) 和模型都有报告：一个技能点名另一个技能并不能可靠地让那个技能加载，而 `grill-with-docs` 点名了两个。征兆是一次问完所有问题且不带推荐——那是模型即兴访谈，而不是在运行本技能。直接问 agent 是否加载了 `grilling` 和 `domain-modeling`，通常能恢复。

## 工作正常的标志

- 一轮以编号列表形式到达，每个问题带单独 `➡️` 行的推荐，你可以按编号回答整轮。
- 一轮中的任何问题都不需要同轮中另一个问题先被回答。
- 后续轮次问出了第一轮问不出的东西。
- 它会去查事实——读文件、派子代理——而不是问你它能自己查到的内容。
- 后台运行的研究不会卡住轮次；只有依赖它的问题会等待。
- 它在结束时停下来，请你确认共识已达成，而不是开始工作。
- 问题数保持高位，轮次数保持低位。

## 它处于什么位置

`grilling` 是一个**原语（primitive）**，不是你要排期的步骤：访谈技术的唯一真实来源，集中维护在一处，让每个需要访谈的技能都伸手拿它而不是自创一套。[grill-me](https://aihero.dev/skills-grill-me) 和 [grill-with-docs](https://aihero.dev/skills-grill-with-docs) 是它的两个用户调用入口，`grill-with-docs` 是主构建链的起点，位于 [to-spec](https://aihero.dev/skills-to-spec) 之前。[wayfinder](https://aihero.dev/skills-wayfinder) 运行它来解决决策 ticket，[triage](https://aihero.dev/skills-triage) 用它把模糊的报告拷问成可执行的任务，[improve-codebase-architecture](https://aihero.dev/skills-improve-codebase-architecture) 在你选定候选后用它走查决策树。当你不确定哪个入口合适时，[ask-matt](https://aihero.dev/skills-ask-matt) 会为你路由。
