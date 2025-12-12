import { OutputData } from '@editorjs/editorjs'

interface EditorContentProps {
  data: OutputData | null | undefined
}

type Block = OutputData['blocks'][number]

const EditorContent = ({ data }: EditorContentProps) => {
  if (!data || !data.blocks || data.blocks.length === 0) {
    return <div className="text-gray-500">No content available.</div>
  }

  const renderBlock = (block: Block) => {
    switch (block.type) {
      case 'paragraph': {
        const paragraphData = block.data as { text?: string }
        const text = typeof paragraphData.text === 'string' ? paragraphData.text : ''
        return (
          <p key={block.id} className="mb-4 leading-relaxed text-gray-700">
            {text}
          </p>
        )
      }

      case 'header': {
        const headerData = block.data as { level?: number; text?: string }
        const level =
          typeof headerData.level === 'number' && headerData.level >= 1 && headerData.level <= 6
            ? headerData.level
            : 1
        const HeaderTag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
        const headerClasses: Record<number, string> = {
          1: 'text-4xl font-bold mb-6 text-gray-900',
          2: 'text-3xl font-bold mb-5 text-gray-900',
          3: 'text-2xl font-semibold mb-4 text-gray-900',
          4: 'text-xl font-semibold mb-3 text-gray-900',
        }
        const className = headerClasses[level] || 'text-lg font-semibold mb-3 text-gray-900'
        const text = typeof headerData.text === 'string' ? headerData.text : ''

        return (
          <HeaderTag key={block.id} className={className}>
            {text}
          </HeaderTag>
        )
      }

      case 'list': {
        const listData = block.data as { style?: string; items?: unknown[] }
        const style =
          typeof listData.style === 'string' && listData.style === 'ordered'
            ? 'ordered'
            : 'unordered'
        const ListTag = style === 'ordered' ? 'ol' : 'ul'
        const listClasses =
          style === 'ordered'
            ? 'list-decimal list-inside mb-4 space-y-2 text-gray-700'
            : 'list-disc list-inside mb-4 space-y-2 text-gray-700'
        const items = Array.isArray(listData.items) ? listData.items : []

        return (
          <ListTag key={block.id} className={listClasses}>
            {items.map((item: unknown, index: number) => {
              const itemText = typeof item === 'string' ? item : String(item)
              return <li key={index}>{itemText}</li>
            })}
          </ListTag>
        )
      }

      case 'table': {
        const tableData = block.data as { content?: unknown[] }
        const content = Array.isArray(tableData.content) ? tableData.content : []
        return (
          <div key={block.id} className="mb-4 overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <tbody>
                {content.map((row: unknown, rowIndex: number) => {
                  const rowArray = Array.isArray(row) ? row : []
                  return (
                    <tr key={rowIndex}>
                      {rowArray.map((cell: unknown, cellIndex: number) => {
                        const CellTag = rowIndex === 0 ? 'th' : 'td'
                        const cellClasses =
                          rowIndex === 0
                            ? 'border border-gray-300 px-4 py-2 font-semibold bg-gray-50'
                            : 'border border-gray-300 px-4 py-2'
                        const cellText = typeof cell === 'string' ? cell : String(cell)
                        return (
                          <CellTag key={cellIndex} className={cellClasses}>
                            {cellText}
                          </CellTag>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )
      }

      case 'raw': {
        const rawData = block.data as { html?: string }
        const html = typeof rawData.html === 'string' ? rawData.html : ''
        return (
          <div
            key={block.id}
            className="mb-4 rounded bg-gray-100 p-4 font-mono text-sm"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )
      }

      default:
        return (
          <div key={block.id} className="mb-4 text-gray-500 italic">
            Unsupported block type: {block.type}
          </div>
        )
    }
  }

  return (
    <div className="prose prose-lg max-w-none">{data.blocks.map(block => renderBlock(block))}</div>
  )
}

export default EditorContent
