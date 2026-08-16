<script>
	import { Seo, CTA, Stats, PageHeader } from '$components';
	import { reveal, revealGroup } from '$motion';
	import { pageSchema } from '$lib/seo/schema.js';

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

	import aboutImage1 from '$lib/assets/images/about-1.webp?enhanced';
	import aboutImage2 from '$lib/assets/images/about-2.webp?enhanced';
	import aboutImage3 from '$lib/assets/images/about-3.webp?enhanced';

	const images = [aboutImage1, aboutImage2, aboutImage3];

	const FEATURES = [
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

<Seo
	title="About Us | Daystar Solar"
	description="Learn about Day Star Solar, our experience, values, and commitment to delivering reliable solar energy solutions."
	ogDescription="With 15+ years of experience, Daystar Solar delivers efficient and affordable solar plant installation services for businesses and industries across south india"
	path="/about"
	schema={pageSchema('AboutPage', {
		path: '/about',
		name: 'About Daystar Solar',
		description:
			'Learn more about Daystar Solar, our mission, and the team powering your solar future.'
	})} />

<section class="container-page pt-6 section-bottom md:pt-10">
	<PageHeader eyebrow="Daystar Solar" eyebrowPosition="above" align="center">
		Best Solar<br />
		Company In <span class="text-solar-500">Chennai</span>
	</PageHeader>

	<div class="mt-14 grid gap-4 sm:grid-cols-3" {@attach revealGroup({ variant: 'blur', y: 16 })}>
		{#each images as image, i (i)}
			<div data-reveal class="aspect-square overflow-hidden rounded-card">
				<enhanced:img
					src={image}
					alt="Solar panels on various buildings"
					loading={i === 0 ? 'eager' : 'lazy'}
					class="h-full w-full object-cover" />
			</div>
		{/each}
	</div>
</section>

<section class="section-bottom">
	<div class="container-page">
		<Stats variant="divided" />
	</div>
</section>

<section class="section-bottom">
	<div class="container-page grid gap-8 md:grid-cols-2 md:gap-14">
		<div data-reveal {@attach reveal()}>
			<p class="text-lead leading-relaxed text-night-900 md:text-heading-sm md:leading-relaxed">
				The <span class="font-medium">Daystar Solar</span> Company was formed with the intention of consulting;
				procuring, supplying and installing solar power plants for commercial and domestic use. Our aim
				is to provide customized solutions to our customers who want to obtain the free energy of the
				sun naturally for years and years to come.
			</p>
		</div>

		<div data-reveal {@attach reveal({ delay: 0.1 })} class="space-y-6">
			<p class="leading-relaxed text-ink-700">
				Our company specializes in roof-top solar installations, ground mounted solar power plants
				and executes projects from A to Z thereby acting as a single point of contact for our
				esteemed customers who can benefit from peace of mind and energy savings in a professional
				and complete manner while also contributing towards a greener tomorrow and setting a leading
				example for sustainability.
			</p>

			<p class="leading-relaxed text-ink-700">
				Our products are tested in a wide variety of conditions and are approved by major
				manufacturing standards that strictly monitor quality and performance. We strive to make
				products, which can withstand the harsh test of time and deliver electricity, everyday
				forever. We go beyond the market trend to set benchmarks and ensure that our customers are
				benefited beyond their expectations.
			</p>
		</div>
	</div>
</section>

<section class="section-bottom">
	<div
		class="container-page grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8"
		{@attach revealGroup({ y: 14, stagger: 0.06 })}>
		{#each FEATURES as feature (feature.text)}
			{@const Icon = feature.icon}
			<div data-reveal class="flex flex-col items-center gap-3 text-center">
				<div class="flex items-center justify-center rounded-xl bg-solar-200/50 p-3 md:p-4">
					<Icon class="size-5 text-solar-700 md:size-6" />
				</div>
				<p class="text-sm font-medium text-night-900 md:text-base">{feature.text}</p>
			</div>
		{/each}
	</div>
</section>

<CTA />
