---
"mattpocock-skills": patch
---

`software-factory` 现在可以通过 `npx skills add` 安装：它的描述字段加了引号，因此严格的 YAML 解析器不再会将其中的冒号误读为嵌套映射，进而跳过该技能。
