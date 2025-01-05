<script>
	import { twitterLogo, facebookLogo, linkedinLogo } from '$lib';

    const logos = [
      twitterLogo,
      facebookLogo,
      linkedinLogo,
      twitterLogo,
      facebookLogo,
      linkedinLogo,
    ];
  </script>
  
  <div class="relative w-full overflow-hidden bg-gray-100">
    <!-- First row of logos -->
    <div class="flex animate-scroll-left py-12">
      {#each [...logos, ...logos] as logo}
        <div class="mx-8 flex min-w-[150px] items-center justify-center">
          <img 
            src={logo} 
            alt="Company logo" 
            class="h-8 w-auto grayscale transition duration-200 hover:grayscale-0"
          />
        </div>
      {/each}
    </div>
    
  </div>
  
  <style>
    @keyframes scroll-left {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }
  
    .animate-scroll-left {
      animation: scroll-left 30s linear infinite;
    }

  </style>