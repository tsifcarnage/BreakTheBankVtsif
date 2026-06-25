<script>
import BorderMainSvg from "../svg/borderDesign/BorderMain.svg.vue";
import ButtonSvg from "../svg/borderDesign/Button.svg.vue";

export default {
  components: {
    ButtonSvg,
    BorderMainSvg,
  },
  data() {
    return {
      progress: 0,
      isComplete: false,
      intervalId: null,
      speed: 1,
    };
  },
  methods: {
    startFilling() {
      if (this.intervalId || this.isComplete) return;

      this.intervalId = setInterval(() => {
        if (this.progress < 100) {
          this.progress += this.speed;
        } else {
          clearInterval(this.intervalId);
          this.intervalId = null;
          this.isComplete = true;
          this.stopFilling();
        }
      }, 30);
    },
    stopFilling() {
      if (this.isComplete) {
        this.$emit("success");
      }

      clearInterval(this.intervalId);
      this.intervalId = null;
    },
  },
};
</script>

<template>
  <div
    class="w-full max-w-100 flex flex-col gap-[clamp(1.5rem,6vh,3.75rem)] pt-[clamp(1.5rem,4vh,3rem)]"
  >
    <h1 class="text-(--title) text-[clamp(1.25rem,4vh,1.875rem)] leading-tight">
      Remplir la barre en maintenant le boutton
    </h1>

    <div class="flex flex-col gap-3">
      <div
        class="w-full h-8 bg-(--secondary) border-2 border-(--primary) overflow-hidden mb-4"
      >
        <div
          class="h-full bg-(--primary) transition-all duration-100 ease-linear"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>

      <ButtonSvg>
        <button
          @mousedown="startFilling()"
          @mouseup="stopFilling()"
          @mouseleave="stopFilling()"
          @touchstart="startFilling()"
          @touchend="stopFilling()"
          class="px-6 py-3 transition-colors select-none active:scale-95 duration-150 w-full hover:cursor-pointer"
        >
          Maintenir enfoncé
        </button>
      </ButtonSvg>
    </div>
  </div>
</template>
