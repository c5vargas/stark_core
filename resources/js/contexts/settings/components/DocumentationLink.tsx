import { ReactNode } from 'react'

interface DocumentationLinkProps {
  href: string
  title: string
  description: string
  icon: ReactNode
}

export const DocumentationLink: React.FC<DocumentationLinkProps> = ({
  href,
  title,
  description,
  icon,
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 rounded border bg-gray-50 p-2 hover:bg-gray-100"
    >
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <p className="m-0 text-sm font-semibold">{title}</p>
        <p className="m-0 text-xs text-gray-500">{description}</p>
      </div>
    </a>
  )
}
