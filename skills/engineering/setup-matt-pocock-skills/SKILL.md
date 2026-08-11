---
name: setup-matt-pocock-skills
description: 为本仓库配置工程技能——设置其 issue tracker、分诊标签词汇表和领域文档布局。首次使用其他工程技能前运行一次。
disable-model-invocation: true
---

# 设置 Matt Pocock 技能

搭建工程技能所依赖的逐仓库配置：

- **Issue 跟踪器** — issue 放在哪里（默认 GitHub；本地 markdown 也开箱即用）
- **分类标签** — 五个规范分类角色所用的标签字符串
- **领域文档** — `CONTEXT.md` 和 ADR 放在哪里，以及读取它们的消费规则

这是一个提示驱动的技能，不是确定性的脚本。探索、呈现你的发现、与用户确认，然后写入。

## 流程

### 1. 探索

查看当前仓库，了解它的起始状态。读一切存在的东西；不要假设：

- `git remote -v` 和 `.git/config` — 这是 GitHub 仓库吗？是哪一个？
- 仓库根目录的 `AGENTS.md` 和 `CLAUDE.md` — 存在吗？里面是否已有 `## Agent skills` 章节？
- 仓库根目录的 `CONTEXT.md` 和 `CONTEXT-MAP.md`
- `docs/adr/` 和任何 `src/*/docs/adr/` 目录
- `docs/agents/` — 这个技能之前的产出是否已存在？
- `.scratch/` — 表明本地 markdown issue 跟踪器约定已在使用的迹象
- `triage` 技能是否已安装？（与这个技能文件夹并列的 `triage` 技能文件夹，或你的可用技能中有 `triage`。）这决定 B 节是否执行。
- Monorepo 信号 — 有 `pnpm-workspace.yaml`、`package.json` 里有 `workspaces` 字段，或有带自己的 `src/` 的 `packages/*`。只在真正大的多包仓库里出现；没有它们就是单上下文，而几乎所有仓库都是单上下文。

### 2. 呈现发现并询问

总结哪些存在、哪些缺失。然后按顺序过各节——一节、一个回答，然后下一节。

每节先用推荐答案开头，让用户一个字就能接受。只有在选择确实分叉时才给一行解释；当探索已经解决了该节时就整节跳过（没装 `triage` 时跳过 B 节，没有 monorepo 时跳过 C 节）。

**A 节 — Issue 跟踪器。**

> 解释：这个仓库的 "issue tracker" 就是 issue 存放的地方。`to-tickets`、`triage`、`to-spec` 等技能会读写它——它们需要知道该调用 `gh issue create`、在 `.scratch/` 下写 markdown 文件，还是遵循你描述的其他工作流。选一个你实际为本仓库跟踪工作的位置。

默认姿态：这些技能是为 GitHub 设计的。如果 `git remote` 指向 GitHub，就提议 GitHub。如果 `git remote` 指向 GitLab（`gitlab.com` 或自托管主机），就提议 GitLab。否则（或用户偏好），提供：

- **GitHub** — issue 存在仓库的 GitHub Issues 里（使用 `gh` CLI）
- **GitLab** — issue 存在仓库的 GitLab Issues 里（使用 [`glab`](https://gitlab.com/gitlab-org/cli) CLI）
- **本地 markdown** — issue 作为 `.scratch/<feature>/` 下的文件存在本仓库中（适合单人项目或没有 remote 的仓库）
- **其他**（Jira、Linear 等）— 让用户用一段话描述工作流；技能会把它记录为自由文本

把选择记录在 `docs/agents/issue-tracker.md`。GitHub 和 GitLab 模板带有"PRs as a request surface"（把 PR 当作请求入口）标志，默认**关闭**——保持关闭，不要提起它；想把外部 PR 放进分类队列的用户可以稍后在文件里打开这个标志。

**B 节 — 分类标签词汇。** 如果 `triage` 技能未安装（探索已告诉你），整节跳过——未安装的技能不需要标签。

如果已安装，只问一个问题：

> 你想保留默认的分类标签吗？（推荐：**是**）

默认值就是五个规范角色，每个标签字符串等于其角色名：`needs-triage`、`needs-info`、`ready-for-agent`、`ready-for-human`、`wontfix`。选**是**，就原样写入。只有当用户说不——通常是因为他们的跟踪器已经用了别的名字（比如用 `bug:triage` 表示 `needs-triage`）——才收集覆盖项，这样 `triage` 会应用已有标签而不是创建重复的。

**C 节 — 领域文档。** 默认**单上下文**——仓库根目录一个 `CONTEXT.md` + `docs/adr/`。这适合几乎所有仓库；不问直接写。

只有当探索发现 monorepo 信号时，才提供**多上下文**——一个指向各上下文 `CONTEXT.md` 文件的根级 `CONTEXT-MAP.md`。然后确认他们想要哪种布局。

### 3. 确认并编辑

向用户展示草稿：

- 要加进 `CLAUDE.md` / `AGENTS.md` 中正在编辑的那个文件的 `## Agent skills` 块（选择规则见步骤 4）
- `docs/agents/issue-tracker.md`、`docs/agents/domain.md` 和 `docs/agents/triage-labels.md` 的内容（最后一个仅在 `triage` 已安装时）

写入前让他们编辑。

### 4. 写入

**选择要编辑的文件：**

- 如果 `CLAUDE.md` 存在，编辑它。
- 否则如果 `AGENTS.md` 存在，编辑它。
- 如果都不存在，问用户要创建哪一个——不要替他们选。

当 `CLAUDE.md` 已存在时绝不创建 `AGENTS.md`（反之亦然）——总是编辑已经存在的那个。

如果所选文件中已有 `## Agent skills` 块，就地更新其内容，而不是追加一份重复的。不要覆盖用户对周围章节的编辑。

该块：

```markdown
## Agent skills

### Issue tracker

[one-line summary of where issues are tracked]. See `docs/agents/issue-tracker.md`.

### Triage labels

[one-line summary of the label vocabulary]. See `docs/agents/triage-labels.md`.

### Domain docs

[one-line summary of layout — "single-context" or "multi-context"]. See `docs/agents/domain.md`.
```

只有当 `triage` 已安装且 B 节执行过时，才包含 `### Triage labels` 子块并写 `docs/agents/triage-labels.md`。否则两者都省略。

然后用本技能文件夹中的种子模板作为起点写文档文件：

- [issue-tracker-github.md](./issue-tracker-github.md) — GitHub issue 跟踪器
- [issue-tracker-gitlab.md](./issue-tracker-gitlab.md) — GitLab issue 跟踪器
- [issue-tracker-local.md](./issue-tracker-local.md) — 本地 markdown issue 跟踪器
- [triage-labels.md](./triage-labels.md) — 标签映射（仅当 `triage` 已安装）
- [domain.md](./domain.md) — 领域文档消费规则 + 布局

对于"其他" issue 跟踪器，用用户的描述从头写 `docs/agents/issue-tracker.md`。

### 5. 完成

告诉用户设置已完成，以及哪些工程技能现在会读取这些文件。提及他们之后可以直接编辑 `docs/agents/*.md`——只有想切换 issue 跟踪器或从头重来时才需要重跑本技能。
