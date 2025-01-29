<script>
	import { ChevronIcon } from '$icons';
	import { logoSmall, twitterLogo, facebookLogo, linkedinLogo } from '$lib';
	import { onMount } from 'svelte';
</script>

<footer class="mx-auto w-full">
	<div class=" grid h-full w-full grid-cols-1 gap-2 bg-darkgray p-8 lg:grid-cols-3">
		<div class="items-left flex h-full w-full flex-col px-4 text-center lg:text-left">
			<div class="items-cen flex grow flex-col justify-center">
				<p class="text-md max-w-md font-light text-white">
					<span class="font-normal">Daystar Solar</span> was formed with the intention of consulting;
					procuring, supplying and installing solar power plants for commercial and domestic use.
				</p>
			</div>
			<p class="my-4 hidden text-xs text-gray-500 md:block">
				© 2024 Daystar Solar • All rights reserved
			</p>
		</div>

		<div class="w-full p-8 text-center md:py-16 md:text-left">
			<div class="items-left flex h-full w-full flex-col justify-center px-4">
				<div class="grid grid-cols-2">
					<div class="flex flex-col items-center justify-center space-y-3">
						<ul class="space-y-2 text-sm font-light text-white">
							<li class="font-normal">Learn More</li>
							<li><a href="/products">Products</a></li>
							<li><a href="/services">Services</a></li>
							<li><a href="/gallery">Gallery</a></li>
						</ul>
					</div>

					<div class="flex flex-col items-center justify-center space-y-3">
						<ul class="space-y-2 text-sm font-light text-white">
							<li class="font-normal"><a href="/about">About Us</a></li>
							<li><a href="/contact">Contact</a></li>
							<li><a href="/blog">Blog</a></li>
							<li><a href="/faq">FAQ</a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>

		<div class="flex w-full flex-col items-center justify-center p-8 md:py-16">
			<div class="items-left flex w-full max-w-md flex-col justify-center">
				<p class="my-2 text-center font-light text-white md:text-left">
					Sign up to our <span class="font-normal">newsletter</span>
				</p>
				<div class="flex w-full max-w-md items-center rounded-md bg-white p-2 shadow-md">
					<input
						type="email"
						placeholder="Email"
						class="w-full border-none p-2 text-base outline-none focus:ring-transparent"
					/>
					<button
						class="flex cursor-pointer items-center justify-center rounded-md bg-black p-2 text-white"
					>
						<ChevronIcon />
					</button>
				</div>
			</div>
		</div>
		<p class="my-2 text-center text-xs text-gray-500 md:hidden">
			© 2025 Daystar Solar • All rights reserved
		</p>
	</div>

	<div class="relative mx-auto my-4 flex items-center justify-center px-4 lg:px-8">
		<div class="mr-[6.5rem] flex space-x-6">
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

		<div
			class="absolute left-2/4 top-2/4 mx-auto flex -translate-x-2/4 -translate-y-2/4 transform items-center justify-center"
		>
			<a href="/" title="" class="flex items-center justify-center">
				<img class="h-5 w-auto md:h-6" src={logoSmall} alt="Daystar Logo" />
			</a>
		</div>

		<div
			class="flex flex-col items-center justify-center space-x-2 text-center text-sm font-medium text-gray-900 lg:flex-row"
		>
			<a href="https://wurks.studio/" class="font-normal text-gray-600"
				>By <span class="font-medium text-purple-600">Wurks</span>.</a
			>
		</div>
	</div>
</footer>
