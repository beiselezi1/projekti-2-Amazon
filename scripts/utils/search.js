import { products } from "../../data/products.js";

export function searchUpProduct(renderProductsGrid) {
  const input = document.querySelector('.js-search-bar');
  const button = document.querySelector('.js-search-button');

  if(!input || !button) {
    console.error('search elements not found');
    return;
  }

  button.addEventListener('click', () => {
    filterProducts(input, renderProductsGrid);
  });

  input.addEventListener('keydown', (event) => {
    if(event.key === 'Enter') {
      filterProducts(input, renderProductsGrid);
    }
  });
}
function filterProducts(input, renderProductsGrid) {
  const trimmedInput = input.value.toLowerCase();

  if (!trimmedInput) {
    renderProductsGrid(products);
    return;
  }

  const filteredProducts = products.filter(product => {
    return product.name.toLowerCase().includes(trimmedInput) || product.keywords.some(k => k.toLowerCase().includes(trimmedInput));
  });

  if(filteredProducts.length === 0) {
    document.querySelector('.js-products-grid').innerHTML = '<p class="no-products">No Products matched your search.</p>';
    return;
  }

  renderProductsGrid(filteredProducts)
}