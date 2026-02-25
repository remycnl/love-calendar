<template>
	<div
		class="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-3 sm:gap-4 md:gap-6 mb-12 sm:mb-16">
		<!-- Enveloppe spéciale 0 - apparaît seulement quand toutes les autres sont ouvertes -->
		<Transition
			name="special-door"
			enter-active-class="transition-all duration-1000 ease-out"
			leave-active-class="transition-all duration-500 ease-in"
			enter-from-class="opacity-0 scale-0"
			enter-to-class="opacity-100 scale-100"
			leave-from-class="opacity-100 scale-100"
			leave-to-class="opacity-0 scale-0">
			<DoorCard
				v-if="specialDoor && showSpecialDoor"
				:key="specialDoor.week"
				:door="specialDoor"
				@door-opened="$emit('door-opened', $event)"
				class="transform transition-all duration-300 hover:z-10 special-door-card" />
		</Transition>

		<!-- Enveloppes normales -->
		<DoorCard
			v-for="door in doors"
			:key="door.week"
			:door="door"
			@door-opened="$emit('door-opened', $event)"
			class="transform transition-all duration-300 hover:z-10" />
	</div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted } from "vue";

const props = defineProps({
	doors: {
		type: Array,
		required: true,
	},
});

const emit = defineEmits(["door-opened"]);

// État pour contrôler l'affichage de la carte spéciale
// Initialiser en fonction de l'état actuel des portes
const showSpecialDoor = ref(false);

// Vérifier au montage si toutes les portes sont déjà ouvertes
onMounted(() => {
	// Attendre le prochain tick pour s'assurer que toutes les données sont chargées
	nextTick(() => {
		if (props.doors.length > 0 && allDoorsOpened.value) {
			showSpecialDoor.value = true;
		}
	});
});

// Calculer si toutes les enveloppes normales sont ouvertes
const allDoorsOpened = computed(() => {
	// S'assurer qu'il y a des portes avant de vérifier
	if (!props.doors || props.doors.length === 0) return false;
	return props.doors.every((door) => door.opened);
});

// Créer l'enveloppe spéciale quand toutes les autres sont ouvertes
const specialDoor = computed(() => {
	if (!allDoorsOpened.value) return null;

	return {
		id: 0,
		week: 0,
		opened: false, // Toujours fermée au début
		title: "Ce n'est pas un cadeau…",
		text: "Toutes ces petites attentions, toutes ces enveloppes que je t'ai laissées dans cette boîte aux lettres. C'était surtout ma façon de rester avec toi malgré la distance.\n\nAujourd'hui, ce que je veux t'offrir, ce n'est pas un objet, ni une surprise matérielle. Ce que je veux, c'est un moment avec toi, quelque chose qu'on vit à deux, sans avoir à compter les jours avant le prochain départ.\n\nAlors voilà la vraie idée derrière tout ça : on choisit une destination ensemble, peu importe où, juste toi et moi. On prend nos billets, on fait nos sacs, et on part.\n\nLe but: créer un souvenir qu'aucune enveloppe n'aurait pu contenir.\n🤍",
	};
});

// Surveiller l'apparition de l'enveloppe spéciale
watch(allDoorsOpened, async (newValue) => {
	// Vérifier qu'il y a des portes avant de procéder
	if (props.doors.length === 0) return;

	if (newValue && !showSpecialDoor.value) {
		// Attendre le prochain tick pour s'assurer que le DOM est prêt
		await nextTick();
		// Délai avant l'apparition pour créer un effet de suspense
		setTimeout(() => {
			showSpecialDoor.value = true;
			console.log("🎉 L'enveloppe spéciale est maintenant disponible !");
		}, 500);
	}
	// Ne pas cacher la carte spéciale une fois qu'elle est apparue
});
</script>

<style scoped>
/* Carte spéciale avec effet de pulsation pour attirer l'attention */
.special-door-card {
	animation: special-pulse 2s ease-in-out infinite;
}

@keyframes special-pulse {
	0%,
	100% {
		transform: scale(1);
		box-shadow: 0 0 20px rgba(255, 105, 180, 0.3);
	}
	50% {
		transform: scale(1.02);
		box-shadow: 0 0 30px rgba(255, 105, 180, 0.5);
	}
}

/* Effet hover plus prononcé pour la carte spéciale */
.special-door-card:hover {
	animation: special-hover-pulse 0.6s ease-in-out infinite alternate;
}

@keyframes special-hover-pulse {
	0% {
		transform: scale(1);
		box-shadow: 0 0 25px rgba(255, 105, 180, 0.4);
	}
	100% {
		transform: scale(1.05);
		box-shadow: 0 0 35px rgba(255, 105, 180, 0.7);
	}
}
</style>
