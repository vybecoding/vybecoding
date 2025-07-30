import DashboardTabs from '@/components/dashboard/DashboardTabs'
import { GradientText } from '@/components/effects/GradientText'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-black pt-20 relative">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Dashboard Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-light mb-4">
            <GradientText gradient="brand">Dashboard</GradientText>
          </h1>
          <p className="text-gray-300 text-lg">
            Manage your content, mentorship sessions, and track your growth.
          </p>
        </div>

        {/* Dashboard Tabs */}
        <DashboardTabs />

        {/* Content Container */}
        <div id="dashboard-content-container">
          {children}
        </div>
      </div>
    </div>
  )
}