export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Server-side Sentry initialization
    const { init } = await import('@sentry/nextjs')
    init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: 1.0,
      debug: false,
    })
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    // Edge runtime Sentry initialization
    const { init } = await import('@sentry/nextjs')
    init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: 1.0,
      debug: false,
    })
  }
}

// Export the required hook for request error instrumentation
export const onRequestError = async (err: unknown, request: Request, context: { routerKind: string; routePath: string }) => {
  const { captureRequestError } = await import('@sentry/nextjs')
  return captureRequestError(err, request, context)
}