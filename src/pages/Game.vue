<script>
import {
  createGameState,
  getCurrentMiniGame,
  loseLevel,
  winLevel,
  goToNextLevel,
} from "../lib/game-state";
import OrderNumber from "../components/mini-games/OrderNumber.vue";
import Temperature from "../components/mini-games/Temperature.vue";
import PlugWire from "../components/mini-games/PlugWire.vue";
import GameBar from "../components/GameBar.vue";
import Click from "@/components/mini-games/Click.vue";
import Defusing from "@/components/mini-games/Defusing.vue";
import MathEquation from "@/components/mini-games/MathEquation.vue";
import ProgressBar from "@/components/mini-games/ProgressBar.vue";
import SwipeCard from "@/components/mini-games/SwipeCard.vue";
import BorderMainSvg from "@/components/svg/borderDesign/BorderMain.svg.vue";
import ButtonSvg from "@/components/svg/borderDesign/Button.svg.vue";
import GuessTime from "@/components/mini-games/GuessTime.vue";
import SortNumber from "@/components/mini-games/SortNumber.vue";
import ElementFight from "@/components/mini-games/ElementFight.vue";

const miniGameComponents = {
  "order-number": OrderNumber,
  "plug-wire": PlugWire,
  click: Click,
  defusing: Defusing,
  "math-equation": MathEquation,
  "guess-time": GuessTime,
  "progress-bar": ProgressBar,
  temperature: Temperature,
  "sort-number": SortNumber,
  "swipe-card": SwipeCard,
  "element-fight": ElementFight,
};

export default {
  components: {
    GameBar,
    BorderMainSvg,
    ButtonSvg,
  },
  emits: ["game-over"],
  data() {
    return {
      state: createGameState(),
      autoAdvanceProgress: 0,
      autoAdvanceTimer: null,
    };
  },
  watch: {
    "state.status": {
      immediate: true,
      handler(newStatus) {
        if (newStatus === "miniGameWon" || newStatus === "miniGameLost") {
          this.startAutoAdvance();
        }
      },
    },
  },
  computed: {
    currentMiniGame() {
      const currentMiniGameId = getCurrentMiniGame(this.state);

      if (!currentMiniGameId) {
        return null;
      }

      return miniGameComponents[currentMiniGameId];
    },
  },
  methods: {
    clearAutoAdvanceTimer() {
      if (this.autoAdvanceTimer) {
        clearInterval(this.autoAdvanceTimer);
        this.autoAdvanceTimer = null;
      }
    },
    startAutoAdvance() {
      this.clearAutoAdvanceTimer();
      this.autoAdvanceProgress = 0;

      const intervalMs = 50;
      const durationMs = 1000;
      const step = 100 / (durationMs / intervalMs);

      this.autoAdvanceTimer = setInterval(() => {
        this.autoAdvanceProgress = Math.min(
          this.autoAdvanceProgress + step,
          100,
        );

        if (this.autoAdvanceProgress >= 100) {
          this.clearAutoAdvanceTimer();
          this.handleNextLevel();
        }
      }, intervalMs);
    },
    handleSuccess() {
      winLevel(this.state);
      if (this.state.status === "win") {
        this.$emit("game-won");
      }
    },
    handleFail() {
      loseLevel(this.state);
      if (this.state.status === "lose") {
        this.$emit("game-over");
      }
    },
    handleNextLevel() {
      this.clearAutoAdvanceTimer();
      goToNextLevel(this.state);
    },
  },
  beforeUnmount() {
    this.clearAutoAdvanceTimer();
  },
};
</script>

<template>
  <BorderMainSvg class="background-success flex">
    <div class="flex flex-col justify-between w-full h-full items-center">
      <GameBar
        :lives="state.lives"
        :status="state.status"
        :score="state.completedLevels"
        :key="state.level"
        @timeout="handleFail"
      />
      <component
        v-if="state.status === 'playing'"
        :is="currentMiniGame"
        @success="handleSuccess"
        @fail="handleFail"
        class="flex-1 min-h-0"
      />
      <div
        v-if="state.status === 'miniGameWon'"
        class="flex flex-col gap-10 w-70 h-[80%] pt-20"
      >
        <div
          class="text-(--title) text-[clamp(2rem,3vw,2.5rem)] self-start w-full select-none"
        >
          Gagné
        </div>
        <div class="w-full">
          <div
            class="h-2 w-full overflow-hidden rounded-full border border-(--primary) bg-(--secondary)"
          >
            <div
              class="h-full bg-(--primary) transition-all duration-100 ease-linear"
              :style="{ width: `${autoAdvanceProgress}%` }"
            ></div>
          </div>
        </div>
      </div>
      <div
        v-if="state.status === 'miniGameLost'"
        class="flex flex-col gap-10 w-70 h-[80%] pt-20"
      >
        <div
          class="text-(--title) text-[clamp(2rem,3vw,2.5rem)] self-start w-full select-none"
        >
          Perdu
        </div>
        <div class="w-full">
          <div
            class="h-2 w-full overflow-hidden rounded-full border border-(--primary) bg-(--secondary)"
          >
            <div
              class="h-full bg-(--primary) transition-all duration-100 ease-linear"
              :style="{ width: `${autoAdvanceProgress}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </BorderMainSvg>
</template>
