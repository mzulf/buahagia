import { useState, useRef } from 'react'
import { Box, Typography, Button } from '@mui/material'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { useCart } from '../context/CartContext'
import AnimatedGradientBg from '../components/AnimatedGradientBg'

import anggurImg from '../assets/images/anggurmerah.jpeg'
import jerukImg from '../assets/images/jeruk.jpeg'
import alpukatImg from '../assets/images/alpukat.jpeg'
import apelImg from '../assets/images/apelfuji.jpeg'
import delimaImg from '../assets/images/delima.jpeg'
import parcelKecilImg from '../assets/images/parcelkecil.jpeg'
import parcelSedangImg from '../assets/images/parcelsedang.jpeg'
import parcelBesarImg from '../assets/images/parcelbesar.jpeg'
import jusImg from '../assets/images/jus.png'

const buahData = [
  {
    name: 'Anggur Merah',
    price: 'Rp. 50.000',
    unit: '1 kg',
    img: anggurImg,
    description: 'Anggur merah segar manis dengan biji, cocok untuk camilan sehat atau dekorasi buah.',
  },
  {
    name: 'Jeruk',
    price: 'Rp. 30.000',
    unit: '1 kg',
    img: jerukImg,
    description: 'Jeruk segar kaya vitamin C, rasa manis asam yang menyegarkan untuk keluarga.',
  },
  {
    name: 'Alpukat',
    price: 'Rp. 35.000',
    unit: '1 kg',
    img: alpukatImg,
    description: 'Alpukat creamy pilihan, cocok untuk jus, salad, atau dimakan langsung.',
  },
  {
    name: 'Delima',
    price: 'Rp. 45.000',
    unit: '1 kg',
    img: delimaImg,
    description: 'Delima merah kaya antioksidan, biji renyah dengan rasa manis segar yang khas.',
  },
  {
    name: 'Apel Fuji',
    price: 'Rp. 30.000',
    unit: '1 kg',
    img: apelImg,
    description: 'Apel Fuji impor dengan tekstur renyah dan rasa manis legit, segar tiap gigitannya.',
  },
]

const parcelData = [
  {
    name: 'Parcel Kecil',
    price: 'Rp. 20.000',
    img: parcelKecilImg,
    description: 'Paket parcel ekonomis berisi pilihan 3 buah segar, cocok untuk hadiah simpel nan berkesan.',
  },
  {
    name: 'Parcel Sedang',
    price: 'Rp. 30.000',
    img: parcelSedangImg,
    description: 'Parcel menengah dengan 5 jenis buah pilihan, dikemas cantik siap hadir di momen spesialmu.',
  },
  {
    name: 'Parcel Besar',
    price: 'Rp. 40.000',
    img: parcelBesarImg,
    description: 'Parcel premium lengkap 8 buah unggulan, kemasan eksklusif untuk hadiah keluarga atau kolega.',
  },
]

const jusData = [
  {
    name: 'Jus Alpukat',
    price: 'Rp. 12.000',
    img: jusImg,
    description: 'Jus alpukat creamy tanpa bahan pengawet, kaya lemak sehat dan vitamin untuk tubuhmu.',
  },
  {
    name: 'Jus Buah Naga',
    price: 'Rp. 10.000',
    img: jusImg,
    description: 'Jus buah naga segar berwarna merah cerah, kaya antioksidan dan menyegarkan di segala cuaca.',
  },
  {
    name: 'Jus Melon',
    price: 'Rp. 10.000',
    img: jusImg,
    description: 'Jus melon dingin manis alami, cocok untuk meredakan dahaga setelah beraktivitas seharian.',
  },
]

const qtyBtn = {
  width: 26,
  height: 26,
  borderRadius: '50%',
  backgroundColor: '#94BD26',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  fontWeight: 700,
  fontSize: '1rem',
  userSelect: 'none',
  flexShrink: 0,
  '&:hover': { backgroundColor: '#7aa320' },
}

const btn = {
  backgroundColor: '#94BD26',
  color: '#fff',
  borderRadius: '999px',
  textTransform: 'none',
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 600,
  '&:hover': { backgroundColor: '#7aa320' },
}

