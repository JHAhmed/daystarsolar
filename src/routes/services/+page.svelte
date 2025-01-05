<script>
	import { browser } from '$app/environment';
	import { CTA, ServicesCards } from '$components';
	import { animate, inView, stagger, scroll } from 'motion';
	import { onMount } from 'svelte';



	let scrollContainer;
	const steps = [
		{
			title: 'Customer Interaction',
			description: 'Experience the pain points and provide the solutions.'
		},
		{
			title: 'Digitisation',
			description:
				'Site visit and digitisation of site parameters. This enables simulation for exact verification of performance.'
		},
		{
			title: 'Design',
			description:
				'Initial designs are based on surveyed parameters and solutions discussed. A clear plan is charted keeping in mind challenges on cost and design requirements.'
		},
		{
			title: 'Approvals',
			description:
				'Statutory approvals and permissions are involved in a properly executed timeline. Nothing is left to chance. Challenges are overcome with ingenuity.'
		},
		{
			title: 'Installation',
			description:
				'Once all parameters are approved from vendor and customer, the work is started after procurement and validation from the design team.'
		},
		{
			title: 'Commissioning',
			description:
				'All testing, wiring, earthing, structural integrity calculations, verification, and quality controls are observed during this process. This is exhaustive and intensive.'
		},
		{
			title: 'Handover',
			description:
				"Once commissioned, the completed plant is handed over from an operations perspective, and a 'hand-holding' period for operations is in progress."
		},
		{
			title: 'Report',
			description:
				'A detailed project report is drafted once the handover is completed. This is essentially the custom reference manual with all electrical codes and designs.'
		},
		{
			title: 'Followup',
			description:
				'We check up on the plant working remotely and by physical inspections. We track performance, cleaning schedules, and overall health of the plant.'
		},
		{
			title: 'Service Backup',
			description:
				'Future-proofing our plants also means we have the best after-sales backup service. We work to keep your plant always healthy and generating for years.'
		}
	];

	function animateIn(
		element,
		args = { duration: 0.5, delay: 0, scale: 1, x: 0, y: 0, blur: 0, amount: 0.5 }
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

	onMount(() => {
		inView(scrollContainer, () => {
			const animation = animate(
				'.step-point',
				{
					backgroundColor: ['#000', '#f6ad55'],
					scale: [0.5, 1],
					filter: ['drop-shadow(0 0 0px #fdba74)', 'drop-shadow(0 0 10px #fdba74)']
				},
				{
					duration: 0.1,
					delay: stagger(0.5, { startDelay: 0.5 })
				}
			);
		});
	});
</script>

<ServicesCards />

<!-- <div class="mx-auto flex max-w-7xl flex-col items-center justify-center space-y-2 p-16"></div> -->

<section class="mx-auto max-w-7xl py-8 md:py-16 p-8">

	<h2 use:animateIn class="text-3xl md:text-5xl my-8 font-semibold tracking-tighter text-left opacity-0">Our Process</h2>

	<div bind:this={scrollContainer} class="grid gap-8 gap-y-12 md:gap-y-16 md:grid-cols-4">
		{#each steps as step, index}
			<div use:animateIn={{ delay: index / 4, blur: 8, amount: 0.1 }} class="relative opacity-0">
				<div class="my-4 flex items-center">
					<div class=" step-point size-3 rounded-full bg-gray-900"></div>
					<div class="absolute mx-6 h-0.5 w-5/6 md:w-full bg-gray-300"></div>
				</div>

				<div class="px-1">
					<h3 class="mb-3 text-xl md:text-2xl font-semibold tracking-tighter">{step.title}</h3>
					<p class="text-xs md:text-sm leading-snug tracking-tight text-gray-600">{step.description}</p>
				</div>
			</div>
		{/each}
	</div>
</section>

<CTA />