import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Instagram, MapPin, PenTool, ExternalLink, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function MarketingDashboard() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("コピーしました！");
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <Badge className="mb-2 bg-orange-500 hover:bg-orange-600">社内用ツール</Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">集客戦略ダッシュボード</h1>
              <p className="text-slate-300">「失敗したくない」ユーザーに寄り添う、3つの集客アクション</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="bg-transparent text-white border-slate-600 hover:bg-slate-800" onClick={() => window.open('/', '_blank')}>
                <ExternalLink className="mr-2 h-4 w-4" />
                LPを確認
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 -mt-8">
        {/* Strategy Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="shadow-lg border-t-4 border-t-pink-500">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-pink-100 rounded-full text-pink-600">
                  <Instagram className="h-5 w-5" />
                </div>
                <Badge variant="secondary" className="text-pink-600 bg-pink-50">潜在層</Badge>
              </div>
              <CardTitle>Instagram戦略</CardTitle>
              <CardDescription>「損したくない」心理を突く</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-4">
                短いリール動画で注意喚起を行い、プロフィールリンクからLPへ誘導します。
              </p>
              <div className="text-sm font-medium">目標: 週1〜2本の投稿</div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-t-4 border-t-blue-500">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                  <MapPin className="h-5 w-5" />
                </div>
                <Badge variant="secondary" className="text-blue-600 bg-blue-50">顕在層</Badge>
              </div>
              <CardTitle>Googleマップ戦略</CardTitle>
              <CardDescription>地域No.1の信頼感を演出</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-4">
                「地域名 + 太陽光」検索ユーザーに対し、最新情報と口コミで安心感を醸成します。
              </p>
              <div className="text-sm font-medium">目標: 週1回の最新情報更新</div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-t-4 border-t-green-500">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-green-100 rounded-full text-green-600">
                  <PenTool className="h-5 w-5" />
                </div>
                <Badge variant="secondary" className="text-green-600 bg-green-50">検討層</Badge>
              </div>
              <CardTitle>ブログ・SEO戦略</CardTitle>
              <CardDescription>専門知識で信頼を積み上げ</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-4">
                補助金やシミュレーションなど、深い情報を求めている人に納得感を提供します。
              </p>
              <div className="text-sm font-medium">目標: 月1〜2本の記事更新</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="action-plan" className="space-y-6">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto p-1 bg-slate-200 rounded-xl">
            <TabsTrigger value="action-plan" className="py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              📅 週間アクションプラン
            </TabsTrigger>
            <TabsTrigger value="templates" className="py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              📝 投稿テンプレート集
            </TabsTrigger>
            <TabsTrigger value="resources" className="py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              🔗 お役立ちリンク
            </TabsTrigger>
          </TabsList>

          {/* Action Plan Tab */}
          <TabsContent value="action-plan">
            <Card>
              <CardHeader>
                <CardTitle>今週のやることリスト</CardTitle>
                <CardDescription>
                  まずは最初の1ヶ月、このリズムを作ることから始めましょう。
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {/* Week 1 */}
                  <div className="relative pl-8 border-l-2 border-slate-200">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-orange-500 ring-4 ring-white"></div>
                    <h3 className="text-lg font-bold text-slate-800 mb-4">第1週：土台作りと告知</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <CheckCircle2 className="h-5 w-5 text-slate-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="font-medium">Instagramプロフィールの整備</div>
                          <p className="text-sm text-slate-500">LPへのリンクを設置し、ハイライトに「お客様の声」を作る</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <CheckCircle2 className="h-5 w-5 text-slate-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="font-medium">Googleマップ「最新情報」投稿</div>
                          <p className="text-sm text-slate-500">「賢い選び方ガイドを公開しました」と告知投稿する</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Week 2 */}
                  <div className="relative pl-8 border-l-2 border-slate-200">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-300 ring-4 ring-white"></div>
                    <h3 className="text-lg font-bold text-slate-800 mb-4">第2週：コンテンツ発信開始</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <CheckCircle2 className="h-5 w-5 text-slate-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="font-medium">Instagramリール動画 1本目</div>
                          <p className="text-sm text-slate-500">テーマ：「その見積もり、高くないですか？」注意喚起系</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <CheckCircle2 className="h-5 w-5 text-slate-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="font-medium">Googleマップ 写真追加</div>
                          <p className="text-sm text-slate-500">施工中の様子やスタッフの笑顔の写真を3枚以上アップ</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Week 3 */}
                  <div className="relative pl-8 border-l-2 border-slate-200">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-300 ring-4 ring-white"></div>
                    <h3 className="text-lg font-bold text-slate-800 mb-4">第3週：信頼の積み上げ</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <CheckCircle2 className="h-5 w-5 text-slate-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="font-medium">ブログ記事のリライト・更新</div>
                          <p className="text-sm text-slate-500">既存の記事にLPへのバナーを貼り付ける</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <CheckCircle2 className="h-5 w-5 text-slate-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="font-medium">口コミへの返信</div>
                          <p className="text-sm text-slate-500">頂いた口コミに丁寧に返信し、誠実さをアピール</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Instagram Template */}
              <Card>
                <CardHeader className="bg-pink-50 border-b border-pink-100">
                  <CardTitle className="text-pink-700 flex items-center gap-2">
                    <Instagram className="h-5 w-5" /> Instagram投稿用
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">キャプション（本文）</label>
                      <div className="bg-slate-50 p-4 rounded-md border text-sm text-slate-600 whitespace-pre-wrap font-mono">
{`⚠️その見積もり、本当に適正ですか？

「太陽光なんてどこも同じでしょ？」
と思っていると、実は数十万円も損しているかもしれません...💦

大手サイトや訪問販売には、
実は「見えないコスト」が含まれていることが多いんです。

✅ 訪問販売の人件費
✅ 一括見積もりサイトへの紹介料

これらが上乗せされているかも...？

賢い人は選んでいる「第3の選択肢」。
地元・埼玉の施工店だからできる
「適正価格」と「正直な提案」があります。

👇失敗しない選び方はプロフィールのリンクから！
@daimatsu_solar

#埼玉太陽光 #太陽光発電 #蓄電池 #電気代削減 #マイホーム記録 #埼玉ママ #節約術`}
                      </div>
                    </div>
                    <Button className="w-full" variant="outline" onClick={() => copyToClipboard(`⚠️その見積もり、本当に適正ですか？\n\n「太陽光なんてどこも同じでしょ？」\nと思っていると、実は数十万円も損しているかもしれません...💦\n\n大手サイトや訪問販売には、\n実は「見えないコスト」が含まれていることが多いんです。\n\n✅ 訪問販売の人件費\n✅ 一括見積もりサイトへの紹介料\n\nこれらが上乗せされているかも...？\n\n賢い人は選んでいる「第3の選択肢」。\n地元・埼玉の施工店だからできる\n「適正価格」と「正直な提案」があります。\n\n👇失敗しない選び方はプロフィールのリンクから！\n@daimatsu_solar\n\n#埼玉太陽光 #太陽光発電 #蓄電池 #電気代削減 #マイホーム記録 #埼玉ママ #節約術`)}>
                      <Copy className="mr-2 h-4 w-4" /> テキストをコピー
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Google Maps Template */}
              <Card>
                <CardHeader className="bg-blue-50 border-b border-blue-100">
                  <CardTitle className="text-blue-700 flex items-center gap-2">
                    <MapPin className="h-5 w-5" /> Googleマップ最新情報用
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">投稿本文</label>
                      <div className="bg-slate-50 p-4 rounded-md border text-sm text-slate-600 whitespace-pre-wrap font-mono">
{`【太陽光・蓄電池の「賢い選び方」ガイド公開！】

こんにちは、株式会社ダイマツです☀️

「太陽光を検討しているけど、どこに頼めばいいかわからない...」
「訪問販売が来たけど、これって高いの？安いの？」

そんなお悩みをお持ちの方へ。
業界の裏側を知り尽くしたプロが教える、
「失敗しない業者選びのポイント」をまとめた特設ページを公開しました！

✅ 一括見積もりサイトのメリット・デメリット
✅ 訪問販売の注意点
✅ 賢い人が選ぶ「第3の選択肢」とは？

30秒でできる「電気代削減シミュレーション」もついています。
ぜひ一度ご覧ください！

👇詳細はこちら（「詳細」ボタンを設定）
https://solar-lp.manus.space/`}
                      </div>
                    </div>
                    <Button className="w-full" variant="outline" onClick={() => copyToClipboard(`【太陽光・蓄電池の「賢い選び方」ガイド公開！】\n\nこんにちは、株式会社ダイマツです☀️\n\n「太陽光を検討しているけど、どこに頼めばいいかわからない...」\n「訪問販売が来たけど、これって高いの？安いの？」\n\nそんなお悩みをお持ちの方へ。\n業界の裏側を知り尽くしたプロが教える、\n「失敗しない業者選びのポイント」をまとめた特設ページを公開しました！\n\n✅ 一括見積もりサイトのメリット・デメリット\n✅ 訪問販売の注意点\n✅ 賢い人が選ぶ「第3の選択肢」とは？\n\n30秒でできる「電気代削減シミュレーション」もついています。\nぜひ一度ご覧ください！\n\n👇詳細はこちら（「詳細」ボタンを設定）\nhttps://solar-lp.manus.space/`)}>
                      <Copy className="mr-2 h-4 w-4" /> テキストをコピー
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>お役立ちリンク集</CardTitle>
                <CardDescription>
                  日々の業務でよく使うサイトへのショートカットです。
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <a href="#" className="block p-6 bg-white border rounded-xl hover:shadow-md transition-shadow group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-slate-100 rounded-lg group-hover:bg-slate-200 transition-colors">
                        <PenTool className="h-6 w-6 text-slate-600" />
                      </div>
                      <ExternalLink className="h-4 w-4 text-slate-400" />
                    </div>
                    <h3 className="font-bold text-slate-800 mb-1">WordPress管理画面</h3>
                    <p className="text-sm text-slate-500">ブログの更新はこちらから</p>
                  </a>

                  <a href="https://business.google.com/" target="_blank" rel="noreferrer" className="block p-6 bg-white border rounded-xl hover:shadow-md transition-shadow group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                        <MapPin className="h-6 w-6 text-blue-600" />
                      </div>
                      <ExternalLink className="h-4 w-4 text-slate-400" />
                    </div>
                    <h3 className="font-bold text-slate-800 mb-1">Googleビジネスプロフィール</h3>
                    <p className="text-sm text-slate-500">口コミ返信・最新情報投稿</p>
                  </a>

                  <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="block p-6 bg-white border rounded-xl hover:shadow-md transition-shadow group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-pink-50 rounded-lg group-hover:bg-pink-100 transition-colors">
                        <Instagram className="h-6 w-6 text-pink-600" />
                      </div>
                      <ExternalLink className="h-4 w-4 text-slate-400" />
                    </div>
                    <h3 className="font-bold text-slate-800 mb-1">Instagram</h3>
                    <p className="text-sm text-slate-500">投稿・DM確認</p>
                  </a>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
