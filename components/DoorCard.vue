<template>
	<!-- Modal/Overlay pour l'affichage plein écran - avec animations fluides -->
	<Transition name="modal" appear>
		<div
			v-if="isExpanded"
			class="fixed inset-0 bg-rose-200/20 z-50 backdrop-blur-lg transition-all duration-500"
			@click="closeExpanded">
			<!-- Explosion de cœurs -->
			<div class="absolute inset-0 pointer-events-none">
				<div
					v-for="heart in hearts"
					:key="heart.id"
					:class="[
						'absolute text-2xl transition-all duration-1000 heart-explosion',
						{ 'heart-animate': showHearts },
					]"
					:style="{
						left: heart.x + '%',
						top: heart.y + '%',
						transform:
							`translate(-50%, -50%) scale(${heart.scale}) rotate(${heart.rotation}deg)` +
							(showHearts ? ' scale(1.2)' : ''),
						animationDelay: heart.delay + 'ms',
					}">
					{{ door.week === 0 ? "🎉" : "❤️" }}
				</div>
			</div>

			<div
				class="absolute inset-0 flex items-center justify-center p-4 sm:p-6 lg:p-8">
				<Transition name="card" appear>
					<div
						v-if="isExpanded"
						:class="[
							'relative w-full h-80 sm:h-96 perspective-1000',
							door.week === 0
								? 'max-w-sm sm:max-w-lg lg:max-w-xl'
								: 'max-w-xs sm:max-w-md lg:max-w-lg',
						]"
						@click.stop>
						<!-- Modal Card avec flip animation -->
						<div
							:class="[
								'relative w-full h-full transition-transform duration-700 transform-style-preserve-3d',
								{ 'rotate-y-180': showBackSide },
							]">
							<!-- Face avant de la modal (titre + bouton révéler) -->
							<div
								class="absolute inset-0 w-full h-full rounded-2xl sm:rounded-3xl backface-hidden border-4 shadow-2xl backdrop-blur-xl p-6 sm:p-8 flex flex-col items-center justify-center"
								:style="{
									background: 'linear-gradient(135deg, var(--color-rose-50), var(--color-coral-200))',
									borderColor: 'var(--color-coral-300)'
								}">
								<!-- Icône enveloppe -->
								<div
									:class="[
										'text-4xl sm:text-6xl mb-4 sm:mb-6',
										door.week === 0
											? 'animate-special-bounce'
											: 'animate-gentle-bounce',
									]">
									{{ door.week === 0 ? "🎁" : "📩" }}
								</div>

								<!-- Numéro de semaine -->
								<div
									v-if="door.week !== 0"
									:class="[
										'text-3xl sm:text-5xl font-black text-transparent bg-clip-text mb-3 sm:mb-4',
									]"
									:style="{
										backgroundImage:
											'linear-gradient(90deg, var(--color-coral-600), var(--color-burgundy-600))',
									}">
									{{ door.week }}
								</div>

								<!-- Titre -->
								<h3
									v-if="door.week !== 0"
									:class="[
										'text-lg sm:text-2xl font-bold mb-4 sm:mb-6 text-center px-2',
										door.week === 0 ? 'special-title' : '',
									]"
									:style="
										door.week === 0
											? { color: 'var(--color-rose-800)' }
											: { color: 'var(--color-burgundy-800)' }
									">
									{{ door.title }}
								</h3>

								<!-- Bouton révéler -->
								<button
									@click="revealContent"
									:class="[
										'px-6 sm:px-8 cursor-pointer py-3 sm:py-4 text-white font-bold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 transform hover:scale-105 text-sm sm:text-base',
										door.week === 0 ? 'special-button' : '',
									]"
									:style="{
										background: 'linear-gradient(90deg, var(--color-coral-500), var(--color-burgundy-500))',
									}">
									{{
										door.week === 0
											? "Découvrir la surprise"
											: "Révéler le message"
									}}
								</button>
							</div>

							<!-- Face arrière de la modal (message) -->
							<div
								class="absolute inset-0 w-full h-full rounded-2xl sm:rounded-3xl backface-hidden rotate-y-180 border-4 shadow-2xl backdrop-blur-xl p-6 sm:p-8 flex flex-col items-center justify-center"
								:style="{
									background: 'linear-gradient(135deg, var(--color-coral-50), var(--color-rose-50))',
									borderColor: 'var(--color-coral-200)'
								}">
								<!-- Message avec scroll si nécessaire -->
								<div
									class="text-base sm:text-2xl leading-relaxed text-center mb-6 sm:mb-8 max-w-full overflow-y-auto flex-1 flex px-2 whitespace-pre-line wrap-break-word justify-center"
									:style="
										door.week === 0
											? { color: 'var(--color-rose-800)', minHeight: '0' }
											: { color: 'var(--color-burgundy-800)', minHeight: '0' }
									">
									<div
										class="w-full flex justify-center"
										:class="{
											'items-center': !isScrollable,
											'items-start': isScrollable,
										}"
										ref="messageContainer"
										style="min-height: 0">
										{{ door.text }}
									</div>
								</div>

								<!-- Bouton fermer -->
								<button
									@click="closeExpanded"
									:class="[
										'cursor-pointer px-4 sm:px-6 py-2 sm:py-3 text-white font-semibold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 transform hover:scale-105 text-sm sm:text-base',
										door.week === 0 ? 'special-close' : '',
									]"
									:style="
										door.week === 0
											? {
													background:
														'linear-gradient(90deg, var(--color-rose-400), var(--color-coral-400))',
													boxShadow: '0 0 15px rgba(255, 105, 180, 0.3)',
											  }
											: {
													background:
														'linear-gradient(90deg, var(--color-rose-400), var(--color-coral-400))',
											  }
									">
									Fermer
								</button>
							</div>
						</div>
					</div>
				</Transition>
			</div>
		</div>
	</Transition>

	<!-- Carte simple dans la grille - amélioré responsive -->
	<div class="relative group h-full">
		<div
			:class="[
				'relative w-full h-full min-h-40 sm:min-h-45 transition-all duration-200 active:scale-95 cursor-pointer',
				'transform hover:scale-105 hover:-rotate-1',
				'rounded-xl sm:rounded-2xl overflow-hidden',
				'border shadow-lg backdrop-blur-sm',
				'hover:shadow-xl',
				'flex flex-col items-center justify-center relative p-3 sm:p-4',
				localOpened ? 'ring-2 ring-opacity-60 ring-coral-300' : '',
				door.week === 0 ? 'special-card' : '',
			]"
			:style="
				door.week === 0
					? {
							background: localOpened
								? 'linear-gradient(135deg, var(--color-rose-50), var(--color-coral-50))'
								: 'linear-gradient(135deg, var(--color-rose-100), var(--color-coral-100))',
							borderColor: localOpened
								? 'var(--color-rose-300)'
								: 'var(--color-rose-300)',
							boxShadow: localOpened
								? '0 0 25px rgba(255, 105, 180, 0.3)'
								: '0 10px 25px rgba(255, 105, 180, 0.2)',
					  }
					: localOpened
					? {
							background:
								'linear-gradient(135deg, var(--color-coral-50), var(--color-coral-100))',
							borderColor: 'var(--color-coral-300)',
					  }
					: {
							background:
								'linear-gradient(135deg, var(--color-cream-100), var(--color-cream-200))',
							borderColor: 'var(--color-cream-300)',
							boxShadow: '0 10px 25px rgba(218, 108, 108, 0.1)',
					  }
			"
			@click="expandCard">
			<!-- Icône enveloppe (fermée ou ouverte) -->
			<div
				:class="[
					'text-3xl sm:text-5xl mb-2 sm:mb-3 transform transition-all duration-500 group-hover:scale-110',
					door.week === 0 ? 'animate-special-bounce mb-0!' : '',
				]">
				{{
					door.week === 0
						? localOpened
							? "🎁"
							: "🎁"
						: localOpened
						? "📬"
						: "📪"
				}}
			</div>

			<!-- Numéro de semaine (affiché seulement si ce n'est pas la spéciale) -->
			<div
				v-if="door.week !== 0"
				:class="[
					'text-2xl sm:text-3xl font-black text-transparent bg-clip-text mb-1 sm:mb-2',
				]"
				:style="{
					backgroundImage:
						'linear-gradient(90deg, var(--color-coral-600), var(--color-burgundy-600))',
				}">
				{{ door.week }}
			</div>

			<!-- Badge d'état -->
			<div
				:class="[
					'absolute top-2 sm:top-3 right-2 sm:right-3 w-2 h-2 sm:w-3 sm:h-3 rounded-full',
					'shadow-lg animate-pulse',
					door.week === 0 ? 'special-badge' : '',
				]"
				:style="
					door.week === 0
						? {
								backgroundColor: localOpened
									? 'var(--color-rose-500)'
									: 'var(--color-rose-400)',
								boxShadow: localOpened
									? '0 0 15px var(--color-rose-500)'
									: '0 0 15px var(--color-rose-400)',
						  }
						: localOpened
						? {
								backgroundColor: 'var(--color-coral-500)',
								boxShadow: '0 0 10px var(--color-coral-500)',
						  }
						: {
								backgroundColor: 'var(--color-cream-600)',
								boxShadow: '0 0 10px var(--color-cream-600)',
						  }
				"></div>

			<!-- Effet de lueur au hover -->
			<div
				:class="[
					'absolute inset-0 rounded-xl sm:rounded-2xl transition-opacity duration-500 pointer-events-none blur-xl opacity-0 group-hover:opacity-100',
					door.week === 0 ? 'special-glow' : '',
				]"
				:style="
					door.week === 0
						? {
								background:
									'linear-gradient(135deg, var(--color-rose-400), var(--color-coral-400))',
								opacity: '0.2',
						  }
						: {
								background:
									'linear-gradient(135deg, var(--color-coral-400), var(--color-burgundy-400))',
								opacity: '0.1',
						  }
				"></div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	door: {
		type: Object,
		required: true,
	},
});

