'use client'

import { useEffect, useRef } from 'react'

const BUBBLES = ['coding...', 'git push!', 'shipping!', 'fixing bugs', 'deployed!', 'it works!', 'npm run dev', 'let\'s go!', 'refactoring', 'code review']
const WORDS = ['C# & .NET', 'Next.js 16', 'TypeScript', 'PostgreSQL', 'Angular 17', 'SQL Server', 'Supabase', 'EF Core', 'clean arch', 'Docker', 'REST APIs', 'real-time', 'domain DDD']

export default function PixelWalker() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const charRef   = useRef<HTMLDivElement>(null)
  const bubbleRef = useRef<HTMLDivElement>(null)
  const wordRef   = useRef<HTMLSpanElement>(null)
  const sceneRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const S = 4

    function drawChar(wf: number) {
      ctx.clearRect(0, 0, 48, 64)
      const skin   = '#fcd5b0'
      const hair   = '#1e293b'
      const shirt  = '#3525cd'
      const pants  = '#312e81'
      const shoe   = '#0f172a'
      function px(gx: number, gy: number, col: string, w = 1, h = 1) {
        ctx.fillStyle = col
        ctx.fillRect(gx * S, gy * S, w * S, h * S)
      }
      const lf = wf % 2
      // head / hair
      px(3, 0, hair, 6, 1)
      px(2, 1, hair, 8, 1)
      px(2, 2, skin, 8, 3)
      px(2, 2, hair, 2, 1)
      px(8, 2, hair, 2, 1)
      px(3, 3, skin, 1, 1); px(8, 3, skin, 1, 1)
      px(3, 4, skin, 1, 1); px(8, 4, skin, 1, 1)
      // shirt
      px(4, 5, shirt, 4, 1)
      px(2, 6, shirt, 8, 4)
      // arms
      px(1, 6, skin, 2, 2); px(9, 6, skin, 2, 2)
      // legs
      if (lf === 0) {
        px(3, 10, pants, 2, 3); px(7, 10, pants, 2, 3)
        px(2, 13, shoe, 3, 1);  px(7, 13, shoe, 3, 1)
      } else {
        px(3, 10, pants, 2, 2); px(3, 12, pants, 3, 1)
        px(7, 10, pants, 2, 3)
        px(2, 12, shoe, 3, 1);  px(7, 13, shoe, 3, 1)
      }
    }

    let walkFrame = 0
    let dir = 1
    let posX = 40
    let jumping = false
    let jumpV = 0
    let jumpY = 0
    let animId: number

    function animate() {
      walkFrame++
      if (walkFrame % 6 === 0) drawChar(Math.floor(walkFrame / 6))

      posX += dir * 1.4
      const maxX = (sceneRef.current?.offsetWidth ?? 320) - 72
      if (posX > maxX) dir = -1
      if (posX < 16) dir = 1

      const char = charRef.current
      if (char) {
        char.style.left = posX + 'px'
        ;(char.querySelector('canvas') as HTMLElement | null)!.style.transform = `scaleX(${dir})`
      }

      if (jumping) {
        jumpV -= 0.55
        jumpY = Math.min(0, jumpY + jumpV)
        if (char) char.style.bottom = `${2 - jumpY}px`
        if (jumpY >= 0) {
          jumping = false; jumpV = 0; jumpY = 0
          if (char) char.style.bottom = '2px'
        }
      } else if (Math.random() < 0.004) {
        jumping = true; jumpV = 7
      }

      animId = requestAnimationFrame(animate)
    }

    drawChar(0)
    animate()

    let bubbI = 0
    const bubbleTimer = setInterval(() => {
      const bub = bubbleRef.current
      if (!bub) return
      bub.style.opacity = '0'
      bub.style.transform = 'scale(0.88) translateX(-50%)'
      setTimeout(() => {
        bubbI = (bubbI + 1) % BUBBLES.length
        if (bub) {
          bub.textContent = BUBBLES[bubbI]
          bub.style.opacity = '1'
          bub.style.transform = 'scale(1) translateX(-50%)'
        }
      }, 180)
    }, 2400)

    let wordI = 0, charI = 0, deleting = false
    let wordTimer: ReturnType<typeof setTimeout>
    function typeWord() {
      const w = WORDS[wordI]
      const el = wordRef.current
      if (!deleting) {
        charI++
        if (el) el.textContent = w.slice(0, charI)
        if (charI === w.length) { deleting = true; wordTimer = setTimeout(typeWord, 1300); return }
      } else {
        charI--
        if (el) el.textContent = w.slice(0, charI)
        if (charI === 0) { deleting = false; wordI = (wordI + 1) % WORDS.length }
      }
      wordTimer = setTimeout(typeWord, deleting ? 42 : 78)
    }
    typeWord()

    return () => {
      cancelAnimationFrame(animId)
      clearInterval(bubbleTimer)
      clearTimeout(wordTimer)
    }
  }, [])

  return (
    <div
      style={{
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--outline)',
        background: 'var(--surface-low)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* Window chrome */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 14px',
          borderBottom: '1px solid var(--outline)',
          background: 'var(--surface-container)',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', gap: 5 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
        </div>
        <span
          style={{
            marginLeft: 'auto',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--on-surface-variant)',
            letterSpacing: '0.04em',
          }}
        >
          dev.env
        </span>
      </div>

      {/* Scene */}
      <div
        ref={sceneRef}
        style={{
          flex: 1,
          position: 'relative',
          minHeight: 0,
          background: 'var(--surface-container)',
          overflow: 'hidden',
        }}
      >
        {/* Subtle grid */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(var(--outline) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            opacity: 0.5,
            pointerEvents: 'none',
          }}
        />

        {/* Particles */}
        {[0, 1, 2, 3].map(i => (
          <span
            key={i}
            style={{
              position: 'absolute',
              width: 4,
              height: 4,
              borderRadius: 1,
              background: ['var(--primary)', 'var(--secondary)', 'var(--tint)', 'var(--primary)'][i],
              opacity: 0.6,
              left: `${12 + i * 22}%`,
              bottom: 12,
              animation: `pw-float ${2.4 + i * 0.5}s ease-in-out ${i * 0.6}s infinite`,
            }}
          />
        ))}

        {/* Character */}
        <div
          ref={charRef}
          style={{
            position: 'absolute',
            bottom: 2,
            left: 40,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            ref={bubbleRef}
            style={{
              position: 'absolute',
              bottom: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              marginBottom: 8,
              background: 'var(--surface)',
              border: '1px solid var(--outline)',
              borderRadius: 8,
              padding: '4px 9px',
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'var(--on-surface)',
              whiteSpace: 'nowrap',
              transition: 'opacity .18s, transform .18s',
              pointerEvents: 'none',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            coding...
            <span style={{ position: 'absolute', bottom: -6, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '6px solid var(--outline)' }} />
            <span style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: '5px solid var(--surface)' }} />
          </div>
          <canvas
            ref={canvasRef}
            width={48}
            height={64}
            style={{ imageRendering: 'pixelated', display: 'block' }}
          />
        </div>

        {/* Ground */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'var(--outline)' }} />
      </div>

      {/* Word changer */}
      <div
        style={{
          padding: '12px 16px',
          borderTop: '1px solid var(--outline)',
          background: 'var(--surface-container)',
          fontFamily: 'var(--font-body)',
          fontSize: 12.5,
          color: 'var(--on-surface-variant)',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          flexShrink: 0,
        }}
      >
        <span
          style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--secondary)', flexShrink: 0,
            animation: 'pw-blink 2s ease-in-out infinite',
          }}
        />
        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)', fontWeight: 600 }}>~$</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, color: 'var(--on-surface)', minWidth: 80 }}>
          <span ref={wordRef} />
          <span style={{ display: 'inline-block', width: 2, height: 12, background: 'var(--primary)', verticalAlign: 'middle', marginLeft: 1, animation: 'pw-cursor .7s step-end infinite' }} />
        </span>
      </div>

      <style>{`
        @keyframes pw-float {
          0%   { opacity: 0; transform: translateY(0) scale(1); }
          20%  { opacity: .7; }
          80%  { opacity: .2; }
          100% { opacity: 0; transform: translateY(-48px) scale(0); }
        }
        @keyframes pw-cursor {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes pw-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
      `}</style>
    </div>
  )
}
