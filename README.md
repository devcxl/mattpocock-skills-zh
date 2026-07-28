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

对于调试，我还构建了一个 **[`/diagnose`](./skills/engineering/diagnose/SKILL.md)** 技能，将最佳调试实践封装成一个简单的循环。

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
- [`/zoom-out`](./skills/engineering/zoom-out/SKILL.md) 告诉智能体在整个系统的上下文中解释代码

而最关键的是，[`/improve-codebase-architecture`](./skills/engineering/improve-codebase-architecture/SKILL.md) 帮助你拯救已经成为一团浆糊的代码库。我建议每隔几天就在你的代码库上运行一次。

### 总结

软件工程基础比以往任何时候都更重要。这些技能是我将这些基础浓缩为可重复实践的最佳尝试，帮助你在职业生涯中交付最好的应用。Enjoy。

## 参考

### 工程类（Engineering）

用户调用：

- **[ask-matt](./skills/engineering/ask-matt/SKILL.md)** — 询问仓库中的某个技能应该用于某个特定的使用场景或目标。
- **[code-review](./skills/engineering/code-review/SKILL.md)** — 审查自某个固定点以来的变更——规范（标准）和规格（需求）双轴并行审查。
- **[codebase-design](./skills/engineering/codebase-design/SKILL.md)** — 共享的设计深度模块的纪律和词汇：通过小型接口暴露大量行为，放置在干净的 seam 处，可通过该接口进行测试。
- **[resolving-merge-conflicts](./skills/engineering/resolving-merge-conflicts/SKILL.md)** — 逐个 hunk 处理正在进行的 git merge 或 rebase 冲突，按意图追溯到各方的原始来源逐一解决，然后完成操作——绝不 `--abort`。
- **[diagnose](./skills/engineering/diagnose/SKILL.md)** — 针对棘手 bug 和性能回归的纪律性诊断循环：复现 → 最小化 → 假设 → 插桩 → 修复 → 回归测试。
- **[research](./skills/engineering/research/SKILL.md)** — 在后台 agent 中调查一个问题，依据高可信度一手来源，将发现作为带引用的 Markdown 文件写入仓库。
- **[grill-with-docs](./skills/engineering/grill-with-docs/SKILL.md)** — 盘问环节，用现有领域模型挑战你的计划、打磨术语，并实时更新 `CONTEXT.md` 和 ADR。
- **[improve-codebase-architecture](./skills/engineering/improve-codebase-architecture/SKILL.md)** — 在代码库中发现深化机会，结合 `CONTEXT.md` 中的领域语言和 ADR 中的决策。
- **[setup-matt-pocock-skills](./skills/engineering/setup-matt-pocock-skills/SKILL.md)** — 搭建各仓库配置（Issue 跟踪器、分类标签词汇表、领域文档布局），供其他工程类技能使用。每个仓库使用 `to-tickets`、`to-spec`、`triage`、`diagnose`、`tdd`、`improve-codebase-architecture` 或 `zoom-out` 之前运行一次。
- **[tdd](./skills/engineering/tdd/SKILL.md)** — 使用红-绿-重构循环进行测试驱动开发。
- **[to-spec](./skills/engineering/to-spec/SKILL.md)** — 将当前对话上下文转为 spec 并提交到 Issue 跟踪器。无需面试——只需综合已讨论过的内容。
- **[to-tickets](./skills/engineering/to-tickets/SKILL.md)** — 将任何计划、spec 或对话拆分为一组 tracer-bullet ticket，每个 ticket 声明其阻塞边——写入本地文件文本，或在真实跟踪器上使用原生阻塞链接。
- **[wayfinder](./skills/engineering/wayfinder/SKILL.md)** — 规划一大块工作——超过一次 agent 会话能容纳的体量——在 Issue 跟踪器上以共享的调查 ticket 地图形式呈现，逐个解决，直到路线清晰。
- **[triage](./skills/engineering/triage/SKILL.md)** — 通过分类角色的状态机对 Issue 进行分类。
- **[zoom-out](./skills/engineering/zoom-out/SKILL.md)** — 告诉智能体放大视角，对不熟悉的代码片段提供更广泛的上下文或更高层次的视角。

**模型调用**

- **[implement](./skills/engineering/implement/SKILL.md)** — 根据 spec 或一组 tickets 描述的内容实现工作，在预先约定的 seam 处驱动 `/tdd`，提交前以 `/code-review` 收尾。
- **[prototype](./skills/engineering/prototype/SKILL.md)** — 构建一个可丢弃的原型来回答设计问题——针对状态/逻辑问题的可运行终端应用，或若干可切换的 UI 变体。

### 效率类（Productivity）

通用工作流工具，不限于编码。

- **[grill-me](./skills/productivity/grill-me/SKILL.md)** — 被无休止地盘问你的计划、决策或想法，直到决策树的每个分支都被解决。
- **[handoff](./skills/productivity/handoff/SKILL.md)** — 将当前对话压缩为一份交接文档，让另一个智能体可以继续工作。
- **[teach](./skills/productivity/teach/SKILL.md)** — 通过多个会话教会用户一项新技能或概念，使用当前目录作为有状态的教学工作区。

**模型调用**

- **[grilling](./skills/productivity/grilling/SKILL.md)** — 对用户的计划、决策或想法进行无休止地盘问，直到决策树的每个分支都被解决。`grill-me` 和 `grill-with-docs` 背后的可复用循环。

### 杂项（Misc）

保留但很少使用的工具。

- **[git-guardrails-claude-code](./skills/misc/git-guardrails-claude-code/SKILL.md)** — 设置 Claude Code hooks，在执行危险 git 命令（push、reset --hard、clean 等）之前将其拦截。
- **[migrate-to-shoehorn](./skills/misc/migrate-to-shoehorn/SKILL.md)** — 将测试文件从 `as` 类型断言迁移到 @total-typescript/shoehorn。
- **[scaffold-exercises](./skills/misc/scaffold-exercises/SKILL.md)** — 创建包含章节、问题、解答和说明的练习目录结构。
- **[setup-pre-commit](./skills/misc/setup-pre-commit/SKILL.md)** — 设置带 lint-staged、Prettier、类型检查和测试的 Husky pre-commit hooks。
