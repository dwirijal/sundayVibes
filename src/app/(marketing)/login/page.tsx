import { Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AuthCardEntrance } from '@/components/animations'
import LoginFormClient from './LoginFormClient'

export const metadata = {
  title: 'Sign In | Sunday Vibes',
  description: 'Enter your credentials to access your dashboard',
  openGraph: {
    title: 'Sign In | Sunday Vibes',
    description: 'Enter your credentials to access your dashboard',
  },
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <AuthCardEntrance className="w-full max-w-md">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>
            Enter your credentials to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div className="py-8 text-center text-muted-foreground text-sm">Loading...</div>}>
            <LoginFormClient />
          </Suspense>
        </CardContent>
      </Card>
      </AuthCardEntrance>
    </div>
  )
}
