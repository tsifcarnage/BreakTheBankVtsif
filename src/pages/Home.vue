<script>
import BorderContentSvg from "@/components/svg/borderDesign/BorderContent.svg.vue";
import BorderMainSvg from "@/components/svg/borderDesign/BorderMain.svg.vue";
import ButtonSvg from "@/components/svg/borderDesign/Button.svg.vue";
import TreasureSvg from "@/components/svg/Treasure.svg.vue";

export default {
  components: {
    BorderMainSvg,
    ButtonSvg,
    BorderContentSvg,
    TreasureSvg,
  },
  data() {
    return {
      instruction: [
        "Déverrouillez le coffre-fort en terminant tous les mini-jeux.",
        "Vous avez un temps limité pour chaque défi.",
        "Vous disposez de 3 vies. Si le temps est écoulé avant que vous ayez réussi, vous perdez une vie.",
        "Si vous perdez vos 3 vies, vous avez perdu et l'alarme se déclenche.",
        "Détail pour mini-jeux 'horloge': quand l'heure est entre 01 - 09 cliquer sur un chiffre, pas besoin d'un 0 avant, apres cliquer sur enter en forme de → pour passer au minute",
      ],
    };
  },
};
</script>

<template>
  <BorderMainSvg variant="home">
    <div class="flex flex-col gap-5 w-full h-full justify-between pb-9.5">
      <h1 class="text-(--title) text-[clamp(2rem,3vw,2.5rem)] self-start">
        Break the bank
      </h1>
      <div
        class="flex flex-col md:flex-row md:justify-between gap-5 w-full h-full"
      >
        <BorderContentSvg
          variant="home"
          class="home-instructions-panel flex flex-col self-start"
        >
          <h1 class="self-start my-3 text-2xl">Bienvenue</h1>
          <ul
            class="self-start text-start flex flex-col gap-2 text-sm md:text-lg pr-4 lg:pr-10"
          >
            <li v-for="item in instruction" :key="item">-{{ item }}</li>
          </ul>
        </BorderContentSvg>

        <div
          class="flex md:w-[60%] flex-row md:flex-col gap-5 h-[65%] md:h-full justify-center items-center"
        >
          <TreasureSvg variant="home" />
          <ButtonSvg variant="home" class="max-w-40 lg:max-w-50">
            <button
              class="w-full h-full cursor-pointer text-sm md:text-xl"
              @click="$emit('start-game')"
            >
              Commencez
            </button>
          </ButtonSvg>
        </div>
      </div>
    </div>
  </BorderMainSvg>
</template>
<style scoped>
li {
  margin: 5px 2px;
  padding: 4px;
}

.home-instructions-panel :deep(.overflow-auto) {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.home-instructions-panel :deep(.overflow-auto::-webkit-scrollbar) {
  width: 0;
  height: 0;
}
</style>
