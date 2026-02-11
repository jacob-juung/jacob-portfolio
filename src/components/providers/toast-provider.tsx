"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        duration: 4000,
        style: {
          background: "var(--bg-secondary)",
          color: "var(--text-primary)",
          border: "1px solid var(--border-primary)",
          borderRadius: "0.75rem",
          fontSize: "0.875rem",
          padding: "0.75rem 1rem",
        },
        success: {
          iconTheme: {
            primary: "var(--text-primary)",
            secondary: "var(--bg-primary)",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "var(--bg-primary)",
          },
        },
      }}
    />
  );
}
