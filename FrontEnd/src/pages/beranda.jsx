import { Box, Typography, Button } from '@mui/material'
import { ShoppingCart, Favorite, LocalShipping, Star } from '@mui/icons-material'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useNavigate } from 'react-router-dom'
import AnimatedGradientBg from '../components/AnimatedGradientBg'

import heroImg from '../assets/images/gambarcewe.png'
import buahImg from '../assets/images/buahh.jpeg'
import parcelImg from '../assets/images/parcelbesar.jpeg'
import jusImg from '../assets/images/jus.png'
import bgKenapa from '../assets/images/bgkenapapilih.jpg'

gsap.registerPlugin(ScrollTrigger)

function Beranda() {
  const navigate = useNavigate()

  useEffect(() => {
    // ================= ANIMASI HERO (BARU) =================
    // Animasi bertahap (stagger) untuk teks dan tombol di kiri
    gsap.fromTo(
      '.hero-text-anim',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 0.2 }
    )

    // Animasi untuk gambar dan badge di kanan
    gsap.fromTo(
      '.hero-img-anim',
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out', delay: 0.6 }
    )
    // =======================================================

    gsap.set('.layanan-card', { opacity: 1, y: 0 })
    gsap.set('.kenapa-card', { opacity: 1, y: 0 })

    const layananCards = gsap.utils.toArray('.layanan-card')
    if (layananCards.length > 0) {
      gsap.from(layananCards, {
        scrollTrigger: {
          trigger: '.layanan-section',
          start: 'top 85%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      })
    }

    const kenapaCards = gsap.utils.toArray('.kenapa-card')
    if (kenapaCards.length > 0) {
      gsap.from(kenapaCards, {
        scrollTrigger: {
          trigger: '.kenapa-section',
          start: 'top 85%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      })
    }

    gsap.to('.kenapa-section', {
      backgroundPosition: '50% 70%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.kenapa-section',
        scrub: true,
      },
    })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  const layananData = [
    {
      title: 'Buah Lokal/Impor',
      img: buahImg,
      desc: 'Buah segar pilihan dari lokal hingga impor berkualitas.',
    },
    {
      title: 'Parcel Buah',
      img: parcelImg,
      desc: 'Paket buah cantik dan sehat untuk berbagai momen.',
    },
    {
      title: 'Jus Buah',
      img: jusImg,
      desc: 'Minuman segar tanpa pengawet, langsung dari buah pilihan.',
    },
  ]

  const kenapaData = [
    {
      icon: <Favorite />,
      title: 'Selalu segar & berkualitas',
      desc: 'Dipilih langsung dari sumber terbaik untuk menjaga kualitas buah.',
    },
    {
      icon: <LocalShipping />,
      title: 'Pengiriman cepat & aman',
      desc: 'Pengiriman cepat dengan packaging aman dan higienis.',
    },
    {
      icon: <Star />,
      title: 'Kualitas premium',
      desc: 'Standar kualitas tinggi untuk kepuasan pelanggan.',
    },
    {
      icon: <ShoppingCart />,
      title: 'Mudah & praktis',
      desc: 'Pesan kapan saja dengan sistem yang cepat dan mudah.',
    },
  ]

  return (
    <Box sx={{ fontFamily: "'Poppins', sans-serif" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <Navbar />

      {/* ================= HERO ================= */}
      <AnimatedGradientBg>
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: { xs: 'flex-start', md: 'center' },
            overflow: 'hidden',
            position: 'relative',
            pt: { xs: '100px', md: '90px' },
            pb: { xs: 4, md: 0 },
          }}
        >
          <Box
            sx={{
              maxWidth: '1280px',
              mx: 'auto',
              px: { xs: 3, sm: 5, md: 8 },
              width: '100%',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'flex-start', md: 'center' },
              gap: { xs: 2, md: 0 },
            }}
          >
            {/* LEFT */}
            <Box sx={{ flex: 1, zIndex: 2, textAlign: 'left', order: { xs: 1, md: 1 } }}>
              <Typography
                className="hero-text-anim"
                sx={{
                  fontSize: { xs: '1.5rem', sm: '2.2rem', md: '2.2rem', lg: '2.5rem' },
                  fontWeight: 800,
                  color: '#e5e7eb',
                  lineHeight: 1.05,
                  textTransform: 'uppercase',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                SELAMAT DATANG DI
              </Typography>

              <Typography
                className="hero-text-anim"
                sx={{
                  fontSize: { xs: '1.5rem', sm: '2.2rem', md: '2.2rem', lg: '2.5rem' },
                  fontWeight: 800,
                  color: '#a3e635',
                  mb: { xs: 2, md: 2.5 },
                  textTransform: 'uppercase',
                  fontFamily: 'Poppins, sans-serif',
                  lineHeight: 1.1,
                }}
              >
                BUAHAGIA
              </Typography>

              <Typography
                className="hero-text-anim"
                sx={{
                  color: 'rgba(255,255,255,0.82)',
                  fontSize: { xs: '0.88rem', sm: '0.95rem', md: '1rem' },
                  lineHeight: 1.8,
                  maxWidth: { xs: '100%', md: 460 },
                  mb: { xs: 3, md: 4 },
                  fontFamily: 'Poppins, sans-serif',
                  textAlign: 'justify',
                }}
              >
                Temukan kesegaran buah pilihan terbaik, langsung dari kebun ke meja Anda.
                Nikmati pengalaman belanja buah yang praktis, cepat, dan terpercaya dengan
                kualitas premium setiap hari.
              </Typography>

              <Button
                className="hero-text-anim"
                onClick={() => navigate('/produk')}
                sx={{
                  backgroundColor: '#e5e7eb',
                  color: '#064e3b',
                  borderRadius: '999px',
                  px: { xs: 3, md: 4 },
                  py: { xs: 1.2, md: 1.5 },
                  fontWeight: 700,
                  textTransform: 'none',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: { xs: '0.88rem', md: '0.95rem' },
                  boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#a3e635',
                    color: '#064e3b',
                    transform: 'translateY(-3px)',
                  },
                }}
              >
                Mulai Belanja →
              </Button>
            </Box>

            {/* RIGHT */}
            <Box
              className="hero-img-anim"
              sx={{
                flex: 1,
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
                order: { xs: 2, md: 2 },
                width: '100%',
                minHeight: { xs: 320, sm: 420, md: '85vh' },
                mt: { xs: 2, md: 0 },
              }}
            >
              <img
                src={heroImg}
                alt="hero"
                style={{
                  position: 'relative',
                  zIndex: 2,
                  width: '100%',
                  maxWidth: '100%',
                  height: '100%',
                  maxHeight: '95vh',
                  objectFit: 'contain',
                  objectPosition: 'bottom',
                  filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.45))',
                }}
              />

              {/* BADGES */}
              {[
                {
                  icon: <Favorite sx={{ color: '#0CF876', fontSize: { xs: 16, md: 20 } }} />,
                  label: 'Selalu Fresh',
                  top: '20%', right: '2%',
                },
                {
                  icon: <ShoppingCart sx={{ color: '#0CF876', fontSize: { xs: 16, md: 20 } }} />,
                  label: 'Harga Bersahabat',
                  top: '46%', left: '10%',
                },
                {
                  icon: <LocalShipping sx={{ color: '#0CF876', fontSize: { xs: 16, md: 20 } }} />,
                  label: 'Pengiriman Cepat',
                  bottom: '14%', right: '2%',
                },
              ].map((b, i) => (
                <Box
                  key={i}
                  sx={{
                    position: 'absolute',
                    ...(b.top && { top: b.top }),
                    ...(b.bottom && { bottom: b.bottom }),
                    ...(b.right && { right: b.right }),
                    ...(b.left && { left: b.left }),
                    display: 'flex',
                    alignItems: 'center',
                    gap: { xs: 1, md: 1.5 },
                    background:
                      'linear-gradient(135deg, rgba(22,163,74,0.85), rgba(6,78,59,0.9))',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '999px',
                    px: { xs: 1.5, md: 2.5 },
                    py: { xs: 0.8, md: 1.1 },
                    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                    border: '1px solid rgba(12,248,118,0.3)',
                    zIndex: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': { transform: 'scale(1.05)' },
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      borderRadius: '50%',
                      width: { xs: 26, md: 34 },
                      height: { xs: 26, md: 34 },
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {b.icon}
                  </Box>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: '0.72rem', sm: '0.8rem', md: '0.85rem' },
                      color: '#fff',
                      whiteSpace: 'nowrap',
                      fontFamily: 'Poppins, sans-serif',
                    }}
                  >
                    {b.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </AnimatedGradientBg>

      {/* ================= LAYANAN ================= */}
      <Box
        className="layanan-section"
        sx={{
          py: 12,
          background: '#f6f8f4',
          position: 'relative',
        }}
      >
        {/* TITLE */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            sx={{
              fontSize: { xs: '2rem', md: '2.6rem' },
              fontWeight: 800,
              color: '#1A3A01',
              mb: 2,
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            LAYANAN KAMI
          </Typography>
          <Typography
            sx={{
              maxWidth: 600,
              mx: 'auto',
              color: '#555',
              fontSize: '1rem',
              lineHeight: 1.8,
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            Kami menyediakan berbagai pilihan produk buah segar dan olahan untuk
            memenuhi kebutuhan harian Anda.
          </Typography>
        </Box>

        {/* GRID */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2,1fr)',
              md: 'repeat(3,1fr)',
            },
            gap: 5,
            maxWidth: '1200px',
            mx: 'auto',
            px: { xs: 3, md: 4 },
          }}
        >
          {layananData.map((item, i) => (
            <Box
              key={i}
              className="layanan-card"
              sx={{
                borderRadius: '28px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                background:
                  'linear-gradient(160deg, #6FE90F 0%, #326808 49%, #1A3A01 99%)',
                boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
                transition: 'all 0.35s ease',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow:
                    '0 25px 60px rgba(0,0,0,0.25), 0 0 40px rgba(12,248,118,0.4)',
                },
                '&:hover .layanan-img': {
                  transform: 'scale(1.1)',
                },
              }}
            >
              {/* IMAGE */}
              <Box sx={{ height: 220, overflow: 'hidden' }}>
                <img
                  src={item.img}
                  alt={item.title}
                  className="layanan-img"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                />
              </Box>

              {/* CONTENT */}
              <Box
                sx={{
                  p: 3,
                  color: '#fff',
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: '1.15rem',
                      mb: 1,
                      fontFamily: 'Poppins, sans-serif',
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.9rem',
                      opacity: 0.85,
                      lineHeight: 1.7,
                      fontFamily: 'Poppins, sans-serif',
                    }}
                  >
                    {item.desc}
                  </Typography>
                </Box>

                {/* BUTTON */}
                <Box
                  component="a"
                  href="/produk"
                  sx={{
                    mt: 3,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 1,
                    width: { xs: '100%', sm: '260px', md: '300px' },
                    px: 3,
                    py: 1.2,
                    borderRadius: '999px',
                    backgroundColor: '#fff',
                    color: '#1A3A01',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    fontFamily: 'Poppins, sans-serif',
                    textDecoration: 'none',
                    letterSpacing: '0.03em',
                    transition: 'all 0.25s',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                    '&:hover': {
                      backgroundColor: '#94BD26',
                      color: '#fff',
                      boxShadow: '0 6px 20px rgba(148,189,38,0.5)',
                      transform: 'translateY(-2px)', 
                    },
                  }}
                >
                  LIHAT PRODUK
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* ================= KENAPA PILIH ================= */}
      <Box
        className="kenapa-section"
        sx={{
          py: { xs: 10, md: 14 },
          position: 'relative',
          backgroundImage: `url(${bgKenapa})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          overflow: 'hidden',
        }}
      >
        {/* OVERLAY */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(6,78,59,0.9), rgba(6,78,59,0.85))',
          }}
        />

        {/* CONTENT */}
        <Box
          sx={{
            position: 'relative',
            maxWidth: '1100px',
            mx: 'auto',
            px: { xs: 3, md: 6 },
            textAlign: 'center',
          }}
        >
          {/* TITLE */}
          <Typography
            sx={{
              fontSize: { xs: '2.2rem', md: '2.8rem' },
              fontWeight: 800,
              mb: 1,
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            Kenapa Pilih{' '}
            <span style={{ color: '#94BD26' }}>Buahagia?</span>
          </Typography>

          <Typography
            sx={{
              color: 'rgba(255,255,255,0.75)',
              fontSize: '1rem',
              mb: 7,
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.8,
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            Kami menghadirkan buah segar dengan kualitas terbaik untuk Anda dan keluarga.
          </Typography>

          {/* GRID */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2,1fr)' },
              gap: 4,
            }}
          >
            {kenapaData.map((item, i) => (
              <Box
                key={i}
                className="kenapa-card"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const x = (e.clientX - rect.left - rect.width / 2) * 0.12
                  const y = (e.clientY - rect.top - rect.height / 2) * 0.12
                  gsap.to(e.currentTarget, { x, y, duration: 0.25, ease: 'power2.out' })
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: 'elastic.out(1,0.4)',
                  })
                }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 3,
                  textAlign: 'left',
                  px: 3,
                  py: 3,
                  borderRadius: '20px',
                  background: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(14px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.25)',
                  transition: 'all 0.35s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: '0 25px 70px rgba(0,0,0,0.4)',
                    background: 'rgba(255,255,255,0.14)',
                  },
                }}
              >
                {/* ICON */}
                <Box
                  sx={{
                    position: 'relative',
                    width: 64,
                    height: 64,
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      background: '#94BD26',
                      boxShadow: '0 0 25px rgba(148,189,38,0.7)',
                      transition: 'all 0.3s ease',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'relative',
                      color: '#fff',
                      fontSize: 28,
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    {item.icon}
                  </Box>
                </Box>

                {/* TEXT */}
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: '1.05rem',
                      mb: 0.5,
                      color: '#fff',
                      fontFamily: 'Poppins, sans-serif',
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.9rem',
                      color: 'rgba(255,255,255,0.7)',
                      lineHeight: 1.6,
                      fontFamily: 'Poppins, sans-serif',
                    }}
                  >
                    {item.desc}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Footer />
    </Box>
  )
}

export default Beranda