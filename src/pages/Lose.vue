<script>
import BorderContentSvg from "@/components/svg/borderDesign/BorderContent.svg.vue";
import BorderMainSvg from "@/components/svg/borderDesign/BorderMain.svg.vue";
import ButtonSvg from "@/components/svg/borderDesign/Button.svg.vue";
import TreasureSvg from "@/components/svg/Treasure.svg.vue";
import Warning from "@/components/svg/Warning.svg.vue";
import PoliceLight from "@/components/svg/PoliceLight.svg.vue";

export default {
  components: {
    BorderMainSvg,
    ButtonSvg,
    BorderContentSvg,
    TreasureSvg,
    Warning,
    PoliceLight,
  },
};
</script>

<template>
  <BorderMainSvg variant="loose" class="background-error flex">

    <div class="flex flex-col gap-5 w-full h-full">

      <div class="flex w-full h-[20%] justify-between items-center">
        <div class="flex gap-1 md:gap-5 justify-start items-center">
          <Warning/>
          <h1 class="text-(--error) text-[clamp(2rem,6vw,3rem)] self-center">
            ERROR
          </h1>
        </div>
        <PoliceLight variant="loose"/>
      </div>
      
      <div
        class="flex flex-col md:flex-row w-full gap-5 md:h-full justify-evenly h-[80%] p-5"
      >
        <div
          class="flex gap-5 w-full md:w-[30%] h-[40%] md:h-full justify-center items-center"
        >
          <BorderContentSvg variant="loose">
            <h1 class="text-(--error) text-3xl md:text-4xl w-full m-auto">A̵̡̧̨̯͎̼̜̪̗̬̺͈͎͍͍͆̆̌̆̽̂̍̄̃̐͠ç̸̛̛̣̯̯͔͚̞͆̂́̑̍̑̄̊̈́̈́̽͠c̷̛̙̥̱͐́́̐ë̷̥̠̥͚̟̼͇̥̭̲́ͅͅś̴͚͖̲̯̠͚̹̥͉͕̣̮͖̬s̶̡̱̭͓̟̻͕̦̼̟̖̙̺̩̄̂̓͊͆̕ͅ ̵̡͊͋̔͒͋̒̈̈̈́̃́̕͠D̸̛͚̘̼͙̖̑͒̓̆́̏́̔̔͘͝͝ȩ̶̨̬̱̱̣͓̤͙̰͍̯͔̮̌̔͝n̶̢̺̣̥̹̻̝͈̬̟̖͔͙͉͙̬͑͊̉̆̾̆ĩ̵̛̠̳͋e̴̛͗̒̄̇̈́̃̽͗̑̔͋͘͘͜d̴̹͔̻̯͙̘͚̊̏̇́͛́̆̿̚̚ͅ</h1>
          </BorderContentSvg>
        </div>
        
        <div
          class="flex gap-5 w-full md:w-[35%] h-40 md:h-full justify-center items-center"
        >
          <TreasureSvg variant="loose" />
        </div>

        <div
          class="flex flex-row md:flex-col w-full md:w-[20%] gap-5 md:gap-10 h-15 md:h-full justify-center items-center md:items-end"
        >
          <ButtonSvg variant="loose" class="max-w-full">
            <button class="w-full h-full cursor-pointer" @click="$emit('back-home')">Accueil</button>
          </ButtonSvg>
          <ButtonSvg variant="loose" class="max-w-full">
            <button class="w-full h-full cursor-pointer" @click="$emit('start-game')">Rejouer</button>
          </ButtonSvg>
        </div>
      </div>
    </div>
  </BorderMainSvg>
</template>
<style scoped>
.background-error {
  background: var(--shadow-error);
}
</style>