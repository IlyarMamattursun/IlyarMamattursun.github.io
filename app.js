/* ============================================
   kashgar.sh — Escape Terminal
   核心逻辑：命令系统 / 迁徙地图+时间线 / 音乐播放器
   ============================================ */

// ===== 歌单数据（68 首）=====
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

// ===== 迁徙节点（4 个，南京为终点）=====
const NODES = [
  {
    id: 0, name: "喀什", en: "Kashgar", period: "2003–2015", tag: "原点",
    x: 120, y: 380, type: "origin",
    title: "原点 · 帕米尔脚下",
    body: [
      "出生在新疆喀什——中国最西部的城市，帕米尔高原脚下，丝绸之路的十字路口。维吾尔文化的重镇。",
      "12 岁之前，喀什就是全世界。家里人都在这，生活半径不超过这座古城。",
    ],
    images: ["pic/新疆草原.png", "pic/我的照片/IMG_20240115_133655.jpg"],
  },
  {
    id: 1, name: "乌鲁木齐", en: "Urumqi", period: "2015–2018", tag: "第一次离家",
    x: 255, y: 250, type: "past",
    title: "12 岁 · 72 小时火车",
    body: [
      "12 岁考上内初班，到乌鲁木齐 58 中读初中。寄宿制，一年只能回一次家。",
      "对一个 12 岁的孩子来说，「离开家」不是抽象概念——是 72 小时火车、是陌生的城市、是周围没有人说你最熟悉的语言。",
      "在这里学会了独立。不是宣言，是<span class='hl'>你哭了也没人听得懂，所以就不哭了</span>。",
    ],
    images: ["pic/小时候在乌鲁木齐的照片.jpg"],
  },
  {
    id: 2, name: "上海", en: "Shanghai", period: "2018–2022", tag: "黄金时代",
    x: 845, y: 430, type: "past",
    title: "崇明岛 · 一百个新疆孩子",
    body: [
      "崇明中学内高班。一百来个从新疆来的孩子，全封闭校区，两周才能出一次校门。",
      "现在回头看，那是这辈子最快乐的一段时光。不是因为轻松——管得很严，离家很远。而是因为有那些人。大家一起穷开心。",
      "<b>偷喝酒。</b>买酒要偷偷点外卖，藏在宿舍各种地方。喝的时候七八个人挤在阳台或公共浴室，关上门，压低声音。那是我喝过的最好的酒——<span class='hl'>不在于酒本身，在于共享的秘密</span>。",
      "<b>70 小时绿皮火车。</b>每年寒暑假上海到乌鲁木齐，硬座。窗外从江南水乡变成戈壁沙漠，飞过天山的时候知道快到家了。",
      "<b>疫情。</b>2022 年上海封控，高考延后。回新疆又遇封控，<span class='hl'>被封四个月，头发长到没剪</span>。",
    ],
    images: [
      "pic/浴室喝酒.jpg",
    ],
    video: "pic/回新疆火车场景.mp4",
  },
  {
    id: 3, name: "南京", en: "Nanjing", period: "2022–", tag: "现在",
    x: 805, y: 410, type: "now",
    title: "南大 → 满帮 · 南京",
    body: [
      "南京大学信息管理与信息系统专业。",
      "在同花顺做数据分析实习，第一次真正接触业界。",
      "2026 年毕业，入职满帮集团 AI 算法部，base 南京。做数据分析工程师。",
      "从喀什到乌鲁木齐，从乌鲁木齐到上海，从上海到南京——每一步都是主动选择，不是随波逐流。",
    ],
    images: ["pic/南京大学.png", "pic/南京.jpg"],
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
  },
  {
    id: "outward", name: "团建素拓", period: "2026.07.10", duration: "1 天",
    status: "completed", icon: "◆",
    title: "聚萤为光 · 兆启新阳",
    desc: "户外素拓。分组对抗、射箭、团队协作。在草坪上晒了一天，拿了小组奖杯。从「同学」变成「战友」的过程很快。",
    gallery: [
      "pic/满帮校招生培训/6D18F54D-0C43-4759-83E1-E94426360C76-6367-0000016E4E8B0C96.JPG",
      "pic/满帮校招生培训/E67F6BA8-CA94-4430-9DA2-0B2BFEC0BC55-6367-00000174540BD0FF.JPG",
      "pic/满帮校招生培训/0335669E-AF74-4202-9D79-C243FDA37FD0-6367-000001735555A970.JPG",
      "pic/满帮校招生培训/923D130D-727D-4633-90A3-08D6604D942A-6367-000001742E4F859C.JPG",
      "pic/满帮校招生培训/44BCA0CE-2C32-4EA1-A068-BF66DD823757-6367-0000017685CA3FEF.JPG",
      "pic/满帮校招生培训/2E6AF12B-38A0-4CD9-9518-F62A9E234DFB-6367-000001729ED24A57.JPG",
      "pic/满帮校招生培训/E65B2F60-2E44-4026-B0E2-6B6372E202E5-6367-0000016DBF5C22AD.JPG",
      "pic/满帮校招生培训/9EA6EAA6-56C0-43F5-89DE-6A05A6B0AADA-6367-000001729193B5AF.JPG",
      "pic/满帮校招生培训/0C017C8C-342C-4E9A-BD35-79BC07DA1648-6975-000001839CD8397D.JPG",
      "pic/满帮校招生培训/190C867F-7CF8-4CCD-87B4-61E3BFC92CCC-6975-00000184435A9B82.JPG",
    ],
  },
  {
    id: "business", name: "产运经培训", period: "2026.07.13 — 07.15", duration: "3 天",
    status: "completed", icon: "◇",
    title: "产品 · 运营 · 经营",
    desc: "三天业务通识。满帮的产品逻辑、运营节奏、经营方法论。第一次完整理解「货运匹配」这条链路。",
  },
  {
    id: "algorithm", name: "算法魔鬼训练营", period: "2026.07.16 — 07.25", duration: "2 周",
    status: "current", icon: "◈",
    title: "算法魔鬼训练营 · 第一周",
    desc: "高强度算法训练。货主算法、司机意图、匹配系统、大作业开题。每天 9 点到 22 点。刚结束第一周，正在消化「匹配系统」和「司机意图」相关课程。",
    images: ["pic/满帮校招生培训/D0E8610A-2D96-4BEC-87D8-045E888797F9-3685-0000008BF40EAE46.PNG"],
  },
  {
    id: "rotation", name: "轮岗", period: "2026.07.27 — 08.07", duration: "2 周",
    status: "upcoming", icon: "○",
    title: "部门轮岗",
    desc: "即将进入部门轮岗。在真实业务场景里观察算法、产品、运营如何协作。最终落地到 AI 算法部的数据分析方向。",
  },
];

