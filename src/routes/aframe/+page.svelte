<!-- <script>
	import model from '$lib/model.glb';
	import { browser } from '$app/environment';
	import { Pane } from 'tweakpane';

	let modelSettings = {
		scale: 0.5,
		position: { x: -1, y: 0.5, z: -3 },
	};

	if (browser) {
		const pane = new Pane();
		const folder = pane.addFolder({ title: 'Model Controls' });

		folder.addBinding(modelSettings, 'scale', { min: 0.1, max: 2, step: 0.1 }).on('change', (e) => {
			document.querySelector('#model').setAttribute('scale', `${e.value} ${e.value} ${e.value}`);
		});

        folder.addBinding(modelSettings, 'position', { 
            x: { min: -10, max: 10, step: 0.1 }, 
            y: { min: -10, max: 10, step: 0.1 }, 
            z: { min: -10, max: 10, step: 0.1 }, 
        }).on('change', () => updatePosition());

	}

	function updatePosition() {
		const pos = modelSettings.position;
		document.querySelector('#model').setAttribute('position', `${pos.x} ${pos.y} ${pos.z}`);
	}
</script>

<div>
	<a-scene arjs="sourceType: webcam; videoTexture: true; debugUIEnabled: false;">
		<a-entity id="model" gltf-model={model} scale="0.5 0.5 0.5" position="-1 0.5 -3"></a-entity>
		<a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>

		<a-light type="directional" position="2 4 5" intensity="2"></a-light>
		<a-light type="ambient" intensity="0.5"></a-light>
	</a-scene>
</div> -->
