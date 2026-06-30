# 好测试与坏测试（Good and Bad Tests）

## 好测试（Good Tests）

**集成风格（Integration-style）**：通过真实 interface 进行测试，而非 mock 内部组件。

```typescript
// GOOD：测试可观察的行为
test("user can checkout with valid cart", async () => {
  const cart = createCart();
  cart.add(product);
  const result = await checkout(cart, paymentMethod);
  expect(result.status).toBe("confirmed");
});
```

特征：

- 测试用户/调用者关心的行为
- 仅使用 public API
- 能够经受内部重构
- 描述 WHAT（做什么），而非 HOW（怎么做）
- 每个测试只有一个逻辑断言（assertion）

## 坏测试（Bad Tests）

**实现细节测试（Implementation-detail tests）**：与内部结构强耦合。

```typescript
// BAD：测试实现细节
test("checkout calls paymentService.process", async () => {
  const mockPayment = jest.mock(paymentService);
  await checkout(cart, payment);
  expect(mockPayment.process).toHaveBeenCalledWith(cart.total);
});
```

危险信号：

- Mock 内部协作组件
- 测试私有方法
- 断言调用次数/顺序
- 重构时测试中断，而行为未改变
- 测试名称描述的是 HOW（怎么做）而非 WHAT（做什么）
- 通过外部手段而非 interface 进行验证

```typescript
// BAD：绕过 interface 进行验证
test("createUser saves to database", async () => {
  await createUser({ name: "Alice" });
  const row = await db.query("SELECT * FROM users WHERE name = ?", ["Alice"]);
  expect(row).toBeDefined();
});

// GOOD：通过 interface 验证
test("createUser makes user retrievable", async () => {
  const user = await createUser({ name: "Alice" });
  const retrieved = await getUser(user.id);
  expect(retrieved.name).toBe("Alice");
});
```

**循环论证测试（Tautological tests）**：期望值重述了实现，因此测试构造性通过。

```typescript
// BAD：期望值以与代码相同的方式计算
test("calculateTotal sums line items", () => {
  const items = [{ price: 10 }, { price: 5 }];
  const expected = items.reduce((sum, i) => sum + i.price, 0);
  expect(calculateTotal(items)).toBe(expected);
});

// GOOD：期望值是独立的、已知正确的字面量
test("calculateTotal sums line items", () => {
  expect(calculateTotal([{ price: 10 }, { price: 5 }])).toBe(15);
});
```
