import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/scrollbar";
import "swiper/css/pagination";
import { Toaster } from "sonner";
import Script from "next/script";
import "@/public/styles/global.css";
import Redirect from "@/lib/utils/redirect";
import { Providers } from "@/store/provider";
import type { Metadata, Viewport } from "next";
import { PortalElements } from "./components/global/ClientOnlyPortal";

const keyword = ["web-app", "pwa", "note-app", "emerald's diary"];

const description = "Personalized PWA note-app";
const title = "Emerald's Diary: A personalized PWA note-app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: title,
  description: description,
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
    <>
      <Providers>
        <html lang="en">
          <body>
            <Toaster richColors position="top-center" />
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

      <Script
        strategy="worker"
        src="https://cdn.brimble.io/track.js"
        data-website-id="abf02e91-4cd4-4171-b826-e4ff2168f259"
      />
    </>
  );
}
