<!-- <script>
	import model from '$lib/model.glb';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
 	import { Pane } from 'tweakpane';

	if (browser) {
		const pane = new Pane();
	   	const folder = pane.addFolder({ title: 'Model' });
	}

	$effect(() => {

	});

</script> 

<div>
    <a-scene arjs="sourceType: webcam; videoTexture: true; debugUIEnabled: false;">
		<a-entity gltf-model={model} scale="0.5 0.5 0.5" position="-1 0.5 -3"> </a-entity>
		<a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
		<a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
		<a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
	  </a-scene>
</div>
 -->
