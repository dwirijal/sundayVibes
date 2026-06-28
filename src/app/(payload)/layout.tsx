import config from '@payload-config'
import '@payloadcms/next/css'
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import { importMap } from './admin/importMap'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // @ts-expect-error - Payload CMS type mismatch in strict mode
    <RootLayout config={config} importMap={importMap} serverFunction={handleServerFunctions}>
      {children}
    </RootLayout>
  )
}
