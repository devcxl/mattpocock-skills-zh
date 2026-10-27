# 贡献指南

每个 issue 都会按 [`SCOPE.md`](./SCOPE.md) 中的标准评估。请先阅读。

## 各类请求的去处

| 你要反馈 | 请前往 |
| --- | --- |
| 技能中的 bug | [缺陷 issue](https://github.com/mattpocock/skills/issues/new?template=bug.yml) |
| 对现有技能的修改 | [想法或反馈 issue](https://github.com/mattpocock/skills/issues/new?template=idea.yml) |
| 有问题，或想问“该怎么做……？” | [Discussions：问答](https://github.com/mattpocock/skills/discussions/categories/q-a) |
| 新增技能的想法，或想捐赠一个技能 | [Discussions：想法](https://github.com/mattpocock/skills/discussions/categories/ideas) |
| 希望支持其他 harness 或 issue tracker | 阅读 [`.out-of-scope/`](./.out-of-scope) 后，前往 [Discussions：想法](https://github.com/mattpocock/skills/discussions/categories/ideas) |

Pull request 只对 collaborators 开放，因此请在 issue 中描述修复，而不是提交 pull request。

## 使用 AI 撰写的 issue

欢迎借助 agent，但 issue 是由你发布的，因此也由你负责：

- **一个 issue 只说一个问题。** 一次会话发现多个问题，就分别开多个 issue，否则一个也别开。
- **简短。** 如果一屏放不下，就删减。
- **先写复现步骤。** 展示问题的步骤要放在任何分析之前。
- **不要粘贴 spec。** 不要贴完整提案、计划或改写后的 `SKILL.md`。描述问题即可，修复方案由我们设计。
- **不要把自己项目的 issue 发到这里。** 如果 agent 在这里为你的项目提交 spec 或 ticket，那就发错仓库了。请在自己的项目中运行 `/setup-matt-pocock-skills`。
