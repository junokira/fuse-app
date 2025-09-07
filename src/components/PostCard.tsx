import type { Post, UserProfile } from "../types";
import { renderRichText, formatCount, timeAgo } from "../lib/utils";
import Avatar from "./Avatar";

type Props = {
  post: Post;
  user: UserProfile | null;
  liked: boolean;
  recasted: boolean;
  onToggle: (act: "like" | "recast" | "comment") => void;
  onOpenProfile: (id: string) => void;
};

export default function PostCard({ post, user, liked, recasted, onToggle, onOpenProfile }: Props) {
  const displayName = user?.fullName ?? "Unknown";
  const handle = user?.username ?? "unknown";

  return (
    <article className="bg-white dark:bg-black rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 my-4">
      {user && (
        <div className="flex items-center gap-3 mb-3">
          <Avatar user={user} onClick={() => onOpenProfile(user.id)} />
          <div className="leading-tight">
            <div className="font-medium">{displayName}</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              @{handle} · {timeAgo(post.created_at)}
            </div>
          </div>
        </div>
      )}
      {post.type === "text" && (
        <div className="text-[15px] leading-6 whitespace-pre-wrap">{renderRichText(post.content)}</div>
      )}
      {post.type === "photo" && (
        <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
          <img src={post.imageUrl} alt={post.content || "Post image"} className="w-full h-auto object-cover" />
        </div>
      )}
      <div className="mt-3 flex items-center gap-5 text-sm text-zinc-600 dark:text-zinc-400">
        <button className={"hover:text-zinc-900 dark:hover:text-zinc-50 " + (liked ? "font-semibold" : "")} onClick={() => onToggle("like")}>
          ❤️ {formatCount(post.likes)}
        </button>
        <button className={recasted ? "font-semibold" : ""} onClick={() => onToggle("recast")}>
          🔁 {formatCount(post.recasts)}
        </button>
        <button onClick={() => onToggle("comment")}>💬 {formatCount(post.comments)}</button>
      </div>
    </article>
  );
}
