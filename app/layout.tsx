import type { Metadata } from "next";
import "@/public/styles/globals.css";
import { Providers } from "@/store/provider";
import { ModalContextProvider, NotificationContextProvider } from "@/context";
import { PortalElements } from "./components/global/ClientOnlyPortal";

const keyword = ["web-app", "pwa", "note-app", "emerald's diary"];

const description = "'Personalized PWA note-app',";
const title = "Emerald's Diary: A personalized PWA note-app";

export const metadata: Metadata = {
  title: `Emerald's diary`,
  description: description,
  icons: { apple: "/apple-touch-icon.png", icon: "" },
  viewport: { width: "device-width", initialScale: 1 },
  keywords: keyword,
  openGraph: {
    type: "website",
    url: "/",
    title: title,
    description: description,
    siteName: "web-note-app",
    locale: "en_UK",
  },
  twitter: {
    site: "/",
    title: title,
    creator: "@VickyJay",
    card: "summary_large_image",
    description: description,
  },
  authors: [],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <ModalContextProvider>
        <NotificationContextProvider>
          <html lang="en">
            <body>
              <div id="modal" />
              <div id="notification" />
              {children}
              <div className="fixed bottom-0 left-0">
                <PortalElements />
              </div>
            </body>
          </html>
        </NotificationContextProvider>
      </ModalContextProvider>
    </Providers>
  );
}
