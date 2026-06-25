<script>
import ClockSvg from "../svg/Clock.svg.vue";

export default {
  components: { ClockSvg },
  data() {
    return {
      targetHour: 0,
      targetMinute: 0,
      guessHour: "",
      guessMinute: "",
      inputMode: "hour",
      message: "",
      keyboard: [1, 2, 3, 4, 5, 6, 7, 8, 9, "→", 0, "✓"],
    };
  },

  mounted() {
    this.newGame();
  },

  computed: {
    // 🕒 aiguilles
    hourHand() {
      const angle = ((this.targetHour % 12) + this.targetMinute / 60) * 30;
      return this.getPoint(angle, 45);
    },

    minuteHand() {
      const angle = this.targetMinute * 6;
      return this.getPoint(angle, 70);
    },
  },

  methods: {
    newGame() {
      this.targetHour = Math.floor(Math.random() * 12) + 1;
      this.targetMinute = Math.floor(Math.random() * 12) * 5;

      this.guessHour = "";
      this.guessMinute = "";
      this.inputMode = "hour";
      this.message = "";
    },

    pressKey(key) {
      if (key === "✓") {
        this.checkAnswer();
        return;
      }

      if (key === "→") {
        if (this.inputMode === "hour" && this.guessHour.length > 0) {
          this.inputMode = "minute";
        }
        return;
      }

      // Minute and hour
      if (this.inputMode === "hour") {
        if (this.guessHour.length < 2) {
          this.guessHour += key;
        }

        if (this.guessHour.length === 2) {
          this.inputMode = "minute";
        }

        return;
      }

      if (this.inputMode === "minute") {
        if (this.guessMinute.length < 2) {
          this.guessMinute += key;
        }
      }
    },

    //making 01 when I put 1
    pad(n) {
      return String(n).padStart(2, "0");
    },

    checkAnswer() {
      const h = Number(this.guessHour);
      const m = Number(this.guessMinute);

      if (h === this.targetHour && m === this.targetMinute) {
        this.message = "🎉 Correct !";
        this.$emit("success");
      } else {
        this.$emit("fail");
        this.message = `❌ Faux ! C'était ${this.formatTime(
          this.targetHour,
          this.targetMinute,
        )}`;
      }
    },

    // format
    formatTime(h, m) {
      return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    },

    // SVG point
    getPoint(angleDeg, length) {
      const angle = (Math.PI / 180) * (angleDeg - 90);
      return {
        x: 100 + length * Math.cos(angle),
        y: 100 + length * Math.sin(angle),
      };
    },

    // ticks
    getTick(n) {
      const angle = (Math.PI / 6) * (n - 1);
      return {
        x1: 100 + 80 * Math.cos(angle),
        y1: 100 + 80 * Math.sin(angle),
        x2: 100 + 90 * Math.cos(angle),
        y2: 100 + 90 * Math.sin(angle),
      };
    },

    // chiffres
    getNumberPosition(n) {
      const angle = (Math.PI / 6) * (n - 3);
      const radius = 70;

      return {
        x: 100 + radius * Math.cos(angle),
        y: 100 + radius * Math.sin(angle),
      };
    },
  },
};
</script>
<template>
  <div
    class="w-full flex flex-col md:mt-10 items-center overflow-y-auto pt-[clamp(0.5rem,3vh,1.5rem)] pb-2"
  >
    <h1 class="text-(--title) text-2xl md:text-3xl leading-tight">
      Devine l'heure !
    </h1>
    <div
      class="flex gap-[clamp(0.5rem,2vh,0.75rem)] md:mt-8 p-[clamp(0.5rem,2vh,1.25rem)] items-center md:flex-row flex-col"
    >
      <section class="w-[clamp(7rem,26vh,13rem)] md:w-80">
        <ClockSvg
          :hour-hand="hourHand"
          :minute-hand="minuteHand"
          :get-tick="getTick"
          :get-number-position="getNumberPosition"
        />
      </section>

      <section>
        <div
          class="flex flex-wrap gap-2 border border-(--primary) justify-center p-2 rounded-sm"
        >
          <p class="flex gap-1">
            Heure : <strong class="w-9">{{ guessHour ? pad(guessHour) : "--" }}</strong>
          </p>
          <p class="flex gap-1">
            Minutes :
            <strong class="w-9">{{ guessMinute ? pad(guessMinute) : "--" }}</strong>
          </p>
          <!-- pour tester <p v-if="message">{{ message }}</p> -->
        </div>

        <!-- keyboard -->
        <div
          class="grid grid-cols-3 justify-center gap-2 my-[clamp(0.5rem,2vh,0.9375rem)]"
        >
          <button
            v-for="key in keyboard"
            :key="key"
            @click="pressKey(key)"
            class="flex items-center justify-center h-[clamp(2.25rem,5.5vh,3.25rem)] text-[clamp(1.125rem,4vh,1.875rem)] cursor-pointer border border-(--primary) hover:bg-(--primary) hover:text-black transition-all duration-100"
          >
            {{ key }}
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
p {
  font-size: clamp(0.9rem, 3vh, 1.2rem);
}
</style>
