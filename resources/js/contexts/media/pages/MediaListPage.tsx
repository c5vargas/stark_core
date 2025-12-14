import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Layout from '@/contexts/shared/components/Layout'
import { Card } from '@/contexts/shared/components/ui/Card'
import { useMedia } from '../hooks/useMedia'
import { useDeleteMedia } from '../hooks/useDeleteMedia'
import { MediaGrid } from '../components/MediaGrid'
import { MediaListView } from '../components/MediaListView'
import { MediaToolbar } from '../components/MediaToolbar'
import { MediaUploadZone } from '../components/MediaUploadZone'
import RequirePermission from '@/router/guards/RequirePermission'

type ViewMode = 'grid' | 'list'

const MediaListPage = () => {
  const { t } = useTranslation()
  const { media, isLoading, refetch } = useMedia()
  const { deleteMedia } = useDeleteMedia()
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [search, setSearch] = useState('')
  const [bulkSelect, setBulkSelect] = useState(false)
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const filteredMedia = media.filter(m => m.filename.toLowerCase().includes(search.toLowerCase()))

  const handleDelete = async (id: number) => {
    try {
      await deleteMedia({ id })
      refetch()
      setSelectedIds(prev => prev.filter(selectedId => selectedId !== id))
    } catch (error) {
      console.error('Error deleting media:', error)
    }
  }

  const handleBulkDelete = async () => {
    try {
      await Promise.all(selectedIds.map(id => deleteMedia({ id })))
      refetch()
      setSelectedIds([])
      setBulkSelect(false)
    } catch (error) {
      console.error('Error deleting media:', error)
    }
  }

  const handleBulkSelect = (id: number, selected: boolean) => {
    if (selected) {
      setSelectedIds(prev => [...prev, id])
    } else {
      setSelectedIds(prev => prev.filter(selectedId => selectedId !== id))
    }
  }

  const handleUploadComplete = () => {
    refetch()
  }

  const handleBulkSelectToggle = () => {
    setBulkSelect(!bulkSelect)
    if (bulkSelect) {
      setSelectedIds([])
    }
  }

  return (
    <RequirePermission permission="view.media">
      <Layout pageTitle={t('dashboard.media.title')}>
        <div className="space-y-4">
          <Card>
            <RequirePermission permission="create.media">
              <div className="mb-6">
                <MediaUploadZone
                  onUploadComplete={handleUploadComplete}
                  accept="image/*,video/*"
                  multiple={true}
                />
              </div>
            </RequirePermission>

            <MediaToolbar
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              search={search}
              onSearchChange={setSearch}
              bulkSelect={bulkSelect}
              onBulkSelectToggle={handleBulkSelectToggle}
              selectedCount={selectedIds.length}
              onBulkDelete={selectedIds.length > 0 ? handleBulkDelete : undefined}
            />

            {viewMode === 'grid' ? (
              <MediaGrid
                media={filteredMedia}
                onDelete={handleDelete}
                selectedIds={selectedIds}
                onBulkSelect={handleBulkSelect}
                bulkSelectMode={bulkSelect}
                isLoading={isLoading}
              />
            ) : (
              <MediaListView
                media={filteredMedia}
                onDelete={handleDelete}
                selectedIds={selectedIds}
                onSelect={handleBulkSelect}
                isLoading={isLoading}
              />
            )}
          </Card>
        </div>
      </Layout>
    </RequirePermission>
  )
}

export default MediaListPage
