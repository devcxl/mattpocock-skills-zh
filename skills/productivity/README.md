# 生产力类（Productivity）

通用工作流工具，不限于编码。

## 用户调用（User-invoked）

只有你输入它们时才可达（Claude Code：`disable-model-invocation: true`；Codex：`agents/openai.yaml` 中的 `policy.allow_implicit_invocation: false`）。

- **[grill-me](./grill-me/SKILL.md)** ： 被无休止地盘问你的计划或设计，直到设计树的每个分支都被解决。
- **[handoff](./handoff/SKILL.md)** ： 把当前对话压缩成一份交接文档，让另一个 agent 能继续这项工作。
- **[teach](./teach/SKILL.md)** ： 跨多个会话教用户一项新技能或概念，把当前目录当作有状态的教学工作空间。
- **[to-questionnaire](./to-questionnaire/SKILL.md)** ： 把你一个人答不出的决定变成一份 Markdown 问卷，交给唯一能答的人：异步填写，或开会时一起填。
- **[wait-what](./wait-what/SKILL.md)** ： 一条消息没被接住的瞬间就触发它。agent 会带着你缺失的上下文、用你 `CONTEXT.md` 的词汇，以大白话重新讲一遍。

## 模型调用（Model-invoked）

模型或用户均可调用（丰富的触发措辞，让模型能主动拿起来用）。

- **[grilling](./grilling/SKILL.md)** ： 无休止地盘问用户关于计划、决策或想法的问题，直到设计树的每个分支都被解决。
- **[writing-for-agents](./writing-for-agents/SKILL.md)** ： 为 agent 编写文档：skills、AGENTS.md/CLAUDE.md，以及任何 agent 通过指针触达的文档。
