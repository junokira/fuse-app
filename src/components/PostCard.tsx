import type { Post, Profile } from "../types";
import { formatDistanceToNow } from "date-fns";
import Avatar from "./Avatar";

type Props = {
  post: Post & { profiles: Profile };
  me: Profile | null;
  liked: boolean;
  onLike: () => void;
  onOpenProfile: (id: string) => void;
};

export default function PostCard({ post, me, liked, onLike, onOpenProfile }: Props) {
  const user = post.profiles;

  return (
    <article className="bg-white dark:bg-black rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 my-4">
      <div className="flex items-center gap-3">
        <Avatar user={user} onClick={() => onOpenProfile(user.id)} />
        <div>
          <div className="font-medium">{user.full_name}</div>
          <div className="text-xs text-zinc-500">@{user.username}</div>
        </div>
        <div className="ml-auto text-xs text-zinc-400">
          {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
        </div>
      </div>

      {post.type === "text" && (
        <p className="mt-3 whitespace-pre-wrap">{post.content}</p>
      )}

      {post.type === "photo" && post.image_url && (
        <div className="mt-3">
          <img
            src={post.image_url}
            alt="Post"
            className="rounded-xl border border-zinc-200 dark:border-zinc-800"
          />
        </div>
      )}

      <div className="flex gap-4 mt-3 text-sm text-zinc-500">
        <button onClick={onLike} className={liked ? "text-pink-600" : ""}>
          ❤️ Like
        </button>
      </div>
    </article>
  );
}
