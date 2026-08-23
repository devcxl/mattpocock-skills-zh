## 它的作用

`implement` 构建已经被决定好的工作。你把它指向一个 [ticket](https://www.aihero.dev/ai-coding-dictionary/ticket)、一个 [spec](https://www.aihero.dev/ai-coding-dictionary/spec)、或你刚在对话里达成的计划，它写出代码、在接缝处驱动 [tdd](https://aihero.dev/skills-tdd)、边写边做类型检查、结尾运行 [code-review](https://aihero.dev/skills-code-review)、并提交到当前分支。

它从不重新打开计划。没有访谈、没有澄清轮、没有不同方案的提议。上游敲定的任何东西就是输入，技能的全部工作就是把它变成一个提交。这正是它区别于对一个全新的 [agent](https://www.aihero.dev/ai-coding-dictionary/agent) 说"构建这个"的地方——后者会在构建的同时乐呵呵地重新设计工作。

## 何时使用

你自己键入 `/implement` 来调用它——agent 不会主动使用它。它随附 `disable-model-invocation: true`，所以其他技能也不能调用它。无论 [ask-matt](https://aihero.dev/skills-ask-matt) 还是 [to-tickets](https://aihero.dev/skills-to-tickets) 说"然后每个 ticket 跑一次 `/implement`"，那都是给你的指示，不是 agent 会未经提示去做的事。

工作目前在哪里决定了这是不是对的技能：

| 工作在…… | 使用 |
| --- | --- |
| 追踪器上的一个 ticket | `/implement #42`，每个 [session](https://www.aihero.dev/ai-coding-dictionary/session) 一个 ticket，ticket 之间 [clearing](https://www.aihero.dev/ai-coding-dictionary/clearing) 上下文 |
| 一个 spec，还没拆分，构建跨会话 | 先 [to-tickets](https://aihero.dev/skills-to-tickets)，然后每个 ticket 跑一次 `/implement` |
| 一个 spec，构建很小 | 直接对着 spec 跑 `/implement` |
| 只存在于你刚进行的对话里，而且仍然很小 | 就地 `/implement`，同一个窗口里 |
| 还没写在任何地方 | [grill-with-docs](https://aihero.dev/skills-grill-with-docs)，如果没有代码库就用 [grill-me](https://aihero.dev/skills-grill-me) |
| 一个具体的行为了，要测试先行，没有 spec | 直接 [tdd](https://aihero.dev/skills-tdd) |
| 已经构建好了，你想检查它 | 直接 [code-review](https://aihero.dev/skills-code-review) |

同会话的情况值得点名，因为技能自己的第一行没覆盖它。`SKILL.md` 写着"the spec or tickets"，这会怂恿 [model](https://www.aihero.dev/ai-coding-dictionary/model) 去猎一个不存在的文件。如果计划只存在于对话线程里，调用时要说出来。

## 先决条件

`implement` 提交到你所在的分支。它不创建分支，也不问。开始之前，确认你正待在你想让工作落地的分支上。

如果 tickets 来自 [to-tickets](https://aihero.dev/skills-to-tickets)，它们所在的追踪器是由 [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills) 配置的。`code-review` 读取同一份配置，在收尾时找到发起它的 spec。

## 一次运行做什么

一次运行是五拍，按顺序：

1. 读 ticket 或 spec，拆解出接缝。
2. 在预先约定的接缝处驱动 [tdd](https://aihero.dev/skills-tdd)，一次一片红绿切片。
3. 频繁类型检查，过程中跑单个测试文件。
4. 在最后跑一次完整测试套件。
5. 跑 [code-review](https://aihero.dev/skills-code-review)，然后提交到当前分支。

一次运行覆盖一个 ticket。[to-tickets](https://aihero.dev/skills-to-tickets) 产出的 tickets 是穿透式（tracer-bullet）的垂直切片，每片都恰好适配一次全新的 [context window](https://www.aihero.dev/ai-coding-dictionary/context-window)，所以预期的节奏是：清空上下文，跑一个 ticket，提交，再清空。每个 ticket 各自独立——这正是上一个 ticket 的上下文可以被丢弃的原因。

## 预先约定的接缝

这个技能运转所依赖的想法是**接缝（seam）**：你在不深入其内部的情况下观察行为的公共边界。测试住在接缝上。在写下任何代码之前先约定好的接缝上工作，是让测试耐用的原因，因为底下的实现可以重写，而测试不必移动。

"预先约定的"这个词在做实在的工作，它也是这个技能最薄弱的关节。`implement` 内部没有约定接缝。[tdd](https://aihero.dev/skills-tdd) 才是去问的技能，而且它在接缝未确认时拒绝写测试。所以实际上约定要么发生在 spec 的上游，要么发生在本次运行的第一次交流里。如果哪里都没发生，前置条件永远不触发，运行就悄悄变成了"只是写代码"。在 spec 里点名接缝能阻止这件事。

## 常见问题

**它跑完了，但我的 ticket 还是开着的，验收标准也没勾。**

对，这是预期的。`implement` 没有收尾步骤。它在 commit 处结束，从不碰 work item——GitHub Issues 和本地 markdown 追踪器上都确认了，所以这不是追踪器集成的问题。它也不会去执行 `code-review` 产出的发现，也不会去勾原始 issue 上的 `- [ ]` 方框。关掉 ticket 并对账验收标准要你自己来。这在依赖链上咬得最狠，因为 `to-tickets` 把 frontier 定义为"所有 blocker 都已关闭"的 tickets。如果没人关东西，就永远没有可见的解除阻塞。

**我能把它一次性指向所有 tickets，或者并行跑几个吗？**

不能。一次调用，一个 ticket。批量派发一个 ticket 队列，以及 [subagent](https://www.aihero.dev/ai-coding-dictionary/subagent) 扇出，都被反复请求过，两个都不存在。在同一个 checkout 里并行跑几个 `/implement` 会话比"不支持"更糟：一份现场报告描述了一次 `git commit --amend` 落到另一次会话的 commit 上、一个 stash 从 `refs/stash` 消失、commit 落到错误的分支——一个下午之内三件事连续发生。多个会话共享一个工作目录、一个 index、一个 HEAD。Git worktrees 是社区的变通方案，而且 `refs/stash` 在 worktree 之间也是共享的，所以单靠 worktree 修不好 stash 这种情况。如果今天你想要并行，那是自己组装。

**它能开一个 pull request 而不是提交吗？**

没有内置。它直接提交到当前分支，这被好几个人觉得太急：代码在他们有机会验证能跑之前就落地了。没有配置开关，也没有 PR 模式。人们在调用时覆盖（"commit 到一个分支并开一个 PR"），或者编辑他们那份本地副本。

**`code-review` 说看不到我的变更。**

`code-review` 审查 `git diff <fixed-point>...HEAD`，这会排除暂存区和工作树中的变更。`implement` 在提交前跑它，所以除非已经有中间 commit，那个 diff 里没有东西可审。多人都报告过这一点，两侧都未修复。先 commit，再对照你 fork 出来的基点去审。

另外，有些人刻意根本不想要运行内的 review，因为一个 agent 审查它刚写的代码会偏向自己的解法。在一次新会话里对着一个固定点跑 [code-review](https://aihero.dev/skills-code-review) 是一个合法的替代方案，这也是那个技能把两条轴放在独立 sub-agent 里跑的原因。

**一个 ticket 烧了 150k token。我用错了吗？**

多半是 ticket 太大了，而不是技能被用错。一次运行要做代码库探索、每个接缝的红绿循环、整套测试、一次 review，所以一个不简单的 ticket 超过 100k [tokens](https://www.aihero.dev/ai-coding-dictionary/token) 是正常的，不是什么出问题的征兆。杠杆在 [to-tickets](https://aihero.dev/skills-to-tickets) 上游——把 ticket 大小调对，让每个都恰好装下一次全新的窗口。如果某个 ticket 一直爆，把它拆开，而不是调高 [effort](https://www.aihero.dev/ai-coding-dictionary/effort) 等级。

**`/implement #2` 在一次新会话里跑去处理完全不相关的东西。**

`#2` 是按 agent 能看到的任何编号列表解析的，在一次新会话里那可能是一个 todo 文件、一份清单、或另一份工作列表，而不是配置好的追踪器。解析是自信的而非失败关闭的，所以错误要到它开干之后才明显。给出完整引用——issue URL 或 `owner/repo#2`——并在它开干前让它把标题复述回来给你确认。

## 怎样算成功

- 会话以读 ticket 或 spec、复述要构建什么开场，而不是问你构建什么。
- 你能在 trace 里看到一次真正的 `/tdd` 调用，而不是只在 diff 里看到测试出现。
- 类型检查和单个测试文件在运行中反复跑，全套测试在接近结尾时跑一次。
- 运行在你没催它继续的情况下到达当前分支的一个 commit。
- diff 恰好是一个 ticket 的工作量：一条穿过每一层的垂直切片，而不是几张 ticket 被一锅烩。

## 它的定位

`implement` 是主链上的构建一环，位列倒数第二：

```txt
grill-with-docs → to-spec → to-tickets → implement → code-review
```

它的邻居是 [to-tickets](https://aihero.dev/skills-to-tickets)——产出它消费的 tickets，并声明决定它们顺序的阻塞边；[tdd](https://aihero.dev/skills-tdd)——它内部在每个接缝上驱动它；以及 [code-review](https://aihero.dev/skills-code-review)——它在提交前跑。它坐在规划技能的下游，并信任它们。它不复验交给它的形状，所以一张结构糟糕的 map 或一条水平切层的 ticket 会按原样被构建。

这份信任就是为什么 [wayfinder](https://aihero.dev/skills-wayfinder) 在 [to-spec](https://aihero.dev/skills-to-spec) 处合入主链，而不是把它的 map 直接接进 `implement`。只有当工作量最终真的很小时，才从 map 直接跳到 `implement`。

[ask-matt](https://aihero.dev/skills-ask-matt) 在你拿不准自己身处哪条流程时，是整套技能的路由器。