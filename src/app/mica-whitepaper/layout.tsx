export default function WhitepaperLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            height: 100vh !important;
            width: 100vw !important;
          }
        `
      }} />
      {children}
    </>
  );
}
