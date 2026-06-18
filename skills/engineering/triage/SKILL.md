---
name: triage
description: 通过分类角色驱动的状态机对 issue 和外部 PR 进行分流处理——分类、验证、盘问（如需）、撰写 agent-ready brief。
disable-model-invocation: true
---

# Triage（分类分流）

将项目 issue 跟踪器中的 issue 沿着一个精简的分类状态机进行流转。

如果本仓库将外部 pull request 也视为请求面（参见 issue-tracker 配置），则 triage 同样覆盖它们：**PR 是附带了代码的 issue** —— 同样的角色、同样的状态、同样的状态机，只有少数差异在下方标记为"针对 PR"。将裸的 `#42` 解析为 issue 或 PR，具体取决于 tracker 配置。

在分类过程中发布到 issue 跟踪器的每一条评论或 issue **必须**以下述声明开头：

```
> *此内容由 AI 在分类过程中生成。*
```

## 参考文档

- [AGENT-BRIEF.md](AGENT-BRIEF.md) — 如何撰写经得起时间考验的 agent brief
- [OUT-OF-SCOPE.md](OUT-OF-SCOPE.md) — `.out-of-scope/` 知识库的工作方式

## 角色

两种**类别**角色：

- `bug` — 出现了问题
- `enhancement` — 新功能或改进

五种**状态**角色：

- `needs-triage` — 维护者需要评估
- `needs-info` — 等待报告人提供更多信息
- `ready-for-agent` — 规格完备，可供 AFK agent 接手
- `ready-for-human` — 需要人工实现
- `wontfix` — 不予处理

每个经过分类的 issue 应同时携带一个类别角色和一个状态角色。如果出现状态角色冲突，标记出来并在做任何操作之前询问维护者。

以上为规范角色名称——在 issue 跟踪器中实际使用的标签字符串可能有所不同。映射关系应已在配置中提供——如未提供，请运行 `/setup-matt-pocock-skills`。

状态转换：一个无标签的 issue 通常首先进入 `needs-triage`；之后可以转移到 `needs-info`、`ready-for-agent`、`ready-for-human` 或 `wontfix`。`needs-info` 在报告人回复后回到 `needs-triage`。维护者可随时覆盖——对看起来不寻常的转换进行标记，并在执行前询问。

## 调用方式

维护者调用 `/triage` 并用自然语言描述需求。理解意图后执行。示例：

- "给我看看需要我关注的内容"
- "我们来看看 #42"
- "把 #42 移到 ready-for-agent"
- "有哪些 issue 可以先让 agent 接手？"

## 展示需要关注的内容

查询 issue 跟踪器，按以下三个分类、每个分类内部按最旧优先排列：

1. **未标记** — 从未被分类过。
2. **`needs-triage`** — 评估进行中。
3. **`needs-info` 且自上次分类注释以来报告人有新活动** — 需要重新评估。

显示每个分类的数量，以及每个 issue 的一句话摘要。让维护者自行选择。

## 对特定 issue 进行分类

1. **收集上下文。** 阅读完整的 issue（正文、评论、标签、报告人、日期）。解析已有的分类注释，避免重复询问已解决的问题。使用项目领域术语表探索代码库，尊重所在区域的 ADR。读取 `.out-of-scope/*.md`，并呈现任何与本 issue 相似的过往拒绝记录。

2. **给出建议。** 向维护者提供你的类别和状态建议并附上理由，以及与该 issue 相关的代码库简要总结。等待指示。

3. **复现（仅限 bug）。** 在任何深入审查之前，先尝试复现：阅读报告人提供的问题步骤，追踪相关代码，运行测试或命令。报告结果——成功复现并说明代码路径、复现失败、或信息不足以复现（此时是加 `needs-info` 的强烈信号）。确认复现可以大大加强 agent brief 的质量。

4. **深入审查（如需要）。** 如果 issue 需要进一步细化，运行 `/grill-with-docs` 会话。

5. **落实结果：**
   - `ready-for-agent` — 发布 agent brief 评论（[AGENT-BRIEF.md](AGENT-BRIEF.md)）。
   - `ready-for-human` — 与 agent brief 结构相同，但需注明为什么不能委托给代理（涉及判断决策、外部访问、设计决策、手动测试等）。
   - `needs-info` — 发布分类注释（模板见下）。
   - `wontfix`（bug）— 礼貌解释，然后关闭。
   - `wontfix`（enhancement）— 写入 `.out-of-scope/`，在评论中链接，然后关闭（[OUT-OF-SCOPE.md](OUT-OF-SCOPE.md)）。
   - `needs-triage` — 打上该角色标签。如有部分进展，可选附评论。

## 快速状态覆盖

如果维护者说"把 #42 移到 ready-for-agent"，信任他们并直接打上角色标签。确认你即将执行的操作（角色变更、评论、关闭），然后执行。跳过深入审查。如果要移到 `ready-for-agent` 且未做深入审查，询问是否要撰写 agent brief。

## Needs-info 模板

```markdown
## 分类注释

**目前已确定：**

- 要点 1
- 要点 2

**仍需你提供（@报告人）：**

- 问题 1
- 问题 2
```

将审查过程中已解决的所有内容归入"目前已确定"，避免成果丢失。问题需具体且可执行，不要笼统地说"请提供更多信息"。

## 恢复之前的会话

如果 issue 上已有分类注释，阅读它们，检查报告人是否已回答未解决的问题，并在继续之前呈现更新后的全貌。不要重复询问已解决的问题。
