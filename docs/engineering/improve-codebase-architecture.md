Quickstart:

```bash
npx skills add mattpocock/skills --skill=improve-codebase-architecture
```

```bash
npx skills update improve-codebase-architecture
```

[Source](https://github.com/mattpocock/skills/tree/main/skills/engineering/improve-codebase-architecture)

## 它的作用

`improve-codebase-architecture` 扫描代码库寻找**加深机会**——浅层模块（接口几乎和它隐藏的东西一样复杂）可以变成深层模块的地方——将其呈现为一个自包含的可视化 HTML 报告，然后通过盘问逐一处理你选择的候选点。

它**不会**给你一份扁平的重构清单。每个候选点都必须通过**删除测试**——移除这个模块是会将复杂度*集中*到更小的接口后面，还是仅仅将其搬了个地方？只有"集中"的情况才会生成一个卡片。这个过滤器正是防止报告变成泛泛的清理建议的关键。

## 何时使用

你通过键入 `/improve-codebase-architecture` 来调用它——代理不会主动使用它。

作为定期健康检查使用：每隔几天，或者当代码库开始让人觉得为了理解一个概念需要在多个小模块之间来回跳转时使用。它会阅读现有架构并提议在哪里加深它。如果你已经知道想要重新设计的模块，只是需要一些术语来理清思路，请使用 [codebase-design](https://aihero.dev/skills-codebase-design)——本技能是寻找候选点的调查工具，那个是设计工作台。

## 加深机会

整个技能围绕一个核心理念：**深度**。一个深层模块通过一个小型、稳定的接口隐藏了大量功能；一个浅层模块则通过一个几乎和底层代码一样宽的接口泄露了它的实现。报告寻找浅层性——仅为了可测试性而提取的纯函数，而真正的 bug 隐藏在调用方式中（没有**局部性**）、跨越**接缝**泄露的模块、不理解就必须打开五个文件的概念——并提出可以修复它的加深方案。

它使用共享的设计词汇（**模块**、**接口**、**深度**、**接缝**、**适配器**、**杠杆**、**局部性**）以及来自 `CONTEXT.md` 的、你项目自身的领域语言，因此候选点看起来是"加深订单录入模块"，而不是"重构 FooBarHandler"。

## 报告，然后盘问

输出是一个浏览器可用的 HTML 文件，写入你的 OS 临时目录——不进入仓库。每个候选点是一张卡片，包含涉及的文件、摩擦点、用通俗语言描述的解决方案、在局部性和杠杆方面的收益、改造前后的图示，以及一个 `Strong` / `Worth exploring` / `Speculative` 徽章。报告最后会列出它会首先处理的一个。

然后它停下来问你想探索哪一个。选择一个后，它会针对该设计运行 [grilling](https://aihero.dev/skills-grilling) 循环——约束条件、接缝背后是什么、哪些测试可以存活——在决策确定时内联更新领域模型。

## 它的定位

`improve-codebase-architecture` 是**定期维护**——每隔几天运行一次，而不是作为链条中的一个环节。它的近邻是 [codebase-design](https://aihero.dev/skills-codebase-design)，后者拥有每个候选点所使用到的深度与接缝词汇；[grilling](https://aihero.dev/skills-grilling)，在你选择候选点后遍历设计树；以及 [domain-modeling](https://aihero.dev/skills-domain-modeling)，在重新设计定型时保持 `CONTEXT.md` 和 ADR 的更新。当你不确定适合哪种技能或流程时，[ask-matt](https://aihero.dev/skills-ask-matt) 会为你指引方向。
