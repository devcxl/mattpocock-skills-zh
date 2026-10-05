## 它的作用

`pr` 定义 pull request body 的结构：一个展示变更的 **Summary**、一份证明变更可行的 **Evidence**，以及一个判断落地风险的 **Merge Danger**。它是格式参考，不是工作流。它不推分支、不开 PR，也不决定 PR 里放什么。它告诉 [agent](https://www.aihero.dev/ai-coding-dictionary/agent) 写 body 时应该是什么样子。

摘要要用视觉呈现，而不是写成一段话。默认的 PR body 用散文描述 diff；这里会挑**最小的视图**把关键点讲清楚（伪代码、调用树、组件树、文件树、Mermaid 图，或裁好形状的 diff），并让周围的文字保持简短。评审者已经开着 diff，因此 body 要在他们阅读之前先展示变更的形状。

## 何时使用

输入 `/pr`，或者 agent 每次写 PR body 时自动拿起来用。

| 你的情况 | 用什么 |
| --- | --- |
| 分支就绪，需要一个评审者能扫读的 body | `pr` |
| 代码写完了，但还没人评审过 | 先用 [code-review](https://aihero.dev/skills-code-review)，再用 `pr` |
| PR 已开，评审意见正在回来 | 这组里暂时没有；`pr` 只写 body |

## 模板

三个部分，按此顺序：

- **Summary**：一个或多个小视图，每个都放在它所支撑的短文字旁边。用一个，有时用几个，很少全用。只保留评审者需要的调用、文件、props 和边界。
- **Evidence**：一份前后对比。当变更是视觉性的、且 [环境](https://www.aihero.dev/ai-coding-dictionary/environment) 能出截图时，截图是最强证据；否则用具体的前后测试（先失败、现在通过，以伪代码呈现），或展示发生变化的控制台输出。
- **Merge Danger**：变更是一扇**单向门**还是**双向门**，以及它的**爆炸半径**。双向门撤回成本低；单向门（破坏性迁移、公开 API 移除、难以逆转的决策）则不然。爆炸半径指出变更出错时什么会坏：布局偏移、API 的使用方、移动端响应性。

门的判断是龙头想法。它把"这个能不能安全合并？"从直觉变成一句明示的主张，评审者可以不同意它，它也告诉他们把[人工评审](https://www.aihero.dev/ai-coding-dictionary/human-review)花在哪：双向门加小爆炸半径，可以略读；单向门值得慢慢读。

## 常见问题

**我能信任 agent 自己做的门的判断吗？**

不能盲信，而明示它的意义正在于此。写变更的 agent 就是给自己打分的那一个，而自我报告最舒服的时刻，恰恰是它说"双向门、小爆炸半径"的时候。可逆性在 diff 里也经常不可见：正如一位用户所说，"回滚一个 commit 并不能撤回一批已发出的邮件"，而被标记的灰度发布，只有在第一笔写以新格式落地之前才是双向的。这个技能给 agent 的是定义（破坏性操作与难以逆转的决策是单向门），不是清单，所以 Merge Danger 这一行要读得最狠。两件事有帮助：确保 agent 面前有对应的 [ticket](https://www.aihero.dev/ai-coding-dictionary/ticket) 或 [spec](https://www.aihero.dev/ai-coding-dictionary/spec)，而不只是 diff；并把你的仓库永远视为单向门的变更（schema 迁移、任何向外发布或删除的东西）写在 agent 做判断之前会读到的地方。

**它会替我开 PR 吗？**

不会。`pr` 只管 body。[implement](https://aihero.dev/skills-implement) 的收尾是提交到当前分支，而"要一个开 PR 的技能或选项"（一个 `/to-pr`，或让 `implement` 开 PR 而不是提交）仍是开放提案；一位用户的变通做法是在本地给 `implement` 加一句覆盖指令，让它开 PR。[implement-spec](https://aihero.dev/skills-implement-spec) 是例外：当你的 issue 跟踪器通过 PR 关闭工作、或你主动要求时，它会开一个 draft PR。因为 `pr` 是模型调用的，任何时候你让 agent 开 PR，它的描述就用这个形状。

**它不会又产出一堵文字加图表的墙吗？**

这个技能就是为避免这种情况而设计的，但它仍可能发生。用户对 agent PR body 的抱怨很一致："摘要很长，但我只需要知道改了什么、怎么验证的、什么可能坏、能不能安全合并。"技能让 agent 跳过开场白、保持文字简短、挑最小的视图，通常是一个视图、很少全用。如果你还是收到一叠图表，那是 agent 无视了这些。如果 body 巨大是因为 diff 巨大，那问题是 PR 的体量，`pr` 不会替你拆。

**我的仓库已经有 PR 模板了。用哪个？**

默认谁也不用：`pr` 自带模板，不会去找 `.github/pull_request_template.md` 之类的东西。好几位用户要求让技能尊重仓库模板，而放任不管时，agent 就拿着同一份文档的两套竞争指令。在你的仓库 agent 文档里解决它，比如：填仓库模板，把 Summary、Evidence 和 Merge Danger 放在它下面。

**输出是 HTML 吗？为什么 Mermaid 图渲染不出来？**

输出是 markdown 的 PR body，不是 HTML 页面。GitHub 和 GitLab 会在 PR 描述里渲染 Mermaid 块，但终端不会，所以当 agent 在本地给你看时，图看起来像原始文本。用 CLI harness 的用户要么上 ASCII Mermaid 渲染器，要么让 agent 给 PR 附一份 HTML 版本绕开。Mermaid 只是六种视图之一；调用树、文件树或裁好形状的 diff 在哪读起来都一样。

**它能整理回来的评审意见吗？**

不能。它写完 body 就停。整理其他开发者或评审 bot 的评论（哪些值得处理、哪些不是问题）被要求过多次，不是这个技能做的事。

**PR 变化时它会保持 body 同步吗？**

不会。它在某个时间点写 body，一个在评审中变化的 PR 会让那份 body 过时。重大变更之后，让 agent 重写 body；那是在重新写一份 PR body，所以同样的形状仍然适用。

**我的变更没有 UI。Evidence 放什么？**

除了截图以外的一切。截图只在变更是视觉性的时候才是最强证据；对迁移、后台任务或重构，证据是先失败、现在通过的那个具体测试，或发生变化的控制台输出。光一句"测试全绿"是主张，不是前后对比。

**它能把 body 标记为 LLM 写的吗？**

它自己不能。一位用户的做法是在仓库 agent 文档里放一条常驻指令：agent 写的每个 issue、评论和 PR 都以一行披露结尾。那条规则属于仓库，覆盖 agent 发布的一切，而不是属于某一类文档的模板。

## 怎样算成功

- 不开 diff，只看 Summary 视图你就能说出这个 PR 改了什么。
- body 没有开场白：直接从 Summary 标题开始。
- Evidence 一节展示的是前后对比，不是一句测试通过的主张。
- 每个 PR 都声明了门和爆炸半径，而且你会为其中的单向门放慢阅读。

## 它的定位

当构建以 pull request 的形式交付时，`pr` 位于 review 和 retro 之间：`to-spec → to-tickets → implement → code-review → pr → retro`。它是模型调用的，所以 agent 在这条链之外写 PR body 时也会自动触发它。

- [code-review](https://aihero.dev/skills-code-review) 在它之前运行，因为 PR body 应当描述一份已经评审过的 diff。
- [implement](https://aihero.dev/skills-implement) 产出 body 所描述的 commit。

拿不准处境需要哪个技能时，[ask-matt](https://aihero.dev/skills-ask-matt) 在整个技能集合上为你路由。
