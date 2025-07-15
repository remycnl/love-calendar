<template>
  <div
    class="backdrop-blur-xl border-b fixed inset-0 h-fit rounded-b-3xl md:rounded-b-4xl z-50 transition-all duration-300"
    style="background: rgba(175, 62, 62, 0.95); border-color: rgba(175, 62, 62, 0.3); box-shadow: 0 8px 32px rgba(175, 62, 62, 0.1);"
  >
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
          <slot name="stats"></slot>
          <slot name="status"></slot>
          <slot name="messages"></slot>
          <slot name="actions"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// Pas de logique, slots pour flexibilité
</script>
