import PublicLayout from '@/contexts/public/layouts/PublicLayout'

const HomePage: React.FC = () => {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Welcome</h1>
          <p className="text-lg text-gray-600">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt officiis saepe ratione
            blanditiis! Quis a, obcaecati tempora ratione modi vel quae officiis rerum pariatur esse
            maxime temporibus saepe quibusdam mollitia!
          </p>
        </div>
      </div>
    </PublicLayout>
  )
}

export default HomePage
