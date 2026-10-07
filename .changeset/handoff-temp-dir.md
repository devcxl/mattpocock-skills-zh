---
"mattpocock-skills": patch
---

`handoff` 现在会说明操作系统临时目录的位置（`$TMPDIR`，否则为 `/tmp`；Windows 上为 `%TEMP%`），避免 agent 自行猜测（#272）。
