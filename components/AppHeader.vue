<template>
	<div
		class="relative overflow-hidden rounded-b-[2.5rem] md:rounded-b-[3rem] py-8 sm:py-12 w-full"
		style="
			background: linear-gradient(
				135deg,
				var(--color-burgundy-500) 0%,
				var(--color-rose-500) 50%,
				var(--color-coral-500) 100%
			);
		">
		<!-- Décoration de fond -->
		<BackgroundBubbles />

		<div class="relative z-10 w-full px-4 sm:px-6 text-center">
			<div class="text-4xl sm:text-6xl mb-3 sm:mb-4 animate-bounce-gentle">
				💌
			</div>
			<h1
				class="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-3 sm:mb-4 tracking-tight px-2">
				Les Enveloppes de l'Amour
			</h1>
			<p
				class="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 max-w-3xl mx-auto leading-relaxed px-4"
				style="color: var(--color-cream-100)">
				52 enveloppes pour 52 semaines, pour 52 occasions de te rappeler combien
				tu comptes pour moi, même à distance. Chaque message est une surprise,
				une douceur, un sourire glissé dans ton quotidien, pour rendre cette
				année loin de toi plus légère.
			</p>
			<div class="w-full flex justify-center items-center mt-4 sm:mt-6">
				<div
					class="w-fit bg-white/20 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-white/30 mx-2">
					<span
						class="text-white font-semibold text-sm sm:text-base whitespace-nowrap"
						>Conseil :</span
					>
					<span
						class="text-xs sm:text-sm"
						style="color: var(--color-cream-100)">
						Travaille ta patience... une enveloppe par semaine, pas plus !
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
@keyframes bounce-gentle {
	0%,
	100% {
		transform: translateY(0);
	}
	50% {
		transform: translateY(-10px);
	}
}

.animate-bounce-gentle {
	animation: bounce-gentle 3s ease-in-out infinite;
}
</style>
