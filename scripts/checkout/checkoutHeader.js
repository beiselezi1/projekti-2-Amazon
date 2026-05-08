

export function renderCheckoutHeader(cart) {
  let quantity = 0;
    cart.cartItems.forEach(cartItem => {
      quantity += cartItem.quantity;
    });
  document.querySelector('.js-checkout-products').innerHTML = `Checkout(${quantity})`;
}