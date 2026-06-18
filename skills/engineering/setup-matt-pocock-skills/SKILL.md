---
name: setup-matt-pocock-skills
description: 为本仓库配置工程技能——设置 issue 跟踪器、分类标签词汇和领域文档布局。在首次使用其他工程技能之前运行一次。
disable-model-invocation: true
---

# 设置 Matt Pocock 的工程技能

为工程技能所需的仓库级配置搭建骨架：

- **Issue 跟踪器** —— issue 存放在哪里（默认使用 GitHub；也内置支持本地 markdown）
- **分类标签** —— 五个标准分类角色对应的实际标签字符串
- **领域文档** —— `CONTEXT.md` 和 ADR 的存放位置，以及读取规则

这是一个 prompt 驱动的技能，不是确定性的脚本。先探索、呈现发现的内容、向用户确认，再写入文件。

## 流程

### 1. 探索

查看当前仓库，了解初始状态。读取已有内容，不要假设：

- `git remote -v` 和 `.git/config` —— 这是一个 GitHub 仓库吗？具体是哪个？
- 仓库根目录下的 `AGENTS.md` 和 `CLAUDE.md` —— 是否存在？其中是否已有 `## Agent skills` 段落？
- 仓库根目录下的 `CONTEXT.md` 和 `CONTEXT-MAP.md`
- `docs/adr/` 以及任何 `src/*/docs/adr/` 目录
- `docs/agents/` —— 该技能之前的输出是否已存在？
- `.scratch/` —— 是否已经在使用本地 markdown issue 跟踪方案的标志

### 2. 呈现发现并提问

总结已有的内容和缺失的内容。然后**逐一**引导用户完成三项决策——每次只呈现一个部分，获得用户答复后再进入下一部分。不要一次性把三项全部抛出来。

假设用户不了解这些术语的含义。每个部分以简短的解释开头（是什么、为什么这些技能需要它、选择不同会带来什么变化），然后展示选项和默认值。

**A 部分 —— Issue 跟踪器。**

> 解释：Issue 跟踪器是本仓库 issue 的存放位置。`to-issues`、`triage`、`to-prd` 和 `qa` 等技能会从中读取和写入——它们需要知道是调用 `gh issue create`、将 markdown 文件写入 `.scratch/` 目录，还是遵循你描述的其他工作流。请选择你实际跟踪本仓库工作的地方。

默认倾向：这些技能是为 GitHub 设计的。如果 `git remote` 指向 GitHub，则推荐 GitHub。如果 `git remote` 指向 GitLab（`gitlab.com` 或自托管地址），则推荐 GitLab。否则（或用户有偏好），提供以下选项：