const emit = defineEmits(["doorOpened"]);

const isExpanded = ref(false);
const showBackSide = ref(false);
const isProcessing = ref(false);
const localOpened = ref(props.door.opened); // État local pour éviter les refresh
const hearts = ref([]);
const showHearts = ref(false);

// Pour gérer le scrollable
const isScrollable = ref(false);
const messageContainer = ref(null);

const checkScrollable = () => {
	if (messageContainer.value) {
		const el = messageContainer.value;
		isScrollable.value = el.scrollHeight > el.clientHeight + 2; // tolérance
	}
};

// Vérifier le scrollable à chaque ouverture de la modal et après le flip
watch([isExpanded, showBackSide], ([expanded, back]) => {
	if (expanded && back) {
		// attendre le rendu DOM
		nextTick(() => {
			checkScrollable();
		});
	}
});

// Synchroniser l'état local avec les props au montage et en cas de changement externe
onMounted(() => {
	localOpened.value = props.door.opened;
});

// Watcher pour détecter les changements externes seulement si différent de l'état local
watch(
	() => props.door.opened,
	(newValue) => {
		// Seulement synchroniser si l'état externe est différent de l'état local
		// Cela évite les boucles infinies et les refreshs indésirables
		if (newValue !== localOpened.value) {
			localOpened.value = newValue;
		}
	},
	{ immediate: false }
);

