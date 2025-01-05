<script>
	import { ChevronIcon, ArrowIcon } from '$icons';
	import { logo } from '$lib';
	import { onMount } from 'svelte';

	let isOpen = $state(false);

	function toggleMenu() {
		isOpen = !isOpen;
	}

	onMount(() => {
		const handleResize = () => {
			if (window.innerWidth > 1024) {
				isOpen = false;
			}
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});

	import { page } from '$app/stores';

	let links = [
		{ name: 'Home', href: '/', icon: ChevronIcon },
		{ name: 'Products', href: '/products', icon: ChevronIcon },
		{ name: 'Services', href: '/services', icon: ChevronIcon },
		{ name: 'About Us', href: '/about', icon: ChevronIcon },
		{ name: 'Gallery', href: '/gallery', icon: ChevronIcon },
		{ name: 'Blog', href: '/blog', icon: ChevronIcon }
	];

	let selected = $state(links.findIndex((link) => link.href === $page.url.pathname));
	let isLightMode = $state(false);

	$effect(() => {
		const unsubscribe = page.subscribe((value) => {
			selected = links.findIndex((link) => link.href === value.url.pathname);
		});

		return unsubscribe;
	});
</script>

<nav class="mx-auto my-4 w-full rounded-lg bg-white px-2 lg:px-8">
	<div class="mx-auto px-2 lg:px-8">
		<div class="flex h-16 items-center justify-between lg:h-20">
			<div class="flex-shrink-0">
				<a href="/" title="" class="flex">
					<img class="h-8 w-auto lg:h-12" src={logo} alt="Daystar Logo" />
					<!-- LOGO -->
				</a>
			</div>

			<div class="hidden lg:flex lg:items-center lg:justify-end lg:space-x-12">
				{#each links as link, i}
					<a
						href={link.href}
						title=""
						class="nav-btn tracking-0 lg:text-md relative inline-block p-4 px-0 font-sans text-sm text-black transition-all duration-200"
						class:nav-btn-selected={selected === i}>{link.name}</a
					>
				{/each}
				<a
					href="/contact"
					title=""
					class="tracking-0 group/button lg:text-md relative inline-block rounded-full bg-orange-200 p-3 px-6 font-sans text-sm text-black transition-all duration-200 hover:bg-orange-300"
					>Contact
					<!-- <div class="absolute group-hover/button:-top-2 group-hover/button:-right-2 bg-black rounded-full p-1 -top-1 -right-1 duration-100"> -->
					<div class="absolute -right-1 -top-1 rounded-full bg-black p-1 duration-100">
						<ArrowIcon color="white" className="size-3 stroke-white -rotate-[135deg]" />
					</div>
				</a>
			</div>
			<div class="lg:hidden">
				<button
					onclick={toggleMenu}
					class="rounded-full bg-gray-200 p-2 text-gray-500 hover:text-gray-600"
				>
					<ChevronIcon className="rotate-90" />
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile Menu -->
	{#if isOpen}
		<div class="lg:hidden">
			<div class="space-y-1 px-2 pb-3 pt-2">
				{#each links as link, i}
					<a
						href={link.href}
						onclick={toggleMenu}
						class="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
						>{link.name}</a
					>
				{/each}
				<a
					href="/contact"
					onclick={toggleMenu}
					class="block rounded-md bg-orange-100 px-3 py-2 text-base font-medium text-gray-700 hover:bg-orange-200 hover:text-gray-900"
					>Contact</a
				>
			</div>
		</div>
	{/if}
</nav>

<style>
	.nav-btn:after {
		bottom: 0.8rem;
		content: '';
		display: block;
		height: 2px;
		left: 0%;
		position: absolute;
		background: #000000;
		transition:
			width 0.2s ease 0s,
			left 0.2s ease 0s;
		width: 0%;
	}
	.nav-btn:hover:after {
		width: 100%;
		left: 0%;
	}

	.nav-btn-selected:after {
		width: 100%;
		left: 0%;
		opacity: 0.5;
	}

	@media (max-width: 1024px) {
		.nav-btn:after {
			display: none;
		}
	}
</style>
