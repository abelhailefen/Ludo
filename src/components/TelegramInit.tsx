"use client";

import { useEffect } from "react";

const TelegramInit = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = "https://telegram.org/js/telegram-web-app.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return null;
};

export default TelegramInit;
