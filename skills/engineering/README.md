# 工程技能（Engineering）

日常编码工作中使用的技能。

## 用户调用（User-invoked）

只有通过输入技能名称才能调用（`disable-model-invocation: true`）。

- **[ask-matt](./ask-matt/SKILL.md)** — 询问哪种技能或流程适合你的情况。本仓库中用户调用技能的路由器。
- **[grill-with-docs](./grill-with-docs/SKILL.md)** — 盘问式会话，同时构建项目的领域模型，锤炼术语并内联更新 `CONTEXT.md` 和 ADR。
- **[triage](./triage/SKILL.md)** — 通过 triage 角色的状态机推动 issue 流转。
- **[improve-codebase-architecture](./improve-codebase-architecture/SKILL.md)** — 扫描代码库寻找可深化改进的机会，以可视化 HTML 报告呈现，然后深入讨论你选择的任何一个。
- **[setup-matt-pocock-skills](./setup-matt-pocock-skills/SKILL.md)** — 为本仓库配置工程技能（issue 跟踪器、triage 标签、领域文档布局）。每个仓库运行一次。
- **[to-issues](./to-issues/SKILL.md)** — 将任何计划、规范或 PRD 通过垂直切片拆解为可独立抓取的 issue。
- **[to-prd](./to-prd/SKILL.md)** — 将当前对话转换为 PRD 并发布到 issue 跟踪器。
- **[prototype](./prototype/SKILL.md)** — 构建一次性原型——用于状态/逻辑问题的可运行终端应用，或若干可切换的 UI 变体。

## 模型调用（Model-invoked）

模型或用户均可调用（使用丰富的触发短语，使模型能够主动调用）。

- **[diagnosing-bugs](./diagnosing-bugs/SKILL.md)** — 针对棘手的 bug 和性能回归问题的规范化诊断循环：复现 → 最小化 → 假设 → 检测 → 修复 → 回归测试。
- **[tdd](./tdd/SKILL.md)** — 测试驱动开发，采用红-绿-重构循环。每次一个垂直切片地构建功能或修复 bug。
- **[domain-modeling](./domain-modeling/SKILL.md)** — 主动构建和锤炼项目的领域模型——挑战术语、通过场景进行压力测试、内联更新 `CONTEXT.md` 和 ADR。
- **[codebase-design](./codebase-design/SKILL.md)** — 用于设计深层模块的共享规范和词汇表：小接口、清晰接缝、可通过接口进行测试。
