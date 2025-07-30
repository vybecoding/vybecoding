import Navigation from '@/components/navigation/Navigation'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navigation />
      <div className="pt-16 min-h-screen">
        {children}
      </div>
    </>
  )
}