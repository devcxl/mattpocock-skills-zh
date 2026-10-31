# Runners

> 调研时间为 2026-10，且不保证仍然最新。可用它来了解情况，然后自行研究当前选项：产品、价格、限制和 Beta 状态变化很快。

Runner 是**一次性的**：每次运行都会在一台全新的机器上启动，并且结束后不留下任何东西。共有五种类型可供选择。它们的主要区别在于由谁负责 agent loop、由谁提供机器：

| 类型 | Agent loop | 机器 | 还可承担的角色 |
| --- | --- | --- | --- |
| CI runner | 由你负责，在 CI 作业中运行 | CI 厂商提供，或由你提供 | 编排器、可观测性平台 |
| MicroVM API | 由你负责，在编排器中或 runner 上运行 | 由提供商提供 | 无 |
| Bundled agent platform | 由厂商负责 | 由厂商提供 | 部分编排器、可观测性平台 |
| Bring-your-own worker | 由厂商负责 | 由你提供 | 部分编排器、可观测性平台 |
| Own VPS or containers | 由你负责 | 由你提供 | 无 |

可以按每次运行选择 runner：审查运行使用便宜的 CI runner，实现运行使用 microVM，是很常见的设计。

## CI runners

每个 CI 作业都会启动一台全新的 VM 或 pod，由 git 托管平台自带的 workflow engine 启动；agent CLI 是作业中的一个步骤。编排器通过 workflow trigger（issue、PR、定时任务、手动触发）启动一次运行，concurrency group 则确保同一工单不会同时运行两次。托管 runner 天生就是一次性的；自托管 runner 则通过 ephemeral mode 实现，每个作业使用一个 pod，完成后删除。费用按分钟计算。

**适用场景：** git 托管平台是 GitHub 或 GitLab，且所有触发条件都是 git 托管平台事件或定时触发：workflow 文件就是编排器，运行页面就是可观测性平台，因此一个产品就能承担三个角色。

