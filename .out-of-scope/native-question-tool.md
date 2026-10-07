# 通过 harness 原生提问工具进行 grilling

Grilling 会话（`/grilling`、`/grill-me`、`/grill-with-docs`，以及其他技能内部的 grilling）都以普通聊天文本提出问题。要求将问题转交给 harness 内置的提问界面（Claude Code 的 `AskUserQuestion`、宿主环境的“question tool”、结构化或批量问卷模式）不在范围内。

## 为什么不在范围内

这些技能是与 harness 无关的文本。它们运行于 Claude Code、Codex、Copilot、Cursor 以及 skills.sh 能安装到的其他环境，而各个 harness 的提问工具各不相同，也可能根本没有提问工具。在每项 grilling 技能中加入某个 harness 的工具名，要么意味着每种技能都得维护 harness 专属分支，要么会让技能只在一个环境中正常工作。

提问界面也会改变 grilling 本身。结构化选项界面会促使模型提出预先准备好选项的多选题，这与 grilling 的目的正好相反：逐个沿决策树分支提出开放问题，让你用自己的话回答。我试过 `AskUserQuestion` 界面，不希望这些技能使用它。

如果你更喜欢使用 harness 的提问工具，可以在自己的 `CLAUDE.md` / `AGENTS.md` 中说明（“grilling 时通过 AskUserQuestion 提问”）。这是每位用户一行的偏好，无需让共享技能了解它。

## 以往请求

- #19：“grill-me：并非总是使用 question tool”
- #643：“提案：在 grilling 会话中使用 AskQuestion 收集结构化输入”
- #840：“grilling 会话使用宿主的 question tool”
- #1107：“开箱使用时，Grilling 不会使用 Agent 的原生 QA 工具”
- #1152：“提案：实验性 HTML 问卷模式，用于批量 grilling”
