<!-- 
  File: src/routes/ar-js/+page.svelte
  Description: A SvelteKit page that uses AR.js to display a 3D model in augmented reality.
-->
<script>
	import { onMount } from 'svelte';
	// Import your 3D model. Make sure the path is correct in your SvelteKit project.
	// For this example, we're assuming the model is in `src/lib/assets/solar.glb`
	// SvelteKit requires you to handle assets in a specific way.
	// Often, you place them in the `static` folder and reference them directly,
	// or use Vite's asset handling. Let's assume you've placed it in `static`
	// and can reference it with a direct path.
	import model from '$lib/solar.glb';

	const modelUrl = model;

	let showAR = false;
	let arScene;

	// Function to start the AR experience
	function startAR() {
		showAR = true;
	}

	// Function to stop the AR experience
	function stopAR() {
		showAR = false;
		// Optional: Clean up AR.js resources if needed, though unmounting the component usually handles this.
		const video = document.querySelector('video');
		if (video && video.srcObject) {
			video.srcObject.getTracks().forEach((track) => track.stop());
		}
	}

	onMount(() => {
		// We need to add the A-Frame and AR.js scripts to the document's head
		// This ensures they are loaded before we try to use them.
		const aframeScript = document.createElement('script');
		aframeScript.src = 'https://aframe.io/releases/1.5.0/aframe.min.js';
		document.head.appendChild(aframeScript);

		const arjsScript = document.createElement('script');
		arjsScript.src = 'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js';

		// We wait for A-Frame to load before loading AR.js
		aframeScript.onload = () => {
			document.head.appendChild(arjsScript);
		};

		// Cleanup scripts when the component is destroyed
		return () => {
			document.head.removeChild(aframeScript);
			if (document.head.contains(arjsScript)) {
				document.head.removeChild(arjsScript);
			}
		};
	});
</script>

<svelte:head>
	<title>SvelteKit AR.js Demo</title>
</svelte:head>

<div class="relative h-screen w-full bg-gray-900 font-sans text-white">
	{#if showAR}
		<!-- AR Scene Container -->
		<div class="absolute left-0 top-0 z-[150] h-full w-full" bind:this={arScene}>
			<!-- 
        The a-scene component is the root of our A-Frame scene.
        `embedded` is important for placing it within our page layout.
        `arjs` configures AR.js. We're using a hiro marker for this demo.
      -->
			<a-scene
                class="z-[150]"
				embedded
				arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;"
				renderer="logarithmicDepthBuffer: true; precision: medium;"
				vr-mode-ui="enabled: false"
			>
				<!-- 
          The a-marker component tracks a specific marker. 
          When the 'hiro' marker is detected, its children will be displayed.
        -->
				<a-marker preset="hiro">
					<!-- 
              The a-gltf-model entity loads and displays your .glb model.
              - `src`: The URL to your model.
              - `scale`: Adjust the size of your model.
              - `position`: Position it relative to the marker.
              - `rotation`: Rotate the model if needed.
            -->
					<a-gltf-model
						src={modelUrl}
						scale="0.05 0.05 0.05"
						position="0 0 0"
						rotation="-90 0 0"
						animation-mixer
					></a-gltf-model>
				</a-marker>

				<!-- Define the camera for the scene -->
				<a-entity camera></a-entity>
			</a-scene>
		</div>

		<!-- UI to close the AR view -->
		<button
			on:click={stopAR}
			class="absolute right-4 top-4 z-20 transform rounded-lg bg-red-600 px-4 py-2 font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-red-700"
		>
			Close AR
		</button>
	{:else}
		<!-- Initial View -->
		<div class="flex h-full flex-col items-center justify-center p-8 text-center">
			<h1 class="mb-4 text-4xl font-bold md:text-6xl">AR.js in SvelteKit</h1>
			<p class="mb-8 max-w-2xl text-lg md:text-xl">
				Click the button below to open your device's camera and see a 3D model in Augmented Reality.
				You'll need to point your camera at the Hiro marker.
			</p>

			<div class="flex flex-col items-center">
				<button
					on:click={startAR}
					class="mb-6 transform rounded-lg bg-blue-600 px-6 py-3 text-xl font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-blue-700"
				>
					Start AR Experience
				</button>

				<div class="rounded-lg bg-white p-4">
					<p class="mb-2 font-semibold text-black">Scan this Hiro Marker:</p>
					<img
						src="https://raw.githack.com/AR-js-org/AR.js/master/data/images/HIRO.jpg"
						alt="HIRO marker for AR.js"
						class="mx-auto h-48 w-48"
					/>
				</div>
			</div>
		</div>
	{/if}
</div>
