Quickstart:

```bash
npx skills add mattpocock/skills --skill=tdd
```

```bash
npx skills update tdd
```

[Source](https://github.com/mattpocock/skills/tree/main/skills/engineering/tdd)

## 它的作用

`tdd` 以测试先行的方式构建一个特性或修复一个缺陷，一次一个行为，通过 red-green 循环驱动代码的产生。

它**不会**事先编写所有测试用例。一次性批量编写所有测试（"水平切片"）会产生针对_想象出来的_行为的测试——它们检查事物的形状而对真实的变化麻木不仁。`tdd` 采用垂直切片的方式：一个测试，然后刚好足够通过它的代码，然后下一个测试，每个循环都从上一个循环中汲取经验。测试只针对公共接口，因此底层的实现可以改变而测试无需变动。

## 何时使用

键入 `/tdd`，或者当任务适合时代理会自动使用它——以测试先行的方式构建一个特性或修复一个缺陷，或者当你说"red-green-refactor"时。

当有一个具体的行为需要构建，并且你希望测试能够经受住重构时使用它。如果行为尚未确定，先敲定规范——可以使用 [to-spec](https://aihero.dev/skills-to-spec)。当工作的重点实际上是接口的形状而不是测试时，使用 [codebase-design](https://aihero.dev/skills-codebase-design)；`tdd` 在规划期间会调用它来寻找深度模块的词汇。

## 红绿交替，一次一个切片

主导思想是 **red-green 循环**：编写一个失败的测试（red），添加刚好足够通过它的代码（green），然后重复下一个行为——每个循环都从上一个循环中汲取经验。第一个循环是一个**tracer bullet**：一个测试，在向外构建之前先证明单一路径可以端到端工作。因为你刚刚编写了代码，所以你确切知道哪个行为是重要的以及如何验证它——你永远不会因为提交了一个你尚不理解的测试结构而超越自己的视野。

两条规则保证测试的诚实性。一个好的测试读起来像一份规范（"用户可以使用有效的购物车结账"），并通过公共 API 执行真实的代码路径，因此重命名一个内部函数永远不会破坏它。预期值来自一个独立的真实来源——一个已知正确的字面量、一个手工验证的示例、一份规范——永远不能像代码计算它们那样重新计算，因为那样会产生一个**同义反复**的测试，它通过构造而通过，却什么也说明不了。

重构只在测试套件全绿时进行；绝不能在 red 状态下进行。

## 它发挥作用的表现

- 它编写一个测试，使其通过，然后才编写下一个——而不是先批量编写测试再批量编写代码。
- 测试命名行为而非内部实现，并且能够经受住内部重命名。
- 预期值是来自规范的字面量，而不是通过代码相同方式推导出的数字。

## 它的定位

`tdd` 是主构建链中用来编写代码的 red-green 循环：

```txt
grill-with-docs → to-spec → to-tickets → implement → code-review
```

[implement](https://aihero.dev/skills-implement) 是链中的构建步骤，它在内部驱动 `tdd` 以测试先行的方式构建每个工单，然后再交给 [code-review](https://aihero.dev/skills-code-review)——因此 `tdd` 是该步骤内部的引擎，而不是一个独立的步骤。你也可以直接使用它，只要有一个具体的行为需要构建而不需要完整的规范。它的另一个近邻是 [codebase-design](https://aihero.dev/skills-codebase-design)，它依赖后者来寻找值得测试的深层模块接缝。当你不确定适合哪种技能或流程时，[ask-matt](https://aihero.dev/skills-ask-matt) 会为你指引方向。
