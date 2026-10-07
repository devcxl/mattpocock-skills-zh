---
"mattpocock-skills": patch
---

`code-review` 现在会在仓库中搜索规范文件，并始终将 `CODING_STANDARDS.md` / `CONTRIBUTING.md` 交给 Standards 子代理（#1065）；两个子代理都在前台运行，并使用其返回的报告（#1073）；同时通过提供的 tracker 文档解析 issue 跟踪器，而不再使用硬编码路径（#937）。
