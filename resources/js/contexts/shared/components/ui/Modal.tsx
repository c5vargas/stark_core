import { useTranslation } from 'react-i18next'
import { BaseButton } from '../Button'
import ReactDOM from 'react-dom'
import { useEffect, useRef } from 'react'

interface ModalProps {
  title?: string
  onSubmit?: () => void
  onCancel: () => void
  children: React.ReactNode
  submitLabel?: string
  showFooter?: boolean
  closeOnOverlayClick?: boolean
}

export const Modal: React.FC<ModalProps> = ({
  title = 'Modal title',
  onSubmit,
  onCancel,
  children,
  submitLabel,
  showFooter = true,
  closeOnOverlayClick = true,
}) => {
  const { t } = useTranslation()
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [onCancel])

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onCancel()
    }
  }

  return ReactDOM.createPortal(
    <div
      ref={modalRef}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/10"
      role="dialog"
      aria-modal="true"
      onClick={handleOverlayClick}
    >
      <div className="w-full max-w-lg rounded-lg bg-white shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h5 className="mb-0 text-lg font-semibold">{title}</h5>
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>✕
          </button>
        </div>

        {/* Body */}
        <div className="min-h-[150px] p-4">{children}</div>

        {/* Footer */}
        {showFooter && (
          <div className="flex justify-end gap-2 border-t px-4 py-3">
            <BaseButton
              variant="secondary"
              title={t('buttons.cancel')}
              type="button"
              onClick={onCancel}
            />
            {onSubmit && (
              <BaseButton
                variant="primary"
                title={submitLabel || t('buttons.save_changes')}
                type="button"
                onClick={onSubmit}
              />
            )}
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}
