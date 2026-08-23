---
name: resolving-merge-conflicts
description: "当你需要解决正在进行的 git merge/rebase 冲突时使用。"
---

1. **查看当前状态**——merge/rebase 处于什么状态。检查 git 历史与冲突文件。

2. **找到每一处冲突的主要来源**。深入理解每次变更背后的原因和原始意图。阅读 commit 信息、查看 PR、查看原始 issue/ticket。

3. **逐个解决冲突块（hunk）**。尽可能同时保留双方的意图。若不兼容，选择与 merge 公开目标一致的一方，并记录权衡。**不要**发明新行为。始终要解决，永远不要 `--abort`。

4. 找出项目的**自动化检查**并运行——通常是 typecheck，然后是 tests，最后是 format。修复 merge 破坏的任何东西。

5. **完成 merge/rebase**。把所有改动 stage 并 commit。若是 rebase，就继续推进，直到所有 commit 都 rebase 完。
