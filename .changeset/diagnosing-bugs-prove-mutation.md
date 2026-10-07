---
"mattpocock-skills": patch
---

`diagnosing-bugs` 的 Phase 5 现在会让 agent 将强制制造的变更 `diff` 与干净副本比较，确认变更确实生效后才相信红灯测试，避免实际上什么都没改的编辑被误当成失败测试（#955）。
