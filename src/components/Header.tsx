export function Header() {
  return (
    <header
      style={{
        position: 'relative',
        zIndex: 50,
        backgroundColor: 'rgba(11,29,58,0.95)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        paddingTop: 'env(safe-area-inset-top)',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 clamp(16px, 4vw, 40px)',
          height: '76px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
        }}
      >
        {/* Conectare logo */}
        <img
          src="/logo.png"
          alt="Conectare"
          style={{
            height: '36px',
            width: 'auto',
            objectFit: 'contain',
            flexShrink: 0,
            display: 'block',
          }}
        />

        {/* Vitor Junior logo */}
        <img
          src="/logofinalprejv.webp"
          alt="Vitor Junior — Trabalhando pelo RJ"
          className="hidden sm:block"
          style={{
            height: '48px',
            width: 'auto',
            objectFit: 'contain',
            flexShrink: 0,
            display: 'block',
          }}
        />

        {/* Divider */}
        <div
          aria-hidden
          style={{
            width: '1px',
            height: '28px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            flexShrink: 0,
          }}
        />

        {/* Title block */}
        <div style={{ minWidth: 0, flex: 1 }}>
          <p
            style={{
              color: '#fff',
              fontSize: 'clamp(13px, 2.5vw, 15px)',
              fontWeight: 600,
              lineHeight: 1.3,
              margin: 0,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            Dashboard de{' '}
            <span style={{ color: '#FE8B01' }}>Lideranças Políticas</span>
          </p>
          <p
            style={{
              color: 'rgba(255,255,255,0.32)',
              fontSize: '11px',
              margin: '2px 0 0',
              lineHeight: 1,
            }}
          >
            Estado do Rio de Janeiro
          </p>
        </div>

        {/* Badge RJ · 2026 — desktop */}
        <div className="hidden sm:flex" style={{ alignItems: 'center', gap: '14px', flexShrink: 0 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(254,139,1,0.08)',
              border: '1px solid rgba(254,139,1,0.18)',
              color: 'rgba(254,139,1,0.8)',
              fontSize: '11px',
              fontWeight: 600,
              padding: '5px 14px',
              borderRadius: '99px',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#FE8B01',
                display: 'inline-block',
                boxShadow: '0 0 6px #FE8B01',
              }}
            />
            RJ · 2026
          </span>
        </div>
      </div>
    </header>
  );
}
