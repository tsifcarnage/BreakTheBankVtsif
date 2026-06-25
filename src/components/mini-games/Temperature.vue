<script>
import Thermometer from "../svg/Thermometer.vue";

export default {
    components: {
        Thermometer,
    },
    emits: ["success"],
    data() {
        return {
            temperature: 0,
            wantedTemperature: 0,
            minTemperature: -15,
            maxTemperature: 30,
            isComplete: false,
        };
    },
    mounted() {
        this.startGame();
    },
    methods: {
        startGame() {
            this.temperature = 0;
            this.isComplete = false;
            this.getRandomTemperature();
        },
        getRandomTemperature() {
            let wantedTemperature =
                Math.floor(
                    Math.random() *
                        (this.maxTemperature - this.minTemperature + 1),
                ) + this.minTemperature;

            while (
                wantedTemperature === this.temperature &&
                this.minTemperature !== this.maxTemperature
            ) {
                wantedTemperature =
                    Math.floor(
                        Math.random() *
                            (this.maxTemperature - this.minTemperature + 1),
                    ) + this.minTemperature;
            }

            this.wantedTemperature = wantedTemperature;
        },
        decreaseTemperature() {
            this.temperature = Math.max(
                this.temperature - 1,
                this.minTemperature,
            );
            this.checkTemperature();
        },
        increaseTemperature() {
            this.temperature = Math.min(
                this.temperature + 1,
                this.maxTemperature,
            );
            this.checkTemperature();
        },
        checkTemperature() {
            if (this.isComplete) {
                return;
            }

            if (this.temperature === this.wantedTemperature) {
                this.isComplete = true;
                this.$emit("success");
            }
        },
    },
};
</script>

<template>
    <div
        class="w-full h-full max-h-full min-h-0 max-w-100 flex flex-col items-center gap-[clamp(1rem,3vh,2rem)] overflow-hidden pt-[clamp(1.5rem,4vh,3rem)] pb-3"
    >
        <h1
            class="text-(--title) text-[clamp(1.25rem,4vh,1.875rem)] leading-tight"
        >
            Ajuster la température
        </h1>

        <div
            class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-[clamp(1rem,4vw,3rem)] w-full min-h-0"
        >
            <div
                class="flex flex-col items-center justify-center gap-[clamp(0.75rem,2.5vh,1.5rem)] min-w-0"
            >
                <div
                    class="w-full max-w-60 border border-(--primary) px-5 py-4 text-center"
                >
                    <p
                        class="text-(--title) text-[clamp(2rem,7vh,3.5rem)] font-bold leading-none"
                    >
                        {{ temperature }}°
                    </p>
                </div>

                <div class="grid grid-cols-2 gap-3 w-full max-w-60">
                    <button
                        @click="decreaseTemperature()"
                        class="w-full h-[clamp(2.5rem,7vh,4rem)] border border-(--primary) hover:bg-(--primary) hover:text-black transition-all duration-100 text-[clamp(1.25rem,3.5vh,1.75rem)] leading-none cursor-pointer"
                    >
                        -
                    </button>
                    <button
                        @click="increaseTemperature()"
                        class="w-full h-[clamp(2.5rem,7vh,4rem)] border border-(--primary) hover:bg-(--primary) hover:text-black transition-all duration-100 text-[clamp(1.25rem,3.5vh,1.75rem)] leading-none cursor-pointer"
                    >
                        +
                    </button>
                </div>
            </div>

            <div
                class="flex flex-col items-center justify-center gap-[clamp(0.75rem,2vh,1rem)]"
            >
                <Thermometer
                    class="h-[clamp(10rem,34vh,18rem)] w-auto"
                    :temperature="temperature"
                    :wantedTemperature="wantedTemperature"
                    :minTemperature="minTemperature"
                    :maxTemperature="maxTemperature"
                />
                <p
                    class="text-(--title) text-[clamp(2.5rem,8vh,4rem)] font-bold leading-none"
                >
                    {{ wantedTemperature }}°
                </p>
            </div>
        </div>
    </div>
</template>