// ===== 美剧 =====
const SHOWS = ["绝命毒师", "风骚律师", "生活大爆炸", "摩登家庭"];

// ===== DOM 引用 =====
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
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
  { t: "[  OK  ] loading journey ........... 喀什 → 乌鲁木齐 → 上海 → 南京", c: "ok" },
  { t: "[  OK  ] loading playlist .......... 68 tracks · Joji ×6 detected", c: "ok" },
  { t: "[  OK  ] loading memory ............ 23 years of escapology", c: "ok" },
  { t: "[  OK  ] mounting drives ........... /tennis /music /shows", c: "ok" },
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
      ["journey / map", "迁徙地图 + 时间线"],
      ["music", "歌单播放器 · 68 首"],
      ["work", "经历 · 实习 / 大赛 / 工作"],
      ["career", "工作旅程 · 满帮校招培训"],
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
    <div class="whoami-grid">
      <div class="whoami-card id-card">
        <img class="id-avatar" src="pic/证件照.jpg" alt="伊力亚尔" />
        <div class="id-info">
          <h2>伊力亚尔·麦麦提图尔荪</h2>
          <div class="id-en">Ilyar Mamattursun</div>
          <div class="id-meta">b.2003 · 喀什 · INTJ</div>
          <div class="id-tags">
            <span class="id-tag tag-intj">INTJ</span>
            <span class="id-tag">12岁离家东行</span>
            <span class="id-tag">数据分析工程师</span>
            <span class="id-tag tag-joji">Joji 重度循环</span>
          </div>
        </div>
      </div>
      <div class="whoami-card info-card">
        <div class="card-label">基本信息</div>
        <ul class="info-list">
          <li><span class="info-k">籍贯</span><span class="info-v">新疆喀什 · 帕米尔高原脚下</span></li>
          <li><span class="info-k">学历</span><span class="info-v">南京大学 · 信息管理与信息系统 · 2026 届</span></li>
          <li><span class="info-k">现职</span><span class="info-v">满帮集团 · AI 算法部 · 数据分析工程师 · 南京</span></li>
          <li><span class="info-k">实习</span><span class="info-v">同花顺 · 数据分析师</span></li>
          <li><span class="info-k">爱好</span><span class="info-v">酒 — 和自己和解的方式 · 网球 — 不需要语言，把球打回去</span></li>
        </ul>
      </div>
      <div class="whoami-card shows-card">
        <div class="card-label">喜欢的美剧</div>
        <div class="shows-list">
          ${SHOWS.map(s => `<span class="show-tag">${s}</span>`).join("")}
        </div>
      </div>
      <div class="whoami-card creed-card">
        <div class="creed-label">// 人生信条</div>
        <div class="creed-text">真正的稳定不是站在永不变化的地方，<br>而是无论站在哪里，<span class="hl-soft">都有让生活生根发芽的能力</span>。</div>
      </div>
    </div>
  </div>`,

  journey: () => {
    showPanel("map");
    renderMap();
    renderTimeline();
    return `<div class="cmd-output">
      <div class="cmd-line-echo"><span class="echo-prompt">ilyar@kashgar:~$</span> <span class="echo-cmd">journey</span></div>
      <div class="text-block">
        <p class="lead">迁徙轨迹 · 从帕米尔脚下到长三角</p>
        <p class="dim">四个节点，23 年。点击地图节点可跳转到对应故事。<br>每个时期的故事和图片直接在下方时间线里。</p>
      </div>
    </div>`;
  },

  map: function () { return COMMANDS.journey(); },

  music: () => {
    showPanel("music");
    renderPlayer();
    return `<div class="cmd-output">
      <div class="cmd-line-echo"><span class="echo-prompt">ilyar@kashgar:~$</span> <span class="echo-cmd">music</span></div>
      <div class="text-block">
        <p class="lead">real music — 情绪索引</p>
        <p class="dim">68 首歌。点击列表任意一首开始播放。<br>Joji 是锚点。</p>
      </div>
    </div>`;
  },

  work: () => `<div class="cmd-output">
    <div class="cmd-line-echo"><span class="echo-prompt">ilyar@kashgar:~$</span> <span class="echo-cmd">work</span></div>
    <div class="section-title">经历 · 选择</div>
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
        <div class="work-org">同花顺</div>
        <div class="work-desc">第一次真正接触业界，把学校里的理论变成实际的业务逻辑。</div>
      </div>
      <div class="work-item">
        <div class="work-time">2022 — 2026</div>
        <div class="work-role">本科 · 信息管理与信息系统</div>
        <div class="work-org">南京大学</div>
        <div class="work-desc">信管专业。四年间在数据、系统、信息之间反复横跳。</div>
      </div>
    </div>
  </div>`,

  career: () => {
    const stages = CAREER_STAGES.map((s, i) => {
      const statusClass = s.status === "current" ? "current" : s.status === "completed" ? "done" : "future";
      const statusText = s.status === "current" ? "进行中" : s.status === "completed" ? "已完成" : "待开始";
      const imgs = (s.images || []).map(src => `<img src="${src}" alt="${s.name}" loading="lazy" />`).join("");
      const gallery = s.gallery ? `<div class="career-gallery-grid">${s.gallery.map(src =>
        `<div class="gallery-thumb" data-src="${src}"><img src="${src}" alt="素拓" loading="lazy" /></div>`
      ).join("")}</div>` : "";
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
            ${gallery}
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
      <p>这是一个终端模拟器的个人主页。不是简历——是一段<span class="hl">从喀什开始执行的人生脚本</span>。</p>
      <p>设计理念：用命令行交互 + 迁徙地图 + 音乐播放器，把一个人拆解成可探索的系统。</p>
      <p class="dim">// 技术栈：纯 HTML / CSS / JS，无框架。手写 SVG 地图 + 模拟播放器。</p>
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
    const labelOffset = n.type === "now" ? -16 : (i % 2 === 0 ? -15 : 16);
    labelsG.innerHTML += `<text x="${n.x}" y="${n.y + labelOffset}" fill="${color}" style="font-size:11px;font-family:var(--mono);" text-anchor="middle">${n.name}</text>`;
  });

  // 点击节点 → 滚动到时间线对应区块
  nodesG.querySelectorAll(".map-node").forEach(el => {
    el.addEventListener("click", () => {
      const idx = +el.dataset.idx;
      nodesG.querySelectorAll(".map-node").forEach(n => n.classList.remove("active"));
      el.classList.add("active");
      scrollToTimelineNode(idx);
    });
  });

  mapRendered = true;
}

function scrollToTimelineNode(idx) {
  const target = $(`.tl-node[data-idx="${idx}"]`);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    $$(".tl-node").forEach(n => n.classList.remove("highlight"));
    target.classList.add("highlight");
    setTimeout(() => target.classList.remove("highlight"), 2000);
  }
}

// ===== 时间线渲染 =====
function renderTimeline() {
  const wrap = $("#timeline-wrap");
  if (!wrap) return;
  wrap.innerHTML = NODES.map((n, i) => {
    const imgs = n.images.map((src, j) =>
      `<div class="tl-thumb" data-src="${src}"><img src="${src}" alt="${n.name}" loading="lazy" /></div>`
    ).join("");
    const video = n.video ? `<div class="tl-video-wrap"><video src="${n.video}" controls preload="none"></video></div>` : "";
    return `
      <div class="tl-node" data-idx="${i}">
        <div class="tl-rail">
          <div class="tl-dot tl-dot-${n.type}"></div>
        </div>
        <div class="tl-content">
          <div class="tl-header">
            <span class="tl-place">${n.name}</span>
            <span class="tl-period">${n.period}</span>
            <span class="tl-tag">${n.tag}</span>
          </div>
          <div class="tl-title">${n.title}</div>
          <div class="tl-body">${n.body.map(p => `<p>${p}</p>`).join("")}</div>
          ${imgs ? `<div class="tl-gallery">${imgs}</div>` : ""}
          ${video}
        </div>
      </div>
    `;
  }).join("");

  // 绑定图片点击放大
  wrap.querySelectorAll(".tl-thumb").forEach(el => {
    el.addEventListener("click", () => openLightbox(el.dataset.src));
  });
}

// ===== Lightbox =====
function openLightbox(src) {
  let lb = $("#lightbox");
  if (!lb) {
    lb = document.createElement("div");
    lb.id = "lightbox";
    lb.className = "lightbox";
    lb.innerHTML = `<div class="lb-backdrop"></div><img class="lb-img" /><button class="lb-close">×</button>`;
    document.body.appendChild(lb);
    lb.querySelector(".lb-backdrop").addEventListener("click", closeLightbox);
    lb.querySelector(".lb-close").addEventListener("click", closeLightbox);
  }
  lb.querySelector(".lb-img").src = src;
  lb.classList.add("show");
}
function closeLightbox() {
  const lb = $("#lightbox");
  if (lb) lb.classList.remove("show");
}

// ===== 音乐播放器 =====
let currentSongIdx = -1;
let isPlaying = false;
let playTimer = null;
let playProgress = 0;

function renderPlayer() {
  const wrap = $("#player-wrap");
  if (!wrap) return;

  // 歌曲列表
  const listHtml = SONGS.map((s, i) =>
    `<div class="pl-item ${s.j ? "joji" : ""}" data-idx="${i}">
      <span class="pl-num">${String(i + 1).padStart(2, "0")}</span>
      <span class="pl-title">${s.t}</span>
      <span class="pl-artist">${s.a}</span>
      ${s.j ? '<span class="pl-badge">★</span>' : ""}
    </div>`
  ).join("");

  wrap.innerHTML = `
    <div class="player-layout">
      <div class="playlist">
        <div class="pl-header">PLAYLIST · 68 tracks</div>
        <div class="pl-list">${listHtml}</div>
      </div>
      <div class="player-main">
        <div class="vinyl-wrap">
          <div class="vinyl" id="vinyl">
            <div class="vinyl-grooves"></div>
            <div class="vinyl-label" id="vinyl-label">♪</div>
          </div>
        </div>
        <div class="now-playing">
          <div class="np-title" id="np-title">— 选择一首歌开始 —</div>
          <div class="np-artist" id="np-artist">real music · 情绪索引</div>
        </div>
        <div class="spectrum" id="spectrum">
          ${Array.from({ length: 24 }, (_, i) => `<span class="bar" style="animation-delay:${i * 0.05}s"></span>`).join("")}
        </div>
        <div class="progress-wrap">
          <span class="time-current" id="time-current">0:00</span>
          <div class="progress-bar"><div class="progress-fill" id="progress-fill"></div></div>
          <span class="time-total" id="time-total">0:00</span>
        </div>
        <div class="controls">
          <button class="ctrl-btn" id="btn-prev">⏮</button>
          <button class="ctrl-btn ctrl-play" id="btn-play">▶</button>
          <button class="ctrl-btn" id="btn-next">⏭</button>
        </div>
        <a class="search-link" id="search-link" href="#" target="_blank" rel="noopener">在网易云音乐搜索 →</a>
      </div>
    </div>
  `;

  // 绑定列表点击
  wrap.querySelectorAll(".pl-item").forEach(el => {
    el.addEventListener("click", () => {
      selectSong(+el.dataset.idx);
      play();
    });
  });

  // 控制按钮
  $("#btn-play").addEventListener("click", togglePlay);
  $("#btn-prev").addEventListener("click", () => { selectSong((currentSongIdx - 1 + SONGS.length) % SONGS.length); if (isPlaying) play(); });
  $("#btn-next").addEventListener("click", () => { selectSong((currentSongIdx + 1) % SONGS.length); if (isPlaying) play(); });
}

function selectSong(idx) {
  currentSongIdx = idx;
  const s = SONGS[idx];
  $("#np-title").textContent = s.t;
  $("#np-artist").textContent = s.a;
  $("#vinyl-label").textContent = s.j ? "★" : "♪";
  $("#vinyl-label").classList.toggle("joji", !!s.j);
  playProgress = 0;
  updateProgress();
  // 高亮列表
  $$(".pl-item").forEach(el => el.classList.remove("active"));
  const item = $(`.pl-item[data-idx="${idx}"]`);
  if (item) item.classList.add("active");
  // 搜索链接
  $("#search-link").href = `https://music.163.com/#/search/m/?s=${encodeURIComponent(s.t + " " + s.a)}`;
  // 假装歌曲时长
  const dur = 180 + Math.floor(Math.random() * 120);
  $("#time-total").textContent = formatTime(dur);
  $("#time-total").dataset.dur = dur;
}

