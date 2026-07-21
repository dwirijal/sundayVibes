import type { Access, FieldAccess } from 'payload'

/** Public can read; only admins mutate. Local API still bypasses by default. */
export const publicRead: Access = () => true

export const adminOnly: Access = ({ req: { user } }) => user?.role === 'admin'

export const authenticated: Access = ({ req: { user } }) => !!user

export const adminField: FieldAccess = ({ req: { user } }) => user?.role === 'admin'
