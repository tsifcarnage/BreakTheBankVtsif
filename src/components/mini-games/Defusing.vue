<script>
import ButtonSvg from "../svg/borderDesign/Button.svg.vue";

export default {
  components: {
    ButtonSvg,
  },
  data() {
    return {
      wireCount: 7,
      bombWires: 3,
      wires: [],
      gameOver: false,
      message: "",
      cutSafeWires: 0,
      winMessageDesign: "text-(--success)",
      loseMessageDesign: "text-(--error)",
    };
  },
  mounted() {
    this.initGame();
  },
  methods: {
    initGame() {
      this.gameOver = false;
      this.message = "";
      this.cutSafeWires = 0;

      // Wire init
      this.wires = Array(this.wireCount)
        .fill()
        .map(() => ({
          type: "safe",
          cut: false,
          revealed: false,
        }));

      // red wire random
      let bombsPlaced = 0;
      while (bombsPlaced < this.bombWires) {
        const idx = Math.floor(Math.random() * this.wireCount);
        if (this.wires[idx].type !== "bomb") {
          this.wires[idx].type = "bomb";
          bombsPlaced++;
        }
      }
    },
    handleWire(index, event) {
      const wire = this.wires[index];

      if (this.gameOver || wire.cut) return;

      if (event.pointerType !== "mouse" && !wire.revealed) {
        wire.revealed = true;
        return;
      }

      this.cutWire(index);
    },
    cutWire(index) {
      if (this.gameOver || this.wires[index].cut) return;

      this.wires[index].cut = true;

      if (this.wires[index].type === "bomb") {
        this.message = " ❌Perdu! Mauvais fil coupé!";
        this.$emit("fail");
        return;
      }

      this.cutSafeWires++;

      if (this.cutSafeWires === this.wireCount - this.bombWires) {
        this.message = "✅Bombe désamorcée !";
        this.$emit("success");
      }
    },
    restartGame() {
      this.initGame();
    },
    wireClass(wire) {
      if (wire.cut) {
        return wire.type === "bomb"
          ? "bg-(--error) shadow-[0_0_12px_red]"
          : "bg-green-400 shadow-[0_0_12px_#00ff00]";
      }

      if (wire.revealed) {
        return wire.type === "bomb"
          ? "border-2 border-(--error) shadow-[0_0_12px_red]"
          : "border-2 border-green-400 shadow-[0_0_12px_#00ff00]";
      }

      return wire.type === "bomb"
        ? "hover:border-2 hover:border-(--error) hover:shadow-[0_0_12px_red]"
        : "hover:border-2 hover:border-green-400 hover:shadow-[0_0_12px_#00ff00]";
    },
  },
};
</script>
<template>
  <div
    class="flex flex-col items-center w-full max-w-100 pt-[clamp(1rem,3vh,2rem)] overflow-hidden"
  >
    <h1
      class="text-(--title) text-[clamp(1.125rem,3.5vh,1.875rem)] leading-tight text-center"
    >
      Coupe les bons fils pour désamorcer la bombe !
    </h1>

    <div
      class="mt-[clamp(1rem,3vh,2rem)] w-full border-2 border-(--primary) rounded-xl p-[clamp(1rem,3vw,1.5rem)] my-[clamp(1rem,3vh,1.25rem)]"
    >
      <div class="flex flex-col items-center gap-[clamp(0.75rem,2.5vh,1.5rem)]">
        <div
          v-for="(wire, index) in wires"
          :key="index"
          @pointerup="handleWire(index, $event)"
          class="h-5 w-full rounded-full transition-all duration-300 cursor-pointer bg-gray-500"
          :class="wireClass(wire)"
        ></div>
      </div>

      <p
        v-if="message"
        class="mt-6 text-center font-bold text-lg"
        :class="message.includes('✅') ? winMessageDesign : loseMessageDesign"
      >
        {{ message }}
      </p>
    </div>
  </div>
</template>
