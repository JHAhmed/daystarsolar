<script>
	import { browser } from '$app/environment';
	import { ArrowIcon } from '$icons';
	import { animate, inView, stagger, scroll } from 'motion';
	import { onMount } from 'svelte';

	onMount(() => {

		animate(
			'.box',
			{
				scale: [1, 0.9, 1],
				// scale: [0.75, 1.1, 0.75],
				borderWidth: [2, 2, 2],
				borderColor: ['#4b5563', '#fff', '#4b5563'],
				borderStyle: ['solid', 'dashed', 'solid'],
			},
			{
				duration: 1,
				repeat: Infinity,
				repeatDelay: 2,
				ease: "circInOut",
				repeatType: 'loop',
				delay: stagger(0.8)
			}
		)

		animate(
			'.bulb',
			{
				backgroundColor: ['#4b5563', '#f6ad55', '#4b5563'],
				scale: [0.75, 1.1, 0.75],
				filter: [
					'drop-shadow(0 0 0px #fdba74)',
					'drop-shadow(0 0 4px #fdba74)',
					'drop-shadow(0 0 0px #fdba74)'
				]
			},
			{
				duration: 0.7,
				repeat: Infinity,
				repeatDelay: 0.8,
				repeatType: 'loop',
				delay: stagger(0.15, { startDelay: 0.5 })
			}
		);

		if (browser) {
			const container = document.getElementById('arrow-container');

			// Listen for mouse movement
			document.addEventListener('mousemove', (e) => {
				const { clientX: mouseX, clientY: mouseY } = e;

				// Loop through each arrow
				const arrows = container.querySelectorAll('.arrow');
				arrows.forEach((arrow) => {
					const rect = arrow.getBoundingClientRect();
					const arrowX = rect.left + rect.width / 2;
					const arrowY = rect.top + rect.height / 2;

					// Calculate angle between arrow and cursor
					const angle = Math.atan2(mouseY - arrowY, mouseX - arrowX);
					const degrees = (angle * 180) / Math.PI;

					// Apply rotation to arrow
					arrow.style.transform = `rotate(${degrees}deg)`;
				});
			});
		}

	});

	function animateIn(element, args = { duration: 1, delay: 0, scale: 1, x: 0, y: 10, blur: 8, amount: 0.5 }) {

		inView(
			element,
			() => {
			const animation = animate(
					element,
					{
						opacity: 1,
						scale: [args.scale, 1],
						rotate: [-1, 0],
						x: [args.x, 0],
						y: [args.y, 0],
						filter: [`blur(${args.blur}px)`, 'blur(0px)'] 
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

<section class="mx-auto max-w-7xl px-6 py-8 md:py-16">
	<h2 use:animateIn={{ delay: 0.0, duration: 0.2, blur: 2 }} class="text-3xl md:text-5xl my-8 font-semibold tracking-tighter text-left opacity-0">Why Choose Us?</h2>

	<div class="grid gap-4 md:gap-8 md:grid-cols-3">

		<div use:animateIn={{ delay: 0.0, duration: 0.5, blur: 8 }} class="rounded-xl origin-top-left opacity-0 bg-gray-50 p-6 md:p-8 text-center md:text-left motion">
			<div class="m-6 mx-auto flex scale-75 md:scale-100 size-60 items-center justify-center" id="arrow-container">
				<div class="flex">
					{#each { length: 12 }, i}
						<div class="flex flex-col">
							{#each { length: 12 }, i}
								<!-- <div class="size-2 p-1 rounded-full bg-black hover:size-3 duration-100"></div> -->
								<div class="" style="transform-origin: center; transition: transform 0.1s ease;">
									<ArrowIcon className="size-4 arrow stroke-[3] text-gray-900" />
								</div>
							{/each}
						</div>
					{/each}
				</div>
			</div>

			<h3 class="mb-4 text-xl md:text-2xl font-semibold tracking-tighter">
				Installation by Project Management
			</h3>
			
			<p class="leading-relaxed text-sm md:text-md tracking-tight text-gray-600">
				Putting together the solar plant becomes an easy process once perfectly engineered plans are
				executed. Our team excels at site installations by the very nature of their vast experience
				in the field.
			</p>
		</div>

		<div use:animateIn={{ delay: 0.2, duration: 0.5, blur: 8 }} class="rounded-xl origin-top-left opacity-0 bg-gray-50 p-6 md:p-8 text-center md:text-left motion">
			<div class="m-6 mx-auto flex scale-75 md:scale-100 size-60 items-center justify-center">
				<div class="flex">
					{#each { length: 12 }, i}
						<div class="flex flex-col">
							{#each { length: 12 }, i}
								<div class="bulb m-1 size-2 scale-75 rounded-full bg-white"></div>
							{/each}
						</div>
					{/each}
				</div>
			</div>

			<h3 class="mb-4 text-xl md:text-2xl font-semibold tracking-tighter">
				Architectural & Engineering Design
			</h3>
			<p class="leading-relaxed text-sm md:text-md tracking-tight text-gray-600">
				Our experienced team will visit your site and give you the optimal solution for your solar
				plant. Engineering designs are perfected after your approval on the preliminary
				specifications.
			</p>
		</div>

		<div use:animateIn={{ delay: 0.4, duration: 0.5, blur: 8 }} class="rounded-xl origin-top-left opacity-0 bg-gray-50 p-6 md:p-8 text-center md:text-left motion">
			
			<div class="m-6 mx-auto grid grid-cols-12 scale-75 md:scale-100 size-60 group gap-2 p-6 items-center justify-center">
				<div class="flex bg-gray-400 col-span-4 box rounded-lg w-full h-full"></div>
				<div class="flex bg-gray-400 col-span-4 box rounded-lg w-full h-full"></div>
				<div class="flex bg-gray-400 col-span-4 box rounded-lg w-full h-full"></div>
				<div class="flex bg-gray-400 col-span-3 box rounded-lg w-full h-full"></div>
				<div class="flex bg-gray-400 col-span-9 box rounded-lg w-full h-full "></div>
				<div class="flex bg-gray-400 col-span-8 box rounded-lg w-full h-full"></div>
				<div class="flex bg-gray-400 col-span-4 box rounded-lg w-full h-full"></div>
			</div>

			<h3 class="mb-4 text-xl md:text-2xl font-semibold tracking-tighter">Turn Key Projects</h3>
			<p class="leading-relaxed text-sm md:text-md tracking-tight text-gray-600">
				Our main focus and the best for our customers is to let us be the single point of contact
				for a turn key solution. Just give us the responsibility and enjoy a fully customized and
				high quality power plant.
			</p>
		</div>

	</div>
</section>
