<script>
import BorderMainSvg from "../svg/borderDesign/BorderMain.svg.vue";
import ButtonSvg from "../svg/borderDesign/Button.svg.vue";

export default {
    components: {
        ButtonSvg,
        BorderMainSvg,
    },
    data() {
        return {
            keyboard: [1, 2, 3, 4, 5, 6, 7, 8, 9, "✖", 0, "✓"],
            firstNb: 1,
            secNb: 1,
            response: "",
        };
    },
    methods: {
        startGame() {
            this.response = "";
            this.firstNb = Math.floor(Math.random() * 9) + 1;
            this.secNb = Math.floor(Math.random() * 9) + 1;
        },
        handleKey(key) {
            switch (key) {
                case "✖":
                    this.response = "";
                    break;
                case "✓":
                    this.submitResponse();
                    break;
                default:
                    this.response += key;
                    break;
            }
        },
        submitResponse() {
            if (Number(this.response) === this.firstNb * this.secNb) {
                this.$emit("success");
            } else {
                this.$emit("fail");
            }
        },
    },
    mounted() {
        this.startGame();
    },
};
</script>
<template>
    <div
        class="overflow-y-auto w-full h-full max-h-full min-h-0 max-w-100 flex flex-col items-center gap-[clamp(0.4rem,1.6vh,1rem)] overflow-hidden pt-[clamp(1.5rem,4vh,3rem)] pb-3"
    >
        <h1 class="text-(--title) text-[clamp(1.25rem,4vh,1.875rem)] leading-tight">
            Résoudre ce problème de math
        </h1>
        <p class="text-(--title) text-[clamp(1.75rem,7vh,3rem)] leading-none w-fit px-5 py-1.5 border border-(--primary)">
            {{ firstNb }} X {{ secNb }}
        </p>
        <input
            type="number"
            v-model="response"
            @keyup.enter="submitResponse()"
            min="0"
            name="response"
            id="response"
            class="text-(--title) text-[clamp(1.25rem,4vh,1.875rem)] leading-tight w-full max-w-80 px-5 py-1.5 border border-(--primary)"
        />
        <div class="grid grid-cols-3 gap-1.5 w-full max-w-[18rem]">
            <button
                v-for="key in keyboard"
                :key="key"
                class="w-full h-[clamp(2.25rem,7vh,4rem)] border border-(--primary) hover:bg-(--primary) hover:text-black transition-all duration-100 text-[clamp(1.125rem,3.5vh,1.5rem)] leading-none cursor-pointer"
                @click="handleKey(key)"
            >
                {{ key }}
            </button>
        </div>
    </div>
</template>

<style></style>
