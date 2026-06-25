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
      checkActive: "bg-(--primary) text-black",
      checkHover: "hover:bg-(--primary) hover:text-black",
      maxNumber: 9,
      currentNumber: 1,
      shuffleNumbers: [],
      foundNumbers: [],
    };
  },
  methods: {
    startGame() {
      this.currentNumber = 1;
      this.foundNumbers = [];

      const numbers = [];

      for (let i = 1; i <= this.maxNumber; i++) {
        numbers.push(i);
      }
      this.shuffleNumbers = numbers.sort(() => Math.random() - 0.5);
    },
    checkNumber(number) {
      if (number === this.currentNumber) {
        this.foundNumbers.push(number);
        if (this.currentNumber === this.maxNumber) {
          this.$emit("success");
        } else {
          this.currentNumber++;
        }
      } else {
        this.$emit("fail");
      }
    },
  },
  mounted() {
    this.startGame();
  },
};
</script>
<template>
  <div
    class="w-full max-w-100 h-full flex flex-col items-center pt-[clamp(1.5rem,4vh,3rem)] overflow-y-auto"
  >
    <h1
      class="text-(--title) text-[clamp(1.25rem,4vh,1.875rem)] leading-tight text-center"
    >
      Cliquer les chiffres dans le bon ordre
    </h1>
    <div
      class="grid grid-cols-3 gap-[clamp(0.5rem,2vw,0.75rem)] w-full mt-[clamp(1.5rem,5vh,3rem)]"
    >
      <button
        v-for="number in shuffleNumbers"
        :key="number"
        class="w-full h-[clamp(3rem,11vh,5rem)] border border-(--primary) transition-all duration-100 text-[clamp(1.25rem,5vh,2rem)] cursor-pointer"
        :class="[foundNumbers.includes(number) ? checkActive : checkHover]"
        @click="checkNumber(number)"
        :disabled="foundNumbers.includes(number)"
      >
        {{ foundNumbers.includes(number) ? "✓" : number }}
      </button>
    </div>
  </div>
</template>

<style></style>
