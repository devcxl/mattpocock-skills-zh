## 它的作用

`wait-what` 是一条消息没接住时你键入的指令。[agent](https://www.aihero.dev/ai-coding-dictionary/agent) 随后会重新讲一遍它刚才说的。它补上你缺失的上下文，用平实的英语，并使用你项目 `CONTEXT.md` 里的词汇。

这个技能只有三行长。这是设计，而不是未完成的草稿。对抗冗长的技能败在越长越大：一个四百行的简洁技能还是会让 [model](https://www.aihero.dev/ai-coding-dictionary/model) 冗长，因为模型读的是体量，不是哀求。这份只装一个精确的引导词，别的什么都不带。

## 何时使用

通过键入 `/wait-what` 来调用它。agent 不会主动触发它，也不应该。只有你知道你何时停止了跟随。

一发现自己开始略读就立刻用。agent 已经飘进了它自己造的术语、堆了五个缩写、或者解释了一个你从未见过的前提的决定。它修的是你正在进行的这段对话。要让那些术语根本不出现，使用 [grill-with-docs](https://aihero.dev/skills-grill-with-docs)，它会从一开始就建立共享语言。

## 名字就是机制

引导词是**wait**。"Be concise" 是对 agent 输出的指令，模型照做的办法是剪掉词、让你更不明白。**Wait** 关系到的是*你*的状态。它说的是理解在这里失败了。一个听到"be brief"的 agent 写的是电报。一个听到"wait, you lost me"的 agent 会退一步解释。

这种区别就是整个技能。每一个常见的"治冗长"的方案都点了*输出*的名：`/tldr`、`/no-fluff`、`/talk-normal`。模型矫枉过正地进入一种穴居人式的语域，又短又不清楚。点*听者*的名一次要的是两半：更少的词**加上**你缺失的上下文。

技能说的是"重新讲**那个**"，而不是"上一条消息"。让你跟丢的通常不止一段，所以 agent 自己决定要回退多远。

## 它接入你已经有的语言

正文复用你全局 `CLAUDE.md` 和项目 `CONTEXT.md` 里已有的引导词。ASD-STE100 简化技术英语定调。通用语言提供名词。技能、`CLAUDE.md` 和 `CONTEXT.md` 拿的是同一组 [tokens](https://www.aihero.dev/ai-coding-dictionary/token)，所以触发它并不是下达一条新指令。它是在提醒一条 agent 早已同意过的指令。

如果没有 `CONTEXT.md`，技能仍然能工作。你失去的只是领域词汇那一半。

## 怎样算成功

- 重新讲的那一遍**更短也更清楚**，而不是更短也更钝。
- 它补上了你缺失的前提，而不是只删词。
- 项目的名词替换了被造出来的那些。你 `CONTEXT.md` 里的词回来了。
- 你可以连续用两次，它不会退化成简略。

## 它的定位

你可以在任何时点、任何对话、任何其他技能内部使用 `wait-what`。它在事后修补一条消息。真正的治本是事先约定一套共享语言，那就是 [grill-with-docs](https://aihero.dev/skills-grill-with-docs)：一场 [grilling](https://www.aihero.dev/ai-coding-dictionary/grilling) session 一边跑 [domain-modeling](https://aihero.dev/skills-domain-modeling)，于是你们双方用的词都落到 `CONTEXT.md` 里。当你不确定哪个技能适合当下时，[ask-matt](https://aihero.dev/skills-ask-matt) 给你路由。
