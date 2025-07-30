"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service
    console.error("Global error:", error);
    
    if (typeof window !== "undefined" && (window as any).Sentry) {
      (window as any).Sentry.captureException(error);
    }
  }, [error]);

  return (
    <html>
      <body>
        <div className="page-container nebula-background min-h-screen">
          {/* Nebula backgrounds */}
          <div className="nebula-middle"></div>
          <div className="nebula-bottom"></div>
          
          <div className="max-w-4xl mx-auto px-6 relative z-10 py-8 flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="vybe-card p-12 max-w-lg mx-auto">
                <AlertTriangle className="w-16 h-16 text-vybe-orange mx-auto mb-6" />
                
                <h1 className="text-3xl font-bold text-white mb-4">
                  Something went wrong
                </h1>
                
                <p className="text-vybe-gray-400 text-lg mb-8">
                  We encountered an unexpected error. Our team has been notified and is working on a fix.
                </p>
                
                {process.env.NODE_ENV === "development" && (
                  <details className="text-left mb-6 p-4 bg-red-900/20 border border-red-500/20 rounded">
                    <summary className="cursor-pointer font-mono text-sm text-red-400 mb-2">
                      Error Details
                    </summary>
                    <pre className="text-xs text-red-300 whitespace-pre-wrap">
                      {error.message}
                      {error.stack && (
                        <>
                          {"\n\n"}
                          {error.stack}
                        </>
                      )}
                      {error.digest && (
                        <>
                          {"\n\n"}
                          Digest: {error.digest}
                        </>
                      )}
                    </pre>
                  </details>
                )}
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={reset}
                    className="btn btn-primary-orange flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                  </button>
                  
                  <button
                    onClick={() => window.location.href = "/"}
                    className="btn btn-secondary flex items-center gap-2"
                  >
                    <Home className="w-4 h-4" />
                    Go Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}