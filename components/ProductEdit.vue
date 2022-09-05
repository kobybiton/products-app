<template>
  <b-modal v-model="open" :title="`Edit ${name}`" centered>
    <b-form novalidate>
      <b-form-row class="mb-3">
        <b-col><label for="product-name" v-text="'Name'" /></b-col>
        <b-col>
          <b-form-input v-model="product.name" id="product-name" :state="nameValid" />
          <b-form-invalid-feedback :state="nameValid" v-text="'Invalid name'" />
        </b-col>
      </b-form-row>
      <b-form-row class="mb-3">
        <b-col><label for="product-category" v-text="'Category'" /></b-col>
        <b-col>
          <b-form-select v-model="product.categoryId" :options="categoryOptions" />
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col><label for="product-price" v-text="'Price'" /></b-col>
        <b-col>
          <b-form-input v-model="product.price" type="number" id="product-price" :state="priceValid" />
          <b-form-invalid-feedback :state="priceValid" v-text="'Invalid price'" />
        </b-col>
      </b-form-row>
    </b-form>
    <template #modal-footer>
      <b-button variant="danger" v-text="'Delete'" @click="remove" />
      <b-col fluid />
      <b-button variant="outline-secondary" v-text="'Cancel'" @click="open = false" />
      <b-button variant="primary" :disabled="!valid" v-text="'Update'" @click="update" />
    </template>
  </b-modal>
</template>

<script>
export default {
  name: "ProductEdit",
  data: () => ({
    // create local name to update modal title only after modifying
    name: null
  }),
  props: {
    product: Object,
    editing: Boolean
  },
  computed: {
    open: {
      get() {
        return this.editing;
      },
      set(v) {
        this.$emit('update:editing', v);
      }
    },
    categoryOptions() {
      return Object.values(this.$store.state.categories).map(c => ({ value: c.id, text: c.name }));
    },
    nameValid() {
      // check if exist and length
      return this.product.name?.length > 0;
    },
    priceValid() {
      // ensure number value over 0
      return !isNaN(this.product.price) && parseInt(this.product.price) >= 0;
    },
    valid() {
      return this.nameValid && this.priceValid;
    }
  },
  watch: {
    // update modal title
    product(product) {
      this.name = this.$store.state.products[product.id].name;
    }
  },
  methods: {
    // commit mutations
    remove() {
      this.$store.commit('remove', this.product.id);
      this.open = false;
    },
    update() {
      this.$store.commit('update', this.product);
      this.open = false;
    }
  },
  mounted() {
    // create modal title
    this.name = this.$store.state.products[this.product.id].name;
  }
}
</script>
