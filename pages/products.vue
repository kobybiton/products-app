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
    products() {
      let products = Object.values(this.$store.state.products);

      if (this.category) {
        products = products.filter(p => p.categoryId == this.category);
      }

      if (this.search?.length) {
        products = products.filter(p => p.name.toLowerCase().includes(this.search.toLowerCase()));
      }

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
      this.product = { ...this.$store.state.products[id] };
      this.editing = true;
    }
  }
}
</script>
