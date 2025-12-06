import { useTranslation } from 'react-i18next'
import { BaseButton } from '../Button'
import ReactDOM from 'react-dom'

interface ModalProps {
  title?: string
  onSubmit: () => void
  onCancel: () => void
  children: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({
  title = 'Modal title',
  onSubmit,
  onCancel,
  children,
}) => {
  const { t } = useTranslation()

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/10"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-lg rounded-lg bg-white shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h5 className="mb-0 text-lg font-semibold">{title}</h5>
          <button type="button" onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <span className="sr-only">Close</span>✕
          </button>
        </div>

        {/* Body */}
        <div className="min-h-[150px] p-4">{children}</div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t px-4 py-3">
          <BaseButton
            variant="secondary"
            title={t('buttons.cancel')}
            type="button"
            onClick={onCancel}
            className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
          />

          <BaseButton
            variant="primary"
            title={t('buttons.save_changes')}
            type="button"
            onClick={onSubmit}
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          />
        </div>
      </div>
    </div>,
    document.body
  )
}
