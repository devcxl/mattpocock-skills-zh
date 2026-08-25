# 以原生 Claude Code 插件形式发布技能集；暂缓原生 Codex 插件

这些技能一直都可以通过 [skills.sh](https://skills.sh/mattpocock/skills)（`npx skills add mattpocock/skills`）安装，它会把可编辑的技能文件复制到用户的项目中，覆盖 Claude Code、Codex 以及其他遵循 Agent-Skills 标准的 harness。一个反复出现的需求是**即插即用**的发布形式：把技能集作为只读、始终最新的 bundle 订阅，不要 fork 一份自己去改。这正是原生插件系统所提供的。

我们发布一个原生的 **Claude Code 插件**，同时**暂缓**一个原生的 **Codex 插件**。这种拆分是由每个生态系统的插件清单选择技能的方式与本仓库的 bucket 化布局之间的冲突所强加的。

## 约束：bucket 化的技能 vs. 单路径选择

技能位于 `skills/` 下的 bucket 文件夹中：`engineering/` 和 `productivity/` 是**已晋升**的（发布的）；`misc/`、`personal/`、`in-progress/` 和 `deprecated/` 是**未晋升的**。插件必须只暴露已晋升的集合，这跨越其中两个 bucket 文件夹。

- **Claude Code**：`.claude-plugin/plugin.json` 接受 `skills` 作为**显式技能目录路径的数组**。我们逐一列出已晋升的技能，以零歧义地排除所有其他内容，并加上 `.claude-plugin/marketplace.json`，让本仓库成为自己的单插件市场。端到端验证：`claude plugin validate . --strict` 通过，`marketplace add` → `install` 解析所有已晋升的技能。

- **Codex**：`.codex-plugin/plugin.json` 只接受 `skills` 作为**单个路径字符串**（数组会被 `missing or invalid plugin.json` 拒绝），Codex 会递归发现其下的 `SKILL.md` 文件。无法用一个路径指定两个 bucket 文件夹，也无法从一个路径中精选子集。两条退路都被尝试并否决：

  - 指向 `./skills/` 会把 `deprecated/`、`in-progress/`、`personal/` 和 `misc/` 也一并发布：我们刻意不晋升的那些已淘汰、草稿、个人技能。
  - 一个精选的**符号链接**扁平目录，指向 bucket，无法在安装后存活：Codex 把插件树复制到它的缓存中并**丢弃符号链接**，于是技能以空内容到达。

给 Codex 一个仅含已晋升技能的单路径，唯一稳妥的方式要么是（a）**重构**使 `skills/` 只包含已晋升的技能（把未晋升的 bucket 移出去：这会对 `CLAUDE.md`、`scripts/link-skills.sh`、各 bucket 的 README 以及依赖 `in-progress/` 和 `personal/` 的本地开发工作流造成大范围影响），要么是（b）**提交重复副本**到扁平目录（同步负担以及第二份事实来源）。两者都是结构性决策，不该随发布 Claude 插件一起完成。这很可能就是最初没有发布插件那个被遗忘一半的原因：清单格式无法干净地表达 bucket 化仓库的精选子集。

## 决策

- 现在发布 **Claude Code 插件**（`.claude-plugin/plugin.json` + `.claude-plugin/marketplace.json`），精选为已晋升的集合，作为 v1.2 的 headline 交付物。
- 保留 **skills.sh** 作为通用安装器：它今天已经服务于 Codex 和其他 harness，所以没有任何 Codex 用户缺安装路径。
- **暂缓**原生 Codex 插件，直到我们在"将 `skills/` 重构为只含已晋升技能"和"提交生成的扁平副本"之间做出选择。等 Codex 支持 `skills` 数组/包含列表，或在安装时保留符号链接，再重新评估。

## 由此带来的不变量

- 每个已晋升的技能在 `.claude-plugin/plugin.json` 的 `skills` 数组中都有一项（这已经是 `CLAUDE.md` 的规则；现在它也同时决定了插件的内容）。
- `.claude-plugin/plugin.json` 的 `version` 与 `package.json` 的 `version` 保持一致：发布时一起 bump。Claude 用插件 `version` 决定已安装用户何时看到更新。

## 2026-08-05 更新

`mattpocock-skills` 已入选 **Claude Code 官方市场**：配置名 `claude-plugins-official`，源仓库 `anthropics/claude-plugins-official`：每个 Claude Code 安装都自带它。`claude plugins install mattpocock-skills` 现在是文档化的正式安装途径，上面的 `marketplace add` → `install` 路径已被取代。安装文案放在 [.agents/install-block.md](../install-block.md)。

官方收录指向本仓库的 git URL，并直接读取 `.claude-plugin/plugin.json`，因此不依赖 `.claude-plugin/marketplace.json`。那个文件仅作为直接安装本仓库（未发布的 commit，或 fork）时的回退方案而保留。

2026-08-05 验证，Claude Code 2.1.222，针对线上收录：

- `claude plugins install mattpocock-skills` 无需先添加任何市场即可解析，并报告 `mattpocock-skills@claude-plugins-official`。
- 接着 `claude plugin details mattpocock-skills` 报告版本 1.2.0，并加载已晋升的技能。
- 收录的 `source` 是 `{"source": "url", "url": "https://github.com/mattpocock/skills.git", "sha": …}`：**sha 是固定的**，所以发布到达已安装用户是在那个固定的 sha 移动时，而不是在我们打 tag 的那一刻。撰写本文时，该 sha 落后 `main` 两个 commit，这也是它列出 22 个技能而非 `plugin.json` 中 24 个的原因。
- 会话内的 `/plugin install mattpocock-skills` **未**被验证：`/plugin` 在无头（`claude -p`）会话中不可用。它运行与 CLI 相同的解析器，文档化的示例形式是 `/plugin install <name>@claude-plugins-official`。
