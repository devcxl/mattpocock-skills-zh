# mattpocock-skills

## 1.2.3

### 补丁变更

- [#779](https://github.com/mattpocock/skills/pull/779) [`efce423`](https://github.com/mattpocock/skills/commit/efce423018fc6468a3239621f1c1bcaacc723801) 感谢 [@mattpocock](https://github.com/mattpocock)! - 让 `diagnosing-bugs` 对敏感信息打码。

  - 在 `SKILL.md` 中新增 **Redact**（打码）小节。该技能会让智能体展示命令、输出与捕获的工件；这一节把"打码"作为第一步：写入 `<REDACTED>`、让循环依赖环境变量（凭证保留在环境里），并且只引用捕获工件中真正承载信号的行。
  - Phase 1 的完成标准原本是"粘贴调用命令及其输出"，现在改为"展示脱敏后的内容"，并且 Phase 1 会向用户索取一份**已脱敏**的捕获工件。
  - 在 `scripts/hitl-loop.template.sh` 中注明 `capture` 会把其值回显到终端，所以在保持登录步骤仍是 `step` 的同时，让它负责采集观察值。

- [#781](https://github.com/mattpocock/skills/pull/781) [`14bfbbd`](https://github.com/mattpocock/skills/commit/14bfbbd8654a8d2910299e1a004c19c1979687d8) 感谢 [@mattpocock](https://github.com/mattpocock)! - 从 `code-review`、`codebase-design` 与 `improve-codebase-architecture` 的子智能体调度说明中去掉 Claude Code 的工具名与智能体类型名，以便该步骤在 Codex 与其他 harness 上同样可执行。

- [#783](https://github.com/mattpocock/skills/pull/783) [`c0fd1e9`](https://github.com/mattpocock/skills/commit/c0fd1e973e040347d424e09934099f1bd6c2dee0) 感谢 [@mattpocock](https://github.com/mattpocock)! - wizard：移除时间估算。模板删掉 `TOTAL_MINUTES` 与剩余时间显示，`stage` 仅接收一个名称，进度按阶段数计算。

## 1.2.2

### 补丁变更

- [#766](https://github.com/mattpocock/skills/pull/766) [`4aaccb5`](https://github.com/mattpocock/skills/commit/4aaccb58d40559d7e3c59a029b2290ae5ba538de) 感谢 [@mattpocock](https://github.com/mattpocock)! - 让 `writing-for-agents` 在 Codex 中可被模型调用。

  - 从 `agents/openai.yaml` 中移除 `policy.allow_implicit_invocation: false`。Codex 会据此把该技能从模型可见技能列表中筛掉，导致描述无法触发它：只有显式 `$writing-for-agents` 才生效。
  - 更新过期的 `interface.display_name` 与 `interface.short_description`，二者仍沿用旧的 `writing-great-skills` 名称。
  - 在 `README.md` 与 `skills/productivity/README.md` 中将该技能从 **User-invoked**（用户调用）列表移至 **Model-invoked**（模型调用）列表。

## 1.2.0

### 次要变更

- [#551](https://github.com/mattpocock/skills/pull/551) [`697d4ce`](https://github.com/mattpocock/skills/commit/697d4ce9742da558fd1ba6697c8e9775e2e302dd) 感谢 [@mattpocock](https://github.com/mattpocock)! - 在每个技能的 Claude Code frontmatter 之外补齐 Codex 元数据，使整套技能无需生成额外副本即可在两个 harness 上工作。

  - 在每个 `SKILL.md` 旁新增 `agents/openai.yaml`，提供 Codex UI 元数据（`interface.display_name`、`interface.short_description`）。
  - 为所有用户调用型技能标记 `policy.allow_implicit_invocation: false`，这是 Codex 中对应 `disable-model-invocation: true` 的开关；Codex 据此排除隐式调用，而显式 `$skill` 调用照常工作。
  - 在 `.agents/invocation.md`、`CLAUDE.md` 以及晋升桶 README 中记录双 harness 调用模型。
  - 新增 `AGENTS.md` 作为 `CLAUDE.md` 的符号链接，让 Codex 读取同一份仓库说明。

- [#593](https://github.com/mattpocock/skills/pull/593) [`0f2bdbd`](https://github.com/mattpocock/skills/commit/0f2bdbdb06220d2df3718b8f0483157c6c8a8600) 感谢 [@mattpocock](https://github.com/mattpocock)! - 将 **`to-questionnaire`** 从 `in-progress/` 毕业至 **Productivity** 桶，正式随插件发布。它把"你独自答不上来的决定"转化为一份 Markdown 问卷，发给唯一能答的那个人：异步填写或在会议中一起过完。

  它的标志性手法是拷问**发送对象**，而非主题本身：常规的 grilling 会盘问主题，而这恰恰是你在此答不上来的；因此它只问"问卷发给谁"以及"你需要对方回什么"，再把所有问题对准两者之间的鸿沟。

  现在作为晋升技能接入：插件条目、顶层与 Productivity README 中加入 **User-invoked**，文档页 `docs/productivity/to-questionnaire.md`，并在 `ask-matt` 中设为 Standalone 路由：定位为 `/grill-me` 的反向操作（盘问他人，而非自己）。

- [#680](https://github.com/mattpocock/skills/pull/680) [`b3376f8`](https://github.com/mattpocock/skills/commit/b3376f8d39848dd08572ec2667da4739a67c8c04) 感谢 [@mattpocock](https://github.com/mattpocock)! - 将 **`wizard`** 从 `in-progress/` 毕业至 **Engineering** 桶，正式随插件发布，并改为模型调用型。它生成一个交互式 bash 脚本，引导人类完成一项手动流程：第三方账号开通、一次性迁移、A→B 状态切换：自动打开每个 URL、提示点击位置、采集值，并写入 `.env` 文件与 GitHub Actions secrets。

  良好体验由自带的 `template.sh` 预先解决（带剩余时间的进度、确认门、含 WSL 的跨平台 URL 打开、隐蔽的密钥输入、幂等的 `.env` upsert、带降级处理的 `gh secret`/`gh variable` 写入、收尾的跳过汇总）。`STAGES` 标记以上的内容是固定库，绝不手改：该技能的工作只是界定流程范围并撰写其 **stages**。

  归入 Engineering 而非 Productivity 的原因：它会读取 `.env*`、`docker-compose*`、框架配置以及 `.github/workflows/` 中所有 `secrets.*`/`vars.*` 引用来自我界定范围，写入 CI secrets，并用 `bash -n` 与 `shellcheck` 校验输出。

  改为模型调用型后，智能体在遇到只有人类能执行的步骤时即可立刻调用它，而不再把编号步骤甩到聊天里等你照做。手动输入 `/wizard` 行为不变：模型调用只会**增加**智能体的触达范围。描述以"何时触发"的指针形式书写：它产出的内容、四条触发分支（基础设施预置、配置凭据或 CI secrets、引导陌生的第三方控制台、一次性迁移或切换）、以及一条明确的非触发：不要在智能体能自己完成的步骤上调用它。智能体能做的，就该让智能体做；wizard 留给那些你不愿交给智能体的点击、授权与控制台操作。写入前对阶段列表的确认，现在在中途触发时也作为提案使用。

  现在作为晋升技能接入：插件条目、顶层与 Engineering README 中加入 **Model-invoked**，文档页 `docs/engineering/wizard.md`，并在 `ask-matt` 中为"只有人类能完成的步骤"设立 Standalone 路由。模型调用还使它免受 [#693](https://github.com/mattpocock/skills/issues/693) 影响：后者将用户调用型技能从 Claude 桌面与 Web 界面清单中移除。

- [#763](https://github.com/mattpocock/skills/pull/763) [`77d207e`](https://github.com/mattpocock/skills/commit/77d207ef03219cc603e2832e1159cbdd1c91818e) 感谢 [@mattpocock](https://github.com/mattpocock)! - 用两个理念重塑 **`prototype`** 技能：演示稿是**一份可分享的 HTML 文件**，原型本身是**第一手来源**。

  逻辑分支现在产出一个自包含文件（纯 HTML/CSS/JS，无构建、无服务器），而非终端应用：非开发者双击即可打开，并用自己的领域语言驱动它：一个带标签的状态面板、常驻的自由操作按钮，以及一组标签页式的**引导式走查**，每个走查是一个场景，下方列出应按顺序点击的按钮。可移植的纯逻辑模块仍可提入正式代码；HTML 外壳是"用完即弃"的。

  "用完即弃"不再意味着删除。原型不再在回答完问题后即被删除，而是作为可运行证据留在一条 `prototype/<name>` 分支（基于 main），并在实施 issue 上留下指向它的上下文指针：main 只保留已验证的决策。

  四个随原型一起移动的子流程：

  - **逻辑原型**仍然是"代码回答一个问题"：抛出一个 TypeScript 模块、一个 Node REPL 入口、或一份自包含 HTML：按所提问题的形态而定。问题回答后，原型文件合并进主代码或丢弃；HTML 原型被保留为证据。
  - **UI 原型**采用两种新形态之一：**变体**，一组风格截然不同的版本，作为分支路线挂在一个共享的着陆页上；或**走查**，一份带标签的脚本化演示，沿一条剧情走完按键、状态与文案。
  - **收尾问卷**已删除：其作用被保留的原型证据取代。
  - **重新打回原型的场景**已被吸收进原型的判定："有 UI 时是否走到代码"，"是否保留原型的可运行证据"：原来属于收尾问卷的门槛，原型现在自己问。

  此外：[grill-me](https://aihero.dev/skills-grill-me) 在遇到 UI/感觉类问题时，被链接到 prototype 作为推荐的下一步：它原本就该指向那里。

- [#742](https://github.com/mattpocock/skills/pull/742) [`17d3d92`](https://github.com/mattpocock/skills/commit/17d3d9275c4a6518d40d2065f55e4a52d8f508d4) 感谢 [@mattpocock](https://github.com/mattpocock)! - **破坏性变更：**将 **`wayfinder`** 中的术语从"决策图"（decision map）改为 **`decision ticket`**（决策 ticket）。

  人们倾向于把一张 wayfinder ticket 读作普通的*实现* ticket：一块要执行的构建切片：而 wayfinder 把它们当作**决策 ticket**：其解答即决策的问题。技能的描述和它的开头现在引入该术语（并说明是什么让它成为决策 ticket），`ask-matt`/Engineering README 的简介和文档页与之同步：一旦该术语确立，"ticket"就作为日常用语保留下来。`CONTEXT.md` 将 **Decision ticket** 记为领域术语，因此"避免：ticket"的指引不再与 wayfinder 故意使用这个词相矛盾。

  Research ticket 不再被搁置、留到单独启动的会话里处理。Research 仍然是真正的 ticket 类型：它是一个真正的共享阻塞点，下游决策挂靠于此，这一依赖正是 frontier 的阻塞边存在的意义。变化的是它的解决方式：因为 research 是 AFK 的，绘图的不会停下来读它。创建 ticket 后，绘图会话会为每张 research ticket 派一个 `/research` 子智能体并行地把它烧掉，把发现捕获到一条临时的 `research/<name>` 分支上并附上上下文指针。Research ticket 是"一张 ticket 一个会话"规则之外唯一的例外。

- [#763](https://github.com/mattpocock/skills/pull/763) [`77d207e`](https://github.com/mattpocock/skills/commit/77d207ef03219cc603e2832e1159cbdd1c91818e) 感谢 [@mattpocock](https://github.com/mattpocock)! - **破坏性变更：**将 **`writing-great-skills`** 重命名为 **`writing-for-agents`**，重组它，并新增一个引导词。

  参考现在覆盖 agent 读取的任何文档：技能、`AGENTS.md` / `CLAUDE.md`、通过指针触达的文档：而不只是技能。`GLOSSARY.md` 被合并到 `SKILL.md`（每个词条只有一份权威论述；`_Avoid_` 同义词列表与独立的 Predictability 定义被移除）；技能专属的机制（frontmatter、模型调用 vs 用户调用、路由器技能、拆分的调用分支）披露到一份新的 `SKILL-MECHANICS.md`。该技能现在是**模型调用**型：在创建或编辑技能，或修改 `AGENTS.md`/`CLAUDE.md` 时触发。`ask-matt` 的指针已更新。请以新名字重装；旧名字已不存在（无别名）。

  修剪小节新增 **cache**。单一事实来源现在延伸到环境：`package.json` 脚本、配置文件、目录布局、`--help` 输出本身都是权威的，所以一份复述它们的文档就是一种查找的缓存，只有当该查找代价高昂时才值得承载。正向目标：缓存 agent 自己找不到的东西（未成文的约定、某个选择背后的理由、没有任何配置承认的坑），把一条命令一次文件就能查到的留到环境里，让它不会过时。

- [#533](https://github.com/mattpocock/skills/pull/533) [`45afd80`](https://github.com/mattpocock/skills/commit/45afd8074a8b7de5fe073845d080fa9dd6c429fa) 感谢 [@mattpocock](https://github.com/mattpocock)! - 给 **`improve-codebase-architecture`** 技能的 Explore 步骤加入 YAGNI 范围筛选。技能不再均匀扫描整个仓库，而是把范围限定在实际改动落点附近：如果你指明一个方向它就采用，否则它读取最近约 20 条 commit 信息，把探索偏向仍在积极开发的路径。没人触碰的代码中的深化机会是一笔你永远不会兑现的重构：杠杆只在你持续编辑的地方生效：所以报告不再整理仓库中沉睡的角落。

### 补丁变更

- [#763](https://github.com/mattpocock/skills/pull/763) [`77d207e`](https://github.com/mattpocock/skills/commit/77d207ef03219cc603e2832e1159cbdd1c91818e) 感谢 [@mattpocock](https://github.com/mattpocock)! - 锐化 `/ask-matt`：路由器现在覆盖阶段边界、两个 wayfinder 误区，以及两个它从未提及的技能。

  **阶段边界。** 一个**阶段（phase）**是 session 内的一块工作：盘问、实施、QA：两者之间的边界就是你要决定如何处置你已经构建的 context 的地方。两点的 `Crossing sessions` 小节被一棵决策树替代，依次承载全部五种选项（**continue**（继续）、`/clear`、`/handoff`、**subagent**（子智能体）、`/compact`），并把推理披露到一份新的 `PHASE-BOUNDARIES.md`。随之有三处修复：

  - **`/handoff` 卖过头了。** 它原本被读成"context 窗口之间的通用桥梁"。它其实很窄：你只在有东西要*搬运*的时候才需要它：新 harness、新目录、同事、或阶段中间分叉出的支线任务。它换来的是便携性。
  - **`/compact` 是默认，而不是首先拿起的选项。** 它在树的底部，位于上面四个更便宜或更精准的选项之后。从那里起步会产生一个 session，它对被摘要压平的一切都自信地错下去。
  - **两个分支完全缺失。** **Continue** 是第一个要排除的：它是唯一一项把对话保留为第一手来源而不是其摘要的移动：而 **subagent** 处理任何范围足够紧凑、可以 AFK 跑的事。

  Context hygiene 的逃生通道现在说 `/compact` 而不是 `/handoff`（同一 harness、同一目录、位于边界处：handoff 那条不适用），smart zone 数字从 ~120k 更新到 ~150k tokens。

  **Wayfinder 路由。** 关于最重、最吃认知的流程，人们最常犯的两个错误：

  - **过度拿它当首选。** 它比一次盘问更慢、更密，所以被打上最重流程的标记，留给真正装不进一次会话的想法：一个范围合适的特性属于 `/grill-with-docs`，而不是这里。
  - **在交接时迷失方向。** 地图清空时，wayfinder 是交接而不是构建：在主流程的 `/to-spec` 处合流（它把地图上的链式决策压缩为可构建的计划），而不是把地图直接循环进 `/implement`。直接到 `/implement` 只适用于最终确实很小的工程。

  **缺失的路由。** `/grilling` 与 `/resolving-merge-conflicts` 在路由器里完全缺席，现已加入；`grill-me` 与 `grill-with-docs` 按你是否在某个工作目录里来分流。

- [#502](https://github.com/mattpocock/skills/pull/502) [`44eed54`](https://github.com/mattpocock/skills/commit/44eed545186ffd0263e8004867750b80cfddd215) 感谢 [@mattpocock](https://github.com/mattpocock)! - 让 `/setup-matt-pocock-skills` 更友好，并把本地 Markdown 跟踪器对齐到当前的规格。

  - **Triage 标签**只有在 `triage` 技能已安装时才会被问到，并且以一道"推荐选是"的问题（"是否保留默认的 triage 标签？"）替代原先的覆盖式追问。当 `triage` 未安装时，这一节：以及 `docs/agents/triage-labels.md`：被略过。
  - **外部 PR 作为请求面**不再是 setup 问题。GitHub/GitLab 模板仍保留这个开关，默认为关；用户可以在之后于 `docs/agents/issue-tracker.md` 中翻转它。
  - **领域文档**默认单 context，不问；只在仓库呈现 monorepo 信号时才提供多 context 选项。
  - **本地 Markdown ticket**现在每张 ticket 一个文件，位于 `.scratch/<feature>/issues/<NN>-<slug>.md`：再也不合并为一张 `tickets.md`。`/to-tickets` 与本地 issue 跟踪器模板现在一致，规格文件为 `spec.md`（而非 `PRD.md`），以与 `/to-spec` 对齐。

  `setup-matt-pocock-skills` 与 `to-tickets` 的文档页已重新同步。

- [#532](https://github.com/mattpocock/skills/pull/532) [`170ad48`](https://github.com/mattpocock/skills/commit/170ad48655825783d0193e850e31a9aac957bb95) 感谢 [@mattpocock](https://github.com/mattpocock)! - 改写 **`grilling`** 以便通用。它的描述和正文不再把访谈范围限定在软件计划上："this plan" → "this"，"enact the plan" → "act on it"，"exploring the codebase" → "exploring the environment"。技巧不变；它现在被读作对任何计划、决策或想法的压力测试。

- [#593](https://github.com/mattpocock/skills/pull/593) [`a4b2009`](https://github.com/mattpocock/skills/commit/a4b2009a1a3ac9575506c10b4c84f08f9bba7a38) 感谢 [@mattpocock](https://github.com/mattpocock)! - 把 **`grilling`** 从"一次一个问题"重塑为"逐轮提问"。它现在绘制决策树，在一轮编号中问出整个**前沿**：所有前提已确定的问题：然后根据用户的回答重算前沿，再问下一轮。13 个问题同样落在约 3 轮而不是 13 轮。环境能答的事实被派给后台子智能体，所以研究不会阻塞一轮：只有依赖某次进行中的探查的问题在等它。session 在前沿为空时结束。

  一轮中的每个问题都以同一固定格式发出：`❓ **Q1** - **<标题>**`，然后是正文（散文或多选），然后是推荐答案独占一行的 `➡️`。一轮读作一份可扫视的编号列表，每条推荐答案在视觉上与问题分离，于是你可以按编号作答而不是把问题原文抄回。

  `grill-me`、`grill-with-docs` 与 `triage` 也按轮运行 frontier：`triage` 的 grill 步骤和 `grilling` 的 Codex `short_description` 现在都明示这一点，而非描述旧的节奏。一次性一个问题的退出方式（你全局 `CLAUDE.md` 中的一行）保持不变。

- [#752](https://github.com/mattpocock/skills/pull/752) [`c66bdee`](https://github.com/mattpocock/skills/commit/c66bdeeee002d81e3f8b21403c07f9a0d7bea6da) 感谢 [@mattpocock](https://github.com/mattpocock)! - 从仓库中移除六个技能。它们都不在 Claude Code 插件中，但都可以通过 [skills.sh](https://skills.sh/mattpocock/skills) 安装（它服务于仓库中的每个技能）：所以这就是该清单上少掉的内容，以及每个技能的归宿。

  四个已退休的技能，每一个都已被一个做得更好的技能吸收：

  - **`ubiquitous-language`** → **`/domain-modeling`**，后者构建并维护整个领域模型，而不是从一次对话里倒出一份词汇表。
  - **`design-an-interface`** → **`/codebase-design`**。毫无损失："设计两次"技巧：并行子智能体产出截然不同的设计，源自 Ousterhout：作为 `DESIGN-IT-TWICE.md` 落入那个技能。
  - **`qa`** → **`/triage`** 与 **`/to-tickets`**。
  - **`request-refactor-plan`** → **`/to-spec`** 与 **`/improve-codebase-architecture`**。

  还有两个从一开始只属于我自己：绑在我自己的机器上，从未打算给别人。`personal/` 桶与它们一起退出：

  - **`edit-article`**
  - **`obsidian-vault`**，它把路径硬编码到我自己那座 Obsidian vault。

  `skills/deprecated/` 作为桶保留，现已为空。`skills/in-progress/` 未变，并被改写为它实际的样子：一个 beta 频道，刻意发布，可以通过 skills.sh 一次装一个技能。

- [#734](https://github.com/mattpocock/skills/pull/734) [`a2f9333`](https://github.com/mattpocock/skills/commit/a2f9333669ff53db762c87ecda5a15442060a3be) 感谢 [@mattpocock](https://github.com/mattpocock)! - 完成 `to-prd` → `to-spec` 重命名："spec" 现在是已发布文本中唯一的术语。

  - **`to-spec`** 不再以"你可能把这文档叫做 PRD"开头：这句括注从该技能和它的文档页中被删除。本地 Markdown 跟踪器模板也删掉了同样的对冲。
  - **`code-review`** 在 frontmatter 描述、它的两轴摘要以及规格来源检索顺序中谈论的是"原始 issue/spec"而非"issue/PRD"。两份 README 重新同步。
  - **GitHub 与 GitLab 跟踪器模板**现在写的是"该仓库的 issue 与 spec 存放在 GitHub/GitLab issues 中"：本地模板更新时它们还停留在"PRD"，因此过时的术语就传入了它们所写入的每个仓库。
  - **`docs/engineering/research.md`** 曾指向 `https://aihero.dev/skills-to-prd`：一个重命名后的死路径；现在它与其他十九份文档页一样，链接到 `to-spec`。

  CHANGELOG 与现有 changeset 仍然在记录重命名本身时使用"PRD"，这是正确的。

## 1.1.0

### 次要变更

- [#406](https://github.com/mattpocock/skills/pull/406) [`930a450`](https://github.com/mattpocock/skills/commit/930a450089f77a49af09001d955db8452a4b867d) 感谢 [@mattpocock](https://github.com/mattpocock)! - 让 **`ask-matt`** 路由器跟上完整技能集。它现在映射了五个之前遗漏的技能：**`tdd`**（作为 `implement` 所驱动的红绿引擎织入主流程）、**`diagnosing-bugs`**（新的"什么东西坏了"入口：之前没有 bug 的路由）、**`domain-modeling`** 与 **`codebase-design`**（新加的"底层词汇"小节）、**`grilling`**（共享的访谈原语）。`prototype` 被充实为独立技能，描述从"用户调用型技能"扩展为"这些技能"。在 `CLAUDE.md` 中加了一条维护规则，以便任何新增/重命名/移除技能或流程变更触发对 `ask-matt` 的复核，与既有的"重新同步文档页"规则并列。

- [#464](https://github.com/mattpocock/skills/pull/464) [`639df6e`](https://github.com/mattpocock/skills/commit/639df6e7386dfddc739b2aecdeff37a876f2483b) 感谢 [@mattpocock](https://github.com/mattpocock)! - 晋升并加固 **`code-review`**。in-progress 中的 **`review`** 被重命名为 **`code-review`** 并从 `in-progress/` 迁入 `engineering/`：它现在随插件发布，列于顶层与 Engineering README（Model-invoked）中，并在 `docs/engineering/code-review.md` 设有文档页。`/implement` 技能及其文档指向 `/code-review`。

  它的 Standards 轴上还获得一项常开的 **Fowler 异味基线**：一份精心挑选的约 12 条高信号"代码异味"（神秘命名、重复代码、依恋情结、数据团、基本类型偏执、重复 switch、霰弹式手术、发散式变化、投机性泛化、消息链、中间人、拒绝遗赠），与仓库文档并列地内联进 `SKILL.md` 作为固定基线，而不是新增的第三轴。两条约束规则保障其安全：仓库已有的规范覆盖基线，以及每条异味都以判断式呈现而非硬性违反。

- [#464](https://github.com/mattpocock/skills/pull/464) [`639df6e`](https://github.com/mattpocock/skills/commit/639df6e7386dfddc739b2aecdeff37a876f2483b) 感谢 [@mattpocock](https://github.com/mattpocock)! - 在两个方向上锐化 **`grilling`**。

  **确认门。** 智能体在你确认已达成共识之前不会执行计划：把该技能既有的"达成共识"完成条件变成一道明确的关停门。`description` 也召募了预训练过的 **`grill`** 引导词（"Grill the user relentlessly"）以锐化触发，文档页重新同步。

  **事实 vs 决策。** grilling 现在把_事实_（查一查：探索代码库）与_决策_（把每一项摆给人类并等待他的回答）拆开。原先那条笼统的话："如果一个问题能通过探索代码库来回答，那就去探索代码库"：是为真人场景写的，但一旦另一个技能在"解决这张 ticket"的框架里跑 grilling，它就同样被读成自主回答_决策_的许可证。把两者分开能避免 grilling 智能体抢着回答自己的问题。

- [#463](https://github.com/mattpocock/skills/pull/463) [`af6d692`](https://github.com/mattpocock/skills/commit/af6d6922c3e2b5288eef155346cbe319e4ed3bd0) 感谢 [@mattpocock](https://github.com/mattpocock)! - 为 **`writing-great-skills`** 新增两个相邻的"引导失灵"模式，都关于你以为是"关掉"的语言仍会引导智能体这件事。**Negation**：那只_大象_：是用禁令做引导：点出_不要做什么_，会把被禁的行为拉进 context 并让它_更_可用（"不要想大象"），所以治法是提示**正向**。**Negative Space**：那片空白：是对"留白做了什么引导"的盲视：一份技能放弃的每一项决策都被委托给智能体的先验而不是保持中立，所以治法是按沉默读一遍草稿，并刻意决定每一处省略（补上，或作为真正的**分支**留着）。两者分两条而非合并：它们携带不同的诊断与不同的治法：每一条都是一份完整的 `GLOSSARY.md` 条目加一条 `SKILL.md` 失败模式要点，与其他失败模式的承载方式一致。

- [`850873c`](https://github.com/mattpocock/skills/commit/850873cd73d5f81826ebf512ad35d2b1e113001f) 感谢 [@mattpocock](https://github.com/mattpocock)! - 把 **`prototype`** 改为模型调用型，让智能体（以及其他技能）可以自主拿起来。描述以引导词 _prototype_：回答设计问题的可丢弃代码：重写，每个分支（状态/逻辑健全性检查，或 UI 探索）配一个触发点。

- [#409](https://github.com/mattpocock/skills/pull/409) [`0d74d01`](https://github.com/mattpocock/skills/commit/0d74d01cbc64ca27778a49b38599f70c534e76a0) 感谢 [@mattpocock](https://github.com/mattpocock)! - 新增 **`research`** 技能：一个小型、模型调用型的技能，启动一个**后台智能体**针对**原始来源**（官方文档、源代码、spec、一手 API）调查一个问题，然后留下一份带引用的 Markdown 文件到仓库保存此类笔记的地方。它是可委托的阅读外勤：你继续工作，它在读；最后拿到一份文档，你可以对它进行盘问、规划或设计。已列入顶层与 Engineering README（Model-invoked），加入 `.claude-plugin/plugin.json`，在 `docs/engineering/research.md` 设有文档页，并在 `ask-matt` 中作为独立路由。

- [#469](https://github.com/mattpocock/skills/pull/469) [`a0329ba`](https://github.com/mattpocock/skills/commit/a0329ba95751f58566ed7ab484475917a68f1629) 感谢 [@mattpocock](https://github.com/mattpocock)! - 将 **`to-issues`** 技能拆成精炼的**流程**与**参考**两节，并教它处理**大型重构**：一项单一的机械变更（例如重命名一列），其**爆炸半径**横跨整个代码库，一次性打破上千处调用点，所以没有哪条纵向切片能落绿。起草步骤现在指向两份并列的参考块：**纵向切片规则**（普通 tracer bullet），以及**大型重构**：按**展开-收缩**（expand–contract）切分（在新形态旁边展开旧形态，按爆炸半径成批迁移调用点，再收缩掉旧形态），使 CI 一批批保持绿：或者当无法保持时，只在最后一条"集成并验证"的 issue 上同时呈现。Issue 正文模板也迁入参考。

- [#464](https://github.com/mattpocock/skills/pull/464) [`386d4ff`](https://github.com/mattpocock/skills/commit/386d4ff719a7c420ad1454232d0436b01f1b8c17) 感谢 [@mattpocock](https://github.com/mattpocock)! - 统一规划类技能。**`to-prd` 重命名为 `to-spec`**："spec" 现在是贯穿全文的术语（它仍以"你可能把这文档叫做 PRD"开头，以利发现）。**`to-plan` 与 `to-issues` 合并为一个 `to-tickets` 技能，`to-issues` 被删除**。

  `to-tickets` 把计划、规格或对话拆成一组**tickets**：tracer-bullet 纵向切片，每条声明其**阻塞边**。这张工件按 `/setup-matt-pocock-skills` 配置的跟踪器分两种读法：**本地文件**（`tickets.md`）把阻塞边写成文本，你手工自顶向下推进；**真实跟踪器**把阻塞边写成原生阻塞链接，于是任何阻塞者已完成的 ticket 都在前沿上，多个智能体可以并行跑。无论哪种媒介，阻塞边都活在 ticket 里：媒介只决定是否真的有人并行执行。

  发布优先使用跟踪器的**原生 sub-issues**表示父 → 切片，**原生阻塞边**表示 `Blocked by`（跟踪器支持时），把 `## Parent` / `## Blocked by` 正文小节留作回退。"What to build" 模板指向 `/prototype` 代码所在的地址，而不是从其中内联片段。

  `ask-matt` 的主流程现在路由 `idea → /to-spec → /to-tickets → /implement`，并在 `docs/engineering/to-spec.md` 与 `docs/engineering/to-tickets.md` 设有面向人类的文档页。

- [#464](https://github.com/mattpocock/skills/pull/464) [`0557d57`](https://github.com/mattpocock/skills/commit/0557d57579d9b3d39839fdaf8d4a6542b17539ce) 感谢 [@mattpocock](https://github.com/mattpocock)! - 把 wayfinder 在文档中的角色定为**情境化入口**，而非新的主入口流程：以 grilling 引领的 _idea → ship_ 链仍是前门（把 wayfinder 立为默认脊柱是 v2 规模的举措，不是 1.1）。**`ask-matt`** 路由器现在点明 wayfinder 的具体触发：一个绿地项目或一项巨大的功能构建，大到一次会话装不下：以及两个 grilling 前门（**`grill-me`**、**`grill-with-docs`**）为"大到装不下一次会话"的工程向上指向 wayfinder，于是入口在读者实际开始的位置可被发现。

- [#464](https://github.com/mattpocock/skills/pull/464) [`639df6e`](https://github.com/mattpocock/skills/commit/639df6e7386dfddc739b2aecdeff37a876f2483b) 感谢 [@mattpocock](https://github.com/mattpocock)! - 毕业并重新框定 **`wayfinder`**：用于规划一项远大于一次 agent 会话能装下的工作的技能。它从 `in-progress/` 迁入 `engineering/`（插件条目、顶层与 Engineering README **User-invoked** 之下的简介、`docs/engineering/wayfinder.md` 中的文档页、以及 `ask-matt` 中的一条路由），作为一项成熟的技能落地。帮助它走到这一步的重命名与重新框定：

  - **`decision-mapping` 重命名为 `wayfinder`**，调用方式 `/wayfinder`。"Decision map" 既行话化又不准确：只有一种 ticket 类型真的是决策。重新框定为"在迷雾般的问题中绘出通路"，给出一组连贯的引导词框：**fog of war**（迷雾）、**frontier**（前沿）、**the map**（地图）：而不是在一个自造术语上再叠一层。
  - **目的地作为引导词。** Wayfinding 寻找通往目的地的*路*；它不冲向构建它。命名目的地是绘出通路的第一步：它固定范围并塑形每一张 ticket：所以地图获得每个 session 都对齐的 `## Destination` 字段，而 triage 在任何 ticket 出现之前就钉下它。
  - **规划，而非执行。** 地图产出**决策，而非交付物**；当构建该事物的人已经无需再做决策时，它就完成了。一项工程可以在其备注中覆盖这一规则。
  - **地图是索引，不是仓库。** 一项决策恰好存在于一个地方：它的 ticket：所以地图只做摘要与链接，从不复述；把迷雾毕业到 ticket 时，把毕业出去的那一片清空，让它不滞留于两处。
  - **默认协作。** 地图从本地 Markdown 文件迁到仓库的 issue 跟踪器上：一张 `wayfinder:map` issue，其 ticket 是它的子 issue：一个团队可以观察的共享 URL。Session 以低分辨率加载地图，按需放大到 ticket。Wayfinder 在 `docs/agents/issue-tracker.md` 中通过指针保持跟踪器无关（GitHub、GitLab、本地 Markdown），`setup-matt-pocock-skills` 埋下 "Wayfinding operations" 那一节。
  - **凭分配认领，而非标签。** 一个 session 通过把 ticket 分配给驱动开发的你来认领：被分配的人_就是_认领人：把标签词汇释放到只剩 `wayfinder:<type>`。
  - **原生阻塞。** 阻塞优先使用跟踪器的原生依赖关系，这会在跟踪器自己的 UI 中可视化地渲染 frontier，于是人能看到哪些是可拿起的，而不必打开地图。GitHub 与 GitLab 模板明列原生写法，并提供正文约定作为回退。
  - **迷雾 vs 范围外，拆开。** 两个命名直白的地图小节：`## Not yet specified`（范围内但仍在迷雾中的，随前沿推进毕业）与 `## Out of scope`（已被划在目的地之外的工作，已关闭，永不毕业）：于是超出目的地的工作不再被读作可领取的前沿。
  - **第四种 `task` ticket 类型。** 用于阻塞决策的字面手工工作（开通访问、迁移数据、注册服务）：_执行_而非_决策_的那一种，凭解锁一项决策而获得一席之地。
  - **HITL / AFK ticket 分类。** 每种 ticket 类型都是 **HITL**（人在回路：grilling、prototype）或 **AFK**（智能体单独：research；task 两种都是）。HITL ticket 只能通过现场交互解决，所以"等待人类"自然落到标签上：一个自己回答自己问题的 grilling 智能体，按定义，已破坏了 HITL。（这修复了学员反馈的 `/wayfinder` 自己盘问_自己_而非盘问人类。）
  - **无迷雾早退出恢复。** 如果开场广度优先的 grilling 没浮出迷雾，说明工作小到可以在一次会话内完成：它就此停下，询问你希望如何推进，而不是造一张谁都不需要的地图。

### 补丁变更

- [#464](https://github.com/mattpocock/skills/pull/464) [`639df6e`](https://github.com/mattpocock/skills/commit/639df6e7386dfddc739b2aecdeff37a876f2483b) 感谢 [@mattpocock](https://github.com/mattpocock)! - 把 **`tdd`** 重塑为"仅作参考"的技能，并补齐一项缺失的反模式。

  **仅作参考。** 红 → 绿 → 重构的循环由模型已经掌握的引导词锚定，原本的"Workflow"小节基本是在复述循环本身。删除 Workflow 与每周期清单；把其中一条耐用的思想：纵向切片 / 追踪子弹：并入 Anti-patterns 小节与一份简短的 Rules-of-the-loop 清单。引入 **seam** 作为"测试落在何处"的引导词：只在事先约定的 seam 处写测试，且必须在写测试前与用户确认。同时删去"重构"阶段：TDD 现在就是红 → 绿；重构属于 review 阶段，所以重构规则与 `refactoring.md` 一并迁出（归宿是 `code-review`）。

  **同义反复的测试。** 新增"同义反复测试"反模式：断言按与代码相同方式重算的测试，由构造上必通过、零信心：区别于既有"实现耦合"反模式。新增位置与其他反模式一致：Philosophy 中一条原则（期望值必须来自独立的事实来源）、清单中一道门、`tests.md` 中一组 BAD/GOOD 对照。

- [`e00eadb`](https://github.com/mattpocock/skills/commit/e00eadb4bb32c3d5a631ead1a5ed5d6a7c5f74e2) 感谢 [@mattpocock](https://github.com/mattpocock)! - 扩展 **`triage`** 技能以分诊外部 PR，把 PR 视为一份附带代码、按相同角色与状态机运行的 issue。PR 与 issue 内联流转（由每仓库 setup 开关控制），发现阶段仅展示外部 PR，原本仅针对 bug 的"reproduce"步骤被泛化为统一的"verify the claim"步骤，并由冗余检查将已实现的请求归为 `wontfix`，避免污染"out-of-scope"知识库。`setup-matt-pocock-skills` 新增"PRs-as-a-request-surface"开关，针对 GitHub/GitLab。

- [#472](https://github.com/mattpocock/skills/pull/472) [`d869d45`](https://github.com/mattpocock/skills/commit/d869d45afc32beab1c2d1350f8de5e81589512cd) 感谢 [@mattpocock](https://github.com/mattpocock)! - 修复 **`wayfinder`** 硬编码 issue 跟踪器文档路径的问题：这破坏了其他技能所依赖的间接寻址。

  `to-issues`、`to-prd` 与 `triage` 从不指定路径：它们通过 `setup-matt-pocock-skills` 写入 `CLAUDE.md`/`AGENTS.md` 的 `### Issue tracker` 区块解析跟踪器，该区块指向跟踪器文档的实际存放处。Wayfinder 反倒钉死了字面量 `docs/agents/issue-tracker.md`，因此在将智能体文档放在别处的仓库里，它会静默回退到本地 Markdown 跟踪器：即便该仓库的 `CLAUDE.md` 明确声明使用 GitHub issues。它现在改为通过同一指针解析文档，并按名称读取其中的"Wayfinding operations"小节，让整套技能的间接寻址保持一致。

## 1.0.1

### 补丁变更

- [`d20ee26`](https://github.com/mattpocock/skills/commit/d20ee2684e2a9442698ac3c1e0f2c5b68c4cf296) 感谢 [@mattpocock](https://github.com/mattpocock)! - 把 **`teach`** 技能改为"先复用"模式。课程现在基于 `./assets/` 中可复用的**组件**构建：样式表、测验小组件、模拟器、图表助手。复用是默认：智能体在编写课程前先读 `./assets/`，基于已有内容构建，并把任何新的、可复用的部分抽成组件，而不是内联进课程。

## 1.0.0

### 主要变更

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) 感谢 [@mattpocock](https://github.com/mattpocock)! - 新增 **`ask-matt`** 技能：一个用户调用型路由器，为你的情境指向合适的技能或流程。

  **破坏性变更：** `ask-matt` 路由覆盖本仓库中其他用户调用型技能，因此它期望这些技能已被安装。

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) 感谢 [@mattpocock](https://github.com/mattpocock)! - 新增共享的设计技能，并将既有技能重新挂接其上。

  - 新增 **`codebase-design`** 技能：深层模块的词汇（module、interface、depth、seam、adapter）以及"在小接口背后堆叠大量行为"的原则。此前散落在 `improve-codebase-architecture/LANGUAGE.md` 中的措辞现统一于此，供跨技能复用。
  - 新增 **`domain-modeling`** 技能：主动构建并打磨项目的领域模型，对照词汇表压力测试各术语，并保持 `CONTEXT.md` 与 ADR 的最新状态。
  - `improve-codebase-architecture` 现在从 `/codebase-design` 取得架构词汇，从 `/domain-modeling` 取得领域模型。
  - `tdd` 现在依赖 `/codebase-design` 提供接口设计指引：其内联的 `deep-modules.md` / `interface-design.md` 笔记已删除，改由共享技能承载。
  - `grill-with-docs` 现在通过 `/domain-modeling` 内联构建领域模型。

  **破坏性变更：** 这些技能现在依赖新增的 `codebase-design` / `domain-modeling` 技能，因此你必须一并安装。

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) 感谢 [@mattpocock](https://github.com/mattpocock)! - 移除 **`caveman`** 与 **`zoom-out`** 技能。

  - `caveman` 是我在测的另一个技能的副本，本就无意公开发布。
  - `zoom-out` 实际中无人使用，已从仓库移除。

  **破坏性变更：** 两个技能均已移除。

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) 感谢 [@mattpocock](https://github.com/mattpocock)! - 将 **`diagnose`** 技能重命名为 **`diagnosing-bugs`**。

  **破坏性变更：** 调用方式为 `/diagnosing-bugs`：旧的 `/diagnose` 名称不再存在。

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) 感谢 [@mattpocock](https://github.com/mattpocock)! - 用 **`writing-great-skills`** 替换 **`write-a-skill`**。

  - 删除 `write-a-skill`。
  - 新增 `writing-great-skills`（及其 `GLOSSARY.md`）：一份关于如何写好/改好技能的参考：让技能可预测的词汇与原则，逐句排查修。
  - 暴露 `grilling` 为模型调用型技能：`grill-me` 与 `grill-with-docs` 背后可复用的访谈循环。

  **破坏性变更：** `write-a-skill` 已移除；请改用 `writing-great-skills`。

### 次要变更

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) 感谢 [@mattpocock](https://github.com/mattpocock)! - 新增 **`resolving-merge-conflicts`** 技能：用于解决进行中的 git merge 或 rebase 冲突的循环。独立可用，不依赖其他技能。

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) 感谢 [@mattpocock](https://github.com/mattpocock)! - 将技能分类法从 **Commands / Skills** 更名为 **User-invoked / Model-invoked**，跨文档生效，并新增 `docs/invocation.md` 厘清这一划分：用户调用型技能只有在被你显式敲出时才可达，专用于编排；模型调用型技能当任务契合时也会被自动触发。用户调用型技能可以调用模型调用型技能，但绝不调用另一个用户调用型技能。

### 补丁变更

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) 感谢 [@mattpocock](https://github.com/mattpocock)! - 收紧 **`review`** 技能：fail-fast 的 ref 检查、单一来源的规则、以及 no-op 修剪。
