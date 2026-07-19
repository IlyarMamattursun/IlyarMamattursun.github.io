/* ============================================
   kashgar.sh — Escape Terminal
   核心逻辑：命令系统 / 迁徙地图 / 歌单星图
   ============================================
   注：标有 // TODO 的字段需用户替换为真实信息
   ============================================ */

// ===== 歌单数据（68 首，忠实于 real music 歌单）=====
const SONGS = [
  { t: "SLOW DANCING IN THE DARK", a: "Joji", j: true },
  { t: "Like You Do", a: "Joji", j: true },
  { t: "SLOW DANCING IN THE DARK", a: "Joji", j: true },
  { t: "Afterthought", a: "Joji / BENEE", j: true },
  { t: "Die For You", a: "Joji", j: true },
  { t: "River", a: "Bishop Briggs" },
  { t: "Five Hundred Miles", a: "Justin Timberlake / Carey Mulligan / Stark Sands" },
  { t: "Poker Face", a: "Lady Gaga" },
  { t: "The Cure", a: "Lady Gaga" },
  { t: "There's Nothing Holdin' Me Back", a: "Shawn Mendes" },
  { t: "The Monster", a: "Eminem / Rihanna" },
  { t: "Young And Beautiful", a: "Lana Del Rey" },
  { t: "bad guy", a: "Billie Eilish" },
  { t: "exile", a: "Taylor Swift / Bon Iver" },
  { t: "i hate u, i love u", a: "gnash / Olivia O'Brien" },
  { t: "Cruel Summer", a: "Taylor Swift" },
  { t: "Try", a: "Colbie Caillat" },
  { t: "I WANNA BE YOUR SLAVE", a: "Måneskin" },
  { t: "Glimpse of Us", a: "Joji", j: true },
  { t: "Sunburn", a: "Brian Cheng" },
  { t: "Fire On Fire", a: "Sam Smith" },
  { t: "Cold", a: "Chris Stapleton" },
  { t: "lovely", a: "Billie Eilish / Khalid" },
  { t: "Someone You Loved", a: "Lewis Capaldi" },
  { t: "Uptown Funk", a: "Mark Ronson / Bruno Mars" },
  { t: "Apologize", a: "OneRepublic" },
  { t: "Natural", a: "Imagine Dragons" },
  { t: "Demons", a: "Imagine Dragons" },
  { t: "Believer", a: "Imagine Dragons / Lil Wayne" },
  { t: "Unstoppable", a: "Sia" },
  { t: "Please Don't Go", a: "Joel Adams" },
  { t: "Intentions (Acoustic)", a: "Justin Bieber" },
  { t: "We Don't Talk Anymore", a: "Charlie Puth / Selena Gomez" },
  { t: "Peaches", a: "Justin Bieber / Daniel Caesar / GIVĒON" },
  { t: "snowflake", a: "Powfu / Jaden / Sarcastic Sounds" },
  { t: "Sold Out", a: "Jonathan Steingard / Hawk Nelson" },
  { t: "Enemy", a: "Imagine Dragons / JID" },
  { t: "Rolling In The Deep", a: "Adele" },
  { t: "Someone Like You", a: "Adele" },
  { t: "Normal No More", a: "TYSM" },
  { t: "Love Is Gone (Acoustic)", a: "SLANDER / Dylan Matthew" },
  { t: "There Is Nothing Holding Me Back (Novalight Remix)", a: "Novalight / Shawn Mendes" },
  { t: "City Of Stars", a: "Ryan Gosling / Emma Stone" },
  { t: "If I Ain't Got You (Acoustic)", a: "John Adams" },
  { t: "The Greatest", a: "Sia / Kendrick Lamar" },
  { t: "Past Lives / Promise", a: "sapientdream / Slushii" },
  { t: "Perfect", a: "Ed Sheeran" },
  { t: "Carry You", a: "Ruelle / Fleurie" },
  { t: "Nervous", a: "John Legend" },
  { t: "Never Be Alone / Hey There Delilah", a: "Shawn Mendes" },
  { t: "Set Fire to the Rain", a: "Adele" },
  { t: "Need You Now", a: "Lady A" },
  { t: "Trouble I'm In", a: "Twinbed" },
  { t: "Eyes Open (Taylor's Version)", a: "Taylor Swift" },
  { t: "please", a: "Chelsea Cutler / Jeremy Zucker" },
  { t: "The Story Never Ends", a: "Lauv" },
  { t: "Video Games", a: "Lana Del Rey" },
  { t: "Whataya Want From Me", a: "Adam Lambert" },
  { t: "How Do I Say Goodbye", a: "Dean Lewis" },
  { t: "Paradise(天堂)", a: "Music.Journeyy" },
  { t: "7 Years", a: "Lukas Graham" },
  { t: "Love Me Like You Do", a: "Ellie Goulding" },
  { t: "What Are Words", a: "Chris Medina" },
  { t: "See You Again", a: "Wiz Khalifa / Charlie Puth" },
  { t: "Diamonds", a: "Rihanna" },
  { t: "Love Yourself", a: "Justin Bieber" },
  { t: "Ferrari", a: "Bebe Rexha" },
  { t: "Take Me To Church", a: "Hozier" },
];

