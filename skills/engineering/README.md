# 工程技能（Engineering）

日常编码工作中使用的技能。

## 用户调用（User-invoked）

只有通过输入技能名称才能调用（Claude Code: `disable-model-invocation: true`；Codex: `agents/openai.yaml` 中的 `policy.allow_implicit_invocation: false`）。

- **[ask-matt](./ask-matt/SKILL.md)** — 询问哪种技能或流程适合你的情况。本仓库中用户调用技能的路由器。
- **[grill-with-docs](./grill-with-docs/SKILL.md)** — 盘问式会话，同时构建项目的领域模型，锤炼术语并内联更新 `CONTEXT.md` 和 ADR。
- **[triage](./triage/SKILL.md)** — 通过 triage 角色的状态机推动 issue 流转。
- **[improve-codebase-architecture](./improve-codebase-architecture/SKILL.md)** — 扫描代码库寻找可深化改进的机会，以可视化 HTML 报告呈现，然后深入讨论你选择的任何一个。
- **[setup-matt-pocock-skills](./setup-matt-pocock-skills/SKILL.md)** — 为本仓库配置工程技能（issue 跟踪器、triage 标签、领域文档布局）。每个仓库运行一次。
- **[to-spec](./to-spec/SKILL.md)** — 将当前对话转换为 spec 并发布到 issue 跟踪器。无需面试——只需综合已讨论过的内容。
- **[to-tickets](./to-tickets/SKILL.md)** — 将任何计划、spec 或对话拆分为一组 tracer-bullet ticket，每个 ticket 声明其阻塞边——写入本地文件文本，或在真实跟踪器上使用原生阻塞链接。
- **[implement](./implement/SKILL.md)** — 根据 spec 或 ticket 集构建工作，在预先约定的接缝处驱动 `/tdd`，并在提交前以 `/code-review` 收尾。
- **[wayfinder](./wayfinder/SKILL.md)** — 规划一大块工作——超过一次 agent 会话能容纳的体量——以共享的决策 ticket 地图形式呈现，逐个解决，直到路线清晰。

## 模型调用（Model-invoked）

模型或用户均可调用（使用丰富的触发短语，使模型能够主动调用）。

- **[prototype](./prototype/SKILL.md)** — 构建一个可丢弃的原型来回答设计问题：针对状态/逻辑问题的可运行终端应用，或若干可切换的 UI 变体。
- **[diagnosing-bugs](./diagnosing-bugs/SKILL.md)** — 针对棘手的 bug 和性能回归问题的规范化诊断循环：复现 → 最小化 → 假设 → 检测 → 修复 → 回归测试。
- **[research](./research/SKILL.md)** — 在后台 agent 中针对高可信度一手来源调查一个问题，将发现作为带引用的 Markdown 文件写入仓库。
- **[tdd](./tdd/SKILL.md)** — 测试驱动开发，采用红-绿-重构循环。每次一个垂直切片地构建功能或修复 bug。
- **[domain-modeling](./domain-modeling/SKILL.md)** — 主动构建和锤炼项目的领域模型——挑战术语、通过场景进行压力测试、内联更新 `CONTEXT.md` 和 ADR。
- **[codebase-design](./codebase-design/SKILL.md)** — 用于设计深层模块的共享规范和词汇表：小接口、清晰接缝、可通过接口进行测试。
- **[code-review](./code-review/SKILL.md)** — 审查自某个固定点以来的变更——规范（代码标准）和规格（需求）双轴并行审查。
- **[resolving-merge-conflicts](./resolving-merge-conflicts/SKILL.md)** — 逐个 hunk 处理正在进行的 git merge 或 rebase 冲突，按意图追溯到各方的原始来源逐一解决，然后完成操作——绝不 `--abort`。
