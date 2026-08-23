技能按分类目录组织在 `skills/` 下：

- `engineering/` — 日常编码工作
- `productivity/` — 日常非编码工作流工具
- `misc/` — 保留但很少使用，不对外推广
- `in-progress/` — 测试版：刻意公开、欢迎反馈、不随插件发布
- `deprecated/` — 已不再使用

`engineering/` 或 `productivity/` 中的每个技能（**对外推广**的分类）必须在顶级 `README.md` 中有引用，并在 `.claude-plugin/plugin.json` 的 `skills` 数组中有条目（Claude Code 插件只随附对外推广的那组）。`misc/`、`in-progress/` 和 `deprecated/` 中的技能不得出现在两者之中。

安装命令从 [.agents/install-block.md](./.agents/install-block.md) 逐字复制。`.claude-plugin/marketplace.json` 让本仓库成为自己的单插件市场——这是安装块解释的备用方案，不是文档化的正式途径。触碰任一清单文件后运行 `claude plugin validate . --strict`。为什么做 Claude 插件而（暂时）不做 Codex 插件，见 [.agents/adr/0002-ship-as-a-claude-code-plugin.md](./.agents/adr/0002-ship-as-a-claude-code-plugin.md)。

顶级 `README.md` 中的每个技能条目必须把技能名称链接到它的 `SKILL.md`。

每个分类目录都有一个 `README.md`，列出该分类中的每个技能及一行描述，技能名称链接到其 `SKILL.md`。对外推广分类的 `README.md` 和顶级 `README.md` 把条目分成**用户调用（User-invoked）**和**模型调用（Model-invoked）**两组；非推广分类的 `README.md`（`misc/`、`in-progress/`）用平铺列表。

`engineering/` 和 `productivity/` 中的技能还有面向人类的文档页，位于 `docs/<bucket>/<skill-name>.md`（docs 树镜像 `skills/` 下的那两个分类目录）。发布 URL 是 `https://aihero.dev/skills-<skill-name>`，与分类无关——docs 路径只是仓库内部组织。当你在 `engineering/` 或 `productivity/` 中添加、重命名或改变某个技能的行为时，按照 [.agents/writing-docs.md](./.agents/writing-docs.md) 创建或重新同步它的文档页。完成的页面包含四个章节——**它做什么（What it does）**、**何时使用（When to reach for it）**、**常见问题（Common questions）**、**生效的标志（It's working if）**——`writing-docs.md` 里存有模板、章节顺序，以及去哪里找这些问题。非推广分类（`misc/`、`in-progress/`、`deprecated/`）中的技能**没有**文档页。

每个 `SKILL.md` 要么是用户调用（`disable-model-invocation: true` 加上 `agents/openai.yaml` 中的 `policy.allow_implicit_invocation: false`，只有人能调用），要么是模型调用（模型或用户均可调用）。见 [.agents/invocation.md](./.agents/invocation.md)。

[`ask-matt`](./skills/engineering/ask-matt/SKILL.md) 是路由器，映射每个用户可调用的技能及其相互关系。触发文档页重新同步的同一个规则也适用于它：每当你添加、重命名、移除或改变某个用户可调用技能在流程中的位置时，重新读 `ask-matt` 的 `SKILL.md` 并更新它，让地图保持准确——一个它从不提及的新技能，或一个它仍在路由的过时技能，都是一个说谎的路由器。

要（重新）把每个技能链接进本地 harness 技能目录（`~/.claude/skills`、`~/.agents/skills`），运行 `scripts/link-skills.sh`。每个条目都是指向本仓库的符号链接，所以 `git pull` 能让已安装的技能保持最新；添加、删除或重命名技能后重新运行脚本。

本仓库的散文（`SKILL.md` 文件、文档、`README.md`、`CHANGELOG.md`、ADR、changesets、代码注释）中**不**使用 em-dash。在需要的地方改用逗号、冒号、句号、括号或连词，视句意所需而定；绝不做盲目的字符替换。
