import React, { useState, useEffect } from 'react';
import { BookOpen, Library, Search, ChevronLeft, X, CheckCircle, Bookmark, Volume2, User, Star, ChevronRight, PlayCircle, Sparkles, Lock, Unlock, ArrowRight, Activity, Filter, Grid, List, Zap, Cpu, ShieldCheck } from 'lucide-react';

// --- 1. REAL VOCAB DATA (保持不变：精选 50 个四级高频词) ---
const VOCAB_DATABASE = [
  // Set 1: Words 1-15
  { id: 1, word: "slip", phonetic: "/slɪp/", definition: "v. 滑倒；溜走；下降 n. 差错；纸片", example_en: "Profits slipped this quarter.", example_cn: "本季度利润下滑了。" },
  { id: 2, word: "obstacle", phonetic: "/ˈɑːbstəkl/", definition: "n. 障碍，干扰", example_en: "Overcome the obstacle.", example_cn: "克服障碍。" },
  { id: 3, word: "odd", phonetic: "/ɑːd/", definition: "adj. 奇特的；临时的；奇数的", example_en: "It seems a bit odd.", example_cn: "这看起来有点奇怪。" },
  { id: 4, word: "opportunity", phonetic: "/ˌɑːpərˈtuːnəti/", definition: "n. 机会，时机", example_en: "Seize the opportunity.", example_cn: "抓住机会。" },
  { id: 5, word: "optional", phonetic: "/ˈɑːpʃənl/", definition: "adj. 可选择的", example_en: "This course is optional.", example_cn: "这门课是选修的。" },
  { id: 6, word: "optimistic", phonetic: "/ˌɑːptɪˈmɪstɪk/", definition: "adj. 乐观的", example_en: "Keep an optimistic attitude.", example_cn: "保持乐观的态度。" },
  { id: 7, word: "arbitrary", phonetic: "/ˈɑːrbɪtreri/", definition: "adj. 任意的；武断的", example_en: "An arbitrary decision.", example_cn: "一个武断的决定。" },
  { id: 8, word: "architecture", phonetic: "/ˈɑːrkɪtektʃər/", definition: "n. 建筑学；架构", example_en: "Modern architecture.", example_cn: "现代建筑。" },
  { id: 9, word: "absolute", phonetic: "/ˈæbsəluːt/", definition: "adj. 绝对的", example_en: "Absolute power.", example_cn: "绝对的权力。" },
  { id: 10, word: "adequate", phonetic: "/ˈædɪkwət/", definition: "adj. 充足的；胜任的", example_en: "Adequate preparation.", example_cn: "充分的准备。" },
  { id: 11, word: "advertisement", phonetic: "/ˌædvərˈtaɪzmənt/", definition: "n. 广告", example_en: "Place an advertisement.", example_cn: "投放广告。" },
  { id: 12, word: "academic", phonetic: "/ˌækəˈdemɪk/", definition: "adj. 学术的", example_en: "Academic performance.", example_cn: "学术表现。" },
  { id: 13, word: "alcohol", phonetic: "/ˈælkəhɔːl/", definition: "n. 酒精", example_en: "Avoid alcohol.", example_cn: "避免饮酒。" },
  { id: 14, word: "appetite", phonetic: "/ˈæpɪtaɪt/", definition: "n. 食欲；欲望", example_en: "Loss of appetite.", example_cn: "食欲不振。" },
  { id: 15, word: "acid", phonetic: "/ˈæsɪd/", definition: "n. 酸 adj. 酸性的；尖刻的", example_en: "Acid rain.", example_cn: "酸雨。" },

  // Set 2: Words 16-30
  { id: 16, word: "barrier", phonetic: "/ˈbæriər/", definition: "n. 障碍；屏障", example_en: "Language barrier.", example_cn: "语言障碍。" },
  { id: 17, word: "budget", phonetic: "/ˈbʌdʒɪt/", definition: "n. 预算 v. 编预算", example_en: "Over budget.", example_cn: "超出预算。" },
  { id: 18, word: "candidate", phonetic: "/ˈkændɪdeɪt/", definition: "n. 候选人", example_en: "The best candidate.", example_cn: "最佳人选。" },
  { id: 19, word: "career", phonetic: "/kəˈrɪr/", definition: "n. 生涯，职业", example_en: "Pursue a career.", example_cn: "追求事业。" },
  { id: 20, word: "casual", phonetic: "/ˈkæʒuəl/", definition: "adj. 随便的；临时的", example_en: "Casual wear.", example_cn: "休闲装。" },
  { id: 21, word: "ceremony", phonetic: "/ˈserəmənoʊ/", definition: "n. 典礼，仪式", example_en: "Opening ceremony.", example_cn: "开幕式。" },
  { id: 22, word: "chaos", phonetic: "/ˈkeɪɑːs/", definition: "n. 混乱", example_en: "Total chaos.", example_cn: "一片混乱。" },
  { id: 23, word: "character", phonetic: "/ˈkærəktər/", definition: "n. 性格；角色；特征", example_en: "Strong character.", example_cn: "坚强的性格。" },
  { id: 24, word: "charity", phonetic: "/ˈtʃærəti/", definition: "n. 慈善；施舍", example_en: "Charity event.", example_cn: "慈善活动。" },
  { id: 25, word: "charm", phonetic: "/tʃɑːrm/", definition: "n. 魅力 v. 迷住", example_en: "Personal charm.", example_cn: "个人魅力。" },
  { id: 26, word: "campaign", phonetic: "/kæmˈpeɪn/", definition: "n. 战役；运动", example_en: "Marketing campaign.", example_cn: "营销活动。" },
  { id: 27, word: "cancel", phonetic: "/ˈkænsl/", definition: "v. 取消", example_en: "Cancel the meeting.", example_cn: "取消会议。" },
  { id: 28, word: "capacity", phonetic: "/kəˈpæsəti/", definition: "n. 容量；能力", example_en: "Full capacity.", example_cn: "满负荷。" },
  { id: 29, word: "capture", phonetic: "/ˈkæptʃər/", definition: "v. 捕获；夺取", example_en: "Capture the market.", example_cn: "占领市场。" },
  { id: 30, word: "category", phonetic: "/ˈkætəɡɔːri/", definition: "n. 种类，范畴", example_en: "Product category.", example_cn: "产品类别。" },

  // Set 3: Words 31-50
  { id: 31, word: "debate", phonetic: "/dɪˈbeɪt/", definition: "n./v. 辩论，争论", example_en: "Heated debate.", example_cn: "激烈的辩论。" },
  { id: 32, word: "decade", phonetic: "/ˈdekeɪd/", definition: "n. 十年", example_en: "Over the last decade.", example_cn: "在过去十年里。" },
  { id: 33, word: "decline", phonetic: "/dɪˈklaɪn/", definition: "v. 下降；衰退；婉拒", example_en: "Sales declined.", example_cn: "销售额下降了。" },
  { id: 34, word: "decorate", phonetic: "/ˈdekəreɪt/", definition: "v. 装饰", example_en: "Decorate the room.", example_cn: "装饰房间。" },
  { id: 35, word: "decrease", phonetic: "/dɪˈkriːs/", definition: "v. 减少", example_en: "Decrease costs.", example_cn: "降低成本。" },
  { id: 36, word: "defeat", phonetic: "/dɪˈfiːt/", definition: "v. 击败 n. 失败", example_en: "Admit defeat.", example_cn: "承认失败。" },
  { id: 37, word: "defect", phonetic: "/ˈdiːfekt/", definition: "n. 缺陷", example_en: "Birth defect.", example_cn: "先天缺陷。" },
  { id: 38, word: "define", phonetic: "/dɪˈfaɪn/", definition: "v. 定义；规定", example_en: "Define the problem.", example_cn: "定义问题。" },
  { id: 39, word: "definite", phonetic: "/ˈdefɪnət/", definition: "adj. 明确的，肯定的", example_en: "A definite answer.", example_cn: "一个明确的答复。" },
  { id: 40, word: "delicate", phonetic: "/ˈdelɪkət/", definition: "adj. 精致的；脆弱的", example_en: "Delicate instrument.", example_cn: "精密仪器。" },
  { id: 41, word: "delicious", phonetic: "/dɪˈlɪʃəs/", definition: "adj. 美味的", example_en: "Delicious food.", example_cn: "美味的食物。" },
  { id: 42, word: "delight", phonetic: "/dɪˈlaɪt/", definition: "n. 高兴 v. 使高兴", example_en: "To my delight.", example_cn: "令我高兴的是。" },
  { id: 43, word: "deliver", phonetic: "/dɪˈlɪvər/", definition: "v. 交付；发表；接生", example_en: "Deliver a speech.", example_cn: "发表演讲。" },
  { id: 44, word: "demand", phonetic: "/dɪˈmænd/", definition: "n./v. 要求；需求", example_en: "Supply and demand.", example_cn: "供求关系。" },
  { id: 45, word: "democracy", phonetic: "/dɪˈmɑːkrəsi/", definition: "n. 民主", example_en: "Fight for democracy.", example_cn: "为民主而战。" },
  { id: 46, word: "demonstrate", phonetic: "/ˈdemənstreɪt/", definition: "v. 证明；示威", example_en: "Demonstrate ability.", example_cn: "展示能力。" },
  { id: 47, word: "dense", phonetic: "/dens/", definition: "adj. 密集的；浓厚的", example_en: "Dense fog.", example_cn: "浓雾。" },
  { id: 48, word: "deny", phonetic: "/dɪˈnaɪ/", definition: "v. 否认；拒绝", example_en: "Deny the rumor.", example_cn: "否认谣言。" },
  { id: 49, word: "depart", phonetic: "/dɪˈpɑːrt/", definition: "v. 离开；出发", example_en: "Depart for London.", example_cn: "启程去伦敦。" },
  { id: 50, word: "deposit", phonetic: "/dɪˈpɑːzɪt/", definition: "v. 存放；沉淀 n. 存款", example_en: "Make a deposit.", example_cn: "存款。" }
];

