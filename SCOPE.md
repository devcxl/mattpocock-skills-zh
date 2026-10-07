# 范围

本仓库收录的是我每天使用的一组技能，并经过精心筛选：欢迎提出想法，每项想法都按以下标准评估。Issue 用于跟踪技能变更。问题与讨论请前往 [GitHub Discussions](https://github.com/mattpocock/skills/discussions)。

## 评估标准

反馈或想法类 issue 只有同时满足以下两项才会保持开放：

1. **观察到的故障。** 描述真实会话中发生的问题：你运行了什么、技能做了什么、你原本期待什么。假设性的改进（“如果能……就更好了”）不满足这一项。
2. **符合理念。** 不属于 [`.out-of-scope/`](./.out-of-scope/) 中列出的事项或以往已拒绝的提案，也不是配置选项、harness 专属分支，或为某个人的工作流定制的调整。这些内容应放入你自己的 `CLAUDE.md` / `AGENTS.md`，或放进 fork（skills.sh 会提供可编辑副本）。

改动大小无关紧要：一个词的修正和整篇重写都适用相同标准。点赞和 +1 评论不计入。

## 按 bucket 划分

- **`engineering/`、`productivity/`、`in-progress/`**：适用上述标准。
- **`misc/`**：已冻结且不再维护。所有 issue 都会关闭。参见 [`frozen-misc-skills.md`](./.out-of-scope/frozen-misc-skills.md)。
- **新技能**：提案和贡献均关闭。如果现有技能组合即可实现该行为，就不新增技能。参见 [`new-skills.md`](./.out-of-scope/new-skills.md)。

## 已有决定

[`.out-of-scope/`](./.out-of-scope/) 中的每个文件都记录一项已拒绝的想法及拒绝原因。提交 issue 前请先阅读：

- [`frozen-misc-skills.md`](./.out-of-scope/frozen-misc-skills.md)
- [`harness-name-collisions.md`](./.out-of-scope/harness-name-collisions.md)
- [`mainstream-issue-trackers-only.md`](./.out-of-scope/mainstream-issue-trackers-only.md)
- [`native-question-tool.md`](./.out-of-scope/native-question-tool.md)
- [`new-skills.md`](./.out-of-scope/new-skills.md)
- [`question-limits.md`](./.out-of-scope/question-limits.md)
- [`setup-skill-verify-mode.md`](./.out-of-scope/setup-skill-verify-mode.md)
- [`subagent-recursion.md`](./.out-of-scope/subagent-recursion.md)

## 信息不明确的 issue

无法按上述标准判断的 issue 会先进行一轮追问，并添加 `needs-info` 标签。如果报告者 14 天内没有回复，就会关闭。拒绝的 issue 会以“not planned”原因关闭。
