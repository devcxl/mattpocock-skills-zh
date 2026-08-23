## 它的作用

`wizard` 生成一个交互式 bash 脚本，逐步引导人类完成一个手动流程——配置第三方服务、运行一次性迁移、将项目从状态 A 搬到状态 B。它打开每个 URL，告诉你要点击和复制什么，捕获返回的内容，并写入 `.env` 文件和 GitHub Actions secrets。

[agent](https://www.aihero.dev/ai-coding-dictionary/agent) 负责写脚本，**从不运行它**。由你在自己的机器上运行。所以 wizard 不是一份你照着做的说明清单——它是一个驱动流程并持有状态的程序，你的部分只是点击、粘贴和按回车。

## 何时使用

你可以键入 `/wizard`，agent 也可以主动使用它。当它撞上一个必须由你完成的步骤（一个它无法铸造的 key、一个它无法点击的 dashboard）时，它会为你构建一个 wizard，而不是把说明写进聊天里任其滚走。

当你被下一个卡点是一次 dashboard 之旅时使用它：

| 情况 | wizard 做什么 |
| --- | --- |
| 一个新开发需要在应用启动前配置六个服务 | 按顺序打开每个 dashboard，捕获 key，写入 `.env` 和 CI |
| 一次性迁移需要按特定顺序拨动开关 | 把不可逆步骤排在确认门之后 |
| 一个项目需要一次性从状态 A 搬到状态 B | 走完整个转换并报告它没能完成的部分 |
| 你正要把这些步骤写进 README | 改为写一个可执行版本，它不会那么安静地腐烂 |

不要用它来*决定*要构建什么；那是 [grill-with-docs](https://aihero.dev/skills-grill-with-docs) 和 [to-spec](https://aihero.dev/skills-to-spec) 的工具。

## 先决条件

生成一个不需要任何先决条件。它写出的 wizard 运行在 bash 上，当某个阶段设置 GitHub secret 或 variable 时使用 `gh`。如果 `gh` 缺失或未认证，该阶段会变成警告，收尾摘要会告诉你手动设置什么，而不是让整次运行失败。

## 阶段

**stage** 是同一屏上的一个聚焦任务。脚本在阶段之间清屏，所以一个溢出屏幕的阶段会丢失滚走的部分。你按依赖顺序编写阶段并设置 `TOTAL_STAGES`，它驱动进度显示。

范围界定发生在写下任何一行代码之前。[技能（skill）](https://www.aihero.dev/ai-coding-dictionary/skill) 会读取仓库而不是凭空提问：`.env*`、`docker-compose*`、框架配置，以及 `.github/workflows/` 中的每个 `secrets.*` / `vars.*` 引用——每一个都是 wizard 必须产出的值。然后它向你展示有序的阶段列表以供确认，之后才把每个阶段映射到人类走的确切路径（"Dashboard → Developers → API keys → Reveal test key → copy"）。在它不知道当前 UI 的地方，它会问你或查文档，而不是编造点击路径。

对每个捕获的值，范围界定会确定它落在哪里：

| 目的地 | 何时 |
| --- | --- |
| 仅 `.env` | 本地开发需要，CI 不需要 |
| GitHub secret | CI 读取它，且它是敏感的 |
| GitHub variable | CI 读取它，且它是公开的 |
| 同时落到 `.env` 和 secret | 本地开发和 CI 都需要 |
| 不落任何地方 | 该阶段是纯动作：拨一个开关、升级一个计划 |

## 模板已经解决了 UX

[模板](https://github.com/mattpocock/skills/blob/main/skills/engineering/wizard/template.sh) 自带完整体验：剩余时间进度显示、确认门、跨平台 URL 打开（含 WSL）、秘密的隐藏输入、幂等的 `.env` upsert、`gh secret` / `gh variable` 写入，以及一份它不得不跳过的所有事项的收尾摘要。`STAGES` 标记之上的一切都是固定库，在每个 wizard 中完全相同，绝不手工编辑。这种一致性正是重点。你的工作只是界定流程范围并编写阶段。

写 wizard 的 agent 永远不会端到端跑它，因为它会打开浏览器并等待人类输入。它改为静态验证：`bash -n`、可用时的 `shellcheck`，以及追踪每个值是否落在范围界定所说的位置、每个 `set_secret` 名称是否匹配 CI 中真实的 `secrets.*` 引用。相应地调整预期——第一次运行是你的，而那次运行就是测试。

## 默认临时性

| 你拥有的东西 | 脚本怎么处理 |
| --- | --- |
| 一次性迁移、个人设置、再也不会重复的转换 | 保存到 scratch 或 `scripts/` 路径，运行，删除 |
| 仓库里下一个人也会需要的设置路径 | 提交它并从 README 链接，让他们跑脚本而不是重新问 agent |

## 常见问题

**我的 API key 会进入模型的上下文吗？**

不会。agent 写脚本，但不跑它。你自己跑脚本，它用隐藏的终端输入捕获 key，并直接写入 `.env` 或 `gh secret`。wizard 是一个 CLI，模型与它没有连接。一个警告：这只适用于 wizard 在运行时捕获的值。如果你在界定流程时把 key 粘贴进聊天，它就和任何粘贴的文本一样进入了[上下文（context）](https://www.aihero.dev/ai-coding-dictionary/context)。

**我能回去修正输错的值吗？**

运行中不能。没有返回按钮——阶段向前推进，第 3 阶段的一个错误答案意味着 Ctrl-C 重跑。重跑按设计很廉价：任何已写入 `.env` 的值都会作为默认值回显，所以你在正确的阶段按回车，只需重打错误的那一个。这件事发布当周被提出，此后再没被关闭过："loved it! One thing though, is there a way to go back and correct what you've entered?"

还有一个相关的未关闭 bug：`ask` 提示中的方向键会插入 `^[[D` / `^[[C` 而不是移动光标，因为提示用的是 `read -r` 而非 Readline（[issue #741](https://github.com/mattpocock/skills/issues/741)）。退格键能用；方向键不能用。删除回到错误处，而不是把光标移进去。

**它知道我已完成什么设置吗？**

部分知道，而且比发布时的反应所假设的要少。它在提问前读取仓库——你的 `.env` 文件、`docker-compose`、框架配置、CI 中的 `secrets.*` 引用——所以它只针对真正缺失的值做范围界定，而不是像 README 那样从零开始。它不做的是检查第三方服务。如果 key 已存在于 `.env`，wizard 会把它作为默认值回显，回车即保留；如果你已经创建了 Stripe 账户但从未保存 key，wizard 仍会把你送去 dashboard 取。

**它在工作流里处于什么位置——盘问和 spec 之后？**

没有特定位置。它是独立技能，不是链上的一环。常见的猜测是 `/grill-with-docs → /to-spec → /wizard`，这个顺序没问题，但触发条件是出现一个手动流程，它可以发生在任何时刻：开始之前、构建中途、上线很久之后。它也能充当发现工具——范围界定会浮出任务的隐藏前置条件，比如你没想到的三个 API key。

**它在 Claude Code 之外能用吗？**

产物可以，无条件：它是一个普通 bash 脚本，不在乎是哪个 [harness](https://www.aihero.dev/ai-coding-dictionary/harness) 生成的。技能本身是模型调用的，所以它出现在所有地方——在 Claude Code 中键入 `/wizard`，或在 Codex 中 `$wizard`，或者干脆描述你卡住的设置。模型调用也让它避开了 [#693](https://github.com/mattpocock/skills/issues/693)，即 Claude 的桌面和网页端会把*用户调用*的技能从 [model](https://www.aihero.dev/ai-coding-dictionary/model) 的清单中剔除并报告为未安装。

**它以前不是用户调用的吗？**

是的。现在是模型调用，所以当 agent 撞上一个必须由你完成的步骤时，它会主动使用它。你以前能做的任何事都仍然有效——模型调用*增加*了 agent 的触达，从不移除你的，所以 `/wizard` 的行为和以前完全一样。改变的是它退役的失败模式：agent 在构建中途撞上凭据墙，往聊天里倾倒六条编号步骤让你手动照做。

**它以前在 `in-progress/`——现在在哪？**

`engineering/`，从 v1.2 起。它从 beta 桶毕业，现在随插件一起发布，与其余晋升技能一起到达，无需单独安装。毕业没有改变它的行为。

## 怎样算成功

- 在有任何脚本存在之前，你看到一份有序的阶段列表、每个阶段产出的值，并被要求确认。
- 每个 URL 都在索取该页面上的值之前被打开。你永远不会被要求粘贴一个还没被发去取的东西。
- 秘密是盲打的。没有敏感内容回显到你的滚动历史中。
- 每个阶段适配一屏。你还需要的东西没有滚走。
- Ctrl-C 重跑从上次断点继续，把已保存的值作为默认值提供。
- 最后一屏列出它写入了什么，并单独列出它没能完成、需要你手动收尾的部分。

## 它的定位

`wizard` 是一个随时可调用的独立技能，站在自动化停止、人类必须点击的边界线上。它最近的邻居是 [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills)，因为两者都是为了把仓库带入可用状态——那个技能配置这套技能集，而 `wizard` 为其他一切生成设置路径。它也和 [implement](https://aihero.dev/skills-implement) 配对：当一次构建落地一个需要凭据或手动切换的功能时，wizard 就是人类那一半的完成方式。当你不确定哪个技能适合当下时，[ask-matt](https://aihero.dev/skills-ask-matt) 为你路由。