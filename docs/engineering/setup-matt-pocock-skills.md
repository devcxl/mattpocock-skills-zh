## 它的作用

`setup-matt-pocock-skills` 回答关于一个仓库的三个问题——issue 住哪里、triage 标签叫什么、领域文档放在哪——并把答案记录为 `docs/agents/` 下的 markdown 文件。

这些文件是仓库之间唯一变化的东西。技能本身在任何地方都相同；它们在运行时读 `docs/agents/issue-tracker.md` 并按它说的做。这就是为什么整个技能集不绑定 GitHub，也是为什么从来不需要编辑任何技能文件把它指向别处。用"把技能链接到一个自定义 issue 追踪器"调用它，对任何你能编程连接的东西都有效，技能零改动。

它是一个提示驱动的技能，不是确定性脚本。它读你的 `git remote`、你现有的 `CLAUDE.md`、你现有的 `CONTEXT.md`，提出它发现的东西，并在写任何东西之前等你确认。

## 何时使用

你通过键入 `/setup-matt-pocock-skills` 来调用它——[代理（agent）](https://www.aihero.dev/ai-coding-dictionary/agent)不会主动使用它。它刻意被标记为不可调用，所以其他技能也不能替你触发它。

每个仓库跑一次，在任何其他工程技能首次使用之前。如果 [triage](https://aihero.dev/skills-triage)、[to-spec](https://aihero.dev/skills-to-spec)、[to-tickets](https://aihero.dev/skills-to-tickets) 或 [wayfinder](https://aihero.dev/skills-wayfinder) 开始猜你的 issue 去哪里、或应用你的追踪器没有的标签，说明它们还没在这里被设置。一个项目进行到一半的仓库也完全可以跑它；技能会读已经存在的东西，之前的工作不会浪费。

## 前置条件

它写入你运行它的仓库：

| 它写 | 哪里 |
| --- | --- |
| `issue-tracker.md` | `docs/agents/` |
| `domain.md` | `docs/agents/` |
| `triage-labels.md` | `docs/agents/`，仅当 `triage` 技能已安装时 |
| 一个 `## Agent skills` 块 | `CLAUDE.md` / `AGENTS.md` 中已存在的那一个 |

全部是已提交的 markdown。没有用户级或全局模式：配置活在仓库里，所以每个仓库有自己的副本。

## 三个决策

它用推荐答案引导每一节，跳过任何已经敲定的探索。大多数运行是两次确认就完事。

| 决策 | 它提议什么 | 它实际何时问 |
| --- | --- | --- |
| **Issue 追踪器** | 与你的 `git remote` 匹配的那个 | 总是——这是唯一真正的选择 |
| **Triage 标签** | 保留五个规范名字（`needs-triage`、`needs-info`、`ready-for-agent`、`ready-for-human`、`wontfix`） | 仅当 `triage` 技能已安装时 |
| **领域文档** | 单上下文：根目录一个 `CONTEXT.md` 加 `docs/adr/` | 仅当它发现 monorepo 信号时，然后它会提供多上下文 `CONTEXT-MAP.md` |

追踪器选项：

| 选项 | issue 住哪里 | 需要 |
| --- | --- | --- |
| **GitHub** | 仓库的 GitHub Issues | `gh` CLI |
| **GitLab** | 仓库的 GitLab Issues | `glab` CLI |
| **本地 markdown** | 本仓库 `.scratch/<feature>/` 下的文件 | 什么都不需要——完全可以没有 remote |
| **其他** | 你说哪里就哪里 | 你描述工作流的一段话 |

前三个作为模板随附在技能里，开箱即用。本地 markdown 是一等选项，不是兜底：一个没有 remote 的个人项目得到完全支持。有一条告诫值得重复：如果你在用 GitHub，就别用本地 markdown。它们是替代方案，不是分层。

"其他"也不是空壳。它是 Jira、Linear、Azure DevOps 和 Beads 都能工作的原因：你描述工作流，技能把你的散文记录在 `docs/agents/issue-tracker.md` 里，下游技能遵循这份散文。社区已经做过了——一个基于 [MCP](https://www.aihero.dev/ai-coding-dictionary/mcp) 的 Jira 变体、一个形状像 `gh` 的 Gitea CLI、一个手搭的本地仪表盘。

## 常见问题

**我必须用 GitHub 吗？**

不用。GitHub、GitLab 和 `.scratch/` 下的本地 markdown 都作为现成模板随附，其他任何东西都通过"其他"路径工作。这是记录里被重复最多的问题，大意如此：*"hard locked to github"*、*"can I use GitLab / Jira"*、*"what about Azure DevOps"*。每次的答案都是：追踪器是一个设置答案，不是技能属性。

**更新技能之后需要重跑它吗？**

v1.1 之后被直接问到，Matt 说需要。技能自己的收尾消息更软——它告诉你只有在切换追踪器或重新开始时才需要重跑。两者都有道理，造成差距的原因是真的：种子模板在版本之间变化，所以旧版本写出的 `docs/agents/issue-tracker.md` 可能相对于现在读它的技能变陈旧。如果某个下游技能开始做文档描述得不一样的事，重跑是廉价的修复。

**它写进了 `CLAUDE.md`，但我在用 Codex。**

已知缺口，仍然开着。文件选择规则是"如果 `CLAUDE.md` 存在就编辑它，否则 `AGENTS.md`"——它检查哪个文件存在，不检查哪个 [harness](https://www.aihero.dev/ai-coding-dictionary/harness) 在运行。一个从 Claude Code 时期留下 `CLAUDE.md` 的仓库，会把它的 `## Agent skills` 块放在 Codex 从不读的地方。两种变通办法在流传：手工把块移到 `AGENTS.md`，或者让 `AGENTS.md` 保持规范、把 `CLAUDE.md` 做成指向它的一行指针。如果两个文件都不存在，技能会问你要创建哪个，而不是自己挑——这让预期它直接决定的人困惑。

**它没有创建我的 triage 标签。**

它不创建。`docs/agents/triage-labels.md` 是一份*映射*——它告诉 `/triage` 你的追踪器里哪些字符串对应五个规范角色。它不运行 `gh label create`。在一个全新的 GitHub 仓库上，标签确实还不存在，这已经被作为 bug 提交不止一次。两个后续：

- 如果你的追踪器已经用规范名字，映射就是一张恒等表，没什么可配置的。这是预期的常见情况，不是缺失的步骤。
- [wayfinder](https://aihero.dev/skills-wayfinder) 的 `wayfinder:map` 和 `wayfinder:<type>` 标签也不在这里创建，而且 `gh issue create --label <missing>` 会直接失败，而不是创建标签。在 GitHub 仓库上第一次跑 wayfinder 之前，手工创建它们。

**我能在这里配置其他技能的行为吗——[盘问（grilling）](https://www.aihero.dev/ai-coding-dictionary/grilling)节奏、问题格式、语气？**

不能。它配置三样东西：追踪器、标签、文档布局。有人直接要求把它变成按用户偏好之家，而一贯的答案是技能保持有主见：*"Config is death."*（配置即死亡。）偏好属于你的 `CLAUDE.md`，作为普通指示，每个技能本来就会读。

**我能把配置放在 `~/.claude` 而不是提交到每个仓库吗？**

今天不行。有一个来自跨许多仓库运行这套技能的人的、恰好为此的未决请求，而用户级模式不存在。每个仓库都带着自己的 `docs/agents/`。

**有一个配置其他技能的技能，不奇怪吗？**

一个长期存在的抱怨说是，原话是：*"having a skill to set up the other skill does not feel right to me — that means the LLM is configuring its own skills."*（有一个技能去设置其他技能，我觉得不对劲——这意味着 LLM 在配置自己的技能。）这个权衡是真的，也被承认了：设置步骤的替代方案，是把追踪器指示复制进每一个碰 issue 的技能。输出是可检查、可编辑的 markdown，这是缓解——你可以读它写的每个文件并手工改，日常微调正是那样，而不是再跑一次。

## 怎样算成功

- `docs/agents/issue-tracker.md` 和 `docs/agents/domain.md` 存在，如果 `triage` 已安装还有 `triage-labels.md`。
- 你的 harness 实际读取的指示文件里出现一个 `## Agent skills` 小节，每个文件有一行摘要指向它。
- 它提议的追踪器与你真正用的 remote 匹配，标签字符串与你追踪器里真实存在的标签匹配。
- 之后，`/to-tickets` 发布时不再问你 issue 住哪里，`/triage` 应用标签而不是发明标签。
- 技能文件本身没有任何变化。如果设置编辑了某个 `SKILL.md`，就是哪里出了问题。

## 它的定位

`setup-matt-pocock-skills` 是工程流程的**一次性设置**，是其他一切假定的前置条件，而不是链条中的一步。它的邻居是它的读者：[triage](https://aihero.dev/skills-triage)——应用这里写下的标签词汇；[to-spec](https://aihero.dev/skills-to-spec) 和 [to-tickets](https://aihero.dev/skills-to-tickets)——发布进这里点名的追踪器；以及 [wayfinder](https://aihero.dev/skills-wayfinder)——读同一个追踪器文件的"Wayfinding operations"小节，以了解地图和子 [tickets](https://www.aihero.dev/ai-coding-dictionary/ticket) 如何存储。它记录的领域文档布局，是 [domain-modeling](https://aihero.dev/skills-domain-modeling) 后来填充的那个——它在一个术语或决策真正被敲定时惰性创建 `CONTEXT.md` 和 ADR，所以设置之后一个空的仓库是预期状态。下一个该用哪个技能，[ask-matt](https://aihero.dev/skills-ask-matt) 路由整个集合。
