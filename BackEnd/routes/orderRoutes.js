import express from 'express'

const router = express.Router()

let orders = []

// POST order (checkout)
router.post('/', (req, res) => {
  const { items, total } = req.body

  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'Cart kosong!' })
  }

  const newOrder = {
    id: Date.now(),
    items,
    total,
    createdAt: new Date(),
  }

  orders.push(newOrder)

  res.json({
    message: 'Order berhasil!',
    order: newOrder,
  })
})

// GET semua order
router.get('/', (req, res) => {
  res.json(orders)
})

export default router