export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // Calculate items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // Calculate shipping price - If order is over 20 euro then free, else 2 euro shipping
  state.shippingPrice = addDecimals(state.itemsPrice > 20 ? 0 : 2);

  // Calculate total price
  state.totalPrice = addDecimals(
    Number(state.itemsPrice) + Number(state.shippingPrice)
  );

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
