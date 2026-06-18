---
name: tdd
description: 测试驱动开发。当用户想要以测试为先的方式构建功能或修复 bug、提到"红-绿-重构"、或需要集成测试时使用。
---

# 测试驱动开发

## 理念

**核心原则**：测试应通过 public interface 验证行为，而非 implementation 细节。代码可以完全改变；测试不应该。

**好的测试**是集成风格的：它们通过 public API 执行真实的代码路径。它们描述系统**做什么**，而不是**怎么做**。一个好的测试读起来像一份规格说明——"用户可以使用有效购物车结账"准确告诉你存在什么能力。这些测试能经受住重构，因为它们不关心内部结构。

**坏的测试**与 implementation 耦合。它们 mock 内部协作对象、测试私有方法、或通过外部手段验证（比如直接查询数据库而不是使用 interface）。警告信号：重构时测试失败，但行为没有变化。如果你重命名了一个内部函数，测试就失败了，这些测试测试的是 implementation，而不是 behavior。

参见 [tests.md](tests.md) 获取示例，[mocking.md](mocking.md) 获取 mocking 指南。

## 反模式：水平切片

**不要先写所有测试，再写所有实现。** 这是"水平切片"——把 RED 理解为"写所有测试"，GREEN 理解为"写所有代码"。

这会产生**糟糕的测试**：

- 批量编写的测试测试的是**想象中**的 behavior，而非**实际**的 behavior
- 你最终测试的是事物的**形状**（数据结构、函数签名），而非面向用户的 behavior
- 测试对真实变化不敏感——behavior 破坏时通过，behavior 正常时失败
- 你超出了头灯范围，在理解 implementation 之前就锁定了测试结构

**正确做法**：通过 tracer bullet 实现垂直切片。一个测试 → 一个实现 → 重复。每个测试回应你从上一个周期学到的内容。因为你刚刚写了代码，你确切知道什么 behavior 重要以及如何验证它。

```
错误（水平）：
  RED:   test1, test2, test3, test4, test5
  GREEN: impl1, impl2, impl3, impl4, impl5

正确（垂直）：
  RED→GREEN: test1→impl1
  RED→GREEN: test2→impl2
  RED→GREEN: test3→impl3
  ...
```

## 工作流

### 1. 规划

在探索代码库时，阅读 `CONTEXT.md`（如果存在），使测试名称和 interface 词汇与项目的领域语言匹配，并尊重你将要接触区域内的 ADR。

在编写任何代码之前：

- [ ] 与用户确认需要哪些 interface 变更
- [ ] 与用户确认要测试哪些 behavior（优先排序）
- [ ] 识别 deep module 的机会（小 interface，深 implementation）——运行 `/codebase-design` 技能获取词汇和可测试性检查
- [ ] 列出要测试的 behavior（而非实现步骤）
- [ ] 获得用户对计划的批准

询问："public interface 应该是什么样子？哪些 behavior 最重要需要测试？"

**你无法测试一切。** 与用户确认哪些 behavior 最重要。将测试工作集中在关键路径和复杂逻辑上，而不是每个可能的边界情况。

### 2. Tracer Bullet

编写一个测试，确认系统的一个方面：

```
RED:   为第一个 behavior 编写测试 → 测试失败
GREEN: 编写最少代码使其通过 → 测试通过
```

这是你的 tracer bullet——证明路径端到端可用。

### 3. 增量循环

对每个剩余 behavior：

```
RED:   编写下一个测试 → 失败
GREEN: 最少代码使其通过 → 通过
```

规则：

- 一次只写一个测试
- 只写足以通过当前测试的代码
- 不要预测未来的测试
- 保持测试聚焦于可观察的 behavior

### 4. 重构

所有测试通过后，寻找[重构候选](refactoring.md)：

- [ ] 提取重复代码
- [ ] Deepen module（将复杂性移到简单 interface 背后）
- [ ] 在自然的地方应用 SOLID 原则
- [ ] 考虑新代码揭示了关于现有代码的什么信息
- [ ] 每个重构步骤后运行测试

**绝不在 RED 状态下重构。** 先达到 GREEN。

## 每个周期的检查清单

```
[ ] 测试描述 behavior，而非 implementation
[ ] 测试仅使用 public interface
[ ] 测试能经受住内部重构
[ ] 代码是为该测试所需的最少量
[ ] 没有添加推测性的功能
```
