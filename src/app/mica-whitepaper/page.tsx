export default function WhitepaperPage() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', margin: 0, padding: 0, overflow: 'hidden' }}>
      {/* Full screen PDF */}
      <iframe
        src="/wxtm-whitepaper-mica.pdf"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none',
          margin: 0,
          padding: 0
        }}
        title="wXTM Crypto-asset Whitepaper under MiCA"
      />
    </div>
  );
}
