// src/app/page.tsx

"use client";

import TelegramInit from "@/components/TelegramInit"; // Assuming this exists and is fine
import { useEffect, useState } from "react";
import Link from "next/link";

// Define a type for the Telegram user info
interface TelegramUser {
  first_name: string;
  username: string;
  id: number;
}

// Keep the global declaration for window.Telegram
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        initDataUnsafe?: {
          user?: TelegramUser; // Use the defined type here
        };
      };
    };
  }
}


export default function Home() {
  // Use the specific type or null for the user state
  const [user, setUser] = useState<TelegramUser | null>(null); // <<< CHANGE 'any' TO 'TelegramUser | null'

  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready(); // tell Telegram the app is ready
      tg.expand(); // optional: expand full screen

      const userInfo = tg.initDataUnsafe?.user;
      // Set user state - TypeScript now knows userInfo is TelegramUser | undefined
      setUser(userInfo ?? null); // Use nullish coalescing for safety
    }
  }, []);

  return (
    <>
      <TelegramInit />
      <main className="p-4">
        <h1 className="text-2xl font-bold">Welcome to Ludo!</h1>
        {user ? ( // Check if user is not null
          <div>
            <p>Hello, {user.first_name} 👋</p>
            <p>Username: @{user.username}</p>
            <p>User ID: {user.id}</p>
          </div>
        ) : (
          <p>Loading Telegram user info...</p>
        )}

        <Link href="/ludo" className="mt-4 inline-block text-blue-600 underline"> {/* Added inline-block for spacing */}
          Go to Ludo Game
        </Link>
      </main>
    </>
  );
}