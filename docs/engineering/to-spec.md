## 它的作用

`to-spec` 把你刚进行的对话变成一份 **[spec](https://www.aihero.dev/ai-coding-dictionary/spec)**，并作为单个 issue 发布到你的 issue 追踪器。

它不访谈你。到你使用它时，决策已经做完，所以它综合已知的东西——来自对话线程、来自代码库、来自你的 `CONTEXT.md` 和 ADR——而不是开启新一轮问题。Spec 是已做决策的记录，不是产生新决策的地方。

## 何时使用

你通过键入 `/to-spec` 来调用它——[代理（agent）](https://www.aihero.dev/ai-coding-dictionary/agent)不会主动使用它。

当构建大到装不进一个代理[会话（session）](https://www.aihero.dev/ai-coding-dictionary/session)、必须靠拆成几个来存活时使用它。这就是全部触发条件：

| 你在哪里 | 跑什么 |
| --- | --- |
| 你还没决定任何事 | 先 [grill-with-docs](https://aihero.dev/skills-grill-with-docs) |
| 已决定，且工作装得进一个[上下文窗口（context window）](https://www.aihero.dev/ai-coding-dictionary/context-window) | [implement](https://aihero.dev/skills-implement)——跳过 spec |
| 已决定，且工作跨越几个会话 | `/to-spec`，然后 [to-tickets](https://aihero.dev/skills-to-tickets) |
| 一张 [wayfinder](https://aihero.dev/skills-wayfinder) 地图已清空 | `/to-spec #<map_issue>` |

## 前置条件

`to-spec` 把 spec 作为 issue 发布，所以 [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills) 必须先为这个仓库配置好追踪器和 triage 标签词汇。两种都行：GitHub 这样的真实追踪器，或者 `.scratch/` 下的本地 markdown 文件，后者开箱即用。

## Spec 是一份决策记录

Spec 存在是因为上下文窗口会结束。你在[盘问（grilling）](https://www.aihero.dev/ai-coding-dictionary/grilling)中敲定的一切——解决方案的形状、你争辩过的选择、你刻意拒绝的东西——都在一段即将被清空的对话里。Spec 是从中幸存下来的东西。

所以它不验证任何东西，也不决定任何东西。它用你自己项目的词汇捕获已决定的内容，让一个新会话能在你无需重新解释的情况下接手工作。Spec 断言了任何你从未真正说过的东西，都是缺陷。

## 接缝先于散文

在写一个字之前，`to-spec` 勾勒这个功能将被测试的**接缝（seams）**，并和你核对。它偏好已经存在的接缝胜过新接缝，并取它能取的最高接缝——跨一次变更的理想数量是一个。

那些商定好的接缝然后会继续旅行。[tdd](https://aihero.dev/skills-tdd) 只在预先商定的接缝工作，[code-review](https://aihero.dev/skills-code-review) 对照 spec 审查 diff，所以一条没人商定过的接缝会作为审查发现出现。这种绑定是间接的——它通过这份文档运转——这正是接缝对话值得在这里认真对待、而不是推迟到实现的原因。

## 常见问题

**`/to-prd` 去哪了？**
就是这个技能，v1.1 里改的名。"Spec" 现在是唯一的贯穿术语，旧的 `to-prd` slug 已经死了——用新名字重新安装。取代旧词汇的一对是 *spec* 和 *tickets*：spec 是目的地和钉住它的决策，[tickets](https://www.aihero.dev/ai-coding-dictionary/ticket) 是到达那里的执行步骤。如果你转向，删除未完成的 tickets，保留 spec。

**为什么 spec 拿到 `ready-for-agent` 标签？我不想让代理照着它实现。**
这个标签的意思是"无需进一步 triage"——文档完整到代理可以据此工作。它是输入指定，不是工作单。但如果你运行轮询 `ready-for-agent` 的 [AFK](https://www.aihero.dev/ai-coding-dictionary/afk) 代理，那个区别对它们不可见，它们会乐意一次运行就构建整个 spec，而不是捡起 ticket 切片。这是这个技能被报告最多的粗糙边缘。在它改变之前，在你的 AFK 代理提示词里明确排除父级 spec，或者等 `/to-tickets` 跑过之后剥掉标签。

**为什么不直接从盘问去 `/to-tickets`，跳过 spec？**
常常你应该——spec 只在多会话工作上才挣到它的一步。它值钱的地方在于 tickets 是一次性的、spec 不是：每个 ticket 按一个全新上下文窗口定尺寸、会被删除或关闭，而 spec 保留为承载它们背后推理的唯一地方。在单会话变更上，这买不到任何东西，而你多付了一个[模型（model）](https://www.aihero.dev/ai-coding-dictionary/model)可能漂移的综合步骤。走 盘问 → `/implement`。

**我刚完成一张 wayfinder 地图。我该喂它什么？**
主地图 issue——`/to-spec #<map_issue>`，不是个别的决策 tickets。[wayfinder](https://aihero.dev/skills-wayfinder) 产出的是决策而不是交付物，散布在一张地图上；`to-spec` 是把它们折叠成一份可构建文档的步骤。把地图直接循环进 `/implement` 会丢掉那个折叠。

**Spec 是给我审的，还是只给代理的？**
主要是给代理的，而且读起来也是那样——完整、密集、满是引用。值得你过目的部分是接缝和范围外小节，因为那是两个"错误决策最容易发现、事后发现代价最高"的地方。从头到尾读整份东西是人们真实的抱怨，而且没有摘要模式：诚实的答案是，如果 spec 让你意外，是盘问太浅了，不是 spec 太长。

**tickets 开始之后，我是保持 spec 冻结，还是让代理重写它？**
没有任何东西让它保持同步，所以实际上它是你当时所知的一张快照，第一次实现教会你点什么它就过时了。工作发布后把它当一次性。注定比它长寿的工件是你的 `CONTEXT.md` 和 ADR——如果实现期间学到的东西值得留存，它属于那里，不属于一份被编辑过的 spec。

**我的工作是重构或模块边界，不是功能。模板合适吗？**
不太合适，这是一个已知限制。模板重度依赖用户故事，这对架构工作来说是错的形状——你会围绕真正关于接口和不变量的决策，写出没人要的故事。改用实现决策和测试决策小节，并让持久的架构判断通过 [grill-with-docs](https://aihero.dev/skills-grill-with-docs) 作为 ADR 落地，而不是试图让 spec 扛着它们。

**它会检查追踪器里相关的工作，或引用它尊重的 ADR 吗？**
两个都不会。它读取并尊重覆盖它所触及区域的 ADR，但它不链接它们，也不在起草前搜索追踪器里重叠的 issue——所以一份 spec 可能悄悄重复某人已经提交的工作。如果那个区域很忙，先自己搜追踪器。

**`/to-tickets` 读不了我的 spec——它老是截断。**
非常大的 spec 可能超出追踪器 issue 能干净回送的大小，而且没有本地副本可兜底。修复是上下文卫生：不要在 `/to-spec` 和 `/to-tickets` 之间[清空（clear）](https://www.aihero.dev/ai-coding-dictionary/clearing)或[压缩（compact）](https://www.aihero.dev/ai-coding-dictionary/compaction)。在同一个窗口里跑它们，spec 就根本不需要被重新获取。

## 怎样算成功

- 它开始写作，而不是问你新一轮问题。
- 它在写之前把接缝摆给你，并提议尽可能少的接缝。
- 它用你项目的名词回来，而不是通用的产品管理套话。
- 里面每个决策都是你记得做过的。没有为填满小节而发明的东西。
- 范围外小节里有真实的东西——你拒绝的东西通常是页面上最有用的几行。

## 它的定位

`to-spec` 是主构建链里的一步，而且只在它的多会话分支上：

```txt
grill-with-docs → to-spec → to-tickets → implement → code-review
```

它上游的邻居是 [grill-with-docs](https://aihero.dev/skills-grill-with-docs)——做这个技能只负责记录的决策——以及 [wayfinder](https://aihero.dev/skills-wayfinder)，其完成的地图恰好在这里并入主链。下游，[to-tickets](https://aihero.dev/skills-to-tickets) 把 spec 切成曳光弹 tickets 供 [implement](https://aihero.dev/skills-implement) 构建。拿不准哪个技能或流程合适时，[ask-matt](https://aihero.dev/skills-ask-matt) 会为你路由。
