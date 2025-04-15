<script>
    import model from '$lib/solar_panel.glb';
  </script>
  
  <svelte:head>
    <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
  </svelte:head>
  
  <model-viewer
    src={model}
    ar
    ar-modes="scene-viewer quick-look webxr"
    camera-controls
    shadow-intensity="1"
    environment-image="neutral"
    style="width: 100%; height: 400px;"
    ar-scale="fixed"
    alt="3D model of solar panel"
    xr-environment
    auto-rotate
    interaction-prompt="none"
  >
    <!-- Fallback content -->
    <div slot="ar-button">
      👆 Tap to place solar panel in AR
    </div>
  </model-viewer>
  