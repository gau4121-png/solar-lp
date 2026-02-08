import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card className="w-full max-w-md mx-auto bg-green-50 border-green-200">
        <CardContent className="pt-6 text-center py-12">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-green-800 mb-2">送信完了</h3>
          <p className="text-green-700 mb-6">
            お問い合わせありがとうございます。<br />
            内容を確認次第、担当者よりご連絡させていただきます。
          </p>
          <Button 
            variant="outline" 
            className="bg-white hover:bg-green-100 text-green-700 border-green-300"
            onClick={() => setSubmitted(false)}
          >
            新しい質問を送る
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="bg-primary text-white rounded-t-xl">
        <CardTitle className="flex items-center gap-2">
          <Send className="h-5 w-5" />
          匿名相談フォーム
        </CardTitle>
        <CardDescription className="text-blue-100">
          お名前・住所は不要です。気になること、なんでも聞いてください。
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form 
          onSubmit={handleSubmit} 
          className="space-y-4"
          name="contact" 
          method="POST" 
          data-netlify="true"
        >
          <input type="hidden" name="form-name" value="contact" />
          
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              ご相談・ご質問内容 <span className="text-red-500">*</span>
            </label>
            <Textarea 
              id="message" 
              name="message"
              placeholder="例：見積もりが適正か見てほしい、補助金について知りたい..." 
              className="min-h-[120px]"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              メールアドレス <span className="text-gray-400 text-xs font-normal">(返信をご希望の場合のみ)</span>
            </label>
            <Input 
              id="email" 
              name="email"
              type="email" 
              placeholder="example@email.com" 
            />
          </div>

          <Button type="submit" className="w-full font-bold text-lg h-12" disabled={loading}>
            {loading ? "送信中..." : "匿名で相談する"}
          </Button>
          
          <p className="text-xs text-center text-muted-foreground mt-4">
            ※強引な営業は一切いたしませんのでご安心ください。
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
