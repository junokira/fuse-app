import type { State } from "../types";
import Avatar from "../components/Avatar";

export default function ProfileScreen({ state, userId }: { state: State; userId: string }) {
  const u = state.users[userId];
  if (!u) return <div className="p-4">User not found.</div>;
  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="flex items-center gap-4">
        <Avatar user={u} size={64} />
        <div>
          <div className="text-xl font-semibold">{u.fullName}</div>
          <div className="text-zinc-500">@{u.username}</div>
        </div>
      </div>
    </div>
  );
}
