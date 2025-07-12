<template>
	<div class="min-h-screen">
		<!-- Page de connexion -->
		<div
			v-if="!isAuthenticated"
			class="min-h-screen flex items-center justify-center px-4"
			style="
				background: linear-gradient(
					135deg,
					var(--color-burgundy-500),
					var(--color-rose-600),
					var(--color-burgundy-600)
				);
			">				<div
					class="backdrop-blur-lg rounded-2xl p-8 border shadow-2xl max-w-md"
					style="
						background: rgba(234, 235, 208, 0.15);
						border-color: rgba(234, 235, 208, 0.3);
					">
				<div class="text-center mb-8">
					<div class="text-4xl mb-4">🔐</div>
					<h1 class="text-2xl font-bold text-white mb-2">Administration</h1>
					<p style="color: var(--color-cream-200)">
						Accès sécurisé aux enveloppes, héhéhé t'as pas le code secret... ? 👀
					</p>
                    <p class="mt-2 text-sm" style="color: var(--color-coral-300)">
                        (tu pues le cornichon pourri…)
					</p>
				</div>

				<form @submit.prevent="login" class="space-y-6">
					<div>
						<label
							class="block text-sm font-medium mb-2"
							style="color: var(--color-cream-200)">
							Mot de passe
						</label>
						<input
							v-model="password"
							type="password"
							required
							class="w-full px-4 py-3 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent"
							style="
								background: rgba(234, 235, 208, 0.1);
								border-color: rgba(234, 235, 208, 0.2);
								--tw-ring-color: var(--color-coral-500);
							"
							placeholder="Entrez le mot de passe secret" />
					</div>

					<button
						type="submit"
						:disabled="isLoading"
						class="w-full cursor-pointer text-white py-3 px-4 rounded-lg font-semibold focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
						style="
							background: linear-gradient(
								90deg,
								var(--color-coral-600),
								var(--color-burgundy-600)
							);
							--tw-ring-color: var(--color-coral-500);
						">
						<span v-if="!isLoading">Se connecter</span>
						<span v-else>Connexion...</span>
					</button>

					<div
						v-if="errorMessage"
						class="text-sm text-center"
						style="color: var(--color-coral-400)">
						{{ errorMessage }}
					</div>
				</form>
			</div>
		</div>

		<!-- Panel d'administration -->
		<div v-else class="min-h-screen" style="background: linear-gradient(135deg, var(--color-cream-200) 0%, #f8f9fa 50%, var(--color-cream-100) 100%);">
			<!-- Header admin modernisé et responsive -->
			<div
				class="backdrop-blur-xl border-b sticky top-0 z-50 transition-all duration-300"
				style="background: rgba(175, 62, 62, 0.95); border-color: rgba(175, 62, 62, 0.3); box-shadow: 0 8px 32px rgba(175, 62, 62, 0.1);">
				<div class="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
					<div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
						<div class="flex items-center gap-3 sm:gap-4">
							<div class="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-xl sm:text-2xl backdrop-blur-sm" style="background: rgba(234, 235, 208, 0.2);">
								⚙️
							</div>
							<div>
								<h1 class="text-xl sm:text-2xl font-bold text-white tracking-tight">
									Panel d'Administration
								</h1>
								<p class="text-xs sm:text-sm" style="color: var(--color-cream-200);">
									Gestion avancée des enveloppes d'amour
								</p>
							</div>
						</div>
						
						<div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
							<!-- Stats rapides - cachées sur mobile -->
							<div class="hidden lg:flex items-center gap-4 px-4 py-2 rounded-xl backdrop-blur-sm" style="background: rgba(234, 235, 208, 0.15);">
								<div class="text-center">
									<div class="text-lg font-bold text-white">{{ doors.length }}</div>
									<div class="text-xs" style="color: var(--color-cream-200);">Total</div>
								</div>
								<div class="w-px h-8" style="background: rgba(234, 235, 208, 0.3);"></div>
								<div class="text-center">
									<div class="text-lg font-bold" style="color: var(--color-coral-200);">{{ openedCount }}</div>
									<div class="text-xs" style="color: var(--color-cream-200);">Ouvertes</div>
								</div>
							</div>

							<!-- Statut de connexion -->
							<div class="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-sm" style="background: rgba(218, 108, 108, 0.2);">
								<div class="w-2 h-2 rounded-full animate-pulse" style="background-color: var(--color-coral-300);"></div>
								<span class="text-xs font-medium" style="color: var(--color-coral-100);">Connecté</span>
							</div>

							<!-- Message de reconnexion -->
							<div
								v-if="autoLoginMessage"
								class="hidden sm:block text-xs px-4 py-2 rounded-xl backdrop-blur-sm animate-fade-in"
								style="color: var(--color-coral-100); background: rgba(218, 108, 108, 0.2);">
								{{ autoLoginMessage }}
							</div>

							<!-- Message d'opération en masse -->
							<div
								v-if="showBulkMessage && bulkOperationMessage"
								class="text-xs px-4 py-2 rounded-xl backdrop-blur-sm animate-fade-in"
								style="color: var(--color-coral-100); background: rgba(218, 108, 108, 0.2);">
								{{ bulkOperationMessage }}
							</div>

							<!-- Boutons d'action -->
							<div class="flex items-center gap-2 sm:gap-3">
								<NuxtLink
									to="/"
									class="group cursor-pointer flex items-center gap-2 text-white px-3 sm:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 backdrop-blur-sm"
									style="background: linear-gradient(135deg, var(--color-coral-600), var(--color-rose-600)); box-shadow: 0 4px 15px rgba(218, 108, 108, 0.3);">
									<span class="text-base sm:text-lg">🏠</span>
									<span class="hidden sm:inline">Accueil</span>
								</NuxtLink>

								<button
									@click="logout"
									class="group flex cursor-pointer items-center gap-2 text-white px-3 sm:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 backdrop-blur-sm"
									style="background: linear-gradient(135deg, var(--color-burgundy-600), var(--color-burgundy-700)); box-shadow: 0 4px 15px rgba(175, 62, 62, 0.3);">
									<span class="text-base sm:text-lg">🚪</span>
									<span class="hidden sm:inline">Déconnexion</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Contenu principal modernisé et responsive -->
			<div class="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 mx-auto">
				<!-- Dashboard Stats avec animations - responsive grid -->
				<div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-12">
					<div
						class="group relative overflow-hidden backdrop-blur-xl rounded-2xl p-4 sm:p-6 border transition-all duration-500 hover:scale-105"
						style="background: rgba(175, 62, 62, 0.08); border-color: rgba(175, 62, 62, 0.2); box-shadow: 0 10px 40px rgba(175, 62, 62, 0.1);"
						@mouseenter="$event.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'"
						@mouseleave="$event.currentTarget.style.transform = 'translateY(0) scale(1)'">
						<!-- Effet de brillance au hover -->
						<div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style="background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%); transform: translateX(-100%); animation: shine 2s infinite;"></div>
						
						<div class="relative z-10">
							<div class="flex items-center justify-between mb-3 sm:mb-4">
								<div class="text-2xl sm:text-3xl">📮</div>
								<div class="w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center" style="background: rgba(175, 62, 62, 0.2);">
									<div class="w-2 h-2 sm:w-3 sm:h-3 rounded-full" style="background: var(--color-burgundy-500);"></div>
								</div>
							</div>
							<div class="text-2xl sm:text-3xl font-black mb-1 sm:mb-2 tracking-tight" style="color: var(--color-burgundy-700);">{{ doors.length }}</div>
							<div class="text-xs sm:text-sm font-medium" style="color: var(--color-burgundy-600);">Total Enveloppes</div>
							<div class="mt-2 sm:mt-3 h-1 rounded-full" style="background: var(--color-burgundy-200);">
								<div class="h-full rounded-full transition-all duration-1000" style="background: var(--color-burgundy-500); width: 100%;"></div>
							</div>
						</div>
					</div>

					<div
						class="group relative overflow-hidden backdrop-blur-xl rounded-2xl p-4 sm:p-6 border transition-all duration-500 hover:scale-105"
						style="background: rgba(218, 108, 108, 0.08); border-color: rgba(218, 108, 108, 0.2); box-shadow: 0 10px 40px rgba(218, 108, 108, 0.1);"
						@mouseenter="$event.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'"
						@mouseleave="$event.currentTarget.style.transform = 'translateY(0) scale(1)'">
						<div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style="background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);"></div>
						
						<div class="relative z-10">
							<div class="flex items-center justify-between mb-3 sm:mb-4">
								<div class="text-2xl sm:text-3xl animate-pulse">📬</div>
								<div class="w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center" style="background: rgba(218, 108, 108, 0.2);">
									<div class="w-2 h-2 sm:w-3 sm:h-3 rounded-full animate-pulse" style="background: var(--color-coral-500);"></div>
								</div>
							</div>
							<div class="text-2xl sm:text-3xl font-black mb-1 sm:mb-2 tracking-tight" style="color: var(--color-coral-700);">{{ openedCount }}</div>
							<div class="text-xs sm:text-sm font-medium" style="color: var(--color-coral-600);">Enveloppes Ouvertes</div>
							<div class="mt-2 sm:mt-3 h-1 rounded-full" style="background: var(--color-coral-200);">
								<div class="h-full rounded-full transition-all duration-1000" style="background: var(--color-coral-500);" :style="{ width: doors.length > 0 ? (openedCount / doors.length * 100) + '%' : '0%' }"></div>
							</div>
						</div>
					</div>

					<div
						class="group relative overflow-hidden backdrop-blur-xl rounded-2xl p-4 sm:p-6 border transition-all duration-500 hover:scale-105"
						style="background: rgba(205, 86, 86, 0.08); border-color: rgba(205, 86, 86, 0.2); box-shadow: 0 10px 40px rgba(205, 86, 86, 0.1);"
						@mouseenter="$event.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'"
						@mouseleave="$event.currentTarget.style.transform = 'translateY(0) scale(1)'">
						<div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style="background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);"></div>
						
						<div class="relative z-10">
							<div class="flex items-center justify-between mb-3 sm:mb-4">
								<div class="text-2xl sm:text-3xl">📭</div>
								<div class="w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center" style="background: rgba(205, 86, 86, 0.2);">
									<div class="w-2 h-2 sm:w-3 sm:h-3 rounded-full" style="background: var(--color-rose-500);"></div>
								</div>
							</div>
							<div class="text-2xl sm:text-3xl font-black mb-1 sm:mb-2 tracking-tight" style="color: var(--color-rose-700);">{{ doors.length - openedCount }}</div>
							<div class="text-xs sm:text-sm font-medium" style="color: var(--color-rose-600);">Enveloppes Fermées</div>
							<div class="mt-2 sm:mt-3 h-1 rounded-full" style="background: var(--color-rose-200);">
								<div class="h-full rounded-full transition-all duration-1000" style="background: var(--color-rose-500);" :style="{ width: doors.length > 0 ? ((doors.length - openedCount) / doors.length * 100) + '%' : '0%' }"></div>
							</div>
						</div>
					</div>

					<div
						class="group relative overflow-hidden backdrop-blur-xl rounded-2xl p-4 sm:p-6 border transition-all duration-500 hover:scale-105"
						style="background: rgba(175, 62, 62, 0.12); border-color: rgba(175, 62, 62, 0.25); box-shadow: 0 10px 40px rgba(175, 62, 62, 0.15);"
						@mouseenter="$event.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'"
						@mouseleave="$event.currentTarget.style.transform = 'translateY(0) scale(1)'">
						<div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style="background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);"></div>
						
						<div class="relative z-10">
							<div class="flex items-center justify-between mb-3 sm:mb-4">
								<div class="text-2xl sm:text-3xl">📊</div>
								<div class="w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center" style="background: rgba(175, 62, 62, 0.3);">
									<div class="w-2 h-2 sm:w-3 sm:h-3 rounded-full" style="background: var(--color-burgundy-600);"></div>
								</div>
							</div>
							<div class="text-2xl sm:text-3xl font-black mb-1 sm:mb-2 tracking-tight" style="color: var(--color-burgundy-700);">{{ Math.round((openedCount / doors.length) * 100) }}%</div>
							<div class="text-xs sm:text-sm font-medium" style="color: var(--color-burgundy-600);">Progression Globale</div>
							<div class="mt-2 sm:mt-3 h-1 rounded-full" style="background: var(--color-burgundy-200);">
								<div class="h-full rounded-full transition-all duration-1000" style="background: linear-gradient(90deg, var(--color-coral-500), var(--color-burgundy-500));" :style="{ width: doors.length > 0 ? (openedCount / doors.length * 100) + '%' : '0%' }"></div>
							</div>
						</div>
					</div>
				</div>

				<!-- Gestion des enveloppes modernisée -->
				<div
					class="relative overflow-hidden backdrop-blur-xl rounded-3xl border shadow-2xl transition-all duration-500"
					style="background: rgba(175, 62, 62, 0.06); border-color: rgba(175, 62, 62, 0.15); box-shadow: 0 25px 50px rgba(175, 62, 62, 0.1);">
					
					<!-- Header de section avec recherche - responsive -->
					<div class="relative p-4 sm:p-6 lg:p-8 border-b backdrop-blur-sm" style="border-color: rgba(175, 62, 62, 0.1); background: linear-gradient(135deg, rgba(218, 108, 108, 0.05), rgba(175, 62, 62, 0.05));">
						<div class="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
							<div>
								<h2 class="text-2xl sm:text-3xl font-black tracking-tight mb-2" style="color: var(--color-burgundy-800);">
									Gestion des Enveloppes
								</h2>
								<p class="text-base sm:text-lg" style="color: var(--color-burgundy-600);">
									Modifiez le contenu et gérez l'état de chaque enveloppe avec une interface moderne
								</p>
							</div>
							
							<!-- Actions rapides - stack sur mobile -->
							<div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
								<div class="relative">
									<input
										v-model="searchQuery"
										type="text"
										placeholder="Rechercher une enveloppe..."
										class="w-full sm:w-80 px-4 py-3 pl-12 rounded-2xl border focus:outline-none focus:ring-2 focus:border-transparent backdrop-blur-sm transition-all duration-300"
										style="background: rgba(234, 235, 208, 0.1); border-color: rgba(175, 62, 62, 0.2); color: var(--color-burgundy-800); --tw-ring-color: var(--color-coral-500);">
									<div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-lg" style="color: var(--color-burgundy-500);">🔍</div>
								</div>
								
								<button
									@click="toggleAllDoors"
									:disabled="isProcessingBulk"
									class="flex items-center cursor-pointer justify-center gap-2 px-4 sm:px-6 py-3 rounded-2xl font-medium transition-all duration-300 disabled:opacity-50 backdrop-blur-sm hover:scale-105 whitespace-nowrap"
									style="background: linear-gradient(135deg, var(--color-coral-600), var(--color-rose-600)); color: white; box-shadow: 0 8px 25px rgba(218, 108, 108, 0.3);">
									<span v-if="!isProcessingBulk">{{ allOpened ? '🔒 Tout Fermer' : '🔓 Tout Ouvrir' }}</span>
									<span v-else>⏳ En cours...</span>
								</button>
							</div>
						</div>
					</div>

					<!-- Liste des enveloppes avec layout en grille responsive -->
					<div class="p-4 sm:p-6 lg:p-8">
						<div class="grid gap-4 sm:gap-6 lg:gap-8">
							<div
								v-for="door in filteredDoors"
								:key="`door-${door.week}`"
								class="group relative overflow-hidden backdrop-blur-sm rounded-2xl border transition-all duration-500 hover:scale-[1.02]"
								style="background: rgba(234, 235, 208, 0.05); border-color: rgba(175, 62, 62, 0.1);"
								@mouseenter="$event.currentTarget.style.background = 'rgba(218, 108, 108, 0.08)'"
								@mouseleave="$event.currentTarget.style.background = 'rgba(234, 235, 208, 0.05)'">
								
								<!-- Indicateur de statut moderne -->
								<div class="absolute top-4 sm:top-6 right-4 sm:right-6 z-20">
									<div 
										class="w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-white shadow-lg transition-all duration-300"
										:style="door.opened 
											? 'background: var(--color-coral-500); box-shadow: 0 0 20px rgba(218, 108, 108, 0.5);'
											: 'background: var(--color-burgundy-400); box-shadow: 0 0 20px rgba(175, 62, 62, 0.3);'">
									</div>
								</div>

								<div class="p-4 sm:p-6 lg:p-8">
									<div class="flex flex-col lg:flex-row lg:items-start gap-4 sm:gap-6 lg:gap-8">
										<!-- Numéro et contrôles - responsive -->
										<div class="flex-shrink-0 flex lg:flex-col items-center lg:items-center lg:text-center gap-4 lg:gap-0">
											<div
												class="relative w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center text-white font-black text-lg sm:text-xl mb-0 lg:mb-6 group-hover:scale-110 transition-all duration-300"
												style="background: linear-gradient(135deg, var(--color-coral-600), var(--color-rose-600)); box-shadow: 0 10px 30px rgba(218, 108, 108, 0.3);">
												<span>{{ door.week }}</span>
												<!-- Effet de brillance -->
												<div class="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style="background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%);"></div>
											</div>
											
											<div class="space-y-2">
												<div class="text-xs font-semibold uppercase tracking-wider" style="color: var(--color-burgundy-600);">
													{{ door.opened ? "Ouverte" : "Fermée" }}
												</div>
												
												<!-- Bouton toggle moderne -->
												<button
													@click="toggleDoorStatus(door)"
													:disabled="isSaving[`status-${door.week}`]"
													class="group/btn cursor-pointer relative overflow-hidden px-3 sm:px-4 py-2 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 disabled:opacity-50 backdrop-blur-sm transform hover:scale-105"
													:style="door.opened 
														? 'background: linear-gradient(135deg, var(--color-rose-600), var(--color-burgundy-600)); color: white; box-shadow: 0 6px 20px rgba(205, 86, 86, 0.4);'
														: 'background: linear-gradient(135deg, var(--color-coral-500), var(--color-rose-500)); color: white; box-shadow: 0 6px 20px rgba(218, 108, 108, 0.4);'">
													<span v-if="!isSaving[`status-${door.week}`]" class="relative z-10">
														{{ door.opened ? '🔒 Fermer' : '🔓 Ouvrir' }}
													</span>
													<span v-else class="relative z-10">⏳</span>
													<!-- Effet de hover -->
													<div class="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" style="background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%);"></div>
												</button>
											</div>
										</div>

										<!-- Formulaire d'édition modernisé et responsive -->
										<div class="flex-1 space-y-4 sm:space-y-6">
											<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
												<!-- Titre -->
												<div class="space-y-3">
													<label class="block text-sm font-semibold uppercase tracking-wider" style="color: var(--color-burgundy-700);">
														Titre de l'enveloppe
													</label>
													<div class="relative">
														<input
															:value="editingData[door.week]?.title || door.title"
															@input="handleTitleInput(door.week, $event)"
															type="text"
															class="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent backdrop-blur-sm transition-all duration-300 text-base sm:text-lg"
															style="background: rgba(234, 235, 208, 0.1); border-color: rgba(175, 62, 62, 0.2); color: var(--color-burgundy-800); --tw-ring-color: var(--color-coral-500);"
															placeholder="Titre romantique..." />
													</div>
												</div>

												<!-- Statut visuel -->
												<div class="space-y-3">
													<label class="block text-sm font-semibold uppercase tracking-wider" style="color: var(--color-burgundy-700);">
														Statut de l'enveloppe
													</label>
													<div class="flex items-center gap-4 p-4 rounded-xl backdrop-blur-sm" style="background: rgba(234, 235, 208, 0.1); border: 1px solid rgba(175, 62, 62, 0.2);">
														<div class="flex items-center gap-3">
															<div 
																class="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white shadow-lg"
																:style="door.opened 
																	? 'background: var(--color-coral-500);'
																	: 'background: var(--color-burgundy-400);'">
															</div>
															<span class="font-medium text-base sm:text-lg" style="color: var(--color-burgundy-700);">
																{{ door.opened ? 'Ouverte' : 'Fermée' }}
															</span>
														</div>
														<div class="text-xl sm:text-2xl">{{ door.opened ? '📬' : '📭' }}</div>
													</div>
												</div>
											</div>

											<!-- Message -->
											<div class="space-y-3">
												<label class="block text-sm font-semibold uppercase tracking-wider" style="color: var(--color-burgundy-700);">
													Message d'amour
												</label>
												<div class="relative">
													<textarea
														:value="editingData[door.week]?.text || door.text"
														@input="handleTextInput(door.week, $event)"
														rows="4"
														class="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent resize-none backdrop-blur-sm transition-all duration-300 text-base sm:text-lg leading-relaxed"
														style="background: rgba(234, 235, 208, 0.1); border-color: rgba(175, 62, 62, 0.2); color: var(--color-burgundy-800); --tw-ring-color: var(--color-coral-500);"
														placeholder="Votre message d'amour le plus tendre..."></textarea>
												</div>
											</div>

											<!-- Actions -->
											<div class="flex flex-col sm:flex-row sm:items-center sm:justify-end pt-4 sm:pt-6 border-t space-y-4 sm:space-y-0" style="border-color: rgba(175, 62, 62, 0.1);">
												<div class="flex items-center gap-3 sm:gap-4">
													<button
														type="button"
														@click="resetDoor(door)"
														class="px-3 sm:px-4 cursor-pointer py-2 rounded-xl font-medium text-sm transition-all duration-300 backdrop-blur-sm hover:scale-105"
														style="background: rgba(175, 62, 62, 0.1); color: var(--color-burgundy-700); border: 1px solid rgba(175, 62, 62, 0.2);">
														↺ Réinitialiser
													</button>
													
													<button
														type="button"
														@click="saveDoor(door)"
														:disabled="isSaving[door.week]"
														class="group/save cursor-pointer relative overflow-hidden px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm transform hover:scale-105"
														style="background: linear-gradient(135deg, var(--color-coral-600), var(--color-rose-600)); color: white; box-shadow: 0 8px 25px rgba(218, 108, 108, 0.4);">
														<span v-if="!isSaving[door.week]" class="relative z-10 flex items-center gap-2">
															<span>💾</span>
															<span class="hidden sm:inline">Sauvegarder</span>
														</span>
														<span v-else class="relative z-10 flex items-center gap-2">
															<span>⏳</span>
															<span class="hidden sm:inline">Sauvegarde...</span>
														</span>
														<!-- Effet brillant au hover -->
														<div class="absolute inset-0 opacity-0 group-hover/save:opacity-100 transition-opacity duration-500" style="background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%);"></div>
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
definePageMeta({
	layout: false,
});

