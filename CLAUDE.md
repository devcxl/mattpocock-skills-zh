技能按分类目录组织在 `skills/` 下：

- `engineering/` — 日常编码工作
- `productivity/` — 日常非编码工作流工具
- `misc/` — 保留但很少使用
- `personal/` — 与我个人配置相关，不对外推广
- `in-progress/` — 尚未就绪的草稿
- `deprecated/` — 已不再使用

`engineering/`、`productivity/` 或 `misc/` 中的每个技能必须在顶级 `README.md` 中有引用，并在 `.claude-plugin/plugin.json` 中有条目。`personal/`、`in-progress/` 和 `deprecated/` 中的技能不应出现在这两者中。

顶级 `README.md` 中的每个技能条目必须将技能名称链接到其 `SKILL.md`。

每个分类目录都有一个 `README.md`，列出该分类中的每个技能及其一行描述，技能名称链接到其 `SKILL.md`。Bucket `README.md` 和顶级 `README.md` 将条目分为**用户调用（User-invoked）**和**模型调用（Model-invoked）**两类。

每个 `SKILL.md` 要么是用户调用（`disable-model-invocation: true`，只能由人类调用），要么是模型调用（模型或用户均可调用）。有关完整定义、描述约定，以及为什么用户调用技能可以调用模型调用技能但不能调用其他用户调用技能，请参阅 [docs/invocation.md](./docs/invocation.md)。
