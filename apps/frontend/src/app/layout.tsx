import type { Metadata } from "next";
import "./globals.css";
import { SiteProvider } from "@/components/site-provider";

export const metadata: Metadata = {
  title: {
    default: "Kupi Kartinu",
    template: "%s | Kupi Kartinu",
  },
  description: "Онлайн-аукцион картин и предметов искусства.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru">
      <body><SiteProvider>{children}</SiteProvider></body>
    </html>
  );
}
