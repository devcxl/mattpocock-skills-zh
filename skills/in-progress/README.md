# 开发中

Beta。这些技能是公开的，有目的——试用它们，告诉我哪里坏了。在毕业到稳定版之前，它们不会包含在插件和顶层 README 中，没有文档页面，并且可能在没有警告的情况下更改或消失。

插件不会提供这些。直接安装一个：

```bash
npx skills@latest add mattpocock/skills --skill=<name>
```

- **[loop-me](./loop-me/SKILL.md)** — 通过多次会话将自己盘问出可实施的工作流规格说明，使用当前目录作为有状态工作空间。用户调用。
- **[writing-beats](./writing-beats/SKILL.md)** — 将文章塑造成一次节拍之旅，选择你自己的冒险风格。选择一个起始节拍，只写那个节拍，然后转向下一个，直到文章自然结束。
- **[writing-fragments](./writing-fragments/SKILL.md)** — 盘问会话，挖掘你的碎片——写作的异质金块——并将它们追加到单个文档中，作为未来文章的原始素材。
- **[writing-shape](./writing-shape/SKILL.md)** — 获取一份原始素材的 markdown 文件，逐段塑造成一篇文章，每一步讨论格式选择。
- **[claude-handoff](./claude-handoff/SKILL.md)** — 将当前对话交接给一个全新的后台 agent，通过 `claude --bg` 传入交接摘要，立即开始工作。用户调用。
- **[setup-ts-deep-modules](./setup-ts-deep-modules/SKILL.md)** — 将 dependency-cruiser 接入 TypeScript 仓库，使每个包成为一个深层模块——实现隐藏在子文件夹中，只能通过入口点文件访问，测试通过这些入口点对其进行测试。用户调用。