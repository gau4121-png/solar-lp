import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ChevronRight, AlertTriangle, X, Calculator, ArrowRight, Phone, Menu, Sun, Shield, Users, Award, Star, Zap, Clock, MapPin, Wrench, ThumbsUp, BadgeCheck, ChevronDown } from "lucide-react";
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

/* ─── Wave Divider SVG Components ─── */
function WaveDividerTop({ color = "#f8fafc", className = "" }: { color?: string; className?: string }) {
  return (
    <div className={`w-full overflow-hidden leading-none ${className}`} style={{ marginBottom: "-1px" }}>
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 md:h-24">
        <path d="M0,60 C200,120 400,0 600,60 C800,120 1000,0 1200,60 L1200,120 L0,120 Z" fill={color} />
      </svg>
    </div>
  );
}

function WaveDividerBottom({ color = "#f8fafc", className = "" }: { color?: string; className?: string }) {
  return (
    <div className={`w-full overflow-hidden leading-none ${className}`} style={{ marginTop: "-1px" }}>
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 md:h-24" style={{ transform: "scaleY(-1)" }}>
        <path d="M0,60 C200,120 400,0 600,60 C800,120 1000,0 1200,60 L1200,120 L0,120 Z" fill={color} />
      </svg>
    </div>
  );
}

