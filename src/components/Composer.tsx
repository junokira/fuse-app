import { useState } from "react";
import type { State } from "../types";
import { uid, now, readAsDataURL } from "../lib/utils";

export default function Composer({ state, setState }: { state: State; setState: (s: State) => void }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const canPost = text.trim().length > 0 || !!image;

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) {
      const data = await readAsDataURL(f);
      setImage(data);
    }
  }

  function submit() {
    if (!canPost) return;
    const me = state.me || Object.values(state.users)[0];
    const newPost = {
      id: uid(),
      userId: me.id,
      type: image ? "photo" as const : "text" as const,
      content: text.trim(),
      imageUrl: image || undefined,
      likes: 0, recasts: 0, comments: 0,
      created_at: now(),
    };
    setState({ ...state, posts: [newPost, ...state.posts] });
    setText("");
    setImage(null);
  }

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's happening?"
        className="w-full bg-transparent outline-none resize-none"
        rows={3}
      />
      {image && (
        <div className="mt-2">
          <img src={image} alt="selected" className="rounded-xl border" />
        </div>
      )}
      <div className="mt-2 flex items-center justify-between">
        <input type="file" accept="image/*" onChange={onFileChange} />
        <button className={"px-3 py-1 rounded-md " + (canPost ? "bg-blue-600 text-white" : "bg-zinc-200 text-zinc-500")} disabled={!canPost} onClick={submit}>Post</button>
      </div>
    </div>
  );
}
