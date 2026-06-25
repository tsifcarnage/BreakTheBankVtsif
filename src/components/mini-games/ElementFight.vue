<script>
import Fire from "../svg/Fire.vue";
import Ice from "../svg/Ice.vue";
import Water from "../svg/Water.vue";

const ELEMENTS = [
    { id: "water", label: "Eau", icon: "Water" },
    { id: "fire", label: "Feu", icon: "Fire" },
    { id: "ice", label: "Glace", icon: "Ice" },
];

export default {
    components: {
        Fire,
        Ice,
        Water,
    },
    data() {
        return {
            elements: ELEMENTS,
            playerChoice: null,
            cpuChoice: null,
            message: "",
            locked: false,
        };
    },

    mounted() {
        this.newRound();
    },

    computed: {
        cpuElement() {
            return (
                ELEMENTS.find((element) => element.id === this.cpuChoice) ||
                null
            );
        },
    },

    methods: {
        newRound() {
            const choices = ["water", "fire", "ice"];
            this.cpuChoice = choices[Math.floor(Math.random() * 3)];
        },

        play(choice) {
            if (this.locked) return;

            this.locked = true;
            this.playerChoice = choice;

            const outcome = this.getOutcome(choice, this.cpuChoice);

            if (outcome === "tie") {
                this.message = "Égalité, rejoue !";
                setTimeout(() => {
                    this.playerChoice = null;
                    this.message = "";
                    this.newRound();
                    this.locked = false;
                }, 1000);
                return;
            }

            if (outcome === "win") {
                this.$emit("success");
            } else {
                this.$emit("fail");
            }
        },

        getOutcome(player, cpu) {
            if (player === cpu) return "tie";

            if (
                (player === "fire" && cpu === "ice") ||
                (player === "ice" && cpu === "water") ||
                (player === "water" && cpu === "fire")
            ) {
                return "win";
            }

            return "lose";
        },
    },
};
</script>

<template>
    <div
        class="w-full h-full max-w-100 flex flex-col items-center gap-[clamp(0.75rem,3vh,1.5rem)] overflow-y-auto pt-[clamp(1rem,3vh,2rem)] pb-3 text-(--text-color)"
    >
        <h1
            class="text-(--title) text-[clamp(1.25rem,4vh,1.875rem)] leading-tight text-center"
        >
            Eau <span class="vs">vs.</span> Feu
            <span class="vs">vs.</span> Glace
        </h1>

        <div
            class="flex flex-col items-center gap-2 w-full max-w-72 border-2 border-(--error) bg-black/20 shadow-[0_0_16px_rgba(229,0,0,0.4)] px-4 py-[clamp(0.75rem,2.5vh,1.25rem)]"
        >
            <p
                class="text-(--error) font-bold uppercase tracking-wide text-[clamp(0.8rem,2.4vh,1.05rem)]"
            >
                L'IA attaque avec
            </p>
            <component
                v-if="cpuElement"
                :is="cpuElement.icon"
                class="h-[clamp(2.5rem,9vh,4rem)] w-[clamp(2.5rem,9vh,4rem)]"
            />
            <span class="text-[clamp(1rem,3vh,1.5rem)] font-semibold">
                {{ cpuElement?.label }}
            </span>
        </div>

        <p
            class="text-center opacity-80 text-[clamp(0.85rem,2.4vh,1.1rem)] leading-tight"
        >
            Choisis l'élément qui la bat
        </p>

        <div class="grid grid-cols-3 gap-[clamp(0.5rem,2vw,0.75rem)] w-full">
            <button
                v-for="element in elements"
                :key="element.id"
                @click="play(element.id)"
                :disabled="locked"
                class="player-btn flex flex-col items-center justify-center gap-1 border-2 border-(--primary) py-[clamp(0.75rem,2.5vh,1.25rem)] transition-all duration-150"
            >
                <component
                    :is="element.icon"
                    class="h-[clamp(2rem,7vh,3rem)] w-[clamp(2rem,7vh,3rem)]"
                />
                <span class="text-[clamp(0.85rem,2.4vh,1.1rem)]">
                    {{ element.label }}
                </span>
            </button>
        </div>

        <p
            v-if="message"
            class="text-(--title) font-bold text-[clamp(1rem,3vh,1.5rem)] min-h-6"
        >
            {{ message }}
        </p>
    </div>
</template>

<style scoped>
.vs {
    font-size: 0.55em;
    font-style: italic;
    opacity: 0.65;
    vertical-align: middle;
}
.player-btn {
    cursor: pointer;
}
.player-btn:hover:not(:disabled) {
    background-color: var(--primary);
    color: black;
    box-shadow: 0 0 14px rgba(252, 198, 0, 0.4);
}
.player-btn:disabled {
    opacity: 0.5;
    cursor: default;
}
</style>
