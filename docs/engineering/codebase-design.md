## 它的作用

`codebase-design` 固定你设计模块时使用的词汇：**模块（module）**、**接口（interface）**、**深度（depth）**、**接缝（seam）**、**适配器（adapter）**、**杠杆（leverage）**、**局部性（locality）**。它精确地定义每一个，禁用含糊的替代词（"component"、"service"、"API"、"boundary"），并陈述由它们推出的那几条原则。

它是参考，不是流程。没有要跑的循环、不产出任何工件、没有向你提问的检查点。其他每一个涉及设计的技能都借用它的词汇；单独使用时，它把语言给你就停下。这是你调用它之前要知道的事，因为一个没有流程、没有停止规则的技能，如果你把一个 [session](https://www.aihero.dev/ai-coding-dictionary/session) 指向它并说"开始"，它会即兴编出一个——见下面常见问题里它在实践中长什么样。

## 何时使用

键入 `/codebase-design`，或者当设计任务合适时，agent 会自动使用它。

当你已经知道自己在重新设计哪段代码、需要思考它的形状时使用它：接缝放哪里、接口能缩到多小、一次抽取是否值得。它也用来平息关于某个词含义的争论。

有几个技能和它很接近。你要哪个取决于实际问题是什么：

| 问题 | 技能 |
|---|---|
| 单个模块的形状——它的接口、它的接缝、它的深度 | `codebase-design` |
| *领域的话术*——"account" 有三个意思，两个人对 "cancellation" 的理解不同 | [domain-modeling](https://aihero.dev/skills-domain-modeling) |
| 你还不知道*该*重新设计哪个模块 | [improve-codebase-architecture](https://aihero.dev/skills-improve-codebase-architecture)（找出候选的勘察） |
| 你想要设计被盘问，而不只是被命名 | [grilling](https://aihero.dev/skills-grilling) |
| 有一个具体的行为了要构建，你想要能扛住重构的测试 | [tdd](https://aihero.dev/skills-tdd) |

## 词汇表

词汇表就是这个技能。每个术语都对照其他术语定义，而且每个都带着它取代的词。

| 术语 | 含义 | 别说 |
|---|---|---|
| **模块（Module）** | 任何有接口和实现的东西。刻意与规模无关——一个函数、一个类、一个包、一个横跨多层的数据切片。 | unit、component、service |
| **接口（Interface）** | 调用者为了正确使用它而必须知道的一切：类型签名，加上不变量、顺序约束、错误模式、所需配置、性能特征。 | API、signature |
| **深度（Depth）** | 接口处的杠杆——调用者或测试每学习一单位接口，能调动多少行为。**深**：小接口背后是大量行为。**浅**：接口几乎和实现一样复杂。 | — |
| **接缝（Seam）** | Michael Feathers 的术语：一个你可以不改动该处代码就能改变行为的地方。它是接口的*位置*，而把它放在哪里是独立于其背后内容的单独决策。 | boundary |
| **适配器（Adapter）** | 在接缝处满足某个接口的具体事物。命名的是角色而非实体——内存 fake 和 Postgres 仓库都是适配器。 | — |
| **杠杆（Leverage）** | 调用者从深度中得到的东西：每单位已学习的接口获得更多能力。 | — |
| **局部性（Locality）** | 维护者从深度中得到的东西：变更、bug 和验证集中在一处。修一次，处处修复。 | — |

深度刻意*不*被定义为实现行数与接口行数之比，那是 Ousterhout 自己的定义。那个度量会奖励注水实现。这里用的是"深度即杠杆"。

## 四条原则

- **深度是接口的属性，不是实现的属性。** 一个深模块内部可以由小的、可替换的部分构建。它们就是不浮到调用者面前。一个模块可以有供自己测试用的内部接缝，以及它接口处的一个外部接缝。
- **删除测试。** 想象删掉这个模块。如果复杂度消失了，那它就是个 pass-through。如果它在 N 个调用者那里重新出现，那它就是值得存在的。
- **接口就是测试面。** 调用者和测试跨越同一条接缝。如果你想测试*越过*接口，那模块的形状就是错的。
- **一个适配器意味着一个假想的接缝。两个适配器意味着一个真实的接缝。** 不要在什么真的在那里变化之前切开一个接缝。单适配器的接缝只是间接。

还有两份支撑文件走得更远，技能按需读取而不是一次性读完。[DEEPENING.md](https://github.com/mattpocock/skills/blob/main/skills/engineering/codebase-design/DEEPENING.md) 把候选的依赖分成四类（进程内、可本地替换的、远程但归属自己的、真正外部的），因为类别决定了加深后的模块如何跨接缝被测试。[DESIGN-IT-TWICE.md](https://github.com/mattpocock/skills/blob/main/skills/engineering/codebase-design/DESIGN-IT-TWICE.md) 来自 Ousterhout——并行生成截然不同的设计，挑一个——这是这个技能被创造之前它所在的、已退役的 `design-an-interface` 的回收物。

## 常见问题

**它会自己开一个会话吗？**

不应该，但有些 agent 这么干，于是有人提了 issue（[#417](https://github.com/mattpocock/skills/issues/417)）。没有循环、没有停止规则，agent 就会即兴编出一个循环——读文件、提议抽取、把它们作为抽取的"理由"展示——这就是为什么 SKILL.md 把"这是一个参考，不是一个流程"摆在显著位置。如果你看到 `/codebase-design` 之后 agent 自行开干了，那就是误解了这份参考资料。如果你计划要一次这样的会话，先自己把要设计的东西写下来，再调用它，让它对照你的草稿点评。

**它和 `/grilling`、`/tdd`、`/improve-codebase-architecture` 有什么不同？**

它们在这份词汇表上协作：grilling 把它当成被盘问的对象，tdd 把它当成接缝处的措辞，improve-codebase-architecture 用它来报告它找到的加深候选。把任意一个角色错配给这个技能都会破事。[Issue #442](https://github.com/mattpocock/skills/issues/442) 描述了一连串的混淆——有人把 `/improve-codebase-architecture` 或 `/tdd` 配合 `codebase-design` 作为词汇表来跑。issue 是开放的。

**`design-an-interface` 去哪了？还有一个 `/interface-design` 技能吗？**

`design-an-interface` 已被移除并吸收进这个技能。什么都没丢：它的"design it twice"技巧（来自 Ousterhout，让并行的子代理生成截然不同的设计）以 `DESIGN-IT-TWICE.md` 的形式搬到这里。另外，有好几个人请求一个专门的 `/interface-design` 技能来承载深模块/薄接口的哲学——那种哲学已经在这里，没有另立一个技能的计划。如果你来找的是这两个名字中的任何一个，那就在这一页。

**这不就是文件结构约定吗，比如文件夹、barrel 文件、feature 切片？**

不是，而且这个技能在反复施压下守住了这条线。[Issue #95](https://github.com/mattpocock/skills/issues/95) 提出把一种形式化的 fractal-tree 文件结构当作深模块的具体实现；回复是两者正交："deep modules are about the design of the interface and accessing through a strict interface, no matter what the file system looks like. It seems perfectly possible that you could have shallow modules with this approach."[#458](https://github.com/mattpocock/skills/issues/458) 也提出了同样的问题："I think you might be tying the concept of modules too closely to the file system. The file system can certainly be a useful hint to the shape of modules, but there's no need to use the file system in the construction of deep modules." 词汇表把 **module** 定义为与规模无关的，正是出于这个原因。

**`tdd` 真的用这套词汇表吗？**

现在用了。很长一段时间它没用。曾经嵌在 `tdd` 内部的 deep-module 注释在 v1.0 被移除，让位给这个共享技能，但替换它们的指针一直没加，所以 `tdd` 自行定义了 "seam"，且什么都没引用。缺口现已补上：指针现在写在技能里，在接口的形状是悬而未决的问题、而不是测试本身时被调到。`tdd` 仍然把 "seam" 占作你*测试*的那道边界；这个技能占的是它背后的模块形状。

**`design-it-twice` 模式在 Claude Code 之外能用吗？**

用得不干净。`DESIGN-IT-TWICE.md` 写着 "spawn 3+ sub-agents in parallel using the Agent tool"，那是 Claude Code 的 [tool](https://www.aihero.dev/ai-coding-dictionary/tool) 用 Claude Code 的名字。仓库为其他 [harness](https://www.aihero.dev/ai-coding-dictionary/harness) 提供元数据，包括 Codex，那些可能在那个名下什么都暴露不出来，所以并行设计阶段没有技能元数据看起来那么可移植。在 [issue #564](https://github.com/mattpocock/skills/issues/564) 跟踪，开放的。

**我能把 connascence、module secrets、[progressive disclosure](https://www.aihero.dev/ai-coding-dictionary/progressive-disclosure) 这样的概念加进词汇表吗？**

有人恰好这样提过。[Issue #180](https://github.com/mattpocock/skills/issues/180) 把 Parnas 的 module secrets 和 Page-Jones 的 connascence 加成一份命名层，用来指代*什么*跨接缝泄漏了，附了一份可工作的 diff；[issue #303](https://github.com/mattpocock/skills/issues/303) 提出在实现内部做 progressive disclosure，让一个公共接口很深的模块不是底下那块未分化的石板。两者都开放、未合并。词汇表作为发布版是刻意小的，它保持小的理由技能自己也讲了：一致的语言就是一切，没人用一致的术语比没有术语更糟。

## 怎样算成功

- 设计讨论不再产出"component"、"service"、"boundary"这些词，而开始产出"module"、"interface"、"seam"。
- 有人能指着一份提议的抽取、不打太极地说出它是否通过删除测试。
- 提议的接缝带着第二个被点名的适配器，不只是第一个。
- 对接口的讨论覆盖不变量、顺序和错误模式，不只类型签名。
- 调用它不会开启一次会话。如果 agent 在裸跑 `/codebase-design` 之后就开始读文件、提议重构，那它把参考误认成了驱动器。

## 它的定位

`codebase-design` 是一个**随时可调用的独立技能**，位于工程技能之下的词汇层，不是任何链上的一步。它最近的邻居是 [domain-modeling](https://aihero.dev/skills-domain-modeling)——为*问题域*的话术、而不是模块形状设立的平行参考。两者通常要一起用，因为给一个深模块起好名字需要两者兼具。[improve-codebase-architecture](https://aihero.dev/skills-improve-codebase-architecture) 是另一个：它勘察一个代码库寻找加深候选，并用这份词汇表写每一个候选，所以它找出模块，而这份技能是你设计它的工作台。拿不准哪个技能或流程合适时，[ask-matt](https://aihero.dev/skills-ask-matt) 给你路由。