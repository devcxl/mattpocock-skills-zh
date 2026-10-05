## 它的作用

`setup-matt-pocock-skills` 回答关于一个仓库的三个问题：issue 住在哪里、triage 标签叫什么、领域文档放在哪里。它把答案记录为 `docs/agents/` 下的 markdown 文件。

那些文件是各仓库之间唯一不同的地方。技能本身在任何地方都相同，它们运行时读取 `docs/agents/issue-tracker.md` 并照其说明行事。这正是这套技能不绑死 GitHub 的原因，也正是你不必修改技能文件来改用其他追踪器的原因。带着"把技能链到一个自定义 issue 追踪器"调用它，能与任何可通过程序连接的追踪器配合，技能侧无需修改。

它是一个提示驱动的技能，不是确定性脚本。它读取你的 `git remote`、`CLAUDE.md` 和 `GLOSSARY.md`，提出它发现了什么，并在写入任何内容之前等你确认。

## 何时使用

你通过键入 `/setup-matt-pocock-skills` 来调用它；[agent](https://www.aihero.dev/ai-coding-dictionary/agent) 不会主动使用它。它的 metadata 刻意将其标记为不可调用，所以也没有其他技能能替你触发它。

每个仓库调一次，在第一次使用任何其他工程技能之前。如果 [triage](https://aihero.dev/skills-triage)、[to-spec](https://aihero.dev/skills-to-spec)、[to-tickets](https://aihero.dev/skills-to-tickets) 或 [wayfinder](https://aihero.dev/skills-wayfinder) 开始猜你的 issue 该去哪、或应用你追踪器里没有的标签，那说明它们还没在这里被 setup。一个已经进行到一半的仓库是跑它的合适位置；技能读已存在的内容，没有先前的活儿被浪费。

## 先决条件

它写入你跑它的那个仓库：

| 它写 | 到哪 |
| --- | --- |
| `issue-tracker.md` | `docs/agents/` |
| `domain.md` | `docs/agents/` |
| `triage-labels.md` | `docs/agents/`，仅当 `triage` 技能已安装 |
| 一个 `## Agent skills` 块 | 已存在的 `CLAUDE.md` / `AGENTS.md` 其一 |

这些内容都以 markdown 提交。没有用户级或全局模式：配置活在仓库里，所以每个仓库各有一份。

## 三个决策

它从每一节的推荐答案开始，并跳过探索时已经回答的问题。大多数运行只需两次确认。

| 决策 | 它提议什么 | 何时真的问 |
| --- | --- | --- |
| **Issue 追踪器** | 与你 `git remote` 匹配的那个 | 总是：这是那个真正的选择 |
| **Triage 标签** | 保留五个规范名（`needs-triage`、`needs-info`、`ready-for-agent`、`ready-for-human`、`wontfix`） | 仅当 `triage` 技能已安装 |
| **领域文档** | 单上下文：根目录一份 `GLOSSARY.md` 加 `docs/adr/` | 仅当它嗅到 monorepo 信号，并且那时它提议一份多上下文的 `GLOSSARY-MAP.md` |

追踪器选项：

| 选项 | Issue 住哪里 | 需要 |
| --- | --- | --- |
| **GitHub** | 这个仓库的 GitHub Issues | `gh` CLI |
| **GitLab** | 这个仓库的 GitLab Issues | `glab` CLI |
| **本地 markdown** | 这个仓库下 `.scratch/<feature>/` 里的文件 | 什么都不需要，连 remote 都不需要 |
| **其他** | 你说的任意地方 | 你的一段话描述工作流 |

前三个随技能作为模板发布，开箱即用。本地 markdown 是完整选项，不是兜底；没有 remote 的单人项目也受支持。一条注意事项：如果你使用 GitHub，就别用本地 markdown。它们互为替代，选其一即可。

"其他"也是完整选项。这正是 Jira、Linear、Azure DevOps 和 Beads 都能工作的方式：你描述工作流，技能把你的说明记录到 `docs/agents/issue-tracker.md`，下游技能照着做。用户已经实现过这些方案：一个走 [MCP](https://www.aihero.dev/ai-coding-dictionary/mcp) 的 Jira 变体、一个照着 `gh` 形状造的 Gitea CLI、一个手搓的本地 dashboard。

## 常见问题

**我必须用 GitHub 吗？**

不必。GitHub、GitLab 以及 `.scratch/` 下的本地 markdown 都作为现成模板发布，任何其他东西走"其他"路径。这是记录里被重复问得最多的问题，大致用这些话："hard locked to github"、"can I use GitLab / Jira"、"what about Azure DevOps"。每次的答案都是追踪器是一个 setup 答案，不是技能的属性。

**更新技能之后我需要重跑它吗？**

v1.1 之后直接问，Matt 说要。技能自己的收尾消息更软：它告诉你重跑只在要切换追踪器或重头来时才需要。两个都说得过去，差距背后的理由也真实：种子模板在不同版本之间会变，所以一份由较老版本写出的 `docs/agents/issue-tracker.md` 相对于现在读它的技能会过时。如果一个下游技能开始做某件与文档描述不同的事，重跑就是便宜的修法。

**它写到了 `CLAUDE.md`，但我在用 Codex。**

已知缺口，仍开放。文件选择规则是"如果 `CLAUDE.md` 存在则编辑它，否则编辑 `AGENTS.md`"：它检查的是哪个文件存在，不是哪个 [harness](https://www.aihero.dev/ai-coding-dictionary/harness) 在跑。一个仓库带着从 Claude Code 留下来的 `CLAUDE.md`，它的 `## Agent skills` 块会落到一个 Codex 从不读取的地方。社区里流传着两条变通办法：手把那块挪到 `AGENTS.md`，或者让 `AGENTS.md` 成为权威、让 `CLAUDE.md` 做一条指向它的一行指针。如果两个文件都不存在，技能会问你要创建哪一个，而不是自作主张——这让那些期待它替自己决定的人困惑过。

**它没创建我的 triage 标签。**

它不创建。`docs/agents/triage-labels.md` 是一份*映射*：它告诉 `/triage` 你的追踪器里哪些字符串对应那五个规范角色。它不跑 `gh label create`。在一个全新的 GitHub 仓库上，标签确实还不存在，这被作为 bug 提过不止一次。两个延伸：

- 如果你的追踪器已经在用规范名，那份映射就是一张恒等表，没什么可配置的。那是预期的常见情况，不是缺漏一步。
- [wayfinder](https://aihero.dev/skills-wayfinder) 的 `wayfinder:map` 和 `wayfinder:<type>` 标签这里也不创建，而 `gh issue create --label <missing>` 会直接失败、而不是创建标签。在一次 GitHub 仓库上的首次 wayfinder 跑动之前，手动创建它们。

**我能不能在这里配置其他技能的行为（[盘问（grilling）](https://www.aihero.dev/ai-coding-dictionary/grilling) 节拍、问题格式、语气）？**

不能。它只配置三件事：追踪器、标签、文档布局。用户曾直接要求把它作为每用户偏好的配置入口；答案是技能保持有主张，不支持每用户配置。偏好应写在你 `CLAUDE.md` 的普通指令里，每份技能都会读取。

**我能把配置留在 `~/.claude` 而不是提交到每个仓库吗？**

今天还不能。有来自在多个仓库上跑这套技能的人的恰好这样的开放请求，没有用户级模式存在。每个仓库自带一份自己的 `docs/agents/`。

**有一份用来配置其他技能的技能，这不奇怪吗？**

一个长期抱怨说是的，原话如此："having a skill to set up the other skill does not feel right to me: that means the LLM is configuring its own skills." 这个权衡是真的，并被承认：相对于 setup 一步的替代方案是把追踪器指令复制到每一份接触 issue 的技能。输出是可检视、可编辑的 markdown，这是缓解办法：你可以读它写出的每一份文件并手改它，日常微调就是那个样子，而不是再跑一次。

## 怎样算成功

- `docs/agents/issue-tracker.md` 和 `docs/agents/domain.md` 存在，如果 `triage` 已安装再加上 `triage-labels.md`。
- 一个 `## Agent skills` 小节出现在你 harness 真正读的指令文件里，每份那份文件带一条指向这些文件之一的一行摘要。
- 它提议的追踪器匹配你真正用的 remote，标签字符串匹配你追踪器里真正存在的标签。
- 之后 `/to-tickets` 发布时不再问你 issue 住哪里，`/triage` 应用的是标签而不是凭空发明。
- 技能文件本身没有任何改动。如果 setup 编辑了一份 `SKILL.md`，那就是哪里出错了。

## 它的定位

`setup-matt-pocock-skills` 是工程流程的**一次性 setup**，是其他一切假设的先决条件，而不是链上的一步。它的邻居是它的读者们：[triage](https://aihero.dev/skills-triage) 应用这里写下的标签词汇；[to-spec](https://aihero.dev/skills-to-spec) 和 [to-tickets](https://aihero.dev/skills-to-tickets) 发布到此处命名的追踪器；[wayfinder](https://aihero.dev/skills-wayfinder) 则读取同一份追踪器文件的"Wayfinding operations"小节，了解地图和子 [tickets](https://www.aihero.dev/ai-coding-dictionary/ticket) 的存放方式。[domain-modeling](https://aihero.dev/skills-domain-modeling) 之后会填充这里记录的领域文档布局。它只在术语或决策敲定时创建 `GLOSSARY.md` 和 ADR，所以 setup 后仓库里没有领域文档是正常的。下一步该用哪个技能时，[ask-matt](https://aihero.dev/skills-ask-matt) 路由整套集合。