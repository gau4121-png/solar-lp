import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  Inbox,
  Loader2,
  Mail,
  Paperclip,
  FileText,
  Image as ImageIcon,
  ExternalLink,
  RefreshCw,
  ShieldAlert,
} from "lucide-react";
import { useState } from "react";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";

const STATUS_CONFIG = {
  new: { label: "新規", variant: "destructive" as const, className: "bg-red-500 hover:bg-red-500" },
  read: { label: "確認済", variant: "secondary" as const, className: "bg-blue-500 hover:bg-blue-500 text-white" },
  replied: { label: "返信済", variant: "outline" as const, className: "bg-green-500 hover:bg-green-500 text-white" },
};

function formatDate(date: Date | string) {
  const d = new Date(date);
  return d.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getFileIcon(mimeType: string | null) {
  if (mimeType?.startsWith("image/")) return <ImageIcon className="h-4 w-4" />;
  return <FileText className="h-4 w-4" />;
}

function formatFileSize(bytes: number | null) {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

export default function AdminInquiries() {
  const { user, loading: authLoading } = useAuth();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const inquiriesQuery = trpc.contact.list.useQuery(undefined, {
    enabled: !!user && user.role === "admin",
  });

  const detailQuery = trpc.contact.detail.useQuery(
    { id: selectedId! },
    {
      enabled: selectedId !== null,
    }
  );

  const updateStatusMutation = trpc.contact.updateStatus.useMutation({
    onSuccess: () => {
      inquiriesQuery.refetch();
      if (selectedId) detailQuery.refetch();
      toast.success("ステータスを更新しました");
    },
    onError: (error) => {
      toast.error("ステータスの更新に失敗しました", {
        description: error.message,
      });
    },
  });

  // Auth loading state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="pt-8 pb-8 text-center">
            <ShieldAlert className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">ログインが必要です</h2>
            <p className="text-muted-foreground mb-6">
              管理画面にアクセスするにはログインしてください。
            </p>
            <Button
              onClick={() => {
                window.location.href = getLoginUrl();
              }}
            >
              ログイン
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Not admin
  if (user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="pt-8 pb-8 text-center">
            <ShieldAlert className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">アクセス権限がありません</h2>
            <p className="text-muted-foreground mb-6">
              この画面は管理者のみアクセスできます。
            </p>
            <Button variant="outline" onClick={() => (window.location.href = "/")}>
              トップページに戻る
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const inquiries = inquiriesQuery.data ?? [];
  const newCount = inquiries.filter((i) => i.status === "new").length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => (window.location.href = "/")}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                サイトに戻る
              </Button>
              <div className="h-6 w-px bg-gray-200" />
              <h1 className="text-lg font-bold text-primary flex items-center gap-2">
                <Inbox className="h-5 w-5" />
                問い合わせ管理
              </h1>
              {newCount > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {newCount}件 未読
                </Badge>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => inquiriesQuery.refetch()}
              disabled={inquiriesQuery.isFetching}
              className="gap-2"
            >
              <RefreshCw
                className={`h-4 w-4 ${inquiriesQuery.isFetching ? "animate-spin" : ""}`}
              />
              更新
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">全問い合わせ</p>
                  <p className="text-3xl font-bold">{inquiries.length}</p>
                </div>
                <Inbox className="h-10 w-10 text-muted-foreground/30" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">未読</p>
                  <p className="text-3xl font-bold text-red-500">{newCount}</p>
                </div>
                <Mail className="h-10 w-10 text-red-200" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">返信済</p>
                  <p className="text-3xl font-bold text-green-500">
                    {inquiries.filter((i) => i.status === "replied").length}
                  </p>
                </div>
                <Mail className="h-10 w-10 text-green-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Inquiry Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">問い合わせ一覧</CardTitle>
          </CardHeader>
          <CardContent>
            {inquiriesQuery.isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : inquiries.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                <Inbox className="h-16 w-16 mb-4 text-muted-foreground/30" />
                <p className="text-lg font-medium">問い合わせはまだありません</p>
                <p className="text-sm">フォームから送信されると、ここに表示されます。</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">ID</TableHead>
                      <TableHead className="w-[100px]">ステータス</TableHead>
                      <TableHead>相談テーマ</TableHead>
                      <TableHead className="hidden md:table-cell">メッセージ</TableHead>
                      <TableHead className="hidden sm:table-cell">メール</TableHead>
                      <TableHead className="w-[160px]">受信日時</TableHead>
                      <TableHead className="w-[80px]">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inquiries.map((inquiry) => {
                      const statusConfig = STATUS_CONFIG[inquiry.status];
                      return (
                        <TableRow
                          key={inquiry.id}
                          className={`cursor-pointer hover:bg-gray-50 transition-colors ${
                            inquiry.status === "new" ? "bg-red-50/50" : ""
                          }`}
                          onClick={() => setSelectedId(inquiry.id)}
                        >
                          <TableCell className="font-mono text-sm">
                            #{inquiry.id}
                          </TableCell>
                          <TableCell>
                            <Badge className={statusConfig.className}>
                              {statusConfig.label}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">
                            {inquiry.topicLabel}
                          </TableCell>
                          <TableCell className="hidden md:table-cell max-w-[300px]">
                            <span className="text-sm text-muted-foreground truncate block">
                              {inquiry.message
                                ? inquiry.message.length > 60
                                  ? inquiry.message.substring(0, 60) + "..."
                                  : inquiry.message
                                : "—"}
                            </span>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell text-sm">
                            {inquiry.email || "—"}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {formatDate(inquiry.createdAt)}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedId(inquiry.id);
                              }}
                            >
                              詳細
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Detail Dialog */}
      <Dialog open={selectedId !== null} onOpenChange={(open) => !open && setSelectedId(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              問い合わせ詳細
              {detailQuery.data && (
                <span className="text-muted-foreground font-mono text-sm">
                  #{detailQuery.data.id}
                </span>
              )}
            </DialogTitle>
          </DialogHeader>

          {detailQuery.isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : detailQuery.data ? (
            <div className="space-y-6">
              {/* Status & Actions */}
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-muted-foreground">ステータス:</span>
                  <Select
                    value={detailQuery.data.status}
                    onValueChange={(value) => {
                      updateStatusMutation.mutate({
                        id: detailQuery.data!.id,
                        status: value as "new" | "read" | "replied",
                      });
                    }}
                  >
                    <SelectTrigger className="w-[140px] bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">新規</SelectItem>
                      <SelectItem value="read">確認済</SelectItem>
                      <SelectItem value="replied">返信済</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <span className="text-sm text-muted-foreground">
                  {formatDate(detailQuery.data.createdAt)}
                </span>
              </div>

              {/* Topic */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">相談テーマ</h4>
                <p className="text-base font-medium">{detailQuery.data.topicLabel}</p>
              </div>

              {/* Message */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">メッセージ</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-base whitespace-pre-wrap leading-relaxed">
                    {detailQuery.data.message || "(メッセージなし)"}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">メールアドレス</h4>
                {detailQuery.data.email ? (
                  <a
                    href={`mailto:${detailQuery.data.email}`}
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    <Mail className="h-4 w-4" />
                    {detailQuery.data.email}
                  </a>
                ) : (
                  <p className="text-muted-foreground">(未入力)</p>
                )}
              </div>

              {/* Attachments */}
              {detailQuery.data.attachments && detailQuery.data.attachments.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
                    <Paperclip className="h-4 w-4" />
                    添付ファイル ({detailQuery.data.attachments.length}件)
                  </h4>
                  <div className="space-y-2">
                    {detailQuery.data.attachments.map((attachment) => (
                      <a
                        key={attachment.id}
                        href={attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 rounded-lg p-3 transition-colors group"
                      >
                        <div className="shrink-0 text-muted-foreground">
                          {getFileIcon(attachment.mimeType)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                            {attachment.fileName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {attachment.mimeType} · {formatFileSize(attachment.fileSize)}
                          </p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ))}
                  </div>

                  {/* Image previews */}
                  {detailQuery.data.attachments
                    .filter((a) => a.mimeType?.startsWith("image/"))
                    .map((attachment) => (
                      <div key={`preview-${attachment.id}`} className="mt-3">
                        <img
                          src={attachment.url}
                          alt={attachment.fileName}
                          className="max-w-full max-h-[400px] rounded-lg border object-contain"
                        />
                      </div>
                    ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              問い合わせが見つかりませんでした。
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
