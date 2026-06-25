<script>
export default {
    props: {
      variant: {
        type: String,
        default: 'home',
        validator: (value) => ['home', 'win', 'loose'].includes(value),
      }
    },

    computed: {
      svgColor() {
        if (this.variant === 'loose') return '#E50000'
        if (this.variant === 'win') return '#0EC824'
        return '#FCC600'
      },
      hoverVariant(){
        if (this.variant === 'loose') return 'group-hover:fill-(--error)'
        if (this.variant === 'win') return 'group-hover:fill-(--success)'
        return 'group-hover:fill-(--primary)'
      }
    }
}
</script>
<template>
  <div class="relative w-full h-full max-h-15 overflow-hidden group">
    <svg
      viewBox="0 0 331 87"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      class="absolute inset-0 w-full h-full pointer-events-none"
    >
      <path
        d="M2 28.4279V85H301.716L329 48.2488V2H23.9102L2 28.4279Z"
        :stroke="svgColor"
        stroke-width="4"
        vector-effect="non-scaling-stroke"
        class="transition-colors duration-300"
        :class="hoverVariant"
      />
    </svg>
    <div
      class="relative z-10 w-full h-full overflow-auto text-xl text-center text-(--text-color) hover:text-(--text-dark) hover:font-medium transition-all duration-150"
    >
      <slot />
    </div>
  </div>
</template>
<style></style>
