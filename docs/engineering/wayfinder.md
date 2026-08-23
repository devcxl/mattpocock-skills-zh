## 它的作用

`wayfinder` 接住一项对一次 agent [session](https://www.aihero.dev/ai-coding-dictionary/session) 来说太大的工作：一个你能说出其**目的地**但还看不清路线的主意，并把它绘制成你 issue 追踪器上由**决策 tickets** 构成的一张共享**地图**，然后一张一张地解决它们，直到道路变得清晰。

它规划，不动手。每张 ticket 持有的问题、其解决是一个决策，而不是一段要去执行的构建切片，地图在"在某人去构建那个东西之前已经没什么要决定的了"时就完成了。这一条规则就是 wayfinder ticket 与普通实现 [ticket](https://www.aihero.dev/ai-coding-dictionary/ticket) 的分野，也是 agent 最常违反的规则。地图清空时，wayfinder 交班；它不会一直走到代码里去。

## 何时使用

你通过键入 `/wayfinder` 来调用它；[agent](https://www.aihero.dev/ai-coding-dictionary/agent) 不会主动使用它。

它是整套里最重、最密的流程，所以触发条件很窄：工作量必须真的比一次 agent 会话能容纳的更大，并且通往目的地的路线必须是模糊的。分界很清楚：单会话规划用 `/grill-with-docs`，多会话规划用 `/wayfinder`。

| 你面前是什么 | 跑什么 |
| --- | --- |
| 一个范围良好的功能，你能在一次坐下里敲定 | [grill-me](https://aihero.dev/skills-grill-me)，有代码库时用 [grill-with-docs](https://aihero.dev/skills-grill-with-docs) |
| 一个绿地项目，或跨多会话的构建，并且路线仍不清楚 | `/wayfinder` |
| 一段决定已经做完的对话线程 | [to-spec](https://aihero.dev/skills-to-spec)：跳过地图 |
| 一张已经清空的 wayfinder 地图 | [to-spec](https://aihero.dev/skills-to-spec)，然后 [to-tickets](https://aihero.dev/skills-to-tickets) 和 [implement](https://aihero.dev/skills-implement) |
| 一次已经长出边界的现存会话 | 说"hand off to `/wayfinder`"（[handoff](https://aihero.dev/skills-handoff) 既能进入一张地图、也能从一张地图出来） |

绿地不是必需条件。Wayfinder 在遗留和半构建代码库上被常态化使用，而且在那里更锐利——因为大量"迷雾"是"这里已经什么是真的"、而不是"我们应该做什么"。

## 先决条件

地图和它的 tickets 活在仓库的 issue 追踪器上，所以 wayfinder 需要 [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills) 铺设的追踪器接线。那一步写下一段"Wayfinding operations"小节，描述 GitHub、GitLab 或本地 markdown 下地图、其子 tickets、阻塞边和前沿查询如何被表达。Wayfinder 通过你 `CLAUDE.md` / `AGENTS.md` 里的指针解析那份文档、而不是固定路径；完全没有配置追踪器时它回退到本地 markdown 文件。

追踪器不是装饰。阻塞是让前沿在追踪器自己的 UI 里被可视地渲染的东西；一个没有原生依赖链接的追踪器（比如自托管的 Gitea）会让 wayfinder 退化为从地图文本推断 blocker，能用但需要更密切的监督。

## 地图、迷雾与前沿

**地图**是一张打了 `wayfinder:map` 标签的 issue；它的 tickets 是其子 issues。它是一份**索引，而不是仓库**：一项决策只活在一个地方——它的 ticket——地图只是简述它并链接。一次会话以低分辨率加载地图、按需放大单张 ticket，这正是让一张地图可以持续长大、而不让每次会话都为它的整段历史付费的原因。

四样东西活在它上面：

- **目的地**：走到这张地图的尽头长什么样。命名它是绘制的第一个动作，在任何 ticket 存在之前，因为目的地固定了每张 ticket 被衡量的范围。
- **到目前已做的决策**：每张已关闭 ticket 一行，每行链接到详细实际居住的地方。
- **尚未明确**：**战争迷雾（fog of war）**。你能判断出即将到来、但此刻还不能尖锐措辞的决策。迷雾与 ticket 的分界测试是：你*现在*能不能精确陈述问题，而不是你能不能回答它。解决一张 ticket 揭开它前方的迷雾，并把任何现在可被规格化的部分升格成新 ticket。
- **超出范围**：被裁定在目的地之外的工作。迷雾永远只朝着目的地聚集，所以超出范围的工作被关掉、永远不升格。

**前沿**是那些打开、未阻塞、未被认领的 tickets（已知之物的边缘）。一次会话在开任何工作之前先把自己指派为它的 assignee，所以 assignee *就是*认领，并发的会话会跳过它。Tickets 始终按名字引用，从不按赤裸的 `#42`；一墙的 issue 编号在叙述里没法读。

## 四种决策 ticket 类型

每张 ticket 带一个 `wayfinder:<type>` 标签，并且要么是 **[HITL](https://www.aihero.dev/ai-coding-dictionary/human-in-the-loop)**（与一个替自己说话的人类一起处理），要么是 **[AFK](https://www.aihero.dev/ai-coding-dictionary/afk)**，由 agent 单独驱动。一张 HITL ticket 只能通过实时交流解决；一个替自己回答 [grilling](https://aihero.dev/skills-grilling) 问题的 agent 已经把它打破了。

| 类型 | 模式 | 在什么时候用 | 由什么解决 |
| --- | --- | --- | --- |
| `grilling` | HITL | 默认。问题能靠谈开解决。 | [grilling](https://aihero.dev/skills-grilling) 加 [domain-modeling](https://aihero.dev/skills-domain-modeling)，在一次新会话里 |
| `prototype` | HITL | "这应该长什么样"或"这应该怎么行为"：一个谈话敲不定的问题。 | [prototype](https://aihero.dev/skills-prototype)，成品作为资产从 ticket 链接 |
| `research` | AFK | 工作目录之外的一个事实正卡着一个决策。 | 一个 [research](https://aihero.dev/skills-research) [subagent](https://www.aihero.dev/ai-coding-dictionary/subagent)，绘制时被触发、在一条 `research/<name>` 分支上并行烧掉 |
| `task` | 任意 | 没有要决定的事，但手工工作卡着决策，例如开通访问、注册服务、搬动数据以看到它的形状。 | agent 单独能做的就它做，否则交给人类的一份精确清单 |

`task` 是唯一一种*做*而不是*决定*的类型，它的存在资格是解除一个决策的阻塞、永远不是交付目的地的一小片。这是实践中出错最多的那种类型：agent 会把它解读为一步实现，并开始在地图里写产品代码。

Research 是*一张 ticket 一次会话*规则之外唯一的例外。

## 常见问题

**这和 `/grill-with-docs` 有什么不同？我该从哪个开始？**

会话数，而不是项目大小。`/grill-with-docs` 是单会话规划；wayfinder 是多会话规划。如果你能在一次对话里容纳整件事，盘问是更便宜、更好的工具，并且对于那种情况 wayfinder 真的更慢、更密。社区沉淀下来的简短说法是：wayfinder 只有在工作装不进一次会话时才有意义。以明显优势这是 wayfinder 被问得最多的问题，它一直被问是因为描述并不告诉你自己的任务落在这条线的哪里。会话数要你自己判断。

**当它要"目的地"时，它指的是本次会话的尽头，还是一切的尽头？**

整张地图。那意味着整张地图的目的地，不只是最初的会话。这个问题读起来有歧义，因为 wayfinder 在定义上是一个多会话工具，所以一个会话范围内的答案永远说不通。典型的目的地是一份要交付的 [spec](https://www.aihero.dev/ai-coding-dictionary/spec)、一个在规划开始前锁定的决策、一个概念验证、或一次就地完成的变更（比如数据迁移）。

**地图清空了。wayfinder 不是已经把 spec 写好、tickets 做好了？我为什么还需要 `/to-spec` 和 `/to-tickets`？**

不。Wayfinder 的 tickets 是决策 tickets，当地图关闭时它们也都已关闭。剩下的是一张装满链接决策的地图，它不是一份构建计划。[to-spec](https://aihero.dev/skills-to-spec) 把那些链接决策折成一份 spec（`/to-spec #<map_issue>`），[to-tickets](https://aihero.dev/skills-to-tickets) 把它切成示踪弹实现 tickets。把地图直接接进 [implement](https://aihero.dev/skills-implement) 跳过了那次折叠、把链接的细节扔了。只有工作量最终真的很小时，才直接进实现。确实有人跑那条缩写版的流水线并报告它能用；多出来的两步给你一份评审员或同事能读的显式 spec 工件，你越不是一个人它就越重要。

**我的 agent 在一次 wayfinder 会话中间开始写生产代码。**

这份技能被报告最多的失败，并且背后有一个真实的缺口。Wayfinder 的"规划，不动手"默认可以在地图的**Notes** 里被覆盖，但 Notes 是 agent 自己写的，所以约束和它的豁免就活在同一份被约束方拥有的文件里。一位用户曾看到 agent 写下"this map carries execution"到自己的 Notes 里，然后在后续会话里把它读回来当作自己的许可，在一台 live server 上搭东西。对于"我想要的是默认"没有硬性的、技能内的停止位。在那之前：读任何不是你亲手绘制的地图的 Notes，把实现留在它自己的会话里，并把任何看起来像一片构建的 `wayfinder:task` 当成类型错。

**我绘制了 27 张 ticket，等到第十三张时，其余的已经讲不通了。**

一份真实且反复被报告的结果，原话照搬自一份现场报告。Wayfinder 的默认本能是综合地规划，一张地图的后面那些 ticket 立足于前面那些 ticket 否定了的假设，这正是这份技能被指责的瀑布陷阱。两件事推回去。把地图的范围限定在一个有界的目的地，而不是整个产品。从业者一致报告：范围被限定在一个定义好的 epic 上的地图，比一张蔓延的"实现 V1"表现得更好，并且规划一个非常大的东西本来就不是目标本身——目标是小步交付。还有一件事：激进地用 [prototype](https://aihero.dev/skills-prototype)。路线保持新鲜的全部原因在于不确定性在实现依赖它之前被廉价的具象工件冲刷掉。Wayfinder 是"prototype-maxxing"，不是"planmaxxing"。

**我能并行处理几张 ticket 吗？**

前沿被构建出来是为了向你展示哪些可领，阻塞边之所以存在是因为并行工作在纸面上是安全的。实践中一次一张是更安全的默认。同时处理两张 grilling tickets 的用户，会在一个会话里被问到一个他刚刚在另一个会话里答过的问题，因为那两个会话之间不共享 [context](https://www.aihero.dev/ai-coding-dictionary/context)。在 prototype tickets 上还有一个已知缺口：曾被报告一个 agent 自己搭了三个 UI 变体、自己挑了一个、并关闭了 ticket。挑选是你自己的事，并且这份技能当前还不够响亮地说出这一点。如果你确实并行跑，先自己过一遍依赖图。

**我必须用 GitHub Issues 吗？**

不必。任何 issue 追踪器都可以。GitHub 是支持最好的路径，因为它的原生 sub-issues 和阻塞关系正是让前沿无需打开地图就可见的东西；GitLab、Linear、Jira 和本地 markdown 都被使用。两个诚实的注意事项。没有原生阻塞的追踪器意味着依赖图要从文本推断、并需要手工修正。本地 markdown 把工件放进你的仓库，这不被推荐：在仓库里存放这些材料往往会带来意外的持久化。开源维护者撞上相反的问题（公开追踪器被 agent 生成的规划 tickets 填满），并且倾向于仍然选本地 markdown。

**盘问令人疲惫。每个问题都是三段长。**

这是对 wayfinder 最尖锐的现存抱怨，且未解决。一位用户给出的拆解：冗长本身造成决策疲劳，长度剥离了*为什么*在问这个问题，所以随着地图变长你会丢失决策与决策之间的链条。冗长看起来像是当前这套 [model](https://www.aihero.dev/ai-coding-dictionary/model) 的属性，而不是这份技能的，且没有修复落地。在用的从业者缓解办法：把 [reasoning effort](https://www.aihero.dev/ai-coding-dictionary/effort) 调低，并在你的全局 `CLAUDE.md` 里放一条平实语言的指令。无论如何要预期在这里花真思考，因为 wayfinder 向你要的思考量不是一个缺陷，而是它存在的大部分理由。

**我已经关掉的一项决策后来是错的。我是编辑旧 ticket 还是新开一张？**

没有官方指引，并且 agent 的直觉也不帮忙：它倾向于围绕那个坏决策做设计，而不是挑战它，所以你必须手工掌舵。起作用的做法是直白告诉 wayfinder 什么变了；它更新地图、修订受影响的 tickets、并在已关闭的上面评论。地图中途的 scope 变化是可恢复的。一张被*设计为要改*的地图是个 scope 异味。

**`decision-mapping` 去哪了？**

就是这份技能，在 v1.1 改名为 `wayfinder` 并以 `/wayfinder` 调用。"Decision map" 是术语、并且也不准确，因为四种 ticket 类型中只有一种本身真是决策。这个重构让这份技能拥有一套连贯词汇（destination、fog of war、frontier、the map），而不是在一份现成的术语之上再发明一份。单位却保留了"decision"这个词：**decision ticket** 就是一张 wayfinder ticket 的叫法，正是为了阻止人们把它读成一张实现 ticket。

## 怎样算成功

- 目的地被写下并约定在单张 ticket 存在之前。
- 每张打开的 ticket 读起来都是一个问句。任何读起来像"搭这个"的 ticket，要么是打错了，要么属于地图的下游。
- 你能看着你的追踪器、不打开地图就知道哪些 tickets 可领，因为那就是通过原生阻塞自我渲染的前沿。
- 一次会话解决一张 ticket、把答案作为一条 resolution comment 发出去、关闭它、并在地图的 *Decisions so far* 留一行。然后它停下。
- **尚未明确**随时间缩小。一片迷雾升格成一张 ticket、从那一节消失、而不是同时活在两个地方。
- 当开场那次广度优先的盘问没翻出任何迷雾时，技能停下并告诉你这个工作量小到可以跳过地图。
- 结束地图的那次会话把你交向一份 spec，而不是一份 pull request。

## 它的定位

`wayfinder` 是一个**情境性入口**，不是默认前门。由盘问领起的 idea → ship 链仍然是大多数工作的起点；wayfinder 是当一个主意大到一次会话装不下时你爬上去的东西，并因为一张清空的地图交班而非构建而在 [to-spec](https://aihero.dev/skills-to-spec) 回到那条链。

在底下，它大多是披着 wayfinder 调度的其他技能：[grilling](https://aihero.dev/skills-grilling) 和 [domain-modeling](https://aihero.dev/skills-domain-modeling) 解决默认 ticket 类型；[prototype](https://aihero.dev/skills-prototype) 解决那些谈话敲不定的 tickets；[research](https://aihero.dev/skills-research) 作为 subagent 跑、它的阅读从不落进你的会话。[handoff](https://aihero.dev/skills-handoff) 是进和出的桥梁：从一次超出自身的对话进一张地图；会话中途出现一个旁支 quest 时从一张地图出来。任何其他东西，[ask-matt](https://aihero.dev/skills-ask-matt) 在整套集合上给你路由。