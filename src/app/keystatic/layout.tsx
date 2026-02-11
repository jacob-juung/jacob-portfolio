import type { ReactNode } from "react";

export default function KeystaticLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
