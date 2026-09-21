/* ==========================================================================
   aicode · 项目宣传页多语言词条（中文 / English）
   零依赖：纯数据 + 一个应用函数，供 main.js 调用。
   用法：HTML 元素加 data-i18n（纯文本）/ data-i18n-html（含内联标签）/
        data-i18n-attr="属性:键,属性:键"；未命中键时保留元素原文。
   ========================================================================== */
(function (global) {
  'use strict';

  var MESSAGES = {
    zh: {
      'meta.title': 'aicode · AI 任务批处理系统',
      'meta.description': 'aicode —— 基于 Go + Vue 3 的轻量级 AI 任务批处理系统：项目管理、单任务串行调度、codetools 引擎实例、SSE 实时输出、多代理自动切换、代码图谱与容器构建。',
      'meta.keywords': 'aicode,AI 任务批处理,codetools,opencode,Go,Vue3,代码图谱,容器构建',
      'meta.author': 'aicode',
      'meta.ogtitle': 'aicode · AI 任务批处理系统',
      'meta.ogdesc': '把「提示词 + 项目目录」变成可编排执行的任务队列（单任务串行），实时观看 AI 输出，自动存档会话。',

      'lang.title': '切换语言：中文 / English',

      'a11y.skip': '跳到主要内容',
      'a11y.theme': '切换浅色 / 深色主题',
      'a11y.themeAria': '切换主题',
      'a11y.menuOpen': '展开菜单',
      'a11y.menuClose': '收起菜单',
      'a11y.top': '回到顶部',

      'brand.home': 'aicode 首页',
      'nav.aria': '主导航',
      'nav.features': '功能特性',
      'nav.workflow': '工作流程',
      'nav.architecture': '系统架构',
      'nav.quickstart': '快速开始',
      'nav.api': 'API',
      'nav.faq': '常见问题',
      'nav.cta': '立即开始',
      'nav.docs': '文档',
      'nav.why': '为什么 aicode',
      'footer.nav': '页脚导航',

      'hero.title': '把 AI 编码变成<br>\n        <span class="grad">可编排、可观测、可回溯</span><br>\n        的任务流水线',
      'hero.lede': '<strong>aicode</strong> 是一个轻量级 AI 任务批处理系统。它在 Web 上管理\n        <em>项目</em>、<em>任务分组</em> 与 <em>任务</em>，把「提示词 + 项目目录」组织成任务队列，\n        并行在 <em>codetools</em>（Go 版 opencode 重写）引擎上创建会话、发送提示词，\n        并在浏览器里实时观看 AI 输出，任务完成自动导出 Markdown 会话存档。',
      'hero.cta.primary': '快速开始',
      'hero.cta.features': '浏览功能特性',
      'hero.cta.readme': '项目 README',
      'hero.facts.1': '<b>1</b><span>项目目录 = 1 个独立引擎实例</span>',
      'hero.facts.2': '<b>1</b><span>任务串行（同一时间只跑 1 个）</span>',
      'hero.facts.3': '<b>SSE</b><span>文本 / 工具调用 / 推理过程实时流</span>',
      'hero.window.title': 'aicode · 任务执行',
      'hero.task.running': '生成 API 文档',
      'hero.task.queued': '补充单元测试',
      'hero.task.queued.meta': 'group: 后端',
      'hero.task.done': '重构分块索引',
      'hero.term.prompt': '<span class="t-dim">→</span> prompt 已提交，等待首条回复…',
      'hero.term.read': '<span class="t-accent">⏺</span> 读取 prog/lai_coding/main.go',
      'hero.term.write': '<span class="t-accent">⏺</span> 写入 docs/API文档.md <span class="t-dim">+128 −12</span>',
      'hero.term.ratelimit': '<span class="t-warn">⚠</span> 429 Too Many Requests → 切换备用代理 <span class="t-dim">#2</span>',
      'hero.term.archived': '<span class="t-ok">✓</span> 会话已存档 <span class="t-dim">session/生成API文档.md</span>',

      'stat.1': '同时执行任务数（固定）<br><em>serial = 1</em>',
      'stat.2': '单轮 prompt 工具循环上限<br><em>aicode.max_rounds</em>',
      'stat.3': '限流指数退避重试次数<br><em>retry_backoff = 30s</em>',
      'stat.4': '分钟级限流重试窗口<br><em>单次等待封顶 5m</em>',

      'why.eyebrow': '为什么选择 aicode',
      'why.title': '自托管、可编排、能自愈的 AI 编码平台',
      'why.sub': '云端 IDE、编辑器插件与 CLI Agent 的常见痛点，aicode 逐条给出对策。',
      'why.pains.title': '其他工具的常见弊端',
      'why.pains.1': '成本不可控——订阅 / 按量计费，团队与批量场景费用线性膨胀。',
      'why.pains.2': '代码出境——源码、Git 凭据、内网地址被上传到第三方云端。',
      'why.pains.3': '模型锁定——切换模型 / 供应商要改工作流甚至重新付费。',
      'why.pains.4': '只能交互——一次一个会话，无法把大量「提示词 + 目录」排成队列跑通宵。',
      'why.pains.5': '自愈弱——429 限流、额度用尽、进程卡死、首条超时后往往直接失败。',
      'why.pains.6': '无多用户——单机单人，没有用户隔离、角色、权限与程序化令牌。',
      'why.pains.7': '无代码理解——没有本地代码图谱 / 影响面分析，大项目改动靠全文检索。',
      'why.pains.8': '依赖本机工具链——在容器 / 服务器里编译需自备 Go / Node / Python 环境。',
      'why.pains.9': '无程序化接口——只能人工点界面，难被后台系统或 AI Agent 驱动。',
      'why.pains.10': '不可追溯——输出 / 工具调用 / 推理无完整留痕，问题难复盘。',
      'why.adv.title': 'aicode 的优势',
      'why.adv.1': '完全自托管——单二进制 + 数据目录，源码与凭据不出内网。',
      'why.adv.2': '稳定编排——项目 / 分组 / 任务三层，严格串行，资源不争抢。',
      'why.adv.3': '任务看门狗——卡死检测、自动续推、首条超时、静默宽限。',
      'why.adv.4': '限流自愈——同一会话内指数退避重试，不重发完整提示词。',
      'why.adv.5': '双层代理——备用代理切换 + HTTP 代理池，产出不丢失。',
      'why.adv.6': '实时 + 存档——SSE 实时输出；完成自动导出 Markdown 会话。',
      'why.adv.7': '本地代码图谱——CodeGraph 符号搜索与影响面分析。',
      'why.adv.8': '容器构建——没有工具链也能在一次性容器里编译 / 测试。',
      'why.adv.9': '技能与 MCP——zip 导入导出即时同步，可接技能市场与 MCP。',
      'why.adv.10': '多用户与授权——用户隔离、角色、x-tk 令牌、强制授权。',
      'why.adv.11': '程序化 API——/api/tk/* 全量，供脚本与 AI Skill 调用。',
      'why.adv.12': '运维友好——自更新、集群上报、运行日志与额度统计。',
      'why.cmp.title': '能力对比',
      'why.cmp.head.cap': '能力',
      'why.cmp.head.others': '常见云端 / 插件 / CLI 工具',
      'why.cmp.head.aicode': 'aicode',
      'why.cmp.c1': '部署形态',
      'why.cmp.o1': '云端 SaaS，代码上传第三方',
      'why.cmp.a1': '自托管，单二进制 + 数据目录',
      'why.cmp.c2': '计费',
      'why.cmp.o2': '订阅 / 按量',
      'why.cmp.a2': '自备模型，成本可控',
      'why.cmp.c3': '任务队列 / 串行编排',
      'why.cmp.o3': '一般没有',
      'why.cmp.a3': '项目 / 分组 / 任务，严格串行',
      'why.cmp.c4': '无人值守批处理',
      'why.cmp.o4': '弱',
      'why.cmp.a4': '任务队列 + 看门狗 + 自愈',
      'why.cmp.c5': '限流 / 卡死自愈',
      'why.cmp.o5': '基本没有',
      'why.cmp.a5': '会话内退避重试 + 备用代理切换',
      'why.cmp.c6': '多用户隔离 / 授权',
      'why.cmp.o6': '仅企业版',
      'why.cmp.a6': '内置用户 / 角色 / x-tk / 授权',
      'why.cmp.c7': '代码图谱',
      'why.cmp.o7': '无',
      'why.cmp.a7': '内置 CodeGraph',
      'why.cmp.c8': '容器内编译',
      'why.cmp.o8': '依赖本机',
      'why.cmp.a8': '内置 lin_env / buildenv',
      'why.cmp.c9': '程序化 API',
      'why.cmp.o9': '受限',
      'why.cmp.a9': '全量 /api/tk/*',
      'why.cmp.c10': '会话可追溯',
      'why.cmp.o10': '部分',
      'why.cmp.a10': 'Markdown 会话存档',

      'feat.eyebrow': '功能特性',
      'feat.title': '为「批量驱动 AI 编码」而生的每一块拼图',
      'feat.sub': '从任务编排、引擎实例调度，到实时输出、失败自愈、代码图谱与容器构建，\n        你需要的环节都已经在同一个程序里跑通。',
      'feat.c1.title': '任务编排与串行执行',
      'feat.c1.p': '项目 / 任务分组 / 任务三层对象；按 <code>order</code> 严格串行执行——本版本同一时间\n          只运行 <strong>1</strong> 个任务（并发数不可配置），支持批量操作与任务模板。',
      'feat.c1.t1': '任务 = 标题 + 提示词模板（<code>$TASKDES</code> 代入）',
      'feat.c1.t2': '一个项目目录可关联任意多个任务',
      'feat.c1.t3': '一键「开始执行 / 停止」，逐个会话 <code>abort</code>',
      'feat.c2.title': 'SSE 实时输出',
      'feat.c2.p': '任务运行中打开聊天窗口，通过 SSE 实时查看 AI 的文本、工具调用与推理过程，\n          随时介入继续对话，完成后再自动落盘 Markdown 会话存档。',
      'feat.c2.t1': '每项目目录一个独立引擎实例，同目录任务复用',
      'feat.c2.t2': '卡死检测 / 自动续推 / 活跃静默宽限',
      'feat.c2.t3': '进程安全：只终止自己启动的实例',
      'feat.c3.title': '备用代理自动切换',
      'feat.c3.p': '任务可配置有序「备用代理列表」：主代理命中限流、额度用尽、首条回复超时或流式挂起时\n          <strong>立即</strong>切换下一个，并在<strong>同一会话</strong>续做，已产出内容不丢失。',
      'feat.c3.t1': 'provider 定义启动时合并，切换只 PATCH 会话模型',
      'feat.c3.t2': '全部代理失败再走指数退避兜底',
      'feat.c3.t3': '代理额度统计按实际生效模型记录',
      'feat.c4.title': 'HTTP 代理池与限流重试',
      'feat.c4.p': '「HTTP 代理列表」不切换模型，只把请求经代理列表依次发出；引擎在单次请求命中\n          429/5xx 或网络错误时自动换下一个代理重试，与模型级重试形成双层自愈。',
      'feat.c4.t1': '支持 <code>http://</code> <code>https://</code> <code>socks5://</code>',
      'feat.c4.t2': '限流重试：<code>30s×2ⁿ</code> 指数退避，封顶 5 分钟',
      'feat.c4.t3': '任务列表显示「备用 N」「HTTP 代理 N」徽标',
      'feat.c5.title': '代码图谱 CodeGraph',
      'feat.c5.p': '按「用户 × 项目」独立落盘索引文件与查询库，提供索引后台任务、状态统计、\n          符号搜索、影响面分析与图谱视图，让 AI 与人都能快速定位改动范围。',
      'feat.c5.t1': '<code>/api/codegraph/*</code> 与 <code>/tk</code> 变体',
      'feat.c5.t2': 'jobs 轮询 / 停止 / 删除，索引结果可追溯',
      'feat.c6.title': '容器构建环境',
      'feat.c6.p': '程序部署在容器里、容器内没有编译工具链时，通过 Docker Engine 在一次性容器中执行\n          <code>go build</code> / <code>npm run build</code> / <code>pytest</code>，\n          目录 bind mount 共享，产物自动回落到源码目录。',
      'feat.c6.t1': 'lin_env 环境容器池与 buildenv 快速构建',
      'feat.c6.t2': '增量输出轮询、同步 / 异步执行、产物浏览下载',
      'feat.c7.title': '技能与技能市场',
      'feat.c7.p': '全局技能目录 <code>data/skills/</code>，Web 端 zip 导入 / 导出 / 删除 / 预览，\n          安装或删除即时同步到运行中的引擎实例；可对接 SkillHub 技能市场。',
      'feat.c7.t1': '内置 <code>op-task</code>、<code>container-build</code> 等技能模板',
      'feat.c7.t2': '技能改动无需重启实例',
      'feat.c8.title': '多用户与授权',
      'feat.c8.p': '多用户数据隔离、管理员 / 普通用户角色、登录与授权码保护、<code>x-tk</code>\n          程序化访问令牌，以及不可关闭的强制授权与授权服务器自动激活。',
      'feat.c8.t1': '项目与实例按用户隔离',
      'feat.c8.t2': '授权文件 / 外部授权服务器两种路线',
      'feat.c9.title': '运维与集群',
      'feat.c9.p': '在线自更新（二进制 + Web 静态资源）、集群总后台上报、授权服务器客户机、\n          运行日志与代理额度统计，多节点部署也能统一管理。',
      'feat.c9.t1': '<code>/api/update*</code> 自更新（<code>update_key</code> 鉴权）',
      'feat.c9.t2': '<code>cluster.enabled</code> 状态上报与代理调用',
      'feat.c10.title': '文件浏览与终端',
      'feat.c10.p': '以项目目录为根在线浏览 / 上传 / 下载 / 预览 / 编辑 / 删除文件（服务端防路径穿越），\n          并内置 Web bash 命令终端，运维和调试不必再登服务器。',
      'feat.c10.t1': '<code>shell.enabled</code> 一键开关终端页',
      'feat.c10.t2': 'Monaco 编辑器在线改文件',

      'wf.eyebrow': '工作流程',
      'wf.title': '六步跑完一轮 AI 批量编码',
      'wf.sub': '从建项目到拿到会话存档，全流程都在同一个 Web 控制台里闭环。',
      'wf.s1.title': '建项目',
      'wf.s1.p': '一个项目对应一个磁盘目录；用 Web 表单或 <code>/api/projects</code> 登记目录，并可做目录可用性检查。',
      'wf.s2.title': '建分组与任务',
      'wf.s2.p': '任务分组负责串行编排；任务填写标题与提示词模板，选择项目、分组与执行顺序。',
      'wf.s3.title': '配置 AI 与自愈',
      'wf.s3.p': '选定主代理模型，可选备用代理列表、HTTP 代理列表，以及限流重试与卡死检测参数。',
      'wf.s4.title': '开始执行',
      'wf.s4.p': '点击「开始执行」，系统按并发度调度任务，为每个项目目录拉起独立的 <code>codetools</code> 实例。',
      'wf.s5.title': '实时观看与介入',
      'wf.s5.p': 'SSE 聊天窗口展示文本 / 工具调用 / 推理过程；可随时停下、继续对话或终止生成。',
      'wf.s6.title': '存档与检索',
      'wf.s6.p': '任务完成自动导出 Markdown 会话记录；产出可直接进入 CodeGraph 索引，供后续任务检索复用。',

      'arch.eyebrow': '系统架构',
      'arch.title': '一个二进制，托管整套 AI 任务平台',
      'arch.sub': '后端是 Go 标准库 <code>net/http</code> + 嵌入式 bbolt 单文件数据库；\n        前端 Vue 3 + Vite 构建后由 Go 直接静态托管 —— 部署只需要一个可执行文件与一个数据目录。',
      'arch.frontend': '前端',
      'arch.backend': '后端',
      'arch.storage': '存储',
      'arch.engine': '引擎',
      'arch.chip.monaco': 'Monaco 编辑器',
      'arch.chip.sse': 'SSE 聊天窗口',
      'arch.chip.envrun': '环境容器执行',
      'arch.chip.buildpage': '容器构建页',
      'arch.chip.graphpage': '代码图谱页',
      'arch.chip.nethttp': 'net/http 路由',
      'arch.chip.scheduler': '任务调度器',
      'arch.chip.instmgr': '实例管理',
      'arch.chip.proxy': '代理切换 / 重试',
      'arch.chip.graphsvc': 'CodeGraph 索引服务',
      'arch.chip.cbuild': '容器构建',
      'arch.chip.license': '授权闸门',
      'arch.chip.engine_inst': 'codetools serve（每目录一实例）',
      'arch.chip.docker': 'Docker 一次性容器',
      'arch.chip.proxypool': '代理池 / RetryTransport',
      'arch.ports.title': '端口规划',
      'arch.ports.default': '默认服务',
      'arch.ports.task': '任务实例',
      'arch.tree.title': '程序目录（exedir）',
      'arch.tree.code': 'exedir/\n├── aicode(.exe)       后端可执行程序\n├── static/            前端静态资源\n└── data/\n    ├── bin/codetools  AI 引擎\n    ├── cfg/cfg.yaml   配置（自动生成）\n    ├── aicfg/         .env / .jsonc 环境\n    ├── skills/        全局技能\n    ├── log/           运行日志\n    ├── task/ session/ 会话存档\n    └── tasks.db       bbolt 数据库',

      'qs.eyebrow': '快速开始',
      'qs.title': '三步启动，十分钟上手',
      'qs.sub': '源码构建脚本、直接运行、或者用容器环境编译 —— 挑你顺手的那条路。',
      'qs.tablist': '快速开始示例',
      'qs.tab.build': '源码构建',
      'qs.tab.run': '启动与访问',
      'qs.tab.curl': 'curl 快速体验',
      'qs.tab.container': '容器内构建',
      'qs.code.build': '<span class="c"># 依赖：Go ≥ 1.23；构建前端需 Node ≥ 18</span>\n<span class="c"># Linux / macOS</span>\n./script/setup.sh\n\n<span class="c"># Windows</span>\nscript/setup.bat\n\n<span class="c"># 或者一键构建（自动注入编译版本信息）</span>\nsh ./bld.sh            <span class="c"># 产物到 exe/</span>\ncd prog &amp;&amp; sh bld.sh    <span class="c"># 产物到 prog/exe/</span>',
      'qs.code.run': '<span class="c"># 启动（Windows 为 aicode.exe；Linux/macOS 为 aicode）</span>\ncd prog/exe &amp;&amp; ./aicode.exe\n\n<span class="c"># 浏览器打开控制台</span>\nhttp://127.0.0.1:8090\n\n<span class="c"># 首次启动自动生成 data/cfg/cfg.yaml，可改端口 / 授权码 /</span>\n<span class="c"># aicode.base_port 等；前端开发模式（热更新）：</span>\ncd prog/lai_coding_web &amp;&amp; npm run dev   <span class="c"># 默认 3000，/api 代理到 8090</span>',
      'qs.code.curl': String.raw`<span class="c"># 创建项目</span>
curl -X POST http://127.0.0.1:8090/api/projects \
  -H <span class="s">"Content-Type: application/json"</span> \
  -d <span class="s">'{"name":"myapp","directory":"/path/to/myapp"}'</span>

<span class="c"># 创建任务（关联项目，可多个任务指向同一项目）</span>
curl -X POST http://127.0.0.1:8090/api/tasks \
  -H <span class="s">"Content-Type: application/json"</span> \
  -d <span class="s">'{"title":"生成 API 文档","prompt":"请为 backend 包生成 README",</span>
<span class="s">       "project_id":"project_xxx","order":1}'</span>

<span class="c"># 串行执行 / 只跑某个分组 / 查看状态</span>
curl -X POST http://127.0.0.1:8090/api/tasks/run
curl -X POST http://127.0.0.1:8090/api/groups/group_xxx/run
curl http://127.0.0.1:8090/api/tasks/status`,
      'qs.code.container': String.raw`<span class="c"># 程序跑在容器里、容器没有 Go/Node 工具链时：</span>
<span class="c"># 走后台容器环境执行编译（container-build 技能）</span>
TK=<span class="s">"&lt;程序化访问令牌&gt;"</span>
BASE=<span class="s">"http://127.0.0.1:8090"</span>

<span class="c"># 在 auto-go 环境里构建（产物写 /out，即落在源码目录）</span>
curl -s -X POST -H <span class="s">"x-tk: $TK"</span> -H <span class="s">"Content-Type: application/json"</span> \
  -d <span class="s">'{"env_id":"auto-go","directory":"/work/myproj",</span>
<span class="s">       "command":"go build -o /out/app ."}'</span> \
  <span class="s">"$BASE/api/tk/linenv/runs?sync=1"</span>

<span class="c"># 长任务异步提交后轮询增量输出 / 取产物</span>
curl -s -H <span class="s">"x-tk: $TK"</span> <span class="s">"$BASE/api/tk/linenv/runs/$RUN_ID?since=0"</span>
curl -s -H <span class="s">"x-tk: $TK"</span> <span class="s">"$BASE/api/tk/linenv/artifacts?path=build"</span>`,
      'qs.note.env.title': '建议的运行环境',
      'qs.note.env.t1': 'Go ≥ 1.23（后端）/ Node ≥ 18（仅前端构建）',
      'qs.note.env.t2': '引擎 <code>codetools</code> 放到 <code>exe/data/bin/codetools</code>',
      'qs.note.env.t3': '可选：Docker Engine（容器构建 / 打包 / 测试）',
      'qs.note.api.title': '程序化访问',
      'qs.note.api.t1': '第三方脚本 / AI Skill 走 <code>/api/tk/*</code> + <code>x-tk</code> 头',
      'qs.note.api.t2': '令牌：Web「设置 → Web 访问鉴权 → 程序化访问令牌」',
      'qs.note.api.t3': '配套 Skill：<code>op-task</code>、<code>container-build</code>',

      'api.eyebrow': 'HTTP API',
      'api.title': '从 Web 控制台到自动化脚本，都是同一套接口',
      'api.sub': '全部接口遵循统一的前缀与错误结构；<code>/api/tk/*</code> 为程序化访问变体，\n        以 <code>x-tk</code> 令牌鉴权，供脚本与 AI Skill 调用。',
      'api.core.title': '核心',
      'api.core.tasks': '任务管理 / 执行 / 停止 / 输出',
      'api.core.projects': '项目与目录检查',
      'api.core.groups': '任务分组（串行编排）',
      'api.core.templates': '提示词模板',
      'api.core.modelconfigs': '模型配置（数据库）',
      'api.core.usermodels': '用户模型配置',
      'api.core.aicfg': 'AI 环境（.env / .jsonc）',
      'api.linenv.title': '环境容器（构建 / 打包 / 测试）',
      'api.linenv.def': '环境定义与预置模板',
      'api.linenv.runs': '容器内执行命令（同步 / 异步）',
      'api.linenv.artifacts': '产物浏览与下载',
      'api.linenv.buildenv': '容器构建环境（兼容入口）',
      'api.graph.title': '代码图谱',
      'api.graph.index': '建立索引（后台任务）',
      'api.graph.jobs': '任务轮询 / 停止 / 删除',
      'api.graph.status': '索引状态与统计',
      'api.graph.search': '符号搜索',
      'api.graph.impact': '影响面分析',
      'api.graph.view': '图谱视图数据',
      'api.graph.file': '文件 / 源码',
      'api.graph.tk': '程序化变体',
      'api.ops.title': '运维 / 程序化',
      'api.ops.linenv': '容器环境池（构建 / 测试）',
      'api.ops.runs': '提交执行 + 轮询输出',
      'api.ops.buildenv': '快速一次性构建',
      'api.ops.skills': '技能导入 / 导出 / 预览',
      'api.ops.skillhub': '技能市场搜索 / 安装',
      'api.ops.update': '在线自更新',
      'api.ops.runslist': '执行记录与输出',
      'api.ops.tk': 'tk 令牌鉴权的全部接口',

      'faq.eyebrow': '常见问题',
      'faq.title': '上手前最常被问到的几件事',
      'faq.q1': '多个任务指向同一个项目目录会互相干扰吗？',
      'faq.a1': '不会。同一个目录的任务<strong>共享同一个引擎实例</strong>（复用端口），\n          不同目录各自启动独立实例；调度上严格串行——本版本同一时间只运行 <strong>1</strong> 个\n          任务（并发度固定为 1，不可配置）。',
      'faq.q2': '模型限流（HTTP 429 / FreeUsageLimitError）会直接让任务失败吗？',
      'faq.a2': '默认不会。命中限流时会在<strong>同一会话</strong>内按指数退避重发一条简短系统提醒续做：\n          间隔 <code>retry_backoff × 2ⁿ</code>（默认 30s 起步，单次封顶 5 分钟），\n          最多 <code>retry_count</code> 次（默认 8，硬上限 12，总窗口约 27 分钟）。\n          若配置了备用代理列表，还会先立即切换到下一个代理。',
      'faq.q3': '「备用代理列表」和「HTTP 代理列表」有什么区别？',
      'faq.a3': '备用代理列表切换的是<strong>模型 / 代理提供方</strong>（主代理不可用时换下一个模型配置）；\n          HTTP 代理列表<strong>不换模型</strong>，只是把请求经不同正向代理发出，\n          命中限流或网络错误时由引擎自动换下一个代理重试。',
      'faq.q4': '程序部署在容器里、容器没有 Go/Node，怎么编译项目？',
      'faq.a4': '启用容器构建能力后，通过后台的 <code>/api/tk/linenv/runs</code> 在预置环境容器\n          （auto-go / auto-node / auto-python-pytest …）里执行编译测试命令：\n          项目目录 bind mount 进容器，产物写 <code>/out</code> 即回落到源码目录，\n          支持同步取全文或异步轮询增量输出，并可经 artifacts 接口浏览下载。',
      'faq.q5': '本宣传页需要构建吗？',
      'faq.a5': '不需要。 <code>prog/webset/</code> 是零依赖的纯静态站点（HTML + CSS + 原生 JS），\n          直接用浏览器打开 <code>index.html</code> 即可，也可以放进任意 Web 服务器或\n          本程序 <code>static/</code> 目录下托管。',
      'faq.q6': '强制授权可以关闭吗？',
      'faq.a6': '不可以。未安装有效授权文件（<code>data/license.key</code>）时业务功能锁定、前端显示激活界面。\n          激活方式二选一：传统独立授权文件流程，或配置授权服务器自动激活。',
      'faq.q7': 'aicode 和 Cursor / Copilot / Claude Code 有什么不同？',
      'faq.a7': '最大区别是<strong>自托管、可编排、能自愈</strong>：aicode 部署在你自己的机器上，源码与凭据不出内网；把「提示词 + 项目目录」组织成任务队列无人值守跑批；遇到限流 / 卡死会自动重试续做。它还内置多用户隔离、代码图谱、容器构建与 <code>/api/tk/*</code> 程序化接口——这些通常是云端 IDE 或编辑器插件不具备的。',

      'docs.eyebrow': '文档导航',
      'docs.title': '继续深入了解',
      'docs.readme.p': '项目总览、功能特性与快速开始',
      'docs.agents.p': '面向 AI 协作的开发约定与能力清单',
      'docs.changelog.p': '按时间线整理的详细变更记录',
      'docs.changes.p': '每次任务完成后的原子提交索引',
      'docs.opencodeapi.p': 'OpenCode Zen / 引擎接口适配说明',
      'docs.linenv.title': '环境容器文档',
      'docs.linenv.p': '容器构建 / 打包 / 测试与产物说明',
      'docs.optask.p': '程序化任务 API（<code>x-tk</code> 鉴权）',
      'docs.site.title': '本站说明',
      'docs.site.p': '宣传页结构、交互与维护约定',

      'footer.tag': 'Go + Vue 3 的轻量级 AI 任务批处理系统',
      'footer.copyright': '本站点为项目宣传页 · 静态资源零依赖 · 可直接打开或托管'
    },

    en: {
      'meta.title': 'aicode · AI Task Batch System',
      'meta.description': 'aicode — a lightweight AI task batch system on Go + Vue 3: projects, serial task scheduling, codetools engine instances, real-time SSE output, automatic multi-proxy failover, code graph and container builds.',
      'meta.keywords': 'aicode,AI task batch,codetools,opencode,Go,Vue3,code graph,container build',
      'meta.author': 'aicode',
      'meta.ogtitle': 'aicode · AI Task Batch System',
      'meta.ogdesc': 'Turn “prompt + project directory” into an orchestrated task queue (serial), watch AI output live and auto-archive sessions.',

      'lang.title': 'Switch language: 中文 / English',

      'a11y.skip': 'Skip to main content',
      'a11y.theme': 'Toggle light / dark theme',
      'a11y.themeAria': 'Toggle theme',
      'a11y.menuOpen': 'Open menu',
      'a11y.menuClose': 'Close menu',
      'a11y.top': 'Back to top',

      'brand.home': 'aicode home',
      'nav.aria': 'Main navigation',
      'nav.features': 'Features',
      'nav.workflow': 'Workflow',
      'nav.architecture': 'Architecture',
      'nav.quickstart': 'Quick Start',
      'nav.api': 'API',
      'nav.faq': 'FAQ',
      'nav.cta': 'Get Started',
      'nav.docs': 'Docs',
      'nav.why': 'Why aicode',
      'footer.nav': 'Footer navigation',

      'hero.title': 'Turn AI coding into<br>\n        <span class="grad">orchestrated, observable, traceable</span><br>\n        task pipelines',
      'hero.lede': '<strong>aicode</strong> is a lightweight AI task batch system. It manages <em>projects</em>,\n        <em>task groups</em> and <em>tasks</em> on the web, turning “prompt + project directory” into a task queue,\n        creating sessions and sending prompts on the <em>codetools</em> (Go rewrite of opencode) engine,\n        streaming AI output live in the browser, and auto-exporting Markdown session archives when tasks finish.',
      'hero.cta.primary': 'Get Started',
      'hero.cta.features': 'Browse Features',
      'hero.cta.readme': 'Project README',
      'hero.facts.1': '<b>1</b><span>Project dir = 1 dedicated engine instance</span>',
      'hero.facts.2': '<b>1</b><span>Tasks run serially (one at a time)</span>',
      'hero.facts.3': '<b>SSE</b><span>Live stream of text / tool calls / reasoning</span>',
      'hero.window.title': 'aicode · Task execution',
      'hero.task.running': 'Generate API docs',
      'hero.task.queued': 'Add unit tests',
      'hero.task.queued.meta': 'group: backend',
      'hero.task.done': 'Refactor chunk index',
      'hero.term.prompt': '<span class="t-dim">→</span> prompt submitted, waiting for first reply…',
      'hero.term.read': '<span class="t-accent">⏺</span> Reading prog/lai_coding/main.go',
      'hero.term.write': '<span class="t-accent">⏺</span> Writing docs/API文档.md <span class="t-dim">+128 −12</span>',
      'hero.term.ratelimit': '<span class="t-warn">⚠</span> 429 Too Many Requests → switching backup proxy <span class="t-dim">#2</span>',
      'hero.term.archived': '<span class="t-ok">✓</span> session archived <span class="t-dim">session/生成API文档.md</span>',

      'stat.1': 'Concurrent tasks (fixed)<br><em>serial = 1</em>',
      'stat.2': 'Tool-loop cap per prompt round<br><em>aicode.max_rounds</em>',
      'stat.3': 'Rate-limit backoff retries<br><em>retry_backoff = 30s</em>',
      'stat.4': 'Rate-limit retry window<br><em>single wait capped at 5m</em>',

      'why.eyebrow': 'Why aicode',
      'why.title': 'Self-hosted, orchestrated and self-healing AI coding',
      'why.sub': 'The pain points of cloud IDEs, editor extensions and CLI agents — and how aicode answers each.',
      'why.pains.title': 'Common drawbacks of other tools',
      'why.pains.1': 'Uncontrollable cost — subscription / usage-based billing balloons for teams and batch jobs.',
      'why.pains.2': 'Code leaves your network — source, Git credentials and internal addresses uploaded to third-party clouds.',
      'why.pains.3': 'Model lock-in — switching model / provider means reworking the workflow or paying again.',
      'why.pains.4': 'Interactive only — one session at a time; you cannot queue many “prompt + directory” jobs to run overnight.',
      'why.pains.5': 'Weak self-healing — 429 limits, exhausted quota, stalled processes or first-reply timeouts usually just fail the run.',
      'why.pains.6': 'No multi-user — single machine, single user; no isolation, roles, permissions or programmatic tokens.',
      'why.pains.7': 'No code understanding — no local code graph or impact analysis; large changes rely on full-text search.',
      'why.pains.8': 'Depends on the host toolchain — compiling in a container / server needs your own Go / Node / Python setup.',
      'why.pains.9': 'No programmatic API — everything is clicked by hand; hard for backends or AI agents to drive it.',
      'why.pains.10': 'Not traceable — output, tool calls and reasoning are not fully logged, so post-mortems are hard.',
      'why.adv.title': 'What aicode gives you',
      'why.adv.1': 'Fully self-hosted — one binary + one data directory; source and credentials never leave your network.',
      'why.adv.2': 'Stable orchestration — project / group / task in three levels, strictly serial, no resource contention.',
      'why.adv.3': 'Task watchdog — stuck detection, auto-continue, first-reply timeout and activity-silence grace.',
      'why.adv.4': 'Rate-limit healing — exponential backoff retry inside the same session, no full-prompt resend.',
      'why.adv.5': 'Two-layer proxies — backup-proxy failover + HTTP proxy pool, without losing output.',
      'why.adv.6': 'Live + archived — SSE real-time output; finished tasks auto-export Markdown sessions.',
      'why.adv.7': 'Local code graph — CodeGraph symbol search and impact analysis.',
      'why.adv.8': 'Container builds — build / test in one-shot containers even with no toolchain.',
      'why.adv.9': 'Skills & MCP — zip import / export synced instantly; connect the skill marketplace and MCP tools.',
      'why.adv.10': 'Multi-user & licensing — user isolation, roles, x-tk tokens, mandatory licensing.',
      'why.adv.11': 'Programmatic API — full /api/tk/* for scripts and AI skills.',
      'why.adv.12': 'Ops-friendly — self-update, cluster reporting, run logs and quota stats.',
      'why.cmp.title': 'Capability comparison',
      'why.cmp.head.cap': 'Capability',
      'why.cmp.head.others': 'Typical cloud / extension / CLI tools',
      'why.cmp.head.aicode': 'aicode',
      'why.cmp.c1': 'Deployment',
      'why.cmp.o1': 'Cloud SaaS; code uploaded to a third party',
      'why.cmp.a1': 'Self-hosted, single binary + data dir',
      'why.cmp.c2': 'Billing',
      'why.cmp.o2': 'Subscription / usage-based',
      'why.cmp.a2': 'Bring your own model, controllable cost',
      'why.cmp.c3': 'Task queue / serial orchestration',
      'why.cmp.o3': 'Usually none',
      'why.cmp.a3': 'Project / group / task, strictly serial',
      'why.cmp.c4': 'Unattended batch runs',
      'why.cmp.o4': 'Weak',
      'why.cmp.a4': 'Queue + watchdog + self-healing',
      'why.cmp.c5': 'Rate-limit / stuck self-healing',
      'why.cmp.o5': 'Basically none',
      'why.cmp.a5': 'In-session backoff retry + backup-proxy failover',
      'why.cmp.c6': 'Multi-user isolation / licensing',
      'why.cmp.o6': 'Enterprise plan only',
      'why.cmp.a6': 'Built-in users / roles / x-tk / licensing',
      'why.cmp.c7': 'Code graph',
      'why.cmp.o7': 'None',
      'why.cmp.a7': 'Built-in CodeGraph',
      'why.cmp.c8': 'In-container build',
      'why.cmp.o8': 'Depends on host',
      'why.cmp.a8': 'Built-in lin_env / buildenv',
      'why.cmp.c9': 'Programmatic API',
      'why.cmp.o9': 'Limited',
      'why.cmp.a9': 'Full /api/tk/*',
      'why.cmp.c10': 'Traceable sessions',
      'why.cmp.o10': 'Partial',
      'why.cmp.a10': 'Markdown session archive',

      'feat.eyebrow': 'Features',
      'feat.title': 'Every piece you need to batch-drive AI coding',
      'feat.sub': 'From task orchestration and engine scheduling to live output, failure self-healing,\n        code graph and container builds — every step already runs in one program.',
      'feat.c1.title': 'Task orchestration & serial execution',
      'feat.c1.p': 'Three-level objects: project / task group / task; executed strictly serially by <code>order</code> —\n          this version runs only <strong>1</strong> task at a time (concurrency is not configurable), with batch operations and task templates.',
      'feat.c1.t1': 'Task = title + prompt template (<code>$TASKDES</code> substituted)',
      'feat.c1.t2': 'A project directory can link any number of tasks',
      'feat.c1.t3': 'One-click “Start / Stop”, per-session <code>abort</code>',
      'feat.c2.title': 'SSE real-time output',
      'feat.c2.p': 'Open the chat window while a task runs to watch the AI’s text, tool calls and reasoning over SSE in real time;\n          step in to keep the conversation going, then auto-save a Markdown session archive on completion.',
      'feat.c2.t1': 'One engine instance per project dir; same-dir tasks reuse it',
      'feat.c2.t2': 'Stuck detection / auto-continue / activity-silence grace',
      'feat.c2.t3': 'Process safety: only terminates instances it started',
      'feat.c3.title': 'Automatic backup-proxy failover',
      'feat.c3.p': 'Tasks can define an ordered “backup proxy list”: when the primary hits rate limits, runs out of quota,\n          times out on the first reply or stalls mid-stream, it switches to the next <strong>immediately</strong>\n          and continues in the <strong>same session</strong>, so nothing already produced is lost.',
      'feat.c3.t1': 'Providers merged at startup; switching only PATCHes the session model',
      'feat.c3.t2': 'Falls back to exponential backoff when all proxies fail',
      'feat.c3.t3': 'Proxy quota stats recorded by the model actually in effect',
      'feat.c4.title': 'HTTP proxy pool & rate-limit retry',
      'feat.c4.p': 'The “HTTP proxy list” does not switch models — it just sends requests through the proxies in order;\n          when a single request hits 429/5xx or a network error the engine retries with the next proxy,\n          forming two layers of self-healing with model-level retries.',
      'feat.c4.t1': 'Supports <code>http://</code> <code>https://</code> <code>socks5://</code>',
      'feat.c4.t2': 'Rate-limit retry: <code>30s×2ⁿ</code> exponential backoff, capped at 5 minutes',
      'feat.c4.t3': 'Task list shows “backup N” / “HTTP proxy N” badges',
      'feat.c5.title': 'Code graph (CodeGraph)',
      'feat.c5.p': 'Per user × project index files and query store; background indexing jobs, status stats,\n          symbol search, impact analysis and a graph view let both AI and humans locate change scope fast.',
      'feat.c5.t1': '<code>/api/codegraph/*</code> and the <code>/tk</code> variant',
      'feat.c5.t2': 'Poll / stop / delete jobs; index results are traceable',
      'feat.c6.title': 'Container build environment',
      'feat.c6.p': 'When the program runs in a container without a toolchain, it executes <code>go build</code> /\n          <code>npm run build</code> / <code>pytest</code> in one-shot containers via Docker Engine,\n          sharing the directory via bind mount and writing artifacts back to the source dir.',
      'feat.c6.t1': 'lin_env container pool and buildenv quick builds',
      'feat.c6.t2': 'Incremental output polling, sync / async runs, artifact browsing &amp; download',
      'feat.c7.title': 'Skills & skill marketplace',
      'feat.c7.p': 'A global skill directory <code>data/skills/</code>; import / export / delete / preview zips in the web UI,\n          with installs and removals synced to running engine instances instantly; can connect to the SkillHub marketplace.',
      'feat.c7.t1': 'Built-in skill templates like <code>op-task</code> and <code>container-build</code>',
      'feat.c7.t2': 'Skill changes need no instance restart',
      'feat.c8.title': 'Multi-user & licensing',
      'feat.c8.p': 'Multi-user data isolation, admin / regular-user roles, login and auth-code protection,\n          <code>x-tk</code> programmatic tokens, plus non-disableable mandatory licensing and license-server auto-activation.',
      'feat.c8.t1': 'Projects and instances isolated per user',
      'feat.c8.t2': 'Two paths: license file or external license server',
      'feat.c9.title': 'Operations & cluster',
      'feat.c9.p': 'Online self-update (binary + web static assets), cluster master reporting, license-server client,\n          run logs and proxy quota stats — multi-node deployments stay centrally managed.',
      'feat.c9.t1': '<code>/api/update*</code> self-update (<code>update_key</code> auth)',
      'feat.c9.t2': '<code>cluster.enabled</code> status reporting and proxy calls',
      'feat.c10.title': 'File browser & terminal',
      'feat.c10.p': 'Browse / upload / download / preview / edit / delete files from the project directory root (server guards against path traversal),\n          with a built-in web bash terminal so you need not SSH in for ops and debugging.',
      'feat.c10.t1': '<code>shell.enabled</code> toggles the terminal page',
      'feat.c10.t2': 'Edit files online with the Monaco editor',

      'wf.eyebrow': 'Workflow',
      'wf.title': 'Six steps to complete one round of batch AI coding',
      'wf.sub': 'From creating a project to getting the session archive, the whole flow closes the loop in one web console.',
      'wf.s1.title': 'Create a project',
      'wf.s1.p': 'One project maps to one disk directory; register it via the web form or <code>/api/projects</code>, with a directory availability check.',
      'wf.s2.title': 'Create groups & tasks',
      'wf.s2.p': 'Task groups handle serial orchestration; a task takes a title and prompt template and picks its project, group and execution order.',
      'wf.s3.title': 'Configure AI & self-healing',
      'wf.s3.p': 'Pick the primary proxy model, optionally a backup proxy list and HTTP proxy list, plus rate-limit retry and stuck-detection parameters.',
      'wf.s4.title': 'Start running',
      'wf.s4.p': 'Click “Start”: the system schedules tasks by concurrency and spins up a dedicated <code>codetools</code> instance per project directory.',
      'wf.s5.title': 'Watch & intervene live',
      'wf.s5.p': 'The SSE chat window shows text / tool calls / reasoning; pause, continue the conversation or stop generation at any time.',
      'wf.s6.title': 'Archive & search',
      'wf.s6.p': 'Finished tasks auto-export Markdown session logs; results can feed the CodeGraph index for later tasks to reuse.',

      'arch.eyebrow': 'Architecture',
      'arch.title': 'One binary hosts the whole AI task platform',
      'arch.sub': 'The backend is Go’s standard <code>net/http</code> plus an embedded single-file bbolt database;\n        the Vue 3 + Vite frontend is built and served statically by Go — deployment needs just one executable and one data directory.',
      'arch.frontend': 'Frontend',
      'arch.backend': 'Backend',
      'arch.storage': 'Storage',
      'arch.engine': 'Engine',
      'arch.chip.monaco': 'Monaco editor',
      'arch.chip.sse': 'SSE chat window',
      'arch.chip.envrun': 'Env container runs',
      'arch.chip.buildpage': 'Container build page',
      'arch.chip.graphpage': 'Code graph page',
      'arch.chip.nethttp': 'net/http routing',
      'arch.chip.scheduler': 'Task scheduler',
      'arch.chip.instmgr': 'Instance manager',
      'arch.chip.proxy': 'Proxy switching / retry',
      'arch.chip.graphsvc': 'CodeGraph index service',
      'arch.chip.cbuild': 'Container build',
      'arch.chip.license': 'License gate',
      'arch.chip.engine_inst': 'codetools serve (one instance per dir)',
      'arch.chip.docker': 'Docker one-shot container',
      'arch.chip.proxypool': 'Proxy pool / RetryTransport',
      'arch.ports.title': 'Port plan',
      'arch.ports.default': 'Default service',
      'arch.ports.task': 'Task instances',
      'arch.tree.title': 'Program directory (exedir)',
      'arch.tree.code': 'exedir/\n├── aicode(.exe)       backend executable\n├── static/            frontend static assets\n└── data/\n    ├── bin/codetools  AI engine\n    ├── cfg/cfg.yaml   config (auto-generated)\n    ├── aicfg/         .env / .jsonc env\n    ├── skills/        global skills\n    ├── log/           run logs\n    ├── task/ session/ session archives\n    └── tasks.db       bbolt database',

      'qs.eyebrow': 'Quick Start',
      'qs.title': 'Start in three steps, up and running in ten minutes',
      'qs.sub': 'Build from source, run directly, or compile in a container env — pick whichever suits you.',
      'qs.tablist': 'Quick start examples',
      'qs.tab.build': 'Build from source',
      'qs.tab.run': 'Run & access',
      'qs.tab.curl': 'curl quick try',
      'qs.tab.container': 'Build in container',
      'qs.code.build': '<span class="c"># Requirements: Go ≥ 1.23; Node ≥ 18 to build the frontend</span>\n<span class="c"># Linux / macOS</span>\n./script/setup.sh\n\n<span class="c"># Windows</span>\nscript/setup.bat\n\n<span class="c"># Or one-shot build (auto-injects version info)</span>\nsh ./bld.sh            <span class="c"># output to exe/</span>\ncd prog &amp;&amp; sh bld.sh    <span class="c"># output to prog/exe/</span>',
      'qs.code.run': '<span class="c"># Start (aicode.exe on Windows; aicode on Linux/macOS)</span>\ncd prog/exe &amp;&amp; ./aicode.exe\n\n<span class="c"># Open the console in a browser</span>\nhttp://127.0.0.1:8090\n\n<span class="c"># First start auto-generates data/cfg/cfg.yaml; edit port / auth code /</span>\n<span class="c"># aicode.base_port etc. Frontend dev mode (hot reload):</span>\ncd prog/lai_coding_web &amp;&amp; npm run dev   <span class="c"># default 3000, /api proxied to 8090</span>',
      'qs.code.curl': String.raw`<span class="c"># Create a project</span>
curl -X POST http://127.0.0.1:8090/api/projects \
  -H <span class="s">"Content-Type: application/json"</span> \
  -d <span class="s">'{"name":"myapp","directory":"/path/to/myapp"}'</span>

<span class="c"># Create a task (link a project; many tasks can point to one project)</span>
curl -X POST http://127.0.0.1:8090/api/tasks \
  -H <span class="s">"Content-Type: application/json"</span> \
  -d <span class="s">'{"title":"Generate API docs","prompt":"Write a README for the backend package",</span>
<span class="s">       "project_id":"project_xxx","order":1}'</span>

<span class="c"># Run serially / run one group / check status</span>
curl -X POST http://127.0.0.1:8090/api/tasks/run
curl -X POST http://127.0.0.1:8090/api/groups/group_xxx/run
curl http://127.0.0.1:8090/api/tasks/status`,
      'qs.code.container': String.raw`<span class="c"># When the program runs in a container that has no Go/Node toolchain:</span>
<span class="c"># compile via the backend container env (container-build skill)</span>
TK=<span class="s">"&lt;programmatic access token&gt;"</span>
BASE=<span class="s">"http://127.0.0.1:8090"</span>

<span class="c"># Build in the auto-go env (artifacts go to /out, i.e. the source dir)</span>
curl -s -X POST -H <span class="s">"x-tk: $TK"</span> -H <span class="s">"Content-Type: application/json"</span> \
  -d <span class="s">'{"env_id":"auto-go","directory":"/work/myproj",</span>
<span class="s">       "command":"go build -o /out/app ."}'</span> \
  <span class="s">"$BASE/api/tk/linenv/runs?sync=1"</span>

<span class="c"># Long tasks: submit async, then poll incremental output / fetch artifacts</span>
curl -s -H <span class="s">"x-tk: $TK"</span> <span class="s">"$BASE/api/tk/linenv/runs/$RUN_ID?since=0"</span>
curl -s -H <span class="s">"x-tk: $TK"</span> <span class="s">"$BASE/api/tk/linenv/artifacts?path=build"</span>`,
      'qs.note.env.title': 'Recommended runtime',
      'qs.note.env.t1': 'Go ≥ 1.23 (backend) / Node ≥ 18 (frontend build only)',
      'qs.note.env.t2': 'Place the <code>codetools</code> engine at <code>exe/data/bin/codetools</code>',
      'qs.note.env.t3': 'Optional: Docker Engine (container build / pack / test)',
      'qs.note.api.title': 'Programmatic access',
      'qs.note.api.t1': 'Third-party scripts / AI skills use <code>/api/tk/*</code> + the <code>x-tk</code> header',
      'qs.note.api.t2': 'Token: Web “Settings → Web auth → Programmatic access token”',
      'qs.note.api.t3': 'Companion skills: <code>op-task</code>, <code>container-build</code>',

      'api.eyebrow': 'HTTP API',
      'api.title': 'One API set from web console to automation scripts',
      'api.sub': 'All endpoints share a unified prefix and error shape; <code>/api/tk/*</code> is the programmatic variant,\n        authenticated by the <code>x-tk</code> token, for scripts and AI skills.',
      'api.core.title': 'Core',
      'api.core.tasks': 'Task management / run / stop / output',
      'api.core.projects': 'Projects and directory checks',
      'api.core.groups': 'Task groups (serial orchestration)',
      'api.core.templates': 'Prompt templates',
      'api.core.modelconfigs': 'Model configs (database)',
      'api.core.usermodels': 'Per-user model configs',
      'api.core.aicfg': 'AI env (.env / .jsonc)',
      'api.linenv.title': 'Env containers (build / pack / test)',
      'api.linenv.def': 'Env definitions and presets',
      'api.linenv.runs': 'Run commands in containers (sync / async)',
      'api.linenv.artifacts': 'Artifact browsing & download',
      'api.linenv.buildenv': 'Container build env (compat entry)',
      'api.graph.title': 'Code graph',
      'api.graph.index': 'Build index (background job)',
      'api.graph.jobs': 'Poll / stop / delete jobs',
      'api.graph.status': 'Index status & stats',
      'api.graph.search': 'Symbol search',
      'api.graph.impact': 'Impact analysis',
      'api.graph.view': 'Graph view data',
      'api.graph.file': 'File / source',
      'api.graph.tk': 'Programmatic variant',
      'api.ops.title': 'Ops / programmatic',
      'api.ops.linenv': 'Container env pool (build / test)',
      'api.ops.runs': 'Submit runs + poll output',
      'api.ops.buildenv': 'Quick one-shot build',
      'api.ops.skills': 'Skill import / export / preview',
      'api.ops.skillhub': 'Marketplace search / install',
      'api.ops.update': 'Online self-update',
      'api.ops.runslist': 'Run records & output',
      'api.ops.tk': 'All endpoints with tk token auth',

      'faq.eyebrow': 'FAQ',
      'faq.title': 'A few things people ask before starting',
      'faq.q1': 'Will multiple tasks pointing at the same project directory interfere with each other?',
      'faq.a1': 'No. Tasks in the same directory <strong>share one engine instance</strong> (reusing its port), while different\n          directories each start their own; scheduling is strictly serial — this version runs only <strong>1</strong> task at a\n          time (concurrency fixed at 1, not configurable).',
      'faq.q2': 'Do model rate limits (HTTP 429 / FreeUsageLimitError) fail the task outright?',
      'faq.a2': 'By default, no. On a rate limit it re-sends a short system nudge in the <strong>same session</strong> with exponential\n          backoff to continue: interval <code>retry_backoff × 2ⁿ</code> (starts at 30s, capped at 5 minutes per wait),\n          up to <code>retry_count</code> times (default 8, hard cap 12, ~27 minutes total window).\n          If a backup proxy list is set, it first switches to the next proxy immediately.',
      'faq.q3': 'What is the difference between the “backup proxy list” and the “HTTP proxy list”?',
      'faq.a3': 'The backup proxy list switches the <strong>model / provider</strong> (moves to the next model config when the primary\n          is unavailable); the HTTP proxy list <strong>does not change the model</strong> — it merely sends requests through different\n          forward proxies, and the engine retries with the next proxy on a rate limit or network error.',
      'faq.q4': 'The program runs in a container without Go/Node — how do I compile projects?',
      'faq.a4': 'With container builds enabled, run compile/test commands via <code>/api/tk/linenv/runs</code> in preset env containers\n          (auto-go / auto-node / auto-python-pytest …): the project dir is bind-mounted into the container and artifacts\n          written to <code>/out</code> land back in the source dir, with sync full output or async incremental polling,\n          and browsing/download via the artifacts API.',
      'faq.q5': 'Does this landing page need a build step?',
      'faq.a5': 'No. <code>prog/webset/</code> is a zero-dependency pure static site (HTML + CSS + vanilla JS);\n          just open <code>index.html</code> in a browser, or host it on any web server or under this program’s\n          <code>static/</code> directory.',
      'faq.q6': 'Can mandatory licensing be turned off?',
      'faq.a6': 'No. Without a valid license file (<code>data/license.key</code>) business features are locked and the frontend shows the\n          activation screen. Activate either by the classic standalone license-file flow or by configuring a license server\n          for auto-activation.',
      'faq.q7': 'How is aicode different from Cursor / Copilot / Claude Code?',
      'faq.a7': 'The main differences are <strong>self-hosting, orchestration and self-healing</strong>: aicode runs on your own machine so\n          source and credentials never leave your network; it turns “prompt + project directory” into an unattended task queue; and it\n          retries / resumes automatically on rate limits or stalls. It also ships multi-user isolation, a code graph, container builds and\n          the <code>/api/tk/*</code> programmatic API — things cloud IDEs or editor extensions typically lack.',

      'docs.eyebrow': 'Documentation',
      'docs.title': 'Dive deeper',
      'docs.readme.p': 'Project overview, features and quick start',
      'docs.agents.p': 'Dev conventions and capability list for AI collaboration',
      'docs.changelog.p': 'Detailed change log in timeline order',
      'docs.changes.p': 'Index of atomic commits after each task',
      'docs.opencodeapi.p': 'OpenCode Zen / engine API adapter notes',
      'docs.linenv.title': 'Env container docs',
      'docs.linenv.p': 'Container build / pack / test and artifacts',
      'docs.optask.p': 'Programmatic task API (<code>x-tk</code> auth)',
      'docs.site.title': 'About this site',
      'docs.site.p': 'Structure, interactions and maintenance conventions',

      'footer.tag': 'A lightweight AI task batch system on Go + Vue 3',
      'footer.copyright': 'Project landing page · zero-dependency static assets · open directly or self-host'
    }
  };

  var SUPPORTED = ['zh', 'en'];
  var STORE_KEY = 'aicode-website-lang';

  function t(lang, key) {
    var table = MESSAGES[lang] || MESSAGES.zh;
    if (Object.prototype.hasOwnProperty.call(table, key)) return table[key];
    if (Object.prototype.hasOwnProperty.call(MESSAGES.zh, key)) return MESSAGES.zh[key];
    return null;
  }

  function normalize(lang) {
    if (!lang) return null;
    var v = String(lang).toLowerCase();
    if (v.indexOf('zh') === 0 || v === 'cn' || v === 'zh-cn' || v === 'zh-hans') return 'zh';
    if (v.indexOf('en') === 0) return 'en';
    return null;
  }

  function detect() {
    var saved = null;
    try { saved = localStorage.getItem(STORE_KEY); } catch (e) { saved = null; }
    return normalize(saved) || 'en';
  }

  function apply(lang) {
    var L = normalize(lang) || 'en';
    var nodes, i, el, key, val;

    nodes = document.querySelectorAll('[data-i18n]');
    for (i = 0; i < nodes.length; i++) {
      el = nodes[i];
      val = t(L, el.getAttribute('data-i18n'));
      if (val !== null) el.textContent = val;
    }

    nodes = document.querySelectorAll('[data-i18n-html]');
    for (i = 0; i < nodes.length; i++) {
      el = nodes[i];
      val = t(L, el.getAttribute('data-i18n-html'));
      if (val !== null) el.innerHTML = val;
    }

    nodes = document.querySelectorAll('[data-i18n-attr]');
    for (i = 0; i < nodes.length; i++) {
      el = nodes[i];
      var pairs = String(el.getAttribute('data-i18n-attr')).split(',');
      for (var p = 0; p < pairs.length; p++) {
        var parts = pairs[p].split(':');
        if (parts.length < 2) continue;
        key = parts.slice(1).join(':').trim();
        val = t(L, key);
        if (val !== null) el.setAttribute(parts[0].trim(), val);
      }
    }

    document.documentElement.setAttribute('lang', L === 'zh' ? 'zh-CN' : 'en');

    var btn = document.getElementById('langToggle');
    if (btn) btn.textContent = L === 'zh' ? 'EN' : '中文';

    try { localStorage.setItem(STORE_KEY, L); } catch (e2) { /* 忽略隐私模式 */ }
    return L;
  }

  global.WEBSET_I18N = {
    supported: SUPPORTED,
    storeKey: STORE_KEY,
    t: t,
    normalize: normalize,
    detect: detect,
    apply: apply
  };
})(window);