// --- 2. STORY CONTENT (保持不变：都市脑洞/上交国家题材) ---
const STORIES = [
  {
    id: "chapter_1",
    title: "第一章：上交系统",
    category: "都市脑洞 / 爱国",
    level: "Lv.1 (Words 1-15)",
    description: "重生2024，你看着眼前这行诡异的蓝色代码，做出了一个违背祖宗的决定：不当神豪，直接上交国家！",
    content: [
      { type: "text", value: "那天，我正盯着电脑屏幕发呆，突然发现世界的 " },
      { type: "vocab", id: 8, display: "architecture" }, // architecture
      { type: "text", value: " 出现了一丝裂痕。这绝对不是系统的 " },
      { type: "vocab", id: 1, display: "slip" }, // slip
      { type: "text", value: " 。\n\n一行行幽蓝色的数据在我眼前跳动，这是一个极其 " },
      { type: "vocab", id: 3, display: "odd" }, // odd
      { type: "text", value: " 的现象。系统提示：“检测到高维科技库，是否绑定？”\n\n大多数人会认为这是成为首富的 " },
      { type: "vocab", id: 4, display: "opportunity" }, // opportunity
      { type: "text", value: " ，但我知道，这是国运崛起的关键。我没有任何 " },
      { type: "vocab", id: 14, display: "appetite" }, // appetite
      { type: "text", value: " 去享受个人的奢靡生活，哪怕有 " },
      { type: "vocab", id: 13, display: "alcohol" }, // alcohol
      { type: "text", value: " 麻痹神经，我也清醒地知道，上交国家不是 " },
      { type: "vocab", id: 5, display: "optional" }, // optional
      { type: "text", value: " 选项，而是必须。\n\n我拨通了那个神秘电话，声音因为激动而显得不那么 " },
      { type: "vocab", id: 12, display: "academic" }, // academic
      { type: "text", value: " ：“我有 " },
      { type: "vocab", id: 9, display: "absolute" }, // absolute
      { type: "text", value: " 把握，能让我们的科技领先世界五十年。但我需要 " },
      { type: "vocab", id: 10, display: "adequate" }, // adequate
      { type: "text", value: " 的安保。”\n\n对面沉默了，但我很 " },
      { type: "vocab", id: 6, display: "optimistic" }, // optimistic
      { type: "text", value: " 。因为我知道，国家不会拒绝任何一个赤子之心。" }
    ],
    choice: {
      question: "接线员质疑你的情报，你如何回应？",
      options: [
        { id: "A", text: "挂断电话，自己搞研发 (Be Arbitrary)", feedback: "格局小了！个人力量在国家机器面前微不足道，你很快被境外势力盯上。", correct: false },
        { id: "B", text: "给出坐标，请求立即接管 (Seize Opportunity)", feedback: "格局打开！五分钟后，国安局直升机降落在你家楼顶。国家队入场！", correct: true, nextChapterId: "chapter_2" }
      ]
    }
  },
  {
    id: "chapter_2",
    title: "第二章：国门防线",
    category: "国运 / 守护",
    level: "Lv.2 (Words 16-30)",
    description: "异界裂缝开启，全球陷入混乱。在国家的不计代价的支持下，你将筑起一道守护万家灯火的钢铁长城。",
    isLocked: true, 
    content: [
      { type: "text", value: "随着“南天门计划”的启动，国家发起了一场史无前例的 " },
      { type: "vocab", id: 26, display: "campaign" }, // campaign
      { type: "text", value: " 。\n\n面对即将到来的异界入侵，我们不再有 " },
      { type: "vocab", id: 17, display: "budget" }, // budget
      { type: "text", value: " 上限。曾经的科研 " },
      { type: "vocab", id: 16, display: "barrier" }, // barrier
      { type: "text", value: " 被一一攻破。全球陷入一片 " },
      { type: "vocab", id: 22, display: "chaos" }, // chaos
      { type: "text", value: " ，西方国家甚至 " },
      { type: "vocab", id: 27, display: "cancelled" }, // cancel
      { type: "text", value: " 了所有航班，但华夏大地依然秩序井然。\n\n我不再是那个穿着 " },
      { type: "vocab", id: 20, display: "casual" }, // casual
      { type: "text", value: " 衣服的宅男，而是成为了守护者计划的核心 " },
      { type: "vocab", id: 18, display: "candidate" }, // candidate
      { type: "text", value: " 。这需要极强的 " },
      { type: "vocab", id: 23, display: "character" }, // character
      { type: "text", value: " 和意志力。\n\n“我们的 " },
      { type: "vocab", id: 28, display: "capacity" }, // capacity
      { type: "text", value: " 足以容纳十四亿人，”首长在启动 " },
      { type: "vocab", id: 21, display: "ceremony" }, // ceremony
      { type: "text", value: " 上庄严宣布，“我们将 " },
      { type: "vocab", id: 29, display: "capture" }, // capture
      { type: "text", value: " 每一个入侵者，绝不让战火波及本土。”" }
    ],
    choice: {
      question: "第一波兽潮来袭，防御系统尚未满载，你决定？",
      options: [
        { id: "A", text: "请求国际Charity援助 (Wait for Help)", feedback: "天真！非我族类其心必异，等待只会换来灭亡。", correct: false },
        { id: "B", text: "全功率开启能量护盾 (Full Capacity)", feedback: "燃起来了！九州结界开启，御敌于国门之外！全网泪目：此生无悔入华夏！", correct: true, nextChapterId: "chapter_3" }
      ]
    }
  },
  {
    id: "chapter_3",
    title: "第三章：举世震惊",
    category: "大国 / 崛起",
    level: "Lv.3 (Words 31-50)",
    description: "当全世界都在衰退中挣扎时，东方巨龙已腾空而起。这不再是辩论，而是降维打击。",
    isLocked: true,
    content: [
      { type: "text", value: "联合国大会上，爆发了一场激烈的 " },
      { type: "vocab", id: 31, display: "debate" }, // debate
      { type: "text", value: " 。西方代表试图 " },
      { type: "vocab", id: 48, display: "deny" }, // deny
      { type: "text", value: " 我们的贡献，声称我们的防御塔有致命 " },
      { type: "vocab", id: 37, display: "defect" }, // defect
      { type: "text", value: " 。\n\n看着他们国力日渐 " },
      { type: "vocab", id: 33, display: "decline" }, // decline
      { type: "text", value: " ，我感到一丝可笑。我们用过去一个 " },
      { type: "vocab", id: 32, display: "decade" }, // decade
      { type: "text", value: " 的隐忍，换来了今天的爆发。\n\n“既然你们质疑，”我按下按钮，“那我们就 " },
      { type: "vocab", id: 46, display: "demonstrate" }, // demonstrate
      { type: "text", value: " 一下什么叫降维打击。”\n\n天空中，" },
      { type: "vocab", id: 47, display: "dense" }, // dense
      { type: "text", value: " 的机甲军团破云而出。这不是为了 " },
      { type: "vocab", id: 36, display: "defeat" }, // defeat
      { type: "text", value: " 谁，而是为了 " },
      { type: "vocab", id: 38, display: "define" }, // define
      { type: "text", value: " 新的秩序。这是一个 " },
      { type: "vocab", id: 39, display: "definite" }, // definite
      { type: "text", value: " 的信号：巨龙已醒。" }
    ],
    choice: {
      question: "面对各国的震惊，你最后的宣言是？",
      options: [
        { id: "A", text: "Demand compensation (索要赔偿)", feedback: "格局太小。我们要的是星辰大海，不是那点赔款。", correct: false },
        { id: "B", text: "Deliver hope to humanity (输出人类命运共同体)", feedback: "这才是大国风范！虽然他们曾经针对我们，但为了人类文明，我们选择领航！", correct: true, isEnd: true }
      ]
    }
  }
];

