# 技能机制

[`writing-for-agents`](SKILL.md) 的技能专属分支：当文档是一个技能时的变化——前置元数据、调用方式选择以及路由技能。除此之外的所有写作规则，均适用 `SKILL.md` 中的通用参考。

## 技能特有

- 前置元数据必须是一个有效的 YAML frontmatter，包含 `name`、`description` 以及可选的 `disable-model-invocation`。
- `name` 是斜杠命令的名称。`writing-for-agents` 给出 `/writing-for-agents`。
- `description` 是当智能体路由到该技能时显示的单行描述。
- `disable-model-invocation: true` 意味着智能体永远不会自动调用该技能——它必须被用户或另一个技能明确调用。
- 调用方式（`/` 命令）是技能的入口点。除 `disable-model-invocation` 外，技能还可以定义 `policy` 下的 `allow_implicit_invocation` 行为。

## 路由

技能可以路由到其他技能。`writing-for-agents` 路由到：

- `SKILL-MECHANICS.md`（本文档）用于技能特有逻辑
- 主参考用于所有通用写作规则

## 离线参考

SKILL.md 定义了一个技能的主体。`SKILL-MECHANICS.md` 记录了当一个文档是一个技能时的变化。

## 差异

当文档是一个技能时，SKILL.md 中的通用规则有以下变化：

- 前置元数据现在是一个 YAML frontmatter，包含 `name`、`description` 以及可选的 `disable-model-invocation`。
- 调用方式由 `name` 定义，而不是由用户定义。
- 路由是定义的，而不是推断的。