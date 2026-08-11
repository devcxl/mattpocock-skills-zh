# Issue 跟踪器：GitLab

本仓库的 issue 和 spec 以 GitLab issue 的形式存在。所有操作都使用 [`glab`](https://gitlab.com/gitlab-org/cli) CLI。

## 约定

- **创建 issue**：`glab issue create --title "..." --description "..."`。多行描述用 heredoc。传 `--description -` 打开编辑器。
- **读取 issue**：`glab issue view <number> --comments`。用 `-F json` 获取机器可读输出。
- **列出 issue**：`glab issue list -F json` 并配合适当的 `--label` 过滤。
- **评论 issue**：`glab issue note <number> --message "..."`。GitLab 把评论称为 "notes"。
- **应用 / 移除标签**：`glab issue update <number> --label "..."` / `--unlabel "..."`。多个标签可以用逗号分隔或重复该标志。
- **关闭**：`glab issue close <number>`。`glab issue close` 不接受关闭评论，所以先用 `glab issue note <number> --message "..."` 发解释，再关闭。
- **合并请求**：GitLab 把 PR 称为 "merge requests"。用 `glab mr create`、`glab mr view`、`glab mr note` 等——与 `gh pr ...` 同样的形态，把 `pr` 换成 `mr`，把 `comment`/`--body` 换成 `note`/`--message`。

从 `git remote -v` 推断仓库——在克隆内运行时 `glab` 会自动这么做。

## 把合并请求作为分类入口

**把 MR 当作请求入口：否。** _（如果本仓库把外部合并请求视为功能请求，设为 `yes`；`/triage` 读取此标志。）_

设为 `yes` 时，MR 与 issue 走同样的标签和状态，使用对应的 `glab mr` 命令：

- **读取 MR**：`glab mr view <number> --comments`，diff 用 `glab mr diff <number>`。
- **列出供分类的外部 MR**：`glab mr list -F json`，然后只保留作者不是项目成员/所有者的 MR（贡献者的 MR，而不是维护者进行中的工作）。
- **评论 / 打标签 / 关闭**：`glab mr note`、`glab mr update --label`/`--unlabel`、`glab mr close`。

与 GitHub 不同，GitLab 对 issue 和 MR 分别编号，所以一旦知道维护者指的是哪个入口，`#42` 就毫无歧义。

## 当技能说"发布到 issue 跟踪器"

创建一个 GitLab issue。

## 当技能说"获取相关 ticket"

运行 `glab issue view <number> --comments`。

## Wayfinding 操作

由 `/wayfinder` 使用。**地图**是一个单独的 issue，**子** issue 是 ticket。

- **地图**：一个标记为 `wayfinder:map` 的 issue，承载 Notes / Decisions-so-far / Fog 正文。`glab issue create --label wayfinder:map`。（在带原生 epic 的 GitLab 版本上，epic 也可以承载地图；带标签的 issue 在任何地方都能用。）
- **子 ticket**：描述顶部带 `Part of #<map>`、标签为 `wayfinder:<type>`（`research`/`prototype`/`grilling`/`task`）的 issue。一旦被认领，ticket 就分配给驱动的开发者。
- **阻塞**：GitLab 的**原生阻塞链接**——规范、UI 可见的表示。用 `/blocked_by #<n>` 快捷操作添加，以 note 形式发布（`glab issue note <child> --message "/blocked_by #<blocker>"`）。原生阻塞链接是 Premium/Ultimate 功能；在免费版（或不可用之处）回退到描述顶部的 `Blocked by: #<n>, #<n>` 行。当每个阻塞者都被关闭时，ticket 即解除阻塞。
- **前沿查询**：`glab issue list -F json` 限定在地图的子项，丢弃任何有未关闭阻塞者——到未关闭 issue 的原生 `blocked_by` 链接（`glab api projects/:id/issues/:iid/links`），或 `Blocked by` 行中的未关闭 issue——或有指派人的；按地图顺序取第一个。
- **认领**：`glab issue update <n> --assignee @me` — 会话的第一次写入。
- **解决**：`glab issue note <n> --message "<answer>"`，然后 `glab issue close <n>`，然后把上下文指针（gist + 链接）追加到地图的 Decisions-so-far。
