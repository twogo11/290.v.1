import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "290 — Digital Legacy",
    template: "%s | 290",
  },
  description: "Мөнхбаатарын Төгөлдөр буюу 290-ийн хөгжим, бүтээл, дижитал архив.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
