# 工单跟踪器

> 调研于 2026-10 完成，但不保证信息仍是最新。先用它了解情况，然后自行研究当前选项：产品、价格、限制和 beta 变化很快。

工单跟踪器是工厂面向人的接口。下面每种类型都只是一个起点：先了解它是什么，以及工厂何时会选择它；然后根据[进一步研究](#researching-further)中的问题核对示例。

## 类型

### 1. Git 托管平台内置工单跟踪器

内置于 git host 的跟踪器，因此工单、分支和 PR 共享同一个产品、权限模型和身份体系。工厂会在规模较小、团队已在 git host 上工作，或仓库公开时选择它。这就是“All on GitHub”设计：git host 的 CI 无需任何胶水代码即可承担 orchestrator 的角色。标签是可靠的路由方式，因为状态位于独立看板上。外部开发者可以在代码所在之处提交工单；非开发者则需要账号，因此反馈按钮会通过 API 提交工单。自托管 git host 通常也自带工单跟踪器。

- [GitHub Issues](https://docs.github.com/en/copilot/concepts/agents/about-third-party-agents)：默认选项；可通过 assign-to-agent 分配给 Copilot、Claude 和 Codex。
- [GitLab Issues](https://about.gitlab.com/blog/how-to-use-a-work-item-created-trigger/)：由 work item 触发的 Duo Agent Platform 流程。
- [Forgejo](https://forgejo.org/2026-10-release-v17-0/)：可自托管，兼容 Actions。

需核实：哪些 assign-to-agent 功能仍处于 preview 阶段，哪些套餐包含这些功能；原生 agent 会读取后续评论，还是只读取分配时的工单（截至 2026-10，Copilot 只在分配时读取工单）。

### 2. Agent 原生开发工单跟踪器

面向软件团队的独立 SaaS 工单跟踪器，将 agent 视为一等指派对象，并提供 agent API 和自有编码 agent。工厂会在产品、支持或设计人员安排工作、团队已在该平台上工作，或需要成熟的分流和规划视图时选择它。这就是“Linear tickets”设计。状态和工作流是一等功能，因此“移至 Ready”可以作为清晰的触发条件。Agent 会像应用用户一样出现，人可以把工作委派给它们，运行过程也可以将进度实时写入工单。此类跟踪器的原生 agent 功能最深入，因此也能部分承担 orchestrator 和 runner 的角色。

- [Linear](https://linear.app/developers/agents)：最贴合 agent 工作方式的工单跟踪器。
- [Jira](https://support.atlassian.com/jira-software-cloud/docs/collaborate-on-work-items-with-ai-agents/)：由状态触发的 agent；适合已使用 Atlassian 的组织。
- [Shortcut](https://www.shortcut.com/help/integrations/using-ai-agents)：指派一个 story，或在评论中提及 agent。
- [YouTrack](https://www.jetbrains.com/youtrack/)：workflows-as-code；支持自托管。

需核实：agent API 的状态（截至 2026-10，Linear 的 API 仍处于 developer preview）；原生 agent 运行如何计量和定价；agent 席位费用；agent webhook 的确认时限；哪些套餐开放面向客户的表单；自托管版本的生命周期终止日期。

### 3. 开源开发工单跟踪器

类似 Linear、可在自有基础设施上运行的工单跟踪器，同时也提供云端版本。工厂会在数据必须留在内部（隔离网络、受监管环境），或用户希望在购买的同时阅读和修改跟踪器源代码时选择它。按状态、标签和自定义属性进行路由的方式与类型 2 大致相同；原生 agent 功能则较新。

- [Plane](https://developers.plane.so/dev-tools/agents/overview)：类似 Linear；每个应用可创建 bot 用户；agent 会在评论中回复。
- [Huly](https://github.com/hcengineering/huly-selfhost)：集成式工作区，支持双向 GitHub 同步；运行维护所需的技术栈较重。
- [OpenProject](https://www.openproject.org/)：成熟的传统项目管理工具。

需核实：agent 功能状态（截至 2026-10，Plane 的相关功能处于 beta 阶段）；哪些版本包含访客角色和受理表单；许可证；自托管技术栈的运维成本。

### 4. 通用工作工具

工作管理或文档工具，其数据库或任务列表可兼作工单跟踪器。工厂会在非工程团队已使用该工具，或工单主要涉及内容、运营或研究而非代码时选择它。表单是其优势：任何拿到链接的人都能提交工单。路由依赖灵活的数据库属性，因此每个工厂都要自行设计 schema。开发者所需的上下文（diff、PR）只需点击一下，就能在 git host 上查看。仅提供 SaaS。

- [Notion](https://www.notion.com/help/custom-agents)：数据库兼作工单跟踪器；数据库变更可触发 agent。
- [Asana](https://asana.com/product/ai/ai-teammates)：AI Teammates 可接手已指派的任务。
- [ClickUp](https://clickup.com/brain/cloud-agents)：Cloud Agents 会在任务讨论串中返回 PR。
- [Trello](https://developer.atlassian.com/cloud/trello/guides/rest-api/webhooks/)：采用看板和列表；可通过 webhook 和 Butler 自动化。

需核实：webhook 的延迟和粒度（截至 2026-10，Notion 会批量发送内容更新，因此可能晚一两分钟）；哪些套餐包含 agent。

### 5. 仓库原生工单跟踪器

工单以文件形式（JSONL、Markdown）存储在仓库中，由 agent 通过 CLI 或 MCP server 编辑，并像代码一样合并。工厂会在一名开发者本地驱动 agent、希望计划保存在 git 中，或希望将其作为一次运行的工作记忆放在真实工单跟踪器旁边时选择它。推送到 git host 是唯一的触发方式，因此 orchestrator 会对比文件来找出变更。身份体系沿用 git host。外部提交工单只能通过 commit 或 PR，这是所有类型中最弱的；因此一旦其他人开始提交工单，工厂就会转向 git-host 工单跟踪器。

- [Beads](https://github.com/steveyegge/beads)：JSONL 格式，支持依赖关系跟踪，因此一次运行可以选取下一个未受阻的工单。
- [Backlog.md](https://github.com/MrLesk/Backlog.md)：Markdown 任务，带有 Kanban 视图和 MCP server。

### 6. 自行构建

工厂自有应用在自己的数据库中保存工单，通常与 orchestrator 并列。“Own tracker”设计。工厂会在工单跟踪器本身就是产品（内部平台、面向客户的支持工厂），或没有现成方案适用时选择它。触发器会变成函数调用；下面问题中提到的每项特性都需要编写和维护代码，这也是该 skill 倾向于购买现成产品的原因。带有 webhook 的 [Airtable](https://airtable.com/developers/web/api/webhooks-overview) base 是一种半成品的折中方案。

## 进一步研究

根据以下问题逐一评估候选方案。它们决定这个工具能否胜任相应角色：

- **Triggers**：哪些工单变更（created、labelled、status moved、assigned、commented、mentioned）会发出 webhook 或事件，让 orchestrator 转换为一次运行？速度和粒度如何？
- **Routing**：运行可以读取哪些标签、状态或字段，以判断工单类型（explore、implement、rework）？
- **Thread**：人能否在评论中回复 agent？该回复会触发下一次运行吗？
- **Identity**：是否提供 API 和 bot 身份，让运行以自身身份操作，并让人能区分 agent 和同事？bot 是否需要付席位费？
- **Native agents**：能否直接将工单指派给 agent？支持哪些 agent、需要哪个套餐、如何计量？它会读取什么：分配时的工单，还是整个讨论串？
- **Outside filing**：工单来源方或客户如何创建工单：表单、电子邮件、聊天还是 API？需要哪个套餐才能使用？
- **Hosting**：仅提供 SaaS，还是也能自托管？采用什么许可证？

答案应查阅一手资料：API 和 webhook 参考文档（事件列表、payload、投递和重试规则）、agent 或应用开发者文档、定价页面和套餐对比表，以及变更日志或发布说明。优先使用这些资料，而不是博客文章和对比网站。

最容易过时的内容依次是：agent 功能及其 preview 或 beta 状态、agent 计量方式和 credit 价格、agent 和表单的套餐限制、rate limit，以及自托管版本的收购、停运和生命周期终止日期。Webhook 事件列表和路由模型变化较慢。

## 持久性注意事项

依赖以下信息前，先确认它们仍然成立：

- **GitHub 的 `GITHUB_TOKEN` 陷阱**：使用默认 `GITHUB_TOKEN` 所做的更改不会触发新的 workflow 运行。若一次运行通过给工单添加标签或评论来触发下一次运行，就必须使用 GitHub App token。
- **分配时的上下文**：有些原生 agent 只会在分配时读取工单，因此后续补充的上下文应写在 PR 中。
- **Agent webhook 需要快速确认**：orchestrator 应立即确认，然后再启动运行。
- **通用工作工具中的批量 webhook**会延迟到达；若工厂需要及时启动运行，应针对属性变更触发，或选择其他类型。
