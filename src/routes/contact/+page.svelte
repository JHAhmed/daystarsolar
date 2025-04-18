<script>
	import {
		ChatIcon,
		UserIcon,
		ToolsIcon,
		BuildingIcon,
		ArrowIcon,
		LocationIcon,
		PhoneIcon,
		MobileIcon,
		LinkedinIcon,
		FacebookIcon,
		InstagramIcon,
		YoutubeIcon,
		PintrestIcon,
		TwitterIcon
	} from '$icons';

	import { animate, inView } from 'motion';
	import { animateIn, twitterLogo } from '$lib';
	import { Toaster, toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	let firstName = '';
	let lastName = '';
	let email = '';
	let number = '';
	let message = '';

	let loading = false;
	let formIsValid = true; // Let's track validation status

	function validateForm() {
		formIsValid = true;

		if (firstName.length < 3 || message.length < 10 || number.length < 10) {
			formIsValid = false;
			console.error('Name or message too short!');
		}

		if (!lastName.trim()) {
			formIsValid = false;
			console.error('Last name is required!');
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!email.trim() || !emailRegex.test(email)) {
			formIsValid = false;
			console.error('A valid email is required!');
		}

		return formIsValid;
	}

	const socials = [
		{
			icon: InstagramIcon,
			text: 'Instagram',
			link: 'https://www.instagram.com/daystarsolar_official/',
			class: 'bg-[#FF0069]'
		},
		{
			icon: LinkedinIcon,
			text: 'LinkedIn',
			link: 'https://in.linkedin.com/company/daystar-solar',
			class: 'bg-[#0A66C2]'
		},
		{
			icon: YoutubeIcon,
			text: 'YouTube',
			link: 'https://www.youtube.com/@DaystarSolarOfficial/',
			class: 'bg-[#FF0000]'
		},
		{
			icon: FacebookIcon,
			text: 'Facebook',
			link: 'https://www.facebook.com/daystarsolarindia/',
			class: 'bg-[#0866FF]'
		},
		{
			icon: TwitterIcon,
			text: 'X (Twitter)',
			link: 'https://x.com/DaystarSolar/',
			class: 'bg-[#000000]'
		},
		{
			icon: PintrestIcon,
			text: 'Pintrest',
			link: 'https://www.pinterest.com/fawaz05583438/',
			class: 'bg-[#E60023]'
		}
	];

	async function handleSubmit() {
		if (!validateForm()) {
			toast.warning('Please fill in all details properly!');
			return;
		}

		loading = true;

		const res = await fetch('/api/send-contact-email', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				firstName,
				lastName,
				number,
				email,
				message
			})
		});

		if (!res.ok) {
			toast.error('Error!');
			throw new Error('Failed to fetch data');
		}

		firstName = '';
		lastName = '';
		number = '';
		email = '';
		message = '';

		loading = false;
		goto('/message-sent');
	}

	let phoneNumbers = ['17', '32', '45', '50', '51', '57', '64'];
</script>

<svelte:head>
	<title>Contact Us | Daystar Solar</title>
	<meta
		name="description"
		content="Get in touch with Daystar Solar for all your solar energy needs. Contact us for procurement, admin, service, and sales queries."
	/>
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "ContactPage",
			"url": "https://daystarsolar.co.in/contact",
			"name": "Contact Us",
			"description": "Get in touch with Daystar Solar for inquiries, installations, or support."
		}
	</script>
</svelte:head>

<Toaster richColors expand={true} />

