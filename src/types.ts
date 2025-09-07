// Shared types

// Auth-related user account
export type AuthUser = {
  id: string;              // Supabase UUID
  email: string;           // Auth email
  username: string;        // Unique username (editable)
  fullName: string;        // Display name
  avatarUrl?: string;      // Profile photo (circular display)
  created_at: number;      // Account creation timestamp (epoch ms)
};

export type UserProfile = {
  id: string;
  username: string;
  fullName: string;
  avatarUrl?: string;
  created_at: number;      // epoch ms
};

export type Story = {
  id: string;
  userId: string;
  imageUrl: string;
  created_at: number;      // epoch ms
};

export type PostType = "text" | "photo";

export type Post = {
  id: string;
  userId: string;
  type: PostType;
  content: string;         // text content
  imageUrl?: string;       // when type === "photo"
  likes: number;
  recasts: number;
  comments: number;
  created_at: number;      // epoch ms
};

export type Tab = "forYou" | "following";

export type Route =
  | { name: "feed" }
  | { name: "profile"; userId: string }
  | { name: "login" };

// Global state
export type State = {
  me: AuthUser | null;            // Logged-in user (null if not logged in)
  following: string[];
  users: Record<string, UserProfile>; // Users by id
  stories: Story[];
  posts: Post[];
  likes: Record<string, boolean>;
  recasts: Record<string, boolean>;
};
