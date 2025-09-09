import { LocalizationForm } from '@/contexts/settings/components/LocalizationForm'
import { TranslateStrings } from '@/contexts/settings/components/TranslateStrings'
import { useLocalization } from '@/contexts/settings/hooks/useLocalization'
import { useSettings } from '@/contexts/settings/hooks/useSettings'

const LocalizationPage: React.FC = () => {
  const { languages, updating, loading, update, create } = useLocalization()
  const { update: updateSettings } = useSettings()

  return (
    !loading && (
      <div className="-mx-3 flex flex-wrap">
        <div className="grid grid-cols-1 gap-3">
          <LocalizationForm languages={languages} onUpdate={updateSettings} />

          <TranslateStrings
            languages={languages}
            updating={updating}
            onCreate={create}
            onUpdate={update}
          />
        </div>
      </div>
    )
  )
}

export default LocalizationPage
