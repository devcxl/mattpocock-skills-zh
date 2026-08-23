## 它的作用

`resolving-merge-conflicts` 逐 hunk 推进一次进行中的 git merge 或 rebase，然后跑项目自己的检查，并以一个 commit 结束这次操作。

它拒绝把冲突当作文本问题。在动一个 hunk 之前，它把每一侧追回到它的 **[primary source](https://www.aihero.dev/ai-coding-dictionary/primary-source)**（commit message、PR、原始 issue），所以它在两者意图之间做选择，而不是在两段文本之间做选择，并在它们仍然兼容的地方保留两者。在确实不兼容的地方，它挑与 merge 陈述目标一致的那一侧，并指出权衡。它不发明新行为来糊弄冲突，`--abort` 也不是它的选项之一：merge 总会一路走到一个完成的 commit。

## 何时使用

键入 `/resolving-merge-conflicts`，或者当任务合适时 [agent](https://www.aihero.dev/ai-coding-dictionary/agent) 会主动使用它。

在 git 已经停在它自己解决不了的冲突上时使用它。它被限定在你面前的冲突，不是它两侧的任何东西：

| 你的情况 | 技能 |
| --- | --- |
| Merge 或 rebase 中，树里有冲突标记 | 这个 |
| Merge 已结束，现在有东西以你看不出来的原因作怪 | [diagnosing-bugs](https://aihero.dev/skills-diagnosing-bugs) |
| 规划怎么切分工作让分支少撞 | 都不是：见下面关于并行工作的问题 |

## 一手来源优于 `ours` 和 `theirs`

这个技能存在要消灭的失败模式是按标志位解决：`--ours`、`--theirs`，或者手删看起来不那么重要的那一块，让标记消失、build 编译通过。这种解决在语法上可以完美，却仍可能悄悄丢掉某人有目的做的一个改动。

你没读过就保不住意图。所以工作从历史（commits、PRs、[tickets](https://www.aihero.dev/ai-coding-dictionary/ticket)）开始，然后才走到 diff。循环里还有一步出于同样原因：技能找到仓库自己的 [automated checks](https://www.aihero.dev/ai-coding-dictionary/automated-check) 并在 commit 前跑它们，因为 merge 是 git 里最容易写出同时满足两边分支、却两边测试都不过的代码的地方。

## 常见问题

**Claude Code 自己处理冲突已经挺像样了。为什么这还需要一个技能？**

增量价值是"找到一手来源"和"跑反馈回路"这两步，否则每次都得手动提示。一个未提示的 agent 通常会单凭 diff 产出一个看似合理的解决就停在那里。这个技能的价值就在那两步——它不让 agent 跳过：读每一边存在的理由、以及之后再跑检查。比起一个好的 [model](https://www.aihero.dev/ai-coding-dictionary/model)，这是个不宽的差额，而且就该是这样：至少有一位读者预言，这是一整个会随着 model 变好而变成空操作的技能。

**我应该让并行 agent 避开同一组文件，从一开始就不冲突吗？**

大多数情况下不必。在并行任务之间分区文件代价大于收益，因为 agent 足够擅长解决合并冲突，权衡没看起来那么狠。值得保留的那一条纪律是：先做大重构。一个大改名在十条分支已经 fork 出去之后落地，是那种持续昂贵的场景。

来自用户报告的一条关于并行 worktree 的注意事项：当多个兄弟 [session](https://www.aihero.dev/ai-coding-dictionary/session) 各自在自己的 tree 里搭一个 ticket 时，merge 回去最好由写下那次变更的 session 来做，因为只有它已经知道意图。把所有人的冲突最后批给一个 agent，等于把这份技能第 2 步必须重建的 [context](https://www.aihero.dev/ai-coding-dictionary/context) 扔掉了。

**为什么永不 `--abort`？**

中止会把解决工作扔掉，下次再试时把你送回同一份冲突，未变。这份技能是为 merge 一定要发生的情况写的。如果你已经决定它不该发生，那是调用之前要做的决策，不是循环里的一条分支。

## 怎样算成功

- Agent 在解决过程中向你引用 commit messages、PR 或 issue，不只是 diff hunks。
- 每一个 hunk 最终同时承载两侧的行为，或者带一条显式注释说出丢了哪部分、为什么。
- 结果里没有出现在任一分支上的东西。
- 类型检查、测试、format 被找到并跑绿，发生在 commit *之前*，不是你注意到坏了之后。
- 你以一棵干净的树结束、操作已完成，包括多 commit rebase 中剩余的每一个 commit。

## 它的定位

一个随时可调用的独立技能，不依赖任何其他技能：它在 git 停顿时开始，在树干净并提交时结束。它唯一的真正邻居是 [diagnosing-bugs](https://aihero.dev/skills-diagnosing-bugs)——它在一个 merge 干净解决、但合并后的代码作怪的那一刻接手：那是诊断问题，不是冲突问题。它完全坐在主"想法到上线"流程之外，所以 [ask-matt](https://aihero.dev/skills-ask-matt) 是它之前和之后运行什么的地图。