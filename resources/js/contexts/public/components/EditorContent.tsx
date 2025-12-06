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
      case 'paragraph':
        return (
          <p key={block.id} className="mb-4 text-gray-700 leading-relaxed">
            {'text' in block.data ? block.data.text : ''}
          </p>
        )

      case 'header': {
        const level = 'level' in block.data ? block.data.level : 1
        const HeaderTag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
        const headerClasses: Record<number, string> = {
          1: 'text-4xl font-bold mb-6 text-gray-900',
          2: 'text-3xl font-bold mb-5 text-gray-900',
          3: 'text-2xl font-semibold mb-4 text-gray-900',
          4: 'text-xl font-semibold mb-3 text-gray-900',
        }
        const className = headerClasses[level] || 'text-lg font-semibold mb-3 text-gray-900'

        return (
          <HeaderTag key={block.id} className={className}>
            {'text' in block.data ? block.data.text : ''}
          </HeaderTag>
        )
      }

      case 'list': {
        const style = 'style' in block.data ? block.data.style : 'unordered'
        const ListTag = style === 'ordered' ? 'ol' : 'ul'
        const listClasses = style === 'ordered' 
          ? 'list-decimal list-inside mb-4 space-y-2 text-gray-700'
          : 'list-disc list-inside mb-4 space-y-2 text-gray-700'
        const items = 'items' in block.data ? block.data.items : []

        return (
          <ListTag key={block.id} className={listClasses}>
            {items.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ListTag>
        )
      }

      case 'table': {
        const content = 'content' in block.data ? block.data.content : []
        return (
          <div key={block.id} className="mb-4 overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <tbody>
                {content.map((row: string[], rowIndex: number) => (
                  <tr key={rowIndex}>
                    {row.map((cell: string, cellIndex: number) => {
                      const CellTag = rowIndex === 0 ? 'th' : 'td'
                      const cellClasses = rowIndex === 0
                        ? 'border border-gray-300 px-4 py-2 font-semibold bg-gray-50'
                        : 'border border-gray-300 px-4 py-2'
                      return (
                        <CellTag key={cellIndex} className={cellClasses}>
                          {cell}
                        </CellTag>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      }

      case 'raw': {
        const html = 'html' in block.data ? block.data.html : ''
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
    <div className="prose prose-lg max-w-none">
      {data.blocks.map(block => renderBlock(block))}
    </div>
  )
}

export default EditorContent

