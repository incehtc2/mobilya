import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/shared/providers";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Premium Mobilya`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: SITE_NAME,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${cormorant.variable} ${inter.variable}`}>
        <Providers>
          <ScrollProgress />
          <CartDrawer />
          {children}
        </Providers>
      </body>
    </html>
  );
}
