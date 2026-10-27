---
"mattpocock-skills": patch
---

现在，`setup-matt-pocock-skills` 会先配置 Git remote，再写入 GitHub/GitLab 跟踪器配置，确保其指向可访问的仓库（#1201）；发现旧版 `CONTEXT.md` / `CONTEXT-MAP.md` 时，也会询问是否用 `git mv` 将它们改为对应的 `GLOSSARY` 名称（#1176）。GitHub 模板会在关闭 issue 前先发表评论（#873），读取 PR 时会同时读取正文和评论（#1138），将 **阻塞** 移到约定部分并采用原生 `gh` 标志（#855），还会列出统计未关闭阻塞项的命令（#1118）。GitLab 模板改用 `-O json` 列出 MR，并列出前沿查询的命令（#1143）。重新运行 `/setup-matt-pocock-skills` 以刷新 `docs/agents/`。
