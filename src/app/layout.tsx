import "../app/globals.css";

import { Inter, Manrope } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata = {
  title: "test-websites",
  description: "Leading software development company...",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3B82F6" />
        <link rel="apple-touch-icon" href="/logo-icon.svg" />
        <script
          defer
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "test-websites",
              alternateName: "test-websites",
              url: "https://test-websites.com",
              logo: "https://test-websites.com/logo.png",
              description:
                "Leading software development company in Birtamode, Jhapa, Nepal specializing in custom software development, AI solutions, web applications, and digital transformation services.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Bhadrapur Road, Birtamode-4",
                addressLocality: "Birtamode",
                addressRegion: "Jhapa",
                postalCode: "57204",
                addressCountry: "Nepal",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+977-9817996672",
                contactType: "customer service",
                email: "admin@test-websites.com",
                availableLanguage: ["English", "Nepali"],
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ],
                  opens: "09:00",
                  closes: "18:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Saturday"],
                  opens: "10:00",
                  closes: "14:00",
                },
              ],
              sameAs: [
                "https://www.facebook.com/test-websites",
                "https://www.linkedin.com/company/test-websites",
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${manrope.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
