Quickstart:

```bash
npx skills add mattpocock/skills --skill=implement
```

```bash
npx skills update implement
```

[Source](https://github.com/mattpocock/skills/tree/main/skills/engineering/implement)

## 它的作用

`implement` 从你的工单跟踪器中取出一个 `ready-for-agent` 工单，通过 [tdd](https://aihero.dev/skills-tdd) 以测试先行的方式构建它，然后为 [code-review](https://aihero.dev/skills-code-review) 提交一个拉取请求。

它**不会**在你的代码库上直接实现而未经过测试。它加载工单，阅读简要说明，设计接口，然后走一遍完整的 red-green-refactor 循环——为每种行为编写一个测试，再编写刚好足够通过测试的代码，然后进行重构——最后提交一个拉取请求。

## 何时使用

代理在构建链中自动调用 `implement`——你不需要手动调用它。

当 `to-tickets` 发布了工单并且你希望它们被独立地构建时使用。它会在你的跟踪器中寻找标记为 `ready-for-agent` 的工单并按依赖顺序处理它们。如果你还没有工单，使用 [to-tickets](https://aihero.dev/skills-to-tickets) 来产生它们。

## 先设计，再编码

在编写任何代码之前，`implement` 会加载每个工单的简要说明并设计接口。它寻找**深度模块**（隐藏复杂功能的小型稳定接口）并检查**接缝**（测试可以连接的点）。只有在接口确定之后，它才会开始编写第一个测试。

这意味着 [tdd](https://aihero.dev/skills-tdd) 循环是以一个深思熟虑的设计为起点的，而不是从空白状态开始的。它不会在代码上"试探"——它在编写代码之前就已经知道它将被测试的接缝在哪里。

## 构建链步骤

`implement` 加载工单，通过 [codebase-design](https://aihero.dev/skills-codebase-design) 设计接口，驱动 [tdd](https://aihero.dev/skills-tdd) 编写测试先行的代码以通过为准备接缝而设计的接口，然后提交一个拉取请求给 [code-review](https://aihero.dev/skills-code-review)。

## 它的定位

`implement` 是构建链中构建工单的步骤：

```txt
grill-with-docs → to-spec → to-tickets → implement → code-review
```

它接收 [to-tickets](https://aihero.dev/skills-to-tickets) 产生的工单，在内部驱动 [tdd](https://aihero.dev/skills-tdd) 来构建每个工单，然后将其结果传递给 [code-review](https://aihero.dev/skills-code-review)。当你不确定适合哪种技能或流程时，[ask-matt](https://aihero.dev/skills-ask-matt) 会为你指引方向。
