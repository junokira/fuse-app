import { useState } from "react";
import type { Profile, Post } from "../types";
import { createPost } from "../lib/api";

export default function Composer({
  me,
  onPosted,
}: {
  me: Profile | null;
  onPosted: (p: Post & { profiles: Profile }) => void;
}) {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (!me) return alert("Sign in to post");
    if (!text.trim() && !file) return;

    setBusy(true);
    try {
      const p = await createPost(me.id, file ? "photo" : "text", text, file ? URL.createObjectURL(file) : undefined);
      onPosted(p);
      setText("");
      setFile(null);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-3 mb-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's happening?"
        className="w-full bg-transparent outline-none resize-none"
        rows={3}
      />
      {file && (
        <div className="mt-2">
          <img
            src={URL.createObjectURL(file)}
            alt="preview"
            className="rounded-xl border max-h-60 object-cover"
          />
        </div>
      )}
      <div className="flex items-center justify-between mt-2">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button
          onClick={submit}
          disabled={busy || (!text.trim() && !file)}
          className="px-4 py-2 rounded-full bg-blue-600 text-white disabled:bg-zinc-400"
        >
          Post
        </button>
      </div>
    </div>
  );
}
