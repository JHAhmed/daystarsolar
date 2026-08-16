<script>
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import { Seo, PageHeader, Button, Field } from '$components';
	import { reveal, revealGroup } from '$motion';
	import { pageSchema } from '$lib/seo/schema.js';
	import { CONTACT, ADDRESS, SOCIALS } from '$data/site.js';
	import {
		ChatIcon,
		UserIcon,
		ToolsIcon,
		BuildingIcon,
		LocationIcon,
		PhoneIcon,
		MobileIcon,
		ArrowIcon,
		LinkedinIcon,
		FacebookIcon,
		InstagramIcon,
		YoutubeIcon,
		PintrestIcon,
		TwitterIcon
	} from '$icons';

	const SOCIAL_ICONS = {
		Instagram: InstagramIcon,
		LinkedIn: LinkedinIcon,
		YouTube: YoutubeIcon,
		Facebook: FacebookIcon,
		'X (Twitter)': TwitterIcon,
		Pintrest: PintrestIcon
	};

	const MAIL_CARDS = [
		{ label: 'Sales', email: CONTACT.emails.sales, icon: BuildingIcon, accent: 'border-ink-200' },
		{
			label: 'Service',
			email: CONTACT.emails.service,
			icon: ToolsIcon,
			accent: 'border-solar-200'
		},
		{
			label: 'Procurement',
			email: CONTACT.emails.procurement,
			icon: ChatIcon,
			accent: 'border-teal-200'
		},
		{ label: 'Admin', email: CONTACT.emails.admin, icon: UserIcon, accent: 'border-red-200' }
	];

	let form = $state({ firstName: '', lastName: '', email: '', number: '', message: '' });
	let errors = $state({});
	let submitting = $state(false);

	function validate() {
		const next = {};

		if (form.firstName.trim().length < 2) next.firstName = 'Please enter your first name.';
		if (!form.lastName.trim()) next.lastName = 'Please enter your last name.';
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
			next.email = 'Please enter a valid email address.';
		if (form.number.replace(/\D/g, '').length < 10)
			next.number = 'Please enter a 10-digit phone number.';
		if (form.message.trim().length < 10) next.message = 'Please tell us a little more.';

		errors = next;
		return Object.keys(next).length === 0;
	}

	async function handleSubmit(event) {
		event.preventDefault();
		if (submitting) return;

		// The old form logged validation failures to the console and showed a
		// single generic toast, so the visitor was told something was wrong but
		// not which field. Errors now land on the fields themselves.
		if (!validate()) {
			toast.warning('Please check the highlighted fields.');
			return;
		}

		submitting = true;
		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(form)
			});

			const result = await response.json().catch(() => ({}));

			if (!response.ok) {
				toast.error(result.message ?? 'Could not send your message. Please try again.');
				return;
			}

			form = { firstName: '', lastName: '', email: '', number: '', message: '' };
			await goto('/message-sent');
		} catch {
			toast.error('Could not send your message. Please check your connection and try again.');
		} finally {
			submitting = false;
		}
	}
</script>

<Seo
	title="Contact Us | Daystar Solar"
	description="We're here to help. Get expert solar advice tailored to your needs. Contact Day Star Solar in Chennai for site visits, quotes, and support."
	ogDescription="Get in touch with Daystar Solar for all your solar energy needs. Contact us for procurement, admin, service, and sales queries."
	path="/contact"
	schema={pageSchema('ContactPage', {
		path: '/contact',
		name: 'Contact Us',
		description:
			'Get in touch with Daystar Solar for all your solar energy needs. Contact us for procurement, admin, service, and sales queries.'
	})} />

