"use client";

import TelegramInit from "@/components/TelegramInit";
import { useEffect, useState } from "react";
import Link from "next/link";

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        initDataUnsafe?: {
          user?: {
            first_name: string;
            username: string;
            id: number;
          };
        };
      };
    };
  }
}


export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready(); // tell Telegram the app is ready
      tg.expand(); // optional: expand full screen

      const userInfo = tg.initDataUnsafe?.user;
      setUser(userInfo);
    }
  }, []);

  return (
    <>
      <TelegramInit />
      <main className="p-4">
        <h1 className="text-2xl font-bold">Welcome to Ludo!</h1>
        {user ? (
          <div>
            <p>Hello, {user.first_name} 👋</p>
            <p>Username: @{user.username}</p>
            <p>User ID: {user.id}</p>
          </div>
        ) : (
          <p>Loading Telegram user info...</p>
        )}

<Link href="/ludo" className="mt-4 text-blue-600 underline">
          Go to Ludo Game
        </Link>
      </main>
    </>
  );
}
