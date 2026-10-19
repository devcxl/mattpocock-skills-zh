---
"mattpocock-skills": patch
---

`chief-of-staff` 现在会将记忆保存在一个 LLM wiki 中（包含一个 `index.md` 和每个主题对应的一个页面，并通过 ingest、query 和 lint 进行维护），并将其作为历史记录来撰写：每条说法都标注日期，每条涉及代码的说法都引用其成立时对应的 commit。
