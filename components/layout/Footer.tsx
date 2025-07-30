import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface FooterProps {
  className?: string
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("py-16 border-t border-vybe-gray-700 bg-vybe-gray-900/50 relative z-10", className)}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Footer Links Grid - Full Width */}
        <div className="mb-12">
          <div className="grid grid-cols-2 md:flex md:justify-between md:w-full gap-8 md:px-20">
            {/* Product */}
            <div>
              <h4 className="text-sm font-medium text-white mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/guides" 
                    className="text-sm text-vybe-gray-400 hover:text-vybe-pink transition-colors"
                  >
                    Guides
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/apps" 
                    className="text-sm text-vybe-gray-400 hover:text-vybe-pink transition-colors"
                  >
                    Apps
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/pricing" 
                    className="text-sm text-vybe-gray-400 hover:text-vybe-pink transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Community */}
            <div>
              <h4 className="text-sm font-medium text-white mb-4">Community</h4>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/featured" 
                    className="text-sm text-vybe-gray-400 hover:text-vybe-pink transition-colors"
                  >
                    Featured
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/members" 
                    className="text-sm text-vybe-gray-400 hover:text-vybe-pink transition-colors"
                  >
                    Members
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/guides/submit" 
                    className="text-sm text-vybe-gray-400 hover:text-vybe-pink transition-colors"
                  >
                    Submit Guide
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/apps/submit" 
                    className="text-sm text-vybe-gray-400 hover:text-vybe-pink transition-colors"
                  >
                    Submit App
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Company */}
            <div>
              <h4 className="text-sm font-medium text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/about" 
                    className="text-sm text-vybe-gray-400 hover:text-vybe-pink transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/help" 
                    className="text-sm text-vybe-gray-400 hover:text-vybe-pink transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/support" 
                    className="text-sm text-vybe-gray-400 hover:text-vybe-pink transition-colors"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Legal */}
            <div>
              <h4 className="text-sm font-medium text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/terms" 
                    className="text-sm text-vybe-gray-400 hover:text-vybe-pink transition-colors"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/privacy" 
                    className="text-sm text-vybe-gray-400 hover:text-vybe-pink transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/cookies" 
                    className="text-sm text-vybe-gray-400 hover:text-vybe-pink transition-colors"
                  >
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/licenses" 
                    className="text-sm text-vybe-gray-400 hover:text-vybe-pink transition-colors"
                  >
                    Licenses
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Copyright Only */}
        <div className="border-t border-vybe-gray-700 pt-8">
          <p className="text-sm text-vybe-gray-400">
            &copy; 2024 vybecoding.ai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}