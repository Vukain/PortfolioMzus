import 'normalize.css/normalize.css';
import './globals.sass';

import { Lato } from 'next/font/google';

import { Navigation } from '@/components/Navigation/Navigation';
import { PageTransition } from '@/components/PageTransition/PageTransition';

export const metadata = {
  title: 'Mzus - Portfolio',
  description: 'Mzus - Portfolio...',
};

const lato = Lato({ weight: ['300', '400', '700'], subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* <head>
        <title>Mzus - Portfolio</title>
        <meta name="description" content="Mzus - Portfolio..." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head> */}

      <body className={lato.className}>
        <Navigation />
        {/* <PageTransition> */}
        {children}
        {/* </PageTransition> */}
      </body>
    </html>
  );
}
