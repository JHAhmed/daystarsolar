<!-- src/routes/ar-js/+page.svelte -->
<script>
	import model from '$lib/solar.glb';

	let libsReady = false;   // we load A-Frame & AR.js only once
	let sceneVisible = false;

	/* ----------------------------------------------------------- */
	/*  Lazy-loader for external scripts so that SSR never fails   */
	/* ----------------------------------------------------------- */
	function loadScript(src) {
		return new Promise((resolve, reject) => {
			// don’t load twice
			if (document.querySelector(`script[src="${src}"]`)) return resolve();

			const el = document.createElement('script');
			el.src = src;
			el.onload = () => resolve();
			el.onerror = () => reject();
			document.head.appendChild(el);
		});
	}

	/* ----------------------------------------------------------- */
	/*  Called when the user presses the button                    */
	/* ----------------------------------------------------------- */
	async function openCamera() {
		if (!libsReady) {
			// 1. core A-Frame
			await loadScript('https://aframe.io/releases/1.5.0/aframe.min.js');
			// 2. A-Frame build of AR.js (marker + location support)
			await loadScript(
				'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js'
			);
			libsReady = true;
		}
		sceneVisible = true;
	}
</script>

<style>
	/* make the camera feed cover the whole viewport */
	a-scene {
		position: fixed;
		inset: 0;
	}
</style>

<button disabled={sceneVisible} on:click={openCamera}>
	Open camera
</button>

{#if sceneVisible}
	<!-- Classic AR.js marker-based scene (cf. official example[5]) -->
	<a-scene
		embedded
		vr-mode-ui="enabled: false"
		renderer="logarithmicDepthBuffer: true"
		arjs="sourceType: webcam; debugUIEnabled: false"
	>
		<!-- Replace 'hiro' with your own .patt if you need to -->
		<a-marker preset="hiro">
			<!-- Import path emitted by Vite is injected here -->
			<!-- Loading a glTF/GLB in AR.js is identical to A-Frame usage[4] -->
			<a-entity gltf-model={model} scale="0.2 0.2 0.2"></a-entity>
		</a-marker>

		<a-entity camera></a-entity>
	</a-scene>
{/if}
