<script>
	import model from '$lib/solar_panel.glb';
</script>

<svelte:head>
	<script
		type="module"
		src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
	></script>
</svelte:head>

<!-- ar-scale="fixed" -->
<model-viewer
	src={model}
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
	<!-- Fallback content -->
	<!-- <div slot="ar-button">👆 Tap to place solar panel in AR</div> -->

	<button
		slot="ar-button"
		class="absolute bottom-[132px] left-1/2 h-9 -translate-x-1/2 transform rounded-full border border-[#DADCE0] bg-white py-0 pl-10 pr-4 font-sans text-sm leading-9 text-[#4285f4]"
	>
		View in AR
	</button>
</model-viewer>
