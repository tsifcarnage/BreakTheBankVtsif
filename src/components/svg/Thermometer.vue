<script>
const thermometerTop = 15.5;
const thermometerBottom = 267.007;
const thermometerFillBottom = 345.164;
const thermometerHeight = thermometerBottom - thermometerTop;

export default {
    props: {
        temperature: {
            type: Number,
            default: 0,
        },
        wantedTemperature: {
            type: Number,
            default: 0,
        },
        minTemperature: {
            type: Number,
            default: -15,
        },
        maxTemperature: {
            type: Number,
            default: 30,
        },
    },
    data() {
        return {
            clipId: `thermometer-fill-${Math.random().toString(36).slice(2)}`,
        };
    },
    computed: {
        fillY() {
            return (
                thermometerBottom -
                this.getTemperatureRatio(this.temperature) * thermometerHeight
            );
        },
        fillHeight() {
            return thermometerFillBottom - this.fillY;
        },
        wantedY() {
            return (
                thermometerBottom -
                this.getTemperatureRatio(this.wantedTemperature) *
                    thermometerHeight
            );
        },
    },
    methods: {
        getTemperatureRatio(value) {
            const range = this.maxTemperature - this.minTemperature;

            if (range <= 0) {
                return 0;
            }

            return Math.min(
                Math.max((value - this.minTemperature) / range, 0),
                1,
            );
        },
    },
};
</script>

<template>
    <svg
        width="105"
        height="356"
        viewBox="0 0 105 356"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
            <clipPath :id="clipId">
                <path
                    d="M42.1647 25.7729C42.1647 20.1 46.7647 15.5 52.4376 15.5C58.1105 15.5 62.7105 20.1 62.7105 25.7729V267.007H42.1647V25.7729Z"
                />
                <circle cx="52.4376" cy="302.629" r="36.816" />
            </clipPath>
        </defs>

        <g :clip-path="`url(#${clipId})`">
            <rect
                x="0"
                y="0"
                width="105"
                height="356"
                fill="var(--secondary)"
            />
            <rect
                x="0"
                :y="fillY"
                width="105"
                :height="fillHeight"
                fill="var(--primary)"
            />
        </g>

        <path
            d="M47.8008 0.410327C45.2187 0.882327 43.3029 1.52091 40.9151 2.7148C33.8351 6.24091 28.9208 12.2936 26.8384 20.0122L26.1999 22.3444L26.061 139.845L25.9222 257.345L23.5622 258.9C11.429 267.007 3.73823 278.529 0.767404 293.133C0.0177573 296.743 -0.232125 304.878 0.239875 308.959C2.84976 331.088 19.2864 349.274 41.0817 354.105C68.5688 360.185 96.1113 343.415 103.219 316.206C104.607 310.903 104.774 309.348 104.774 302.629C104.774 295.993 104.552 294.272 103.08 288.774C100.554 279.418 94.7786 270.089 87.5321 263.703C85.1721 261.593 81.6182 258.955 79.7302 257.9L78.5363 257.234V242.852V228.497H87.5598H96.5833V225.165V221.834H87.5598H78.5363V200.594V179.354H87.5598H96.5833V176.022V172.69H87.5598H78.5363V151.45V130.21H87.5598H96.5833V126.878V123.547L87.6431 123.491L78.6751 123.408L78.5918 102.223L78.5363 81.0667H87.5598H96.5833V77.5962V74.1256H87.5598H78.5363V48.7764C78.5363 25.1764 78.4808 23.2884 78.0088 20.9562C76.9537 15.792 74.4827 11.3774 70.5123 7.49032C64.4318 1.57644 55.9636 -1.08897 47.8008 0.410327ZM57.2408 10.1002C62.4883 11.7661 66.6808 15.903 68.4855 21.2061L69.2351 23.455L69.3184 143.176L69.3739 262.898L72.6502 264.813C81.2572 269.922 86.5881 275.392 90.5862 283.249C97.6384 297.076 96.8888 313.207 88.5871 326.09C82.2568 335.947 72.4836 342.61 60.6836 345.164C56.5189 346.053 48.3005 346.053 44.0248 345.164C30.5867 342.332 19.8695 334.086 13.7057 321.814C7.87516 310.181 7.93069 295.521 13.8446 283.721C17.7872 275.808 23.6455 269.728 32.0027 264.841L35.501 262.814V144.37C35.501 68.6004 35.6121 25.2875 35.7787 24.0658C36.3617 20.1788 37.861 17.1524 40.7208 14.2927C42.581 12.4324 45.6907 10.6 47.9951 10.0447C48.6893 9.87809 49.4944 9.65597 49.7998 9.60044C50.8549 9.35056 55.9081 9.68373 57.2408 10.1002Z"
            fill="var(--primary)"
            fill-rule="evenodd"
            clip-rule="evenodd"
        />

        <line
            x1="42.1647"
            x2="62.7105"
            :y1="wantedY"
            :y2="wantedY"
            stroke="var(--text-color)"
            stroke-width="4"
            stroke-linecap="square"
        />
    </svg>
</template>
