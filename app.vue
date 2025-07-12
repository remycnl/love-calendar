<script setup>
useHead({
	title: "Love Calendar",
	meta: [
		{
			name: "description",
			content: "Un calendrier de l'Avent pour célébrer l'amour chaque jour.",
		},
		{ charset: "utf-8" },
		{ name: "viewport", content: "width=device-width, initial-scale=1" },
	],
});
</script>

<template>
	<div class="w-full min-h-screen overflow-x-hidden">
		<NuxtRouteAnnouncer />
		<NuxtPage />
	</div>
</template>

<style>
html,
body {
	margin: 0;
	padding: 0;
	width: 100%;
	font-family: "Inter", system-ui, -apple-system, sans-serif;
	scroll-behavior: smooth;
}

/* Variables CSS globales pour le thème */
:root {
	--primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	--secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
	--success-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
	--card-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
		0 10px 10px -5px rgba(0, 0, 0, 0.04);
	--card-shadow-hover: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Reset et full width */
* {
	box-sizing: border-box;
}

#__nuxt {
	width: 100%;
	min-height: 100vh;
}

/* Supprimer les containers par défaut */
.container {
	max-width: none !important;
	width: 100% !important;
	padding-left: 0 !important;
	padding-right: 0 !important;
}

/* Styles pour les transitions globales */
.page-enter-active,
.page-leave-active {
	transition: all 0.4s ease;
}

.page-enter-from,
.page-leave-to {
	opacity: 0;
	transform: translateY(20px);
}

/* Assurer que tout prend la largeur complète */
html,
body,
#__nuxt,
.nuxt-page {
	width: 100%;
	margin: 0;
	padding: 0;
}
</style>
