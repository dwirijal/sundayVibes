'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global error:', error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
          <h2 className="text-2xl font-semibold mb-4">Terjadi Kesalahan</h2>
          <p className="text-muted-foreground mb-8 max-w-md">
            Kami mengalami kesalahan tak terduga. Silakan coba lagi atau hubungi dukungan jika masalah berlanjut.
          </p>
          <button
            onClick={reset}
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </body>
    </html>
  )
}
