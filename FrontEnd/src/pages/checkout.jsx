import { useState } from 'react'
import { Box, Typography, Button, TextField, Divider, Radio, RadioGroup, FormControlLabel } from '@mui/material'
import { ArrowBack, LocationOn, Person, Phone, CreditCard, AccountBalanceWallet, LocalShipping, CheckCircle, ElectricBike } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Navbar from '../components/navbar'

function Checkout() {
  const navigate = useNavigate()
  const { cartItems, totalPrice, clearCart } = useCart()

  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('transfer')
  const [ewalletProvider, setEwalletProvider] = useState('gopay')
  const [shippingMethod, setShippingMethod] = useState('regular')
  const [form, setForm] = useState({ nama: '', telepon: '', alamat: '', kota: '', catatan: '' })

  const formatRupiah = (num) => 'Rp. ' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  const shippingCost = shippingMethod === 'instant' ? 15000 : 0
  const total = totalPrice + shippingCost

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const isFormValid = form.nama && form.telepon && form.alamat && form.kota

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      fontFamily: 'Poppins, sans-serif',
      fontSize: '0.9rem',
      '& fieldset': { borderColor: 'rgba(148,189,38,0.3)' },
      '&:hover fieldset': { borderColor: '#94BD26' },
      '&.Mui-focused fieldset': { borderColor: '#94BD26', borderWidth: 2 },
    },
    '& .MuiInputLabel-root': {
      fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem',
      '&.Mui-focused': { color: '#94BD26' },
    },
  }

  const ewalletOptions = [
    { id: 'gopay', label: 'GoPay', color: '#00AED6', qrColor: '#00AED6' },
    { id: 'ovo', label: 'OVO', color: '#4C3494', qrColor: '#4C3494' },
    { id: 'dana', label: 'DANA', color: '#108EE9', qrColor: '#108EE9' },
    { id: 'shopeepay', label: 'ShopeePay', color: '#EE4D2D', qrColor: '#EE4D2D' },
  ]

  const bankOptions = [
    { bank: 'BCA', norek: '1234567890', nama: 'Buahagia Store', color: '#003D79' },
    { bank: 'Mandiri', norek: '0987654321', nama: 'Buahagia Store', color: '#003087' },
    { bank: 'BNI', norek: '1122334455', nama: 'Buahagia Store', color: '#F77F00' },
    { bank: 'BRI', norek: '5566778899', nama: 'Buahagia Store', color: '#00529B' },
    { bank: 'BSI', norek: '6677889900', nama: 'Buahagia Store', color: '#4CAF50' },
  ]

  // QR Code SVG generator (simple visual QR pattern)
  const QRCode = ({ provider }) => {
    const providerInfo = ewalletOptions.find(e => e.id === provider)
    const color = providerInfo?.qrColor || '#000'
    const pattern = [
      [1,1,1,1,1,1,1,0,1,0,1,1,0,0,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,1,0,0,1,0,0,1,0,1,0,0,0,0,0,1],
      [1,0,1,1,1,0,1,0,1,0,1,0,0,0,1,0,1,1,1,0,1],
      [1,0,1,1,1,0,1,0,0,1,1,0,1,0,1,0,1,1,1,0,1],
      [1,0,1,1,1,0,1,0,1,1,0,1,0,0,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
      [0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0],
      [1,0,1,1,0,1,1,1,0,1,1,0,1,1,1,0,1,1,0,1,0],
      [0,1,0,0,1,0,0,0,1,0,0,1,0,1,0,1,0,0,1,0,1],
      [1,1,1,0,1,1,1,1,0,1,1,0,1,0,1,1,1,0,1,1,0],
      [0,0,1,0,0,1,0,1,1,0,0,1,0,1,0,0,1,0,0,1,0],
      [1,0,1,1,0,0,1,0,1,1,0,0,1,0,1,1,0,1,0,0,1],
      [0,0,0,0,0,0,0,0,1,0,1,1,0,0,0,1,0,1,1,0,0],
      [1,1,1,1,1,1,1,0,0,1,0,0,1,0,1,0,1,0,0,1,1],
      [1,0,0,0,0,0,1,0,1,0,1,0,0,1,0,1,0,1,0,0,1],
      [1,0,1,1,1,0,1,0,0,1,0,1,1,0,1,0,1,0,1,1,0],
      [1,0,1,1,1,0,1,0,1,0,1,0,0,1,0,1,0,0,0,1,0],
      [1,0,1,1,1,0,1,0,0,1,0,0,1,0,1,1,0,1,0,0,1],
      [1,0,0,0,0,0,1,0,1,0,1,1,0,0,0,0,1,0,1,0,0],
      [1,1,1,1,1,1,1,0,0,1,0,0,1,1,1,0,0,1,0,1,1],
    ]
    const size = 21
    const cellSize = 8
    const totalSize = size * cellSize

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Box sx={{
          p: 2, backgroundColor: '#fff', borderRadius: '16px',
          boxShadow: `0 8px 32px ${color}33`,
          border: `2px solid ${color}22`,
        }}>
          <svg width={totalSize} height={totalSize} viewBox={`0 0 ${totalSize} ${totalSize}`}>
            {pattern.map((row, ri) =>
              row.map((cell, ci) =>
                cell ? (
                  <rect
                    key={`${ri}-${ci}`}
                    x={ci * cellSize} y={ri * cellSize}
                    width={cellSize - 1} height={cellSize - 1}
                    rx={1}
                    fill={color}
                  />
                ) : null
              )
            )}
          </svg>
        </Box>
        <Typography sx={{ fontSize: '0.82rem', color: '#888', fontFamily: 'Poppins, sans-serif', textAlign: 'center' }}>
          Scan QR ini dengan aplikasi <strong style={{ color }}>{providerInfo?.label}</strong>
        </Typography>
        <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: '#1a1a1a', fontFamily: 'Poppins, sans-serif' }}>
          {formatRupiah(total)}
        </Typography>
      </Box>
    )
  }

  // ===== STEP 3: SUCCESS =====
  if (step === 3) {
    return (
      <Box sx={{ fontFamily: "'Poppins', sans-serif", backgroundColor: '#f5f5ee' }}>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <Navbar />

        <Box sx={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          pt: '120px', pb: 10,
          px: 4, textAlign: 'center',
        }}>
          {/* SUCCESS ICON */}
          <Box sx={{
            width: 110, height: 110, borderRadius: '50%',
            background: 'linear-gradient(135deg, #94BD26, #0CF876)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 40px rgba(148,189,38,0.45)',
            mb: 3,
            animation: 'pop 0.5s cubic-bezier(.17,.67,.35,1.3) forwards',
            '@keyframes pop': {
              '0%': { transform: 'scale(0)', opacity: 0 },
              '80%': { transform: 'scale(1.1)' },
              '100%': { transform: 'scale(1)', opacity: 1 },
            }
          }}>
            <CheckCircle sx={{ fontSize: 60, color: '#fff' }} />
          </Box>

          <Typography sx={{ fontWeight: 800, fontSize: { xs: '1.6rem', md: '2rem' }, fontFamily: 'Poppins, sans-serif', color: '#1a1a1a', mb: 1 }}>
            Pesanan Berhasil! 🎉
          </Typography>
          <Typography sx={{ color: '#666', fontSize: '0.95rem', fontFamily: 'Poppins, sans-serif', maxWidth: 400, lineHeight: 1.8, mb: 4 }}>
            Terima kasih <strong>{form.nama}</strong>! Pesananmu sedang diproses dan akan segera dikirim.
          </Typography>

          {/* RECEIPT CARD */}
          <Box sx={{
            backgroundColor: '#fff', borderRadius: '24px', p: { xs: 3, md: 4 },
            boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
            border: '1px solid rgba(148,189,38,0.15)',
            maxWidth: 400, width: '100%', mb: 4,
          }}>
            {/* DOTTED TOP */}
            <Box sx={{ borderTop: '2px dashed rgba(148,189,38,0.3)', mb: 2.5 }} />

            {[
              { label: 'Nama', value: form.nama },
              { label: 'No. HP', value: form.telepon },
              { label: 'Alamat', value: `${form.alamat}, ${form.kota}` },
              { label: 'Pengiriman', value: shippingMethod === 'instant' ? 'Instant (Same Day)' : 'Regular (1-2 hari)' },
              { label: 'Pembayaran', value: paymentMethod === 'transfer' ? 'Transfer Bank' : paymentMethod === 'cod' ? 'COD' : `E-Wallet (${ewalletOptions.find(e => e.id === ewalletProvider)?.label})` },
            ].map((r, i) => (
              <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5, alignItems: 'flex-start' }}>
                <Typography sx={{ fontSize: '0.8rem', color: '#aaa', fontFamily: 'Poppins, sans-serif', flexShrink: 0, minWidth: 90 }}>
                  {r.label}
                </Typography>
                <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#1a1a1a', fontFamily: 'Poppins, sans-serif', textAlign: 'right', ml: 2 }}>
                  {r.value}
                </Typography>
              </Box>
            ))}

            <Box sx={{ borderTop: '2px dashed rgba(148,189,38,0.3)', my: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ fontWeight: 800, fontSize: '1rem', fontFamily: 'Poppins, sans-serif', color: '#1a1a1a' }}>
                Total Bayar
              </Typography>
              <Typography sx={{ fontWeight: 800, fontSize: '1.25rem', fontFamily: 'Poppins, sans-serif', color: '#94BD26' }}>
                {formatRupiah(total)}
              </Typography>
            </Box>
          </Box>

          <Button onClick={() => { clearCart(); navigate('/') }} sx={{
            background: 'linear-gradient(135deg, #64a320, #94BD26)',
            color: '#fff', borderRadius: '999px', px: 5, py: 1.5,
            fontWeight: 700, fontSize: '0.95rem', fontFamily: 'Poppins, sans-serif',
            textTransform: 'none',
            boxShadow: '0 8px 24px rgba(148,189,38,0.4)',
            '&:hover': { background: 'linear-gradient(135deg, #4e8018, #7aa320)', transform: 'translateY(-2px)' },
            transition: 'all 0.3s',
          }}>
            Kembali ke Beranda
          </Button>
        </Box>
      </Box>
    )
  }

  return (
    <Box sx={{ fontFamily: "'Poppins', sans-serif", minHeight: '100vh', backgroundColor: '#f5f5ee' }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <Navbar />

      <Box sx={{ maxWidth: '1000px', mx: 'auto', px: { xs: 2, md: 4 }, pt: '120px', pb: 10 }}>

        {/* BACK */}
        <Box sx={{ mb: 3 }}>
          <Button
            onClick={() => step === 1 ? navigate('/keranjang') : setStep(1)}
            startIcon={<ArrowBack />}
            sx={{
              color: '#94BD26', fontFamily: 'Poppins, sans-serif', fontWeight: 600,
              textTransform: 'none', fontSize: '0.9rem',
              '&:hover': { backgroundColor: 'rgba(148,189,38,0.08)' },
            }}
          >
            {step === 1 ? 'Keranjang' : 'Kembali'}
          </Button>
        </Box>

        {/* STEPPER */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 5, maxWidth: 400 }}>
          {[{ num: 1, label: 'Pengiriman' }, { num: 2, label: 'Pembayaran' }, { num: 3, label: 'Selesai' }].map((s, i) => (
            <Box key={i} sx={{ display: 'flex', alignItems: 'center', flex: i < 2 ? 1 : 'none' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                <Box sx={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: step >= s.num ? 'linear-gradient(135deg, #64a320, #94BD26)' : 'rgba(148,189,38,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '0.85rem',
                  color: step >= s.num ? '#fff' : '#94BD26',
                  fontFamily: 'Poppins, sans-serif',
                  boxShadow: step >= s.num ? '0 4px 12px rgba(148,189,38,0.4)' : 'none',
                  transition: 'all 0.3s',
                }}>
                  {s.num}
                </Box>
                <Typography sx={{ fontSize: '0.72rem', color: step >= s.num ? '#94BD26' : '#aaa', fontFamily: 'Poppins, sans-serif', fontWeight: 600, whiteSpace: 'nowrap' }}>
                  {s.label}
                </Typography>
              </Box>
              {i < 2 && (
                <Box sx={{
                  flex: 1, height: 2, mx: 1, mb: 2.5,
                  background: step > s.num ? 'linear-gradient(90deg, #64a320, #94BD26)' : 'rgba(148,189,38,0.2)',
                  borderRadius: 2, transition: 'all 0.4s',
                }} />
              )}
            </Box>
          ))}
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 360px' }, gap: 3, alignItems: 'start' }}>

          {/* LEFT */}
          <Box>

            {/* STEP 1: PENGIRIMAN */}
            {step === 1 && (
              <Box sx={{ backgroundColor: '#fff', borderRadius: '24px', p: { xs: 3, md: 4 }, boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                  <Box sx={{
                    width: 40, height: 40, borderRadius: '12px',
                    background: 'linear-gradient(135deg, #94BD26, #0CF876)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(148,189,38,0.3)',
                  }}>
                    <LocationOn sx={{ color: '#fff', fontSize: 20 }} />
                  </Box>
                  <Typography sx={{ fontWeight: 800, fontSize: '1.1rem', fontFamily: 'Poppins, sans-serif', color: '#1a1a1a' }}>
                    Detail Pengiriman
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                    <TextField label="Nama Lengkap" name="nama" value={form.nama} onChange={handleChange} fullWidth sx={inputSx}
                      InputProps={{ startAdornment: <Person sx={{ color: '#94BD26', mr: 1, fontSize: 20 }} /> }} />
                    <TextField label="No. Telepon" name="telepon" value={form.telepon} onChange={handleChange} fullWidth sx={inputSx}
                      InputProps={{ startAdornment: <Phone sx={{ color: '#94BD26', mr: 1, fontSize: 20 }} /> }} />
                  </Box>
                  <TextField label="Alamat Lengkap" name="alamat" value={form.alamat} onChange={handleChange} fullWidth multiline rows={2} sx={inputSx}
                    InputProps={{ startAdornment: <LocationOn sx={{ color: '#94BD26', mr: 1, fontSize: 20, mt: 0.5, alignSelf: 'flex-start' }} /> }} />
                  <TextField label="Kota / Kecamatan" name="kota" value={form.kota} onChange={handleChange} fullWidth sx={inputSx} />
                  <TextField label="Catatan untuk penjual (opsional)" name="catatan" value={form.catatan} onChange={handleChange} fullWidth multiline rows={2} sx={inputSx} />
                </Box>

                {/* METODE PENGIRIMAN */}
                <Box sx={{ mt: 3 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', fontFamily: 'Poppins, sans-serif', color: '#1a1a1a', mb: 1.5 }}>
                    Metode Pengiriman
                  </Typography>

                  {[
                    {
                      id: 'regular',
                      icon: <LocalShipping sx={{ color: '#fff', fontSize: 22 }} />,
                      iconBg: 'linear-gradient(135deg, #94BD26, #0CF876)',
                      title: 'Pengiriman Regular',
                      desc: 'Estimasi 1–2 hari kerja',
                      price: 'GRATIS',
                      priceColor: '#0CF876',
                    },
                    {
                      id: 'instant',
                      icon: <ElectricBike sx={{ color: '#fff', fontSize: 22 }} />,
                      iconBg: 'linear-gradient(135deg, #f59e0b, #f97316)',
                      title: 'Instant (Same Day)',
                      desc: 'Estimasi 2–4 jam • Seperti GoSend / ShopeeExpress',
                      price: formatRupiah(15000),
                      priceColor: '#f97316',
                    },
                  ].map((opt) => (
                    <Box
                      key={opt.id}
                      onClick={() => setShippingMethod(opt.id)}
                      sx={{
                        border: `2px solid ${shippingMethod === opt.id ? '#94BD26' : 'rgba(148,189,38,0.2)'}`,
                        borderRadius: '14px', p: 2, mb: 1.5,
                        display: 'flex', alignItems: 'center', gap: 2,
                        cursor: 'pointer',
                        background: shippingMethod === opt.id ? 'rgba(148,189,38,0.06)' : '#fff',
                        transition: 'all 0.25s',
                        '&:hover': { borderColor: '#94BD26' },
                      }}
                    >
                      <Box sx={{
                        width: 42, height: 42, borderRadius: '10px',
                        background: opt.iconBg,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        {opt.icon}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', fontFamily: 'Poppins, sans-serif', color: '#1a1a1a' }}>
                          {opt.title}
                        </Typography>
                        <Typography sx={{ fontSize: '0.75rem', color: '#888', fontFamily: 'Poppins, sans-serif' }}>
                          {opt.desc}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography sx={{ fontWeight: 800, color: opt.priceColor, fontSize: '0.88rem', fontFamily: 'Poppins, sans-serif', whiteSpace: 'nowrap' }}>
                          {opt.price}
                        </Typography>
                        <Radio
                          checked={shippingMethod === opt.id}
                          sx={{ color: 'rgba(148,189,38,0.4)', '&.Mui-checked': { color: '#94BD26' }, p: 0 }}
                        />
                      </Box>
                    </Box>
                  ))}
                </Box>

                <Button fullWidth disabled={!isFormValid} onClick={() => setStep(2)} sx={{
                  mt: 3,
                  background: isFormValid ? 'linear-gradient(135deg, #64a320, #94BD26)' : '#e0e0e0',
                  color: isFormValid ? '#fff' : '#aaa',
                  borderRadius: '999px', py: 1.6,
                  fontWeight: 700, fontSize: '1rem', fontFamily: 'Poppins, sans-serif',
                  textTransform: 'none',
                  boxShadow: isFormValid ? '0 8px 24px rgba(148,189,38,0.35)' : 'none',
                  '&:hover': isFormValid ? { background: 'linear-gradient(135deg, #4e8018, #7aa320)', transform: 'translateY(-2px)' } : {},
                  transition: 'all 0.3s',
                }}>
                  Lanjut ke Pembayaran →
                </Button>
              </Box>
            )}

            {/* STEP 2: PEMBAYARAN */}
            {step === 2 && (
              <Box sx={{ backgroundColor: '#fff', borderRadius: '24px', p: { xs: 3, md: 4 }, boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                  <Box sx={{
                    width: 40, height: 40, borderRadius: '12px',
                    background: 'linear-gradient(135deg, #94BD26, #0CF876)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(148,189,38,0.3)',
                  }}>
                    <CreditCard sx={{ color: '#fff', fontSize: 20 }} />
                  </Box>
                  <Typography sx={{ fontWeight: 800, fontSize: '1.1rem', fontFamily: 'Poppins, sans-serif', color: '#1a1a1a' }}>
                    Metode Pembayaran
                  </Typography>
                </Box>

                <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                  {[
                    { value: 'transfer', icon: <CreditCard sx={{ color: '#94BD26' }} />, title: 'Transfer Bank', desc: 'BCA / Mandiri / BNI / BRI / BSI' },
                    { value: 'ewallet', icon: <AccountBalanceWallet sx={{ color: '#94BD26' }} />, title: 'Dompet Digital', desc: 'GoPay / OVO / DANA / ShopeePay' },
                    { value: 'cod', icon: <LocalShipping sx={{ color: '#94BD26' }} />, title: 'COD (Bayar di Tempat)', desc: 'Bayar saat barang sampai' },
                  ].map((opt) => (
                    <Box key={opt.value} onClick={() => setPaymentMethod(opt.value)} sx={{
                      border: `2px solid ${paymentMethod === opt.value ? '#94BD26' : 'rgba(148,189,38,0.2)'}`,
                      borderRadius: '14px', p: 2, mb: 1.5,
                      display: 'flex', alignItems: 'center', gap: 2,
                      cursor: 'pointer',
                      background: paymentMethod === opt.value ? 'rgba(148,189,38,0.06)' : '#fff',
                      transition: 'all 0.25s',
                      '&:hover': { borderColor: '#94BD26' },
                    }}>
                      <Box sx={{ width: 42, height: 42, borderRadius: '10px', backgroundColor: 'rgba(148,189,38,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {opt.icon}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', fontFamily: 'Poppins, sans-serif', color: '#1a1a1a' }}>{opt.title}</Typography>
                        <Typography sx={{ fontSize: '0.78rem', color: '#888', fontFamily: 'Poppins, sans-serif' }}>{opt.desc}</Typography>
                      </Box>
                      <FormControlLabel value={opt.value} control={<Radio sx={{ color: 'rgba(148,189,38,0.4)', '&.Mui-checked': { color: '#94BD26' } }} />} label="" sx={{ m: 0 }} />
                    </Box>
                  ))}
                </RadioGroup>

                {/* TRANSFER — BANK LIST */}
                {paymentMethod === 'transfer' && (
                  <Box sx={{
                    mt: 1, p: 2.5,
                    background: 'linear-gradient(135deg, rgba(148,189,38,0.06), rgba(12,248,118,0.04))',
                    borderRadius: '16px', border: '1px dashed rgba(148,189,38,0.35)',
                  }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.82rem', fontFamily: 'Poppins, sans-serif', color: '#94BD26', mb: 1.5, letterSpacing: '0.04em' }}>
                      Rekening Tujuan
                    </Typography>
                    {bankOptions.map((r, i) => (
                      <Box key={i} sx={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        py: 1.2, borderBottom: i < bankOptions.length - 1 ? '1px solid rgba(148,189,38,0.1)' : 'none',
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Box sx={{
                            backgroundColor: r.color, borderRadius: '6px',
                            px: 1, py: 0.3, minWidth: 44, textAlign: 'center',
                          }}>
                            <Typography sx={{ fontSize: '0.7rem', fontWeight: 800, color: '#fff', fontFamily: 'Poppins, sans-serif' }}>
                              {r.bank}
                            </Typography>
                          </Box>
                          <Typography sx={{ fontSize: '0.85rem', color: '#1a1a1a', fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                            {r.norek}
                          </Typography>
                        </Box>
                        <Typography sx={{ fontSize: '0.78rem', color: '#666', fontFamily: 'Poppins, sans-serif' }}>
                          {r.nama}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}

                {/* EWALLET — PROVIDER TABS + QR */}
                {paymentMethod === 'ewallet' && (
                  <Box sx={{ mt: 1 }}>
                    {/* PROVIDER SELECTOR */}
                    <Box sx={{ display: 'flex', gap: 1.5, mb: 3, flexWrap: 'wrap' }}>
                      {ewalletOptions.map((opt) => (
                        <Box
                          key={opt.id}
                          onClick={() => setEwalletProvider(opt.id)}
                          sx={{
                            px: 2.5, py: 1,
                            borderRadius: '999px',
                            border: `2px solid ${ewalletProvider === opt.id ? opt.color : 'rgba(0,0,0,0.1)'}`,
                            backgroundColor: ewalletProvider === opt.id ? `${opt.color}15` : '#fff',
                            cursor: 'pointer',
                            fontWeight: 700,
                            fontSize: '0.82rem',
                            fontFamily: 'Poppins, sans-serif',
                            color: ewalletProvider === opt.id ? opt.color : '#888',
                            transition: 'all 0.2s',
                            '&:hover': { borderColor: opt.color, color: opt.color },
                          }}
                        >
                          {opt.label}
                        </Box>
                      ))}
                    </Box>

                    {/* QR DISPLAY */}
                    <Box sx={{
                      p: 3,
                      background: 'linear-gradient(135deg, #fafafa, #f5f5f5)',
                      borderRadius: '16px',
                      border: '1px solid rgba(0,0,0,0.06)',
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                    }}>
                      <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', fontFamily: 'Poppins, sans-serif', color: '#1a1a1a', mb: 2 }}>
                        Scan untuk membayar
                      </Typography>
                      <QRCode provider={ewalletProvider} />
                      <Typography sx={{ fontSize: '0.75rem', color: '#aaa', fontFamily: 'Poppins, sans-serif', mt: 2, textAlign: 'center' }}>
                        QR code berlaku selama 15 menit • Jangan bagikan ke siapapun
                      </Typography>
                    </Box>
                  </Box>
                )}

                <Button fullWidth onClick={() => setStep(3)} sx={{
                  mt: 3,
                  background: 'linear-gradient(135deg, #64a320, #94BD26)',
                  color: '#fff', borderRadius: '999px', py: 1.6,
                  fontWeight: 700, fontSize: '1rem', fontFamily: 'Poppins, sans-serif',
                  textTransform: 'none',
                  boxShadow: '0 8px 24px rgba(148,189,38,0.35)',
                  '&:hover': { background: 'linear-gradient(135deg, #4e8018, #7aa320)', transform: 'translateY(-2px)' },
                  transition: 'all 0.3s',
                }}>
                  Konfirmasi Pesanan ✓
                </Button>
              </Box>
            )}
          </Box>

          {/* RIGHT — ORDER SUMMARY */}
          <Box sx={{
            backgroundColor: '#fff', borderRadius: '24px', p: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
            position: 'sticky', top: '110px',
          }}>
            <Typography sx={{ fontWeight: 800, fontSize: '1rem', fontFamily: 'Poppins, sans-serif', mb: 2.5, color: '#1a1a1a' }}>
              Ringkasan Pesanan
            </Typography>

            <Box sx={{
              maxHeight: 200, overflowY: 'auto', pr: 0.5,
              '&::-webkit-scrollbar': { width: 4 },
              '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(148,189,38,0.3)', borderRadius: 4 },
            }}>
              {cartItems.map((item, i) => {
                const price = parseInt(item.price.replace(/[^0-9]/g, ''))
                return (
                  <Box key={i} sx={{ display: 'flex', gap: 1.5, mb: 2, alignItems: 'center' }}>
                    <Box sx={{ width: 44, height: 44, borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
                      <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, fontFamily: 'Poppins, sans-serif', color: '#1a1a1a' }}>
                        {item.name}
                      </Typography>
                      <Typography sx={{ fontSize: '0.75rem', color: '#aaa', fontFamily: 'Poppins, sans-serif' }}>x{item.qty}</Typography>
                    </Box>
                    <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, fontFamily: 'Poppins, sans-serif', color: '#94BD26' }}>
                      {formatRupiah(price * item.qty)}
                    </Typography>
                  </Box>
                )
              })}
            </Box>

            <Divider sx={{ my: 2, borderColor: 'rgba(148,189,38,0.15)' }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography sx={{ fontSize: '0.85rem', color: '#888', fontFamily: 'Poppins, sans-serif' }}>Subtotal</Typography>
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, fontFamily: 'Poppins, sans-serif', color: '#1a1a1a' }}>
                {formatRupiah(totalPrice)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography sx={{ fontSize: '0.85rem', color: '#888', fontFamily: 'Poppins, sans-serif' }}>Ongkos Kirim</Typography>
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, fontFamily: 'Poppins, sans-serif', color: shippingCost === 0 ? '#0CF876' : '#f97316' }}>
                {shippingCost === 0 ? 'GRATIS' : formatRupiah(shippingCost)}
              </Typography>
            </Box>

            <Divider sx={{ borderColor: 'rgba(148,189,38,0.15)' }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
              <Typography sx={{ fontWeight: 800, fontSize: '1rem', fontFamily: 'Poppins, sans-serif', color: '#1a1a1a' }}>Total</Typography>
              <Typography sx={{ fontWeight: 800, fontSize: '1.3rem', fontFamily: 'Poppins, sans-serif', color: '#94BD26' }}>
                {formatRupiah(total)}
              </Typography>
            </Box>

            {step === 2 && form.nama && (
              <>
                <Divider sx={{ my: 2, borderColor: 'rgba(148,189,38,0.15)' }} />
                <Typography sx={{ fontSize: '0.72rem', color: '#aaa', fontFamily: 'Poppins, sans-serif', mb: 1, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Dikirim ke
                </Typography>
                <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, fontFamily: 'Poppins, sans-serif', color: '#1a1a1a' }}>{form.nama}</Typography>
                <Typography sx={{ fontSize: '0.82rem', color: '#666', fontFamily: 'Poppins, sans-serif', mt: 0.3 }}>{form.alamat}, {form.kota}</Typography>
                <Typography sx={{ fontSize: '0.82rem', color: '#666', fontFamily: 'Poppins, sans-serif' }}>{form.telepon}</Typography>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Checkout