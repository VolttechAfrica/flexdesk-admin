'use client'

import { Dialog } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import styles from '@styles/modal.module.css'

interface ModalProps {
  title?: string
  body?: string
  trueButtonText?: string
  falseButtonText?: string
  isOpen: boolean
  setOpen: (open: boolean) => void
  onConfirm: () => void
  onCancel?: () => void
}

export function Modal({
  title = 'Logout account',
  body = '',
  trueButtonText = 'Logout',
  falseButtonText = 'Cancel',
  isOpen,
  setOpen,
  onConfirm,
  onCancel,
}: ModalProps) {
  return (
    <Dialog open={isOpen} onClose={() => setOpen(false)} className={styles.dialog}>
      <div className={styles.dialog_backdrop} aria-hidden="true" />
      <div className={styles.dialog_container}>
        <Dialog.Panel className={styles.dialog_panel}>
          <div className={styles.dialog_content}>
            <div className={styles.dialog_header}>
              <div className={styles.icon_wrapper}>
                <ExclamationTriangleIcon
                  aria-hidden="true"
                  className={styles.icon}
                />
              </div>
              <div className={styles.dialog_text}>
                <Dialog.Title as="h3" className={styles.dialog_title}>
                  {title}
                </Dialog.Title>
                <div className={styles.dialog_body}>{body}</div>
              </div>
            </div>
          </div>
          <div className={styles.dialog_footer}>
            <button
              type="button"
              onClick={() => {
                onConfirm()
                setOpen(false)
              }}
              className={`${styles.btn} ${styles.btn_danger}`}
            >
              {trueButtonText}
            </button>
            <button
              type="button"
              onClick={() => {
                if (onCancel) onCancel()
                setOpen(false)
              }}
              className={`${styles.btn} ${styles.btn_cancel}`}
            >
              {falseButtonText}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
