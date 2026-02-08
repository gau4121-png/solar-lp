import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ChevronRight, AlertTriangle, X, Calculator, ArrowRight, Phone, Menu, Shield, Users, Award, Star, Zap, Clock, MapPin, Wrench, ThumbsUp, BadgeCheck, ChevronDown, Building2, Crown, Sparkles, CircleDollarSign, Hammer, HeartHandshake, ShieldCheck, Factory, Globe, Leaf } from "lucide-react";
import { Simulator } from "@/components/Simulator";
import { ContactForm } from "@/components/ContactForm";
import { AdminNotificationBadge } from "@/components/AdminNotificationBadge";
import { useState, useEffect, useCallback, useRef } from "react";

/* ─── Animated Counter Component ─── */
function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 1500;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isVisible, target]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

/* ─── Solar Icon SVG ─── */
function SolarIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="14" r="7" fill="#F97316" />
      <line x1="20" y1="2" x2="20" y2="5" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="20" y1="23" x2="20" y2="26" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="9" y1="14" x2="12" y2="14" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="28" y1="14" x2="31" y2="14" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="12.2" y1="6.2" x2="14.3" y2="8.3" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="25.7" y1="19.7" x2="27.8" y2="21.8" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="27.8" y1="6.2" x2="25.7" y2="8.3" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="14.3" y1="19.7" x2="12.2" y2="21.8" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="6" y="28" width="28" height="4" rx="1" fill="#1e3a5f" />
      <rect x="8" y="32" width="6" height="6" rx="0.5" fill="#2563eb" stroke="#1e3a5f" strokeWidth="0.5" />
      <rect x="17" y="32" width="6" height="6" rx="0.5" fill="#2563eb" stroke="#1e3a5f" strokeWidth="0.5" />
      <rect x="26" y="32" width="6" height="6" rx="0.5" fill="#2563eb" stroke="#1e3a5f" strokeWidth="0.5" />
    </svg>
  );
}

/* ─── Cost Structure Diagram ─── */
function CostDiagram() {
  return (
    <div className="flex flex-col sm:flex-row items-end justify-center gap-6 sm:gap-12 py-8">
      {/* Left: Self-construction (shorter = cheaper) */}
      <div className="flex flex-col items-center w-full sm:w-48">
        <div className="relative mb-3 w-full">
          <div className="bg-white border-2 border-gray-200 rounded-lg px-3 py-2 text-center shadow-sm">
            <span className="text-primary font-bold text-sm">自社施工</span>だから<br/>
            <span className="font-bold text-sm">無駄なコストなし</span>
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-200" />
        </div>
        <div className="w-full rounded-t-lg overflow-hidden border-2 border-primary/30">
          <div className="bg-primary/90 text-white text-center py-6 px-2">
            <p className="font-bold text-sm">自社施工</p>
            <p className="font-bold text-sm">会社の利益</p>
          </div>
          <div className="bg-orange-100 text-center py-10 px-2 border-t-2 border-primary/20">
            <p className="font-bold text-primary text-lg">工事代金</p>
          </div>
        </div>
        <p className="mt-3 font-bold text-primary text-center text-sm">ダイマツ<br/><span className="text-lg">適正価格</span></p>
      </div>

      {/* Arrow */}
      <div className="hidden sm:flex flex-col items-center self-center">
        <div className="text-primary font-bold text-4xl">→</div>
      </div>
      <div className="sm:hidden flex justify-center">
        <div className="text-primary font-bold text-2xl rotate-90">→</div>
      </div>

      {/* Right: Via intermediary (taller = more expensive) */}
      <div className="flex flex-col items-center w-full sm:w-48">
        <div className="relative mb-3 w-full">
          <div className="bg-white border-2 border-red-200 rounded-lg px-3 py-2 text-center shadow-sm">
            <span className="text-red-600 font-bold text-sm">2社の利益分、</span><br/>
            <span className="text-red-600 font-bold text-sm">価格が高く</span>なる
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-red-200" />
        </div>
        <div className="w-full rounded-t-lg overflow-hidden border-2 border-red-200">
          <div className="bg-red-500 text-white text-center py-5 px-2">
            <p className="font-bold text-sm">営業会社の利益</p>
          </div>
          <div className="bg-red-300 text-white text-center py-5 px-2 border-t border-red-400">
            <p className="font-bold text-sm">下請けの利益</p>
          </div>
          <div className="bg-orange-100 text-center py-10 px-2 border-t-2 border-red-200">
            <p className="font-bold text-red-600 text-lg">工事代金</p>
          </div>
        </div>
        <p className="mt-3 font-bold text-red-500 text-center text-sm">紹介サイト経由<br/><span className="text-lg">割高な価格</span></p>
      </div>
    </div>
  );
}

