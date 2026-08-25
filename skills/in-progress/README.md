# 开发中（In Progress）

Beta 版。这些技能公开是有意为之：试用并告诉我哪里坏了。在毕业到稳定 bucket 之前，它们既不包含在插件中，也不会出现在顶层 README；它们没有文档页面，并且可能随时变更或消失。

插件不会给你这些。直接单独安装：

```bash
npx skills@latest add mattpocock/skills --skill=<name>
```

- **[loop-me](./loop-me/SKILL.md)** ： 通过多个会话将你自己盘问出可实施的工作流规格，使用当前目录作为有状态工作区。用户调用。
- **[writing-beats](./writing-beats/SKILL.md)** ： 把一篇文章塑造成节拍的旅程，"自己挑路"的风格。挑一个起始节拍，只写那个节拍，然后转到下一个，直到文章自然结束。
- **[writing-fragments](./writing-fragments/SKILL.md)** ： 通过盘问会话挖掘你的写作碎片：异质的写作片段：并把它们追加到一份文档，作为未来文章的原始素材。
- **[writing-shape](./writing-shape/SKILL.md)** ： 把一份原始素材的 markdown 文件按段落塑造成一篇文章，每一步讨论格式选择。
- **[claude-handoff](./claude-handoff/SKILL.md)** ： 把当前对话交接给一个全新的后台 agent，让它立刻接手工作，注入交接摘要的方式是通过 `claude --bg`。用户调用。
- **[setup-ts-deep-modules](./setup-ts-deep-modules/SKILL.md)** ： 把 dependency-cruiser 接入 TypeScript 仓库，使每个 package 成为一个深度模块：实现隐藏在子文件夹中，只能通过入口点文件访问，测试通过这些入口点对实现进行验证。用户调用。
- **[implement-spec](./implement-spec/SKILL.md)** ： 在单个分支上把整份 spec 落地为实现。把 ticket 当作任务图而非列表处理，让实施者子 agent 在准备好的前沿上并行运行以最大化并发，最终合并为单个 PR。用户调用。
