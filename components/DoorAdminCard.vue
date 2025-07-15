<template>
	<div
		class="group relative overflow-hidden backdrop-blur-sm rounded-2xl border transition-all duration-500 hover:scale-[1.02]"
		style="
			background: rgba(234, 235, 208, 0.05);
			border-color: rgba(175, 62, 62, 0.1);
		"
		@mouseenter="
			$event.currentTarget.style.background = 'rgba(218, 108, 108, 0.08)'
		"
		@mouseleave="
			$event.currentTarget.style.background = 'rgba(234, 235, 208, 0.05)'
		">
		<!-- Indicateur de statut moderne -->
		<div class="absolute top-4 sm:top-6 right-4 sm:right-6 z-20">
			<div
				class="w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-white shadow-lg transition-all duration-300"
				:style="
					door.opened
						? 'background: var(--color-coral-500); box-shadow: 0 0 20px rgba(218, 108, 108, 0.5);'
						: 'background: var(--color-burgundy-400); box-shadow: 0 0 20px rgba(175, 62, 62, 0.3);'
				"></div>
		</div>

		<div class="p-4 sm:p-6 lg:p-8">
			<div
				class="flex flex-col lg:flex-row lg:items-start gap-4 sm:gap-6 lg:gap-8">
				<!-- Numéro et contrôles - responsive -->
				<div
					class="flex-shrink-0 flex lg:flex-col items-center lg:items-center lg:text-center gap-4 lg:gap-0">
					<div
						class="relative w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center text-white font-black text-lg sm:text-xl mb-0 lg:mb-6 group-hover:scale-110 transition-all duration-300"
						style="
							background: linear-gradient(
								135deg,
								var(--color-coral-600),
								var(--color-rose-600)
							);
							box-shadow: 0 10px 30px rgba(218, 108, 108, 0.3);
						">
						<span>{{ door.week }}</span>
						<!-- Effet de brillance -->
						<div
							class="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
							style="
								background: linear-gradient(
									45deg,
									transparent 30%,
									rgba(255, 255, 255, 0.2) 50%,
									transparent 70%
								);
							"></div>
					</div>

					<div class="space-y-2">
						<div
							class="text-xs font-semibold uppercase tracking-wider"
							style="color: var(--color-burgundy-600)">
							{{ door.opened ? "Ouverte" : "Fermée" }}
						</div>

						<!-- Bouton toggle moderne -->
						<button
							@click="$emit('toggle-status', door)"
							:disabled="isSaving[`status-${door.week}`]"
							class="group/btn cursor-pointer relative overflow-hidden px-3 sm:px-4 py-2 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 disabled:opacity-50 backdrop-blur-sm transform hover:scale-105"
							:style="
								door.opened
									? 'background: linear-gradient(135deg, var(--color-rose-600), var(--color-burgundy-600)); color: white; box-shadow: 0 6px 20px rgba(205, 86, 86, 0.4);'
									: 'background: linear-gradient(135deg, var(--color-coral-500), var(--color-rose-500)); color: white; box-shadow: 0 6px 20px rgba(218, 108, 108, 0.4);'
							">
							<span
								v-if="!isSaving[`status-${door.week}`]"
								class="relative z-10">
								{{ door.opened ? "🔒 Fermer" : "🔓 Ouvrir" }}
							</span>
							<span v-else class="relative z-10">⏳</span>
							<div
								class="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
								style="
									background: linear-gradient(
										45deg,
										transparent 30%,
										rgba(255, 255, 255, 0.2) 50%,
										transparent 70%
									);
								"></div>
						</button>
					</div>
				</div>

				<!-- Formulaire d'édition modernisé et responsive -->
				<div class="flex-1 space-y-4 sm:space-y-6">
					<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
						<!-- Titre -->
						<div class="space-y-3">
							<label
								class="block text-sm font-semibold uppercase tracking-wider"
								style="color: var(--color-burgundy-700)">
								Titre de l'enveloppe
							</label>
							<div class="relative">
								<input
									:value="editingData[door.week]?.title || door.title"
									@input="$emit('title-input', door.week, $event)"
									type="text"
									class="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent backdrop-blur-sm transition-all duration-300 text-base sm:text-lg"
									style="
										background: rgba(234, 235, 208, 0.1);
										border-color: rgba(175, 62, 62, 0.2);
										color: var(--color-burgundy-800);
										--tw-ring-color: var(--color-coral-500);
									"
									placeholder="Titre romantique..." />
							</div>
						</div>

						<!-- Statut visuel -->
						<div class="space-y-3">
							<label
								class="block text-sm font-semibold uppercase tracking-wider"
								style="color: var(--color-burgundy-700)">
								Statut de l'enveloppe
							</label>
							<div
								class="flex items-center gap-4 p-4 rounded-xl backdrop-blur-sm"
								style="
									background: rgba(234, 235, 208, 0.1);
									border: 1px solid rgba(175, 62, 62, 0.2);
								">
								<div class="flex items-center gap-3">
									<div
										class="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white shadow-lg"
										:style="
											door.opened
												? 'background: var(--color-coral-500);'
												: 'background: var(--color-burgundy-400);'
										"></div>
									<span
										class="font-medium text-base sm:text-lg"
										style="color: var(--color-burgundy-700)">
										{{ door.opened ? "Ouverte" : "Fermée" }}
									</span>
								</div>
								<div class="text-xl sm:text-2xl">
									{{ door.opened ? "📬" : "📭" }}
								</div>
							</div>
						</div>
					</div>

					<!-- Message -->
					<div class="space-y-3">
						<label
							class="block text-sm font-semibold uppercase tracking-wider"
							style="color: var(--color-burgundy-700)">
							Message d'amour
						</label>
						<div class="relative">
							<textarea
								:value="editingData[door.week]?.text || door.text"
								@input="$emit('text-input', door.week, $event)"
								rows="4"
								class="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent resize-none backdrop-blur-sm transition-all duration-300 text-base sm:text-lg leading-relaxed"
								style="
									background: rgba(234, 235, 208, 0.1);
									border-color: rgba(175, 62, 62, 0.2);
									color: var(--color-burgundy-800);
									--tw-ring-color: var(--color-coral-500);
								"
								placeholder="Votre message d'amour le plus tendre..."></textarea>
						</div>
					</div>

					<!-- Actions -->
					<div
						class="flex flex-col sm:flex-row sm:items-center sm:justify-end pt-4 sm:pt-6 border-t space-y-4 sm:space-y-0"
						style="border-color: rgba(175, 62, 62, 0.1)">
						<div class="flex items-center gap-3 sm:gap-4">
							<button
								type="button"
								@click="$emit('reset', door)"
								class="px-3 sm:px-4 cursor-pointer py-2 rounded-xl font-medium text-sm transition-all duration-300 backdrop-blur-sm hover:scale-105"
								style="
									background: rgba(175, 62, 62, 0.1);
									color: var(--color-burgundy-700);
									border: 1px solid rgba(175, 62, 62, 0.2);
								">
								↺ Réinitialiser
							</button>

							<button
								type="button"
								@click="$emit('save', door)"
								:disabled="isSaving[door.week]"
								class="group/save cursor-pointer relative overflow-hidden px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm transform hover:scale-105"
								style="
									background: linear-gradient(
										135deg,
										var(--color-coral-600),
										var(--color-rose-600)
									);
									color: white;
									box-shadow: 0 8px 25px rgba(218, 108, 108, 0.4);
								">
								<span
									v-if="!isSaving[door.week]"
									class="relative z-10 flex items-center gap-2">
									<span>💾</span>
									<span class="hidden sm:inline">Sauvegarder</span>
								</span>
								<span v-else class="relative z-10 flex items-center gap-2">
									<span>⏳</span>
									<span class="hidden sm:inline">Sauvegarde...</span>
								</span>
								<div
									class="absolute inset-0 opacity-0 group-hover/save:opacity-100 transition-opacity duration-500"
									style="
										background: linear-gradient(
											45deg,
											transparent 30%,
											rgba(255, 255, 255, 0.2) 50%,
											transparent 70%
										);
									"></div>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
defineProps({
	door: Object,
	isSaving: Object,
	editingData: Object,
});

defineEmits(["toggle-status", "title-input", "text-input", "reset", "save"]);
</script>