// État de l'authentification
const isAuthenticated = ref(false);
const password = ref("");
const isLoading = ref(false);
const errorMessage = ref("");
const authToken = ref("");
const autoLoginMessage = ref("");

// État des enveloppes avec nouvelles fonctionnalités
const doors = ref([]);
const isSaving = ref({});
const editingData = ref({});
const searchQuery = ref('');
const isProcessingBulk = ref(false);
const bulkOperationMessage = ref('');
const showBulkMessage = ref(false);

// Statistiques calculées
const openedCount = computed(
	() => doors.value.filter((door) => door.opened).length
);

const allOpened = computed(
	() => doors.value.length > 0 && doors.value.every((door) => door.opened)
);

const filteredDoors = computed(() => {
	if (!searchQuery.value) return doors.value;
	
	const query = searchQuery.value.toLowerCase();
	return doors.value.filter(door => 
		door.week.toString().includes(query) ||
		door.title.toLowerCase().includes(query) ||
		door.text.toLowerCase().includes(query)
	);
});

// Clés pour le localStorage
const AUTH_TOKEN_KEY = "admin_auth_token";
const AUTH_EXPIRY_KEY = "admin_auth_expiry";

// Vérifier l'authentification au montage
onMounted(async () => {
	await checkExistingAuth();
});

