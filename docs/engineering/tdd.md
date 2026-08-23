## 它的作用

`tdd` 以测试先行的方式构建一个功能或修复一个 bug：一条失败的测试，然后是恰好让它通过的代码，然后是下一个行为。它背负着让那个循环产出值得保留的测试的那些标准：什么是好测试、测试放哪里、mock 是拿来干什么的，以及悄悄毁掉一套测试套件的三个反模式。

它不在一个你还没事先同意的接缝上写任何测试。在任何测试存在之前，它点名将打算在其上测试的公共边界，并停下来等你确认，因为测试的精力是有限的，而这里就是把它花在关键路径而不是每一条边角情况上的地方。另外要知道的是 `tdd` 是一份**参考**，而不是驱动器。它持有循环的规则，由别人（你，或 [implement](https://aihero.dev/skills-implement)）来跑套用规则的 [session](https://www.aihero.dev/ai-coding-dictionary/session)。

## 何时使用

键入 `/tdd`，或者当任务合适时 [agent](https://www.aihero.dev/ai-coding-dictionary/agent) 会主动使用它：以测试先行构建一个功能或修复一个 bug，或者你说"red-green-refactor"时。

当有一个具体的行为要构建、带着定义好的输入和可观察的输出、并且你想要能扛住重构的测试时，使用它。

| 你的情况 | 去哪里 |
| --- | --- |
| 一个带定义好的输入和输出的行为（业务逻辑、请求/响应契约、一次转换、校验） | `tdd` |
| 那个行为还没钉死 | [to-spec](https://aihero.dev/skills-to-spec)，它也在任何代码写下之前约定测试接缝 |
| 真正的问题是接口的形状，而不是测试 | [codebase-design](https://aihero.dev/skills-codebase-design) |
| 你有一份 [spec](https://www.aihero.dev/ai-coding-dictionary/spec) 或 [tickets](https://www.aihero.dev/ai-coding-dictionary/ticket)、并且希望整个构建替你跑 | [implement](https://aihero.dev/skills-implement)，它按 ticket 驱动 `tdd` |
| 配置、接线、粘合、类型标注、直白的 CRUD 委托 | 这里没有合适的；见下面那条开放的缺口 |

最后那一行是一个真实的缺口，不是风格偏好。技能决定接缝*放哪里*；它里面没有东西决定一次变更是否值得走这个循环。在一项没有独立真值来源可断言的变更上跑它，你会得到一条重述实现的测试：技能自己警告的那条重言式反模式，从另一头到达。它是 [issue #746](https://github.com/mattpocock/skills/issues/746)，并且是开放的。在它关闭之前，那个判断属于你或你的 `CLAUDE.md`。

## 先决条件

需要安装 [codebase-design](https://aihero.dev/skills-codebase-design)。`tdd` 曾经自带 deep-module 和接口设计注释；v1.0 里为了让位给那份共享技能，那些被删了，`tdd` 现在靠它来取接口设计的词汇。别的就不需要了；技能是 [stateless](https://www.aihero.dev/ai-coding-dictionary/stateless) 的，不写自己的文件。

## 循环，以及它跑在哪道接缝上

三个词承载着这份技能。

**红绿（Red-green）。** 写失败的测试，然后只写恰好让它通过的代码。不预判下一条测试之后是什么。没有重构阶段：它在 2026 年 6 月被去掉，因为 agent 几乎从不执行它，而且因为 review 和实现分开到不同 session 里效果更好。重构属于 [code-review](https://aihero.dev/skills-code-review)。

**垂直切片（Vertical slice）。** 一道接缝、一条测试、一份最小实现、然后重复，第一个循环是一发**示踪弹**（tracer bullet），证明一条端到端路径走通。相对的是水平切片：先所有测试，再所有代码。批量测试验证的是*想象中的*行为，它们检查的是事物的形状而不是用户做什么，并且它们在你理解实现之前就让你锁定了一份测试结构。

**预先约定的接缝（Pre-agreed seam）。** 接缝是你不深入其内部就能观察行为的公共边界。规则是绝对的：没有未确认接缝上的测试。在完整链里，接缝在更早——[to-spec](https://aihero.dev/skills-to-spec)——阶段就被约定好："`/tdd` 被告知只在预先约定的测试接缝上工作，`/code-review` 检查只用了约定好的测试接缝。" 在自身被调用时，`tdd` 会直接问你。

它被写出来要预防的三种反模式：

| 反模式 | 标志 |
| --- | --- |
| 实现耦合 | 当你重命名一个内部函数时测试就坏，尽管行为没变。被 mock 的内部协作者、被断言的调用次数、被用来校验而不是接口的数据库查询。 |
| 重言式 | 期望值按代码计算方式那样计算，所以测试按构造就过。期望值必须来自别处：一个已知的字面量、一个算过的例子、spec。 |
| 水平切片 | 一批测试在任何实现之前落地。 |

Mocks 只用于系统边界：外部 API、定时器、文件系统——而*不是*你自己的模块。被 mock 的内部类是测试在反射实现的最强信号。

## 常见问题

**"Red-green-refactor" 是不是应该实际跑出 refactor？**

不。重构阶段在 2026 年 6 月被去掉了，因为 agent 几乎从不执行它。诚实的答案：循环产出更好的代码。触发短语和正文之间的不一致被提交为 [issue #589](https://github.com/mattpocock/skills/issues/589) 且仍开放，所以 "red-green-refactor" 继续作为触发这个技能的短语在工作。你拿到的是 red → green，以及 [code-review](https://aihero.dev/skills-code-review) 里的重构。

**它让我选一个测试接缝，而我完全不知道挑哪个。**

这是这份技能被报告最多的摩擦点（[issue #607](https://github.com/mattpocock/skills/issues/607)）。提示只按名字列出候选接缝，不讲每一个能抓到什么、漏掉什么，所以你是在标签之间做选择。还没发布的修复。实际的变通办法是先让 agent 给出权衡再回答：组件级接缝漏掉的哪部分被集成接缝抓到、它要慢多少。这也是为什么那条链在 `to-spec` 里就把接缝约定好——在那里你有整个功能在视野里，而不是一条提示。

**它在测试之前写了实现，尽管技能说先红。**

会发生。一位用户就此追问 [model](https://www.aihero.dev/ai-coding-dictionary/model)，得到了一份异常诚实的回答："I knew the skill said 'one test at a time, watch it fail for the right reason'. I read it. I just defaulted to my normal habit." 技能被写成能与此共存。没有指令能让 agent 100% 服从，强行收紧会限制 agent 的创造性而收益很小；即便没有被严格遵守，循环也值得跑，因为整体结果仍然更好。如果某一片切片必须严格遵守，那就盯着那次跑动，而不是相信技能会强制它。

**它应该先写浏览器或端到端测试吗？**

通常不应该，技能不会阻止它。一位用户报告 agent 先写了一条 Playwright 测试，然后烧了一个长循环反复跑它，并得出*测试*坏了——为一个还不存在的功能。在你的 `CLAUDE.md` 里配置这点。浏览器测试慢到让红绿反馈循环开始不值；在你仓库的 `CLAUDE.md` 里声明它们在行为能跑通之后才写。

**`/tdd` 会替代 `/implement` 或课程里的 `/do-work` 吗？**

不会。`/tdd` 记录方法论；`/implement` 是一个非常简单的 work→feedback→commit 循环，是 `/do-work` 的直接替身。课程里的单一 `/do-work` 步骤现在被拆成 `/implement`、`/tdd` 和 `/code-review`。如果你在问对着一个 ticket 该跑哪一个，答案几乎总是 `/implement`。

**Deep-modules 和接口设计指引去哪了？**

v1.0 进了 [codebase-design](https://aihero.dev/skills-codebase-design)，泛化为让若干技能共享同一份词汇。`refactoring.md` 同时离开；重构现在是 [code-review](https://aihero.dev/skills-code-review) 的事，那份技能带着福勒坏味道基线。

**它知道我的其他 tickets 吗？**

不知道。跑一个 ticket 时，它会很高兴地提出属于某张兄弟 ticket 的工作，因为它看不到其余 issue 图（[issue #129](https://github.com/mattpocock/skills/issues/129)）。Matt 的立场是这不是 `tdd` 的事。把 spec 一起传过去有帮助；一开始就调对 ticket 大小帮助更大。

## 怎样算成功

- 它停下、点出它打算在其上测试的接缝，并等待，在任何测试文件存在之前。
- 一条测试出现、变红、拿到恰好让它通过的代码，然后才是下一条测试，不是一批测试跟着一批代码。
- 测试名读起来是能力（"user can checkout with valid cart"），而不是内部（"checkout calls paymentService.process"）。
- 断言里的期望值是你能追到 spec 的字面量，不是按代码计算方式重算出来的值。
- 重命名一个内部函数没有弄坏套件里的任何东西。
- Mocks 只出现在外部边界（支付 API、时钟），从不出现在你自己的模块周围。

## 它的定位

`tdd` 是主链构建步骤里的引擎，而不是自己独立的一步：

```txt
grill-with-docs → to-spec → to-tickets → implement → code-review
```

[to-spec](https://aihero.dev/skills-to-spec) 预先约定测试接缝，[implement](https://aihero.dev/skills-implement) 按 ticket 驱动 `tdd`，[code-review](https://aihero.dev/skills-code-review) 在事后检查只用了约定好的接缝，并且拥有 `tdd` 不再做的重构。另一个邻居是 [codebase-design](https://aihero.dev/skills-codebase-design)——`tdd` 所说的接缝与深模块词汇的共享来源。你也能在它自身被调用，无论何时有一个具体的行为要构建、并且没有完整 spec 在台面上。拿不准哪个技能适合你的情况时，[ask-matt](https://aihero.dev/skills-ask-matt) 为你路由。