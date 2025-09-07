import type { State } from "../types";
import Avatar from "./Avatar";

export default function StoriesTray({ state, onOpenProfile }: { state: State; onOpenProfile: (id: string) => void }) {
  return (
    <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
      {state.stories.map((s) => {
        const u = state.users[s.userId];
        return (
          <button
            key={s.id}
            className="inline-flex flex-col items-center shrink-0 w-[72px]"
            onClick={() => onOpenProfile(s.userId)}
          >
            <div className="relative">
              <span className="absolute inset-0 rounded-full border-2 border-pink-500/60" />
              <Avatar user={u} />
            </div>
            <div className="text-xs text-zinc-500 mt-1 w-full truncate text-center">
              {s.userId === (state.me?.id || "") ? "Your story" : (u?.fullName || u?.username || "Unknown")}
            </div>
          </button>
        );
      })}
    </div>
  );
}
