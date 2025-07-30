'use client';

import { NebulaBackground } from '@/components/effects/NebulaBackground';
import { GradientText } from '@/components/common/GradientText';
import { GlassCard } from '@/components/common/GlassCard';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="relative min-h-screen">
      {/* Nebula Background */}
      <NebulaBackground />
      
      {/* Page Container with max-width matching demo */}
      <div className="relative z-10 page-container" style={{ 
        background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(10, 10, 10, 0.8) 100%)' 
      }}>
        <div style={{maxWidth: '1126px'}} className="mx-auto px-6 py-8">
          
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-light mb-4">
              <GradientText gradient="brand">Pricing</GradientText>
            </h1>
            <p className="text-vybe-gray-300 text-lg">
              Simple, transparent pricing for everyone.<br />
              Start learning and earning today.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Free Tier */}
            <GlassCard 
              className="p-8 text-center transition-colors flex flex-col"
              style={{
                background: 'rgba(26, 26, 26, 0.8)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid #2a3441',
                borderRadius: '0.75rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#bf00ff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#2a3441';
              }}
            >
              {/* Free Badge */}
              <div 
                className="mx-auto w-fit mb-6 inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium"
                style={{
                  background: 'rgba(138, 43, 226, 0.1)',
                  color: '#a855f7',
                  border: '1px solid rgba(138, 43, 226, 0.2)'
                }}
              >
                FREE
              </div>
              
              <div className="text-3xl font-light mb-2">Free</div>
              <div className="text-vybe-gray-400 mb-8">Start Learning & Earning</div>
              
              {/* Features List */}
              <ul className="text-left space-y-3 mb-8 flex-grow">
                <li className="flex items-start space-x-3">
                  <span style={{color: '#bf00ff'}}>✓</span>
                  <span>Browse all guides and apps</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span style={{color: '#bf00ff'}}>✓</span>
                  <span>Book mentorship sessions</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span style={{color: '#bf00ff'}}>✓</span>
                  <div>
                    Offer mentorship<br />
                    <span className="text-xs text-vybe-gray-400">(keep 90% of revenue)</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span style={{color: '#bf00ff'}}>✓</span>
                  <span>Basic mentor profile</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span style={{color: '#bf00ff'}}>✓</span>
                  <span>Submit guides and apps</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span style={{color: '#bf00ff'}}>✓</span>
                  <span>Discord community</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span style={{color: '#888'}}>✗</span>
                  <span>No verified badge</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span style={{color: '#888'}}>✗</span>
                  <span>No priority placement</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span style={{color: '#888'}}>✗</span>
                  <span>No analytics</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span style={{color: '#888'}}>✗</span>
                  <span>Cannot monetize guides and apps</span>
                </li>
              </ul>
              
              {/* CTA Button */}
              <Link
                href="/sign-up"
                className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200"
                style={{
                  background: 'linear-gradient(90deg, #8a2be2 0%, #d946a0 50%, #e96b3a 100%)',
                  color: 'white',
                  border: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(217, 70, 160, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Get Started
              </Link>
            </GlassCard>

            {/* Pro Tier */}
            <GlassCard 
              className="p-8 text-center hover:border-vybe-pink transition-colors flex flex-col"
              style={{
                background: 'rgba(26, 26, 26, 0.8)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid #2a3441',
                borderRadius: '0.75rem'
              }}
            >
              {/* Pro Badge */}
              <div 
                className="mx-auto w-fit mb-6 inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium"
                style={{
                  background: 'rgba(233, 75, 157, 0.1)',
                  color: '#d946a0',
                  border: '1px solid rgba(233, 75, 157, 0.2)'
                }}
              >
                PRO
              </div>
              
              <div className="text-3xl font-light mb-2">
                <span className="relative">
                  <span className="ml-2">$19</span><span className="text-lg text-vybe-gray-400">/mo</span>
                </span>
              </div>
              <div className="text-vybe-gray-400 mb-8">Build Your Mentorship Business</div>
              
              {/* Features List */}
              <ul className="text-left space-y-3 mb-8 flex-grow">
                <li className="flex items-start space-x-3">
                  <span style={{color: '#ff1493'}}>✓</span>
                  <span>Everything in Free, plus:</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span style={{color: '#ff1493'}}>✓</span>
                  <div>
                    <strong>Keep 95% of all revenue</strong><br />
                    <span className="text-xs text-vybe-gray-400">Mentorship, guides, and apps - highest rate in the industry</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span style={{color: '#ff1493'}}>✓</span>
                  <div>
                    <strong>Set custom prices</strong><br />
                    <span className="text-xs text-vybe-gray-400">From $5-$50 on guides and apps</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span style={{color: '#ff1493'}}>✓</span>
                  <span><strong>Earn badges</strong></span>
                </li>
                <li className="flex items-start space-x-3">
                  <span style={{color: '#ff1493'}}>✓</span>
                  <span><strong>Priority search placement</strong></span>
                </li>
                <li className="flex items-start space-x-3">
                  <span style={{color: '#ff1493'}}>✓</span>
                  <span><strong>"Book with me" buttons on all content</strong></span>
                </li>
                <li className="flex items-start space-x-3">
                  <span style={{color: '#ff1493'}}>✓</span>
                  <span><strong>Analytics dashboard (mentorship & content sales)</strong></span>
                </li>
                <li className="flex items-start space-x-3">
                  <span style={{color: '#ff1493'}}>✓</span>
                  <span><strong>Student testimonials</strong></span>
                </li>
                <li className="flex items-start space-x-3">
                  <span style={{color: '#ff1493'}}>✓</span>
                  <span><strong>Automated booking system</strong></span>
                </li>
                <li className="flex items-start space-x-3">
                  <span style={{color: '#ff1493'}}>✓</span>
                  <span><strong>Featured rotation on home and feed pages</strong></span>
                </li>
              </ul>
              
              {/* CTA Button */}
              <Link
                href="/sign-up"
                className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200"
                style={{
                  background: 'transparent',
                  color: '#d946a0',
                  border: '1px solid rgba(217, 70, 160, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(217, 70, 160, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(217, 70, 160, 0.5)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(217, 70, 160, 0.3)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Go Pro
              </Link>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}