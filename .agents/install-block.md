# 标准的安装块

一套安装说明，一套文案。`README.md`、`.changeset/*` 以及 `docs/` 下的所有页面都必须用**这份**文案，别无二致。先在此修改，再传播到各处。

`mattpocock-skills` 已收录于 **Claude Code 官方市场**：配置名 `claude-plugins-official`，源仓库 `anthropics/claude-plugins-official`：每个 Claude Code 安装都会自带它，无需先添加任何市场。Anthropic 官方市场默认开启了自动更新（[discover-plugins](https://code.claude.com/docs/en/discover-plugins)），所以"更新自动送达"是事实，不是期望。

## Claude Code：插件

<canonical-block name="claude-code">

```bash
claude plugins install mattpocock-skills
```

或者在会话内：

```
/plugin install mattpocock-skills
```

它已经在 Claude Code 官方市场中，无需先添加任何市场，更新会自动送达。

</canonical-block>

## Codex 以及其他 agent：skills.sh

插件仅适用于 Claude Code。其他场合下，[skills.sh](https://skills.sh/mattpocock/skills) 会把可编辑的技能文件复制到项目中。`README.md` 使用整套安装形式：

<canonical-block name="skills-sh-whole-set">

```bash
npx skills@latest add mattpocock/skills
```

选择你想要的技能，以及要安装到哪些编程 agent 上。**安装器会让你选择要装的技能：务必把 `setup-matt-pocock-skills` 选上。**

</canonical-block>

……单一技能形式用于单独提到某个技能的地方。注意 **`docs/` 页面不是这个块的消费者**：ai-hero 在正文之上渲染安装小组件，如果页面里再把命令写一遍就会重复。详见 [writing-docs.md](./writing-docs.md)。

<canonical-block name="skills-sh-one-skill">

```bash
npx skills@latest add mattpocock/skills --skill=<name>
```

```bash
npx skills@latest update <name>
```

</canonical-block>

三处都用 `skills@latest` 这一固定写法。`docs/` 下的页面以前各自带一份这些命令的副本；现在这些块已被直接删除，而不是改正，因为站点自己会渲染安装命令。

## 两种方式互斥

插件是一份托管的、只读的 bundle，你订阅它。skills.sh 写入归你所有、可以编辑的文件。两者都装会让你每份技能出现两次：务必说"二选一"。

## 不算安装说明的内容

`.claude-plugin/marketplace.json` 把本仓库做成自己的单插件市场（`/plugin marketplace add mattpocock/skills`，再 `/plugin install mattpocock-skills@mattpocock`）。官方市场已取代它。保留它只是作为直接安装本仓库时的回退方案（未发布的 commit，或 fork），并未向用户文档化。
