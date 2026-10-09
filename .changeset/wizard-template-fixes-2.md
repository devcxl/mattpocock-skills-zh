---
"mattpocock-skills": patch
---

`wizard` 模板修复：`_existing` 会解析双引号包裹的 `.env` 值，因此按 Enter 保留当前值时不再把引号一并写入（#1220）；各阶段现由 `run_wizard` 执行，因此运行过程中编辑脚本不会导致它中断（#1142）；`_clear` 在 `tput clear` 失败时改用 ANSI 转义序列（#1081）；`write_env` 也会设置 shell 变量（#1041）；移除了未使用的 `RED`（#1003）。
