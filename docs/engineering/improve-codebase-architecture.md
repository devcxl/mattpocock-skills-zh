## 它的作用

`improve-codebase-architecture` 勘察一个代码库寻找**加深（deepening）机会**：浅模块（接口几乎和它隐藏的东西一样复杂）能变成深模块的地方。它把这些机会写成一份自包含的 HTML 报告，然后通过 [盘问（grilling）](https://www.aihero.dev/ai-coding-dictionary/grilling) 陪你过一遍你挑的那一个。

它从不改动代码。整个跑动只产出 OS 临时目录里的一个 HTML 文件和一段对话；真正的重构发生在后面的一次独立 [session](https://www.aihero.dev/ai-coding-dictionary/session) 里，走正常的构建流程。这正是它是一项勘察、而不是一个重构工具的原因，也是为什么这个技能值得在一个你还没准备好动手的代码库上跑。

两道过滤器防止报告变成泛泛的清理建议。每条候选必须都通过**删除测试**：删掉这个模块会让复杂度被压缩到一个更小的接口之后，还是只是把它散到调用者那边？只有"被压缩"的情况才拿一张牌。除非你把它指向一个具体区域，否则它先读最近的 commit 历史，并把扫描偏向那些在积极变更的路径，理由是对没人动的代码做加深是一项你永远不会兑现的重构。

## 何时使用

你通过键入 `/improve-codebase-architecture` 来调用它；[agent](https://www.aihero.dev/ai-coding-dictionary/agent) 不会主动使用它。

它坐在构建环之外：它不是主环里的一步，而是你周期性运行、来把更多改善代码库的工作排进队列的东西。它的四种典型使用场景：

| 场景 | 用法 |
| --- | --- |
| 例行维护 | 每隔几天或一有空闲就跑它，防止结构在功能之间悄悄腐烂 |
| 在一次大构建之前 | 把它指向 [spec](https://www.aihero.dev/ai-coding-dictionary/spec)："我们怎么能让这次变更更轻松？"——这是对它最有效的提示 |
| 棕地审计 | 在一个大型、无结构、或 [vibe-coded](https://www.aihero.dev/ai-coding-dictionary/vibe-coding) 的仓库上跑它，搞清楚它实际的形状 |
| 遗留测试工作 | 在针对不可测代码写测试之前，先用它找到缺失的接缝 |

容易与近邻混淆的地方：

- 为一个你已经选好的模块做设计，用 [codebase-design](https://aihero.dev/skills-codebase-design)：那是工作台，这个是找出把什么摆上台面的勘察。
- 为一个一次会话装不下的整体工作量，用 [wayfinder](https://aihero.dev/skills-wayfinder)。
- "某个具体的东西坏了"，用 [diagnosing-bugs](https://aihero.dev/skills-diagnosing-bugs)。当真正的发现是没有合适的接缝钉住 bug 时，它会交回这里。

## 先决条件

运行它没有先决条件。它读 `CONTEXT.md` 和 `docs/adr/` 下的任何 ADR（如果存在的话），用你领域自己的名词说话：有的话，候选会读作"加深 Order intake 模块"，而不是"重构 FooBarHandler"。

它写两个地方。报告写到 `<tmpdir>/architecture-review-<timestamp>.html`，在仓库之外。在盘问循环中，它会增补或打磨 `CONTEXT.md` 里的术语（如果文件不存在则创建），并提议把一条被拒绝的候选记录为 ADR，这样未来的运行不会再次建议它。

## 深度，以及那份猎取它的报告

这个技能围绕一个想法转动：**深度（depth）**。一个深模块在小而稳定的接口背后塞进大量行为。一个浅模块则透过一个几乎和底下代码一样宽的接口泄漏自己的实现。报告以三种形式猎取浅：仅为可测性而抽出、真正的 bug 活在它们被调用的方式里的纯函数（没有**局部性**）、跨**接缝**泄漏的模块，以及一个你不开五个文件就读不懂的概念。结尾附一份把浅修成深的提议。

每条候选是一张牌：涉及的文件、摩擦点、一份平实英语的解法、以**局部性**和**杠杆**陈述的收益、一份前后对照图、以及一枚强度徽章。

| 徽章 | 对你的含义 |
| --- | --- |
| `Strong` | 删除测试清楚通过，且摩擦是真实的。认真对待这些。 |
| `Worth exploring` | 看起来合理的加深，但回报取决于代码接下来会往哪里去。 |
| `Speculative` | 出于完整性而列出。这些大多数可以放心忽略。 |

报告以**Top recommendation**（它会先攻的那一个）结尾，然后技能停下并问你想要探索哪条候选。到此为止什么都没决定，也没动一行代码。

## 你挑了之后会发生什么

挑一条候选会就它开启一次 [盘问（grilling）](https://www.aihero.dev/skills-grilling) 会话：约束条件、接缝背后是什么、哪些测试能挺过来、加深后的接口应该长什么样。那次会话的输出是一个决策，而不是一份 diff。从那里起，正常流程接管：[to-spec](https://aihero.dev/skills-to-spec) 产出文档，[implement](https://aihero.dev/skills-implement) 做那次重构。这一道顺序——勘察、决策、规格、实现——是这个技能自身存在的原因。

## 常见问题

**每条候选都打开一个浏览器页面吗？**

不。报告是一份静态 HTML。它由一次 `git ls-files` 和几条 `Read` 写出来，没有 Playwright、没有 dev server、也没有无头浏览器。它在你的浏览器里打开只是因为你双击了它；技能本身从来没启动过浏览器。

**它会留下任何持久化的东西吗？**

只有 `CONTEXT.md` 和（如果你接受了那条提议）`docs/adr/` 下的一个 ADR。报告在临时目录里，OS 重启就没了——这正是它为什么不承担任何 git 状态的原因。

**我能一次性跑多个，或者在同一个会话里挑多个吗？**

一次会话一条候选。在一次对话里走几条会把 [context window](https://www.aihero.dev/ai-coding-dictionary/context-window) 装满：报告、盘问、domain-model 编辑和代码改动全堆在一起。报告只活在临时文件里，所以带上候选本身、而不是那份文件：挑一条、盘它、把决策带进 `/to-spec`，并把剩下的转成你可以独立捡起的 [tickets](https://www.aihero.dev/ai-coding-dictionary/ticket)。把挑好的改善写进 spec，而不是直接进实现。这是一个反复出现的问题，技能自身没有文档化的流程。

**我该怎么给它提示？**

心里挂着你要构建的下一样东西。当一次大构建要来时，把它指向 spec 问"我们怎么能让这次变更更轻松？"一次没提示的跑动会自己扫描热点，这对例行维护没问题，但指明方向才是让报告可执行的关键。

**它在一个大型遗留代码库上能行吗？**

部分能。它在缺少一致结构的大型既有代码库上很强，并且是一次性结构搭建之后推荐的维护机制。诚实的反作用力：项目真的失控的用户报告"帮了一点忙，但还是不够"，一个在八年遗留代码库上工作的开发者报告 model 原地打转，而同一个技能在一个干净的仓库上产出一张清晰的图。这个场景还没有专门的 `/refactor` 技能。如果代码库根本没有共享词汇表，先 [grill-with-docs](https://aihero.dev/skills-grill-with-docs) 建立一套，往往会让这个技能的输出好得多。

**这和 `/codebase-design` 有什么不同？**

`/codebase-design` 是参考，而不是会话驱动器。它提供词汇（module、interface、depth、seam、adapter、leverage、locality），这个技能借用它。把一次全新的 agent 指向 `/codebase-design`、把它当作要做的事，是一个已知失败：它自己没有流程可走，于是 agent 编造一个，重新探索代码，并在问你任何东西之前跑上很久。用这个技能来驱动；用那个来消费。

**它会说代码库没问题吗？**

很少，你应该提前知道这一点。技能被构建为产出发现，所以叙述会把它推向产出候选，而不是得出"什么都没问题"的结论。强度徽章就是那道防线：一份所有候选都是 `Speculative` 的报告，就是这个技能在用它知道的唯一方式告诉你它什么也没找到。

**它能在 Codex 或其他 harness 里工作吗？**

部分能。探索这一步直接点了 Claude Code 的 `Agent` 工具并指定 `subagent_type=Explore`，所以一个没有那个工具的 [harness](https://www.aihero.dev/ai-coding-dictionary/harness) 可能会跳过并行探索，而不是用自家工具替代。技能仍能跑；只是扫描没那么彻底。一次与 harness 无关的重写被提议过，但未合并。

**我到底该怎样在 TypeScript 里实现深模块？**

随技能发布的没有好答案。反复出现的请求是一份给出具体文件与模块布局的 `TYPESCRIPT.md`，它并不存在。技能会告诉你加深应该放在哪里、接缝背后应该有什么；把它翻译成包或目录结构目前是你自己的事。

## 怎样算成功

- 候选点名你领域的概念，而不是凭空发明的类名："Order intake 模块"，而不是 "FooBarHandler"。
- 候选集中在最近被你编辑过的文件里，而不是仓库里沉睡的角落。
- 跑动期间没有一行代码被改动。唯一的新文件是临时目录里的那份 HTML 报告。
- 它在报告之后停下并问你要哪条候选，而不是自己继续。
- 每张牌把收益解释成局部性或杠杆，并说哪些测试会变得更简单，而不是仅仅"这更干净"。
- 因为一个经得起时间考验的理由拒绝一条候选，会换来一份记录 ADR 的提议，这样下次跑动就不会再建议它。

## 它的定位

`improve-codebase-architecture` 是**周期性维护**：每隔几天跑一次，在任何链之外，把工作排进队列而不是动手做。它的邻居是 [codebase-design](https://aihero.dev/skills-codebase-design)——占着每条候选都用以撰写的 depth-and-seam 词汇；[盘问（grilling）](https://aihero.dev/skills-grilling)——在你挑了一条候选之后走决策树；以及 [domain-modeling](https://aihero.dev/skills-domain-modeling)——在决策敲定时保持 `CONTEXT.md` 和 ADR 是最新的。它产出的是一份想法，经由 [grill-with-docs](https://aihero.dev/skills-grill-with-docs) 或 [to-spec](https://aihero.dev/skills-to-spec) 重新进入主构建流程。哪个技能适合某场景时，[ask-matt](https://aihero.dev/skills-ask-matt) 是整套技能的路由器。