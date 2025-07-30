"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    
    // Send error to monitoring service
    if (typeof window !== "undefined" && window.Sentry) {
      window.Sentry.captureException(error, {
        contexts: { errorBoundary: { componentStack: errorInfo.componentStack } }
      });
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center">
            <div className="vybe-card p-8">
              <AlertTriangle className="w-16 h-16 text-vybe-orange mx-auto mb-6" />
              
              <h2 className="text-2xl font-bold text-white mb-4">
                Something went wrong
              </h2>
              
              <p className="text-vybe-gray-400 mb-6">
                We encountered an unexpected error. Our team has been notified and is working on a fix.
              </p>
              
              {process.env.NODE_ENV === "development" && this.state.error && (
                <details className="text-left mb-6 p-4 bg-red-900/20 border border-red-500/20 rounded">
                  <summary className="cursor-pointer font-mono text-sm text-red-400 mb-2">
                    Error Details
                  </summary>
                  <pre className="text-xs text-red-300 whitespace-pre-wrap">
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
              
              <div className="flex gap-4">
                <button
                  onClick={this.handleRetry}
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
      );
    }

    return this.props.children;
  }
}

export function ErrorFallback({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-6 bg-red-900/10 border border-red-500/20 rounded-lg">
      <h3 className="text-lg font-semibold text-red-400 mb-2">Something went wrong</h3>
      <p className="text-red-300 text-sm mb-4">{error.message}</p>
      <button onClick={reset} className="btn btn-secondary">
        Try again
      </button>
    </div>
  );
}