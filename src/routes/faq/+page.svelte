<script>
	import { Seo, CTA, PageHeader, Accordion } from '$components';
	import { reveal } from '$motion';
	import { faqSchema } from '$lib/seo/schema.js';
	import { FAQS } from '$data/faqs.js';
</script>

<Seo
	title="FAQ | Daystar Solar"
	description="Find answers to frequently asked questions about solar energy, solar plants, subsidies, and installation costs from Daystar Solar, Chennai."
	ogDescription="Find answers to frequently asked questions about solar energy, solar power plants, and solar panels from Daystar Solar."
	path="/faq"
	schema={faqSchema(FAQS)} />

<section class="container-page pt-6 section-bottom md:pt-10">
	<PageHeader eyebrow="Frequently Asked Questions" align="center">FAQ</PageHeader>

	<div data-reveal {@attach reveal({ y: 16, delay: 0.1 })} class="mx-auto mt-14 max-w-3xl">
		<Accordion items={FAQS} single />
	</div>
</section>

<CTA />
