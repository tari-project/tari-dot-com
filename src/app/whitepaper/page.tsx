'use client';

import { useEffect, Suspense } from 'react';
import Header from '@/sites/tari-dot-com/ui/Header/Header';
import Footer from '@/sites/tari-dot-com/ui/Footer/Footer';

export const dynamic = 'force-dynamic';

export default function WhitepaperPage() {
  useEffect(() => {
    // Hide banner and modify header on mount
    const hideBannerAndModifyHeader = () => {
      // Make header not sticky
      const stickyElements = Array.from(document.querySelectorAll('div')).filter(el => {
        const style = getComputedStyle(el);
        return style.position === 'sticky';
      });
      stickyElements.forEach(el => {
        (el as HTMLElement).style.position = 'relative';
        (el as HTMLElement).style.top = 'auto';
        (el as HTMLElement).style.marginBottom = '0';
      });
    };

    // Run immediately
    hideBannerAndModifyHeader();
    
    // Also run after a short delay in case elements are rendered later
    setTimeout(hideBannerAndModifyHeader, 100);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .whitepaper-container {
            width: 100%;
            height: calc(100vh - 82px - 40px); /* Header (82px) + padding (40px) */
            margin: 0;
            padding: 20px;
            box-sizing: border-box;
          }
          
          @media (max-width: 666px) {
            .whitepaper-container {
              height: calc(100vh - 72px - 40px); /* Header (72px) + padding (40px) */
              padding: 20px;
            }
          }
        `
      }} />
      
      <Suspense fallback={<div>Loading header...</div>}>
        <Header />
      </Suspense>
      
      <div className="whitepaper-container">
        <iframe
          src="/wxtm-whitepaper-mica.pdf"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            margin: 0,
            padding: 0
          }}
          title="wXTM Crypto-asset Whitepaper under MiCA"
        />
      </div>
      
      <Footer />
    </>
  );
}