// ===== 迁徙节点 =====
const NODES = [
  {
    id: 0, name: "喀什", en: "Kashgar", period: "2003–2015", tag: "原点",
    x: 120, y: 380, type: "origin",
    title: "原点 · 帕米尔脚下",
    body: [
      "出生在新疆喀什——中国最西部的城市，<span class='hl'>帕米尔高原脚下，丝绸之路的十字路口</span>。维吾尔文化的重镇。",
      "12 岁之前，喀什就是全世界。家里人都在这，生活半径不超过这座古城。那时候不知道外面有多大，也不知道自己有一天会走得那么远。",
      "<span class='dim'>// 后来每一次迁徙，丈量的都是这个原点的距离。</span>",
    ],
    images: ["pic/新疆草原.png"],
  },
  {
    id: 1, name: "乌鲁木齐", en: "Urumqi", period: "2015–2018", tag: "第一次离家",
    x: 255, y: 250, type: "past",
    title: "12 岁 · 72 小时火车",
    body: [
      "12 岁那年，考上内初班，到乌鲁木齐 58 中读初中。",
      "内初班是寄宿制，<span class='hl'>一年只能回一次家</span>。对一个 12 岁的孩子来说，「离开家」不是一个抽象概念——是真真切切的 72 小时火车、是完全陌生的城市、是周围没有人说你最熟悉的语言。",
      "在这里被迫学会了独立。不是那种「我要独立」的宣言，而是<span class='hl'>你哭了也没人听得懂，所以就不哭了</span>。",
    ],
    images: ["pic/小时候在乌鲁木齐的照片.jpg"],
  },
  {
    id: 2, name: "上海", en: "Shanghai", period: "2018–2022", tag: "黄金时代",
    x: 845, y: 430, type: "past",
    title: "崇明岛 · 一百个新疆孩子",
    body: [
      "崇明中学内高班。一百来个从新疆来的孩子，在一个全封闭的校区里，<span class='hl'>两周才能出一次校门</span>。",
      "现在回头看，那是这辈子最快乐的一段时光。不是因为轻松——恰恰相反，管得很严，离家很远。而是因为有那些人。大家一起穷开心。",
      "<b>偷喝酒。</b>买酒要先偷偷点外卖，藏在宿舍各种地方。喝的时候七八个人挤在阳台或公共浴室，关上门，压低声音。那是我喝过的最好的酒——<span class='hl'>不在于酒本身，在于共享的秘密</span>。一群远离家乡的孩子，用一瓶廉价的酒，交换一些不需要翻译的默契。",
      "<b>70 小时绿皮火车。</b>每年寒暑假，上海到乌鲁木齐。硬座，拥挤，闷热或寒冷。但火车上也是快乐的——聊天、打牌、分享零食。窗外从江南水乡变成戈壁沙漠。飞过天山的时候，雪峰就在窗外，知道快到家了。",
      "<b>疫情。</b>2022 年上海封控，高考延后一个月。回新疆又遇到封控，<span class='hl'>被封四个月，头发长到没剪</span>。错过了大学第一学期。",
      "<b>网球。</b>在那个封闭的环境里，网球场是为数不多可以自由呼吸的地方。挥拍，跑动，出汗——不需要语言。",
    ],
    images: ["pic/崇明中学.jpg", "pic/浴室喝酒.jpg", "pic/在返回新疆的火车上.jpg", "pic/疫情在新疆封了四个月的头发.jpg"],
    video: "pic/回新疆火车场景.mp4",
  },
  {
    id: 3, name: "南京", en: "Nanjing", period: "2022–2026", tag: "选择与被选择",
    x: 805, y: 410, type: "past",
    title: "南大 · 放弃保研",
    body: [
      "南京大学信息管理与信息系统专业。成绩排在前面，获得了保研资格，<span class='hl'>但主动放弃了</span>。",
      "不是因为保不上。是不想再走一条被安排好的路。考研、读研、毕业、找工作——这条路太确定了。<span class='hl'>而确定性的反面不是风险，是自由</span>。",
      "在同花顺做数据分析实习。第一次真正接触业界，把学校里的理论变成实际的业务逻辑。",
    ],
    images: ["pic/南京大学.png", "pic/南京.jpg"],
  },
  {
    id: 4, name: "满帮", en: "Mambang · Nanjing", period: "2026–", tag: "南京 · 新起点",
    x: 820, y: 452, type: "now",
    title: "满帮 · AI 算法部 · 南京",
    body: [
      "2026 年毕业，入职满帮集团 AI 算法部门，做数据分析工程师。base 南京。",
      "从喀什到乌鲁木齐，从乌鲁木齐到上海，从上海到南京，从南京到满帮——这条路线看起来是从西部到东部、从小城市到大平台的「上进」叙事。<span class='hl'>但每一步都是主动选择，不是随波逐流</span>。",
      "终极问题不是「去哪里」，而是<span class='hl'>能否发明一种不被任何系统完全捕获的存在方式</span>。",
    ],
    images: ["pic/计算机设计大赛合照.jpg"],
  },
];

