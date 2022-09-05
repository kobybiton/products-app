<template>
  <div class="m-5">
    <FilterBar :search.sync="search" :category.sync="category" :sort.sync="sort" />
    <ProductGrid :products="products" @edit="edit" />
    <ProductEdit v-if="product" :product="product" :editing.sync="editing" />
  </div>
</template>

<script>
export default {
  name: 'ProductsPage',
  data: () => ({
    editing: false,
    product: null,
    search: null,
    category: 0,
    sort: "name"
  }),
  computed: {
    // compute products when component is re-rendered
    products() {
      let products = Object.values(this.$store.state.products);
      // filter products by category
      if (this.category) {
        products = products.filter(p => p.categoryId == this.category);
      }
      // filter products by search type
      if (this.search?.length) {
        products = products.filter(p => p.name.toLowerCase().includes(this.search.toLowerCase()));
      }
      // sort products by sort value
      switch (this.sort) {
        case "name":
          products.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "price":
          products.sort((a, b) => a.price - b.price);
          break;
        case "rating":
          products.sort((a, b) => a.rating - b.rating);
          break;
      }

      return products;
    }
  },
  methods: {
    edit(id) {
      // duplicate product to avoid mutating directly
      this.product = { ...this.$store.state.products[id] };
      this.editing = true;
    }
  }
}
</script>
