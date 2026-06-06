'use client'

import { useEffect, useRef } from 'react'

export default function ScrollIndicator() {
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const btn = btnRef.current
    if (!btn) return

    function onScroll() {
      const visible = window.scrollY > window.innerHeight * 0.4
      if (visible) {
        btn!.style.opacity = '1'
        btn!.style.transform = 'translateY(0) scale(1)'
        btn!.style.pointerEvents = 'auto'
      } else {
        btn!.style.opacity = '0'
        btn!.style.transform = 'translateY(16px) scale(0.92)'
        btn!.style.pointerEvents = 'none'
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <style>{`
        @keyframes si-float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-5px); }
        }
        .si-arrow { animation: si-float 2.2s ease-in-out infinite; }

        @keyframes si-ring {
          0%   { transform: scale(1);   opacity: 0.5; }
          100% { transform: scale(1.9); opacity: 0;   }
        }
        .si-ring {
          position: absolute; inset: 0;
          border-radius: 50%;
          border: 1.5px solid var(--primary);
          animation: si-ring 2s ease-out infinite;
          pointer-events: none;
        }
      `}</style>

      <button
        ref={btnRef}
        onClick={scrollToTop}
        aria-label="Scroll to top"
        style={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: 100,
          width: 52,
          height: 52,
          borderRadius: '50%',
          border: '1.5px solid var(--outline)',
          background: 'color-mix(in oklab, var(--surface) 85%, transparent)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          color: 'var(--primary)',
          display: 'grid',
          placeItems: 'center',
          cursor: 'pointer',
          opacity: 0,
          transform: 'translateY(16px) scale(0.92)',
          pointerEvents: 'none',
          transition: 'opacity .35s cubic-bezier(.23,1,.32,1), transform .35s cubic-bezier(.23,1,.32,1), border-color .2s, background .2s',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement
          el.style.borderColor = 'var(--primary)'
          el.style.background = 'color-mix(in oklab, var(--primary) 10%, var(--surface))'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement
          el.style.borderColor = 'var(--outline)'
          el.style.background = 'color-mix(in oklab, var(--surface) 85%, transparent)'
        }}
      >
        {/* Pulsing ring */}
        <span className="si-ring" />

        {/* Floating arrow */}
        <span className="si-arrow">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </span>
      </button>
    </>
  )
}
