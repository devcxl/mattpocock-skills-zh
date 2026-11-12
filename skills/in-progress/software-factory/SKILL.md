---
name: software-factory
description: Shared language for designing a software factory: the tasks it runs and the services it plugs into.
disable-model-invocation: true
---

**software factory** 是一种由 agents 组成的系统，它会把 tickets、PRs 和日程安排转化为已合并的代码，并部署到用户选择的远程基础设施上。本技能为设计 factory 提供一套语言。讨论或白板梳理 factory 时，只使用以下术语；如果用户用了 _Avoid_ 下的词，就指出对应的规范术语。

## Tasks and runs

**Task**：
一种由 factory 执行的工作，只需定义一次，就可以反复运行：review、explore、implement、ratchet。Task 可以处理一个 ticket、一个 PR，或整个 codebase。
_Avoid_：不要将 job、workflow、action 用作 Task 的名称。CI 服务商的 workflow 文件及其 jobs 是配置 task 的地方，而不是 task 本身。

**Trigger**：
启动一个 run 的事件：ticket tracker 或 git host 中的变更、orchestrator 上的时钟，或另一个 run。

**Run**：
一个 task 在一个 runner 上从触发到结束的一次执行，作为黑盒处理。一个 run 可以直接触发后续 runs、通过 orchestrator 中的逻辑触发，也可以通过更改 ticket tracker 或 git host 触发。run 绝不会等待人类：它会结束，而人类之后对 ticket tracker 或 git host 所做的更改会触发一个新的 run。
_Avoid_：session

**Runner**：
run 执行所用的一次性机器。即使机器本身长期运行，run 结束后其上的任何内容都不会保留：run 对先前 runs 的唯一记忆，就是 ticket tracker、git host 和 orchestrator。
_Avoid_：server、host、box、compute、sandbox

## Services

**Ticket tracker**：
tickets 所在的位置，也是 factory 面向人的接口：人类通过提交 tickets 来安排工作，在 ticket 评论中与 agents 交流，而他们对 tickets 的更改会触发 runs。
_Avoid_：issue tracker、ticket manager、project board

**Ticket source**：
factory 之外任何能在 ticket tracker 中创建 tickets 的事物：feedback button、monitor、error tracker、inbox。
_Avoid_：data source、trigger source、intake

**Git host**：
branches、PRs 和 reviews 所在的位置。
_Avoid_：code host、forge、repo

**Orchestrator**：
接收 triggers、在 runners 上启动 runs，并记录哪些 runs 正在排队、执行中或已完成的组件。
_Avoid_：dispatcher、scheduler、control plane

**Observability platform**：
runners 发送 logs、traces 和 status 的地方，让人类能够看到每个 run 内部发生了什么。它是可选的：填入 runner 或 orchestrator 槽位的产品往往本身就能提供足够的信息。在有内容被写入 ticket tracker 或 git host 之前，run 绝不会据此作出决定。
_Avoid_：observability、logs、monitoring、dashboard

## 设计 factory

设计分为两部分：**services**，每个 slot 由一款 product 填充；以及推动工作在这些服务间流转的 **tasks**。

从用户的问题出发，而不是先从 factory 出发：尚未 triage 的 tickets、等待 automated review 的 PRs、需要迁移到更严格 automated check 的情况，以及无人查看的 bugs。当用户指出问题，或不知道要构建什么时，阅读 [EXAMPLE-TASKS.md](EXAMPLE-TASKS.md)，了解解决常见问题的 tasks。

### 从慢开始

每个 Trigger 都是一个加速器。没有刹车的加速器会变成一门 slop cannon（低质产出炮）。刹车有三种：

- **Automated checks**：确定性门禁（types、lint、tests），每个 run 都必须通过。
- **Automated review**：单独启动一个 run，以全新视角对照 codebase 的标准和对应 ticket（如果有）检查 diff。
- **Human review**：PR 合并前由人类阅读；它发现的问题会转化为新的 automated checks，并让 automated review 更精准。

每次只增加一个 automated trigger，起初先限流（十条 bug report 中触发一条，或每天按时触发一次），并确保每个 PR 都经过 human review。随着刹车逐渐赢得信任，再放宽限流；每个 runs 循环都应限制在几次尝试之内，然后交由人类处理。

### 填满每个 slot

每项 service 都是一个 slot。一款 product 可以填充多个 slots，一台 server 也可以托管多项 services。以下是三种并列设计：

| Service                | All on GitHub                   | Linear tickets                 | Own tracker              |
| ---------------------- | ------------------------------- | ------------------------------ | ------------------------ |
| Ticket tracker         | GitHub Issues                   | Linear                         | own app                  |
| Ticket source          | feedback button                 | feedback button, monitor       | feedback button, monitor |
| Git host               | GitHub                          | GitHub                         | GitHub                   |
| Orchestrator           | GitHub Actions                  | own server + database          | own app                  |
| Runner                 | Actions runner                  | Actions, E2B, Daytona or a VPS | own app, or sandboxes    |
| Observability platform | none: Actions run pages suffice | an LLM tracing platform        | own app                  |

用户为某个 slot 选择 product 时，先阅读该 slot 的调研文档以了解概况，然后自行调查当前有哪些选项；每份调研文档都会按类型归纳选项，并列出决定该 slot 时需要回答的问题：

- [TICKET-TRACKERS.md](TICKET-TRACKERS.md)
- [GIT-HOSTS.md](GIT-HOSTS.md)
- [RUNNERS.md](RUNNERS.md)
- [OBSERVABILITY-PLATFORMS.md](OBSERVABILITY-PLATFORMS.md)

服务可以购买，tasks 则由你来构建：tasks 承载用户的设计，services 则是通用的。优先选择现成的 ticket tracker：它可靠耐用，人们已经熟悉，而且很容易让外部用户加入。

### 逐一审视每个 task

对每个 task，回答：

1. 是什么触发了它？
2. 它会做什么，又会读取和写入哪些 services？
3. 它接下来会触发什么？
4. 人类会在什么环节重新介入？
5. 如何避免两个 runs 重复做同一项工作？

对每个 ticket source，回答：怎样避免它重复提交同一个 ticket？

当每个 slot 都指定了一款 product（或者，为 observability platform 有意选择 none），并且每个 task 和 ticket source 对每个问题都有答案时，设计才算完成。