// ===== 联系方式 =====
const CONTACT = {
  email: "ilyar.m@amh-group.com",
  github: "https://github.com/IlyarMamattursun",
  githubUser: "IlyarMamattursun",
  blog: null,
  other: [],
};

// ===== 工作旅程：满帮 26 届校招生培训 =====
const CAREER_STAGES = [
  {
    id: "bootcamp", name: "入职集训", period: "2026.07.06 — 07.10", duration: "1 周",
    status: "completed", icon: "▣",
    title: "满帮集团 26 届校招生集训营",
    desc: "入职第一周。公司文化、业务全景、职业化课程。第一次穿上统一的红色文化衫，认识了一百多个同期校招生。",
    images: ["pic/满帮校招生培训/44BCA0CE-2C32-4EA1-A068-BF66DD823757-6367-0000017685CA3FEF.JPG"],
  },
  {
    id: "outward", name: "团建素拓", period: "2026.07.10", duration: "1 天",
    status: "completed", icon: "◆",
    title: "聚萤为光 · 兆启新阳",
    desc: "户外素拓。分组对抗、射箭、团队协作。在草坪上晒了一天，拿了小组奖杯。从「同学」变成「战友」的过程很快。",
    images: [
      "pic/满帮校招生培训/6D18F54D-0C43-4759-83E1-E94426360C76-6367-0000016E4E8B0C96.JPG",
      "pic/满帮校招生培训/E67F6BA8-CA94-4430-9DA2-0B2BFEC0BC55-6367-00000174540BD0FF.JPG",
    ],
  },
  {
    id: "business", name: "产运经培训", period: "2026.07.13 — 07.15", duration: "3 天",
    status: "completed", icon: "◇",
    title: "产品 · 运营 · 经营",
    desc: "三天业务通识。满帮的产品逻辑、运营节奏、经营方法论。第一次完整理解「货运匹配」这条链路。",
    images: ["pic/满帮校招生培训/9EA6EAA6-56C0-43F5-89DE-6A05A6B0AADA-6367-000001729193B5AF.JPG"],
  },
  {
    id: "algorithm", name: "算法魔鬼训练营", period: "2026.07.16 — 07.25", duration: "2 周",
    status: "current", icon: "◈",
    title: "算法魔鬼训练营 · 第一周",
    desc: "高强度算法训练。货主算法、司机意图、匹配系统、大作业开题。每天从早上 9 点到晚上 10 点。刚结束第一周，正在消化「匹配系统」和「司机意图」相关的课程。",
    images: ["pic/满帮校招生培训/D0E8610A-2D96-4BEC-87D8-045E888797F9-3685-0000008BF40EAE46.PNG"],
  },
  {
    id: "rotation", name: "轮岗", period: "2026.07.27 — 08.07", duration: "2 周",
    status: "upcoming", icon: "○",
    title: "部门轮岗",
    desc: "即将进入部门轮岗。在真实业务场景里观察算法、产品、运营如何协作。最终落地到 AI 算法部的数据分析方向。",
    images: [],
  },
];

// ===== DOM 引用 =====
const $ = (s) => document.querySelector(s);
const bootScreen = $("#boot-screen");
const bootLog = $("#boot-log");
const bootHint = $("#boot-hint");
const terminal = $("#terminal");
const output = $("#output");
const mapSection = $("#map-section");
const musicSection = $("#music-section");
const cmdInput = $("#cmd-input");
const cmdNav = $("#cmd-nav");

