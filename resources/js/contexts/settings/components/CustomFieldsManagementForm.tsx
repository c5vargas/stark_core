import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card } from '@/contexts/shared/components/ui/Card'
import { BaseButton } from '@/contexts/shared/components/Button'
import { useCustomFields } from '@/contexts/settings/hooks/useCustomFields'
import { CustomField } from '@/contexts/user/libs/types'
import Loading from '@/contexts/shared/components/Loading'
import { CustomFieldsList } from './customFields/CustomFieldsList'
import { CustomFieldModal } from './customFields/CustomFieldModal'
import { ConfirmDialog } from '@/contexts/shared/components/ui/ConfirmDialog'

export const CustomFieldsManagementForm: React.FC = () => {
  const { t } = useTranslation()
  const { fields, isLoading, creating, updating, deleting, create, update, remove } =
    useCustomFields()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingField, setEditingField] = useState<CustomField | undefined>(undefined)
  const [deleteFieldId, setDeleteFieldId] = useState<number | null>(null)

  const handleCreate = () => {
    setEditingField(undefined)
    setIsModalOpen(true)
  }

  const handleEdit = (field: CustomField) => {
    setEditingField(field)
    setIsModalOpen(true)
  }

  const handleDelete = (id: number) => {
    setDeleteFieldId(id)
  }

  const handleConfirmDelete = async () => {
    if (deleteFieldId) {
      try {
        await remove(deleteFieldId)
        setDeleteFieldId(null)
      } catch {
        // Error is handled by the hook
      }
    }
  }

  const handleModalSubmit = async (data: Partial<CustomField>) => {
    if (editingField) {
      await update({ id: editingField.id, ...data })
    } else {
      await create(data)
    }
    setIsModalOpen(false)
    setEditingField(undefined)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setEditingField(undefined)
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="space-y-4">
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {t('dashboard.settings.custom_fields.fields_list')}
          </h3>
          <BaseButton
            title={t('dashboard.settings.custom_fields.add_field')}
            variant="primary"
            onClick={handleCreate}
          />
        </div>

        <CustomFieldsList
          fields={fields}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isDeleting={deleting}
          onCreateNew={handleCreate}
        />
      </Card>

      <CustomFieldModal
        isOpen={isModalOpen}
        field={editingField}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        isLoading={creating || updating}
      />

      <ConfirmDialog
        isOpen={deleteFieldId !== null}
        title={t('dashboard.settings.custom_fields.confirm_delete_title')}
        message={t('dashboard.settings.custom_fields.confirm_delete')}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteFieldId(null)}
        variant="danger"
        isLoading={deleting}
      />
    </div>
  )
}
