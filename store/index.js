import CATEGORIES from "./categories.json";
import PRODUCTS from "./products.json";

export const state = () => ({
  // create objects with id key
  categories: Object.fromEntries(CATEGORIES.map(c => [c.id, c])),
  products: Object.fromEntries(PRODUCTS.map(p => [p.id, { ...p, rating: Math.round(Math.random() * 100) }]))
});

export const mutations = {
  // remove product by id
  remove(state, id) {
    const products = { ...state.products };
    delete products[id];
    state.products = products;
  },
  // update product by id
  update(state, product) {
    state.products[product.id] = product;
  }
};
