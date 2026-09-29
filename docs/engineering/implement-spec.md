## 它的作用

`implement-spec` 接下一份 [spec](https://www.aihero.dev/ai-coding-dictionary/spec) 和它的 [ticket](https://www.aihero.dev/ai-coding-dictionary/ticket)，一次运行把整件事落地。编排 [agent](https://www.aihero.dev/ai-coding-dictionary/agent) 把每张 ticket 交给一个在自有 git worktree 里工作的实施者 [subagent](https://www.aihero.dev/ai-coding-dictionary/subagent)，把每条完成的支线合并进一条**集成分支**，对结果运行 [code-review](https://aihero.dev/skills-code-review)，然后解决这些 ticket。

它把 ticket 读成一张**任务图**，不是一张清单。阻塞边决定什么可以开始，所以任何时刻都存在一个**前沿**：所有阻塞项都已落地的 ticket，前沿上的每张 ticket 同时开跑。这就是与逐张推进 ticket 的区别：决定节奏的是图的形状，而不是它在跟踪器上的顺序。

## 何时使用

你输入 `/implement-spec` 来调用它，agent 不会自行拿起它。

| 你的情况 | 用什么 |
| --- | --- |
| 一份 spec 已拆成带阻塞边的 ticket，你想一次运行全部落地 | `/implement-spec` |
| 一次一张 ticket，在你自己的[上下文窗口](https://www.aihero.dev/ai-coding-dictionary/context-window)里，ticket 之间 [clear](https://www.aihero.dev/ai-coding-dictionary/clearing) | [implement](https://aihero.dev/skills-implement) |
| 一份还没拆成 ticket 的 spec | 先做 [to-tickets](https://aihero.dev/skills-to-tickets) |
| 一件没有真正图形结构的小工作 | 直接用 [implement](https://aihero.dev/skills-implement) |

## 先决条件

- **一个 issue 跟踪器。** 技能从 [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills) 配置的跟踪器上读取 ticket、并在其上解决它们。如果还没有配置，它会停下并让你先运行那个技能，而不是瞎猜。
- **带阻塞边的 ticket**，即 [to-tickets](https://aihero.dev/skills-to-tickets) 写出的那种。没有边，图就是平的，每张 ticket 会同时开跑。
- **一个能在后台运行 subagent、并给每个 subagent 一个 git worktree 的 [harness](https://www.aihero.dev/ai-coding-dictionary/harness)。** 并发是重点；一次只跑一个 subagent 的 harness，得到的只是一个更慢的 `implement`。

## 集成分支

一切都落在同一条分支上。每个实施者：

1. 开始前确认其 worktree 基于集成分支，
2. 用 [tdd](https://aihero.dev/skills-tdd) 构建自己的 ticket，一次一个红-绿切片，
3. 在报告完成之前，把集成分支的顶部合并进自己的分支，这样落地它就是一个 fast-forward。

是否开 PR 完全由跟踪器决定。如果你的跟踪器通过 PR 关闭工作，或者你主动要求，draft PR 会在第一次合并后打开，并在最后标记为 ready。否则，运行会停在集成分支上，每张 ticket 都按跟踪器关闭工作的方式解决——这在本地 markdown 跟踪器上完全离线可用。

实施者通过[上下文指针](https://www.aihero.dev/ai-coding-dictionary/context-pointer)（spec、ticket、共享的探查笔记、更早的 commit）与编排者通信，而不是粘贴摘要，这既让每个 subagent 的 prompt 保持小，也让编排者的窗口留给图本身。

## 常见问题

**这和我自己逐张跑 `/implement` 有什么不同？**

这正是这个技能为了回答而存在的问题。在它发布之前，人们不断自己造轮子，一位用户把这种痒处描述得很准：他想要"subagent 来实现 ticket"，而不是"在新会话里逐个地告诉它们实现某张 ticket，当一份 spec 可能包含 5 张以上 ticket 的时候"。用 `implement`，你就是调度员：一张 ticket 一个 [session](https://www.aihero.dev/ai-coding-dictionary/session)，之间清空，还要自己记录哪些 ticket 已解除阻塞。`implement-spec` 把这份工作交给单个编排会话。代价是：你不再在每张 ticket 落地时逐张读它的工作；你在最后评审集成分支。要发起一次运行，清空上下文，输入 `/implement-spec` 并带上指向 spec 的指针（issue 编号或文件路径）。对没有真正图形结构的小改动，跳过它，直接用 `implement`。

**它需要 GitHub 吗？我想让它在分支处停下。**

不需要了。一位喜欢 in-progress 版本的用户正有这条抱怨："它最后会创建一个 PR，而 PR 需要一个像 GitHub 这样的在线仓库。我希望它能离线完成同样的工作，停在所有工作合并完的那条分支上。"现在的目标就是集成分支。只有当配置的跟踪器通过 PR 关闭工作、或你主动要求时，PR 才会打开，所以在本地 markdown 跟踪器上，运行结束时每张 ticket 都已解决，工作全部合并在分支上。

**它的评审-修复循环跑了好几个小时，或者一直在"修"还没构建的 ticket。**

两者都来自 `code-review` 跑到了技能给它划定的那一个位置之外。它拿代码对照整份 spec，所以只有在每张 ticket 都已落地之后它才说得通；在一次运行中途跑它，每张未构建的 ticket 都会被读成失败，agent 就开始去构建它，于是又触发一次评审。在最后，技能只跑一次 `code-review`，并把每条发现送给单个修复 subagent，但它还没有规定那次修复之后何时收手。一位用户报告过一个五张 ticket 的功能里"评审-修复循环花了大约四小时"。如果你看到第二轮大范围评审开始，告诉它针对已修复的发现跑聚焦检查然后停下。对第一轮评审要预期它找到真问题：这次运行的产出是一份由评审来收尾的草稿，不是可以单独发布的东西。

**它会像 implement 那样驱动 tdd 吗？**

现在会了，尽管一开始不会。跑 in-progress 版本的用户注意到"实施者 subagent 没有继承 /tdd 指令"，所以从单张 ticket 扩展到整份 spec 的那一刻，红-绿就掉队了。现在每个实施者都用 `tdd` 构建自己的 ticket。仍然没有像 `implement` 会话里那样交互式约定接缝的步骤，所以如果你想把接缝钉住，就在 spec 或 ticket 里写明它们。

**两个并行跑的实施者在同一个文件上撞了，或者给同一件事取了不同的名字。**

worktree 不会消除碰撞，只是把它们推迟到合并时。写在 ticket 文本里的阻塞边，是对每张 ticket 将触碰哪些文件的猜测，而两张位于"代码库不同部分"的 ticket 仍会共享一个消息目录、一个配置注册表或某个类型。每个实施者只看见自己的 ticket 和共享笔记，从不看见对方的进行中工作，所以一位用户的 web 和 mobile ticket 把同一个字符串分别加成了 `blockedSince` 和 `blockedOn`。当两张前沿 ticket 触碰同一个共享表面时，要么在它们之间加一条阻塞边让它们前后运行，要么在探查笔记里把每张 ticket 新增的确切名字固定下来。

**被阻塞的 ticket 从不开始，即使它的阻塞项已经合并了。**

GitHub 上的一个已知粗糙边缘。跟踪器的 blocked-by 计数只在阻塞项*关闭*时下降，而 ticket 通常在 PR 合并时才关闭，那是运行的结尾。跟踪器对起始图来说是正确来源，但在运行中段是过时的。告诉编排者自己去跟踪哪些 ticket 已经合并进集成分支，并据此计算前沿。

**这会取代 Sandcastle 或 AFK 脚本吗？**

不会。人们会问是因为这些技能现在伸手到了实现里："Sandcastle 还相关吗？你的技能现在似乎也能处理实现了。"`implement-spec` 把编排交给一个 harness 会话里的 agent 负责，不需要任何基础设施，还让你能在旁观察和转向。对真正 [AFK](https://www.aihero.dev/ai-coding-dictionary/afk) 的工作，确定性循环（[Sandcastle](https://github.com/mattpocock/sandcastle)、shell 脚本、CI job）更快、更便宜、更可靠，因为编排的任何部分都不会跑偏。

**某张 ticket 的关键测试在它的 worktree 里被跳过了，却报告绿色。**

worktree 只装 git 跟踪的东西。读取 gitignore 的 fixture、本地数据库或凭据的测试，会在那里悄悄跳过自己。对验证依赖未跟踪材料的 ticket，告诉编排者在主 checkout 里运行它。

## 怎样算成功

- 图允许时，多个实施者同时运行，而不是一个接一个。
- 一张 ticket 在它的最后一个阻塞项落到集成分支上时就开始，而不是等整次运行结束。
- 每张 ticket 的痕迹都显示 `tdd` 在运行，代码之前先有失败的测试。
- 合并进集成分支都是 fast-forward，而不是解决冲突。
- 运行结束在一条分支上、每张 ticket 都已解决；只有你的跟踪器想要时才有 PR。

## 它的定位

`implement-spec` 是主链上的构建步骤，作为主流程里"每张 ticket 跑一次 [implement](https://aihero.dev/skills-implement)"的并行替代：

```txt
grill-with-docs → to-spec → to-tickets → implement-spec → retro
```

它的邻居是 [to-tickets](https://aihero.dev/skills-to-tickets)——它声明被读成任务图的阻塞边；以及 [code-review](https://aihero.dev/skills-code-review)——它在收尾前对集成分支运行。拿不准自己在哪条流程里时，[ask-matt](https://aihero.dev/skills-ask-matt) 是整个技能集合之上的路由器。
