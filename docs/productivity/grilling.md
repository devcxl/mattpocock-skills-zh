## 它的作用

`grilling` 是一种访谈循环，在任何人动手之前对一个计划、决策或想法进行压力测试。它把对象映射为一棵**设计树**：每个决策分支出一系列挂在它下面的决策：然后逐分支访谈，直到没有任何东西被默默假设。

它不是一次问一个问题，也不是一次性全部问完。每一**轮**问整个**前沿**：所有前提已确定的决策，仅此而已。两个相互依赖的问题绝不会在同一轮中：一个还悬而未决的问题属于之后的轮次。你的回答确定决策，前沿向外推进，下一轮问"这解锁了什么"。十三个问题通常落在三轮左右，而不是十三轮。

## 何时使用

键入 `/grilling`，或者当任务契合时 [agent](https://www.aihero.dev/ai-coding-dictionary/agent) 会自己触发它。它是 grilling 系列中唯一被模型调用的 [skill](https://www.aihero.dev/ai-coding-dictionary/skill)，这也是你很少直接键入它的原因：通常是某个你*确实*键入了的技能在替你运行它。

直接键入 `/grilling` 让你得到一个干净的访谈，仅此而已。当你想做点别的：

| 你有什么 | 用什么 |
| --- | --- |
| 你不在某个工作目录里 | [grill-me](https://aihero.dev/skills-grill-me)：同一个 [session](https://www.aihero.dev/ai-coding-dictionary/session)，名字不同：agent 不会主动触发 |
| 你在某个工作目录里 | [grill-with-docs](https://aihero.dev/skills-grill-with-docs)：同一个 session，它会一边访谈一边写 `CONTEXT.md` 和 ADR |
| 一项工作大到一次 session 装不下 | [wayfinder](https://aihero.dev/skills-wayfinder)：它画一张地图，然后在决策 ticket 里跑 grilling |
| 一个无法靠谈话解决的问题：某样东西应该长什么样、感觉如何 | [prototype](https://aihero.dev/skills-prototype)：先做出可丢弃的版本，再回来 |
| 你自己的某个技能需要访谈 | 在它里面触发 `/grilling`，而不是另写一份访谈 |

## 轮、前沿，以及谁来决策

三个想法承载着整个技能。

**设计树**是对对象的建模：决策及其挂着的决策。**前沿**是所有前提已确定的那一组决策：这是当下唯一可以诚实提出的问题。一**轮**就是一个完整的前沿，整轮问完，整轮答完。

每一轮里所有问题都按固定格式呈现：编号、带标题，前面是 `❓`，正文，然后是 agent 的推荐答案独占一行 `➡️`。这正是为什么一轮可以按编号回答："1 是的，2 选第二个，3 不要，原因是……"：而不是把问题原文抄回。这个格式有一个已知的粗糙边角：有时推荐答案会*反对*问题本身的措辞，于是同意推荐答案意味着对问题回答"不"。遇到这种情况，按推荐答案作答并说明。

设计的另一半是事实与决策的拆分。**事实**是技能自己的工作：当一个前沿问题需要 [environment](https://www.aihero.dev/ai-coding-dictionary/environment) 能确认的东西时，它派一个 [sub-agent](https://www.aihero.dev/ai-coding-dictionary/subagent) 去找，而不是问你。它不会因此阻塞：只有那些下游依赖这次探查的问题需要等子代理报告：前沿的其余部分现在就问。**决策**是你的，它必须等你。一个跑 `grilling` 的 agent 自己回答决策，那是它破坏了技能，而不是灵活理解。session 在前沿为空时结束，而在用户确认你们已经达成共识之前，它不会基于你同意的内容动手。

诚实的局限：前沿是 agent 的判断，不是算出来的图。它可能把两个问题放进同一轮，事后才发现其中一个的答案本应改变另一个。除了你指出来，没有别的防御：这会在下一轮重新打开受影响的分支。

## 这里覆盖什么，包装层覆盖什么

本页覆盖机制本身。人们最常想知道的事在上一层记录。

| 问题 | 在哪里答 |
| --- | --- |
| 设计树、前沿、轮、问题格式、事实与决策 | 这里 |
| 一次 session 应该跑多久、遇到不能靠谈话回答的问题怎么办、如何避免全程点头 | [grill-me](https://aihero.dev/skills-grill-me) |
| 什么会写入 `CONTEXT.md`，什么会成为 ADR | [grill-with-docs](https://aihero.dev/skills-grill-with-docs) |

## 常见问题

**我能退回到一次一个问题吗？**
可以，而且相当一部分受众确实这么做。在你的全局 `CLAUDE.md` 里加这一行：

```
When grilling, ask one question at a time.
```

按轮问的默认设置确实存在争议。读得慢的、用第二语言的、或把顺序格式当作专注脚手架的从业者都报告说"一次一个"对他们更好，这种选择是被支持的，而不是被容忍的。

**`/batch-grill-me` 去哪了？**
并入了这个技能。基于轮的问题曾经以一个独立技能短暂上线，然后被搬进了 `grilling` 本身，这样所有构建在原语之上的东西：`grill-me`、`grill-with-docs`、`triage`、`wayfinder`：一次性都拿到了它。没有 `batch-grill-me` 可装，也没有独立的顺序技能；上面那行 `CLAUDE.md` 就是回到"一次一个"的方式。

**一次问一整轮，那之前回答会引发的问题不就丢了吗？**
这是对轮设计最常见的反对，前沿就是答案：一轮永远只包含彼此不依赖的问题，所以一轮里的任何回答都不会让另一道题作废。回答仍然重塑所有下游：下一轮是重算出来的，不是预先写好的。你失去的，比"一次性全问"暗示的要少；比"什么都没失去"要多：见上面"前沿"的局限。

**它问题问完了，开始构建了。**
存在一个确认门，正是为这种情况准备的：技能在前沿清空时并没有结束，它在你说"我们已经达成共识"时才结束。弱一些、快一些的 [models](https://www.aihero.dev/ai-coding-dictionary/model) 还是会破坏它：这在低投入度或非前沿模型上被报告得最多，它们会把"访谈直到达成共识"压缩成几个问题加一份大纲。如果你的模型这么做了，可靠的修复是在你自己的 `AGENTS.md` 或 `CLAUDE.md` 中加一行，告诉 agent 不要未经允许就动手实现。

**它自己回答了问题，而不是问我。**
这是那次运行的 bug，不是设计上的意图，这也是当初把"事实"和"决策"分开的文字动机。这最常发生在另一个技能在一个"解决这个 ticket"的框架里跑 `grilling` 时，外部任务被读成"继续推进"的许可证。同样的约束也是为什么没有异步模式：有人曾想要一个读 GitHub issue 然后发一份合并决策备忘录的变体：那是另一个技能，因为一场没人回答的 grilling session 产出的只是 agent 的意见，不是你的。

**我能给问题数设个上限吗？**
不能，而且上限被刻意排除在范围之外。有的计划需要三个问题，有的需要五十个；硬上限要么砍掉难题，要么在简单题上显得武断。用自然语言引导才是设计内的控制：告诉它收尾，或者停在那里接受计划。如果一次 session 跑得特别长，原因通常是范围太大；把工作拆开，分别盘问各个部分。

**我单独装了 `grill-me`，结果什么也没发生。**
`grill-me` 是个一句话技能，整个正文就是"运行一次 `/grilling` session"，所以这个技能也得一起装。`grill-with-docs` 也一样，只是它还需要 [domain-modeling](https://aihero.dev/skills-domain-modeling)。装整个集合可以避免这个问题；选择性装则要把原语一起装上。

**`grill-with-docs` 跑了，但它从未加载 `grilling`。**
一个真实存在、尚未修复的粗糙边角，在各 [harnesses](https://www.aihero.dev/ai-coding-dictionary/harness) 和模型上都有报告：一个技能在文案里提到另一个技能，并不能可靠地让那个技能被加载，而 `grill-with-docs` 提到了两个。迹象是一场 session 一次性把所有问题倒出来，且没有附推荐答案：那是模型在即兴访谈，而不是在跑这个技能。直接问 agent 是否加载了 `grilling` 和 `domain-modeling`，通常能恢复。

## 怎样算成功

- 一轮以编号列表到达，每个问题在独立的 `➡️` 行附上推荐答案，你能按编号回答整轮。
- 一轮中没有任何问题需要同一轮里的另一个问题先被回答。
- 后面的轮次会问前一轮无法问的事。
- 它会自己去查事实：读文件、派子代理：而不是问你能查到的东西。
- 后台进行的研究不会让整轮停下来；只有依赖它的那些问题在等。
- 它在结束时停下来，让你确认已经达成共识，而不是开始动手。
- 问题数量高，轮数少。

## 它的定位

`grilling` 是一个**原语**，不是一个排上日程的步骤：访谈技巧的唯一事实来源，留在一个地方，让所有需要访谈的技能都来用它，而不是各自发明一份。[grill-me](https://aihero.dev/skills-grill-me) 和 [grill-with-docs](https://aihero.dev/skills-grill-with-docs) 是它的两个用户调用入口，`grill-with-docs` 是主要构建链的起点，在 [to-spec](https://aihero.dev/skills-to-spec) 之前。[wayfinder](https://aihero.dev/skills-wayfinder) 跑它来解析决策 ticket，[triage](https://aihero.dev/skills-triage) 跑它把一份模糊的报告盘成可执行的，[improve-codebase-architecture](https://aihero.dev/skills-improve-codebase-architecture) 跑它在挑中一个候选之后遍历那棵树。不确定哪个入口合适时，[ask-matt](https://aihero.dev/skills-ask-matt) 给你路由。
