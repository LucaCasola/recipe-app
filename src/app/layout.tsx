import "./globals.css";

import type { Metadata } from "next";
import { Sidenav } from "@/components/sidenav";

export const metadata: Metadata = {
  title: "CookIt | Virtual Recipe Book",
  description: "CookIt is a virtual recipe book that allows you to create, store, and share your favorite recipes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-row">
        <Sidenav />
        {children}
      </body>
    </html>
  );
}
