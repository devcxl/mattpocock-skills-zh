快速开始：

```bash
npx skills add mattpocock/skills --skill=to-spec
```

```bash
npx skills update to-spec
```

[源代码](https://github.com/mattpocock/skills/tree/main/skills/engineering/to-spec)

## 功能

`to-spec` 将当前对话和你的代码库理解转化为一份规范（你可能称之为 PRD），然后发布到你的 Issue 跟踪器。

它**不会再次采访你**。当你用到它时，对齐工作已经完成——`to-spec` 综合已有信息，而不是重新问一遍问题。

## 何时使用

通过输入 `/to-spec` 来调用——agent 不会主动使用它。

当你已经讨论过变更方案、领域术语已确定，并且希望在写代码之前将这份共识记录下来时使用。如果**还没有**对齐，请先进行盘问——使用 [grill-with-docs](https://aihero.dev/skills-grill-with-docs)。要将完成的 spec 拆分为 ticket，请使用 [to-tickets](https://aihero.dev/skills-to-tickets)。

## 前置条件

`to-spec` 发布到你的 Issue 跟踪器，因此需要先使用 [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills) 为此仓库配置跟踪器和分类标签。它会自行应用 `ready-for-agent` 标签——无需单独的分类流程。

## 规范包含的内容

- **问题陈述**——什么被破坏或缺失，以及为什么值得解决，使用项目自身的术语表
- **解决方案**——高层次的问题修复方案，在任何实现细节之前
- **用户故事**——一份详细编号的列表，列出变更必须支持的具体行为，每条都可独立验证
- **实现决策**——在对话中已确定的方案选择，避免后续重新争论
- **测试决策**——功能将测试的 seams，以及"完成"的标准
- **范围外内容**——此变更刻意**不**覆盖的内容，以保持 ticket 的边界清晰
- **进一步说明**——其他值得保留但不适合以上分类的内容

## 深模块

在编写规范前，`to-spec` 会勾勒测试该功能的 **seams**，并寻找**深模块**机会——大量功能隐藏在小型稳定接口之后。它优先使用现有的 seams 而非新建，并尽可能采用最高的 seam，理想情况下整个变更只用一个。

这对 agentic 开发很重要：一个好的接口为测试提供了稳定的目标，使得底层代码可以变化而测试不必跟着变动。

## 验证标准

- 它开始编写规范，而不是向你重新提问
- 它在编写前与你确认 seams，并尽可能少地提出新 seams
- 规范使用你项目的领域术语，而非通用模板

## 定位

`to-spec` 是主构建链中的一个环节：

```txt
grill-with-docs → to-spec → to-tickets → implement → code-review
```

在计划和领域术语确定后、将工作拆分为实现 ticket 之前使用。它的关键邻居是 [grill-with-docs](https://aihero.dev/skills-grill-with-docs)（打磨上下文使规范更精确）和 [to-tickets](https://aihero.dev/skills-to-tickets)（将规范转化为一组 ticket 供 [implement](https://aihero.dev/skills-implement) 构建）。当你不确定哪种技能或流程适合时，[ask-matt](https://aihero.dev/skills-ask-matt) 会为你指路。
