import { useEffect, useRef } from 'react'
import { Box, Typography, Button } from '@mui/material'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Favorite, LocalShipping,
  EmojiNature, VerifiedUser, WhatsApp
} from '@mui/icons-material'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import AnimatedGradientBg from '../components/AnimatedGradientBg'
import tentangImg from '../assets/images/tentangkami.png'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '500+', label: 'Buah Terjual', icon: '🍉' },
  { value: '200+', label: 'Pelanggan Puas', icon: '😊' },
  { value: '1+', label: 'Tahun Berdiri', icon: '📅' },
  { value: '4.9', label: 'Rating Bintang', icon: '⭐' },
]

const values = [
  {
    icon: <EmojiNature sx={{ fontSize: 28 }} />,
    title: 'Alami & Segar',
    desc: 'Kami hanya menjual buah-buahan segar yang dipilih langsung dari kebun terpercaya setiap harinya.',
    color: '#94BD26',
  },
  {
    icon: <VerifiedUser sx={{ fontSize: 28 }} />,
    title: 'Terjamin Kualitas',
    desc: 'Setiap produk melalui seleksi ketat untuk memastikan kesegaran dan kualitas terbaik sampai ke tanganmu.',
    color: '#0CF876',
  },
  {
    icon: <LocalShipping sx={{ fontSize: 28 }} />,
    title: 'Pengiriman Cepat',
    desc: 'Pesananmu dikemas dengan higienis dan dikirim dengan cepat agar tetap segar saat diterima.',
    color: '#f59e0b',
  },
  {
    icon: <Favorite sx={{ fontSize: 28 }} />,
    title: 'Dengan Hati',
    desc: 'Setiap pesanan kami siapkan dengan penuh kasih sayang, karena kesehatan keluargamu adalah prioritas kami.',
    color: '#ef4444',
  },
]

