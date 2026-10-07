# 为避开 harness 内置命令而重命名技能

不会仅仅因为某个 harness 提供了同名内置命令或技能（`/prototype`、`/research`、`/code-review` 等）就重命名技能。要求重命名技能或添加别名以避免冲突的请求不在范围内。

## 为什么不在范围内

Harness 一直在添加内置功能，而且各自选择的名称也不相同。每当某个内置功能与现有名称冲突就重命名，等于要在 Claude Code、Copilot、Devin 等环境里追着变化跑，并一次次破坏所有用户的肌肉记忆和技能间交叉引用。

两个同名项目如何解析，是 harness 的行为，不是技能的问题。无论如何，技能文本本身都是正确的。

可通过命名空间调用。Claude Code 插件会在每个技能前加上插件名，因此总能明确调用我们的技能：

```
/mattpocock-skills:research
/mattpocock-skills:code-review
```

如果你通过 skills.sh 安装，文件归你所有：重命名你自己的目录和副本中的 `name:` 字段即可。

如果某个 harness 完全不提供命名空间调用或重命名后的调用方式，请向该 harness 报告。

## 以往请求

- #423：“/code-review 遮蔽了 Claude Code 自带的 review 技能”
- #483：“/code-review 与 Claude Code 内置功能名称冲突”
- #857：“将 research 技能改名以避开 Copilot 内置的 /research 命令”
- #1019：“简写 `/prototype` 与 Claude Code 新增的隐藏内置技能 `/prototype` 冲突”
- #1037：“技能名称与 Devin CLI 内置命令重叠”
