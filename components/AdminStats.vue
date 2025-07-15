<template>
  <div class="hidden lg:flex items-center gap-4 px-4 py-2 rounded-xl backdrop-blur-sm" style="background: rgba(234, 235, 208, 0.15);">
    <div class="text-center">
      <div class="text-lg font-bold text-white">{{ total }}</div>
      <div class="text-xs" style="color: var(--color-cream-200);">Total</div>
    </div>
    <div class="w-px h-8" style="background: rgba(234, 235, 208, 0.3);"></div>
    <div class="text-center">
      <div class="text-lg font-bold" style="color: var(--color-coral-200);">{{ opened }}</div>
      <div class="text-xs" style="color: var(--color-cream-200);">Ouvertes</div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  total: Number,
  opened: Number
});
</script>
