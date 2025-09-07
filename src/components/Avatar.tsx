import type { UserProfile } from "../types";

export default function Avatar({ user, size = 40, onClick }: { user: UserProfile; size?: number; onClick?: () => void }) {
  const initials = (user.fullName || user.username).split(/\s+/).map(s => s[0]?.toUpperCase()).slice(0, 2).join("");
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-100"
      style={{ width: size, height: size }}
      aria-label={`${user.fullName}'s avatar`}
    >
      {user.avatarUrl ? (
        <img src={user.avatarUrl} alt={user.fullName} className="w-full h-full rounded-full object-cover" />
      ) : (
        <span className="text-sm font-medium">{initials}</span>
      )}
    </button>
  );
}
