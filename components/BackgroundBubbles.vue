<template>
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
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

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

.animate-float {
	animation: float 4s ease-in-out infinite;
}
</style>
