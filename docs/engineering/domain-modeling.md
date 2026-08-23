## 它的作用

`domain-modeling` 在你做设计的过程中构建并打磨一个项目的**统一语言（ubiquitous language）**：质疑与词汇表冲突的术语，逼你在使用含糊词的地方给出一个精确的词，并用具体场景压力测试一个关系，直到边界变得确切。

它是**主动**的纪律，而不是被动的。读 `CONTEXT.md` 来借用它的词汇是任何技能都能做的一行习惯；这个技能是为你正在*改变*这个模型的时候准备的。这就是它会打断你的原因。它在对话进行中、术语敲定的那一刻就把一条已敲定的术语写进 `CONTEXT.md`，而不是在末尾产出一份整齐的词汇表，因为批量版本是某次 [session](https://www.aihero.dev/ai-coding-dictionary/session) 的摘要，而内联版本才是那次 session 的真实产出。

## 何时使用

键入 `/domain-modeling`，或者当任务合适时 agent 会自动使用它。实践中，自动调用是这个技能最弱的一环：当 `grill-with-docs` 或 `wayfinder` 说要加载它时，[model](https://www.aihero.dev/ai-coding-dictionary/model) 经常加载 `grilling` 而跳过这一个。如果一次 [盘问（grilling）](https://www.aihero.dev/ai-coding-dictionary/grilling) 跑完而 `CONTEXT.md` 末尾没被动过，那就是这种情况；按名字把它和其他技能一起调用。

当*话术*本身是问题时使用它：

| 情况 | 动作 |
| --- | --- |
| 两个人对 "cancellation" 的理解不同 | `domain-modeling`：挑出规范术语，把另一个放在 `_Avoid_` 下 |
| "Account" 在三个文件里干着三件事 | `domain-modeling`：把它拆成 Customer 和 User |
| 你刚做了一个难以逆转的架构选择 | `domain-modeling`：如果选择过关，它会出一份 ADR |
| 模块的*形状*是问题——接缝放哪里、接口有多深 | [codebase-design](https://aihero.dev/skills-codebase-design) |
| 你想在动手前把整个计划审一遍 | [grill-with-docs](https://aihero.dev/skills-grill-with-docs)，它在下面驱动这个技能 |
| 你想查一个术语，而不是改它 | 没有。读 `CONTEXT.md`。它是个文件。 |

## 先决条件

开箱即无。这个技能往两个地方写，两者都惰性创建：

- 仓库根目录的 **`CONTEXT.md`**，由第一条被敲定的术语创建。在带根目录 `CONTEXT-MAP.md` 的仓库里，术语进入那张图所指向的、对应上下文的 `CONTEXT.md`。
- **`docs/adr/`**，由第一份过关的 ADR 创建。

开始之前什么都不需要存在，也不会投机创建。

## 两件工件，两道门槛

词汇表和 ADR 被施加不同的标准，把它们混为一谈是这个技能出问题的最大来源。

| | `CONTEXT.md` | `docs/adr/NNNN-slug.md` |
| --- | --- | --- |
| 容纳 | 术语。一个事物**是**什么，一两句话说明，被拒同义词放在 `_Avoid_` 下 | 一个决策，一到三句话：上下文、选择、原因 |
| 写入门槛 | 一个含糊的术语成了规范的 | **三条同时满足**：难以逆转、脱离上下文令人意外、是一项真实权衡的结果 |
| 写入时机 | 术语敲定的那一刻，内联 | 由你提出来，不是默认假设 |
| 永远不写 | 实现细节、一份 [spec](https://www.aihero.dev/ai-coding-dictionary/spec)、一块草稿板、通用编程概念 | 本次会话里每个选择的日记 |

ADR 的三条测试缺任何一条，就不写 ADR。一个容易逆转的决策会被逆转；一个不意外的决策没人会问；一个没有真实替代的决策记下的是"你做了显然的事"。

真正要守住的其实是 `CONTEXT.md` 那条，因为它是实际跑起来时崩掉的那条。**它是词汇表，仅此而已。** 一旦不加约束，model 会把"写到 `CONTEXT.md`"当作把你给的每个答案都持久化的许可，这个文件就会变成一份滚动的 spec。这是这个技能被报告最多的问题，跨多个 model 出现。

## 交叉引用，以及它在哪停下

让这个技能开窍的动作是：当你陈述某件事如何工作时，它对照代码，把矛盾浮出水面。*"你的代码取消整张 Order，但你刚才说部分取消是可能的，哪边对？"* 语言和代码在大声地达成一致，然后才动手改任何一边。

这条边界值得了解。它交叉引用的是**代码**和已提交的 `CONTEXT.md`/ADR，仅此而已。它不去搜你的 issue 追踪器，所以一个几个月前在已关闭 issue 里争辩过、被刻意敲定下来的命名碰撞，会像新发现一样被浮出。[这里有一个开放请求](https://github.com/mattpocock/skills/issues/717) 修复它；眼下，变通办法是把指令放进你自己的 `docs/agents/domain.md`，技能已经会读那份文件。

## 常见问题

**我的 `CONTEXT.md` 有 500 行。1000 行。3000 行。我该怎么办？**

大小是一个症状，不是问题本身。词汇表膨胀有两类原因，都不罕见。

一是 model 把"写到 `CONTEXT.md`"读成了持久化一切的许可——把答过的问题、讨论过的想法、甚至这次的 [spec](https://www.aihero.dev/ai-coding-dictionary/spec) 都写进去。修法是显式收紧，把词汇表的范围以一二句话重述一次，并要求新条目必须替代某条旧的、不只是新增。

二是问题被解决了，文件却没被收拾。一些久条目被新术语覆盖而没被删除、过时的 `_Avoid_` 仍然指向没人再用的旧词、ADR 引用了已删掉的模块名字。这些没法靠模型自发清理。最实际的做法是偶尔把文件和人一起过一遍，把死掉的引用当 bug 处理。

**为什么叫 `CONTEXT.md` 而不是 `GLOSSARY.md`？**

这件事被反复讨论过，没有敲定的答案。反对当前命名的理由很有力：如果它是"一份词汇表，仅此而已"，那 `GLOSSARY.md` 直接这么说，正如一位读者所说："with ai agents everything is [context](https://www.aihero.dev/ai-coding-dictionary/context)"。支持它的理由是那张图：`CONTEXT-MAP.md` 指向多份 `CONTEXT.md`，读起来比 `GLOSSARY-MAP.md` 自然，并且 `context` 是 DDD 里表示有界模型区的现成词。至少有一人专门维护一份本地 fork 来给文件改名。你也可以这么做，但技能集合里其他技能都去找 `CONTEXT.md`，所以改名意味着把它们全打补丁。

**`/ubiquitous-language` 去哪了？**

它被移除了，并且不是被废弃。它的活儿搬进了 `domain-modeling`，后者持续维护整个模型，而不是从一次对话里倒一份词汇表。词汇表强制执行变得更承重了，不是更轻：它现在跑在盘问、triage 和 mapping 的下面，而不是作为一个你记得要做一遍的独立环节。

**我怎样为一个没有词汇表的代码库弄出一份？**

显式要它，而不是等它自己累积。`/grill-with-docs help me scaffold my existing repo with a CONTEXT.md` 是文档化的路径；预期是一场长盘问——一位用户报告在文件成形前被问了 50+ 个问题。在棕地（brownfield）仓库上，靠偶发使用来建立词汇表远远不够快。

**我能保留 domain model，但用我自己的 ADR 格式吗？**

今天还做不到干净。词汇表一半和 ADR 一半打包在一个技能里，所以一个已有 ADR 规约的团队（不同的模板、不同的位置、不同的命名）会得到与本队风格相冲突的指令。当前的选项是本地复制这份技能并编辑，或者在你仓库自己的 agent 文档里覆盖 ADR 规约。把两者拆开是一个[开放请求](https://github.com/mattpocock/skills/issues/557)。

**词汇表真的值得吗？它又是一件要审查的工件，而且会过期。**

有时不值，并且值得诚实说出哪里不值。DDD 越靠近实现就越没那么有用：回报在上游，在命名和概念对齐，不在聚合和分层仪式。控制同义词在命名边界重要：模块名、表名、状态枚举、issue 标题、CLI 命令。它在普通散文里重要得多。还有一种活的反对意见：领域术语压缩的是*已经共享*它们的人之间的沟通，而 agent 对平实英语描述的回应方式相同。按那种读法，词汇表的价值是让你和你的评审者与 agent 在做的事对齐，而不是让 agent 更好。在一天就能完成的构建上，跳过它。一份未经评审、agent 作的词汇表比没有更糟：它会变成自信腔调的口传知识，让后来的会话当作真理。

**它能替我把含糊的提示变成领域语言吗？**

不能，而且没有计划做这样的技能。一门你自己都不理解的领域语言，一旦写下来就变成毫无意义的废话。这个技能在你已经拥有理解之后强制精确；它不会制造你没有的词汇。相关的陷阱是用领域词而不做建模：正确的名词盖在错误的概念结构之上，产出读起来对、其实不对的产物。

## 怎样算成功

- 它在你说到一半时打断你、问你到底指的是两个中的哪一个，而不是自己挑一个继续。
- `CONTEXT.md` 在**对话进行中**变化，而不是在末尾一次性爆发。
- 它拒绝为一件你明天就能撤销的事写 ADR，并指出三条测试中哪条挂了。
- 新条目用一两句话定义一个事物*是*什么，并在 `_Avoid_` 下点明你放弃的那些词。
- 当你的代码和你的句子不一致时，它把你的代码引述给你看。
- `CONTEXT.md` 变短的频率和变长的频率一样高。

## 它的定位

`domain-modeling` 是一个**模型调用的参考**，*在*其他技能*之下*跑的次数比单独跑的次数多。[grill-with-docs](https://aihero.dev/skills-grill-with-docs) 在一次盘问中驱动它，[wayfinder](https://aihero.dev/skills-wayfinder) 在绘制地图时加载它，[triage](https://aihero.dev/skills-triage) 用它让 [tickets](https://www.aihero.dev/ai-coding-dictionary/ticket) 保持项目自己的话术，[improve-codebase-architecture](https://aihero.dev/skills-improve-codebase-architecture) 在决策结晶时调用它。它最近的同胞是 [codebase-design](https://aihero.dev/skills-codebase-design)：两者是其他一切之下的词汇层，一个是给*领域*的，一个是给模块*形状*的。它也能直接被调到——当你想要这种纪律、又不想被通常会拉它的那个技能的步骤绑住的时候。拿不准哪个技能合适时，[ask-matt](https://aihero.dev/skills-ask-matt) 给你路由。