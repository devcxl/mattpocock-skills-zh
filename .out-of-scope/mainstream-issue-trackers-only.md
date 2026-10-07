# 仅支持 GitHub、GitLab 和本地 Markdown issue 跟踪器

`setup-matt-pocock-skills` 仅对三种 issue 跟踪器提供一等支持，每种都对应 `skills/engineering/setup-matt-pocock-skills/` 中的一个种子模板：

- **GitHub**（`issue-tracker-github.md`，通过 `gh`）
- **GitLab**（`issue-tracker-gitlab.md`，通过 `glab`）
- **本地 Markdown**（`issue-tracker-local.md`，使用 `.scratch/` 下的文件）

要求为其他跟踪器添加一等后端的请求均不在范围内，包括 Jira、Linear、Azure DevOps、Trello、YouTrack 以及面向新型 agent 的跟踪器。

## 为什么不在范围内

每种 issue 跟踪器后端都会把一种 CLI 形式硬编码到技能中（命令、标志、输出解析）。每增加一种后端，就永久增加维护面：CLI 演进时必须继续保持可用，还必须针对 `/to-spec`、`/to-tickets`、`/triage` 等技能持续测试。我使用 GitHub，因此我能真正保持正确的是这个后端。GitLab 的形式足够接近，可以一并支持；本地 Markdown 则完全不需要 CLI。

受欢迎程度不会改变这一点。Jira 使用广泛，也有官方 CLI（`acli`），但仍不会获得模板：我不使用这个后端，还得持续测试其链接语义、工作流状态和 CLI 特性。无论工具是否主流，这些成本最终都由我承担。

其他所有跟踪器都通过 `/setup-matt-pocock-skills` 的 **Other** 选项接入：用一段话描述你的工作流，技能会将其作为说明写入 `docs/agents/issue-tracker.md`。该文件归你所有。如果你已经完善了可用的 Jira 或 Linear 工作流，就将它保存在自己的仓库中或发布出来，然后让 setup 引用它。

## 以往请求

- #99：“添加 dex 作为 issue 跟踪器后端”（提出请求时 dex 发布约 3 个月，约有 300 个 GitHub stars）
- #258：“通过 Rovo MCP 将 Jira 添加为一等 issue 跟踪器”
- #1137：“通过 Atlassian 官方 CLI（`acli`）将 Jira 添加为一等 issue 跟踪器”
