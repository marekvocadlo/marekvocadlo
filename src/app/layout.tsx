import { type Metadata } from 'next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: {
    template: '%s - Marek Vočadlo',
    default: 'Marek Vočadlo - Team Leader & Frontend Developer',
  },
  description:
    'Jsem softwarový inženýr se zaměřením na moderní webové technologie. Nové technologie mě vždy bavily, proto se snažím každý projekt posouvat o krok dál. Při práci v týmu je pro mě nejdůležitější spolehlivost, důvěra a schopnost dotáhnout věci do konce.',
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
