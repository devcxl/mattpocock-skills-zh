# Matt Pocock 技能

一组由 Claude Code 加载的智能体技能（斜杠命令与行为）。技能按 bucket 组织，由 `/setup-matt-pocock-skills` 产出的每仓库配置来消费。

## 术语

**Issue tracker（问题跟踪器）：**
承载仓库 issue 的工具：GitHub Issues、Linear、本地 `.scratch/` markdown 约定等。`to-tickets`、`to-spec` 和 `triage` 等技能从中读写。
_避免使用_：backlog manager、backlog backend、issue host

**Issue：**
**Issue tracker** 内的一项被跟踪的工作单元：一个 bug、任务、spec，或 `to-tickets` 产出的切片。
_避免使用_：ticket（仅在引用把它们称为 ticket 的外部系统时使用，或用于 **Decision ticket**：见下）

**Decision ticket（决策 ticket）：**
一张 `wayfinder` ticket：`wayfinder:map` 的一个子 **Issue**，承载一项其解答是决策而非可执行构建切片的*问题*。**decision** 限定词是它与实现 ticket 区分的关键；`wayfinder` 引入该术语，之后使用"ticket"。

**Triage role（分诊角色）：**
分诊过程中应用到 **Issue** 上的一条规范化的状态机标签（例如 `needs-triage`、`ready-for-afk`）。每个角色通过 `docs/agents/triage-labels.md` 映射到 **Issue tracker** 中真实的标签字符串。

## 关系

- 一个 **Issue tracker** 持有许多 **Issues**
- 一个 **Issue** 同时刻持有一个 **Triage role**
- 一个 **Decision ticket** 是一个 **Issue**（`wayfinder:map` 的子 Issue）

## 已标记的歧义

- "backlog" 此前被用来同时表示承载 issue 的*工具*以及其中的*工作集合*：已解决：工具是 **Issue tracker**；"backlog" 不再作为领域术语使用。
- "backlog backend" / "backlog manager"：已解决：合并为 **Issue tracker**。
