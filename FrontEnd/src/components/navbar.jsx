import { useState, useEffect, useRef } from 'react'
import {
  AppBar, Toolbar, Box, IconButton,
  Drawer, InputBase, useMediaQuery, Badge
} from '@mui/material'
import { Menu, Search, ShoppingCart, Person } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import { useNavigate, useLocation } from "react-router-dom"
import { gsap } from "gsap"
import { useCart } from '../context/CartContext'
import logo from '../assets/images/logo.png'

const menuItems = [
  { label: 'BERANDA', path: '/' },
  { label: 'PRODUK', path: '/produk' },
  { label: 'TENTANG KAMI', path: '/tentang' }
]

function Navbar() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const navigate = useNavigate()
  const location = useLocation()
  const { totalItems } = useCart()

  const [isScrolled, setIsScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [showNav, setShowNav] = useState(true)

  const indicatorRef = useRef(null)
  const menuRef = useRef([])
  const lastScroll = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY
      setIsScrolled(current > 10)
      if (current > lastScroll.current && current > 100) {
        setShowNav(false)
      } else {
        setShowNav(true)
      }
      lastScroll.current = current
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const activeIndex = menuItems.findIndex(item => item.path === location.pathname)
    if (menuRef.current[activeIndex] && indicatorRef.current) {
      const el = menuRef.current[activeIndex]
      gsap.to(indicatorRef.current, {
        width: el.offsetWidth,
        left: el.offsetLeft,
        duration: 0.4,
        ease: 'power3.out'
      })
    }
  }, [location.pathname])

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          transform: showNav ? 'translateY(0)' : 'translateY(-120%)',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          background: isScrolled ? 'rgba(255,255,255,0.75)' : '#fff',
          transition: 'all 0.4s cubic-bezier(.77,0,.18,1)',
          boxShadow: isScrolled ? '0 20px 40px rgba(0,0,0,0.08)' : 'none',
          borderBottom: '1px solid rgba(148,189,38,0.2)',
        }}
      >
        <Toolbar sx={{
          maxWidth: '1280px',
          mx: 'auto',
          width: '100%',
          px: { xs: 2, md: 6 },
          minHeight: '90px !important',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>

          {/* MENU */}
          {!isMobile ? (
            <Box sx={{ position: 'relative', display: 'flex', gap: 4, flex: 1 }}>
              {menuItems.map((item, i) => {
                const isActive = location.pathname === item.path
                return (
                  <Box
                    key={i}
                    ref={el => (menuRef.current[i] = el)}
                    onClick={() => navigate(item.path)}
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect()
                      const x = e.clientX - rect.left - rect.width / 2
                      gsap.to(e.currentTarget, { x: x * 0.15, duration: 0.3 })
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, { x: 0, duration: 0.4, ease: 'power3.out' })
                    }}
                    sx={{
                      cursor: 'pointer',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      letterSpacing: '0.06em',
                      color: isActive ? '#476A07' : '#94BD26',
                      position: 'relative',
                      transition: 'all 0.25s',
                      '&:hover': {
                        color: '#476A07',
                        textShadow: '0 0 8px rgba(148,189,38,0.6)',
                      }
                    }}
                  >
                    {item.label}
                  </Box>
                )
              })}

              {/* SLIDING INDICATOR */}
              <Box
                ref={indicatorRef}
                sx={{
                  position: 'absolute',
                  bottom: -6,
                  height: 3,
                  borderRadius: 2,
                  background: 'linear-gradient(90deg, #94BD26, #0CF876)',
                  transition: 'all 0.4s cubic-bezier(.77,0,.18,1)',
                }}
              />
            </Box>
          ) : (
            <IconButton onClick={() => setOpen(true)} sx={{ color: '#94BD26' }}>
              <Menu />
            </IconButton>
          )}

          {/* LOGO */}
          <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <img src={logo} alt="logo" style={{ height: isMobile ? '120px' : '140px' }} />
          </Box>

          {/* RIGHT */}
          {!isMobile ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, justifyContent: 'flex-end' }}>
              <Box sx={{
                display: 'flex', alignItems: 'center',
                borderRadius: '999px', px: 2, py: 0.6, gap: 1,
                background: 'rgba(148,189,38,0.08)',
                border: '1px solid rgba(148,189,38,0.25)',
                transition: 'all 0.3s',
                '&:focus-within': {
                  background: '#fff',
                  borderColor: '#94BD26',
                  boxShadow: '0 0 0 3px rgba(148,189,38,0.2)',
                },
              }}>
                <InputBase placeholder="Cari produk..." sx={{ fontSize: '0.85rem', width: 150 }} />
                <Search sx={{ color: '#94BD26' }} />
              </Box>

              {/* CART WITH BADGE */}
              <IconButton
                onClick={() => navigate('/keranjang')}
                sx={{
                  color: '#94BD26',
                  '&:hover': { color: '#476A07', transform: 'translateY(-2px)' }
                }}
              >
                <Badge
                  badgeContent={totalItems}
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: '#0CF876',
                      color: '#064e3b',
                      fontWeight: 700,
                      fontSize: '0.7rem',
                      minWidth: 18,
                      height: 18,
                      fontFamily: 'Poppins, sans-serif',
                    }
                  }}
                >
                  <ShoppingCart />
                </Badge>
              </IconButton>

              <IconButton
                onClick={() => navigate('/auth')}
                sx={{
                  color: '#94BD26',
                  '&:hover': { color: '#476A07', transform: 'translateY(-2px)' }
                }}
              >
                <Person />
              </IconButton>
            </Box>
          ) : (
            <Box sx={{ display: 'flex' }}>
              <IconButton sx={{ color: '#94BD26' }}>
                <Search />
              </IconButton>
              
              <IconButton
                onClick={() => navigate('/keranjang')}
                sx={{ color: '#94BD26' }}
              >
                <Badge
                  badgeContent={totalItems}
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: '#0CF876',
                      color: '#064e3b',
                      fontWeight: 700,
                      fontSize: '0.7rem',
                    }
                  }}
                >
                  <ShoppingCart />
                </Badge>
              </IconButton>

              {/* IKON PERSON DITAMBAHKAN DI SINI UNTUK MODE MOBILE */}
              <IconButton
                onClick={() => navigate('/auth')}
                sx={{ color: '#94BD26' }}
              >
                <Person />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* DRAWER */}
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 260, p: 4 }}>
          <img src={logo} style={{ height: 60 }} alt="logo-drawer" />
          {menuItems.map((item, i) => (
            <Box
              key={i}
              onClick={() => { navigate(item.path); setOpen(false) }}
              sx={{
                mt: 3,
                fontWeight: 700,
                color: location.pathname === item.path ? '#476A07' : '#94BD26',
                cursor: 'pointer',
                '&:hover': { color: '#476A07', transform: 'translateX(4px)' }
              }}
            >
              {item.label}
            </Box>
          ))}
        </Box>
      </Drawer>
    </>
  )
}

export default Navbar