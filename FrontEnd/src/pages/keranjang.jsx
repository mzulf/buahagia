import { useEffect } from 'react'
import { Box, Typography, Button, IconButton, Divider } from '@mui/material'
import { Delete, Add, Remove, ShoppingCartOutlined, ArrowBack } from '@mui/icons-material'
import { useCart } from '../context/CartContext.jsx'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import Footer from '../components/footer'


// 🔥 API IMPORT
import {
  getCart,
  updateCartAPI,
  deleteCartAPI,
  clearCartAPI
} from '../api/api'

function Keranjang() {
  const { cartItems, removeFromCart, updateQty, clearCart, totalItems, totalPrice } = useCart()
  const navigate = useNavigate()

  const formatRupiah = (num) =>
    'Rp. ' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  // FETCH CART SAAT LOAD
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart()

        data.forEach(item => {
          updateQty(item.name, item.qty)
        })
      } catch (err) {
        console.error('Gagal ambil cart:', err)
      }
    }

    fetchCart()
  }, [])

  return (
    <Box sx={{
      fontFamily: "'Poppins', sans-serif",
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #f7f8f2 0%, #f0f4e4 100%)',
    }}>
      <Navbar />

      <Box sx={{
        maxWidth: '1100px',
        mx: 'auto',
        px: { xs: 2, md: 4 },
        pt: '130px',
        pb: 12,
      }}>

        {/* HEADER */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 5 }}>
     <IconButton 
  onClick={() => navigate('/')} 
  sx={{
    background: '#fff',
    border: '2px solid #94BD26',
    color: '#94BD26',
    transition: 'all 0.3s ease', 
    '&:hover': {
      backgroundColor: '#94BD26',
      color: '#fff',
      transform: 'translateY(-2px)',
    }
  }}
>
  <ArrowBack />
</IconButton>

          <Typography sx={{ fontWeight: 800, fontSize: '1.9rem' }}>
            Keranjang Belanja
          </Typography>

          {totalItems > 0 && (
            <Box sx={{
              background: 'linear-gradient(135deg, #0CF876, #94BD26)',
              borderRadius: '999px',
              px: 2,
              py: 0.4,
              fontWeight: 700,
              fontSize: '0.85rem',
              color: '#064e3b',
            }}>
              {totalItems} item
            </Box>
          )}
        </Box>

        {cartItems.length === 0 ? (
          <Box sx={{
            textAlign: 'center',
            py: 14,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
          }}>
            <Box sx={{
              width: 140,
              height: 140,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #f0f7e0, #e8f5cc)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <ShoppingCartOutlined sx={{ fontSize: 60, color: '#94BD26' }} />
            </Box>

            <Typography sx={{ fontWeight: 800, fontSize: '1.4rem' }}>
              Keranjang masih kosong
            </Typography>

            <Button onClick={() => navigate('/produk')} sx={{
              background: 'linear-gradient(135deg, #94BD26, #64a320)',
              color: '#fff',
              borderRadius: '999px',
              px: 5,
              py: 1.3,
              fontWeight: 700,
            }}>
              Belanja Sekarang
            </Button>
          </Box>
        ) : (

          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 380px' },
            gap: 4,
          }}>

            {/* ITEMS */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Typography onClick={() => {
                  clearCart()
                  clearCartAPI()
                }} sx={{
                  color: '#e53935',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  fontWeight: 600,
                  '&:hover': { textDecoration: 'underline' }
                }}>
                  Hapus Semua
                </Typography>
              </Box>

              {cartItems.map((item, i) => {
                const price = parseInt(item.price.replace(/[^0-9]/g, ''))

                return (
                  <Box key={i} sx={{
                    display: 'flex',
                    gap: 2.5,
                    alignItems: 'center',
                    p: 2.5,
                    borderRadius: '22px',
                    background: 'rgba(255,255,255,0.7)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.5)',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}>
                    
                    <Box sx={{
                      width: 90,
                      height: 90,
                      borderRadius: '16px',
                      overflow: 'hidden',
                    }}>
                      <img src={item.img} alt={item.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Box>

                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontWeight: 700 }}>
                        {item.name}
                      </Typography>

                      <Typography sx={{
                        color: '#94BD26',
                        fontWeight: 700,
                        mt: 0.5
                      }}>
                        {formatRupiah(price * item.qty)}
                      </Typography>
                    </Box>

                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      background: '#f5f9e8',
                      borderRadius: '999px',
                      px: 1,
                    }}>
                      <IconButton onClick={() => {
                        updateQty(item.name, item.qty - 1)
                        updateCartAPI(item.name, item.qty - 1)
                      }} size="small">
                        {item.qty === 1 ? <Delete /> : <Remove />}
                      </IconButton>

                      <Typography sx={{ fontWeight: 700 }}>
                        {item.qty}
                      </Typography>

                      <IconButton onClick={() => {
                        updateQty(item.name, item.qty + 1)
                        updateCartAPI(item.name, item.qty + 1)
                      }} size="small">
                        <Add />
                      </IconButton>
                    </Box>

                    <IconButton onClick={() => {
                      removeFromCart(item.name)
                      deleteCartAPI(item.name)
                    }}>
                      <Delete />
                    </IconButton>
                  </Box>
                )
              })}
            </Box>

            {/* SUMMARY */}
            <Box sx={{
              borderRadius: '26px',
              p: 3.5,
              background: 'rgba(255,255,255,0.75)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.6)',
              position: 'sticky',
              top: '120px',
            }}>
              <Typography sx={{ fontWeight: 800, mb: 2 }}>
                Ringkasan
              </Typography>

              {cartItems.map((item, i) => {
                const price = parseInt(item.price.replace(/[^0-9]/g, ''))
                return (
                  <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography sx={{ fontSize: '0.85rem' }}>
                      {item.name} x{item.qty}
                    </Typography>
                    <Typography sx={{ fontWeight: 600 }}>
                      {formatRupiah(price * item.qty)}
                    </Typography>
                  </Box>
                )
              })}

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                <Typography sx={{ color: '#555', fontSize: '0.9rem' }}>
                  Ongkos Kirim
                </Typography>
                <Typography sx={{ color: '#0CF876', fontWeight: 700, fontSize: '0.9rem' }}>
                  Gratis
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography sx={{ fontWeight: 700 }}>
                  Total
                </Typography>
                <Typography sx={{
                  fontWeight: 800,
                  color: '#94BD26',
                  fontSize: '1.2rem'
                }}>
                  {formatRupiah(totalPrice)}
                </Typography>
              </Box>

              <Button
                fullWidth
                onClick={() => navigate('/checkout')}
                sx={{
                  background: 'linear-gradient(135deg, #94BD26, #64a320)',
                  color: '#fff',
                  borderRadius: '999px',
                  py: 1.4,
                  fontWeight: 700,
                  mb: 1.5,
                  textTransform: 'none',
                }}
              >
                Checkout
              </Button>

              <Button
                fullWidth
                onClick={() => navigate('/produk')}
                sx={{
                  borderRadius: '999px',
                  py: 1.2,
                  fontWeight: 600,
                  color: '#94BD26',
                  border: '1.5px solid rgba(148,189,38,0.4)',
                  textTransform: 'none',
                }}
              >
                + Tambah Produk
              </Button>

            </Box>
          </Box>
        )}
      </Box>

      <Footer />
    </Box>
  )
}

export default Keranjang