import { useEffect, useState } from 'react'
import PublicLayout from '../layouts/PublicLayout'
import { usePublicSettings } from '../hooks/usePublicSettings'
import EditorContent from '../components/EditorContent'
import { OutputData } from '@editorjs/editorjs'
import Loading from '@/contexts/shared/components/Loading'

const CookiesPage = () => {
  const { settings, loading } = usePublicSettings()
  const [content, setContent] = useState<OutputData | null>(null)

  useEffect(() => {
    if (settings.gdpr_cookies_page) {
      try {
        const parsed = JSON.parse(settings.gdpr_cookies_page)
        setContent(parsed)
      } catch {
        setContent(null)
      }
    }
  }, [settings.gdpr_cookies_page])

  if (loading) {
    return (
      <PublicLayout>
        <div className="flex min-h-[50vh] items-center justify-center">
          <Loading />
        </div>
      </PublicLayout>
    )
  }

  return (
    <PublicLayout>
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-4xl font-bold text-gray-900">Cookie Policy</h1>
        <div className="rounded-lg bg-white p-8 shadow-sm">
          <EditorContent data={content} />
        </div>
      </div>
    </PublicLayout>
  )
}

export default CookiesPage