// ===== Boot 序列 =====
const BOOT_LINES = [
  { t: "[ BOOT ] kashgar.sh v1.0 — escape terminal", c: "dim" },
  { t: "[ BOOT ] initializing ilyar.exe ...", c: "dim" },
  { t: "[  OK  ] loading persona ........... INTJ · 系统拆解者 · 边缘精英", c: "ok" },
  { t: "[  OK  ] loading journey ........... 喀什 → 乌鲁木齐 → 上海 → 南京 → 满帮", c: "ok" },
  { t: "[  OK  ] loading playlist .......... 68 tracks · Joji ×6 detected", c: "ok" },
  { t: "[  OK  ] loading memory ............ 23 years of escapology", c: "ok" },
  { t: "[  OK  ] mounting drives ........... /drinks /tennis /court", c: "ok" },
  { t: "[ WARN ] certainty.exe not found ... by design", c: "warn" },
  { t: "[ WARN ] comfort_zone .............. access denied", c: "warn" },
  { t: "", c: "" },
  { t: "  ██╗  ██████╗  █████╗ ██████╗  █████╗ ", c: "hl" },
  { t: "  ██║ ██╔═══██╗██╔══██╗██╔══██╗██╔══██╗", c: "hl" },
  { t: "  ██║ ██║   ██║███████║██████╔╝███████║", c: "hl" },
  { t: "  ██║ ██║   ██║██╔══██║██╔══██╗██╔══██║", c: "hl" },
  { t: "  ██║ ╚██████╔╝██║  ██║██║  ██║██║  ██║", c: "hl" },
  { t: "  ╚═╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝", c: "hl" },
  { t: "", c: "" },
  { t: "  逃逸确定性的系统拆解者。不是在找答案，是在找更好的问题。", c: "dim" },
  { t: "", c: "" },
  { t: "[ BOOT ] system ready.", c: "ok" },
];

function runBoot() {
  let i = 0;
  bootLog.innerHTML = "";
  const tick = () => {
    if (i < BOOT_LINES.length) {
      const line = BOOT_LINES[i];
      const cls = line.c ? `boot-${line.c}` : "";
      bootLog.innerHTML += `<span class="${cls}">${line.t || " "}</span>\n`;
      i++;
      setTimeout(tick, line.t === "" ? 120 : 90 + Math.random() * 80);
    } else {
      bootHint.classList.remove("hidden");
    }
  };
  tick();
}

function enterTerminal() {
  bootScreen.style.transition = "opacity 0.4s ease";
  bootScreen.style.opacity = "0";
  setTimeout(() => {
    bootScreen.style.display = "none";
    terminal.classList.remove("hidden");
    executeCommand("whoami");
    cmdInput.focus();
  }, 400);
}

