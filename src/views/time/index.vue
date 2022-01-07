<template>
  <div id="app">
    <Time :time="countdown" v-slot="timeObj">
      <div class="count-down">
        <div class="icon"></div>
        {{ timeObj.d }}天{{ timeObj.hh }}小时{{ timeObj.mm }}分钟{{
          timeObj.ss
        }}秒
      </div>
    </Time>
  </div>
</template>

<script>
import Time from "./time.vue";

export default {
  data() {
    return {
      countdown: "99996380",
      end: "1641538275888",
    };
  },
  components: {
    Time,
  },
};
</script>
<style></style>
