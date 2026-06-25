<script>
export default {
    data() {
        return {
            wires: {
                crimson: false,
                deepskyblue: false,
                forestgreen: false,
                gold: false,
            },
            shuffledWires: [],
            wireLines: {},
            draggingColor: null,
            draggingSide: null,
            start: null,
            mouse: null,
        };
    },
    mounted() {
        this.shuffleWires();
    },
    methods: {
        startDrag(color, side, event) {
            if (this.wires[color]) return;

            if (event.currentTarget.releasePointerCapture) {
                event.currentTarget.releasePointerCapture(event.pointerId);
            }

            const startPoint = this.getElementCenter(event.currentTarget);

            this.draggingColor = color;
            this.draggingSide = side;
            this.start = startPoint;
            this.mouse = { x: event.clientX, y: event.clientY };
        },

        moveDrag(event) {
            if (!this.draggingColor) return;

            this.mouse = {
                x: event.clientX,
                y: event.clientY,
            };
        },

        endDrag(event) {
            if (!this.draggingColor) {
                this.stopDrag();
                return;
            }

            const element = document.elementFromPoint(
                event.clientX,
                event.clientY,
            );
            const dot = element && element.closest("[data-wire-color]");

            if (!dot) {
                this.stopDrag();
                return;
            }

            this.connectWire(dot.dataset.wireColor, dot.dataset.wireSide, dot);
        },

        stopDrag() {
            this.draggingColor = null;
            this.draggingSide = null;
            this.start = null;
            this.mouse = null;
        },

        connectWire(color, side, element) {
            const isSameColor = this.draggingColor === color;
            const isOppositeSide = this.draggingSide !== side;

            if (!this.draggingColor || !isSameColor || !isOppositeSide) {
                this.stopDrag();
                return;
            }

            this.wires[color] = true;
            this.wireLines[color] = {
                start: this.start,
                end: this.getElementCenter(element),
            };

            this.checkWin();
            this.stopDrag();
        },

        getElementCenter(element) {
            const rect = element.getBoundingClientRect();

            return {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
            };
        },

        shuffleWires() {
            const colors = Object.keys(this.wires);

            for (let i = colors.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [colors[i], colors[j]] = [colors[j], colors[i]];
            }

            this.shuffledWires = colors;
        },
        checkWin() {
            const hasWon = Object.values(this.wires).every(
                (isConnected) => isConnected,
            );

            if (hasWon) {
                this.$emit("success");
            }
        },
    },
};
</script>

<template>
    <div
        class="flex items-center flex-col gap-[clamp(2rem,8vh,5rem)] w-full h-full max-w-100 overflow-hidden pt-[clamp(1.5rem,4vh,3rem)] touch-none select-none"
        @pointermove="moveDrag"
        @pointerup="endDrag"
        @pointercancel="stopDrag"
    >
        <svg
            class="fixed inset-0 pointer-events-none z-50"
            width="100%"
            height="100%"
        >
            <line
                v-for="(line, color) in wireLines"
                :key="color"
                :x1="line.start.x"
                :y1="line.start.y"
                :x2="line.end.x"
                :y2="line.end.y"
                :stroke="color"
                stroke-width="6"
                stroke-linecap="square"
            />
            <line
                v-if="draggingColor && start && mouse"
                :x1="start.x"
                :y1="start.y"
                :x2="mouse.x"
                :y2="mouse.y"
                :stroke="draggingColor"
                stroke-width="6"
                stroke-linecap="square"
            />
        </svg>

        <div
            class="text-(--title) text-[clamp(1.25rem,4vh,1.875rem)] leading-tight text-center"
        >
            Reliez les bouttons de meme couleur
        </div>

        <div class="grid grid-cols-2 gap-x-[clamp(4rem,20vw,6rem)]">
            <div class="grid gap-y-[clamp(1rem,4vh,2rem)]">
                <div v-for="(dragState, color) in wires" :key="`left-${color}`">
                    <div
                        class="size-[clamp(1.75rem,8vw,2rem)] cursor-pointer border-2 border-white shadow-md touch-none"
                        :style="{ backgroundColor: color }"
                        :data-wire-color="color"
                        data-wire-side="left"
                        @pointerdown="startDrag(color, 'left', $event)"
                    ></div>
                </div>
            </div>

            <div class="grid gap-y-[clamp(1rem,4vh,2rem)]">
                <div v-for="color in shuffledWires" :key="`right-${color}`">
                    <div
                        class="size-[clamp(1.75rem,8vw,2rem)] cursor-pointer border-2 border-white shadow-md touch-none"
                        :style="{ backgroundColor: color }"
                        :data-wire-color="color"
                        data-wire-side="right"
                        @pointerdown="startDrag(color, 'right', $event)"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>
