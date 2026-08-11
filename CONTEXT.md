# Matt Pocock 技能

由 Claude Code 加载的一组 agent 技能（斜杠命令和行为）。技能按分类组织，由 `/setup-matt-pocock-skills` 生成的逐仓库配置来消费。

## 术语

**Issue tracker（问题跟踪器）：**
承载仓库 issue 的工具——GitHub Issues、Linear、本地 `.scratch/` markdown 约定等。`to-tickets`、`to-spec` 和 `triage` 等技能从中读写。
_避免使用_：backlog manager、backlog backend、issue host

**Issue：**
**Issue tracker** 内的一个被跟踪的工作单元——一个 bug、任务、spec，或 `to-tickets` 产出的切片。
_避免使用_：ticket（只在引用把它们称为 ticket 的外部系统时使用，或用于**决策 ticket**——见下）

**Decision ticket（决策 ticket）：**
`wayfinder` 的单位——`wayfinder:map` 的一个子 **Issue**，承载一个*问题*，其解决结果是一个决策，而不是一段要执行构建的切片。**决策**这个限定词正是它与实现 ticket 的区别；`wayfinder` 引入这个词，之后就用 "ticket"。

**Triage role（分类角色）：**
分类过程中应用于 **Issue** 的一个规范状态机标签（如 `needs-triage`、`ready-for-afk`）。每个角色通过 `docs/agents/triage-labels.md` 映射到 **Issue tracker** 中的真实标签字符串。

## 关系

- 一个 **Issue tracker** 包含多个 **Issues**
- 一个 **Issue** 同时携带一个 **Triage role**
- 一个 **Decision ticket** 是一个 **Issue**（`wayfinder:map` 的子项）

## 已标记的歧义

- "backlog" 之前同时指代承载 issue 的*工具*和其中的*工作集合*——已解决：工具是 **Issue tracker**；"backlog" 不再作为领域术语使用。
- "backlog backend" / "backlog manager"——已解决：统一归入 **Issue tracker**。
