import { useMemo, useState } from "react";
import type { State, Tab } from "../types";
import StoriesTray from "../components/StoriesTray";
import PostCard from "../components/PostCard";
import Composer from "../components/Composer";
import { saveStateDebounced } from "../lib/state";

export default function Feed({ state, setState, onOpenProfile }: { state: State; setState: (s: State) => void; onOpenProfile: (id: string) => void; }) {
  const [tab, setTab] = useState<Tab>("forYou");

  const posts = useMemo(() => {
    if (tab === "following") {
      const set = new Set(state.following);
      return state.posts.filter(p => set.has(p.userId));
    }
    return state.posts;
  }, [state.posts, state.following, tab]);

  function toggle(postId: string, act: "like" | "recast" | "comment") {
    const liked = state.likes[postId] || false;
    const recasted = state.recasts[postId] || false;
    const posts = state.posts.map(p => {
      if (p.id !== postId) return p;
      if (act === "like") return { ...p, likes: p.likes + (liked ? -1 : 1) };
      if (act === "recast") return { ...p, recasts: p.recasts + (recasted ? -1 : 1) };
      if (act === "comment") return { ...p, comments: p.comments + 1 };
      return p;
    });
    const next = {
      ...state,
      posts,
      likes: { ...state.likes, [postId]: act === "like" ? !liked : liked },
      recasts: { ...state.recasts, [postId]: act === "recast" ? !recasted : recasted },
    };
    setState(next);
    saveStateDebounced(next);
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="sticky top-0 bg-white/80 dark:bg-black/80 backdrop-blur z-10">
        <div className="flex gap-6 border-b border-zinc-200 dark:border-zinc-800">
          <button className={"py-3 " + (tab === "forYou" ? "font-semibold" : "text-zinc-500")} onClick={() => setTab("forYou")}>For you</button>
          <button className={"py-3 " + (tab === "following" ? "font-semibold" : "text-zinc-500")} onClick={() => setTab("following")}>Following</button>
        </div>
      </div>

      <div className="mt-4">
        <StoriesTray state={state} onOpenProfile={onOpenProfile} />
      </div>

      <div className="mt-4">
        <Composer state={state} setState={setState} />
      </div>

      <div className="mt-2">
        {posts.map((p) => (
          <PostCard
            key={p.id}
            post={p}
            user={state.users[p.userId] || null}
            liked={!!state.likes[p.id]}
            recasted={!!state.recasts[p.id]}
            onToggle={(act) => toggle(p.id, act)}
            onOpenProfile={onOpenProfile}
          />
        ))}
      </div>
    </div>
  );
}
