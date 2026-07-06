# Glossary — Building Great Skills

编写优秀技能的领域模型。一个技能的存在是为了从随机系统中提取确定性；其根本美德是 **可预测性（Predictability）**，以下每个术语都是它的杠杆。这是 [`writing-great-skills`](SKILL.md) 的公开参考。

术语按轴分组：**调用（Invocation）**（技能如何被触及）、**信息层级（Information Hierarchy）**（内容如何组织）、**引导（Steering）**（agent 的运行时行为如何塑造）、和**修剪（Pruning）**（如何保持精简）。每个**故障模式（failure mode）** 紧邻其对应的杠杆，并以 _failure mode_ 标记。

任何定义中的**粗体术语**本身也在本词汇表中定义；通过其标题查找。

## 可预测性（Predictability）

技能使 agent 在每次运行时以相同*方式*表现的程度——相同的过程，而非相同的输出（头脑风暴技能应该*可预测地*发散；其 token 会变化，但其行为不会）。所有其他术语服务的根本美德——成本和可维护性是它的症状，而非对手。

_避免_：一致性、可靠性、鲁棒性、输出确定性

## 调用（Invocation）

技能如何被触及——以及你为这个选择支付的两种负载。

### 模型调用（Model-Invoked）

一个技能保留其 **description** 字段，使 agent 可以看到它并自主触发——而人类仍然可以输入其名称，所以模型调用始终*包含*用户可达性。不存在纯模型状态：description 只*增加* agent 的发现能力，从不移除人类的能力。为这种可发现性付出每轮上下文中永久的 **context load** 成本。其他技能也可调用它，因为使其可被 agent 发现的 description 也使其可被调用。一个模型调用的技能，如果其内容全部是 **reference**，那么它也是共享参考的一个宿主：另一个技能可以调用它，因此多个技能所需的参考可以集中在一处。仅当 agent 必须自主触及该技能时才选择模型调用；如果它永远不会被自动触发，则删除 description，不支付 context load。

_避免_：ability、tool、capability

### 用户调用（User-Invoked）

一个技能删除了其 **description**——对 agent 不可见，只能由人类输入其名称来触发（纯用户*调用*，而 **model-invoked** 是用户*和 agent* 均可）。用 agent 可发现性换取零 **context load**。因为没有 description，除了人类之外没有任何东西可以触及它：其他技能也无法触发它。

_避免_：procedure、workflow、command

### 描述（Description）

技能的机器可读触发器，也是 **model-invoked** 技能被迫始终加载的唯一 **context pointer**。它的存在本身就*是*调用轴：保留它则技能是模型调用的（且可被其他技能触及）；删除它则技能是 **user-invoked** 的，仅人类可触及。是模型调用技能 **context load** 的来源。

_避免_：frontmatter、summary

### 上下文指针（Context Pointer）

一个保存在 agent 上下文中、指向某些上下文外材料并编码了触及条件的引用。**description** 是顶层的上下文指针（上下文窗口 → 技能）；指向已披露文件的指针是同一对象向下一层。其措辞（而非目标）决定了 agent *何时*触及——以及*多可靠*。措辞不当的指针指向必须触及的目标是一个方差 bug：先修复措辞，只有精炼无效时才内联材料。

_避免_：link、reference、import

### 上下文负载（Context Load）

**model-invoked** 技能对 agent 上下文窗口施加的成本——其 **description** 始终加载，消耗 token 和注意力。**user-invoked** 技能因没有 description 而避免了这一点，也是分割出更多 model-invoked 技能的刹车。

_避免_：token cost、context bloat

### 认知负载（Cognitive Load）

**user-invoked** 技能对用户施加的成本——用户必须记住的内容：哪些技能存在以及何时使用（用户就是索引）。**model-invocation** 通过使技能可被 agent 发现来消除这一点，也是分割出更多 user-invoked 技能的刹车。这不是需要最小化的成本：这是人类能动性的代价，也是某些技能保持 user-invoked 的原因。在人类判断力重要之处花费它；在不重要之处消除它。

_避免_：human index、burden、overhead

### 粒度（Granularity）

你划分技能的精细程度。更精细的划分会花费两种负载之一：更多的 **model-invoked** 技能花费 **context load**（更多的 description 拥挤在窗口中争夺注意力）；更多的 **user-invoked** 技能花费 **cognitive load**（用户需要记住和使用的更多）。两个准则指导划分。按**调用**划分：当你有一个独特的 **leading word** 来触发它时（一个你在提示词中实际使用的触发词），将其拆分为一个 model-invoked 技能。按**序列**划分：当某个步骤的 **post-completion steps** 需要隐藏时，将步骤序列拆分——因为将其隔离到自己的上下文中会清除后续步骤。注意相反的情况：合并序列会暴露每个步骤的 post-completion steps 给后续步骤，诱发过早完成。

