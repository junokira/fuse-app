import { useEffect, useState } from "react";
import type { Profile, Route } from "./types";
import { supabase } from "./lib/supabase";
import Feed from "./pages/Feed";
import ProfileScreen from "./pages/Profile";
import AuthPage from "./pages/AuthPage";

export default function App() {
  const [me, setMe] = useState<Profile | null>(null);
  const [route, setRoute] = useState<Route>({ name: "feed" });

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (user) {
        const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();
        if (profile) setMe(profile);
      }
    });
    supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
        if (profile) setMe(profile);
      } else {
        setMe(null);
      }
    });
  }, []);

  function openProfile(id: string) {
    setRoute({ name: "profile", userId: id });
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-50">
      <header className="sticky top-0 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/80 backdrop-blur p-4 font-semibold">
        Fuse
      </header>

      {route.name === "feed" && <Feed me={me} onOpenProfile={openProfile} />}
      {route.name === "profile" && <ProfileScreen me={me} userId={route.userId} />}
      {route.name === "login" && <AuthPage onAuth={setMe} />}
    </div>
  );
}
