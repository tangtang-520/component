<template>
  <!-- 倒计时组件 -->
  <div class="_base-count-down">
    <div class="content">
      <slot
        v-bind="{
          d: days,
          h: hours,
          m: mins,
          s: seconds,
          hh: `00${hours}`.slice(-2),
          mm: `00${mins}`.slice(-2),
          ss: `00${seconds}`.slice(-2),
        }"
      ></slot>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    days: "0",
    hours: "00",
    mins: "00",
    seconds: "00",
    timer: null,
    curTime: 0,
  }),
  props: {
    // 传入的时间
    time: {
      type: [Number, String],
      default: 0,
    },
    isMilliSecond: {
      // 传入的时间是秒  还是毫毛为单位
      type: Boolean,
      default: false,
    },
    end: {
      type: [Number, String],
      default: 0,
    },
    refreshCounter: {
      type: [Number, String],
      default: 0,
    },
  },
  watch: {
    duration() {
      this.countDown();
    },
    refreshCounter() {
      this.countDown();
    },
  },
  computed: {
    // 毫秒转化成秒
    duration() {
      if (this.end) {
        let end = String(this.end).length >= 13 ? +this.end : +this.end * 1000;
        end -= Date.now();
        return end;
      }
      return this.time ? Math.round(+this.time / 1000) : Math.round(+this.time);
    },
  },
  mounted() {
    this.curTime = Date.now();
    this.countDown();
  },
  methods: {
    countDown() {
      this.getTime(this.duration);
    },
    getTime(duration) {
      if (this.duration < 0) return;
      const { dd, hh, mm, ss } = this.durationFormatter(duration);
      this.days = dd || 0;
      // this.hours = `00${hh || ''}`.slice(-2);
      // this.mins = `00${mm || ''}`.slice(-2);
      // this.seconds = `00${ss || ''}`.slice(-2);
      this.hours = hh || 0;
      this.mins = mm || 0;
      this.seconds = ss || 0;
      this.timer = setTimeout(() => {
        const now = Date.now();
        const diffTime = Math.floor((now - this.curTime) / 1000);
        this.curTime = now;
        this.getTime(duration - diffTime);
      }, 1000);
    },
    durationFormatter(time) {
      if (!time) return { ss: 0 };
      let t = time;
      const ss = t % 60;
      t = (t - ss) / 60;
      if (t < 1) return { ss };
      const mm = t % 60;
      t = (t - mm) / 60;
      if (t < 1) return { mm, ss };
      const hh = t % 24;
      t = (t - hh) / 24;
      if (t < 1) return { hh, mm, ss };
      const dd = t;
      return { dd, hh, mm, ss };
    },
  },
};
</script>
<style lang="scss" scoped></style>
