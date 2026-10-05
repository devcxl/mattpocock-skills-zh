## 它的作用

`retro` 回顾一次编码 [session](https://www.aihero.dev/ai-coding-dictionary/session)，为 agent 的 **[environment](https://www.aihero.dev/ai-coding-dictionary/environment)** 提出改进建议，让下一次运行更顺。它读取会话自己的记录（默认是当前会话，也可以是你在会话日志中指定的会话），找出 agent 遇到困难的时刻，并按严重程度给你一份候选修复清单。

它改的是环境，不是代码。比如 agent 发出去的 bug、花了二十次 [tool call](https://www.aihero.dev/ai-coding-dictionary/tool-call) 才找到的文件，或评审者漏掉的规则，`retro` 都不会直接修复。它会追问仓库中是什么让这些问题得以发生，并提出能防止它们再次发生的检查、指针或规范。它只提出建议；在你选中候选之前，什么都不会改变。

## 何时使用

你输入 `/retro` 来调用它，agent 不会自行拿起它。

在一次本不该这么难的会话结束时使用它。例如，agent 为某样东西找了太久、犯了一个工具本可以抓住的错误，或需要它无法取得的信息。顺利的会话没什么可教，困难的会话才会带来发现。如果你想评判这次会话产出的代码，请改用 [code-review](https://aihero.dev/skills-code-review)。

## 发现落在哪里

每个候选都属于一个类别，而类别决定修复去向哪里：

| 会话里出了什么问题 | 用什么修 |
| --- | --- |
| agent 花了很久才找到文件或事实 | 从它已经在读的文件出发的**导航指针** |
| 犯了一个工具本可以抓住的错误 | 一个**[自动化检查](https://www.aihero.dev/ai-coding-dictionary/automated-check)**：lint 规则、类型、测试、pre-commit 钩子、CI job |
| 评审者漏掉了一个判断类错误 | `CODING_STANDARDS.md` 里给评审 agent 的一条规则 |
| `AGENTS.md` 或 `CLAUDE.md` 很大 | 把引导挪出去，移进规范或检查 |
| 某次工具调用相对于产出很昂贵 | 精简这个工具，或替换它 |
| 引导文件里塞满了不改变任何行为的行 | 删掉这些**空操作** |
| agent 需要它触及不到的信息 | 拓宽它的访问：把 dev server 日志 tee 到文件、给某服务只读权限 |

核心思想是：规范属于**评审者**，而不是实现者。实现 agent 的上下文压力最大，因为它要探索、写代码并调试失败；评审 agent 拿到的只有一份 diff。因此新规则应放在有余力执行它的地方，也就是评审阶段。绝不要把它放进 [AGENTS.md](https://www.aihero.dev/ai-coding-dictionary/agents-md)，因为该文件无论是否相关，都会加载进每次会话的[上下文窗口](https://www.aihero.dev/ai-coding-dictionary/context-window)。

在写规则之前，`retro` 会先对违规分类。**机械性**违规（被禁用的 API、某种 import 形式、文件位置规则）要用确定性检查，因为检查可以失败，而规范文件里的一句话不会。只有真正无法由 linter 强制执行的判断，才写成散文。如果仓库完全没有护栏（没有 pre-commit 钩子，也没有运行 lint、typecheck 和测试的 CI job），`retro` 会把这本身作为一条发现报告。

## 常见问题

**lint 规则是它自己写，还是等你说可以？我能把它接在每次会话后运行吗？**

它等。`retro` 只提建议；在你挑中候选之前，什么都不会变，所以既没有人工编辑，也没有自动应用的钩子。这是刻意的：一位用户在"被自动钩子卡掉好变更烫过"之后，要的正是这个。决定什么值得一条永久检查需要判断力，所以这个技能保持[人在环里](https://www.aihero.dev/ai-coding-dictionary/human-in-the-loop)且由用户调用。也有用户确实把它串在每次实现之后，但顺利的会话没什么可教，每次都跑多半会产出没人需要的规则。没有 dry-run 模式：提议的检查像其他代码一样构建，所以在让它拦合并之前，先拿仓库试它。

**这不会永远堆积 lint 规则吗？它建议过删掉某条吗？**

一半会，这是它最弱的一环。它有的删除面覆盖散文：引导文件里的空操作，以及 `AGENTS.md` 或 `CLAUDE.md` 里本应属于规范或检查的引导。文件很大时，它会把这些标为删除候选，判断依据是它正在读的那次会话，所以把每一条都当作删除测试的候选，而不是判决。它不审计它上个月提议的 lint 规则、钩子或 CI job。它只看见一次会话，所以它无法告诉你某条规则已经变得吵闹，或早已熬过了当初立它的 bug。修剪检查仍是你的活；一条在好代码上频繁触发的规则就是提示。

**它不会只是编一些泛泛的建议来填满类别吗？**

这是对它最有力的批评。一位用户发现："一旦任务结束，AI 往往会忘掉会话中段的挣扎，然后编造泛泛的建议来满足 retro 的类别。"每个候选都必须来自会话自己的记录，因此建议会针对那次会话；但这也有代价：它很少凭空编出无关内容，却可能过度看重这一次会话碰巧涉及的事情。丢掉任何你追溯不到具体时刻的候选。也把严重程度排序当作初稿，因为一个安静而昂贵的错误，可能排在一个响亮而便宜的错误后面。

**我的会话很长。现在跑，还是开个新会话？**

默认它评审当前会话，这是最好的情况：挣扎还在上下文窗口里。如果会话已经漂出了[智能区](https://www.aihero.dev/ai-coding-dictionary/smart-zone)，就 [clear](https://www.aihero.dev/ai-coding-dictionary/clearing)，然后在会话日志里让一个全新的 `/retro` 指向之前那次会话。

**agent 一直犯同样的错误。我该在 `CLAUDE.md` 里加一行吗？**

通常不该，而这是 `retro` 最常回推的地方。`CLAUDE.md` 里的一行会加载进每次会话、削弱文件中其他内容的作用，并随代码变化而过时。如果错误是机械性的，修复方式是添加一条会失败的检查；如果是判断问题，就写进评审者会读的编码规范。`AGENTS.md` 和 `CLAUDE.md` 用于导航指针，其他内容少放。同理，`retro` 不是[记忆系统](https://www.aihero.dev/ai-coding-dictionary/memory-system)：它不存储发生过什么，而是改变环境，让同一错误无法再次发生。

**我的配置提到 `CODING_STANDARDS.md`，但我没有这个文件。它是从哪来的？**

没有东西自带这个文件。第一次有会话为评审者找出了一条判断类规则时，`retro` 会提议创建它，你接受之后，[code-review](https://aihero.dev/skills-code-review) 从此就会读它。你已有的任何其他规范文档，比如 `CONTRIBUTING.md`，用法一样。

**它和 `improve-codebase-architecture` 有什么不同？**

输入不同。[improve-codebase-architecture](https://aihero.dev/skills-improve-codebase-architecture) 除了代码什么都不需要，寻找的是代码的结构性改进。`retro` 需要会话历史，改进的是 agent 的工作环境而不是代码。两者并肩而立，互不替代。

## 怎样算成功

- 每个候选都能指回会话里某个具体时刻，而不是泛泛的最佳实践。
- 重复错误变成会失败的检查，而你的 `AGENTS.md` 随时间变短，不是变长。
- 如果已有检查却没有接入，发现应是把它接起来，而不是提议新建一条。
- 同类任务的下一次会话能更快找到所需内容。

## 它的定位

`retro` 是主链的最后一步，用来回顾整条流程的执行情况：

```txt
grill-with-docs → to-spec → to-tickets → implement → code-review → retro
```

在一次值得学习的构建之后运行它，同一次会话里，或指向那次会话的日志。顺利的构建可以跳过。

- [code-review](https://aihero.dev/skills-code-review) 是 `retro` 最常调校的评审 agent：新的编码规范落在它的 Standards 轴读取的地方。
- [writing-for-agents](https://aihero.dev/skills-writing-for-agents) 为 `retro` 提议的每一份引导文件和技能设定写作风格，`retro` 在开始前会加载它。

拿不准处境需要哪个技能时，[ask-matt](https://aihero.dev/skills-ask-matt) 在整个技能集合上为你路由。
