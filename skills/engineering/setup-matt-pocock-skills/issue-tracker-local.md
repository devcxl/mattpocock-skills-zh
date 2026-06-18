# Issue tracker: Local Markdown（本地 Markdown）

本仓库的 issue 和 PRD 以 markdown 文件形式存放在 `.scratch/` 中。

## 约定

- 每个功能一个目录：`.scratch/<feature-slug>/`
- PRD 位于 `.scratch/<feature-slug>/PRD.md`
- 实现 issue 位于 `.scratch/<feature-slug>/issues/<NN>-<slug>.md`，从 `01` 开始编号
- 分类状态在每个 issue 文件顶部附近通过 `Status:` 行记录（角色字符串参见 `triage-labels.md`）
- 评论和对话历史追加到文件末尾，位于 `## Comments` 标题下

## 当技能要求"发布到 issue tracker"

在 `.scratch/<feature-slug>/` 下创建新文件（按需创建目录）。

## 当技能要求"获取相关 ticket"

读取引用路径下的文件。用户通常会直接传入路径或 issue 编号。
