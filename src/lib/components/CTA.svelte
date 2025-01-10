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

<div class="mx-4">
	<div
		use:animateIn
		class="group/card clip relative my-16 flex w-full flex-col space-y-12 rounded-xl bg-gray-50 p-6 opacity-0 md:mx-auto md:max-w-7xl md:p-12"
	>
		<!-- <div
            class="absolute left-0 top-0 h-full w-full scale-0 rounded-full z- bg-white opacity-0 transition-all duration-100 delay-75 group-hover/card:scale-100 group-hover/card:rounded-xl group-hover/card:opacity-100"
        ></div> -->

		<div class="img-clip absolute right-0 top-0 h-full w-full rounded-xl">
			<img
				src={CTABG}
				class="img-clip absolute right-0 z-40 rounded-xl object-none opacity-60 md:opacity-100"
				alt=""
			/>
		</div>

		<div class="z-20 flex flex-col space-y-2">
			<h2 class="text-3xl font-semibold tracking-tighter text-gray-800 md:text-6xl">
				Still have <span class="text-blue-300">questions</span>?
			</h2>
			<p class="text-xl font-normal tracking-tighter text-gray-800 md:text-2xl">Get in touch.</p>
		</div>

		<div class="z-20 flex space-x-2 md:space-x-8">
			<a
				href="/contact"
				class="group/button flex w-fit items-center gap-2 rounded-full bg-blue-100 p-2 pl-4 transition-all duration-100 hover:bg-blue-200 md:p-4 md:pl-8"
			>
				<p class="text-md font-medium tracking-tighter md:text-lg">Contact Us</p>
				<div
					class="ml-4 flex cursor-pointer items-center justify-center rounded-full bg-white p-2 text-black shadow-sm transition-all duration-100 group-hover/button:ml-8"
				>
					<ArrowIcon className="size-5 stroke-2 -rotate-90" />
				</div>
			</a>

			<a
				href="/gallery"
				class="group/explore ml-8 flex items-center gap-2 rounded-md bg-none text-white md:text-black"
			>
				<p class="text-md font-medium tracking-tighter md:text-lg">Explore</p>
				<div
					class="flex cursor-pointer items-center justify-center rounded-md p-2 duration-100 group-hover/explore:ml-2"
				>
					<ArrowIcon className="size-5 stroke-2 -rotate-90" />
				</div>
			</a>
		</div>
	</div>
</div>

<style>
	.img-clip {
		clip-path: polygon(50% 0, 100% 0, 100% 100%, 0 100%);
	}

	/*.cta-bg {
        background-image: url(CTABG);
    } */
</style>
