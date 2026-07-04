# Issue 跟踪器：GitLab

本仓库的 issue 和 PRD 以 GitLab issues 的形式存在。所有操作均使用 [`glab`](https://gitlab.com/gitlab-org/cli) CLI。

## 约定

- **创建 issue**：`glab issue create --title "..." --description "..."`。多行描述使用 heredoc。使用 `--description -` 可在编辑器中打开。
- **读取 issue**：`glab issue view <number> --comments`。使用 `-F json` 获取机器可读输出。
- **列出 issue**：`glab issue list -F json`，可配合 `--label` 过滤。
- **在 issue 下评论**：`glab issue note <number> --message "..."`。GitLab 将评论称为 "notes"。
- **添加 / 移除标签**：`glab issue update <number> --label "..."` / `--unlabel "..."`。多个标签可用逗号分隔或重复使用 flag。
- **关闭 issue**：`glab issue close <number>`。`glab issue close` 不支持在关闭时附带评论，因此需先执行 `glab issue note <number> --message "..."` 发布解释，再关闭。
- **合并请求**：GitLab 将 PR 称为 "merge requests"。使用 `glab mr create`、`glab mr view`、`glab mr note` 等——与 `gh pr ...` 形态相同，只是将 `pr` 替换为 `mr`，将 `comment`/`--body` 替换为 `note`/`--message`。

通过 `git remote -v` 推断仓库地址——在 clone 的仓库内运行 `glab` 会自动识别。

## 将合并请求作为分类入口

**MR 作为请求入口：否。** _（如果本仓库将外部合并请求视为功能请求，则设为 `yes`；`/triage` 会读取此标志。）_

当设为 `yes` 时，MR 与 issue 使用相同的标签和状态进行流转，使用 `glab mr` 的等价命令：

- **读取 MR**：`glab mr view <number> --comments` 以及 `glab mr diff <number>` 获取 diff。
- **列出需要分类的外部 MR**：`glab mr list -F json`，然后只保留作者不是项目成员/所有者的 MR（贡献者的 MR，而非维护者正在进行中的工作）。
- **评论 / 标签 / 关闭**：`glab mr note`、`glab mr update --label`/`--unlabel`、`glab mr close`。

与 GitHub 不同，GitLab 为 issue 和 MR 分别编号，因此 `#42` 在你知道维护者指的是哪个入口时是明确的。

## 当技能说"发布到 issue 跟踪器"

创建一个 GitLab issue。

## 当技能说"获取相关票"

运行 `glab issue view <number> --comments`。

## Wayfinding 操作

由 `/wayfinder` 使用。**地图**是一个带有**子** issue 的单一 issue，作为 ticket。

- **地图**：一个带有 `wayfinder:map` 标签的单一 issue，包含 Notes / Decisions-so-far / Fog 正文。`glab issue create --label wayfinder:map`。（在支持原生 epics 的 GitLab 层级上，可以使用 epic 作为地图；带标签的 issue 在任何地方都能工作。）
- **子 ticket**：一个在其描述顶部带有 `Part of #<map>` 以及 `wayfinder:<type>`（`research`/`prototype`/`grilling`/`task`）标签的 issue。一旦认领，ticket 分配给推动的开发人员。
- **阻塞关系**：GitLab 的**原生阻塞链接**——规范的、UI 可见的表示。使用 `/blocked_by #<n>` 快速操作添加，作为 note 发布（`glab issue note <child> --message "/blocked_by #<blocker>"`）。原生阻塞链接是 Premium/Ultimate 功能；在免费版（或不可用时），回退到描述顶部的 `Blocked by: #<n>, #<n>` 行。当所有阻塞者都关闭时 ticket 解除阻塞。
- **前沿查询**：`glab issue list -F json` 限制在地图的子项范围内，排除任何带有打开阻塞者——一个指向打开 issue 的原生 `blocked_by` 链接（`glab api projects/:id/issues/:iid/links`），或 `Blocked by` 行中的打开 issue——或分配人的条目；按地图顺序第一个胜出。
- **认领**：`glab issue update <n> --assignee @me`——会话的第一次写入。
- **解决**：`glab issue note <n> --message "<answer>"`，然后 `glab issue close <n>`，然后在地图的 Decisions-so-far 后面追加上下文指针（摘要 + 链接）。
