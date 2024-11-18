<script>
    // import 'aframe';
    import model from '$lib/model.glb';

</script>

<div class="h-screen w-screen">
    <a-scene embedded arjs>
        <!-- Solar panel 3D model -->
        <a-entity
          gltf-model={model}
          scale="0.5 0.5 0.5"
          position="0 0 0">
        </a-entity>
      
        <!-- Ground plane (optional) -->
        <a-plane
          position="0 0 0"
          rotation="-90 0 0"
          width="10"
          height="10"
          color="#7BC8A4">
        </a-plane>
      
        <!-- AR Camera -->
        <a-camera position="0 0 0"></a-camera>
      </a-scene>
      
</div>