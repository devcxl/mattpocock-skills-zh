# Git 托管平台

> 调研于 2026-10，且不保证内容始终最新。可先用它了解概况，然后自行研究当前选项：产品、价格、限制和 beta 变化很快。

## 类型

### 一体化平台

将 Git 托管平台与工单跟踪器、充当编排器的 CI 系统以及托管 runner 捆绑在一起，所有组件共用一个事件流和一套权限模型。一个产品同时承担 Git 托管平台、工单跟踪器、编排器和 runner 的角色，其 CI 运行页面通常也能充当可观测性平台。每个 PR、review、标签和检查事件既是 webhook，也是原生触发器，因此这类平台的触发器目录最丰富。

**适合在以下情况选择**：工厂刚起步、代码已经托管在那里，或用户希望只用一张账单和一个登录账号。这就是 [SKILL.md](SKILL.md) 中的 "All on GitHub" 设计。供应商也会推出自己的 agents，它们要么与用户的运行竞争，要么作为其中一个 agent 接入。

- [GitHub](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api)：默认选择；提供 Issues、Actions、Apps 和规模最大的集成生态。
- [GitLab](https://about.gitlab.com/pricing/)：在一个产品中提供 issues、merge requests、CI/CD 和 runners，可选 SaaS 或自托管。

### 套件型 Git 托管平台

作为更大套件中的一个模块销售的 Git 托管平台；工单跟踪器是配套产品（Jira、Azure Boards），通过链接和 webhooks 连接。跟踪器事件通过第二条事件流到达，因此编排器需要汇合两个事件源。

**适合在以下情况选择**：组织已经在使用该套件，而且员工日常使用 Jira 或 Azure Boards。工厂会沿用该跟踪器作为面向人的界面。

- [Bitbucket Cloud](https://support.atlassian.com/bitbucket-cloud/docs/api-request-limits/)：Atlassian 的 Git 托管平台，与 Jira 和 Bitbucket Pipelines 配套。
- [Azure DevOps (Azure Repos)](https://learn.microsoft.com/en-us/azure/devops/integrate/concepts/rate-limits)：在同一个组织中提供 Repos、Boards、Pipelines 和 Entra 身份，因此可覆盖全部四个槽位。
- [AWS CodeCommit](https://aws.amazon.com/blogs/devops/aws-codecommit-returns-to-general-availability/)：基础的 Git 托管平台，使用 IAM 身份；需搭配外部跟踪器和 CI。

### 自托管 Git 托管平台

由用户在自己的基础设施上运行的 Git 托管平台，通常与编排器和 runners 部署在同一网络中。速率限制由运维人员设定，因此上限取决于硬件。用户要负责其所填补的每个槽位的升级、备份和正常运行时间。

**适合在以下情况选择**：代码必须留在本地部署环境或隔离网络中，用户希望零按席位收费，或 SaaS API 预算会限制繁忙的工厂。Forgejo 和 Gitea 适合小团队，并捆绑 issues 以及兼容 GitHub Actions 的 CI；GitLab self-managed 和 GitHub Enterprise Server 适合组织，并保留各自的 Apps 和服务账号。

- [Forgejo](https://forgejo.org/2026-10-release-v17-0/)：由社区治理的轻量平台，提供 Forgejo Actions。
- [Gitea](https://about.gitea.com/)：轻量平台，提供 Gitea Actions；也提供托管版本。
- [GitLab self-managed](https://about.gitlab.com/install/) 和 [GitHub Enterprise Server](https://docs.github.com/en/enterprise-server@latest)：部署在用户自有基础设施上的完整平台。

### Review 优先型与去中心化 Git 托管平台

其 review 模式偏离分支与 PR 形态的 Git 托管平台：使用带投票标签的逐提交 patchset，或将仓库联邦化到用户自行运行的节点上。大多数工厂工具都假设使用 PR，因此需要自行构建更多胶合层。在 Gerrit 中，自动化检查运行会由 bot 账号投票 `Verified`，而人工则投票 `Code-Review`。

**适合在以下情况选择**：用户的团队已经采用这种 review 方式，或更看重联邦化而非生态系统。

- [Gerrit](https://www.gerritcodereview.com/)：采用带标签投票的 patchset review；Android 和 Chromium 使用的模式。
- [Tangled](https://blog.tangled.org/ci/)：基于 AT Protocol 的 Git 托管平台，支持堆叠 PR 和自有 CI runner。

### Agent 原生 Git 托管平台

围绕 agent 作为主要作者而构建的新型 Git 托管平台：提交吞吐量高，以服务端读取取代克隆，并能按 agent 归属操作。整个类别仍处于早期阶段（截至 2026-10），因此门禁和速率限制可能尚未公布：请向供应商确认。

**适合在以下情况选择**：工厂会针对一个大型仓库运行许多并发任务，且克隆耗时或 API 限制已成为主要瓶颈。先在单个仓库的镜像上试用，并保留 GitHub 作为后备方案。

- [Cursor Origin](https://cursor.com/origin)：由 Graphite 团队推出，支持 GitHub 同步，以及带签名的 PR、review 和 push webhooks。
- [GitLab next-gen SCM](https://about.gitlab.com/blog/gitlab-next-gen-scm/)：重建后的 GitLab 后端，提供无需克隆的 agent API。

### 运行用 Git 存储

按千计创建的无头、API 优先型 Git 仓库：提供分支、提交和 diff，但没有 PR、review 或门禁。它们只填补一半槽位，并在每次运行时签发每仓库短期 token。

**适合在以下情况选择**：运行需要低成本的临时仓库或 fork（每个工单一个 fork、agent 的工作状态），而 PR 最终仍会落到上述类型中的完整 Git 托管平台上。

- [Cloudflare Artifacts](https://www.cloudflare.com/product/artifacts/)：Workers 上兼容 Git 的存储；可为每项任务 fork 一个基线。
- [Pierre code.storage](https://code.storage/docs)：白标 Git API，提供临时分支。

## 进一步研究

根据以下问题逐一评估候选方案：

1. **触发器**：哪些事件（PR 打开、push、提交 review、添加标签、检查完成）会以 webhooks 形式到达编排器？这些投递是否经过签名？
2. **身份**：一次运行能否使用专用 bot 或 app 身份执行操作？这样可以追踪每次运行的归属，让自动化 review 运行批准由另一个身份创建的 PR，并决定运行自身的 push 是否会触发下一次运行。
3. **门禁**：在用户当前套餐和仓库可见性下，是否提供必需检查、必需批准和分支保护？bot 是否可以加入绕过列表？
4. **速率限制**：所有 runner 上的每次运行共享多少 API 额度，额度按什么单位（installation、token、user、workspace）计算？额度会如何扩展？
5. **覆盖槽位**：工单跟踪器、编排器、runner 和可观测性平台中，哪些由同一产品提供？

请从一手资料中查找答案：REST API 和 webhook 参考文档、速率限制页面、价格和套餐对比页面、访问 token 或 app 文档，以及变更日志或发布说明。

最容易过时的是：beta 和 preview 状态（整个 agent 原生和 Git 存储类别）、速率限制数值、哪些套餐开放门禁功能，以及收购、关闭和重新开放后的可用性。例如，截至 2026-10，AWS CodeCommit 已重新向新客户开放，而 Bitbucket Data Center 仅以与 Cloud 捆绑的混合许可证形式销售。

## 长期注意事项

在设计依赖以下事项之前，先确认它们仍然成立。

- **GitHub `GITHUB_TOKEN` 会中断链条。** 由内置 Actions token 触发的事件不会启动新的 workflow runs（`workflow_dispatch` 和 `repository_dispatch` 除外），因此使用该 token 推送的运行会悄无声息地中止下一次运行。从第一天起就为运行配置 GitHub App 身份。
- **门禁通常需要付费套餐。** 截至 2026-10，GitHub 私有仓库中的 rulesets 需要 Pro、Team 或 Enterprise，GitLab 的 approval rules 需要 Premium，而 Bitbucket 强制执行的 merge checks 需要 Premium。
- **速率限制按身份计算，bot 的类型会影响限额。** 截至 2026-10，GitHub App installation 每小时可获得 5,000 次请求，而 `GITHUB_TOKEN` 为 1,000 次；Bitbucket user tokens 保持基础速率，而 access tokens 的额度会随规模提升；Azure DevOps 会根据 bot 的访问级别提高其额度。
- **套件型跟踪器意味着两条事件流。** 编排器需要自行汇合 Git 托管平台和工单跟踪器的事件。
