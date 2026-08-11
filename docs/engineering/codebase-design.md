## 它的作用

`codebase-design` 固定你设计模块时使用的词汇：**模块（module）**、**接口（interface）**、**深度（depth）**、**接缝（seam）**、**适配器（adapter）**、**杠杆（leverage）**、**局部性（locality）**。它精确地定义每一个，禁用含糊的替代词（"组件"、"服务"、"API"、"边界"），并陈述由它们推出的那几条原则。

它是参考，不是流程。没有要跑的循环、不产出任何工件、没有向你提问的检查点。其他每一个涉及设计的技能都借用它的词汇；单独使用时，它把语言给你就停下。这是你调用它之前要知道的事，因为一个没有流程、没有停止规则的技能，如果你把一个[会话（session）](https://www.aihero.dev/ai-coding-dictionary/session)指向它并说"开始"，它会即兴编出一个——见下面的问题。

## 何时使用

键入 `/codebase-design`，或者当设计任务合适时，代理会自动使用它。

当你已经知道自己在重新设计哪段代码、需要思考它的形状时使用它：接缝放哪里、接口能缩到多小、一次抽取是否值得。它也用来平息关于某个词含义的争论。

有几个技能和它很接近。你要哪个取决于实际问题是什么：

| 问题 | 技能 |
|---|---|
| 单个模块的形状——它的接口、它的接缝、它的深度 | `codebase-design` |
| *领域的话术*——"account"有三个意思，两个人对"cancellation"的理解不同 | [domain-modeling](https://aihero.dev/skills-domain-modeling) |
| 你还不知道*该*重新设计哪个模块 | [improve-codebase-architecture](https://aihero.dev/skills-improve-codebase-architecture)——找出候选的勘察 |
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

- **深度是接口的属性，不是实现的属性。** 一个深模块内部可以由可互换的小部件构建而成，只是它们不向调用者暴露。一个模块可以有自己测试使用的内部接缝，以及在接口处的一条外部接缝。
- **删除测试。** 想象删除这个模块。如果复杂性随之消失，它就是个透传。如果复杂性在 N 个调用者处重新出现，它就值得保留。
- **接口就是测试面。** 调用者和测试穿过同一条接缝。如果你想测试到接口*之外*，说明模块的形状不对。
- **一个适配器意味着假想的接缝，两个适配器才是真的。** 在确实有东西跨缝变化之前，不要切接缝。单适配器的接缝只是间接层。

两个辅助文件更进一步，技能按需读取而不是预先加载。[DEEPENING.md](https://github.com/mattpocock/skills/blob/main/skills/engineering/codebase-design/DEEPENING.md) 对候选者的依赖分类——进程内、本地可替换、远程但自有、真正外部——因为类别决定了加深后的模块如何跨接缝测试。[DESIGN-IT-TWICE.md](https://github.com/mattpocock/skills/blob/main/skills/engineering/codebase-design/DESIGN-IT-TWICE.md) 会并行拉起[子代理（subagent）](https://www.aihero.dev/ai-coding-dictionary/subagent)，为同一个模块产出三个或更多截然不同的接口，然后在深度、局部性和接缝位置上比较它们。

## 常见问题

**我到底怎么在 TypeScript 里构建一个深模块？**

这是关于这个技能被问得最多的问题，而这个技能不回答它。它定义深模块*是*什么；它完全没说怎么阻止一个乱入的 import 越过接口。[Issue #458](https://github.com/mattpocock/skills/issues/458) 说得很直白："假设我们对接口满意，它隐藏了细节，等等。但我们怎么强制执行？我觉得没有 lint 或清晰的护栏，人类和 LLM 都会随着时间推移把它搞乱。"Matt 在那个帖子里回答了三个选项：把它包进一个类或 IIFE，并接受这个类会变得巨大；把它做成 monorepo 里的一个包，并接受 monorepo 的工具链；或者用 [dependency-cruiser](https://github.com/sverweij/dependency-cruiser) 之类的 linter 禁止绕过接口的 import。他还单独说过 Effect 是最好的机制，dependency-cruiser 次之。仓库的 `in-progress/` 桶里有一个 `setup-ts-deep-modules` 技能，会铺设 `src/packages/<name>/index.ts` 约定，但它是没有文档页的 beta 渠道技能，而且没有随附的 lint 规则。

**我把一个会话指向它，它烧了 10 万 [tokens](https://www.aihero.dev/ai-coding-dictionary/token) 去重新设计我从没问过的东西。**

已知，且已作为 [issue #449](https://github.com/mattpocock/skills/issues/449) 提交。这个技能由模型调用，自我描述为词汇表，但里面没有任何东西硬性阻止代理把它当作可运行的流程。被告知"在 /codebase-design 里继续，推进那些未决决策"后，一个代理伸手去够它能找到的最具行动形状的内容——`DESIGN-IT-TWICE.md` 里的并行子代理——重新探索了之前会话已经测绘过的代码，跑了很远才问任何问题。驱动型技能拥有的护栏（检查点、一次一个问题、不自动推进）这里一个都没有，因为参考没有护栏。变通办法是点名一个驱动型技能，让这个技能垫在它下面：`/grill-with-docs`、`/improve-codebase-architecture` 或 `/tdd`，以 `codebase-design` 作为词汇。这个 issue 还开着。

**`design-an-interface` 去哪了？有 `/interface-design` 技能吗？**

`design-an-interface` 已被移除并吸收进这个技能。什么都没丢：它的"设计两次"技术——并行子代理生成截然不同的设计，源自 Ousterhout——以 `DESIGN-IT-TWICE.md` 的形式随附在这里。另外，好几个人要求一个专门的 `/interface-design` 技能来承载深模块/薄接口的哲学；那个哲学已经在这里了，没有计划单独建技能。如果你来找的是这两个名字中的任何一个，这一页就是。

**这难道不是一种文件结构约定——文件夹、barrel 文件、feature 切片？**

不是，而且技能在反复的质疑下一直守住这条线。[Issue #95](https://github.com/mattpocock/skills/issues/95) 提议把形式化的分形树文件结构作为深模块的具体实现；回复是两者正交——"深模块关乎接口的设计和通过严格接口访问，不管文件系统长什么样。用这种方法完全可能存在浅模块。"同样的话题在 #458 里出现过："我觉得你可能把模块的概念和文件系统绑得太紧了。文件系统当然可以是模块形状的有用提示，但没有必要在构建深模块时使用文件系统。"词汇表刻意把**模块**定义为与规模无关。

**`tdd` 真的用这套词汇吗？**

现在用了。有很长一段时间不用。曾经放在 `tdd` 内部的深模块内联笔记在 v1.0 中被移除，改由这个共享技能承载，但替代它们的指针从未被加上——所以 `tdd` 曾自己定义"seam"，什么也不引用。这个缺口已经补上：指针现在在技能里，当悬而未决的问题是接口的形状而非测试时会被触达。`tdd` 仍然拥有"接缝"——你*在测试处*的边界；这个技能拥有它背后的模块形状。

**设计两次的模式在 Claude Code 之外能用吗？**

不干净。`DESIGN-IT-TWICE.md` 写着"使用 Agent 工具并行生成 3+ 个子代理"，这是 Claude Code 用 Claude Code 的名字称呼的[工具（tool）](https://www.aihero.dev/ai-coding-dictionary/tool)。仓库为其他 [harness](https://www.aihero.dev/ai-coding-dictionary/harness)（包括 Codex）随附了元数据，而那些 harness 可能不提供这个名字下的任何东西——所以并行设计阶段的可移植性不如技能元数据所暗示的。记录在 [issue #564](https://github.com/mattpocock/skills/issues/564)，开着。

**我能往词汇表里加自己的概念吗——共变（connascence）、模块秘密、[渐进式披露（progressive disclosure）](https://www.aihero.dev/ai-coding-dictionary/progressive-disclosure)？**

人们恰恰提议过这些。[Issue #180](https://github.com/mattpocock/skills/issues/180) 把 Parnas 的模块秘密和 Page-Jones 的共变加作一个命名层，用来指称*什么*正在跨接缝泄漏，还附了一个可用的 diff；[issue #303](https://github.com/mattpocock/skills/issues/303) 提议在实现内部做渐进式披露，让公开接口处很深的模块底下不是一整块无差别的石板。两者都开着、未合并。随附的词汇表刻意很小，而它保持小的原因在技能本身里就写着：一致的语言是全部意义所在，一个没人一致使用的术语比没有术语更糟。

## 怎样算成功

- 设计对话不再产出"组件"、"服务"和"边界"这些词，开始产出"模块"、"接口"和"接缝"。
- 有人能指着一个拟议的抽取，不绕弯子地说出它是否通过删除测试。
- 一个拟议的接缝带着被点名的第二个适配器，而不只是第一个。
- 关于接口的讨论覆盖不变量、顺序和错误模式——而不只是类型签名。
- 调用它不会开启一个会话。如果代理单凭 `/codebase-design` 就开始读文件、提重构，它就把参考误当成驱动了。

## 它的定位

`codebase-design` 是一个**随时可取的独立技能**，是工程技能之下的词汇层，而不是任何链条中的一步。它最近的邻居是 [domain-modeling](https://aihero.dev/skills-domain-modeling)，那是针对*问题领域*的话术而非模块形状的平行参考——两者通常要一起用，因为把一个深模块命名好需要两者兼得。[improve-codebase-architecture](https://aihero.dev/skills-improve-codebase-architecture) 是另一个：它勘察代码库寻找加深候选，并用这套词汇书写每一个，所以它找到模块，而这个技能是你设计模块的工作台。拿不准哪个技能或流程合适时，[ask-matt](https://aihero.dev/skills-ask-matt) 会为你路由。
