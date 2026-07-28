<script>
	import { browser } from '$app/environment';
	import { ArrowIcon } from '$icons';
	import { animate, inView, stagger, scroll } from 'motion';
	import { onMount } from 'svelte';

	import { animateIn, servicesImage1, servicesImage2, servicesImage3 } from '$lib';

</script>

<section class="mx-auto max-w-7xl px-6 py-8 md:py-12">
	<h2 use:animateIn={{ delay: 0.0, duration: 0.2, blur: 2 }} class="text-3xl md:text-5xl my-8 font-semibold tracking-tighter text-left opacity-0">Why Choose Us?</h2>

	<div class="grid gap-4 md:gap-8 md:grid-cols-3">

		<div use:animateIn={{ delay: 0.0, duration: 0.5, blur: 8, rotate: 2 }} class="rounded-xl origin-top-left opacity-0 bg-gray-50 text-center md:text-left motion">
			<div class="mx-auto flex items-center justify-center">
                <img loading="lazy" src={servicesImage1} class="w-full rounded-t-lg h-48 object-cover" alt="">
			</div>

			<div class="p-6 md:p-8">
                <h3 class="mb-4 text-xl md:text-2xl font-semibold tracking-tighter">
                    Installation by Project Management
                </h3>
                
                <p class="leading-relaxed text-sm md:text-md tracking-tight text-gray-600">
                    Putting together the solar plant becomes an easy process once perfectly engineered plans are
                    executed. Our team excels at site installations by the very nature of their vast experience
                    in the field.
                </p>
            </div>
		</div>

		<div use:animateIn={{ delay: 0.2, duration: 0.5, blur: 8, rotate: 2 }} class="rounded-xl origin-top-left opacity-0 bg-gray-50 text-center md:text-left motion">
			<div class="mx-auto flex items-center justify-center">
                <img loading="lazy" src={servicesImage2} class="w-full rounded-t-lg h-48 object-cover" alt="">
			</div>

			<div class="p-6 md:p-8">
                <h3 class="mb-4 text-xl md:text-2xl font-semibold tracking-tighter">
                    Architectural & Engineering Design
                </h3>
                <p class="leading-relaxed text-sm md:text-md tracking-tight text-gray-600">
                    Our experienced team will visit your site and give you the optimal solution for your solar
                    plant. Engineering designs are perfected after your approval on the preliminary
                    specifications.
                </p>
            </div>
		</div>

		<div use:animateIn={{ delay: 0.4, duration: 0.5, blur: 8, rotate: 2 }} class="rounded-xl origin-top-left opacity-0 bg-gray-50 text-center md:text-left motion">
			
			<div class="mx-auto flex items-center justify-center">
                <img loading="lazy" src={servicesImage3} class="w-full rounded-t-lg h-48 object-cover" alt="">
			</div>

			<div class="p-6 md:p-8">
                <h3 class="mb-4 text-xl md:text-2xl font-semibold tracking-tighter">Turn Key Projects</h3>
                <p class="leading-relaxed text-sm md:text-md tracking-tight text-gray-600">
                    Our main focus and the best for our customers is to let us be the single point of contact
                    for a turn key solution. Just give us the responsibility and enjoy a fully customized and
                    high quality power plant.
                </p>
            </div>
		</div>

	</div>
</section>
