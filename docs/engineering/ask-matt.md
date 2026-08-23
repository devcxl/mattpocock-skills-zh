## 它的作用

`ask-matt` 是本仓库所有技能之上的路由器。你描述你所处的情况——一个无法开始的想法、一堆涌入的 bug 报告、一次已经拖了很久的 [session](https://www.aihero.dev/ai-coding-dictionary/session)——它会指出匹配的技能或技能序列，以及该序列中人类决策落在哪里。

它只做推荐并停下。它不会盘问、不会写 [spec](https://www.aihero.dev/ai-coding-dictionary/spec)、不会打开文件，也不会触发它刚点名的技能；你拿回的是下一步该键入什么，由你来键入。它也是本仓库技能的一张人工维护的地图，而不是对你已安装内容的扫描，所以它不会把你路由到你自己的技能或其他作者的技能上。

## 何时使用

你通过键入 `/ask-matt` 来调用它——agent 不会主动使用它。

| 你的情况 | 路由器给出的答案 |
| --- | --- |
| 有个想法，但完全不知道从哪开始 | 主流程的起点，以及这次构建是否小到可以跳过 spec |
| 来自他人的 bug 和需求 | [triage](https://aihero.dev/skills-triage) 入口，以及为什么你自己生成的 [tickets](https://www.aihero.dev/ai-coding-dictionary/ticket) 不该出现在上面 |
| 两个看起来可以互换的技能 | 两者之间的分界线，而且通常是一个具体的测试，而不是口味问题。[grill-me](https://aihero.dev/skills-grill-me) 还是 [grill-with-docs](https://aihero.dev/skills-grill-with-docs)，取决于你是否在工作目录里；[grill-with-docs](https://aihero.dev/skills-grill-with-docs) 还是 [wayfinder](https://aihero.dev/skills-wayfinder)，取决于工作量是否适合一次会话完成 |
| 一次很长的会话，以及关于 [context](https://www.aihero.dev/ai-coding-dictionary/context) 的决策 | 在阶段边界上对五个选项的有序决策树 |
| 一个你已经选好的技能 | 没有有用的答案。直接调用那个技能。 |

## 先决条件

路由器只点名技能，不负责安装。它指向的一切都必须已安装，推荐才可执行；而且它只认识本仓库中晋升出来的技能。

依赖追踪器的路由（triage、`to-spec`、`to-tickets`、`implement`）假设 [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills) 已经在仓库中配置好了一个 issue 追踪器。在那之前，路由器也会照常推荐它们。

## 是流程，不是技能

这个技能给你用来思考的词是**流程（flow）**：一条*穿过*技能的路径，而不是单个技能。为你的情况命名，就把你放到某条流程的某一步上，这与"匹配你关键词的技能"是不同的答案。一共存在四种路由，技能本身完整地承载它们：

- **主流程**，从想法到上线。grill、spec、tickets、implement、review，里面有两条分支：当某个问题需要可运行代码才能敲定时走 prototype 绕行，以及 spec-and-tickets 拆分——只有当构建跨多于一会话时才值得它的成本。
- **入口（on-ramps）**，为那种产生工作再合入主流程的情况：涌入的 bug 报告、某样东西坏了、或一个太模糊、太庞大、无法在一次会话里容纳的工作量。
- **独立技能**，不在任何流程上，按各自的节奏被调用：prototype、questionnaire、你已经坐进的那个合并冲突。
- **底下的词汇层**，当问题是话术而不是流程时，其他技能会拉进来引用的两份参考。

## 阶段边界

它交给你的另一个想法是**阶段边界（phase boundary）**。一个阶段是一次会话内的一截工作（[盘问（grilling）](https://www.aihero.dev/ai-coding-dictionary/grilling)、实现、QA），而两个阶段之间的边界，是"我拿这段上下文怎么办？"这个问题唯一归属的地方。阶段中途没有什么可决定的：继续，或把剩下的拆进 [subagent](https://www.aihero.dev/ai-coding-dictionary/subagent)。

| 选项 | 何时选择 |
| --- | --- |
| **继续（Continue）** | 下一阶段需要这一阶段的原文，或者你还有 [smart zone](https://www.aihero.dev/ai-coding-dictionary/smart-zone) 剩余。这是唯一让会话保持为 [primary source](https://www.aihero.dev/ai-coding-dictionary/primary-source) 的动作，所以先把它排除 |
| **`/clear`** | 身后的一切都可丢弃。棋盘上最便宜的一步，但如果判断错了就是单向的 |
| **[handoff](https://aihero.dev/skills-handoff)** | 有东西需要转移：新的 [harness](https://www.aihero.dev/ai-coding-dictionary/harness)、新的目录、一位同事、一个阶段中途分叉出来的副任务 |
| **子代理（Subagent）** | 任务范围足够紧凑，可以在你 [away from the keyboard](https://www.aihero.dev/ai-coding-dictionary/afk) 时跑 |
| **`/compact`** | 以上都不行。默认选项，而且经常落到这里 |

其中两个经常被搞错，这正是路由器携带顺序而非清单的原因。`/handoff` 读起来像窗口之间的通用桥梁，其实不是——可移植性是它买来的全部。`/compact` 是树的底部而不是第一选择，因为它上面的四个问题每一个都更便宜或更精确。

## 常见问题

**难道就没有一个按正确顺序排列的技能清单吗？**

人们一直要求在 README 里放一个。这份技能就是那份清单——它就是为此而存在的。一张静态表格会写成 `wayfinder → to-spec → to-tickets → implement → code-review`，而对大多数情况来说是错的，因为有趣的在于分支：有没有现成的代码库、构建是否跨会话、这个问题能否靠对话解决。诚实的代价是路由器人工维护，会落后于仓库。`/grilling` 和 `/resolving-merge-conflicts` 都在路由器能点名它们之前很久就已发布。

**它告诉我一半的技能没安装。**

一个已知、未修复的 bug。路由器会路由到的多数技能都设置了 `disable-model-invocation: true`，这意味着 harness 会把它们从注入到 agent 上下文中的技能列表里剔除。agent 把那份列表当作完整清单，于是报告它们缺失。有一份报告的会话中，它宣称整个 spec-and-tickets 流程不存在，转而路由到光秃秃的 `/grilling` 和 `/tdd`。插件二十二个技能中有十三个带这个标志，所以这是常见情况而不是边缘情况。它们已经安装了。照常输入斜杠命令，或者查看 `.claude-plugin/plugin.json`——那才是判断安装内容的权威。

**它描述了某个技能的行为，但该技能并不那样做。**

同样真实，同样未修复。路由器是根据自己对每个技能的一行摘要来回答，而不是根据技能本身。一份详细报告在一次会话中追踪到了三处，其中包括仅凭"把这条线索变成 spec"那句概述就建议跳过 [to-spec](https://aihero.dev/skills-to-spec)——`to-spec/SKILL.md` 从未被打开。在每一个案例里，它都是在用户提出质疑之后才去核实，而且从不会主动核实。在那里跳过 `to-spec` 代价是一次真实的接缝检查，产出的 tickets 也低估了工作量。当路由器对另一个技能断言了某种承重性内容时，让它先打开那个 `SKILL.md`。地图完全没有覆盖的问题也一样，比如是否使用 [plan mode](https://www.aihero.dev/ai-coding-dictionary/agent-mode)：那个答案来自 [model](https://www.aihero.dev/ai-coding-dictionary/model) 的推断，不是写在这里的。

**为什么是散文而不是编号清单？**

合理的抱怨，已作为一个 open issue 提交，理由是大部分路由是确定性的，而叙述性文字让人难以扫读。没什么阻止你要求压缩形式——"直接给我序列"就能得到序列。散文承载的是有条件的那一半：分支、哪里期待人类决策、以及步骤之间在哪里 clear 或 compact。一张扁平清单恰恰丢掉这些。

**它能路由到我的技能或其他作者的技能吗？**

不能。有三个独立的提案要求做一个能读取你本地 `skills/` 目录、并从已安装内容中推荐的路由器。`ask-matt` 不是那种东西。它是一组技能的地图，人工维护，对你编写或从别处安装的技能一无所知。

**它让我编辑 SKILL.md。**

这个建议常常是对的，但很少能持久。有人问它如何让 [implement](https://aihero.dev/skills-implement) 关闭 tickets，得到的建议是给技能加一行，然后立刻发现了问题：`npx skills update` 会覆盖该文件，而插件安装是只读的。把持久性的行为写进你自己的 `CLAUDE.md` 或 `AGENTS.md`，或者在调用时说清楚。提示词层面的适配能挺过更新——把流程指向 Linear 而不是 GitHub，或者问它哪些打开的 tickets 可以并行，都是人们这样做的例子。

**它点名了一个我没有的技能，或者漏掉了一个我有的。**

先查变更日志看看是否改名了，再假设它消失了。`writing-great-skills` 变成了 [writing-for-agents](https://aihero.dev/skills-writing-for-agents)，没有别名；`to-prd` 变成了 [to-spec](https://aihero.dev/skills-to-spec)；`pathfinder` 变成了 [wayfinder](https://aihero.dev/skills-wayfinder)。还有四个技能被整体退役、并入吸收它们的技能：`ubiquitous-language`、`design-an-interface`、`qa` 和 `request-refactor-plan`。反过来就是上面说的路由器自身的滞后。

## 怎样算成功

- 它以点名要输入什么收尾并就此打住，而不是自己开始干活。
- 它给出的路由提到了在哪里 clear 或 compact 上下文、在哪里需要你审查，而不只是一串技能名。
- 当两个技能相近时，它说出选哪个以及为什么另一个对你不合适。
- 它对另一个技能行为所做的任何断言，都能在追踪中表现为它阅读了那个技能的 `SKILL.md`。
- 你在它交还的内容中认出了自己的情况，而不是最接近的通用场景。

## 它的定位

`ask-matt` 是一个**独立路由器**，凌驾于整个技能集之上。它从来不是链条中的一步；它指向每一条链条，也是其他文档页面回链的节点，这样它们谁都不用重画这张图。从这里你最常见的落点是 [grill-with-docs](https://aihero.dev/skills-grill-with-docs)——主流程的起点——或者 [triage](https://aihero.dev/skills-triage)——为"送来的工作"而非"你启动的工作"准备的入口。

对于它所描述的技能，它是 [secondary source](https://www.aihero.dev/ai-coding-dictionary/secondary-source)。当路由器与某个 `SKILL.md` 不一致时，以 `SKILL.md` 为准。