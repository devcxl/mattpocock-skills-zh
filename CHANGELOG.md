# mattpocock-skills

## 1.0.1

### 补丁更新

- [`d20ee26`](https://github.com/mattpocock/skills/commit/d20ee2684e2a9442698ac3c1e0f2c5b68c4cf296) 感谢 [@mattpocock](https://github.com/mattpocock)! — **`teach`** 技能改为复用优先。课程现在由可复用的**组件**构建，存放在 `./assets/` 下——样式表、测验组件、模拟器、图表辅助工具。复用是默认原则：agent 在编写课程前先读取 `./assets/`，基于已有内容构建，将任何新的可复用内容提取为组件而非内联。

## 1.0.0

### 主要变更

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) 感谢 [@mattpocock](https://github.com/mattpocock)! — 新增 **`ask-matt`** 技能——一个用户调用的路由器，根据你的情况指向正确的技能或流程。

  **破坏性变更：** `ask-matt` 会路由到本仓库中的其他用户调用技能，因此它需要这些技能已被安装。

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) 感谢 [@mattpocock](https://github.com/mattpocock)! — 新增共享设计技能，并将现有技能重新接入。

  - 新增 **`codebase-design`** 技能——deep module 词汇（module、interface、depth、seam、adapter）以及将大量行为放在小接口背后的原则。之前存在于 `improve-codebase-architecture/LANGUAGE.md` 的语言现在迁移至此，泛化为跨技能复用。
  - 新增 **`domain-modeling`** 技能——主动构建和打磨项目的领域模型，压力测试术语与词汇表的一致性，保持 `CONTEXT.md` 和 ADR 为最新。
  - `improve-codebase-architecture` 现在从 `/codebase-design` 获取架构词汇，从 `/domain-modeling` 获取领域模型。
  - `tdd` 现在依赖 `/codebase-design` 获取接口设计指导——其内联的 `deep-modules.md` / `interface-design.md` 笔记已移除，改为使用共享技能。
  - `grill-with-docs` 现在通过 `/domain-modeling` 内联构建领域模型。

  **破坏性变更：** 这些技能现在依赖新的 `codebase-design` / `domain-modeling` 技能，因此你也必须安装它们。

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) 感谢 [@mattpocock](https://github.com/mattpocock)! — 移除 **`caveman`** 和 **`zoom-out`** 技能。

  - `caveman` 是另一个我正在测试的技能的重复，本不应公开。
  - `zoom-out` 在实际使用中无人问津，因此已从仓库中移除。

  **破坏性变更：** 两个技能已被移除。

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) 感谢 [@mattpocock](https://github.com/mattpocock)! — 将 **`diagnose`** 技能重命名为 **`diagnosing-bugs`**。

  **破坏性变更：** 现在请以 `/diagnosing-bugs` 调用——旧的 `/diagnose` 名称已不存在。

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) 感谢 [@mattpocock](https://github.com/mattpocock)! — 用 **`writing-great-skills`** 替换 **`write-a-skill`**。

  - 移除了 `write-a-skill`。
  - 新增了 `writing-great-skills`（及其 `GLOSSARY.md`）——一份编写和编辑技能的参考资料：使技能可预测的词汇和原则，将无操作压缩到句子级别。
  - 将 `grilling` 暴露为模型调用的技能——`grill-me` 和 `grill-with-docs` 背后可复用的面试循环。

  **破坏性变更：** `write-a-skill` 已被移除；请使用 `writing-great-skills` 替代。

### 次要变更

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) 感谢 [@mattpocock](https://github.com/mattpocock)! — 新增 **`resolving-merge-conflicts`** 技能——一个用于解决进行中的 git merge 或 rebase 冲突的循环。独立技能，不依赖其他技能。

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) 感谢 [@mattpocock](https://github.com/mattpocock)! — 在文档中将技能分类从 **Commands / Skills** 重命名为 **User-invoked / Model-invoked**，并新增 `docs/invocation.md` 定义这一划分：用户调用的技能只有输入其名称才能触发，用于编排；模型调用的技能在任务匹配时也可自动触发。用户调用的技能可以调用模型调用的技能，但绝不能调用另一个用户调用的技能。

### 补丁更新

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) 感谢 [@mattpocock](https://github.com/mattpocock)! — 收紧 **`review`** 技能：快速失败引用检查、单一来源规则、无操作裁剪。
