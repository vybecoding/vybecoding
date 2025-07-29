import { AnimatedLogo } from '@/components/ui/animated-logo';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Background Elements - matching demo exactly */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars"></div>
        <div className="nebula-background"></div>
        <div className="floating-particles"></div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center relative px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo - matching demo exactly */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2">
              <AnimatedLogo />
              <span className="text-2xl font-bold text-white">vybecoding</span>
            </div>
          </div>

          {/* Auth Content */}
          <div className="vybe-card p-8">
            {children}
          </div>

          {/* Back to Home */}
          <div className="text-center mt-8">
            <a 
              href="/" 
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              ← Back to home
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}