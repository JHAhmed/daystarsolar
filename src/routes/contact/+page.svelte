<script>
	import {
		ChatIcon,
		UserIcon,
		ToolsIcon,
		BuildingIcon,
		ArrowIcon,
		LocationIcon,
		PhoneIcon,
		MobileIcon
	} from '$icons';

	import { animate, inView } from 'motion';
	import { animateIn } from '$lib';

	let firstName = '';
	let lastName = '';
	let email = '';
	let message = '';

	const handleSubmit = (e) => {
		e.preventDefault();
	};

</script>

<div class="mx-auto max-w-7xl px-4 py-6 md:py-12">
	<div class="mb-16 text-center">
		<h1 class="mb-4 text-5xl font-medium text-orange-300 md:text-6xl">Get in touch</h1>
		<p class="uppercase tracking-wider text-gray-500">Let's talk</p>
	</div>

	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
		<!-- Procurement Card -->
		<div
			class="motion-preset-focus hover:shadow-lg flex flex-col items-center justify-center rounded-2xl border-2 border-teal-200 bg-gray-50/50 p-6 transition-colors motion-duration-700 motion-delay-[100ms] hover:border-teal-300"
		>
			<ChatIcon className="size-6 stroke-1 my-4" />
			<h3 class="mb-4 font-medium">Procurement</h3>
			<div class="space-y-2 text-center text-sm text-gray-600">
				<a href="mailto:procure@daystarsolar.co.in">procure@daystarsolar.co.in</a>
				<a href="mailto:service@daystarsolar.co.in">service@daystarsolar.co.in</a>
			</div>
		</div>

		<!-- Admin Card -->
		<div
			class="motion-preset-focus hover:shadow-lg flex flex-col items-center justify-center rounded-2xl border-2 border-red-200 bg-gray-50/50 p-6 transition-colors motion-duration-700 motion-delay-[300ms] hover:border-red-300"
		>
			<UserIcon className="size-6 stroke-1 my-4" />
			<h3 class="mb-4 font-medium">Admin</h3>
			<div class="space-y-2 text-center text-sm text-gray-600">
				<a href="mailto:hussain@daystarsolar.co.in">hussain@daystarsolar.co.in</a>
				<a href="mailto:coo@daystarsolar.co.in">coo@daystarsolar.co.in</a>
			</div>
		</div>

		<!-- Service Card -->
		<div
			class="motion-preset-focus hover:shadow-lg flex flex-col items-center justify-center rounded-2xl border-2 border-amber-200 bg-gray-50/50 p-6 transition-colors motion-duration-700 motion-delay-[500ms] hover:border-amber-300"
		>
			<ToolsIcon className="size-6 stroke-1 my-4" />
			<h3 class="mb-4 font-medium">Service</h3>
			<div class="space-y-2 text-center text-sm text-gray-600">
				<a href="mailto:projects@daystarsolar.co.in">projects@daystarsolar.co.in</a>
				<a href="mailto:installation@daystarsolar.co.in">installation@daystarsolar.co.in</a>
			</div>
		</div>

		<!-- Sales Card -->
		<div
			class="motion-preset-focus hover:shadow-lg flex flex-col items-center justify-center rounded-2xl border-2 border-gray-200 bg-gray-50/50 p-6 transition-colors motion-duration-700 motion-delay-[700ms] hover:border-gray-300"
		>
			<BuildingIcon className="size-6 stroke-1 my-4" />
			<h3 class="mb-4 font-medium">Sales</h3>
			<div class="space-y-2 text-center text-sm text-gray-600">
				<a href="mailto:sales@daystarsolar.co.in">sales@daystarsolar.co.in</a>
				<a href="mailto:support@daystarsolar.co.in">support@daystarsolar.co.in</a>
			</div>
		</div>
	</div>
</div>

<div use:animateIn={{ y: 20, delay: 0.5 }} class="mx-auto max-w-7xl px-4 py-12 opacity-0">
	<div class="grid md:h-[28rem] gap-8 md:grid-cols-2">
		<div class="flex h-full flex-col space-y-4">
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

			<textarea
				placeholder="Hey there!"
				bind:value={message}
				rows="4"
				class="h-full w-full resize-none rounded-lg bg-gray-200 p-4 focus:outline-none focus:ring-2 focus:ring-gray-200"
			></textarea>

			<button
				on:click={handleSubmit}
				class="group/submit inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 p-4 text-white transition-colors hover:bg-gray-800"
			>
				Submit
				<ArrowIcon
					strokeWidth="2"
					className="-rotate-90 items-center justify-center transform group-hover/submit:translate-x-2 duration-200"
				/>
			</button>
		</div>

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
					<span class="font-medium">H5, Third Avenue, Anna Nagar East</span>, Chennai - 600102,
					Tamil Nadu
				</p>
			</a>

			<div class="h-full overflow-hidden rounded-lg border-2 border-black bg-gray-100">
				<!-- <img src="/api/placeholder/800/400" alt="Map location" class="h-full w-full object-cover" /> -->
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

				<!-- <iframe title="Location" class="w-full h-full border-0 " frameborder="0" src="https://www.google.com/maps/embed/v1/place?q=no.+5,+Branson+Garden+Street,+Davidpuram,+Kilpauk,+Chennai,+Tamil+Nadu+600010,+India&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"></iframe> -->


			</div>
		</div>
	</div>
</div>

<div use:animateIn class="mx-auto max-w-7xl px-4 py-8 md:py-16 opacity-0">
	<h2 class="mb-8 text-center text-2xl md:text-3xl">Prefer to call instead?</h2>

	<div class="flex flex-col items-center justify-center gap-4 md:flex-row">
		<a href="tel:04443531021" class="">
			<div
				class="flex items-center gap-3 rounded-full border px-3 py-2 transition-colors hover:border-gray-300"
			>
				<div class="flex size-12 items-center justify-center rounded-full bg-blue-100">
					<PhoneIcon className="size-5 text-blue-500" />
				</div>
				<span class="mx-3 text-sm">044 4353 1021</span>
			</div>
		</a>

		<a href="tel:+919176668617" class="">
			<div
				class="flex items-center gap-3 rounded-full border px-3 py-2 transition-colors hover:border-gray-300"
			>
				<div class="flex size-12 items-center justify-center rounded-full bg-green-100">
					<MobileIcon className="size-5 text-green-500" />
				</div>
				<span class="mx-3 text-sm"
					>+91 91766 686
					<span class="text-gray-500">17</span>/
					<span class="text-gray-500">32</span>/
					<span class="text-gray-500">45</span>/
					<span class="text-gray-500">50</span>/
					<span class="text-gray-500">51</span>/
					<span class="text-gray-500">57</span>/
					<span class="text-gray-500">64</span></span
				>
			</div>
		</a>
	</div>
</div>
