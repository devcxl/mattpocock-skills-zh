## 它的作用

`resolving-merge-conflicts` 逐块（hunk）处理进行中的 git merge 或 rebase，然后运行项目自己的检查，并以一个提交完成整个操作。

它拒绝把冲突当作文本问题。在碰任何一块之前，它把每一侧追溯回它的**[一手来源（primary source）](https://www.aihero.dev/ai-coding-dictionary/primary-source)**——提交消息、PR、原始 issue——所以它是在两个意图之间做选择，而不是在两块文本之间；并且在两者兼容的地方保留两者。当它们确实不兼容时，它挑选符合合并既定目标的一侧，并点名这个权衡。它不发明新行为来掩盖冲突，而 `--abort` 也不是它拥有的选项：合并总是被进行到一个完成的提交。

## 何时使用

键入 `/resolving-merge-conflicts`，或者当任务合适时[代理（agent）](https://www.aihero.dev/ai-coding-dictionary/agent)会自动使用它。

当 git 已经停在它自己无法解决的冲突上时使用它。它的范围是你面前的冲突，不包括它任何一侧的东西：

| 你的情况 | 技能 |
| --- | --- |
| merge 或 rebase 进行中，工作树里有冲突标记 | 这个 |
| 合并已完成，现在有东西因你看不见的原因行为异常 | [diagnosing-bugs](https://aihero.dev/skills-diagnosing-bugs) |
| 规划如何切分工作让分支少碰撞 | 都不是——见下面的并行工作问题 |

## 一手来源优先于 `ours` 和 `theirs`

这个技能存在要消灭的失败模式是按旗帜解决：`--ours`、`--theirs`，或者手删看起来不那么重要的那一块，于是标记消失、构建通过。那种解决可能在语法上完美，却仍然无声地丢掉某人刻意做的改动。

你无法保留一个你还没读过的意图。所以工作从历史开始——提交、PR、[tickets](https://www.aihero.dev/ai-coding-dictionary/ticket)——然后才移到 diff。循环里还有一步出于同样的原因存在：技能找到仓库自己的[自动检查（automated checks）](https://www.aihero.dev/ai-coding-dictionary/automated-check)并在提交前运行它们，因为合并是 git 里最容易产出"两边都满足、却过不了任何一边测试"的代码的地方。

## 常见问题

**Claude Code 自己已经能很好地解决冲突了。为什么这还需要一个技能？**

增值在于"找一手来源"和"跑反馈回路"这两步，否则它们每次都得手工提示。一个未经提示的代理通常只会从 diff 就产出一个貌似合理的解决，然后停在那里。技能的价值是它不让代理跳过的两步——读每一侧为什么存在，以及之后跑检查。这是对一个好[模型（model）](https://www.aihero.dev/ai-coding-dictionary/model)的薄薄一层余量，而且它有意如此：至少有一位读者预测，随着模型进步，这是一个会变成 no-op 的完整技能。

**我是不是应该让并行代理避开同一个文件，从一开始就避免冲突？**

多数情况下不用。在并行任务之间划文件区域，代价大于收益，因为代理对 merge conflict 足够擅长，权衡没有看起来那么苛刻。唯一值得保留的纪律是先做大重构。一个大重命名在十个分支从它分叉之后才落地，才是始终保持昂贵的那种情况。

一份关于并行 worktree 的用户报告有一条告诫：当兄弟[会话（session）](https://www.aihero.dev/ai-coding-dictionary/session)各自在自己的树里构建一个 ticket 时，合并回来最好由写那个改动的会话完成，因为它已经是知道意图的那个。最后把所有冲突批给一个代理，恰恰丢掉这个技能第 2 步不得不去重建的[上下文（context）](https://www.aihero.dev/ai-coding-dictionary/context)。

**为什么从来不用 `--abort`？**

中止会扔掉解决工作，下次再试时把你送回同一个未变的冲突。技能是为"合并将要发生"的情况写的。如果你已经决定它不该发生，那是在调用之前做的决定，不是循环里的一个分支。

## 怎样算成功

- 代理在解决过程中向你引用提交消息、PR 或 issue，而不只是 diff 块。
- 每一块最终要么保留两侧的行为，要么带一条明确说明丢了什么、为什么的注释。
- 结果里没有出现任何不在两侧分支上的东西。
- 类型检查、测试和格式在提交*之前*被找到并以绿色跑过，而不是在你发现某样东西坏了之后。
- 你以一棵干净的工作树结束，操作完成——包括多提交 rebase 里每一个剩余的提交。

## 它的定位

一个随时可取的独立技能，不依赖任何其他技能：git 卡住时它开始，工作树干净并提交时它结束。它唯一真正的邻居是 [diagnosing-bugs](https://aihero.dev/skills-diagnosing-bugs)，后者在"合并干净解决了、但合并后的代码行为异常"这一点接手——那是诊断问题，不是冲突问题。它完全脱离从想法到发布的主流程，所以 [ask-matt](https://aihero.dev/skills-ask-matt) 是在它前后运行什么的地图。
