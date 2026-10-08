# 中文版安装说明 canonical blocks

`README.md`、`.changeset/*` 及其他直接提供安装命令的文档必须使用本文件对应的 canonical block，保持命令和说明逐字一致。先在此修改，再同步到消费者。

本仓库由 `devcxl` 维护，是 Matt Pocock 的 `mattpocock/skills` 项目的第三方简体中文汉化版。以下所有命令安装本仓库的中文版，不是英文上游原版。英文上游仓库是 [mattpocock/skills](https://github.com/mattpocock/skills)；不要把它的安装命令替换成中文版的默认命令。

## 优先采用可自动更新的托管安装

Claude Code 中文版使用本仓库自己的 marketplace，不属于 Anthropic 官方市场，默认不会自动更新。Codex 和 Copilot CLI 通过本仓库的 `.claude-plugin/marketplace.json` 与 `plugin.json` 安装；VS Code 从本仓库安装插件。所有托管插件路线都要等 `.claude-plugin/plugin.json` 中的 `version` 更新后才能获取新版本。本仓库的发布工作流运行 `npm run version`，并创建 `chore: version skills` 版本 PR；脚本将 `package.json` 的版本同步到 `plugin.json`。合并该 PR 后，安装端再按各自的更新机制获取新版本。`.claude-plugin/marketplace.json` 没有 `version` 字段。

下表中的 Codex、Copilot、VS Code、Gemini CLI 和 skills.sh 行为依据英文上游截至 2026-10-08 的实现、文档和验证；下面的命令已改为指向中文版仓库，但这些中文版安装路线尚未在本仓库逐项实测。Claude Code 的英文上游路线使用 Anthropic 官方市场 `claude-plugins-official`，不能用于安装中文版。

| Agent | 路线 | 更新方式 |
| --- | --- | --- |
| Claude Code | 本仓库的 `@mattpocock` marketplace | 默认关闭；需一次性开启自动更新 |
| Codex | 本仓库的 `@mattpocock` marketplace | 默认在启动时自动更新 |
| Copilot CLI | 本仓库的 `@mattpocock` marketplace | 一次性设置 `autoUpdate: true` 后自动更新 |
| VS Code | Chat: Install Plugin From Source | 上游默认每日自动更新 |
| Gemini CLI | `gemini skills install`（复制文件） | 不会自动更新，重新运行两条命令 |
| 其他 agent | skills.sh | 不会自动更新，运行 `update`，新增技能时重新运行 `add` |

上游来源（2026-10-08）：Codex `core-plugins/src/manager.rs`；Copilot [cli-config-dir-reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-config-dir-reference)；VS Code `pluginAutoUpdate.ts`；Gemini `skillLoader.ts`。Auggie、Droid、Qwen 和 Goose 尚未在英文上游仓库中实测，验证前继续使用 skills.sh。

## Claude Code

中文版从本仓库自带的 marketplace 安装。此 marketplace 名称为 `mattpocock`，插件名称为 `mattpocock-skills`，不是 Anthropic 官方市场。

<canonical-block name="claude-code-zh">

```bash
claude plugin marketplace add devcxl/mattpocock-skills-zh
claude plugin install mattpocock-skills@mattpocock
```

或者在 Claude Code 会话中：

```
/plugin marketplace add devcxl/mattpocock-skills-zh
/plugin install mattpocock-skills@mattpocock
```

默认不会自动更新。安装后，在 `/plugin` → Marketplaces 中为 `mattpocock` 一次性开启自动更新。
若提示找不到插件，运行 `claude plugins marketplace update` 后重试。运行 `claude plugin list` 查看已安装版本，并参阅 [CHANGELOG.md](../CHANGELOG.md) 了解最新发布版本。

</canonical-block>

## Codex

上游 Codex 支持从 `.claude-plugin/` 读取清单。以下命令指向中文版仓库；中文版路线尚未实测。

<canonical-block name="codex-zh">

```bash
codex plugin marketplace add devcxl/mattpocock-skills-zh
codex plugin add mattpocock-skills@mattpocock
```

按上游行为，Codex 默认在启动时自动更新。新版本仍需先合并本仓库的 `chore: version skills` 版本 PR。

</canonical-block>

## GitHub Copilot（CLI 和 VS Code）

请使用 marketplace，不要使用 `copilot plugin install devcxl/mattpocock-skills-zh` 直接安装仓库。Copilot 已弃用直接仓库安装，且这种方式无法自动更新。以下配置遵循文档 schema，但上游尚未实际运行验证；中文版路线也尚未验证。

<canonical-block name="copilot-zh">

```bash
copilot plugin marketplace add devcxl/mattpocock-skills-zh
copilot plugin install mattpocock-skills@mattpocock
```

然后一次性在 `~/.copilot/settings.json` 中添加：

```json
{
  "extraKnownMarketplaces": {
    "mattpocock": { "source": { "source": "github", "repo": "devcxl/mattpocock-skills-zh" }, "autoUpdate": true }
  }
}
```

在 VS Code 中运行 **Chat: Install Plugin From Source**，输入 `https://github.com/devcxl/mattpocock-skills-zh`。按上游行为默认每日更新；中文版路线尚未验证。

</canonical-block>

## Gemini CLI

Gemini 不读取 `.claude-plugin`，且 `--path` 一次指定一个 bucket。分别安装已推广的两个 bucket。以下中文版命令尚未实测。

<canonical-block name="gemini-zh">

```bash
gemini skills install https://github.com/devcxl/mattpocock-skills-zh.git --path skills/engineering
gemini skills install https://github.com/devcxl/mattpocock-skills-zh.git --path skills/productivity
```

此命令会复制技能文件，不会自动更新。更新时重新运行两条命令。

</canonical-block>

## 其他 agent，或需要可编辑文件（[skills.sh](https://skills.sh/devcxl/mattpocock-skills-zh)）

`-a` 可预选 agent。以下列表来自英文上游 2026-10-07 的测试；中文版路线尚未逐项实测。优先使用 skills.sh，而非 agent 自带的仓库安装器，因为后者可能把 `misc/` 和 `in-progress/` 也一并安装。`npx skills@latest update` 不会自动加入安装后新增的技能，因此更新时还要重新运行 `add`。

<canonical-block name="other-agents-zh">

```bash
npx skills@latest add devcxl/mattpocock-skills-zh -a <agent>  # cursor, opencode, devin, windsurf, amp, pi; omit -a to choose
```

安装器询问要安装哪些技能时，请选择 `setup-matt-pocock-skills`。更新时运行 `npx skills@latest update`；要获取新技能，请重新运行 `add`。

</canonical-block>

单独提到某个技能时使用以下单技能形式。`docs/` 页面不复制这些命令，因为 ai-hero 会在页面正文上方渲染安装组件。详见 [writing-docs.md](./writing-docs.md)。

<canonical-block name="skills-sh-zh-one-skill">

```bash
npx skills@latest add devcxl/mattpocock-skills-zh --skill=<name>
```

```bash
npx skills@latest update <name>
```

</canonical-block>

## 开发中的技能：skills.sh internal skills

`skills/in-progress/README.md` 中的技能不在公开技能列表中。安装这类技能时使用 `INSTALL_INTERNAL_SKILLS=1`，并从本仓库安装中文版：

<canonical-block name="skills-sh-zh-in-progress">

```bash
INSTALL_INTERNAL_SKILLS=1 npx skills@latest add devcxl/mattpocock-skills-zh --skill=<name>
```

</canonical-block>

安装命令统一使用 `skills@latest`。`docs/` 下的页面不复制这些命令，因为站点会自行渲染安装组件。

## 两种方式互斥

插件方式安装的是受管理的 bundle；Gemini CLI 和 skills.sh 会复制可编辑文件。同一个 agent 同时安装多个来源可能造成技能重复：务必说明“二选一”。
