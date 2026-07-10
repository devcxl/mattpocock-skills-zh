---
name: setup-matt-pocock-skills
description: 为本仓库配置工程技能——设置 issue 跟踪器、分类标签词汇和领域文档布局。在首次使用其他工程技能之前运行一次。
disable-model-invocation: true
---

# 设置 Matt Pocock 的工程技能

为工程技能所需的仓库级配置搭建骨架：

- **Issue 跟踪器**——issue 存放的位置（默认 GitHub；也原生支持本地 markdown）
- **分类标签**——五个标准分类角色使用的字符串
- **领域文档**——`CONTEXT.md` 和 ADR 的存放位置，以及读取它们的消费规则

这是一个提示驱动的技能，而非确定性脚本。先探查，然后展示发现，与用户确认，最后写入。

## 流程

### 1. 探查

查看当前仓库，了解其初始状态。读取已有内容，不要假设：

- `git remote -v` 和 `.git/config`——这是 GitHub 仓库吗？哪个？
- 仓库根目录下的 `AGENTS.md` 和 `CLAUDE.md`——其中任何一个存在吗？是否存在 `## Agent skills` 章节？
- 仓库根目录下的 `CONTEXT.md` 和 `CONTEXT-MAP.md`
- `docs/adr/` 和任何 `src/*/docs/adr/` 目录
- `docs/agents/`——该技能之前的输出是否已存在？
- `.scratch/`——表明本地 markdown issue 跟踪器约定已在使用的信号
- `triage` 技能是否已安装？（`triage` 技能文件夹是否与此文件夹同级，或 `triage` 在你的可用技能列表中）这决定了 B 节是否执行
- Monorepo 信号——`pnpm-workspace.yaml`、`package.json` 中的 `workspaces` 字段，或包含自有 `src/` 的 `packages/*` 目录。仅在真正的大型多包仓库中呈现；没有这些信号就是单上下文，适用于几乎所有仓库

### 2. 展示发现并询问

总结已存在和缺失的内容。然后按顺序处理各节——每答完一节再进入下一节。

每节以**推荐答案**开头，这样用户可以用一句话接受。仅在选项真正存在分支时提供一行解释；当探查已经确定了答案时跳过整节（未安装 `triage` 时跳过 B 节，无 monorepo 信号时跳过 C 节）。

**A 节——Issue 跟踪器。**

> 解释：此仓库的 issue 放置位置。`to-tickets`、`triage`、`to-spec` 和 `qa` 等技能需要读写它——它们需要知道是调用 `gh issue create`、在 `.scratch/` 下写入 markdown 文件，还是遵循你描述的其他工作流。选择你实际在此仓库跟踪工作的位置。

默认姿态：这些技能是为 GitHub 设计的。如果 `git remote` 指向 GitHub，建议使用 GitHub。如果指向 GitLab（`gitlab.com` 或自托管主机），建议使用 GitLab。否则（或如果用户偏好），提供以下选项：

- **GitHub**——issue 存在于仓库的 GitHub Issues 中（使用 `gh` CLI）
- **GitLab**——issue 存在于仓库的 GitLab Issues 中（使用 [`glab`](https://gitlab.com/gitlab-org/cli) CLI）
- **本地 markdown**——issue 作为文件存放在仓库中的 `.scratch/<feature>/` 下（适合单人项目或无远端的仓库）
- **其他**（Jira、Linear 等）——请用户用一段话描述工作流；技能将其记录为自由格式的散文

将选择记录在 `docs/agents/issue-tracker.md` 中。GitHub 和 GitLab 模板携带一个默认**关闭**的"PR 作为请求表面"标志——保持关闭且不要主动提及；需要将外部 PR 纳入分类队列的用户之后可以在文件中翻转该标志。

**B 节——分类标签词汇。** 如果 `triage` 技能未安装（探查会告诉你），直接跳过本节——未安装的技能不需要标签。

如果已安装，只问一个问题：

> 是否保留默认的分类标签？（推荐：**是**）

默认值就是五个标准角色，每个标签字符串等于其名称：`needs-triage`、`needs-info`、`ready-for-agent`、`ready-for-human`、`wontfix`。回答**是**时，按原样写入。仅在用户说否时——通常因为他们的跟踪器已使用其他名称（例如用 `bug:triage` 代替 `needs-triage`）——收集覆盖值，使 `triage` 应用已有标签而不是创建重复的标签。

**C 节——领域文档。** 默认为**单上下文**——仓库根目录下的一个 `CONTEXT.md` + `docs/adr/`。这适用于几乎所有仓库；无需询问直接写入。

仅当探查发现了 monorepo 信号时，提供**多上下文**选项——一个根级 `CONTEXT-MAP.md` 指向各个上下文各自的 `CONTEXT.md` 文件。然后确认用户想要哪种布局。

### 3. 确认和编辑

向用户展示草稿：

- 需要添加到 `CLAUDE.md` / `AGENTS.md` 中的 `## Agent skills` 块（选择规则见步骤 4）
- `docs/agents/issue-tracker.md`、`docs/agents/domain.md` 和 `docs/agents/triage-labels.md` 的内容（最后一项仅在安装了 `triage` 时）

让用户在写入前编辑。

### 4. 写入

**选择要编辑的文件：**

- 如果 `CLAUDE.md` 存在，编辑它。
- 否则，如果 `AGENTS.md` 存在，编辑它。
- 如果两者都不存在，询问用户要创建哪个——不要替他们选择。

永远不要在 `CLAUDE.md` 已经存在时创建 `AGENTS.md`（反之亦然）——始终编辑已存在的那个。
