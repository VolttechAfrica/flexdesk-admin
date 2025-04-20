import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart2, BookOpen, Calendar, Clock, LayoutDashboard, LogOut, Settings, Folder, Shield,Users2, HelpCircle } from "lucide-react";
import styles from "@styles/sidebar.module.css";
import Image from "next/image";
import { useAuth } from "@hooks/useAuth";
import { Modal } from "@components/ui/warningmodal";


interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [hasMounted, setHasMounted] = useState(false);
  const { logout } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = () => {
    logout();
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  }

  useEffect(() => {
    // setHasMounted(true);
  }, []);

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

 

  return (
    <aside
    className={`${styles.sidebar} ${hasMounted ? styles.animate : ""} ${className ?? ""}`}
    aria-label="Sidebar">

      <div className={styles.sidebar_header}>
        <Link href="/dashboard" className={styles.logo_link}>
          <span>
            <Image
              src="/images/logo.png"
              alt="FlexTest Logo"
              width={150}
              height={28}
              priority
            />
          </span>
        </Link>
      </div>
      <nav className={styles.sidebar_nav} role="navigation">
        <ul className={styles.nav_list}>
          <NavItem href="/dashboard" icon={<LayoutDashboard className={styles.nav_icon} />} active>
            Dashboard
          </NavItem>
          <NavItem href="/dashboard/students" icon={<Users2 className={styles.nav_icon} />}>
            Candidates
          </NavItem>
          <NavItem href="/dashboard/exams" icon={<BookOpen className={styles.nav_icon} />}>
            Exams
          </NavItem>
          <NavItem href="/dashboard/modules" icon={<BarChart2 className={styles.nav_icon} />}>
            Modules
          </NavItem>
          <NavItem href="/dashboard/sessions" icon={<Clock className={styles.nav_icon} />}>
            Sessions
          </NavItem>
          <NavItem href="/dashboard/schedules" icon={<Calendar className={styles.nav_icon} />}>
            Schedules
          </NavItem>
          <NavItem href="/dashboard/schedules" icon={<Shield className={styles.nav_icon} />}>
            Reports
          </NavItem>
        </ul>
        <div className={styles.bottom_nav}>
          <ul className={styles.nav_list}>
            <NavItem href="/dashboard/settings" icon={<Settings className={styles.nav_icon} />}>
              Settings
            </NavItem>
            <NavItem href="/dashboard/doc" icon={<Folder className={styles.nav_icon} />}>
              Documentation
            </NavItem>
            <NavItem href="/dashboard/help" icon={<HelpCircle className={styles.nav_icon} />}>
              Help
            </NavItem>
            <NavItem href="#" icon={<LogOut className={styles.nav_icon} />} onClick={handleLogout}>
              Log out
            </NavItem>
          </ul>
        </div>
      </nav>

       {/* Modal for Logout Confirmation */}
       <Modal
        title="Logout Confirmation"
        body="Are you sure you want to log out?"
        trueButtonText="Logout"
        falseButtonText="Cancel"
        isOpen={isModalOpen}
        setOpen={setIsModalOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </aside>
  );
}

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  active?: boolean;
  children: React.ReactNode;
  onClick?: (e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

function NavItem({ href, icon, active, children, onClick }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (active && pathname?.startsWith(href));

  return (
    <li>
      <Link onClick={onClick} href={href} className={`${styles.nav_item} ${isActive ? styles.active : ""}`}>
        {icon}
        <span>{children}</span>
      </Link>
    </li>
  );
}
