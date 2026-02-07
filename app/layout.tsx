import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
    themeColor: "#4E342E",
    width: "device-width",
    initialScale: 1,
};

export const metadata: Metadata = {
    metadataBase: new URL("https://prasadcoldcoco.in"),
    title: {
        default: "Prasad Cold Coco - Surat's Famous Cold Coco & Mango Pulp",
        template: "%s | Prasad Cold Coco",
    },
    description: "Experience the authentic taste of Surat with Prasad Cold Coco. Order our famous Cold Coco Powder and fresh Mango Pulp directly via WhatsApp. Pure, delicious, and delivered to your doorstep.",
    keywords: ["Cold Coco", "Surat Cold Coco", "Mango Pulp", "Prasad Cold Coco", "Surat Famous Food", "Instant Cold Coco Powder", "Aam Ras", "Surat Desserts"],
    authors: [{ name: "Prasad Cold Coco" }],
    creator: "Prasad Cold Coco",
    publisher: "Prasad Cold Coco",
    formatDetection: {
        email: false,
        address: true,
        telephone: true,
    },
    openGraph: {
        type: "website",
        locale: "en_IN",
        url: "https://prasadcoldcoco.in",
        siteName: "Prasad Cold Coco",
        title: "Prasad Cold Coco - Surat's Famous Cold Coco & Mango Pulp",
        description: "Order the authentic and famous Surat Cold Coco and Mango Pulp directly via WhatsApp.",
        images: [
            {
                url: "/og-image.png", // Ensure this image exists in public folder
                width: 1200,
                height: 630,
                alt: "Prasad Cold Coco - Surat's Famous",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Prasad Cold Coco - Surat's Famous Cold Coco & Mango Pulp",
        description: "Order the authentic and famous Surat Cold Coco and Mango Pulp directly via WhatsApp.",
        images: ["/og-image.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    alternates: {
        canonical: "https://prasadcoldcoco.in",
    },
    manifest: "/manifest.json",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Prasad Cold Coco",
        "image": "https://prasadcoldcoco.in/Logo2.png",
        "@id": "https://prasadcoldcoco.in",
        "url": "https://prasadcoldcoco.in",
        "telephone": "+91-XXXXXXXXXX", // Update with actual phone
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Surat, Gujarat",
            "addressLocality": "Surat",
            "postalCode": "395001",
            "addressRegion": "Gujarat",
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 21.1702,
            "longitude": 72.8311
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            ],
            "opens": "09:00",
            "closes": "23:00"
        },
        "sameAs": [
            "https://www.instagram.com/prasadcoldcoco", // Update with actual social links
            "https://www.facebook.com/prasadcoldcoco"
        ]
    };

    return (
        <html lang="en">
            <body className={`${inter.className} bg-[#FFF1DC] text-[#4E342E]`} suppressHydrationWarning={true}>
                <Script
                    id="json-ld"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                {children}
            </body>
        </html>
    );
}
