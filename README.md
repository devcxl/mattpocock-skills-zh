<p>
  <a href="https://www.aihero.dev/s/skills-newsletter">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://res.cloudinary.com/total-typescript/image/upload/v1777382277/skills-repo-dark_2x.png">
      <source media="(prefers-color-scheme: light)" srcset="https://res.cloudinary.com/total-typescript/image/upload/v1777382277/skill-repo-light_2x.png">
      <img alt="Skills" src="https://res.cloudinary.com/total-typescript/image/upload/v1777382277/skill-repo-light_2x.png" width="369">
    </picture>
  </a>
</p>

# 给真正工程师用的技能集

[![skills.sh](https://skills.sh/b/mattpocock/skills)](https://skills.sh/mattpocock/skills)

我每天都在用的智能体技能——做真正的工程，不是 vibe coding。

开发真正的应用很难。GSD、BMAD、Spec-Kit 等方法试图通过接管流程来帮忙。但在这么做的同时，它们剥夺了你的控制权，并且让流程中的 bug 极难排查。

这些技能的设计原则是：小巧、易定制、可组合。它们兼容任何模型。它们基于数十年的工程经验打磨而成。尽管折腾、改造成你自己的。Enjoy。

如果你想跟进这些技能的更新以及我新发布的技能，可以加入我的 Newsletter，已有约 60,000 名开发者订阅：

[订阅 Newsletter](https://www.aihero.dev/s/skills-newsletter)

## 安装（30 秒配置）

两种方式，两种理念。**[Claude Code 插件](https://code.claude.com/docs/en/plugins)** 将整套技能集作为受管理的只读 bundle 安装，在我发布新版本时自动更新——你订阅而非 fork。**[skills.sh](https://skills.sh/mattpocock/skills)** 将可编辑的技能文件复制到你的项目中，这样你可以随意修改，变成自己的东西。**二选一——两者都装会导致每个技能出现两次。**

### 1. 获取技能

<details>
<summary><strong>Claude Code</strong></summary>

```bash
claude plugins install mattpocock-skills
```

或者在会话中：

```
/plugin install mattpocock-skills
```

它在 Claude Code 的官方市场中，无需额外添加，更新自动送达。

</details>

<details>
<summary><strong>Codex 及其他智能体</strong></summary>

```bash
npx skills@latest add mattpocock/skills
```

选择你想要的技能，以及要安装到哪些编程智能体上。**安装器会列出可选技能——确保选中 `setup-matt-pocock-skills`。**

原生 Codex 插件已在规划中——详见 [`.agents/adr/0002-ship-as-a-claude-code-plugin.md`](./.agents/adr/0002-ship-as-a-claude-code-plugin.md)。

</details>

<details>
<summary><strong>喜欢折腾的</strong></summary>

使用同样的安装器，在任何智能体上安装——包括 Claude Code：

```bash
npx skills@latest add mattpocock/skills
```

这会将技能作为普通文件写入你的仓库，归你所有，你可以自由编辑。不会有任何东西在后台偷偷更新；想获取最新变更时，运行 `npx skills update` 即可。

</details>

### 2. 运行 `/setup-matt-pocock-skills`

在你的智能体中运行它，每个仓库执行一次。它会：

- 询问你要使用哪个 Issue 跟踪器（GitHub、Linear 或本地文件）
- 询问你对工单进行分类时使用哪些标签（`/triage` 会用到）
- 询问你希望把创建的文档保存在哪里

### 3. 搞定——可以开工了。

## 为什么要有这些技能

我构建这些技能是为了修复我在 Claude Code、Codex 和其他编程智能体中看到的常见失败模式。

### #1：智能体没按我的想法做

> "没有人确切知道自己想要什么。"
>
> David Thomas & Andrew Hunt，《程序员修炼之道》

**问题**。软件开发中最常见的失败模式是对齐偏差。你以为开发者知道你想要什么。然后你看到他们构建的东西——你意识到它完全没懂你。

AI 时代同样如此。你和智能体之间存在沟通鸿沟。解决方法是**盘问环节**——让智能体就你要构建的东西向你提出详细的问题。

**解决方法**：

- [`/grill-me`](./skills/productivity/grill-me/SKILL.md) — 用于非编码场景
- [`/grill-with-docs`](./skills/engineering/grill-with-docs/SKILL.md) — 与 [`/grill-me`](./skills/productivity/grill-me/SKILL.md) 相同，但附加更多好东西（见下文）

这是我最受欢迎的技能。它们帮助你在动手之前与智能体对齐，并深入思考你要做的改动。**每次**想做改动时都用上它们。

### #2：智能体太啰嗦了

> 有了通用语言之后，开发者之间的对话以及代码中的表达都源自同一个领域模型。
>
> Eric Evans，《领域驱动设计》

**问题**：项目开始时，开发者和软件的用户（领域专家）通常说着不同的语言。

我和我的智能体之间也感受到了同样的张力。智能体通常被丢进一个项目，被要求边做边摸索行话。于是它们用 20 个词来表达 1 个词就能说清的事。

**解决方法**是建立一套共享语言。这是一份文档，帮助智能体解码项目中使用的行话。

<details>
<summary>
示例
</summary>

以下是我 `course-video-manager` 仓库中的 [`CONTEXT.md`](https://github.com/mattpocock/course-video-manager/blob/076a5a7a182db0fe1e62971dd7a68bcadf010f1c/CONTEXT.md) 示例。哪种更易读？

- **BEFORE**："课程中某一节内的某节课被设为 'real'（即在文件系统中获得一个位置）时会出现问题"
- **AFTER**："物化级联（materialization cascade）有问题"

这种简洁在一次次会话中持续产生回报。

</details>

这已内建在 [`/grill-with-docs`](./skills/engineering/grill-with-docs/SKILL.md) 中。它是一个盘问环节，但能帮助你与 AI 建立共享语言，并将难以解释的决策记录在 ADR（架构决策记录）中。

很难描述这有多强大。这可能是这个仓库中最酷的技术。试试看就知道。

> [!TIP]
> 共享语言除了减少啰嗦之外还有很多好处：
>
> - **变量、函数和文件的命名保持一致**，使用共享语言
> - 因此，**代码库对智能体来说更容易导航**
> - 智能体也**消耗更少的 token 来思考**，因为它可以使用更简洁的语言

### #3：代码跑不起来

> "始终采取小而审慎的步骤。反馈速度就是你的速度上限。永远不要承担太大的任务。"
>
> David Thomas & Andrew Hunt，《程序员修炼之道》

**问题**：假设你和智能体在要构建什么上已经对齐了。但如果智能体*仍然*产出垃圾怎么办？

是时候审视你的反馈循环了。如果智能体对产出的代码实际运行情况没有反馈，它就是在盲飞。

**解决方法**：你需要常规的反馈循环组合：静态类型、浏览器访问和自动化测试。

对于自动化测试，红-绿-重构循环至关重要。这是指智能体先写一个失败的测试，然后修复测试。这能帮助智能体获得稳定水平的反馈，从而产出好得多的代码。

我构建了一个 **[`/tdd`](./skills/engineering/tdd/SKILL.md) 技能**，你可以插入任何项目。它鼓励红-绿-重构，并给智能体提供了大量关于什么是好测试、什么是坏测试的指导。

对于调试，我还构建了一个 **[`/diagnosing-bugs`](./skills/engineering/diagnosing-bugs/SKILL.md)** 技能，将最佳调试实践封装成一个纪律性循环，逐阶段把关。

### #4：代码变成了一团浆糊

> "每天都要投资系统的设计。"
>
> Kent Beck，《解析极限编程》

> "最好的模块是深的。它们允许通过简单的接口访问大量功能。"
>
> John Ousterhout，《软件设计的哲学》

**问题**：大多数用智能体构建的应用既复杂又难以改动。因为智能体可以极大地加速编码速度，它们也加速了软件熵增。代码库以前所未有的速度变得更加复杂。

**解决方法**是一种全新的 AI 驱动开发方式：**关心代码的设计**。

这内建在这些技能的每一层：

- [`/to-spec`](./skills/engineering/to-spec/SKILL.md) 在创建 spec 之前询问你将触及哪些模块

而最关键的是，[`/improve-codebase-architecture`](./skills/engineering/improve-codebase-architecture/SKILL.md) 扫描代码库寻找**深化机会**，把候选方案交到你手上。我建议每隔几天就在你的代码库上运行一次。它是调查，不是拯救——对真正老旧的项目它会找到真实候选，但不会帮你理清那团乱麻。

### 总结

软件工程基础比以往任何时候都更重要。这些技能是我将这些基础浓缩为可重复实践的最佳尝试，帮助你在职业生涯中交付最好的应用。Enjoy。

## 参考

这些技能按一条主线划分：**用户调用**与**模型调用**。**用户调用**型技能只有在你敲出它们时才可达（如 `/grill-me`），它们的职责是编排。**模型调用**型技能既可以被你调用，也可以由智能体在任务契合时自动触发；它们承载可复用的纪律。用户调用型技能可以调用模型调用型技能，但绝不调用另一个用户调用型技能。

### 工程类（Engineering）

**用户调用**

- **[ask-matt](./skills/engineering/ask-matt/SKILL.md)** — 询问哪个技能或流程适合你的情况。本仓库中用户调用技能的路由器。
- **[grill-with-docs](./skills/engineering/grill-with-docs/SKILL.md)** — 盘问式会话，同时构建你项目的领域模型，打磨术语并更新 `CONTEXT.md` 和 ADR。
- **[triage](./skills/engineering/triage/SKILL.md)** — 让 issue 走一遍由分类角色组成的状态机。
- **[improve-codebase-architecture](./skills/engineering/improve-codebase-architecture/SKILL.md)** — 扫描代码库寻找深化机会，以可视化 HTML 报告呈现，然后对你挑中的那个进行盘问。
- **[setup-matt-pocock-skills](./skills/engineering/setup-matt-pocock-skills/SKILL.md)** — 为本仓库配置工程技能（issue 跟踪器、分类标签、领域文档布局）。使用任何其他工程技能之前每个仓库运行一次。
- **[to-spec](./skills/engineering/to-spec/SKILL.md)** — 把当前对话变成一份 spec 并发布到 issue 跟踪器。无需面试——只是综合你已经讨论过的内容。
- **[to-tickets](./skills/engineering/to-tickets/SKILL.md)** — 把任何计划、spec 或对话拆成一组示踪子弹式 ticket，每个声明其阻塞边，写成本地文件中的文本，或真实跟踪器上的原生阻塞链接。
- **[implement](./skills/engineering/implement/SKILL.md)** — 构建 spec 或一组 ticket 所描述的工作，在预先约定的接缝处驱动 `/tdd`，并在提交前以 `/code-review` 收尾。
- **[wayfinder](./skills/engineering/wayfinder/SKILL.md)** — 规划一大块工作——超过一个 agent 会话能容纳的体量——在 issue 跟踪器上以共享的决策 ticket 地图形式呈现，逐个解决，直到通往目的地的道路清晰。

**模型调用**

- **[prototype](./skills/engineering/prototype/SKILL.md)** — 构建一次性原型回答设计问题：一个可分享的 HTML 文件用于状态/逻辑问题，或同一路由下可切换的多个截然不同的 UI 变体。
- **[diagnosing-bugs](./skills/engineering/diagnosing-bugs/SKILL.md)** — 针对疑难 bug 和性能回归的训练有素的诊断循环：构建反馈循环，对 bug 变红 → 最小化 → 假设 → 插桩 → 修复 → 回归测试。
- **[research](./skills/engineering/research/SKILL.md)** — 对照高信任度一手来源调查问题，并把发现作为带引用的 Markdown 文件留在仓库里，作为后台 agent 运行。
- **[tdd](./skills/engineering/tdd/SKILL.md)** — 带红-绿-重构循环的测试驱动开发。一次一个垂直切片地构建功能或修复 bug。
- **[domain-modeling](./skills/engineering/domain-modeling/SKILL.md)** — 主动构建并打磨项目的领域模型：用词汇表挑战术语，用边缘场景压力测试，内联更新 `CONTEXT.md` 和 ADR。
- **[codebase-design](./skills/engineering/codebase-design/SKILL.md)** — 设计深度模块的共享纪律和词汇：小接口背后堆叠大量行为，落在干净接缝处，可通过该接口测试。
- **[code-review](./skills/engineering/code-review/SKILL.md)** — 对自某个固定点以来的 diff 做双轴审查：**标准**（是否符合仓库编码规范，外加 Fowler 坏味道基线？）和**规格**（是否忠实实现了源 issue/spec？），作为并行子智能体运行，互不污染。
- **[resolving-merge-conflicts](./skills/engineering/resolving-merge-conflicts/SKILL.md)** — 一块一块地处理进行中的 git merge 或 rebase 冲突，根据追溯到各方一手来源的意图解决，然后完成操作（绝不 `--abort`）。
- **[wizard](./skills/engineering/wizard/SKILL.md)** — 生成一个交互式 bash 向导，引导人完成只有他们能执行的步骤：配置基础设施、设置凭据或 CI 密钥、走陌生的第三方控制台、执行一次性迁移或切换。

### 生产力类（Productivity）

通用工作流工具，不限于编码。

**用户调用**

- **[grill-me](./skills/productivity/grill-me/SKILL.md)** — 被无休止地盘问你的计划或设计，直到设计树的每个分支都被解决。
- **[handoff](./skills/productivity/handoff/SKILL.md)** — 把当前对话压缩为一份交接文档，让另一个 agent 可以继续这项工作。
- **[teach](./skills/productivity/teach/SKILL.md)** — 跨多个会话教用户一项新技能或概念，把当前目录当作有状态的教学工作空间。
- **[to-questionnaire](./skills/productivity/to-questionnaire/SKILL.md)** — 把一个人答不出的决策变成一份 Markdown 问卷，交给唯一能答的那个人——异步填写，或开会时一起填。它审问的是"发送"（发给谁、需要什么回来），而非主题本身。
- **[wait-what](./skills/productivity/wait-what/SKILL.md)** — 一条消息没被接住的瞬间就触发它。智能体会用你缺失的上下文、用你的 `CONTEXT.md` 词汇、以大白话重新讲一遍。

**模型调用**

- **[grilling](./skills/productivity/grilling/SKILL.md)** — 无休止地盘问用户关于计划、决策或想法的问题，直到决策树的每个分支都被解决。`grill-me`、`grill-with-docs`、`triage`、`wayfinder` 和 `improve-codebase-architecture` 背后可复用的访谈原语。
- **[writing-for-agents](./skills/productivity/writing-for-agents/SKILL.md)** — 为 agent 编写文档：skills、AGENTS.md/CLAUDE.md，以及任何 agent 通过指针触达的文档。
