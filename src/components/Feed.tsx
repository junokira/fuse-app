import type { Profile, Post, Tab } from "../types";

export default function FeedComponent({ state }: { state: State }) {
  // Legacy placeholder to satisfy imports if referenced.
  return <div className="p-4 text-sm text-zinc-500">Feed component placeholder. Posts: {state.posts.length}</div>;
}
