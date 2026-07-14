---
"mattpocock-skills": minor
---

Wayfinder now burns research tickets down with subagents instead of leaving them parked for a separately-launched session.

Research stays a real ticket type — it's a genuine shared blocker that downstream decisions hang on, and that dependency is exactly what the frontier's blocking edges exist to render. What changes is how it's resolved: because research is AFK, charting doesn't stop and read it. After creating the tickets, the charting session fires a `/research` subagent for each research ticket to burn it down in parallel, capturing the findings on a throwaway `research/<name>` branch with a context pointer. Research tickets are the one exception to *one ticket per session*.
