---
"mattpocock-skills": minor
---

删除两个一行委派包装技能 `grill-me` 与 `grill-with-docs`（连同各自的 `agents/openai.yaml`、文档页 `docs/productivity/grill-me.md` 与 `docs/engineering/grill-with-docs.md`），`grilling` 成为全套技能唯一的访谈入口。

- 两个包装技能的正文都只有一行，各自转调 `grilling`（`grill-with-docs` 还转调 `domain-modeling`），去掉这一层不会损失任何行为：`grilling` 现在自己说明，在工作目录里就把敲定的术语写进 `CONTEXT.md`、把难以逆转的决策写成 ADR，出了工作目录则什么都不写。此前"要不要文件"的二分完全由用户选的入口承担，现在它由所在目录决定。
- `grilling` 同时成为主构建链的起点：`grilling → to-spec → to-tickets → implement → code-review`。
- 同步更新 `.claude-plugin/plugin.json`（23 项）、顶层 `README.md`、两个 bucket 的 `README.md`、`ask-matt` 路由，以及全部引用旧名的文档页与 `.agents/`、`.out-of-scope/` 文案。
- 这是**与本地上游 `mattpocock/skills` 的有意分叉**：上游仍保留这两个技能。`.github/workflows/sync-check.yml` 新增 `DROPPED` 白名单把它们排除在"缺失"检查之外，并新增 `revived` 检查，一旦它们随下次同步回到仓库就直接让 CI 失败，提醒再次删除。
