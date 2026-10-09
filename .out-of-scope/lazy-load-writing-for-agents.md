# 在评判面向智能体写作的技能中延迟加载 `writing-for-agents`

`retro` 每次运行都会加载 `writing-for-agents`，而非仅在写入之前加载。要求等到该技能要编辑技能、`AGENTS.md`/`CLAUDE.md` 或文档时才加载，不在处理范围内。

## 为什么不在处理范围内

`writing-for-agents` 不只是风格指南。它定义了什么是无操作指令，以及优秀技能应具备什么特征；`retro` 会用这些定义评估它读取的引导文件，而且在开始写入之前就会评估。即使 `retro` 只读取并汇报，也仍然需要加载它。若改为延迟加载，No-ops 和 Skills 候选项就会失去评判标准。

## 先前请求

- #1238：「retro：仅在写入前加载 writing-for-agents」（已关闭）
