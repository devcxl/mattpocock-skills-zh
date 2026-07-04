Quickstart:

```bash
npx skills add mattpocock/skills --skill=research
```

```bash
npx skills update research
```

[Source](https://github.com/mattpocock/skills/tree/main/skills/engineering/research)

## What it does

`research` 在一个**后台 agent** 中调查关于代码库外部事实的问题——官方文档、源码、规范、第一方 API——并留下一个带引用的 Markdown 文件，位置与仓库存储此类备忘的位置一致。同时你继续自己的工作：无需上下文切换，无需打断流程。

它**从不超过一个问题**。每次调用是一个原子作业：一个到五个来源，一份文件。更广泛的问题应该拆分为多次单独调用。

## When to reach for it

输入 `/research`，或者当任务适合时代理会自动调用它。

当你需要一个快速的事实核查，但不想将注意力从当前正在构建或设计的内容上移开时使用。当你需要向 [grill-with-docs](https://aihero.dev/skills-grill-with-docs)、[to-prd](https://aihero.dev/skills-to-prd) 或 [domain-modeling](https://aihero.dev/skills-domain-modeling) 提供外部事实时，也同样有用——在盘问之前预先加载上下文。

与其他技能不同，这是**委托式阅读工作**：你打字让它学习，然后继续工作。它完成后会通知你。

## Verifiable, cited, and gone

整个技能围绕一个约束展开：每个声明必须有归属。它执行三条规则——**官方来源优先于二次来源**、**精确引用**（带有直接引文或定位信息）、**尽你所能**（使用任何可用的可靠来源，如果没有官方来源，就选择最好的可用来源）。然后文件就位，你可以稍后阅读或直接针对它工作。如果需要盘问结果，可使用 [grilling](https://aihero.dev/skills-grilling)。

## Where it fits

`research` 是一个随时可用的独立技能——一种委托式原语，位于构建链之前或之下，无论你何时将不确定性视为提升的杠杆。它的自然邻居是 [grill-with-docs](https://aihero.dev/skills-grill-with-docs)，后者在一轮盘问中对计划本身进行压力测试；以及 [prototype](https://aihero.dev/skills-prototype)，后者构建可丢弃的代码来回答一个设计问题（与阅读相对，构建性的探究）。当你不确定适合哪种技能或流程时，[ask-matt](https://aihero.dev/skills-ask-matt) 会为你指引。
