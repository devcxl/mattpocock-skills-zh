# Issue 跟踪器：GitHub

本仓库的 issue 和 PRD 以 GitHub issues 的形式存在。所有操作均使用 `gh` CLI。

## 约定

- **创建 issue**：`gh issue create --title "..." --body "..."`。多行正文使用 heredoc。
- **读取 issue**：`gh issue view <number> --comments`，通过 `jq` 过滤评论并获取标签。
- **列出 issue**：`gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'`，可配合 `--label` 和 `--state` 过滤。
- **在 issue 下评论**：`gh issue comment <number> --body "..."`
- **添加 / 移除标签**：`gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **关闭 issue**：`gh issue close <number> --comment "..."`

通过 `git remote -v` 推断仓库地址——在 clone 的仓库内运行 `gh` 会自动识别。

## 将 PR 作为分类入口

**PR 作为请求入口：否。** _（如果本仓库将外部 PR 视为功能请求，则设为 `yes`；`/triage` 会读取此标志。）_

当设为 `yes` 时，PR 与 issue 使用相同的标签和状态进行流转，使用 `gh pr` 的等价命令：

- **读取 PR**：`gh pr view <number> --comments` 以及 `gh pr diff <number>` 获取 diff。
- **列出需要分类的外部 PR**：`gh pr list --state open --json number,title,body,labels,author,authorAssociation,comments`，然后只保留 `authorAssociation` 为 `CONTRIBUTOR`、`FIRST_TIME_CONTRIBUTOR` 或 `NONE` 的记录（排除 `OWNER`/`MEMBER`/`COLLABORATOR`）。
- **评论 / 标签 / 关闭**：`gh pr comment`、`gh pr edit --add-label`/`--remove-label`、`gh pr close`。

GitHub 的 issue 和 PR 共享同一个编号空间，因此裸写 `#42` 可能指代其中任意一种——先用 `gh pr view 42` 解析，再回退到 `gh issue view 42`。

## 当技能说"发布到 issue 跟踪器"

创建一个 GitHub issue。

## 当技能说"获取相关票"

运行 `gh issue view <number> --comments`。
