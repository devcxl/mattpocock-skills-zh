# 将技能集以原生 Claude Code 插件形式发布；暂缓原生 Codex 插件

这些技能一直可以通过 [skills.sh](https://skills.sh/mattpocock/skills)（`npx skills add mattpocock/skills`）安装，它会将可编辑的技能文件复制到用户的项目中，适用于 Claude Code、Codex 和其他遵循 Agent-Skills 标准的 harness。一个反复出现的需求是**即插即用**的发布方式：将技能集作为只读、始终最新的 bundle 订阅，无需编辑，而不是 fork 一份自己维护。这正是原生插件系统所提供的。

我们发布原生 **Claude Code 插件**，同时**暂缓**原生 **Codex 插件**。这种拆分是由每个生态系统的插件清单选择技能的方式与本仓库的 bucket 布局冲突所决定的。

## 约束条件：bucket 化技能 vs. 单路径选择

技能位于 `skills/` 下的 bucket 文件夹中——`engineering/` 和 `productivity/` 是**已推广的**（发布的）；`misc/`、`personal/`、`in-progress/` 和 `deprecated/` 是**不推广的**。插件必须只暴露已推广的技能集，这横跨其中两个 bucket 文件夹。

- **Claude Code** — `.claude-plugin/plugin.json` 接受 `skills` 作为**显式技能目录路径的数组**。我们逐一列出已推广的技能，以零歧义地排除所有其他内容，并添加 `.claude-plugin/marketplace.json`，使仓库成为其自身的单一插件市场。经过端到端验证：`claude plugin validate . --strict` 通过，`marketplace add` → `install` 解析所有已推广的技能。

- **Codex** — `.codex-plugin/plugin.json` 仅接受 `skills` 作为**单路径字符串**（数组会被 `missing or invalid plugin.json` 拒绝），且 Codex 会递归地发现其下的 `SKILL.md` 文件。无法通过单个路径指定两个 bucket 文件夹，或筛选出子集。测试并拒绝了两种逃生方案：
  - 指向 `./skills/` 也会发布 `deprecated/`、`in-progress/`、`personal/` 和 `misc/`——我们刻意不推广的已弃用、草稿和个人技能。
  - 一个指向 bucket 的**符号链接**的策划扁平目录无法在安装后存活：Codex 会将插件树复制到其缓存中并**丢弃符号链接**，因此技能会以空内容到达。

为 Codex 提供单一已推广路径的唯一稳健方式要么是（a）**重构**，使 `skills/` 只包含已推广的技能（将非推广 bucket 移出——这会对 `CLAUDE.md`、`scripts/link-skills.sh`、bucket README 以及依赖 `in-progress/` 和 `personal/` 的本地开发工作流造成大范围影响），要么是（b）**提交重复副本**到扁平目录（同步负担和第二个事实来源）。两者都是结构性决策，不应捆绑到发布 Claude 插件中。这很可能就是最初迟迟未发布插件的、被遗忘一半的原因：清单格式无法干净地表达 bucket 仓库的策划子集。

## 决策

- 现在发布 **Claude Code 插件**（`.claude-plugin/plugin.json` + `.claude-plugin/marketplace.json`），策划为已推广的技能集，作为 v1.2 的 headline 交付物。
- 保持 **skills.sh** 作为通用安装器——它目前已服务于 Codex 和其他 harness，因此没有 Codex 用户会缺少安装途径。
- **暂缓**原生 Codex 插件，直到我们决定是将 `skills/` 重构为仅含已推广技能，还是提交生成的扁平副本。当 Codex 支持 `skills` 数组/包含列表，或在安装时保留符号链接时，重新评估。

## 由此产生的不变量

- 每个已推广的技能在 `.claude-plugin/plugin.json` 的 `skills` 数组中都有一个条目（这已经是 `CLAUDE.md` 中的规则；现在它同时也作为插件内容的 gate）。
- `.claude-plugin/plugin.json` 的 `version` 与 `package.json` 的版本保持一致——发布时一起提升。Claude 使用插件 `version` 来决定已安装用户何时看到更新。