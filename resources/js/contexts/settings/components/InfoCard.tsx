import { Card } from '@/contexts/shared/components/ui/Card'

interface InfoCardProps {
  title?: string
  description?: string
  children?: React.ReactNode
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, description, children, ...props }) => {
  return (
    <Card {...props}>
      {title && <h6 className="mb-0 text-lg font-semibold">{title}</h6>}
      {description && <p className="mb-3 text-gray-500">{description}</p>}
      {children && <div className="text-gray-700">{children}</div>}
    </Card>
  )
}
