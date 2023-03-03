import 'normalize.css/normalize.css';
import './globals.sass'



import { Navigation } from './shared/Navigation/Navigation'
import { PageTransition } from './shared/PageTransition/PageTransition'


export const metadata = {
  title: 'Mzus - Portfolio',
  description: 'Mzus - Portfolio...',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* <head>
        <title>Mzus - Portfolio</title>
        <meta name="description" content="Mzus - Portfolio..." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head> */}

      <body>
        <Navigation />
        <PageTransition>
          {children}
        </PageTransition>
      </body>

    </html>
  )
}
