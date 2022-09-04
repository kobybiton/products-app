<template>
  <b-container>
    <b-form-row style="padding: 5px 0">
      <b-col v-for="p of products" :key="p.id" md="3" style="padding: 5px">
        <Product :product="p" @edit="$emit('edit', p.id)" />
      </b-col>
    </b-form-row>
  </b-container>
</template>

<script>
export default {
  name: "ItemGrid",
  props: {
    products: Array,
    product: Object
  }
}
</script>
