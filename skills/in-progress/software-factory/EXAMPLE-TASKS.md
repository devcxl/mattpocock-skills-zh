# 示例任务

以下 tasks 按其要解决的问题分组。每项都说明启动其 runs 的 Trigger、一次 run 会做什么，以及它接下来会触发什么。大多数 factory 都从其中一种开始，并通过链接后续 task 逐步扩展。

## 未经 triage 的 tickets 越积越多

**Explore task**
- Trigger：创建 ticket 时，或由人类为其添加标签时。
- Does：对照 codebase 检查 ticket，并将其归入某个类别（可轻松处理、需要人类介入、不是 bug）。
- Triggers：对于可轻松处理的情况，触发一次 implementer run。其他情况则以 ticket 被标记为等待人类处理而结束。

## 已标记为 ready 的 tickets 等待有人实现

**Implementer task**
- Trigger：人类或一次 explore run 将 ticket 标记为 ready 时。
- Does：持续实现 ticket，直到 automated checks 通过，并创建一个 draft PR。
- Triggers：一次 automated review run。

## PRs 等待 review

**Automated review task**
- Trigger：一个尚未经过 automated review 的 PR 被创建时，或由人类为其添加标签时。
- Does：对照 codebase 的标准和该 PR 所对应的 ticket 检查 diff。
- Triggers：检查失败时触发一次 rework run。通过时则结束；PR 等待 human review，然后由人类合并。

## 自动化 review 失败后无人修复

**Rework task**
- Trigger：一次 automated review run 判定 PR 失败时。
- Does：只修复 automated review 指出的问题，然后推送更改。
- Triggers：一次 automated review run。连续失败达到设定次数后，run 结束，并将 PR 标记为等待人类处理。

## Spec 太大，无法由一次 run 完成

**Decompose task**
- Trigger：一个 spec ticket 被标记时。
- Does：将 spec 拆分为多个 tickets，并在每个 ticket 中记录其依赖的 tickets。
- Triggers：一次 implementer run。

此处的 implementer run 会选取依赖项均已关闭的下一个 ticket，并再次触发自身，直到没有剩余 ticket。

## 迁移到更严格的 automated check

启用一条新的 lint 规则（或更严格的类型设置）后，只有部分文件能通过检查。该规则会在通过检查的文件上强制执行，而未通过的文件则列在例外清单中。

**Ratchet task**
- Trigger：每日定时触发。
- Does：从例外清单中取出一个文件，将其修复到通过更严格的检查，然后创建一个 PR。
- Triggers：一次 automated review run。例外清单清空后，ratchet run 就无文件可处理，迁移也就完成了。

每天一个小 PR 可以降低 human review 的成本，而检查只会越来越严格。

## 用户报告的 bugs 无人查看

应用中的 feedback button 是一个 ticket source：它会将每条报告创建为一个 ticket，并预先加上 explore 标签。后续工作由 explore run 完成。

## 生产问题总是很晚才被发现

监控器（慢查询、错误率）是一个 ticket source。它会为每个问题创建一个 ticket；再次发现相同问题时，则会在已有的未关闭 ticket 上添加评论。如果问题在修复合并后仍然存在，它会重新打开该 ticket。

## Factory 自身的 runs 失败

**Fix task**
- Trigger：orchestrator 报告一次 run 失败时。
- Does：将失败日志作为 ticket 提交；如果故障可以修复，则尝试以 PR 的形式提交修复。
- Triggers：一次 automated review run。修复 run 自身的工作失败时不会触发任何后续操作，因此修复不会形成链条。由于修复会更改 factory 本身，因此始终需要 human review。

## Codebase 逐渐偏离原有架构

**Architecture task**
- Trigger：夜间定时触发。
- Does：扫描近期更改，寻找重构候选项，并将它们作为一个 ticket 提交。
- Triggers：无。人类选取一个候选项并为其添加标签后，就会启动常规流程。

## 同样的错误一再出现

**Retro task**
- Trigger：一个 PR 合并时，并限流为每十个已合并 PR 触发一次。
- Does：阅读该 PR、对应的 ticket、其 automated reviews 和 run logs，并以 PR 形式提出对 factory 自身指令的修改。
- Triggers：一次 automated review run。
