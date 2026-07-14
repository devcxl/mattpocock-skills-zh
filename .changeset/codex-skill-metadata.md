---
"mattpocock-skills": minor
---

Add Codex metadata alongside each skill's Claude Code frontmatter so the set works in both harnesses without generated copies.

- Add an `agents/openai.yaml` beside every `SKILL.md` with Codex UI metadata (`interface.display_name`, `interface.short_description`).
- Mark every user-invoked skill with `policy.allow_implicit_invocation: false`, the Codex analog of `disable-model-invocation: true`, so Codex excludes it from implicit invocation while explicit `$skill` invocation still works.
- Document the dual-harness invocation model in `.agents/invocation.md`, `CLAUDE.md`, and the promoted-bucket READMEs.
- Add `AGENTS.md` as a symlink to `CLAUDE.md` so Codex reads the same repo instructions.
