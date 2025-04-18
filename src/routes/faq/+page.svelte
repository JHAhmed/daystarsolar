<script>
	import * as Accordion from '$lib/components/ui/accordion';

	import { animate, inView } from 'motion';
	import { ChevronIcon, ArrowIcon } from '$icons';
	import { CTA } from '$components';
	import { animateIn } from '$lib';

	let faq = [
		{
			question: 'What is Solar Energy?',
			answer:
				'Solar energy is energy derived by converting sunlight into usable energy for homes and offices. It is versatile, consistent, renewable, and free.'
		},
		{
			question: 'Is Solar Energy Expensive?',
			answer:
				"Solar energy systems can be costly upfront, starting from Rs. 2,00,000. However, energy itself is free, and Tamil Nadu's feed-in tariff scheme allows earning from excess energy generated."
		},
		{
			question: 'What are the requirements of a Solar Power Plant?',
			answer:
				'A shade-free rooftop area and a sunny climate are essential. South India, with abundant sunny days, offers optimal conditions for solar power generation.'
		},
		{
			question: 'How does a Solar Power Plant Generate Electricity Year After Year?',
			answer:
				'Photovoltaic modules expose silicon layers to sunlight, creating an electrical field that generates voltage. The energy can be stored or sent to the grid.'
		},
		{
			question: 'Will the Solar Power Plant Generate Energy During Rainy Days?',
			answer:
				'Yes, solar panels designed with positive tolerances can generate energy in low-light conditions, though not as much as on sunny days.'
		},
		{
			question: 'What is a Unit?',
			answer:
				'A unit equals one kilowatt-hour (kWh). For example, a 2.0 kWh-rated air-conditioner uses 2.0 units per hour under continuous load.'
		},
		{
			question: 'How Do Solar Photovoltaic Cells Work?',
			answer:
				'Photovoltaic cells use crystalline silicon layers, doped with boron and phosphorus. Sunlight creates voltage between positive and negative silicon layers, producing current flow.'
		},
		{
			question: 'What is the Average Payback Period for a Solar Power Plant?',
			answer:
				'The payback period varies. It depends on energy needs and economic factors like inflation and electricity costs. Tools like calculators can provide estimates.'
		},
		{
			question: 'What are the Standard Components of a Grid-Tie System?',
			answer:
				'A grid-tied system includes PV modules, a combiner box, a solar inverter, cables, and an isolator. Larger systems may include enhanced earthing and lightning protection.'
		},
		{
			question: 'How Reliable Are Solar Power Plants?',
			answer:
				'Solar plants are reliable with built-in redundancies and overcapacity. These features enhance durability and ensure consistent energy generation.'
		},
		{
			question: 'How Durable is the Solar Power Plant?',
			answer:
				'Solar plants are designed to minimize components and maximize efficiency. Daystar inverters offer up to 98% efficiency, reducing system losses.'
		},
		{
			question: 'What is the Advantage of Solar Power Generation Versus Pollution?',
			answer:
				'Solar power reduces fossil fuel use, cutting harmful emissions like carbon dioxide. This improves air quality and reduces health risks.'
		},
		{
			question: 'How Much Space Do I Need on My Roof?',
			answer:
				'For every 1000 watts of solar capacity, approximately 75 sq. ft. of space is needed, plus 25 sq. ft. for accessibility.'
		},
		{
			question: 'Can I Run Industrial Machines/Heavy Loads on Solar Power?',
			answer:
				'Yes, grid-tie plants support single or three-phase configurations for heavy loads. Systems can scale up to 1000KW using stacking.'
		},
		{
			question: 'Can Daystar Solar Power Plants Be Used for Commercial Purposes?',
			answer:
				'Yes, institutions like schools, malls, and offices can benefit from solar, reducing energy costs and boosting profitability.'
		},
		{
			question: 'How Much Solar Capacity Can I Install for My Home/Industry?',
			answer:
				'There is no limit as long as space is available. Overcapacity can also be installed to cater to future demand.'
		},
		{
			question: 'How Does the Installation of Daystar Solar Plants Help the Environment?',
			answer:
				'Solar installations reduce dependency on fossil fuels, cutting carbon dioxide emissions and supporting sustainable energy consumption.'
		},
		{
			question: 'Why is Saving on Electricity Bills Important?',
			answer:
				'Electricity costs accumulate over a lifetime. Solar energy offers savings, eco-friendliness, and protection against future cost inflation.'
		}
	];
</script>

<svelte:head>
	<title>FAQ | Daystar Solar</title>
	<meta
		name="description"
		content="Find answers to frequently asked questions about solar energy, solar power plants, and solar panels from Daystar Solar."
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-6 md:py-12">
	<div class="text-center">
		<!-- <h1 class="mb-4 text-5xl font-medium text-orange-300 md:text-6xl">FAQ</h1> -->

		<h1
			use:animateIn={{ delay: 0.2 }}
			class="text-5xl leading-tight tracking-[-0.07em] opacity-0 md:text-6xl lg:text-7xl"
		>
		FAQ
		</h1>

		<p class="uppercase tracking-wider text-gray-500">Frequently Asked Questions</p>
	</div>
</div>

<div class="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-8 text-left">
	{#each faq as item, i}
		<!-- <div use:animateIn={{ delay: i / 5, blur: 8, amount: 0.1 }} class="opacity-0"> -->
		<div use:animateIn={{ delay: i / 5, blur: 8, y: 20, inView: false }} class="opacity-0">
			<Accordion.Root class="w-full p-2 hover:bg-gray-50">
				<Accordion.Item value="item-1">
					<Accordion.Trigger class="text-md text-left md:text-lg">{item.question}</Accordion.Trigger
					>
					<Accordion.Content>
						<div class="flex">
							<p class="md:text-md py-2 text-sm text-gray-500">{item.answer}</p>
						</div>
					</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root>
		</div>
	{/each}
</div>

<CTA />
