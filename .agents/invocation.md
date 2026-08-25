# 模型调用 vs 用户调用

本仓库中的每个 `SKILL.md` 都是一个技能。区分它们的唯一维度是**调用方式**：谁能调用它：

- **用户调用（User-invoked）**：**只能由人类输入其名称来触发**。在 frontmatter 中设置 `disable-model-invocation: true`（Claude Code）和在 `agents/openai.yaml` 中设置 `policy.allow_implicit_invocation: false`（Codex）。`description` 是**面向人类的**：供浏览斜杠命令的人阅读的单行摘要。去掉触发列表（"当用户说……时使用"）。
- **模型调用（Model-invoked）**：**模型或用户均可触发**。默认情况：省略 `disable-model-invocation` 以及 `agents/openai.yaml` 中的 `policy` 块。`description` 是**面向模型的**，保留丰富的触发措辞（"当用户想要……、提到……、要求……时使用"），以便自动调用生效。判断一个技能应否保持模型调用的标准：_模型能否自主地、有用地调用它？_（复用是提取技能的原因，而不是测试标准。）

每种 harness 以各自的方式把用户调用的技能排除在模型的触及范围之外，因此除了人类之外没有任何东西能触发它：没有其他技能可以触发它。一个用户调用的技能可以触发模型调用的技能，但永远无法触达另一个用户调用的技能。

每个技能在其 `SKILL.md` 旁也带一个 `agents/openai.yaml`。它装着 Codex UI 元数据：`interface.display_name` 和 `interface.short_description`（用于技能选择器）：以及对用户调用的技能，与 `disable-model-invocation` 配对的 `policy.allow_implicit_invocation: false`。让两边保持同步：一个技能要么在两个 harness 中都是用户调用，要么都不是。

分类 `README.md` 和顶层 `README.md` 把条目分成**用户调用**和**模型调用**两组。

## 两者之间的依赖关系

依赖以"调用 Skill 工具并传入技能名"（`Call the Skill tool with "grilling"`）这样的明确指令来表达，而不是深层的 `../other-skill/FILE.md` 交叉引用。共享参考文档归所属技能所有；其他技能通过调用该技能，而不是跨文件夹链接来获取该技能下的内容。

这一约定只在被点名的技能是**模型调用**时才成立。用户调用的技能永远无法以这种方式触达：根据上面的不变量，没有其他技能可以触发它，包括用 Skill 工具点名它也不行。当一个步骤的前置条件是用户调用的技能（例如 `setup-matt-pocock-skills`）时，把它写成让人类去执行的指令："告诉用户运行 `/setup-matt-pocock-skills`"：绝不要写成 Skill 工具调用。

## 被动 vs 主动的领域工作

仅仅_读取_ `CONTEXT.md` 获取词汇表是一行散文式指引，而不是 `domain-modeling` 技能。只有主动构建/打磨的实践（挑战术语、边缘场景、撰写 ADR、内联更新 `CONTEXT.md`）才是 `domain-modeling`。
