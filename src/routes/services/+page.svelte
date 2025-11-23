<script>
	import { CTA, ServicesCards, Services } from '$components';
	import { animate, inView, stagger } from 'motion'; // Removed 'scroll' as it wasn't used
	import { onMount } from 'svelte';
	import { animateIn } from '$lib';

	import {
		BoltIcon, // This seems unused, but kept it just in case
		UserGroupIcon,
		MapIcon,
		PencilSquareIcon,
		TruckIcon,
		CheckBadgeIcon,
		AcademicCapIcon,
		ChartBarIcon,
		WrenchScrewdriverIcon
	} from '@fvilers/heroicons-svelte/24/outline';

	let scrollContainer;
	const steps = [
		{
			title: 'Customer Interaction',
			icon: UserGroupIcon,
			description: 'Understand pain points and offer tailored solutions to meet client needs.'
		},
		{
			title: 'Site Digitisation',
			icon: MapIcon,
			description:
				'Conduct site visits to gather parameters for precise simulation and performance verification.'
		},
		{
			title: 'Design and Approvals',
			icon: PencilSquareIcon,
			description:
				'Create initial designs based on site data, balancing cost and design challenges. Obtain statutory approvals and permissions within a clear timeline.'
		},
		{
			title: 'Procurement and Installation',
			icon: TruckIcon,
			description:
				'Procure materials and validate designs before starting the installation with precision and efficiency.'
		},
		{
			title: 'Testing and Commissioning',
			icon: CheckBadgeIcon,
			description:
				'Perform rigorous testing, wiring, and structural integrity checks to ensure seamless commissioning.'
		},
		{
			title: 'Handover and Training',
			icon: AcademicCapIcon,
			description:
				'Deliver the completed plant and provide operational support during a dedicated “hand-holding” period.'
		},
		{
			title: 'Performance Monitoring',
			icon: ChartBarIcon,
			description:
				'Track plant performance remotely and through inspections, ensuring peak operation and maintenance schedules.'
		},
		{
			title: 'Service and Support',
			icon: WrenchScrewdriverIcon,
			description:
				'Offer ongoing service and reliable after-sales support to keep your plant efficient for years.'
		}
	];

	onMount(() => {
		// Added a check for scrollContainer existence
		if (scrollContainer) {
			inView(scrollContainer, () => {
				animate(
					'.step-point',
					{
						backgroundColor: ['#1f2937', '#f6ad55'], // Adjusted start color to match bg-gray-900/slate-900 potentially
						scale: [0.5, 1],
						filter: ['drop-shadow(0 0 0px #fdba74)', 'drop-shadow(0 0 10px #fdba74)']
					},
					{
						duration: 0.1,
						delay: stagger(0.5, { startDelay: 0.5 })
					}
				);
			});
		}
	});
</script>

<svelte:head>
	<title>Services | Daystar Solar</title>
	<meta
		name="description"
		content="Daystar Solar offers a wide range of solar services including consultation, installation, and maintenance for residential and commercial clients."
	/>
	<meta property="og:title" content="Servies | Daystar Solar" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://daystarsolar.co.in/services" />
	<meta
		property="og:description"
		content="Daystar Solar offers a wide range of solar services including consultation, installation, and maintenance for residential and commercial clients."
	/>
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "WebPage",
			"url": "https://daystarsolar.co.in/services",
			"name": "Solar Services",
			"description": "Discover our full range of solar services including installation, maintenance, and consultation."
		}
	</script>

</svelte:head>


