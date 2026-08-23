## 它的作用

`code-review` 沿着两条轴审查 `HEAD` 与你指定的固定点（一个提交、一个分支、一个标签、`main`、`HEAD~5`）之间的 diff。**标准（Standards）** 追问代码是否符合本仓库的写法。**Spec** 追问代码是否做到了发起它的 issue 或 [spec](https://www.aihero.dev/ai-coding-dictionary/spec) 所要求的事。每条轴在各自的[子代理（subagent）](https://www.aihero.dev/ai-coding-dictionary/subagent)中运行，彼此看不到对方的推理。

两条轴永远不会被合并，也永远不会被重新排序。报告以每条轴*各自*最严重的问题收尾，拒绝在它们之间评出一个总冠军，因为一个变更可能过了一条轴、挂了另一条：实现了错误的东西却遵守了每一条约定的代码，能过标准、挂 spec；完全按 [ticket](https://www.aihero.dev/ai-coding-dictionary/ticket) 要求做、却破坏了仓库约定的代码则相反。混合裁决会让通过的那条轴掩盖挂掉的那条。

## 何时使用

键入 `/code-review`，或者当你要求审查一个分支、一个 PR、进行中的工作、或任何"自 X 以来"的内容时，代理会自动使用它。

| 你的情况 | 使用 |
| --- | --- |
| 有一个 diff，你想知道它是否构建正确*且*是否是对的 | `code-review` |
| 你想在 diff 里猎 bug——空指针路径、竞态、差一错误 | Claude Code 自带的审查，不是这个（见下面的命名冲突） |
| 什么都还没写，你想测试先行地写 | [tdd](https://aihero.dev/skills-tdd) |
| 整个 spec 需要构建，包括审查 | [implement](https://aihero.dev/skills-implement)，它会自己调用这个技能 |
| 整个代码库都漂移了，而不只是一个 diff | [improve-codebase-architecture](https://aihero.dev/skills-improve-codebase-architecture) |
| 某样东西坏了，你不知道为什么 | [diagnosing-bugs](https://aihero.dev/skills-diagnosing-bugs) |

你必须提供固定点。如果不提供，技能会先问你要，而不是乱猜；它随后会先检查 ref 能解析、diff 非空，再生成任何东西，所以打错的分支名会当着你的面失败，而不是在两个子代理内部失败。

## 先决条件

标准轴什么都不需要。它读取仓库记录的任何文档（`CODING_STANDARDS.md`、`CONTRIBUTING.md` 之类），当仓库没有记录任何东西时，回退到内置的基线。

Spec 轴需要一个存在且可找到的 spec。它按这个顺序查找：

1. 提交消息中的 issue 引用（`#123`、`Closes #45`、GitLab 的 `!67`），通过 `docs/agents/issue-tracker.md` 获取。
2. 你作为参数传入的路径。
3. `docs/`、`specs/` 或 `.scratch/` 下与分支名或功能名匹配的 spec 文件。
4. 问你。

第 1 步依赖 `docs/agents/issue-tracker.md`，它由 [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills) 写入。没有它，只要你给一条路径，这条轴仍然能用。完全没有 spec 时，Spec 子代理会被跳过，报告会写"无可用 spec"（no spec available），而不是凭空编造需求。

## 两条轴

| | 标准（Standards） | Spec |
| --- | --- | --- |
| 问题 | 构建得对吗？ | 是对的东西吗？ |
| 读取 | 仓库记录在案的标准，加上坏味道基线 | 发起它的 issue 或 spec |
| 报告 | 记录在案的违规（可能很难），以及坏味道（永远是判断） | 缺失或部分实现的需求、范围蔓延、实现错误的需求 |
| 每条发现引用 | 标准文件及规则，或具名的坏味道加代码块（hunk） | spec 中的那一行 |

一个不知道你标准的通用审查技能，正是这个设计试图避免的东西——它会给你的代码库里有意为之的东西挑刺，却漏掉你的代码库真正依赖的不变量。因此，仓库自己的文档是标准轴上的[一手来源（primary source）](https://www.aihero.dev/ai-coding-dictionary/primary-source)，**仓库永远优先**。

**坏味道基线（smell baseline）**是它下面的地板：来自《重构（Refactoring）》第 3 章的十二个福勒坏味道——神秘命名（Mysterious Name）、重复代码（Duplicated Code）、依恋情结（Feature Envy）、数据泥团（Data Clumps）、基本类型偏执（Primitive Obsession）、重复的 switch（Repeated Switches）、霰弹式修改（Shotgun Surgery）、发散式变化（Divergent Change）、夸夸其谈的未来性（Speculative Generality）、消息链（Message Chains）、中间人（Middle Man）、被拒绝的遗赠（Refused Bequest）。每一条都是带标签的启发式判断（"疑似 Feature Envy"），永远不是硬性违规，并且每一条都以*它是什么* → *如何修复*的形式陈述，所以一条发现会带着一个动作送达，而不是一句抱怨。你的 linter 已经强制执行的任何东西，两条轴都会跳过。

## 常见问题

**它和 Claude Code 自带的 `/code-review` 撞名了。我该怎么办？**

这是这个技能被报告最多的问题，而且尚未修复。Claude Code 自带自己的 `/code-review`，它做的事不一样——它在 diff 里猎 bug，而这个技能检查 spec 合规和仓库标准。安装这个库意味着其中一方胜出，而谁胜出取决于你的安装方式。通过插件市场安装，所有东西都带 `mattpocock-skills:` 前缀别名，内置的那个在无前缀名下就很难够到；通过普通 skills 安装，本地文件胜出，这个技能遮蔽了内置的。一个干净的回答是彻底移除 Claude Code 的内置技能：省下大量[上下文（context）](https://www.aihero.dev/ai-coding-dictionary/context)，而且冲突不再重要。遮蔽本身可以说是一个 Claude Code [harness](https://www.aihero.dev/ai-coding-dictionary/harness) 的 bug——技能作者理应可以随意命名自己的技能——所以另一个回答是重命名本地副本。编辑 frontmatter 或重命名目录会被 `npx skills update` 撤销；用户报告的持久变通方案是：把技能 fork 成一个新名字，把 `code-review` 从受管集合中移除，并记下你 fork 时的提交，以便手动重新同步。

**它的子代理老是再次调用 `/code-review`，生出更多代理。**

已知未修复的 bug，好几个人在不止一个 harness 里复现过。标准轴和 Spec 轴的提示词没有禁止委派，所以子代理可能重新发现这个技能并再次扇出——一份报告达到了五十多个代理。人们在 fork 上应用的修复，是在两份子代理简报末尾各加一行："不要调用 `/code-review` 或生成额外代理：直接执行本次审查。"有些人更愿意在 harness 层面处理，这样每个技能都继承这道防线。两者都还没进入发布的技能。如果你无人值守地运行它，盯紧代理数量。

**我应该在写出代码的那个[会话（session）](https://www.aihero.dev/ai-coding-dictionary/session)里运行它吗？**

最好开一个新会话。正如一位读者所说："同一上下文审查自己不是审查，是带斜杠命令的确认偏误。"写代码会话里的审查代理，持有塑造了那段代码的每一个假设，而这正是独立审查者恰恰不会有的上下文。这也是人们要求 [implement](https://aihero.dev/skills-implement) 去掉内置审查步骤的原因——它是在刚写出 diff 的那个会话里运行审查的。你自己从一个干净的会话调用 `/code-review`，才是诚实的版本。

**每个 ticket 之后审一次，还是最后统一审一次？**

两者都行，技能不会替你决定。按 ticket 审能让每个 diff 足够小，使 Spec 轴有一个清晰的 spec 可对照，这也是 `implement` 使用的模式。批到分支末尾审，能抓住 ticket 之间的交互，这是逐 ticket 审查各自都会漏掉的。拿不准的话，按 ticket 审，再对分支基点跑一次最终检查。

**我能相信这些发现吗？**

不检查不行。子代理的输出是假设，不是证据——有一个团队报告说，散文式审查放行了十几个破坏性变更。技能是原样或轻度清理地聚合两份报告，而不会逐条对照文件复核每个论断，所以一条发现可能引用错误的位置或夸大影响。在根据每条发现行动之前，先读它引用的出处。每条发现都必须携带一条出处——一条标准规则、一个坏味道加它的代码块、或一行 spec——这正是让它可核查的原因。

**为什么我每次运行它都会发现新问题？**

因为修复制造了新的表面，也因为标准轴的判断那一半在两次运行之间并不确定。一位读者直白地描述了这种循环："/code-review 和 /improve-code-architecture 每次都总能找到新东西。我实施修复、重跑这些技能，一遍又一遍。"没有收敛保证。把一次通过当作线索清单，对有规则出处的那些采取行动，然后停下——不要循环运行直到它干净为止，因为它不会。

**它会审查我未提交的工作吗？**

不会。它 diff `<fixed-point>...HEAD`，三点式，从合并基点（merge-base）量起，排除暂存区和工作树中的变更。如果 `implement` 没有做过中间提交，即将被提交的工作对审查来说是不可见的。先提交，再审查，然后 amend 或加一个 fixup。

## 怎样算成功

- 在任何一个子代理生成之前，它就拒绝在坏 ref 或空 diff 上开始。
- 报告以 `## Standards` 和 `## Spec` 两个独立块到达，而不是一个合并的清单。
- 每一条标准发现都点名你仓库某个文件里的一条规则或十二个坏味道之一，并引用代码块；每一条 Spec 发现都引用 spec 中的一行。
- 结尾总结给出每条轴各自最严重的问题，并拒绝选出一个总冠军。
- 没有可用 spec 时，Spec 块会明说，而不是列出它从代码推断出的需求。

## 它的定位

`code-review` 是构建链尾端的审查步骤——`grill-with-docs → to-spec → to-tickets → implement → code-review`——也可以独立地用在任何你指向的分支或 PR 上。

- [implement](https://aihero.dev/skills-implement) 是最近的邻居：它驱动构建，并在提交前调用这个技能作为自己的收尾审查。
- [to-spec](https://aihero.dev/skills-to-spec) 和 [to-tickets](https://aihero.dev/skills-to-tickets) 产出 Spec 轴对照的文档；一份含糊的 spec 会让那条轴也变得含糊。
- [improve-codebase-architecture](https://aihero.dev/skills-improve-codebase-architecture) 是全代码库层面的对应物——这个技能永远只盯着一个 diff。

拿不准这个情况需要哪个技能时，[ask-matt](https://aihero.dev/skills-ask-matt) 会跨越整个集合做路由。