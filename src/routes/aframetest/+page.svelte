<script>
    import model from '$lib/model.glb';
    import { onMount } from 'svelte';
  
    let isLoading = true;
    let isARSupported = true;
    let isCameraAllowed = false;
    let modelScale = 0.5;
    let modelRotation = 0;
  
    onMount(() => {
      // Check if AR is supported
      if (!navigator.xr && !window.WebXRPolyfill) {
        isARSupported = false;
      }
  
      // Listen for model loaded event
      const modelEntity = document.getElementById('solar-panel-model');
      if (modelEntity) {
        modelEntity.addEventListener('model-loaded', () => {
          isLoading = false;
        });
      }
  
      // Listen for camera permissions
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(() => {
          isCameraAllowed = true;
        })
        .catch(() => {
          isCameraAllowed = false;
        });
    });
  
    function adjustScale(increment) {
      modelScale = Math.max(0.1, modelScale + increment);
    }
  
    function adjustRotation(increment) {
      modelRotation += increment;
    }
  
    function resetModel() {
      modelScale = 0.5;
      modelRotation = 0;
    }
  </script>
  
  <div class="ar-container">
    {#if !isARSupported}
      <div class="ar-error">
        <p>Your device doesn't support AR. Please try on a more recent mobile device.</p>
      </div>
    {:else if !isCameraAllowed}
      <div class="ar-error">
        <p>Please allow camera access to use the AR preview.</p>
      </div>
    {:else}
      {#if isLoading}
        <div class="ar-loading">
          <p>Loading solar panel model...</p>
        </div>
      {/if}
      
      <a-scene 
        arjs="sourceType: webcam; videoTexture: true; debugUIEnabled: false;"
        renderer="antialias: true; alpha: true"
        vr-mode-ui="enabled: false">
        
        <a-entity
          id="solar-panel-model"
          gltf-model={model}
          scale="{modelScale} {modelScale} {modelScale}"
          rotation="0 {modelRotation} 0"
          position="0 0.5 -3"
          shadow="cast: true; receive: true">
        </a-entity>
  
        <a-light type="directional" position="2 4 5" intensity="1.5" castShadow="true"></a-light>
        <a-light type="ambient" intensity="0.5"></a-light>
        
        <!-- Adds a surface for the model to cast shadows onto -->
        <a-plane position="0 0 -4" rotation="-90 0 0" width="100" height="100" color="#f2f2f2" material="opacity: 0.5" shadow="receive: true"></a-plane>
        
        <a-camera position="0 1.6 0"></a-camera>
      </a-scene>
  
      <div class="ar-controls">
        <button on:click={() => adjustScale(0.1)}>Larger</button>
        <button on:click={() => adjustScale(-0.1)}>Smaller</button>
        <button on:click={() => adjustRotation(45)}>Rotate</button>
        <button on:click={() => resetModel()}>Reset</button>
        <div class="ar-info">
          <p>Move your device to place the solar panel on your terrace</p>
        </div>
      </div>
    {/if}
  </div>
  
  <style>
    .ar-container {
      position: relative;
      width: 100%;
      height: 100vh;
    }
    
    .ar-controls {
      position: absolute;
      bottom: 20px;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      gap: 10px;
      z-index: 1000;
    }
    
    .ar-controls button {
      background: rgba(0, 0, 0, 0.6);
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 20px;
      font-weight: bold;
    }
    
    .ar-info {
      position: absolute;
      top: -60px;
      left: 0;
      right: 0;
      text-align: center;
      background: rgba(0, 0, 0, 0.6);
      color: white;
      padding: 8px;
      border-radius: 20px;
    }
    
    .ar-loading, .ar-error {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 20px;
      border-radius: 10px;
      z-index: 1000;
      text-align: center;
    }
  </style>