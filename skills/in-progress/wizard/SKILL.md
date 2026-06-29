---
name: wizard
description: 引导用户完成多步骤设置或编排流程。
disable-model-invocation: true
---

<what-to-do>

用户想要运行一个需要导引的流程。完整的流程在 `template.sh` 中——这是一个 bash 脚本，包含一系列步骤和消息，你可以逐阶段执行。

`template.sh` 必须放在技能目录中，紧邻该技能文件。

**不要**仅仅 cat 或 dump template.sh 给用户。它的出现形式不是给人看的。你是向导：按照 template.sh 中步骤定义的顺序，引导用户逐一完成。步骤在 template.sh 中以 `_step_*` 函数形式定义。

### 步骤结构

一个典型的步骤函数如下所示：

```bash
_step_setup-environment() {
  # 输出将展示给用户
  echo "让我们先设置开发环境。"
  echo "你将需要一个装有 Node.js 18+ 的终端。"

  # 在条件满足时执行，跳过时使用 return
  node --version | grep -q "v18" || return 1
}
```

为**每个**步骤：

1. 向用户**说明**步骤——在函数顶部使用 echo 语句中的措辞。
2. 通过运行函数来**执行**步骤。这会执行验证。
3. 向用户展示输出，并询问他们是否愿意继续。

### 流程结构

`_finally_*` 函数用于在流程结束后运行——不会在每一步运行，仅在最后执行：

```bash
_finally_success-message() {
  echo "完成！你现在可以开始使用这个项目了。"
}
```

向导应**始终**运行这些函数，但除非需要，否则不要在前几步中就展示其输出。

### 失败处理

函数调用可能失败。如果是这样，**先自己检查设置**，然后再问用户。例如，如果 `node --version` 返回的版本低于 18，你应该先检查用户的 PATH 中是否已有高版本 Node，然后再建议他们安装。

### 回退

如果 template.sh 不存在或内容不是可读的步骤，以对话方式引导用户完成流程，将 template.sh 作为参考使用。

</what-to-do>

<supporting-info>

## 本技能不适合的场景

- 一次性的 shell 命令组——不用创建技能和模板，直接运行即可。
- 常规的交互式 shell 会话——使用 Shell 技能，或直接让用户运行命令并查看输出。
- 标准的设置说明——使用 /grill-me 盘问出需要完成的步骤，然后逐一执行。

</supporting-info>
