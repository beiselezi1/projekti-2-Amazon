
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary(cart) {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  cart.cartItems.forEach(cartItem => {
    const productId = cartItem.productId;
    const product = getProduct(productId);

    productPriceCents += product.priceCents * cartItem.quantity;
    // code above counts products price in cents

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

    shippingPriceCents += deliveryOption.priceCents;
    // code above counts products shipping price in cents
  });

  const priceBeforeTax = productPriceCents + shippingPriceCents;
  // code above counts products price and products shipping price together in cents

  const taxCents = priceBeforeTax * 0.1;
  // code above counts products price's 10% tax price in cents

  const totalCents = priceBeforeTax + taxCents;
  // code above counts pricee befor tax and tax price together in cents

  const paymentSummaryHtml = `
         <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items ():</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(priceBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary
          js-place-order">
            Place your order
          </button>
  `; 

  document.querySelector('.js-payment-summary')
  .innerHTML = paymentSummaryHtml;

  document.querySelector('.js-place-order').addEventListener('click', async () => {
    try{
      const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cart: cart
        })
      });

      const order = await response.json();

      if (!response.ok || order.errorMessage) {
  console.warn(order.errorMessage || 'Order failed');
  return;
}

      addOrder(order);

    } catch (error) {
       console.log('unexpected error. please try again');
    }

    cart.cartItems = [];
    localStorage.setItem('cart', JSON.stringify(cart.cartItems));
    
    window.location.href = 'orders.html';
  });
}