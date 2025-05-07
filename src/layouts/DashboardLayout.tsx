import type React from "react"
import { ThemeProvider } from "@context/theme-provider"
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <PrimeReactProvider>
            {children}
          </PrimeReactProvider>
        </ThemeProvider>
  )
}
