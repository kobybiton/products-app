<template>
  <b-card tag="article" body-class="p-3">
    <b-card-img class="mb-2" :src="product.image" :alt="product.name" />
    <b-card-title class="mb-2" title-tag="p" v-text="product.name" />
    <b-card-text class="mb-2" v-text="`$${product.price.toFixed(2)}`" />
    <b-form-row class="align-items-center" no-gutters>
      <b-col>
        <span class="bg-light p-1" v-text="category" />
      </b-col>
      <b-col class="text-right">
        <b-button href="#" variant="primary" v-text="'Edit'" size="sm" @click="$emit('edit')" />
      </b-col>
    </b-form-row>
  </b-card>
</template>

<script>
export default {
  name: "Item",
  props: {
    product: Object
  },
  computed: {
    category() {
      return this.$store.state.categories[this.product.categoryId].name;
    }
  }
}
</script>
