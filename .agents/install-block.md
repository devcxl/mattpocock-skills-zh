# 标准安装块

统一的安装说明、统一的措辞。`README.md`、`.changeset/*` 以及 `docs/` 下的所有页面必须使用**这个**版本，别无二致。先在此处修改，再传播到各处。

## 安装（30 秒配置）

两种方式，两种理念。**[Claude Code 插件](https://code.claude.com/docs/en/plugins)** 将整套技能集作为受管理的只读 bundle 安装，在我发布新版本时自动更新——你订阅而非 fork。**[skills.sh](https://skills.sh/mattpocock/skills)** 将可编辑的技能文件复制到你的项目中，这样你可以随意修改，变成自己的东西。**二选一——两者都装会导致每个技能出现两次。**

### 1. 获取技能

<details>
<summary><strong>Claude Code</strong></summary>

```bash
claude plugins install mattpocock-skills
```

或者在会话中：

```
/plugin install mattpocock-skills
```

它在 Claude Code 的官方市场中，无需额外添加，更新自动送达。

</details>

<details>
<summary><strong>Codex 及其他智能体</strong></summary>

```bash
npx skills@latest add mattpocock/skills
```

选择你想要的技能，以及要安装到哪些编程智能体上。**安装器会列出可选技能——确保选中 `setup-matt-pocock-skills`。**

原生 Codex 插件已在规划中——详见 [`.agents/adr/0002-ship-as-a-claude-code-plugin.md`](.agents/adr/0002-ship-as-a-claude-code-plugin.md)。

</details>

<details>
<summary><strong>喜欢折腾的</strong></summary>

使用同样的安装器，在任何智能体上安装——包括 Claude Code：

```bash
npx skills@latest add mattpocock/skills
```

这会将技能作为普通文件写入你的仓库，归你所有，你可以自由编辑。不会有任何东西在后台偷偷更新；想获取最新变更时，运行 `npx skills update` 即可。

</details>

### 2. 运行 `/setup-matt-pocock-skills`

在你的智能体中运行它，每个仓库执行一次。它会：

- 询问你要使用哪个 Issue 跟踪器（GitHub、Linear 或本地文件）
- 询问你对工单进行分类时使用哪些标签（`/triage` 会用到）
- 询问你希望把创建的文档保存在哪里

### 3. 搞定——可以开工了。