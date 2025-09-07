import { useEffect, useState } from "react";
import type { Profile, Route } from "./types";
import { runSelfTests } from "./lib/utils";
import { loadState, saveStateDebounced } from "./lib/state";
import Feed from "./pages/Feed";
import ProfileScreen from "./pages/Profile";
import AuthPage from "./pages/AuthPage";

export default function App() {
  const [state, setState] = useState<State>(loadState());
  const [route, setRoute] = useState<Route>({ name: "feed" });

  useEffect(() => {
    runSelfTests();
  }, []);

  useEffect(() => {
    saveStateDebounced(state);
  }, [state]);

  function openProfile(id: string) {
    setRoute({ name: "profile", userId: id });
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-50">
      <header className="sticky top-0 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/80 backdrop-blur">
        <div className="max-w-xl mx-auto p-4 font-semibold">Fuse</div>
      </header>
      {route.name === "feed" && (
        <Feed state={state} setState={setState} onOpenProfile={openProfile} />
      )}
      {route.name === "profile" && <ProfileScreen state={state} userId={route.userId} />}
      {route.name === "login" && <AuthPage />}
    </div>
  );
}
