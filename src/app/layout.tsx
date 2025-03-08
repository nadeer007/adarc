"use client";
import Footer from "@/components/footer/Footer"
import Navbar from "@/components/includes/Navbar"
import { usePathname } from 'next/navigation'
import '../styles/globals.css';
import HighlightSection from "@/components/includes/HighlightSection";
import FooterLogin from "@/components/footer/FooterLogin";



// export const metadata: Metadata = {
//   title: 'Adarc Computers',
//   description: "Your Trusted Source for High-End Gaming PCs & Components in UAE",
// };

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname()

  return (
    <html lang="en" className="no-scrollbar">
            <body suppressHydrationWarning={true}>
            {/* Layout UI */}
        <Navbar />
        {children}
        {
          pathname?.includes("/login") || pathname?.includes("/signup") || pathname?.includes("/forgot-password")  ?
            <FooterLogin />
            :
            <>
              <HighlightSection />
              <Footer />
            </>

        }

      </body>
    </html>
  )
}