export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  
  export const updateCart = (state) => {
    const itemsPrice = state.cartItems.reduce(
      (acc, item) => acc + (item.price * 100 * item.qty) / 100,
      0
    );
    state.itemsPrice = addDecimals(itemsPrice);
  
    const shippingPrice = itemsPrice > 20 ? 0 : 2;
    state.shippingPrice = addDecimals(shippingPrice);
  
    const taxPrice = 0.18 * itemsPrice;
    state.taxPrice = addDecimals(taxPrice);
  
    const totalPrice = itemsPrice + shippingPrice + taxPrice;
    state.totalPrice = addDecimals(totalPrice);
  
    localStorage.setItem('cart', JSON.stringify(state));
  
    return state;
  };