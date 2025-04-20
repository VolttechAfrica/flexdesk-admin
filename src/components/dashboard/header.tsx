"use client";

import { Bell, Menu, Search, ChevronDown } from "lucide-react";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import ModeToggle from "@components/dashboard/mode-toggle";
import styles from "@styles/header.module.css";
import {
  Menu as Dropdown,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import Image from "next/image";
import ProfileMenu from "./ProfileMenu";

interface HeaderProps {
  onMenuButtonClick: () => void;
}

export function Header({ onMenuButtonClick }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <div className={styles.mobile_menu}>
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuButtonClick}
            className={styles.menu_button}
          >
            <Menu className={styles.menu_icon} />
            <span className="sr-only">Open sidebar</span>
          </Button>
        </div>

        <div className={styles.header_content}>
          <div className={styles.search_container}>
            <div className={styles.search_wrapper}>
              <Search className={styles.search_icon} />
              <Input
                type="search"
                placeholder="Search..."
                className={styles.search_input}
              />
            </div>
          </div>

          <div className={styles.header_actions}>
            <Button
              variant="ghost"
              size="icon"
              className={`${styles.action_button} ${styles.mobile_search}`}
            >
              <Search className={styles.action_icon} />
              <span className="sr-only">Search</span>
            </Button>

            <ModeToggle />

            <Button
              variant="ghost"
              size="icon"
              className={styles.action_button}
            >
              <Bell className={styles.action_icon} />
              <span className="sr-only">Notifications</span>
            </Button>

            <ProfileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