// Vérifier si un token existe et est valide
const checkExistingAuth = async () => {
	if (typeof window !== "undefined") {
		const savedToken = localStorage.getItem(AUTH_TOKEN_KEY);
		const savedExpiry = localStorage.getItem(AUTH_EXPIRY_KEY);

		if (savedToken && savedExpiry) {
			const expiryTime = parseInt(savedExpiry);
			const now = Date.now();

			// Vérifier si le token n'a pas expiré (24h)
			if (now < expiryTime) {
				try {
					// Vérifier le token côté serveur
					const response = await fetch("/api/auth/verify", {
						headers: {
							Authorization: `Bearer ${savedToken}`,
						},
					});

					if (response.ok) {
						authToken.value = savedToken;
						isAuthenticated.value = true;
						autoLoginMessage.value = "Reconnexion automatique réussie ✅";
						setTimeout(() => {
							autoLoginMessage.value = "";
						}, 3000);
						await loadDoors();
						return;
					}
				} catch (error) {
					console.log("Token invalide, suppression...");
				}
			}

			// Token expiré ou invalide, nettoyer
			localStorage.removeItem(AUTH_TOKEN_KEY);
			localStorage.removeItem(AUTH_EXPIRY_KEY);
		}
	}
};

// Sauvegarder le token dans localStorage
const saveAuthToken = (token) => {
	if (typeof window !== "undefined") {
		const expiryTime = Date.now() + 24 * 60 * 60 * 1000; // 24 heures
		localStorage.setItem(AUTH_TOKEN_KEY, token);
		localStorage.setItem(AUTH_EXPIRY_KEY, expiryTime.toString());
	}
};

