---
"mattpocock-skills": minor
---

Ship the skill set as a native **Claude Code plugin**. The repo is now its own single-plugin marketplace, so you can subscribe to the promoted skills as a managed, read-only bundle instead of copying editable files:

```
/plugin marketplace add mattpocock/skills
/plugin install mattpocock-skills@mattpocock
```

`.claude-plugin/plugin.json` gains full marketplace metadata (version, description, author, license, keywords) and a sibling `.claude-plugin/marketplace.json` lists the plugin. `skills.sh` remains the universal installer (and the path for Codex and other harnesses today); a native Codex plugin is deferred — see `.agents/adr/0002-ship-as-a-claude-code-plugin.md` for why.