入门选项：
- [GitHub Actions](https://docs.github.com/en/actions/reference/limits)：全 GitHub 工厂的默认选择；[定价](https://docs.github.com/en/billing/reference/actions-runner-pricing)。
- [Claude Code GitHub Action](https://code.claude.com/docs/en/github-actions)：将 Claude Code 作为 workflow 步骤运行。
- [GitLab hosted runners](https://docs.gitlab.com/ci/runners/hosted_runners/linux/)：每个作业使用一台一次性 VM。
- [Actions Runner Controller](https://docs.github.com/en/actions/concepts/runners/actions-runner-controller)：自托管方案，在用户自己的 Kubernetes 上为每个作业运行一个一次性 pod。

## MicroVM APIs

调用 SDK 会在大约一秒内创建一个隔离的 microVM（厂商称之为“sandbox”）；编排器可以在其中执行命令，也可以在其中启动 agent CLI。费用按 vCPU 和 RAM 的使用秒数计算。编排器为每次运行创建一个实例，在结束时将其销毁，并设置超时作为兜底。提供商也会提供持久化功能（暂停/恢复、快照、磁盘）；工厂可将其用作缓存，而运行间的记忆则保存在工单跟踪系统、git 托管平台和编排器中。

**适用场景：** 工厂有自己的编排器（服务器、队列），并希望运行大量短时、并行的任务，同时无需管理机器。比较时应关注最长运行时长、并发上限，以及等待模型响应的时间是否计费：截至 2026-10，Vercel 只对活跃 CPU 计费，因此在那里等待模型的时间几乎不花钱。

入门选项：[E2B](https://e2b.dev/pricing)、[Daytona](https://www.daytona.io/pricing)、[Modal Sandboxes](https://modal.com/docs/guide/sandboxes)、[Vercel Sandbox](https://vercel.com/docs/vercel-sandbox/pricing)。

## Bundled agent platforms

平台内置 runner 的托管编程 agent：厂商会为每次运行配置一台全新的 VM 或容器，在其中运行自己的 agent loop，并推送一个分支或 PR。只有分支会保留下来。运行可由 git 托管平台或工单跟踪系统中的 @ 提及或分派、聊天消息、定时任务或 HTTP 调用启动，因此该平台承担了编排器的大部分功能；其运行记录视图则承担可观测性平台的功能。费用包含在席位或订阅中，或按次运行收取。

**适用场景：** 用户希望尽量减少组件，并且愿意使用该厂商的 agent。请确认其触发条件涵盖用户所用的工单跟踪系统。

入门选项：
- [Claude Code cloud](https://code.claude.com/docs/en/claude-code-on-the-web)，可通过 [scheduled tasks](https://code.claude.com/docs/en/routines) 支持 cron、API 和 GitHub 事件触发。
- [Claude Managed Agents](https://platform.claude.com/docs/en/managed-agents/overview)：以 API 为先；针对某个环境创建运行并接收事件流。
- [Codex cloud](https://developers.openai.com/codex/cloud)：每个任务使用一个容器。
- [Copilot coding agent](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent)：将 issue 分派给 Copilot；其 runner 是 GitHub Actions runner。

## Bring-your-own worker

内置平台继续负责 agent loop 和运行队列，但工具调用会在用户托管的 worker 上执行。worker 向厂商发起轮询、领取运行任务、执行任务，然后退出：这与自托管 CI runner 的模式相同。一次性运行环境由用户负责：在 Kubernetes 或 microVM API 下运行 worker，以便每次运行都获得一块全新的磁盘。费用包括厂商的席位或使用费，以及用户的机器费用。

**适用场景：** 用户希望使用内置 agent，但运行必须能够访问私有网络、将数据保留在用户自己的机器上，或使用定制硬件。

入门选项：[Claude Code self-hosted environments](https://code.claude.com/docs/en/self-hosted-environments)、[Cursor self-hosted pool](https://cursor.com/docs/cloud-agent/self-hosted-pool)、[Copilot coding agent on ARC](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/customize-the-agent-environment)。

## Own VPS or containers

用户租用或运行的一台机器，每次运行使用一个全新的容器（或机器）：机器可能运行数月，容器则只用于一次运行。最长运行时长由编排器设置的截止时间决定。可通过 `docker run --rm`、带有 `ttlSecondsAfterFinished: 0` 的 Kubernetes Job，或在运行结束时销毁机器来实现一次性环境；每个缓存都必须放在下次运行可以不依赖的路径上。费用按月固定，或按运行秒数计算。

**适用场景：** 运行时间长、持续稳定或负载很重，按小时计费的成本占主导，或者服务器已经托管了编排器。

入门选项：[Fly Machines](https://docs.fly.io/machines/overview)（[定价](https://docs.fly.io/about/pricing)）、[Hetzner Cloud](https://www.hetzner.com/cloud/) 加 Docker、[Kubernetes Jobs](https://kubernetes.io/docs/concepts/workloads/controllers/job/)。

## 进一步研究

### 决定选用哪种方案的问题

针对每个候选方案，结合工厂实际运行情况检查以下问题：

1. **编排器如何启动一次运行？** 通过 workflow trigger、SDK 调用、@ 提及、HTTP 调用，还是由 worker 领取厂商队列中的任务？这是否适合设计中已选定的编排器？
2. **最长运行时长和并发上限分别是多少？** 查明每种套餐的默认超时和上限，以及达到上限时会发生什么。将它们与设计中最长的运行时间和最繁忙时的突发负载对照。
3. **费用如何计算？** 按分钟、按 vCPU 和 RAM 的使用秒数、仅按活跃 CPU、按次运行、按席位，还是按月固定收费？等待模型响应的时间是否计费？模型 token 是否包含在价格内，还是另行收费？
4. **如何实现一次性环境？** 默认全新、通过 ephemeral 标记启用，还是由编排器自行清理？有哪些持久化功能，设计能否将它们仅用于缓存？
5. **一次运行可以访问什么？** 私有网络访问、出站防火墙或允许列表、密钥如何传给 runner，以及还有谁能读取这些密钥。
6. **它还能承担哪些角色？** 将它支持的触发条件计入编排器覆盖范围，并将其运行页面或记录计入可观测性平台覆盖范围。

### 在哪里查找答案

- 优先查看厂商的**限制或配额页面**和**定价页面**，而不是产品介绍页。
- 查看**SDK 或 API 参考文档**中的创建调用：包括超时、生命周期和网络参数。
- 查看**安全或网络文档**中的防火墙、允许列表和密钥处理说明。
- 查看**变更日志或发行说明**，确认 Beta、Preview 和 GA 状态，以及套餐限制（Team、Enterprise）。
- 对于 CI runners，请查看 git 托管平台的**计费文档**。

### 哪些信息最容易过时

- **价格和免费额度。** 截至 2026-10，GitHub 曾宣布对自托管 runner 按分钟收费，之后又推迟了该计划。
- **Beta、Preview 和 early-access 状态**，以及哪些套餐可以使用某项功能。截至 2026-10，Claude Managed Agents 和 Claude Code self-hosted environments 都处于 beta 阶段。
- **各套餐的默认超时和最长运行时长。**
- **内置平台的触发集成：** 哪些工单跟踪系统和聊天工具可以启动运行。
- **启动时间**属于厂商宣称的数据；如果这项指标很重要，请自行测量。

以上类型特征（谁负责 agent loop、谁提供机器、它能承担哪些角色）变化缓慢；相比任何具体数值，应优先相信这些特征。