function play() {
  isPlaying = true;
  $("#btn-play").textContent = "⏸";
  $("#vinyl").classList.add("spinning");
  $("#spectrum").classList.add("active");
  if (playTimer) clearInterval(playTimer);
  const dur = +($("#time-total").dataset.dur || 200);
  playTimer = setInterval(() => {
    playProgress += 1 / dur;
    if (playProgress >= 1) {
      playProgress = 0;
      // 自动下一首
      selectSong((currentSongIdx + 1) % SONGS.length);
    }
    updateProgress();
  }, 1000);
}

function pause() {
  isPlaying = false;
  $("#btn-play").textContent = "▶";
  $("#vinyl").classList.remove("spinning");
  $("#spectrum").classList.remove("active");
  if (playTimer) clearInterval(playTimer);
}

function togglePlay() {
  if (currentSongIdx < 0) {
    selectSong(0);
    play();
    return;
  }
  if (isPlaying) pause(); else play();
}

function updateProgress() {
  const fill = $("#progress-fill");
  const cur = $("#time-current");
  if (fill) fill.style.width = (playProgress * 100) + "%";
  const dur = +($("#time-total").dataset.dur || 200);
  if (cur) cur.textContent = formatTime(Math.floor(playProgress * dur));
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
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
  document.addEventListener("click", (e) => {
    if (terminal.classList.contains("hidden")) return;
    if (e.target.closest("a, button, img, video, input, .map-node, canvas, .pl-item, .lb-close, .lb-backdrop, .tl-thumb, .gallery-thumb")) return;
    cmdInput.focus();
  });
}

// ===== 窗口 resize =====
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {}, 200);
});

// ===== 初始化 =====
let booted = false;
function init() {
  runBoot();
  const tryEnter = (e) => {
    if (booted) return;
    if (e.type === "click" || (e.type === "keydown" && e.key === "Enter")) {
      if (bootHint.classList.contains("hidden")) return;
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
