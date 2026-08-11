# 工程技能（Engineering）

日常编码工作中使用的技能。

## 用户调用（User-invoked）

只有你输入它们时才可达（Claude Code：`disable-model-invocation: true`；Codex：`agents/openai.yaml` 中的 `policy.allow_implicit_invocation: false`）。

- **[ask-matt](./ask-matt/SKILL.md)** — 询问哪个技能或流程适合你的情况。本仓库中用户调用技能的路由器。
- **[grill-with-docs](./grill-with-docs/SKILL.md)** — 盘问式会话，同时构建你项目的领域模型，内联打磨术语并更新 `CONTEXT.md` 和 ADR。
- **[triage](./triage/SKILL.md)** — 让 issue 走一遍由分类角色组成的状态机。
- **[improve-codebase-architecture](./improve-codebase-architecture/SKILL.md)** — 扫描代码库寻找深化机会，以可视化 HTML 报告呈现，然后对你挑中的那个进行盘问。
- **[setup-matt-pocock-skills](./setup-matt-pocock-skills/SKILL.md)** — 为本仓库配置工程技能（issue 跟踪器、分类标签、领域文档布局）。每个仓库运行一次。
- **[to-spec](./to-spec/SKILL.md)** — 把当前对话变成一份 spec 并发布到 issue 跟踪器。
- **[to-tickets](./to-tickets/SKILL.md)** — 把任何计划、spec 或对话拆成一组示踪子弹式 ticket，每个都声明其阻塞边——本地文件中的文本，或真实跟踪器上的原生阻塞链接。
- **[implement](./implement/SKILL.md)** — 构建 spec 或一组 ticket 所描述的工作，在预先约定的接缝处驱动 `/tdd`，并在提交前用 `/code-review` 收尾。
- **[wayfinder](./wayfinder/SKILL.md)** — 把一大块工作——超过一个 agent 会话能容纳的量——规划成 issue 跟踪器上一张由决策 ticket 组成的共享地图，逐个解决，直到通往目的地的道路清晰。

## 模型调用（Model-invoked）

模型或用户均可调用（丰富的触发措辞，让模型能主动拿起来用）。

- **[prototype](./prototype/SKILL.md)** — 构建一次性原型回答设计问题：一个可分享的 HTML 文件用于状态/逻辑，或几个可切换的 UI 变体。

- **[diagnosing-bugs](./diagnosing-bugs/SKILL.md)** — 针对疑难 bug 和性能回归的训练有素的诊断循环：构建一个对*这个* bug 变红的反馈循环 → 最小化 → 假设 → 插桩 → 修复 → 回归测试。
- **[research](./research/SKILL.md)** — 对照高信任度的一手来源调查问题，并把发现作为带引用的 Markdown 文件留在仓库里，作为后台 agent 运行。
- **[tdd](./tdd/SKILL.md)** — 带红-绿-重构循环的测试驱动开发。一次一个垂直切片地构建功能或修复 bug。
- **[domain-modeling](./domain-modeling/SKILL.md)** — 主动构建和打磨项目的领域模型——挑战术语、用场景压力测试、内联更新 `CONTEXT.md` 和 ADR。
- **[codebase-design](./codebase-design/SKILL.md)** — 设计深度模块的共享训练和词汇：小接口、干净接缝、通过接口可测试。
- **[code-review](./code-review/SKILL.md)** — 对自某个固定点以来的 diff 做双轴审查：**标准**（是否遵循仓库的编码标准，外加 Fowler 坏味道基线？）和**规格**（是否忠实实现了源 issue/spec？），作为并行子代理运行。
- **[resolving-merge-conflicts](./resolving-merge-conflicts/SKILL.md)** — 一块一块地处理进行中的 git merge 或 rebase 冲突，根据追溯到双方一手来源的意图来解决，然后完成操作——绝不 `--abort`。
- **[wizard](./wizard/SKILL.md)** — 生成一个交互式 bash 向导，引导人完成只有他们能执行的步骤：配置基础设施、设置凭据或 CI 密钥、走一遍陌生的第三方仪表盘，或执行一次性的迁移或切换。
