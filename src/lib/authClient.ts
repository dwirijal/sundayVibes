'use client'

import { createAuthClient } from '@neondatabase/auth/next'

// Browser-side Neon Auth client. `signIn.social` triggers the Google popup
// / redirect configured in the Neon dashboard.
export const authClient = createAuthClient()
