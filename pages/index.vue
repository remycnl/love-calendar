<template>
	<div
		class="relative min-h-screen w-full bg-linear-to-br from-cream-200 via-cream-50 to-white"
	>
		<!-- Statistiques flottantes -->
		<FloatingStats :opened-doors-count="openedDoorsCount" />

		<!-- Header -->
		<AppHeader />

		<!-- Conteneur principal -->
		<div class="w-full px-4 sm:px-6 py-8 sm:py-12">
			<!-- Section statistiques -->
			<ProgressSection :opened-doors-count="openedDoorsCount" />

			<!-- Grille des enveloppes -->
			<EnvelopesGrid :doors="doors" @door-opened="handleDoorOpened" />

			<!-- Footer -->
			<AppFooter />
		</div>
	</div>
</template>

<script setup>
import { computed } from "vue";

// Charger les données des portes
const { data: doorsData } = useFetch("/api/doors");

const doors = computed(() => doorsData.value?.doors || []);

// Compter les portes ouvertes
const openedDoorsCount = computed(() => {
	return doors.value.filter((door) => door.opened).length;
});

// Gérer l'ouverture d'une porte
const handleDoorOpened = (updatedDoor) => {
	if (doorsData.value?.doors) {
		const doorIndex = doorsData.value.doors.findIndex(
			(d) => d.week === updatedDoor.week
		);
		if (doorIndex !== -1) {
			doorsData.value.doors[doorIndex] = { ...updatedDoor };
		}
	}
};
</script>

<style scoped>
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
