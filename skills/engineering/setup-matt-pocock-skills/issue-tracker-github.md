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

## Wayfinding 操作

由 `/wayfinder` 使用。**地图**是一个带有**子** issue 的单一 issue，作为 ticket。

- **地图**：一个带有 `wayfinder:map` 标签的单一 issue，包含 Notes / Decisions-so-far / Fog 正文。`gh issue create --label wayfinder:map`。
- **子 ticket**：一个链接到地图作为 GitHub 子 issue 的 issue（通过 sub-issues 端点的 `gh api`）。在子 issue 未启用时，在地图正文的任务列表中添加子项，并在子项正文顶部添加 `Part of #<map>`。标签：`wayfinder:<type>`（`research`/`prototype`/`grilling`/`task`）。一旦认领，ticket 分配给推动的开发人员。
- **阻塞关系**：GitHub 的**原生 issue 依赖关系**——规范的、UI 可见的表示。使用 `gh api --method POST repos/<owner>/<repo>/issues/<child>/dependencies/blocked_by -F issue_id=<blocker-db-id>` 添加边，其中 `<blocker-db-id>` 是阻塞者的数字**数据库 ID**（`gh api repos/<owner>/<repo>/issues/<n> --jq .id`，_不是_ `#number` 或 `node_id`）。GitHub 报告 `issue_dependencies_summary.blocked_by`（仅打开的阻塞者——实时门控）。当依赖不可用时，回退到子项正文顶部的 `Blocked by: #<n>, #<n>` 行。当所有阻塞者都关闭时 ticket 解除阻塞。
- **前沿查询**：列出地图的打开子项（`gh issue list --state open`，限制在地图的子 issue/任务列表范围内），排除任何带有打开阻塞者（`issue_dependencies_summary.blocked_by > 0`，或 `Blocked by` 行中的打开 issue）或分配人的条目；按地图顺序第一个胜出。
- **认领**：`gh issue edit <n> --add-assignee @me`——会话的第一次写入。
- **解决**：`gh issue comment <n> --body "<answer>"`，然后 `gh issue close <n>`，然后在地图的 Decisions-so-far 后面追加上下文指针（摘要 + 链接）。
