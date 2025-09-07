import { useState } from "react";
import { supabase } from "../lib/supabase";
import type { Profile } from "../types";

export default function SignUpForm({ onSignIn }: { onSignIn: (p: Profile) => void }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) return setError(error.message);

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: data.user?.id,
        email,
        username,
        full_name: fullName,
      })
      .select()
      .single();

    if (profileError) return setError(profileError.message);
    if (profile) onSignIn(profile);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Username"
        className="w-full border p-2 rounded"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Full Name"
        className="w-full border p-2 rounded"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">
        Sign Up
      </button>
    </form>
  );
}
