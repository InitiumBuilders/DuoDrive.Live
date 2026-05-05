import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Nav } from '@/components/Nav';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { ThemeProvider } from '@/components/ThemeProvider';
import { EasterEggs } from '@/components/EasterEggs';
import { FloatingVotus } from '@/components/FloatingVotus';
import { PreviewBanner } from '@/components/PreviewBanner';

export const metadata: Metadata = {
  title: 'DuoDrive.Live — Code And Vibe',
  description: 'The platform to build live, and build together. Build your product live. Because two is better than one.',
  metadataBase: new URL('https://duodrive.live'),
  openGraph: {
    title: 'DuoDrive.Live — Code And Vibe',
    description: 'The live-streaming platform for Vibe Coders. Two builders. One Initium. The community drives.',
    url: 'https://duodrive.live',
    siteName: 'DuoDrive.Live',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DuoDrive.Live — Code And Vibe',
    description: 'Two builders. One Initium. The community drives.',
  },
};

export const viewport: Viewport = {
  themeColor: '#06070D',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var u=new URL(location.href);var q=u.searchParams.get('theme');var t=(q==='light'||q==='dark')?q:localStorage.getItem('duodrive-theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t}}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
        <ThemeProvider>
          <Nav />
          <PreviewBanner />
          <main className="pb-28 md:pb-0">{children}</main>
          <MobileBottomNav />
          <Footer />
          <EasterEggs />
          <FloatingVotus />
        </ThemeProvider>
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="hairline-t mt-32 px-6 py-12 text-center">
      <p className="text-[10px] tracking-[0.2em] uppercase font-mono" style={{ color: 'var(--fg-faint)' }}>
        DuoDrive.Live · Built And Envisioned By The Davara.DEV Community
      </p>
      <p className="mt-3 text-xs" style={{ color: 'var(--fg-faint)' }}>
        Open source · MIT · <a href="https://github.com/InitiumBuilders/DuoDrive.Live" className="underline-offset-4 hover:underline" style={{ color: 'var(--fg-muted)' }}>github.com/InitiumBuilders/DuoDrive.Live</a>
      </p>
    </footer>
  );
}
