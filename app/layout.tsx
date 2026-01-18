import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "@/app/providers";
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import Header from "@/components/header";

const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'UnitMetal',
  description: 'Professional interface for the future of finance',
  metadataBase: new URL('https://www.unitmetal.com'),
  openGraph: {
    title: 'UnitMetal',
    description: 'Professional interface for the future of finance',
    url: 'https://www.unitmetal.com',
    siteName: 'UnitMetal',
    images: [
      {
        url: '/unitmetal-tbn.png',
        width: 1200,
        height: 630,
        alt: 'og-image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UnitMetal',
    description: 'Professional interface for the future of finance',
    creator: '@unitmetalHQ',
    images: ['/unitmetal-tbn.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={jetBrainsMono.className}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <SidebarProvider>
              <AppSidebar />
              <main className="flex flex-col w-full pb-12">
                <Header />
                {children}
              </main>
            </SidebarProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
