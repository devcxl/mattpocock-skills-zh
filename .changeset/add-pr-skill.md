---
"mattpocock-skills": patch
---

Add the `pr` skill (in-progress bucket, model-invoked). It's a reference for the shape a pull request body should take, not a workflow: the template comes first, then a short section per part of it. The summary comes from the primary source (the issue or spec), never inferred from the diff; the body states size and a one-way/two-way door call up front; "the shape of the change" reproduces `show-me` almost verbatim (credited in the skill's `CREDITS.md`), aimed at a diff instead of a conversation; evidence is a before/after pair (visual first, a failing-then-passing test run where no visual exists); and what was deliberately left out gets its own section. Relates to #521, #938, #509, and #915.
