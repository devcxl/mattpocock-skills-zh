---
name: to-tickets
description: 将计划、规范或当前对话拆分为一组 tracer-bullet ticket，每个 ticket 声明其阻塞边（blocking edges），发布到已配置的跟踪器——本地文件中每个 ticket 一个文件以文本表示边，真实跟踪器上以原生阻塞链接表示。
disable-model-invocation: true
---

# 拆分为 Ticket

将计划、规范或对话拆分为一组 **ticket**——tracer-bullet 垂直切片，每个都声明阻塞它的其他 ticket。

Issue 跟踪器和分类标签词汇表应已提供给你——如果没有，请告诉用户运行 `/setup-matt-pocock-skills`。

## 流程

### 1. 收集上下文

从对话上下文中已有的内容开始。如果用户传入引用（规范路径、Issue 编号或 URL）作为参数，获取它并读取其完整正文和评论。

### 2. 探索代码库（可选）

如果你尚未探索代码库，请先了解代码的当前状态。Ticket 标题和描述应使用项目的领域术语表词汇，并尊重你正在接触的区域的 ADR。

寻找预重构代码的机会，使实现更简单。"让改动变得容易，然后再做容易的改动。"

### 3. 起草垂直切片

将工作拆分为 **tracer bullet** ticket。

<vertical-slice-rules>

- 每个切片在每个层面（schema、API、UI、测试）走一条狭窄但**完整**的通路——是垂直的，而不是某一层的水平切片
- 一个完成的切片本身是可演示或可验证的
- 每个切片大小适合单个全新的上下文窗口
- 任何预重构应首先完成

</vertical-slice-rules>

为每个 ticket 指定其**阻塞边**——必须先完成才能开始的其他 ticket。没有阻塞项的 ticket 可以立即开始。

**大范围重构是垂直切片的例外。** **大范围重构** 是一种机械性变更（重命名列、更改共享符号类型），其**影响范围**波及整个代码库，一次编辑会同时破坏数千个调用点，导致没有任何垂直切片能保持绿色。不要硬塞进 tracer bullet；按 **扩展-收缩（expand–contract）** 序列化。首先扩展：在旧形式旁边添加新形式，确保任何东西都没坏。然后按影响范围大小分批迁移调用点（按包、按目录），每批一个 ticket 被扩展阻塞，由于旧形式仍存在，CI 在批次之间保持绿色。最后收缩：所有调用者迁移完后删除旧形式，作为一个被每个迁移批次阻塞的 ticket。当批次本身也无法单独保持绿色时，保留这个序列，但让它们共享一个集成分支，所有批次都阻塞一个最终的"集成并验证" ticket——绿色只在那里承诺。

### 4. 征求用户意见

以编号列表的形式展示提议的拆解方案。对每个 ticket，展示：

- **标题**：简短描述性名称
- **被以下阻塞**：哪些其他 ticket（如果有）必须先完成
- **交付内容**：此 ticket 让哪个端到端行为生效

询问用户：

- 粒度是否合适？（太粗 / 太细）
- 阻塞边是否正确：每个 ticket 是否只依赖真正制约它的 ticket？
- 是否需要合并或进一步拆分某些 ticket？

迭代直到用户批准拆解方案。

### 5. 将 ticket 发布到已配置的跟踪器

发布已批准的 ticket。**发布方式**取决于 `/setup-matt-pocock-skills` 配置的跟踪器——ticket 本身相同，只有阻塞边的形式不同：

- **本地文件** → 在 `.scratch/<feature-slug>/issues/<NN>-<slug>.md` 下为每个 ticket 写入一个文件，按依赖顺序从 `01` 开始编号（阻塞项优先）。每个文件的 "Blocked by" 列出它依赖的编号/标题。使用下面的 per-ticket 文件模板：一个 ticket 一个文件，绝不合并为一个文件。
- **真实 issue 跟踪器（GitHub、Linear……）** → 按依赖顺序每个 ticket 发布一个 issue（阻塞项优先），这样每个 ticket 的阻塞边可以引用真实标识符。在平台支持原生阻塞/子 issue 关系的地方使用；否则把每个 ticket 的 "Blocked by" 设为阻塞它的 issue。除非另有指示，应用 `ready-for-agent` 分类标签——这些 ticket 本身就具备 agent 可抓取性。

按**前沿**推进：任意一个阻塞项已全部完成的 ticket。对纯粹的线性链来说就是从上到下。

不要关闭或修改任何父 issue。

<local-ticket-template>

# <NN>: <Ticket 标题>

**What to build:** 此 ticket 让哪个端到端行为生效——从用户视角出发，而不是逐层的实现清单。

**Blocked by:** 制约此 ticket 的其他 ticket 的编号/标题，或 "None (can start immediately)"。

**Status:** ready-for-agent

- [ ] 验收标准 1
- [ ] 验收标准 2

</local-ticket-template>

<issue-template>

## Parent

跟踪器上父 issue 的引用（若源为已有 issue，否则省略本节）。

## What to build

此 ticket 让哪个端到端行为生效——从用户视角出发，而不是逐层实现。

## Acceptance criteria

- [ ] 标准 1
- [ ] 标准 2

## Blocked by

- 每个阻塞 ticket 的引用，或 "None (can start immediately)"。

</issue-template>

无论哪种形式，避免具体的文件路径或代码片段——它们很快就会过时。例外情况：如果原型产出的代码片段比文字更精确地编码了某个决策（状态机、reducer、schema、类型结构），将其内联并简要说明来自原型。精简到决策密集的部分——不是可工作的演示，只是重要的那些。
