<template>
	<div
		class="flex fixed top-2 right-2 sm:top-4 sm:right-4 items-center gap-2 sm:gap-4 px-2 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl backdrop-blur-sm z-50 shadow-lg"
		style="background: rgba(255, 255, 255, 0.45); backdrop-filter: blur(8px)">
		<div class="text-center">
			<div
				class="text-base sm:text-lg font-bold"
				style="color: var(--color-burgundy-700)">
				{{ openedDoorsCount }}
			</div>
			<div
				class="text-[10px] sm:text-xs"
				style="color: var(--color-burgundy-500)">
				Ouvertes
			</div>
		</div>
		<div
			class="w-px h-6 sm:h-8"
			style="background: var(--color-cream-400)"></div>
		<div class="text-center">
			<div
				class="text-base sm:text-lg font-bold"
				style="color: var(--color-coral-500)">
				{{ 52 - openedDoorsCount }}
			</div>
			<div
				class="text-[10px] sm:text-xs"
				style="color: var(--color-burgundy-500)">
				Restantes
			</div>
		</div>
	</div>
</template>

<script setup>
defineProps({
	openedDoorsCount: {
		type: Number,
		required: true,
	},
});
</script>
