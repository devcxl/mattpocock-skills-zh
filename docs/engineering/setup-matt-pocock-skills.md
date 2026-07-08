Quickstart:

```bash
npx skills add mattpocock/skills --skill=setup-matt-pocock-skills
```

```bash
npx skills update setup-matt-pocock-skills
```

[Source](https://github.com/mattpocock/skills/tree/main/skills/engineering/setup-matt-pocock-skills)

## 它的作用

`setup-matt-pocock-skills` 配置你的仓库以使用这些技能：连接你的工单跟踪器、设置分类标签词汇表，并建立技能读取和写入所需的状态目录。

它**不会**安装技能本身。它假设你已经通过 `npx skills add` 添加了该技能。它运行一次来建立集成点——之后，各项技能在其各自的轨道上运行。

## 何时使用

在首次使用任何与工单跟踪器交互的技能（[triage](https://aihero.dev/skills-triage)、[to-spec](https://aihero.dev/skills-to-spec)、[to-tickets](https://aihero.dev/skills-to-tickets)、[implement](https://aihero.dev/skills-implement)）之前，每个仓库运行一次。如果你切换跟踪器或更改标签，也要重新运行。

## 它配置什么

- **工单跟踪器连接**——你的跟踪器的 URL、认证方式和项目标识符。
- **分类标签**——从标准分类（`bug`、`enhancement`、`needs-triage`、`ready-for-agent`、`ready-for-human`、`needs-info`、`wontfix`）到你仓库中实际标签字符串的映射。
- **状态目录**——技能写入产物（上下文、ADR、术语表）的位置。默认为 `.skills/status/`。
- **外部 PR 策略**——外部协作者的 PR 是否作为请求面被处理，以及谁被视为"外部"人员。

## 它的定位

`setup-matt-pocock-skills` 是一次性设置步骤——每个仓库运行一次，位于构建链之前。它在 [triage](https://aihero.dev/skills-triage)、[to-spec](https://aihero.dev/skills-to-spec)、[to-tickets](https://aihero.dev/skills-to-tickets) 和 [implement](https://aihero.dev/skills-implement) 需要跟踪器连接之前运行。当你不确定适合哪种技能或流程时，[ask-matt](https://aihero.dev/skills-ask-matt) 会为你指引方向。
