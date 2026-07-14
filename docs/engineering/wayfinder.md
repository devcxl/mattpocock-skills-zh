快速开始：

```bash
npx skills add mattpocock/skills --skill=wayfinder
```

```bash
npx skills update wayfinder
```

[源代码](https://github.com/mattpocock/skills/tree/main/skills/engineering/wayfinder)

## 功能

`wayfinder` 将一个大到单个 agent 会话装不下的工作——被迷雾笼罩，从当前到目标的路还看不清楚——绘制为 Issue 跟踪器上的一张**共享地图**，地图上是**决策 ticket**，然后逐个解决，直到路线清晰。它**规划，不动手**：每个 ticket 解决一个决策——一个需要回答的问题，而非一个需要执行的可交付物——当没有任何需要决定的事情时地图就完成了，因此它产出的是决策，而非可交付物。

## 何时使用

通过输入 `/wayfinder` 来调用——agent 不会主动使用它。

当一个工作**超过一个 agent 会话能容纳的量**，且到达其**目的地**的路线仍然笼罩在迷雾中——你能感觉到工作的形状，但还不能将其写为规范或计划时使用。要将*已经清晰*的内容转化为 spec，请使用 [to-spec](https://aihero.dev/skills-to-spec)；要将已理解的计划切成可构建的 ticket，请使用 [to-tickets](https://aihero.dev/skills-to-tickets)。Wayfinder 位于两者上游：当迷雾大到无法直接编写 spec 时，你运行它。

## 前置条件

地图及其 ticket 位于仓库的 Issue 跟踪器上，因此 wayfinder 需要由 [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills) 配置好的跟踪器连接——它会生成一个"Wayfinding 操作"章节，描述在 GitHub、GitLab 或本地 Markdown 下如何表示地图、子 ticket、阻塞关系和前沿查询。如果没有该文档，wayfinder 默认使用本地 Markdown 地图。

## 地图是索引，迷雾是前沿

**地图**是一个带有 `wayfinder:map` 标签的 Issue，其 ticket 是它的子 issue——整个团队可共同查看的一个共享 URL。它是**索引，而非仓库**：每个决策只存在于一个地方（它的 ticket 中），地图只摘要和链接，从不重述。每个会话以低分辨率加载地图，按需放大进入单个 ticket。

在活跃 ticket 之外是**战争迷雾**——你能感觉到即将到来但还不能确定的决策。判断某物是一个 ticket 还是仍然处于迷雾中的检验标准是：你能否现在*精确陈述问题*，而非你能否回答它。解决一个 ticket 会清除它前方的迷雾，将现在可明确的内容**毕业**为新的 ticket。**前沿**是打开的、未阻塞的、未分配的 ticket——已知领域的边界——跟踪器的原生阻塞功能在视觉上呈现它，让你无需打开地图就能看到哪些是可领取的。迷雾只朝**目的地**方向聚集；超出目的地的工作被判定为**范围外**，关闭，永不毕业。

每个 ticket 要么是 **HITL**（人在回路——盘问、原型制作），要么是 **AFK**（agent 独立完成——研究）；HITL ticket 只能通过实时交流解决，因此 agent 永远不会自己回答自己的问题。研究仍然是一个真实的 ticket——一个下游决策所依赖的共享阻塞项——但由于它是 AFK，会话不会停下来等待阅读：它会启动一个 `/research` **子代理**并行地解决该 ticket，保持前沿快速推进，并在一个可丢弃的 `research/<name>` 分支上捕获发现。

## 验证标准

- **命名目的地**是第一个行为——在任何 ticket 存在之前——因为它固定了每个 ticket 的评估范围
- 一个地图就是一个 `wayfinder:map` Issue；ticket 是它的子 issue，通过**名称**引用，绝不用裸 `#42`
- 一个会话最多解决**一个 ticket**（研究 ticket 除外），将答案记录为解决评论，关闭 ticket，并在"已有决策"中追加一行摘要
- 如果开始的盘问没有浮现**任何迷雾**，它会停止并告诉你这个工作小到可以跳过地图

## 定位

`wayfinder` 是一个大型想法的**入口匝道**：大到无法在一次坐下写完 spec 的工作会生成一张清除了决策迷雾的地图，然后合并到主构建流程中。当迷雾被推回、路线清晰时，交由 [to-spec](https://aihero.dev/skills-to-spec) 来安排多会话的构建（如果工作量较小，也可以直接实现）。它依靠 [grilling](https://aihero.dev/skills-grilling) 和 [domain-modeling](https://aihero.dev/skills-domain-modeling) 来解析单个 ticket，依靠 [prototype](https://aihero.dev/skills-prototype) 和 [research](https://aihero.dev/skills-research) 来处理需要它们的 ticket 类型。当你不确定哪种技能或流程适合时，[ask-matt](https://aihero.dev/skills-ask-matt) 会为你指路。