export default function Home() {
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const scrollToSection = useCallback((id: string) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, []);

  const navItems = [
    { id: "cost", label: "なぜ安い？" },
    { id: "guarantee", label: "安心保証" },
    { id: "makers", label: "おすすめメーカー" },
    { id: "recommend", label: "推奨業者" },
    { id: "voice", label: "お客様の声" },
    { id: "contact", label: "無料相談" },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">

      {/* ═══════════════════ TOP BAR ═══════════════════ */}
      <div className="bg-primary text-white text-center py-1.5 text-xs sm:text-sm font-medium">
        <div className="container flex items-center justify-center gap-4 flex-wrap">
          <span>施工実績 <strong className="text-lg">500</strong>件以上</span>
          <span className="hidden sm:inline">|</span>
          <span>顧客満足度 <strong className="text-lg">98</strong>%</span>
          <span className="hidden sm:inline">|</span>
          <span>埼玉・東京エリア対応</span>
        </div>
      </div>

      {/* ═══════════════════ HEADER ═══════════════════ */}
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? "bg-white shadow-md border-b border-orange-100" 
          : "bg-white"
      }`}>
        <div className="container flex h-16 md:h-18 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <SolarIcon className="h-10 w-10 shrink-0" />
            <div className="flex flex-col leading-tight">
              <span className="text-sm md:text-base font-bold text-gray-800 tracking-tight">太陽光・蓄電池ガイド</span>
              <span className="text-[10px] md:text-xs text-primary font-medium">埼玉・東京エリア専門</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-0.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary rounded-lg hover:bg-orange-50 transition-all"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden xl:flex items-center gap-3">
            <AdminNotificationBadge />
            <a href="tel:0484869274" className="flex items-center gap-1.5 text-sm font-bold text-gray-700 hover:text-primary transition-colors">
              <Phone className="h-4 w-4 text-primary" />
              048-486-9274
            </a>
            <Button
              onClick={() => scrollToSection('simulator')}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-white font-bold shadow-md hover:shadow-lg transition-all animate-pulse-glow"
            >
              <Calculator className="mr-2 h-4 w-4" />
              無料シミュレーション
            </Button>
          </div>

          {/* Mobile Right Actions */}
          <div className="flex xl:hidden items-center gap-2">
            <AdminNotificationBadge />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center justify-center h-10 w-10 rounded-lg hover:bg-orange-50 transition-colors"
              aria-label={mobileMenuOpen ? "メニューを閉じる" : "メニューを開く"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`xl:hidden fixed inset-0 top-16 z-40 bg-black/40 transition-opacity duration-300 ${
            mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Mobile Menu Panel */}
        <div
          className={`xl:hidden fixed top-16 right-0 z-50 w-72 max-w-[85vw] h-[calc(100dvh-4rem)] bg-white shadow-xl transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="flex flex-col p-6 gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-orange-50 hover:text-primary transition-colors text-left"
              >
                {item.label}
              </button>
            ))}
            <div className="border-t border-gray-200 my-3" />
            <a href="tel:0484869274" className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-bold text-primary">
              <Phone className="h-5 w-5" />
              048-486-9274
            </a>
            <Button
              onClick={() => scrollToSection('simulator')}
              variant="default"
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-bold w-full mt-2"
            >
              <Calculator className="mr-2 h-5 w-5" />
              無料シミュレーション
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">

        {/* ═══════════════════ HERO SECTION ═══════════════════ */}
        <section className="relative bg-white overflow-hidden">
          {/* Decorative dots (like Tainavi) */}
          <div className="absolute top-0 left-0 w-48 h-48 dot-pattern-light opacity-60" />
          <div className="absolute bottom-0 right-0 w-64 h-64 dot-pattern-light opacity-40" />
          
          <div className="container relative z-10 py-12 md:py-20">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left: Text Content */}
              <div className="text-center lg:text-left">
                {/* Badges */}
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
                  <span className="inline-flex items-center bg-secondary text-white px-4 py-1.5 rounded text-xs sm:text-sm font-bold shadow-sm" style={{ transform: "rotate(-2deg)" }}>
                    太陽光発電は60万円〜！
                  </span>
                  <span className="inline-flex items-center bg-secondary text-white px-4 py-1.5 rounded text-xs sm:text-sm font-bold shadow-sm" style={{ transform: "rotate(1deg)" }}>
                    ローン活用で初期費用0円も可！
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-black leading-tight mb-4 text-gray-900">
                  <span className="text-primary text-4xl sm:text-5xl md:text-6xl lg:text-7xl">自社施工</span>だから<br/>
                  <span className="text-gray-800">どこよりも安い。</span>
                </h1>

                <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed max-w-lg mx-auto lg:mx-0">
                  紹介サイトの手数料<span className="text-red-500 font-bold">10〜15%</span>をカット。<br/>
                  同じメーカー・同じ工事内容で<span className="font-bold text-primary">最大100万円以上</span>お得に。
                </p>

                {/* Trust badges */}
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
                  {[
                    { icon: <ShieldCheck className="h-4 w-4" />, text: "完全自社施工" },
                    { icon: <MapPin className="h-4 w-4" />, text: "地域密着15年" },
                    { icon: <Hammer className="h-4 w-4" />, text: "施工実績500件+" },
                  ].map((badge, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 bg-orange-50 text-primary px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border border-orange-200">
                      {badge.icon}
                      {badge.text}
                    </span>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <Button onClick={() => scrollToSection('simulator')} size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold text-lg px-8 h-14 shadow-lg hover:shadow-xl transition-all animate-pulse-glow">
                    まずは無料シミュレーション
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button onClick={() => scrollToSection('cost')} size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-orange-50 font-bold text-lg px-8 h-14">
                    なぜ安いのか見る
                  </Button>
                </div>
              </div>

              {/* Right: Hero Image */}
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-orange-200">
                  <img 
                    src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663229898008/GiCxXcqQDSejsvOe.jpg" 
                    alt="埼玉県・東京エリアの住宅街と太陽光パネル" 
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                  />
                  {/* Overlay badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary rounded-full p-2 shrink-0">
                        <Phone className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">お電話でのご相談・お見積り</p>
                        <p className="text-xl font-bold text-gray-800">048-486-9274</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Decorative circle */}
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full border-4 border-primary/20 hidden lg:block" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-primary/10 hidden lg:block" />
              </div>
            </div>
          </div>

          {/* Orange wave divider */}
          <div className="w-full overflow-hidden leading-none" style={{ marginBottom: "-1px" }}>
            <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="w-full h-10 md:h-16">
              <path d="M0,40 C300,80 600,0 900,40 C1050,60 1150,20 1200,40 L1200,80 L0,80 Z" fill="#fff7ed" />
            </svg>
          </div>
        </section>

        {/* ═══════════════════ COST STRUCTURE SECTION ═══════════════════ */}
        <section id="cost" className="py-16 md:py-24 bg-gradient-warm">
          <div className="container">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                <CircleDollarSign className="h-4 w-4" />
                コスト構造を公開
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-3">
                なぜダイマツは<span className="text-primary">安い</span>のか？
              </h2>
              <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
                紹介サイトを通すと、あなたの見積もりに<span className="text-red-500 font-bold">10〜15%の紹介料</span>が上乗せされます。<br/>
                自社施工のダイマツなら、その分をまるごとカットできます。
              </p>
            </div>

            {/* Cost Diagram */}
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10 border border-orange-100">
              <CostDiagram />
            </div>

            {/* Comparison Numbers */}
            <div className="grid sm:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto">
              {[
                { label: "紹介サイトの手数料", value: "10〜15%", sub: "契約額に対して", color: "text-red-500", bg: "bg-red-50", border: "border-red-100" },
                { label: "ダイマツなら削減", value: "最大100万円+", sub: "同じ工事内容で", color: "text-primary", bg: "bg-orange-50", border: "border-orange-100" },
                { label: "中間マージン", value: "0円", sub: "完全自社施工", color: "text-green-600", bg: "bg-green-50", border: "border-green-100" },
              ].map((item, i) => (
                <div key={i} className={`${item.bg} ${item.border} border rounded-xl p-5 text-center`}>
                  <p className="text-xs text-gray-500 font-medium mb-1">{item.label}</p>
                  <p className={`text-2xl md:text-3xl font-black ${item.color}`}>{item.value}</p>
                  <p className="text-xs text-gray-400 mt-1">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════ GUARANTEE SECTION ═══════════════════ */}
        <section id="guarantee" className="py-16 md:py-24 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                <ShieldCheck className="h-4 w-4" />
                安心の保証
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-3">
                <span className="text-primary">本当の自社施工</span>だからできる<br/>安心の工事保証
              </h2>
              <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
                紹介サイトの「工事完了保証」は、業者が倒産した場合に別の業者を手配するだけ。<br/>
                ダイマツは<strong>最初から最後まで同じ職人が責任を持って施工</strong>します。
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Left: What others do */}
              <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-red-100 p-2 rounded-full">
                    <AlertTriangle className="h-6 w-6 text-red-500" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-700">紹介サイトの「工事完了保証」</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "業者が倒産した場合のみ適用",
                    "別の知らない業者が工事を引き継ぐ",
                    "施工品質の一貫性は保証されない",
                    "紹介料が見積もりに上乗せされている",
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <X className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                      <span className="text-gray-600 text-sm">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: What Daimatsu does */}
              <div className="bg-orange-50 rounded-2xl p-6 md:p-8 border-2 border-primary/30 relative">
                <div className="absolute -top-3 left-6 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold">
                  ダイマツの場合
                </div>
                <div className="flex items-center gap-3 mb-6 mt-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">本当の自社施工保証</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "営業から施工・アフターまで全て自社社員",
                    "同じ職人が最初から最後まで責任施工",
                    "地元だからトラブル時もすぐ駆けつけ",
                    "中間マージン0円で適正価格を実現",
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm font-medium">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════ MANUFACTURER SECTION ═══════════════════ */}
        <section id="makers" className="py-16 md:py-24 bg-gradient-warm">
          <div className="container">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                <Crown className="h-4 w-4" />
                プロが選ぶ
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-3">
                施工のプロがおすすめする<br/><span className="text-primary">太陽光パネルメーカー</span>
              </h2>
              <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
                500件以上の施工実績から、コスパ・品質・耐久性で本当におすすめできるメーカーを厳選しました。
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
              {/* Canadian Solar */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all overflow-hidden bg-white">
                <div className="h-2 bg-gradient-to-r from-primary to-orange-400" />
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-50 p-3 rounded-xl">
                        <Globe className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <span className="text-xs text-primary font-bold bg-orange-50 px-2 py-0.5 rounded">海外メーカー No.1</span>
                        <CardTitle className="text-xl mt-1">カナディアンソーラー</CardTitle>
                      </div>
                    </div>
                    <Crown className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    世界トップクラスのシェアを持つカナダ発のメーカー。高い発電効率とコストパフォーマンスのバランスが抜群で、住宅用から産業用まで幅広く対応。25年の出力保証付き。
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["コスパ抜群", "世界シェア上位", "25年保証", "高耐久"].map((tag, i) => (
                      <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">{tag}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Choshu Industry */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all overflow-hidden bg-white">
                <div className="h-2 bg-gradient-to-r from-red-500 to-primary" />
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-red-50 p-3 rounded-xl">
                        <Factory className="h-8 w-8 text-red-600" />
                      </div>
                      <div>
                        <span className="text-xs text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded">国産メーカー No.1</span>
                        <CardTitle className="text-xl mt-1">長州産業</CardTitle>
                      </div>
                    </div>
                    <Crown className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    山口県に本社を置く国内トップメーカー。日本の住宅屋根に最適化された製品設計が強み。国内生産による品質管理の徹底と、手厚い保証体制が安心のポイントです。
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["国内生産", "日本の屋根に最適", "手厚い保証", "高品質"].map((tag, i) => (
                      <span key={i} className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-medium">{tag}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-10">
              <p className="text-gray-500 text-sm">
                ※お客様の屋根の形状・向き・ご予算に合わせて最適なメーカーをご提案します。上記以外のメーカーも取り扱いがございます。
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════ SIMULATOR SECTION ═══════════════════ */}
        <section id="simulator" className="py-16 md:py-24 bg-secondary text-white relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10">
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663229898008/PonDGGtMRvWKIfcR.jpg" alt="Background" className="w-full h-full object-cover" />
          </div>
          <div className="container relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-white/15">
                  <Calculator className="h-4 w-4 text-primary" />
                  簡単30秒
                </span>
                <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">あなたの家なら<br/>いくら安くなる？</h2>
                <p className="text-blue-200 mb-8 text-lg leading-relaxed">
                  現在の電気代を入力するだけで、太陽光・蓄電池導入による
                  <span className="font-bold text-primary"> 年間削減額</span>と<span className="font-bold text-primary">適正工事価格</span>の目安がわかります。
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "わずか30秒で完了",
                    "個人情報の入力不要",
                    "自社施工の適正価格ベース",
                  ].map((text, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="bg-primary rounded-full p-1.5 shrink-0">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-blue-100">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Simulator />
            </div>
          </div>
        </section>

        {/* ═══════════════════ RECOMMEND SECTION ═══════════════════ */}
        <section id="recommend" className="py-16 md:py-24 bg-white">
          <div className="container">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                <Award className="h-4 w-4" />
                編集部のイチオシ
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-3">
                埼玉・東京エリアで選ぶなら<br/><span className="text-primary">「株式会社ダイマツ」</span>
              </h2>
              <p className="text-gray-600 text-lg">
                なぜダイマツなのか？その理由は「圧倒的なコストパフォーマンス」と「地元での信頼」にあります。
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
              {[
                {
                  num: "01",
                  icon: <CircleDollarSign className="h-8 w-8" />,
                  title: "完全自社施工で\n中間マージン0円",
                  desc: "営業から施工、アフターフォローまで全て自社社員が対応。下請けを使わないため、大手他社より20〜30%安い適正価格を実現しています。",
                },
                {
                  num: "02",
                  icon: <MapPin className="h-8 w-8" />,
                  title: "地域密着15年以上の\n信頼と実績",
                  desc: "朝霞市・新座市を中心に、2010年の設立以来、地域に根ざして活動。逃げも隠れもしない地元の施工店だからこそ、無理な売り込みは一切ありません。",
                },
                {
                  num: "03",
                  icon: <HeartHandshake className="h-8 w-8" />,
                  title: "職人の顔が見える\n安心感",
                  desc: "「どんな人が工事に来るのか不安」という心配は無用。経験豊富な自社職人が、責任を持って丁寧に施工します。",
                },
              ].map((card, i) => (
                <Card key={i} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden bg-white">
                  <div className="h-2 bg-gradient-to-r from-primary to-orange-400" />
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="bg-primary/10 text-primary p-3 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                        {card.icon}
                      </div>
                      <span className="text-4xl font-black text-primary/15">{card.num}</span>
                    </div>
                    <CardTitle className="text-lg md:text-xl whitespace-pre-line leading-snug">{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">{card.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTA Box */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 md:p-12 text-center border-2 border-primary/20 shadow-sm">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 mb-6">
                まずは無料で見積もり・シミュレーションを
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                他社の見積もりをお持ちの方は、ぜひ比較してみてください。<br/>
                その安さと提案内容の違いに驚くはずです。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold text-lg sm:text-xl px-8 sm:px-12 py-7 sm:py-8 h-auto shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 animate-pulse-glow" asChild>
                  <a href="http://daimatsu.link/" target="_blank" rel="noopener noreferrer">
                    ダイマツの施工事例と価格を見る
                    <ArrowRight className="ml-2 h-6 w-6" />
                  </a>
                </Button>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                ※しつこい営業は一切ありませんのでご安心ください
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════ TESTIMONIALS SECTION ═══════════════════ */}
        <section id="voice" className="py-16 md:py-24 bg-gradient-warm">
          <div className="container">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                <Star className="h-4 w-4" />
                お客様の声
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-3">実際に導入されたお客様の声</h2>
              <p className="text-gray-600 text-lg">地域のお客様から高い評価をいただいています</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  name: "S.T. 様",
                  area: "朝霞市",
                  rating: 5,
                  text: "他社の見積もりと比べて40万円以上安く、しかも施工も丁寧でした。営業の方も無理な押し売りがなく、安心して任せられました。",
                  detail: "4.5kW太陽光 + 蓄電池",
                },
                {
                  name: "M.K. 様",
                  area: "新座市",
                  rating: 5,
                  text: "訪問販売の見積もりが高すぎて不安でしたが、ダイマツさんに相談して正解でした。同じメーカーの製品で100万円近く違いました。",
                  detail: "6kW太陽光 + 蓄電池",
                },
                {
                  name: "Y.A. 様",
                  area: "志木市",
                  rating: 5,
                  text: "設置後のアフターフォローが素晴らしいです。ちょっとした質問にもすぐ対応してくれて、地元の業者さんにして本当に良かったです。",
                  detail: "5kW太陽光",
                },
              ].map((testimonial, i) => (
                <Card key={i} className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, j) => (
                        <Star key={j} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-6 text-base">
                      「{testimonial.text}」
                    </p>
                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                      <div>
                        <p className="font-bold text-gray-800">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.area}</p>
                      </div>
                      <span className="text-xs bg-orange-50 text-primary px-3 py-1 rounded-full font-medium">{testimonial.detail}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════ CONTACT SECTION ═══════════════════ */}
        <section id="contact" className="py-16 md:py-24 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                <Phone className="h-4 w-4" />
                無料相談
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-4">匿名で無料相談</h2>
              <p className="text-gray-600 text-lg">
                「この見積もり高い？」「うちの屋根に乗る？」など、<br className="hidden sm:block" />
                ちょっとした疑問でもお気軽にご相談ください。
              </p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      {/* ═══════════════════ MOBILE FIXED FOOTER ═══════════════════ */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 flex gap-3 shadow-[0_-4px_12px_-1px_rgba(0,0,0,0.1)]">
        <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold h-12" asChild>
          <a href="tel:0484869274">
            <Phone className="mr-2 h-4 w-4" />
            電話で相談
          </a>
        </Button>
        <Button className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold h-12" asChild>
          <a href="http://daimatsu.link/" target="_blank" rel="noopener noreferrer">
            施工事例と価格を見る
          </a>
        </Button>
      </div>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer className="bg-gray-900 text-white pt-16 pb-8 mb-16 md:mb-0">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-10 mb-12">
            {/* Column 1: About */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <SolarIcon className="h-8 w-8" />
                <span className="font-bold text-lg">太陽光・蓄電池ガイド</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                当サイトは、太陽光発電・蓄電池の導入を検討されている方へ、施工のプロの視点から、業界の裏側と有益な情報を提供することを目的としています。
              </p>
            </div>

            {/* Column 2: Navigation */}
            <div>
              <h4 className="font-bold text-lg mb-4">コンテンツ</h4>
              <ul className="space-y-2.5">
                {[
                  { id: "cost", label: "なぜ安い？" },
                  { id: "guarantee", label: "安心の保証" },
                  { id: "makers", label: "おすすめメーカー" },
                  { id: "simulator", label: "簡易シミュレーション" },
                  { id: "recommend", label: "推奨業者" },
                  { id: "voice", label: "お客様の声" },
                  { id: "contact", label: "無料相談" },
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="text-gray-400 hover:text-primary transition-colors text-sm"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Recommended */}
            <div>
              <h4 className="font-bold text-lg mb-4">推奨業者情報</h4>
              <div className="space-y-3 text-sm text-gray-400">
                <p><strong className="text-white">株式会社ダイマツ</strong></p>
                <p>
                  <MapPin className="inline h-4 w-4 mr-1 text-primary" />
                  埼玉県朝霞市
                </p>
                <p>
                  <Phone className="inline h-4 w-4 mr-1 text-primary" />
                  048-486-9274
                </p>
                <p>
                  対応エリア：朝霞市、新座市、志木市、和光市、<br/>
                  その他埼玉県全域・東京エリア
                </p>
                <Button size="sm" variant="outline" className="mt-2 border-gray-600 text-gray-300 hover:bg-white/10 hover:text-white" asChild>
                  <a href="http://daimatsu.link/" target="_blank" rel="noopener noreferrer">
                    公式サイトを見る
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} 太陽光・蓄電池 業者選びガイド（埼玉・東京エリア）. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
