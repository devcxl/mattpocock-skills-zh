# GLOSSARY.md 格式

## 结构

```md
# {Context 名称}

{一两句话描述此 context 是什么以及为什么存在。}

## Language（语言）

**Order**：
{一两句话描述该术语}
_Avoid_：Purchase, transaction

**Invoice**：
发送给客户的付款请求（交付后）。
_Avoid_：Bill, payment request

**Customer**：
下单的个人或组织。
_Avoid_：Client, buyer, account
```

## 规则

- **要有主见。** 当同一概念存在多个词汇时，选择最佳的一个，并将其他词列在 `_Avoid_` 下。
- **保持定义简洁。** 最多一两句话。定义它*是*什么，而不是它*做*什么。
- **仅包含该项目 context 特有的术语。** 通用编程概念（timeouts、error types、utility patterns）即使项目广泛使用也不应包含。在添加术语之前，问：这是此 context 独有的概念，还是通用编程概念？只有前者才属于这里。
- **当自然聚类出现时，将术语分组到子标题下。** 如果所有术语都属于一个单一的 cohesive 领域，扁平列表也可以。

## 单 context vs 多 context repo

**单 context（大多数 repo）：** 一个 `GLOSSARY.md` 位于 repo 根目录。

**多 context：** repo 根目录下的 `GLOSSARY-MAP.md` 列出各 context、它们的位置以及相互关系：

```md
# Glossary Map

## Contexts

- [Ordering](./src/ordering/GLOSSARY.md) — 接收并跟踪客户订单
- [Billing](./src/billing/GLOSSARY.md) — 生成发票并处理付款
- [Fulfillment](./src/fulfillment/GLOSSARY.md) — 管理仓库拣货和发货

## Relationships（关系）

- **Ordering → Fulfillment**：Ordering 发出 `OrderPlaced` 事件；Fulfillment 消费这些事件以开始拣货
- **Fulfillment → Billing**：Fulfillment 发出 `ShipmentDispatched` 事件；Billing 消费这些事件以生成发票
- **Ordering ↔ Billing**：`CustomerId` 和 `Money` 的共享类型
```

此 skill 会推断适用哪种结构：

- 如果存在 `GLOSSARY-MAP.md`，读取它以找到 contexts
- 如果只有根目录的 `GLOSSARY.md`，则为单 context
- 如果两者都不存在，当第一个术语确定时懒加载创建根目录的 `GLOSSARY.md`

当存在多个 context 时，推断当前主题与哪个 context 相关。如果不明确，则询问。
