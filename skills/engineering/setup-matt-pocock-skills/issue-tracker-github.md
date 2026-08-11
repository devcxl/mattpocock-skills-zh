# Issue 跟踪器：GitHub

本仓库的 issue 和 spec 以 GitHub issue 的形式存在。所有操作都使用 `gh` CLI。

## 约定

- **创建 issue**：`gh issue create --title "..." --body "..."`。多行正文用 heredoc。
- **读取 issue**：`gh issue view <number> --comments`，用 `jq` 过滤评论并同时获取标签。
- **列出 issue**：`gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` 并配合适当的 `--label` 和 `--state` 过滤。
- **评论 issue**：`gh issue comment <number> --body "..."`
- **应用 / 移除标签**：`gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **关闭**：`gh issue close <number> --comment "..."`

从 `git remote -v` 推断仓库——在克隆内运行时 `gh` 会自动这么做。

## 把拉取请求作为分类入口

**把 PR 当作请求入口：否。** _（如果本仓库把外部 PR 视为功能请求，设为 `yes`；`/triage` 读取此标志。）_

设为 `yes` 时，PR 与 issue 走同样的标签和状态，使用对应的 `gh pr` 命令：

- **读取 PR**：`gh pr view <number> --comments`，diff 用 `gh pr diff <number>`。
- **列出供分类的外部 PR**：`gh pr list --state open --json number,title,body,labels,author,authorAssociation,comments`，然后只保留 `authorAssociation` 为 `CONTRIBUTOR`、`FIRST_TIME_CONTRIBUTOR` 或 `NONE` 的（丢弃 `OWNER`/`MEMBER`/`COLLABORATOR`）。
- **评论 / 打标签 / 关闭**：`gh pr comment`、`gh pr edit --add-label`/`--remove-label`、`gh pr close`。

GitHub 的 issue 和 PR 共用一个编号空间，所以裸的 `#42` 可能是其中任何一种——用 `gh pr view 42` 解析，失败则回退到 `gh issue view 42`。

## 当技能说"发布到 issue 跟踪器"

创建一个 GitHub issue。

## 当技能说"获取相关 ticket"

运行 `gh issue view <number> --comments`。

## Wayfinding 操作

由 `/wayfinder` 使用。**地图**是一个单独的 issue，**子** issue 是 ticket。

- **地图**：一个标记为 `wayfinder:map` 的 issue，承载 Notes / Decisions-so-far / Fog 正文。`gh issue create --label wayfinder:map`。
- **子 ticket**：作为 GitHub 子 issue 链接到地图的 issue（在 sub-issues 端点上用 `gh api`）。在未启用 sub-issues 时，把子项加进地图正文的任务列表，并在子项正文顶部放 `Part of #<map>`。标签：`wayfinder:<type>`（`research`/`prototype`/`grilling`/`task`）。一旦被认领，ticket 就分配给驱动的开发者。
- **阻塞**：GitHub 的**原生 issue 依赖**——规范、UI 可见的表示。用 `gh api --method POST repos/<owner>/<repo>/issues/<child>/dependencies/blocked_by -F issue_id=<blocker-db-id>` 添加边，其中 `<blocker-db-id>` 是阻塞者的数字**数据库 id**（`gh api repos/<owner>/<repo>/issues/<n> --jq .id`，*不是* `#number` 或 `node_id`）。GitHub 报告 `issue_dependencies_summary.blocked_by`（只含未关闭的阻塞者——即实时闸门）。在依赖不可用之处，回退到子项正文顶部的 `Blocked by: #<n>, #<n>` 行。当每个阻塞者都被关闭时，ticket 即解除阻塞。
- **前沿查询**：列出地图未关闭的子项（`gh issue list --state open`，限定在地图的子 issue / 任务列表），丢弃任何有未关闭阻塞者（`issue_dependencies_summary.blocked_by > 0`，或 `Blocked by` 行中有未关闭 issue）或有指派人的；按地图顺序取第一个。
- **认领**：`gh issue edit <n> --add-assignee @me` — 会话的第一次写入。
- **解决**：`gh issue comment <n> --body "<answer>"`，然后 `gh issue close <n>`，然后把上下文指针（gist + 链接）追加到地图的 Decisions-so-far。
