<template>
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

		<!-- Crédits -->
		<div class="mt-4 sm:mt-6 text-xs text-burgundy-400">
			<p>
				Développé avec ❤️ par
				<NuxtLink
					to="https://www.remycanal.me"
					target="_blank"
					rel="noopener noreferrer"
					class="underline hover:text-burgundy-500">
					Rémy Canal
				</NuxtLink>
			</p>
		</div>
	</div>
</template>
