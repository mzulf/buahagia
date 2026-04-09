import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [isLoaded, setIsLoaded] = useState(false) 

  // 🔥 LOAD dari localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        setCartItems(JSON.parse(savedCart))
      }
    } catch (err) {
      console.log('Load error')
    } finally {
      setIsLoaded(true) 
    }
  }, [])

  // SIMPAN hanya setelah load selesai
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('cart', JSON.stringify(cartItems))
    }
  }, [cartItems, isLoaded])

  const addToCart = (item, qty) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.name === item.name)
      if (existing) {
        return prev.map(i =>
          i.name === item.name ? { ...i, qty: i.qty + qty } : i
        )
      }
      return [...prev, { ...item, qty }]
    })
  }

  const removeFromCart = (name) => {
    setCartItems(prev => prev.filter(i => i.name !== name))
  }

  const updateQty = (name, qty) => {
    if (qty < 1) return removeFromCart(name)
    setCartItems(prev =>
      prev.map(i => i.name === name ? { ...i, qty } : i)
    )
  }

  const clearCart = () => setCartItems([])

  const totalItems = cartItems.reduce((sum, i) => sum + i.qty, 0)

  const totalPrice = cartItems.reduce((sum, i) => {
    const price = parseInt(i.price.replace(/[^0-9]/g, ''))
    return sum + price * i.qty
  }, 0)

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)