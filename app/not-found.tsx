import Link from "next/link";
import { Search, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="page-container nebula-background min-h-screen">
      {/* Nebula backgrounds */}
      <div className="nebula-middle"></div>
      <div className="nebula-bottom"></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 py-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="vybe-card p-12 max-w-lg mx-auto">
            {/* 404 Number */}
            <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-vybe-purple to-vybe-pink mb-6">
              404
            </div>
            
            {/* Error Message */}
            <h1 className="text-3xl font-bold text-white mb-4">
              Page Not Found
            </h1>
            
            <p className="text-vybe-gray-400 text-lg mb-8">
              The page you're looking for doesn't exist or has been moved to a new location.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="btn btn-primary-orange flex items-center gap-2">
                <Home className="w-4 h-4" />
                Go Home
              </Link>
              
              <Link href="/apps" className="btn btn-secondary flex items-center gap-2">
                <Search className="w-4 h-4" />
                Browse Apps
              </Link>
              
              <button 
                onClick={() => window.history.back()}
                className="btn btn-secondary flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </button>
            </div>
            
            {/* Helpful Links */}
            <div className="mt-8 pt-8 border-t border-vybe-gray-800">
              <p className="text-sm text-vybe-gray-500 mb-4">Looking for something specific?</p>
              <div className="flex flex-wrap gap-4 justify-center text-sm">
                <Link href="/apps" className="text-vybe-orange hover:underline">
                  Browse Apps
                </Link>
                <Link href="/guides" className="text-vybe-orange hover:underline">
                  Read Guides
                </Link>
                <Link href="/members" className="text-vybe-orange hover:underline">
                  Meet Members
                </Link>
                <Link href="/featured" className="text-vybe-orange hover:underline">
                  Featured Content
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}