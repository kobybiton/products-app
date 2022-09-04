<template>
  <b-container>
    <b-form-row>
      <b-col>
        <b-form-row>
          <b-col>
            <b-form-input v-model="searchText" placeholder="search" />
          </b-col>
          <b-col>
            <b-button v-text="'Search'" @click="$emit('update:search', searchText)" />
          </b-col>
        </b-form-row>
      </b-col>
      <b-col>
        <b-form-row>
          <b-col>
            <b-form-select :value="category" @input="v => $emit('update:category', v)" :options="categoryOptions" />
          </b-col>
          <b-col>
            <b-form-select :value="sort" @input="v => $emit('update:sort', v)" :options="sortOptions" />
          </b-col>
        </b-form-row>
      </b-col>
    </b-form-row>
  </b-container>
</template>

<script>
export default {
  name: "FilterBar",
  data: () => ({
    searchText: null,
    sortOptions: [{ value: "name", text: "Name" }, { value: "price", text: "Price" }, { value: "rating", text: "Rating" }]
  }),
  props: {
    search: String,
    category: Number,
    sort: String
  },
  computed: {
    categoryOptions() {
      return [{ value: 0, text: "All" }, ...Object.values(this.$store.state.categories).map(c => ({ value: c.id, text: c.name }))];
    }
  }
}
</script>
