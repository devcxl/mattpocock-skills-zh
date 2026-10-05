## 它的作用

`grill-me` 把一个**模糊的想法**作为访谈对象，直到你能对它做出承诺。开始时不必有完整计划，因为这次 [session](https://www.aihero.dev/ai-coding-dictionary/session) 就是为了产出计划。它分轮提问。每一轮覆盖完整的**前沿**：所有前置问题已经解决的问题。因此，它不会问依赖于它尚未听到的答案的问题。

它是**[无状态](https://www.aihero.dev/ai-coding-dictionary/stateless)**的：不写任何文件，也不留下工作区。它唯一留下的，是你脑中一个更清晰的想法。

## 何时使用

你通过键入 `/grill-me` 来调用它：[agent](https://www.aihero.dev/ai-coding-dictionary/agent) 不会主动使用它。在**一次全新的对话**中开始，而不是叠加在某个你已经让 agent 写好的计划之上。

当你有一个值得认真对待的想法时就使用它：一个功能、一个产品方向、一个商业决策、一篇文章，而且要早于你弄清它涉及什么。模糊不是等待的理由，因为这次 session 就是为了消除模糊。如果你已经能精确说明这件事，就不需要盘问它。

想用哪一种 grilling 技能，取决于你面前是什么：

- **任何事、任何地方。** 用 `grill-me`。它不需要仓库、不写文件，主题也不必是代码。
- **要对照一份代码库。** 用 [grill-with-docs](https://aihero.dev/skills-grill-with-docs)。它进行同样的访谈，但[有状态](https://www.aihero.dev/ai-coding-dictionary/stateful)：会读取你的代码，并把学到的东西保存在 `GLOSSARY.md` 和 ADR 里。
- **一次会话装不下。** 用 [wayfinder](https://aihero.dev/skills-wayfinder)。它把整项工作画成一张地图，并在其中运行 grilling session。

把 [plan mode](https://www.aihero.dev/ai-coding-dictionary/agent-mode) 关掉。Plan mode 会让 agent 急着产出计划，而你需要的是让它继续提问。

## 这是一场对话，不是一场访谈

技能负责提问，但**你**掌握范围。这是最常被忽视的部分，也是把"把想法变成决策"和"产出自信的胡说"区分开的所在。

失败模式是**被动**：连续四十个问题都回答"同意、同意、同意"，最终拿到一份 agent 写、你点头的计划。它看起来很有产出，因为它很长。实际上什么都没决定，结果却带着它不配有的笃定。

主动意味着引导：对细节不够的问题提出反驳；范围跑偏时指出来；回答"我不知道"，并且是真不知道。这个技能帮助工程师，而不是替代工程师。结果的质量取决于你回答的质量，而不是问题的数量。

相反的错误也存在但更少见：在访谈中停得太久，一直写不到代码。

## 可盘问 vs 不可盘问

有些问题可以通过谈话解决。其它的不行，再多的 grilling 也无济于事。

"一长页还是三短页？"和"这种交互应该是什么感觉？"是**不可盘问**的：它们需要点东西让你去反应。当遇到这种问题就停下盘问。用 [prototype](https://aihero.dev/skills-prototype) 做出可丢弃的版本，看一眼，再回来用一句话作答。

在不可盘问的问题上谈下去就是 session 膨胀的地方：agent 不断换说法，你不断猜，范围膨胀到填满不确定性。

## 怎样算成功

- 你在某处不同意。整场没有来自你的反对，就是一场你并不需要的 session。
- 问题分几轮到来，而不是一长串；后一轮明显建立在你之前说的上。
- 你最终去了一个你没预料到的地方，因为某个问题浮现出一个你一直在隐含做出的决定。
- 结束时你能把每个选择向一个不在场的人解释清楚。

## 常见问题

**我应该预期多少个问题？怎么知道它何时结束？**
数轮数，不数问题数。四轮共 46 个问题是常见的 session。它在前沿为空时结束：每个分支都被走过，没有什么是被默默假设的。

**它问了我两百个问题。哪里出问题了？**
通常范围太大。让 agent 先把工作拆成更小的块，再分别盘问每一个。非常长的 session 也会滑进 **[dumb zone](https://www.aihero.dev/ai-coding-dictionary/smart-zone)**：[context window](https://www.aihero.dev/ai-coding-dictionary/context-window) 已经足够满，问出来的问题质量开始变差。

**我能退回到一次一个问题吗？**
可以。在你的全局 `CLAUDE.md` 里加这一行：

```
When grilling, ask one question at a time.
```

**如果我真的不知道答案呢？**
说出来。"我不知道"是一个真实的回答；一个你答不出来的问题通常意味着该去做 prototype，而不是去猜。

**我是不是该在写规格之前新开一个 session？**
不用。这次 session 的价值就是你刚建立起来的 [context](https://www.aihero.dev/ai-coding-dictionary/context)。把同一段对话直接交给 [to-spec](https://aihero.dev/skills-to-spec)。

**模型重要吗？**
比大多数技能更看模型。grilling 依赖 [model](https://www.aihero.dev/ai-coding-dictionary/model) 自己对系统如何出错的判断，所以用你最好的那个。实现阶段主要靠上下文，能容忍差一些的模型。

## 它的定位

`grill-me` 是一个**可随时取用的独立工具，可在任何地方、对任何事使用**。无状态是它便携的原因：不需要仓库、工作区、配置，也不假设这个想法甚至和软件相关。人们把它对准商业决策、写作、"下一步该干什么"：任何在他们脑中坐不住的东西。

这种便携性正是它和 [grill-with-docs](https://aihero.dev/skills-grill-with-docs) 的全部区别：后者跑同样的访谈，但会读一份代码库来对照，并把学到的东西记录为 `GLOSSARY.md` 和 ADR。两者都在底层使用 [grilling](https://aihero.dev/skills-grilling) 技能；`grill-me` 是不携带状态、由用户调用的入口。

如果你盘问的东西结果确实是软件，你可以把同一段对话交给 [to-spec](https://aihero.dev/skills-to-spec)，继续走构建流程：这是一个可选，而不是这个技能的目的。不确定哪条流程合适时，[ask-matt](https://aihero.dev/skills-ask-matt) 给你路由。
