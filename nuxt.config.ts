// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
    resolve: {
			alias: {
				".prisma/client/index-browser":
					"./node_modules/.prisma/client/index-browser.js",
			},
		},
  },

  runtimeConfig: {
    secretPassword: process.env.SECRET_PASSWORD,
  },

  modules: ['@prisma/nuxt'],
})