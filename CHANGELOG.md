# mattpocock-skills

## 1.1.0

### Minor Changes

- Add Codex metadata alongside each skill's Claude Code frontmatter so the set works in both harnesses without generated copies.

- Add an `agents/openai.yaml` beside every `SKILL.md` with Codex UI metadata (`interface.display_name`, `interface.short_description`).
- Mark every user-invoked skill with `policy.allow_implicit_invocation: false`, the Codex analog of `disable-model-invocation: true`, so Codex excludes it from implicit invocation while explicit `$skill` invocation still works.
- Document the dual-harness invocation model in `.agents/invocation.md`, `CLAUDE.md`, and the promoted-bucket READMEs.
- Add `AGENTS.md` as a symlink to `CLAUDE.md` so Codex reads the same repo instructions.

- Ship the skill set as a native **Claude Code plugin**. The repo is now its own single-plugin marketplace, so you can subscribe to the promoted skills as a managed, read-only bundle instead of copying editable files:

```
/plugin marketplace add mattpocock/skills
/plugin install mattpocock-skills@mattpocock
```

`.claude-plugin/plugin.json` gains full marketplace metadata (version, description, author, license, keywords) and a sibling `.claude-plugin/marketplace.json` lists the plugin. `skills.sh` remains the universal installer (and the path for Codex and other harnesses today); a native Codex plugin is deferred — see `.agents/adr/0002-ship-as-a-claude-code-plugin.md` for why.

- Wayfinder now burns research tickets down with subagents instead of leaving them parked for a separately-launched session.

Research stays a real ticket type — it's a genuine shared blocker that downstream decisions hang on, and that dependency is exactly what the frontier's blocking edges exist to render. What changes is how it's resolved: because research is AFK, charting doesn't stop and read it. After creating the tickets, the charting session fires a `/research` subagent for each research ticket to burn it down in parallel, capturing the findings on a throwaway `research/<name>` branch with a context pointer. Research tickets are the one exception to _one ticket per session_.

- Add a YAGNI scoping filter to the **`improve-codebase-architecture`** skill's Explore step. Instead of scanning the whole repo evenly, it now scopes to where change is actually landing: if you name a direction it takes it, otherwise it reads the last ~20 commit messages to bias exploration toward actively-developed paths. A deepening opportunity in code nobody touches is a refactor you'll never cash in — the leverage only pays off where you keep editing — so the report stops tidying dormant corners of the repo.

### Patch Changes

- Make `/ask-matt` clued-up about `/wayfinder` — the heaviest, most cognitively demanding flow.

The router now sharpens the two routing mistakes people most often make with wayfinder:

- **Over-reaching for it.** It's slower and denser than a single grill, so it's flagged as the heaviest flow and reserved for the idea that genuinely won't fit one session — a well-scoped feature belongs on `/grill-with-docs`, not here.
- **Losing the way at the handoff.** When the map clears, wayfinder hands off, it doesn't build: merge onto the main flow at `/to-spec` (which collapses the map's linked decisions into a buildable plan) rather than looping the map straight into `/implement`. Straight-to-`/implement` is only for efforts that turned out genuinely small.

- Reword **`grilling`** for general use. Its description and body no longer scope the interview to a software plan: "this plan" → "this", "enact the plan" → "act on it", and "exploring the codebase" → "exploring the environment". The technique is unchanged; it now reads as a stress-test of any plan, decision, or idea.

- Name the `/wayfinder` unit a **decision ticket**.

People kept reading a wayfinder ticket as an ordinary _implementation_ ticket — a slice of a build to execute — when wayfinder uses them as **decision tickets**: questions whose resolution is a decision. The skill description and its opening line now introduce "decision ticket" (and say what makes it one), and the `ask-matt` / engineering README wayfinder blurbs and the docs page match — while "ticket" stays the everyday word once the term is established. `CONTEXT.md` records **Decision ticket** as a domain term so the "avoid: ticket" guidance no longer contradicts wayfinder's deliberate use of the word.

## 1.0.1

### 补丁更新

