# 模型调用 vs 用户调用

本仓库中的每个 `SKILL.md` 都是一个技能。区分它们的唯一轴是**调用方式**——谁能调用它：

- **用户调用（User-invoked）**——**只能由人类输入其名称来触发**。在 frontmatter 中设置 `disable-model-invocation: true`（Claude Code）和在 `agents/openai.yaml` 中设置 `policy.allow_implicit_invocation: false`（Codex）。`description` 是**面向人类的**：一行摘要，供浏览斜杠命令的人阅读。去掉触发条件列表（"当用户说…时使用"）。

- **模型调用（Model-invoked）**——**模型或用户均可触发**。默认情况：省略 `disable-model-invocation` 和 `agents/openai.yaml` 中的 `policy` 块。`description` 是**面向模型的**，保留丰富的触发措辞（"当用户想要…、提到…、要求…时使用"），以便自动调用机制生效。判断技能是否应保持模型调用的标准：_模型能否自主地、有用地调用它？_（复用是提取技能的原因，而非测试标准。）

每种 harness 以各自的方式将用户调用的技能排除在模型的触及范围之外，因此除了人类之外没有任何东西能触发它——没有其他技能可以调用它。用户调用的技能可以调用模型调用的技能，但绝不能调用另一个用户调用的技能。

在分类 `README.md` 和顶层 `README.md` 中，将条目归入**用户调用**和**模型调用**两组。

每个技能在其 `SKILL.md` 旁边也带有一个 `agents/openai.yaml`。它包含 Codex UI 元数据——`interface.display_name` 和 `interface.short_description` 用于技能选择器——以及对于用户调用技能，包含与 `disable-model-invocation` 配对的 `policy.allow_implicit_invocation: false`。保持两者同步：一个技能要么在两种 harness 中都是用户调用，要么都不是。

## 两者之间的依赖关系

依赖关系以 **`/skill` 风格的自然语言调用**来表达（"运行 `/grilling` 技能"），而不是深层的 `../other-skill/FILE.md` 交叉引用。共享参考文档归所属技能所有；其他技能通过调用该技能来获取内容，而不是跨文件夹链接。

## 被动 vs 主动领域工作

仅仅_阅读_ `CONTEXT.md` 获取词汇，是一行自然语言的指引，而非 `domain-modeling` 技能。只有主动构建/打磨的实践（挑战术语、边缘场景分析、编写 ADR、内联更新 `CONTEXT.md`）才属于 `domain-modeling`。
