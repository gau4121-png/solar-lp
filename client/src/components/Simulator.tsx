import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, RefreshCw, TrendingDown, Wallet } from "lucide-react";

export function Simulator() {
  const [monthlyBill, setMonthlyBill] = useState([15000]);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Simulation Results
  const [annualSavings, setAnnualSavings] = useState(0);
  const [tenYearSavings, setTenYearSavings] = useState(0);
  const [initialCostDiff, setInitialCostDiff] = useState(0);

  useEffect(() => {
    calculate(monthlyBill[0]);
  }, [monthlyBill]);

  const calculate = (bill: number) => {
    // Logic Assumptions:
    // 1. Annual Bill = Monthly * 12
    // 2. Solar Economic Benefit (Savings + Sell) approx 75% of bill (conservative estimate for modern systems with battery)
    const annual = bill * 12;
    const benefitRatio = 0.75; 
    const calculatedAnnualSavings = Math.floor(annual * benefitRatio);
    
    // 3. System Size Estimation: approx 1kW per 3000-4000 yen of bill. 
    // Let's say 15000 yen -> ~4-5kW system.
    // Cost Difference Logic:
    // Market Price (Visiting Sales/Big Store): ~300,000 yen/kW
    // Direct Construction (Daimatsu): ~220,000 yen/kW
    // Diff: 80,000 yen/kW
    
    const estimatedKw = bill / 3500; // e.g. 15000 / 3500 = 4.28 kW
    const marketPricePerKw = 300000;
    const daimatsuPricePerKw = 220000;
    
    const marketCost = Math.floor(estimatedKw * marketPricePerKw);
    const daimatsuCost = Math.floor(estimatedKw * daimatsuPricePerKw);
    const costDiff = marketCost - daimatsuCost;

    setAnnualSavings(calculatedAnnualSavings);
    setTenYearSavings(calculatedAnnualSavings * 10 + costDiff); // Total benefit including initial cost saving
    setInitialCostDiff(costDiff);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
      <div className="bg-gray-50 p-6 border-b border-gray-200">
        <h3 className="text-lg font-bold text-center text-gray-700 mb-6">
          現在の月々の電気代は？
        </h3>
        <div className="flex justify-center items-baseline gap-2 mb-8">
          <span className="text-4xl font-bold text-primary">{monthlyBill[0].toLocaleString()}</span>
          <span className="text-xl text-gray-500">円</span>
        </div>
        <Slider
          defaultValue={[15000]}
          max={50000}
          min={5000}
          step={1000}
          value={monthlyBill}
          onValueChange={setMonthlyBill}
          className="mb-8"
        />
        <div className="flex justify-between text-sm text-gray-400 px-2">
          <span>5,000円</span>
          <span>50,000円</span>
        </div>
      </div>

      <div className="p-6 md:p-8 bg-white">
        <div className="text-center mb-6">
          <p className="text-sm font-bold text-secondary mb-2">ダイマツで導入した場合の推計メリット</p>
          <div className="text-3xl md:text-4xl font-bold text-primary animate-in fade-in zoom-in duration-300">
            10年で約 <span className="text-secondary">{formatCurrency(tenYearSavings)}</span> お得！
          </div>
          <p className="text-xs text-gray-400 mt-2">※電気代削減額＋売電収入＋初期費用削減額の10年間の合計試算</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card className="bg-blue-50 border-blue-100">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <RefreshCw className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-bold">年間の光熱費削減</p>
                <p className="text-xl font-bold text-blue-700">約 {formatCurrency(annualSavings)}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-orange-50 border-orange-100">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-full text-orange-600">
                <Wallet className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-bold">初期費用の削減（他社比）</p>
                <p className="text-xl font-bold text-orange-700">約 {formatCurrency(initialCostDiff)}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4 text-sm">
            これはあくまで概算です。<br/>
            屋根の形状や向きによって、さらにメリットが出る可能性があります。
          </p>
          <Button className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold text-lg h-14 shadow-lg animate-pulse" asChild>
            <a href="http://daimatsu.link/" target="_blank" rel="noopener noreferrer">
              ダイマツの施工事例と価格を見る（公式サイト）
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
