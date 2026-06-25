<script>
const directions = [
    {
        id: "left",
        label: "gauche",
        text: "Glisse vers la gauche",
    },
    {
        id: "right",
        label: "droite",
        text: "Glisse vers la droite",
    },
    {
        id: "up",
        label: "haut",
        text: "Glisse vers le haut",
    },
    {
        id: "down",
        label: "bas",
        text: "Glisse vers le bas",
    },
];

const keyDirectionMap = {
    ArrowLeft: "left",
    ArrowRight: "right",
    ArrowUp: "up",
    ArrowDown: "down",
};

export default {
    emits: ["success", "fail"],
    data() {
        return {
            directions,
            targetDirection: directions[0],
            dragging: false,
            resolved: false,
            startPoint: null,
            currentPoint: null,
            minSwipeDistance: 70,
        };
    },
    computed: {
        dragOffset() {
            if (!this.startPoint || !this.currentPoint) {
                return { x: 0, y: 0 };
            }

            return {
                x: this.currentPoint.x - this.startPoint.x,
                y: this.currentPoint.y - this.startPoint.y,
            };
        },
        cardStyle() {
            const x = Math.max(Math.min(this.dragOffset.x, 140), -140);
            const y = Math.max(Math.min(this.dragOffset.y, 140), -140);
            const rotate = Math.max(Math.min(x / 10, 10), -10);

            return {
                transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`,
            };
        },
        activeDirectionId() {
            return this.getDirectionFromDelta(this.dragOffset.x, this.dragOffset.y);
        },
    },
    mounted() {
        this.startGame();
        window.addEventListener("keydown", this.handleKeydown);
    },
    beforeUnmount() {
        window.removeEventListener("keydown", this.handleKeydown);
    },
    methods: {
        startGame() {
            const randomIndex = Math.floor(Math.random() * this.directions.length);
            this.targetDirection = this.directions[randomIndex];
            this.dragging = false;
            this.resolved = false;
            this.startPoint = null;
            this.currentPoint = null;
        },
        startSwipe(event) {
            if (this.resolved) return;

            this.dragging = true;
            this.startPoint = {
                x: event.clientX,
                y: event.clientY,
            };
            this.currentPoint = this.startPoint;

            if (event.currentTarget.setPointerCapture) {
                event.currentTarget.setPointerCapture(event.pointerId);
            }
        },
        moveSwipe(event) {
            if (!this.dragging || this.resolved) return;

            this.currentPoint = {
                x: event.clientX,
                y: event.clientY,
            };
        },
        endSwipe() {
            if (!this.dragging || this.resolved) return;

            const swipedDirectionId = this.getDirectionFromDelta(
                this.dragOffset.x,
                this.dragOffset.y,
            );

            this.dragging = false;

            if (!swipedDirectionId) {
                this.startPoint = null;
                this.currentPoint = null;
                return;
            }

            this.resolveSwipe(swipedDirectionId);
        },
        handleKeydown(event) {
            if (this.resolved) return;

            const directionId = keyDirectionMap[event.key];

            if (!directionId) return;

            event.preventDefault();
            this.resolveSwipe(directionId);
        },
        resolveSwipe(directionId) {
            this.resolved = true;

            if (directionId === this.targetDirection.id) {
                this.$emit("success");
                return;
            }

            this.$emit("fail");
        },
        getDirectionFromDelta(x, y) {
            const distance = Math.hypot(x, y);

            if (distance < this.minSwipeDistance) {
                return null;
            }

            if (Math.abs(x) > Math.abs(y)) {
                return x > 0 ? "right" : "left";
            }

            return y > 0 ? "down" : "up";
        },
    },
};
</script>

<template>
    <div
        class="w-full h-full max-w-100 flex flex-col items-center gap-[clamp(1rem,4vh,2rem)] overflow-hidden pt-[clamp(1.5rem,4vh,3rem)] px-4 text-(--text-color)"
    >
        <h1
            class="text-(--title) text-[clamp(1.5rem,4vh,1.875rem)] leading-tight text-center"
        >
            {{ targetDirection.text }}
        </h1>

        <div
            class="relative grid place-items-center w-full max-w-80 aspect-square border border-(--primary) bg-black/20 overflow-hidden"
        >
            <div class="absolute inset-0 grid grid-cols-3 grid-rows-3 p-4">
                <div
                    v-for="direction in directions"
                    :key="direction.id"
                    class="text-[0.7rem] uppercase tracking-normal text-(--title)"
                    :class="[
                        direction.id === 'up' ? 'col-start-2 row-start-1 self-start justify-self-center' : '',
                        direction.id === 'down' ? 'col-start-2 row-start-3 self-end justify-self-center' : '',
                        direction.id === 'left' ? 'col-start-1 row-start-2 self-center justify-self-start' : '',
                        direction.id === 'right' ? 'col-start-3 row-start-2 self-center justify-self-end' : '',
                        activeDirectionId === direction.id ? 'text-(--primary) opacity-100' : 'opacity-50',
                    ]"
                >
                    {{ direction.label }}
                </div>
            </div>

            <div
                class="relative z-10 flex h-[clamp(8rem,42vw,11rem)] w-[clamp(5.4rem,28vw,7.25rem)] cursor-grab touch-none select-none flex-col justify-between border-2 border-(--primary) bg-(--secondary) p-4 shadow-[0_0_22px_rgba(252,198,0,0.35)] active:cursor-grabbing"
                :class="dragging ? 'transition-none' : 'transition-transform duration-100'"
                :style="cardStyle"
                @pointerdown="startSwipe"
                @pointermove="moveSwipe"
                @pointerup="endSwipe"
                @pointercancel="endSwipe"
                @lostpointercapture="endSwipe"
            >
                <div class="h-5 w-8 border border-(--primary) bg-(--title)"></div>
                <div class="space-y-2">
                    <div class="h-2 w-full bg-(--primary)"></div>
                    <div class="h-2 w-3/4 bg-(--primary)"></div>
                    <div class="h-2 w-1/2 bg-(--primary)"></div>
                </div>
                <div class="text-right text-xs text-(--text-color)">BANK</div>
            </div>
        </div>
    </div>
</template>
