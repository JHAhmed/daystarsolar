<script>
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import { NAV_LINKS } from '$data/site.js';
	import { getLenis } from '$motion';
	import Button from './ui/Button.svelte';
	import logo from '$lib/assets/logo.png';

	/** The calculator uses a stripped-back bar so nothing competes with the form. */
	let { minimal = false } = $props();

	let open = $state(false);
	let scrollY = $state(0);

	const condensed = $derived(scrollY > 24);
	const currentPath = $derived(page.url.pathname);

	function isActive(href) {
		return href === '/' ? currentPath === '/' : currentPath.startsWith(href);
	}

	function close() {
		open = false;
	}

	// The menu is an overlay on mobile; letting the page scroll underneath it
	// is the classic bug this prevents.
	//
	// The lock goes on <html>, not <body>: `overflow: hidden` on the body makes
	// it a scroll container, which steals the sticky header's scrollport and
	// drops the bar back at the top of the document — off-screen, taking the
	// menu with it. On <html> the value propagates to the viewport instead and
	// the header keeps sticking.
	$effect(() => {
		if (!open) return;
		const lenis = getLenis();
		lenis?.stop();
		document.documentElement.style.overflow = 'hidden';

		return () => {
			lenis?.start();
			document.documentElement.style.overflow = '';
		};
	});

	afterNavigate(close);
</script>

<svelte:window bind:scrollY onkeydown={(e) => e.key === 'Escape' && close()} />

<header
	class="sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ease-out
		{condensed || open
		? 'border-b border-ink-200 bg-white/90 shadow-soft backdrop-blur-lg'
		: 'border-b border-transparent bg-white'}">
	<nav class="container-page" aria-label="Primary">
		<!-- With the links and menu button gone, `justify-between` has nothing to
		     space and leaves the logo stranded on the left, so the minimal bar
		     centres it instead. -->
		<div
			class="flex items-center transition-[height] duration-300 ease-out
				{minimal ? 'justify-center' : 'justify-between'}
				{condensed ? 'h-16 lg:h-20' : 'h-20 lg:h-28'}">
			<a href="/" title="Daystar Solar - Home" class="flex shrink-0 items-center">
				<img
					class="w-auto transition-[height] duration-300 ease-out {condensed
						? 'h-9 lg:h-12'
						: 'h-11 lg:h-16'}"
					src={logo}
					width="440"
					height="119"
					alt="Daystar Solar" />
			</a>

			{#if !minimal}
				<div class="hidden items-center gap-8 lg:flex xl:gap-10">
					{#each NAV_LINKS as link (link.href)}
						<a
							href={link.href}
							class="nav-link relative py-2 text-sm text-night-900 transition-colors duration-160 ease-out hover:text-night-900"
							class:is-active={isActive(link.href)}
							aria-current={isActive(link.href) ? 'page' : undefined}>
							{link.name}
						</a>
					{/each}

					<Button href="/contact" variant="accent" shape="pill" size="md" chip>Contact</Button>
				</div>

				<button
					type="button"
					onclick={() => (open = !open)}
					aria-expanded={open}
					aria-controls="mobile-menu"
					aria-label={open ? 'Close menu' : 'Open menu'}
					class="flex size-10 items-center justify-center rounded-full bg-ink-100 text-night-900 transition-[background-color,transform] duration-160 ease-out hover:bg-ink-200 active:scale-[0.94] lg:hidden">
					<span class="relative block h-3 w-4">
						<span class="burger-line top-0" class:is-open={open}></span>
						<span class="burger-line bottom-0" class:is-open={open}></span>
					</span>
				</button>
			{/if}
		</div>

		<!--
			Kept mounted and animated with a grid-row transition rather than
			mounted/unmounted, so rapidly tapping the toggle retargets the
			animation instead of restarting it.

			Anchored to the bottom of the bar rather than left in the header's
			flow: as a flow child it grew the sticky header, which pushed the
			whole document down by the menu's height the moment it opened —
			so opening it anywhere but the very top of a page threw the content
			out from under the reader.
		-->
		{#if !minimal}
			<div
				id="mobile-menu"
				class="mobile-menu absolute inset-x-0 top-full shadow-soft"
				class:is-open={open}
				inert={!open || undefined}>
				<div class="overflow-hidden">
					<!-- Matches the condensed bar's surface so the two read as one
					     sheet rather than two stacked panels. -->
					<div class="border-b border-ink-200 bg-white backdrop-blur-lg">
						<!-- Clamped so a short viewport (landscape phones) scrolls the
						     links instead of pushing the last one off-screen. The 5.5rem
						     clears the tallest the bar gets below `lg`, plus a little. -->
						<ul
							class="container-page flex max-h-[calc(100dvh-5.5rem)] flex-col gap-1 overflow-y-auto pt-2 pb-6">
							{#each NAV_LINKS as link (link.href)}
								<li>
									<a
										href={link.href}
										onclick={close}
										aria-current={isActive(link.href) ? 'page' : undefined}
										class="block rounded-lg px-4 py-3 text-lg transition-colors duration-160 ease-out
											{isActive(link.href) ? 'bg-ink-100 font-medium text-night-900' : 'text-ink-700 hover:bg-ink-50'}">
										{link.name}
									</a>
								</li>
							{/each}
							<li class="mt-3">
								<Button href="/contact" variant="accent" shape="pill" size="lg" chip class="w-full">
									Contact
								</Button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		{/if}
	</nav>
</header>

<!-- Now that the panel floats over the page, tapping what is left of the page
     has to close it. Sits under the header's z-50 so the bar and the panel
     itself stay clickable. -->
{#if !minimal}
	<button
		type="button"
		tabindex="-1"
		aria-hidden="true"
		onclick={close}
		class="fixed inset-0 z-40 bg-night-900/25 transition-opacity duration-300 ease-out lg:hidden
			{open ? 'opacity-100' : 'pointer-events-none opacity-0'}"></button>
{/if}

<style>
	/* The underline that grows from the left — carried over from the old nav,
	   which is one of the details that still holds up. */
	.nav-link::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		display: block;
		height: 1.5px;
		width: 0;
		background: currentColor;
		transition: width var(--duration-base) var(--ease-out-quart);
	}

	.nav-link:hover::after {
		width: 100%;
	}

	.nav-link.is-active::after {
		width: 100%;
		opacity: 0.35;
	}

	.burger-line {
		position: absolute;
		left: 0;
		display: block;
		height: 1.5px;
		width: 100%;
		border-radius: 2px;
		background: currentColor;
		transition:
			transform var(--duration-base) var(--ease-out-quart),
			top var(--duration-base) var(--ease-out-quart),
			bottom var(--duration-base) var(--ease-out-quart);
	}

	.burger-line.is-open:first-child {
		top: 50%;
		transform: translateY(-50%) rotate(45deg);
	}

	.burger-line.is-open:last-child {
		bottom: 50%;
		transform: translateY(50%) rotate(-45deg);
	}

	/* 0fr → 1fr animates to the content's natural height without measuring it.
	   The breakpoint lives here rather than as an `lg:hidden` class because a
	   scoped `display: grid` outranks Tailwind's utility and would quietly
	   defeat it, leaving the menu laid out on desktop. */
	.mobile-menu {
		display: none;
	}

	@media (width < 64rem) {
		.mobile-menu {
			display: grid;
			grid-template-rows: 0fr;
			opacity: 0;
			transition:
				grid-template-rows var(--duration-base) var(--ease-out-quart),
				opacity var(--duration-fast) ease;
		}

		.mobile-menu.is-open {
			grid-template-rows: 1fr;
			opacity: 1;
		}
	}
</style>
