<script>
import BorderContentSvg from "@/components/svg/borderDesign/BorderContent.svg.vue";
import BorderMainSvg from "@/components/svg/borderDesign/BorderMain.svg.vue";
import ButtonSvg from "@/components/svg/borderDesign/Button.svg.vue";
import PoliceLight from "@/components/svg/PoliceLight.svg.vue";
import MoneyBagSvg from "@/components/svg/MoneyBag.svg.vue";
import TreasureOpenSvg from "@/components/svg/TreasureOpen.svg.vue";

export default {
  components: {
    BorderMainSvg,
    ButtonSvg,
    BorderContentSvg,
    TreasureOpenSvg,
    MoneyBagSvg,
    PoliceLight,
  },
};
</script>

<template>
  <BorderMainSvg variant="win" class="background-success flex">
    <div class="flex flex-col gap-5 w-full h-full">
      <div class="flex w-full h-[20%] justify-between items-center">
        <div class="flex gap-1 md:gap-5 justify-start items-center">
          <MoneyBagSvg />
          <h1
            class="text-(--success) text-[clamp(2rem,6vw,3rem)] self-center"
          >
            WINNER
          </h1>
        </div>
        <PoliceLight variant="win" />
      </div>

      <div
        class="flex flex-col md:flex-row w-full gap-5 h-[80%] md:h-full justify-evenly p-5"
      >
        <div
          class="flex gap-5 w-full md:w-[30%] h-[40%] md:h-full justify-center items-center"
        >
          <BorderContentSvg variant="win">
            <h1 class="text-(--success) text-3xl md:text-4xl w-full m-auto">
              Access Granted
            </h1>
          </BorderContentSvg>
        </div>

        <div
          class="flex gap-5 w-full md:w-[35%] h-40 md:h-full justify-center items-center"
        >
          <TreasureOpenSvg class="relative md:-top-10" />
        </div>

        <div
          class="flex flex-row md:flex-col w-full md:w-[20%] gap-5 md:gap-10 h-15 md:h-full justify-center items-center md:items-end"
        >
          <ButtonSvg variant="win" class="max-w-full">
            <button
              class="w-full h-full cursor-pointer"
              @click="$emit('back-home')"
            >
              Accueil
            </button>
          </ButtonSvg>
          <ButtonSvg variant="win" class="max-w-full">
            <button
              class="w-full h-full cursor-pointer"
              @click="$emit('start-game')"
            >
              Rejouer
            </button>
          </ButtonSvg>
        </div>
      </div>
    </div>
  </BorderMainSvg>
</template>
<style scoped>
.background-success {
  background: var(--shadow-success);
}
</style>