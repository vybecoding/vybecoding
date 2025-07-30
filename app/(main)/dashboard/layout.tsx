import DashboardTabs from '@/components/dashboard/DashboardTabs'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Dashboard Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-light mb-4">
            <span className="gradient-text">Dashboard</span>
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