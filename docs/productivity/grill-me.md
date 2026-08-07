## 它的作用

`grill-me` 对一个**模糊的想法**进行访谈，直到你能对它做出**承诺**。你不需要一个完整的计划才能开始——产出计划正是这个 [session](https://www.aihero.dev/ai-coding-dictionary/session) 的用途。它以**轮次**提问：每一轮都是整个 **frontier**——所有前提条件已确定的问题——所以你永远不会被问到某个取决于尚未听到答案的问题。

它是**[无状态](https://www.aihero.dev/ai-coding-dictionary/stateless)**的。它不写任何文件，也不在工作区留下任何痕迹。它唯一留下的，是你脑海中一个更锐利的想法。

## 何时使用

你通过键入 `/grill-me` 来调用它——[agent](https://www.aihero.dev/ai-coding-dictionary/agent) 不会主动使用它。在**全新的对话**中开始，而不是叠加在某个已经让 agent 写好的计划之上。

当你有一个值得认真对待的想法时就用它——一个功能、一个产品方向、一个商业决策、一篇文章——远在你弄清楚它涉及什么之前。模糊不是等待的理由；它正是这个 session 要消化的东西。如果你已经能精确描述它，你就不需要盘问它。

三个盘问技能的选择取决于你面前是什么：

- **任何地方、任何主题**——`grill-me`。不需要仓库，不写文件，主题也不必是代码。
- **要对着代码库对齐**——[grill-with-docs](https://aihero.dev/skills-grill-with-docs)。同样的访谈，但是[有状态](https://www.aihero.dev/ai-coding-dictionary/stateful)的：它阅读你的代码，并把学到的东西保存在 `CONTEXT.md` 和 ADR 中。
- **大到一次会话装不下**——[wayfinder](https://aihero.dev/skills-wayfinder)。它把工作绘制成一张地图，并在其中运行盘问会话。

关闭 [plan mode](https://www.aihero.dev/ai-coding-dictionary/agent-mode)。Plan mode 会让 agent 急于产出计划，这与保持追问恰恰相反。

## 它是对话，不是访谈

技能负责提问，但**你**掌握范围。这是人们容易忽略的部分，也是区分"把想法变成决策"和"产出自信的废话"的关键。

失败模式是**被动**——连续四十个问题回答"同意、同意、同意"，最后得到一个 agent 写的、你点头认可的计划。它感觉很高效，因为它很长。实际上什么都没被决定，结果却带着它不配拥有的确定性。

主动意味着引导。对低于你所需保真度的问题提出反驳。当范围漂移时指出来。回答"我不知道"并且是真的不知道。这个技能是为辅助工程师而建，不是替代工程师：产出的质量取决于你回答的质量，而不是问题的数量。

相反的错误也存在但更少见——在访谈中停留太久，以至于永远到不了写代码的阶段。

## 可盘问与不可盘问

有些问题可以通过对话回答。另一些不行，无论怎么盘问都到不了答案。

"用一页长文还是三页？"和"这个交互应该是什么感觉？"是**不可盘问**的——它们需要一些可以反应的东西。遇到这种问题时，停止盘问。用 [prototype](https://aihero.dev/skills-prototype) 构建一个一次性版本，看一看，然后回来用一句话回答。

靠对话硬啃一个不可盘问的问题，正是会话失控膨胀的地方。agent 不断换措辞，你不断猜测，范围随着不确定性一起膨胀。

## 它发挥作用的表现

- 你对某些东西表示不同意。没有你反驳的会话，是你不需要的会话。
- 问题以少数几轮而非一次漫长滴漏的形式到来，后面的轮次明显建立在你之前的回答之上。
- 你最终到达了一个意想不到的地方，因为某个问题浮出了一直以来被你隐式做出的决策。
- 结束时，你能为每个选择向一个不在场的人辩护。

## 常见问题

**我应该预期多少个问题，怎么知道何时结束？**
数轮次，不要数问题。四轮四十六个问题是一次普通会话。当 frontier 为空时结束——每个分支都被访问过，没有东西被默默假定。

**它问了我两百个问题。哪里出了问题？**
通常是范围太大。让 agent 先把工作拆成小块，然后逐个盘问。非常长的会话也会漂移到**[愚笨区](https://www.aihero.dev/ai-coding-dictionary/smart-zone)**，此时[上下文窗口](https://www.aihero.dev/ai-coding-dictionary/context-window)已满，问题质量开始下降。

**我能回到一次只问一个问题吗？**
可以。把它加入你的全局 `CLAUDE.md`：

```
When grilling, ask one question at a time.
```

**如果我确实不知道答案怎么办？**
说出来。"我不知道"是一个真实的答案，一个你答不上来的问题通常是应该去 prototype 而不是猜测的信号。

**写 spec 之前要开新会话吗？**
不需要。这个会话的价值就在于你刚刚建立的[上下文](https://www.aihero.dev/ai-coding-dictionary/context)。把同一个对话直接交给 [to-spec](https://aihero.dev/skills-to-spec)。

**模型重要吗？**
比大多数技能更重要。盘问依赖[模型](https://www.aihero.dev/ai-coding-dictionary/model)自己对系统如何崩溃的判断，所以给它你最好的模型。实现部分主要跟随上下文，可以容忍更便宜的模型。

## 它的定位

`grill-me` 是一个**可以在任何地方、针对任何事物运行的独立技能**。无状态正是它可移植的原因：没有仓库、没有工作区、没有设置，也不假设想法一定与软件有关。人们把它用在商业决策、写作、下一步做什么上——任何在脑子里坐不住的东西。

这种可移植性正是它与 [grill-with-docs](https://aihero.dev/skills-grill-with-docs) 的全部区别——后者运行同样的访谈，但阅读代码库来对齐，并把学到的东西记录为 `CONTEXT.md` 和 ADR。两者都建立在 [grilling](https://aihero.dev/skills-grilling) 原语之上；`grill-me` 是用户调用的、不携带任何东西的前门。

如果你盘问的东西最终确实是软件，你可以把同一个对话交给 [to-spec](https://aihero.dev/skills-to-spec) 继续进入构建流程——这是一个选项，不是这个技能的重点。当你不确定该用哪个流程时，[ask-matt](https://aihero.dev/skills-ask-matt) 为你路由。
