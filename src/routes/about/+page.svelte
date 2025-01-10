<script>
	import { CTA } from '$components';
	import { animateIn, aboutImage1, aboutImage2, aboutImage3 } from '$lib';

	import {
		CheckBadgeIcon,
		CogIcon,
		CubeIcon,
		GlobeAmericasIcon,
		LightBulbIcon,
		ShieldCheckIcon,
		SunIcon,
		WrenchIcon
	} from '@fvilers/heroicons-svelte/24/solid';

	const stats = [
		{ number: '30', label: 'Customers Served' },
		{ number: '13k', label: 'Kilowatts Generated' },
		{ number: '10', label: 'Years Experience' }
	];

	let features = [
		{ icon: GlobeAmericasIcon, text: 'Partnering with top global brands' },
		{ icon: CheckBadgeIcon, text: 'Authorized dealers of Panasonic & Havells' },
		{ icon: CubeIcon, text: 'Manufacturer of premium distribution boxes' },
		{ icon: LightBulbIcon, text: 'Expert in-house design and R&D team' },
		{ icon: WrenchIcon, text: 'Skilled & experienced installation team' },
		{ icon: CogIcon, text: 'Dedicated operations & maintenance team' },
		{ icon: SunIcon, text: 'Adopting cutting-edge solar technologies' },
		{ icon: ShieldCheckIcon, text: 'Committed to safe & eco-friendly practices' }
	];
</script>

<svelte:head>
	<title>About Us | Daystar Solar</title>
	<meta
		name="description"
		content="Daystar Solar is a leading solar energy solutions provider in South India. We offer solar panels, street lights, and distribution boxes for residential and commercial use."
	/>
</svelte:head>

<section class="my-18 mx-auto mt-8 max-w-7xl px-4 py-12">
	<div class="mb-16 text-center">
		<p use:animateIn={{ delay: 0.5 }} class="mb-4 text-xl text-gray-600 opacity-0">Daystar Solar</p>
		<h1
			use:animateIn={{ delay: 0.2 }}
			class="text-5xl leading-tight tracking-[-0.07em] opacity-0 md:text-6xl lg:text-7xl"
		>
			The best solutions<br />
			for <span class="text-orange-400">solar</span> energy
		</h1>
	</div>

	<div class="mt-6 grid grid-cols-1 gap-2 px-8 md:grid-cols-3">
		{#each [aboutImage1, aboutImage2, aboutImage3] as image, i}
			<div
				use:animateIn={{ delay: 0.7 + i / 4, blur: 8, y: 10, rotate: 2 }}
				class="aspect-square overflow-hidden p-4 opacity-0 origin-top-left"
			>
				<img
					src={image}
					alt="Solar panels on various buildings"
					class="h-full w-full rounded-xl object-cover"
				/>
			</div>
		{/each}
	</div>
</section>

<section class="mx-auto my-8 max-w-7xl space-y-8 px-4 pb-16">
	<div class="grid grid-cols-1 gap-8 divide-x-2 md:grid-cols-3">
		{#each stats as stat, i}
			<div
				use:animateIn={{ y: 10, blur: 4, delay: i / 3 }}
				class="flex items-center justify-center space-x-4 text-center opacity-0"
			>
				<p class="text-7xl">{stat.number}<span class="text-blue-400 font-light">+</span></p>
				<p class="max-w-24 text-left text-xl font-light text-gray-700">{stat.label}</p>
			</div>
		{/each}
	</div>

	<div use:animateIn class="my-16 grid grid-cols-1 gap-12 p-4 opacity-0 md:grid-cols-2">
		<div class="p-8">
			<p class="font-regular text-xl leading-relaxed tracking-tight">
				The <span class="font-medium">Daystar Solar</span> Company was formed with the intention of consulting;
				procuring, supplying and installing solar power plants for commercial and domestic use. Our aim
				is to provide customized solutions to our customers who want to obtain the free energy of the
				sun naturally for years and years to come.
			</p>
		</div>

		<div class="space-y-8 p-8">
			<p class="font-regular text-md leading-relaxed text-gray-800">
				Our company specializes in roof-top solar installations, ground mounted solar power plants
				and executes projects from A to Z thereby acting as a single point of contact for our
				esteemed customers who can benefit from peace of mind and energy savings in a professional
				and complete manner while also contributing towards a greener tomorrow and setting a leading
				example for sustainability.
			</p>

			<p class="font-regular text-md leading-relaxed text-gray-800">
				Our products are tested in a wide variety of conditions and are approved by major
				manufacturing standards that strictly monitor quality and performance. We strive to make
				products, which can withstand the harsh test of time and deliver electricity, everyday
				forever. We go beyond the market trend to set benchmarks and ensure that our customers are
				benefited beyond their expectations.
			</p>
		</div>
	</div>

	<div class="grid grid-cols-2 gap-8 md:grid-cols-4">
		{#each features as feature, i}
			<div
				use:animateIn={{ y: 10, blur: 4, delay: i / 6 }}
				class="m-2 flex flex-col items-center justify-center space-y-4 p-6 text-center opacity-0"
			>
				<!-- {i % 4 !== 0 ? 'md:border-l-2' : ''} -->
				<div class="flex items-center justify-center rounded-lg bg-orange-300/40 p-4">
					<feature.icon class="size-6" />
				</div>
				<p class="grow text-lg font-medium tracking-tighter">{feature.text}</p>
			</div>
		{/each}
	</div>
</section>
<CTA />
