## 它的作用

`research` 通过阅读拥有答案的来源来回答一个问题，然后在仓库里留下一份带引用的 Markdown 文件。它只从**[一手来源（primary sources）](https://www.aihero.dev/ai-coding-dictionary/primary-source)**出发——官方文档、源代码、spec、第一方 API——并把每一条论断追回拥有它的来源，所以当 API 自己的文档可达时，它不会复述一篇博客对 API 的转述。

它不在对话里回答你。输出是一个文件，写在仓库已经存放此类笔记的地方，每条论断上带链接。这正是重点：一份你可以回应的文档，可以交给另一个代理，也可以扔掉——而不是一个随[会话（session）](https://www.aihero.dev/ai-coding-dictionary/session)结束而消失的答案。

## 何时使用

键入 `/research`，或者当任务变成阅读跑腿活时[代理（agent）](https://www.aihero.dev/ai-coding-dictionary/agent)会自动使用它。

当下一步是从工作目录之外*查明某事*时使用它——第三方 API 表现如何、spec 实际说了什么、一个版本声明是否成立——而你不想让自己的线程卡在读东西上。你需要什么决定用哪个技能：

| 你需要什么 | 使用 |
| --- | --- |
| 一个决策在等待的外部事实 | `research` |
| 一个*和你一起*、通过访谈做出的决策 | [grilling](https://aihero.dev/skills-grilling) |
| 一个持久的架构决策，写入 `CONTEXT.md` 和 ADR | [grill-with-docs](https://aihero.dev/skills-grill-with-docs) |
| 查明某个方法在你的代码库里是否可行 | [prototype](https://aihero.dev/skills-prototype) |
| 一个太大、无法在一个会话里容纳的计划 | [wayfinder](https://aihero.dev/skills-wayfinder) |

`research` 和 `grill-with-docs` 之间的分界线是**回来之物的保质期**。Research 产出短命的资产——这个库的认证机制截至本周如何工作。ADR 记录一个你保留的决策。如果你产出的是一个决策而非事实，你是在[盘问（grilling）](https://www.aihero.dev/ai-coding-dictionary/grilling)，不是在研究。

## 委派的跑腿活

标志性动作是：阅读以**后台代理**的形式运行。你继续工作；它走开，把每条论断追到一手来源，写一个 Markdown 文件，然后回报。Research 是你委派的跑腿，不是外包的思考——你得到一份可以盘问、规划或设计的文档，而拍板的人仍然是你。

委派是不设防的，后台代理可以再生成一个它自己的后台代理。这是这个技能被记录得最好的粗糙边缘。

文件落在哪里由仓库决定，不由技能决定：它匹配任何已存在的笔记约定，如果没有，它挑一个合理的地方并告诉你。每次运行写一个文件。

## 常见问题

**它生成了第二个研究代理——这是故意的吗？**

不是。这是一个未决 bug，[issue #530](https://github.com/mattpocock/skills/issues/530)。技能叫它的调用者拉起一个后台代理，但不限制代理类型，所以它生成的代理是一个持有 `Agent` 工具和同样指示的 `general-purpose` 代理——于是再次触发它们。一位报告者测量到单个研究任务在三次重叠运行中花费大约 45 万 [tokens](https://www.aihero.dev/ai-coding-dictionary/token)，重复的那个半小时后才完全在视野之外完成。它在 Claude Code 之外也能复现；同样的嵌套在 Codex 里用 GPT-5.6-sol 得到了确认。没有已发布的修复。用户给自己安装的副本打了一个补丁，加了一行告诉已经是[子代理（subagent）](https://www.aihero.dev/ai-coding-dictionary/subagent)的代理自己做这份工作，这有帮助，但属于指示层面，不是结构性修复。调用之后盯紧你的后台任务列表，停掉重复的那个。

相反方向的失败也存在：如果你自己的全局指示禁止代理重新委派工作，后台代理会礼貌地拒绝任务，技能就悄悄地什么都不做。

**文件应该放哪里——我应该提交它吗？**

技能把文件放在仓库已经存放笔记的地方，除此之外没有意见。社区的意见相当一致：ADR 保留，research 文件不保留。它最尖锐的版本，来自一个恰好讨论这个问题的 Discord 线程："ADR 留下。其他一切完成后归档或删除。否则它会变成工作的杂物，如果你已经偏离了 spec/research，还会毒化未来的仓库读取。"一份 research 文件记录的是它写成那天为真的东西，所以一份过时的比没有更糟。总的来说，这些工件不太属于 git，也没有规范的家——人们用 Obsidian、一个独立的知识仓库或 issue 追踪器来放。

**什么算"高信任"的一手来源，谁来决定？**

[模型（model）](https://www.aihero.dev/ai-coding-dictionary/model)决定。技能点名了够格的来源*种类*——官方文档、源代码、spec、第一方 API——没有允许清单、没有域名闸门、没有验证环节。这是技能最初被提出时最响亮的反对意见，而且从未被公开回答："五个指向垃圾的研究子代理，只会更快地给你五个自信的错误答案。你怎么把关什么算高信任来源？"你实际拥有的缓解是每条论断上的引用。跟两三条。如果它们落在一个东西的摘要上而不是东西本身，这次运行就在它唯一的工作上失败了。

**后面的会话会复用前面运行找到的东西吗？**

不会。没有东西自动加载过去的研究文件；它是一份躺在仓库里的文档，直到一个人或一个技能指向它。这在早期被提出为对设计的最强挑战——"价值在于 markdown 成为代理以后重读的上下文，而不是抓取本身。一份写完即死的文件只是花哨的搜索"——而发布的技能没有解决它。实践中，文件靠被刻意喂进下一步来挣到它的存在：附到 spec 上、引到盘问会话里、让一个 [ticket](https://www.aihero.dev/ai-coding-dictionary/ticket) 指向它。

**为什么不直接叫代理去读文档？**

你可以，而一句正好这么说的两行提示正是这个技能取代的做法。技能比提示多买两样东西：它在后台运行，所以你的会话保持[上下文（context）](https://www.aihero.dev/ai-coding-dictionary/context)干净；而且一手来源约束和带引用文件输出每次都以同样的方式出来，而不是取决于你碰巧怎么措辞。对上一个 [harness](https://www.aihero.dev/ai-coding-dictionary/harness) 自己的深度研究模式，区别在于工件和来源纪律，不在于搜索。如果一句两行提示在小问题上能给你需要的，就用那句两行提示。

**它什么时候停止阅读？**

技能里没有停止标准，这表现为两个看起来相反、实则是同一个缺口的抱怨：走得太深的代理，以及广泛覆盖一个话题却漏掉唯一重要细节的代理。一位从业者说"深度研究技能有时太深了。而叫代理去研究通常会导致漏掉关键细节。"范围划定靠你。一个收窄、可回答的问题——一个 API、一个行为、一个版本声明——回来得远比"研究 X"好。

**`/wayfinder` 创建了研究 tickets——我自己解决它们吗？**

不用，它现在会替你触发。在 v1.1 之后的未发布变更里，一次测绘会话会为每个研究 ticket 生成一个 `/research` 子代理并并行烧掉它们，把发现捕获在一次性 `research/<name>` 分支上，ticket 上带一个[上下文指针（context pointer）](https://www.aihero.dev/ai-coding-dictionary/context-pointer)。研究 tickets 是 wayfinder 每会话一个 ticket 规则的唯一例外，因为它们是 [AFK](https://www.aihero.dev/ai-coding-dictionary/afk) 的——没有任何东西在等你。这些分支有两个已知的绊脚石：子代理曾被看到从一条从不打算合并的分支开出一个草稿 PR（[issue #576](https://github.com/mattpocock/skills/issues/576)），以及后来删除分支会弄坏 tickets 持有的上下文指针。

## 怎样算成功

- 你自己的会话继续走。如果你坐着看它读，委派就没发生。
- 恰好出现一个新的后台任务。第二个名字近乎相同的，就是嵌套 bug。
- 一个新的 Markdown 文件出现在仓库已经用来放笔记的文件夹里，代理告诉你路径。
- 里面每条论断都带链接，随机跟两条会落在官方文档、spec 或真正的源文件上——而不是落在某人的转述上。
- 你能单凭文件做出卡住你的决策，不用自己回头查来源。

## 它的定位

一个随时可取的独立技能，喂养思考型技能而不是坐在构建链里。它的文件是要带*进*流程的东西：[grilling](https://aihero.dev/skills-grilling) 和 [grill-with-docs](https://aihero.dev/skills-grill-with-docs) 在事实已经摆上桌时问出更锐利的问题，[to-spec](https://aihero.dev/skills-to-spec) 可以对着它综合。 [wayfinder](https://aihero.dev/skills-wayfinder) 是直接调用它的那个技能，用 `/research` 子代理解决它地图上的每个研究 ticket。要看完整地图，见 [ask-matt](https://aihero.dev/skills-ask-matt)。
