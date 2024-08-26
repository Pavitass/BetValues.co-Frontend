import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Footer from '@/components/layout/Footer';
import NavigationWrapper from "@/components/NavigationWrapper";
import ContentWrapper from "@/components/ContentWrapper";
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BetValues.co",
  description: "Comparador de cuotas deportivas y constructor de parlays",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${inter.className} min-h-screen bg-gray-900 text-white`}>
        <AuthProvider>
          <div className="flex">
            <NavigationWrapper />
            <ContentWrapper>
              {children}
              <Footer />
            </ContentWrapper>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}