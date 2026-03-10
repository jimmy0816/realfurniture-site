import { useState } from "react";

const designTokens = {
  colors: {
    primary: {
      wood: { hex: "#8B6914", name: "老檜金", usage: "品牌主色 / CTA / 重要連結" },
      woodLight: { hex: "#C4A35A", name: "淺木金", usage: "Hover / 次要強調" },
      woodDark: { hex: "#5C4A12", name: "深木棕", usage: "Footer / 深色區塊" },
    },
    neutral: {
      parchment: { hex: "#F7F3EC", name: "羊皮紙白", usage: "主要背景色" },
      linen: { hex: "#EDE7DB", name: "亞麻色", usage: "次要背景 / 卡片" },
      warmGray: { hex: "#B8AFA3", name: "暖灰", usage: "邊框 / 分隔線" },
      stone: { hex: "#8C857B", name: "石色", usage: "次要文字" },
      charcoal: { hex: "#2C2824", name: "炭色", usage: "主要文字" },
      ink: { hex: "#1A1714", name: "墨色", usage: "標題 / 導航" },
    },
    accent: {
      sage: { hex: "#7A8B6F", name: "鼠尾草綠", usage: "自然感強調 / 標籤" },
      terracotta: { hex: "#C07B56", name: "赤陶橘", usage: "限量款 / 活動" },
      cream: { hex: "#FBF8F1", name: "奶油白", usage: "Hero 區塊背景" },
    },
    semantic: {
      success: { hex: "#6B8F5C", name: "成功綠", usage: "成功訊息" },
      warning: { hex: "#C4973A", name: "警告黃", usage: "注意提示" },
      error: { hex: "#A65B4C", name: "錯誤紅", usage: "錯誤訊息" },
      info: { hex: "#6B7F96", name: "資訊藍", usage: "說明提示" },
    },
  },
  typography: {
    display: {
      family: "Cormorant Garamond",
      fallback: "Noto Serif TC, serif",
      usage: "Hero 標題 / 品牌宣言 / 大區塊標題",
      weights: ["400 Regular", "500 Medium", "600 SemiBold"],
    },
    heading: {
      family: "Noto Serif TC",
      fallback: "serif",
      usage: "H1-H3 / 文章標題 / 段落標題",
      weights: ["400 Regular", "700 Bold"],
    },
    body: {
      family: "Noto Sans TC",
      fallback: "sans-serif",
      usage: "內文 / UI 元素 / 按鈕 / 表單",
      weights: ["300 Light", "400 Regular", "500 Medium", "700 Bold"],
    },
    mono: {
      family: "JetBrains Mono",
      fallback: "monospace",
      usage: "尺寸規格 / 技術資料 / 價格",
      weights: ["400 Regular"],
    },
  },
  spacing: {
    base: 4,
    scale: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 120, 160],
    labels: [
      "0", "3xs", "2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl"
    ],
  },
};

