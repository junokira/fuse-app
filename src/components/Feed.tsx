import { useEffect, useState } from "react";
import type { Post, Profile, Tab } from "../types";
import { fetchPosts, likePost, unlikePost, fetchFollowing } from "../lib/api";
import PostCard from "../components/PostCard";
import Composer from "../components/Composer";

export default function Feed({
  me,
  onOpenProfile,
}: {
  me: Profile | null;
  onOpenProfile: (id: string) => void;
}) {
  const [posts, setPosts] = useState<(Post & { profiles: Profile })[]>([]);
  const [likes, setLikes] = useState<Record<string, boolean>>({});
  const [following, setFollowing] = useState<string[]>([]);
  const [tab, setTab] = useState<Tab>("forYou");

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (me) {
      fetchFollowing(me.id).then(setFollowing);
    }
  }, [me]);

  async function load() {
    const data = await fetchPosts();
    setPosts(data);
  }

  async function toggleLike(postId: string) {
    if (!me) return alert("Sign in to like posts");
    const alreadyLiked = likes[postId];
    if (alreadyLiked) {
      await unlikePost(me.id, postId);
    } else {
      await likePost(me.id, postId);
    }
    setLikes({ ...likes, [postId]: !alreadyLiked });
  }

  function handlePosted(p: Post & { profiles: Profile }) {
    setPosts([p, ...posts]);
  }

  const visiblePosts =
    tab === "forYou"
      ? posts
      : posts.filter((p) => following.includes(p.user_id));

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="flex gap-6 border-b border-zinc-200 dark:border-zinc-800 mb-4">
        <button
          className={`py-2 ${tab === "forYou" ? "font-semibold" : "text-zinc-500"}`}
          onClick={() => setTab("forYou")}
        >
          For you
        </button>
        <button
          className={`py-2 ${tab === "following" ? "font-semibold" : "text-zinc-500"}`}
          onClick={() => setTab("following")}
        >
          Following
        </button>
      </div>

      {me && <Composer me={me} onPosted={handlePosted} />}

      {visiblePosts.map((p) => (
        <PostCard
          key={p.id}
          post={p}
          me={me}
          liked={!!likes[p.id]}
          onLike={() => toggleLike(p.id)}
          onOpenProfile={onOpenProfile}
        />
      ))}
    </div>
  );
}
