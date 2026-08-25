技能按 bucket 文件夹组织在 `skills/` 下：

- `engineering/`：日常编码工作
- `productivity/`：日常非编码工作流工具
- `misc/`：保留但很少使用，不对外推广
- `in-progress/`：Beta：刻意公开、欢迎反馈、不随插件发布
- `deprecated/`：已不再使用

`engineering/` 或 `productivity/`（**已推广**的 bucket）中的每个技能必须在顶层 `README.md` 中有一处引用，并在 `.claude-plugin/plugin.json` 的 `skills` 数组中有一项（Claude Code 插件只随附已推广的集合）。`misc/`、`in-progress/` 和 `deprecated/` 中的技能不得出现在两者之中。

安装命令从 [.agents/install-block.md](./.agents/install-block.md) 逐字复制。`.claude-plugin/marketplace.json` 让本仓库成为自己的单插件市场：这是安装块解释的回退方案，不是文档化的正式途径。触碰任一清单文件后运行 `claude plugin validate . --strict`。为什么做 Claude 插件而（暂时）不做 Codex 插件，见 [.agents/adr/0002-ship-as-a-claude-code-plugin.md](./.agents/adr/0002-ship-as-a-claude-code-plugin.md)。

顶层 `README.md` 中的每个技能条目必须把技能名链接到它的 `SKILL.md`。

每个 bucket 文件夹有一份 `README.md`，用一句话描述列出该 bucket 中的每个技能，技能名链接到它的 `SKILL.md`。已推广 bucket 的 `README.md` 与顶层 `README.md` 把条目分成 **User-invoked**（用户调用）与 **Model-invoked**（模型调用）；非推广 bucket 的 `README.md`（`misc/`、`in-progress/`）使用扁平的列表。

`engineering/` 与 `productivity/` 中的技能还在 `docs/<bucket>/<skill-name>.md` 有一份面向人类的文档页（文档树镜像 `skills/` 下的这两个 bucket 文件夹）。发布的 URL 是 `https://aihero.dev/skills-<skill-name>`，无论 bucket 如何：文档路径只是仓库组织形式。当你在 `engineering/` 或 `productivity/` 中新增、重命名或修改某个技能的行为时，按 [.agents/writing-docs.md](./.agents/writing-docs.md) 创建或重新同步其文档页。一份完成的页面包含四个部分：**它的作用**、**何时使用**、**常见问题**、**怎样算成功**：`writing-docs.md` 给出模板、小节顺序以及去哪里找问题。非推广 bucket（`misc/`、`in-progress/`、`deprecated/`）中的技能**没有**文档页。

每份 `SKILL.md` 要么是用户调用型（`disable-model-invocation: true` 加上 `agents/openai.yaml` 中的 `policy.allow_implicit_invocation: false`，仅人类可达），要么是模型调用型（模型或用户均可达）。见 [.agents/invocation.md](./.agents/invocation.md)。

[`ask-matt`](./skills/engineering/ask-matt/SKILL.md) 是路由器，映射每一个用户可达的技能以及它们之间的关系。与重新同步文档页相同的触发条件适用于它：当你新增、重命名、移除一个用户可达技能，或修改它在流程中的位置时，重新读一遍 `ask-matt` 的 `SKILL.md` 并更新它，以保持地图准确：一个它从未提到的新技能，或一个它仍路由到的过时技能，都是在说谎的路由器。

要把所有技能（重新）链到本地 harness 技能目录（`~/.claude/skills`、`~/.agents/skills`），运行 `scripts/link-skills.sh`。每条都是一个指向本仓库的符号链接，所以 `git pull` 会保持已安装技能为最新；新增、移除或重命名技能后再次运行该脚本。