// Supprimer le token du localStorage
const clearAuthToken = () => {
	if (typeof window !== "undefined") {
		localStorage.removeItem(AUTH_TOKEN_KEY);
		localStorage.removeItem(AUTH_EXPIRY_KEY);
	}
};

// Fonctions d'authentification
const login = async () => {
	isLoading.value = true;
	errorMessage.value = "";

	try {
		const response = await fetch("/api/auth", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ password: password.value }),
		});

		const data = await response.json();

		if (data.success) {
			authToken.value = data.token;
			isAuthenticated.value = true;
			saveAuthToken(data.token); // Sauvegarder dans localStorage
			await loadDoors();
		} else {
			errorMessage.value = "Mot de passe incorrect";
		}
	} catch (error) {
		errorMessage.value = "Mot de passe incorrect";
	} finally {
		isLoading.value = false;
	}
};

const logout = () => {
	isAuthenticated.value = false;
	authToken.value = "";
	password.value = "";
	doors.value = [];
	clearAuthToken(); // Supprimer du localStorage
};

// Charger les enveloppes
const loadDoors = async () => {
	try {
		const response = await fetch("/api/doors");
		const data = await response.json();
		doors.value = data.doors || [];
		// Initialiser les données d'édition
		editingData.value = {};
	} catch (error) {
		console.error("Erreur lors du chargement:", error);
	}
};

