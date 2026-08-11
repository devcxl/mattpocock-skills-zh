## 它的作用

`domain-modeling` 在你设计的过程中构建并打磨一个项目的**通用语言（ubiquitous language）**——挑战与词汇表冲突的术语、在你用了含糊的词时逼出一个精确的词、用具体场景对某个关系做压力测试，直到边界精确为止。

它是**主动**的纪律，不是被动的。读 `CONTEXT.md` 借用它的词汇，是任何技能都能做的一行习惯；这个技能是给你*正在改变*模型时用的。这正是让它打断对话的原因。它在对话中途、一个术语被敲定的那一刻把它写进 `CONTEXT.md`，而不是在结尾产出一份整洁的词汇表——因为批量的版本是一个[会话（session）](https://www.aihero.dev/ai-coding-dictionary/session)的摘要，而内联的版本才是会话真正的输出。

## 何时使用

键入 `/domain-modeling`，或者当任务合适时代理会自动使用它。实际上，自动调用是这个技能最弱的部分：当 `grill-with-docs` 或 `wayfinder` 说要加载它时，[模型（model）](https://www.aihero.dev/ai-coding-dictionary/model)常常加载 `grilling` 而跳过它。如果一次[盘问（grilling）](https://www.aihero.dev/ai-coding-dictionary/grilling)会话跑完，结束时 `CONTEXT.md` 没被动过，那就是发生了这种事——把它和另一个技能一起按名字调用。

当*措辞*是问题时使用它：

| 情况 | 动作 |
| --- | --- |
| 两个人对"cancellation"的理解不同 | `domain-modeling`——挑一个规范术语，把其他的列在 `_Avoid_` 下 |
| "Account" 在三个文件里干三份活 | `domain-modeling`——把它拆成 Customer 和 User |
| 你刚做了一个难以逆转的架构选择 | `domain-modeling`——如果这个选择过了门槛，它会提供一个 ADR |
| 问题是模块的*形状*——接缝放哪里、接口多深 | [codebase-design](https://aihero.dev/skills-codebase-design) |
| 你想在构建之前让整个计划被盘问 | [grill-with-docs](https://aihero.dev/skills-grill-with-docs)，它会在底层驱动这个技能 |
| 你想查一个术语，而不是改它 | 什么也不用。读 `CONTEXT.md`。它是一个文件。 |

## 前置条件

没有前置条件。技能写入两个地方，并且两者都惰性创建：

- **`CONTEXT.md`**，位于仓库根目录，由第一个敲定的术语创建。在根目录有 `CONTEXT-MAP.md` 的仓库里，术语改写入地图指向的每个上下文各自的 `CONTEXT.md`。
- **`docs/adr/`**，由第一个过门槛的 ADR 创建。

开始之前什么都不需要存在，也不会投机性地创建任何东西。

## 两个工件，两道门槛

词汇表和 ADR 被以不同的标准要求，而把两者混为一谈是这个技能大部分麻烦的来源。

| | `CONTEXT.md` | `docs/adr/NNNN-slug.md` |
| --- | --- | --- |
| 容纳 | 术语。某个东西**是**什么，一两句话，被否决的同义词放在 `_Avoid_` 下 | 一个决策，一到三句话：背景、选择、理由 |
| 写入门槛 | 一个含糊的术语变成了规范 | **三条全要**：难以逆转、脱离上下文会令人意外、是真实权衡的结果 |
| 写入时机 | 内联，术语敲定的那一刻 | 被提出，而不是被假定 |
| 永不容纳 | 实现细节、[spec](https://www.aihero.dev/ai-coding-dictionary/spec)、草稿本、通用编程概念 | 本次会话每个选择的流水账 |

ADR 的三条测试缺任何一条，就没有 ADR。一个容易逆转的决策只会被逆转；一个不令人意外的决策没人会问；一个没有真正替代方案的决策，记录的只是你做了显然的事。

`CONTEXT.md` 那条规则才是真正要守住的，因为它是会在实战中崩掉的那条。**它是词汇表，仅此而已。**不受约束的话，模型会把"写入 `CONTEXT.md`"当作把你给的每个答案都持久化的许可，文件会变成一份不断演进的 spec——这是这个技能被报告最多的问题，跨好几个模型都是。

## 交叉引用，以及它的边界

让这个技能真正生效的动作是：当你陈述某样东西如何工作时，它检查代码并浮出矛盾。*"你的代码会取消整个 Orders，但你刚才说部分取消是可能的——哪个是对的？"*语言和代码被当众对齐，在两者被改动之前。

这条边界值得知道。它交叉引用**代码**和已提交的 `CONTEXT.md`/ADR，仅此而已。它不搜索你的 issue 追踪器，所以几个月前在一个已关闭的 issue 里被争论并刻意敲定的命名冲突，会被当作新问题浮出来。有[一个未决的请求](https://github.com/mattpocock/skills/issues/717)要修这个；在那之前，变通办法是把指示写进你自己的 `docs/agents/domain.md`，技能们本来就会读它。

## 常见问题

**我的 `CONTEXT.md` 有 500 行。1000 行。3000 行。我该怎么办？**
大小是症状，不是病——文件吸收了从来不是词汇表材料的实现细节和决策。修复是一句直接的指示：`/grill-with-docs make my CONTEXT.md more concise and remove any implementation details from it`。对一个臃肿的文件跑它，大部分内容会消失。只有当文件真正精瘦、且仍然覆盖读者不想同时装在脑子里的两个领域时，才考虑 `CONTEXT-MAP.md` 拆分；拆分一个臃肿的文件只会给你几个臃肿的文件。技能在这方面的指引还不足以从一开始就阻止膨胀，跟踪这个问题的 issue 仍然开着。

**为什么是 `CONTEXT.md` 而不是 `GLOSSARY.md`？**
这是整个技能集里被争论最多的命名问题，没有定论。反对当前名字的理由很好：如果它是"词汇表，仅此而已"，`GLOSSARY.md` 就说明了这一点，而且——正如一位读者所说——"对 AI 代理来说一切都是[上下文（context）](https://www.aihero.dev/ai-coding-dictionary/context)"。支持它的理由是地图：`CONTEXT-MAP.md` 指向几个 `CONTEXT.md` 文件，读起来自然，而 `GLOSSARY-MAP.md` 不会；而且 context 是 DDD 里描述模型有界区域的惯用词。至少有一个人维护本地 fork 纯粹是为了重命名这个文件。你也可以这么做，但集合里每一个其他技能都在找 `CONTEXT.md`，所以重命名意味着要修补它们全部。

**`/ubiquitous-language` 去哪了？**
它被移除了，而且不是废弃。它的工作并入了 `domain-modeling`，后者持续维护整个模型，而不是从一次对话里倒出一份词汇表。词汇强制变得更承重了，而不是更轻——它现在跑在盘问、triage 和测绘之下，而不是一个你记得才做的单独环节。

**怎么给一个没有词汇表的代码库弄出一份来？**
明确地要，而不是等它慢慢积累。`/grill-with-docs help me scaffold my existing repo with a CONTEXT.md` 是记录在案的路线；预期一场漫长的盘问——一位用户报告问了 50+ 个问题文件才成型。顺带使用在棕地（brownfield）仓库上构建词汇表的速度太慢了。

**我能保留领域模型、同时用我自己的 ADR 格式吗？**
目前不能干净地做到。词汇表一半和 ADR 一半打包在同一个技能里，所以一个有既定 ADR 惯例的团队——不同的模板、不同的位置、不同的命名——得到的指示会与其内部风格冲突。现在的选项是本地复制技能并编辑它，或者在你仓库自己的代理文档里覆盖 ADR 约定。把两者拆开是[一个未决的请求](https://github.com/mattpocock/skills/issues/557)。

**词汇表真的值得吗？它又多了一个要审查的工件，而且可能过时。**
有时候确实不值得，值得诚实地说明在哪里不值得。DDD 越接近实现越没用——回报在上游，在命名和概念对齐上，不在聚合和分层仪式上。同义词控制在命名边界处重要：模块名、表名、状态枚举、issue 标题、CLI 命令。在普通散文里它重要得多的地方很少。还有一个鲜活的反对意见：领域术语压缩的是*已经共享它们的人类之间*的沟通，而代理对平实的英语描述反应相同——按这个读法，词汇表的价值是让你和你的审查者与代理正在做的事保持对齐，而不是让代理变得更好。在一天的构建上，跳过它。而且一份无人审查、代理写的词汇表比没有更糟：它会变成听起来很自信的传说，后来的会话把它当真理。

**它能替我把含糊的提示词变成领域语言吗？**
不能，也没有计划做一个这样做的技能。一个你自己都不理解的领域语言，一旦写下来就变成毫无意义的废话。这个技能在你拥有理解之后强制精确——它不制造你没有的词汇。相关的陷阱是用领域词而不做建模：错误的概念结构上盖着正确的名词，产出的东西读起来正确、实际上不对。

## 怎样算成功

- 它在一句话中间拦住你，问你说的是两件事里的哪一件，而不是挑一个继续。
- `CONTEXT.md` 在对话**期间**变化，而不是结尾一阵爆发。
- 它拒绝为明天就能撤销的东西写 ADR——并说出三条测试里哪条没过。
- 新条目用一两句话定义某个东西*是*什么，并在 `_Avoid_` 下点名你要放弃的词。
- 当你的代码和你的话不一致时，它把你的代码引回来给你看。
- `CONTEXT.md` 变短的时候和变长的时候一样多。

## 它的定位

`domain-modeling` 是一个**由模型调用的参考**，更多时候跑在*其他技能之下*，而不是单独运行。[grill-with-docs](https://aihero.dev/skills-grill-with-docs) 在一次盘问会话中驱动它，[wayfinder](https://aihero.dev/skills-wayfinder) 在绘制地图时加载它，[triage](https://aihero.dev/skills-triage) 用它让 [tickets](https://www.aihero.dev/ai-coding-dictionary/ticket) 保持用项目自己的话术，[improve-codebase-architecture](https://aihero.dev/skills-improve-codebase-architecture) 在决策结晶时调用它。它最近的兄弟是 [codebase-design](https://aihero.dev/skills-codebase-design)：两者是其他一切之下的词汇层，这个管*领域*，那个管模块的*形状*。它也可以直接触达，当你想要这门纪律、却不想承担通常会拉它进来的那个技能的步骤时。拿不准哪个技能合适时，[ask-matt](https://aihero.dev/skills-ask-matt) 会为你路由。