/* ─── Solar Icon SVG ─── */
function SolarIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="14" r="7" fill="#F97316" />
      <line x1="20" y1="2" x2="20" y2="5" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="23" x2="20" y2="26" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
      <line x1="9" y1="14" x2="12" y2="14" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="14" x2="31" y2="14" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
      <line x1="12.2" y1="6.2" x2="14.3" y2="8.3" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
      <line x1="25.7" y1="19.7" x2="27.8" y2="21.8" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
      <line x1="27.8" y1="6.2" x2="25.7" y2="8.3" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
      <line x1="14.3" y1="19.7" x2="12.2" y2="21.8" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
      <rect x="6" y="28" width="28" height="4" rx="1" fill="#1e3a5f" />
      <rect x="8" y="32" width="6" height="6" rx="0.5" fill="#2563eb" stroke="#1e3a5f" strokeWidth="0.5" />
      <rect x="17" y="32" width="6" height="6" rx="0.5" fill="#2563eb" stroke="#1e3a5f" strokeWidth="0.5" />
      <rect x="26" y="32" width="6" height="6" rx="0.5" fill="#2563eb" stroke="#1e3a5f" strokeWidth="0.5" />
    </svg>
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

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* ═══════════════════ HEADER ═══════════════════ */}
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100" 
          : "bg-white/80 backdrop-blur-sm"
      }`}>
        <div className="container flex h-16 md:h-18 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <SolarIcon className="h-9 w-9 shrink-0" />
            <div className="flex flex-col leading-tight">
              <span className="text-sm md:text-base font-bold text-primary tracking-tight">太陽光・蓄電池ガイド</span>
              <span className="text-[10px] md:text-xs text-muted-foreground">埼玉・東京エリア専門</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {[
              { id: "problem", label: "業界の裏側" },
              { id: "comparison", label: "4つの選択肢" },
              { id: "recommend", label: "推奨業者" },
              { id: "voice", label: "お客様の声" },
              { id: "contact", label: "無料相談" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary rounded-lg hover:bg-primary/5 transition-all"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <AdminNotificationBadge />
            <Button
              onClick={() => scrollToSection('simulator')}
              size="sm"
              className="bg-secondary hover:bg-secondary/90 text-white font-bold shadow-md hover:shadow-lg transition-all animate-pulse-glow"
            >
              <Calculator className="mr-2 h-4 w-4" />
              無料シミュレーション
            </Button>
          </div>

          {/* Mobile Right Actions */}
          <div className="flex lg:hidden items-center gap-2">
            <AdminNotificationBadge />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center justify-center h-10 w-10 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label={mobileMenuOpen ? "メニューを閉じる" : "メニューを開く"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`lg:hidden fixed inset-0 top-16 z-40 bg-black/40 transition-opacity duration-300 ${
            mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Mobile Menu Panel */}
        <div
          className={`lg:hidden fixed top-16 right-0 z-50 w-72 max-w-[85vw] h-[calc(100dvh-4rem)] bg-white shadow-xl transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="flex flex-col p-6 gap-1">
            {[
              { id: "problem", label: "業界の裏側" },
              { id: "comparison", label: "4つの選択肢" },
              { id: "recommend", label: "推奨業者" },
              { id: "voice", label: "お客様の声" },
              { id: "contact", label: "無料相談" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors text-left"
              >
                {item.label}
              </button>
            ))}
            <div className="border-t border-gray-200 my-3" />
            <Button
              onClick={() => scrollToSection('simulator')}
              variant="default"
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-white font-bold w-full"
            >
              <Calculator className="mr-2 h-5 w-5" />
              無料シミュレーション
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* ═══════════════════ HERO SECTION ═══════════════════ */}
        <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663229898008/GiCxXcqQDSejsvOe.jpg" 
              alt="埼玉県・東京エリアの住宅街と太陽光パネル" 
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-hero" />
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          </div>

          <div className="container relative z-10 text-white py-20">
            <div className="max-w-3xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-medium mb-8 border border-white/20 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <MapPin className="h-4 w-4 text-secondary" />
                埼玉県全域・東京エリアにお住まいの方へ
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-shadow animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                太陽光・蓄電池の見積もり、<br/>
                <span className="relative inline-block mt-2">
                  <span className="relative z-10 text-secondary">その金額は適正ですか？</span>
                  <span className="absolute bottom-0 left-0 right-0 h-3 bg-secondary/30 -z-0 rounded" />
                </span>
              </h1>

              {/* Sub text */}
              <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 text-gray-200 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                業者によって<strong className="text-white">100万円以上</strong>の差が出ることも。<br/>
                業界の仕組みを知り、後悔しない選択をするための<br className="hidden sm:block" />
                「中立的な判断基準」を公開します。
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
                <Button onClick={() => scrollToSection('problem')} size="lg" className="bg-white text-primary hover:bg-gray-100 font-bold text-base sm:text-lg px-6 sm:px-8 h-14 shadow-lg hover:shadow-xl transition-all">
                  <Shield className="mr-2 h-5 w-5" />
                  施工のプロが教える「裏側」
                </Button>
                <Button onClick={() => scrollToSection('simulator')} size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold text-base sm:text-lg px-6 sm:px-8 h-14 shadow-lg hover:shadow-xl transition-all animate-pulse-glow">
                  まずはシミュレーション
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Trust Stats Bar */}
            <div className="mt-16 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-700 delay-500">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {[
                  { icon: <Wrench className="h-6 w-6" />, value: 500, suffix: "件+", label: "施工実績" },
                  { icon: <ThumbsUp className="h-6 w-6" />, value: 98, suffix: "%", label: "顧客満足度" },
                  { icon: <Clock className="h-6 w-6" />, value: 15, suffix: "年+", label: "地域密着" },
                  { icon: <BadgeCheck className="h-6 w-6" />, value: 0, suffix: "円", label: "中間マージン" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/15 hover:bg-white/15 transition-colors">
                    <div className="text-secondary mb-2 flex justify-center">{stat.icon}</div>
                    <div className="text-2xl md:text-3xl font-bold text-white">
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs md:text-sm text-gray-300 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce">
            <ChevronDown className="h-6 w-6 text-white/60" />
          </div>
        </section>

        {/* ═══════════════════ PROBLEM SECTION ═══════════════════ */}
        <WaveDividerTop color="#f8fafc" />
        <section id="problem" className="py-16 md:py-24 bg-[#f8fafc]" style={{ marginTop: "-4rem", paddingTop: "6rem" }}>
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-14">
              <span className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                <AlertTriangle className="h-4 w-4" />
                要注意
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4">
                知っていましたか？<br/>見積もりに上乗せされる「見えないコスト」
              </h2>
              <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Left: Warning Cards */}
              <div className="space-y-6">
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border-l-4 border-red-400 hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-100 p-3 rounded-xl text-red-500 shrink-0">
                      <AlertTriangle className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-800">一括見積もりサイトの罠</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        便利に見える一括見積もりサイトですが、実は登録業者から<span className="font-bold text-red-600 bg-red-50 px-1 rounded">10%〜15%の紹介料</span>を徴収しています。このコストは、最終的にあなたの見積もり金額に上乗せされているのです。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border-l-4 border-red-400 hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-100 p-3 rounded-xl text-red-500 shrink-0">
                      <AlertTriangle className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-800">訪問販売の高額マージン</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        突然の訪問販売は、営業マンの歩合給や多額の広告費が含まれているため、<span className="font-bold text-red-600 bg-red-50 px-1 rounded">相場より30%以上高い</span>ケースも珍しくありません。「今だけ工事費無料」という言葉には注意が必要です。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right: Key Insight */}
              <div className="relative">
                <img 
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663229898008/GwWlPRqmzmGcrULu.jpg" 
                  alt="コスト構造の比較" 
                  className="rounded-2xl shadow-xl w-full"
                />
                <div className="mt-6 bg-gradient-to-br from-primary to-primary/90 text-white p-6 rounded-2xl shadow-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-secondary rounded-full p-2">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                    <p className="font-bold text-lg">重要なポイント</p>
                  </div>
                  <p className="text-blue-100 leading-relaxed">
                    「誰から買うか」で、同じ製品でも<br/>
                    <span className="text-secondary text-2xl font-bold">100万円以上</span>変わることがあります。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════ COMPARISON SECTION ═══════════════════ */}
        <section id="comparison" className="py-16 md:py-24 bg-white">
          <div className="container">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 bg-blue-50 text-primary px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                <Users className="h-4 w-4" />
                徹底比較
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-3">4つの購入ルート徹底比較</h2>
              <p className="text-muted-foreground text-lg">コスト、安心感、提案力で比較すると、正解が見えてきます。</p>
            </div>

            <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-100">
              <table className="w-full border-collapse min-w-[800px]">
                <thead>
                  <tr>
                    <th className="p-5 text-left bg-gray-50 border-b-2 border-gray-200 w-1/5 text-sm font-bold text-gray-600">比較項目</th>
                    <th className="p-5 text-center bg-gray-50 border-b-2 border-gray-200 w-1/5 text-sm text-gray-500">大手量販店</th>
                    <th className="p-5 text-center bg-gray-50 border-b-2 border-gray-200 w-1/5 text-sm text-gray-500">訪問販売</th>
                    <th className="p-5 text-center bg-gray-50 border-b-2 border-gray-200 w-1/5 text-sm text-gray-500">一括見積もり</th>
                    <th className="p-5 text-center bg-secondary/5 border-b-4 border-secondary w-1/5 text-primary font-bold text-base relative">
                      <div className="absolute -top-0 left-2 right-2 bg-secondary text-white text-xs py-1.5 rounded-t-lg font-bold">おすすめ</div>
                      <span className="block mt-4">地域密着<br/>自社施工店</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "価格（安さ）", vals: ["△", "×", "△", "◎"], descs: ["中間マージンあり", "非常に高い", "紹介料上乗せ", "直接施工で最安"], bad: [false, true, false, false] },
                    { label: "施工品質", vals: ["△", "△", "○", "◎"], descs: ["下請け任せ", "業者による", "登録基準あり", "自社職人が施工"], bad: [false, false, false, false] },
                    { label: "アフターフォロー", vals: ["○", "×", "△", "◎"], descs: ["窓口はしっかり", "連絡つかないことも", "サイトは関与せず", "すぐに駆けつけ"], bad: [false, true, false, false] },
                    { label: "提案力", vals: ["△", "○", "○", "◎"], descs: ["マニュアル通り", "熱心だが強引", "比較提案あり", "地域特性を熟知"], bad: [false, false, false, false] },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                      <td className="p-5 font-bold text-gray-700">{row.label}</td>
                      {row.vals.map((v, j) => (
                        <td key={j} className={`p-5 text-center ${j === 3 ? "bg-secondary/5" : ""}`}>
                          <span className={`text-xl font-bold ${j === 3 ? "text-primary" : row.bad[j] ? "text-red-500" : "text-gray-500"}`}>{v}</span>
                          <br/><span className={`text-xs ${j === 3 ? "text-primary/70" : row.bad[j] ? "text-red-400" : "text-gray-400"}`}>{row.descs[j]}</span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 md:p-10 rounded-2xl border border-blue-100 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Award className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-primary mb-4">結論：コストと安心のバランスが良いのは「地域密着の自社施工店」</h3>
              <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                広告費や紹介料、下請けマージンといった「余計なコスト」をカットできるのが自社施工店の強み。
                さらに、地元に根付いているため、施工後のトラブル時もすぐに駆けつけてくれる安心感があります。
              </p>
              <p className="text-primary font-bold mt-4">
                では、具体的にどの業者がおすすめなのか？<br/>
                当サイトが独自に調査した、埼玉県・東京エリアの優良施工店をご紹介します。
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════ SIMULATOR SECTION ═══════════════════ */}
        <WaveDividerTop color="#1e293b" />
        <section id="simulator" className="py-16 md:py-24 bg-primary text-white relative overflow-hidden" style={{ marginTop: "-4rem", paddingTop: "6rem" }}>
          <div className="absolute inset-0 z-0 opacity-15">
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663229898008/PonDGGtMRvWKIfcR.jpg" alt="Simulation Background" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 25% 25%, rgba(249,115,22,0.1) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
          <div className="container relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-white/15">
                  <Calculator className="h-4 w-4 text-secondary" />
                  簡単30秒
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">あなたの家なら<br/>いくら安くなる？</h2>
                <p className="text-blue-200 mb-8 text-lg leading-relaxed">
                  現在の電気代を入力するだけで、太陽光・蓄電池導入による
                  <span className="font-bold text-secondary"> 年間削減額</span>と<span className="font-bold text-secondary">適正工事価格</span>の目安がわかります。
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "わずか30秒で完了",
                    "個人情報の入力不要",
                    "地域密着店の適正価格ベース",
                  ].map((text, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="bg-secondary rounded-full p-1.5 shrink-0">
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
        <WaveDividerBottom color="#1e293b" />

        {/* ═══════════════════ RECOMMEND SECTION ═══════════════════ */}
        <section id="recommend" className="py-16 md:py-24 bg-white" style={{ marginTop: "-4rem", paddingTop: "6rem" }}>
          <div className="container">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                <Award className="h-4 w-4" />
                編集部のイチオシ
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-3">
                朝霞・新座エリアで選ぶなら<br/>「株式会社ダイマツ」一択です
              </h2>
              <p className="text-muted-foreground text-lg">
                なぜダイマツなのか？その理由は「圧倒的なコストパフォーマンス」と「地元での信頼」にあります。
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
              {[
                {
                  num: "01",
                  icon: <Wallet className="h-8 w-8" />,
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
                  icon: <Users className="h-8 w-8" />,
                  title: "職人の顔が見える\n安心感",
                  desc: "「どんな人が工事に来るのか不安」という心配は無用。経験豊富な自社職人が、責任を持って丁寧に施工します。",
                },
              ].map((card, i) => (
                <Card key={i} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <div className="h-1.5 bg-gradient-to-r from-secondary to-secondary/70" />
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="bg-secondary/10 text-secondary p-3 rounded-xl group-hover:bg-secondary group-hover:text-white transition-colors">
                        {card.icon}
                      </div>
                      <span className="text-4xl font-bold text-secondary/20">{card.num}</span>
                    </div>
                    <CardTitle className="text-lg md:text-xl whitespace-pre-line leading-snug">{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{card.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTA Box */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50/50 rounded-2xl p-8 md:p-12 text-center border border-gray-200 shadow-sm">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-6">
                まずは無料で見積もり・シミュレーションを
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                他社の見積もりをお持ちの方は、ぜひ比較してみてください。<br/>
                その安さと提案内容の違いに驚くはずです。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold text-lg sm:text-xl px-8 sm:px-12 py-7 sm:py-8 h-auto shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 animate-pulse-glow" asChild>
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
        <WaveDividerTop color="#fffbf5" />
        <section id="voice" className="py-16 md:py-24 bg-gradient-warm" style={{ marginTop: "-4rem", paddingTop: "6rem" }}>
          <div className="container">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                <Star className="h-4 w-4" />
                お客様の声
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-3">実際に導入されたお客様の声</h2>
              <p className="text-muted-foreground text-lg">地域のお客様から高い評価をいただいています</p>
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
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, j) => (
                        <Star key={j} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    {/* Quote */}
                    <p className="text-gray-700 leading-relaxed mb-6 text-base">
                      「{testimonial.text}」
                    </p>
                    {/* Author */}
                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                      <div>
                        <p className="font-bold text-gray-800">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.area}</p>
                      </div>
                      <span className="text-xs bg-blue-50 text-primary px-3 py-1 rounded-full font-medium">{testimonial.detail}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════ CONTACT SECTION ═══════════════════ */}
        <section id="contact" className="py-16 md:py-24 bg-gradient-cool">
          <div className="container">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                <Phone className="h-4 w-4" />
                無料相談
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4">匿名で無料相談</h2>
              <p className="text-muted-foreground text-lg">
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
        <Button className="flex-1 bg-secondary hover:bg-secondary/90 text-white font-bold h-12" asChild>
          <a href="http://daimatsu.link/" target="_blank" rel="noopener noreferrer">
            施工事例と価格を見る
          </a>
        </Button>
      </div>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer className="bg-primary text-white pt-16 pb-8 mb-16 md:mb-0">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-10 mb-12">
            {/* Column 1: About */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <SolarIcon className="h-8 w-8" />
                <span className="font-bold text-lg">太陽光・蓄電池ガイド</span>
              </div>
              <p className="text-blue-200 text-sm leading-relaxed">
                当サイトは、太陽光発電・蓄電池の導入を検討されている方へ、施工のプロの視点から、業界の裏側と有益な情報を提供することを目的としています。
              </p>
            </div>

            {/* Column 2: Navigation */}
            <div>
              <h4 className="font-bold text-lg mb-4">コンテンツ</h4>
              <ul className="space-y-2.5">
                {[
                  { id: "problem", label: "業界の裏側" },
                  { id: "comparison", label: "4つの購入ルート比較" },
                  { id: "simulator", label: "簡易シミュレーション" },
                  { id: "recommend", label: "推奨業者" },
                  { id: "voice", label: "お客様の声" },
                  { id: "contact", label: "無料相談" },
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="text-blue-200 hover:text-white transition-colors text-sm"
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
              <div className="space-y-3 text-sm text-blue-200">
                <p><strong className="text-white">株式会社ダイマツ</strong></p>
                <p>
                  <MapPin className="inline h-4 w-4 mr-1 text-secondary" />
                  埼玉県朝霞市
                </p>
                <p>
                  <Phone className="inline h-4 w-4 mr-1 text-secondary" />
                  048-486-9274
                </p>
                <p>
                  対応エリア：朝霞市、新座市、志木市、和光市、<br/>
                  その他埼玉県全域・東京エリア
                </p>
                <Button size="sm" variant="outline" className="mt-2 border-blue-300 text-blue-200 hover:bg-white/10 hover:text-white" asChild>
                  <a href="http://daimatsu.link/" target="_blank" rel="noopener noreferrer">
                    公式サイトを見る
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/15 pt-8 text-center text-sm text-blue-300">
            &copy; {new Date().getFullYear()} 太陽光・蓄電池 業者選びガイド（朝霞・新座エリア）. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─── Wallet icon (used in recommend cards) ─── */
function Wallet({ className = "" }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  );
}