const componentSpecs = [
  {
    name: "Hero Section",
    source: "Grafton + OH Architecture",
    description: "全幅影像搭配大字排版，左下角品牌標語。影像使用 film-grain 質感濾鏡，暗角處理讓文字可讀。",
    specs: {
      height: "100vh（首頁）/ 70vh（內頁）",
      overlay: "linear-gradient(transparent 40%, rgba(26,23,20,0.7))",
      title: "Cormorant Garamond 48-72px / weight 400",
      subtitle: "Noto Sans TC 16px / weight 300 / letter-spacing 0.1em",
      animation: "fade-up 0.8s ease-out, staggered 0.15s delay",
    },
  },
  {
    name: "Navigation Bar",
    source: "In Common With + ALOT",
    description: "極簡水平導航，Logo 居左。滾動後背景加入磨砂透明效果。漢堡選單在 768px 以下觸發。",
    specs: {
      height: "72px（桌面）/ 56px（行動）",
      background: "透明 → scroll 後 rgba(247,243,236,0.92) + backdrop-blur(12px)",
      font: "Noto Sans TC 14px / weight 500 / letter-spacing 0.08em",
      logo: "SVG / 高度 28px / 左側對齊",
      transition: "background 0.3s ease, box-shadow 0.3s ease",
    },
  },
  {
    name: "Product Card",
    source: "CB2 + NordicNest",
    description: "直式卡片，影像佔 65% 高度。Hover 時影像微放大（scale 1.03），下方浮現「了解更多」。",
    specs: {
      ratio: "3:4（影像區域）",
      borderRadius: "2px",
      shadow: "none → hover: 0 8px 32px rgba(44,40,36,0.08)",
      imageFilter: "hover: brightness(1.02)",
      title: "Noto Serif TC 18px / weight 400",
      price: "JetBrains Mono 16px / weight 400",
      gap: "12px（文字區域內部）",
    },
  },
  {
    name: "Content Article Block",
    source: "OH Architecture + Grafton",
    description: "SEO 內容的核心元件。左側大標 + 右側內文的不對稱雙欄排版。每篇文章附帶職人手作攝影。",
    specs: {
      maxWidth: "1200px",
      gridColumns: "5fr 7fr（桌面）/ 1fr（行動）",
      titleSize: "Cormorant Garamond 36-48px",
      bodySize: "Noto Sans TC 17px / line-height 1.85",
      paragraphSpacing: "24px",
      imagePosition: "交錯排列（奇數左圖右文 / 偶數右圖左文）",
    },
  },
  {
    name: "CTA Button",
    source: "Grafton + In Common With",
    description: "主要 CTA 使用實底按鈕，次要 CTA 使用邊框按鈕。所有按鈕帶有微妙的進場動畫。",
    specs: {
      primary: "bg #8B6914 / text #FBF8F1 / hover → #5C4A12",
      secondary: "border 1px #8B6914 / text #8B6914 / hover → bg #8B6914 text #FBF8F1",
      padding: "14px 32px",
      borderRadius: "0px（方正=工藝感）",
      font: "Noto Sans TC 14px / weight 500 / letter-spacing 0.12em / uppercase",
      transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },
  {
    name: "Footer",
    source: "Ingmar Coenen + Grafton",
    description: "深色背景 Footer，帶有品牌宣言、FB 連結 CTA、以及台南工廠資訊。底部有細線分隔的版權區。",
    specs: {
      background: "#1A1714",
      textColor: "#B8AFA3（一般）/ #F7F3EC（標題）",
      sloganFont: "Cormorant Garamond 28px italic",
      layout: "3 欄（品牌 / 導航 / 聯絡）→ 行動單欄",
      bottomBar: "border-top 1px rgba(184,175,163,0.2)",
    },
  },
];

const pageTemplates = [
  {
    name: "首頁 Homepage",
    purpose: "品牌形象建立 + 內容入口",
    sections: [
      "Hero（全幅職人工作畫面 + 品牌標語）",
      "品牌簡介（不對稱雙欄 + 數字統計）",
      "精選作品（3-4 張水平捲動 Product Card）",
      "工藝故事（影片區塊 or 圖文故事）",
      "最新文章（SEO 內容預覽卡片 ×3）",
      "客戶好評（testimonial slider）",
      "CTA Banner（聯繫 / 前往 FB）",
      "Footer",
    ],
  },
  {
    name: "文章列表 Blog Index",
    purpose: "SEO 流量主要承接頁",
    sections: [
      "頁面標題（簡約 Hero 70vh）",
      "分類篩選列（實木知識 / 空間靈感 / 客製案例 / 保養教學）",
      "文章卡片 Grid（2-3 欄 Masonry）",
      "Pagination / 無限捲動",
      "側邊欄（熱門文章 / 分類 / FB CTA）",
    ],
  },
  {
    name: "文章內頁 Article Detail",
    purpose: "SEO 排名 + 轉導 FB",
    sections: [
      "文章 Hero（標題 + 分類標籤 + 發布日期）",
      "文章內容（Markdown 渲染 / 圖文交錯）",
      "嵌入 CTA（文中穿插聯繫引導）",
      "相關文章推薦（3 張卡片）",
      "Sticky Sidebar CTA（桌面版固定在右側）",
      "FB 粉專連結浮動按鈕",
    ],
  },
  {
    name: "作品集 Portfolio",
    purpose: "展示客製案例建立信任",
    sections: [
      "案例 Grid（Masonry 排列）",
      "篩選（餐桌 / 書桌 / 收納 / 其他）",
      "案例詳情 Lightbox（多圖瀏覽 + 規格資訊）",
    ],
  },
  {
    name: "關於我們 About",
    purpose: "品牌故事 + 工藝信任",
    sections: [
      "品牌故事（時間軸式敘事）",
      "職人介紹（攝影 + 手工過程）",
      "工廠實景（圖片 Gallery）",
      "品牌價值（icon + 文字 3 欄）",
    ],
  },
];

const layoutGuidelines = {
  grid: {
    maxWidth: "1200px",
    columns: "12 欄（桌面）/ 4 欄（行動）",
    gutter: "24px（桌面）/ 16px（行動）",
    margin: "auto（置中）/ 最小邊距 24px",
  },
  breakpoints: [
    { name: "Mobile", min: "0px", max: "767px", cols: 4 },
    { name: "Tablet", min: "768px", max: "1023px", cols: 8 },
    { name: "Desktop", min: "1024px", max: "1439px", cols: 12 },
    { name: "Wide", min: "1440px", max: "—", cols: 12 },
  ],
  verticalRhythm: "Section 間距 80-120px（桌面）/ 48-64px（行動）",
};

const motionSpecs = [
  { name: "Page Enter", value: "fade-up 0.6s cubic-bezier(0.16,1,0.3,1)", trigger: "Page load" },
  { name: "Stagger Children", value: "delay 0.08s per item", trigger: "Section enter viewport" },
  { name: "Scroll Reveal", value: "translateY(24px) → 0, opacity 0→1, 0.5s", trigger: "IntersectionObserver 0.15" },
  { name: "Image Zoom", value: "scale(1) → scale(1.03), 0.4s ease", trigger: "Hover" },
  { name: "Button Hover", value: "background 0.25s, transform 0.2s", trigger: "Hover" },
  { name: "Nav Scroll", value: "background 0.3s, backdrop-filter 0.3s", trigger: "Scroll > 80px" },
  { name: "Page Transition", value: "opacity 0.3s ease-in-out", trigger: "Route change" },
];

const dosAndDonts = {
  dos: [
    "使用大量留白，讓木製品攝影成為視覺焦點",
    "攝影風格統一：自然光 / 暖色調 / 淺景深",
    "文字排版保持呼吸感，line-height ≥ 1.8",
    "CTA 明確指向 FB 或 LINE 聯繫",
    "每篇文章都有 Schema Markup（Article / Product）",
    "行動版優先設計（受眾主要從 FB 行動端進站）",
    "使用 WebP/AVIF 格式 + lazy loading",
    "Serif + Sans-Serif 搭配傳遞「工藝 × 現代」調性",
  ],
  donts: [
    "不使用純白 #FFFFFF 背景（太冷，改用 #F7F3EC）",
    "不使用圓角按鈕（方正 = 工藝的精確感）",
    "不使用亮色系 / 螢光色系",
    "不堆疊過多裝飾元素（讓木頭質感說話）",
    "不在行動版使用複雜動畫（效能優先）",
    "避免 stock photo，所有圖片需為實拍",
    "不使用彈出廣告（內容站信任度為重）",
    "不使用 carousel 自動輪播（改用手動捲動）",
  ],
};

function ColorSwatch({ hex, name, usage }) {
  const isLight = ["#F7F3EC", "#EDE7DB", "#FBF8F1"].includes(hex);
  return (
    <div className="flex items-start gap-3 mb-3">
      <div
        className="w-12 h-12 rounded flex-shrink-0"
        style={{
          backgroundColor: hex,
          border: isLight ? "1px solid #ddd" : "none",
        }}
      />
      <div className="min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold text-gray-800">{name}</span>
          <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">{hex}</code>
        </div>
        <p className="text-xs text-gray-500 mt-0.5">{usage}</p>
      </div>
    </div>
  );
}

function SectionTitle({ children, sub }) {
  return (
    <div className="mb-6 border-b border-gray-200 pb-4">
      <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Georgia, serif" }}>
        {children}
      </h2>
      {sub && <p className="text-sm text-gray-500 mt-1">{sub}</p>}
    </div>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
        active
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      {children}
    </button>
  );
}

export default function DesignSystem() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "概覽" },
    { id: "colors", label: "色彩系統" },
    { id: "typography", label: "字型系統" },
    { id: "components", label: "元件規格" },
    { id: "pages", label: "頁面模板" },
    { id: "layout", label: "版面 & 動效" },
    { id: "rules", label: "設計原則" },
    { id: "css", label: "CSS 變數" },
  ];

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                里爾家具 <span className="font-normal text-gray-400">Real Furniture</span>
              </h1>
              <p className="text-xs text-gray-400">Design System Specification v1.0 — 2026.03</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-400 block">基於 7 個參考網站反向工程</span>
              <span className="text-xs text-gray-300">CB2 · ALOT · NordicNest · Grafton · In Common With · OH Arch · Ingmar Coenen</span>
            </div>
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {tabs.map((t) => (
              <TabButton key={t.id} active={activeTab === t.id} onClick={() => setActiveTab(t.id)}>
                {t.label}
              </TabButton>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* ===== OVERVIEW ===== */}
        {activeTab === "overview" && (
          <div>
            <SectionTitle sub="Brand Design Direction for SEO Content Site">設計方向總覽</SectionTitle>

            {/* Brand Essence */}
            <div className="rounded-lg p-6 mb-8" style={{ backgroundColor: "#F7F3EC" }}>
              <p className="text-center text-lg mb-1" style={{ fontFamily: "Georgia, serif", color: "#2C2824" }}>
                「每一件家具，都是一次與木的對話」
              </p>
              <p className="text-center text-xs" style={{ color: "#8C857B" }}>
                — 里爾家具品牌核心精神
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg p-5">
                <div className="text-xs font-semibold text-gray-400 mb-2 tracking-wider">調性定位</div>
                <div className="space-y-2">
                  {["溫潤手感 Warm Craft", "安靜自信 Quiet Confidence", "在地真誠 Local Authenticity", "現代工藝 Modern Artisan", "內容深度 Content Depth"].map((k) => (
                    <div key={k} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#8B6914" }} />
                      <span className="text-sm text-gray-700">{k}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-5">
                <div className="text-xs font-semibold text-gray-400 mb-2 tracking-wider">設計策略來源</div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong className="text-gray-800">色彩</strong> ← ALOT + NordicNest 的自然暖色</p>
                  <p><strong className="text-gray-800">排版</strong> ← Grafton + OH Arch 的編輯式敘事</p>
                  <p><strong className="text-gray-800">元件</strong> ← CB2 + In Common With 的產品展示</p>
                  <p><strong className="text-gray-800">動效</strong> ← Ingmar Coenen 的精緻互動</p>
                  <p><strong className="text-gray-800">導航</strong> ← In Common With 的極簡結構</p>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-5">
                <div className="text-xs font-semibold text-gray-400 mb-2 tracking-wider">網站目標</div>
                <div className="space-y-3 text-sm text-gray-600">
                  <div>
                    <div className="font-semibold text-gray-800">首要：SEO 內容前門</div>
                    <p>Google 搜尋「實木餐桌」「客製家具台南」等關鍵字流量進站</p>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">次要：品牌信任建立</div>
                    <p>工藝故事 + 案例作品建立專業感</p>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">轉換：導流 FB / LINE</div>
                    <p>每頁都有明確 CTA 導向聯繫管道</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Preview */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="text-xs font-semibold text-gray-400 p-4 pb-2 tracking-wider">色彩預覽</div>
              <div className="flex h-16">
                {["#1A1714", "#2C2824", "#8B6914", "#C4A35A", "#B8AFA3", "#EDE7DB", "#F7F3EC", "#FBF8F1"].map((c) => (
                  <div key={c} className="flex-1" style={{ backgroundColor: c }} />
                ))}
              </div>
              <div className="p-4 flex justify-between text-xs text-gray-400">
                <span>← 深色端（Footer / 導航）</span>
                <span>淺色端（背景 / 留白）→</span>
              </div>
            </div>
          </div>
        )}

        {/* ===== COLORS ===== */}
        {activeTab === "colors" && (
          <div>
            <SectionTitle sub="靈感來源：ALOT Living 的自然木質暖色 + Grafton 的深色奢華層次">色彩系統 Color Palette</SectionTitle>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-4 pb-2 border-b">品牌主色 Primary</h3>
                {Object.values(designTokens.colors.primary).map((c) => (
                  <ColorSwatch key={c.hex} {...c} />
                ))}
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-4 pb-2 border-b">中性色 Neutral</h3>
                {Object.values(designTokens.colors.neutral).map((c) => (
                  <ColorSwatch key={c.hex} {...c} />
                ))}
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-4 pb-2 border-b">強調色 Accent</h3>
                {Object.values(designTokens.colors.accent).map((c) => (
                  <ColorSwatch key={c.hex} {...c} />
                ))}
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-4 pb-2 border-b">語意色 Semantic</h3>
                {Object.values(designTokens.colors.semantic).map((c) => (
                  <ColorSwatch key={c.hex} {...c} />
                ))}
              </div>
            </div>

            <div className="mt-8 p-5 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-bold text-gray-900 mb-3">色彩使用比例指南</h3>
              <div className="flex items-center gap-1 h-8 rounded overflow-hidden mb-3">
                <div className="h-full" style={{ width: "55%", backgroundColor: "#F7F3EC" }} />
                <div className="h-full" style={{ width: "20%", backgroundColor: "#2C2824" }} />
                <div className="h-full" style={{ width: "15%", backgroundColor: "#8B6914" }} />
                <div className="h-full" style={{ width: "5%", backgroundColor: "#7A8B6F" }} />
                <div className="h-full" style={{ width: "5%", backgroundColor: "#C07B56" }} />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>背景 55%</span>
                <span>文字 20%</span>
                <span>品牌色 15%</span>
                <span>強調 10%</span>
              </div>
            </div>

            <div className="mt-8 p-5 rounded-lg" style={{ backgroundColor: "#1A1714" }}>
              <h3 className="text-sm font-bold mb-3" style={{ color: "#F7F3EC" }}>Dark Mode 對照（Footer / 深色區塊）</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                {[
                  { label: "背景", light: "#F7F3EC", dark: "#1A1714" },
                  { label: "主文字", light: "#2C2824", dark: "#F7F3EC" },
                  { label: "次文字", light: "#8C857B", dark: "#B8AFA3" },
                  { label: "CTA", light: "#8B6914", dark: "#C4A35A" },
                ].map((pair) => (
                  <div key={pair.label} className="flex flex-col gap-1">
                    <span style={{ color: "#B8AFA3" }}>{pair.label}</span>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: pair.light, border: "1px solid #333" }} />
                        <span style={{ color: "#8C857B" }}>{pair.light}</span>
                      </div>
                      <span style={{ color: "#5C4A12" }}>→</span>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: pair.dark, border: "1px solid #555" }} />
                        <span style={{ color: "#8C857B" }}>{pair.dark}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== TYPOGRAPHY ===== */}
        {activeTab === "typography" && (
          <div>
            <SectionTitle sub="靈感來源：Grafton 的 Serif 大標題 + OH Architecture 的排版節奏">字型系統 Typography</SectionTitle>

            {/* Font Families */}
            <div className="space-y-6 mb-8">
              {Object.entries(designTokens.typography).map(([key, font]) => (
                <div key={key} className="border border-gray-200 rounded-lg p-5">
                  <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">{font.family}</h3>
                      <span className="text-xs text-gray-400">Fallback: {font.fallback}</span>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{font.usage}</span>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {font.weights.map((w) => (
                      <span key={w} className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">{w}</span>
                    ))}
                  </div>
                  {key === "display" && (
                    <p className="mt-4 text-3xl text-gray-800" style={{ fontFamily: "Georgia, serif" }}>
                      每一件家具，都是一次與木的對話
                    </p>
                  )}
                  {key === "heading" && (
                    <p className="mt-4 text-xl text-gray-800" style={{ fontFamily: "Georgia, serif" }}>
                      台南工藝・實木訂製家具
                    </p>
                  )}
                  {key === "body" && (
                    <p className="mt-4 text-base text-gray-600 leading-relaxed">
                      里爾家具成立於 2018 年，位於台南市永康區。我們堅持以雙手打造每一件作品，從設計到製作一條龍完成，為您的空間量身訂製獨一無二的實木家具。
                    </p>
                  )}
                  {key === "mono" && (
                    <p className="mt-4 text-base text-gray-600" style={{ fontFamily: "monospace" }}>
                      W180 × D90 × H75 cm ・ NT$28,000
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Type Scale */}
            <h3 className="text-sm font-bold text-gray-900 mb-4">字級系統 Type Scale</h3>
            <div className="space-y-4">
              {[
                { label: "Display", size: "48-72px", lh: "1.1", ls: "-0.02em", font: "Cormorant Garamond", sample: "手作實木" },
                { label: "H1", size: "36-48px", lh: "1.2", ls: "-0.01em", font: "Noto Serif TC", sample: "為生活打造永恆的家具" },
                { label: "H2", size: "28-32px", lh: "1.3", ls: "0", font: "Noto Serif TC", sample: "客製化實木餐桌" },
                { label: "H3", size: "22-24px", lh: "1.4", ls: "0", font: "Noto Serif TC", sample: "木材選擇與保養指南" },
                { label: "H4", size: "18-20px", lh: "1.5", ls: "0.01em", font: "Noto Sans TC", sample: "常見問題" },
                { label: "Body", size: "16-17px", lh: "1.85", ls: "0.01em", font: "Noto Sans TC", sample: "我們使用北美黑胡桃木、白橡木等優質木材。" },
                { label: "Small", size: "14px", lh: "1.6", ls: "0.02em", font: "Noto Sans TC", sample: "2024 年 12 月 · 閱讀時間 5 分鐘" },
                { label: "Caption", size: "12px", lh: "1.5", ls: "0.04em", font: "Noto Sans TC", sample: "圖片來源：里爾家具台南工作室" },
              ].map((t) => (
                <div key={t.label} className="flex items-baseline gap-4 pb-3 border-b border-gray-100">
                  <div className="w-20 flex-shrink-0">
                    <span className="text-xs font-semibold text-gray-400">{t.label}</span>
                    <div className="text-xs text-gray-300">{t.size}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 truncate" style={{ fontFamily: t.font === "Noto Sans TC" ? "sans-serif" : "Georgia, serif" }}>
                      {t.sample}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-xs text-gray-400 hidden md:block">
                    LH {t.lh} / LS {t.ls}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== COMPONENTS ===== */}
        {activeTab === "components" && (
          <div>
            <SectionTitle sub="從 7 個參考網站萃取的關鍵 UI 元件規格">元件規格 Component Specs</SectionTitle>

            <div className="space-y-6">
              {componentSpecs.map((comp, i) => (
                <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between p-4 bg-gray-50">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-gray-400 w-6">{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="text-base font-bold text-gray-900">{comp.name}</h3>
                    </div>
                    <span className="text-xs text-gray-400 bg-white px-2 py-1 rounded border border-gray-200">
                      參考 ← {comp.source}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-600 mb-4">{comp.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {Object.entries(comp.specs).map(([key, val]) => (
                        <div key={key} className="flex gap-2 text-sm">
                          <span className="text-gray-400 font-mono text-xs w-24 flex-shrink-0 pt-0.5">{key}</span>
                          <span className="text-gray-700">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Live Button Preview */}
            <div className="mt-8 p-6 rounded-lg" style={{ backgroundColor: "#F7F3EC" }}>
              <h3 className="text-sm font-bold text-gray-900 mb-4">按鈕實際預覽</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <button
                  className="text-sm tracking-widest transition-all"
                  style={{
                    backgroundColor: "#8B6914",
                    color: "#FBF8F1",
                    padding: "14px 32px",
                    border: "none",
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    cursor: "pointer",
                  }}
                >
                  聯繫我們
                </button>
                <button
                  className="text-sm tracking-widest transition-all"
                  style={{
                    backgroundColor: "transparent",
                    color: "#8B6914",
                    padding: "14px 32px",
                    border: "1px solid #8B6914",
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    cursor: "pointer",
                  }}
                >
                  瀏覽作品
                </button>
                <button
                  className="text-sm tracking-widest transition-all underline"
                  style={{
                    backgroundColor: "transparent",
                    color: "#8C857B",
                    padding: "14px 16px",
                    border: "none",
                    fontWeight: 400,
                    letterSpacing: "0.08em",
                    cursor: "pointer",
                  }}
                >
                  了解更多 →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===== PAGES ===== */}
        {activeTab === "pages" && (
          <div>
            <SectionTitle sub="里爾家具 SEO 內容站的 5 個核心頁面模板">頁面模板 Page Templates</SectionTitle>

            <div className="space-y-6">
              {pageTemplates.map((page, i) => (
                <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="flex items-center gap-3 p-4 bg-gray-50">
                    <span className="text-xs font-mono text-gray-400">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="text-base font-bold text-gray-900">{page.name}</h3>
                      <p className="text-xs text-gray-500">{page.purpose}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="space-y-2">
                      {page.sections.map((s, j) => (
                        <div key={j} className="flex items-start gap-3 text-sm">
                          <div className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center flex-shrink-0 text-xs text-gray-400 font-mono">
                            {j + 1}
                          </div>
                          <span className="text-gray-700 pt-0.5">{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* SEO Specific */}
            <div className="mt-8 p-5 border-2 rounded-lg" style={{ borderColor: "#8B6914" }}>
              <h3 className="text-sm font-bold text-gray-900 mb-3">SEO 內容策略特殊需求</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <p className="font-semibold text-gray-800 mb-1">結構化資料</p>
                  <p>每頁嵌入 JSON-LD：Article / LocalBusiness / Product / FAQ / BreadcrumbList</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">內部連結策略</p>
                  <p>文章內嵌入相關產品 / 文章連結，Sidebar 放熱門文章 Widget</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">圖片 SEO</p>
                  <p>所有圖片需有描述性 alt text（含關鍵字），使用 WebP + srcset</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">Core Web Vitals</p>
                  <p>LCP ≤ 2.5s / CLS ≤ 0.1 / INP ≤ 200ms，Hero 圖片 preload</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== LAYOUT & MOTION ===== */}
        {activeTab === "layout" && (
          <div>
            <SectionTitle sub="Grid 系統、斷點規格與動態效果定義">版面與動效 Layout & Motion</SectionTitle>

            {/* Grid */}
            <h3 className="text-sm font-bold text-gray-900 mb-4">Grid 系統</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {Object.entries(layoutGuidelines.grid).map(([k, v]) => (
                <div key={k} className="bg-gray-50 rounded-lg p-4">
                  <div className="text-xs text-gray-400 mb-1">{k}</div>
                  <div className="text-sm font-semibold text-gray-800">{v}</div>
                </div>
              ))}
            </div>

            {/* Breakpoints */}
            <h3 className="text-sm font-bold text-gray-900 mb-4">響應式斷點</h3>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 pr-4 text-gray-400 font-medium text-xs">裝置</th>
                    <th className="text-left py-2 pr-4 text-gray-400 font-medium text-xs">最小寬度</th>
                    <th className="text-left py-2 pr-4 text-gray-400 font-medium text-xs">最大寬度</th>
                    <th className="text-left py-2 text-gray-400 font-medium text-xs">欄數</th>
                  </tr>
                </thead>
                <tbody>
                  {layoutGuidelines.breakpoints.map((bp) => (
                    <tr key={bp.name} className="border-b border-gray-100">
                      <td className="py-2.5 pr-4 font-semibold text-gray-800">{bp.name}</td>
                      <td className="py-2.5 pr-4 font-mono text-gray-600 text-xs">{bp.min}</td>
                      <td className="py-2.5 pr-4 font-mono text-gray-600 text-xs">{bp.max}</td>
                      <td className="py-2.5 font-mono text-gray-600 text-xs">{bp.cols} cols</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Motion */}
            <h3 className="text-sm font-bold text-gray-900 mb-4">動效規格 Motion Specs</h3>
            <p className="text-sm text-gray-500 mb-4">
              靈感來源：Ingmar Coenen 的精緻 Hover + OH Architecture 的 Scroll Reveal + Grafton 的慢速優雅
            </p>
            <div className="space-y-3">
              {motionSpecs.map((m, i) => (
                <div key={i} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-32 flex-shrink-0">
                    <span className="text-sm font-semibold text-gray-800">{m.name}</span>
                  </div>
                  <div className="flex-1 text-sm">
                    <code className="text-xs bg-white px-2 py-0.5 rounded text-gray-600 border border-gray-200">
                      {m.value}
                    </code>
                  </div>
                  <div className="text-xs text-gray-400 w-28 flex-shrink-0">{m.trigger}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
              <strong>效能原則：</strong>行動版（≤ 768px）關閉 Scroll Reveal 與 Stagger 動畫，僅保留 Hover 與 Page Transition。所有動畫使用 transform + opacity（GPU 加速），不使用 margin / top / left 屬性動畫。
            </div>
          </div>
        )}

        {/* ===== RULES ===== */}
        {activeTab === "rules" && (
          <div>
            <SectionTitle sub="基於品牌定位與受眾行為的設計紅線">設計原則 Do's & Don'ts</SectionTitle>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-bold text-green-700 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600">✓</span>
                  Do's — 要做的
                </h3>
                <div className="space-y-3">
                  {dosAndDonts.dos.map((d, i) => (
                    <div key={i} className="flex gap-3 text-sm text-gray-700 p-3 bg-green-50 rounded-lg">
                      <span className="text-green-600 flex-shrink-0">{i + 1}.</span>
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-red-700 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center text-red-600">✕</span>
                  Don'ts — 不做的
                </h3>
                <div className="space-y-3">
                  {dosAndDonts.donts.map((d, i) => (
                    <div key={i} className="flex gap-3 text-sm text-gray-700 p-3 bg-red-50 rounded-lg">
                      <span className="text-red-600 flex-shrink-0">{i + 1}.</span>
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Accessibility */}
            <div className="mt-8 p-5 border border-gray-200 rounded-lg">
              <h3 className="text-sm font-bold text-gray-900 mb-3">無障礙 WCAG 2.1 AA 規範</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div>
                  <p className="font-semibold text-gray-800 mb-1">色彩對比</p>
                  <p>主文字 #2C2824 on #F7F3EC = 對比度 12.8:1 ✓</p>
                  <p>次文字 #8C857B on #F7F3EC = 對比度 4.2:1（大字 ✓）</p>
                  <p>CTA #8B6914 on #FBF8F1 = 對比度 5.1:1 ✓</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">互動元素</p>
                  <p>Focus ring: 2px solid #8B6914 offset 2px</p>
                  <p>最小觸控目標: 44×44px</p>
                  <p>Skip navigation 連結</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">內容</p>
                  <p>所有圖片需有 alt text</p>
                  <p>語意化 HTML 標籤</p>
                  <p>prefers-reduced-motion 支援</p>
                </div>
              </div>
            </div>

            {/* Photography Style */}
            <div className="mt-8 p-5 border border-gray-200 rounded-lg">
              <h3 className="text-sm font-bold text-gray-900 mb-3">攝影風格指南</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <p className="font-semibold text-gray-800 mb-1">產品攝影</p>
                  <p>自然光 / 側光 / 暖色溫 (4500-5500K)</p>
                  <p>淺景深突出木紋細節</p>
                  <p>背景：淺灰牆面或自然環境</p>
                  <p>角度：45° 斜上 + 正面 + 細節特寫</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">工藝過程</p>
                  <p>紀實風格 / 手部特寫 / 工具使用</p>
                  <p>色調偏暖但不過度濾鏡</p>
                  <p>展現「人的溫度」而非冰冷的工業感</p>
                  <p>可加入微量 film grain 質感</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== CSS VARIABLES ===== */}
        {activeTab === "css" && (
          <div>
            <SectionTitle sub="可直接複製貼入專案的 CSS Custom Properties + Tailwind Config">CSS 變數 & 設定檔</SectionTitle>

            <div className="space-y-6">
              {/* CSS Variables */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3">CSS Custom Properties</h3>
                <pre className="bg-gray-900 text-gray-300 text-xs p-5 rounded-lg overflow-x-auto leading-relaxed">
{`:root {
  /* === Colors: Primary === */
  --color-wood: #8B6914;
  --color-wood-light: #C4A35A;
  --color-wood-dark: #5C4A12;
  
  /* === Colors: Neutral === */
  --color-parchment: #F7F3EC;
  --color-linen: #EDE7DB;
  --color-warm-gray: #B8AFA3;
  --color-stone: #8C857B;
  --color-charcoal: #2C2824;
  --color-ink: #1A1714;
  
  /* === Colors: Accent === */
  --color-sage: #7A8B6F;
  --color-terracotta: #C07B56;
  --color-cream: #FBF8F1;
  
  /* === Colors: Semantic === */
  --color-success: #6B8F5C;
  --color-warning: #C4973A;
  --color-error: #A65B4C;
  --color-info: #6B7F96;
  
  /* === Typography === */
  --font-display: 'Cormorant Garamond', 'Noto Serif TC', serif;
  --font-heading: 'Noto Serif TC', serif;
  --font-body: 'Noto Sans TC', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  /* === Spacing (4px base) === */
  --space-3xs: 4px;
  --space-2xs: 8px;
  --space-xs: 12px;
  --space-sm: 16px;
  --space-md: 20px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 40px;
  --space-3xl: 48px;
  --space-4xl: 64px;
  --space-5xl: 80px;
  --space-6xl: 96px;
  --space-7xl: 120px;
  --space-8xl: 160px;
  
  /* === Layout === */
  --max-width: 1200px;
  --gutter: 24px;
  --gutter-mobile: 16px;
  --nav-height: 72px;
  --nav-height-mobile: 56px;
  
  /* === Border Radius === */
  --radius-sm: 2px;
  --radius-md: 4px;
  --radius-lg: 8px;
  
  /* === Shadows === */
  --shadow-sm: 0 1px 3px rgba(44, 40, 36, 0.04);
  --shadow-md: 0 4px 16px rgba(44, 40, 36, 0.06);
  --shadow-lg: 0 8px 32px rgba(44, 40, 36, 0.08);
  --shadow-xl: 0 16px 48px rgba(44, 40, 36, 0.12);
  
  /* === Transitions === */
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast: 0.15s;
  --duration-normal: 0.25s;
  --duration-slow: 0.4s;
  --duration-reveal: 0.6s;
}`}</pre>
              </div>

              {/* Tailwind Config */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3">Tailwind CSS Config (tailwind.config.js)</h3>
                <pre className="bg-gray-900 text-gray-300 text-xs p-5 rounded-lg overflow-x-auto leading-relaxed">
{`module.exports = {
  theme: {
    extend: {
      colors: {
        wood: { DEFAULT: '#8B6914', light: '#C4A35A', dark: '#5C4A12' },
        parchment: '#F7F3EC',
        linen: '#EDE7DB',
        'warm-gray': '#B8AFA3',
        stone: '#8C857B',
        charcoal: '#2C2824',
        ink: '#1A1714',
        sage: '#7A8B6F',
        terracotta: '#C07B56',
        cream: '#FBF8F1',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', '"Noto Serif TC"', 'serif'],
        heading: ['"Noto Serif TC"', 'serif'],
        body: ['"Noto Sans TC"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      spacing: {
        '3xs': '4px', '2xs': '8px', 'xs': '12px',
        '2xl': '40px', '3xl': '48px', '4xl': '64px',
        '5xl': '80px', '6xl': '96px', '7xl': '120px', '8xl': '160px',
      },
      maxWidth: { content: '1200px' },
      boxShadow: {
        card: '0 4px 16px rgba(44, 40, 36, 0.06)',
        'card-hover': '0 8px 32px rgba(44, 40, 36, 0.08)',
        elevated: '0 16px 48px rgba(44, 40, 36, 0.12)',
      },
      borderRadius: { sm: '2px', md: '4px', lg: '8px' },
      transitionTimingFunction: {
        default: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
}`}</pre>
              </div>

              {/* Google Fonts Import */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3">Google Fonts 載入</h3>
                <pre className="bg-gray-900 text-gray-300 text-xs p-5 rounded-lg overflow-x-auto leading-relaxed">
{`<!-- HTML Head -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Noto+Sans+TC:wght@300;400;500;700&family=Noto+Serif+TC:wght@400;700&family=JetBrains+Mono&display=swap" rel="stylesheet">

<!-- 效能建議 -->
<!-- 1. Noto Sans TC 為主要字體，preload 最關鍵的 woff2 -->
<!-- 2. Cormorant Garamond 僅用於 Display，可 lazy load -->
<!-- 3. JetBrains Mono 極少使用，defer 載入 -->`}</pre>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 mt-12 py-6 text-center text-xs text-gray-400">
        里爾家具 Design System v1.0 — Generated 2026.03 — Based on reverse engineering of CB2, ALOT Living, NordicNest, Grafton, In Common With, OH Architecture, Ingmar Coenen
      </div>
    </div>
  );
}
