import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Nitheenkumar | Creative Frontend Developer",
  description: "A dynamic, high-performance portfolio application built with Next.js, React, and Tailwind CSS. It features sleek Framer Motion animations, interactive 3D particle effects, API-driven contact routing via Nodemailer, and an elegant, responsive design showcasing the technical skills, projects, and achievements of Nitheenkumar, a modern Web Developer.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
