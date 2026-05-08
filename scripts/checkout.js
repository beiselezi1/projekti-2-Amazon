import { renderCheckout } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { cart } from "../data/cart-class.js";
import { loadProductsFetch } from "../data/products.js";
// import '../data/car.js'
// import '../data/backend-practice.js'

async function loadPage() {
  try {
    // throw 'error1'
    await loadProductsFetch();

    await new Promise((resolve, reject) => {
      // throw 'error2'
      cart.loadCart(() => {
        // reject('error3)
        resolve();
      });
    });
  } catch (error) {
    console.log(`Unexpected error. Please try again later. ${error}`);
  }

  renderAll();
}
loadPage()
/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    })
]).then(() => {
  renderAll();
});
*/

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  });
}).then(() => {
  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });
}).then(() => {
  renderAll();
});
*/
/*
loadProducts(() => {
  loadCart(() => {
    renderAll();
  });
});
*/

export function renderAll() {
  renderCheckout(cart);
  renderPaymentSummary(cart);
  renderCheckoutHeader(cart);
}