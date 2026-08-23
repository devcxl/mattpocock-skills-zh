## 它的作用

`grill-with-docs` 就一份计划或设计盘问你，直到你和 [agent](https://www.aihero.dev/ai-coding-dictionary/agent) 对它拥有一份共识理解，并在过程中把词汇和艰难的决策写进你的仓库。它和 [grill-me](https://aihero.dev/skills-grill-me) 运行的是同一种访谈（一轮问题，然后等待，然后下一轮），只是指向一个代码库。

它是 **[stateful](https://www.aihero.dev/ai-coding-dictionary/stateful)** 的。其他盘问技能都把 [session](https://www.aihero.dev/ai-coding-dictionary/session) 留在你的脑子里；这个会把文件留在磁盘上。一个术语被敲定，就在那一刻落进 `CONTEXT.md`，而不是结尾批量写入。一个决策通过三道闸门，就作为 ADR 落地。这就是全部区别，也是人们对这个技能的大多数麻烦的来源：工件是真实仓库里的真实文件，所以它们可能在你期待时缺席，也可能在不止一个人写它们时漂移。

## 何时使用

你通过键入 `/grill-with-docs` 来调用它；agent 不会主动使用它。

在一个仓库里、一次变更的开头，当计划还很模糊、事物的措辞还没敲定时，使用它。它是单会话工具。你要哪个盘问技能取决于你面前有什么：

| 你拥有什么 | 使用 |
| --- | --- |
| 你根本不在工作目录里 | [grill-me](https://aihero.dev/skills-grill-me) |
| 一个仓库，和一个你能在一次会话里敲定的变更 | `grill-with-docs` |
| 一个太大、一次会话装不下的工作量（绿地构建、大型功能） | [wayfinder](https://aihero.dev/skills-wayfinder) |
| 一个完全没有领域文档的仓库，脑子里也没有特定功能 | `grill-with-docs`，瞄准仓库而不是某个变更 |
| 一个被卡在别人脑子里的知识卡住的决策 | [to-questionnaire](https://aihero.dev/skills-to-questionnaire) |

与 wayfinder 的分界归结为会话数：单会话规划用 `/grill-with-docs`，多会话规划用 `/wayfinder`。

## 先决条件

技能会写入你的仓库，所以你需要待在一个写入安全的地方。敲定的术语进入根目录的 `CONTEXT.md` 词汇表——或者如果根目录的 `CONTEXT-MAP.md` 把仓库标记为多上下文，则进入相关上下文的 `CONTEXT.md`。决策进入 `docs/adr/`。两者都惰性创建；在第一个术语或决策结晶之前什么都不存在，所以没有需要预先搭建的东西。

它还需要另外两个技能在场，因为它自己的 `SKILL.md` 只有一行，把工作委派给它们：[grilling](https://aihero.dev/skills-grilling) 提供访谈，[domain-modeling](https://aihero.dev/skills-domain-modeling) 提供写入。单独安装 `grill-with-docs` 会得到一个不工作的技能。

## 书面记录

一次会话产出三样东西，它们并不平等。

| 什么敲定了 | 落在哪里 |
| --- | --- |
| 一个术语——项目自己对某个事物的词 | `CONTEXT.md`，内联，敲定的那一刻 |
| 一个难以逆转、脱离上下文令人意外、且是真实权衡的决策 | `docs/adr/` 下的一个 ADR |
| 你决定的其他一切 | 对话里，仅此而已 |

第三行才是让人栽跟头的那个。`CONTEXT.md` 是词汇表，刻意保持为词汇表——没有实现细节、没有 [spec](https://www.aihero.dev/ai-coding-dictionary/spec)、没有草稿笔记。ADR 被同时用三个条件把关，所以大多数决策不够格，大多数会话产不出 ADR。一个产出更锐利的词汇表和零个 ADR 的会话是在按设计工作，但这意味着你达成一致的大部分内容只存在于你达成一致的 [context window](https://www.aihero.dev/ai-coding-dictionary/context-window) 里。把同一段对话交给 [to-spec](https://aihero.dev/skills-to-spec)，而不是 [clearing](https://www.aihero.dev/ai-coding-dictionary/clearing) 它。

词汇表才是重点。领域语言是这个技能真正在构建的东西——项目自己的词，一次敲定，这样你、agent 和你的同事就不再花钱重新推导它们。值得说的是，并非所有人都同意这能买到 agent 性能：最尖锐的公开反驳是，一个术语和它的平实英语展开从 [model](https://www.aihero.dev/ai-coding-dictionary/model) 那里得到同样的结果，而且词汇真正压缩的是共享它的人类之间的沟通。按那种读法，词汇表仍然有价值；只是价值被挪了位置。

## 常见问题

**我应该用这个还是 `/wayfinder`？**

范围决定。任何你能在一次会话里敲定的东西用这个；当工作量太大、一次会话装不下时用 [wayfinder](https://aihero.dev/skills-wayfinder)，它先把工作绘制成一张决策 [tickets](https://www.aihero.dev/ai-coding-dictionary/ticket) 的地图。Wayfinder 更慢、更密，在一个范围良好的功能上用它是最常见的错误。它不替代这个技能——它可以在盘问会话中切入地图中适合单会话的那些部分。

**它跑了，但 `CONTEXT.md` 和 ADR 都没出现。**

两个已知原因。平凡的那个：没有够格的。ADR 需要三道闸门全过，而一个没有新词汇的变更会话确实没什么可写的。真正的 bug：当技能跑在另一个编排层内部（一个 spec 驱动开发包装、一个多 agent 框架、一条把它当作别人流水线里一步的规则）时，文件写入那一半被报告会无声地不发生，而访谈照常跑。这已提交、未修复。如果你在那个环境里，在相信会话输出之前先检查工作目录。

**它一次把所有问题都甩出来，没有推荐，也从来没提 `CONTEXT.md`。**

那是技能没能加载它的两个依赖。因为 `SKILL.md` 是一行委派，一个没有捡起 [grilling](https://aihero.dev/skills-grilling) 和 [domain-modeling](https://aihero.dev/skills-domain-modeling) 的 agent 会猜 grilling 是什么意思，你得到的就是一次无差别的倾倒式提问。部分加载是更让人困惑的情况——`grilling` 加载了，`domain-modeling` 没有，你得到一场不错的访谈却没有书面记录。它与 model 和 [effort](https://www.aihero.dev/ai-coding-dictionary/effort) 级别相关，是这个技能被报告最多的问题。如果你怀疑，直接问 agent 它加载了哪些技能。

**我所有其他决策去哪了？**

只进了对话。这是对这个技能最实质性的公开抱怨：词汇表不是 spec，大多数回答挣不到 ADR，也没有一本把每个敲定的回答与 spec、ticket 和测试串起来的账本。精确的答案——排序保证、否定性需求、数字默认值——在下游被软化成更弱的散文，结果可能看起来完整，却漏掉了你实际决定的东西。今天可用的缓解办法是保留会话，把它直接喂给 [to-spec](https://aihero.dev/skills-to-spec)，并且拿你自己的回答重读 spec，而不是假定它捕获了它们。

**我能把它指向一个完全没有文档的现有仓库吗？**

能。对一个没有 ADR、没有领域语言、没有设计原则的代码库，这正是对的技能——调用它并说"帮我记录我的仓库"。社区模式把它与 [improve-codebase-architecture](https://aihero.dev/skills-improve-codebase-architecture) 配对，用来构建或修复 `CONTEXT.md`。预期要引导它：它会读代码并问你关于发现的问题，而你是那个说出代码库里已有的哪些词才是正确词的人。

**会话结束时我该怎么办？**

技能的收尾消息往往是开放式的，这是一个已知的粗糙边缘。在主流程里，答案是 [to-spec](https://aihero.dev/skills-to-spec)，在同一个对话里。如果变更小到可以立即构建，直接去 [implement](https://aihero.dev/skills-implement) 也行。

**它为什么叫这个名字？**

没人对这个名字满意。有一个未决的建议把它改名为 `grill-domain-model`，那更诚实地描述了行为。没有任何进展。如果改名最终落地，文档页会跟着移动，URL 也会变。

## 怎样算成功

- `CONTEXT.md` 在会话*期间*逐术语变化，而不是结尾一大坨出现。
- 词汇表读起来是纯粹的词汇——你的项目的话加上紧凑的定义——不含实现细节或 spec 式散文。
- 代码库能回答的问题通过读代码库回答，而不是问你。
- 你得到很少或零个 ADR，而得到的那些，是你宁愿不用再争一遍的决策。
- 它挑战你用的一个词，因为你现有的词汇表对它的定义不同。

## 它的定位

`grill-with-docs` 是主构建链的起点：

```txt
grill-with-docs → to-spec → to-tickets → implement → code-review
```

它出现在任何东西被写成 spec 之前：它产出 [to-spec](https://aihero.dev/skills-to-spec) 随后无需再访谈你就能综合的共识理解和敲定的词汇。它近旁的邻居是 [grill-me](https://aihero.dev/skills-grill-me)——同一场访谈但没有仓库、没有文件——以及 [domain-modeling](https://aihero.dev/skills-domain-modeling)，它驱动的词汇表与 ADR 纪律；两者都坐在 [grilling](https://aihero.dev/skills-grilling) 原语之上。在它上游，[wayfinder](https://aihero.dev/skills-wayfinder) 为一次会话装不下的大工作量绘制地图，可以把地图的部分交还给它。拿不准哪个技能或流程合适时，[ask-matt](https://aihero.dev/skills-ask-matt) 为你路由。