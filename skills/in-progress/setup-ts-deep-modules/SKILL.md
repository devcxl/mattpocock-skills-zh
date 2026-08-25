---
name: setup-ts-deep-modules
description: 将 dependency-cruiser 接入 TypeScript 仓库，使每个 package 都是一个深度模块：实现隐藏在子文件夹中，只能通过入口点文件访问。由用户调用。
disable-model-invocation: true
---

# 设置 TS 深度模块

让此仓库中的每个 package 都成为一个**深度模块**：小接口背后隐藏大量行为。一个 package 的公开表面是其**入口点**：package 根目录下的文件：而其子文件夹中的所有内容都是隐藏的。本技能安装 [dependency-cruiser](https://github.com/sverweij/dependency-cruiser) 与让入口点成为唯一通路的规则，然后验证规则确实起作用。

关于相关词汇（深度模块、接口、接缝、depth），请调用 Skill 工具并传入 "codebase-design"：在后续内容中使用它的术语。

## 它强制形成的结构

```
src/packages/
  <name>/
    index.ts        ← 一个入口点（公开）。外部从这里导入。
    client.ts       ← 另一个入口点。Package 可以暴露多个。
    lib/            ← 实现：对外部隐藏，内部可以自由相互导入。
    tests/          ← 与实现并列的测试与 fixtures（一个子文件夹，所以是私有的）。
```

公开表面是 package 的**根文件**，而不是某个指定的 `index.ts`。按惯例实现放在 `lib/`，测试放在 `tests/`，让每个 package 都拥有相同的"两个子文件夹"结构。不过规则本身是普适的：*任何*子文件夹里的*任何*文件都是私有的，所以你永远不需要为了新增文件夹而扩展配置。

四条规则，全部为 `error`：

1. **入口点边界**：package 外部的代码（应用代码或其他 package）只能导入该 package 的入口点（即其根文件），绝不能导入其子文件夹中的任何内容。
2. **包内自由**：package 自己的文件可以自由地相互导入。
3. **测试通过入口点**：`<pkg>/tests/` 下的文件可以导入任何 package 的入口点以及它自己的 `tests/` fixtures，但不能导入任何 package 的子文件夹内部内容（包括它自己的）。跨 package 的集成测试可以，但深路径导入不行。
4. **无循环依赖**：不允许存在依赖循环。

**入口点，而非桶文件（barrel）。** 由于公开表面是*每个*根文件，所以一个 package 可以暴露多个小型入口点（`index.ts`、`client.ts`、`server.ts`），而不是把一切都集中塞进一个巨大的 `index.ts`。不要用桶文件来再导出整棵子树；保持入口点小而精，把实现藏在子文件夹里。

分层（哪些 package 可以依赖哪些 package）是*另一回事*，本仓库把它以注释桩（commented stub）的形式留在配置里供填充。

## 流程

### 1. 探测环境

- **包管理器**：`pnpm-lock.yaml` → pnpm；`yarn.lock` → yarn；`bun.lockb` → bun；否则 npm。后续所有命令都使用该包管理器（`pnpm` / `yarn` / `npm run` / `bunx`）。
- **packages 根目录**：如果存在 `src/` 则使用 `src/packages`，否则使用 `packages`。如果仓库已经有明显不同的约定，请与用户确认。
- **已有配置**：检查是否存在 `.dependency-cruiser.*` 文件。若已有，**不要覆盖**：把四条规则与 options 合并进去，并告知用户你新增了什么。

**完成条件：**包管理器、packages 根目录、是否有已有配置：这三项都已确认。

### 2. 安装 dependency-cruiser

使用上面探测到的包管理器，把 `dependency-cruiser` 安装为 devDependency。

**完成条件：**`dependency-cruiser` 已出现在 `devDependencies` 中。

### 3. 写入配置

将 [`dependency-cruiser.config.cjs`](./dependency-cruiser.config.cjs) 复制到仓库根目录，命名为 `.dependency-cruiser.cjs`。把 `PACKAGES_ROOT` 设置为步骤 1 探测到的根目录。规则是基于路径深度且与扩展名无关的，所以不需要做其他适配。

**完成条件：**`.dependency-cruiser.cjs` 存在，`PACKAGES_ROOT` 正确，且四条禁用规则都已写入。

### 4. 接入检查流程

- 新增 `lint:boundaries` 脚本：`depcruise <packages-root>`（或 `depcruise src`）。
- 将其并入仓库的"总检查"命令：那个已经运行 typecheck 的命令（例如 `check` / `ci` / `validate` 脚本）。**不要改动** `tsconfig`，也不要新增路径别名。
- 如果没有总检查脚本，就新增 `lint:boundaries` 并告诉用户在 CI 中加入它。

**完成条件：**`lint:boundaries` 已存在，并作为与 typecheck 同一条命令的一部分运行。

### 5. 搭建示例 package

创建一个会被提交的 `<packages-root>/example/`，作为"复制即用"的模板：

- `index.ts` 是一个入口点。导出一个委托给内部文件的函数（这样 package 看起来就是*深*的，而不是一个简单的透传）。
- `lib/impl.ts`：一个位于**子文件夹**中的内部文件，被 `index.ts` 导入，从外部无法触达。
- `tests/example.test.ts` 只导入 `../index`（一个入口点），并针对公开函数进行断言。

告诉用户这是一个可以复制或删除的起始模板。

**完成条件：**示例 package 已存在，通过根入口点暴露行为，并把 `impl` 隐藏在子文件夹中。

### 6. 验证规则确实起作用

这是整项技能的完成判定标准：一个在违反时不会失败的配置毫无价值。

1. 运行 `lint:boundaries`。在干净的示例上必须**通过**。
2. 临时向 `tests/example.test.ts` 中添加一个深路径导入（例如 `import { thing } from "../lib/impl"`）。再次运行 `lint:boundaries`；它必须以 `tests-through-entrypoints` 报错**失败**。
3. 撤销那个深路径导入。再运行一次，必须**通过**。

**完成条件：**你已经观察到了"通过 → 在深路径导入时失败 → 再撤销后又通过"这一完整流程。如果步骤 2 没有失败，说明规则没有正确接入，请修复后再结束。

### 7. 把约定写下来

在 packages 文件夹中写一份 `README.md`（即 `<packages-root>/README.md`，放在它所管辖的 packages 旁边），内容覆盖：`src/packages/<name>/` 的目录结构（根目录的入口点、`lib/` 放实现、`tests/` 放测试）、"只能通过 package 的入口点（即根文件）导入"以及如何运行 `lint:boundaries`。**显式劝阻桶文件**：暴露多个小型入口点，而不是通过一个 index 再导出一整棵子树。控制在"复制即用片段 + 四条规则各一段"的范围。

然后在仓库的 agent-instructions 文件（优先 `CLAUDE.md`，否则 `AGENTS.md`，若两者都不存在则新建 `AGENTS.md`）中添加一个**上下文指针**指向它。一行就够，例如 `Packages are deep modules: see [src/packages/README.md](./src/packages/README.md) before adding or importing one.` 这正是让 agent 在踩到边界规则之前先发现它的关键。

**完成条件：**`<packages-root>/README.md` 存在且劝阻桶文件，且仓库的 `CLAUDE.md`/`AGENTS.md` 中有指向它的链接。

## 备注

- 配置中的 `$1` 反向引用（dependency-cruiser 的 group matching）正是让一个 package 可以触达自己的内部、而外部却不能触达的关键。不要把它们拆成多个独立的 per-package 规则。
- 公开 vs 私有由**深度**决定：package 的根文件是入口点；任何子文件夹里的内容都是私有的。约定俗成的子文件夹是 `lib/`（实现）和 `tests/`，但规则并未硬编码它们：任何子文件夹都是私有的，所以新增文件夹永远不需要改配置。新增入口点只是新增一个根文件（不需要桶文件）。
- Package 是**扁平的**：根目录下只有一层直接的子目录。Package 的内部可以嵌套任意深度；但 package 内不能再放另一个 package。
- 使用 `.cjs`（而不是 `.js`），这样即使在 `"type": "module"` 的仓库里，配置中的 `module.exports` 也能正常工作。
