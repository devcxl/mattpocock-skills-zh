---
name: git-guardrails-claude-code
description: 设置 Claude Code 钩子，在危险 Git 命令（push、reset --hard、clean、branch -D 等）执行前将其拦截。当用户想要防止破坏性 Git 操作、添加 Git 安全钩子或在 Claude Code 中阻止 git push/reset 时使用。
---

# 设置 Git 护栏

设置一个 PreToolUse 钩子，在 Claude 执行危险 Git 命令之前拦截并阻止它们。

## 会被阻止的命令

- `git push`（包括 `--force` 在内的所有变体）
- `git reset --hard`
- `git clean -f` / `git clean -fd`
- `git branch -D`
- `git checkout .` / `git restore .`

当命令被阻止时，Claude 会看到一条消息，告知它没有权限访问这些命令。

## 步骤

### 1. 询问安装范围

询问用户：是**仅针对当前项目**安装（`.claude/settings.json`），还是**所有项目**安装（`~/.claude/settings.json`）？

### 2. 复制钩子脚本

打包的脚本位于：[scripts/block-dangerous-git.sh](scripts/block-dangerous-git.sh)

根据安装范围将其复制到目标位置：

- **项目级**：`.claude/hooks/block-dangerous-git.sh`
- **全局**：`~/.claude/hooks/block-dangerous-git.sh`

使用 `chmod +x` 使其可执行。

### 3. 将钩子添加到设置文件

添加到相应的设置文件中：

**项目级**（`.claude/settings.json`）：

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/block-dangerous-git.sh"
          }
        ]
      }
    ]
  }
}
```

**全局**（`~/.claude/settings.json`）：

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/block-dangerous-git.sh"
          }
        ]
      }
    ]
  }
}
```

如果设置文件已存在，将钩子合并到现有的 `hooks.PreToolUse` 数组中：不要覆盖其他设置。

### 4. 询问自定义

询问用户是否需要从阻止列表中添加或移除任何模式。根据需求编辑已复制的脚本。

### 5. 验证

运行一个快速测试：

```bash
echo '{"tool_input":{"command":"git push origin main"}}' | <path-to-script>
```

应退出并返回代码 2，并向 stderr 打印一条 BLOCKED 消息。
