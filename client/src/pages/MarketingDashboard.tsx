import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Instagram, MapPin, PenTool, ExternalLink, Copy, TrendingUp, Users, BarChart3, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { useEffect, useState } from "react";

export default function MarketingDashboard() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("コピーしました！");
  };

  // Fetch analytics data
  const { data: realtimeData, isLoading: realtimeLoading } = trpc.analytics.getRealtimeUsers.useQuery();
  const { data: trafficData, isLoading: trafficLoading } = trpc.analytics.getTrafficMetrics.useQuery();
  const { data: conversionData, isLoading: conversionLoading } = trpc.analytics.getConversionMetrics.useQuery();
  const { data: engagementData, isLoading: engagementLoading } = trpc.analytics.getEngagementMetrics.useQuery();
  const { data: sourceData, isLoading: sourceLoading } = trpc.analytics.getTrafficBySource.useQuery();

  // Calculate metrics from traffic data
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalSessions: 0,
    totalPageViews: 0,
    conversionRate: 0,
    avgSessionDuration: 0,
    bounceRate: 0,
  });

  useEffect(() => {
    if (trafficData && engagementData) {
      const rows = (trafficData as any)?.rows || [];
      const totalPageViews = rows.reduce((sum: number, row: any) => {
        const pageViews = row.metricValues?.[2]?.value || 0;
        return sum + parseInt(pageViews, 10);
      }, 0);

      const totalSessions = rows.reduce((sum: number, row: any) => {
        const sessions = row.metricValues?.[1]?.value || 0;
        return sum + parseInt(sessions, 10);
      }, 0);

      const totalUsers = rows.reduce((sum: number, row: any) => {
        const users = row.metricValues?.[0]?.value || 0;
        return sum + parseInt(users, 10);
      }, 0);

      const engagementRows = (engagementData as any)?.rows || [];
      const avgSessionDuration = engagementRows[0]?.metricValues?.[0]?.value || 0;
      const bounceRate = engagementRows[0]?.metricValues?.[1]?.value || 0;

      const conversionRate = totalSessions > 0 ? ((totalPageViews / totalSessions) * 100).toFixed(2) : "0";

      setMetrics({
        totalUsers,
        totalSessions,
        totalPageViews,
        conversionRate: parseFloat(conversionRate as string),
        avgSessionDuration: parseFloat(avgSessionDuration as string),
        bounceRate: parseFloat(bounceRate as string),
      });
    }
  }, [trafficData, engagementData]);

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
        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto p-1 bg-slate-200 rounded-xl">
            <TabsTrigger value="action-plan" className="py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              📅 週間アクションプラン
            </TabsTrigger>
            <TabsTrigger value="performance" className="py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              📊 パフォーマンス分析
            </TabsTrigger>
            <TabsTrigger value="templates" className="py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              📝 投稿テンプレート集
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

          {/* Performance Tab */}
          <TabsContent value="performance">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-slate-500">訪問者数 (Users)</CardTitle>
                    <Users className="h-4 w-4 text-slate-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900">
                    {trafficLoading ? "読込中..." : metrics.totalUsers.toLocaleString()}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">過去7日間</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-slate-500">セッション数</CardTitle>
                    <BarChart3 className="h-4 w-4 text-slate-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900">
                    {trafficLoading ? "読込中..." : metrics.totalSessions.toLocaleString()}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">過去7日間</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-slate-500">ページビュー</CardTitle>
                    <TrendingUp className="h-4 w-4 text-slate-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900">
                    {trafficLoading ? "読込中..." : metrics.totalPageViews.toLocaleString()}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">過去7日間</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-slate-500">平均滞在時間</CardTitle>
                    <Clock className="h-4 w-4 text-slate-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900">
                    {engagementLoading ? "読込中..." : `${Math.round(metrics.avgSessionDuration)}秒`}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">セッションあたり</p>
                </CardContent>
              </Card>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500">コンバージョン率 (CVR)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900">
                    {conversionLoading ? "読込中..." : `${metrics.conversionRate.toFixed(2)}%`}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">目標: 1.0% 以上</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500">直帰率 (Bounce Rate)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900">
                    {engagementLoading ? "読込中..." : `${metrics.bounceRate.toFixed(2)}%`}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">低いほど良い</p>
                </CardContent>
              </Card>
            </div>

            {/* Traffic by Source */}
            <Card>
              <CardHeader>
                <CardTitle>トラフィックソース別分析（過去30日）</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sourceLoading ? (
                    <p className="text-slate-500">読込中...</p>
                  ) : (
                    ((sourceData as any)?.rows || []).map((row: any, idx: number) => {
                      const source = row.dimensionValues?.[0]?.value || "不明";
                      const sessions = parseInt(row.metricValues?.[0]?.value || "0", 10);
                      const totalSessions = ((sourceData as any)?.rows || []).reduce(
                        (sum: number, r: any) => sum + parseInt(r.metricValues?.[0]?.value || "0", 10),
                        0
                      );
                      const percentage = totalSessions > 0 ? ((sessions / totalSessions) * 100).toFixed(1) : "0";

                      return (
                        <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <div>
                            <div className="font-medium text-slate-700">{source}</div>
                            <div className="text-sm text-slate-500">{sessions.toLocaleString()} セッション</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-slate-900">{percentage}%</div>
                            <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-orange-500 rounded-full"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Channel Specific Analysis */}
            <h3 className="text-xl font-bold text-slate-800 mb-4 mt-8">チャンネル別パフォーマンス</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Instagram Stats */}
              <Card className="border-t-4 border-t-pink-500">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-pink-50 text-pink-600">Instagram</Badge>
                    <ExternalLink className="h-4 w-4 text-slate-400" />
                  </div>
                  <CardTitle className="text-base">見るべき指標</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-slate-600">プロフィールアクセス数</div>
                    <p className="text-xs text-slate-400">LPへの入り口となる最重要指標</p>
                  </div>
                  <Separator />
                  <div>
                    <div className="text-sm font-medium text-slate-600">エンゲージメント率</div>
                    <p className="text-xs text-slate-400">いいね・保存数 ÷ リーチ数</p>
                  </div>
                  <Button variant="outline" className="w-full mt-2 text-pink-600 border-pink-200 hover:bg-pink-50" onClick={() => window.open('https://www.instagram.com/', '_blank')}>
                    インサイトを確認
                  </Button>
                </CardContent>
              </Card>

              {/* Google Maps Stats */}
              <Card className="border-t-4 border-t-blue-500">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-blue-50 text-blue-600">Googleマップ</Badge>
                    <ExternalLink className="h-4 w-4 text-slate-400" />
                  </div>
                  <CardTitle className="text-base">見るべき指標</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-slate-600">ウェブサイトのクリック数</div>
                    <p className="text-xs text-slate-400">マップ経由でのLP訪問数</p>
                  </div>
                  <Separator />
                  <div>
                    <div className="text-sm font-medium text-slate-600">ルート検索・通話数</div>
                    <p className="text-xs text-slate-400">来店や問い合わせへの直結度</p>
                  </div>
                  <Button variant="outline" className="w-full mt-2 text-blue-600 border-blue-200 hover:bg-blue-50" onClick={() => window.open('https://business.google.com/', '_blank')}>
                    ビジネスプロフィールを確認
                  </Button>
                </CardContent>
              </Card>

              {/* Blog/SEO Stats */}
              <Card className="border-t-4 border-t-green-500">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-green-50 text-green-600">ブログ・SEO</Badge>
                    <ExternalLink className="h-4 w-4 text-slate-400" />
                  </div>
                  <CardTitle className="text-base">見るべき指標</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-slate-600">検索クリック数</div>
                    <p className="text-xs text-slate-400">Google検索からの流入数</p>
                  </div>
                  <Separator />
                  <div>
                    <div className="text-sm font-medium text-slate-600">平均掲載順位</div>
                    <p className="text-xs text-slate-400">狙ったキーワードでの順位</p>
                  </div>
                  <Button variant="outline" className="w-full mt-2 text-green-600 border-green-200 hover:bg-green-50" onClick={() => window.open('https://search.google.com/search-console/', '_blank')}>
                    Search Consoleを確認
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates">
            <Card>
              <CardHeader>
                <CardTitle>投稿テンプレート集</CardTitle>
                <CardDescription>
                  各チャンネルで使えるテンプレートを用意しました。コピーしてカスタマイズしてください。
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Instagram Template */}
                <div className="border-l-4 border-pink-500 pl-4">
                  <h4 className="font-bold text-slate-800 mb-2">📱 Instagram リール用シナリオ</h4>
                  <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-700 mb-3 font-mono">
                    <p className="mb-2">「その見積もり、高くないですか？」</p>
                    <p className="mb-2">太陽光・蓄電池の見積もりは、業者によって100万円以上の差が出ることも。</p>
                    <p className="mb-2">✅ 自社施工だから中間マージン0円</p>
                    <p className="mb-2">✅ 地域密着15年以上の信頼</p>
                    <p>プロフィールのリンクから「無料シミュレーション」をチェック！</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => copyToClipboard("「その見積もり、高くないですか？」\n\n太陽光・蓄電池の見積もりは、業者によって100万円以上の差が出ることも。\n\n✅ 自社施工だから中間マージン0円\n✅ 地域密着15年以上の信頼\n\nプロフィールのリンクから「無料シミュレーション」をチェック！")}>
                    <Copy className="h-4 w-4 mr-2" />
                    コピー
                  </Button>
                </div>

                {/* Google Maps Template */}
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-bold text-slate-800 mb-2">🗺️ Googleマップ 最新情報用テンプレート</h4>
                  <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-700 mb-3 font-mono">
                    <p className="mb-2">「失敗しない業者選びガイド」を公開しました</p>
                    <p className="mb-2">朝霞・新座エリアで太陽光・蓄電池をお考えの方へ</p>
                    <p className="mb-2">4つの購入ルートを徹底比較し、最適な選択をサポートします。</p>
                    <p>詳しくはプロフィールのウェブサイトをご覧ください。</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => copyToClipboard("「失敗しない業者選びガイド」を公開しました\n\n朝霞・新座エリアで太陽光・蓄電池をお考えの方へ\n\n4つの購入ルートを徹底比較し、最適な選択をサポートします。\n\n詳しくはプロフィールのウェブサイトをご覧ください。")}>
                    <Copy className="h-4 w-4 mr-2" />
                    コピー
                  </Button>
                </div>

                {/* Blog Template */}
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-bold text-slate-800 mb-2">📝 ブログ記事 冒頭テンプレート</h4>
                  <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-700 mb-3 font-mono">
                    <p className="mb-2">太陽光・蓄電池の導入を検討されている方へ</p>
                    <p className="mb-2">「どの業者を選べば失敗しないのか」という悩みをお持ちではないでしょうか？</p>
                    <p className="mb-2">本記事では、15年以上の施工経験から、業者選びの重要なポイントを解説します。</p>
                    <p>👉 無料シミュレーションで適正価格をチェック</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => copyToClipboard("太陽光・蓄電池の導入を検討されている方へ\n\n「どの業者を選べば失敗しないのか」という悩みをお持ちではないでしょうか？\n\n本記事では、15年以上の施工経験から、業者選びの重要なポイントを解説します。\n\n👉 無料シミュレーションで適正価格をチェック")}>
                    <Copy className="h-4 w-4 mr-2" />
                    コピー
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
