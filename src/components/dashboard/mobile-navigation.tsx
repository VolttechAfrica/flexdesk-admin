"use client"

import { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { X } from "lucide-react"
import { Sidebar } from "@components/dashboard/sidebar"
import styles from "@styles/mobile-navigation.module.css"

interface MobileNavigationProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function MobileNavigation({ open, setOpen }: MobileNavigationProps) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className={styles.mobile_nav_dialog} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="fade-in"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="fade-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={styles.overlay} />
        </Transition.Child>

        <div className={styles.mobile_nav_container}>
          <Transition.Child
            as={Fragment}
            enter="slide-in"
            enterFrom="translate-x-neg"
            enterTo="translate-x-0"
            leave="slide-out"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-neg"
          >
            <Dialog.Panel className={styles.mobile_nav_panel}>
              <Transition.Child
                as={Fragment}
                enter="fade-in"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="fade-out"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className={styles.close_button_container}>
                  <button type="button" className={styles.close_button} onClick={() => setOpen(false)}>
                    <span className="sr-only">Close sidebar</span>
                    <X className={styles.close_icon} aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <Sidebar className={styles.mobile_sidebar} />
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
