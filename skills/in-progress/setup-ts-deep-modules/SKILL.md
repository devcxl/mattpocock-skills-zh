---
name: setup-ts-deep-modules
description: Wire dependency-cruiser into a TypeScript repo so each package is a deep module — implementation hidden in subfolders, reachable only through its entry-point files. User-invoked.
disable-model-invocation: true
---

# 设置 TS 深度模块（Setup TS Deep Modules）

让此仓库中的每个 package 都成为一个**深度模块**：小接口背后隐藏大量行为。一个 package 的公开表面是其**入口点**——package 根目录下的文件——而其子文件夹中的所有内容都是隐藏的。本技能安装 [dependency-cruiser](https://github.com/sverweij/dependency-cruiser) 和使入口点成为唯一通路的规则，然后验证规则确实起作用。

关于相关词汇（深度模块、接口、接缝、depth），请运行 `/codebase-design` 技能——在后续内容中使用它的术语。

## 它强制形成的结构

```
src/packages/
  <name>/
    index.ts        ← 一个入口点（公开）。外部从这里导入。
    client.ts       ← 另一个入口点。Package 可以暴露多个。
    lib/            ← 实现：对外部隐藏，内部可以自由相互导入。
```

入口点可以在 package 根目录的任何层级（`index.ts`、`<name>.ts`、`things.ts`——depth 是关于同层的，而非全局的）。外部代码可以是同一仓库中的另一个 package，或外部消费者。

## 流程

### 1. 安装 dependency-cruiser

运行 `npm install -D dependency-cruiser` 或 `yarn add -D dependency-cruiser` 或 `pnpm add -D dependency-cruiser`，取决于你的包管理器。

### 2. 配置（`dependency-cruiser.config.cjs`）

将此技能仓库中的 `dependency-cruiser.config.cjs` 复制到目标仓库的根目录。该配置提供了一个被注释禁止的默认规则集合。它已经设置了三个关键的规则预设：

- `not-to-unresolvable`——不要导入不存在的文件
- `no-circular`——不要创建循环依赖
- `no-duplicate-dep-types`——不要在 devDependencies 和 dependencies 中重复声明

但它缺少一个关键元素：**规则预设需要知道哪些文件是入口点，以及哪些路径别名是"流氓"模块**。下一节会涵盖这些。

### 3. 应用规则

本技能自身定义了两条 dependency-cruiser 规则。将它们插入配置文件的 `forbidden` 数组中：

#### 规则 1：入口点是唯一出路

使 package 根目录下的文件成为唯一可以从外部导入的地点。所有从外部的导入必须只匹配入口点 glob，从不匹配子文件夹 glob。

`from.path` 使用入口点的 glob（默认：`^src/packages/[^/]+/index\.ts$`），`to.path.not` 使用子文件夹 glob（默认：`^src/packages/[^/]+/lib/`）。

```
depcruise --include-only "^src/packages" src/packages
```

#### 规则 2："流氓"模块别名

使跨 version 的入口点保持一致。如果存在多个入口路径（如 `@org/package` 和相对路径 `../../packages/<name>`），确保导入方始终使用 package 的标准公开路径。

### 4. 证明

删除一个入口点，运行 dependency-cruiser，观察它失败——证明规则有效。然后还原更改。

## 验证标准

- 一项包管理器的 dev 依赖安装了 dependency-cruiser
- `dependency-cruiser.config.cjs` 在仓库根目录
- 配置的规则预设包含入口点和路径别名种子
- 已推送到远程并运行了 `npm test`（或等效命令）
