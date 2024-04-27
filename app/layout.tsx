import type { Metadata } from "next";
import "@/public/styles/globals.css";
import { Providers } from "@/store/provider";
import { PortalElements } from "./components/global/ClientOnlyPortal";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Redirect from "@/lib/utils/redirect";

const keyword = ["web-app", "pwa", "note-app", "emerald's diary"];

const description = "'Personalized PWA note-app',";
const title = "Emerald's Diary: A personalized PWA note-app";

export const metadata: Metadata = {
  title: `Emerald's diary`,
  description: description,
  // icons: { apple: "/apple-touch-icon.png", icon: "" },
  viewport: { width: "device-width", initialScale: 1 },
  manifest: "/manifest.webmanifest",
  keywords: keyword,
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon/favicon-16x16.png",
    },
    // {
    //   rel: "icon",
    //   type: "image/png",
    //   sizes: "192x192",
    //   url: "/favicon/favicon-192x192.png",
    // },
    // {
    //   rel: "icon",
    //   type: "image/png",
    //   sizes: "384x384",
    //   url: "/favicon/favicon-384x384.png",
    // },
    // {
    //   rel: "icon",
    //   type: "image/png",
    //   sizes: "512x512",
    //   url: "/favicon/favicon-512x512.png",
    // },
    // {
    //   rel: "apple-touch-icon",
    //   type: "image/png",
    //   sizes: "180x180",
    //   url: "/favicon/favicon-180x180.png",
    // },
    {
      rel: "android-chrome",
      type: "image/png",
      sizes: "192x192",
      url: "/favicon/android-chrome-192x192.png",
    },
    {
      rel: "android-chrome",
      type: "image/png",
      sizes: "512x512",
      url: "/favicon/android-chrome-512x512.png",
    },
  ],
  // openGraph: {
  //   type: "website",
  //   url: "/",
  //   title: title,
  //   description: description,
  //   siteName: "web-note-app",
  //   locale: "en_UK",
  // },
  // twitter: {
  //   site: "/",
  //   title: title,
  //   creator: "@VickyJay",
  //   card: "summary_large_image",
  //   description: description,
  // },
  authors: [],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body>
          <div id="modal" />
          <div id="notification" />
          <Redirect />
          {children}
          <div className="fixed bottom-0 left-0">
            <PortalElements />
          </div>
        </body>
      </html>
    </Providers>
  );
}
