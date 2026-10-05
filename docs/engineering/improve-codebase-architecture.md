## 它的作用

`improve-codebase-architecture` 勘察代码库，寻找**加深机会**。这类机会是指浅模块（接口几乎和它隐藏的东西一样复杂）可以变成深模块的地方。它把这些机会写成一份自包含的 HTML 报告，然后通过 [盘问（grilling）](https://www.aihero.dev/ai-coding-dictionary/grilling) 陪你过一遍所选的机会。

它从不改动代码。整个运行会在 OS 临时目录里产出一段对话和一个 HTML 文件。之后你会在一次独立的 [session](https://www.aihero.dev/ai-coding-dictionary/session) 中按正常构建流程进行重构。这使它成为一项勘察，而不是重构工具；因此，即使你还没准备好动手，也值得在代码库上运行它。

两道过滤器让报告不至于沦为泛泛的清理建议。第一，每条候选都必须通过**删除测试**：如果删掉这个模块，它的复杂度会被收拢到一个更小的接口后面，还是会散到调用者中？只有前一种情况才会生成一张卡片。第二，除非你指定具体区域，否则它会先读取最近的 commit 历史，并把扫描重点放在经常变动的路径上。加深一段无人触碰的代码，永远收不回重构的成本。

## 何时使用

你通过键入 `/improve-codebase-architecture` 来调用它；[agent](https://www.aihero.dev/ai-coding-dictionary/agent) 不会主动使用它。

它不是主构建流程中的一步。你可以定期运行它，为改善代码库排入更多工作。常见场景有四种：

| 场景 | 用法 |
| --- | --- |
| 例行维护 | 每隔几天，或有空时运行它，避免功能开发之间的结构逐渐退化。 |
| 在一次大构建之前 | 把它指向 [spec](https://www.aihero.dev/ai-coding-dictionary/spec)，并问："我们怎么能让这次变更更容易？"这是对它最有效的提示。 |
| 棕地审计 | 在大型、缺乏结构或 [vibe-coded](https://www.aihero.dev/ai-coding-dictionary/vibe-coding) 的仓库上运行它，了解代码库目前的结构。 |
| 遗留测试工作 | 在为不可测试的代码编写测试前，先用它找出缺失的接缝。 |

容易与近邻混淆的地方：

- 要设计一个已经选好的模块，用 [codebase-design](https://aihero.dev/skills-codebase-design)。这个技能找出要处理的模块，`codebase-design` 则用来设计它。
- 对于一次会话装不下的整体工作量，用 [wayfinder](https://aihero.dev/skills-wayfinder)。
- 对于"某个具体的东西坏了"，用 [diagnosing-bugs](https://aihero.dev/skills-diagnosing-bugs)。如果最终发现缺少合适的接缝来锁定 bug，它会把工作交回这里。

## 先决条件

运行它没有先决条件。如果 `GLOSSARY.md` 或 `docs/adr/` 下有 ADR，它会读取这些文件并使用你领域自己的名词。候选因此会写成"加深 Order intake 模块"，而不是"重构 FooBarHandler"。

它会写到两个地方。报告写入仓库外的 `<tmpdir>/architecture-review-<timestamp>.html`。盘问期间，它会补充或打磨 `GLOSSARY.md` 中的术语，并在文件不存在时创建它。它还会提议把被拒绝的候选记录为 ADR，避免未来再次提出。

## 深度，以及那份猎取它的报告

这个技能的核心是一个想法：**深度**。深模块在小而稳定的接口后面承载大量行为。浅模块则通过一个几乎和底层代码一样宽的接口暴露实现。报告会寻找三类浅薄之处：

- 纯函数仅为可测试性而被抽出，但真正的 bug 出在调用方如何使用它们（缺乏**局部性**）。
- 模块跨越自己的**接缝**泄漏实现。
- 一个概念不打开五个文件就无法理解。

对于每一类，它都会提出相应的加深方案。

每条候选都以卡片呈现，包含相关文件、摩擦点、平实易懂的解决方案、以**局部性**和**杠杆**说明的收益、前后对照图，以及强度徽章。

| 徽章 | 对你的含义 |
| --- | --- |
| `Strong` | 删除测试清楚通过，且摩擦是真实的。认真对待这些。 |
| `Worth exploring` | 看起来合理的加深，但回报取决于代码接下来会往哪里去。 |
| `Speculative` | 为求完整而列出。大多数可以忽略。 |

报告以**Top recommendation**结尾，也就是它会优先处理的候选。接着技能停下来，问你想探索哪一个。此时你还没有作出任何决定，代码也没有改变。

## 你挑了之后会发生什么

选中候选后，会围绕它启动一次 [盘问（grilling）](https://aihero.dev/skills-grilling) 会话，讨论约束、接缝后面的内容、哪些测试可以保留，以及加深后的接口应该是什么样。该会话产出的是决策，而不是 diff。之后进入正常流程：把决策带入 [to-spec](https://aihero.dev/skills-to-spec)，再到 [to-tickets](https://aihero.dev/skills-to-tickets)，最后交给 [implement](https://aihero.dev/skills-implement)。

## 常见问题

**它围绕一个想法盘问了我一个小时，而不是给我看选项。能关掉吗？**

可以。调用时说明（"别盘问我，只给我看报告"）。这是这个技能最常见的抱怨。一位用户喜欢它作为"获得改进的全面分析的便捷方式"，但加入盘问循环后觉得它"近乎不可用"。在那位用户的会话中，技能提出一个方案后就问了"几十甚至几百个问题"。设计意图是先给报告，只对你选中的候选展开盘问。但较弱的 [model](https://www.aihero.dev/ai-coding-dictionary/model) 会直接开始访谈它想到的第一个方案。该讨论中的体验因模型而异。这是个尚未解决的问题，技能目前还没有记录在案的免盘问模式。

**报告以无样式的原始 HTML 打开，没有图表。发生了什么？**

报告从 CDN 加载 Tailwind 和 Mermaid，所以打开时需要网络访问。如果有东西拦截这些脚本，页面就会出错且不显示提示。已报告的案例中，安全钩子要求提供 SRI 哈希。agent 加入哈希后，CDN 返回给浏览器的字节与用于计算哈希的 `curl` 所获内容不同，因此浏览器拦截了脚本。离线或受限环境也会遇到同样的问题。agent 看不到这一点，因为它从不渲染页面。可以要求改用内联 CSS 和手写 SVG 图，而不是 CDN 模板。目前仍有一个未解决的问题。

**它给了我十二个候选。我该在同一个会话里逐个做，还是另开一个新会话？**

每个会话只处理一条候选。如果在一次对话里处理多条，[context window](https://www.aihero.dev/ai-coding-dictionary/context-window) 会被报告、盘问、领域模型编辑和代码修改填满。报告只是临时文件，所以应带着候选继续，而不是带着报告文件：选一条、对它进行盘问，并把决策交给 `/to-spec`。把其余候选变成可单独处理的 [tickets](https://www.aihero.dev/ai-coding-dictionary/ticket)。把选中的改进写入 spec，而不是直接开始实现。人们经常问这个问题，但技能本身没有说明相应流程。

**我该怎么给它提示？**

提示时告诉它你接下来要构建什么。如果即将进行大型构建，就把它指向 spec 并问："我们怎么能让这次变更更容易？"不提供提示时，它会自行扫描热点，适合例行维护；但明确方向才能让报告具有可操作性。

**它在一个大型遗留代码库上能行吗？**

部分适用。它适合缺乏一致结构的大型既有代码库，也是一次性结构整理后的推荐维护工具。但项目已严重失控的用户反馈说它"有一点帮助，但还是不够"。一位维护八年历史遗留代码库的开发者也报告 model 陷入循环，尽管同一技能在整洁的仓库上能产出清晰的图。目前还没有专门处理这种情况的 `/refactor` 技能。如果代码库没有共享词汇，先用 [grill-with-docs](https://aihero.dev/skills-grill-with-docs) 建立一套，通常能明显改善本技能的输出。

**这和 `/codebase-design` 有什么不同？**

`/codebase-design` 是参考，不是会话驱动器。它提供 module、interface、depth、seam、adapter、leverage、locality 这些词汇，本技能会使用它们。把 `/codebase-design` 直接当作任务交给一个新 agent，会触发一种已知的失败模式：它没有自己的流程可循，于是 agent 会自创流程、重新探索代码，并在向你提问之前运行很久。由本技能驱动，让它使用那份参考。

**它会说代码库没问题吗？**

很少，因此最好事先知道这一点。这个技能的目标是产出发现，所以它倾向于列出候选，而不是得出"没有问题"的结论。强度徽章可以帮助你校正这种倾向：如果报告里的候选全是 `Speculative`，那就表示它其实什么也没找到。

**它能在 Codex 或其他 harness 里工作吗？**

部分能。探索步骤直接指定 Claude Code 的 `Agent` 工具和 `subagent_type=Explore`。没有该工具的 [harness](https://www.aihero.dev/ai-coding-dictionary/harness) 可能会跳过并行探索，而不是改用自己的等效工具。技能仍能运行，但扫描会不够全面。有人提议改写成与 harness 无关的版本，但尚未合并。

**我到底该怎样在 TypeScript 里实现深模块？**

技能没有附带解决这个问题的好办法。人们经常要求提供一份 `TYPESCRIPT.md`，说明具体文件和模块布局，但目前并不存在。技能会告诉你加深应该放在哪里、接缝后面应该放什么；你需要自己把这些转化成 package 或目录结构。

## 怎样算成功

- 候选点名你领域的概念，而不是凭空发明的类名："Order intake 模块"，而不是 "FooBarHandler"。
- 候选集中在你最近编辑过的文件，而不是仓库中无人触碰的部分。
- 跑动期间没有一行代码被改动。唯一的新文件是临时目录里的那份 HTML 报告。
- 它在报告之后停下来询问你要哪条候选，不会自行继续。
- 每张牌把收益解释成局部性或杠杆，并说哪些测试会变得更简单，而不是仅仅"这更干净"。
- 如果你基于长期有效的理由拒绝某条候选，它会提议把该理由记录为 ADR，以免下次运行时再次建议。

## 它的定位

`improve-codebase-architecture` 是一项**周期性维护**：每隔几天在流程之外运行，把工作排入队列，而不是直接动手。它的邻居包括：

- [codebase-design](https://aihero.dev/skills-codebase-design)，负责每条候选所用的 depth 和 seam 词汇。
- [盘问（grilling）](https://aihero.dev/skills-grilling)，在你选定候选后带你走过决策树。
- [domain-modeling](https://aihero.dev/skills-domain-modeling)，在你作出决策时维护 `GLOSSARY.md` 和 ADR。

它产出一个想法，再通过 [grill-with-docs](https://aihero.dev/skills-grill-with-docs) 或 [to-spec](https://aihero.dev/skills-to-spec) 重新进入主构建流程。主流程末端与之对应的是 [retro](https://aihero.dev/skills-retro)：本技能改善 agent 所工作的代码，`retro` 则在构建之后改善周边环境（检查、规范、引导文件）。不确定某个场景适合哪个技能时，[ask-matt](https://aihero.dev/skills-ask-matt) 会为整套技能路由。
