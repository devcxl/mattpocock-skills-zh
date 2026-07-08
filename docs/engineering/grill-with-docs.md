快速入门：

```bash
npx skills add mattpocock/skills --skill=grill-with-docs
```

```bash
npx skills update grill-with-docs
```

[源仓库](https://github.com/mattpocock/skills/tree/main/skills/engineering/grill-with-docs)

## 功能

`grill-with-docs` 无休止地盘问你的计划或设计，一次只问一个问题，直到你和 Agent 达成共享理解——并且在盘问过程中将词汇和决策记录在案。

盘问**留下书面痕迹**。普通的盘问磨练你的思维，然后会话结束时一切蒸发；而这个技能会在每个术语确定时将其捕捉到 `CONTEXT.md` 术语表中，并将艰难的一维决策记录为 ADR。对齐成果超越了对话本身，而不是只存在于你的头脑中。

## 何时使用

通过输入 `/grill-with-docs` 来调用——Agent 不会自行调用。

在变更开始时使用，当计划仍然模糊、领域语言尚未确定，并且你希望在编写任何代码之前对两者都进行压力测试时。如果你只想要盘问而不需要制品，使用 [grilling](https://aihero.dev/skills-grilling)；如果计划已经清晰，你只需要确定或记录术语，使用 [domain-modeling](https://aihero.dev/skills-domain-modeling)。而如果变更大到一次会话容纳不下、路线仍然模糊——一个绿野项目、一个大型功能构建——先用 [wayfinder](https://aihero.dev/skills-wayfinder) 上游开始：它将工作绘制为决策地图，然后当路线清晰时交回给此主流程。

## 前置条件

本技能是有状态的——它在盘问过程中写入你的仓库。已确定的术语会出现在根目录的 `CONTEXT.md` 术语表中（或者如果存在 `CONTEXT-MAP.md` 标记为多上下文仓库，则出现在相关上下文的 `CONTEXT.md` 中），真正难以撤销的决策会作为 ADR 记录在 `docs/adr/` 下。两者都是惰性创建的——在第一个术语或决策确定之前什么都不存在——因此你不需要预先搭建任何脚手架，但你需要在一个写入这些文件是安全的目录中工作。

## 盘问

引擎就是一次**盘问**：一次一个问题、沿着设计树无休止地下行，在继续之前解决决策之间的依赖关系，每个问题都附有推荐答案。代码库可以回答的问题通过阅读代码库来回答，而不是询问你。

使这个变体成为独立技能的是答案的去向。在盘问进行时，模糊的语言被磨练为规范术语并内联写入术语表——而不是在最后批量处理。术语表保持为术语表：纯词汇，没有实现细节，没有规格说明。ADR 只会在必要时才提供——当一个决策难以撤销、没有上下文会令人惊讶、并且是真实权衡的结果时。大多数会话会产出更精确的术语表和很少或没有 ADR，这正是预期的形态。

## 验证标准

- 一次只问一个问题并等待回答，而不是抛出调查问卷。
- 术语在确定时立即写入 `CONTEXT.md`，使用你项目自己的语言。
- 它会在代码库中寻找答案来回答自己的问题（在可以做到的情况下）。
- ADR 保持稀少——你不会被要求橡皮图章化可逆的选择。

## 在生态中的位置

`grill-with-docs` 是主构建链的起始步骤：

```txt
grill-with-docs → to-spec → to-tickets → implement → code-review
```

它是最早的环节，在任何内容写为规格说明之前：它产生共享理解和确定的词汇表，然后 [to-spec](https://aihero.dev/skills-to-spec) 在不重新盘问你的情况下综合为 spec。其近邻是 [grilling](https://aihero.dev/skills-grilling)（不带文档的相同盘问）以及 [domain-modeling](https://aihero.dev/skills-domain-modeling)（它所驱动的术语表和 ADR 规范）。当你不确定哪个技能或流程适合时，[ask-matt](https://aihero.dev/skills-ask-matt) 会引导你。