const expandCard = async () => {
	// Cas spécial pour la carte de la semaine 0 : ouvrir directement la modal
	if (props.door.week === 0) {
		createHeartExplosion();
		isExpanded.value = true;
		showBackSide.value = false; // Reset l'état du flip
		return;
	}
	// Si l'enveloppe est fermée, l'ouvrir d'abord
	if (!localOpened.value) {
		await openDoor();
	} else {
		// Si l'enveloppe est déjà ouverte, afficher la modal
		createHeartExplosion();
		isExpanded.value = true;
		showBackSide.value = false; // Reset l'état du flip
	}
};

// Créer une explosion de cœurs (ou confettis pour l'enveloppe 0)
const createHeartExplosion = () => {
	hearts.value = [];
	const heartCount = props.door.week === 0 ? 20 : 15;

	for (let i = 0; i < heartCount; i++) {
		hearts.value.push({
			id: i,
			x: Math.random() * 100,
			y: Math.random() * 100,
			scale: Math.random() * 0.5 + 0.5,
			rotation: Math.random() * 360,
			delay: Math.random() * 500,
		});
	}

	// Déclencher l'animation après un court délai
	setTimeout(() => {
		showHearts.value = true;
	}, 100);

	// Cacher les cœurs après l'animation
	setTimeout(() => {
		showHearts.value = false;
		hearts.value = [];
	}, 2000);
};

const openDoor = async () => {
	if (isProcessing.value) return;

	try {
		isProcessing.value = true;

		// Mettre à jour l'état local immédiatement pour une UX fluide
		localOpened.value = true;

		// Appel API pour ouvrir la porte
		const response = await fetch("/api/doors", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				week: props.door.week,
				action: "open",
			}),
		});

		const data = await response.json();

		if (data.success) {
			// Créer un nouvel objet porte avec l'état mis à jour
			const updatedDoor = { ...props.door, opened: true };

			// Émettre l'événement pour mettre à jour le parent avec le nouvel objet
			emit("doorOpened", updatedDoor);

			// Déclencher l'explosion de cœurs et ouvrir la modal
			createHeartExplosion();
			setTimeout(() => {
				isExpanded.value = true;
			}, 300);
		} else {
			// En cas d'erreur API, revenir à l'état précédent
			localOpened.value = false;
			console.error("Erreur lors de l'ouverture de la porte");
		}
	} catch (error) {
		console.error("Erreur lors de l'ouverture:", error);
		// En cas d'erreur, revenir à l'état précédent
		localOpened.value = false;
	} finally {
		isProcessing.value = false;
	}
};

