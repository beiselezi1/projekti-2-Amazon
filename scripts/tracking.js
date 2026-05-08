import { loadProductsFetch, getProduct } from "../data/products.js";
import { orders } from "../data/orders.js";
import dayjs from "./utils/dayjs.js";
import { cart } from "../data/cart-class.js";

async function init() {
  await loadProductsFetch();

  renderTracking();
}
init();

function renderTracking() {
  const url = new URL (window.location.href);

  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');

  const order = orders.find(o => o.id === orderId);
  console.log(order);
  if(!order) {
    console.error('no matching orders found');
    return;
  }

  const orderProduct = order.products.find(p => p.productId === productId);
  console.log(orderProduct);
  if(!orderProduct) {
    console.error('no matching orderProduct found');
    return;
  }

  const product = getProduct(productId);
  if(!product) {
    console.error('no matching product found');
    return;
  }

  const orderTime = dayjs(order.orderTime);
  const deliveryTime = dayjs(orderProduct.estimatedDeliveryTime);
  const now = dayjs();

  const totalTime = deliveryTime.diff(orderTime);
  console.log(totalTime);
  const passedTime = now.diff(orderTime);
  console.log(passedTime);

  let progress = passedTime / totalTime;
  progress = Math.min(Math.max(progress, 0), 1);

  const progressPercent = progress * 100;
  console.log(progressPercent);

  const deliveryTimeString = deliveryTime.format('dddd, MMMM D');

  let statusClass = '';
  let currentIndex = 0;
  let deleteScheduled = false;

  if(progressPercent < 50) {
    statusClass = 'preparing';
    currentIndex = 0;
  } else if (progressPercent < 100) {
    statusClass = 'shipped';
    currentIndex = 1;
  } else {
    statusClass = 'delivered';
    currentIndex = 2;

    if (!deleteScheduled) {
      deleteScheduled = true;

      setTimeout(() => {
        const updatedOrders = orders.filter(o => o.id !== order.id);

        orders.length = 0;
        orders.push(...updatedOrders);

        localStorage.setItem('orders', JSON.stringify(orders));

        window.location.href = 'orders.html';
      }, 3 * 60 * 1000);
    }  
  }

  document.querySelector('.js-order-tracking').innerHTML = `
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          ${deliveryTimeString}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${orderProduct.quantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
          <div class="progress-label js-progress-label">
            Preparing
          </div>
          <div class="progress-label js-progress-label">
            Shipped
          </div>
          <div class="progress-label js-progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
  `;

  const bar = document.querySelector('.progress-bar');

  bar.classList.remove('preparing', 'shipped', 'delivered')
  bar.classList.add(statusClass);

  const labeling = document.querySelectorAll('.js-progress-label');

  labeling.forEach((label, index) => {
    label.classList.remove('current-status');

    if(index === currentIndex) {
      label.classList.add('current-status')
    }
  });

  function updateCartQuantity() {
      const cartQuantity = cart.calculateCartQuantity();
      document.querySelector('.js-cart-quantity').textContent = cartQuantity || '0';
  }
  updateCartQuantity();
}