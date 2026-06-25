<template>
  <div class="flex flex-col gap-3 w-full max-w-100 pt-[clamp(1.5rem,4vh,3rem)]">
    <h2
      class="text-(--title) text-[clamp(1.25rem,4vh,1.875rem)] leading-tight mb-3"
    >
      Placer dans le bon ordre
    </h2>
    <div class="w-full">
      <div
        class="text-(--text-primary) p-2 border-2 border-(--primary) text-xl"
      >
        {{ direction === "asc" ? " → Croissant" : "← Décroissant" }}
      </div>

      <div class="flex justify-center my-2 gap-2 w-full select-none">
        <div
          v-for="(cell, i) in line"
          :key="i"
          class="w-full h-15 border-2 border-(--primary) hover:bg-(--primary) hover:text-black transition-all duration-100 text-2xl flex items-center justify-center cursor-pointer"
          @click="rotate(i)"
        >
          {{ cell.value }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      won: false,
      line: [],
      direction: "asc",
    };
  },

  mounted() {
    this.reset();
  },

  methods: {
    rotate(i) {
      const cell = this.line[i];

      cell.value = cell.value === 4 ? 1 : cell.value + 1;

      this.checkWin();
    },

    checkWin() {
      const values = this.line.map((c) => c.value);

      let ok = true;

      for (let i = 0; i < values.length - 1; i++) {
        if (this.direction === "asc") {
          if (values[i] >= values[i + 1]) ok = false;
        } else {
          if (values[i] <= values[i + 1]) ok = false;
        }
      }
      if (ok && !this.won) {
        this.$emit("success");
      }
      this.won = ok;
    },

    reset() {
      this.won = false;
      const size = 4;
      let line = [];
      let valid = false;
      this.direction = Math.random() > 0.5 ? "asc" : "desc";

      while (!valid) {
        line = [];

        for (let i = 0; i < size; i++) {
          line.push({
            value: Math.floor(Math.random() * 4) + 1,
          });
        }

        valid = !this.isWinning(line);
      }

      this.line = line;
    },
    isWinning(line) {
      const values = line.map((c) => c.value);

      for (let i = 0; i < values.length - 1; i++) {
        if (this.direction === "asc") {
          if (values[i] >= values[i + 1]) return false;
        } else {
          if (values[i] <= values[i + 1]) return false;
        }
      }

      return true;
    },
  },
};
</script>
<style></style>