- **GitHub** — issue 存放在仓库的 GitHub Issues 中（使用 `gh` CLI）
- **GitLab** — issue 存放在仓库的 GitLab Issues 中（使用 [`glab`](https://gitlab.com/gitlab-org/cli) CLI）
- **本地 markdown** — issue 以文件形式存放在本仓库 `.scratch/<feature>/` 下（适合个人项目或没有远程仓库的项目）
- **其他**（Jira、Linear 等）——请用户用一段话描述工作流，技能会将其记录为自由文本

如果——且仅当——用户选择了 **GitHub** 或 **GitLab**，再追问一个问题：

> 解释：开源仓库经常通过 pull request（而不仅仅是 issue）接收功能请求——PR 是附带了代码的 issue。如果你开启此选项，`/triage` 会将*外部* PR 也拉入同一个队列，并按照与 issue 相同的标签和状态进行流转（协作者正在进行中的 PR 不受影响）。如果 PR 不是你的请求入口，则保持关闭。

- **PR 作为请求入口** —— 是 / 否（默认：否）。将答案记录在 `docs/agents/issue-tracker.md` 中。对于本地 markdown 和其他跟踪器，跳过此问题——因为它们没有 PR。

**B 部分 —— 分类标签词汇。**

> 解释：当 `triage` 技能处理一个进来的 issue 时，它会将 issue 沿一条状态机流转——需要评估、等待报告人回复、可被 AFK agent 接手、需要人工实现、或者不予处理。为此，它需要打上与*你实际配置的标签*一致的标签字符串。如果你的仓库已经在使用不同的标签名称（例如 `bug:triage` 而非 `needs-triage`），请在此处做好映射，让技能使用正确的标签，而不是创建重复标签。

五个标准角色：

- `needs-triage` — 维护者需要评估
- `needs-info` — 等待报告人提供更多信息
- `ready-for-agent` — 规格完备，AFK 就绪（agent 无需人工上下文即可接手）
- `ready-for-human` — 需要人工实现
- `wontfix` — 不予处理

默认：每个角色的标签字符串等于其名称。询问用户是否需要覆盖任何一项。如果其 issue 跟踪器中尚无标签，默认值即可。

**C 部分 —— 领域文档。**

> 解释：某些技能（`improve-codebase-architecture`、`diagnosing-bugs`、`tdd`）会读取 `CONTEXT.md` 文件以了解项目的领域语言，以及 `docs/adr/` 以了解过往的架构决策。它们需要知道仓库采用的是单一全局上下文还是多个上下文（例如一个同时有前端和后端上下文的 monorepo），以便在正确的位置进行查找。

确认布局：

- **单上下文** — 仓库根目录下只有一个 `CONTEXT.md` + `docs/adr/`。大多数仓库都是这种。
- **多上下文** — 根目录下的 `CONTEXT-MAP.md` 指向各个独立的 `CONTEXT.md` 文件（通常用于 monorepo）。

### 3. 确认并编辑

向用户展示以下草稿：

- 要添加到 `CLAUDE.md` / `AGENTS.md`（选择规则见步骤 4）中的 `## Agent skills` 块
- `docs/agents/issue-tracker.md`、`docs/agents/triage-labels.md`、`docs/agents/domain.md` 的内容

让用户在写入之前可以修改。

### 4. 写入

**选择要编辑的文件：**

- 如果 `CLAUDE.md` 存在，编辑它。
- 否则如果 `AGENTS.md` 存在，编辑它。
- 如果两者都不存在，询问用户要创建哪一个——不要替用户选择。

永远不要在 `CLAUDE.md` 已存在时创建 `AGENTS.md`（反之亦然）——始终编辑已存在的那个。

如果所选文件中已有 `## Agent skills` 块，则原地更新其内容，而不是再追加一个重复块。不要覆盖用户对周围段落所做的修改。

该块的内容：

```markdown
## Agent skills

### Issue tracker

[对 issue 跟踪位置的一句话总结，以及外部 PR 是否作为分类入口]。详见 `docs/agents/issue-tracker.md`。

### Triage labels

[对标签词汇的一句话总结]。详见 `docs/agents/triage-labels.md`。

### Domain docs

[对布局的一句话总结——"单上下文"或"多上下文"]。详见 `docs/agents/domain.md`。
```

然后，以本技能文件夹内的种子模板为起点，写入三个文档文件：

- [issue-tracker-github.md](./issue-tracker-github.md) — GitHub issue 跟踪器
- [issue-tracker-gitlab.md](./issue-tracker-gitlab.md) — GitLab issue 跟踪器
- [issue-tracker-local.md](./issue-tracker-local.md) — 本地 markdown issue 跟踪器
- [triage-labels.md](./triage-labels.md) — 标签映射
- [domain.md](./domain.md) — 领域文档消费规则 + 布局

对于"其他"issue 跟踪器，根据用户的描述从头编写 `docs/agents/issue-tracker.md`。

### 5. 完成

告知用户设置已完成，以及哪些工程技能现在会读取这些文件。提醒他们以后可以直接编辑 `docs/agents/*.md`——只有当他们想切换 issue 跟踪器或从头重新配置时，才需要重新运行此技能。
