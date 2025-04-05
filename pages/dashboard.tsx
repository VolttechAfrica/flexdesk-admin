import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Dashboard.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IconHome, IconBell, IconUsers, IconBook, IconCalendar, IconSettings, IconHelp, IconRefresh, IconSun, IconChevronDown, IconApps } from '@tabler/icons-react';

const Dashboard: NextPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    // if (!storedUserData) {
    //   router.push("/");
    //   return;
    // }
    setUserData(JSON.parse(storedUserData));
  }, [router]);

  const stats = [
    { label: "Total Students", value: "2.6K", trend: "+16.5%" },
    { label: "Today's Attendance", value: "366", trend: "-25.5%" },
    { label: "Total Revenue", value: "$16.4K", trend: "+10.2%" },
  ];

  const performanceData = {
    labels: ["Sessions", "View", "Add to Class", "Complete", "Graduate"],
    values: [9300, 4700, 914, 872, 463],
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Dashboard - FlexDesk</title>
        <meta name="description" content="School Management Dashboard" />
      </Head>

      <aside className={`${styles.sidebar} ${isMobile ? styles.mobileSidebar : ''}`}>
        <div className={styles.logo}>
          <Image src="/logo.png" alt="FlexDesk Logo" width={150} height={25} priority />
        </div>
        <nav className={styles.nav}>
          <div className={styles.searchWrapper}>
            <input type="text" placeholder="Search..." className={styles.searchInput} />
          </div>
          <a href="#" className={`${styles.navItem} ${styles.active}`}>
            <IconHome size={20} />
            <span>Home</span>
          </a>
          <a href="#" className={`${styles.navItem} ${styles.active}`}>
            <span>Dashboard</span>
          </a>
          <a href="#" className={styles.navItem}>
            <span>Notifications</span>
            <span className={styles.badge}>2</span>
          </a>
          <a href="#" className={styles.navItem}>
            <span>Audience</span>
          </a>
          <a href="#" className={styles.navItem}>
            <span>Campaigns</span>
          </a>
          <a href="#" className={styles.navItem}>
            <span>Messages</span>
            <span className={styles.badge}>103</span>
          </a>
          <a href="#" className={styles.navItem}>
            <span>Discounts</span>
          </a>
          <a href="#" className={styles.navItem}>
            <span>Performance</span>
          </a>
          <a href="#" className={styles.navItem}>
            <span>Billing</span>
          </a>
        </nav>
        <div className={styles.sidebarFooter}>
          <a href="#" className={styles.navItem}>
            <span>Help</span>
          </a>
          <a href="#" className={styles.navItem}>
            <span>Settings</span>
          </a>
          <div className={styles.userProfile}>
            <div className={styles.userAvatar}>M</div>
            <div className={styles.userName}>Matheus Wichman</div>
          </div>
        </div>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.searchContainer}>
              <input type="text" placeholder="Search here..." className={styles.searchInput} />
            </div>
          </div>
          <div className={styles.headerRight}>
            <button className={styles.iconButton}>
              <span className={styles.notificationDot}></span>
              <IconBell size={20} />
            </button>
            <button className={styles.iconButton}>
              <IconRefresh size={20} />
            </button>
            <button className={styles.iconButton}>
              <IconSun size={20} />
            </button>
            <div className={styles.userProfileWrapper}>
              <div className={styles.userProfile}>
                <div className={styles.avatar}>MS</div>
                <div className={styles.userInfo}>
                  <span className={styles.userName}>Mr. Sara</span>
                  <span className={styles.userRole}>Super Admin</span>
                </div>
                <IconChevronDown size={16} />
              </div>
              <div className={styles.dropdownMenu}>
                <a href="#" className={styles.dropdownItem}>
                  <IconUsers size={16} />
                  Profile
                </a>
                <a href="#" className={styles.dropdownItem}>
                  <IconSettings size={16} />
                  Settings
                </a>
                <div className={styles.dropdownDivider} />
                <a href="#" className={styles.dropdownItem}>
                  <IconHelp size={16} />
                  Logout
                </a>
              </div>
            </div>
            <button className={styles.iconButton}>
              <IconApps size={20} />
            </button>
          </div>
        </header>

        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <h3>{stat.label}</h3>
              <div className={styles.statValue}>
                <span>{stat.value}</span>
                <span
                  className={
                    stat.trend.startsWith("+")
                      ? styles.positive
                      : styles.negative
                  }
                >
                  {stat.trend}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.chartsGrid}>
          <div className={styles.chart}>
            <h3>Performance Funnel</h3>
            <div className={styles.funnel}>
              {performanceData.labels.map((label, index) => (
                <div
                  key={index}
                  className={styles.funnelBar}
                  style={{
                    width: `${(performanceData.values[index] / performanceData.values[0]) * 100}%`,
                  }}
                >
                  <span>{label}</span>
                  <span>{performanceData.values[index].toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.chart}>
            <h3>Student Demographics</h3>
            <div className={styles.demographics}>
              <div className={styles.ageGroup}>
                <span>18-24</span>
                <div className={styles.bar}>
                  <div style={{ width: "10.5%" }}></div>
                </div>
                <span>10.5%</span>
              </div>
              <div className={styles.ageGroup}>
                <span>25-34</span>
                <div className={styles.bar}>
                  <div style={{ width: "24.5%" }}></div>
                </div>
                <span>24.5%</span>
              </div>
              <div className={styles.ageGroup}>
                <span>35-44</span>
                <div className={styles.bar}>
                  <div style={{ width: "19.9%" }}></div>
                </div>
                <span>19.9%</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;