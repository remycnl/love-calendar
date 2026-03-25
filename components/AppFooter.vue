<template>
	<div class="w-full text-center px-4">
		<div class="my-20 md:my-15 flex justify-center">
			<div
				class="relative w-60 sm:w-70 md:w-80 rounded-sm bg-white p-3 pb-5 shadow-md hover:shadow-lg ring-1 ring-black/5 transition-all duration-300 origin-center -rotate-5 hover:-translate-y-5 hover:scale-110 hover:rotate-0">
				<img
					src="/selfie.png"
					alt="Selfie de Remy"
					class="h-auto w-full object-cover rounded-xs"
					loading="lazy" />
				<p
					class="mt-5 text-[0.68rem] sm:text-xs tracking-widest font-black"
					style="color: var(--color-burgundy-400)">
					Selfiiiiiiie !!!
				</p>
			</div>
		</div>

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
