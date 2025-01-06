<script>
	import { CTA, ServicesCards, Services } from '$components';
	import { animate, inView, stagger, scroll } from 'motion';
	import { onMount } from 'svelte';
	import { animateIn } from '$lib';

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
