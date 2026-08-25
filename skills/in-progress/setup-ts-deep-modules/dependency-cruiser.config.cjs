// @ts-check
// 为 dependency-cruiser 提供"深度模块"边界规则。
//
// packages 根目录下的每个 package 都是一个深度模块（DEEP MODULE）：小接口背后
// 隐藏大量行为。一个 package 的公开表面（PUBLIC SURFACE）就是它的入口点
// （ENTRY POINTS）：位于 package 根目录的文件。实现位于子文件夹（SUBFOLDERS）
// 中且为私有：按惯例 `lib/` 放实现、`tests/` 放测试，不过任何子文件夹都是
// 私有的。一个 package 可以暴露多个小型入口点（index.ts、client.ts、
// server.ts……）；优先采用这种方式，而不是把所有内容都塞进一个巨大的桶文件
// （barrel index）。
//
// 这里你唯一可能需要编辑的就是 PACKAGES_ROOT。

/** packages 所在的位置。每个 package 都是根目录下的一个直接子目录（扁平，无嵌套）。 */
const PACKAGES_ROOT = "src/packages";

// --- 派生出的正则（无需编辑） -------------------------------------
const R = PACKAGES_ROOT;
/**
 * 一个 package 的私有内部：package 子文件夹内的所有内容。
 * package 的根文件是入口点，不会被这里匹配到：它们从外部依然可被导入。
 */
const PACKAGE_INTERNALS = `^${R}/[^/]+/[^/]+/`;

/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: "entrypoint-boundary-from-app",
      comment:
        "应用代码/根代码可以导入一个 package 的入口点（即其根文件），但不能导入其子文件夹中的任何内容。",
      severity: "error",
      from: { pathNot: `^${R}/` }, // 导入方不在任何 package 内
      to: { path: PACKAGE_INTERNALS },
    },
    {
      name: "entrypoint-boundary-across-packages",
      comment:
        "package 自己的文件可以自由地相互导入，但只能通过其他 package 的入口点去触达它们，绝不能触达其内部。",
      severity: "error",
      // 导入方位于某个 package 内（$1），但不是测试文件
      from: { path: `^${R}/([^/]+)/`, pathNot: `^${R}/[^/]+/tests/` },
      to: {
        path: PACKAGE_INTERNALS,
        pathNot: `^${R}/$1/`, // 同一 package → 包内自由
      },
    },
    {
      name: "tests-through-entrypoints",
      comment:
        "package 的测试和其他代码一样，只能通过入口点来访问它：可以导入任何 package 的入口点以及自己 tests/ 下的 fixtures，但绝不能导入任何 package 的内部，即便它自己的内部也不行。",
      severity: "error",
      from: { path: `^${R}/([^/]+)/tests/` }, // package $1 中的一个测试文件
      to: {
        path: PACKAGE_INTERNALS,
        pathNot: `^${R}/$1/tests/`, // 仅允许访问自己 tests/ 下的 fixtures
      },
    },
    {
      name: "tests-folder-is-private",
      comment:
        "一个 package 的 tests/ 文件夹只能被测试访问：其他任何文件都不能导入 fixtures。",
      severity: "error",
      from: { pathNot: `^${R}/[^/]+/tests/` }, // 导入方本身不是一个测试
      to: { path: `^${R}/[^/]+/tests/` },
    },
    {
      name: "no-circular",
      comment: "不允许依赖循环。如果你想允许 packages 之外的循环，请把作用域限定为 `^${R}/`。",
      severity: "error",
      from: {},
      to: { circular: true },
    },

    // --- 分层（可选，默认关闭） ----------------------------------
    // 隐藏接口控制的是你如何导入（通过入口点）。
    // 分层控制的是哪些 package 可以依赖哪些 package。在此处加入你自己的规则，例如：
    //
    // {
    //   name: "ui-may-not-depend-on-billing",
    //   severity: "error",
    //   from: { path: `^${R}/ui/` },
    //   to:   { path: `^${R}/billing/` },
    // },
  ],
  options: {
    doNotFollow: { path: "node_modules" },
    tsConfig: { fileName: "tsconfig.json" },
    enhancedResolveOptions: {
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    },
  },
};
