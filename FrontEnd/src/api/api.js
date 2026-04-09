const BASE_URL = 'http://localhost:5000/api'

// GET CART
export const getCart = async () => {
  const res = await fetch(`${BASE_URL}/cart`)
  return res.json()
}

// ADD TO CART
export const addToCartAPI = async (item) => {
  const res = await fetch(`${BASE_URL}/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  })
  return res.json()
}

// UPDATE QTY
export const updateCartAPI = async (name, qty) => {
  const res = await fetch(`${BASE_URL}/cart/${name}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ qty }),
  })
  return res.json()
}

// DELETE ITEM
export const deleteCartAPI = async (name) => {
  const res = await fetch(`${BASE_URL}/cart/${name}`, {
    method: 'DELETE',
  })
  return res.json()
}

// CLEAR CART
export const clearCartAPI = async () => {
  const res = await fetch(`${BASE_URL}/cart`, {
    method: 'DELETE',
  })
  return res.json()
}