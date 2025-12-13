'use client';
import "./globals.css";
import { Poppins } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import { ThemeProvider } from "./utils/theme-provider";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Provider";
import {SessionProvider} from "next-auth/react";
import { useLoadUserQuery } from "../redux/features/api/apiSlice";
import Loader from "./components/Loader/Loader";
import { useEffect, useState } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${josefin.variable} !bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300 bg-no-repeat`}
      >
        <Providers>
          <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
          >
            <Custom>
              {children}
            </Custom>
            <Toaster position="top-center" reverseOrder={false} />
          </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}


const Custom = ({children}: {children: React.ReactNode}) => {
  const [mounted, setMounted] = useState(false);
  const { isLoading } = useLoadUserQuery({});
  useEffect(() => {
    setMounted(true);
  }, []);
  // Ensure SSR and first client render match to prevent hydration mismatch
  if (!mounted) {
    return null;
  }
  return (
    <>
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
