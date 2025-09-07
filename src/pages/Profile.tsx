import { useEffect, useState } from "react";
import type { Profile } from "../types";
import Avatar from "../components/Avatar";
import {
  fetchProfile,
  fetchFollowers,
  followUser,
  unfollowUser,
} from "../lib/api";

export default function ProfileScreen({
  userId,
  me,
}: {
  userId: string;
  me: Profile | null;
}) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [followers, setFollowers] = useState<string[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    fetchProfile(userId).then(setProfile);
    fetchFollowers(userId).then((f) => {
      setFollowers(f);
      if (me) setIsFollowing(f.includes(me.id));
    });
  }, [userId, me]);

  async function toggleFollow() {
    if (!me) return alert("Sign in to follow users");
    if (isFollowing) {
      await unfollowUser(me.id, userId);
      setIsFollowing(false);
    } else {
      await followUser(me.id, userId);
      setIsFollowing(true);
    }
  }

  if (!profile) return <div className="p-4">Loading…</div>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="flex items-center gap-4">
        <Avatar user={profile} size={64} />
        <div>
          <div className="text-xl font-semibold">{profile.full_name}</div>
          <div className="text-zinc-500">@{profile.username}</div>
          <div className="text-sm text-zinc-400 mt-1">
            {followers.length} followers
          </div>
        </div>
        {me && me.id !== profile.id && (
          <button
            onClick={toggleFollow}
            className="ml-auto px-3 py-1 rounded-md border border-zinc-300 dark:border-zinc-700"
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        )}
      </div>
    </div>
  );
}
