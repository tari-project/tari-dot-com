'use client';

import { useEffect } from 'react';

export default function WhitepaperPage() {
  useEffect(() => {
    // Hide banner and modify header on mount
    const hideBannerAndModifyHeader = () => {
      // Hide banner by finding element with specific background color
      const bannerElements = Array.from(document.querySelectorAll('div')).filter(el => {
        const style = getComputedStyle(el);
        return style.backgroundColor === 'rgb(30, 30, 37)'; // #1e1e25
      });
      bannerElements.forEach(el => {
        (el as HTMLElement).style.display = 'none';
      });

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
    
    // Cleanup function to restore original styles when component unmounts
    return () => {
      const bannerElements = Array.from(document.querySelectorAll('div')).filter(el => {
        const style = getComputedStyle(el);
        return style.display === 'none' && el.innerHTML.includes('Tari Mainnet');
      });
      bannerElements.forEach(el => {
        (el as HTMLElement).style.display = '';
      });
    };
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
    </>
  );
}
