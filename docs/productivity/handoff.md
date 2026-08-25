## 它的作用

`handoff` 把当前进行的对话压缩成一份**交接文档**：一份 markdown 文件，写入操作系统临时目录而不是工作区，让一个全新的 [agent](https://www.aihero.dev/ai-coding-dictionary/agent) 读取并接手工作。

它换来的是**便携性**，而不是压缩。这让这个技能比听上去更窄：你只在工作需要*搬运*的时候才需要一份文件：搬到一个新的 [harness](https://www.aihero.dev/ai-coding-dictionary/harness)、新的目录、一个同事，或一个你想分叉出来的支线任务。如果没什么要搬的，你不需要交接：留在 [session](https://www.aihero.dev/ai-coding-dictionary/session) 里、`/clear`、派个 [subagent](https://www.aihero.dev/ai-coding-dictionary/subagent)、或 `/compact` 覆盖了普通的"阶段结束"情况，而 `/compact` 比这个技能出现得更频繁。

## 何时使用

你通过键入 `/handoff` 来调用它：agent 不会主动使用它。传一段关于下一次会话用途的说明，文档就为它而写。

四种情况是全部触发：

| 情况 | 为什么要一份文件 |
| --- | --- |
| 切换 harness：Claude → Codex | 新 harness 看不到旧 [context](https://www.aihero.dev/ai-coding-dictionary/context) |
| 换到不同的目录或仓库 | 原型目录是常见场景 |
| 把工作交给一个同事 | 他们需要能读的东西 |
| 在某个阶段里分叉出一个支线任务 | 你继续干；第二个 agent 接住分叉 |

其他情况：同一 harness、同目录，你盘问完进入实现：用 `/compact`。在阶段边界不确定时，[ask-matt](https://aihero.dev/skills-ask-matt) 给出覆盖五种选项的有序决策树。

## 分叉是被跳过的那种用法

这个技能的描述读起来像是会话续接：写一份摘要、在这里结束、在那里继续。按这种读法它就像一个更差的 `/compact`，于是被略过。值得知道的是分叉的情况：你**留在当前 session 里**，把累积下来的 [context](https://www.aihero.dev/ai-coding-dictionary/context) 副本交给一个并行工作的第二个 agent。

这正是通过 [prototype](https://aihero.dev/skills-prototype) 的那段弯路所做的：你正深入一场设计对话，撞上一个只能靠跑代码才能确定的问题，你又不想把已经攒起来的对话花在这件事上。交接给一个 prototype session，拿到答案，把答案接回来，在原来的对话里引用它。两次穿越，一场进行中的对话，没有重述的东西。

五种选项里的三种各自保留不同的东西：`/compact` 保留你的意图，`/clear` 什么都不保留，`/handoff` 保留工作可被搬运的能力。

## 搬运什么，不搬运什么

文档携带的是进行中的对话：什么正在进行、为什么、接下来是什么：加一个**建议技能**部分，指明下一个 agent 应该拿什么。敏感信息会在写入前打码。

它刻意不携带任何已经写下来的东西。规格、计划、ADR、issue、commit 和 diff 都按路径或 URL 引用，从不复制。这让文件保持小，也让已经确定下来的细节只存一处，不会出现两处漂移。

## 常见问题

**Handoff 还是 compact？**
除非有东西要搬，否则用 `/compact`。留在同一个任务上是 compact，不是 handoff：同一 harness、同一目录、还得保持在循环里，是阶段边界树最常落的地方。`/handoff` 的优势不是摘要得更好；而是结果是一份你能搬运到 `/compact` 到不了的地方的文件。

**那么 compact、clear 和 handoff 到底差在哪？**
三种不同的东西在被保留。`/compact` 压缩当前 context，让你在新窗口里继续：意图存活。`/clear` 清空窗口，从零开始：当背后一切都可以丢弃时是对的，如果不丢弃就是单向不可逆。`/handoff` 写一份可携带的文件：工作能搬到别的地方。注意，这三者都把 [primary source](https://www.aihero.dev/ai-coding-dictionary/primary-source)（对话本身）变成了 [secondary source](https://www.aihero.dev/ai-coding-dictionary/secondary-source)（对话的摘要）。唯一不这么做的，是继续：所以那是第一个要排除的选项。

**我的 handoff 文件去哪了？**
临时目录：这是这个技能被报告最多的摩擦点：路径很长、按 OS 而异，在 Windows 上 agent 有时要试几次才能找到对的那个。问回路径，搬家前先记住它。临时目录是有意为之的：handoff 是一份过境文档，不是你要维护的工件。它也不是持久化的：见下条。

**我的 handoff 在两次会话之间消失了。**
有些环境会在会话之间清空临时目录：被报告的是 Codex：而 `/private/tmp` 会在重启时清掉。如果下一个 session 不在一小时内启动，或者在另一个 harness 下启动，就在它写出来之后立刻把它拷到一个持久的位置。同样的道理适用于文档*指向*的东西：一份派发单引用了临时目录里的其他文件，那就是下一位 agent 接不住的派发单。

**我实际上怎么把它交给下一个 agent？**
打开新的 session 并把路径指给它：读这份文件，然后继续。指向文件本身，而不是把摘要粘到一条 shell 命令里：含反引号或 `$(...)` 的摘要被塞进 `claude "<summary>"` 时会被转义坏，常见的失败是静默截断，而不是报错，于是新 agent 拿到了一份悄悄不完整的简报。

**这跟 `/branch`、`--fork-session`、或内建的 `/handoff` 一样吗？**
类似，但不一样，而且 `/branch` 在这里不是一个已发布的技能：`/handoff` 是规范的名字。fork 继承 context 的精确副本；这个技能产出一份针对一个声明的下一次任务做的*有针对性的*压缩，写成文件。在 fork 能用上的场合：同一台机器、同一 harness、同一目录：fork 工夫更少。目的地一旦超出 fork 能去的地方，文件就赢了。

**什么时候该放进 `CLAUDE.md` 而不是这里？**
问它下个月是否还成立。`CLAUDE.md` 是关于项目的常态化 context，无论是否相关都会在每个会话里加载。handoff 是关于一件正在做的工作的，那件工作落地之后就死了。被反复重述的事实是 `CLAUDE.md` 的问题；一件做了一半的任务是 handoff 的问题。

**它捕获了做了什么，没捕获为什么。**
这是个公正且反复出现的批评。两件事有帮助。传那个论据：告诉它下一次会话是干嘛的：这样与"那件事"相关的推理就被保留下来，而不是被压平。注意那些在对话里从未被真正验证过的自信断言："X 还没做"、"Y 已经完成"。下一位 agent 把这份文档当作契约，不会重新核查它，所以一个被写成事实的信念，会成为之后一切的虚假前提。先读一遍再交，把那些你只是假设的东西降级。

**为什么它是个技能而不是斜杠命令？**
两种都行；它们适合不同情境。作为一个技能，它通过和这里所有东西相同的安装路径发布和更新：这正是它能被分享的原因：agent 不会自己触发它的限制是通过 frontmatter 设置的，而不是机制本身。

## 怎样算成功

- 文档只占对话的一小段；规格、issue 和 diff 以路径和 URL 的形式出现在它里面，而不是被复制粘贴的文本。
- 你能在不打开原 session 的情况下冷读它，知道下一步该做什么。
- 新的 agent 直接开始干活，而不是让你重新解释设置。
- 分叉的情况下，你回来时原 session 还安静地坐在那里。
- "建议技能"部分列出了你自己原本会拿起来的那个技能。
- 它里面没有任何 key、token 或密码。

## 它的定位

`handoff` 是一个**可随时取用的独立工具**，活在会话之间的接缝处，而不是在构建链里：但它很窄，诚实的地图是：你用它的次数比阶段边界的另外四个选项都少。它最贴近的邻居是 [prototype](https://aihero.dev/skills-prototype)，因为原型活在它自己的目录里，去回的往返恰好就是这个技能所承载的那种跨越。当你站在边界上，不确定是继续、清空、交接、委派还是压缩时，[ask-matt](https://aihero.dev/skills-ask-matt) 给出那棵把这五种选项排序的树：并把你引到整个集合的其他部分。
