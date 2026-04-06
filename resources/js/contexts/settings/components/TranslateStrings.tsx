import { useEffect, useMemo, useState, ChangeEvent, FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Card } from '@/contexts/shared/components/ui/Card'
import { Label } from '@/contexts/shared/components/ui/form/Label'
import { Select } from '@/contexts/shared/components/ui/form/Select'
import { BaseButton } from '@/contexts/shared/components/Button'
import { InputText } from '@/contexts/shared/components/ui/form/InputText'
import { ModalLocalization } from './ModalLocalization'
import { Language } from '@/contexts/settings/libs/types'
import { ICreateLocale } from '@/contexts/settings/actions/createLocale'
import { IUpdateLocalization } from '@/contexts/settings/actions/updateLocalization'
import { PlusSignIcon } from '@/contexts/shared/components/HugeIcons'

interface TranslateStringsProps {
  languages?: Language[]
  updating: boolean
  onCreate: (payload: ICreateLocale) => void
  onUpdate: (payload: IUpdateLocalization) => void
}

export const TranslateStrings: React.FC<TranslateStringsProps> = ({
  languages,
  updating,
  onCreate,
  onUpdate,
}) => {
  const app = window.AppConfig
  const { t } = useTranslation()

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

  const handleUpdate = (e: FormEvent) => {
    e.preventDefault()
    onUpdate({ strings, code: selectedLocale })
  }

  const handleCreate = (payload: ICreateLocale) => onCreate(payload)

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

      <form onSubmit={handleUpdate}>
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
                type="button"
                variant="outline"
                size="icon"
                className="!h-[42px] !w-[42px] border-slate-400 text-slate-400 hover:!border-slate-400 hover:!bg-slate-400 hover:!text-white [&>svg]:!h-6 [&>svg]:!w-6"
                aria-label={t('dashboard.settings.new_localization')}
                title=""
                icon={<PlusSignIcon />}
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