const revealContent = async () => {
	if (isProcessing.value) return;

	// Simplement faire l'animation de flip pour révéler le message
	isProcessing.value = true;

	setTimeout(() => {
		showBackSide.value = true;
		isProcessing.value = false;
	}, 200);
};

const closeExpanded = () => {
	showBackSide.value = false;
	showHearts.value = false;

	// Délai pour permettre à l'animation de se terminer
	setTimeout(() => {
		isExpanded.value = false;
		hearts.value = [];
	}, 300);
};
</script>

<style scoped>
.perspective-1000 {
	perspective: 1000px;
}

.transform-style-preserve-3d {
	transform-style: preserve-3d;
}

.backface-hidden {
	backface-visibility: hidden;
}

.rotate-y-180 {
	transform: rotateY(180deg);
}

/* Animations pour la modal */
.modal-enter-active,
.modal-leave-active {
	transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.modal-enter-from {
	opacity: 0;
	transform: scale(1.15);
	backdrop-filter: blur(0px);
}
.modal-leave-to {
	opacity: 0;
	transform: scale(1.15);
	backdrop-filter: blur(0px);
}
.modal-enter-to,
.modal-leave-from {
	opacity: 1;
	transform: scale(1);
}

/* Animations pour la carte */
.card-enter-active,
.card-leave-active {
	transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.card-enter-from {
	opacity: 0;
	transform: scale(0.3) rotateY(-180deg);
}

.card-leave-to {
	opacity: 0;
	transform: scale(0.3) rotateY(180deg);
}

/* Animation de bounce douce pour l'icône */
@keyframes gentle-bounce {
	0%,
	100% {
		transform: translateY(0) scale(1);
	}
	50% {
		transform: translateY(-5px) scale(1.05);
	}
}

.animate-gentle-bounce {
	animation: gentle-bounce 2s ease-in-out infinite;
}

/* Animation spéciale pour l'enveloppe 0 */
@keyframes special-bounce {
	0%,
	100% {
		transform: translateY(0) scale(1) rotate(0deg);
	}
	25% {
		transform: translateY(-8px) scale(1.1) rotate(-5deg);
	}
	50% {
		transform: translateY(-3px) scale(1.05) rotate(0deg);
	}
	75% {
		transform: translateY(-8px) scale(1.1) rotate(5deg);
	}
}

.animate-special-bounce {
	animation: special-bounce 2s ease-in-out infinite;
}

/* Animation de gradient pour l'enveloppe 0 */
@keyframes gradient-shift {
	0%,
	100% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
}

/* Animation pour l'explosion de cœurs */
@keyframes heart-explode {
	0% {
		transform: translate(-50%, -50%) scale(0) rotate(0deg);
		opacity: 1;
	}
	50% {
		transform: translate(-50%, -50%) scale(1.5) rotate(180deg);
		opacity: 0.8;
	}
	100% {
		transform: translate(-50%, -50%) scale(0.5) rotate(360deg);
		opacity: 0;
	}
}

.heart-explosion {
	pointer-events: none;
	opacity: 0;
}

.heart-animate {
	animation: heart-explode 1.5s ease-out forwards;
}

/* Styles spéciaux pour l'enveloppe 0 */
.special-card {
	position: relative;
}

.special-card::before {
	content: "";
	position: absolute;
	inset: -2px;
	background: linear-gradient(
		45deg,
		var(--color-rose-300),
		var(--color-coral-300),
		var(--color-rose-300)
	);
	border-radius: inherit;
	z-index: -1;
	opacity: 0.3;
	animation: gradient-shift 3s ease-in-out infinite;
}

/* Positionnement absolu parfait pour le modal */
.fixed.inset-0 {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}

.absolute.inset-0 {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}

/* Assure un centrage parfait */
.flex.items-center.justify-center {
	display: flex;
	align-items: center;
	justify-content: center;
}

/* Évite tout débordement ou décalage */
.relative {
	position: relative;
}

/* Gestion responsive améliorée */
@media (max-width: 640px) {
	.perspective-1000 {
		perspective: 600px;
	}

	.max-w-xs {
		max-width: 85vw;
	}

	.h-80 {
		height: 16rem;
	}
}

@media (max-width: 480px) {
	.perspective-1000 {
		perspective: 500px;
	}

	.max-w-xs {
		max-width: 90vw;
	}

	.h-80 {
		height: 14rem;
	}
}
</style>
