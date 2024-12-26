<script>
	import { ChevronIcon } from '$icons';
	import { logoSmall, twitterLogo, facebookLogo, linkedinLogo } from '$lib';
	import { onMount } from 'svelte';
</script>

<footer class="mx-auto w-full">

    <div class="bg-[#1F232C] p-8 w-full h-full grid grid-cols-3">

        <div class="w-full h-full flex flex-col items-left px-4">
            <div class="flex flex-col justify-center grow items-cen">
                <p class="text-white text-md font-light max-w-md">
                    <span class="font-normal">Daystar Solar</span> was formed with the intention of consulting; procuring,
                    supplying and installing solar power plants for commercial and domestic use.
                </p>
            </div>
            <p class="text-xs text-gray-500">© 2024 Daystar Solar  •  All rights reserved</p>
        </div>


        <div class="w-full py-16">
            <div class="flex flex-col items-left w-full h-full justify-center px-4">
                <div class="grid grid-cols-2">

                    <div class="flex flex-col space-y-3 items-center justify-center">
                        <ul class="text-white space-y-2 text-sm font-light">
                            <li class="font-normal">Learn More</li>
                            <li><a href="/products">Products</a></li>
                            <li><a href="/services">Services</a></li>
                            <li><a href="/gallery">Gallery</a></li>
                        </ul>
                    </div>

                    <div class="flex flex-col space-y-3 items-center justify-center">
                        <ul class="text-white space-y-2 text-sm font-light">
                            <li class="font-normal"><a href="/about">About Us</a></li>
                            <li><a href="/contact">Contact</a></li>
                            <li><a href="/blog">Blog</a></li>
                            <li><a href="/faq">FAQ</a></li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>


        <div class="w-full py-16 flex flex-col justify-center items-left">
            <p class="text-white font-light my-2">Sign up to our <span class="font-normal">newsletter</span></p>
            <div class="flex items-center bg-white rounded-md shadow-md w-full max-w-md p-2">
                <input 
                  type="email" 
                  placeholder="Email" 
                  class="w-full border-none outline-none text-base p-2 focus:ring-transparent"
                />
                <button 
                  class="bg-black text-white rounded-md p-2 flex items-center justify-center cursor-pointer">
                  <ChevronIcon />
                </button>
              </div>
              
        </div>

    </div>

	<div class="mx-auto my-4 flex items-center justify-center px-2 lg:px-8">

        <div class="space-x-6 flex">
            <a href="https://twitter.com/DaystarSolar">
                <img class="h-2 w-auto lg:h-4" src={twitterLogo} alt="Twitter Logo" />
            </a>
            <a href="https://www.facebook.com/daystarsolarindia">
                <img class="h-2 w-auto lg:h-4" src={facebookLogo} alt="Facebook Logo" />
            </a>
            <a href="https://in.linkedin.com/company/daystar-solar">
                <img class="h-2 w-auto lg:h-4" src={linkedinLogo} alt="LinkedIn Logo" />
            </a>
        </div>

        <div class="grow">
            <a href="/" title="" class="flex items-center justify-center"> 
                <img class="h-4 w-auto lg:h-6" src={logoSmall} alt="Daystar Logo" />
            </a>
        </div>

        <a href="/privacy-policy" class="text-xs font-normal">Privacy Policy</a>
        <span class="mx-2">|</span>
        <a href="/terms-of-service" class="text-xs font-normal">Terms of Service</a>
    </div>
</footer>