## 它的作用

`wayfinder` 接手一个对一个代理[会话（session）](https://www.aihero.dev/ai-coding-dictionary/session)来说太大的工作——一个你能说出**目的地**、却还看不见路线的想法——把它绘制成你 issue 追踪器上的一张由**决策 tickets** 组成的共享**地图**，然后逐个解决它们，直到道路清晰。

它做规划，不做执行。每个 ticket 装着一个其解决结果是决策的问题，而不是一段要执行的构建切片；当在有人去构建那个东西之前没有剩下任何要决策的，地图就完成了。这一条规则把 wayfinder ticket 与普通实现 [ticket](https://www.aihero.dev/ai-coding-dictionary/ticket) 区分开，也是代理最常打破的规则。当地图清空时，wayfinder 移交；它不继续进入代码。

## 何时使用

你通过键入 `/wayfinder` 来调用它——[代理（agent）](https://www.aihero.dev/ai-coding-dictionary/agent)不会主动使用它。

它是整个集合里最重、最密的流程，所以触发条件很窄：工作必须真的比一个代理会话能容纳的更大，而且通往目的地的路线必须模糊。分界是干净的：单会话规划用 `/grill-with-docs`，多会话规划用 `/wayfinder`。

| 你面前有什么 | 跑什么 |
| --- | --- |
| 一个范围良好、你能一口气敲定的功能 | [grill-me](https://aihero.dev/skills-grill-me)，有代码库时用 [grill-with-docs](https://aihero.dev/skills-grill-with-docs) |
| 一个绿地（greenfield）项目，或一个跨许多会话的构建，路线还不清楚 | `/wayfinder` |
| 一段决策已经做完的对话线程 | [to-spec](https://aihero.dev/skills-to-spec)——直接跳过地图 |
| 一张已清空的 wayfinder 地图 | [to-spec](https://aihero.dev/skills-to-spec)，然后 [to-tickets](https://aihero.dev/skills-to-tickets) 和 [implement](https://aihero.dev/skills-implement) |
| 一个已经变得太大的现有会话 | 说"移交给 `/wayfinder`"——[handoff](https://aihero.dev/skills-handoff) 既能从地图桥出，也能桥入地图 |

绿地不是要求。Wayfinder 常规用在遗留和半成品的代码库上，而且可以说在那里更锐利，因为大部分迷雾是"这里已经为真的是什么"，而不是"我们该做什么"。

## 前置条件

地图和它的 tickets 住在仓库的 issue 追踪器上，所以 wayfinder 需要 [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills) 铺设的追踪器接线。那一步会写一个"Wayfinding operations"小节，描述地图、它的子 tickets、阻塞边和前沿查询如何为 GitHub、GitLab 或本地 markdown 表达。Wayfinder 通过你 `CLAUDE.md` / `AGENTS.md` 里的指针解析那份文档，而不是固定路径；完全没配置追踪器时，它回退到本地 markdown 文件。

追踪器不是装饰。阻塞关系是在追踪器自己的 UI 里让前沿可视化的东西，而一个没有原生依赖链接的追踪器——比如自托管的 Gitea——会把 wayfinder 降级为从地图文本推断阻塞者，这能用，但需要更密切的监督。

## 地图、迷雾和前沿

**地图**是一个标着 `wayfinder:map` 的 issue；它的 tickets 是它的子 issues。它是**索引，不是仓库**——一个决策恰好住在唯一一个地方，它的 ticket，而地图只摘要它并链接。一个会话以低分辨率加载地图，按需放大到个别 tickets，这让地图能持续增长而不用每个会话为它的全部历史买单。

四样东西活在它上面：

- **目的地（Destination）**——到达这张地图尽头是什么样子。命名它是测绘的第一个动作，在任何 ticket 存在之前，因为目的地固定了每个 ticket 被衡量对照的范围。
- **迄今的决策（Decisions so far）**——每个已关闭 ticket 一行，各自链接到细节真正居住的地方。
- **尚未指定（Not yet specified）**——**战争迷雾（fog of war）**。你能看出会来、但还无法锐利表述的决策。迷雾对 ticket 的测试是：你现在能否精确陈述那个问题，而不是能否回答它。解决一个 ticket 会清掉它前方的迷雾，并把现在可指定的东西升级成新 tickets。
- **范围外（Out of scope）**——被裁定超出目的地的工作。迷雾只永远*朝目的地*聚拢，所以范围外的工作被关闭、永不升级。

**前沿（frontier）**是打开、未阻塞、未被认领的 tickets——已知的边缘。一个会话在做任何工作之前把 ticket 指派给自己来认领它，所以指派者*就是*认领，并发会话会跳过它。Tickets 全程按名字引用，从不只用一个裸 `#42`；一墙 issue 编号在叙述里没法读。

## 四种决策 ticket 类型

每个 ticket 携带一个 `wayfinder:<type>` 标签，并且要么是 **[HITL](https://www.aihero.dev/ai-coding-dictionary/human-in-the-loop)**——与一个为自己说话的人一起工作——要么是 **[AFK](https://www.aihero.dev/ai-coding-dictionary/afk)**——由代理独自驱动。一个 HITL ticket 只能通过现场交流解决；一个回答自己[盘问（grilling）](https://www.aihero.dev/ai-coding-dictionary/grilling)问题的代理已经弄坏了它。

| 类型 | 模式 | 何时用它 | 由什么解决 |
| --- | --- | --- | --- |
| `grilling` | HITL | 默认。问题可以通过谈清楚来敲定。 | [grilling](https://aihero.dev/skills-grilling) 加 [domain-modeling](https://aihero.dev/skills-domain-modeling)，在新会话里 |
| `prototype` | HITL | "这应该看起来什么样"或"这应该怎么表现"——一个谈话敲定不了的问题。 | [prototype](https://aihero.dev/skills-prototype)，构建的工件作为资产从 ticket 链接 |
| `research` | AFK | 工作目录之外的一个事实阻塞了一个决策。 | 一个 [research](https://aihero.dev/skills-research) [子代理（subagent）](https://www.aihero.dev/ai-coding-dictionary/subagent)，测绘时触发，在 `research/<name>` 分支上并行烧完 |
| `task` | 任一 | 没有要决策的，但手工工作阻塞一个决策——开通访问、注册一个服务、搬数据好让它的形状可见。 | 能做的代理独自做，否则给人类一份精确清单 |

`task` 是唯一*做*而不决策的类型，它靠解除一个决策的阻塞来挣到位置——从不靠交付目的地的一块。这是实践中出错最多的类型：代理把它解读为实现步骤，开始在地图内部写产品代码。

Research 是*每会话一个 ticket* 的唯一例外。

## 常见问题

**这和 `/grill-with-docs` 有什么不同？先从哪个开始？**
会话数量，不是项目规模。`/grill-with-docs` 是单会话规划；wayfinder 是多会话规划。如果你能把整件事装进一次对话，盘问是更便宜更好的工具，而 wayfinder 对那种情况确实更慢更密。社区沉淀下来的简写：只有当工作装不进单个会话时，wayfinder 才有意义。这是 wayfinder 被问得最多的问题，而且会一直被问，因为描述不告诉你自己的任务落在这条线的哪里——你必须自己判断会话数量。

**它问"目的地"时，是指这个会话的尽头还是所有事情的尽头？**
整张地图——整个地图的目的地，不只是初始会话。这个问题读起来有歧义，因为 wayfinder 定义上就是多会话工具，所以会话范围级的答案永远讲不通。典型的目的地是：一份要移交的 [spec](https://www.aihero.dev/ai-coding-dictionary/spec)、一个规划开始前要锁定的决策、一个概念验证、或者一个就地完成的变更比如数据迁移。

**地图已清空。为什么我还需要 `/to-spec` 和 `/to-tickets`——wayfinder 不是已经写了 spec、做了 tickets 吗？**
没有。Wayfinder 的 tickets 是决策 tickets，而到地图关闭时它们也都关闭了。剩下的是满满一地图链接起来的决策，那不是构建计划。[to-spec](https://aihero.dev/skills-to-spec) 把这些链接起来的决策折叠成一份 spec——`/to-spec #<map_issue>`——而 [to-tickets](https://aihero.dev/skills-to-tickets) 把它切成曳光弹实现 tickets。把地图直接循环进 [implement](https://aihero.dev/skills-implement) 会跳过折叠、丢掉链接起来的细节。只有工作结果真的很小时才直接去实现。人们确实跑精简流水线并报告有效；那两步额外步骤买到的是一份审查者或同事能读的显式 spec 工件，你越不是单干，它越重要。

**我的代理在 wayfinder 会话中途开始写生产代码。**
这个技能被报告最多的失败，背后有一个真实的洞。Wayfinder 的"规划，别做"默认可以在地图的**Notes** 里被覆盖——但 Notes 是代理写的，所以约束和它的豁免住在被约束方自己拥有的同一个文件里。一位用户看着一个代理把"这张地图承载执行"写进它自己的 Notes，然后在后面的会话里把它读回作自己的许可证，在一个活服务器上继续构建。技能内部没有硬性停止"我指的是默认"。在那之前：读任何不是你亲手测绘的地图的 Notes，把实现留在它自己的会话里，并把任何看起来像构建切片的 `wayfinder:task` 当作打错类型。

**我测绘了 27 个 tickets，等我到第十三个时，其余的都不再讲得通了。**
一个真实且被反复报告的结果，逐字来自一份现场报告。Wayfinder 的默认本能是全面规划，而一张后部 tickets 建立在早期 tickets 推翻的假设上的地图，恰恰是这个技能被指控的瀑布陷阱。有两件事顶回去。把地图范围限定到一个有界的目的地，而不是整个产品——从业者一致报告，限定在一个定义好的 epic 的地图比一张蔓延的"实现 V1"表现更好，而且规划非常大的东西一开始就不是目标——分小块交付才是。以及激进地[原型化（prototype）](https://www.aihero.dev/ai-coding-dictionary/prototyping)：路线保持当下的全部原因，就是不确定性在实现依赖它之前被便宜的具体工件冲掉。Wayfinder 是"原型最大化"，不是"规划最大化"。

**我能并行处理几个 tickets 吗？**
前沿就是建来给你看什么可取的，阻塞边也在，让并行工作在纸面上安全。实际上一次一个才是更安全的默认。同时处理两个 grilling tickets 的用户，会在一个会话里被问到刚刚在另一个会话里回答过的问题，因为会话之间不共享[上下文（context）](https://www.aihero.dev/ai-coding-dictionary/context)。还有一个已知的 prototype tickets 缺口：有代理被报告构建三个 UI 变体、自己选了一个、然后关闭 ticket——选择是你的，技能目前没有足够大声地说出来。如果你确实并行跑，先自己审查依赖图。

**我必须用 GitHub Issues 吗？**
不用——任何 issue 追踪器都行。GitHub 是支持最好的路径，因为它的原生子 issue 和阻塞关系让前沿无需打开地图就能可见；GitLab、Linear、Jira 和本地 markdown 都有人用。两条诚实的告诫。没有原生阻塞的追踪器意味着依赖图从文本推断，需要手工修正。而本地 markdown 把工件放进你的仓库，这不受推荐：把这种材料存在仓库里往往导致意外持久化。开源维护者撞上相反的问题——公开追踪器被代理生成的规划 tickets 填满——而且往往还是选本地 markdown。

**盘问让人精疲力尽。每个问题有三段长。**
这是关于 wayfinder 最尖锐的现役抱怨，尚未解决。一位用户给出的分解：冗长本身导致决策疲劳，而长度剥掉了*为什么*会问这个问题，所以当地图变长时你失去决策到决策的链条。冗长看起来是当前一代[模型（model）](https://www.aihero.dev/ai-coding-dictionary/model)的属性，而不是技能的，没有修复落地。流传的从业者缓解：跑更低的[推理投入度（reasoning effort）](https://www.aihero.dev/ai-coding-dictionary/effort)，并在你的全局 `CLAUDE.md` 里放一条平实语言的指示。无论怎样预期要在这里投入真正的思考——wayfinder 要求你的思考量不是缺陷，它几乎就是它存在的意义。

**一个我已经关闭的决策结果错了。我是编辑旧 ticket 还是开新的？**
没有官方指引，而代理的直觉没帮助：它倾向于围绕坏决策设计，而不是挑战它，所以你必须手工引导。真正有效的是直白地告诉 wayfinder 什么变了——它会更新地图、修订受影响的 tickets、并在已关闭的上评论。地图中途的范围变化是可恢复的。一张你*设计成*会变的地图是范围设定的异味。

**`decision-mapping` 去哪了？**
就是这个技能，v1.1 改名为 `wayfinder`，以 `/wayfinder` 调用。"决策地图"是行话，而且也不准确，因为四种 ticket 类型里只有一种真的是决策本身。重新框架给技能一套连贯的词汇——目的地、战争迷雾、前沿、地图——而不是在顶上叠一个发明的术语。单位保留了"决策"这个词：**决策 ticket** 是 wayfinder ticket 的称呼，正是为了阻止人们把它读成实现 ticket。

## 怎样算成功

- 目的地被写下来并达成一致，在任何一个 ticket 存在之前。
- 每个打开的 ticket 读起来是一个问题。任何读作"构建 X"的 ticket 要么打错了类型，要么属于地图的下游。
- 你能看你的追踪器、不开地图就知道哪些 tickets 可取——那是前沿通过原生阻塞在自我渲染。
- 一个会话解决一个 ticket、把答案作为解决评论发布、关闭它、在地图的 *Decisions so far* 上留一行。然后它停下。
- **Not yet specified** 随时间缩小。一块升级成 ticket 的迷雾从那个小节消失，而不是同时活在两处。
- 当开场广度优先盘问完全没找到迷雾时，技能停下，告诉你工作小到可以跳过地图。
- 完成地图的会话把你引向一份 spec，而不是一个 pull request。

## 它的定位

`wayfinder` 是一个**情境式入口**，不是默认前门。盘问主导的 想法 → 发布 链仍然是大多数工作开始的地方；wayfinder 是当想法大到装不进一个会话时你爬上去的东西，它在 [to-spec](https://aihero.dev/skills-to-spec) 处并回那条链，因为一张清空的地图移交而不是构建。

底下，它大多是穿着 wayfinder 排程外套的其他技能：[grilling](https://aihero.dev/skills-grilling) 和 [domain-modeling](https://aihero.dev/skills-domain-modeling) 解决默认 ticket 类型，[prototype](https://aihero.dev/skills-prototype) 解决谈话解决不了的 tickets，[research](https://aihero.dev/skills-research) 作为子代理运行，所以它的阅读永远不会落进你的会话。[handoff](https://aihero.dev/skills-handoff) 是进出的桥——从一个长过自己的对话进入地图，从地图出来当一个支线任务在会话中途出现时。其他任何情况，[ask-matt](https://aihero.dev/skills-ask-matt) 会路由整个集合。
