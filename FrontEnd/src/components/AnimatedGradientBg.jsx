import { useEffect, useRef, useState } from 'react'
import { Box } from '@mui/material'

export default function AnimatedGradientBg({ children }) {
  const interactiveRef = useRef(null)
  const [curX, setCurX] = useState(0)
  const [curY, setCurY] = useState(0)
  const [tgX, setTgX] = useState(0)
  const [tgY, setTgY] = useState(0)

  useEffect(() => {
    let animFrame
    function move() {
      setCurX(prev => {
        const next = prev + (tgX - prev) / 20
        if (interactiveRef.current) {
          interactiveRef.current.style.transform = `translate(${Math.round(next)}px, ${Math.round(curY)}px)`
        }
        return next
      })
      setCurY(prev => prev + (tgY - prev) / 20)
      animFrame = requestAnimationFrame(move)
    }
    animFrame = requestAnimationFrame(move)
    return () => cancelAnimationFrame(animFrame)
  }, [tgX, tgY])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setTgX(e.clientX - rect.left)
    setTgY(e.clientY - rect.top)
  }

  const gradientStyle = {
    position: 'absolute', inset: 0,
    filter: 'url(#goo) blur(40px)',
    width: '100%', height: '100%',
  }

  const blobBase = {
    position: 'absolute',
    width: '80%', height: '80%',
    top: 'calc(50% - 40%)',
    left: 'calc(50% - 40%)',
    borderRadius: '50%',
    mixBlendMode: 'hard-light',
  }

  return (
    <Box
      onMouseMove={handleMouseMove}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(40deg, #022c22, #064e3b)',
      }}
    >
      {/* SVG FILTER */}
      <svg style={{ display: 'none' }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* ANIMATED BLOBS */}
      <Box sx={{ ...gradientStyle, zIndex: 0 }}>
        {/* Blob 1 — hijau terang */}
        <Box sx={{
          ...blobBase,
          background: 'radial-gradient(circle at center, rgba(22,163,74,1) 0%, rgba(22,163,74,0) 50%)',
          transformOrigin: 'center center',
          animation: 'moveVertical 30s ease infinite',
          opacity: 1,
        }} />

        {/* Blob 2 — hijau neon */}
        <Box sx={{
          ...blobBase,
          background: 'radial-gradient(circle at center, rgba(12,248,118,0.8) 0%, rgba(12,248,118,0) 50%)',
          transformOrigin: 'calc(50% - 400px)',
          animation: 'moveInCircle 20s reverse infinite',
          opacity: 0.9,
        }} />

        {/* Blob 3 — hijau lime */}
        <Box sx={{
          ...blobBase,
          background: 'radial-gradient(circle at center, rgba(148,189,38,0.8) 0%, rgba(148,189,38,0) 50%)',
          transformOrigin: 'calc(50% + 400px)',
          animation: 'moveInCircle 40s linear infinite',
          opacity: 0.9,
        }} />

        {/* Blob 4 — hijau gelap */}
        <Box sx={{
          ...blobBase,
          background: 'radial-gradient(circle at center, rgba(6,78,59,0.8) 0%, rgba(6,78,59,0) 50%)',
          transformOrigin: 'calc(50% - 200px)',
          animation: 'moveHorizontal 40s ease infinite',
          opacity: 0.7,
        }} />

        {/* Blob 5 — teal */}
        <Box sx={{
          ...blobBase,
          background: 'radial-gradient(circle at center, rgba(20,184,166,0.7) 0%, rgba(20,184,166,0) 50%)',
          transformOrigin: 'calc(50% - 800px) calc(50% + 800px)',
          animation: 'moveInCircle 20s ease infinite',
          opacity: 0.8,
        }} />

        {/* Interactive blob */}
        <Box
          ref={interactiveRef}
          sx={{
            position: 'absolute',
            background: 'radial-gradient(circle at center, rgba(12,248,118,0.6) 0%, rgba(12,248,118,0) 50%)',
            mixBlendMode: 'hard-light',
            width: '100%', height: '100%',
            top: '-50%', left: '-50%',
            opacity: 0.7,
          }}
        />
      </Box>

      {/* KEYFRAMES */}
      <style>{`
        @keyframes moveVertical {
          0%   { transform: translateY(-50%); }
          50%  { transform: translateY(50%); }
          100% { transform: translateY(-50%); }
        }
        @keyframes moveInCircle {
          0%   { transform: rotate(0deg); }
          50%  { transform: rotate(180deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes moveHorizontal {
          0%   { transform: translateX(-50%) translateY(-10%); }
          50%  { transform: translateX(50%) translateY(10%); }
          100% { transform: translateX(-50%) translateY(-10%); }
        }
      `}</style>

      {/* CONTENT */}
      <Box sx={{ position: 'relative', zIndex: 2 }}>
        {children}
      </Box>
    </Box>
  )
}