{#if loading}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
		<div
			class="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-black bg-white p-6"
		>
			<div
				class="h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"
			></div>
			<p class="font-medium">Loading...</p>
		</div>
	</div>
{/if}

<div class="mx-auto max-w-7xl px-4 py-6 md:py-12">
	<div use:animateIn={{ delay: 0.2 }} class="mb-16 text-center opacity-0">
		<h1 class="text-5xl leading-tight tracking-[-0.07em] md:text-6xl lg:text-7xl">Get In Touch</h1>
		<p class="uppercase tracking-wider text-gray-500">Let's talk</p>
	</div>

	<div
		use:animateIn={{ delay: 0.2, y: 10, blur: 4 }}
		class="flex flex-col flex-wrap items-center justify-center gap-4 opacity-0 md:flex-row"
	>
		<a href="tel:04443531021" class="">
			<div
				class="flex items-center gap-3 rounded-full border px-3 py-2 transition-colors hover:border-gray-300"
			>
				<div class="flex size-8 items-center justify-center rounded-full bg-blue-100 md:size-12">
					<PhoneIcon className="size4 md:size-5 text-blue-500" />
				</div>
				<span class="mx-3 text-xs md:text-sm">044 4353 1021</span>
			</div>
		</a>

		<a
			href="https://api.whatsapp.com/send?phone=919176668664&text=Hi!%20I%20would%20like%20to%20know%20more%20about%20Daystar%20Solar!"
			class=""
		>
			<div
				class="flex items-center gap-3 rounded-full border px-3 py-2 transition-colors hover:border-gray-300"
			>
				<div class="flex size-8 items-center justify-center rounded-full bg-green-100 md:size-12">
					<ChatIcon className="size4 md:size-5 text-green-500" />
				</div>
				<span class="mx-3 text-xs md:text-sm">WhatsApp</span>
			</div>
		</a>

		{#each phoneNumbers as number}
			<a href={`tel:+9191766686${number}`} class="">
				<div
					class="flex items-center gap-3 rounded-full border px-3 py-2 transition-colors hover:border-gray-300"
				>
					<div class="flex size-8 items-center justify-center rounded-full bg-green-100 md:size-12">
						<MobileIcon className="size4 md:size-5 text-green-500" />
					</div>
					<span class="mx-3 flex flex-wrap text-xs md:text-sm"
						>+91 91766 686
						<span class="mx-0.5 text-gray-500">{number}</span>
					</span>
				</div>
			</a>
		{/each}
	</div>
</div>

<div use:animateIn={{ y: 20, delay: 0.5 }} class="mx-auto max-w-7xl px-4 py-12 opacity-0">
	<!-- <div use:animateIn={{ delay: 0.2 }} class="mb-16 text-center opacity-0"> -->
	<!-- <h1 class="text-5xl leading-tight tracking-[-0.07em] md:text-6xl lg:text-7xl">Get In Touch</h1> -->
	<!-- <p class="uppercase tracking-wider text-gray-500">Or drop us a mail!</p> -->
	<!-- </div> -->

	<div class="grid gap-8 md:h-[28rem] md:grid-cols-2">
		<form on:submit|preventDefault={handleSubmit} class="flex h-full flex-col space-y-4">
			<div class="grid grid-cols-2 gap-4">
				<input
					type="text"
					placeholder="John"
					bind:value={firstName}
					class="w-full rounded-lg bg-gray-200 p-4 focus:outline-none focus:ring-2 focus:ring-gray-200"
				/>
				<input
					type="text"
					placeholder="Smith"
					bind:value={lastName}
					class="w-full rounded-lg bg-gray-200 p-4 focus:outline-none focus:ring-2 focus:ring-gray-200"
				/>
			</div>

			<input
				type="email"
				placeholder="johnsmith@gmail.com"
				bind:value={email}
				class="w-full rounded-lg bg-gray-200 p-4 focus:outline-none focus:ring-2 focus:ring-gray-200"
			/>
			<input
				type="number"
				maxLength={10}
				placeholder="+91 99999 99999"
				bind:value={number}
				class="w-full rounded-lg bg-gray-200 p-4 focus:outline-none focus:ring-2 focus:ring-gray-200"
			/>

			<textarea
				placeholder="Hey there!"
				bind:value={message}
				rows="4"
				class="h-full w-full resize-none rounded-lg bg-gray-200 p-4 focus:outline-none focus:ring-2 focus:ring-gray-200"
			></textarea>

			<button
				type="submit"
				class="group/submit inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 p-4 text-white transition-colors hover:bg-gray-800"
			>
				Submit
				<ArrowIcon
					strokeWidth="2"
					className="-rotate-90 items-center justify-center transform group-hover/submit:translate-x-2 duration-200"
				/>
			</button>
		</form>

		<div class="flex h-full flex-col space-y-4">
			<a
				href="https://maps.app.goo.gl/uNk4gDxCLP1v62Aa8"
				target="_blank"
				class="group/link relative flex items-center justify-center gap-3 rounded-lg border-2 border-black bg-white p-4 hover:bg-green-50"
			>
				<div
					class="absolute -right-2 -top-2 transform rounded-full bg-green-500 p-1 duration-100 group-hover/link:-translate-y-1 group-hover/link:translate-x-1"
				>
					<ArrowIcon color="white" className="size-4 stroke-black -rotate-[135deg]" />
				</div>
				<LocationIcon className="size-5" />
				<p class="text-sm text-black">
					<span class="font-medium">H-5, Second Floor, Third Avenue, Anna Nagar East</span>, Chennai
					- 600102, Tamil Nadu
				</p>
			</a>

			<div class="h-full overflow-hidden rounded-lg border-2 border-black bg-gray-100">
				<iframe
					class="h-full w-full"
					title="Daystar Solar"
					style="border:0"
					loading="lazy"
					allowfullscreen
					referrerpolicy="no-referrer-when-downgrade"
					src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8
				  &q=Daystar+Solar"
				>
				</iframe>
			</div>
		</div>
	</div>
</div>

<div class="mx-auto max-w-7xl px-4 py-6 md:py-12">
	<div use:animateIn={{ delay: 0.2 }} class="mb-16 text-center opacity-0">
		<h2 class="mb-8 text-center text-2xl md:text-3xl">Follow Our Socials</h2>
	</div>

	<div
		use:animateIn={{ delay: 0.2, y: 10, blur: 4 }}
		class="flex flex-wrap items-center justify-center gap-4 opacity-0 md:flex-row"
	>
		{#each socials as social, i}
			<a
				use:animateIn={{ delay: i / 3, y: 10, blur: 4, rotate: 5 }}
				href={social.link}
				class="opacity-0"
			>
				<div
					class="flex items-center gap-3 rounded-full border px-2 py-2 transition-colors hover:border-gray-300 md:px-3"
				>
					<div
						class="flex size-10 items-center justify-center rounded-full md:size-12 {social.class}"
					>
						<svelte:component this={social.icon} className="size-4 md:size-5 text-white" />
					</div>
					<span class="mx-3 text-sm">{social.text}</span>
				</div>
			</a>
		{/each}
	</div>
</div>

<div use:animateIn class="mx-auto max-w-7xl px-4 py-8 opacity-0 md:py-16">
	<h2 class="mb-8 text-center text-2xl md:text-3xl">Prefer to mail instead?</h2>

	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
		<!-- Sales Card -->
		<div
			class="motion-preset-focus flex flex-col items-center justify-center rounded-2xl border-2 border-gray-200 bg-gray-50/50 p-6 transition-colors motion-duration-700 motion-delay-[700ms] hover:border-gray-300 hover:shadow-lg"
		>
			<BuildingIcon className="size-6 stroke-1 my-4" />
			<h3 class="mb-4 font-medium">Sales</h3>
			<div class="space-y-2 text-center text-sm text-gray-600">
				<a href="mailto:sales@daystarsolar.co.in">sales@daystarsolar.co.in</a> <br />
				<a href="mailto:support@daystarsolar.co.in">support@daystarsolar.co.in</a>
			</div>
		</div>

		<!-- Service Card -->
		<div
			class="motion-preset-focus flex flex-col items-center justify-center rounded-2xl border-2 border-amber-200 bg-gray-50/50 p-6 transition-colors motion-duration-700 motion-delay-[500ms] hover:border-amber-300 hover:shadow-lg"
		>
			<ToolsIcon className="size-6 stroke-1 my-4" />
			<h3 class="mb-4 font-medium">Service</h3>
			<div class="space-y-2 text-center text-sm text-gray-600">
				<a href="mailto:projects@daystarsolar.co.in">projects@daystarsolar.co.in</a> <br />
				<a href="mailto:installation@daystarsolar.co.in">installation@daystarsolar.co.in</a>
			</div>
		</div>

		<!-- Procurement Card -->
		<div
			class="motion-preset-focus flex flex-col items-center justify-center rounded-2xl border-2 border-teal-200 bg-gray-50/50 p-6 transition-colors motion-duration-700 motion-delay-[100ms] hover:border-teal-300 hover:shadow-lg"
		>
			<ChatIcon className="size-6 stroke-1 my-4" />
			<h3 class="mb-4 font-medium">Procurement</h3>
			<div class="space-y-2 text-center text-sm text-gray-600">
				<a href="mailto:procure@daystarsolar.co.in">procure@daystarsolar.co.in</a> <br />
				<a href="mailto:service@daystarsolar.co.in">service@daystarsolar.co.in</a>
			</div>
		</div>

		<!-- Admin Card -->
		<div
			class="motion-preset-focus flex flex-col items-center justify-center rounded-2xl border-2 border-red-200 bg-gray-50/50 p-6 transition-colors motion-duration-700 motion-delay-[300ms] hover:border-red-300 hover:shadow-lg"
		>
			<UserIcon className="size-6 stroke-1 my-4" />
			<h3 class="mb-4 font-medium">Admin</h3>
			<div class="space-y-2 text-center text-sm text-gray-600">
				<a href="mailto:hussain@daystarsolar.co.in">hussain@daystarsolar.co.in</a> <br />
				<a href="mailto:coo@daystarsolar.co.in">coo@daystarsolar.co.in</a>
			</div>
		</div>
	</div>
</div>

<style>
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type='number'] {
		-moz-appearance: textfield;
	}
</style>
