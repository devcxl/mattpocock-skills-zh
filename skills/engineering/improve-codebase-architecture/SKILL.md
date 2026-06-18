---
name: improve-codebase-architecture
description: 扫描代码库寻找深化机会，以可视化的 HTML 报告呈现，然后对你选中的方案进行盘问。
disable-model-invocation: true
---

# 改进代码库架构

揭示架构摩擦点并提出**深化机会**——将浅层 module 转变为深层 module 的重构。目标是可测试性和 AI 可导航性。

本命令**参考**项目的领域模型，并基于共享的设计词汇：

- 运行 `/codebase-design` 技能获取架构词汇（**module**、**interface**、**depth**、**seam**、**adapter**、**leverage**、**locality**）及其原则（deletion test、"interface 就是 test surface"、"一个 adapter = 假设性 seam，两个 = 真实的"）。在每个建议中严格使用这些术语——不要偏离到 "component"、"service"、"API" 或 "boundary"。
- `CONTEXT.md` 中的领域语言为好的 seam 提供了命名；`docs/adr/` 中的 ADR 记录了本命令不应重新讨论的决策。

## 流程

### 1. 探索

首先阅读项目的领域术语表（`CONTEXT.md`）以及你将要接触的区域内任何 ADR。

然后使用 `subagent_type=Explore` 的 Agent 工具遍历代码库。不要遵循僵化的启发式规则——有机地探索，并记录你在哪里遇到了摩擦：

- 在哪些地方，理解一个概念需要在多个小模块之间来回跳转？
- 哪些 module 是**shallow**的——interface 几乎和 implementation 一样复杂？
- 哪些地方纯粹为了可测试性而提取了纯函数，但真正的 bug 却隐藏在它们的调用方式中（缺乏 **locality**）？
- 哪些紧密耦合的 module 跨越了它们的 seam？
- 代码库的哪些部分未经测试，或难以通过当前 interface 进行测试？

对你怀疑是 shallow 的任何内容应用**deletion test**：删除它会集中复杂性，还是仅仅移动它？"集中了"就是你想要的信号。

### 2. 将候选方案呈现为 HTML 报告

编写一个自包含的 HTML 文件到 OS 临时目录，这样不会在仓库中留下任何文件。从 `$TMPDIR` 解析临时目录，回退到 `/tmp`（在 Windows 上为 `%TEMP%`），并写入 `<tmpdir>/architecture-review-<timestamp>.html`，这样每次运行都会得到一个新文件。为用户打开它——Linux 上使用 `xdg-open <path>`，macOS 上使用 `open <path>`，Windows 上使用 `start <path>`——并告知用户绝对路径。

报告使用 **Tailwind（通过 CDN）** 进行布局和样式，并使用 **Mermaid（通过 CDN）** 绘制图表，在图形/流程/序列能可靠传达结构的地方使用。将 Mermaid 与手工制作的 CSS/SVG 视觉元素混合使用——当关系是图形形状时（调用图、依赖关系、序列）使用 Mermaid，当你想要更具编辑性的效果时（mass 图、截面图、折叠动画）使用手工构建的 div/SVG。每个候选方案都要有**前后对比可视化**。要有视觉冲击力。

每个候选方案渲染一张卡片，包含：

- **文件**——涉及哪些文件/module
- **问题**——当前架构为何造成摩擦
- **方案**——用通俗语言描述会发生什么变化
- **收益**——用 locality 和 leverage 的术语解释，以及测试会如何改进
- **前后对比图**——并排展示，自定义绘制，说明 shallowness 和 deepening 效果
- **推荐强度**——`Strong`（强烈推荐）、`Worth exploring`（值得探索）、`Speculative`（推测性），渲染为 badge

报告以**最佳推荐**部分结尾：你会先处理哪个候选方案以及原因。

**对 CONTEXT.md 使用领域词汇，对架构使用 `/codebase-design` 词汇。** 如果 `CONTEXT.md` 定义了 "Order"，就说 "Order intake module"——而不是 "FooBarHandler"，也不是 "Order service"。

**ADR 冲突**：如果某个候选方案与现有 ADR 矛盾，仅当摩擦确实严重到值得重新审视 ADR 时才提出来。在卡片中明确标注（例如警告提示：_"与 ADR-0007 矛盾——但值得重新讨论，因为……"_）。不要列出 ADR 禁止的每个理论上的重构。

参见 [HTML-REPORT.md](HTML-REPORT.md) 获取完整的 HTML 脚手架、图表模式及样式指导。

**在写入文件后，先不要提出 interface。** 询问用户："你想探索哪个方案？"

### 3. 盘问循环

一旦用户选中一个候选方案，运行 `/grilling` 技能与他们一起遍历设计树——约束条件、依赖关系、deepened module 的形状、seam 背后是什么、哪些测试能够存活。

副作用在决策明确时即时产生——运行 `/domain-modeling` 技能以保持领域模型的最新状态：

- **将一个 deepened module 命名为 `CONTEXT.md` 中不存在的概念？** 将该术语添加到 `CONTEXT.md`。如果文件不存在，延迟创建。
- **在对话过程中澄清了一个模糊的术语？** 立即更新 `CONTEXT.md`。
- **用户因一个重要原因拒绝了候选方案？** 提议创建一个 ADR，措辞为：_"需要我将此记录为 ADR，以便未来的架构审查不再重新提出此建议吗？"_ 只有当原因确实对未来探索者避免重复提出相同建议有实际帮助时才提出——跳过临时性原因（"现在不值得做"）和自明的原因。
- **想探索 deepened module 的替代 interface？** 运行 `/codebase-design` 技能并使用其 design-it-twice 并行子代理模式。
