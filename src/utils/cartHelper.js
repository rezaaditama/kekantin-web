// Get cart from localstorage
export const getCart = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = (product, note) => {
  const cart = getCart();

  //   if existing product
  const existingItemIndex = cart.findIndex(
    (item) => item.product_id === product.product_id && item.note === note
  );

  if (existingItemIndex > -1) {
    //if existing product, qty + 1
    cart[existingItemIndex].quantity += 1;
  } else {
    // new product
    cart.push({
      product_id: product.product_id,
      name: product.name,
      price: product.price,
      image: product.image,
      note: note,
      quantity: 1,
    });
  }

  //   set storage
  localStorage.setItem('cart', JSON.stringify(cart));

  // update navbar
  window.dispatchEvent(new Event('cartUpdated'));
};
