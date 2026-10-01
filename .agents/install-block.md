# 中文版安装说明 canonical blocks

`README.md`、`.changeset/*` 及其他直接提供安装命令的文档必须使用本文件对应的 canonical block，保持命令和说明逐字一致。先在此修改，再同步到消费者。

本仓库由 `devcxl` 维护，是 Matt Pocock 的 `mattpocock/skills` 项目的第三方简体中文汉化版。以下命令安装本仓库的中文版，不是上游英文原版。若文档提及上游原版，必须明确标注并另行说明，不能把上游安装命令作为中文版的默认安装方式。

## Claude Code：插件

本仓库通过自带的 Claude Code marketplace 提供插件。marketplace 名称为 `mattpocock`，插件名称为 `mattpocock-skills`。先添加本仓库的 marketplace，再安装插件；不要使用仅针对 Claude Code 官方市场的同名安装命令。

<canonical-block name="claude-code-zh">

```bash
claude plugin marketplace add devcxl/mattpocock-skills-zh
claude plugin install mattpocock-skills@mattpocock
```

或者在 Claude Code 会话中：

```
/plugin marketplace add devcxl/mattpocock-skills-zh
/plugin install mattpocock-skills@mattpocock
```

以上命令从本仓库的 marketplace 安装中文版插件，不是从 Claude Code 官方市场安装英文版。

</canonical-block>

## Codex 以及其他 agent：skills.sh

[skills.sh](https://skills.sh/devcxl/mattpocock-skills-zh) 会把可编辑的中文版技能文件复制到项目中。`README.md` 使用整套安装形式：

<canonical-block name="skills-sh-zh-whole-set">

```bash
npx skills@latest add devcxl/mattpocock-skills-zh
```

选择你想要的技能，以及要安装到哪些编程 agent 上。**安装器会让你选择要装的技能：务必把 `setup-matt-pocock-skills` 选上。**

</canonical-block>

单一技能形式用于单独提到某个技能的地方。注意 **`docs/` 页面不是这个块的消费者**：ai-hero 会在正文之上渲染安装小组件，如果页面里再把命令写一遍就会重复。详见 [writing-docs.md](./writing-docs.md)。

<canonical-block name="skills-sh-zh-one-skill">

```bash
npx skills@latest add devcxl/mattpocock-skills-zh --skill=<name>
```

```bash
npx skills@latest update <name>
```

</canonical-block>

## 开发中的技能：skills.sh internal skills

`skills/in-progress/README.md` 中的技能不在公开技能列表中。安装这类技能时使用 `INSTALL_INTERNAL_SKILLS=1`，并从本仓库安装中文版：

<canonical-block name="skills-sh-zh-in-progress">

```bash
INSTALL_INTERNAL_SKILLS=1 npx skills@latest add devcxl/mattpocock-skills-zh --skill=<name>
```

</canonical-block>

安装命令统一使用 `skills@latest`。`docs/` 下的页面不复制这些命令，因为站点会自行渲染安装组件。

## 两种方式互斥

Claude Code 插件是受管理的只读 bundle，通过本仓库的 marketplace 安装。skills.sh 会写入可编辑、归用户所有的文件。两者都装会让每份技能出现两次：务必说明“二选一”。

## 本仓库的 marketplace

`.claude-plugin/marketplace.json` 定义本仓库自己的单插件 marketplace，名称为 `mattpocock`，插件名为 `mattpocock-skills`。它不是 Claude Code 官方市场条目；中文版安装必须先添加 `devcxl/mattpocock-skills-zh`。
