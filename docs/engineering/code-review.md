Quickstart:

```bash
npx skills add mattpocock/skills --skill=code-review
```

```bash
npx skills update code-review
```

[Source](https://github.com/mattpocock/skills/tree/main/skills/engineering/code-review)

## 它的作用

`code-review` 读取当前变更的差异，并按重要性排序提供结构化反馈——从阻塞性问题（正确性、安全性）到次要意见（风格、命名），绝不重复 linter 或类型检查器已经能捕捉到的问题。

它**不会**在没有理解意图的情况下审查代码。它会读取差异，也会读取文件本身以理解上下文。它按严重程度对反馈进行分类——阻塞性、高、中、低——并且只有在你有要求时才会重写代码；否则，它是做注释的，而不是做编辑的。

## 何时使用

你通过键入 `/code-review` 来调用它，或者代理在你的构建链末尾自动调用它。

在合并任何拉取请求之前使用它。当变更集很大或其影响不明显时尤其有价值。如果你正在审查的不是代码而是文档，使用 [writing-great-skills](https://aihero.dev/skills-writing-great-skills) 来评估技能文档。

## 审查层级

审查读取差异，但也读取差异周围的文件，以理解更大范围的上下文。它检查：

- **正确性**——这段代码能做到它声称能做到的事情吗？
- **安全性**——是否存在注入、竞态条件或数据泄露？
- **可维护性**——下一个人能理解这段代码吗？
- **性能**——是否存在明显的瓶颈？
- **与代码库的一致性**——它是否遵循项目已有的模式？

它不会检查 linter、格式化工具或类型检查器已经能捕捉到的问题。它不会对风格提出无端端的意见。每一条反馈都有一个理由。

## 它发挥作用的表现

- 每条反馈都标有严重级别——阻塞性、高、中、低。
- 阻塞性问题是在"为什么"的层面提出的，并附有建议的解决方案。
- 它不会标记 linter 或类型检查器已经能捕捉到的问题。
- 它读取差异，但也读取差异周围的上下文。

## 它的定位

`code-review` 是构建链中的最后一个步骤：

```txt
grill-with-docs → to-spec → to-tickets → implement → code-review
```

它接收 [implement](https://aihero.dev/skills-implement) 构建的代码，并在合并之前对其进行审查。它的近邻是 [tdd](https://aihero.dev/skills-tdd)，后者在构建步骤内部编写代码以确保代码是可测试的——因此到 code-review 运行时，代码已经通过了它自己的测试。当你不确定适合哪种技能或流程时，[ask-matt](https://aihero.dev/skills-ask-matt) 会为你指引方向。
