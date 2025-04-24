import "./globals.css";
import { ReactNode, useEffect } from "react";

export const metadata = {
  title: "Ludo Game",
  description: "Ludo powered by Socket.IO and Telegram Mini App",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