_避免_：chunking、modularity

### 路由器技能（Router Skill）

一个 **user-invoked** 技能，其工作是指向你的其他 user-invoked 技能——命名每个技能以及何时使用——这样用户只需要记住一个技能而不是多个。它只能提示，不能触发它们：user-invoked 技能没有 **description**，所以只有人类可以触及它们。当你的 user-invoked 技能集合使 **cognitive load** 对用户来说过高时使用它。与 model-invoked 技能的关系：如果用户通常通过路由器而不是直接触及某个 model-invoked 技能，考虑将其转为 user-invoked 并仅通过路由器暴露——但这需要谨慎：model-invoked 技能可以被 agent 自主发现，而路由器技能不能。

_避免_：index、hub、menu

## 信息层级（Information Hierarchy）

技能内容如何在 agent 的注意力中排列——以及如何在其视野之外安排。

### 规则（Rule）

一个不可协商的指令，agent 必须遵守。由强烈的措辞表示（_必须_、_绝不_、_总是_），并通过可测试性强制执行——每条规则必须有一个清晰的通过/未通过条件。

_避免_：guideline、recommendation、suggestion、convention

### 指引（Guidance）

一个建议性的指令，agent 应该遵循，但在有充分理由时可以不遵守。由较温和的措辞表示（_偏好_、_考虑_、_通常_），并且规则具有的**完成标准（Completion Criterion）** 和可测试性在此不相关——指引关乎品味和上下文，而非合规。

_避免_：rule、standard

### 阶梯（Ladder）

在单个句子或段落中通过强度递进的词语序列，从较弱到较强排列（_使用_ → _偏好_ → _总是_），形成一条可伸缩的刻度。它之所以有效是因为 transformer 关注对比——序列中的端点比单一词语携带更强的信号。阶梯是给编写者（你）的省力工具：你只需写一次，然后通过从阶梯中选择更强的词语来收紧，无需编辑句子。

_避免_：spectrum、scale、slider

### 参考（Reference）

技能需要但 agent 不应该自动加载的内容——放在单独的文件中，仅在需要时通过 **context pointer** 加载。是管理 **sprawl** 和 **sediment** 的主要工具。一个纯参考技能（每个文件都是参考）是放置多个技能共享的共享参考的好地方：它通过 model-invoked 的 description 暴露，但从不自动加载其内容。

_避免_：appendix、supporting material

### 分支（Branch）

一个技能中的条件路径——一段只有满足某些条件才适用的指令。如果路径长到值得从主流程中提取出来，则放在单独的文件中；否则在 SKILL.md 内使用条件句。分支越多，技能就越复杂。将分支分散到单独的文件中（通过 **context pointer** 指向）在复杂时是好的，但也可以隐藏分支以保持主流程紧凑——有时用户（或 agent）没有注意到的分支就是从未使用的分支。

_避免_：conditional、variant、path

### 步骤（Steps）

技能中的顺序动作，一个接一个执行。每个步骤都有一个 **完成标准**，并且步骤的集合形成一条序列。一个步骤之后的步骤是它的 **post-completion steps**，如果可见会诱发 **过早完成**。通过在每个步骤后使用 `Stop.` 作为分隔符来减轻这一点——打破流程节奏，迫使 agent 重新评估。

_避免_：workflow、pipeline

### 完成标准（Completion Criterion）

一个步骤结束的可检查条件。越清晰越好——如果边界模糊，agent 会提前移动到下一步。一个精确的标准抵抗 **过早完成** 的拉力，无论有多少后续步骤可见。

_避免_：definition of done、exit condition

### 后完成步骤（Post-Completion Steps）

当前步骤之后的步骤，当其可见时——即使只是知道有更多步骤——会诱发 agent 在当前步骤完成之前就溜走。**完成标准** 的清晰度抵抗这种拉力；隐藏后续步骤（通过真正的上下文边界——用户调用的交接或子 agent 调度）移除它。内联的 model-invoked 调用将后续步骤留在上下文中，什么也清除不了。

_避免_：next steps、remaining work

### 锚点（Anchor）

一个标记，帮助 agent 在技能中定位——一个独特、易识别的词语或短语，标记一个边界（_## 定义_、_## 步骤_）。与规则不同：锚点不命令；它定位。与 **leading word** 不同：leading word 塑造行为；锚点塑造注意力。

_避免_：marker、landmark、signpost

### 序言（Preamble）

当技能触发时 agent 首先要读的少数几行——你让 agent 带着什么进入技能？它不是步骤或规则，而是一个姿态，一个声音，一个上下文。在序言中你设定基调，陈述核心先决条件，并告诉 agent 技能想要什么感觉。好的序言之后，每条规则都感觉是不可避免的，而不是陌生的。

