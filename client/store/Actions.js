export const ACTIONS = {
  NOTIFY: 'NOTIFY',
  AUTH: 'AUTH',
  ADD_CART: 'ADD_CART',
  ADD_MODAL: 'ADD_MODAL',
  ADD_ORDERS: 'ADD_ORDERS',
  ADD_USERS: 'ADD_USERS',
  ADD_CATEGORIES: 'ADD_CATEGORIES',
  DELETE_PRODUCT: 'DELETE_PRODUCT',
  ADD_COURSE: 'ADD_COURSE'
}

export const addCourse = (course) => {
  if(course.spots === 0){
    return ({type: 'NOTIFY', payload: {error: 'There are no more spots'}})
  }

  return ({type: 'ADD_COURSE', payload: course})
}

export const addToCart = (product, cart) => {
  if(product.inStock === 0){
    return ({type: 'NOTIFY', payload: {error: 'This product is not in stock.'}})
  }

  const check = cart.every(item => {
    return item._id !== product._id
  })

  if(!check) {
    return ({type: 'NOTIFY', payload: {error: 'The product has already been added to the cart.'}})
  }
  return ({ type: 'ADD_CART', payload: [...cart, {...product, quantity: 1}]})
}

export const decrease = (data, id) => {
  const newData = [...data]
  newData.forEach(item => {
    if(item._id === id) item.quantity -= 1
  })

  return ({ type: 'ADD_CART', payload: newData})
}

export const increase = (data, id) => {
  const newData = [...data]
  newData.forEach(item => {
    if(item._id === id) item.quantity += 1
  })

  return ({ type: 'ADD_CART', payload: newData})
}

export const deleteItem = (data, id, type) => {
  const newData = data.filter(item => item._id !==id)
  return ({ type, payload: newData })
}

export const updateItem = (data, id, post, type) => {
  const newData = data.map(item => (item._id === id ? post : item))
  return ({ type, payload: newData})
}