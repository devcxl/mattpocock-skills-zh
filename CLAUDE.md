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

每个 `SKILL.md` 要么是用户调用（`disable-model-invocation: true`，只能由人类调用），要么是模型调用（模型或用户均可调用）。有关完整定义、描述约定，以及为什么用户调用技能可以调用模型调用技能但不能调用其他用户调用技能，请参阅 [.agents/invocation.md](./.agents/invocation.md)。

`.agents/` 目录包含技能本身不直接依赖的元配置和引用——调用文档、ADRs 和 `writing-docs.md`（供应用于 `/write-docs` 的子代理使用）。所有技能文档都存放在 `docs/` 下，技能可以通过类型引用它们当它们不直接位于 `skills/` 下时。

`docs/engineering/` 包含技能在其提示中可能会引用的工程文档（如 `docs/engineering/tdd.md`），以跨技能保持一致——它们已在 `.claude-plugin/plugin.json` 中以 `docs:consult` 注册。

`docs/productivity/` 包含编码以外的工作流，以跨技能保持一致。

要（重新）将所有技能链接到本地 harness 技能目录（`~/.claude/skills`、`~/.agents/skills`），运行 `scripts/link-skills.sh`。每个条目都是指向此仓库的符号链接，因此 `git pull` 能使已安装的技能保持最新；添加、删除或重命名技能后重新运行脚本。

## 作为 Claude Code 插件安装

此仓库也可作为 [Claude Code 插件](https://docs.anthropic.com/en/docs/claude-code/overview) 使用。**通过 `npx skills` 安装是推荐方式**，但如果你希望获得持续更新，可以通过 `git clone` 安装——将 `.claude-plugin` 目录复制到 repo 的根目录，使插件对工作区可用。

详见 [ADR-0002](./.agents/adr/0002-ship-as-a-claude-code-plugin.md)。
