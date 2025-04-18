<script>
	import { onMount } from 'svelte';
	import modelUrl from '$lib/solar_panel.glb';

	let modelViewerLoaded = false;

	onMount(async () => {
		await import('@google/model-viewer');
		modelViewerLoaded = true;
	});
</script>

{#if modelViewerLoaded}
	<model-viewer
		src={modelUrl}
		ios-src=""
		alt="Interactive 3D model of a solar panel"
		ar
		ar-modes="webxr scene-viewer quick-look"
		ar-placement="floor"
		camera-controls
		touch-action="pan-y"
		shadow-intensity="1"
		style="width: 100%; height: 400px; border-radius: 8px;"
	>
		<button
			slot="ar-button"
			style="background-color: white; border-radius: 4px; border: none; position: absolute; top: 16px; right: 16px; "
		>
			Activate AR 🤳
		</button>

		<div slot="progress-bar" class="progress-bar">
			<div class="update-bar"></div>
		</div>
	</model-viewer>
{:else}
	<div
		style="width: 100%; height: 400px; display: flex; justify-content: center; align-items: center; background-color: #eee; border-radius: 8px;"
	>
		Loading 3D Viewer...
	</div>
{/if}

<style>
	.progress-bar {
		display: block;
		width: 100%;
		height: 10px;
		max-height: 10px;
		overflow: hidden;
		position: absolute;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.1);
	}

	.update-bar {
		background-color: dodgerblue;
		width: 0%;
		height: 10px;
	}
</style>
