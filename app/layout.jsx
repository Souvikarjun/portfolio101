import { inter } from "@/components/fonts/font";
import MusicPlayer from "@/components/MusicPlayer";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: "The Ghost / The Grief | Portfolio",
  description: "Developer & Musician Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="globalBg" />
        <Navbar />
        {children}
        <MusicPlayer />
        <Footer />
      </body>
    </html>
  );
}