// ─── Gallery4-style card ───────────────────────────────────────────────────────
function GalleryCard({ item, qty, onAdd, onRemove, onAddToCart }) {
  return (
    <Box
      sx={{
        borderRadius: '18px',
        overflow: 'hidden',
        position: 'relative',
        flexShrink: 0,
        width: '100%',
        boxShadow: '0 6px 24px rgba(0,0,0,0.25)',
        transition: 'box-shadow 0.35s',
        '&:hover': {
          boxShadow: '0 12px 36px rgba(0,0,0,0.4), 0 0 24px rgba(148,189,38,0.35)',
        },
        '&:hover .gallery-img': {
          transform: 'scale(1.05)',
        },
      }}
    >
      {/* Gambar full-bleed */}
      <Box sx={{ height: 360, overflow: 'hidden' }}>
        <Box
          component="img"
          src={item.img}
          alt={item.name}
          className="gallery-img"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.35s ease',
          }}
        />
      </Box>

      {/* Gradient overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, transparent 20%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.93) 100%)',
        }}
      />

      {/* Konten di atas overlay */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          p: 1.8,
          color: '#fff',
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: '1.05rem',
            fontFamily: 'Poppins, sans-serif',
            lineHeight: 1.2,
            textShadow: '0 1px 4px rgba(0,0,0,0.5)',
          }}
        >
          {item.name}
        </Typography>

        <Typography
          sx={{
            fontWeight: 800,
            color: '#94BD26',
            fontSize: '1rem',
            fontFamily: 'Poppins, sans-serif',
            mt: '3px',
            textShadow: '0 1px 4px rgba(0,0,0,0.4)',
          }}
        >
          {item.price}
        </Typography>

        {item.unit && (
          <Typography
            sx={{
              fontSize: '0.78rem',
              color: 'rgba(255,255,255,0.75)',
              fontFamily: 'Poppins, sans-serif',
              mt: '1px',
            }}
          >
            {item.unit}
          </Typography>
        )}

        {item.description && (
          <Typography
            sx={{
              fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.7)',
              fontFamily: 'Poppins, sans-serif',
              mt: 0.8,
              lineHeight: 1.5,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {item.description}
          </Typography>
        )}

        {/* Qty + Keranjang */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1.3 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '999px',
              px: 1.2,
              py: '5px',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255,255,255,0.25)',
            }}
          >
            <Box onClick={onRemove} sx={qtyBtn}>−</Box>
            <Typography
              sx={{
                fontWeight: 700,
                minWidth: 20,
                textAlign: 'center',
                fontFamily: 'Poppins, sans-serif',
                color: '#fff',
                fontSize: '0.9rem',
              }}
            >
              {qty}
            </Typography>
            <Box onClick={onAdd} sx={qtyBtn}>+</Box>
          </Box>

          <Button
            onClick={onAddToCart}
            sx={{ ...btn, flex: 1, fontSize: '0.75rem', py: '7px', px: 1.5, minWidth: 0 }}
          >
            + Keranjang
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

// ─── Carousel khusus Buah ─────────────────────────────────────────────────────
function BuahCarousel({ data, quantities, addQty, removeQty, addToCart }) {
  const scrollRef = useRef()

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({
      left: dir === 'left' ? -310 : 310,
      behavior: 'smooth',
    })
  }

  return (
    <Box>
      {/* Header + tombol navigasi */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          mb: 3,
          gap: 2,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: { xs: '1.4rem', md: '1.8rem' },
              fontWeight: 800,
              color: '#fff',
              fontFamily: 'Poppins, sans-serif',
              lineHeight: 1.2,
            }}
          >
            Buah Segar
          </Typography>
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.6)',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '0.88rem',
              mt: 0.6,
            }}
          >
            Pilih buah favoritmu, langsung segar dari kebun setiap harinya.
          </Typography>
        </Box>

        {/* Tombol Prev & Next */}
        <Box sx={{ display: 'flex', gap: 1.5, flexShrink: 0, pb: '2px' }}>
          <Box
            onClick={() => scroll('left')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              px: 1.8,
              py: 1,
              borderRadius: '999px',
              backgroundColor: 'rgba(255,255,255,0.12)',
              border: '1.5px solid rgba(255,255,255,0.3)',
              cursor: 'pointer',
              color: '#fff',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '0.82rem',
              fontWeight: 600,
              userSelect: 'none',
              transition: 'all 0.2s',
              '&:hover': {
                backgroundColor: '#94BD26',
                borderColor: '#94BD26',
                boxShadow: '0 0 16px rgba(148,189,38,0.5)',
              },
            }}
          >
            <ChevronLeft sx={{ fontSize: '1.1rem' }} />
            Prev
          </Box>
          <Box
            onClick={() => scroll('right')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              px: 1.8,
              py: 1,
              borderRadius: '999px',
              backgroundColor: '#94BD26',
              border: '1.5px solid #94BD26',
              cursor: 'pointer',
              color: '#fff',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '0.82rem',
              fontWeight: 600,
              userSelect: 'none',
              transition: 'all 0.2s',
              boxShadow: '0 4px 14px rgba(148,189,38,0.45)',
              '&:hover': {
                backgroundColor: '#7aa320',
                borderColor: '#7aa320',
                boxShadow: '0 6px 20px rgba(148,189,38,0.6)',
              },
            }}
          >
            Next
            <ChevronRight sx={{ fontSize: '1.1rem' }} />
          </Box>
        </Box>
      </Box>

      {/* Scroll track */}
      <Box
        ref={scrollRef}
        sx={{
          display: 'flex',
          gap: '20px',
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          pb: 2,
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
        }}
      >
        {data.map((item, i) => (
          <Box key={i} sx={{ minWidth: 280, maxWidth: 280 }}>
            <GalleryCard
              item={item}
              qty={quantities[`buah-${i}`] || 1}
              onAdd={() => addQty(`buah-${i}`)}
              onRemove={() => removeQty(`buah-${i}`)}
              onAddToCart={() => addToCart(item, quantities[`buah-${i}`] || 1)}
            />
          </Box>
        ))}
      </Box>

      {/* Dot indicator */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 1.5 }}>
        {data.map((_, i) => (
          <Box
            key={i}
            sx={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              backgroundColor: 'rgba(148,189,38,0.35)',
              border: '1px solid rgba(148,189,38,0.5)',
            }}
          />
        ))}
      </Box>
    </Box>
  )
}

