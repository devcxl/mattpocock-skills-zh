# 防止子 agent 递归调用技能

技能不会添加防护来阻止子 agent 递归调用技能或派生嵌套 agent（例如 `/code-review` 子 agent 再次调用 `/code-review`，或 `/research` agent 又派生另一个 agent）。要求添加叶子 agent 指令、嵌套深度限制或“不要调用此技能”等文字的请求不在范围内。

## 为什么不在范围内

应由 harness 负责阻止无限子 agent 循环，而不是由技能负责。Harness 决定子 agent 可以使用哪些工具和技能，以及嵌套深度；在那里设置限制就能同时保护所有技能。写在某个技能中的防护只覆盖该技能，每次运行都会消耗 token，而且仍然依赖模型选择遵守。

如果子 agent 无限递归或无限扩散，请向 harness 报告。

## 以往请求

- #530：“research 技能：后台派生的 agent 会递归地再派生一个 agent（无限嵌套）”
- #573：“code-review 子 agent 递归调用 /code-review 并不断扩散”（PR #1186，“code-review：让 Standards 和 Spec 子 agent 成为叶子审查者”，已关闭）
