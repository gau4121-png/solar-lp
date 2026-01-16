import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ChevronRight, AlertTriangle, X, Info, Calculator, ArrowRight, Phone } from "lucide-react";
import { Simulator } from "@/components/Simulator";
import { useState } from "react";

export default function Home() {
  const [simulatorOpen, setSimulatorOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-primary">
            <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-sm">朝霞・新座エリア限定</span>
            <span>太陽光・蓄電池 業者選びガイド</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <button onClick={() => scrollToSection('problem')} className="hover:text-primary transition-colors">業界の裏側</button>
            <button onClick={() => scrollToSection('comparison')} className="hover:text-primary transition-colors">4つの選択肢</button>
            <button onClick={() => scrollToSection('recommend')} className="hover:text-primary transition-colors">推奨業者</button>
          </nav>
          <Button onClick={() => scrollToSection('simulator')} variant="default" size="sm" className="bg-secondary hover:bg-secondary/90 text-white font-bold">
            <Calculator className="mr-2 h-4 w-4" />
            無料シミュレーション
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/hero-bg.jpg" 
              alt="朝霞・新座エリアの住宅街と太陽光パネル" 
              className="w-full h-full object-cover brightness-50"
            />
          </div>
          <div className="container relative z-10 text-white text-center">
            <div className="inline-block bg-secondary text-white px-4 py-1 rounded-full text-sm font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              朝霞・新座エリアにお住まいの方へ
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-shadow animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              太陽光・蓄電池の業者選び、<br/>
              <span className="text-secondary border-b-4 border-secondary">損していませんか？</span>
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-gray-100 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              「一括見積もりサイト」や「訪問販売」には、見えないコストが隠されています。<br/>
              賢い選択をするための「第三の選択肢」をお教えします。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
              <Button onClick={() => scrollToSection('problem')} size="lg" className="bg-white text-primary hover:bg-gray-100 font-bold text-lg px-8">
                なぜ損をするのか？
              </Button>
              <Button onClick={() => scrollToSection('simulator')} size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold text-lg px-8">
                まずはシミュレーション
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Problem Section (Hook) */}
        <section id="problem" className="py-20 bg-gray-50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold text-primary mb-4">知っていましたか？<br/>見積もりに上乗せされる「見えないコスト」</h2>
              <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-secondary">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-red-100 p-3 rounded-full text-red-600 shrink-0">
                    <AlertTriangle className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">一括見積もりサイトの罠</h3>
                    <p className="text-muted-foreground">
                      便利に見える一括見積もりサイトですが、実は登録業者から<span className="font-bold text-red-600 bg-red-50 px-1">10%〜15%の紹介料</span>を徴収しています。このコストは、最終的にあなたの見積もり金額に上乗せされているのです。
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-red-100 p-3 rounded-full text-red-600 shrink-0">
                    <AlertTriangle className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">訪問販売の高額マージン</h3>
                    <p className="text-muted-foreground">
                      突然の訪問販売は、営業マンの歩合給や多額の広告費が含まれているため、<span className="font-bold text-red-600 bg-red-50 px-1">相場より30%以上高い</span>ケースも珍しくありません。「今だけ工事費無料」という言葉には注意が必要です。
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src="/images/comparison-icon.jpg" 
                  alt="コスト構造の比較" 
                  className="rounded-xl shadow-xl w-full"
                />
                <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-lg shadow-lg max-w-xs hidden md:block">
                  <p className="font-bold text-lg mb-2">重要なのは...</p>
                  <p>「誰から買うか」で、同じ製品でも<br/><span className="text-secondary text-xl font-bold">100万円以上</span>変わることがあります。</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section (Body) */}
        <section id="comparison" className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-primary mb-4">4つの購入ルート徹底比較</h2>
              <p className="text-muted-foreground">コスト、安心感、提案力で比較すると、正解が見えてきます。</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[800px]">
                <thead>
                  <tr>
                    <th className="p-4 text-left bg-gray-50 border-b-2 border-gray-200 w-1/5">比較項目</th>
                    <th className="p-4 text-center bg-gray-50 border-b-2 border-gray-200 w-1/5 text-gray-500">大手量販店</th>
                    <th className="p-4 text-center bg-gray-50 border-b-2 border-gray-200 w-1/5 text-gray-500">訪問販売</th>
                    <th className="p-4 text-center bg-gray-50 border-b-2 border-gray-200 w-1/5 text-gray-500">一括見積もり</th>
                    <th className="p-4 text-center bg-primary/5 border-b-4 border-secondary w-1/5 text-primary font-bold text-lg relative">
                      <div className="absolute -top-4 left-0 right-0 bg-secondary text-white text-xs py-1 rounded-t-lg mx-2">おすすめ</div>
                      地域密着<br/>自社施工店
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-bold text-gray-700">価格（安さ）</td>
                    <td className="p-4 text-center text-gray-600">△<br/><span className="text-xs">中間マージンあり</span></td>
                    <td className="p-4 text-center text-red-500 font-bold">×<br/><span className="text-xs">非常に高い</span></td>
                    <td className="p-4 text-center text-gray-600">△<br/><span className="text-xs">紹介料上乗せ</span></td>
                    <td className="p-4 text-center text-primary font-bold bg-primary/5 text-xl">◎<br/><span className="text-xs font-normal">直接施工で最安</span></td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-bold text-gray-700">施工品質</td>
                    <td className="p-4 text-center text-gray-600">△<br/><span className="text-xs">下請け任せ</span></td>
                    <td className="p-4 text-center text-gray-600">△<br/><span className="text-xs">業者による</span></td>
                    <td className="p-4 text-center text-gray-600">○<br/><span className="text-xs">登録基準あり</span></td>
                    <td className="p-4 text-center text-primary font-bold bg-primary/5 text-xl">◎<br/><span className="text-xs font-normal">自社職人が施工</span></td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-bold text-gray-700">アフターフォロー</td>
                    <td className="p-4 text-center text-gray-600">○<br/><span className="text-xs">窓口はしっかり</span></td>
                    <td className="p-4 text-center text-red-500 font-bold">×<br/><span className="text-xs">連絡つかないことも</span></td>
                    <td className="p-4 text-center text-gray-600">△<br/><span className="text-xs">サイトは関与せず</span></td>
                    <td className="p-4 text-center text-primary font-bold bg-primary/5 text-xl">◎<br/><span className="text-xs font-normal">すぐに駆けつけ</span></td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-bold text-gray-700">提案力</td>
                    <td className="p-4 text-center text-gray-600">△<br/><span className="text-xs">マニュアル通り</span></td>
                    <td className="p-4 text-center text-gray-600">○<br/><span className="text-xs">熱心だが強引</span></td>
                    <td className="p-4 text-center text-gray-600">○<br/><span className="text-xs">比較提案あり</span></td>
                    <td className="p-4 text-center text-primary font-bold bg-primary/5 text-xl">◎<br/><span className="text-xs font-normal">地域特性を熟知</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-12 bg-blue-50 p-8 rounded-xl border border-blue-100 text-center">
              <h3 className="text-xl font-bold text-primary mb-4">結論：最も賢い選択は「地域密着の自社施工店」です</h3>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                広告費や紹介料、下請けマージンといった「余計なコスト」をすべてカットできるのが自社施工店。<br/>
                さらに、地元に根付いているため、施工後のトラブル時もすぐに駆けつけてくれる安心感があります。
              </p>
            </div>
          </div>
        </section>

        {/* Simulator Placeholder */}
        <section id="simulator" className="py-20 bg-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            <img src="/images/simulator-bg.jpg" alt="Simulation Background" className="w-full h-full object-cover" />
          </div>
          <div className="container relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">あなたの家ならいくら安くなる？<br/>簡易シミュレーション</h2>
                <p className="text-blue-100 mb-8 text-lg">
                  現在の電気代を入力するだけで、太陽光・蓄電池導入による<br/>
                  <span className="font-bold text-secondary text-xl">年間削減額</span>と<span className="font-bold text-secondary text-xl">適正工事価格</span>の目安がわかります。
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <div className="bg-secondary rounded-full p-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span>わずか30秒で完了</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="bg-secondary rounded-full p-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span>個人情報の入力不要</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="bg-secondary rounded-full p-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span>地域密着店の適正価格ベース</span>
                  </li>
                </ul>
              </div>
              
              <Simulator />
            </div>
          </div>
        </section>

        {/* Recommend Section (Action) */}
        <section id="recommend" className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-bold mb-4 inline-block">編集部のイチオシ</span>
              <h2 className="text-3xl font-bold text-primary mb-4">朝霞・新座エリアで選ぶなら<br/>「株式会社ダイマツ」一択です</h2>
              <p className="text-muted-foreground">
                なぜダイマツなのか？その理由は「圧倒的なコストパフォーマンス」と「地元での信頼」にあります。
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="border-t-4 border-t-secondary shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="text-4xl font-bold text-secondary mb-2">01</div>
                  <CardTitle>完全自社施工で<br/>中間マージン0円</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    営業から施工、アフターフォローまで全て自社社員が対応。下請けを使わないため、大手他社より<span className="font-bold text-primary">20〜30%安い</span>適正価格を実現しています。
                  </p>
                </CardContent>
              </Card>
              <Card className="border-t-4 border-t-secondary shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="text-4xl font-bold text-secondary mb-2">02</div>
                  <CardTitle>創業50年以上の<br/>地域実績</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    朝霞市・新座市を中心に、長年地域に根ざして活動。逃げも隠れもしない地元の老舗だからこそ、無理な売り込みは一切ありません。
                  </p>
                </CardContent>
              </Card>
              <Card className="border-t-4 border-t-secondary shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="text-4xl font-bold text-secondary mb-2">03</div>
                  <CardTitle>職人の顔が見える<br/>安心感</CardTitle>
                </CardHeader>
                <CardContent>
                  <img src="/images/worker-trust.jpg" alt="職人の笑顔" className="w-full h-32 object-cover rounded-md mb-4" />
                  <p className="text-muted-foreground">
                    「どんな人が工事に来るのか不安」という心配は無用。経験豊富な自社職人が、責任を持って丁寧に施工します。
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 md:p-12 text-center border border-gray-200">
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6">
                まずは無料で見積もり・シミュレーションを
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                他社の見積もりをお持ちの方は、ぜひ比較してみてください。<br/>
                その安さと提案内容の違いに驚くはずです。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold text-xl px-12 py-8 h-auto shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1" asChild>
                  <a href="http://daimatsu.link/" target="_blank" rel="noopener noreferrer">
                    ダイマツの施工事例と価格を見る（公式サイト）
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
      </main>

      {/* Mobile Fixed Footer */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 p-4 flex gap-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold" asChild>
          <a href="tel:0484869274">
            <Phone className="mr-2 h-4 w-4" />
            電話で相談
          </a>
        </Button>
        <Button className="flex-1 bg-secondary hover:bg-secondary/90 text-white font-bold" asChild>
          <a href="http://daimatsu.link/" target="_blank" rel="noopener noreferrer">
            公式サイトへ
          </a>
        </Button>
      </div>

      <footer className="bg-primary text-white py-12 mb-16 md:mb-0">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-lg mb-4">朝霞・新座の太陽光・蓄電池 業者選びガイド</h4>
              <p className="text-blue-200 text-sm leading-relaxed max-w-md">
                当サイトは、太陽光発電・蓄電池の導入を検討されている方へ、施工のプロの視点から、業界の裏側と有益な情報を提供することを目的としています。
              </p>
            </div>
            <div className="md:text-right">
              <p className="text-sm text-blue-200">
                推奨業者：株式会社ダイマツ<br/>
                対応エリア：朝霞市、新座市、志木市、和光市など
              </p>
            </div>
          </div>
          <div className="border-t border-blue-800 pt-8 text-center text-sm text-blue-300">
            &copy; {new Date().getFullYear()} Solar Guide Asaka/Niiza. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
