import { inter } from "@/components/fonts/font";
import MusicPlayer from "@/components/MusicPlayer";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

export const metadata = {
  title: "The Ghost / The Grief | Portfolio",
  description: "Developer & Musician Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CustomCursor />
        <div className="globalBg" />
        <div className="transitionOverlay" />
        <Navbar />
        {children}
        <MusicPlayer />
        <Footer />
      </body>
    </html>
  );
}
