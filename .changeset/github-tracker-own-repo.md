---
"mattpocock-skills": patch
---

现在，`setup-matt-pocock-skills` 写入的 GitHub issue tracker 模板会要求 agent 只在用户自己的 repo 中创建 issue，绝不创建到 `mattpocock/skills`，并在首次运行 `gh issue create` 前检查目标仓库。在本仓库的 clone 或 fork 中工作的 agent 曾把 spec 和 ticket 发到了这里（#541 到 #550）。
