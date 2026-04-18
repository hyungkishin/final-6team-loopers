import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

const PRELOAD_IMAGES = [
  "/images/오프라인 스터디를 처음가던날.png",
  "/images/어김없이 토론의 날.jpeg",
  "/images/모두가 모였 젭에서.jpeg",
  "/images/다같이 오프라인 모임에서 컵밥.jpeg",
  "/images/컵밥 맛있더라.jpeg",
  "/images/오프라인에서 다같이 열띤 토론.jpeg",
  "/images/우정 일방통행.jpeg",
  "/images/다 어디갔어 내밑으로 다모여.jpeg",
  "/images/글쓰기가 얼마나 어려웠었냐면.png",
  "/images/과제 나도 안했는데 너도안했니.png",
  "/images/6팀의 얼굴천재 정호.png",
  "/images/민주님의 붕어빵 자랑.jpeg",
  "/images/발표 - 성훈님.png",
  "/images/엔젤 주선님 - 킹받을때.png",
  "/images/연휴에도 열심히 우리를 붙잡아 주던 엔젤.png",
  "/images/멘토님의 힐링 페이퍼.png",
];

export const metadata: Metadata = {
  title: "Loopers BE L2 · 6팀 회고",
  description:
    "10주, 우리 뭐했지? Loopers BE L2 Round 10 · 6팀 회고 발표.",
  applicationName: "6팀 회고",
  appleWebApp: {
    capable: true,
    title: "6팀 회고",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#f3ecdc",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        {PRELOAD_IMAGES.map((src) => (
          <link key={src} rel="preload" as="image" href={src} fetchPriority="high" />
        ))}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Gaegu:wght@300;400;700&display=swap"
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full bg-(--color-paper) text-(--color-ink)"
      >
        {children}
        <Script id="sw-register" strategy="afterInteractive">
          {`(() => {
            if (!('serviceWorker' in navigator)) return;
            const isDev = ${process.env.NODE_ENV !== "production"};
            const isLocal = ['localhost','127.0.0.1'].includes(location.hostname);
            if (isDev || isLocal) {
              navigator.serviceWorker.getRegistrations().then((rs) => rs.forEach((r) => r.unregister()));
              if (window.caches) caches.keys().then((keys) => keys.forEach((k) => caches.delete(k)));
              return;
            }
            window.addEventListener('load', () => {
              navigator.serviceWorker.register('/sw.js').catch(() => {});
            });
          })();`}
        </Script>
      </body>
    </html>
  );
}
