export function Cart(localStorageKey) {

  const cart = {
  cartItems: undefined,

  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1',
    }, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2',
    }];
  },

  saveToStorage() {
    localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
  },

  addToCart(productId, itemQuantity = 1) {
      const matchingItem = this.cartItems.find(cartItem => productId === cartItem.productId);

      if(matchingItem) {
        matchingItem.quantity += itemQuantity;
      } else {
        this.cartItems.push({
        productId,
        quantity: itemQuantity,
        deliveryOptionId: '1',
        });
      }
      this.saveToStorage();
  },

  removeFromCart(productId) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.productId !== productId);
    this.saveToStorage();
  },
  
  calculateCartQuantity() {
    let cartQuantity = 0;
    this.cartItems.forEach(cartItem => {
      cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
  },

  updateQuantity(productId, input) {
    this.cartItems.forEach(cartItem => {
      if(productId === cartItem.productId) {
        cartItem.quantity = input;
        this.saveToStorage();
      }
    });
  },

  handleSaveQuantity(productId, container) {
    const inputs = container.querySelector('.quantity-input');
    const input =Number(inputs.value.trim());
    const quantityLabel = container.querySelector('.quantity-label');

    if(isNaN(input)) {
      alert('Enter Number only');
      inputs.value = '';
      return;
    } else if(input > 1000) {
      alert('The Number is too big');
      inputs.value = '';
      return;
    } else if(input <= 0) {
      alert('The Number is too small');
      inputs.value = '';
      return;
    } else {
      updateQuantity(productId, input);
      quantityLabel.textContent = input;
      inputs.value = ''
      container.classList.remove('is-editing-quantity');
    }
  },

  updateDeliveryOption (productId, deliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach(cartItem => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem
      }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  },
}
return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);