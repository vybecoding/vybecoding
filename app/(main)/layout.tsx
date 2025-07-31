import { Header, Footer } from '@/components/layout'
import { UserProfileSync } from '@/components/auth/UserProfileSync'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-vybe-purple/20 selection:text-white">
      <UserProfileSync />
      <Header />
      <main className="pt-16 min-h-screen">
        {children}
      </main>
      <Footer />
    </div>
  )
}