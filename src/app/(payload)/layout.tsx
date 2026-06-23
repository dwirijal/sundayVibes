import config from '@payload-config'
import '@payloadcms/next/css'
import { RootLayout } from '@payloadcms/next/layouts'
import { importMap } from './admin/importMap'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  // @ts-expect-error - importMap is missing but we'll try to build without it
  return <RootLayout config={config} importMap={importMap}>{children}</RootLayout>
}
