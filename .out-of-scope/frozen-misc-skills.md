# `misc/` 技能的变更

`skills/misc/` 下的技能（`git-guardrails-claude-code`、`migrate-to-shoehorn`、`scaffold-exercises`、`setup-pre-commit` 以及之后放入该目录的其他技能）均已冻结。针对这些技能的 bug 报告、功能请求和 PR 都会关闭。

## 为什么不在范围内

`misc/` 用来存放我保留但很少使用的技能。它们不会晋升：不会随 Claude Code 插件发布，没有文档页，我也不会在日常工作中运行它们。因此我无法判断修复是否正确，也难以及时发现修复是否破坏了其他东西。要按推广技能相同的标准维护它们，成本却一样，使用量则少得多。

这些技能仍保留在仓库中且无人维护，因为它们对一些人而言目前仍然可用。如果某项技能对你不起作用，请通过 skills.sh 安装，并修好你自己的副本：这些文件归你编辑。

如果某项 `misc/` 技能之后重新晋升到 `engineering/` 或 `productivity/`，从晋升时起它就重新纳入维护范围。

## 以往请求

- #14：“setup-pre-commit/SKILL.md 里可能有拼写错误”
- #301：“`block-dangerous-git.sh` 可被任意 git 全局选项绕过（例如 `git -C <dir> push`）”
- #465：“git-guardrails-claude-code 文档没有说明相较 Claude Code 内置 deny 规则的优势”
- #898：“git-guardrails-claude-code：没有 jq 时 hook 会放行，且漏掉常见 git 写法”
