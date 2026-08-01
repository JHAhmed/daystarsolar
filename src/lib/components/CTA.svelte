<script>
	import { animate, inView } from 'motion';
	import { ChevronIcon, ArrowIcon } from '$icons';
	import { CTABG } from '$lib';
	import { CTA } from '$components';

	function animateIn(
		element,
		args = { duration: 0.5, delay: 0.4, scale: 1, x: 0, y: 10, blur: 4, amount: 0.4 }
	) {
		inView(
			element,
			() => {
				const animation = animate(
					element,
					{
						opacity: 1,
						scale: [args.scale, 1],
						x: [args.x, 0],
						y: [args.y, 0],
						filter: [`blur(${args.blur}px)`, 'blur(0px)'] // Add blur animation
					},
					{
						duration: args.duration,
						delay: args.delay
					}
				);
			},
			{ amount: args.amount }
		);
	}
</script>

<div class="px-4 sm:px-6 lg:px-8 w-full">
	<div
		use:animateIn
		class="group/card clip relative my-8 sm:my-12 lg:my-16 flex w-full flex-col space-y-6 sm:space-y-8 lg:space-y-12 rounded-xl bg-gray-50 p-4 sm:p-6 opacity-0 mx-auto max-w-full md:max-w-7xl lg:p-12"
	>
		<div class="img-clip absolute right-0 top-0 h-full w-full rounded-xl">
			<img
				src={CTABG}
				class="img-clip absolute right-0 z-40 rounded-xl object-none opacity-40 sm:opacity-60 md:opacity-100"
				alt=""
				loading="lazy" 
			/>
		</div>

		<div class="z-20 flex flex-col space-y-1 sm:space-y-2">
			<h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-semibold tracking-tighter text-gray-800">
				Still have <span class="text-blue-300">questions</span>?
			</h2>
			<p class="text-lg sm:text-xl lg:text-2xl font-normal tracking-tighter text-gray-800">Get in touch.</p>
		</div>

		<div class="z-20 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-8">
			<a
				href="/contact"
				class="group/button flex w-fit items-center gap-2 rounded-full bg-blue-100 p-2 pl-4 transition-all duration-100 hover:bg-blue-200 md:p-4 md:pl-8"
			>
				<p class="text-sm sm:text-md md:text-lg font-medium tracking-tighter">Contact Us</p>
				<div
					class="ml-2 sm:ml-4 flex cursor-pointer items-center justify-center rounded-full bg-white p-1.5 sm:p-2 text-black shadow-sm transition-all duration-100 group-hover/button:ml-4 sm:group-hover/button:ml-8"
				>
					<ArrowIcon className="size-4 sm:size-5 stroke-2 -rotate-90" />
				</div>
			</a>

			<a
				href="/gallery"
				class="group/explore flex items-center gap-2 rounded-md bg-none text-gray-600 sm:text-gray-800 md:text-black"
			>
				<p class="text-sm sm:text-md md:text-lg font-medium tracking-tighter">Explore</p>
				<div
					class="flex cursor-pointer items-center justify-center rounded-md p-1.5 sm:p-2 duration-100 group-hover/explore:ml-2"
				>
					<ArrowIcon className="size-4 sm:size-5 stroke-2 -rotate-90" />
				</div>
			</a>
		</div>
	</div>
</div>

<style>
	.img-clip {
		clip-path: polygon(50% 0, 100% 0, 100% 100%, 0 100%);
	}
</style>