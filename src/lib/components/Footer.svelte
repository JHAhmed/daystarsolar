<script>
	import { ChevronIcon } from '$icons';
	import { logoSmall, twitterLogo, facebookLogo, linkedinLogo } from '$lib';
	import { onMount } from 'svelte';
</script>

<footer class="mx-auto w-full">

    <div class=" bg-darkgray p-8 w-full h-full grid lg:grid-cols-3 grid-cols-1 gap-2">

        <div class="w-full text-center lg:text-left h-full flex flex-col items-left px-4">
            <div class="flex flex-col justify-center grow items-cen">
                <p class="text-white text-md font-light max-w-md">
                    <span class="font-normal">Daystar Solar</span> was formed with the intention of consulting; procuring,
                    supplying and installing solar power plants for commercial and domestic use.
                </p>
            </div>
            <p class="text-xs my-4 text-gray-500 md:block hidden">© 2024 Daystar Solar  •  All rights reserved</p>
        </div>

        <div class="w-full p-8 md:py-16 md:text-left text-center">
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

        <div class="w-full p-8 md:py-16 flex flex-col justify-center items-center">

            <div class="max-w-md w-full flex flex-col justify-center items-left">
                <p class="text-white text-center md:text-left font-light my-2">Sign up to our <span class="font-normal">newsletter</span></p>
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
        <p class="text-xs my-2 text-gray-500 md:hidden text-center">© 2025 Daystar Solar  •  All rights reserved</p>

    </div>

	<div class="mx-auto my-4 flex items-center relative justify-center px-4 lg:px-8">

        <div class="space-x-6 flex mr-[6.5rem]">
            <a href="https://twitter.com/DaystarSolar">
                <img class="h-3 w-auto lg:h-4" src={twitterLogo} alt="Twitter Logo" />
            </a>
            <a href="https://www.facebook.com/daystarsolarindia">
                <img class="h-3 w-auto lg:h-4" src={facebookLogo} alt="Facebook Logo" />
            </a>
            <a href="https://in.linkedin.com/company/daystar-solar">
                <img class="h-3 w-auto lg:h-4" src={linkedinLogo} alt="LinkedIn Logo" />
            </a>
        </div>

        <div class="grow"></div>

        <div class="flex items-center justify-center mx-auto absolute top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4">
            <a href="/" title="" class="flex items-center justify-center"> 
                <img class="h-5 w-auto md:h-6" src={logoSmall} alt="Daystar Logo" />
            </a>
        </div>

        <div class="flex lg:flex-row flex-col items-center justify-center text-center space-x-2 text-xs font-medium text-gray-900">
            <a href="https://wurks.studio/" class="text-gray-600 font-normal">By <span class="text-purple-600 font-medium">Wurks</span>.</a>
        </div>
    </div>
</footer>
