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

  - 从 `agents/openai.yaml` 中移除 `policy.allow_implicit_invocation: false`。Codex 会据此把该技能从模型可见技能列表中筛掉，导致描述无法触发它——只有显式 `$writing-for-agents` 才生效。
  - 更新过期的 `interface.display_name` 与 `interface.short_description`，二者仍沿用旧的 `writing-great-skills` 名称。
  - 在 `README.md` 与 `skills/productivity/README.md` 中将该技能从 **User-invoked**（用户调用）列表移至 **Model-invoked**（模型调用）列表。

## 1.2.0

### 次要变更

- [#551](https://github.com/mattpocock/skills/pull/551) [`697d4ce`](https://github.com/mattpocock/skills/commit/697d4ce9742da558fd1ba6697c8e9775e2e302dd) 感谢 [@mattpocock](https://github.com/mattpocock)! - 在每个技能的 Claude Code frontmatter 之外补齐 Codex 元数据，使整套技能无需生成额外副本即可在两个 harness 上工作。

  - 在每个 `SKILL.md` 旁新增 `agents/openai.yaml`，提供 Codex UI 元数据（`interface.display_name`、`interface.short_description`）。
  - 为所有用户调用型技能标记 `policy.allow_implicit_invocation: false`，这是 Codex 中对应 `disable-model-invocation: true` 的开关；Codex 据此排除隐式调用，而显式 `$skill` 调用照常工作。
  - 在 `.agents/invocation.md`、`CLAUDE.md` 以及晋升桶 README 中记录双 harness 调用模型。
  - 新增 `AGENTS.md` 作为 `CLAUDE.md` 的符号链接，让 Codex 读取同一份仓库说明。

- [#593](https://github.com/mattpocock/skills/pull/593) [`0f2bdbd`](https://github.com/mattpocock/skills/commit/0f2bdbdb06220d2df3718b8f0483157c6c8a8600) 感谢 [@mattpocock](https://github.com/mattpocock)! - 将 **`to-questionnaire`** 从 `in-progress/` 毕业至 **Productivity** 桶，正式随插件发布。它把"你独自答不上来的决定"转化为一份 Markdown 问卷，发给唯一能答的那个人——异步填写或在会议中一起过完。

  它的标志性手法是拷问**发送对象**，而非主题本身：常规的 grilling 会盘问主题，而这恰恰是你在此答不上来的；因此它只问"问卷发给谁"以及"你需要对方回什么"，再把所有问题对准两者之间的鸿沟。

  现在作为晋升技能接入：插件条目、顶层与 Productivity README 中加入 **User-invoked**，文档页 `docs/productivity/to-questionnaire.md`，并在 `ask-matt` 中设为 Standalone 路由——定位为 `/grill-me` 的反向操作（盘问他人，而非自己）。

- [#680](https://github.com/mattpocock/skills/pull/680) [`b3376f8`](https://github.com/mattpocock/skills/commit/b3376f8d39848dd08572ec2667da4739a67c8c04) 感谢 [@mattpocock](https://github.com/mattpocock)! - 将 **`wizard`** 从 `in-progress/` 毕业至 **Engineering** 桶，正式随插件发布，并改为模型调用型。它生成一个交互式 bash 脚本，引导人类完成一项手动流程——第三方账号开通、一次性迁移、A→B 状态切换——自动打开每个 URL、提示点击位置、采集值，并写入 `.env` 文件与 GitHub Actions secrets。

  良好体验由自带的 `template.sh` 预先解决（带剩余时间的进度、确认门、含 WSL 的跨平台 URL 打开、隐蔽的密钥输入、幂等的 `.env` upsert、带降级处理的 `gh secret`/`gh variable` 写入、收尾的跳过汇总）。`STAGES` 标记以上的内容是固定库，绝不手改——该技能的工作只是界定流程范围并撰写其 **stages**。

  归入 Engineering 而非 Productivity 的原因：它会读取 `.env*`、`docker-compose*`、框架配置以及 `.github/workflows/` 中所有 `secrets.*`/`vars.*` 引用来自我界定范围，写入 CI secrets，并用 `bash -n` 与 `shellcheck` 校验输出。

  改为模型调用型后，智能体在遇到只有人类能执行的步骤时即可立刻调用它，而不再把编号步骤甩到聊天里等你照做。手动输入 `/wizard` 行为不变——模型调用只会**增加**智能体的触达范围。描述以"何时触发"的指针形式书写：它产出的内容、四条触发分支（基础设施预置、配置凭据或 CI secrets、引导陌生的第三方控制台、一次性迁移或切换）、以及一条明确的非触发——不要在智能体能自己完成的步骤上调用它。智能体能做的，就该让智能体做；wizard 留给那些你不愿交给智能体的点击、授权与控制台操作。写入前对阶段列表的确认，现在在中途触发时也作为提案使用。

  现在作为晋升技能接入：插件条目、顶层与 Engineering README 中加入 **Model-invoked**，文档页 `docs/engineering/wizard.md`，并在 `ask-matt` 中为"只有人类能完成的步骤"设立 Standalone 路由。模型调用还使它免受 [#693](https://github.com/mattpocock/skills/issues/693) 影响——后者将用户调用型技能从 Claude 桌面与 Web 界面清单中移除。

- [#763](https://github.com/mattpocock/skills/pull/763) [`77d207e`](https://github.com/mattpocock/skills/commit/77d207ef03219cc603e2832e1159cbdd1c91818e) 感谢 [@mattpocock](https://github.com/mattpocock)! - 用两个理念重塑 **`prototype`** 技能：演示稿是**一份可分享的 HTML 文件**，原型本身是**第一手来源**。

  逻辑分支现在产出一个自包含文件（纯 HTML/CSS/JS，无构建、无服务器），而非终端应用——非开发者双击即可打开，并用自己的领域语言驱动它：一个带标签的状态面板、常驻的自由操作按钮，以及一组标签页式的**引导式走查**，每个走查是一个场景，下方列出应按顺序点击的按钮。可移植的纯逻辑模块仍可提入正式代码；HTML 外壳是"用完即弃"的。

  "用完即弃"不再意味着删除。原型不再在回答完问题后即被删除，而是作为可运行证据留在一条 `prototype/<name>` 分支（基于 main），并在实施 issue 上留下指向它的上下文指针——main 只保留已验证的决策，探索过程仍可找回。最终答案（结论 + 问题）依然以 issue/ADR/提交的形式被持久保存。

- [#536](https://github.com/mattpocock/skills/pull/536) [`42a5b70`](https://github.com/mattpocock/skills/commit/42a5b70fcacc7baff1977b13f3919fb2f63af14e) 感谢 [@mattpocock](https://github.com/mattpocock)! - 将整套技能作为原生 **Claude Code 插件**发布，列入 Claude Code 官方市场。现在你可以以托管、只读的方式订阅晋升技能，而无需复制可编辑文件：

  ```bash
  claude plugins install mattpocock-skills
  ```

  或者在会话内执行：

  ```
  /plugin install mattpocock-skills
  ```

  无需先添加市场——官方市场默认即已配置。

  `.claude-plugin/plugin.json` 承载完整的插件元数据（版本、描述、作者、许可证、关键词）以及显式的晋升技能清单。`skills.sh` 仍是通用安装器（目前也是 Codex 与其他 harness 的安装路径）；原生 Codex 插件暂缓——原因见 `.agents/adr/0002-ship-as-a-claude-code-plugin.md`。

- [#751](https://github.com/mattpocock/skills/pull/751) [`355fa74`](https://github.com/mattpocock/skills/commit/355fa7420b418af838998f7ec4365ceda1c8dfcc) 感谢 [@mattpocock](https://github.com/mattpocock)! - 新增 **`wait-what`**——一个用于纠正模型啰嗦的"单词级"指令。在一条消息没说清楚的瞬间输入它，智能体会重述一遍：补一点上下文，采用 ASD-STE100 简化技术英语，并使用你的 `CONTEXT.md` 中的通用语言。用户调用型，三行长度。

  机制藏在名字里。精简类技能往往因膨胀而失败——一个 400 行的技能照样让模型啰嗦——所以这个技能只用一个精确的"先行词"，别无其他。描述"输出"的命名（`/tldr`、`/no-fluff`）只会让模型删字而让你更迷失；命名"听者所处状态"则会一次性要齐两半——更少的字**加上**你之前缺失的上下文。它还复用了全局 `CLAUDE.md` 中已有的先行词，让该技能、`CLAUDE.md` 与每一份 `CONTEXT.md` 都共享同一套触发词。

  它只修复一条消息，不阻止下一条。根治术语滥用需要先用 `/grill-with-docs` 构建共享语言；在那之前，这就是你的应急手段。

- [#763](https://github.com/mattpocock/skills/pull/763) [`77d207e`](https://github.com/mattpocock/skills/commit/77d207ef03219cc603e2832e1159cbdd1c91818e) 感谢 [@mattpocock](https://github.com/mattpocock)! - 把 `/wayfinder` 的基本单元命名为**决策 ticket（决策票）**，并用子智能体并行消化研究票。

  之前人们总是把 wayfinder 的 ticket 误读为普通的"实施票"——一段等待执行的工作切片——但 wayfinder 用的是**决策票**：结论即决策的问题。现在技能描述与开头一行引入这一术语（并说明判定标准），`ask-matt`/engineering README 简介以及文档页同步跟进；在术语确立之后，"ticket"仍是日常用语。`CONTEXT.md` 把 **Decision ticket** 记为领域术语，原先"avoid: ticket"的指引也不再与 wayfinder 对该词的有意使用相冲突。

  研究票不再为单独启动的会话而搁置。研究仍然是真实的 ticket 类型——它是下游决策依赖的真正共享阻塞——而这种依赖正是 frontier 阻塞边存在的意义。改变的是它的消化方式：研究是 AFK 的，绘图工作不会停下来等它读完。创建 ticket 之后，绘图会话对每张研究票发起一个 `/research` 子智能体并行消化，把结论落到一条用完即弃的 `research/<name>` 分支并附上上下文指针。研究票是"一票一会话"的唯一例外。

- [#763](https://github.com/mattpocock/skills/pull/763) [`77d207e`](https://github.com/mattpocock/skills/commit/77d207ef03219cc603e2832e1159cbdd1c91818e) 感谢 [@mattpocock](https://github.com/mattpocock)! - **破坏性变更：** 将 **`writing-great-skills`** 重命名为 **`writing-for-agents`**，重构其结构，并加入新的先行词。

  参考范围现在覆盖智能体所读取的任何文档——技能、`AGENTS.md`/`CLAUDE.md`、通过指针访问的文档——而不只是技能。`GLOSSARY.md` 并入 `SKILL.md`（每个术语只保留一份权威阐述；`_Avoid_` 同义词列表与独立的"可预测性"定义被移除）；技能专属机制（frontmatter、模型调用 vs 用户调用、路由型技能、调用分割的切分）转入新文件 `SKILL-MECHANICS.md`。该技能现在改为**模型调用型**：在创建或编辑技能，或修改 `AGENTS.md`/`CLAUDE.md` 时触发。`ask-matt` 的指针已更新。请用新名重新安装；旧名已彻底移除（无别名）。

  精简章节新增 **cache**。"单一事实来源"现在延伸到文档之外的环境——`package.json` 脚本、配置文件、目录布局、`--help` 输出本身都是权威的，所以重述它们的文档只是对"查找"动作的缓存，只有当查找成本很高时才值得加载。正面目标：缓存那些智能体靠"看"找不到的东西（未成文的约定、决策背后的理由、配置文件中不透露的坑），而把"一文件、一命令"就能查到的留给环境本身——那里才不会过期。

- [#533](https://github.com/mattpocock/skills/pull/533) [`45afd80`](https://github.com/mattpocock/skills/commit/45afd8074a8b7de5fe073845d080fa9dd6c429fa) 感谢 [@mattpocock](https://github.com/mattpocock)! - 在 **`improve-codebase-architecture`** 技能的 Explore 步骤中加入 YAGNI 范围过滤器。它不再均匀扫描整个仓库，而是把范围聚焦在实际发生变更的位置：如果你指明方向，它就照那个方向走；否则它读取最近约 20 条提交信息，把探索倾向"近期仍在改动"的路径。一条发生在无人触碰的代码中的纵深机会，是一笔永远兑现不了的改造——杠杆只在你持续修改的地方生效——所以报告不再去收拾仓库的沉睡角落。

### 补丁变更

- [#763](https://github.com/mattpocock/skills/pull/763) [`77d207e`](https://github.com/mattpocock/skills/commit/77d207ef03219cc603e2832e1159cbdd1c91818e) 感谢 [@mattpocock](https://github.com/mattpocock)! - 锐化 `/ask-matt`——路由现在覆盖阶段边界、两种常见的 wayfinder 误用，以及此前从未提及的两个技能。

  **阶段边界。** **阶段**是会话内的一段工作——grilling、实施、QA——两个阶段之间的边界正是你决定如何处置已建立上下文的位置。原本两行的 `Crossing sessions` 小节被一棵决策树取代，按顺序列出全部五种选项（**continue**、 `/clear`、 `/handoff`、**subagent**、 `/compact`），推理依据在新文件 `PHASE-BOUNDARIES.md` 中披露。伴随三项修正：

  - **`/handoff` 被过度包装。** 此前读起来像跨上下文窗口的通用桥梁。它其实很窄：只有当某件事必须"移动"——新的 harness、新的目录、同事、或阶段中分叉出的支线任务——时才需要。它换来的是可移植性。
  - **`/compact` 是默认选项，而非首选。** 它位于决策树最底部，前面是四个更便宜或更精准的判断。从它起步，会得到一个"自信地错在被摘要压平的任何事情上"的会话。
  - **两条分支此前完全缺失。** **Continue** 是首先要排除的——它是唯一让对话本身（而非其摘要）保留为第一手来源的选项——而**子智能体**处理任何边界足够清晰、可 AFK 运行的任务。

  上下文卫生的"应急出口"由 `/handoff` 改为 `/compact`（同一 harness、同一目录、且在阶段边界——handoff 条款并不适用），"舒适区"阈值由约 12 万 token 更新到约 15 万 token。

  **Wayfinder 路由。** 人们在最重、认知密度最高的流程上最常犯的两个错误：

  - **伸手过度。** 它比单次 grill 更慢、更密，所以被标注为最重的流程，仅留作"真的塞不进一个会话"的设想——边界清晰的功能该走 `/grill-with-docs`，而非此处。
  - **在交接处迷路。** 地图清晰之后，wayfinder 是交接，不是构建：合流回主流程的入口是 `/to-spec`（它把地图中串联的决策折叠为一份可构建的计划），而非把地图直接喂给 `/implement`。只有当工作最终确实很小时，才允许直接走 `/implement`。

  **缺失的路由。** `/grilling` 与 `/resolving-merge-conflicts` 完全缺席路由表，现已加入；`grill-me` 与 `grill-with-docs` 按"是否处于工作目录内"区分。

- [#502](https://github.com/mattpocock/skills/pull/502) [`44eed54`](https://github.com/mattpocock/skills/commit/44eed545186ffd0263e8004867750b80cfddd215) 感谢 [@mattpocock](https://github.com/mattpocock)! - 让 `/setup-matt-pocock-skills` 更友好，并将本地 Markdown 跟踪器与现行规范对齐。

  - **分诊标签**仅在 `triage` 技能已安装时才被询问，并且仅以一道建议"是"的问题（"保留默认的分诊标签？"）呈现，而非反问式追问。当 `triage` 未安装时，本节——以及 `docs/agents/triage-labels.md`——会被跳过。
  - **外部 PR 作为请求面**不再是 setup 提问。GitHub/GitLab 模板仍保留该开关，默认关闭；用户后续可在 `docs/agents/issue-tracker.md` 中自行切换。
  - **领域文档**默认单 context 而不再询问；仅当仓库呈现 monorepo 信号时才提供多 context 选项。
  - **本地 Markdown 票**改为每票一个文件，位于 `.scratch/<feature>/issues/<NN>-<slug>.md`——不再合并为单一的 `tickets.md`。`/to-tickets` 与本地 issue 跟踪器模板现在一致，规范文件名为 `spec.md`（而非 `PRD.md`），以匹配 `/to-spec`。

  `setup-matt-pocock-skills` 与 `to-tickets` 的文档页已重新对齐。

- [#532](https://github.com/mattpocock/skills/pull/532) [`170ad48`](https://github.com/mattpocock/skills/commit/170ad48655825783d0193e850e31a9aac957bb95) 感谢 [@mattpocock](https://github.com/mattpocock)! - 重写 **`grilling`** 以面向通用场景。其描述与正文不再把访谈限定于软件方案："this plan" → "this"，"enact the plan" → "act on it"，"exploring the codebase" → "exploring the environment"。技法未变；现在它读起来是对任何方案、决策或想法的压测。

- [#593](https://github.com/mattpocock/skills/pull/593) [`a4b2009`](https://github.com/mattpocock/skills/commit/a4b2009a1a3ac9575506c10b4c84f08f9bba7a38) 感谢 [@mattpocock](https://github.com/mattpocock)! - 将 **`grilling`** 从"一次一问"重构为"一轮多问"。它现在绘制决策树，把整个 **frontier**——每个前置条件已满足的问题——放进同一编号轮次问出；再根据你的回答重算 frontier，进入下一轮。原本 13 个问题铺成 13 轮，现在压缩到约 3 轮。能由环境回答的事实被分派给后台子智能体，研究不再阻塞轮次：只有下游仍依赖某项正在进行的探索的问题才等它。frontier 为空时，会话结束。

  每轮中的每个问题以统一形态呈现——`❓ **Q1** - **<title>**`，正文（散文或多选），再把推荐意见单独放在 `➡️` 行上。一轮读起来就是一份可扫读的编号列表，推荐意见与问题视觉分离，让你按编号作答，而不必回引原问题。

  `grill-me`、`grill-with-docs` 与 `triage` 也改为按轮次跑 frontier——`triage` 的 grill 步骤与 `grilling` 的 Codex `short_description` 现在都如此表述，不再描述旧的节奏。"一次一问"的退出开关（写在全局 `CLAUDE.md` 中的一行）保持不变。

- [#752](https://github.com/mattpocock/skills/pull/752) [`c66bdee`](https://github.com/mattpocock/skills/commit/c66bdeeee002d81e3f8b21403c07f9a0d7bea6da) 感谢 [@mattpocock](https://github.com/mattpocock)! - 从仓库中移除六个技能。它们都不在 Claude Code 插件中，但全部都能通过 [skills.sh](https://skills.sh/mattpocock/skills) 安装——skills.sh 会呈现仓库中的每一个技能——因此这正是该清单所移除的内容，以及每个技能的归宿。

  四个退役技能，各自已被一个做得更好的技能吸收：

  - **`ubiquitous-language`** → **`/domain-modeling`**，后者构建并维护整个领域模型，而非仅从一次会话中倾倒一份词汇表。
  - **`design-an-interface`** → **`/codebase-design`**。毫无损失：源自 Ousterhout 的"两次设计"技巧——并行子智能体生成截然不同的方案——已作为 `DESIGN-IT-TWICE.md` 内置在该技能中。
  - **`qa`** → **`/triage`** 与 **`/to-tickets`**。
  - **`request-refactor-plan`** → **`/to-spec`** 与 **`/improve-codebase-architecture`**。

  还有两个仅属于我自己——绑定在我自己的机器上、从未打算给其他人用。`personal/` 桶随之移除：

  - **`edit-article`**
  - **`obsidian-vault`**，它硬编码了我自己的 Obsidian vault 路径。

  `skills/deprecated/` 作为桶保留，现已清空。`skills/in-progress/` 不变，现在按它真实的样子描述：一个测试渠道，故意发布，可通过 skills.sh 一次安装一个技能。

- [#734](https://github.com/mattpocock/skills/pull/734) [`a2f9333`](https://github.com/mattpocock/skills/commit/a2f9333669ff53db762c87ecda5a15442060a3be) 感谢 [@mattpocock](https://github.com/mattpocock)! - 完成 `to-prd` → `to-spec` 重命名的收尾："spec"现在是发布文案中唯一的用词。

  - **`to-spec`** 不再以"you may know this document as a PRD"开头——该括注从技能及其文档页中删除。本地 Markdown 跟踪器模板也去掉同样那句。
  - **`code-review`** 在 frontmatter 描述、两轴摘要与"规范来源"的搜索顺序中，均改为使用"发起 issue/spec"而非"issue/PRD"。两份 README 已重新对齐。
  - **GitHub 与 GitLab 跟踪器模板**现在表述为"Issues and specs for this repo live as GitHub/GitLab issues"——它们此前仍沿用"PRDs"，而本地模板已经更新，过时的措辞随着这些模板被写入每个仓库而扩散开。
  - **`docs/engineering/research.md`** 曾指向 `https://aihero.dev/skills-to-prd`——这是一条因技能改名而失效的旧链接；现在与其他十九份文档页一样链接到 `to-spec`。

  本 CHANGELOG 与现有 changesets 在记录重命名本身时仍沿用"PRDs"，这是正确的。

## 1.1.0

### 次要变更

- [#406](https://github.com/mattpocock/skills/pull/406) [`930a450`](https://github.com/mattpocock/skills/commit/930a450089f77a49af09001d955db8452a4b867d) 感谢 [@mattpocock](https://github.com/mattpocock)! - 让 **`ask-matt`** 路由对齐完整技能集。它现在补齐了五个此前缺失的技能： **`tdd`**（编入主流程，作为 `implement` 驱动的红绿引擎）、**`diagnosing-bugs`**（新增"出了点问题"的入口——此前没有处理 bug 的路由）、**`domain-modeling`** 与 **`codebase-design`**（新增"底层词汇"小节）、以及 **`grilling`**（共享的访谈原语）。`prototype` 被充实为 Standalone，描述从"用户调用型技能"放宽为"所有技能"。`CLAUDE.md` 增加了一条维护规则：今后任何新增/重命名/移除技能或调整流程，都要触发对 `ask-matt` 的复检，与既有的"文档页重新对齐"规则并列。

- [#464](https://github.com/mattpocock/skills/pull/464) [`639df6e`](https://github.com/mattpocock/skills/commit/639df6e7386dfddc739b2aecdeff37a876f2483b) 感谢 [@mattpocock](https://github.com/mattpocock)! - 晋升并加固 **`code-review`**。in-progress 的 **`review`** 技能被重命名为 **`code-review`**，并从 `in-progress/` 移入 `engineering/`：它现在随插件发布，列入顶层与 Engineering README（Model-invoked），并在 `docs/engineering/code-review.md` 中拥有文档页。`/implement` 技能与文档均指向 `/code-review`。

  它还在 Standards 轴上引入始终在线的 **Fowler 异味基线**——一份精选的约 12 项高信号"代码异味"（神秘命名、重复代码、依恋情结、数据泥团、基本类型偏执、重复 switch、霰弹式手术、异曲同工的修改、投机性的通用性、消息链、中间人、拒绝继承）——作为仓库文档之外的固定基线直接写入 `SKILL.md`，而非新增第三轴。两条强约束保证安全：仓库已有的明文标准覆盖基线；任何异味仅作为判断意见上报，不当作硬性违规。

- [#464](https://github.com/mattpocock/skills/pull/464) [`639df6e`](https://github.com/mattpocock/skills/commit/639df6e7386dfddc739b2aecdeff37a876f2483b) 感谢 [@mattpocock](https://github.com/mattpocock)! - 在两个维度上锐化 **`grilling`**。

  **确认门。** 智能体在确认"共识已达成"之前不会执行方案——把既有的"共识"完成标准变成显式的停止门。`description` 还吸纳了预训练过的 **`grill`** 先行词（"Grill the user relentlessly"）以锐化调用，文档页已重新对齐。

  **事实 vs 决策。** Grilling 现在把 _事实_（查一下——探索代码库）与 _决策（（逐条交给人类，等待回答）分开。原本那条笼统的话——"如果某个问题可以通过探索代码库来回答，就改为探索代码库"——是按"人类在场"场景写的；可一旦其他技能在"求解 ticket"的框架内调用 grilling，它就读起来像是连 _决策（都可以自主作答。把两者分开，能防止 grilling 智能体一路抢答。

- [#463](https://github.com/mattpocock/skills/pull/463) [`af6d692`](https://github.com/mattpocock/skills/commit/af6d6922c3e2b5288eef155346cbe319e4ed3bd0) 感谢 [@mattpocock](https://github.com/mattpocock)! - 在 **`writing-great-skills`** 中新增两条紧邻的"引导失控"失败模式，都都关于"你以为关闭"的语言其实仍在引导智能体。**Negation**——_大象_——即"以禁令形式引导"：点名说"不要做什么"，会把被禁止的行为拖入上下文，使其_更_可被调用，而非更少（_don't think of an elephant_），解药是提示**正向**内容。**Negative Space**——虚空——即对"省略内容所产生的引导"失明：技能拒绝做的每一项决定都被下放给智能体的先验，而非保持中立；解药是逐段阅读草稿的"沉默"，并对每一处省略做有意识的决定（补上，或作为真正的**分支**留空）。保留为两条独立条目，而非合并——它们的诊断与解药不同——每条对应一份完整的 `GLOSSARY.md` 条目加一条 `SKILL.md` 失败模式小节，沿用其他失败模式的承载方式。

- [`850873c`](https://github.com/mattpocock/skills/commit/850873cd73d5f81826ebf512ad35d2b1e113001f) 感谢 [@mattpocock](https://github.com/mattpocock)! - 将 **`prototype`** 技能改为模型调用型，让智能体可以自主触达（其他技能也能）。其描述围绕先行词 _prototype_——用来回答设计问题的、用完即弃的代码——重写，每个分支配一个触发条件（状态/逻辑合理性校验，或 UI 探索）。

- [#409](https://github.com/mattpocock/skills/pull/409) [`0d74d01`](https://github.com/mattpocock/skills/commit/0d74d01cbc64ca27778a49b38599f70c534e76a0) 感谢 [@mattpocock](https://github.com/mattpocock)! - 新增 **`research`** 技能——一项小型、模型调用型的技能，它启动一个**后台智能体**，针对某个问题查阅**第一手资料**（官方文档、源码、规范、第一方 API），最终在仓库记录此类笔记的位置留下一份带引用的 Markdown 文件。它是可委托的阅读苦力：你继续工作，它在读，最终拿到一份可被 grill、可据以规划或设计的文档。已列入顶层与 Engineering README（Model-invoked），加入 `.claude-plugin/plugin.json`，获得文档页 `docs/engineering/research.md`，并在 `ask-matt` 中设为 Standalone 路由。

- [#469](https://github.com/mattpocock/skills/pull/469) [`a0329ba`](https://github.com/mattpocock/skills/commit/a0329ba95751f58566ed7ab484475917a68f1629) 感谢 [@mattpocock](https://github.com/mattpocock)! - 将 **`to-issues`** 技能拆分为精简的**流程**与**参考**两部分，并教会它处理**大范围重构**——一项单一的机械式变更（例如重命名一列），其**爆炸半径**横扫整个代码库，一次性击穿上千个调用点，因此任何纵向切片都无法整片落地。起草步骤现在指向两块并列的参考内容：普通追踪子弹对应的 **Vertical slice rules**，以及按 **expand–contract** 切片大范围重构的 **Wide refactors**（新旧形式并存、按爆炸半径分批迁移调用点、再收缩旧形式），保证 CI 逐批保持绿色——若实在无法保持，则仅在最终的"整合与验证"issue 上保持。issue 正文模板也移入参考部分。

- [#464](https://github.com/mattpocock/skills/pull/464) [`386d4ff`](https://github.com/mattpocock/skills/commit/386d4ff719a7c420ad1454232d0436b01f1b8c17) 感谢 [@mattpocock](https://github.com/mattpocock)! - 统一规划类技能。**`to-prd` 被重命名为 `to-spec`**——"spec"成为贯穿始终的唯一用词（出于可发现性，仍以"you may know this document as a PRD"开头）。**`to-plan` 与 `to-issues` 被合并为单个 `to-tickets` 技能，`to-issues` 被删除。**

  `to-tickets` 把方案、规范或对话拆解为一组 **tickets**——追踪子弹式的纵向切片，各自声明其**阻塞边**。同一份产物按 `/setup-matt-pocock-skills` 配置的跟踪器呈现为两种形态：**本地文件**（`tickets.md`）把边写成文字，需手动自上而下推进；**真正的跟踪器**则把边写成原生的阻塞链接，任一 ticket 的阻塞一旦解除即可领走，多个智能体可并行开工。无论哪种形态，边都活在 ticket 里——介质只决定是否有人按它们并行执行。

  发布时优先使用跟踪器的**原生子 issue**处理"父 → 切片"层级，**原生阻塞边**处理 `Blocked by`（若支持）；保留 `## Parent` / `## Blocked by` 正文小节作为兜底。"What to build" 模板指向 `/prototype` 产出代码的存放处，而非内联其中的代码片段。

  `ask-matt` 的主流程现路由为 `idea → /to-spec → /to-tickets → /implement`，并在 `docs/engineering/to-spec.md` 与 `docs/engineering/to-tickets.md` 提供面向人类的文档页。

- [#464](https://github.com/mattpocock/skills/pull/464) [`0557d57`](https://github.com/mattpocock/skills/commit/0557d57579d9b3d39839fdaf8d4a6542b17539ce) 感谢 [@mattpocock](https://github.com/mattpocock)! - 在文档中将 wayfinder 定位为**情境化入口**，而非新的主入口流程——以 grill 为引领的 _idea → ship_ 链条仍是正门（把 wayfinder 树为主轴是 v2 级别的动作，不是 1.1）。**`ask-matt`** 路由现在给出 wayfinder 的具体触发条件——全新项目或超大的功能构建，一个会话装不下——两个 grill 正门（**`grill-me`**、**`grill-with-docs`**）则向上指向 wayfinder，以便"超出单会话容量的工作"能从读者真正起步的地方发现这一入口。

- [#464](https://github.com/mattpocock/skills/pull/464) [`639df6e`](https://github.com/mattpocock/skills/commit/639df6e7386dfddc739b2aecdeff37a876f2483b) 感谢 [@mattpocock](https://github.com/mattpocock)! - 毕业并重塑 **`wayfinder`**——用于规划超出单次智能体会话容量的大块工作的技能。它从 `in-progress/` 毕业至 `engineering/`（插件条目、顶层与 Engineering README 中加入 **User-invoked**，文档页 `docs/engineering/wayfinder.md`，并接入 `ask-matt` 路由），作为成熟技能发布。促成这一变化的改名与重塑如下：

  - **`decision-mapping` 重命名为 `wayfinder`**，调用方式为 `/wayfinder`。"Decision map"既晦涩也不准确——其实只有一种 ticket 类型是真正的决策。重塑为"「在朦胧问题中开辟一条路线」，给出一套统一的先行词框架——**fog of war**、**frontier**、**the map**——而非在此之上再造新词。
  - **Destination 作为先行词。** 寻路找的是通往目的地的 _路_**，而非一头冲向目的地。命名目的地是绘图的第一步——它确定范围并塑造每一张 ticket——所以地图新增 `## Destination` 字段，每次会话都以它为定向，分诊在任何 ticket 存在之前先把它钉好。
  - **只规划，不动手。** 地图产出**决策，而非可交付物**；它在"构建之前已无决策可做"时结束。一项工作可以在 Notes 中覆盖此约定。
  - **地图是索引，不是仓库。** 一项决策只存在于一处——其 ticket——所以地图只摘要并链接，绝不复述；把 fog 升格为 ticket 时清除已升格的小块，避免同一内容停留在两处。
  - **默认协作。** 地图从本地 Markdown 文件迁至仓库的 issue 跟踪器：一张 `wayfinder:map` issue，其 ticket 作为子 issue——一个团队可共同关注的 URL。会话以低分辨率加载地图，按需放大到具体 ticket。Wayfinder 保持跟踪器无关（GitHub、GitLab、本地 Markdown），由 `docs/agents/issue-tracker.md` 中的指针指明，`setup-matt-pocock-skills` 会种入"Wayfinding operations"小节。
  - **以指派认领，而非以标签认领。** 会话通过把 ticket 指派给驱动者来认领——指派人即认领者——从而把标签词表腾出来给 `wayfinder:<type>` 一类。
  - **原生阻塞。** 阻塞优先采用跟踪器自身的依赖关系，它在跟踪器自身的 UI 中可视化呈现 frontier，让人不打开地图就能看到可领取项。GitHub 与 GitLab 模板列出原生写法，并附 body 约定的兜底。
  - **Fog 与 out of scope 拆分。** 两个简单命名的地图小节——`## Not yet specified`（范围内、随 frontier 推进而升格的 fog）与 `## Out of scope`（被排除在目的地之外之外的工作，已关闭，永远不升格）——让"目的地之外的工作"不再显得像可领 frontier。
  - **新增第四种 `task` ticket 类型。** 用于阻塞某项决策的纯手动工作（开通访问、迁移数据、注册服务）——唯一一种"做事"而非"决策"的类型，凭"解锁一项决策"赢得其位置。
  - **HITL / AFK ticket 分类。** 每种 ticket 类型都是 **HITL**（人在回路——grilling、prototype）或 **AFK**（智能体独立——research；task 两者皆可）。HITL ticket 只能通过实时交互解决，因此"等待人类"自然从标签中脱落——一个 grilling 智能体若自行作答，按定义就破坏了 HITL。（这修复了学员反馈的 `/wayfinder` 烤问 _自己_ 而非人类的问题。）
  - **恢复"无 fog 即提前退出"。** 若首轮广度优先的 grilling 没有发现 fog，说明工作量小到足以在一个会话内完成——它就此停下，询问你希望如何推进，而不是造一张谁都不需要的地图。

### 补丁变更

- [#464](https://github.com/mattpocock/skills/pull/464) [`639df6e`](https://github.com/mattpocock/skills/commit/639df6e7386dfddc739b2aecdeff37a876f2483b) 感谢 [@mattpocock](https://github.com/mattpocock)! - 把 **`tdd`** 重塑为"仅作参考"的技能，并补齐一项缺失的反模式。

  **仅作参考。** 红 → 绿 → 重构的循环由模型已经掌握的先行词锚定，原本的"Workflow"小节基本是在复述循环本身。删除 Workflow 与每周期清单；把其中一条耐用的思想——纵向切片 / 追踪子弹——并入 Anti-patterns 小节与一份简短的 Rules-of-the-loop 清单。引入 **seam** 作为"测试落在何处"的先行词：只在事先约定的 seam 处写测试，且必须在写测试前与用户确认。同时删去"重构"阶段——TDD 现在就是红 → 绿；重构属于 review 阶段，所以重构规则与 `refactoring.md` 一并迁出（归宿是 `code-review`）。

  **同义反复的测试。** 新增"同义反复测试"反模式：断言按与代码相同方式重算的测试，由构造上必通过、零信心——区别于既有"实现耦合"反模式。新增位置与其他反模式一致：Philosophy 中一条原则（期望值必须来自独立的事实来源）、清单中一道门、`tests.md` 中一组 BAD/GOOD 对照。

- [`e00eadb`](https://github.com/mattpocock/skills/commit/e00eadb4bb32c3d5a631ead1a5ed5d6a7c5f74e2) 感谢 [@mattpocock](https://github.com/mattpocock)! - 扩展 **`triage`** 技能以分诊外部 PR，把 PR 视为一份附带代码、按相同角色与状态机运行的 issue。PR 与 issue 内联流转（由每仓库 setup 开关控制），发现阶段仅展示外部 PR，原本仅针对 bug 的"reproduce"步骤被泛化为统一的"verify the claim"步骤，并由冗余检查将已实现的请求归为 `wontfix`，避免污染"out-of-scope"知识库。`setup-matt-pocock-skills` 新增"PRs-as-a-request-surface"开关，针对 GitHub/GitLab。

- [#472](https://github.com/mattpocock/skills/pull/472) [`d869d45`](https://github.com/mattpocock/skills/commit/d869d45afc32beab1c2d1350f8de5e81589512cd) 感谢 [@mattpocock](https://github.com/mattpocock)! - 修复 **`wayfinder`** 硬编码 issue 跟踪器文档路径的问题——这破坏了其他技能所依赖的间接寻址。

  `to-issues`、`to-prd` 与 `triage` 从不指定路径——它们通过 `setup-matt-pocock-skills` 写入 `CLAUDE.md`/`AGENTS.md` 的 `### Issue tracker` 区块解析跟踪器，该区块指向跟踪器文档的实际存放处。Wayfinder 反倒钉死了字面量 `docs/agents/issue-tracker.md`，因此在将智能体文档放在别处的仓库里，它会静默回退到本地 Markdown 跟踪器——即便该仓库的 `CLAUDE.md` 明确声明使用 GitHub issues。它现在改为通过同一指针解析文档，并按名称读取其中的"Wayfinding operations"小节，让整套技能的间接寻址保持一致。

## 1.0.1

### 补丁变更

- [`d20ee26`](https://github.com/mattpocock/skills/commit/d20ee2684e2a9442698ac3c1e0f2c5b68c4cf296) 感谢 [@mattpocock](https://github.com/mattpocock)! - 把 **`teach`** 技能改为"先复用"模式。课程现在基于 `./assets/` 中可复用的**组件**构建——样式表、测验小组件、模拟器、图表助手。复用是默认：智能体在编写课程前先读 `./assets/`，基于已有内容构建，并把任何新的、可复用的部分抽成组件，而不是内联进课程。

## 1.0.0

### 主要变更

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) 感谢 [@mattpocock](https://github.com/mattpocock)! - 新增 **`ask-matt`** 技能——一个用户调用型路由器，为你的情境指向合适的技能或流程。

  **破坏性变更：** `ask-matt` 路由覆盖本仓库中其他用户调用型技能，因此它期望这些技能已被安装。

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) 感谢 [@mattpocock](https://github.com/mattpocock)! - 新增共享的设计技能，并将既有技能重新挂接其上。

  - 新增 **`codebase-design`** 技能——深层模块的词汇（module、interface、depth、seam、adapter）以及"在小接口背后堆叠大量行为"的原则。此前散落在 `improve-codebase-architecture/LANGUAGE.md` 中的措辞现统一于此，供跨技能复用。
  - 新增 **`domain-modeling`** 技能——主动构建并打磨项目的领域模型，对照词汇表压力测试各术语，并保持 `CONTEXT.md` 与 ADR 的最新状态。
  - `improve-codebase-architecture` 现在从 `/codebase-design` 取得架构词汇，从 `/domain-modeling` 取得领域模型。
  - `tdd` 现在依赖 `/codebase-design` 提供接口设计指引——其内联的 `deep-modules.md` / `interface-design.md` 笔记已删除，改由共享技能承载。
  - `grill-with-docs` 现在通过 `/domain-modeling` 内联构建领域模型。

  **破坏性变更：** 这些技能现在依赖新增的 `codebase-design` / `domain-modeling` 技能，因此你必须一并安装。

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) 感谢 [@mattpocock](https://github.com/mattpocock)! - 移除 **`caveman`** 与 **`zoom-out`** 技能。

  - `caveman` 是我在测的另一个技能的副本，本就无意公开发布。
  - `zoom-out` 实际中无人使用，已从仓库移除。

  **破坏性变更：** 两个技能均已移除。

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) 感谢 [@mattpocock](https://github.com/mattpocock)! - 将 **`diagnose`** 技能重命名为 **`diagnosing-bugs`**。

  **破坏性变更：** 调用方式为 `/diagnosing-bugs`——旧的 `/diagnose` 名称不再存在。

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) 感谢 [@mattpocock](https://github.com/mattpocock)! - 用 **`writing-great-skills`** 替换 **`write-a-skill`**。

  - 删除 `write-a-skill`。
  - 新增 `writing-great-skills`（及其 `GLOSSARY.md`）——一份关于如何写好/改好技能的参考：让技能可预测的词汇与原则，逐句排查修。
  - 暴露 `grilling` 为模型调用型技能——`grill-me` 与 `grill-with-docs` 背后可复用的访谈循环。

  **破坏性变更：** `write-a-skill` 已移除；请改用 `writing-great-skills`。

### 次要变更

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) 感谢 [@mattpocock](https://github.com/mattpocock)! - 新增 **`resolving-merge-conflicts`** 技能——用于解决进行中的 git merge 或 rebase 冲突的循环。独立可用，不依赖其他技能。

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) 感谢 [@mattpocock](https://github.com/mattpocock)! - 将技能分类法从 **Commands / Skills** 更名为 **User-invoked / Model-invoked**，跨文档生效，并新增 `docs/invocation.md` 厘清这一划分：用户调用型技能只有在被你显式敲出时才可达，专用于编排；模型调用型技能当任务契合时也会被自动触发。用户调用型技能可以调用模型调用型技能，但绝不调用另一个用户调用型技能。

### 补丁变更

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) 感谢 [@mattpocock](https://github.com/mattpocock)! - 收紧 **`review`** 技能：fail-fast 的 ref 检查、单一来源的规则、以及 no-op 修剪。
