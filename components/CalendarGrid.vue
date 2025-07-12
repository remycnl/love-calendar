<template>
	<div
		class="relative min-h-screen w-full"
		style="
			background: linear-gradient(
				135deg,
				var(--color-cream-200) 0%,
				var(--color-cream-50) 50%,
				#ffffff 100%
			);
		">
        <!-- Statistiques flottantes lisibles sur fond crème et rouge -->
        <div
            class="flex fixed top-2 right-2 sm:top-4 sm:right-4 items-center gap-2 sm:gap-4 px-2 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl backdrop-blur-sm z-50 shadow-lg"
            style="
                background: rgba(255,255,255,0.45);
                backdrop-filter: blur(8px);
            "
        >
            <div class="text-center">
                <div class="text-base sm:text-lg font-bold" style="color: var(--color-burgundy-700)">
                    {{ openedDoorsCount }}
                </div>
                <div class="text-[10px] sm:text-xs" style="color: var(--color-burgundy-500)">
                    Ouvertes
                </div>
            </div>
            <div class="w-px h-6 sm:h-8" style="background: var(--color-cream-400)"></div>
            <div class="text-center">
                <div class="text-base sm:text-lg font-bold" style="color: var(--color-coral-500)">
                    {{ 52 - openedDoorsCount }}
                </div>
                <div class="text-[10px] sm:text-xs" style="color: var(--color-burgundy-500)">
                    Restantes
                </div>
            </div>
        </div>
		<!-- Header avec consigne - Full Width et responsive -->
		<div
			class="relative overflow-hidden py-8 sm:py-12 w-full"
			style="
				background: linear-gradient(
					135deg,
					var(--color-burgundy-500) 0%,
					var(--color-rose-500) 50%,
					var(--color-coral-500) 100%
				);
			">
			<!-- Décoration de fond -->
			<div class="absolute inset-0 overflow-hidden">
				<div
					v-for="i in bubbleCount"
					:key="i"
					class="absolute rounded-full bg-white/10 animate-float"
					:style="{
						width: `${Math.random() * 100 + 50}px`,
						height: `${Math.random() * 100 + 50}px`,
						top: `${Math.random() * 100}%`,
						left: `${Math.random() * 100}%`,
						animationDelay: `${i * 0.3}s`,
						animationDuration: `${4 + Math.random() * 3}s`,
					}"></div>
			</div>

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
					52 enveloppes pour 52 semaines, pour 52 occasions de te rappeler
					combien tu comptes pour moi, même à distance. Chaque message est une
					surprise, une douceur, un sourire glissé dans ton quotidien, pour
					rendre cette année loin de toi plus légère.
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

		<!-- Conteneur principal - Full Width et responsive -->
		<div class="w-full px-4 sm:px-6 py-8 sm:py-12">
			<!-- Section statistiques - Full Width et responsive -->
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
					<p
						class="text-sm sm:text-base"
						style="color: var(--color-burgundy-600)">
						Trois stats que tu peux analyser comme une vraie data analyste !
					</p>
				</div>

				<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
					<!-- Enveloppes ouvertes -->
					<div
						class="rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center border"
						style="
							background: linear-gradient(
								135deg,
								var(--color-coral-100),
								var(--color-coral-200)
							);
							border-color: var(--color-coral-300);
						">
						<div class="text-2xl sm:text-3xl mb-2">📬</div>
						<div
							class="text-2xl sm:text-3xl font-black mb-1"
							style="color: var(--color-burgundy-700)">
							{{ openedDoorsCount }}
						</div>
						<div
							class="text-xs sm:text-sm font-semibold"
							style="color: var(--color-burgundy-600)">
							Enveloppes ouvertes
						</div>
					</div>

					<!-- Enveloppes restantes -->
					<div
						class="rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center border"
						style="
							background: linear-gradient(
								135deg,
								var(--color-cream-100),
								var(--color-cream-200)
							);
							border-color: var(--color-cream-400);
						">
						<div class="text-2xl sm:text-3xl mb-2">📮</div>
						<div
							class="text-2xl sm:text-3xl font-black mb-1"
							style="color: var(--color-burgundy-700)">
							{{ 52 - openedDoorsCount }}
						</div>
						<div
							class="text-xs sm:text-sm font-semibold"
							style="color: var(--color-burgundy-600)">
							Enveloppes restantes
						</div>
					</div>

					<!-- Pourcentage -->
					<div
						class="rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center border sm:col-span-1 col-span-1"
						style="
							background: linear-gradient(
								135deg,
								var(--color-rose-100),
								var(--color-rose-200)
							);
							border-color: var(--color-rose-300);
						">
						<div class="text-2xl sm:text-3xl mb-2">📊</div>
						<div
							class="text-2xl sm:text-3xl font-black mb-1"
							style="color: var(--color-burgundy-700)">
							{{ Math.round((openedDoorsCount / 52) * 100) }}%
						</div>
						<div
							class="text-xs sm:text-sm font-semibold"
							style="color: var(--color-burgundy-600)">
							Progression totale
						</div>
					</div>
				</div>

				<!-- Barre de progression détaillée -->
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
							:style="{ width: (openedDoorsCount / 52) * 100 + '%' }"></div>
					</div>
				</div>
			</div>

			<!-- Grille des enveloppes - Full Width with improved responsive breakpoints -->
			<div
				class="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-3 sm:gap-4 md:gap-6 mb-12 sm:mb-16">
				<DoorCard
					v-for="door in doors"
					:key="door.week"
					:door="door"
					@door-opened="handleDoorOpened"
					class="transform transition-all duration-300 hover:z-10" />
			</div>

			<!-- Footer inspirant - Full Width et responsive -->
			<div class="w-full text-center px-4">
				<p
					class="italic text-sm sm:text-base"
					style="color: var(--color-burgundy-500)">
					"Chaque enveloppe contient un fragment d'amour,
					<br class="hidden sm:block" />
					et toutes ensemble, elles écrivent notre histoire..."
				</p>

				<!-- Lien secret vers l'admin -->
				<div class="mt-6 sm:mt-8">
					<NuxtLink
						to="/admin"
						class="inline-flex items-center gap-2 text-xs transition-colors opacity-50 hover:opacity-100"
						style="color: var(--color-burgundy-400)">
						<span>⚙️</span>
						<span>Administration</span>
					</NuxtLink>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// Charger les données des portes - sans refresh global
