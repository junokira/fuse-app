import type { State, UserProfile, Post, Story } from "../types";
import { now, uid, placeholderImg } from "./utils";

const KEY = "fuse_state_v1";

export function defaultUsers(): Record<string, UserProfile> {
  const t = now() - 1000 * 60 * 60 * 24 * 30;
  const users: Record<string, UserProfile> = {
    u1: {
      id: "u1",
      username: "alice",
      fullName: "Alice Chen",
      avatarUrl: undefined,
      created_at: t,
    },
    u2: {
      id: "u2",
      username: "bob",
      fullName: "Bob Patel",
      avatarUrl: undefined,
      created_at: t + 1,
    },
  };
  return users;
}

export function defaultPosts(users: Record<string, UserProfile>): Post[] {
  const list: Post[] = [
    {
      id: uid(),
      userId: "u1",
      type: "text",
      content: "Hello world 👋 #firstpost",
      likes: 3, recasts: 1, comments: 0,
      created_at: now() - 1000 * 60 * 20,
    },
    {
      id: uid(),
      userId: "u2",
      type: "photo",
      content: "Sunset tonight",
      imageUrl: placeholderImg,
      likes: 12, recasts: 2, comments: 1,
      created_at: now() - 1000 * 60 * 90,
    },
  ];
  return list.sort((a,b) => b.created_at - a.created_at);
}

export function defaultStories(): Story[] {
  return [
    { id: uid(), userId: "u1", imageUrl: placeholderImg, created_at: now() - 1000 * 60 * 30 },
    { id: uid(), userId: "u2", imageUrl: placeholderImg, created_at: now() - 1000 * 60 * 40 },
  ];
}

export function loadState(): State {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as State;
  } catch {}
  const users = defaultUsers();
  return {
    me: null,
    following: ["u1"],
    users,
    stories: defaultStories(),
    posts: defaultPosts(users),
    likes: {},
    recasts: {},
  };
}

let _saveTimer: number | undefined;
export function saveStateDebounced(state: State) {
  if (_saveTimer) window.clearTimeout(_saveTimer);
  _saveTimer = window.setTimeout(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {}
  }, 300);
}
