# HTML 报告格式

架构审查以单个自包含 HTML 文件的形式渲染到 OS 临时目录中。Tailwind 和 Mermaid 均来自 CDN。Mermaid 可靠地处理图形状图表；手工构建的 div 和内联 SVG 处理更具编辑性的视觉元素（mass 图、截面图）。两者混合使用——不要只依赖 Mermaid，否则会显得千篇一律。

## 脚手架

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>架构审查 — {{仓库名称}}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script type="module">
      import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";
      mermaid.initialize({ startOnLoad: true, theme: "neutral", securityLevel: "loose" });
    </script>
    <style>
      /* Tailwind 无法完美覆盖的小型自定义层：
         虚线 seam 线、手绘风格的箭头等 */
      .seam { stroke-dasharray: 4 4; }
      .leak { stroke: #dc2626; }
      .deep { background: linear-gradient(135deg, #0f172a, #1e293b); }
    </style>
  </head>
  <body class="bg-stone-50 text-slate-900 font-sans">
    <main class="max-w-5xl mx-auto px-6 py-12 space-y-12">
      <header>...</header>
      <section id="candidates" class="space-y-10">...</section>
      <section id="top-recommendation">...</section>
    </main>
  </body>
</html>
```

## 头部

仓库名称、日期以及一个简洁的图例：实线框 = module，虚线 = seam，红色箭头 = leakage，粗深色框 = deep module。没有引言段落——直接进入候选方案。

## 候选方案卡片

图表承载主要信息。文字简洁明了，使用术语表词汇（来自 `/codebase-design` 技能），不加修饰。

每个候选方案是一个 `<article>`：

- **标题**——简短，命名 deepening 方案（例如"折叠 Order intake pipeline"）。
- **Badge 行**——推荐强度（`Strong` = 翡翠色，`Worth exploring` = 琥珀色，`Speculative` = 石板色），以及依赖类别的标签（`in-process`、`local-substitutable`、`ports & adapters`、`mock`）。
- **文件**——等宽字体列表，`font-mono text-sm`。
- **前后对比图**——核心内容。两列并排。参见下面的模式。
- **问题**——一句话。痛点是什么。
- **方案**——一句话。改变什么。
- **收益**——项目符号，每个 ≤6 个词。例如："Tests hit one interface"、"Pricing logic stops leaking"、"Delete 4 shallow wrappers"。
- **ADR 提示**（如适用）——一行琥珀色提示框。

不需要解释段落。如果图表需要一段话才能理解，重新画图。

## 图表模式

选择适合候选方案的模式。混合使用。不要让每个图表看起来都一样——多样性本身就是目的。

### Mermaid 图（依赖关系/调用流程的主力）

当重点是"X 调用 Y 调用 Z，看看有多乱"时，使用 Mermaid `flowchart` 或 `graph`。将其包裹在 Tailwind 样式的卡片中，使其看起来不那么突兀。使用 classDef 将泄漏边着色为红色，deep module 着色为深色。序列图适用于"之前：6 次往返；之后：1 次"。

```html
<div class="rounded-lg border border-slate-200 bg-white p-4">
  <pre class="mermaid">
    flowchart LR
      A[OrderHandler] --> B[OrderValidator]
      B --> C[OrderRepo]
      C -.leak.-> D[PricingClient]
      classDef leak stroke:#dc2626,stroke-width:2px;
      class C,D leak
  </pre>
</div>
```

### 手工构建的方框和箭头（当 Mermaid 的布局与你对抗时）

Module 使用带边框和标签的 `<div>`。箭头使用内联 SVG `<line>` 或 `<path>` 元素，绝对定位在相对容器内。当你希望"之后"图看起来像一个厚边框的 deep module，内部元素呈灰色时使用这种方法——Mermaid 无法以正确的权重渲染这种效果。

### 截面图（适用于分层 shallowness）

堆叠水平条带（`h-12 border-l-4`）以展示调用通过的层。之前：6 个薄层，每层无所作为。之后：1 个厚条带，标注合并后的职责。

### Mass 图（适用于"interface 和 implementation 一样宽"）

每个 module 两个矩形——一个表示 interface 表面积，一个表示 implementation。之前：interface 矩形几乎和 implementation 矩形一样高（shallow）。之后：interface 矩形矮，implementation 矩形高（deep）。

### 调用图折叠

之前：一个嵌套方框渲染的函数调用树。之后：同一个树折叠成一个方框，内部调用现在以淡色显示在内部。

## 样式指导

- 偏向编辑风格，而非企业仪表盘风格。大量留白。标题可选衬线字体（`font-serif` 与 stone/slate 搭配效果很好）。
- 克制使用颜色：一种强调色（翡翠色或靛蓝色）加上红色表示 leakage，琥珀色表示警告。
- 保持图表约 320px 高，使前后对比可以舒适地并排显示，无需滚动。
- 图表内部的 module 标签使用 `text-xs uppercase tracking-wider`——它们应读作示意图，而非 UI。
- 唯一的脚本是 Tailwind CDN 和 Mermaid ESM 导入。报告其余部分完全静态——没有应用代码，没有超出 Mermaid 自身渲染的交互性。

## 最佳推荐部分

一个更大的卡片。候选方案名称、一句话说明原因、指向其卡片的锚链接。就这样。

## 语气

简洁的平实语言——但架构名词和动词直接来自 `/codebase-design` 技能。简洁不是偏离术语的借口。

**准确使用：** module、interface、implementation、depth、deep、shallow、seam、adapter、leverage、locality。

**绝不替换为：** component、service、unit（代替 module）· API、signature（代替 interface）· boundary（代替 seam）· layer、wrapper（代替 module，当你的意思是 module 时）。

**符合风格的措辞：**

- "Order intake module 是 shallow 的——interface 几乎和 implementation 一样复杂。"
- "Pricing 跨越了 seam。"
- "Deepen：一个 interface，一个测试点。"
- "两个 adapter 证明了 seam 的合理性：生产环境用 HTTP，测试环境用 in-memory。"

**收益项目符号**以术语表词汇命名收益：*"locality：bug 集中在一个 module 中"*、*"leverage：一个 interface，N 个调用点"*、*"interface 缩小；implementation 吸收了 wrapper"*。不要写 *"easier to maintain"* 或 *"cleaner code"*——这些术语不在术语表中，不配占据位置。

不要犹豫不决，不要铺垫，不要写"值得指出的是……"。如果一个句子可以变成项目符号，就把它变成项目符号。如果一个项目符号可以删除，就删除它。如果一个术语不在 `/codebase-design` 的术语表中，在发明新术语之前，先找一个已有的术语。
