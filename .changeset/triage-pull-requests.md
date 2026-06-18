---
"mattpocock-skills": patch
---

Extend the **`triage`** skill to triage external pull requests, treating a PR as an issue with attached code that runs through the same roles and state machine. PRs flow inline alongside issues (gated by a per-repo setup toggle), discovery surfaces only external PRs, the bug-only "reproduce" step is generalized into a single "verify the claim" step, and a redundancy check resolves already-implemented requests to `wontfix` without polluting the out-of-scope knowledge base. `setup-matt-pocock-skills` gains the PRs-as-a-request-surface toggle for GitHub/GitLab.
