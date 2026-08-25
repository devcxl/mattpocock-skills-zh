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

我每天都在用的智能体技能：做真正的工程，不是 vibe coding。

开发真正的应用很难。GSD、BMAD、Spec-Kit 等方法试图通过接管流程来帮忙。但在这么做的同时，它们剥夺了你的控制权，并且让流程中的 bug 极难排查。

这些技能的设计原则是：小巧、易定制、可组合。它们兼容任何模型。它们基于数十年的工程经验打磨而成。尽管折腾、改造成你自己的。Enjoy。

如果你想跟进这些技能的更新以及我新发布的技能，可以加入我的 Newsletter，已有约 60,000 名开发者订阅：

[订阅 Newsletter](https://www.aihero.dev/s/skills-newsletter)

## 安装（30 秒配置）

两种方式，两种理念。**[Claude Code 插件](https://code.claude.com/docs/en/plugins)** 将整套技能集作为受管理的只读 bundle 安装，在我发布新版本时自动更新：你订阅而非 fork。**[skills.sh](https://skills.sh/mattpocock/skills)** 将可编辑的技能文件复制到你的项目中，这样你可以随意修改，变成自己的东西。**二选一：两者都装会导致每个技能出现两次。**

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

选择你想要的技能，以及要安装到哪些编程智能体上。**安装器会让你选择要装的技能：务必把 `setup-matt-pocock-skills` 选上。**

原生 Codex 插件已在规划中：详见 [`.agents/adr/0002-ship-as-a-claude-code-plugin.md`](./.agents/adr/0002-ship-as-a-claude-code-plugin.md)。

</details>

<details>
<summary><strong>喜欢折腾的</strong></summary>

使用同样的安装器，在任何智能体上安装：包括 Claude Code：

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

### 3. 搞定：可以开工了。

## 这些技能存在的原因

我建立这些技能是为了修复我在 Claude Code、Codex 以及其他编程智能体上看到的常见失败模式。

### #1：智能体没做我想要的事

> "No-one knows exactly what they want"
>
> David Thomas & Andrew Hunt，《程序员修炼之道》([The Pragmatic Programmer](https://www.amazon.co.uk/Pragmatic-Programmer-Anniversary-Journey-Mastery/dp/B0833F1T3V))

**问题所在**。软件开发中最常见的失败模式是错位。你以为开发者知道你想要什么。然后你看到他们构建的东西：你意识到他们根本没理解你。

在 AI 时代也是一样的。你和智能体之间存在沟通鸿沟。修复办法是**盘问会话（grilling session）**：让智能体就你要构建的东西向你提出详细的问题。

**修复**就是使用：

- [`/grill-me`](./skills/productivity/grill-me/SKILL.md)：用于非代码场景
- [`/grill-with-docs`](./skills/engineering/grill-with-docs/SKILL.md)：和 [`/grill-me`](./skills/productivity/grill-me/SKILL.md) 一样，但增加了更多内容（见下文）

这些是我最受欢迎的技能。它们帮你和智能体在你开始之前先对齐，并就你正在做的修改深入思考。**每次**你想做修改时都用它们。

### #2：智能体太冗长

> With a ubiquitous language, conversations among developers and expressions of the code are all derived from the same domain model.
>
> Eric Evans，《领域驱动设计》([Domain-Driven-Design](https://www.amazon.co.uk/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215))

**问题所在**：在一个项目的开始，开发者和他们正在为之构建软件的人（领域专家）通常说的是不同的语言。

我在和我的智能体之间感受到了同样的张力。智能体通常被丢进一个项目，要去现场弄懂那些行话。所以它们用 20 个词的地方，一个就够。

**修复**是建立一套共享语言。它是一份帮助智能体解码项目中使用的行话的文档。

<details>
<summary>
示例
</summary>

这是一个 [`CONTEXT.md`](https://github.com/mattpocock/course-video-manager/blob/076a5a7a182db0fe1e62971dd7a68bcadf010f1c/CONTEXT.md) 的例子，来自我的 `course-video-manager` 仓库。哪一份更容易读？

- **之前**："There's a problem when a lesson inside a section of a course is made 'real' (i.e. given a spot in the file system)"
- **之后**："There's a problem with the materialization cascade"

这种简洁在一场又一场会话中都会奏效。

</details>

这套东西已经内置到 [`/grill-with-docs`](./skills/engineering/grill-with-docs/SKILL.md) 里。它是一场盘问会话，但帮你和 AI 建立共享语言，并把难以解释的决定记录到 ADR 里。

要解释这东西有多强大很难。它可能是这个仓库里最酷的一项技术。试一下就知道了。

> [!TIP]
> 一套共享语言除了减少冗长之外还有很多好处：
>
> - **变量、函数和文件的命名一致**，使用共享语言
> - 因此**代码库对智能体来说更容易导航**
> - 智能体也**花更少 token 来思考**，因为它能用到更简洁的语言

### #3：代码不能运行

> "Always take small, deliberate steps. The rate of feedback is your speed limit. Never take on a task that's too big."
>
> David Thomas & Andrew Hunt，《程序员修炼之道》([The Pragmatic Programmer](https://www.amazon.co.uk/Pragmatic-Programmer-Anniversary-Journey-Mastery/dp/B0833F1T3V))

**问题所在**：假设你和智能体已经就构建什么对齐了。当智能体**仍然**产出垃圾时怎么办？

是时候看看你的反馈循环了。没有对它产出的代码实际运行情况的反馈，智能体会是盲飞。

**修复**：你需要那批通常的反馈循环：静态类型、浏览器访问，以及自动化测试。

对自动化测试来说，红绿重构循环至关重要。这是先让智能体写一个失败测试，再修复测试的环节。它能给智能体持续一致的反馈，从而产出好得多的代码。

我建了一个 **[`/tdd`](./skills/engineering/tdd/SKILL.md)** 技能，你可以放进任何项目。它鼓励红绿重构，并给智能体充分指引，什么是好测试、什么是坏测试。

对调试，我也建了一个 **[`/diagnosing-bugs`](./skills/engineering/diagnosing-bugs/SKILL.md)** 技能，它把最佳调试实践包成一个按阶段把关、有纪律的循环。

### #4：我们建了一团泥球

> "Invest in the design of the system _every day_."
>
> Kent Beck，《解析极限编程》([Extreme Programming Explained](https://www.amazon.co.uk/Extreme-Programming-Explained-Embrace-Change/dp/0321278658))

> "The best modules are deep. They allow a lot of functionality to be accessed through a simple interface."
>
> John Ousterhout，《A Philosophy Of Software Design》([A Philosophy Of Software Design](https://www.amazon.co.uk/Philosophy-Software-Design-2nd/dp/173210221X))

**问题所在**：大多数用智能体构建的应用都很复杂、难以修改。因为智能体可以显著加速编码，它们也加速了软件熵。代码库以空前的速度变得更复杂。

**修复**是一种全新的 AI 驱动开发方式：关心代码的设计。

这一点已内置到这些技能的每一层：

- [`/to-spec`](./skills/engineering/to-spec/SKILL.md) 在创建规格之前先测验你要触及哪些模块

而关键的是，[`/improve-codebase-architecture`](./skills/engineering/improve-codebase-architecture/SKILL.md) 会扫描一份代码库里的深化机会，然后把候选摆给你。我建议你在你的代码库上每隔几天跑一次。它是一次扫描而不是一次救援：在一份真正老的代码库上它会找到真实的候选，但它不会替你把泥团解开。

### 小结

软件工程的基本功比以往更重要。这些技能是我把这些基本功压缩成可重复实践的最大努力，帮你做出你职业生涯中最好的应用。Enjoy。

## 索引

这些按一个维度划分：谁能触发它们。**用户调用**的技能只有在你键入它们时才可达（例如 `/grill-me`）；它们的职责是编排。**模型调用**的技能可以由你触发，或者在任务契合时由智能体自动拿起来用；它们承载着可复用的纪律。一个用户调用的技能可以触发模型调用的技能，但永远不能触发另一个用户调用的技能。

### Engineering

我每天用的编码工作技能。

**用户调用**

- **[ask-matt](./skills/engineering/ask-matt/SKILL.md)**：询问哪种技能或流程适合你的处境。是本仓库用户调用技能之上的路由器。
- **[grill-with-docs](./skills/engineering/grill-with-docs/SKILL.md)**：盘问会话，同时构建你项目的领域模型，打磨术语并就地更新 `CONTEXT.md` 和 ADR。
- **[triage](./skills/engineering/triage/SKILL.md)**：让 Issue 在 triage 角色状态机中流转。
- **[improve-codebase-architecture](./skills/engineering/improve-codebase-architecture/SKILL.md)**：扫描代码库中的深化机会，将它们以可视化的 HTML 报告呈现，然后盘问你选中的那一个。
- **[setup-matt-pocock-skills](./skills/engineering/setup-matt-pocock-skills/SKILL.md)**：为工程类技能配置本仓库（Issue 跟踪器、triage 标签、领域文档布局）。在使用其他工程技能之前，每个仓库运行一次。
- **[to-spec](./skills/engineering/to-spec/SKILL.md)**：把当前对话变成规格，并发布到 Issue 跟踪器。不访谈：只是综合你已经讨论过的内容。
- **[to-tickets](./skills/engineering/to-tickets/SKILL.md)**：把任何计划、规格或对话拆成一组 tracer-bullet 工单，每条声明其阻塞边：以本地文件中的文本，或真实跟踪器上的原生阻塞链接形式编写。
- **[implement](./skills/engineering/implement/SKILL.md)**：按规格或工单集合构建工作，在预先约定的 seam 上驱动 `/tdd`，并在提交前以 `/code-review` 收尾。
- **[wayfinder](./skills/engineering/wayfinder/SKILL.md)**：把一项远大于一次 agent 会话能装下的工作，作为一份共享的决策 ticket 地图规划到 Issue 跟踪器上：一次解析一个，直到通往目的地的路清晰。

**模型调用**

- **[prototype](./skills/engineering/prototype/SKILL.md)**：构建一个可丢弃的原型来回答一个设计问题：用于状态/逻辑问题的单文件 HTML，或用于从一个路由切换的多种激进 UI 变体。
- **[diagnosing-bugs](./skills/engineering/diagnosing-bugs/SKILL.md)**：对硬核 bug 和性能回归的有纪律诊断循环：构建一个对这个 bug 变红的反馈循环→最小化→假设→插桩→修复→回归测试。
- **[research](./skills/engineering/research/SKILL.md)**：针对高可信度的原始来源调查一个问题，并把发现以带引用的 Markdown 文件形式保存到仓库，作为后台 agent 运行。
- **[tdd](./skills/engineering/tdd/SKILL.md)**：红绿重构循环下的测试驱动开发。一次一条垂直切片地构建特性或修复 bug。
- **[domain-modeling](./skills/engineering/domain-modeling/SKILL.md)**：主动构建并打磨一份项目的领域模型：用边缘场景挑战术语，并就地更新 `CONTEXT.md` 与 ADR。
- **[codebase-design](./skills/engineering/codebase-design/SKILL.md)**：用于设计深度模块的共享纪律与词汇：小接口背后的大量行为，安放在干净的 seam 上，通过这个 seam 可测。
- **[code-review](./skills/engineering/code-review/SKILL.md)**：对一个固定点以来的 diff 进行双轴评审：**规范（Standards）**（它是否遵循仓库的编码规范，外加 Fowler 异味基线？）与**规格（Spec）**（它是否忠实地实现了原始 Issue/规格？），作为并行子 agent 运行以免互相污染。
- **[resolving-merge-conflicts](./skills/engineering/resolving-merge-conflicts/SKILL.md)**：逐 hunk 处理进行中的 git 合并或 rebase 冲突，按追溯到各方原始来源的意图解决，再完成操作：绝不 `--abort`。
- **[wizard](./skills/engineering/wizard/SKILL.md)**：生成一个交互式 bash 向导，引导人类完成只有他们能执行的步骤：基础设施预置、配置凭据或 CI secrets、走过陌生的第三方控制台，或运行一次性迁移或切换。

### Productivity

通用工作流工具，不限于代码。

**用户调用**

- **[grill-me](./skills/productivity/grill-me/SKILL.md)**：被无休止地盘问你的计划或设计，直到设计树的每个分支都被解决。
- **[handoff](./skills/productivity/handoff/SKILL.md)**：把当前对话压缩成一份交接文档，让另一个智能体能继续这项工作。
- **[teach](./skills/productivity/teach/SKILL.md)**：用当前目录作为有状态的教学工作区，跨多次会话教用户一项新技能或概念。
- **[to-questionnaire](./skills/productivity/to-questionnaire/SKILL.md)**：把你一个人答不出的决定变成一份 Markdown 问卷，交给唯一能答的人：异步填写，或开会时一起过完。它盘问的是发送对象（发给谁、要拿回什么），而不是主题本身。
- **[wait-what](./skills/productivity/wait-what/SKILL.md)**：一条消息没被接住的瞬间就触发它。智能体会用你缺失的上下文、用大白话、用你 `CONTEXT.md` 的词汇重新讲一遍。

**模型调用**

- **[grilling](./skills/productivity/grilling/SKILL.md)**：无休止地盘问用户的计划、决策或想法，直到设计树的每个分支都被解决。`grill-me`、`grill-with-docs`、`triage`、`wayfinder` 和 `improve-codebase-architecture` 背后的可复用访谈原语。
- **[writing-for-agents](./skills/productivity/writing-for-agents/SKILL.md)**：为智能体编写文档：技能、AGENTS.md/CLAUDE.md，以及任何智能体通过指针触达的文档。
