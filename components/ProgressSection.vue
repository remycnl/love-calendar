<template>
	<div
		class="w-full backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border shadow-2xl mb-8 sm:mb-12"
		style="
			background: rgba(234, 235, 208, 0.7);
			border-color: var(--color-cream-400);
		">
		<div class="text-center mb-6 sm:mb-8">
			<h3
				class="text-xl sm:text-2xl font-bold mb-2"
				style="color: var(--color-burgundy-800)">
				Ta Progression
			</h3>
			<p class="text-sm sm:text-base" style="color: var(--color-burgundy-600)">
				Trois stats que tu peux analyser comme une vraie data analyste !
			</p>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
			<!-- Enveloppes ouvertes -->
			<StatCard
				icon="📬"
				:value="openedDoorsCount"
				label="Enveloppes ouvertes"
				color="coral" />

			<!-- Enveloppes restantes -->
			<StatCard
				icon="📮"
				:value="52 - openedDoorsCount"
				label="Enveloppes restantes"
				color="cream" />

			<!-- Pourcentage -->
			<StatCard
				icon="📊"
				:value="`${Math.round((openedDoorsCount / 52) * 100)}%`"
				label="Progression totale"
				color="rose" />
		</div>

		<!-- Barre de progression détaillée -->
		<ProgressBar :opened-doors-count="openedDoorsCount" />
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