// ===== 命令系统 =====
const COMMANDS = {
  help: () => {
    const rows = [
      ["whoami", "身份 · 我是谁"],
      ["journey / map", "迁徙地图 · 从喀什到满帮的轨迹"],
      ["drinks", "酒 & 网球 · 两个爱好，偶尔并行"],
      ["music", "歌单星图 · 68 首歌的视觉化"],
      ["work", "经历 · 实习 / 大赛 / 选择"],
      ["career", "工作旅程 · 满帮校招培训进行时"],
      ["contact", "联系入口 · 邮箱 / GitHub"],
      ["status", "现在在做什么"],
      ["clear", "清屏"],
      ["about", "关于这个站点"],
    ];
    return `<div class="cmd-output">
      <div class="section-title">available commands</div>
      <div class="help-table">${rows.map(r =>
        `<div class="help-row"><span class="help-cmd">${r[0]}</span><span class="help-desc">${r[1]}</span></div>`
      ).join("")}</div>
      <p class="dim" style="margin-top:1rem;font-size:12.5px;">// 也可以点击顶部导航栏。命令不区分大小写。</p>
    </div>`;
  },

  whoami: () => `<div class="cmd-output">
    <div class="cmd-line-echo"><span class="echo-prompt">ilyar@kashgar:~$</span> <span class="echo-cmd">whoami</span></div>
    <div class="id-card">
      <img class="id-avatar" src="pic/证件照.jpg" alt="伊力亚尔" />
      <div class="id-info">
        <h2>伊力亚尔·麦麦提图尔荪</h2>
        <div class="id-en">Ilyar Mamattursun · b.2003 · 喀什</div>
        <div class="id-tags">
          <span class="id-tag tag-intj">INTJ</span>
          <span class="id-tag">系统拆解者</span>
          <span class="id-tag">边缘精英</span>
          <span class="id-tag">逃逸确定性</span>
          <span class="id-tag tag-joji">Joji 重度循环</span>
        </div>
        <div class="id-bio">
          <p>2003 年生于新疆喀什。<span class="hl">12 岁离家</span>，经乌鲁木齐、上海、南京，一路向东。</p>
          <p>南京大学信息管理与信息系统 2026 届。放弃保研。现于<span class="hl">满帮集团 AI 算法部 · 南京</span>做数据分析工程师。</p>
          <p>核心驱动力是「<span class="hl">逃离确定性</span>」——追求选择权而非安全感。不在任何一个系统的中心，站在边缘看清单个系统的边界。</p>
        </div>
      </div>
    </div>
    <div class="text-block">
      <div class="quote">「终极问题不是去哪里，而是能否发明一种不被任何系统完全捕获的存在方式。」</div>
    </div>
  </div>`,

  journey: () => {
    showPanel("map");
    renderMap();
    return `<div class="cmd-output">
      <div class="cmd-line-echo"><span class="echo-prompt">ilyar@kashgar:~$</span> <span class="echo-cmd">journey</span></div>
      <div class="text-block">
        <p class="lead">迁徙轨迹 · 从帕米尔脚下到长三角</p>
        <p class="dim">五个节点，23 年。每一步都是主动选择，不是随波逐流。<br>点击地图上的节点展开故事。</p>
      </div>
    </div>`;
  },

  map: function () { return COMMANDS.journey(); },

  drinks: () => `<div class="cmd-output">
    <div class="cmd-line-echo"><span class="echo-prompt">ilyar@kashgar:~$</span> <span class="echo-cmd">drinks</span></div>
    <div class="section-title">两个爱好，偶尔并行处理</div>
    <div class="story-grid">
      <div class="story-card">
        <h3>🍺 酒</h3>
        <div class="card-meta">不是社交工具，是和自己和解的方式</div>
        <img class="card-img" src="pic/浴室喝酒.jpg" alt="浴室喝酒" />
        <p>在崇明中学，喝酒是一件需要策划的事。买酒要偷偷点外卖，藏在宿舍各种地方。喝的时候七八个人挤在阳台或公共浴室，关上门，压低声音。</p>
        <p>那是我喝过的<span class="hl">最好的酒</span>。不在于酒本身，在于共享的秘密。一群远离家乡的孩子，用一瓶廉价的酒，交换一些不需要翻译的默契。</p>
        <div class="card-quote">现在能随时随地喝，能去很 fancy 的酒吧。但再也找不到那个感觉了。</div>
      </div>
      <div class="story-card">
        <h3>🎾 网球</h3>
        <div class="card-meta">不需要语言，只需要把球打回去</div>
        <img class="card-img" src="pic/酒.jpg" alt="酒" />
        <p>在上海期间打了两年网球。在那个封闭的、两周出一次校门的环境里，<span class="hl">网球场是为数不多可以自由呼吸的地方</span>。</p>
        <p>挥拍，跑动，出汗——不需要语言。不是竞技水平多高，而是一种纯粹的、身体性的释放。</p>
        <div class="card-quote">酒和网球，偶尔并行处理。</div>
      </div>
    </div>
  </div>`,

  music: () => {
    showPanel("music");
    renderMusic();
    return `<div class="cmd-output">
      <div class="cmd-line-echo"><span class="echo-prompt">ilyar@kashgar:~$</span> <span class="echo-cmd">music</span></div>
      <div class="text-block">
        <p class="lead">real music — 情绪索引</p>
        <p class="dim">68 首歌，乱序散布。Joji 是锚点，其他歌是暗弱粒子。<br>每首歌标记着一段特定的时间和地点。hover 显形。</p>
      </div>
    </div>`;
  },

  work: () => `<div class="cmd-output">
    <div class="cmd-line-echo"><span class="echo-prompt">ilyar@kashgar:~$</span> <span class="echo-cmd">work</span></div>
    <div class="section-title">经历 · 作品 · 选择</div>
    <div class="work-timeline">
      <div class="work-item now">
        <div class="work-time">2026 — present</div>
        <div class="work-role">数据分析工程师</div>
        <div class="work-org">满帮集团 · AI 算法部 · 南京</div>
        <div class="work-desc">应届入职。正在经历 26 届校招生培训。<span class="hl">当前：算法魔鬼训练营第一周刚结束</span>。</div>
      </div>
      <div class="work-item">
        <div class="work-time">2025</div>
        <div class="work-role">数据分析实习</div>
        <div class="work-org">同花顺 · 杭州</div>
        <div class="work-desc">第一次真正接触业界，把学校里的理论变成实际的业务逻辑。</div>
      </div>
      <div class="work-item">
        <div class="work-time">2022 — 2026</div>
        <div class="work-role">本科 · 信息管理与信息系统</div>
        <div class="work-org">南京大学</div>
        <div class="work-desc">成绩靠前，获保研资格，<span class="hl">主动放弃</span>——不想走被安排好的路。</div>
      </div>
      <div class="work-item">
        <div class="work-time">大学期间</div>
        <div class="work-role">中国大学生计算机设计大赛</div>
        <div class="work-org">参赛</div>
        <div class="work-desc"><img src="pic/计算机设计大赛合照.jpg" class="card-img" style="max-height:160px;" alt="计算机设计大赛" />和团队一起完成的参赛作品。</div>
      </div>
    </div>
  </div>`,

  career: () => {
    const stages = CAREER_STAGES.map((s, i) => {
      const statusClass = s.status === "current" ? "current" : s.status === "completed" ? "done" : "future";
      const statusText = s.status === "current" ? "进行中" : s.status === "completed" ? "已完成" : "待开始";
      const imgs = s.images.map(src => `<img src="${src}" alt="${s.name}" loading="lazy" />`).join("");
      return `
        <div class="career-stage ${statusClass}" data-idx="${i}">
          <div class="stage-body">
            <div class="stage-header">
              <span class="stage-name">${s.icon} ${s.name}</span>
              <span class="stage-status">${statusText}</span>
            </div>
            <div class="stage-meta">${s.period} · ${s.duration}</div>
            <div class="stage-title">${s.title}</div>
            <div class="stage-desc">${s.desc}</div>
            ${imgs ? `<div class="stage-gallery">${imgs}</div>` : ""}
          </div>
        </div>
      `;
    }).join("");
    return `<div class="cmd-output">
      <div class="cmd-line-echo"><span class="echo-prompt">ilyar@kashgar:~$</span> <span class="echo-cmd">career</span></div>
      <div class="section-title">工作旅程 · 满帮 26 届校招生</div>
      <p class="dim" style="margin-bottom:1.2rem;">6 号入职，正在进行校招生培训。当前节点：<span class="hl">算法魔鬼训练营第一周</span>。</p>
      <div class="career-timeline">${stages}</div>
    </div>`;
  },

  contact: () => `<div class="cmd-output">
    <div class="cmd-line-echo"><span class="echo-prompt">ilyar@kashgar:~$</span> <span class="echo-cmd">contact</span></div>
    <div class="section-title">联系入口</div>
    <div class="contact-grid">
      <a class="contact-card" href="mailto:${CONTACT.email}">
        <span class="contact-icon">✉</span>
        <div><div class="contact-label">EMAIL</div><div class="contact-value">${CONTACT.email}</div></div>
      </a>
      <a class="contact-card" href="${CONTACT.github}" target="_blank" rel="noopener">
        <span class="contact-icon">⌥</span>
        <div><div class="contact-label">GITHUB</div><div class="contact-value">@${CONTACT.githubUser}</div></div>
      </a>
      ${CONTACT.blog ? `<a class="contact-card" href="${CONTACT.blog}" target="_blank" rel="noopener"><span class="contact-icon">✎</span><div><div class="contact-label">BLOG</div><div class="contact-value">个人博客</div></div></a>` : ""}
    </div>
    <p class="dim" style="font-size:12.5px;margin-top:0.8rem;">// 其他链接可随时补充。</p>
  </div>`,

  status: () => `<div class="cmd-output">
    <div class="cmd-line-echo"><span class="echo-prompt">ilyar@kashgar:~$</span> <span class="echo-cmd">status</span></div>
    <div class="text-block">
      <p class="lead">> currently online · 校招培训中</p>
      <p>📍 <span class="hl">南京</span> · 满帮集团 AI 算法部</p>
      <p>🎓 <span class="hl">26 届校招生培训</span>：刚结束算法魔鬼训练营第一周</p>
      <p>📅 接下来：大作业答辩 → 两周轮岗</p>
      <p>🎧 on repeat: <span class="hl">Joji — SLOW DANCING IN THE DARK</span></p>
      <p>🎾 周末: 网球场</p>
      <p class="dim" style="margin-top:0.8rem;">> not seeking answers. seeking better questions.</p>
    </div>
  </div>`,

  about: () => `<div class="cmd-output">
    <div class="cmd-line-echo"><span class="echo-prompt">ilyar@kashgar:~$</span> <span class="echo-cmd">about</span></div>
    <div class="text-block">
      <p class="lead">about this site</p>
      <p>这是一个终端模拟器的个人主页。不是简历，不是自我介绍模板——是一段<span class="hl">从喀什开始执行的人生脚本</span>。</p>
      <p>设计理念：用命令行交互 + 迁徙地图 + 歌单星图，把一个人拆解成可探索的系统。</p>
      <p class="dim">// 技术栈：纯 HTML / CSS / JS，无框架。手写 SVG 地图 + Canvas 歌单可视化。</p>
      <p class="dim">// 配色：琥珀主调，致敬老式 CRT 终端。</p>
      <p class="dim">// 部署：GitHub Pages。</p>
    </div>
  </div>`,

  clear: () => { output.innerHTML = ""; hidePanels(); return null; },
};

