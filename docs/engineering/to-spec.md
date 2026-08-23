## 它的作用

`to-spec` 把刚发生的对话转成一份 **[spec](https://www.aihero.dev/ai-coding-dictionary/spec)**，并作为单个 issue 发布到你的 issue 追踪器。

它不访谈你。等你伸手来用它的时候，决定已经做完，所以它综合已知的东西（来自这条线程、来自代码库、来自你的 `CONTEXT.md` 和 ADR），而不是打开新的一轮提问。spec 是一份已经做出的决策的记录，而不是新决策被做出的地方。

## 何时使用

你通过键入 `/to-spec` 来调用它；[agent](https://www.aihero.dev/ai-coding-dictionary/agent) 不会主动使用它。

当构建对一次 agent [session](https://www.aihero.dev/ai-coding-dictionary/session) 来说太大、并且必须能在被拆成几次后还能活下去时，使用它。这就是全部触发条件：

| 你在哪 | 跑什么 |
| --- | --- |
| 你什么都还没决定 | 先 [grill-with-docs](https://aihero.dev/skills-grill-with-docs) |
| 已经决定，并且工作装得下一次 [context window](https://www.aihero.dev/ai-coding-dictionary/context-window) | [implement](https://aihero.dev/skills-implement)：跳过 spec |
| 已经决定，并且工作跨几次会话 | `/to-spec`，然后 [to-tickets](https://aihero.dev/skills-to-tickets) |
| 一张 [wayfinder](https://aihero.dev/skills-wayfinder) 地图已经清完 | `/to-spec #<map_issue>` |

## 先决条件

`to-spec` 把 spec 作为 issue 发布，所以 [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills) 必须先为这个仓库配置好追踪器和 triage 标签词汇。两种都可以：像 GitHub 这样的真实追踪器，或者 `.scratch/` 下的本地 markdown 文件——它开箱支持。

## spec 是一份决策记录

spec 之所以存在，是因为 context window 有尽头。你在 [盘问（grilling）](https://www.aihero.dev/ai-coding-dictionary/grilling) 时敲定的一切——解的形状、你争辩过来的选择、你刻意拒绝的东西——都留在一次即将被清空的对话里。spec 是活过那次清空的东西。

所以它不验证任何东西，也不再决定任何东西。它用项目自己的词汇捕获已经决定的东西，让一次全新的会话不需要你重新解释就能把工作接过去。spec 断言的任何你其实从来没说过的东西，是一个缺陷。

## 接缝优先于散文

在它动笔之前，`to-spec` 会勾勒这份功能将被测试的**接缝**，并与你核对。它优先用已经存在的接缝，而不是新造出来的，并且取它能取的最高那条：一次变更跨过的理想数量是一道。

那些被约定好的接缝随之流转。[tdd](https://aihero.dev/skills-tdd) 只在预先约定的接缝上工作，[code-review](https://aihero.dev/skills-code-review) 对照 spec 审查 diff，所以一道没人约定过的接缝会以一条 review 发现的形式冒出来。这种绑定是间接的：它通过这份文档流转，这恰恰就是为什么接缝对话值得在这里认真对待，而不是被推到实现阶段。

## 常见问题

**`/to-prd` 去哪了？**

就是这份技能，v1.1 改名了。"Spec" 现在是贯穿全程的单一术语，旧 `to-prd` slug 已废；在新名下重装。取代旧词汇的那一对是 *spec* 和 *tickets*：spec 是目的地和固定它的决策，[tickets](https://www.aihero.dev/ai-coding-dictionary/ticket) 是抵达那里的执行步骤。如果你转弯，删掉没做完的 tickets、留住 spec。

**为什么 spec 拿到 `ready-for-agent` 标签？我不想让 agent 照着它实现。**

那个标签的意思是"不再需要 triage"：这份文档已经够完整、agent 能照着工作。它是一个输入标志，不是工作令。但如果你跑轮询 `ready-for-agent` 的 [AFK](https://www.aihero.dev/ai-coding-dictionary/afk) agent，那种区别对它们并不可见，它们会乐于一次跑动里试图构建整份 spec，而不是捡起 ticket 的切片。这是这个技能被报告最多的粗糙边缘。在它改变之前，在你的 AFK agent 提示里显式排除那份父 spec，或在 `/to-tickets` 跑过之后剥掉那个标签。

**为什么不直接从盘问到 `/to-tickets`、跳过 spec？**

多数情况下你应该这么做；spec 只在多会话的工作上才挣回它的那一步。它值在哪里：tickets 是用完即弃的、spec 不是。每张 ticket 的大小被调到恰好装下一次全新的 context window，会被删除或关闭，而 spec 留下来作为住在它们背后的那份推理的唯一居所。在一次单会话变更上，那给你的是零，而你付了一笔额外的综合步骤，[model](https://www.aihero.dev/ai-coding-dictionary/model) 还可能漂移。直接走盘问 → `/implement`。

**我刚完成一张 wayfinder 地图。我该喂它什么？**

那张主图 issue：`/to-spec #<map_issue>`，不是那些单独的决策 tickets。[wayfinder](https://aihero.dev/skills-wayfinder) 产出散落在地图上的决策、而不是可交付物；`to-spec` 是把它们折成一份可构建文档的那一步。把地图直接接进 `/implement` 把那次折叠扔掉了。

**spec 是给我审的，还是只给 agent 的？**

主要是给 agent 的，读起来也像：完整、密集、引用繁重。值得你眼睛看的是接缝和 out-of-scope 小节，因为这两个地方一个错误决策最容易抓、却最晚被发现。从头到尾读完整份文档是人们真正在抱怨的事，并且没有摘要模式：诚实的答案是——如果 spec 让你惊讶，那是盘问太浅，而不是 spec 太长。

**tickets 开始之后，我把 spec 冻结，还是让 agent 重写？**

没有什么让它保持同步，所以实际上它是你在那时知道的东西的一张快照，并在实现第一次教你点东西的时候就过时。一旦工作上线，把它当用完即弃。意图比它更长寿的工件是你的 `CONTEXT.md` 和 ADR；如果实现中学到的什么值得留下来，它属于那里，而不是被编辑过的 spec。

**我的工作是重构或模块边界、不是功能。这份模板合适吗？**

没那么合适，这是一个已知限制。模板重度偏向用户故事，那是架构性工作的错误形状：你最终会围绕其实是关于接口和不变量的事硬编出没人要的故事。改靠实现决策和测试决策两个小节，让耐久的架构性决策通过 [grill-with-docs](https://aihero.dev/skills-grill-with-docs) 以 ADR 落地，而不是硬让 spec 装它们。

**它会查追踪器看相关工作、或引用它尊重的 ADR 吗？**

两边都不查。它读并尊重覆盖它动到的区域的 ADR，但不会链接它们，并且在起草前也不会去搜索追踪器里重叠的 issue，所以一份 spec 可能悄悄复制一份别人已经提过的活儿。如果那个区域很忙，先自己搜一遍追踪器。

**`/to-tickets` 读不了我的 spec：它一直在截断。**

非常大的 spec 可能长到一份追踪器 issue 不能干净地服务回来，并且没有本地副本可作兜底。修法是上下文卫生：在 `/to-spec` 和 `/to-tickets` 之间不要 [clear](https://www.aihero.dev/ai-coding-dictionary/clearing) 或 [compact](https://www.aihero.dev/ai-coding-dictionary/compaction)。在同一个窗口里跑它们，spec 就完全不需要被重新取回来。

## 怎样算成功

- 它开始动笔，而不是问你新一轮问题。
- 它在动笔前把接缝摆给你，并且用尽可能少地提出来。
- 它回来时用你项目的名词，而不是通用的产品管理套话。
- 它里面的每一项决策都是你能记得自己做出的。没东西是为了填一节而被发明的。
- Out-of-scope 小节里有真实内容：你拒绝的那些事通常是一页里最有用的几行。

## 它的定位

`to-spec` 是主构建链上的一步，而且只在多会话的那条分支上：

```txt
grill-with-docs → to-spec → to-tickets → implement → code-review
```

它的上游邻居是 [grill-with-docs](https://aihero.dev/skills-grill-with-docs)——做这份技能只负责记录的决定；以及 [wayfinder](https://aihero.dev/skills-wayfinder)——它的完成图就在这里合上这条链。下游，[to-tickets](https://aihero.dev/skills-to-tickets) 把 spec 切成供 [implement](https://aihero.dev/skills-implement) 构建的示踪弹 tickets。拿不准哪个技能或流程合适时，[ask-matt](https://aihero.dev/skills-ask-matt) 给你路由。