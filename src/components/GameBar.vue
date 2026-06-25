<script>
import Timer from "./Timer.vue";

export default {
  props: {
    lives: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
  },
  components: {
    Timer,
  },
  emits: ["timeout"],
};
</script>

<template>
  <div class="min-h-12 px-2 py-2 w-full grid grid-cols-3 items-center gap-2">
    <div class="col-span-1 flex justify-start min-w-0">
      <p
        class="text-(--title) text-sm sm:text-lg md:text-3xl whitespace-nowrap ml-[clamp(0.25rem,3vw,3.75rem)]"
      >
        Score: {{ score }}
      </p>
    </div>
    <div class="col-span-1 flex justify-center">
      <Timer @timeout="$emit('timeout')" v-if="status === 'playing'" />
    </div>
    <div class="col-span-1 flex justify-end gap-[clamp(0.25rem,2vw,0.75rem)]">
      <span
        v-for="life in lives"
        :key="life"
        class="size-[clamp(1.5rem,4vw,2.5rem)] border-2 border-(--primary) bg-(--primary)"
      ></span>
      <span
        v-for="life in 3 - lives"
        :key="life"
        class="size-[clamp(1.5rem,4vw,2.5rem)] border-2 border-(--primary) bg-(--secondary)"
      ></span>
    </div>
  </div>
</template>