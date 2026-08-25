## 它的作用

`writing-for-agents` 是你写给 agent 的文档所参照的参考：一份技能、一份 `AGENTS.md` / `CLAUDE.md`、一份 [spec](https://www.aihero.dev/ai-coding-dictionary/spec)、一份运行时 prompt、一份 README，任何 [agent](https://www.aihero.dev/ai-coding-dictionary/agent) 会读的文档。包装不同；写作不变：同样的杠杆让每份都可预测，于是 agent 每次跑都走相同的*过程*，而不是产出相同的输出。

它的默认动作是删除，而不是解释。让 agent 给另一个 agent 写指令，它会把大部分词花在解释 [model](https://www.aihero.dev/ai-coding-dictionary/model) 已经知道的东西上：那些行里的每一行都是**空操作**，付了 [context](https://www.aihero.dev/ai-coding-dictionary/context) 却没改变任何行为。这份参考是找到它们的透镜，这就是为什么它在一份你手上已经有的文档上跟在一份空文件上一样能挣到自己的位置。

它在 v1.1 之前叫 `writing-great-skills`。重命名跟踪的，是它本质上一直是的样子：几乎没有任何部分是技能专属的。技能专属的机制：frontmatter、模型调用 vs 用户调用的选择、路由器技能：披露到一份链接到的 `SKILL-MECHANICS.md`，只在面对的文档是技能时你才读它。

## 何时使用

键入 `/writing-for-agents`，或者当你在创建或编辑技能、或修改 `AGENTS.md` 或 `CLAUDE.md` 时，agent 会自动触发它。

对其余任何 agent 会读的文档：你的 docs、specs 和 [tickets](https://www.aihero.dev/ai-coding-dictionary/ticket)、system 与 [AFK](https://www.aihero.dev/ai-coding-dictionary/afk) prompts：手动触发它。判断就一个问题：agent 会读这份吗？：文档怎么到它手上不重要，是指针点名、人粘贴、还是就放在仓库里。要弄清一份代码库到底包含什么，使用 [grill-with-docs](https://aihero.dev/skills-grill-with-docs)：这份参考管的是文档读起来怎样，不管它知道什么。

## 两种负载

整份参考围绕的观念，是每份文档和每个指针都要花费的一对预算：

- **上下文负载（Context load）**：常驻素材对 agent 窗口的代价：一条 `AGENTS.md` 行、一条 skill description、任何不管是否触发都每 [turn](https://www.aihero.dev/ai-coding-dictionary/turn) 都坐在 context 里的东西。
- **认知负载（Cognitive load）**：对你的代价：哪些文档存在，何时去拿哪份。你就是索引。这不是要被最小化的代价：它是人类主动性的价格。

一旦你按这两个负载来想，绝大多数写作决策：拆不拆、内联还是披露、点还是推：就成了在不同地方做出的同一笔取舍。

## 那些杠杆

- **[Context pointers](https://www.aihero.dev/ai-coding-dictionary/context-pointer)**：常驻 context 里指向 context 之外那份材料的引用，并编码了触达它的条件。一条 skill description 和一行 `AGENTS.md` 命名某文档，是同一个对象；指针的*措辞*，不是它指向哪里，决定了 agent 多可靠地穿过去。
- **Information hierarchy**：从文件内步骤，到文件内参考，再到指针之后的披露参考之间的梯子。**[Progressive disclosure](https://www.aihero.dev/ai-coding-dictionary/progressive-disclosure)** 是沿梯子往下走的那一步：把顶部留在易读的位置。
- **Completion criteria**：每一步完成条件的清晰度与要求度，以及要求度驱动的**外勤**；对抗**过早完成**的防线。
- **Leading words**：一个 [model](https://www.aihero.dev/ai-coding-dictionary/model) 预训练里已有的紧凑观念（*tight*、*red*、*tracer bullet*），agent 在跑这份文档时用它来思考。它下两次锚：执行锚在正文里，调用锚在指针里。
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

这是一份可随时取用的独立参考。它在集合中没有任何邻居，因为它位于整套之下而不是与任何单个技能并列：这里每一个技能都是对着它写的，而其他技能留下的文档：一份 `CONTEXT.md` 与它的 ADR、一份 spec、一张 ticket：正是它管辖的文本，一旦有 agent 必须去读它们。当你不确定哪个技能或流程适合某个任务时，[ask-matt](https://aihero.dev/skills-ask-matt) 在整个集合上为你路由。
