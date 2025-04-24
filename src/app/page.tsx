import TelegramInit from "@/components/TelegramInit";

export default function Home() {
  return (
    <>
      <TelegramInit />
      <main className="p-4">
        <h1 className="text-2xl font-bold">Welcome to Ludo!</h1>
        <p>This will be integrated with Telegram Mini App + Socket.IO.</p>
      </main>
    </>
  );
}