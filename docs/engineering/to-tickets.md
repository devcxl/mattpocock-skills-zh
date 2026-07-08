快速开始：

```bash
npx skills add mattpocock/skills --skill=to-tickets
```

```bash
npx skills update to-tickets
```

[源代码](https://github.com/mattpocock/skills/tree/main/skills/engineering/to-tickets)

## 功能

`to-tickets` 将计划、规范或当前对话拆分为一组 **ticket**——每个都是 tracer-bullet 垂直切片——并发布到已配置的跟踪器，每个 ticket 声明它被哪些其他 ticket 阻塞。

每个 ticket 都是一个 **tracer bullet**——一个薄的*垂直*切片，贯穿所有集成层端到端（schema、API、UI、测试），而不是某个层的水平切片。一个完成的切片本身是可演示或可验证的，这使得每个 ticket 都可以安全地交给 agent 处理。

## 何时使用

通过输入 `/to-tickets` 来调用——agent 不会主动使用它。

当你有了已商定的计划或已编写的规范，并希望将其拆分为 ticket 时使用。指向当前对话，或传入一个规范或 Issue 引用，它会先获取正文和评论。如果变更尚未写成规范，请先生成一份——使用 [to-spec](https://aihero.dev/skills-to-spec)。

## 前置条件

`to-tickets` 发布到你的 Issue 跟踪器，因此需要先使用 [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills) 为此仓库配置跟踪器和分类标签词汇表。在真实跟踪器上，它会在发布时自动应用 `ready-for-agent` 标签。

## 同一个产物，两种解读方式

阻塞边是关键所在。它们使同一组 ticket 根据跟踪器的不同呈现出两种形态：

- **本地文件** → 仓库根目录下的单个 `tickets.md`，边以文本形式书写。你从上到下手工处理，始终保持人机交互。
- **真实跟踪器（GitHub、Linear）** → 每个 ticket 对应一个 Issue，边表示为原生阻塞链接（或子 issue）。任何阻塞项全部完成的 ticket 即处于**前沿**，可以被抓取——因此多个 agent 可以同时运行。

无论媒介如何，阻塞边都存在于 ticket 中；媒介只决定是否有东西能并行操作它们。`to-tickets` 产出产物——你如何运行它（顺序手工，或并行集群）由你决定。

## 垂直切片，而非水平切片

整个技能围绕一个区分展开。**水平**切片交付变更的某一层——所有 schema，或所有 API——而且只有所有层都完成后才能工作。**垂直**切片（tracer bullet）一次交付通过*每一层*的狭窄通路，因此完成后立即可演示。

在切片之前，`to-tickets` 会寻找预重构——"让变更变得容易，然后做容易的变更"——并将预重构工作排在最前面。然后它会在发布任何内容之前就拆解方案（粒度、阻塞边、合并或拆分什么）向你提问，并先发布阻塞项，这样每个 ticket 的 "Blocked by" 可以引用真实 ticket。

## 大范围重构例外

有一种形态打破了 tracer-bullet 规则：**大范围重构**——一种单一的机械性变更（重命名列、更改共享符号类型），其**影响范围**波及整个代码库，一次编辑会同时破坏数千个调用点，导致没有垂直切片能保持绿色。`to-tickets` 通过**扩展-收缩**来切片：扩展（在旧形式旁边添加新形式，确保没有任何东西被破坏）、迁移（按影响范围大小分批移动调用点，每批一个 ticket，由于旧形式仍然存在，CI 全程保持绿色）、最后收缩（在所有调用者迁移完毕后删除旧形式）。即使当批次本身无法单独保持绿色时，它们共享一个集成分支，所有批次都阻塞一个最终的集成-验证 ticket，绿色只在那里承诺。

## 定位

`to-tickets` 是主构建链中的一个环节：

```txt
grill-with-docs → to-spec → to-tickets → implement → code-review
```

它位于 [to-spec](https://aihero.dev/skills-to-spec)（提供已确定的规范及要切片对照的用户故事）和 [implement](https://aihero.dev/skills-implement)（构建每个 ticket，内部驱动 [tdd](https://aihero.dev/skills-tdd) 以测试优先方式编写测试，再进行 [code-review](https://aihero.dev/skills-code-review) 审查）之间。每次处理一个前沿 ticket，每个 ticket 在一个全新的上下文中工作，task 之间清空上下文。当你不确定哪种技能或流程适合时，[ask-matt](https://aihero.dev/skills-ask-matt) 会为你指路。
