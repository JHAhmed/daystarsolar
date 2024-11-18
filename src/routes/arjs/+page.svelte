<script>
	import model from '$lib/model.glb';
</script>

<div>
	<a-scene embedded arjs>
		<a-entity gltf-model={model} scale="0.5 0.5 0.5" position="0 0 0"> </a-entity>
		<a-camera position="0 0 5"></a-camera>
	</a-scene>
</div>
