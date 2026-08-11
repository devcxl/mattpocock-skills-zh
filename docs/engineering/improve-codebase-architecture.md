## 它的作用

`improve-codebase-architecture` 勘察一个代码库寻找**加深机会（deepening opportunities）**——浅模块（接口几乎和它隐藏的东西一样复杂）可以变成深模块的地方——把它们写成一份自包含的 HTML 报告，然后[盘问（grills）](https://www.aihero.dev/ai-coding-dictionary/grilling)你，逐个过你挑中的候选。

它从不改动代码。整个运行只在你操作系统的临时目录里产出一个 HTML 文件加一场对话；重构本身发生在之后，在单独的[会话（session）](https://www.aihero.dev/ai-coding-dictionary/session)里，走正常的构建流程。这正是它成为勘察工具而非重构工具的原因，也是为什么这个技能值得跑在一个你还没准备好动它的代码库上。

两道过滤器让报告不会退化成泛泛的清理建议。每个候选必须通过**删除测试**——移除这个模块会把复杂性集中到更小的接口后面，还是只是把它摊到调用者身上？只有"集中"的案例才挣到一张卡片。而且除非你把它指向特定区域，它会先读最近的提交历史，把扫描偏向正在活跃变化的路径，理由是：在没人碰的代码里加深，是一次你永远不会兑现的重构。

## 何时使用

你通过键入 `/improve-codebase-architecture` 来调用它——[代理（agent）](https://www.aihero.dev/ai-coding-dictionary/agent)不会主动使用它。

它位于构建循环之外——它不是主循环中的一步，而是你定期运行、用来排队更多改善代码库的工作的东西。它被使用的四种情境：

| 情境 | 怎么用 |
| --- | --- |
| 常规维护 | 每隔几天跑一次，或者一有空档就跑，防止结构在功能之间腐烂。 |
| 大型构建之前 | 把它指向 [spec](https://www.aihero.dev/ai-coding-dictionary/spec)："我们怎么让这个变更变容易？"这是对它最有效的提示。 |
| 棕地审计 | 在一个大型、无结构或 [vibe 编码（vibe-coded）](https://www.aihero.dev/ai-coding-dictionary/vibe-coding)的仓库上运行，弄清它实际处于什么形状。 |
| 遗留测试工作 | 在对着不可测代码写测试之前，先用它找出缺失的接缝。 |

它和兄弟们容易混淆的地方：

- 设计一个你已经选定的模块，用 [codebase-design](https://aihero.dev/skills-codebase-design)——那是工作台，这是找出往工作台上放什么的勘察。
- 一次太大、无法在一个会话里容纳的整个工作，用 [wayfinder](https://aihero.dev/skills-wayfinder)。
- "这个具体的东西坏了"，用 [diagnosing-bugs](https://aihero.dev/skills-diagnosing-bugs)。当真正的发现是没有好接缝能锁定 bug 时，它会交回这里。

## 前置条件

运行它没有前置条件。它会读 `CONTEXT.md` 和 `docs/adr/` 里存在的任何 ADR，并在它们存在时用你领域自己的名词说话——一个候选读起来是"加深 Order 录入模块"，而不是"重构 FooBarHandler"。

它写在两个地方。报告去仓库之外的 `<tmpdir>/architecture-review-<timestamp>.html`。在盘问循环期间，它会添加或锐化 `CONTEXT.md` 里的术语（如果文件不存在就创建它），并提议把被否决的候选记录为 ADR，这样未来的运行不会再次建议它。

## 深度，以及为它而猎的报告

技能围绕一个概念运转：**深度（depth）**。深模块把大量行为放在一个小而稳定的接口后面。浅模块通过一个几乎和底下代码一样宽的接口泄漏它的实现。报告就是对浅的猎捕——只为了可测试性而抽取的纯函数，而真正的 bug 活在它们如何被调用上（没有**局部性（locality）**）、跨**接缝（seam）**泄漏的模块、一个不开五个文件就理解不了的概念——以及对修复它的加深方案的提议。

每个候选是一张卡片：涉及的文件、摩擦点、平实的英语方案、以**局部性**和**杠杆（leverage）**陈述的收益、一张前后对比图、一个强度徽章。

| 徽章 | 对你的意义 |
| --- | --- |
| `Strong`（强） | 删除测试清晰通过，摩擦是真实的。认真对待这些。 |
| `Worth exploring`（值得探索） | 有道理的加深，但收益取决于代码接下来往哪走。 |
| `Speculative`（推测性） | 为完整性而浮出。这些大多可以放心忽略。 |

报告以一条**首要推荐（Top recommendation）**收尾——它会最先处理的那个——然后技能停下，问你想探索哪个候选。到那时还没有任何东西被决定，也没有任何代码动过。

## 你挑中一个之后会发生什么

挑中一个候选会开启一场关于它的[盘问（grilling）](https://aihero.dev/skills-grilling)会话：约束、接缝背后有什么、哪些测试能幸存、加深后的接口应该长什么样。那场会话的输出是一个决策，不是 diff。从这里起走正常流程——把决策带进 [to-spec](https://aihero.dev/skills-to-spec)，然后 [to-tickets](https://aihero.dev/skills-to-tickets)，然后 [implement](https://aihero.dev/skills-implement)。

## 常见问题

**它围绕一个想法盘问了我一个小时，而不是给我看选项。能关掉吗？**

能——调用时说出来（"别盘问我，只给我看报告"）。这是这个技能最响亮的抱怨。一位用户说得直白：他喜欢它作为"获得改进的彻底分析的一种便捷方式"，而在盘问循环被加入后觉得它"近乎不可用"，报告了它会提出单一方案、然后问"几十甚至几百个问题"的会话。设计意图是报告在前，盘问只在你选中的候选上开始，但较弱的[模型（model）](https://www.aihero.dev/ai-coding-dictionary/model)会直接跳去采访你关于它们想到的第一个想法。那个帖子里按模型划分的报告差异很大，而且这是一个未决 issue——技能还没有记录在案的无盘问模式。

**报告以无样式的原始 HTML 打开，没有图表。发生了什么？**

报告从 CDN 加载 Tailwind 和 Mermaid，所以打开时需要网络访问，而当有东西阻止这些脚本时它会无声地坏掉。提交的案例是一个要求 SRI 哈希的安全钩子：代理加上了哈希，CDN 提供给浏览器的字节与用来计算哈希的 `curl` 得到的不同，浏览器就阻止了脚本。离线和锁定环境撞上同一堵墙。代理看不到这一点，因为它从不渲染页面。变通办法是要求内联 CSS 和手绘 SVG 图，而不是 CDN 脚手架。这是一个未决 issue，也是一条真实的粗糙边缘。

**它给了我十二个候选。我在同一个会话里逐个做，还是开新的？**

每个会话一个候选。在一个对话里逐个做完，会同时把报告、盘问、领域模型编辑和代码变更一起塞满[上下文窗口（context window）](https://www.aihero.dev/ai-coding-dictionary/context-window)。报告只活在临时文件里，所以要携带候选本身而不是文件：挑一个、盘问它、把决策带进 `/to-spec`、把其余的变成你以后能独立捡起的 [tickets](https://www.aihero.dev/ai-coding-dictionary/ticket)。把选中的改进放进 spec，而不是直奔实现。这是一个反复出现的问题，技能本身没有记录在案的工作流。

**我该怎么给它提示？**

带着你接下来要构建的东西。当大型构建即将到来时，把它指向 spec 并问"我们怎么让这个变更变容易？"没有提示的运行会自行扫描热点，对常规维护没问题，但点名一个方向才是让报告可执行的东西。

**它在大型遗留代码库上有效吗？**

部分有效。它在缺乏一致结构的大型现有代码库上很强，也是任何一次性结构搭建之后推荐的维护机制。诚实的另一面：真正失控项目的用户报告它"有点帮助，但似乎还是不够"，一位拥有八年遗留代码库的开发者报告模型在原地打转，而同一个技能在整洁的仓库上能产出干净的图。目前还没有针对那种情况的专门 `/refactor` 技能。如果代码库完全没有共享词汇，先用 [grill-with-docs](https://aihero.dev/skills-grill-with-docs) 建立一份，往往能让这个技能的输出好得多。

**这和 `/codebase-design` 有什么不同？**

`/codebase-design` 是参考，不是会话驱动。它提供词汇——module、interface、depth、seam、adapter、leverage、locality——而这个技能借用它。把一个全新代理指向 `/codebase-design` 当作要"做"的东西是一个已知的失败：因为没有自己的流程可循，代理会发明一个、重新探索代码、跑很久才问你任何事。用这个技能驱动；消费那个技能。

**它会告诉我代码库没问题吗？**

很少，而且你进去之前就该知道。技能是为输出发现而构建的，所以框架会把它推向产出候选，而不是得出结论说什么都没问题。强度徽章是防线——一份所有东西都是 `Speculative` 的报告，就是技能以它唯一知道的方式告诉你：它什么也没找到。

**它在 Codex 或其他 harness 里有效吗？**

部分有效。探索步骤直接点名 Claude Code 的 `Agent` 工具并带 `subagent_type=Explore`，所以没有那个工具的 [harness](https://www.aihero.dev/ai-coding-dictionary/harness) 可能会跳过并行探索，而不是用自己替代。技能仍然会跑；只是扫描没那么彻底。一个 harness 中立的改写已被提议，但未合并。

**我到底怎么在 TypeScript 里实现深模块？**

技能没有随附好答案。反复出现的请求是一份 `TYPESCRIPT.md`，为这些原则给出具体的文件和模块布局，它不存在。技能会告诉你加深该落在哪里、接缝后面应该有什么；把它翻译成包或目录结构，目前靠你自己。

## 怎样算成功

- 候选点名你领域的概念，而不是发明的类名——"Order 录入模块"，而不是"FooBarHandler"。
- 候选聚集在你最近编辑过的文件里，而不是仓库沉睡的角落。
- 运行期间没有代码被改动。唯一的新文件是你临时目录里的 HTML 报告。
- 它在报告之后停下，问你要哪个候选，而不是自行继续。
- 每张卡片把收益解释为局部性或杠杆，并说出哪些测试会变简单——而不只是"这更干净"。
- 因为一个持久的原因否决候选，会得到记录 ADR 的提议，这样下一次运行不会再次建议它。

## 它的定位

`improve-codebase-architecture` 是**定期维护**——每隔几天跑一次，在任何链条之外，用来排队工作而不是做工作。它的邻居是 [codebase-design](https://aihero.dev/skills-codebase-design)——拥有每个候选都以之书写的深度与接缝词汇；[grilling](https://aihero.dev/skills-grilling)——在你选定候选后走决策树；以及 [domain-modeling](https://aihero.dev/skills-domain-modeling)——在决策落定时让 `CONTEXT.md` 和 ADR 保持最新。它产出的是一个想法，在 [grill-with-docs](https://aihero.dev/skills-grill-with-docs) 或 [to-spec](https://aihero.dev/skills-to-spec) 处重新进入主构建流程。哪个技能适合某个情境，[ask-matt](https://aihero.dev/skills-ask-matt) 是覆盖整个集合的路由器。
