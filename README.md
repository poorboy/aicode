# aicode

**自托管的 AI 编程任务编排平台 · Self-hosted AI coding task orchestration platform**

🌐 项目主页 / Website: <https://poorboy.github.io/aicode/>

[中文](#中文) ｜ [English](#english)

> 个人学习研究项目：把「提示词 + 项目目录」变成可编排、可观测、可回溯的 AI 编码任务队列。
> A personal learning project: turn “prompt + project directory” into an orchestrated, observable and traceable queue of AI coding tasks.

---

## 中文

### 一、这是什么

`aicode`（内部代号 `optask`）是一个**完全自托管**的 AI 编程助手 + **任务批处理平台**。它把「提示词 + 项目目录」组织成任务队列，由调度器为每个项目目录拉起独立的 AI 引擎实例（`codetools`，用 Go 重写的 opencode），在项目目录中创建会话、发送提示词，浏览器端通过 SSE 实时观看输出，任务完成后自动归档 Markdown 会话记录。

整个系统是**一个可执行文件 + 一个数据目录**：Go 后端直接静态托管 Vue 3 前端，内嵌 bbolt 单文件数据库，无需额外数据库、消息队列或反向代理。

| 组成 | 技术 | 说明 |
| --- | --- | --- |
| 后端 | Go 1.23 · 标准库 `net/http` · bbolt | 任务调度、实例管理、多用户、授权、程序化 API |
| 前端 | Vue 3 + Vite · 原生 JS | 单页控制台（项目 / 任务 / 聊天 / 代码图谱 / 环境容器 / 设置） |
| 引擎 | `codetools`（纯 Go，零第三方依赖） | 多 Provider、完整工具集、会话 JSONL、技能 / MCP、HTTP API |
| 部署 | Windows / Linux / macOS / Docker | 单二进制；配置 `data/cfg/cfg.yaml` 首次启动自动生成 |

### 二、其他编程 / AI 编码工具的常见弊端

> 下面按「工具类别」归纳常见痛点，代表产品仅作举例，不代表其全部能力；重点是说明为什么需要一套**自托管、可编排、能自愈**的方案。

| 类别 | 代表 | 常见弊端 |
| --- | --- | --- |
| 云端 AI IDE | Cursor、Windsurf 等 | 订阅 / 按量计费成本不可控；源码上传第三方，隐私与合规存疑；模型与供应商强绑定；以「单人交互」为主，缺少批量任务队列与无人值守 |
| 编辑器插件 | GitHub Copilot、Cline、Continue 等 | 深度绑定某一编辑器；按 token 计费；长任务中断 / 限流后需要人工重试；无代码图谱、无容器编译环境；难与后台系统做程序化集成 |
| 命令行 Agent | Claude Code、Aider 等 | 单会话交互式，无任务编排与串行调度；崩溃 / 限流无自动续做；无多用户隔离与权限 / 授权；无可观测的 Web 控制台与历史检索 |
| 自研脚本 + SDK | shell / Python 调各家 SDK | 需自行实现重试、限流退避、代理切换、会话存档、权限校验——重复造轮子，且难以稳定运维 |

展开来说，常见问题集中在这些方面：

1. **成本不可控**：订阅制或按量计费，团队 / 批量场景费用随用量线性膨胀，且无法用自有或本地模型替代。
2. **数据出境**：代码、`git` 凭据、内网地址被上传到第三方云端，安全与合规风险高。
3. **模型锁定**：想切换模型 / 供应商往往要改工作流甚至重新付费，自定义 OpenAI 兼容端点支持差。
4. **只能交互、不能批处理**：一次一个会话，无法把几十上百个「提示词 + 目录」组织成队列跑通宵。
5. **自愈能力弱**：命中 429 限流、额度用尽、进程卡死、首条回复超时后，通常直接失败，需人工重启续做，已产出内容可能丢失。
6. **没有多用户与权限**：单机单人；无法做用户隔离、角色管理、程序化令牌与授权控制。
7. **缺少代码理解**：没有本地代码图谱 / 影响面分析，改大项目只能靠全文检索。
8. **依赖本机工具链**：要在容器 / 服务器里编译，就得自行准备 Go / Node / Python 工具链，环境难对齐。
9. **没有程序化接口**：只能人在界面上点，难以被后台系统或 AI Agent 以 API 方式驱动。
10. **不可观测、不可追溯**：输出、工具调用、推理过程无法完整留痕与检索，出了问题难以复盘。
11. **运维负担重**：升级、跨机部署、节点上报、授权管理都需要额外脚手架。

### 三、aicode 的核心优势

1. **完全自托管、单文件部署**：一个可执行文件 + 一个数据目录即可运行，源码与凭据不出内网。
2. **任务编排，稳定可预期**：项目 / 任务分组 / 任务三层模型，按 `order` 严格串行（同一时间只跑 1 个任务，并发固定，避免资源争抢与互相干扰）。
3. **任务看门狗，失败可自愈**：卡死检测、自动续推、首条回复超时、生成中的活跃静默宽限；限流（429 / 额度用尽 / 首条超时）在**同一会话**内按指数退避重发简短提醒续做，不重发完整提示词。
4. **双层代理自愈**：任务级「备用代理列表」（主代理不可用立即切换下一个模型配置，同会话续做，产出不丢）+ 「HTTP 代理列表」（不换模型，只轮换正向代理，命中 429 / 5xx / 网络错误自动换下一个重试）。
5. **SSE 实时输出 + 会话自动存档**：文本 / 工具调用 / 推理过程实时流；任务完成自动导出 Markdown 会话，可检索、可复用。
6. **本地代码图谱 CodeGraph**：按「用户 × 项目」独立索引，支持符号搜索、定义 / 调用关系、影响面分析与图谱视图，改码前先定位范围。
7. **容器构建环境**：程序跑在无工具链的容器里也能编译——通过 Docker Engine 在一次性容器（auto-go / auto-node / auto-python-pytest …）中执行构建 / 测试，目录 bind mount，产物回落到源码目录。
8. **技能与 MCP**：全局 / 用户级技能目录，zip 导入导出即时同步到运行中的实例；可接入 MCP 第三方工具与 SkillHub 技能市场。
9. **多用户与授权**：用户数据隔离、管理员 / 普通用户角色、`x-tk` 程序化访问令牌、强制授权与授权服务器自动激活。
10. **程序化 API**：`/api/tk/*` 与 Web 同源能力，第三方脚本 / AI Skill 可无感驱动整套平台。
11. **运维友好**：在线自更新（二进制 / 前端 / 引擎）、集群总后台上报、运行日志、代理额度统计。
12. **引擎可控、免配置**：`codetools` 纯 Go、零第三方依赖，支持多 Provider 与自定义 OpenAI 兼容端点；配置免文件，启动后经 `POST /settings` 下发。

### 四、快速对比

| 能力 | 常见云端 / 插件 / CLI 工具 | aicode |
| --- | --- | --- |
| 部署形态 | SaaS，代码上传第三方 | 自托管，单二进制 + 数据目录 |
| 计费 | 订阅 / 按量 | 自备模型，成本可控 |
| 任务队列 / 串行编排 | 一般无 | 项目 / 分组 / 任务三层，严格串行 |
| 无人值守批处理 | 弱 | 任务队列 + 看门狗 + 自愈 |
| 限流 / 卡死自愈 | 基本无 | 会话内退避重试 + 备用代理切换 |
| 多用户隔离 / 授权 | 企业版才有 | 内置用户 / 角色 / `x-tk` / 授权 |
| 代码图谱 | 无 | 内置 CodeGraph |
| 容器内编译 | 依赖本机 | 内置 lin_env / buildenv |
| 程序化 API | 受限 | `/api/tk/*` 全量 |
| 会话可追溯 | 部分 | Markdown 会话存档 |

### 五、快速开始

```bash
# 依赖：Go ≥ 1.23；仅构建前端需 Node ≥ 18
git clone <本仓库>
cd <仓库>

# 构建（自动注入版本信息）
sh ./bld.sh            # 产物到 exe/
cd prog && sh bld.sh    # 产物到 prog/exe/

# 启动（Windows 为 aicode.exe；Linux / macOS 为 aicode）
cd prog/exe && ./aicode.exe

# 浏览器打开控制台
http://127.0.0.1:8090
```

首次启动自动生成 `data/cfg/cfg.yaml`（端口 / 授权码 / 引擎参数等），空库默认管理员 `admin / admin123`。

### 六、目录与端口

```
exedir/
├── aicode(.exe)       后端可执行程序
├── static/            前端静态资源（由后端托管）
└── data/
    ├── bin/codetools  AI 引擎
    ├── cfg/cfg.yaml   配置（自动生成）
    ├── aicfg/         .env / 环境配置
    ├── skills/        技能目录
    ├── log/           运行日志
    ├── task/ session/ 会话存档
    └── tasks.db       bbolt 数据库
```

| 端口 | 用途 |
| --- | --- |
| `server.port`（默认 8090） | Web 控制台 / HTTP API |
| `aicode.base_port + 1` | 默认 AI 服务实例 |
| `aicode.base_port + 2…` | 任务 / 聊天实例（每任务独立实例） |

### 七、文档与链接

- 项目主页：<https://poorboy.github.io/aicode/>
- 宣传页源码：本仓库 `webset` 分支
- 程序化访问：`/api/tk/*` + `x-tk` 请求头
- 相关技能：`op-task`、`container-build`、`codegraph`

> 本项目为个人学习研究用途，涉及授权（License）机制；请遵守所在地区法律法规与所用模型的许可条款。

---

## English

### 1. What is aicode

`aicode` (internal codename `optask`) is a **fully self-hosted** AI coding assistant and **task-batch platform**. It organizes “prompt + project directory” into a task queue: the scheduler spins up a dedicated AI engine instance (`codetools`, a Go rewrite of opencode) per project directory, creates a session, sends the prompt, streams output to the browser over SSE, and archives a Markdown session log when the task finishes.

The whole system is **one executable + one data directory**: the Go backend statically serves the Vue 3 frontend and embeds a single-file bbolt database — no extra database, message queue or reverse proxy required.

| Part | Tech | Role |
| --- | --- | --- |
| Backend | Go 1.23 · `net/http` · bbolt | Scheduling, instance management, multi-user, licensing, programmatic API |
| Frontend | Vue 3 + Vite · vanilla JS | Single-page console (projects / tasks / chat / code graph / containers / settings) |
| Engine | `codetools` (pure Go, zero third-party deps) | Multi-provider, full toolset, session JSONL, skills / MCP, HTTP API |
| Deploy | Windows / Linux / macOS / Docker | Single binary; `data/cfg/cfg.yaml` auto-generated on first start |

### 2. Common drawbacks of other coding / AI coding tools

> Below we group common pain points by *category of tool*. Named products are examples only and do not represent their full capabilities — the point is to explain why a **self-hosted, orchestratable, self-healing** solution is useful.

| Category | Examples | Typical drawbacks |
| --- | --- | --- |
| Cloud AI IDEs | Cursor, Windsurf, etc. | Subscription / usage-based cost is hard to control; source code is uploaded to a third party (privacy / compliance concerns); strong vendor & model lock-in; mostly single-user interactive, no batch task queue or unattended runs |
| Editor extensions | GitHub Copilot, Cline, Continue, etc. | Tightly bound to one editor; token-based billing; long tasks that hit limits or crashes need manual retries; no code graph, no container build env; hard to integrate programmatically into a backend system |
| CLI agents | Claude Code, Aider, etc. | Single interactive session, no orchestration or serial scheduling; no auto-resume after crash / rate limit; no multi-user isolation or permissions / licensing; no observable web console or history search |
| DIY scripts + SDKs | shell / Python calling vendor SDKs | You must implement retries, rate-limit backoff, proxy rotation, session archiving and auth yourself — reinventing the wheel and hard to operate reliably |

Expanded, the pain points cluster around:

1. **Uncontrollable cost** — subscription or pay-per-use pricing scales with usage for teams / batch jobs, and you cannot substitute your own or local models.
2. **Data leaves your network** — code, `git` credentials and internal addresses are uploaded to third-party clouds; security and compliance risk is high.
3. **Model lock-in** — switching model / provider often means reworking the workflow or paying again; custom OpenAI-compatible endpoints are poorly supported.
4. **Interactive only, not batch** — one session at a time; you cannot queue dozens or hundreds of “prompt + directory” jobs and let them run overnight.
5. **Weak self-healing** — when a request hits 429 rate limits, runs out of quota, the process stalls, or the first reply times out, the run usually just fails; you must restart it manually and may lose what was already produced.
6. **No multi-user or permissions** — single machine, single user; no user isolation, role management, programmatic tokens or licensing.
7. **No code understanding** — no local code graph or impact analysis, so changing a large project relies on full-text search.
8. **Depends on the host toolchain** — to compile inside a container / server you must prepare Go / Node / Python toolchains yourself, and environments drift.
9. **No programmatic interface** — everything is done by hand in a UI, so backend systems or AI agents cannot drive it via API.
10. **Not observable or traceable** — output, tool calls and reasoning are not fully logged or searchable, making post-mortems hard.
11. **Heavy operations** — upgrades, cross-machine deployment, node reporting and license management all need extra scaffolding.

### 3. Core advantages of aicode

1. **Fully self-hosted, single-file deploy** — one executable + one data directory; source code and credentials never leave your network.
2. **Orchestrated, predictable execution** — project / task group / task three-level model, executed strictly serially by `order` (only 1 task at a time, fixed concurrency), avoiding resource contention and interference.
3. **Watchdog with self-healing** — stuck detection, auto-continue, first-reply timeout, and activity-silence grace; on rate limits (429 / quota exhausted / first-reply timeout) it re-sends a short nudge in the **same session** with exponential backoff instead of resending the full prompt.
4. **Two-layer proxy failover** — a per-task “backup proxy list” (switch to the next model config immediately and continue in the same session without losing output) plus an “HTTP proxy list” (keep the model, rotate forward proxies, auto-retry the next one on 429 / 5xx / network errors).
5. **Live SSE output + auto-archived sessions** — text / tool calls / reasoning stream in real time; finished tasks export a Markdown session log that can be searched and reused.
6. **Local code graph (CodeGraph)** — per user × project indexing with symbol search, definition / caller relations, impact analysis and a graph view, so you locate the change scope before editing.
7. **Container build environment** — even running in a container with no toolchain, aicode builds via Docker Engine in one-shot containers (auto-go / auto-node / auto-python-pytest …), bind-mounting the directory and writing artifacts back to the source dir.
8. **Skills & MCP** — global / per-user skill directories with zip import / export synced instantly to running instances; connect MCP third-party tools and the SkillHub marketplace.
9. **Multi-user & licensing** — user data isolation, admin / regular roles, `x-tk` programmatic tokens, mandatory licensing and license-server auto-activation.
10. **Programmatic API** — `/api/tk/*` mirrors the web capabilities, so third-party scripts / AI skills can drive the whole platform.
11. **Ops-friendly** — online self-update (binary / frontend / engine), cluster master reporting, run logs and proxy quota stats.
12. **Controllable engine, no config files** — `codetools` is pure Go with zero third-party dependencies, supports multiple providers and custom OpenAI-compatible endpoints; configuration is pushed via `POST /settings` instead of files.

### 4. Quick comparison

| Capability | Typical cloud / extension / CLI tools | aicode |
| --- | --- | --- |
| Deployment | SaaS, code uploaded to a third party | Self-hosted, single binary + data dir |
| Billing | Subscription / usage-based | Bring your own model, controllable cost |
| Task queue / serial orchestration | Usually none | Project / group / task, strictly serial |
| Unattended batch runs | Weak | Queue + watchdog + self-healing |
| Rate-limit / stuck self-healing | Basically none | In-session backoff retry + backup-proxy failover |
| Multi-user isolation / licensing | Enterprise plan only | Built-in users / roles / `x-tk` / licensing |
| Code graph | None | Built-in CodeGraph |
| In-container build | Depends on host | Built-in lin_env / buildenv |
| Programmatic API | Limited | Full `/api/tk/*` |
| Traceable sessions | Partial | Markdown session archive |

### 5. Quick start

```bash
# Requirements: Go >= 1.23; Node >= 18 only to build the frontend
git clone <this repo>
cd <repo>

# Build (version info auto-injected)
sh ./bld.sh            # output to exe/
cd prog && sh bld.sh    # output to prog/exe/

# Start (aicode.exe on Windows; aicode on Linux / macOS)
cd prog/exe && ./aicode.exe

# Open the console in a browser
http://127.0.0.1:8090
```

On first start `data/cfg/cfg.yaml` is generated (port / auth code / engine parameters, etc.); the empty database ships with an admin `admin / admin123`.

### 6. Directory & ports

```
exedir/
├── aicode(.exe)       backend executable
├── static/            frontend static assets (served by the backend)
└── data/
    ├── bin/codetools  AI engine
    ├── cfg/cfg.yaml   config (auto-generated)
    ├── aicfg/         .env / environment config
    ├── skills/        skill directory
    ├── log/           run logs
    ├── task/ session/ session archives
    └── tasks.db       bbolt database
```

| Port | Purpose |
| --- | --- |
| `server.port` (default 8090) | Web console / HTTP API |
| `aicode.base_port + 1` | Default AI service instance |
| `aicode.base_port + 2…` | Task / chat instances (one dedicated instance per task) |

### 7. Docs & links

- Website: <https://poorboy.github.io/aicode/>
- Landing page source: the `webset` branch of this repo
- Programmatic access: `/api/tk/*` with the `x-tk` header
- Companion skills: `op-task`, `container-build`, `codegraph`

> This is a personal learning / research project and includes a License mechanism; please comply with your local laws and the license terms of any models you use.
