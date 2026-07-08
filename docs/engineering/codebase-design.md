快速入门：

```bash
npx skills add mattpocock/skills --skill=codebase-design
```

```bash
npx skills update codebase-design
```

[源仓库](https://github.com/mattpocock/skills/tree/main/skills/engineering/codebase-design)

## 功能

`codebase-design` 为你提供了一个共享、精确的词汇表，用于设计**深度模块**——大量行为隐藏在小型接口之后，放置在干净的接缝处，通过该接口可测试。

它是一种**语言，而非流程**。它不会重构你的代码或给你一个重构计划——它修复词语（模块、接口、深度、接缝、适配器、杠杆、局部性），以便每个设计对话以及每个涉及设计的其他技能都使用相同的语言。一致的词汇表就是全部意义；"组件"、"服务"、"API"和"边界"被故意禁用，因为它们模糊了重要的区分。

## 何时使用

输入 `/codebase-design`，或者当任务合适时 Agent 会自动调用。

当你设计或改进一个模块的接口、寻找深化机会、决定接缝放在哪里，或使代码更可测试和 AI 可导航时使用。其他技能在需要深度模块词汇表时会自动拉入它。如果你想锤炼项目的*领域*术语而不是模块设计，请改用 [domain-modeling](https://aihero.dev/skills-domain-modeling)；要在现有代码库上运行完整的架构扫描，使用 [improve-codebase-architecture](https://aihero.dev/skills-improve-codebase-architecture)。

## 深度，而非浅度

当一个模块将大量行为放在一个小型接口后面时，它是**深度**的；当接口几乎和实现一样复杂时，它是**浅度**的。深度以**杠杆**来衡量——调用者（或测试）每学习一个单位的接口能够执行多少功能。关键在于，深度是*接口*的属性，而非实现：一个深度模块可以在内部由小的、可替换的部件组成，只是这些部件从不在调用者面前暴露。

两个检查完成了大部分工作。**删除测试**：想象删除该模块——如果复杂性消失了，说明它只是个透传；如果复杂性分散到 N 个调用者身上，说明它物有所值。以及**一个适配器意味着假设性接缝；两个适配器意味着真正的接缝**——在某个东西实际跨越它发生变化之前不要切割接缝。

## 接口就是测试面

调用者和测试跨越同一条接缝，因此一个位置良好的接口为测试提供了持久的瞄准点，而底层代码可以自由变动。这就是为什么词汇表坚持使用**接缝**（Feathers 的术语——一个你可以在不编辑该处的情况下改变行为的位置）而不是过载的"边界"，以及为什么这里的"接口"意味着*调用者必须知道的每个事实*：签名是，还包括不变量、顺序、错误模式和性能——而不仅仅是类型层面的表面。

## 有意提取出来

`codebase-design` 是深度模块词汇表的**唯一真实来源**，被拆分为独立的模型调用技能，以便任何东西都可以调用它。其他技能指向它而不是复述该词汇：[tdd](https://aihero.dev/skills-tdd) 借用它在编写测试之前放置接缝，[improve-codebase-architecture](https://aihero.dev/skills-improve-codebase-architecture) 在重构现有代码时依赖它，[to-spec](https://aihero.dev/skills-to-spec) 在编写规格说明之前勾勒接缝和深化机会时使用它。

保持独立的意义在于你还可以单独使用它——作为*如何思考模块设计*的**参考**——而无需触发任何这些技能所要求的更大流程。在一个地方、一次性地修复词语，每个设计对话都继承它们。

## 在生态中的位置

`codebase-design` 是一个**随时可用的独立技能**——工程技能下的共享词汇层。其最近的邻居是 [domain-modeling](https://aihero.dev/skills-domain-modeling)，并行的词汇技能，针对问题领域而非模块结构。当你不确定哪个技能或流程适合时，[ask-matt](https://aihero.dev/skills-ask-matt) 会引导你。