// ─── Grid untuk Parcel & Jus (3 card, muat 1 layar) ──────────────────────────
function GridSection({ title, description, data, quantityKey, quantities, addQty, removeQty, addToCart }) {
  return (
    <Box>
      <Box mb={3}>
        <Typography
          sx={{
            fontSize: { xs: '1.4rem', md: '1.8rem' },
            fontWeight: 800,
            color: '#fff',
            fontFamily: 'Poppins, sans-serif',
            lineHeight: 1.2,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            color: 'rgba(255,255,255,0.6)',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '0.88rem',
            mt: 0.6,
          }}
        >
          {description}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: 3,
        }}
      >
        {data.map((item, i) => (
          <GalleryCard
            key={i}
            item={item}
            qty={quantities[`${quantityKey}-${i}`] || 1}
            onAdd={() => addQty(`${quantityKey}-${i}`)}
            onRemove={() => removeQty(`${quantityKey}-${i}`)}
            onAddToCart={() => addToCart(item, quantities[`${quantityKey}-${i}`] || 1)}
          />
        ))}
      </Box>
    </Box>
  )
}

// ─── Halaman utama ─────────────────────────────────────────────────────────────
function Produk() {
  const [activeTab, setActiveTab] = useState('Buah')
  const [quantities, setQuantities] = useState({})
  const { addToCart } = useCart()

  const addQty = (key) =>
    setQuantities((p) => ({ ...p, [key]: (p[key] || 1) + 1 }))
  const removeQty = (key) =>
    setQuantities((p) => ({ ...p, [key]: Math.max(1, (p[key] || 1) - 1) }))

  const tabs = ['Buah', 'Parcel', 'Jus']

  return (
    <Box sx={{ fontFamily: "'Poppins', sans-serif" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <Navbar />

      <AnimatedGradientBg>
        <Box sx={{ pt: '110px', pb: 10, minHeight: '100vh' }}>
          <Box sx={{ maxWidth: '1100px', mx: 'auto', px: { xs: 3, md: 6 } }}>

            {/* HEADER */}
            <Box textAlign="center" mb={6}>
              <Typography
                sx={{
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  fontWeight: 800,
                  color: '#94BD26',
                  fontFamily: 'Poppins, sans-serif',
                  letterSpacing: '0.04em',
                }}
              >
                PRODUK KAMI
              </Typography>
              <Typography
                sx={{
                  mt: 2,
                  color: 'rgba(255,255,255,0.85)',
                  maxWidth: 500,
                  mx: 'auto',
                  lineHeight: 1.8,
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '0.95rem',
                }}
              >
                Kami menyediakan buah segar berkualitas tinggi, parcel eksklusif,
                dan jus sehat untuk kebutuhan harianmu.
              </Typography>

              {/* TABS */}
              <Box mt={4} display="flex" justifyContent="center" gap={2} flexWrap="wrap">
                {tabs.map((tab) => (
                  <Box
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    sx={{
                      px: 3.5,
                      py: 1,
                      borderRadius: '999px',
                      cursor: 'pointer',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      fontFamily: 'Poppins, sans-serif',
                      border: '2px solid #94BD26',
                      background: activeTab === tab ? '#94BD26' : 'transparent',
                      color: '#fff',
                      transition: 'all 0.25s',
                      boxShadow:
                        activeTab === tab ? '0 0 14px rgba(148,189,38,0.5)' : 'none',
                      '&:hover': { backgroundColor: 'rgba(148,189,38,0.2)' },
                    }}
                  >
                    {tab}
                  </Box>
                ))}
              </Box>
            </Box>

            {/* BUAH — carousel */}
            {activeTab === 'Buah' && (
              <BuahCarousel
                data={buahData}
                quantities={quantities}
                addQty={addQty}
                removeQty={removeQty}
                addToCart={addToCart}
              />
            )}

            {/* PARCEL — grid */}
            {activeTab === 'Parcel' && (
              <GridSection
                title="Paket Parcel"
                description="Parcel buah cantik siap kirim, hadiah terbaik di setiap momen istimewa."
                data={parcelData}
                quantityKey="parcel"
                quantities={quantities}
                addQty={addQty}
                removeQty={removeQty}
                addToCart={addToCart}
              />
            )}

            {/* JUS — grid */}
            {activeTab === 'Jus' && (
              <GridSection
                title="Jus Segar"
                description="Jus buah murni tanpa pengawet, sehat dan menyegarkan untuk harianmu."
                data={jusData}
                quantityKey="jus"
                quantities={quantities}
                addQty={addQty}
                removeQty={removeQty}
                addToCart={addToCart}
              />
            )}

          </Box>
        </Box>
      </AnimatedGradientBg>

      <Footer />
    </Box>
  )
}

export default Produk