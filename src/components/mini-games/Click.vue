<script>
import ButtonSvg from "../svg/borderDesign/Button.svg.vue";

export default {
  components: {
    ButtonSvg,
  },
  data() {
    return {
      clics: 0,
      goals: 25,
      win: false,
    };
  },
  methods: {
    increment() {
      if (this.win){
        this.$emit("success");
      };

      this.clics++;

      if (this.clics >= this.goals) {
        this.win = true;
        this.$emit("success");
      }
    },
    restartGame() {
      this.clics = 0;
      this.win = false;
    },
  },
};
</script>
<template>
  <div
    class="flex flex-col gap-[clamp(1rem,4vh,1.25rem)] items-center text-(--text-color) pt-[clamp(1.5rem,4vh,3rem)]"
  >
    <h1 class="text-(--title) text-[clamp(1.5rem,5vh,1.875rem)] leading-tight">
      Cliquez vite!
    </h1>
    <div
      class="size-[clamp(4rem,16vh,5rem)] border-4 border-(--primary) hover:bg-(--primary) cursor-pointer transition-colors duration-200"
      @click="increment"
    ></div>

    <div class="text-[clamp(1.5rem,5vh,1.875rem)]">
      <span>{{ clics }} / 25</span>
    </div>
  </div>
</template>