const { data: doorsData } = useFetch("/api/doors");

const doors = computed(() => doorsData.value?.doors || []);

// Compter les portes ouvertes
const openedDoorsCount = computed(() => {
	return doors.value.filter((door) => door.opened).length;
});

// Gérer l'ouverture d'une porte - mise à jour locale uniquement
const handleDoorOpened = (updatedDoor) => {
	// Mettre à jour directement les données locales sans refresh complet
	if (doorsData.value?.doors) {
		const doorIndex = doorsData.value.doors.findIndex(
			(d) => d.week === updatedDoor.week
		);
		if (doorIndex !== -1) {
			doorsData.value.doors[doorIndex] = { ...updatedDoor };
		}
	}
};

// Nombre de bulles dynamique selon la taille de l'écran
const bubbleCount = ref(12);

function updateBubbleCount() {
	const w = window.innerWidth;
	if (w < 640) bubbleCount.value = 8;
	else if (w < 1024) bubbleCount.value = 14;
	else if (w < 1536) bubbleCount.value = 20;
	else bubbleCount.value = 28;
}

onMounted(() => {
	updateBubbleCount();
	window.addEventListener("resize", updateBubbleCount);
});
onUnmounted(() => {
	window.removeEventListener("resize", updateBubbleCount);
});
</script>

<style scoped>
@keyframes float {
	0%,
	100% {
		transform: translateY(0px) rotate(0deg) scale(1);
		opacity: 0.7;
	}
	50% {
		transform: translateY(-20px) rotate(180deg) scale(1.1);
		opacity: 1;
	}
}

@keyframes bounce-gentle {
	0%,
	100% {
		transform: translateY(0);
	}
	50% {
		transform: translateY(-10px);
	}
}

.animate-float {
	animation: float 4s ease-in-out infinite;
}

.animate-bounce-gentle {
	animation: bounce-gentle 3s ease-in-out infinite;
}

/* Scrollbar personnalisée */
::-webkit-scrollbar {
	width: 8px;
}

::-webkit-scrollbar-track {
	background: rgb(243 244 246);
	border-radius: 10px;
}

::-webkit-scrollbar-thumb {
	background: linear-gradient(to bottom, rgb(139 92 246), rgb(168 85 247));
	border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
	background: linear-gradient(to bottom, rgb(124 58 237), rgb(147 51 234));
}
</style>
