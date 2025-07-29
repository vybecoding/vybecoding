import Navigation from '@/components/Navigation'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navigation />
      <div className="pt-[72px] min-h-screen">
        {children}
      </div>
    </>
  )
}