function executeCommand(rawCmd) {
  const cmd = rawCmd.trim().toLowerCase();
  if (!cmd) return;
  hidePanels();
  // 高亮导航
  cmdNav.querySelectorAll("button").forEach(b => b.classList.remove("active"));
  const navBtn = cmdNav.querySelector(`button[data-cmd="${cmd}"]`);
  if (navBtn) navBtn.classList.add("active");

  if (COMMANDS[cmd]) {
    const html = COMMANDS[cmd]();
    if (html !== null) {
      output.innerHTML = html;
      scrollToOutput();
    }
  } else {
    output.innerHTML = `<div class="cmd-output">
      <div class="cmd-line-echo"><span class="echo-prompt">ilyar@kashgar:~$</span> <span class="echo-cmd">${rawCmd}</span></div>
      <p class="dim">command not found: ${cmd}</p>
      <p class="dim" style="font-size:12.5px;">// 输入 <span class="help-cmd">help</span> 查看可用命令</p>
    </div>`;
  }
}

function hidePanels() {
  mapSection.classList.add("hidden");
  musicSection.classList.add("hidden");
}
function showPanel(name) {
  hidePanels();
  if (name === "map") mapSection.classList.remove("hidden");
  if (name === "music") musicSection.classList.remove("hidden");
}
function scrollToOutput() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ===== 迁徙地图 =====
let mapRendered = false;
function renderMap() {
  const routesG = $("#map-routes");
  const nodesG = $("#map-nodes");
  const labelsG = $("#map-labels");
  routesG.innerHTML = ""; nodesG.innerHTML = ""; labelsG.innerHTML = "";

  // 飞线
  for (let i = 0; i < NODES.length - 1; i++) {
    const a = NODES[i], b = NODES[i + 1];
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2 - Math.abs(b.x - a.x) * 0.18 - 20;
    const path = `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
    routesG.innerHTML += `<path class="fly-line animated" d="${path}" style="animation-delay:${i * 0.3}s" />`;
  }

  // 节点
  NODES.forEach((n, i) => {
    const color = n.type === "origin" ? "#e8a838" : n.type === "now" ? "#ff7eb6" : "#8a7244";
    const filter = n.type !== "past" ? "url(#glow-strong)" : "url(#glow)";
    nodesG.innerHTML += `<g class="map-node" data-idx="${i}">
      <circle class="node-pulse" cx="${n.x}" cy="${n.y}" r="6" fill="none" stroke="${color}" stroke-width="1.5" opacity="0" />
      <circle class="node-core" cx="${n.x}" cy="${n.y}" r="${n.type !== "past" ? 6 : 4.5}" fill="${color}" filter="${filter}" />
    </g>`;
    // 标签
    const labelOffset = n.type === "now" ? -16 : (i % 2 === 0 ? -15 : 16);
    labelsG.innerHTML += `<text x="${n.x}" y="${n.y + labelOffset}" fill="${color}" style="font-size:11px;font-family:var(--mono);" text-anchor="middle">${n.name}</text>`;
  });

  // 绑定点击
  nodesG.querySelectorAll(".map-node").forEach(el => {
    el.addEventListener("click", () => {
      const idx = +el.dataset.idx;
      showNodeDetail(idx);
      nodesG.querySelectorAll(".map-node").forEach(n => n.classList.remove("active"));
      el.classList.add("active");
    });
  });

  // 默认显示第一个节点
  showNodeDetail(0);
  nodesG.querySelector(".map-node").classList.add("active");
  mapRendered = true;
}

function showNodeDetail(idx) {
  const n = NODES[idx];
  const detail = $("#node-detail");
  const imgs = n.images.map(src => `<img src="${src}" alt="${n.name}" loading="lazy" />`).join("");
  const video = n.video ? `<video class="nd-video" src="${n.video}" controls preload="none" poster=""></video>` : "";
  detail.innerHTML = `
    <div class="nd-header">
      <span class="nd-place">${n.name}</span>
      <span class="nd-period">${n.period} · ${n.en}</span>
      <span class="nd-tag">${n.tag}</span>
    </div>
    <div class="nd-body">${n.body.map(p => `<p>${p}</p>`).join("")}</div>
    ${imgs ? `<div class="nd-gallery">${imgs}</div>` : ""}
    ${video}
  `;
}

// ===== 歌单星图（Canvas）=====
let musicCanvas, musicCtx, songPositions = [], musicAnimId, musicHoverIdx = -1;

function seededRand(seed) {
  let x = Math.sin(seed * 999.13) * 43758.5453;
  return x - Math.floor(x);
}

function renderMusic() {
  musicCanvas = $("#music-canvas");
  musicCtx = musicCanvas.getContext("2d");
  resizeMusicCanvas();
  computeSongPositions();
  if (musicAnimId) cancelAnimationFrame(musicAnimId);
  animateMusic();

  musicCanvas.onmousemove = handleMusicHover;
  musicCanvas.onmouseleave = () => {
    musicHoverIdx = -1;
    $("#song-tooltip").classList.add("hidden");
  };
  musicCanvas.onclick = (e) => {
    if (musicHoverIdx >= 0) {
      const s = SONGS[musicHoverIdx];
      // 点击 Joji 歌曲做一个轻微的扩散效果（已由 hover 体现）
    }
  };
}

function resizeMusicCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const rect = musicCanvas.getBoundingClientRect();
  musicCanvas.width = rect.width * dpr;
  musicCanvas.height = rect.height * dpr;
  musicCtx.scale(dpr, dpr);
}

function computeSongPositions() {
  const rect = musicCanvas.getBoundingClientRect();
  const W = rect.width, H = rect.height;
  songPositions = SONGS.map((s, i) => {
    // 网格抖动：保证分布均匀但有随机感
    const cols = 16, rows = 7;
    const cellW = W / cols, cellH = H / rows;
    const col = i % cols;
    const row = Math.floor(i / cols) % rows;
    const jx = seededRand(i * 1.7 + 3) * cellW * 0.7;
    const jy = seededRand(i * 2.3 + 7) * cellH * 0.7;
    const x = col * cellW + cellW * 0.15 + jx;
    const y = row * cellH + cellH * 0.15 + jy;
    return { x, y, r: s.j ? 4.5 : 1.8, idx: i };
  });
}

function animateMusic() {
  const rect = musicCanvas.getBoundingClientRect();
  const W = rect.width, H = rect.height;
  musicCtx.clearRect(0, 0, W, H);

  // 背景：极淡的网格
  musicCtx.strokeStyle = "rgba(61,47,26,0.25)";
  musicCtx.lineWidth = 1;
  for (let x = 0; x < W; x += 40) {
    musicCtx.beginPath(); musicCtx.moveTo(x, 0); musicCtx.lineTo(x, H); musicCtx.stroke();
  }

  const time = performance.now() / 1000;

  // 普通歌：暗琥珀小点
  songPositions.forEach((p, i) => {
    if (SONGS[i].j) return;
    musicCtx.beginPath();
    musicCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    musicCtx.fillStyle = i === musicHoverIdx ? "rgba(255,200,87,0.9)" : "rgba(138,114,68,0.45)";
    musicCtx.fill();
  });

  // Joji 歌：发光锚点 + 呼吸
  songPositions.forEach((p, i) => {
    if (!SONGS[i].j) return;
    const breath = 0.6 + 0.4 * Math.sin(time * 1.2 + i * 0.7);
    const r = p.r + breath * 1.5;
    // 光晕
    const grad = musicCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 5);
    grad.addColorStop(0, `rgba(255,126,182,${0.5 * breath})`);
    grad.addColorStop(1, "rgba(255,126,182,0)");
    musicCtx.fillStyle = grad;
    musicCtx.beginPath();
    musicCtx.arc(p.x, p.y, r * 5, 0, Math.PI * 2);
    musicCtx.fill();
    // 核心
    musicCtx.beginPath();
    musicCtx.arc(p.x, p.y, r, 0, Math.PI * 2);
    musicCtx.fillStyle = i === musicHoverIdx ? "#ffc857" : "#ff7eb6";
    musicCtx.fill();
  });

  musicAnimId = requestAnimationFrame(animateMusic);
}

function handleMusicHover(e) {
  const rect = musicCanvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;
  let found = -1;
  let minDist = 999;
  songPositions.forEach((p, i) => {
    const d = Math.hypot(p.x - mx, p.y - my);
    const threshold = SONGS[i].j ? 14 : 8;
    if (d < threshold && d < minDist) { minDist = d; found = i; }
  });
  musicHoverIdx = found;
  const tip = $("#song-tooltip");
  if (found >= 0) {
    const s = SONGS[found];
    tip.classList.remove("hidden");
    tip.classList.toggle("joji", !!s.j);
    tip.style.left = songPositions[found].x + "px";
    tip.style.top = songPositions[found].y + "px";
    tip.innerHTML = `<div class="tt-title">${s.t}</div><div class="tt-artist">${s.a}${s.j ? " · ★ Joji" : ""}</div>`;
  } else {
    tip.classList.add("hidden");
  }
}

// ===== 导航 & 输入绑定 =====
function bindNav() {
  cmdNav.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      const cmd = btn.dataset.cmd;
      cmdInput.value = "";
      executeCommand(cmd);
    });
  });
}

function bindInput() {
  cmdInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const val = cmdInput.value;
      if (val.trim()) {
        executeCommand(val);
        cmdInput.value = "";
      }
    }
  });
  // 点击页面任意处聚焦输入框（除非点击了链接/按钮/图片）
  document.addEventListener("click", (e) => {
    if (terminal.classList.contains("hidden")) return;
    if (e.target.closest("a, button, img, video, input, .map-node, canvas")) return;
    cmdInput.focus();
  });
}

// ===== 窗口 resize 重算歌单 =====
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (!musicSection.classList.contains("hidden")) {
      resizeMusicCanvas();
      computeSongPositions();
    }
  }, 200);
});

// ===== 初始化 =====
let booted = false;
function init() {
  runBoot();
  const tryEnter = (e) => {
    if (booted) return;
    if (e.type === "click" || (e.type === "keydown" && e.key === "Enter")) {
      if (bootHint.classList.contains("hidden")) return; // boot 动画未完成
      booted = true;
      enterTerminal();
      bootScreen.removeEventListener("click", tryEnter);
      document.removeEventListener("keydown", tryEnter);
    }
  };
  bootScreen.addEventListener("click", tryEnter);
  document.addEventListener("keydown", tryEnter);
  bindNav();
  bindInput();
}

document.addEventListener("DOMContentLoaded", init);