<section class="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8 text-center">
    <h1 class="text-4xl font-semibold font-sans tracking-tight text-gray-900 sm:text-5xl">
        Complete Solar Solutions in Chennai
    </h1>
    <p class="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
        From cozy homes to large factories, we provide end-to-end solar execution.
    </p>
    
    <div class="mt-12 grid gap-8 md:grid-cols-3 text-left">
        <div class="bg-gray-50 p-6 rounded-2xl">
            <h2 class="text-xl font-semibold font-sans mb-3 text-orange-500">Residential Rooftop Solar</h2>
            <p class="text-gray-600 text-sm leading-relaxed">
                Save up to 90% on electricity bills with our <strong>rooftop solar installation</strong> services. We specialize in 3kW to 10kW systems ideal for villas and apartments in Chennai, fully covered under the <strong>PM Surya Ghar Scheme</strong>.
            </p>
        </div>
        <div class="bg-gray-50 p-6 rounded-2xl">
            <h2 class="text-xl font-semibold font-sans mb-3 text-orange-500">Commercial Solar Systems</h2>
            <p class="text-gray-600 text-sm leading-relaxed">
                Reduce your operational costs with our high-efficiency <strong>commercial solar systems</strong>. Perfect for schools, hospitals, and office buildings looking for sustainable power and tax depreciation benefits.
            </p>
        </div>
        <div class="bg-gray-50 p-6 rounded-2xl">
            <h2 class="text-xl font-bold mb-3 text-orange-500">Industrial Solar Projects</h2>
            <p class="text-gray-600 text-sm leading-relaxed">
                We design rugged <strong>industrial solar solutions</strong> for factories and warehouses. Our on-grid and hybrid systems ensure power continuity and rapid ROI for high-consumption industries.
            </p>
        </div>
    </div>
</section>

<Services />

<ServicesCards />

<section class="px-4 py-8 sm:px-8 md:px-16 lg:px-24 xl:px-32">
	<h2
		use:animateIn
		class="my-8 text-left text-3xl font-semibold tracking-tighter opacity-0 sm:text-4xl md:text-5xl"
	>
		Our Process
	</h2>

	<div
		bind:this={scrollContainer}
		class="grid grid-cols-1 gap-8 gap-y-12 sm:grid-cols-2 md:grid-cols-4 md:gap-y-16"
	>
		{#each steps as step, index}
			<div
				use:animateIn={{ delay: index / 3, blur: 8, amount: 0.1, inView: false }}
				class="relative opacity-0"
			>
				<div class="my-4 flex items-center">
					<div class="step-point size-3 shrink-0 rounded-full bg-gray-900"></div>
					{#if index !== steps.length - 1}
						<div
							class="absolute left-3 top-[calc(1rem+0.375rem)] h-0.5 w-[calc(100%-1rem)] bg-gray-300 md:left-5 md:right-0 md:top-auto md:w-auto"
						></div>
					{/if}
				</div>

				<div class="px-1">
					<div class="mb-2 flex items-center space-x-2">
						<div class="size-7 shrink-0 rounded-lg bg-slate-900 p-1.5 sm:size-8 sm:p-2">
							<svelte:component this={step.icon} class="text-white" />
						</div>
						<h3 class="text-lg font-semibold tracking-tighter sm:text-xl md:text-2xl">
							{step.title}
						</h3>
					</div>
					<p class="text-xs leading-snug tracking-tight text-gray-600 md:text-sm">
						{step.description}
					</p>
				</div>
			</div>
		{/each}
	</div>
</section>

<CTA />

<style>
	/* Optional: Hide the connecting line on smaller screens if the grid stacks */
	@media (max-width: 639px) {
		/* Corresponds to Tailwind's 'sm' breakpoint */
		.grid > div:not(:last-child) .absolute.h-0\.5 {
			/* display: none; */ /* Uncomment this line if you want to hide the line entirely on single-column layout */
		}
	}
	/* Hide line on the last item of the 2-column row (sm breakpoint) */
	@media (min-width: 640px) and (max-width: 767px) {
		.grid > div:nth-child(2n) .absolute.h-0\.5 {
			/* display: none; */ /* Uncomment this to hide line on the last item of 2-col rows */
		}
	}
	/* Hide line on the last item of the 4-column row (md breakpoint) */
	@media (min-width: 768px) {
		.grid > div:nth-child(4n) .absolute.h-0\.5 {
			/* display: none; */ /* Uncomment this to hide line on the last item of 4-col rows */
		}
		/* Ensure line does not show on last item overall */
		.grid > div:last-child .absolute.h-0\.5 {
			display: none;
		}
	}
</style>