// Forcer une resynchro complète des données depuis le serveur
const forceReloadDoors = async () => {
	try {
		const response = await fetch("/api/doors", {
			// Ajouter un timestamp pour éviter le cache
			headers: {
				'Cache-Control': 'no-cache',
				'Pragma': 'no-cache'
			}
		});
		const data = await response.json();
		doors.value = data.doors || [];
		editingData.value = {};
		console.log("Données rechargées depuis le serveur");
	} catch (error) {
		console.error("Erreur lors du rechargement forcé:", error);
	}
};

// Mettre à jour les données d'édition temporaires
const updateEditingData = (week, field, value) => {
	if (!editingData.value[week]) {
		editingData.value[week] = { title: "", text: "" };
	}
	editingData.value[week][field] = value;
};

// Méthodes pour gérer les événements input
const handleTitleInput = (week, event) => {
	event.preventDefault();
	const target = event.target;
	updateEditingData(week, "title", target.value);
};

const handleTextInput = (week, event) => {
	event.preventDefault();
	const target = event.target;
	updateEditingData(week, "text", target.value);
};

// Sauvegarder une enveloppe
const saveDoor = async (door) => {
	isSaving.value[door.week] = true;

	// Utiliser les données éditées ou les données originales
	const titleToSave = editingData.value[door.week]?.title || door.title;
	const textToSave = editingData.value[door.week]?.text || door.text;

	try {
		const response = await fetch("/api/admin/doors", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authToken.value}`,
			},
			body: JSON.stringify({
				week: door.week,
				title: titleToSave,
				text: textToSave,
			}),
		});

		if (response.status === 401) {
			// Token expiré, déconnecter l'utilisateur
			logout();
			return;
		}

		const data = await response.json();

		if (data.success) {
			// Mettre à jour les données originales
			door.title = titleToSave;
			door.text = textToSave;

			// Nettoyer les données d'édition temporaires
			if (editingData.value[door.week]) {
				delete editingData.value[door.week];
			}

			// Afficher une confirmation visuelle temporaire
			const originalTitle = door.title;
			door.title = "✅ Sauvegardé!";
			setTimeout(() => {
				door.title = originalTitle;
			}, 1000);
		}
	} catch (error) {
		console.error("Erreur lors de la sauvegarde:", error);
		// Afficher l'erreur
		const originalTitle = door.title;
		door.title = "❌ Erreur!";
		setTimeout(() => {
			door.title = originalTitle;
		}, 2000);
	} finally {
		isSaving.value[door.week] = false;
	}
};

// Ouvrir/Fermer une enveloppe avec feedback amélioré
const toggleDoorStatus = async (door) => {
	const statusKey = `status-${door.week}`;
	isSaving.value[statusKey] = true;

	const newStatus = !door.opened;

	try {
		const response = await fetch("/api/doors", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authToken.value}`,
			},
			body: JSON.stringify({
				week: door.week,
				action: newStatus ? "open" : "close",
			}),
		});

		if (response.status === 401) {
			logout();
			return;
		}

		const data = await response.json();

		if (data.success) {
			door.opened = newStatus;
			
			// Animation de feedback plus subtile
			const originalWeek = door.week;
			setTimeout(() => {
				if (door.week === originalWeek) {
					// Petit effet visuel sans changer le texte
					door._justChanged = true;
					setTimeout(() => {
						door._justChanged = false;
					}, 1000);
				}
			}, 100);
		}
	} catch (error) {
		console.error("Erreur lors du changement d'état:", error);
	} finally {
		isSaving.value[statusKey] = false;
	}
};

