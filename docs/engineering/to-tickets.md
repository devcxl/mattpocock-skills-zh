## 它的作用

`to-tickets` 拿一个计划、一份 [spec](https://www.aihero.dev/ai-coding-dictionary/spec) 或你正在进行的对话，把它拆成你 issue 追踪器上的一组 **[tickets](https://www.aihero.dev/ai-coding-dictionary/ticket)**。每个 ticket 声明它的**阻塞边（blocking edges）**——在它开始之前必须完成的其他 tickets。

每个 ticket 都是一颗**曳光弹（tracer bullet）**：一条窄但完整的路径，穿过变更的每一层——schema、API、UI、测试——落地那一刻就能独立演示。正是这个约束让它不同于拆分工作的显而易见方式（一次切一层、结尾再集成）。它还按装进一个全新[上下文窗口（context window）](https://www.aihero.dev/ai-coding-dictionary/context-window)来给每个 ticket 定尺寸，因为捡起 ticket 的是一个从未见过你的 spec 的[会话（session）](https://www.aihero.dev/ai-coding-dictionary/session)。

## 何时使用

你通过键入 `/to-tickets` 来调用它——[代理（agent）](https://www.aihero.dev/ai-coding-dictionary/agent)不会主动使用它。

| 你在哪里 | 跑什么 |
| --- | --- |
| 你有一个 spec issue，构建跨几个会话 | `/to-tickets`，或 `/to-tickets #<spec_issue>` |
| 计划只存在于对话里，从未写成文档 | `/to-tickets` 直接读线程——不需要 spec |
| 整个变更装得进一个上下文窗口 | [implement](https://aihero.dev/skills-implement)——跳过 tickets |
| 什么都还没决定 | [grill-with-docs](https://aihero.dev/skills-grill-with-docs)，然后 [to-spec](https://aihero.dev/skills-to-spec) |
| 一张 [wayfinder](https://aihero.dev/skills-wayfinder) 地图已清空 | 先 [to-spec](https://aihero.dev/skills-to-spec) 折叠地图，然后 `/to-tickets` |

`to-tickets` 产出的 tickets 构造上就是代理就绪的。别对它们跑 [triage](https://aihero.dev/skills-triage)——triage 是给来自他人的工作的。

## 前置条件

`to-tickets` 发布进一个追踪器，所以 [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills) 必须先为这个仓库配置一个，连同 triage 标签词汇。两种都行：GitHub 或 Linear 这样的真实追踪器，或者 `.scratch/` 下的本地 markdown 文件，后者开箱即用。

## 曳光弹，不是层

**水平**切片交付变更的一层。在每一层都落地之前，什么都不能工作，而且每个 ticket 的验收标准不得不伸进另一个 ticket 拥有的工作。**垂直**切片——曳光弹——一次交付一条穿过所有层的细路径，所以它可以单独验证，并且拥有它评分的一切。

这是人们最常打破的规则，后果有充分记录。一个团队跑了一个按层切分的 26-ticket 栈——语料库、生产者、聚合器、选择器——每个已关闭 ticket 大约花了二十次代理运行，其中约四分之三是返工。他们自己的事后分析把每个失败类别都追溯到水平切片，而不是实现。

在发布任何东西之前有两件事发生。`to-tickets` 寻找预重构（prefactoring）——"让变更变容易，然后做那个容易的变更"——并把那部分工作排在最前。然后它把拆解作为编号清单呈现给你，并就它考你：粒度对吗、阻塞边真实吗、有没有什么该合并或拆分。在你批准之前，没有任何东西到达追踪器，而那个问答正是你可以顶回去的地方。

## 阻塞边

边是这个工件的重点。它们随追踪器不同有两种读法：

| 追踪器 | 边住在哪里 | 你怎么处理它们 |
| --- | --- | --- |
| 本地 markdown | `.scratch/<feature>/issues/<NN>-<slug>.md` 下每个 ticket 一个文件里的文本，阻塞者在前编号 | 从上到下，手工 |
| 真实追踪器（GitHub、Linear） | 原生阻塞链接，或追踪器有子 issue 时用子 issue | 任何阻塞者都完成的 ticket 就在**前沿（frontier）**上，可以被抓取 |

无论哪种方式，边都住在 ticket 里。媒介只决定是否有东西能并行作用于它们。`to-tickets` 产出工件；运行它——一次一个会话，或一支舰队——是你的工作，不是技能的。

## 宽重构例外

一种形状打破曳光弹规则。**宽重构（wide refactor）**是单一机械性变更——重命名一列、给共享符号换类型——其**爆炸半径（blast radius）**扇过整个代码库，所以一次编辑弄坏成千个调用点，没有垂直切片能绿色落地。

`to-tickets` 改为按**展开-收缩（expand–contract）**排序：

- **展开（Expand）**——在旧形式旁边加上新形式，什么都不破坏。
- **迁移（Migrate）**——按爆炸半径定尺寸（按包、按目录）成批搬移调用点，每批一个 ticket，每个都被展开阻塞。CI 保持绿色，因为旧形式仍然存在。
- **收缩（Contract）**——一旦没有调用者剩余，删除旧形式，这个 ticket 被每一个迁移批次阻塞。

当连批次都无法独自保持绿色时，它们共享一条集成分支，并全部阻塞一个最终的集成与验证 ticket。绿色只在那一处被承诺。

## 常见问题

**它为一个三行变更产出了十二个 tickets。**
过度分解是这个技能被报告最多的摩擦点，而且跨从业者一致：[模型（model）](https://www.aihero.dev/ai-coding-dictionary/model)默认原子单元，丢掉会让它们有意义的归组。问答步骤恰恰为此存在——叫它合并，它会合并。更深的答案是 tickets 有一个地板：如果整个变更装得进一个上下文窗口，你根本不需要这个技能。直接去 [implement](https://aihero.dev/skills-implement)。

**tickets 按层出来了——所有 schema 一个、所有 API 另一个。**
这正是垂直切片规则针对的失败，而技能有时仍然产出它。在问答步骤抓住它，每个 ticket 问一个问题：这个完成时我能演示什么？没有答案的 ticket 就是水平切片。有些人为此给每个 ticket 加一行"演示路径"，并报告这会推动模型走向垂直分解。

**在 GitHub 上 tickets 没有被创建为 spec issue 的子 issue。**
已知且未修复。它在十几次运行和几个模型上被报告过，[在 issue #554 里最完整](https://github.com/mattpocock/skills/issues/554)，而且在 Codex 上比在 Claude 上更糟。`gh` 从 v2.94 起原生支持：`gh issue create --parent <n>`，以及事后 `gh issue edit <parent> --add-sub-issue <n>`。在追踪器模板偏好那些之前，运行后自己接父链接是可靠的做法。

**"Blocked by" 被写进了 issue 正文，而不是真正的阻塞链接。**
同一类问题，[在 issue #513 里被报告](https://github.com/mattpocock/skills/issues/513)，那里的代理甚至断言 GitHub 根本没有原生阻塞关系。它有的——`gh issue create --blocked-by 12,15`。因为阻塞者先发布，它们的编号在创建时总是可用的。正文文本本应是给没有原生边的追踪器的兜底，而不是默认。

**本地 tickets 去哪了？v1.1 的笔记说根级 `tickets.md`。**
说过，而那是个 bug——一个共享文件在并行代理写入时也会竞争。本地模式现在在 `.scratch/<feature-slug>/issues/<NN>-<slug>.md` 下每个 ticket 写一个文件，按依赖顺序，匹配本地追踪器模板已经描述的布局。`NN` 前缀是真实的 ticket ID，所以 `/implement 03` 能用，而不是重打一个长标题。

**它读我的 spec 时老是截断。**
非常大的 spec 可能超出追踪器 issue 能干净回送的大小，而且没有本地副本可兜底——代理随后烧[工具调用（tool calls）](https://www.aihero.dev/ai-coding-dictionary/tool-call)重新抓取碎片，永远到不了结尾。不要在 `/to-spec` 和 `/to-tickets` 之间[清空（clear）](https://www.aihero.dev/ai-coding-dictionary/clearing)或[压缩（compact）](https://www.aihero.dev/ai-coding-dictionary/compaction)。在同一个上下文窗口里跑它们，spec 就根本不需要被取回。

**验收标准什么都没评分——有些在没做任何工作之前就过了。**
模板要标准，却没说它们能不能失败，所以会发生。三种形状反复出现：一条标准在基础提交时就已为真、一条只能被另一个 ticket 拥有的工作满足、以及一条复述请求而不是从工件推导。垂直切片阻止了大部分——一个交付了之前不存在行为的切片，构造上在基础提交时就是红的——但手工检查值得做。对每条标准，说出能证明它为假的观察，并确认它在实现者开始的提交处确实失败。

**tickets 已发布。我到底怎么运行它们？**
技能在工件处停下，没有自动派发模式。派发是手动的：看板子，数没有未关闭阻塞者的 tickets，开那么多代理会话。每个新上下文一个 ticket，之间清空。注意 [implement](https://aihero.dev/skills-implement) 完成时不会可靠地关闭或勾掉 ticket——在 GitHub 和本地 markdown 上都是——所以 ticket 的状态由你来更新。

## 怎样算成功

- 每个 ticket 对"这个完成时我能演示什么？"都有答案——而且答案是行为，不是层。
- 清单以编号形式回到你手里，每条带一行"Blocked by"，在任何东西发布之前。
- 顶部的 ticket 没有阻塞者，可以立即开始。
- ticket 正文里没有文件路径或行号，除了原型产出的片段。
- 每个 ticket 读起来像是全新会话能在你不在场时完成的东西。
- 找到的预重构排在顺序最前，而不是混进功能 tickets。

## 它的定位

`to-tickets` 是主构建链里的一步：

```txt
grill-with-docs → to-spec → to-tickets → implement → code-review
```

上游是 [to-spec](https://aihero.dev/skills-to-spec)，它交给它一份已敲定的 spec 来切分——把两者保持在一个不断裂的上下文窗口里。下游是 [implement](https://aihero.dev/skills-implement)，它每个新会话构建一个 ticket，为测试驱动 [tdd](https://aihero.dev/skills-tdd)，并以 [code-review](https://aihero.dev/skills-code-review) 收尾。拿不准哪个技能或流程合适时，[ask-matt](https://aihero.dev/skills-ask-matt) 会为你路由。
