<script>
	// import model from '$lib/solar_panel.glb';
	// import model from '$lib/solar_module.glb';
	import model from '$lib/solar.glb';
	import SmartCube from '$icons/SmartCube.svelte';
	import iosmodel from '$lib/solar_panel.glb';
	import { SmartCubeIcon } from '$icons';
</script>

<svelte:head>
	<script
		type="module"
		src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
	></script>
</svelte:head>

<!-- ios-src={iosmodel} -->
<model-viewer
	src={model}
	ar-scale="fixed"
	ar
	ar-modes="scene-viewer quick-look webxr"
	camera-controls
	shadow-intensity="1"
	environment-image="neutral"
	style="width: 100%; height: 400px;"
	alt="3D model of solar panel"
	xr-environment
	auto-rotate
	interaction-prompt="none"
>
	<button
		slot="ar-button"
		class="absolute bottom-32 left-1/2 h-12 -translate-x-1/2 transform rounded-full border border-[#DADCE0] bg-white py-0 px-4 flex items-center justify-center font-sans text-sm leading-9 text-[#4285f4]"
	>
	  <span class="mr-2 inline-flex"><SmartCubeIcon /></span>

		View in AR
	</button>
</model-viewer>

<!-- <button
	slot="ar-button"
	class="flex items-center justify-center space-x-4 rounded-full border drop-shadow-md bg-white px-4 mx-auto text-sm leading-9 text-[#4285f4]"
>
	<span class="mr-2"><SmartCubeIcon/></span>
	View in AR
</button> -->
