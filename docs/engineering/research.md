## 它的作用

`research` 通过阅读拥有答案的来源来回答一个问题，然后把一份带引用的 Markdown 文件留在仓库里。它只从 **[primary sources](https://www.aihero.dev/ai-coding-dictionary/primary-source)** 工作：官方文档、源代码、spec、第一方 API。它把每条论断追回到拥有它的来源，所以在 API 自己的文档可达时，它不会复述一篇博文对那个 API 的描述。

它不在对话里回答你。输出是一个文件，写在仓库已经存放这类笔记的地方，每条论断上附一个链接。这就是重点：一份你可以对之反应、交给另一个 agent、或扔掉的文件，而不是一次 [session](https://www.aihero.dev/ai-coding-dictionary/session) 结束时消失的回答。

## 何时使用

键入 `/research`，或者当一项任务变成阅读苦力活时，[agent](https://www.aihero.dev/ai-coding-dictionary/agent) 会主动使用它。

当下一步是*从工作目录之外*弄清楚某件事时——一个第三方 API 的行为、一份 spec 实际说了什么、一个版本声明是否站得住——而且你不想因为自己读而停滞自己的线程。你需要什么决定哪个技能：

| 你需要 | 使用 |
| --- | --- |
| 一个决策正在等的一个外部事实 | `research` |
| 一个*与你一起*做出的决策，靠访谈 | [grilling](https://aihero.dev/skills-grilling) |
| 一个耐久的架构决策，写入 `CONTEXT.md` 和 ADR | [grill-with-docs](https://aihero.dev/skills-grill-with-docs) |
| 想弄清楚某个做法在你的代码库里行不行得通 | [prototype](https://aihero.dev/skills-prototype) |
| 一个一次会话装不下的计划 | [wayfinder](https://aihero.dev/skills-wayfinder) |

`research` 与 `grill-with-docs` 之间的分界线是**回来的东西的保质期**。Research 产出短命的资产：这个库这周的 auth 机制长什么样。ADR 记录你保留的决策。如果你产出的东西是决策、而不是事实，那你是在 [盘问（grilling）](https://www.aihero.dev/ai-coding-dictionary/grilling)，不是在 research。

## 被委派的苦力活

定义性的动作是，阅读以**后台 agent** 跑动。你继续工作；它去追每条论断到它的一手来源，写一份 Markdown 文件，然后回报。Research 是你委派的苦力活，不是你外包的思考：你拿到一份文件去盘、去规划、或对照设计，而判断仍由你做。

委派是无防护的，后台 agent 可以自己再起一个后台 agent。这是这个技能被记录最充分的粗糙边缘。

文件落在哪里由仓库决定，不由这个技能决定：它匹配仓库里已经存在的笔记规约，如果没有，它挑一个合理的位置并告诉你。每次跑动写一份文件。

## 常见问题

**它生成了第二个 research agent。这是应该的吗？**

不。这是一个未关闭的 bug，[issue #530](https://github.com/mattpocock/skills/issues/530)。技能告诉它的调用者开一个后台 agent，但没限制 agent 的类型，所以它开出来的是一个持有 `Agent` 工具和同样指令的 `general-purpose` agent，并把它们再触发一次。一名报告者测出单次 research 任务在三次重叠的跑动中烧掉大约 450k [tokens](https://www.aihero.dev/ai-coding-dictionary/token)，重复的那次半小时后彻底在视野外完成。它在 Claude Code 之外也能复现；同一嵌套在 Codex + GPT-5.6-sol 中得到了确认。没有发布的修复。用户在已安装的副本里打过补丁：加一行告诉已经身为 [subagent](https://www.aihero.dev/ai-coding-dictionary/subagent) 的 agent 自己完成工作，这能帮上忙但只是指令层面、不是结构性。调用之后盯紧后台任务列表，并停掉重复的那一个。

另一个方向的失败也存在：如果你自己的全局指令禁止 agent 重新委派工作，后台 agent 会礼貌地拒绝任务，技能就这么安静地什么都不做。

**文件应该放在哪里，我应该提交它吗？**

技能把文件放在仓库已经存放笔记的地方，对此以外它没有意见。社区的一条规约相当稳：ADR 留着，research 文件不留。这件事最尖锐的一份说法，来自一条讨论这个问题的 Discord 帖："ADRs yes. Everything else archive or delete after done. It otherwise becomes cruft of work and can poison future repo reads if you've drifted away from the spec/research." 一份 research 文件记录的是它被写下那天什么是真的，所以一份过期的比没有更糟。权衡下来，这些工件其实不该进 git，也没有它们的规范归处：人们用 Obsidian、一个独立的知识仓库、或 issue 追踪器代替。

**什么算"高可信度"一手来源，谁决定？**

[Model](https://www.aihero.dev/ai-coding-dictionary/model) 决定。技能点出*哪些种类的*来源合格（官方文档、源代码、spec、第一方 API），没有允许名单、没有域级门槛、也没有验证环节。这在技能最初被提议时是最大的反对声，从来没有被公开回答过："Five research subagents pointed at junk just gives you five confident wrong answers faster. How are you gating what counts as high-trust sources?" 你真正能做的护栏是每条论断上的引用。随手挑两三条点过去。如果它们落在一份关于那个东西的摘要上，而不是那个东西本身，跑动就输掉了它唯一的职责。

**后面的会话会复用前面跑动找到的东西吗？**

不会。没有任何机制自动加载过去的 research 文件；它就是一份坐在仓库里的文档，直到某个人或某个技能指向它。这件事在设计阶段早期被作为最强的挑战被提出："the value's the markdown becoming context the agent re-reads later, not the fetch itself. A write-once dead file is just a fancy search." 发布的技能没有解决它。实际上这份文件通过被显式带进下一步来兑现价值：附到一份 spec、引到一次盘问会话、让一张 [ticket](https://www.aihero.dev/ai-coding-dictionary/ticket) 指向它。

**为什么不直接叫 agent 去读文档？**

你可以，一段两行的提示这么干正是这份技能取代的实践。技能买到的、提示买不到的两件事：它在后台跑，你的会话保持 [context](https://www.aihero.dev/ai-coding-dictionary/context) 干净；一手来源约束和带引用的文件输出每次都长得一样，而不是你碰巧怎么措辞就长成什么样。对照 [harness](https://www.aihero.dev/ai-coding-dictionary/harness) 自带的深度研究模式，差别在工件和来源纪律，不在搜索。如果一段两行的提示在一个小问题上就能给你想要的，那就用两行提示。

**它什么时候停止阅读？**

技能里没有停止标准，这体现为两个看起来相反、实则是同一个缺口的抱怨：agent 钻得太深的，以及对一个话题铺得很宽、却漏掉那一个具体细节的。一位从业者把它说成 "deep-research skills are a bit too deep sometimes. And telling an agent to research usually results in missing crucial details." 范围由你来定。一个窄的、可回答的问题（一个 API、一种行为、一个版本声明）回来的东西远比"research X"要好。

**`/wayfinder` 创建了 research tickets。我要自己处理那些吗？**

不要，它现在替你触发它们。在 v1.1 之后未发布的改动里，一次 charting 会话为每张 research ticket 起一个 `/research` subagent，并行把它们烧掉，把发现捕获在一条用完即扔的 `research/<name>` 分支上，由 ticket 留下一个 [context pointer](https://www.aihero.dev/ai-coding-dictionary/context-pointer)。Research tickets 是 wayfinder 一 ticket 一会话规则的唯一例外，因为它们是 [AFK](https://www.aihero.dev/ai-coding-dictionary/afk) 的：没有东西在等你。那种分支的两个已知麻烦：subagent 被看到从一条永不合并的分支打开一份草稿 PR（[issue #576](https://github.com/mattpocock/skills/issues/576)），并且之后删除那条分支会破坏 tickets 持有的 context pointers。

## 怎样算成功

- 你自己的会话在继续。如果你坐在那盯着它读，委派就没发生。
- 恰好出现一个后台任务。一个名字几乎相同的第二个就是嵌套 bug。
- 多出一份 Markdown 文件，落在仓库已经用作笔记的文件夹里，agent 把路径告诉你。
- 它里面每条论断都附一个链接，随手挑两条点过去，落在官方文档、一份 spec、或真实的源文件上，而不是某人对它的转述。
- 你能只凭这份文件就做出你卡住的那个决策，不用自己回去找来源。

## 它的定位

一个随时可调用的独立技能，把东西喂给思考型技能，而不是坐在构建链里。它的文件是要被*带进*流程的东西：[盘问（grilling）](https://aihero.dev/skills-grilling) 和 [grill-with-docs](https://aihero.dev/skills-grill-with-docs) 在事实已经在桌上时问出更尖锐的问题，[to-spec](https://aihero.dev/skills-to-spec) 能对照它做综合。[wayfinder](https://aihero.dev/skills-wayfinder) 是直接调用它的那个技能，用一个 `/research` subagent 处理地图上的每张 research ticket。整张地图见 [ask-matt](https://aihero.dev/skills-ask-matt)。