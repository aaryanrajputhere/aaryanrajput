import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Todo · Aaryan Rajput",
  description: "A private, synchronized task list.",
  icons: {
    icon: "https://aaryanrajput.com/logo.svg",
    shortcut: "https://aaryanrajput.com/logo.svg",
    apple: "https://aaryanrajput.com/logo.svg",
  },
  robots: { index: false, follow: false },
};
export const viewport: Viewport = { themeColor: "#0a0a0a", colorScheme: "dark" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
