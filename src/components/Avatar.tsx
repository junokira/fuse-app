import type { Profile } from "../types";

export default function Avatar({ user, onClick, size = 44 }: { user: Profile; onClick?: () => void; size?: number }) {
  return (
    <button
      onClick={onClick}
      className="shrink-0 rounded-full overflow-hidden"
      style={{ width: size, height: size }}
    >
      {user.avatar_url ? (
        <img
          src={user.avatar_url}
          alt={user.full_name}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="bg-zinc-300 w-full h-full flex items-center justify-center">
          {user.full_name[0]}
        </div>
      )}
    </button>
  );
}
