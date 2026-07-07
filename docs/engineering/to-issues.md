快速入门：

```bash
npx skills add mattpocock/skills --skill=to-issues
```

```bash
npx skills update to-issues
```

[源仓库](https://github.com/mattpocock/skills/tree/main/skills/engineering/to-issues)

## 功能

`to-issues` 将一个计划、规格说明或 PRD 拆分为一组可独立领取的 issue，并按照依赖顺序发布到你的项目 issue 跟踪器中。

每个 issue 都是一颗**示踪子弹**——一个薄的*垂直*切片，端到端贯穿所有集成层（schema、API、UI、测试），而不是单个层的水平切片。一个完成的切片可以独立演示或验证，这正是由此产生的 ticket 可以安全地交给独立 Agent 的原因。

## 何时使用

通过输入 `/to-issues` 来调用——Agent 不会自行调用。

当你有一个达成一致的计划或书面规格说明，并希望将其拆分为 Agent 可以接手的 ticket 时使用。指向对话，或传入一个现有的 issue 引用，它会先拉取正文和评论。如果变更还没有写成规格说明，先编写一份——可以使用 [to-prd](https://aihero.dev/skills-to-prd)。

## 前置条件

`to-issues` 发布到你的 issue 跟踪器中，因此 [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills) 必须先为此仓库配置好跟踪器及其分类标签词汇表。它在发布时会自行应用 `ready-for-agent` 分类标签。

## 垂直切片，而非水平切片

整个技能围绕一个区别展开。**水平**切片交付变更的一个层——比如所有 schema 或所有 API——并且直到所有层都就绪之前，没有任何东西可以工作。**垂直**切片（示踪子弹）一次性交付贯穿*每一*层的一条狭窄路径，因此完成后立即可以演示。

在切片之前，`to-issues` 会寻找预重构（"让变更变得容易，然后做容易的变更"），并首先安排这些工作。然后在写入任何内容之前，它会就拆分方案（粒度、依赖关系、合并或拆分哪些）向你提问，并首先发布被阻塞的 issue，这样每个 issue 的 "Blocked by" 字段可以引用真实的 ticket。

## 大范围重构例外

有一种形态打破了示踪子弹规则：**大范围重构**——一种单一的机械性变更（重命名列、更改共享符号类型），其**影响范围**波及整个代码库，一次编辑会同时破坏数千个调用点，导致没有垂直切片能保持绿色。`to-issues` 通过**扩展-收缩**来切片：扩展（在旧形式旁边添加新形式，确保没有任何东西被破坏）、迁移（按影响范围大小分批移动调用点，每批一个 issue，由于旧形式仍然存在，CI 全程保持绿色）、然后收缩（在所有调用者迁移完毕后删除旧形式）。即使当批次本身无法单独保持绿色时，它们共享一个集成分支，该分支最终阻塞一个集成-验证 issue，绿色只在那里承诺。

## 在生态中的位置

`to-issues` 是主构建链中的一环：

```txt
grill-with-docs → to-prd → to-issues → implement → code-review
```

它位于 [to-prd](https://aihero.dev/skills-to-prd)（向它提供经确认的规格说明和用于切分的用户故事）和 [implement](https://aihero.dev/skills-implement)（构建每个可独立领取的 issue，内部驱动 [tdd](https://aihero.dev/skills-tdd) 以测试先行方式编写测试，然后再经过 [code-review](https://aihero.dev/skills-code-review) 审查）之间。当你不确定哪个技能或流程适合时，[ask-matt](https://aihero.dev/skills-ask-matt) 会引导你。
