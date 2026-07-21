'use client'

import { createAuthClient } from '@neondatabase/auth/next'

// ponytail: unused by login UI until Neon→Payload bridge ships.
// Client dashboard auth is Payload email/password only.
export const authClient = createAuthClient()
