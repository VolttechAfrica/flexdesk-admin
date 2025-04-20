"use client";

import type React from "react";
import { useState } from "react";
import { MobileNavigation } from "@components/dashboard/mobile-navigation";
import { Sidebar } from "@components/dashboard/sidebar";
import { Header } from "@components/dashboard/header";
import styles from "@styles/Dashboard.module.css";
import Cookie from "js-cookie";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@layouts/DashboardLayout";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const token = Cookie.get("login_token");
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    }
  }, [token, router]);

  return (
    <>
      <DashboardLayout>
        <div className={styles.app_container}>
          {/* Mobile sidebar */}
          <MobileNavigation open={sidebarOpen} setOpen={setSidebarOpen} />

          {/* Desktop sidebar */}
          <Sidebar className={styles.desktop_sidebar} />

          {/* Main content area */}
          <div className={styles.main_container}>
            <Header onMenuButtonClick={() => setSidebarOpen(true)} />
            <main className={styles.main_content}>{children}</main>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
