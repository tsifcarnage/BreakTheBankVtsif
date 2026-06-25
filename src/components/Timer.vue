<script>
export default {
  data() {
    return {
      startTime: 5,
      time: 0,
      startedAt: 0,
      timer: null,
      limit: 0,
    };
  },
  emits: ["timeout"],
  methods: {
    start() {
      this.stop();
      this.time = this.startTime;
      this.startedAt = performance.now();
      this.timer = setInterval(this.updateTime, 250);
    },
    updateTime() {
      this.time =
        this.startTime -
        Math.floor((performance.now() - this.startedAt) / 1000);
      if (this.time <= 0) {
        this.stop();
        this.$emit("timeout");
      }
    },
    stop() {
      if (this.timer !== null) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
  },
  computed: {
    formattedTime() {
      return this.time.toString().padStart(2, "0");
    },
  },
  mounted() {
    this.start();
  },
  beforeUnmount() {
    this.stop();
  },
};
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold">
      {{ formattedTime }}
    </h1>
  </div>
</template>