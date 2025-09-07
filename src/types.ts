export type Profile = {
  id: string;
  email: string;
  username: string;
  full_name: string;
  avatar_url?: string;
  created_at: string;
};

export type Post = {
  id: string;
  user_id: string;
  type: "text" | "photo";
  content: string;
  image_url?: string;
  created_at: string;
};

export type Like = {
  user_id: string;
  post_id: string;
};

export type Follow = {
  follower_id: string;
  following_id: string;
};