- [`d20ee26`](https://github.com/mattpocock/skills/commit/d20ee2684e2a9442698ac3c1e0f2c5b68c4cf296) 感谢 [@mattpocock](https://github.com/mattpocock)! — **`teach`** 技能改为复用优先。课程现在由可复用的**组件**构建，存放在 `./assets/` 下——样式表、测验组件、模拟器、图表辅助工具。复用是默认原则：agent 在编写课程前先读取 `./assets/`，基于已有内容构建，将任何新的可复用内容提取为组件而非内联。

## 1.0.0

### 主要变更

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) 感谢 [@mattpocock](https://github.com/mattpocock)! — 新增 **`ask-matt`** 技能——一个用户调用的路由器，根据你的情况指向正确的技能或流程。

  **破坏性变更：** `ask-matt` 会路由到本仓库中的其他用户调用技能，因此它需要这些技能已被安装。

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) 感谢 [@mattpocock](https://github.com/mattpocock)! — 新增共享设计技能，并将现有技能重新接入。

  - 新增 **`codebase-design`** 技能——deep module 词汇（module、interface、depth、seam、adapter）以及将大量行为放在小接口背后的原则。之前存在于 `improve-codebase-architecture/LANGUAGE.md` 的语言现在迁移至此，泛化为跨技能复用。
  - 新增 **`domain-modeling`** 技能——主动构建和打磨项目的领域模型，压力测试术语与词汇表的一致性，保持 `CONTEXT.md` 和 ADR 为最新。
  - `improve-codebase-architecture` 现在从 `/codebase-design` 获取架构词汇，从 `/domain-modeling` 获取领域模型。
  - `tdd` 现在依赖 `/codebase-design` 获取接口设计指导——其内联的 `deep-modules.md` / `interface-design.md` 笔记已移除，改为使用共享技能。
  - `grill-with-docs` 现在通过 `/domain-modeling` 内联构建领域模型。

  **破坏性变更：** 这些技能现在依赖新的 `codebase-design` / `domain-modeling` 技能，因此你也必须安装它们。

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) 感谢 [@mattpocock](https://github.com/mattpocock)! — 移除 **`caveman`** 和 **`zoom-out`** 技能。

  - `caveman` 是另一个我正在测试的技能的重复，本不应公开。
  - `zoom-out` 在实际使用中无人问津，因此已从仓库中移除。

  **破坏性变更：** 两个技能已被移除。

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) 感谢 [@mattpocock](https://github.com/mattpocock)! — 将 **`diagnose`** 技能重命名为 **`diagnosing-bugs`**。

  **破坏性变更：** 现在请以 `/diagnosing-bugs` 调用——旧的 `/diagnose` 名称已不存在。

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) 感谢 [@mattpocock](https://github.com/mattpocock)! — 用 **`writing-great-skills`** 替换 **`write-a-skill`**。

  - 移除了 `write-a-skill`。
  - 新增了 `writing-great-skills`（及其 `GLOSSARY.md`）——一份编写和编辑技能的参考资料：使技能可预测的词汇和原则，将无操作压缩到句子级别。
  - 将 `grilling` 暴露为模型调用的技能——`grill-me` 和 `grill-with-docs` 背后可复用的面试循环。

  **破坏性变更：** `write-a-skill` 已被移除；请使用 `writing-great-skills` 替代。

### 次要变更

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) 感谢 [@mattpocock](https://github.com/mattpocock)! — 新增 **`resolving-merge-conflicts`** 技能——一个用于解决进行中的 git merge 或 rebase 冲突的循环。独立技能，不依赖其他技能。

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) 感谢 [@mattpocock](https://github.com/mattpocock)! — 在文档中将技能分类从 **Commands / Skills** 重命名为 **User-invoked / Model-invoked**，并新增 `docs/invocation.md` 定义这一划分：用户调用的技能只有输入其名称才能触发，用于编排；模型调用的技能在任务匹配时也可自动触发。用户调用的技能可以调用模型调用的技能，但绝不能调用另一个用户调用的技能。

### 补丁更新

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) 感谢 [@mattpocock](https://github.com/mattpocock)! — 收紧 **`review`** 技能：快速失败引用检查、单一来源规则、无操作裁剪。
