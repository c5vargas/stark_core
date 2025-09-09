import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Select } from '@/contexts/shared/components/ui/form/Select'
import { Modal } from '@/contexts/shared/components/ui/Modal'
import { InputText } from '@/contexts/shared/components/ui/form/InputText'
import { FormField } from '@/contexts/shared/components/ui/form/FormField'
import isoLangs from '../libs/isoLangs'

interface ModalLocalizationProps {
  onClose: () => void
  onCreate: (payload: { code: string; name: string }) => void
}

export const ModalLocalization: React.FC<ModalLocalizationProps> = ({ onClose, onCreate }) => {
  const { t } = useTranslation()
  const [form, setForm] = useState({ code: '', name: '' })

  const handleCreate = () => onCreate(form)

  return (
    <Modal onSubmit={handleCreate} onCancel={onClose}>
      <div className="grid grid-cols-1 gap-3">
        <FormField label={t('dashboard.settings.name_new_locale')}>
          <InputText
            type="text"
            autoComplete="off"
            placeholder={t('dashboard.settings.locale_placeholder')}
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        </FormField>

        <FormField label={t('dashboard.settings.select_new_locale')}>
          <Select
            value={form.code}
            required
            onChange={e => setForm({ ...form, code: e.target.value })}
          >
            <option value="">{t('dashboard.settings.select')}</option>
            {isoLangs.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </Select>
          <small className="text-xs">{t('dashboard.settings.select_new_locale_desc')}</small>
        </FormField>
      </div>
    </Modal>
  )
}
