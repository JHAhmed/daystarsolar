<script>
	import { toast } from 'svelte-sonner';
	import { SITE, FOOTER_LINKS, SOCIALS } from '$data/site.js';
	import {
		InstagramIcon,
		LinkedinIcon,
		YoutubeIcon,
		FacebookIcon,
		TwitterIcon,
		PintrestIcon,
		ArrowIcon
	} from '$icons';
	import logoSmall from '$lib/assets/logo-small.png';

	const SOCIAL_ICONS = {
		Instagram: InstagramIcon,
		LinkedIn: LinkedinIcon,
		YouTube: YoutubeIcon,
		Facebook: FacebookIcon,
		'X (Twitter)': TwitterIcon,
		Pintrest: PintrestIcon
	};

	let email = $state('');
	let submitting = $state(false);

	const year = new Date().getFullYear();

	async function handleSubmit(event) {
		event.preventDefault();
		if (submitting) return;

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
			toast.warning('Please enter a valid email address.');
			return;
		}

		submitting = true;
		try {
			const response = await fetch('/api/newsletter', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email: email.trim() })
			});

			if (!response.ok) throw new Error('Request failed');

			email = '';
			toast.success('Email submitted for newsletter!');
		} catch {
			toast.error('Something went wrong. Please try again.');
		} finally {
			submitting = false;
		}
	}
</script>

<footer class="mt-16">
	<div class="bg-night-800 text-white">
		<div class="container-page grid gap-12 py-16 md:py-20 lg:grid-cols-12 lg:gap-8">
			<div class="lg:col-span-5">
				<p class="max-w-md text-base font-light leading-relaxed text-white/85">
					<span class="font-medium text-white">Daystar Solar</span> is Chennai's premier solar
					integrator, delivering sustainable energy solutions for homes and businesses since 2012. We
					partner with global leaders to ensure quality and reliability.
				</p>
			</div>

			<nav class="grid grid-cols-2 gap-8 lg:col-span-4" aria-label="Footer">
				{#each FOOTER_LINKS as column (column.heading)}
					<div>
						<p class="mb-4 text-eyebrow uppercase text-white/50">
							{#if column.headingHref}
								<a href={column.headingHref} class="transition-colors hover:text-white">
									{column.heading}
								</a>
							{:else}
								{column.heading}
							{/if}
						</p>
						<ul class="space-y-3 text-sm font-light">
							{#each column.links as link (link.href)}
								<li>
									<a
										href={link.href}
										class="text-white/75 transition-colors duration-[160ms] ease-out hover:text-white"
									>
										{link.name}
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</nav>

			<div class="lg:col-span-3">
				<p class="mb-4 text-sm font-light text-white/85">
					Sign up to our <span class="font-medium text-white">newsletter</span>
				</p>

				<form onsubmit={handleSubmit} class="max-w-sm">
					<div
						class="flex items-center gap-2 rounded-xl bg-white p-1.5 transition-shadow duration-200 focus-within:ring-2 focus-within:ring-solar-400"
					>
						<label class="sr-only" for="newsletter-email">Email address</label>
						<input
							id="newsletter-email"
							bind:value={email}
							type="email"
							autocomplete="email"
							placeholder="Email"
							class="w-full border-none bg-transparent px-2.5 py-2 text-sm text-night-900 placeholder:text-ink-400 focus:outline-none focus:ring-0"
						/>
						<button
							type="submit"
							disabled={submitting}
							aria-label="Subscribe to newsletter"
							class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-night-900 text-white transition-[transform,background-color] duration-[160ms] ease-out hover:bg-night-700 active:scale-[0.94] disabled:opacity-50"
						>
							<ArrowIcon class="size-4 -rotate-90" strokeWidth="2" />
						</button>
					</div>
				</form>
			</div>
		</div>

		<div class="container-page">
			<p class="border-t border-white/10 py-6 text-xs text-white/40">
				© 2012 - {year} Daystar Solar • All rights reserved
			</p>
		</div>
	</div>

	<div class="container-page">
		<div
			class="flex flex-col-reverse items-center justify-between gap-6 py-8 sm:flex-row sm:gap-4"
		>
			<ul class="flex items-center gap-5">
				{#each SOCIALS as social (social.name)}
					{@const Icon = SOCIAL_ICONS[social.name]}
					<li>
						<a
							href={social.href}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={social.name}
							class="block text-ink-400 transition-[color,transform] duration-[160ms] ease-out hover:-translate-y-0.5 hover:text-night-900"
						>
							<Icon class="size-4" />
						</a>
					</li>
				{/each}
			</ul>

			<a href="/" title="Daystar Solar - Home" class="flex items-center justify-center">
				<img class="h-6 w-auto" src={logoSmall} width="80" height="80" alt={SITE.name} />
			</a>

			<a
				href="https://wurks.studio/"
				target="_blank"
				rel="noopener noreferrer"
				class="text-sm font-normal text-ink-500"
			>
				By <span
					class="font-medium text-purple-600 decoration-purple-600 decoration-2 underline-offset-2 hover:underline"
					>Wurks</span
				>.
			</a>
		</div>
	</div>
</footer>
