## 它的作用

`implement` 构建已经被决定好的工作。你把它指向一个 [ticket](https://www.aihero.dev/ai-coding-dictionary/ticket)、一个 [spec](https://www.aihero.dev/ai-coding-dictionary/spec)、或你刚在对话里达成的计划，它写出代码、在接缝处驱动 [tdd](https://aihero.dev/skills-tdd)、边写边做类型检查、结尾运行 [code-review](https://aihero.dev/skills-code-review)、并提交到当前分支。

它从不重新打开计划。没有访谈、没有澄清轮、没有不同方案的提议。上游敲定的任何东西就是输入，技能的全部工作就是把它变成一个提交。这正是它区别于对一个全新的 [agent](https://www.aihero.dev/ai-coding-dictionary/agent) 说"构建这个"的地方——后者往往会在构建的同时重新设计工作。

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

同会话的情况值得点名，因为技能自己的第一行没覆盖它。`SKILL.md` 写着"the spec or tickets"，这会促使 [model](https://www.aihero.dev/ai-coding-dictionary/model) 去找一个并不存在的文件。如果计划只存在于对话线程里，调用时要明确说明。

## 先决条件

`implement` 提交到你所在的分支。它不创建分支，也不问。开始之前，确认你正待在你想让工作落地的分支上。

如果 tickets 来自 [to-tickets](https://aihero.dev/skills-to-tickets)，它们所在的追踪器由 [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills) 配置。`code-review` 读取同一份配置，在收尾时找到发起它的 spec。

## 一次运行做什么

一次运行分五步，按顺序：

1. 读 ticket 或 spec，拆解出接缝。
2. 在预先约定的接缝处驱动 [tdd](https://aihero.dev/skills-tdd)，一次一片红绿切片。
3. 频繁类型检查，过程中跑单个测试文件。
4. 在最后跑一次完整测试套件。
5. 跑 [code-review](https://aihero.dev/skills-code-review)，然后提交到当前分支。

一次运行覆盖一个 ticket。[to-tickets](https://aihero.dev/skills-to-tickets) 产出的 tickets 是穿透式（tracer-bullet）的垂直切片，每片都恰好适配一次全新的 [context window](https://www.aihero.dev/ai-coding-dictionary/context-window)，所以预期的节奏是：清空上下文，跑一个 ticket，提交，再清空。每张 ticket 都自成一体，因此可以丢弃上一张 ticket 的上下文。

## 预先约定的接缝

这个技能的核心概念是**接缝（seam）**：你在不深入其内部的情况下观察行为的公共边界。测试住在接缝上。接缝在任何代码出现之前就约定好，测试才能经久耐用；底下的实现可以重写，而测试不必改变。

"预先约定"很重要，也是这个技能最薄弱的环节。`implement` 内部不会约定接缝。`tdd` 才会提问，而且在接缝未确认时拒绝写测试。因此，约定实际发生在上游的 spec 里，或本次运行的第一次交流中。如果两者都没有，运行就会悄悄变成"只是写代码"，也没人会提醒你。在 spec 里点名接缝可以避免这种情况。

## 常见问题

**它跑完了，但我的 ticket 还是开着的，验收标准也没勾。**

对，这是预期的。`implement` 没有收尾步骤。它在 commit 处结束，从不碰 work item——GitHub Issues 和本地 markdown 追踪器上都确认了，所以这不是追踪器集成的问题。它也不会去执行 `code-review` 产出的发现，也不会去勾原始 issue 上的 `- [ ]` 方框。关掉 ticket 并对账验收标准要你自己来。这在依赖链上影响最大，因为 `to-tickets` 把 frontier 定义为"所有 blocker 都已关闭"的 tickets。如果没人关东西，就永远没有可见的解除阻塞。

**我能把它一次性指向所有 tickets，或者并行跑几个吗？**

对 `/implement` 而言不能：一次调用，一个 ticket。要在一次运行里处理整份 spec，用 [implement-spec](https://aihero.dev/skills-implement-spec)：它把就绪前沿上的每张 ticket 分配给一个 [subagent](https://www.aihero.dev/ai-coding-dictionary/subagent)，各自使用独立 worktree，然后把结果合并到一条集成分支上。在同一个 checkout 里并行跑几个 `/implement` 会话比"不支持"更糟。一份现场报告描述了 `git commit --amend` 把一次会话的提交改到了另一次会话的 commit 上、stash 从 `refs/stash` 消失、commit 落到错误分支——一个下午内三个问题接连发生。多个会话共享一个工作目录、一个 index、一个 HEAD。用户用 git worktree 作为变通办法，但 worktree 之间也共享 `refs/stash`，所以单靠 worktree 修不好 stash 这一问题。

**它能开一个 pull request 而不是提交吗？**

没有内置。它直接提交到当前分支，这被好几个人觉得太急：代码在他们有机会验证能跑之前就落地了。没有配置开关，也没有 PR 模式。人们在调用时覆盖（"commit 到一个分支并开一个 PR"），或者编辑他们那份本地副本。当 agent 确实要写 PR 时，[pr](https://aihero.dev/skills-pr) 负责塑造它的 body。

**`code-review` 说看不到我的变更。**

`code-review` 审查 `git diff <fixed-point>...HEAD`，这会排除暂存区和工作树中的变更。`implement` 在提交前跑它，所以除非已经有中间 commit，那个 diff 里没有东西可审。多人都报告过这一点，两侧都未修复。先 commit，再对照你 fork 出来的基点去审。

另外，有些人刻意根本不想要运行内的 review，因为一个 agent 审查它刚写的代码会偏向自己的解法。在一次新会话里对着一个固定点跑 [code-review](https://aihero.dev/skills-code-review) 是一个合法的替代方案，这也是那个技能把两条轴放在独立 sub-agent 里跑的原因。

**一个 ticket 烧了 150k token。我用错了吗？**

可能不是用错了。更可能是 ticket 太大。一次运行要做代码库探索、每个接缝的红绿循环、整套测试、一次 review，所以一个不简单的 ticket 超过 100k [tokens](https://www.aihero.dev/ai-coding-dictionary/token) 是正常的，不是什么出问题的征兆。修正要从上游做：在 [to-tickets](https://aihero.dev/skills-to-tickets) 中把 ticket 大小调对，让每个都恰好装下一次全新的窗口。如果某张 ticket 一直超量，就拆开，而不是调高 [effort](https://www.aihero.dev/ai-coding-dictionary/effort) 等级。

**`/implement #2` 在一次新会话里跑去处理完全不相关的东西。**

agent 会根据它能看到的任意编号列表来解析 `#2`。在新会话里，那可能是 todo 文件、清单或另一份工作列表，而不是配置好的追踪器。匹配不确定时它也不会停下，因此直到开始工作，错误才会显现。给出完整引用（issue URL 或 `owner/repo#2`），并让它在开工前复述标题供你确认。

## 怎样算成功

- 会话以读 ticket 或 spec、复述要构建什么开场，而不是问你构建什么。
- 你能在 trace 里看到一次真正的 `/tdd` 调用，而不是只在 diff 里看到测试出现。
- 类型检查和单个测试文件在运行中反复跑，全套测试在接近结尾时跑一次。
- 运行在你没催它继续的情况下到达当前分支的一个 commit。
- diff 恰好是一个 ticket 的工作量：一条穿过每一层的垂直切片，而不是几张 ticket 被一锅烩。

## 它的定位

`implement` 是主链上的构建一环：

```txt
grill-with-docs → to-spec → to-tickets → implement → code-review → retro
```

它的邻居是 [to-tickets](https://aihero.dev/skills-to-tickets)——产出它消费的 tickets，并声明决定它们顺序的阻塞边；[tdd](https://aihero.dev/skills-tdd)——它内部在每个接缝上驱动它；以及 [code-review](https://aihero.dev/skills-code-review)——它在提交前跑。它坐在规划技能的下游，并信任它们。它不复验交给它的形状，所以一张结构糟糕的 map 或一条水平切层的 ticket 会按原样被构建。

这份信任就是为什么 [wayfinder](https://aihero.dev/skills-wayfinder) 在 [to-spec](https://aihero.dev/skills-to-spec) 处合入主链，而不是把它的 map 直接接进 `implement`。只有当工作量最终真的很小时，才从 map 直接跳到 `implement`。

[ask-matt](https://aihero.dev/skills-ask-matt) 在你拿不准自己身处哪条流程时，是整套技能的路由器。
