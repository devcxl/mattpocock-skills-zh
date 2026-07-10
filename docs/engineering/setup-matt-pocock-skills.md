快速开始：

```bash
npx skills add mattpocock/skills --skill=setup-matt-pocock-skills
```

```bash
npx skills update setup-matt-pocock-skills
```

[源代码](https://github.com/mattpocock/skills/tree/main/skills/engineering/setup-matt-pocock-skills)

## 功能

`setup-matt-pocock-skills` 教会一个仓库工程技能在该仓库中应该如何运作——issue 放在哪里、分类标签叫什么、领域文档在什么位置——并将这些答案记录为其他技能读取的**配置**。

它写入配置，而不是硬编码行为。工程链假定 `docs/agents/` 下存在三个文件；本技能是一次性引导程序，从你仓库的实际配置中发现（`git remote`、已有标签、已有的 `CONTEXT.md`）并与你确认后生成，而不是凭空猜测。它是提示驱动的——探查、展示发现、确认、然后写入——而不是确定性脚本。

## 何时使用

通过输入 `/setup-matt-pocock-skills` 来调用——agent 不会主动使用它。

**每个仓库在首次使用其他工程技能之前运行一次**。如果 [triage](https://aihero.dev/skills-triage)、[to-spec](https://aihero.dev/skills-to-spec) 或 [to-tickets](https://aihero.dev/skills-to-tickets) 开始猜测你的 issue 放在哪里、或创建不存在的标签，说明这里还没有完成设置。仅在需要切换跟踪器或重置时重新运行——日常调整直接编辑 `docs/agents/*.md` 即可。

## 三个决策

每个决策都以**推荐答案**开头，你只需一句话就能接受，并且它会跳过已经能推断出的内容——因此大多数情况下只是几次快速确认：

- **Issue 跟踪器**——工作的跟踪位置，这样 `triage`/`to-spec`/`to-tickets` 就知道该调用 `gh`、`glab`、在 `.scratch/` 下写入 markdown，还是遵循你描述的工作流。GitHub、GitLab、本地 markdown 或其他。（它会提议与你的 `git remote` 匹配的那个。）
- **分类标签**——仅在安装了 `triage` 技能时询问，然后就一句：保留默认标签（`needs-triage`、`needs-info`、`ready-for-agent`、`ready-for-human`、`wontfix`）？只有当你的跟踪器已使用其他名称时才说否，这样 `triage` 应用已有标签而不是创建重复的。
- **领域文档**——默认假定为单上下文（根目录下一个 `CONTEXT.md` + `docs/adr/`），适用于几乎所有仓库；仅在发现 monorepo 信号时才会提示多上下文地图。

输出是一组文件，位于 `docs/agents/` 下——`issue-tracker.md`、`domain.md`，以及在安装了 `triage` 时的 `triage-labels.md`——外加一个 `## Agent skills` 块，指向仓库已有的 `CLAUDE.md` 或 `AGENTS.md` 文件中。这些文件是整个工具包所依赖的共享基础。

## 验证标准

- `issue-tracker.md` 和 `domain.md` 出现在 `docs/agents/` 下（安装了 `triage` 时还有 `triage-labels.md`），并且一个 `## Agent skills` 章节出现在你的 `CLAUDE.md` 或 `AGENTS.md` 中。
- 它提议的跟踪器与你实际的 `git remote` 匹配，标签与你仓库中已有的标签字符串匹配。
- 之后，`triage` 和 `to-tickets` 能在正确的位置使用正确的标签工作，而不是询问或猜测。

## 定位

`setup-matt-pocock-skills` 是**一次性设置**——整个工程集的基础，不是需要重复的步骤。它的邻居是读取其产出的技能：[triage](https://aihero.dev/skills-triage)，因为它应用在此配置的标签词汇表；以及 [to-spec](https://aihero.dev/skills-to-spec) / [to-tickets](https://aihero.dev/skills-to-tickets)，因为它们将内容发布到在此配置的 issue 跟踪器中。先运行它；下游所有技能都依赖它。当你不确定哪种技能或流程适合时，[ask-matt](https://aihero.dev/skills-ask-matt) 会为你指路。
