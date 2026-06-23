import config from '@payload-config'
import '@payloadcms/next/css'
import { RootLayout } from '@payloadcms/next/layouts'
import { importMap } from './admin/importMap'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayout config={config} importMap={importMap}>{children}</RootLayout>
}
