<template>
	<div class="hero">
		<img src="/home.jpg" alt="Workout Banner" class="hero-img" />
		<h1 class="tagline">Train Hard. Stay Strong.</h1>
	</div>
	<HighlightsComponentVue/>
</template>

<script setup>
	import HighlightsComponentVue from "../components/HighlightsComponent.vue";
</script>

<style scoped>
	.hero {
		position: relative;
		width: 100%;
		height: 60vh;
		overflow: hidden;
	}


	.hero-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.tagline {
		position: absolute;
		bottom: 20px;
		left: 20px;
		color: white;
		font-size: 2rem;
		font-weight: 700;
		text-shadow: 0 3px 8px rgba(0,0,0,0.6);
	}
</style>