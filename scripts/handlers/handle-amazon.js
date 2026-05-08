import { cart } from "../../data/cart-class.js";
import { animateAmazonCart, hoverEffect, animateProductReveal } from "../animations/animate-amazon.js";
import { updateCartQuantity } from "../ui/cart-ui.js";

export function handleAmazon() {
  const state = {
    timeoutIds: {},
    cartUpdateId: null
  };
  document.querySelectorAll('.js-add-to-cart-button').forEach(button => {
    const {productId} = button.dataset;

    const buttonScaling = document.querySelector(`.js-add-to-cart-${productId}`);
    const addedAlert = document.querySelector(`.js-added-to-cart-${productId}`);
    const cartClass = document.querySelector('.cart-quantity');

    button.addEventListener('mouseenter', () => {
        buttonScaling.classList.add('is-hovering');
      });
  
    button.addEventListener('mouseleave', () => {
      buttonScaling.classList.remove('is-hovering');
    });

    button.addEventListener('click', () => {
      const itemQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

      animateAmazonCart(addedAlert, cartClass, productId, state);
      
      setTimeout(() => {
        cart.addToCart(productId, itemQuantity);
        updateCartQuantity();
      }, 400);
    });
  });

  document.querySelectorAll('.js-product-container').forEach(product => {
    const {productId} = product.dataset; // product id set as data in the product container 
    const addImageScaling = product.querySelector(`.js-product-image-container-${productId}`); 

    if(!addImageScaling) return; // safety measure!!

    const hover = hoverEffect(addImageScaling);

    product.addEventListener('mouseenter', hover.enter);
    product.addEventListener('mouseleave', hover.leave);
  });

  animateProductReveal();
}