import React, { useCallback, useEffect, useRef } from 'react'
import EditorJS, { OutputData, ToolConstructable } from '@editorjs/editorjs'
import Header from '@editorjs/header'
import Table from '@editorjs/table'
import RawTool from '@editorjs/raw'

interface EditorProps {
  data?: OutputData
  minHeight?: number
  onChange: (data: OutputData) => void
}

export const Editor: React.FC<EditorProps> = ({ data, minHeight = 200, onChange }) => {
  const editorRef = useRef<EditorJS | null>(null)
  const holderRef = useRef<HTMLDivElement>(null)

  const handleChange = useCallback(async () => {
    if (editorRef.current && onChange) {
      const savedData = await editorRef.current.save()
      onChange(savedData)
    }
  }, [onChange])

  useEffect(() => {
    if (!holderRef.current) return
    if (editorRef.current) return

    editorRef.current = new EditorJS({
      holder: holderRef.current,
      data,
      minHeight,
      tools: {
        header: {
          class: Header as unknown as ToolConstructable,
          inlineToolbar: true,
          config: { levels: [2, 3, 4], defaultLevel: 3 },
        },
        table: {
          class: Table as unknown as ToolConstructable,
          inlineToolbar: true,
          config: { rows: 2, cols: 3 },
        },
        raw: RawTool as unknown as ToolConstructable,
      },
      onChange: handleChange,
    })

    return () => {
      editorRef.current?.destroy?.()
      editorRef.current = null
    }
  }, [])

  return <div ref={holderRef} className="editor-container bg-white p-2" />
}