// --- 3. COMPONENTS ---

const VocabPopover = ({ vocabId, onClose, status, onToggleStatus }) => {
  const vocab = VOCAB_DATABASE.find(v => v.id === vocabId);
  if (!vocab) return null;

  const isMastered = status?.mastered;
  const isSaved = status?.saved;

  const playAudio = () => {
    const utterance = new SpeechSynthesisUtterance(vocab.word);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4 animate-in fade-in duration-300" onClick={onClose}>
      <div 
        className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden ring-1 ring-white/50 border border-white/50 animate-in zoom-in-95 duration-300 relative" 
        onClick={e => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

        <div className="p-6 pb-4 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 rounded-full p-1 hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
          
          <div className="flex items-baseline gap-3 mb-2">
            <h2 className="text-3xl font-black text-slate-800 tracking-tight font-sans bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-600">{vocab.word}</h2>
            <button onClick={playAudio} className="p-1.5 bg-indigo-50 rounded-full text-indigo-600 hover:bg-indigo-100 transition-colors">
              <Volume2 size={18} />
            </button>
          </div>
          <span className="text-sm font-mono text-purple-600 font-medium">{vocab.phonetic}</span>
        </div>

        <div className="px-6 pb-6 space-y-5">
          <div>
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">
              <Sparkles size={10} className="text-blue-400"/> Definition
            </h4>
            <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-line font-medium">
                {vocab.definition}
            </div>
          </div>
          
          {(vocab.example_en || vocab.example_cn) && (
            <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 p-4 rounded-xl border border-slate-100">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Example</h4>
              <p className="text-slate-800 text-sm mb-1.5 font-medium leading-snug">"{vocab.example_en}"</p>
              <p className="text-slate-500 text-xs">{vocab.example_cn}</p>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button 
              onClick={() => onToggleStatus(vocab.id, 'mastered')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                isMastered 
                  ? 'bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-inner' 
                  : 'bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-lg hover:shadow-xl hover:scale-[1.02]'
              }`}
            >
              <CheckCircle size={16} />
              {isMastered ? 'Mastered' : 'Mark Done'}
            </button>
            <button 
              onClick={() => onToggleStatus(vocab.id, 'saved')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-300 border ${
                isSaved 
                  ? 'bg-amber-50 border-amber-200 text-amber-600 shadow-inner' 
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} />
              {isSaved ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomeView = ({ onOpenStory, userStatus, unlockedChapters, onNavigateToLibrary }) => {
  const masteredCount = Object.values(userStatus).filter(s => s.mastered).length;
  const savedCount = Object.values(userStatus).filter(s => s.saved).length;
  
  const totalVocabCount = VOCAB_DATABASE.length;
  const progressPercentage = Math.round((masteredCount / totalVocabCount) * 100);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-24">
      {/* 顶部统计卡片 */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white p-6 shadow-2xl shadow-indigo-500/20">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-[50px] rounded-full -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 blur-[50px] rounded-full -ml-10 -mb-10"></div>
        
        <div className="relative z-10">
           <div className="flex justify-between items-center mb-6">
             <h2 className="text-sm font-medium text-slate-300 uppercase tracking-wider">系统同步率 (Sync Rate)</h2>
             <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full">
               <Activity size={12} className="text-emerald-400"/>
               <span className="text-xs font-bold">{progressPercentage}%</span>
             </div>
           </div>
           
           <div className="flex gap-4">
             <div 
               onClick={() => onNavigateToLibrary('mastered')}
               className="flex-1 bg-white/5 rounded-2xl p-4 hover:bg-white/10 transition-colors cursor-pointer group border border-white/5 hover:border-white/20 active:scale-95 duration-200"
             >
               <div className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300 group-hover:scale-105 transition-transform origin-left">
                 {masteredCount}
               </div>
               <div className="text-xs text-slate-400 font-medium mt-1 flex items-center gap-1.5 group-hover:text-emerald-200 transition-colors">
                 <CheckCircle size={14} /> 已装载
                 <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-1" />
               </div>
             </div>

             <div 
               onClick={() => onNavigateToLibrary('saved')}
               className="flex-1 bg-white/5 rounded-2xl p-4 hover:bg-white/10 transition-colors cursor-pointer group border border-white/5 hover:border-white/20 active:scale-95 duration-200"
             >
               <div className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-orange-300 group-hover:scale-105 transition-transform origin-left">
                 {savedCount}
               </div>
               <div className="text-xs text-slate-400 font-medium mt-1 flex items-center gap-1.5 group-hover:text-amber-200 transition-colors">
                 <Bookmark size={14} /> 待解析
                 <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-1" />
               </div>
             </div>
           </div>
        </div>
      </div>

      {/* 故事列表 */}
      <div className="space-y-5">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
           <Zap size={14} className="text-yellow-500 fill-yellow-500"/> 核心任务 (Main Quests)
        </h2>
        {STORIES.map((story, index) => {
          const isLocked = story.isLocked && !unlockedChapters.includes(story.id);
          return (
            <div 
              key={story.id}
              onClick={() => !isLocked && onOpenStory(story)}
              className={`group relative bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-white/50 transition-all duration-300 ${
                isLocked 
                  ? 'opacity-70 grayscale cursor-not-allowed bg-slate-100' 
                  : 'hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-100 cursor-pointer hover:-translate-y-1'
              }`}
            >
              {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="bg-slate-200/50 backdrop-blur-sm p-3 rounded-full text-slate-500 shadow-sm border border-white">
                    <Lock size={20} />
                  </div>
                </div>
              )}

              {!isLocked && <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-indigo-100/50 pointer-events-none transition-all"></div>}

              <div className="flex justify-between items-start mb-3">
                <span className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full tracking-wide shadow-sm ${
                  isLocked 
                    ? 'bg-slate-200 text-slate-400' 
                    : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                }`}>
                  {story.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">{story.level}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2 leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all">
                {story.title}
              </h3>
              <p className="text-sm text-slate-500 line-clamp-2 mb-5 leading-relaxed">
                {story.description}
              </p>
              <div className="flex items-center justify-between text-xs font-medium pt-3 border-t border-slate-100">
                <span className="text-slate-400">{isLocked ? '完成前置任务解锁' : '15 个核心词条'}</span>
                {!isLocked && (
                  <div className="flex items-center gap-1 text-indigo-600 group-hover:translate-x-1 transition-transform">
                    执行任务 <ChevronRight size={14} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ReadingView = ({ story, userStatus, setUserStatus, onBack, onCompleteChapter }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [activeVocabId, setActiveVocabId] = useState(null);

  const handleToggleStatus = (id, type) => {
    setUserStatus(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [type]: !prev[id]?.[type]
      }
    }));
  };

  const handleOptionSelect = (opt) => {
    setSelectedOption(opt);
    if (opt.correct) {
      if (opt.nextChapterId) {
        setTimeout(() => {
          onCompleteChapter(opt.nextChapterId); 
        }, 2000); 
      } else if (opt.isEnd) {
        // End handling
      }
    }
  }

  return (
    <div className="flex flex-col h-full bg-slate-50/50 relative animate-in slide-in-from-bottom-4 duration-500">
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-white/20 z-10 px-4 py-4 flex items-center justify-between shadow-sm">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <div className="flex-1 text-center">
           <div className="font-bold text-sm text-slate-800 truncate">{story.title}</div>
           <div className="text-[10px] text-slate-400 uppercase tracking-wide">任务执行中...</div>
        </div>
        <div className="w-8"></div> 
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-8 pb-40">
        <div className="mb-10 text-center">
           <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-widest rounded-full mb-3">
             {story.level}
           </span>
           <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2 leading-tight">{story.title}</h1>
        </div>
        
        <div className="text-lg leading-[2.4] text-slate-700 font-serif text-justify selection:bg-purple-100">
          {story.content.map((item, idx) => {
            if (item.type === "text") return <span key={idx} className="whitespace-pre-wrap">{item.value}</span>;
            
            const vocab = VOCAB_DATABASE.find(v => v.id === item.id);
            const status = userStatus[item.id];
            const isMastered = status?.mastered;

            return (
              <span 
                key={idx} 
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveVocabId(item.id);
                }}
                className={`
                  px-2 py-0.5 mx-0.5 rounded-lg cursor-pointer font-bold transition-all inline-block select-none relative group
                  ${isMastered 
                    ? 'text-emerald-600 bg-emerald-50/50 decoration-emerald-200 underline decoration-2 underline-offset-4' 
                    : 'text-indigo-700 bg-indigo-50/80 decoration-indigo-300 underline decoration-2 underline-offset-4 hover:bg-indigo-100 hover:text-indigo-900'
                  }
                `}
              >
                {item.display}
                {!isMastered && <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full border-2 border-white"></span>}
              </span>
            );
          })}
        </div>

        {story.choice && (
          <div className="mt-16 bg-white/80 backdrop-blur rounded-3xl p-8 shadow-xl shadow-indigo-500/5 border border-white/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"></div>
            
            <h3 className="text-xs font-bold text-slate-400 mb-6 uppercase tracking-widest flex items-center gap-2">
              <PlayCircle size={14} className="text-purple-500"/> 抉择时刻 (Decision)
            </h3>
            
            <p className="font-bold text-slate-900 mb-6 text-lg">{story.choice.question}</p>

            <div className="space-y-4">
              {story.choice.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleOptionSelect(opt)}
                  disabled={selectedOption !== null}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 ${
                    selectedOption?.id === opt.id
                      ? opt.correct 
                        ? "bg-emerald-50 border-emerald-400 text-emerald-800" 
                        : "bg-rose-50 border-rose-400 text-rose-800"
                      : "bg-white border-slate-100 shadow-sm hover:border-indigo-300 hover:shadow-md hover:scale-[1.01]"
                  }`}
                >
                  <div className="font-bold text-sm flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border ${
                         selectedOption?.id === opt.id ? 'border-current' : 'border-slate-300 text-slate-400'
                    }`}>
                        {opt.id}
                    </span>
                    {opt.text}
                  </div>
                  {selectedOption?.id === opt.id && (
                    <div className="text-xs opacity-90 animate-in slide-in-from-top-2 mt-3 pl-9 font-medium leading-relaxed">
                      {opt.feedback}
                      {opt.correct && opt.nextChapterId && (
                        <div className="mt-2 text-indigo-600 font-bold flex items-center gap-1">
                          解锁下一阶段... <ArrowRight size={12}/>
                        </div>
                      )}
                      {opt.correct && opt.isEnd && (
                         <div className="mt-2 text-indigo-600 font-bold">
                           🎉 任务完成！国运+999!
                         </div>
                      )}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {activeVocabId && (
        <VocabPopover 
          vocabId={activeVocabId} 
          status={userStatus[activeVocabId]}
          onToggleStatus={handleToggleStatus}
          onClose={() => setActiveVocabId(null)} 
        />
      )}
    </div>
  );
};

const VocabListView = ({ userStatus, filterMode, setFilterMode }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVocab = VOCAB_DATABASE.filter(v => {
    const matchesSearch = v.word.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          v.definition.includes(searchTerm);
    
    const status = userStatus[v.id];
    let matchesStatus = true;
    if (filterMode === 'mastered') {
        matchesStatus = status?.mastered;
    } else if (filterMode === 'saved') {
        matchesStatus = status?.saved;
    }

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-24">
      {/* Search Bar - Glass */}
      <div className="sticky top-0 pt-2 pb-2 z-20 -mx-4 px-4 bg-slate-50/90 backdrop-blur-lg border-b border-white/20">
        <div className="relative shadow-sm group mb-3">
          <Search className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
          <input 
            type="text"
            placeholder="Search System Database..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 p-3.5 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm font-medium shadow-sm"
          />
        </div>

        {/* ✨ Filter Buttons */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'all', label: 'All Entries', icon: List },
            { id: 'mastered', label: 'Loaded', icon: CheckCircle },
            { id: 'saved', label: 'Pending', icon: Bookmark },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setFilterMode(mode.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${
                filterMode === mode.id
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                  : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <mode.icon size={12} strokeWidth={2.5} />
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3">
        {filteredVocab.map((v) => {
          const status = userStatus[v.id];
          return (
            <div key={v.id} className="bg-white p-5 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 flex justify-between items-start group">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`font-bold text-lg tracking-tight ${status?.mastered ? 'text-emerald-600 line-through decoration-emerald-300 opacity-60' : 'text-slate-800'}`}>
                    {v.word}
                  </span>
                  {status?.mastered && <CheckCircle size={14} className="text-emerald-500" />}
                  {status?.saved && <Bookmark size={14} className="text-amber-500 fill-amber-500" />}
                </div>
                <div className="text-xs font-mono text-purple-500 mb-2">{v.phonetic}</div>
                <p className="text-sm text-slate-600 line-clamp-1 group-hover:line-clamp-none transition-all duration-300 font-medium">
                  {v.definition}
                </p>
              </div>
            </div>
          );
        })}
        {filteredVocab.length === 0 && (
          <div className="text-center text-slate-400 py-20 flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                <Search size={32} className="opacity-40" />
            </div>
            <p>No entries found.</p>
            {filterMode !== 'all' && (
                <button onClick={() => setFilterMode('all')} className="text-indigo-600 text-xs font-bold hover:underline">
                    Clear Filters
                </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};


// --- 4. MAIN LAYOUT (主布局) ---
export default function App() {
  const [currentView, setCurrentView] = useState('home'); 
  const [activeStory, setActiveStory] = useState(null);
  const [userStatus, setUserStatus] = useState({});
  const [unlockedChapters, setUnlockedChapters] = useState(["chapter_1"]);
  const [libraryFilter, setLibraryFilter] = useState('all');

  const handleOpenStory = (story) => {
    setActiveStory(story);
    setCurrentView('reader');
  };

  const handleCompleteChapter = (nextChapterId) => {
    if (!unlockedChapters.includes(nextChapterId)) {
      setUnlockedChapters(prev => [...prev, nextChapterId]);
    }
    setTimeout(() => {
        setCurrentView('home');
    }, 1000);
  };

  const handleNavigateToLibrary = (filterMode) => {
      setLibraryFilter(filterMode);
      setCurrentView('library');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
            <HomeView 
                onOpenStory={handleOpenStory} 
                userStatus={userStatus} 
                unlockedChapters={unlockedChapters}
                onNavigateToLibrary={handleNavigateToLibrary} 
            />
        );
      case 'reader':
        return (
          <ReadingView 
            story={activeStory} 
            userStatus={userStatus} 
            setUserStatus={setUserStatus} 
            onBack={() => setCurrentView('home')} 
            onCompleteChapter={handleCompleteChapter}
          />
        );
      case 'library':
        return (
            <VocabListView 
                userStatus={userStatus} 
                filterMode={libraryFilter}
                setFilterMode={setLibraryFilter}
            />
        );
      default:
        return <HomeView onOpenStory={handleOpenStory} userStatus={userStatus} unlockedChapters={unlockedChapters} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex justify-center selection:bg-indigo-100 selection:text-indigo-900">
      
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-200/20 rounded-full blur-[100px]"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-200/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="w-full max-w-md bg-white/60 backdrop-blur-xl shadow-2xl shadow-indigo-200/50 min-h-screen flex flex-col overflow-hidden relative z-10 border-x border-white/50">
        
        {/* Header */}
        {currentView !== 'reader' && (
          <div className="px-6 py-5 border-b border-white/20 bg-white/70 backdrop-blur-xl sticky top-0 z-30">
            <div className="flex justify-between items-center mb-1">
               <div className="flex items-center gap-2">
                 <div className="bg-gradient-to-br from-slate-900 to-indigo-900 text-white p-2 rounded-xl shadow-lg shadow-indigo-500/20">
                   <Cpu size={20} />
                 </div>
                 <h1 className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-800">
                   异界词条<span className="text-indigo-500">.</span>
                 </h1>
               </div>
               <div className="flex items-center gap-2">
                 <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded-full border border-indigo-100">SYSTEM.X</span>
                 <div className="w-8 h-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full flex items-center justify-center text-indigo-400 border border-white shadow-sm">
                   <User size={16} />
                 </div>
               </div>
            </div>
          </div>
        )}

        <div className={`flex-1 overflow-y-auto scroll-smooth ${currentView !== 'reader' ? 'p-5' : ''}`}>
          {renderContent()}
        </div>

        {/* Bottom Navigation */}
        {currentView !== 'reader' && (
          <div className="sticky bottom-6 mx-6 mb-2 bg-slate-900/90 backdrop-blur-xl text-white p-1.5 rounded-3xl shadow-2xl shadow-slate-900/20 z-40 border border-white/10">
            <div className="flex justify-around items-center relative">
              <button
                onClick={() => {
                    setCurrentView('home');
                    setLibraryFilter('all'); 
                }}
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-2xl transition-all duration-300 relative z-10 ${
                  currentView === 'home' ? "bg-white/10 text-white shadow-inner" : "text-slate-400 hover:text-white"
                }`}
              >
                <ShieldCheck size={20} strokeWidth={currentView === 'home' ? 2.5 : 2} />
                <span className={`text-xs font-bold transition-all ${currentView === 'home' ? 'opacity-100 max-w-xs' : 'opacity-0 max-w-0 hidden'}`}>基地 (Base)</span>
              </button>
              
              <button
                onClick={() => setCurrentView('library')}
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-2xl transition-all duration-300 relative z-10 ${
                  currentView === 'library' ? "bg-white/10 text-white shadow-inner" : "text-slate-400 hover:text-white"
                }`}
              >
                <Library size={20} strokeWidth={currentView === 'library' ? 2.5 : 2} />
                <span className={`text-xs font-bold transition-all ${currentView === 'library' ? 'opacity-100 max-w-xs' : 'opacity-0 max-w-0 hidden'}`}>档案 (Files)</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}