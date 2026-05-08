export function hoverEffect(addImageScaling) {
  return{
    enter() {
      addImageScaling.classList.add('js-product-image-scaling');  
    },
    leave() {
      addImageScaling.classList.remove('js-product-image-scaling');
    }
  }
}

export function animateProductReveal() {
  document.querySelectorAll('.js-product-is-visible').forEach((container, index) => {
    setTimeout(() => {
      container.classList.add('is-visible');
    }, index * 100);
  });
}

export function animateAmazonCart( addedAlert, cartClass, productId, state) {
  
        if(!addedAlert) return;
        addedAlert.classList.add('js-added');
  
        if(state.timeoutIds[productId]) {
          clearTimeout(state.timeoutIds[productId]);
        }
        if(state.cartUpdateId){
          clearTimeout(state.cartUpdateId);
        }
  
        cartClass.classList.add('is-updated');
        
        state.timeoutIds[productId] = setTimeout(() => {
          addedAlert.classList.remove('js-added');
        },2000);
        state.cartUpdateId = setTimeout(() => {
          cartClass.classList.remove('is-updated');
        }, 400);
}