// Shared types

// Profile row in Supabase
export type Profile = {
  id: string;            // Supabase UUID
  email: string;         // Auth email
  username: string;      // Unique username
  full_name: string;     // Display name
  avatar_url?: string;   // Profile photo
  created_at: string;    // ISO timestamp (from timestamptz)
};

// Post row in Supabase
export type Post = {
  id: string;
  user_id: string;       // → profiles.id
  type: "text" | "photo";
  content: string;
  image_url?: string;
  created_at: string;    // ISO timestamp
};

// Like row in Supabase
export type Like = {
  user_id: string;       // → profiles.id
  post_id: string;       // → posts.id
};

// Follow row in Supabase
export type Follow = {
  follower_id: string;   // → profiles.id
  following_id: string;  // → profiles.id
};

// UI-only: Story (if you implement ephemeral content)
export type Story = {
  id: string;
  user_id: string;
  image_url: string;
  created_at: string;
};

// Feed tabs
export type Tab = "forYou" | "following";

// Navigation routes
export type Route =
  | { name: "feed" }
  | { name: "profile"; userId: string }
  | { name: "login" };