function TentangKami() {
  const storyRef = useRef()
  const valuesRef = useRef()
  const statsRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from('.hero-title span', {
        y: 80, opacity: 0, duration: 0.9,
        stagger: 0.12, ease: 'power4.out', delay: 0.2,
      })
      gsap.from('.hero-sub', {
        y: 30, opacity: 0, duration: 0.8, delay: 0.7, ease: 'power3.out',
      })
      gsap.from('.hero-btn', {
        y: 20, opacity: 0, duration: 0.7, delay: 1, ease: 'power3.out',
      })

      gsap.from('.story-img', {
        scrollTrigger: { trigger: '.story-section', start: 'top 80%', once: true },
        x: -80, opacity: 0, duration: 1, ease: 'power3.out',
      })
      gsap.from('.story-text', {
        scrollTrigger: { trigger: '.story-section', start: 'top 80%', once: true },
        x: 80, opacity: 0, duration: 1, ease: 'power3.out',
      })

      const statCards = gsap.utils.toArray('.stat-card')
      if (statCards.length) {
        gsap.from(statCards, {
          scrollTrigger: { trigger: '.stats-section', start: 'top 90%', once: true },
          y: 40, opacity: 0, duration: 0.4,
          stagger: 0.08, ease: 'back.out(1.7)', clearProps: 'all',
        })
      }

      const valueCards = gsap.utils.toArray('.value-card')
      if (valueCards.length) {
        gsap.from(valueCards, {
          scrollTrigger: { trigger: '.values-section', start: 'top 85%', once: true },
          y: 60, opacity: 0, duration: 0.7,
          stagger: 0.15, ease: 'power3.out', clearProps: 'all',
        })
      }

    })

    return () => ctx.revert()
  }, [])

  return (
    <Box sx={{ fontFamily: "'Poppins', sans-serif", backgroundColor: '#fff', overflow: 'hidden' }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <Navbar />

      {/* ========== HERO ========== */}
      <AnimatedGradientBg>
        <Box sx={{
          minHeight: '100vh',
          display: 'flex', alignItems: 'center',
          position: 'relative', overflow: 'hidden',
          pt: '90px',
        }}>
          <Box sx={{
            maxWidth: '1280px', mx: 'auto',
            px: { xs: 4, md: 10 },
            width: '100%',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: 6,
            py: { xs: 6, md: 0 },
          }}>

            {/* TEXT */}
            <Box sx={{ flex: 1, zIndex: 2 }}>
              <Box className="hero-title" sx={{ overflow: 'hidden' }}>
                {['Kami Ada', 'Untuk', 'Kesehatanmu'].map((word, i) => (
                  <Box key={i} sx={{ overflow: 'hidden' }}>
                    <span style={{
                      display: 'block',
                      fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                      fontWeight: 800,
                      lineHeight: 1.15,
                      fontFamily: 'Poppins, sans-serif',
                      color: i === 2 ? '#94BD26' : '#fff',
                    }}>
                      {word}
                    </span>
                  </Box>
                ))}
              </Box>

              <Typography className="hero-sub" sx={{
                mt: 3, color: 'rgba(255,255,255,0.78)',
                fontSize: '1rem', lineHeight: 1.9, maxWidth: 440,
                fontFamily: 'Poppins, sans-serif',
              }}>
                Buahagia lahir dari semangat sederhana: menghadirkan buah segar berkualitas langsung dari kebun ke meja makan keluarga Indonesia.
              </Typography>

              {/* <Button
                className="hero-btn"
                href="https://wa.me/6281234567890"
                target="_blank"
                startIcon={<WhatsApp />}
                sx={{
                  mt: 4,
                  backgroundColor: '#25D366',
                  color: '#fff',
                  borderRadius: '999px',
                  px: 4, py: 1.4,
                  fontWeight: 700, fontSize: '0.9rem',
                  fontFamily: 'Poppins, sans-serif',
                  textTransform: 'none',
                  boxShadow: '0 8px 24px rgba(37,211,102,0.4)',
                  '&:hover': {
                    backgroundColor: '#1ebe5a',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 32px rgba(37,211,102,0.5)',
                  },
                  transition: 'all 0.3s',
                }}
              >
                Hubungi Kami
              </Button> */}
            </Box>

            {/* IMAGE */}
            <Box sx={{
              flex: 1, display: 'flex', justifyContent: 'center',
              position: 'relative', zIndex: 2,
            }}>
              {/* Spinning ring */}
              <Box sx={{
                position: 'absolute',
                width: { xs: 280, md: 420 },
                height: { xs: 280, md: 420 },
                borderRadius: '50%',
                border: '2px dashed rgba(148,189,38,0.3)',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                animation: 'spin 20s linear infinite',
                '@keyframes spin': {
                  from: { transform: 'translate(-50%, -50%) rotate(0deg)' },
                  to: { transform: 'translate(-50%, -50%) rotate(360deg)' },
                },
              }} />
              {/* Inner glow circle */}
              <Box sx={{
                position: 'absolute',
                width: { xs: 230, md: 340 },
                height: { xs: 230, md: 340 },
                borderRadius: '50%',
                background: 'rgba(148,189,38,0.1)',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
              }} />

              <img
                src={tentangImg}
                alt="Tentang Kami"
                style={{
                  width: '100%',
                  maxWidth: 460,
                  objectFit: 'cover',
                  position: 'relative',
                  zIndex: 1,
                  borderRadius: '32px',
                  filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.4))',
                }}
              />
            </Box>
          </Box>

          {/* WAVE */}
          <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0 }}>
            <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: '100%', height: 80 }}>
              <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#fff" />
            </svg>
          </Box>
        </Box>
      </AnimatedGradientBg>

      {/* ========== STATS ========== */}
      <Box className="stats-section" ref={statsRef} sx={{ py: 8, backgroundColor: '#fff' }}>
        <Box sx={{
          maxWidth: '1100px', mx: 'auto', px: { xs: 3, md: 6 },
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2,1fr)', md: 'repeat(4,1fr)' },
          gap: 3,
        }}>
          {stats.map((s, i) => (
            <Box key={i} className="stat-card" sx={{
              textAlign: 'center', p: 3,
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #f8faf3, #eef5d6)',
              border: '1px solid rgba(148,189,38,0.2)',
              boxShadow: '0 4px 20px rgba(148,189,38,0.1)',
              transition: 'all 0.3s',
              '&:hover': {
                transform: 'translateY(-6px)',
                boxShadow: '0 12px 32px rgba(148,189,38,0.25)',
              },
            }}>
              <Typography sx={{ fontSize: '2rem', mb: 0.5 }}>{s.icon}</Typography>
              <Typography sx={{
                fontWeight: 900, fontSize: '2rem',
                fontFamily: 'Poppins, sans-serif',
                background: 'linear-gradient(135deg, #64a320, #94BD26)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                {s.value}
              </Typography>
              <Typography sx={{ fontSize: '0.85rem', color: '#666', fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                {s.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* ========== STORY ========== */}
      <Box ref={storyRef} className="story-section" sx={{ py: 10, backgroundColor: '#f8faf3' }}>
        <Box sx={{
          maxWidth: '1100px', mx: 'auto', px: { xs: 3, md: 6 },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 8, alignItems: 'center',
        }}>
          {/* IMAGE */}
          <Box className="story-img" sx={{ position: 'relative' }}>
            <Box sx={{
              position: 'absolute', top: -16, left: -16,
              width: '100%', height: '100%',
              borderRadius: '24px',
              border: '3px solid rgba(148,189,38,0.3)',
              zIndex: 0,
            }} />
            <img
              src={tentangImg}
              alt="Story"
              style={{
                width: '100%',
                borderRadius: '24px',
                objectFit: 'cover',
                position: 'relative',
                zIndex: 1,
                boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
              }}
            />
            <Box sx={{
              position: 'absolute', bottom: -20, right: -20, zIndex: 2,
              backgroundColor: '#fff',
              borderRadius: '16px', px: 2.5, py: 1.5,
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              border: '1px solid rgba(148,189,38,0.2)',
              display: 'flex', alignItems: 'center', gap: 1.5,
            }}>
              <Box sx={{ fontSize: '1.5rem' }}>🌱</Box>
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: '0.9rem', fontFamily: 'Poppins, sans-serif', color: '#1a1a1a' }}>
                  Sejak 2025
                </Typography>
                <Typography sx={{ fontSize: '0.75rem', color: '#94BD26', fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                  Melayani dengan hati
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* TEXT */}
          <Box className="story-text">
            <Box sx={{
              display: 'inline-block',
              backgroundColor: 'rgba(148,189,38,0.1)',
              color: '#94BD26', fontSize: '0.8rem',
              fontWeight: 600, px: 2, py: 0.5,
              borderRadius: '999px', mb: 2,
              fontFamily: 'Poppins, sans-serif',
            }}>
              Cerita Kami
            </Box>

            <Typography sx={{
              fontWeight: 800, fontSize: { xs: '1.8rem', md: '2.2rem' },
              fontFamily: 'Poppins, sans-serif', color: '#1a1a1a',
              lineHeight: 1.25, mb: 2.5,
            }}>
              Berawal dari Kebun,<br />
              <span style={{ color: '#94BD26' }}>Sampai ke Mejamu</span>
            </Typography>

            {[
              'Buahagia lahir pada tahun 2025, berawal dari kegelisahan sederhana, kenapa buah segar yang enak itu susah didapat dan harganya sering nggak masuk akal? Dari sana, kami mulai membangun sesuatu yang lebih jujur: langsung dari kebun, sampai ke tanganmu.',
              'Kami percaya makan sehat itu bukan soal gaya hidup mahal. Makanya kami pilihkan buah-buah terbaik lokal maupun impor dan pastikan sampai ke kamu dalam kondisi segar, dengan harga yang wajar.',
              'Setiap hari kami kurasi dengan teliti, kemas dengan hati-hati, dan kirim secepat mungkin. Bukan sekadar jualan buah — kami ingin jadi bagian kecil dari hidup sehat keluargamu.',
            ].map((p, i) => (
              <Typography key={i} sx={{
                color: '#555', fontSize: '0.92rem', lineHeight: 1.9,
                fontFamily: 'Poppins, sans-serif', mb: 1.5, textAlign: 'justify',
              }}>
                {p}
              </Typography>
            ))}

            <Box sx={{ display: 'flex', gap: 2, mt: 3, flexWrap: 'wrap' }}>
              {[
                { icon: '🌿', label: 'Produk Organik' },
                { icon: '🚚', label: 'Pengiriman Hari Ini' },
                { icon: '💚', label: 'Ramah Lingkungan' },
              ].map((tag, i) => (
                <Box key={i} sx={{
                  display: 'flex', alignItems: 'center', gap: 0.8,
                  backgroundColor: '#f0f7e0',
                  border: '1px solid rgba(148,189,38,0.25)',
                  borderRadius: '999px', px: 2, py: 0.7,
                }}>
                  <span style={{ fontSize: '0.9rem' }}>{tag.icon}</span>
                  <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#64a320', fontFamily: 'Poppins, sans-serif' }}>
                    {tag.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ========== VALUES ========== */}
      <Box ref={valuesRef} className="values-section" sx={{ py: 10, backgroundColor: '#fff', textAlign: 'center' }}>
        <Box sx={{ maxWidth: '1100px', mx: 'auto', px: { xs: 3, md: 6 } }}>
          <Typography sx={{
            display: 'inline-block',
            backgroundColor: 'rgba(148,189,38,0.1)',
            color: '#94BD26', fontSize: '0.8rem', fontWeight: 600,
            px: 2, py: 0.5, borderRadius: '999px', mb: 2,
            fontFamily: 'Poppins, sans-serif',
          }}>
            Nilai-Nilai Kami
          </Typography>
          <Typography sx={{
            fontWeight: 800, fontSize: { xs: '1.8rem', md: '2.4rem' },
            fontFamily: 'Poppins, sans-serif', color: '#1a1a1a', mb: 1,
          }}>
            Kenapa <span style={{ color: '#94BD26' }}>Buahagia?</span>
          </Typography>
          <Typography sx={{
            color: '#888', fontSize: '0.95rem', maxWidth: 480, mx: 'auto',
            lineHeight: 1.8, fontFamily: 'Poppins, sans-serif', mb: 7,
          }}>
            Lebih dari sekadar toko buah, kami adalah mitra kesehatanmu.
          </Typography>

          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)' },
            gap: 3,
          }}>
            {values.map((v, i) => (
              <Box key={i} className="value-card" sx={{
                p: 3.5, borderRadius: '20px', textAlign: 'left',
                border: '1px solid rgba(148,189,38,0.15)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                transition: 'all 0.3s',
                position: 'relative', overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: `0 16px 40px ${v.color}25`,
                  borderColor: v.color,
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0, left: 0,
                  width: '4px', height: '100%',
                  backgroundColor: v.color,
                  borderRadius: '4px 0 0 4px',
                },
              }}>
                <Box sx={{
                  width: 52, height: 52, borderRadius: '14px',
                  backgroundColor: `${v.color}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: v.color, mb: 2,
                  boxShadow: `0 4px 12px ${v.color}25`,
                }}>
                  {v.icon}
                </Box>
                <Typography sx={{
                  fontWeight: 700, fontSize: '1rem',
                  fontFamily: 'Poppins, sans-serif', color: '#1a1a1a', mb: 1,
                }}>
                  {v.title}
                </Typography>
                <Typography sx={{
                  color: '#777', fontSize: '0.88rem',
                  fontFamily: 'Poppins, sans-serif', lineHeight: 1.7,
                }}>
                  {v.desc}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* ========== CTA ========== */}
      <Box sx={{
        py: 10, backgroundColor: '#f8faf3', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(148,189,38,0.08), transparent 70%)',
          pointerEvents: 'none',
        }} />

        <Box sx={{ position: 'relative', zIndex: 1, px: 4 }}>
          <Typography sx={{ fontSize: '3rem', mb: 2 }}>🍉</Typography>
          <Typography sx={{
            fontWeight: 800, fontSize: { xs: '1.8rem', md: '2.5rem' },
            fontFamily: 'Poppins, sans-serif', color: '#1a1a1a', mb: 1.5,
          }}>
            Siap Merasakan<br />
            <span style={{ color: '#94BD26' }}>Kesegaran Buahagia?</span>
          </Typography>
          <Typography sx={{
            color: '#888', fontSize: '0.95rem', maxWidth: 440, mx: 'auto',
            lineHeight: 1.8, fontFamily: 'Poppins, sans-serif', mb: 4,
          }}>
            Bergabunglah dengan pelanggan yang sudah merasakan manfaat buah segar pilihan kami setiap harinya.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button href="/produk" sx={{
              background: 'linear-gradient(135deg, #64a320, #94BD26)',
              color: '#fff', borderRadius: '999px', px: 5, py: 1.5,
              fontWeight: 700, fontSize: '0.95rem',
              fontFamily: 'Poppins, sans-serif', textTransform: 'none',
              boxShadow: '0 8px 24px rgba(148,189,38,0.4)',
              '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 12px 32px rgba(148,189,38,0.5)' },
              transition: 'all 0.3s',
            }}>
              Belanja Sekarang 🛒
            </Button>
            <Button
              href="https://wa.me/6281234567890"
              target="_blank"
              startIcon={<WhatsApp />}
              sx={{
                backgroundColor: 'transparent',
                color: '#94BD26',
                border: '2px solid #94BD26',
                borderRadius: '999px', px: 4, py: 1.5,
                fontWeight: 700, fontSize: '0.95rem',
                fontFamily: 'Poppins, sans-serif', textTransform: 'none',
                '&:hover': { backgroundColor: '#94BD26', color: '#fff', transform: 'translateY(-2px)' },
                transition: 'all 0.3s',
              }}
            >
              Chat WhatsApp
            </Button>
          </Box>
        </Box>
      </Box>

      <Footer />
    </Box>
  )
}

export default TentangKami