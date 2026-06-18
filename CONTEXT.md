# Matt Pocock Skills

本仓库是 Claude Code 加载的一组 agent 技能（斜杠命令和行为）集合。技能按类别组织，由 `/setup-matt-pocock-skills` 生成的逐仓库配置来消费。

## 术语

**Issue tracker（问题跟踪器）：**
承载仓库 issue 的工具——GitHub Issues、Linear、本地 `.scratch/` markdown 约定等。`to-issues`、`to-prd`、`triage`、`qa` 等技能从中读写数据。
_避免使用_：backlog manager、backlog backend、issue host

**Issue：**
**Issue tracker** 中的单个跟踪工作单元——一个 bug、任务、PRD 或 `to-issues` 产出的切片。
_避免使用_：ticket（仅在引用将其称为 ticket 的外部系统时使用）

**Triage role（分类角色）：**
分类过程中应用于 **Issue** 的一个规范状态机标签（如 `needs-triage`、`ready-for-afk`）。每个角色通过 `docs/agents/triage-labels.md` 映射到 **Issue tracker** 中的实际标签字符串。

## 关系

- 一个 **Issue tracker** 包含多个 **Issues**
- 一个 **Issue** 同时携带一个 **Triage role**

## 已标记的歧义

- "backlog" 之前同时指代承载 issue 的*工具*和其中的*工作集合*——已解决：工具是 **Issue tracker**；"backlog" 不再作为领域术语使用。
- "backlog backend" / "backlog manager"——已解决：统一归入 **Issue tracker**。
