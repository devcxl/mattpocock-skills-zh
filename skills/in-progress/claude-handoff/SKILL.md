---
name: claude-handoff
description: 把当前对话交接给一个全新的后台 agent，让它立刻接手工作。
argument-hint: "下一个会话将用来做什么？"
disable-model-invocation: true
---

为当前对话撰写一份交接摘要，让一个全新的 agent 能够继续工作。不要把摘要保存到本地，而是启动一个后台 agent，把这份摘要作为它的提示词注入：`claude --bg --name "<描述性名称>" "<交接摘要>"`。它会在当前工作目录启动并立刻返回；用户通过 `claude agents` 来管理它。

务必传 `-n`/`--name` 并配以描述性名称（例如 `--name "修复登录 bug"`）：它会被设置为任务列表、会话选择器以及终端标题中所显示的标签。

在摘要里加一个 "suggested skills" 部分，建议下一个 agent 调用哪些技能。

不要重复已经被记录在其他产物（规格、计划、ADR、issue、commit、diff）中的内容。引用时用路径或 URL。

抹去任何敏感信息，例如 API 密钥、密码或可识别个人身份的信息：摘要会成为 agent 的提示词。

如果用户传入了参数，把它们当作对下一个会话关注点的描述，并据此裁剪摘要。
