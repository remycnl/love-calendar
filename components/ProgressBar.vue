<template>
	<div class="mt-6 sm:mt-8">
		<div
			class="flex justify-between text-xs sm:text-sm font-semibold mb-2"
			style="color: var(--color-burgundy-600)">
			<span>Progression</span>
			<span>{{ openedDoorsCount }}/52</span>
		</div>
		<div
			class="w-full rounded-full h-3 sm:h-4 overflow-hidden"
			style="background-color: var(--color-cream-300)">
			<div
				class="h-3 sm:h-4 rounded-full transition-all duration-1000 shadow-lg"
				style="
					background: linear-gradient(
						90deg,
						var(--color-coral-500),
						var(--color-burgundy-500)
					);
				"
				:style="{ width: progressWidth + '%' }"></div>
		</div>
	</div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
	openedDoorsCount: {
		type: Number,
		required: true,
	},
});

const progressWidth = computed(() => {
	return (props.openedDoorsCount / 52) * 100;
});
</script>
