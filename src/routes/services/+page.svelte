<script>
	import { CTA, ServicesCards, Services } from '$components';
	import { animate, inView, stagger, scroll } from 'motion';
	import { onMount } from 'svelte';
	import { animateIn } from '$lib';

	let scrollContainer;
	const steps = [
		{
			title: 'Customer Interaction',
			description: 'Understand pain points and offer tailored solutions to meet client needs.'
		},
		{
			title: 'Site Digitisation',
			description:
				'Conduct site visits to gather parameters for precise simulation and performance verification.'
		},
		{
			title: 'Design and Approvals',
			description:
				'Create initial designs based on site data, balancing cost and design challenges. Obtain statutory approvals and permissions within a clear timeline.'
		},
		{
			title: 'Procurement and Installation',
			description:
				'Procure materials and validate designs before starting the installation with precision and efficiency.'
		},
		{
			title: 'Testing and Commissioning',
			description:
				'Perform rigorous testing, wiring, and structural integrity checks to ensure seamless commissioning.'
		},
		{
			title: 'Handover and Training',
			description:
				'Deliver the completed plant and provide operational support during a dedicated “hand-holding” period.'
		},
		{
			title: 'Performance Monitoring',
			description:
				'Track plant performance remotely and through inspections, ensuring peak operation and maintenance schedules.'
		},
		{
			title: 'Service and Support',
			description:
				'Offer ongoing service and reliable after-sales support to keep your plant efficient for years.'
		}
	];

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

<Services />

<ServicesCards />

<section class="mx-auto max-w-7xl p-8">
	<h2
		use:animateIn
		class="my-8 text-left text-3xl font-semibold tracking-tighter opacity-0 md:text-5xl"
	>
		Our Process
	</h2>

	<div bind:this={scrollContainer} class="grid gap-8 gap-y-12 md:grid-cols-4 md:gap-y-16">
		{#each steps as step, index}
			<div use:animateIn={{ delay: index / 4, blur: 8, amount: 0.1 }} class="relative opacity-0">
				<div class="my-4 flex items-center">
					<div class=" step-point size-3 rounded-full bg-gray-900"></div>
					<div class="absolute mx-6 h-0.5 w-5/6 bg-gray-300 md:w-full"></div>
				</div>

				<div class="px-1">
					<h3 class="mb-3 text-xl font-semibold tracking-tighter md:text-2xl">{step.title}</h3>
					<p class="text-xs leading-snug tracking-tight text-gray-600 md:text-sm">
						{step.description}
					</p>
				</div>
			</div>
		{/each}
	</div>
</section>

<CTA />
