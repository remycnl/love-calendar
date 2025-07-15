<template>
	<div
		class="rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center border"
		:style="cardStyle">
		<div class="text-2xl sm:text-3xl mb-2">{{ icon }}</div>
		<div
			class="text-2xl sm:text-3xl font-black mb-1"
			style="color: var(--color-burgundy-700)">
			{{ value }}
		</div>
		<div
			class="text-xs sm:text-sm font-semibold"
			style="color: var(--color-burgundy-600)">
			{{ label }}
		</div>
	</div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
	icon: {
		type: String,
		required: true,
	},
	value: {
		type: [String, Number],
		required: true,
	},
	label: {
		type: String,
		required: true,
	},
	color: {
		type: String,
		required: true,
		validator: (value) => ["coral", "cream", "rose"].includes(value),
	},
});

const cardStyle = computed(() => {
	const colorMap = {
		coral: {
			background:
				"linear-gradient(135deg, var(--color-coral-100), var(--color-coral-200))",
			borderColor: "var(--color-coral-300)",
		},
		cream: {
			background:
				"linear-gradient(135deg, var(--color-cream-100), var(--color-cream-200))",
			borderColor: "var(--color-cream-400)",
		},
		rose: {
			background:
				"linear-gradient(135deg, var(--color-rose-100), var(--color-rose-200))",
			borderColor: "var(--color-rose-300)",
		},
	};

	return {
		background: colorMap[props.color].background,
		borderColor: colorMap[props.color].borderColor,
	};
});
</script>
