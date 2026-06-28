'use client'

import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <Card className="border-destructive/30">
      <CardContent className="p-6 flex flex-col items-center text-center gap-4">
        <div className="w-12 h-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-foreground">Terjadi kesalahan</h2>
          <p className="text-sm text-muted-foreground">
            Maaf, terjadi kendala tak terduga. Silakan coba lagi atau hubungi kami.
          </p>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <pre className="text-xs text-muted-foreground bg-muted p-2 rounded max-w-full overflow-auto text-left">
            {error.message}
          </pre>
        )}
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button onClick={resetErrorBoundary} variant="default">
            Coba lagi
          </Button>
          <Button asChild variant="outline">
            <Link href="/kontak">Hubungi dukungan</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
