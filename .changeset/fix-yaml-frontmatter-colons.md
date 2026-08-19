---
"mattpocock-skills": patch
---

Quote the `description` front matter in `to-spec`, `code-review`, `setup-matt-pocock-skills`, `writing-fragments`, `writing-shape`, and `wait-what`. An unquoted colon-space left over from the em-dash sweep in #905 made each block invalid YAML, so `skills.sh` skipped all six during discovery and they couldn't be listed or installed via `npx skills`.
