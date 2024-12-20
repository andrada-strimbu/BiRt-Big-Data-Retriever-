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
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body>
      <nav>
        <a href="/finearts">Fine Arts</a> | <a href="/music">Music</a> | <a href='/artists'>Artists</a> | <a href='/influences'>Influences</a>
      </nav>
      <main>{children}</main>
    </body>
  </html>
  );
}
