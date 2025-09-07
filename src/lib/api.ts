import { supabase } from "./supabase";
import type { Post, Profile } from "../types";

//
// Posts
//
export async function fetchPosts(): Promise<(Post & { profiles: Profile })[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*, profiles(id, email, username, full_name, avatar_url, created_at)")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as any;
}

export async function createPost(
  user_id: string,
  type: "text" | "photo",
  content: string,
  image_url?: string
) {
  const { data, error } = await supabase
    .from("posts")
    .insert({ user_id, type, content, image_url })
    .select("*, profiles(id, email, username, full_name, avatar_url, created_at)")
    .single();

  if (error) throw error;
  return data as Post & { profiles: Profile };
}

//
// Likes
//
export async function likePost(user_id: string, post_id: string) {
  const { error } = await supabase.from("likes").insert({ user_id, post_id });
  if (error) throw error;
}

export async function unlikePost(user_id: string, post_id: string) {
  const { error } = await supabase
    .from("likes")
    .delete()
    .eq("user_id", user_id)
    .eq("post_id", post_id);
  if (error) throw error;
}

//
// Follows
//
export async function fetchFollowing(user_id: string) {
  const { data, error } = await supabase
    .from("follows")
    .select("following_id")
    .eq("follower_id", user_id);

  if (error) throw error;
  return data.map((f) => f.following_id) as string[];
}

export async function fetchFollowers(user_id: string) {
  const { data, error } = await supabase
    .from("follows")
    .select("follower_id")
    .eq("following_id", user_id);

  if (error) throw error;
  return data.map((f) => f.follower_id) as string[];
}

export async function followUser(follower_id: string, following_id: string) {
  const { error } = await supabase
    .from("follows")
    .insert({ follower_id, following_id });
  if (error) throw error;
}

export async function unfollowUser(follower_id: string, following_id: string) {
  const { error } = await supabase
    .from("follows")
    .delete()
    .eq("follower_id", follower_id)
    .eq("following_id", following_id);
  if (error) throw error;
}

//
// Profiles
//
export async function fetchProfile(id: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, username, full_name, avatar_url, created_at")
    .eq("id", id)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data as Profile | null;
}
