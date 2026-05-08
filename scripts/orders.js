import { orders } from "../data/orders.js";
import {getProduct, loadProductsFetch} from '../data/products.js';
import dayjs from "./utils/dayjs.js";
import { formatCurrency } from "./utils/money.js";
import { cart } from "../data/cart-class.js";

loadProductsFetch().then(() => {
  renderOrders();
});

function renderOrders () {
    
    let ordersHtml = '';
    orders.forEach(order => {
      let productsHtml = '';
      const orderDate = dayjs(order.orderTime);
      const orderdateString = orderDate.format('dddd, MMMM D');
      order.products.forEach(product => {
        const matchingId = getProduct(product.productId);
        if(!matchingId) {
          console.warn('Skipping missing Product', product.productId);
        }

        const arrivingDate = dayjs(product.estimatedDeliveryTime);
        const arrivingDateString = arrivingDate.format('dddd, MMMM D');

        productsHtml += `
          <div class="order-details-grid">
            <div class="product-image-container">
              <img src="${matchingId.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingId.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${arrivingDateString}
              </div>
              <div class="product-quantity">
                Quantity: ${product.quantity}
              </div>
              <button class="buy-again-button button-primary
              js-buy-again-button"
              data-product-id="${product.productId}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message"
                >Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${order.id}&productId=${product.productId}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          </div>
        `;
      });

      ordersHtml += `
        <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderdateString}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>
                 $${formatCurrency(order.totalCostCents)}
                </div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>
               ${order.id}
              </div>
            </div>
          </div>

          ${productsHtml}
      `;
    });

    document.querySelector('.js-order-container').innerHTML = ordersHtml;


    function updateCartQuantity() {
        const cartQuantity = cart.calculateCartQuantity();
        document.querySelector('.js-cart-quantity').textContent = cartQuantity || '0';
    }
    updateCartQuantity();

    document.querySelectorAll('.js-buy-again-button').forEach(button => {
      button.addEventListener('click', () => {
        const {productId} = button.dataset;

        const cartUpdated = document.querySelector('.js-cart-quantity');

        cartUpdated.classList.add('is-updated');

        setTimeout(() => {
          cartUpdated.classList.remove('is-updated');
        }, 400);


        setTimeout(() => {
          cart.addToCart(productId);
          updateCartQuantity();
        }, 400);
      });
    });
}