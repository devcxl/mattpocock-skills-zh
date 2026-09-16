---
"mattpocock-skills": patch
---

retro: classify coding-standards findings as mechanical or judgement calls before writing them. A mechanical violation (a fixed syntactic pattern, a banned API, an import shape, a file-location rule) now gets a deterministic check instead (a linter rule, a pre-commit hook, or a CI job), reserving `CODING_STANDARDS.md` for genuine judgement calls. Automated checks also now flags a repo with no guardrail at all (no pre-commit hook, no CI lint/typecheck/test job) as a finding in its own right.
