import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Send, CheckCircle2, Loader2, X, Paperclip } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data URL prefix (e.g. "data:image/png;base64,")
      const base64 = result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [topic, setTopic] = useState("estimate");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
    },
    onError: (error) => {
      toast.error("送信に失敗しました。もう一度お試しください。", {
        description: error.message,
      });
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles: File[] = [];

    for (const file of selectedFiles) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name} は10MBを超えています。`, {
          description: "10MB以下のファイルを選択してください。",
        });
        continue;
      }
      validFiles.push(file);
    }

    setFiles((prev) => [...prev, ...validFiles]);
    // Reset input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Convert files to base64
    const attachments = await Promise.all(
      files.map(async (file) => ({
        fileName: file.name,
        base64: await fileToBase64(file),
        mimeType: file.type || "application/octet-stream",
        fileSize: file.size,
      }))
    );

    submitMutation.mutate({
      topic,
      message: message || undefined,
      email: email || undefined,
      attachments: attachments.length > 0 ? attachments : undefined,
    });
  };

  const handleReset = () => {
    setSubmitted(false);
    setTopic("estimate");
    setMessage("");
    setEmail("");
    setFiles([]);
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
            onClick={handleReset}
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <label className="text-sm font-medium leading-none">
              ご相談のテーマ <span className="text-red-500">*</span>
            </label>
            <RadioGroup value={topic} onValueChange={setTopic} className="grid grid-cols-1 gap-2">
              <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50 cursor-pointer">
                <RadioGroupItem value="estimate" id="r1" />
                <Label htmlFor="r1" className="cursor-pointer flex-1">他社の見積もりが適正か知りたい</Label>
              </div>
              <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50 cursor-pointer">
                <RadioGroupItem value="roof" id="r2" />
                <Label htmlFor="r2" className="cursor-pointer flex-1">自宅の屋根に設置できるか知りたい</Label>
              </div>
              <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50 cursor-pointer">
                <RadioGroupItem value="subsidy" id="r3" />
                <Label htmlFor="r3" className="cursor-pointer flex-1">補助金について聞きたい</Label>
              </div>
              <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50 cursor-pointer">
                <RadioGroupItem value="battery" id="r4" />
                <Label htmlFor="r4" className="cursor-pointer flex-1">蓄電池の導入を検討している</Label>
              </div>
              <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50 cursor-pointer">
                <RadioGroupItem value="other" id="r5" />
                <Label htmlFor="r5" className="cursor-pointer flex-1">その他</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium leading-none">
              具体的なご相談内容（自由入力）
            </label>
            <Textarea 
              id="message" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={"ここに相談したい内容を自由にお書きください。\n例：\n・他社で〇〇万円と言われたが適正か？\n・築15年の屋根でも大丈夫？\n・とりあえず話だけ聞いてみたい"}
              className="min-h-[160px] text-base"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              資料や写真を添付（任意）
            </label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="gap-2"
              >
                <Paperclip className="h-4 w-4" />
                ファイルを選択
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*,.pdf"
                multiple
                onChange={handleFileChange}
              />
            </div>

            {files.length > 0 && (
              <div className="space-y-2 mt-2">
                {files.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md border text-sm"
                  >
                    <span className="truncate flex-1 mr-2">{file.name}</span>
                    <span className="text-muted-foreground text-xs mr-2 shrink-0">
                      {(file.size / 1024).toFixed(0)}KB
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-gray-400 hover:text-red-500 transition-colors shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <p className="text-xs text-muted-foreground">
              ※見積書や屋根の写真などがあれば、より具体的な回答が可能です。（10MB以下）
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium leading-none">
              メールアドレス <span className="text-gray-400 text-xs font-normal">(返信をご希望の場合のみ)</span>
            </label>
            <Input 
              id="email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com" 
            />
          </div>

          <Button
            type="submit"
            className="w-full font-bold text-lg h-12"
            disabled={submitMutation.isPending}
          >
            {submitMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                送信中...
              </>
            ) : (
              "匿名で相談する"
            )}
          </Button>
          
          <p className="text-xs text-center text-muted-foreground mt-4">
            ※強引な営業は一切いたしませんのでご安心ください。
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