// Fonction pour afficher un message temporaire
const showBulkOperationMessage = (message, duration = 3000) => {
	bulkOperationMessage.value = message;
	showBulkMessage.value = true;
	setTimeout(() => {
		showBulkMessage.value = false;
		bulkOperationMessage.value = '';
	}, duration);
};

// Ouvrir/Fermer toutes les enveloppes - version améliorée qui écrase tous les états
const toggleAllDoors = async () => {
	isProcessingBulk.value = true;
	const targetStatus = !allOpened.value;
	const action = targetStatus ? "open_all" : "close_all";
	const actionText = targetStatus ? "ouverture" : "fermeture";
	
	showBulkOperationMessage(`Opération d'${actionText} en cours...`);
	
	try {
		// Utiliser la nouvelle API pour les opérations en masse
		const response = await fetch("/api/admin/bulk-doors", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authToken.value}`,
			},
			body: JSON.stringify({ action }),
		});

		if (response.status === 401) {
			logout();
			return;
		}

		const data = await response.json();

		if (data.success) {
			// Mettre à jour l'état local avec les nouvelles données du serveur
			// Cela garantit que l'état local correspond exactement à l'état du serveur
			if (data.doors) {
				doors.value.forEach(door => {
					const updatedDoor = data.doors.find((d) => d.week === door.week);
					if (updatedDoor) {
						door.opened = updatedDoor.opened;
					}
				});
			} else {
				// Fallback: forcer tous les états au statut cible
				doors.value.forEach(door => {
					door.opened = targetStatus;
				});
			}

			// Force une resynchro pour être sûr que tout est correct
			setTimeout(async () => {
				await forceReloadDoors();
				showBulkOperationMessage(`✅ ${actionText.charAt(0).toUpperCase() + actionText.slice(1)} terminée: ${data.updatedCount}/${data.totalDoors} enveloppes mises à jour`, 4000);
			}, 500);

			// Afficher un message de confirmation
			console.log(`Opération terminée: ${data.updatedCount} enveloppes mises à jour sur ${data.totalDoors}`);
		} else {
			console.error("Erreur lors de l'opération en masse:", data);
			showBulkOperationMessage(`❌ Erreur lors de l'${actionText}`, 3000);
		}
		
	} catch (error) {
		console.error("Erreur lors de l'opération en masse:", error);
		showBulkOperationMessage(`⚠️ Utilisation de la méthode alternative...`);
		
		// En cas d'erreur API, fallback vers l'ancienne méthode mais en forçant TOUS les états
		try {
			const promises = doors.value.map(door => 
				fetch("/api/doors", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${authToken.value}`,
					},
					body: JSON.stringify({
						week: door.week,
						action: targetStatus ? "open" : "close",
					}),
				})
			);

			await Promise.all(promises);
			
			// Forcer tous les états localement
			doors.value.forEach(door => {
				door.opened = targetStatus;
			});

			// Force une resynchro même en cas de fallback
			setTimeout(async () => {
				await forceReloadDoors();
				showBulkOperationMessage(`✅ ${actionText.charAt(0).toUpperCase() + actionText.slice(1)} terminée (méthode alternative)`, 4000);
			}, 500);
		} catch (fallbackError) {
			console.error("Erreur même avec la méthode de fallback:", fallbackError);
			showBulkOperationMessage(`❌ Erreur lors de l'${actionText}`, 3000);
		}
	} finally {
		isProcessingBulk.value = false;
	}
};

// Réinitialiser une enveloppe
const resetDoor = (door) => {
	if (editingData.value[door.week]) {
		delete editingData.value[door.week];
	}
	// Force la réactivité en mettant à jour les inputs
	nextTick(() => {
		const titleInput = document.querySelector(`input[value="${door.title}"]`);
		const textInput = document.querySelector(`textarea[value="${door.text}"]`);
		if (titleInput) titleInput.value = door.title;
		if (textInput) textInput.value = door.text;
	});
};
</script>

<style scoped>
/* Design System Moderne */
::-webkit-scrollbar {
	width: 8px;
}

::-webkit-scrollbar-track {
	background: rgba(175, 62, 62, 0.05);
	border-radius: 10px;
}

::-webkit-scrollbar-thumb {
	background: linear-gradient(to bottom, var(--color-coral-500), var(--color-burgundy-500));
	border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
	background: linear-gradient(to bottom, var(--color-coral-600), var(--color-burgundy-600));
}

/* Animations Avancées */
@keyframes shine {
	0% { transform: translateX(-100%) skewX(-15deg); }
	100% { transform: translateX(300%) skewX(-15deg); }
}

@keyframes float {
	0%, 100% { transform: translateY(0px) rotate(0deg); }
	33% { transform: translateY(-10px) rotate(1deg); }
	66% { transform: translateY(-5px) rotate(-1deg); }
}

@keyframes pulse-glow {
	0%, 100% { 
		box-shadow: 0 0 20px rgba(218, 108, 108, 0.3);
		transform: scale(1);
	}
	50% { 
		box-shadow: 0 0 30px rgba(218, 108, 108, 0.6);
		transform: scale(1.05);
	}
}

@keyframes gradient-shift {
	0% { background-position: 0% 50%; }
	50% { background-position: 100% 50%; }
	100% { background-position: 0% 50%; }
}

@keyframes fade-in {
	from { 
		opacity: 0; 
		transform: translateY(20px);
	}
	to { 
		opacity: 1; 
		transform: translateY(0);
	}
}

@keyframes slide-in-right {
	from { 
		opacity: 0; 
		transform: translateX(50px);
	}
	to { 
		opacity: 1; 
		transform: translateX(0);
	}
}

/* Classes Utilitaires Modernes */
.animate-fade-in {
	animation: fade-in 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.animate-slide-in-right {
	animation: slide-in-right 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.animate-float {
	animation: float 6s ease-in-out infinite;
}

.animate-pulse-glow {
	animation: pulse-glow 2s ease-in-out infinite;
}

.animate-gradient {
	background-size: 200% 200%;
	animation: gradient-shift 3s ease infinite;
}

/* Glassmorphism Avancé */
.glass-card {
	background: rgba(175, 62, 62, 0.08);
	backdrop-filter: blur(20px);
	-webkit-backdrop-filter: blur(20px);
	border: 1px solid rgba(175, 62, 62, 0.2);
	box-shadow: 
		0 8px 32px rgba(175, 62, 62, 0.1),
		inset 0 1px 0 rgba(255, 255, 255, 0.1),
		inset 0 -1px 0 rgba(0, 0, 0, 0.05);
	transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-card:hover {
	background: rgba(175, 62, 62, 0.12);
	border-color: rgba(175, 62, 62, 0.3);
	box-shadow: 
		0 20px 60px rgba(175, 62, 62, 0.15),
		inset 0 1px 0 rgba(255, 255, 255, 0.2);
	transform: translateY(-8px) scale(1.02);
}

.glass-input {
	background: rgba(234, 235, 208, 0.1);
	backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(10px);
	border: 1px solid rgba(175, 62, 62, 0.2);
	transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	position: relative;
	overflow: hidden;
}

.glass-input::before {
	content: '';
	position: absolute;
	top: 0;
	left: -100%;
	width: 100%;
	height: 100%;
	background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
	transition: left 0.5s;
}

.glass-input:focus {
	background: rgba(234, 235, 208, 0.15);
	border-color: rgba(218, 108, 108, 0.4);
	box-shadow: 
		0 0 0 3px rgba(218, 108, 108, 0.1),
		0 10px 30px rgba(218, 108, 108, 0.2);
	transform: translateY(-2px);
}

.glass-input:focus::before {
	left: 100%;
}

.glass-button {
	backdrop-filter: blur(15px);
	-webkit-backdrop-filter: blur(15px);
	transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	position: relative;
	overflow: hidden;
}

.glass-button::before {
	content: '';
	position: absolute;
	top: 0;
	left: -100%;
	width: 100%;
	height: 100%;
	background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
	transition: left 0.6s;
}

.glass-button:hover::before {
	left: 100%;
}

.glass-button:hover {
	transform: translateY(-4px) scale(1.05);
	box-shadow: 0 15px 40px rgba(218, 108, 108, 0.4);
}

.glass-button:active {
	transform: translateY(-2px) scale(1.02);
	transition: all 0.1s;
}

/* Effets de Hover Avancés */
.liquid-hover {
	transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	position: relative;
	overflow: hidden;
}

.liquid-hover::after {
	content: '';
	position: absolute;
	top: 50%;
	left: 50%;
	width: 0;
	height: 0;
	background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
	transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
	transform: translate(-50%, -50%);
	border-radius: 50%;
}

.liquid-hover:hover::after {
	width: 300px;
	height: 300px;
}

.liquid-hover:hover {
	transform: translateY(-6px);
	box-shadow: 0 20px 50px rgba(175, 62, 62, 0.25);
}

/* Indicateurs de Statut Modernes */
.status-indicator {
	position: relative;
	display: inline-block;
}

.status-indicator::before {
	content: '';
	position: absolute;
	top: -2px;
	left: -2px;
	right: -2px;
	bottom: -2px;
	border-radius: 50%;
	background: conic-gradient(from 0deg, transparent, rgba(218, 108, 108, 0.3), transparent);
	animation: spin 3s linear infinite;
	z-index: -1;
}

@keyframes spin {
	to { transform: rotate(360deg); }
}

/* Responsive Design Avancé - Amélioré */
@media (max-width: 480px) {
	/* Très petits écrans */
	.glass-card {
		backdrop-filter: blur(5px);
		padding: 1rem;
	}
	
	.glass-input {
		backdrop-filter: blur(5px);
		font-size: 16px; /* Évite le zoom iOS */
	}
	
	.animate-float {
		animation-duration: 3s;
	}
	
	/* Ajustements spécifiques aux très petits écrans */
	.sticky {
		position: relative !important; /* Évite les problèmes de sticky sur très petits écrans */
	}
}

@media (max-width: 640px) {
	/* Mobiles */
	.glass-card {
		backdrop-filter: blur(8px);
		margin: 0.5rem;
	}
	
	.glass-input {
		backdrop-filter: blur(8px);
		padding: 0.75rem;
	}
	
	/* Optimisation des cartes stats sur mobile */
	.grid-cols-2 > * {
		min-width: 0; /* Évite le débordement */
	}
	
	/* Amélioration des boutons sur mobile */
	button {
		min-height: 44px; /* Touch target iOS/Android */
		min-width: 44px;
	}
}

@media (max-width: 768px) {
	/* Tablettes portrait */
	.glass-card {
		backdrop-filter: blur(10px);
	}
	
	.glass-input {
		backdrop-filter: blur(8px);
	}
	
	.animate-float {
		animation-duration: 4s;
	}
	
	/* Gestion du header sticky sur tablettes */
	.sticky {
		position: sticky !important;
		top: 0;
	}
}

@media (min-width: 1024px) {
	/* Desktop et plus */
	.glass-card {
		backdrop-filter: blur(20px);
	}
	
	.glass-input {
		backdrop-filter: blur(15px);
	}
}

/* Amélioration spécifique pour landscape mobile */
@media (max-height: 500px) and (orientation: landscape) {
	.min-h-screen {
		min-height: 100vh;
	}
	
	.sticky {
		position: relative !important; /* Évite les problèmes de sticky en landscape */
	}
	
	/* Réduction des paddings en mode landscape */
	.p-4 {
		padding: 0.5rem !important;
	}
	
	.py-6 {
		padding-top: 0.75rem !important;
		padding-bottom: 0.75rem !important;
	}
}

/* Optimisation pour les écrans tactiles */
@media (hover: none) and (pointer: coarse) {
	.hover\:scale-105:hover {
		transform: none; /* Désactive les effets hover sur tactile */
	}
	
	.group:hover .group-hover\:opacity-100 {
		opacity: 0; /* Désactive les effets hover sur tactile */
	}
}

/* Gestion du contraste élevé */
@media (prefers-contrast: high) {
	.glass-card {
		border-width: 2px;
		border-color: var(--color-burgundy-500) !important;
	}
	
	.glass-input {
		border-width: 2px;
		border-color: var(--color-burgundy-500) !important;
	}
}

/* Mode sombre automatique */
@media (prefers-color-scheme: dark) {
	.glass-card {
		background: rgba(175, 62, 62, 0.15);
		border-color: rgba(175, 62, 62, 0.3);
	}
	
	.glass-input {
		background: rgba(234, 235, 208, 0.05);
		border-color: rgba(175, 62, 62, 0.3);
		color: var(--color-cream-100);
	}
}

/* Prévention du débordement sur tous les écrans */
* {
	box-sizing: border-box;
}

.overflow-hidden {
	overflow: hidden;
}

/* Sécurité responsive */
.w-full {
	max-width: 100%;
}

.h-full {
	max-height: 100%;
}

/* Focus amélioré pour l'accessibilité sur tous les écrans */
.focus-ring:focus-visible {
	outline: 3px solid var(--color-coral-500);
	outline-offset: 3px;
	border-radius: 8px;
}
</style>
