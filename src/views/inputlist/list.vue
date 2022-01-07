<!--  -->
<template>
  <div id="app">
    <div style="width: 200px">
      <inputlist clear v-model="xxx"> </inputlist>
      <input type="text" />
    </div>
  </div>
</template>

<script>
import inputlist from "./amend.vue";
export default {
  data() {
    return {
      data: [],
      options: [],
      xxx: "",
    };
  },

  created() {
    // this.getData();
  },

  components: {
    inputlist,
  },

  computed: {},

  methods: {
    empty() {
      console.log("11");
    },
  },
};
</script>
<style lang="scss" scoped>
.sss {
  position: absolute;
}
</style>
