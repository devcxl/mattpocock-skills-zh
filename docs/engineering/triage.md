## 它的作用

`triage` 逐个处理你项目追踪器上的 issues，把每一项推过一个由 **triage 角色** 组成的小型状态机（一个类别角色加一个状态角色），并留下三样东西之一：一份代理就绪的简报、一个给报告者的具体问题、或一个带记录原因的已关闭 issue。

它只处理**不是你创建**的 issues。原始 bug 报告、涌入的功能请求、一个不请自来的外部 pull request——从外部以报告者留下的任何形态落进追踪器的工作。[to-tickets](https://aihero.dev/skills-to-tickets) 产出的 [tickets](https://www.aihero.dev/ai-coding-dictionary/ticket) 按构造就已经代理就绪，对它们跑 `triage` 最好也只是浪费。规则是平的：`/triage` 只用于进来的 issues，不用于你自己创建的 issues。

第二件把它与手工打标签区分开的事：它推荐并等待。它带着推理告诉你它的类别和状态判断，加上它在代码库里发现的东西，在你指示之前不应用任何东西。

## 何时使用

你通过键入 `/triage` 然后用平实语言描述你想要什么来调用它。[agent](https://www.aihero.dev/ai-coding-dictionary/agent) 不会主动使用它。"Show me anything that needs my attention"、"let's look at #42"、"move #42 to ready-for-agent"。

| 你拥有什么 | 去哪里 |
| --- | --- |
| 一个满是他人原始报告的追踪器 | `/triage` |
| 一个你自己的粗略想法，什么都没写下来 | [grill-with-docs](https://aihero.dev/skills-grill-with-docs) |
| 一段已敲定的对话，要变成一份 [spec](https://www.aihero.dev/ai-coding-dictionary/spec) | [to-spec](https://aihero.dev/skills-to-spec) |
| 一份 spec，要拆成代理就绪的 tickets | [to-tickets](https://aihero.dev/skills-to-tickets) |
| 一个已确认的 bug，需要根因而不是标签 | [diagnosing-bugs](https://aihero.dev/skills-diagnosing-bugs) |

## 先决条件

`triage` 读写你的 issue 追踪器，所以 [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills) 必须先配置好那个追踪器和它的标签词汇。下面的角色名是**规范**的；你追踪器里的标签字符串可能不同，而映射正是 setup 提供的。如果你的追踪器已经精确使用规范名，那没什么可映射、没什么可设置。

追踪器配置还决定外部 pull request 是否算作请求面，以及谁算外部。那个开关默认关闭，并且不再是一个 setup 问题——如果你想把 PR 纳入范围，在 `docs/agents/issue-tracker.md` 里翻转它。

## 状态机

每个被 triage 的项最终恰好带一个类别角色和一个状态角色。两个类别：`bug`（有东西坏了）和 `enhancement`（新功能或改进）。五个状态：

| 状态 | 含义 |
| --- | --- |
| `needs-triage` | 你需要评估它。未加标签的 issue 通常先落在这里。 |
| `needs-info` | 等待报告者。他们回复时回到 `needs-triage`。 |
| `ready-for-agent` | 完全指定，附有代理简报。一个 [AFK](https://www.aihero.dev/ai-coding-dictionary/afk) 代理可以接手。 |
| `ready-for-human` | 同样的简报，加上为什么这不能被委派：判断、外部访问、手工测试。 |
| `wontfix` | 已关闭，原因已记录。 |

这就是全部词汇，而"恰好一个状态角色"的不变量是让查询保持简单的原因。它也是这份 [技能（skill）](https://www.aihero.dev/ai-coding-dictionary/skill) 被要求最多的领域：用户要过第六个状态，用于已指定但被另一张 issue 阻塞的工作；要过被未来触发器门控的 `deferred` 工作；以及一个终态 `implemented`。这些都没发布。见下面的问题。

`wontfix` 分三种方式，区别很重要，因为只有其中一种写入知识库：

| 你关闭它的原因 | 发生什么 |
| --- | --- |
| 已实现 | 一条指向它已存在之处的评论。不写入 `.out-of-scope/`——它是已构建的功能，不是被拒绝的，归档到那里会毒化去重检查。 |
| 被拒绝的 bug | 礼貌解释，然后关闭。 |
| 被拒绝的 enhancement | `.out-of-scope/` 里的一个文件，从关闭评论链接，然后关闭。 |

`.out-of-scope/` 每个被拒绝的**概念**一份 markdown 文件，而不是每个 issue 一份，写成一份简短的设计文档而不是数据库行：被拒绝的是什么、为什么、以及每个要过它的 issue。`triage` 在评估任何东西之前读整个目录，并按概念而非关键词匹配——"night theme" 匹配 `dark-mode.md`。当它命中时，它浮出旧决策并问你是否仍然这么觉得，而不是从头重新争一遍这个请求。

## 简报之前先验证

在任何 [盘问（grilling）](https://www.aihero.dev/ai-coding-dictionary/grilling) 之前，`triage` 检查论断是否真的成立。对 bug，它按报告者的步骤复现。对 PR，它 checkout 分支并跑相关测试。然后它报告三件事中哪件发生了：已确认，带代码路径；无法复现；或细节不足无法尝试——后者本身就是最强的 `needs-info` 信号。

它在同一遍里对代码库再跑两项检查——**冗余**（这已经实现了吗？按领域概念搜索，而不是按报告者的措辞？）和**先前拒绝**（`.out-of-scope/` 已经说过不吗？）。两者都便宜，命中时都产生一个 `wontfix`。

这一切存在是为了让一件工件变好：**代理简报（agent brief）**，即 issue 移到 `ready-for-agent` 时发布的结构化评论。一旦发布，简报就是契约，原始报告只是上下文。简报被写成**耐久**的而不是精确的，因为一份 issue 可能在 `ready-for-agent` 里坐上几周，而底下的代码在移动。所以它们点名类型、签名和行为契约，绝不放文件路径或行号。一个确认的复现比一个猜测做出强得多的简报。

## PR 是带代码的 issue

在追踪器把外部 pull request 当作请求面的地方，它们跑过同一台机器——同样的类别、同样的状态、同样的转换。状态只是对着 diff 读：`ready-for-agent` 意味着附了简报、agent 应该对代码采取下一步；`ready-for-human` 意味着准备好让一个人合并。PR 上的简报描述对现有 diff 还剩下什么要做，而不是如何从零构建那个东西。

发现面只浮出*外部* PR，因为协作者进行中的分支不是 triage 工作。那个过滤器只作用于发现——显式点名一个 PR，无论谁写的它都会被 triage。一条粗糙边缘：GitHub 模板的外部 PR 列出命令向 `gh pr list` 要一个 `gh` 并不暴露的 `authorAssociation` 字段，所以写好的命令会直接失败（[#468](https://github.com/mattpocock/skills/issues/468)）。

## 常见问题

**我跑了 `/to-spec` 和 `/to-tickets`，现在那些 tickets 躺在那里没被 triage。我要对它们跑 `/triage` 吗？**

不用。它们已经代理就绪——`to-tickets` 在发布时应用 `ready-for-agent` 标签，正是为了让 AFK 运行器无需再来一遍就能捡起它们。撞上这个的用户跑了 spec 流程、看到输出上是 `needs-triage`、然后发现自己的 AFK 运行器忽略一切。`triage` 是从外部到达的工作的入口；spec 流程是你发起的工作的车道。它们在 `ready-for-agent` 处汇合，而不是更早。

**既然有了 `to-spec` → `to-tickets` → `implement` 流程，`triage` 还相关吗？**

只有在你有人境工作时才相关。`triage` 先于那条主干存在，做的是不同的工作：它是别人提交的报告的车道。如果你追踪器里的一切都来自你自己的规划，你很少会打开它。如果你维护任何公开的东西，或者你的团队向你报 bug，它就是前门。主要用途是接收外部贡献者 issues 的开源仓库。

**代理试图应用 `ready-for-agent`，`gh` 说标签不存在。**

已知未关闭 bug（[#616](https://github.com/mattpocock/skills/issues/616)）。`setup-matt-pocock-skills` 把标签词汇写进 `docs/agents/triage-labels.md`，但不在你的追踪器里创建标签。自己用 `gh label create` 或追踪器 UI 创建一次那五个状态标签和两个类别标签，它就不再发生。issue 里链接了一个社区修复分支，尚未合并。

**五个状态不够——blocked、deferred 或 implemented 呢？**

这是这份技能被提交最多的缺口，有三种形态。一个完全指定、但等待另一张 issue 关闭的 issue（[#139](https://github.com/mattpocock/skills/issues/139)）——报告者的抱怨是 `ready-for-agent` 在那里"技术上为真"但有误导性，所以代理捡起它、撞上墙。被触发器门控、打算做但还不可执行的未来工作（[#297](https://github.com/mattpocock/skills/issues/297)）。以及一个"已实现、等待验证"的终态，没有它 AFK 运行器可能重新排队已完成的 tickets。Matt 同意 blocked 的情况是真的，对名字（`blocked` 对 `paused`）还没决定。全都没发布。人们使用的变通办法是在类别旁边加一个仓库本地的额外标签，让规范状态槽被诚实的东西占据，代价是技能不知道它。一个社区衍生品走得更远，加了 `needs-slicing`、`tracking` 和投入度标签——那有效，但那是他们的，不是技能的。

**这和 `/diagnosing-bugs` 有什么不同？**

这里的验证步骤刻意很浅——足以回答"这是真的吗、它大致住在哪里"，而不是找根因。当一个 bug 几分钟内无法按报告者的步骤复现时，诚实的动作是 `needs-info`，或者如果你想现在就追它，用 [diagnosing-bugs](https://aihero.dev/skills-diagnosing-bugs)。两个技能的文字目前都没提到对方；一位用户发现了那条接缝，它仍然开着。

**我能把它指向我整个积压并让它跑吗？**

你可以问，但注意它读什么。"显示需要关注的东西"那一遍是一个廉价的列表，为*选择*而设——你挑一个，然后它才对你挑的那个收集完整 [context](https://www.aihero.dev/ai-coding-dictionary/context)。一次跨二十张 issue 跑它，agent 可能悄悄把那个廉价列表当作它的证据基础，那会返回 issue 正文但不返回评论。一位用户恰好撞上这个：三张 issue 已经带着一条"已修复，建议关闭"的评论，而三张都拿到了全新的代理简报。如果你想要批量处理，明确说必须逐 issue 读评论。

**它能和 Linear 或 GitHub Issues 之外的任何东西一起工作吗？**

能——追踪器是配置，不是硬编码假设，人们用 `linear` CLI 对着 Linear、GitLab 以及 `.scratch/` 下的纯 markdown 文件跑它。一种常见分工是 Linear 管 issues 和规划、GitHub 管代码和 PR：说"issue 追踪器"的技能映射到 Linear，说"PR"的技能映射到 GitHub。在本地 markdown 追踪器上有一个未关闭的模板 bug，生成的文件可能把验收标准带两遍，一次在顶层、一次在代理简报内部（[#200](https://github.com/mattpocock/skills/issues/200)）。

## 怎样算成功

- 它碰过的每一项都以恰好一个类别角色和一个状态角色结束——从不是零个，从不是两个冲突的状态。
- 它给你一个带推理的推荐然后停下，而不是重新打标签然后继续。
- 在有任何东西到达 `ready-for-agent` 之前，bug 被复现了，或者 PR 被 checkout 并运行了。
- 它写的简报点名类型和行为，不含文件路径和行号。
- 一个六个月前被拒绝的请求回来了，它说出这一点并引用旧原因，而不是重新 triage 它。
- 它发的每条评论都以 `> *This was generated by AI during triage.*` 开头。

## 它的定位

`triage` 是一个**入口（on-ramp）**，不是主链里的一步。主流程从你有的一个想法出发——盘问、spec、tickets、implement、review——而 `triage` 是为"到达的"工作准备的平行车道。它在同一个地方汇合：一个标着 `ready-for-agent`、带着简报的 issue，[implement](https://aihero.dev/skills-implement) 捡起它，正如它会捡起 [to-tickets](https://aihero.dev/skills-to-tickets) 的 ticket 一样。当一个请求在被简报之前需要打磨时，`triage` 把 [盘问（grilling）](https://aihero.dev/skills-grilling) 和 [domain-modeling](https://aihero.dev/skills-domain-modeling) 一起运行，一次一轮问题，所以决策在做出时就落进 `CONTEXT.md` 和 ADR。拿不准自己在哪条车道上时，[ask-matt](https://aihero.dev/skills-ask-matt) 会为你路由。