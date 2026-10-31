# 可观测性平台

> 调研于 2026-10，不保证内容仍然是最新的。可先用本文了解全貌，再自行研究当前选项：产品、价格、限制和 Beta 变化很快。

本文用于帮助你选择可观测性平台插槽，或有意决定不选平台。分类依据是**用户需要在一次运行中看到什么**：日志、Agent 追踪（每次模型调用和工具调用各作为一个 span），或与用户系统其余部分关联起来的追踪。自托管与 SaaS 的划分横跨后三类。如果运行过程应根据平台观察到的信息采取行动，就把平台作为工单来源：监控器创建工单，运行器读取工单。

## 运行器如何接入

每一类都通过以下五种接入方式之一接收数据。填写插槽时，请将接入方式与产品名称一并注明。

- **Harness OTel**：Agent harness 自行导出 OpenTelemetry。Claude Code 和 Claude Agent SDK 需要设置 `CLAUDE_CODE_ENABLE_TELEMETRY=1` 以及 `OTEL_*` 变量，提示词和工具输出则需选择启用；Codex CLI 需要在 `[otel]` 区块（位于 `config.toml`）中配置。([Claude Agent SDK](https://code.claude.com/docs/en/agent-sdk/observability)、[Claude Code](https://code.claude.com/docs/en/monitoring-usage)、[Codex config](https://developers.openai.com/codex/config-advanced))
- **平台推送**：模型平台替你发送追踪数据，例如 Claude Managed Agents 会将数据发送到在 Claude Console 中设置的 OTLP 目标地址。([Claude 文档](https://platform.claude.com/docs/en/manage-claude/opentelemetry/api))
- **SDK 封装器**：在运行器代码中调用一次即可，例如 LangSmith 的 `configure_claude_agent_sdk()`。
- **Hook 插件**：Claude Code hook 在每次 Stop 时读取会话记录并发送出去，例如 Langfuse 的 Claude Code 插件。
- **网关**：将运行器的模型基础 URL 指向一个日志代理。运行器无需改动代码，而且网关只能看到模型调用：harness 内部的工具调用不可见。

OpenTelemetry 是通用传输协议：Harness OTel 和平台推送都可以接入任何 OTLP 后端。GenAI 语义约定（`invoke_agent`、`chat`、`execute_tool` span）仍在逐步完善，因此 span 名称可能会变化。([OTel GenAI agent spans](https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-agent-spans))

## 类型 1：不选平台（运行器或编排器产品已能充分展示）

**是什么**：用户在运行器或编排器已有的界面中查看每次运行，例如 CI 运行页面、沙箱仪表板，或作为运行产物保存的 Agent 对话记录。无需构建接入方式；与运行器同为自托管，费用也已包含在其中。

**工厂何时选择**：每天运行次数少，由一位用户查看，关注的问题是“失败了吗？输出了什么？”。大多数工厂从这里起步；当需要跨运行搜索、按运行汇总 token 或成本，或需要比运行器保留时间更长的留存期限时，再升级到其他方案。

**入门选项**：[GitHub Actions 运行日志](https://docs.github.com/en/organizations/managing-organization-settings/configuring-the-retention-period-for-github-actions-artifacts-and-logs-in-your-organization)、[E2B 沙箱日志和指标](https://e2b.dev/docs)、[Daytona 沙箱遥测](https://www.daytona.io/docs/en/observability/otel-collection/)、[OpenAI Agents SDK 追踪](https://openai.github.io/openai-agents-python/tracing/)。沙箱产品通常也能通过 OTLP 转发相同数据，这是通往类型 2 的路径。

**核实**：每种运行器产品的留存天数；部分沙箱保留时间很短（截至 2026-10，Daytona 为 3 天）。

## 类型 2：LLM 与 Agent 追踪平台

**是什么**：围绕 Agent 追踪构建的后端：将每次运行呈现为模型调用和工具调用组成的树，并提供 token 成本、提示词和会话，通常还附带评估和数据集功能。

**工厂何时选择**：用户需要跨大量运行追问“Agent 为什么这么做？”；复盘运行或人工需要比较多次运行；需要按运行汇总 token 开销。自托管开源平台可让对话记录留在内部。

**此类平台的特点**：支持 Harness OTel、SDK 封装器或 Hook 插件，通常也支持平台推送。按数据量计费；Agent 运行会产生大量 span（每次工具调用一个 span），因此应按每次运行而不是每个请求估算预算。

**入门选项**：[Langfuse](https://langfuse.com/pricing) 和 [Arize Phoenix](https://phoenix.arize.com)（开源，可自托管）、[LangSmith](https://www.langchain.com/pricing-langsmith)、[Braintrust](https://www.braintrust.dev/pricing)。

**核实**：免费层限制、计费单位（trace、span、unit 或 GB；Braintrust 于 2026-03 改为按 GB 计费）、哪个层级开放自托管，以及当前的所有权情况。

## 类型 3：通用 APM 与日志后端

**是什么**：用户已有的可观测性技术栈（涵盖所有服务的日志、指标和分布式追踪），并在其上增加 Agent 或 LLM 视图。

**工厂何时选择**：团队已经在为某个平台付费；运行需要与应用自身的追踪关联起来（Agent SDK 会传播 `TRACEPARENT`，因此一次运行会嵌套在调用方的追踪中）；或监控器的工单来源已经从该平台读取数据。

**此类平台的特点**：Harness OTel 直接发送到供应商的 OTLP 端点。按 GB、事件或主机计价，因此工厂的用量在已有账单中只是舍入误差，但新开账单时可能带来意外开支。

**入门选项**：[Datadog Agent Observability](https://www.datadoghq.com/product/llm-observability/)、[Grafana Cloud](https://grafana.com/pricing/)、[Honeycomb](https://www.honeycomb.io/pricing)、[SigNoz](https://signoz.io/pricing/)（开源）。

**核实**：Agent 视图是 GA 还是预览版、哪些 harness 提供设置指南，以及免费层的用量额度。

## 类型 4：带请求日志的 LLM 网关

**是什么**：位于运行器与模型供应商之间的代理，会记录每个请求和响应，并同时提供路由、密钥、预算和缓存功能。

**工厂何时选择**：用户需要按运行设置开销上限，或希望多个运行器共用一个密钥库，同时获得日志记录；或者 harness 本身不支持导出。它只能看到模型调用，因此需搭配类型 2 或类型 3 来记录工具调用。

**入门选项**：[LiteLLM Proxy](https://docs.litellm.ai/docs/proxy/logging)（开源，可将日志转发到 Langfuse 或 OTel）、[Portkey](https://portkey.ai/pricing)。

**核实**：SaaS 是否按请求收费，以及产品是否仍在积极开发（截至 2026-10，Helicone 被收购后进入维护模式）。

## 进一步研究

针对每个候选方案，逐项核对决定此插槽选择的问题：

1. **运行器或编排器是否已经能充分展示信息？** 将用户所需内容（跨运行搜索、按运行统计成本、留存期限）与运行页面或沙箱仪表板提供的内容进行比较。若答案为是，就有意不选平台。
2. **Agent harness 如何导出追踪？** 查明 harness 支持五种接入方式中的哪一种，再确认产品接受哪一种。确认工具调用是否以 span 形式到达，以及提示词和工具输出是否需要选择启用。
3. **能否自托管？** 查看许可证、允许自托管的层级，以及运行所需环境。当对话记录必须留在内部时，这一点至关重要。
4. **成本结构如何？** 查明计费单位和免费层；再按每次工具调用一个 span、每天的运行次数，估算每次运行的成本。
5. **留存时间有多长？** 查看每个层级保留数据的天数，并对照运行出问题时用户需要回溯的时间范围。

**在哪里找到答案**：供应商定价页面（计费单位、层级、留存期限）；供应商针对具体 harness 的集成文档；harness 自身的监控文档（导出内容、哪些标志仍为 Beta）；OpenTelemetry GenAI 语义约定；产品仓库（许可证和发布活跃度）；供应商的更新日志或博客（所有权变更）。

**最容易过时的内容**：免费层限制和价格；Beta 与预览标志（Claude Code 追踪导出、Console 平台推送、供应商的 Agent 视图）；所有权和维护状态；计费单位；留存天数；GenAI span 名称。
