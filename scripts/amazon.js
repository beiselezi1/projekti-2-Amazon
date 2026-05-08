import { loadProductsFetch } from "../data/products.js";
import { renderProductsGrid } from "./render/render-amazon.js";
import { searchUpProduct } from "./utils/search.js";
import {handleAmazon} from '../scripts/handlers/handle-amazon.js';

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  });
}).then(() => {
  renderProductsGrid();
  handleAmazon();
  searchUpProduct(renderProductsGrid);
});
*/

async function loadPage(){
  try{
    await loadProductsFetch();

    renderProductsGrid();
    handleAmazon();
    searchUpProduct(renderProductsGrid);
  } catch(error) {
    console.log('error encountered! u were the chosen one anakin! you said you will fight not join them');

    document.body.innerHTML = 'Something went wrong. Please try again.';
  }
}
loadPage();

/*
loadProductsFetch().then(() => {
  renderProductsGrid();
  handleAmazon();
  searchUpProduct(renderProductsGrid);
});
*/

/*
loadProducts(() => {
  renderProductsGrid();
  handleAmazon();
  searchUpProduct(renderProductsGrid);
});
*/