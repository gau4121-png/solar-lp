import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Inbox } from "lucide-react";
import { useLocation } from "wouter";

/**
 * Admin-only notification badge that shows the unread inquiry count.
 * Renders nothing for non-admin users or when there are no unread inquiries.
 * Clicking navigates to /admin/inquiries.
 */
export function AdminNotificationBadge() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  const isAdmin = user?.role === "admin";

  const { data, error } = trpc.contact.unreadCount.useQuery(undefined, {
    enabled: isAdmin,
    refetchInterval: 30_000, // Poll every 30 seconds
  });

  // Silently ignore permission errors for non-admin users
  if (error && error.message.includes("10002")) {
    return null;
  }

  if (!isAdmin) return null;

  const count = data?.count ?? 0;

  return (
    <button
      onClick={() => setLocation("/admin/inquiries")}
      className="relative flex items-center justify-center h-9 w-9 rounded-lg hover:bg-black/10 transition-colors"
      aria-label={`問い合わせ管理${count > 0 ? ` (${count}件未読)` : ""}`}
      title="問い合わせ管理"
    >
      <Inbox className="h-5 w-5 text-current" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-red-500 text-white text-xs font-bold shadow-sm animate-in fade-in zoom-in duration-300">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}
