import '@styles/globals.css';
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { AuthProvider } from '@context/AuthContext';


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FlexTest",
  description: "FlexTest - Test Automation Platform",
}


export default function RootLayout({
    children,
    }: {
    children: React.ReactNode;
    }) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
            <AuthProvider>
                {children}
            </AuthProvider>
        </body>
        </html>
    );
}
