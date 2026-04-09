import express from 'express'
import cors from 'cors'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

app.get('/', (req, res) => {
  res.send('API Buahagia jalan 🚀')
})

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server running di http://localhost:${PORT}`)
})