<section class="container-page pt-6 md:pt-10">
	<PageHeader eyebrow="Let's talk" align="center">Get In Touch</PageHeader>

	<div
		class="mt-12 flex flex-wrap items-center justify-center gap-3"
		{@attach revealGroup({ y: 12, stagger: 0.05 })}>
		<a
			data-reveal
			href={CONTACT.landline.href}
			class="flex items-center gap-3 rounded-full border border-ink-200 py-2 pr-5 pl-2 transition-[border-color,transform] duration-160 ease-out hover:border-ink-300 hover:bg-sky-50 active:scale-[0.98]">
			<span class="flex size-10 items-center justify-center rounded-full bg-sky-100">
				<PhoneIcon class="size-4 text-sky-600" />
			</span>
			<span class="text-sm">{CONTACT.landline.label}</span>
		</a>

		<a
			data-reveal
			href={CONTACT.whatsapp}
			target="_blank"
			rel="noopener noreferrer"
			class="flex items-center gap-3 rounded-full border border-ink-200 py-2 pr-5 pl-2 transition-[border-color,transform] duration-160 ease-out hover:border-ink-300 hover:bg-green-50 active:scale-[0.98]">
			<span class="flex size-10 items-center justify-center rounded-full bg-green-100">
				<ChatIcon class="size-4 text-green-600" />
			</span>
			<span class="text-sm">WhatsApp</span>
		</a>

		{#each CONTACT.mobileSuffixes as suffix (suffix)}
			<a
				data-reveal
				href="tel:+9191766686{suffix}"
				class="flex items-center gap-3 rounded-full border border-ink-200 py-2 pr-5 pl-2 transition-[border-color,transform] duration-160 ease-out hover:border-ink-300 hover:bg-green-50 active:scale-[0.98]">
				<span class="flex size-10 items-center justify-center rounded-full bg-green-100">
					<MobileIcon class="size-4 text-green-600" />
				</span>
				<span class="text-sm">
					{CONTACT.mobilePrefix}<span class="text-ink-500">{suffix}</span>
				</span>
			</a>
		{/each}
	</div>
</section>

<!-- ── Form and location ───────────────────────────────────────────────── -->
<section class="section">
	<div class="container-page grid gap-6 lg:grid-cols-2">
		<form
			data-reveal
			{@attach reveal({ y: 18 })}
			onsubmit={handleSubmit}
			novalidate
			class="flex flex-col gap-4 rounded-panel border border-ink-200 p-6 md:p-8">
			<div class="grid gap-4 sm:grid-cols-2">
				<Field
					label="First name"
					bind:value={form.firstName}
					error={errors.firstName}
					placeholder="John"
					autocomplete="given-name"
					maxlength="40"
					required />
				<Field
					label="Last name"
					bind:value={form.lastName}
					error={errors.lastName}
					placeholder="Smith"
					autocomplete="family-name"
					maxlength="40"
					required />
			</div>

			<Field
				label="Email"
				type="email"
				bind:value={form.email}
				error={errors.email}
				placeholder="johnsmith@gmail.com"
				autocomplete="email"
				required />

			<Field
				label="Phone number"
				type="tel"
				bind:value={form.number}
				error={errors.number}
				prefix="+91"
				placeholder="99999 99999"
				autocomplete="tel"
				inputmode="numeric"
				maxlength="15"
				required />

			<Field
				label="Message"
				textarea
				rows={5}
				bind:value={form.message}
				error={errors.message}
				placeholder="Hey there!"
				maxlength="5000"
				required />

			<Button type="submit" variant="primary" size="lg" chip disabled={submitting} class="mt-2">
				{submitting ? 'Sending…' : 'Submit'}
			</Button>
		</form>

		<div data-reveal {@attach reveal({ y: 18, delay: 0.08 })} class="flex flex-col gap-4">
			<a
				href={ADDRESS.mapsUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="group/addr relative flex items-start gap-3 rounded-panel border border-ink-200 p-6 transition-[border-color,background-color] duration-160 ease-out hover:border-ink-300 hover:bg-ink-50">
				<LocationIcon class="mt-0.5 size-5 shrink-0 text-ink-500" />
				<p class="text-sm leading-relaxed text-ink-700">
					<span class="font-medium text-night-900">
						H-5, Second Floor, Third Avenue, Anna Nagar East
					</span>, Chennai - 600102, Tamil Nadu
				</p>
				<span
					class="flex size-8 shrink-0 items-center justify-center rounded-full bg-ink-100 text-night-900 transition-transform duration-200 ease-out group-hover/addr:translate-x-0.5 group-hover/addr:-translate-y-0.5">
					<ArrowIcon class="size-3.5 rotate-[-135deg]" strokeWidth="2" />
				</span>
			</a>

			<div class="min-h-72 flex-1 overflow-hidden rounded-panel border border-ink-200 bg-ink-100">
				<iframe
					class="h-full min-h-72 w-full"
					title="Daystar Solar on Google Maps"
					style="border:0"
					loading="lazy"
					allowfullscreen
					referrerpolicy="no-referrer-when-downgrade"
					src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Daystar+Solar"
				></iframe>
			</div>
		</div>
	</div>
</section>

<!-- ── Socials ─────────────────────────────────────────────────────────── -->
<section class="section-bottom">
	<div class="container-page">
		<h2
			data-reveal
			{@attach reveal()}
			class="mb-10 text-center font-display text-heading-lg text-night-900">
			Follow Our Socials
		</h2>

		<div
			class="flex flex-wrap items-center justify-center gap-3"
			{@attach revealGroup({ y: 12, stagger: 0.05 })}>
			{#each SOCIALS as social (social.name)}
				{@const Icon = SOCIAL_ICONS[social.name]}
				<a
					data-reveal
					href={social.href}
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center gap-3 rounded-full border border-ink-200 py-2 pr-5 pl-2 transition-[border-color,transform] duration-160 ease-out hover:border-ink-300 active:scale-[0.98]">
					<span
						class="flex size-10 items-center justify-center rounded-full {social.brandClass} text-white">
						<Icon class="size-4" />
					</span>
					<span class="text-sm">{social.name}</span>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- ── Direct email ────────────────────────────────────────────────────── -->
<section class="section-bottom">
	<div class="container-page">
		<h2
			data-reveal
			{@attach reveal()}
			class="mb-10 text-center font-display text-heading-lg text-night-900">
			Prefer to mail instead?
		</h2>

		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" {@attach revealGroup({ y: 14 })}>
			{#each MAIL_CARDS as card (card.label)}
				{@const Icon = card.icon}
				<a
					data-reveal
					href="mailto:{card.email}"
					class="flex flex-col items-center gap-3 rounded-panel border-2 {card.accent} bg-ink-50/50 p-6 text-center transition-[border-color,box-shadow,transform] duration-200 ease-out hover:shadow-soft active:scale-[0.99]">
					<Icon class="my-2 size-6 text-ink-600" strokeWidth="1" />
					<h3 class="font-medium text-night-900">{card.label}</h3>
					<span class="text-sm break-all text-ink-600">{card.email}</span>
				</a>
			{/each}
		</div>
	</div>
</section>