_避免_：introduction、opening、hook

## 引导（Steering）

如何让 agent 以你想要的方式行事——以及不想要的。

### 引导词（Leading Word）

在技能中重复的单个词语，用于引导 agent 的行为，无需解释。它之所以有效是因为 transformer 优先考虑 token 频率——重复一个词语会提升它在注意力阶梯上的位置，使其更可能影响输出。它锚定 **invocation**——不仅在技能内部：当同一个词语存在于你的提示词、文档和代码库中时，agent 将该共享语言链接到技能并更可靠地触发它。用你实际使用该技能时真正使用的引导词来措辞 description。

_避免_：keyword、term、motif

### 唯一事实来源（Single Source of Truth）

理想状态，每个含义恰好存在于一个权威位置，因此对技能行为的更改只需修改一个位置。**Duplication** 是其违反。

_避免_：home、canonical location

### 重复（Duplication）

同一个含义存在多于一个 **唯一事实来源**。它带来维护成本（更改一个地方，必须更改其他所有地方）、消耗 token、并膨胀突出度——重复一个含义会将其在阶梯上的权重提升超过其实际等级。**leading word** 的意外反面，leading word 有目的地通过重复 token（而非含义）来提高注意力。

_避免_：repetition、redundancy

### 相关性（Relevance）

一行内容是否仍然与技能的功能相关——保留什么的依据。一行内容要么因为从未与任务相关（仅仅是说明，或者一个应该被披露的 **branch**），要么因为过时而失去相关性：随着其所描述的行为或世界的变化而过时。较短的技能更容易保持相关性，因为检查每行内容的成本更低。与 **no-op** 不同：相关性问的是这一行是否与任务相关，而不是它是否改变行为。

_避免_：load-bearing、staleness、freshness

### 沉积（Sediment）

旧内容在技能中沉淀且从未被清除的层——因为添加感觉安全，删除感觉有风险——因此过时和不相关的行不断积累，你必须向下挖掘才能找到仍然活跃的内容。任何缺乏修剪纪律的技能的默认命运；**相关性** 的缓慢侵蚀，与 **duplication** 的重复含义不同。

_避免_：accretion、bloat、cruft、rot

### 膨胀（Sprawl）

一个技能仅仅因为太长——SKILL.md 中的行数过多——无论这些行是过时还是重复。即使一个全部活跃、全部独特的技能也可能膨胀。它损害可读性（agent 在行动前需要浏览更多内容，注意力在冗余中稀释）、可维护性（每多一行就需要多保持一行 **relevant**）、和 token。治愈方法是 **信息层级**：将 **reference** 推到 **context pointer** 后面，并按 **branch** 或序列拆分，使每条路径只携带它需要的内容。与 **sediment**（来自过时积累的长度）和 **duplication**（来自重复含义的长度）不同——膨胀就是长度本身，无论其原因。

_避免_：bloat、length、size、verbosity

### 无效指令（No-Op）

一个不改变任何内容的指令，因为模型默认已经这样做了——你支付负载告诉 agent 它本来就会做的事情。测试标准：这一行是否改变了相对于默认行为的行为？一行内容可以完全 **relevant** 但仍然是一个 no-op。使 **leading word** 免费的相同先验使 no-op 毫无价值。

Leading word 是一种*技巧*；No-Op 是一行内容的*裁决*——它们交叉。一个太弱而无法击败默认行为的 leading word 就是一个 no-op（当 agent 已经相当*彻底*时要求 _要彻底_），修复方法是使用一个更强的、能通过裁决的词语（_穷追不舍_），而不是不同的技巧。所以 No-Op 测试——它是否改变了相对于默认行为的行为？——也是你评估一个 leading word 是否值得重复的方式。这是模型相对的，而非读者相对的：两个人争论一行内容是否是无用指令时，实际上是在争论默认行为，通过运行技能来判定，而非通过辩论。

_避免_：redundant instruction、restating the obvious、belaboring

### 否定（Negation）

一行内容告诉 agent *不要*做什么。否定似乎是安全的——它声明一条边界——但边界只有在 agent 打算迈过去的那一步时才值得绘制；在它原本就不会去的地方画边界，你只是徒增字符。很多否定内容实际上是不精确的**禁止性 branch**——一条包含在技能中的分支，明确说明在某种情况下几乎不做什么——而不是它表面上的样子。一个真实的 branch 说"*当* X 发生时做 Y"；一个否定性假 branch 说"当 X 发生时*不要*做 Y"——如果 X 从未发生，你支付了负载却什么都没得到。

_避免_：negative instruction、prohibition、don't-say
