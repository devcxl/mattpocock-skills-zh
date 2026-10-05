## 它的作用

`research` 通过阅读拥有答案的来源来回答一个问题，然后把一份带引用的 Markdown 文件留在仓库里。它只从 **[primary sources](https://www.aihero.dev/ai-coding-dictionary/primary-source)** 工作：官方文档、源代码、spec、第一方 API。它把每条论断追回到拥有它的来源，所以在 API 自己的文档可达时，它不会复述一篇博文对那个 API 的描述。

它不在对话里回答你。输出是一个文件，写在仓库已经存放这类笔记的地方，每条论断上附一个链接。你得到的是一份可以回应、交给另一个 agent 或丢弃的文档，而不是一条在 [session](https://www.aihero.dev/ai-coding-dictionary/session) 结束后就消失的回答。

## 何时使用

键入 `/research`，或者当一项任务变成阅读苦力活时，[agent](https://www.aihero.dev/ai-coding-dictionary/agent) 会主动使用它。

当下一步是*从工作目录之外*弄清楚某件事时——一个第三方 API 的行为、一份 spec 实际说了什么、一个版本声明是否站得住——而且你不想因为自己读而停滞自己的线程。你需要什么决定哪个技能：

| 你需要 | 使用 |
| --- | --- |
| 一个决策正在等的一个外部事实 | `research` |
| 一个*与你一起*做出的决策，靠访谈 | [grilling](https://aihero.dev/skills-grilling) |
| 一个耐久的架构决策，写入 `GLOSSARY.md` 和 ADR | [grill-with-docs](https://aihero.dev/skills-grill-with-docs) |
| 想弄清楚某个做法在你的代码库里行不行得通 | [prototype](https://aihero.dev/skills-prototype) |
| 一个一次会话装不下的计划 | [wayfinder](https://aihero.dev/skills-wayfinder) |

`research` 与 `grill-with-docs` 之间的分界线是**回来的东西的保质期**。Research 产出短期有效的事实，例如这个库本周的 auth 机制是什么样。ADR 记录你保留的决策。如果你产出的东西是决策、而不是事实，那你是在 [盘问（grilling）](https://www.aihero.dev/ai-coding-dictionary/grilling)，不是在 research。

## 被委派的苦力活

阅读过程由一个**后台 agent**执行。你继续工作，它追踪每条论断的一手来源，写一份 Markdown 文件，然后回报。Research 是你委派的苦力活，不是外包思考：你拿到一份文件去盘问、规划或对照设计，最终决策仍由你做。

没有东西会阻止后台 agent 再启动一个后台 agent。这是这个技能记录最充分的问题。

文件放在哪里由仓库决定，而不是技能决定。它遵循仓库已有的笔记规约；如果没有规约，就选一个合理的位置并告诉你。每次运行写一份文件。

## 常见问题

**它生成了第二个 research agent。这是应该的吗？**

不。这是一个未关闭的 bug，[issue #530](https://github.com/mattpocock/skills/issues/530)。技能让调用者启动后台 agent，却不限制 agent 类型。因此调用者会再启动一个 `general-purpose` agent；它也有 `Agent` 工具和相同指令，于是重复执行。一名报告者测出单次 research 任务在三次重叠的运行中烧掉约 450k [tokens](https://www.aihero.dev/ai-coding-dictionary/token)，重复的那次半小时后才结束，而用户全程看不到。Claude Code 之外也会发生；用户已确认 Codex + GPT-5.6-sol 中存在同样的嵌套问题。目前没有发布的修复。有人给自己安装的副本打补丁，告诉已经是 [subagent](https://www.aihero.dev/ai-coding-dictionary/subagent) 的 agent 自己完成工作。这有帮助，但只是指令层面的修补，不是结构性修复。调用后留意后台任务列表，并停止重复的任务。

反方向的问题也会发生：如果你的全局指令禁止 agent 重新委派工作，后台 agent 就会拒绝任务，而技能什么也不做，也不告诉你。

**文件应该放在哪里，我应该提交它吗？**

技能把文件放在仓库已经存放笔记的地方，不再规定其他做法。社区意见大致一致：保留 ADR，不保留 research 文件。一条讨论这个问题的 Discord 帖说得最清楚："ADRs yes. Everything else archive or delete after done. It otherwise becomes cruft of work and can poison future repo reads if you've drifted away from the spec/research." Research 文件记录的是写下那天的事实，所以过期文件比没有更糟。总体来说，这些文件不该进 git，也没有标准存放位置：人们会改用 Obsidian、独立的知识仓库或 issue 追踪器。

**什么算"高可信度"一手来源，谁决定？**

[Model](https://www.aihero.dev/ai-coding-dictionary/model) 决定。技能点出*哪些种类的*来源合格（官方文档、源代码、spec、第一方 API），没有允许名单、没有域级门槛、也没有验证环节。这在技能最初被提议时是最大的反对声，从来没有被公开回答过："Five research subagents pointed at junk just gives you five confident wrong answers faster. How are you gating what counts as high-trust sources?" 你真正能做的护栏是每条论断上的引用。随手挑两三条点过去。如果它们落在一份关于那个东西的摘要上，而不是那个东西本身，跑动就输掉了它唯一的职责。

**后面的会话会复用前面跑动找到的东西吗？**

不会。没有任何机制会自动加载过去的 research 文件；它会一直留在仓库里，直到有人或某个技能引用它。这是设计早期最有力的质疑："the value's the markdown becoming context the agent re-reads later, not the fetch itself. A write-once dead file is just a fancy search." 已发布的技能没有解决这个问题。实际上，只有你主动把文件交给下一步，它才有用：附到 spec、引用进盘问会话，或让一张 [ticket](https://www.aihero.dev/ai-coding-dictionary/ticket) 指向它。

**为什么不直接叫 agent 去读文档？**

你可以，而一段两行提示正是这份技能取代的做法。技能比提示多做两件事：它在后台运行，让会话的 [context](https://www.aihero.dev/ai-coding-dictionary/context) 保持干净；并且每次都遵循一手来源约束、产出带引用的文件，而不是取决于你怎么组织提示。与 [harness](https://www.aihero.dev/ai-coding-dictionary/harness) 自带的深度研究模式相比，区别在于文件和一手来源规则，而不是搜索。如果两行提示就能回答一个小问题，那就用两行提示。

**它什么时候停止阅读？**

技能没有停止标准。这表现为两种看似相反、实则源于同一缺口的抱怨：agent 挖得太深，或是泛泛地覆盖一个主题却漏掉关键细节。一位从业者这样说："deep-research skills are a bit too deep sometimes. And telling an agent to research usually results in missing crucial details." 范围得由你来定。窄而可回答的问题（一个 API、一种行为、一项版本说法）比"research X"能得到好得多的结果。

**`/wayfinder` 创建了 research tickets。我要自己处理那些吗？**

不用，它现在会替你启动这些任务。在 v1.1 之后尚未发布的改动中，绘图会话会为每张 research ticket 启动一个 `/research` subagent 并行执行。每个任务都会把发现记在一条用完即扔的 `research/<name>` 分支上，ticket 通过 [context pointer](https://www.aihero.dev/ai-coding-dictionary/context-pointer) 指向它。Research tickets 是 wayfinder 一 ticket 一会话规则的唯一例外，因为它们是 [AFK](https://www.aihero.dev/ai-coding-dictionary/afk) 的：没有东西在等你。这些分支有两个已知问题：有人看到 subagent 从一条本不打算合并的分支开出草稿 PR（[issue #576](https://github.com/mattpocock/skills/issues/576)）；之后删除分支也会破坏 ticket 中的 context pointer。

## 怎样算成功

- 你自己的会话在继续。如果你坐在那盯着它读，委派就没发生。
- 恰好出现一个后台任务。一个名字几乎相同的第二个就是嵌套 bug。
- 多出一份 Markdown 文件，落在仓库已经用作笔记的文件夹里，agent 把路径告诉你。
- 每条论断都带有链接，随手挑两三条点过去。如果它们落在一份关于那个东西的摘要上，而不是那个东西本身，这次运行就没有完成任务。
- 你能只凭这份文件就做出你卡住的那个决策，不用自己回去找来源。

## 它的定位

`research` 是一项随时可用的独立技能。它为思考型技能提供材料，不是构建链中的一步。你需要把它产出的文件*带进*流程：[盘问（grilling）](https://aihero.dev/skills-grilling) 和 [grill-with-docs](https://aihero.dev/skills-grill-with-docs) 已掌握事实后能提出更尖锐的问题，[to-spec](https://aihero.dev/skills-to-spec) 也能据此综合。[wayfinder](https://aihero.dev/skills-wayfinder) 是唯一会直接调用它的技能：它用 `/research` subagent 处理地图上的每张 research ticket。整张地图见 [ask-matt](https://aihero.dev/skills-ask-matt)。