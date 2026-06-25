<script>
export default {
  name: "ClockSvg",

  props: {
    hourHand: {
      type: Object,
      required: true,
    },
    minuteHand: {
      type: Object,
      required: true,
    },
    getTick: {
      type: Function,
      required: true,
    },
    getNumberPosition: {
      type: Function,
      required: true,
    },
  },
};
</script>

<template>
  <svg viewBox="0 0 200 200">
    <!-- cercle -->
    <circle
      cx="100"
      cy="100"
      r="90"
      stroke="#fcc600"
      stroke-width="4"
      fill="transparent"
    />

    <!-- centre -->
    <circle cx="100" cy="100" r="5" fill="#fcc600" />

    <!-- graduations -->
    <g v-for="n in 12" :key="n">
      <line
        :x1="getTick(n).x1"
        :y1="getTick(n).y1"
        :x2="getTick(n).x2"
        :y2="getTick(n).y2"
        stroke="#fcc600"
        stroke-width="2"
      />
    </g>

    <!-- chiffres -->
    <g v-for="n in 12" :key="'num-' + n">
      <text
        :x="getNumberPosition(n).x"
        :y="getNumberPosition(n).y"
        text-anchor="middle"
        dominant-baseline="middle"
        font-size="14"
        font-family="Arial"
        font-weight="bold"
        fill="#fffcdd"
      >
        {{ n }}
      </text>
    </g>

    <!-- aiguille heures -->
    <line
      x1="100"
      y1="100"
      :x2="hourHand.x"
      :y2="hourHand.y"
      stroke="#564508"
      stroke-width="4"
      stroke-linecap="round"
    />

    <!-- aiguille minutes -->
    <line
      x1="100"
      y1="100"
      :x2="minuteHand.x"
      :y2="minuteHand.y"
      stroke="#fcc600"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
</template>
