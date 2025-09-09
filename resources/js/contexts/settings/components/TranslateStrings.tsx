import React, { useEffect, useMemo, useState, ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Card } from '@/contexts/shared/components/ui/Card'
import { Label } from '@/contexts/shared/components/ui/form/Label'
import { Select } from '@/contexts/shared/components/ui/form/Select'
import { BaseButton } from '@/contexts/shared/components/Button'
import { InputText } from '@/contexts/shared/components/ui/form/InputText'
import { CheckIcon } from '@/contexts/shared/components/Icons'
import { useLocalization } from '../hooks/useLocalization'
import { ModalLocalization } from './ModalLocalization'

export const TranslateStrings: React.FC = () => {
  const app = window.AppConfig
  const { t } = useTranslation()
  const { languages, updating, update, create } = useLocalization()

  const [strings, setStrings] = useState<[string, string][]>([])
  const [selectedLocale, setSelectedLocale] = useState<string>(app.app_locale)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    setStrings(Object.entries(app.locales[app.app_locale]))
  }, [app.app_locale])

  const getStrings = useMemo(() => {
    return strings.filter(el => el[1].toLowerCase().includes(search.toLowerCase()))
  }, [strings, search])

  const handleUpdate = () => {
    update({ strings, code: selectedLocale })
  }

  const handleCreate = (payload: { code: string; name: string }) => {
    create(payload)
  }

  const handleLocaleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const locale = e.target.value
    setSelectedLocale(locale)
    setStrings(Object.entries(app.locales[locale]))
  }

  const handleWrite = (e: ChangeEvent<HTMLInputElement>, key: number) => {
    const updated = [...strings]
    updated[key][1] = e.target.value
    setStrings(updated)
  }

  return (
    <Card>
      <h6 className="mb-3 text-lg font-semibold">{t('dashboard.settings.translations')}</h6>

      <form
        onSubmit={e => {
          e.preventDefault()
          handleUpdate()
        }}
      >
        <div className="mb-5">
          <Label>{t('dashboard.settings.selected_locale')}</Label>
          <div className="flex w-full justify-between gap-2">
            <Select name="locale" value={selectedLocale} required onChange={handleLocaleChange}>
              <option value="">{t('dashboard.settings.select')}</option>
              {languages?.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </Select>

            <div className="text-end">
              <BaseButton
                title={t('dashboard.settings.new_localization')}
                variant="secondary"
                type="button"
                icon={<CheckIcon className="size-6" />}
                onClick={() => setShowModal(true)}
              />
            </div>
          </div>
          <small className="text-muted">{t('dashboard.settings.locale_list_desc')}</small>
        </div>

        {/* Tabla de traducciones */}
        <div className="mb-3 max-h-[30rem] overflow-y-scroll text-sm">
          <table className="w-full table-fixed border-collapse">
            <thead>
              <tr>
                <th className="p-2 text-left font-semibold">
                  {t('dashboard.settings.source_text')}
                </th>
                <th className="p-2 text-left font-semibold">
                  {t('dashboard.settings.translation')}
                </th>
                <th className="p-2 text-right">
                  <InputText
                    type="text"
                    className="font-medium"
                    placeholder={t('form.placeholder.search')}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {getStrings.length > 0 &&
                getStrings.map((message, key) => (
                  <tr key={message[0]}>
                    <td className="p-2 text-gray-500">{message[0]}</td>
                    <td colSpan={2} className="p-2">
                      <InputText
                        type="text"
                        value={message[1]}
                        onChange={e => handleWrite(e, key)}
                        className="border-0 bg-gray-100"
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <BaseButton
          title={t('dashboard.settings.update_translations')}
          variant="primary"
          type="submit"
          loading={updating}
          className="me-2"
        />
      </form>

      {showModal && (
        <ModalLocalization onCreate={handleCreate} onClose={() => setShowModal(false)} />
      )}
    </Card>
  )
}
