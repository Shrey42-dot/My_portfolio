import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shrey Pandey | Portfolio",
  description: "Personal portfolio of Shrey Pandey",
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/vault", label: "Vault" },
  { href: "/logs", label: "Logs" },
  { href: "/credentials", label: "Credentials" },
  { href: "/resume", label: "Resume" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-zinc-950 text-zinc-100">
        <div className="min-h-screen">
          <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur">
            <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
              <Link
                href="/"
                className="font-mono text-sm tracking-widest text-cyan-400 sm:text-base"
              >
                SHREY://PORTFOLIO
              </Link>
              <div className="flex flex-wrap items-center gap-2 text-sm sm:gap-4 sm:text-base">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-md border border-zinc-800 px-3 py-1.5 text-zinc-300 transition hover:border-cyan-400/50 hover:text-cyan-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>
          </header>
          <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
