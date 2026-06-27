'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h2 className="text-2xl font-semibold mb-4">Terjadi Kesalahan</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Kami mengalami kesalahan tak terduga. Silakan coba lagi atau hubungi dukungan jika masalah berlanjut.
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Coba Lagi
        </button>
        <a
          href="/"
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          Ke Beranda
        </a>
      </div>
    </div>
  )
}
