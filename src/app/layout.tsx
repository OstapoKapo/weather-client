import type { Metadata } from "next";
import { Geist, Montserrat } from "next/font/google";
import "./reset.css";
import 'leaflet/dist/leaflet.css';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap', 
});

const geistMontserrat = Montserrat({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap', 
});

export const metadata: Metadata = {
  title: "Weather App",
  description: "Weather App built with Next.js and TypeScript for my project in university",
  icons:{
    icon: '/icon/weatherLogo.svg',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMontserrat.variable}`}>
        {children}
      </body>
    </html>
  );
}
