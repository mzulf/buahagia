import { Box, Typography } from '@mui/material'
import { Phone, LocationOn } from '@mui/icons-material'
import logo from '../assets/images/logo.png'

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        background: 'linear-gradient(180deg, #f8faf7 0%, #eef5ea 100%)',
        borderTop: '1px solid rgba(148,189,38,0.25)',
        overflow: 'hidden',
      }}
    >

      {/* GLOW BACKGROUND */}
      <Box sx={{
        position: 'absolute',
        top: -100,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        height: 300,
        background: 'radial-gradient(circle, rgba(148,189,38,0.15), transparent)',
        filter: 'blur(80px)',
        pointerEvents: 'none'
      }} />

      {/* ================= TOP CONTENT ================= */}
      <Box
        sx={{
          position: 'relative',
          maxWidth: '1280px',
          mx: 'auto',
          px: { xs: 4, md: 8 },
          py: { xs: 8, md: 10 },
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: '2fr 1fr 1.5fr'
          },
          gap: { xs: 6, md: 8 },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >

        {/* ================= BRAND ================= */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: { xs: 'center', md: 'flex-start' },
          gap: 2,
        }}>
          <img
            src={logo}
            alt="Buahagia"
            style={{
              height: 130,
              objectFit: 'contain',
              filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.15))'
            }}
          />

          <Typography sx={{
            fontSize: '0.95rem',
            color: '#555',
            lineHeight: 1.8,
            maxWidth: 340,
          }}>
            Buah segar pilihan dengan kualitas terbaik untuk hidup lebih sehat,
            praktis, dan menyenangkan setiap hari.
          </Typography>

          {/* glow line */}
          <Box sx={{
            width: 70,
            height: 4,
            borderRadius: 2,
            background: 'linear-gradient(90deg, #94BD26, #0CF876)',
            boxShadow: '0 0 15px rgba(148,189,38,0.5)',
          }} />
        </Box>

        {/* ================= LAYANAN ================= */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: { xs: 'center', md: 'flex-start' }
        }}>
          <Typography sx={{
            fontWeight: 800,
            fontSize: '1.05rem',
            color: '#1a1a1a',
            mb: 3,
            textTransform: 'uppercase',
            letterSpacing: 1.5
          }}>
            Layanan
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.8 }}>
            {['Buah Lokal & Impor', 'Parcel Buah', 'Jus Buah'].map((item, i) => (
              <Typography
                key={i}
                sx={{
                  fontSize: '0.95rem',
                  color: '#555',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.3s',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    bottom: -2,
                    width: 0,
                    height: '2px',
                    background: '#94BD26',
                    transition: '0.3s'
                  },
                  '&:hover': {
                    color: '#94BD26',
                    transform: 'translateX(4px)'
                  },
                  '&:hover::after': {
                    width: '100%'
                  }
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* ================= KONTAK ================= */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: { xs: 'center', md: 'flex-start' },
          gap: 4
        }}>

          {/* INFO */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {[{
              icon: <LocationOn />,
              text: 'Pangarangan, Sumenep'
            }, {
              icon: <Phone />,
              text: '0812345678'
            }].map((item, i) => (
              <Box
                key={i}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  transition: '0.3s',
                  '&:hover': { transform: 'translateX(5px)' }
                }}
              >
                <Box sx={{
                  color: '#94BD26',
                  background: 'rgba(148,189,38,0.1)',
                  p: 1,
                  borderRadius: '50%'
                }}>
                  {item.icon}
                </Box>

                <Typography sx={{ fontSize: '0.9rem', color: '#555' }}>
                  {item.text}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* SOSMED */}
          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 1.5
          }}>
            {[
              { label: '@bikin.buahagia' },
              { label: '@buah.agia' }
            ].map((s, i) => (
              <Box
                key={i}
                sx={{
                  px: 2.2,
                  py: 1,
                  borderRadius: '999px',
                  background: 'rgba(255,255,255,0.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(148,189,38,0.2)',
                  color: '#476A07',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
                  '&:hover': {
                    background: '#94BD26',
                    color: '#fff',
                    transform: 'translateY(-4px) scale(1.05)',
                    boxShadow: '0 10px 25px rgba(148,189,38,0.4)',
                  }
                }}
              >
                {s.label}
              </Box>
            ))}
          </Box>

        </Box>
      </Box>

      {/* ================= BOTTOM ================= */}
      <Box sx={{
        py: 3,
        textAlign: 'center',
        background: 'linear-gradient(90deg, #14532d, #4ade80, #0CF876)',
        position: 'relative'
      }}>
        <Typography sx={{
          color: '#fff',
          fontWeight: 600,
          fontSize: '0.75rem',
          letterSpacing: 1.5,
          textTransform: 'uppercase'
        }}>
          © 2026 Buahagia — Made by Zoell
        </Typography>
      </Box>

    </Box>
  )
}

export default Footer