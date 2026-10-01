## 它的作用

`to-tickets` 拿一份计划、一份 [spec](https://www.aihero.dev/ai-coding-dictionary/spec)，或者你正在进行的对话，把它切成你 issue 追踪器上的一组 **[tickets](https://www.aihero.dev/ai-coding-dictionary/ticket)**。每张 ticket 声明它的**阻塞边**：那些必须先完成才能开始它的其他 tickets。

每张 ticket 都是一发**示踪弹**：穿过这次变更每一层（schema、API、UI、tests）的一条窄而完整的路径，在它落地的那一刻能独立被演示。这正是让它表现不同于"切工作"的明显方式（一次切一层、最后集成）的约束。它也把每张 ticket 的大小调成装得下一次全新的 [context window](https://www.aihero.dev/ai-coding-dictionary/context-window)，因为会来接这张 ticket 的是一次从未见过你的 spec 的 [session](https://www.aihero.dev/ai-coding-dictionary/session)。

## 何时使用

你通过键入 `/to-tickets` 来调用它。[agent](https://www.aihero.dev/ai-coding-dictionary/agent) 不会主动使用它。

| 你在哪 | 跑什么 |
| --- | --- |
| 你有一份 spec issue，构建跨几次会话 | `/to-tickets`，或 `/to-tickets #<spec_issue>` |
| 计划只在对话里，从未被写成 spec | `/to-tickets` 直接读线程，不需要 spec |
| 整个变更装得下一次 context window | [implement](https://aihero.dev/skills-implement)，跳过 tickets |
| 什么都还没决定 | [grill-with-docs](https://aihero.dev/skills-grill-with-docs)，然后 [to-spec](https://aihero.dev/skills-to-spec) |
| 一张 [wayfinder](https://aihero.dev/skills-wayfinder) 地图已经清完 | 先 [to-spec](https://aihero.dev/skills-to-spec) 把地图折成一份 spec，然后 `/to-tickets` |

`to-tickets` 产出的 tickets 按构造是 agent-ready 的。别对它们跑 [triage](https://aihero.dev/skills-triage)。Triage 是为从别人那里到达的工作准备的。

## 先决条件

`to-tickets` 把内容发布进追踪器，所以 [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills) 必须已经为本仓库配置好一份追踪器，连同 triage 标签词汇。两种都可以：像 GitHub 或 Linear 这样的真实追踪器，或者 `.scratch/` 下的本地 markdown 文件——开箱支持。

## 示踪弹，不是分层

**水平**切片发一次变更的一层。没有任何东西能工作，直到每一层都落地，并且每张 ticket 的验收标准都得伸进另一张 ticket 拥有的工作里。**垂直**切片（示踪弹）一次性发一条穿过所有层的细路径，所以它能独立被验证、并且自己拥有它评分的全部内容。

这是人们最常违反的规则，后果也记录得很充分。一个团队跑了一份 26 张 ticket 的栈、按层切（语料、生产者、聚合器、选择器），结果每张关掉的 ticket 大约二十次 agent 跑动、四分之三是返工。他们自己的复盘把每一类失败都追回到水平切片，而不是实现。

两件事在任何东西发布之前发生。`to-tickets` 寻找 prefactoring（"先让变更容易，再做容易的变更"那条原则）并把那些工作排在最前。然后它把分解呈现为一张编号清单并考你：颗粒度对吗、阻塞边是真的吗、有没有要合并或拆分的。在你批准之前什么都没有到达追踪器，那次提问就是推回去的地方。

## 阻塞边

边是这份工件的重点。它根据追踪器的不同有两种读法：

| 追踪器 | 边住哪里 | 你怎么处理它们 |
| --- | --- | --- |
| 本地 markdown | `.scratch/<feature>/issues/<NN>-<slug>.md` 下一文件一份，编号按 blocker-first | 自上而下手工处理 |
| 真实追踪器（GitHub、Linear） | 原生阻塞链接，或追踪器有 sub-issues 时用 sub-issues | 任意一张 blocker 都完成的 ticket 处于**前沿**，可被领取 |

无论如何，边都活在 ticket 里。媒介只决定有没有东西能并行处理它们。`to-tickets` 产出这份工件；运行它（一次会话一张，或一支舰队）是你自己的事，不是技能的事。

## 宽重构例外

一种形状打破示踪弹规则。**宽重构**是一次单一的机械变更（重命名一个列、改类型一个共享符号），其**爆炸半径**扇形散过整个代码库，所以一次编辑会弄坏成千上万的调用点，没有一张垂直切片能绿色落地。

`to-tickets` 把那种按**expand–contract** 排序：

- **Expand**：把新形式放在老形式旁边，所以什么都不破。
- **Migrate**：按爆炸半径分批（按 package、按目录）挪动调用点，一批一张 ticket，每张被 expand 阻塞。CI 保持绿色，因为老形式还在。
- **Contract**：一旦没有调用方剩下、在一张被每张 migrate 批次都阻塞的 ticket 里删掉老形式。

当这些批次连单独保持绿色都做不到时，它们共享一条集成分支，并全部阻塞一张最终的集成并验证（integrate-and-verify）ticket。绿色只在那里被承诺。

## 常见问题

**它为一个三行变更产出了十二个 tickets。**

过度分解是这个技能被报告最多的摩擦点，而且跨从业者一致：[model](https://www.aihero.dev/ai-coding-dictionary/model) 默认原子单元，丢掉会让它们有意义的归组。提问那一步恰恰为此存在：叫它合并，它就会合并。更深的答案是 tickets 有一个下限：如果整个变更装得进一个 context window，你根本不需要这个技能。直接去 [implement](https://aihero.dev/skills-implement)。

**Tickets 出来时是一层一张：所有 schema 在一张，所有 API 在另一张。**

这是垂直切片规则所针对的失败，技能有时仍然会产出。在提问那一步用一个问题抓住它：每张 ticket 完成时我能 demo 什么？答不上来的那张就是水平切片。有人因此给每张 ticket 加一行"demo path"，并报告它会把 model 推向垂直分解。

**在 GitHub 上这些 tickets 不是作为 spec issue 的 sub-issues 被创建的。**

已知未修复。已在十余次跑动和多个 model 上被报告，[最完整的是 issue #554](https://github.com/mattpocock/skills/issues/554)，且在 Codex 上比在 Claude 上更糟。`gh` 从 v2.94 起原生支持：`gh issue create --parent <n>`，事后 `gh issue edit <parent> --add-sub-issue <n>`。在追踪器模板偏向那些之前，跑完之后自己手工接上父链接是可靠的招。

**"Blocked by" 被写进了 issue 正文里、而不是真实的阻塞链接。**

同类问题，[在 issue #513 中被报告](https://github.com/mattpocock/skills/issues/513)，agent 甚至断言 GitHub 根本没有原生阻塞关系。其实有：`gh issue create --blocked-by 12,15`。因为 blocker 是先发布的，它们的编号在创建时总是可用的。正文文本是为没有原生边的追踪器准备的兜底，不是默认。

**本地 tickets 放在哪？v1.1 的注释说一份根级 `tickets.md`。**

是这么说的，那是 bug：一份共享文件在并行 agent 写它时会撞车。本地模式现在为每张 ticket 写一份 `.scratch/<feature-slug>/issues/<NN>-<slug>.md` 下的文件，按依赖顺序排，匹配本地追踪器模板原本就描述的布局。`NN` 前缀是真实的 ticket ID，所以 `/implement 03` 能工作，而不必重打一个长长的标题。

**它试图读我的 spec 时一直在截断。**

非常大的 spec 可能长到一份追踪器 issue 不能干净地服务回来，并且没有本地副本可作兜底，所以 agent 然后烧一堆 [tool calls](https://www.aihero.dev/ai-coding-dictionary/tool-call) 反复取片段、永远到不了末尾。在 `/to-spec` 和 `/to-tickets` 之间不要 [clear](https://www.aihero.dev/ai-coding-dictionary/clearing) 或 [compact](https://www.aihero.dev/ai-coding-dictionary/compaction)。在同一个 context window 里跑它们，spec 就完全不需要被重新取回来。

**验收标准什么都没评：有些在任何工作做完之前就已经通过了。**

模板要的是标准、不说它们能不能失败，所以这会发生。三种形态反复出现：在 base commit 上已经为真的标准；只能被另一张 ticket 拥有的工作满足的标准；以及重述请求而不是从工件推导出来的标准。垂直切片能阻止其中大多数（一条交付了原本不存在的行为的切片在 base commit 上按构造是红的），但检查值得手工做一次。对每条标准，说出能证明它为假的观察，并确认它在 implementer 起手的那个 commit 上确实是失败的。

**Tickets 发布了。我到底怎么跑它们？**

技能停在工件上，没有自动派发模式。派发是手动的：看板，数没有未关闭 blocker 的 ticket，开那么多 agent 会话。一次全新上下文一张 ticket，它们之间清空。要意识到 [implement](https://aihero.dev/skills-implement) 在 GitHub 或本地 markdown 上都不那么可靠地关闭或勾掉 ticket，所以 ticket 的状态由你来更新。

## 怎样算成功

- 每张 ticket 都回答得了"完成时我能演示什么？"，答案是行为、不是层。
- 清单回来给你时是带编号的，每张带一行"Blocked by"，在有任何东西发布之前。
- 最上面那张 ticket 没有 blocker，可以立刻开始。
- 一张 ticket 正文里没有文件路径或行号，例外是 prototype 产出的片段。
- 每张 ticket 读起来像一张全新会话能自己搞完、你不在场也行的事。
- Prefactoring（如果它找到了）排在最前，而不是混在功能 ticket 里。

## 它的定位

`to-tickets` 是主构建链上的一步：

```txt
grill-with-docs → to-spec → to-tickets → implement → code-review → retro
```

上游是 [to-spec](https://aihero.dev/skills-to-spec)——交给它一份被敲定的 spec 来切；让两者留在同一个未被打断的 context window 里。下游是 [implement](https://aihero.dev/skills-implement)——每次全新会话构建一张 ticket，为测试驱动 [tdd](https://aihero.dev/skills-tdd)、以 [code-review](https://aihero.dev/skills-code-review) 收尾。[implement-spec](https://aihero.dev/skills-implement-spec) 是另一条向下的路：它把同样的阻塞边读成任务图，在一条集成分支上并行构建每一张就绪的 ticket。拿不准哪个技能或流程合适时，[ask-matt](https://aihero.dev/skills-ask-matt) 给你路由。
