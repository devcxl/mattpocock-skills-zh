---
"mattpocock-skills": patch
---

Stop skills from trying to reach user-invoked skills through the Skill tool — fix cross-skill references that violated the "no other skill can call it" invariant in `.agents/invocation.md`, in `to-spec`, `wayfinder`, `to-tickets`, `triage`, `code-review`, and `diagnosing-bugs`.

- `to-spec`, `wayfinder`, `to-tickets`, `triage`, and `code-review` each carried a precondition ("...run `/setup-matt-pocock-skills` if not") that PR #878 rewrote into a literal `Call the Skill tool with "setup-matt-pocock-skills"` instruction. `setup-matt-pocock-skills` is user-invoked, so none of these skills — user-invoked or model-invoked — can call it. Reworded all five as instructions for the agent to tell the human to run it instead.
- `diagnosing-bugs`'s Phase 6 post-mortem hand off to `improve-codebase-architecture` (also user-invoked) the same way, from an autonomous, often-unattended bug-fixing flow with no human in the loop to catch the failed call. Removed the hand-off outright rather than softening it — it rarely fired in practice. Phase 6 is now "Cleanup" only; the mechanical checklist is untouched.
- Added a carve-out paragraph to `.agents/invocation.md`'s "Dependencies between them" section: the `Call the Skill tool with "name"` convention only applies when the named skill is model-invoked. This is the section PR #878 introduced without reconciling it against the user-invoked/model-invoked invariant stated eight lines above it — the gap is most of why this bug reached six call sites instead of one.

Fixes #453.
