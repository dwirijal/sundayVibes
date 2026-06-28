import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { BottomTabBar } from '@/components/layout/BottomTabBar'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="pb-16 lg:pb-0">{children}</main>
      <Footer />
      <BottomTabBar />
    </>
  )
}
