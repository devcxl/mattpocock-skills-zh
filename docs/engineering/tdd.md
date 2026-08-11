## 它的作用

`tdd` 测试先行地构建一个功能或修复一个 bug：一个失败的测试，然后刚好够让它通过的代码，然后是下一个行为。它承载着让那个循环产出值得保留的测试的标准——好测试是什么、测试放哪里、mock 是干什么的，以及三个悄悄毁掉测试套件的反模式。

它不在你尚未同意的接缝处写任何测试。在任何测试存在之前，它点名它打算测试的公开边界并停下来等你确认，因为测试精力是有限的，而这里正是你把精力花在关键路径而不是每个边缘情况上的地方。另一件要知道的事是：`tdd` 是一个**参考**，不是驱动。它持有循环的规则，而别的东西（你，或 [implement](https://aihero.dev/skills-implement)）运行应用这些规则的[会话（session）](https://www.aihero.dev/ai-coding-dictionary/session)。

## 何时使用

键入 `/tdd`，或者当任务合适时[代理（agent）](https://www.aihero.dev/ai-coding-dictionary/agent)会自动使用它——测试先行地构建功能或修复 bug，或者当你说"red-green-refactor"时。

当有一个具体的行为了要构建、有输入和可观察的输出、并且你想要能扛住重构的测试时使用它。

| 你的情况 | 去哪里 |
| --- | --- |
| 一个有定义输入输出的行为——业务逻辑、请求/响应契约、变换、校验 | `tdd` |
| 行为还没被钉死 | [to-spec](https://aihero.dev/skills-to-spec)，它也会在任何代码写出之前商定测试接缝 |
| 问题其实是接口的形状，不是测试 | [codebase-design](https://aihero.dev/skills-codebase-design) |
| 你有一个 [spec](https://www.aihero.dev/ai-coding-dictionary/spec) 或 [tickets](https://www.aihero.dev/ai-coding-dictionary/ticket)，想要整个构建替你跑完 | [implement](https://aihero.dev/skills-implement)，它按 ticket 驱动 `tdd` |
| 配置、接线、胶水、类型标注、直白的 CRUD 委托 | 这里没有合适的东西——见下面的未决缺口 |

最后一行是一个真实的洞，不是风格偏好。技能决定接缝*在哪里*；它里面没有任何东西决定一个变更*是否*值得走这个循环。把它跑在一个没有独立真值来源可断言的变更上，你会得到一个复述实现的测试——技能自己警告过的同义反复反模式，只是从另一个方向到达。它是 [issue #746](https://github.com/mattpocock/skills/issues/746)，开着。在它关闭之前，那个判断是你的或你 `CLAUDE.md` 的。

## 前置条件

需要安装 [codebase-design](https://aihero.dev/skills-codebase-design)。`tdd` 曾经自带深模块和接口设计笔记；v1.0 里它们被删除，改用这个共享技能，`tdd` 现在依赖它提供接口设计词汇。其他什么都不需要——技能是[无状态（stateless）](https://www.aihero.dev/ai-coding-dictionary/stateless)的，不写自己的文件。

## 循环，以及它运行的接缝

三个词承载这个技能。

**红-绿（Red-green）。**写失败的测试，然后只写刚好够通过的代码。不要预想下一个之后的测试。没有重构阶段：它在 2026 年 6 月被移除，因为代理实际上从不执行它，也因为审查和实现作为分离的会话效果更好。重构属于 [code-review](https://aihero.dev/skills-code-review)。

**垂直切片（Vertical slice）。**一个接缝、一个测试、一个最小实现，然后重复——第一个循环是一条**曳光弹（tracer bullet）**，端到端证明一条路径。反面是水平切片：先所有测试，后所有代码。批量测试验证的是*想象中*的行为，它们检查事物的形状而不是用户做什么，而且它们让你在理解实现之前就承诺了一个测试结构。

**预先商定的接缝（Pre-agreed seam）。**接缝是你无需深入内部就能观察行为的公开边界。规则是绝对的：不在未经确认的接缝处写测试。在完整链条里，接缝更早商定，在 [to-spec](https://aihero.dev/skills-to-spec) 期间——"`/tdd` 被告知只在预先商定的测试接缝工作，`/code-review` 检查只使用了商定过的测试接缝。"单独调用时，`tdd` 直接问你。

它被写来防止的三个反模式：

| 反模式 | 特征 |
| --- | --- |
| 实现耦合（Implementation-coupled） | 你重命名一个内部函数时测试破裂，尽管行为没变。mock 了内部协作者、断言了调用次数、用数据库查询而不是接口来验证。 |
| 同义反复（Tautological） | 期望值按代码计算它的方式计算，所以测试靠构造就通过。期望值必须来自别处——一个已知良好的字面量、一个演算过的例子、spec。 |
| 水平切片（Horizontal slicing） | 一批测试在任何实现之前落地。 |

Mock 只用于系统边界——外部 API、时间、随机性，有时是文件系统或数据库。不是你自己的模块。

## 常见问题

**它为什么不重构？描述写着"red-green-refactor"。**

因为重构步骤被移除了，而描述没更新。移除是刻意的：代理实际上从不做它，而且把实现和审查保持在分离的会话效果更好。结果是否还算严格意义上的 TDD，比循环是否产出更好的代码次要。触发短语和正文之间的不匹配已作为 [issue #589](https://github.com/mattpocock/skills/issues/589) 提交，仍然开着，所以"red-green-refactor"继续作为触发这个技能的短语有效。你得到的是红 → 绿，重构在 [code-review](https://aihero.dev/skills-code-review) 里。

**它让我选一个测试接缝，而我完全不知道该选哪个。**

这是这个技能被报告最多的摩擦点（[issue #607](https://github.com/mattpocock/skills/issues/607)）。提示只按名字列出候选接缝，没有任何关于每个能抓住什么或漏掉什么的信息，所以你是在标签之间选择。还没有已发布的修复。实际的变通办法是在回答之前问代理权衡——组件级接缝会漏掉什么而集成接缝能抓住、以及它慢多少。这也是链条在 `to-spec` 里预先商定接缝的原因，那里你能看到整个功能而不是一个提示。

**它先写了实现再写测试，尽管技能说红在前。**

这种事会发生。一位用户拿这个追问[模型（model）](https://www.aihero.dev/ai-coding-dictionary/model)，得到了一个异常诚实的回答："我知道技能说'一次一个测试，看着它为正确的理由失败'——我读了。我只是默认了我的平常习惯。"技能是为与它共存而写的。没有指示能让代理 100% 遵守，更用力地强推只会为一点收益限制代理的创造力——即使不严格遵守，循环也值得跑，因为结果整体上仍然更好。如果严格遵守对某个切片很重要，盯着运行，而不是指望技能强制执行。

**它应该先写浏览器或端到端测试吗？**

通常不应该，而技能不会阻止它。一位用户报告代理先写了 Playwright 测试，然后烧了一个长循环重跑它，并为一个还不存在的功能得出结论说*测试*坏了。在你的 `CLAUDE.md` 里配置这个。浏览器测试慢到红-绿反馈回路不再自我回本；在你仓库的 `CLAUDE.md` 里声明它们在行为工作之后才写。

**`/tdd` 会取代 `/implement` 或课程里的 `/do-work` 吗？**

不会。`/tdd` 记录方法论；`/implement` 是一个非常简单的 工作→反馈→提交 循环，是 `/do-work` 的直接替身。课程单一的 `/do-work` 步骤现在被拆到 `/implement`、`/tdd` 和 `/code-review` 之间。如果你在问对一个 ticket 该跑哪个，答案几乎总是 `/implement`。

**深模块和接口设计指南去哪了？**

v1.0 里进了 [codebase-design](https://aihero.dev/skills-codebase-design)，被泛化，让几个技能共享一套词汇。`refactoring.md` 同时离开了；重构现在 [code-review](https://aihero.dev/skills-code-review) 的工作，那个技能带着 Fowler 坏味道基线。

**它知道我其他的 tickets 吗？**

不知道。对着一个 ticket 跑，它会乐意提议属于兄弟 ticket 的工作，因为它看不到 issue 图的其余部分（[issue #129](https://github.com/mattpocock/skills/issues/129)）。Matt 的立场是这不是 `tdd` 的职责。把 spec 和 ticket 一起传有帮助；一开始就把 tickets 尺寸调对更有帮助。

## 怎样算成功

- 它在任何测试文件存在之前停下、点名它打算测试的接缝、并等待。
- 一个测试出现、变红、得到刚好够通过的代码，然后下一个测试才出现——而不是一批测试跟着一批代码。
- 测试名读起来是能力（"user can checkout with valid cart"），不是内部实现（"checkout calls paymentService.process"）。
- 断言里的期望值是你能够追溯到 spec 的字面量，而不是按代码计算它的方式重算的值。
- 重命名一个内部函数不会弄坏套件里的任何东西。
- Mock 只出现在外部边界——支付 API、时钟——永远不围绕你自己的模块。

## 它的定位

`tdd` 是主链构建步骤内部的引擎，而不是它自己的一步：

```txt
grill-with-docs → to-spec → to-tickets → implement → code-review
```

[to-spec](https://aihero.dev/skills-to-spec) 预先商定测试接缝，[implement](https://aihero.dev/skills-implement) 按 ticket 驱动 `tdd`，[code-review](https://aihero.dev/skills-code-review) 事后检查只用了商定过的接缝——并拥有 `tdd` 不再做的重构。它另一个邻居是 [codebase-design](https://aihero.dev/skills-codebase-design)，`tdd` 所说的接缝和深模块词汇的共享来源。你也可以单独使用它，每当有一个具体的行为了要构建、而没有一个完整 spec 在台上时。拿不准哪个技能适合你的情况时，[ask-matt](https://aihero.dev/skills-ask-matt) 会为你路由。
