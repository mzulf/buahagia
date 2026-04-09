import express from 'express'
import { products } from '../data/product.js'

const router = express.Router()

// GET semua produk
router.get('/', (req, res) => {
  res.json(products)
})

// GET by category
router.get('/category/:category', (req, res) => {
  const { category } = req.params
  const filtered = products.filter(p => p.category === category)
  res.json(filtered)
})

export default router