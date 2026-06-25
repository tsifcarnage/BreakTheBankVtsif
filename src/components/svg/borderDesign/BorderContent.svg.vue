<script>
export default {
  props: {
    variant: {
      type: String,
      default: "home",
      validator: (value) => ["home", "win", "loose"].includes(value),
    },
  },

    computed: {
      svgColor() {
        if (this.variant === 'loose') return '#E50000'
        if (this.variant === 'win') return '#0EC824'
        return '#FCC600'
      }
    }
}
</script>
<template>
  <div class="relative w-full h-full max-w-140 max-h-152 overflow-hidden">
    <svg
      viewBox="0 0 348 449"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      class="absolute inset-0 w-full h-full pointer-events-none"
    >
      <path
        d="M327.555 0.666016L347.113 22.5264L347.623 23.0957V277.686L347.178 278.235L295.845 341.732L295.477 398.048C298.737 398.932 301.135 401.91 301.135 405.45C301.135 409.216 298.42 412.346 294.841 412.994L255.29 447.983L254.722 448.485H24.2021L23.6201 447.923L0.610352 425.68L0 425.09V13.4434L0.585938 12.8584L12.8584 0.585938L13.4434 0H326.958L327.555 0.666016ZM4 49.0586V423.394L25.8193 444.485H253.207L289.748 412.159C287.391 410.851 285.795 408.337 285.795 405.45C285.795 401.902 288.205 398.917 291.477 398.041L291.85 341.008L291.854 340.308L292.294 339.764L343.623 276.27V24.624L325.169 4H315.545L314.86 4.64551L301.438 17.3018L301.149 17.5732H86.749L86.4629 17.3105L72.6562 4.65527L71.9414 4H47.9854L4 49.0586ZM293.465 401.78C291.438 401.78 289.795 403.424 289.795 405.45C289.795 407.477 291.438 409.12 293.465 409.12C295.492 409.12 297.135 407.477 297.135 405.45C297.135 403.423 295.492 401.78 293.465 401.78ZM87.5264 15.5732H300.355L311.656 4.91797H75.9033L87.5264 15.5732Z"
        :fill="svgColor"
        vector-effect="non-scaling-stroke"
      />
    </svg>
    <div
      class="flex flex-col justify-start items-center content-center align-content relative z-10 w-full h-full p-5 md:p-10 text-center m-auto overflow-auto text-(--text-color)"
    >
      <slot />
    </div>
  </div>
</template>
