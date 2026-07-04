---
name: claude-handoff
description: 将当前对话移交给一个新的后台 agent，立即接手工作。
argument-hint: "下一个会话将用于什么？"
disable-model-invocation: true
---

编写当前对话的交接摘要，以便新的 agent 可以继续工作。不要在本地保存，而是启动一个后台 agent，以该摘要作为提示词注入：`claude --bg --name "<描述性名称>" "<交接摘要>"`。它将在当前工作目录启动并立即返回；用户通过 `claude agents` 管理。

务必传递 `-n`/`--name` 参数并附上描述性名称（如 `--name "修复登录 bug"`）——它用于设置任务列表、会话选择器和终端标题中显示的标签。

在摘要中包含一个"suggested skills"部分，推荐 agent 应调用的技能。

不要重复已经在其他制品（PRD、计划、ADR、issue、commit、diff）中捕获的内容，应通过路径或 URL 引用它们。

去除所有敏感信息，如 API 密钥、密码或个人身份信息——摘要将成为 agent 的提示词。

如果用户传入了参数，将其视为下一个会话将关注的内容描述，并据此定制摘要。
