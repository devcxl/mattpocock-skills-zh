---
"mattpocock-skills": patch
---

`wizard` 模板修复：`ask` 使用 Readline，让方向键可以移动光标（#741）；`write_env` 为值加单引号，让空格、`#`、`$` 和引号经 `source` 与 dotenv 读取后仍能保留（#770）；没有浏览器启动器时，`open_url` 会打印手动打开警告（#774）；`write_env` 会通过符号链接写入 `.env`，并保留已有文件的权限模式（#811）；`ask` 和 `ask_secret` 在遇到 EOF 时会报错退出，不再无限循环（#852）。
