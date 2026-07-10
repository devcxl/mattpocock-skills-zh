# Issue tracker: Local Markdown（本地 Markdown）

本仓库的 issue 和 spec 以 markdown 文件形式存放在 `.scratch/` 中。

## 约定

- 每个功能一个目录：`.scratch/<feature-slug>/`
- Spec 位于 `.scratch/<feature-slug>/spec.md`
- 实现 ticket 位于 `.scratch/<feature-slug>/issues/<NN>-<slug>.md`，从 `01` 开始编号
- 分类状态在每个 ticket 文件顶部附近通过 `Status:` 行记录（角色字符串参见 `triage-labels.md`）
- 评论和对话历史追加到文件末尾，位于 `## Comments` 标题下

## 当技能要求"发布到 issue tracker"

在 `.scratch/<feature-slug>/` 下创建新文件（按需创建目录）。

## 当技能要求"获取相关 ticket"

读取引用路径下的文件。用户通常会直接传入路径或 issue 编号。

## Wayfinding 操作

由 `/wayfinder` 使用。**地图**是一个文件，每个 ticket 对应一个**子**文件。

- **地图**：`.scratch/<effort>/map.md`——Notes / Decisions-so-far / Fog 正文。
- **子 ticket**：`.scratch/<effort>/issues/NN-<slug>.md`，从 `01` 开始编号，问题在正文中。`Type:` 行记录 ticket 类型（`research`/`prototype`/`grilling`/`task`）；`Status:` 行记录 `claimed`/`resolved`。
- **阻塞关系**：靠近文件顶部的 `Blocked by: NN, NN` 行。当列表中所有文件都处于 `resolved` 状态时 ticket 解除阻塞。
- **前沿**：扫描 `.scratch/<effort>/issues/` 寻找打开、未阻塞且未认领的文件；按编号第一个胜出。
- **认领**：在任何工作开始前，设置 `Status: claimed` 并保存。
- **解决**：在 `## Answer` 标题下追加答案，设置 `Status: resolved`，然后在 `map.md` 的地图 Decisions-so-far 后面追加上下文指针（摘要 + 链接）。
