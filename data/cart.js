export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) || [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1',
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2',
  }];
}
function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}
export function addToCart(productId, itemQuantity = 1) {
        const matchingItem = cart.find(cartItem => productId === cartItem.productId);

        if(matchingItem) {
          matchingItem.quantity += itemQuantity;
        } else {
          cart.push({
          productId,
          quantity: itemQuantity,
          deliveryOptionId: '1',
          });
        }
        saveToStorage();
    }

export function removeFromCart(productId) {
  cart = cart.filter(cartItem => cartItem.productId !== productId);
  saveToStorage();
}    

export function calculateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach(cartItem => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}

function updateQuantity(productId, input) {
  cart.forEach(cartItem => {
    if(productId === cartItem.productId) {
      cartItem.quantity = input;
      saveToStorage();
    }
  });
}

export function handleSaveQuantity(productId, container) {
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
  };

export function updateDeliveryOption (productId, deliveryOptionId) {
    let matchingItem;

    cart.forEach(cartItem => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem
      }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage();
  }


  export function loadCart(fun) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
      
  
        console.log(xhr.response);
  
        fun();
  
    });
  
    xhr.open('GET', 'https://supersimplebackend.dev/cart');
    xhr.send();
  }