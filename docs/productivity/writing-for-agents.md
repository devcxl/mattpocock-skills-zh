## 它的作用

`writing-for-agents` 是撰写 agent 文档的参考，适用于技能、`AGENTS.md` 或 `CLAUDE.md`、[spec](https://www.aihero.dev/ai-coding-dictionary/spec)、运行时 prompt、README，以及任何 [agent](https://www.aihero.dev/ai-coding-dictionary/agent) 会读的文档。格式各异，写作原则不变。同样的杠杆让每份文档都可预测，于是 agent 每次运行都遵循相同的*过程*，但不一定产出相同的结果。

它的默认动作是删除，而不是解释。让 agent 给另一个 agent 写指令，它会把大部分词花在解释 [model](https://www.aihero.dev/ai-coding-dictionary/model) 已经知道的东西上：那些行里的每一行都是**空操作**，付了 [context](https://www.aihero.dev/ai-coding-dictionary/context) 却没改变任何行为。这份参考是找到它们的透镜，这就是为什么它在一份你手上已经有的文档上跟在一份空文件上一样能挣到自己的位置。

它在 v1.1 之前叫 `writing-great-skills`。新名字更准确地反映了它一直以来的用途：几乎没有任何内容是技能专属的。只有技能相关的机制（frontmatter、模型调用还是用户调用的选择、路由器技能）放在链接的 `SKILL-MECHANICS.md` 中；只有当前文档是技能时才需要阅读它。

## 何时使用

键入 `/writing-for-agents`，或者当你在创建或编辑技能、或修改 `AGENTS.md` 或 `CLAUDE.md` 时，agent 会自动触发它。

其他所有 agent 会读的文档（你的 docs、specs、[tickets](https://www.aihero.dev/ai-coding-dictionary/ticket)、system 和 [AFK](https://www.aihero.dev/ai-coding-dictionary/afk) prompts）都可以手动调用它。判断标准只有一个：agent 会读这份文档吗？文档如何交到 agent 手里并不重要：可能是指针提到它、人直接粘贴，或它就放在仓库里。要弄清代码库包含什么，使用 [grill-with-docs](https://aihero.dev/skills-grill-with-docs)。这份参考规范文档的写法，而不是文档包含的信息。

## 两种负载

整份参考围绕的观念，是每份文档和每个指针都要花费的一对预算：

- **上下文负载（Context load）**：常驻素材对 agent 窗口的代价：一条 `AGENTS.md` 行、一条 skill description、任何不管是否触发都每 [turn](https://www.aihero.dev/ai-coding-dictionary/turn) 都坐在 context 里的东西。
- **认知负载（Cognitive load）**：记住有哪些文档、何时该使用哪份的代价。你就是索引。不要试图最小化这项代价，因为它是人类自主性的成本。

一旦你按这两个负载来想，绝大多数写作决策：拆不拆、内联还是披露、点还是推：就成了在不同地方做出的同一笔取舍。

## 那些杠杆

- **[Context pointers](https://www.aihero.dev/ai-coding-dictionary/context-pointer)**：常驻 context 中指向上下文外材料的引用，并说明何时应读取它。一条 skill description 和一行 `AGENTS.md` 文档指针是同一种东西。指针的*措辞*而非目标，决定 agent 会多可靠地跟进。
- **Information hierarchy**：从文件内步骤，到文件内参考，再到通过指针披露的参考，构成一条层级。**[Progressive disclosure](https://www.aihero.dev/ai-coding-dictionary/progressive-disclosure)** 是把材料沿层级下移，让顶层保持易读。
- **Completion criteria**：每一步完成条件的清晰度与要求度，以及这些要求所促成的**实际工作**。它们是防止**过早完成**的保障。
- **Leading words**：一个 [model](https://www.aihero.dev/ai-coding-dictionary/model) 预训练中已有的紧凑概念（*tight*、*red*、*tracer bullet*），agent 在执行文档时会用它思考。它在两个地方发挥作用：正文中指导执行，指针中触发调用。
- **Pruning**：单一事实来源、相关性，以及按句套用的空操作测试，对抗**重复**、**沉淀**和**蔓延**。

## 常见问题

**`/writing-great-skills` 去哪了？**
就是这个技能，在 v1.1 时重命名。从业者们早就把它用在 `AGENTS.md`、docs、specs、tickets 和运行时 prompts 上：名字还没跟上；结构、引导词和裁剪原来就是任何 agent 会读的文本的工艺。没有别名：按新名字重装。

**"Writing for agents"：所以是让 agent 来写？**
反过来。你是作者；agent 是读者。这就是这一类写作的全部难处：你写给的读者什么都读过了，所以解释是浪费，精度就是全部工作。

**我就不能直接让 agent 帮我写吗？**
可以，结果会很冗长。放任不管，模型会解释它已经知道的东西，并且它不会自己套用空操作测试，也不会自己去找引导词。在草稿上跑一遍这份参考：review 那一遍才是它大部分价值的落点。

**我让 agent 精简一份文档，结果它把功能砍了。**
被告知"streamline"的 agent 优化长度，因为长度是它能看见的东西。空操作测试是行为上的，而不是审美上的：删掉那行，再问 agent 的行为是否改变了。当一句话失败，整句删掉，而不是从里面剪词：遇有争议，跑这份文档来裁决，而不是争论。

**我怎么知道它何时完成？**
当它能用，你再也找不到重复、沉淀或空操作时。这里没有自动评测；检查是一次手动跑，加上失败模式词汇表作为诊断。当一份文档行为不端，那份词汇也是修补工具：先点名失败模式，再修它。

**这应该放进 `CLAUDE.md` 还是别处？**
问你想付哪种负载。`CLAUDE.md` 无条件加载进每个 [session](https://www.aihero.dev/ai-coding-dictionary/session)；指针之后的素材在触发前只付指针本身那一行。任何只在一成的上下文里适用的东西，在另外九成都在付上下文负载。

**我需要为每个新模型重写我的文档吗？**
多数情况下不需要，而针对单一模型过拟合本身就是另一个陷阱。为新模型更新通常又是另一次空操作 pass，而不是重写。

**我的技能只在当初它所构建的那一个确切任务上工作。**
这条常见路径：做一次工作，再让 agent 把那次工作写成技能：在那一次上过度索引，样例出来都过于具体。把那次跑当作证据，然后刻意抽象：剥掉只属于那个仓库和那些文件的部分，为那类任务写。

**英语不是我的母语。我会失去引导词的优势吗？**
不会：找到那个把最多行为装进最少 [tokens](https://www.aihero.dev/ai-coding-dictionary/token) 的词，是这份参考替你做的工作。这是它存在的原因之一。

## 怎样算成功

- 文档越改越好之后变短了，并且你会对剩下的少感到意外。
- 你能指着一个引导词，看它在不止一处发挥作用。
- 没有一处被以任何形式说两遍。重复是一份文档从未被测试过最可靠的迹象。
- 只有某一支需要的参考位于指针之后，而不是堆在主文件里。

## 它的定位

这是一份可随时取用的独立参考，适用于整套技能，而不只是其中某一个。这里的每个技能都是依照它写的；其他技能产出的文档（`GLOSSARY.md` 及其 ADR、spec、ticket）也在 agent 需要阅读时受它规范。你不确定某个任务适合哪个技能或流程时，[ask-matt](https://aihero.dev/skills-ask-matt) 会为你路由。
