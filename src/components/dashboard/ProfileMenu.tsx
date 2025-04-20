'use client'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDown } from 'lucide-react'
import styles from '@styles/profile-menu.module.css'
import Image from 'next/image'
import { useAuth } from "@hooks/useAuth";
import { Modal } from "@components/ui/warningmodal";
import { useState } from 'react';



export default function ProfileMenu() {
    const { logout } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleConfirm = () => {
        logout();
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    }
    const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

  return (
    <Menu as="div" className={styles.menu}>
      <MenuButton className={styles.menu_button}>
        <Image
          width={32}
          height={32}
          src="/images/user-avatar.png"
          alt="User avatar"
          className={styles.avatar}
        />
        <ChevronDown className={styles.chevron} />
        <span className="sr-only">User profile</span>
      </MenuButton>

      <MenuItems className={styles.menu_items}>
        <MenuItem>
          {({ active }) => (
            <a
              href="#"
              className={`${styles.menu_item} ${active ? styles.active : ''}`}
            >
              Profile
            </a>
          )}
        </MenuItem>
        <MenuItem>
          {({ active }) => (
            <a
              href="#"
              className={`${styles.menu_item} ${active ? styles.active : ''}`}
            >
              Settings
            </a>
          )}
        </MenuItem>
        <MenuItem>
          {({ active }) => (
            <button
              className={`${styles.menu_item} ${active ? styles.active : ''}`}
            onClick={handleLogout}>
              Logout
            </button>
          )}
        </MenuItem>
      </MenuItems>

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
    </Menu>

  )
}
