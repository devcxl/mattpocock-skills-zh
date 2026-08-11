## 它的作用

`implement` 构建已经被决定好的工作。你把它指向一个 [ticket](https://www.aihero.dev/ai-coding-dictionary/ticket)、一个 [spec](https://www.aihero.dev/ai-coding-dictionary/spec)、或你刚在对话里达成的计划，它写出代码、在接缝处驱动 [tdd](https://aihero.dev/skills-tdd)、边写边做类型检查、结尾运行 [code-review](https://aihero.dev/skills-code-review)、并提交到当前分支。

它从不重新打开计划。没有访谈、没有澄清轮、没有不同方案的提议。上游敲定的任何东西就是输入，技能的全部工作就是把它变成一个提交。这正是它区别于对一个全新的[代理（agent）](https://www.aihero.dev/ai-coding-dictionary/agent)说"构建这个"的地方——后者会在构建的同时乐呵呵地重新设计工作。

## 何时使用

你通过键入 `/implement` 来调用它——代理不会主动使用它。它随附 `disable-model-invocation: true`，所以其他技能也不能调用它。无论 [ask-matt](https://aihero.dev/skills-ask-matt) 还是 [to-tickets](https://aihero.dev/skills-to-tickets) 说"然后每个 ticket 跑一次 `/implement`"，那都是给你的指示，不是代理会未经提示去做的事。

工作目前在哪里决定了这是不是对的技能：

| 工作在…… | 使用 |
| --- | --- |
| 追踪器上的一个 ticket | `/implement #42`，每个[会话（session）](https://www.aihero.dev/ai-coding-dictionary/session)一个 ticket，ticket 之间[清空（clearing）](https://www.aihero.dev/ai-coding-dictionary/clearing)上下文 |
| 一个 spec，还没拆分，构建跨会话 | 先 [to-tickets](https://aihero.dev/skills-to-tickets)，然后每个 ticket 一次 `/implement` |
| 一个 spec，构建很小 | 直接对着 spec 用 `/implement` |
| 只存在于你刚进行的对话里，而且仍然很小 | 就地 `/implement`，在同一个窗口里 |
| 还没写在任何地方 | [grill-with-docs](https://aihero.dev/skills-grill-with-docs)，如果没有代码库就用 [grill-me](https://aihero.dev/skills-grill-me) |
| 一个具体的行为了，要测试先行，没有 spec | 直接 [tdd](https://aihero.dev/skills-tdd) |
| 已经构建好了，你想检查它 | 直接 [code-review](https://aihero.dev/skills-code-review) |

同会话的情况值得点名，因为技能自己的第一行没覆盖它。`SKILL.md` 写着"spec 或 tickets"，这会怂恿[模型（model）](https://www.aihero.dev/ai-coding-dictionary/model)去猎一个不存在的文件。如果计划只存在于对话线程里，调用时要说出来。

## 前置条件

`implement` 提交到你所在的分支。它不创建分支，也不问。开始之前，确认你正待在你想让工作落地的分支上。

如果 tickets 来自 [to-tickets](https://aihero.dev/skills-to-tickets)，它们所在的追踪器是由 [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills) 配置的。`code-review` 读取同一份配置，在收尾时找到发起它的 spec。

## 一次运行做什么

一次运行是五拍，按顺序：

1. 读 ticket 或 spec，找出接缝。
2. 在预先商定的接缝处驱动 [tdd](https://aihero.dev/skills-tdd)，一次一个红-绿切片。
3. 频繁做类型检查，边跑边跑单个测试文件。
4. 结尾完整跑一次测试套件。
5. 运行 [code-review](https://aihero.dev/skills-code-review)，然后提交到当前分支。

一次运行覆盖一个 ticket。[to-tickets](https://aihero.dev/skills-to-tickets) 产出的 tickets 是曳光弹式垂直切片，尺寸按装进一个全新的[上下文窗口（context window）](https://www.aihero.dev/ai-coding-dictionary/context-window)来定，所以预期的节奏是：清空上下文、实现一个 ticket、提交、再次清空。每个 ticket 自包含，这正是让上一个 ticket 的上下文可以被丢弃的原因。

## 预先商定的接缝

这个技能运转所依赖的概念是**接缝（seam）**：你在不深入内部的情况下观察行为的公开边界。测试活在接缝处。在任何代码写出之前就在一条接缝上工作，是让测试持久的原因，因为底下的实现可以重写而测试不动。

"预先商定"这个词在干真实的活，它也是这个技能最薄弱的关节。`implement` 内部没有任何东西去商定接缝。`tdd` 才是会问的那个技能，而且它拒绝在未经确认的接缝处写测试。所以实际上，商定要么发生在上游的 spec 里，要么发生在运行的第一次交流中。如果哪里都没发生，前置条件永远不会触发，运行就会悄悄退化成"直接写代码"。在 spec 里点名接缝，正是阻止这一点的方法。

## 常见问题

**它完成了，但我的 ticket 还开着，验收标准也没勾上。**

对，而且这是预期行为。`implement` 没有完成步骤。它在提交处结束，从不碰工作项——在 GitHub Issues 和本地 markdown 追踪器上都确认过，所以这不是追踪器集成问题。它也不处理 `code-review` 产出的发现，不勾发起它的 issue 上的 `- [ ]` 框。关掉 ticket、自行核对标准。这在依赖链上咬得最狠，因为 `to-tickets` 把前沿（frontier）定义为所有阻塞项都已关闭的 tickets。如果什么都不关闭，就永远不会有什么变得可见地解除阻塞。

**我能一次指向我所有的 tickets，或者并行跑几个吗？**

不能。一次调用，一个 ticket。跨 ticket 队列的批量派发和 [subagent](https://www.aihero.dev/ai-coding-dictionary/subagent) 扇出都被反复要求过，两者都不存在。在一个 checkout 里并排跑几个 `/implement` 会话比"不受支持"更糟：一份现场报告描述了在一个会话里 `git commit --amend` 落到另一个会话的提交上、一个 stash 从 `refs/stash` 消失、提交落到错误分支——全在一个下午、横跨三个 issue。这些会话共享一个工作目录、一个索引、一个 HEAD。Git worktree 是社区的变通办法，但注意 `refs/stash` 也跨 worktree 共享，所以光靠 worktree 修不了 stash 的问题。如果你今天就想要并行，你得自己组装。

**它能开一个 pull request 而不是提交吗？**

没有内置。它直接提交到当前分支，有几个人觉得这太急切：代码在他们有机会验证能用之前就落地了。没有配置开关，也没有 PR 模式。人们在调用时覆盖它（"提交到一个分支并开一个 PR"），或者编辑自己本地的技能副本。

**`code-review` 说它看不到我的改动。**

`code-review` 审查 `git diff <fixed-point>...HEAD`，它排除暂存区和工作树中的变更。`implement` 在提交之前运行它，所以除非已经存在一个中间提交，否则那个 diff 里没有可审的东西。好几个人报告过这个问题，两边都未修复。先提交，再对着你分叉出来的那个点审查。

另外，有些人刻意完全不想要运行内的审查，因为一个审查自己刚写代码的代理会偏向自己的方案。在一个全新会话里对着固定点运行 [code-review](https://aihero.dev/skills-code-review) 是合法的替代，也是那个技能把两条轴跑在独立子代理里的同一个原因。

**一个 ticket 烧了 15 万 tokens。我用错了吗？**

很可能 ticket 太大，而不是技能被误用。一次运行包括代码库探索、每个接缝一个红-绿循环、完整套件和一次审查，所以一个不平凡的 ticket 超过 10 万 [tokens](https://www.aihero.dev/ai-coding-dictionary/token) 是正常的，而不是什么坏了的迹象。杠杆在上游：在 [to-tickets](https://aihero.dev/skills-to-tickets) 里把 tickets 的尺寸调对，让每个装进一个全新窗口。如果单个 ticket 老是爆掉，拆它，而不是提高[投入度（effort）](https://www.aihero.dev/ai-coding-dictionary/effort)级别。

**一个全新会话里的 `/implement #2` 做了一个完全不相关的东西。**

`#2` 是按代理能看到的任何编号清单解析的，在全新会话里可能是 todo 文件、检查清单或另一个工作列表，而不是配置好的追踪器。解析是自信的而不是失败即关闭的，所以错误要等它开始了才明显。传完整引用——issue URL 或 `owner/repo#2`——并要求它在开始前把标题复述回来确认。

## 怎样算成功

- 会话以读 ticket 或 spec、复述将要构建什么开始，而不是问你要构建什么。
- 你能在追踪里看到真实的 `/tdd` 调用，而不只是测试出现在 diff 里。
- 类型检查和单个测试文件在运行期间反复执行，完整套件在接近结尾时跑一次。
- 运行在你的当前分支上到达一个提交，不需要你催它继续。
- diff 是一个 ticket 量的变更：穿透每一层的垂直切片，而不是几个 ticket 扫成一堆。

## 它的定位

`implement` 是主链的构建步骤，倒数第二：

```txt
grill-with-docs → to-spec → to-tickets → implement → code-review
```

它的邻居是 [to-tickets](https://aihero.dev/skills-to-tickets)——产出它消费的 tickets 并声明决定其顺序的阻塞边；[tdd](https://aihero.dev/skills-tdd)——它在每个接缝处内部驱动它；以及 [code-review](https://aihero.dev/skills-code-review)——它在提交前运行它。它位于规划技能的下游，并且信任它们。它不重新验证交给它的东西的形状，所以一张结构糟糕的地图或一个水平分层的 ticket 会照写照建。

正是这份信任，让 [wayfinder](https://aihero.dev/skills-wayfinder) 在 [to-spec](https://aihero.dev/skills-to-spec) 处并入主链，而不是把它的地图直接循环进 `implement`。只有工作结果真的很小的时候，才从地图直接去 `implement`。

拿不准自己在哪个流程里时，[ask-matt](https://aihero.dev/skills-ask-matt) 是覆盖整个集合的路由器。
