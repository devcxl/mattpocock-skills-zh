---
"mattpocock-skills": patch
---

`chief-of-staff` 现在会在启动自己的 wiki 之前先查找共享 wiki。它还会在大约五分之一的子代理会话中运行 `retro`，具体是那些一开始就出了问题的会话，并自行根据发现采取行动；对于较大的工作块，它还会运行 `to-spec`、`to-tickets` 和 `implement-spec`，通过相对路径读取每项技能，以便这些技能仍由用户主动调用。
