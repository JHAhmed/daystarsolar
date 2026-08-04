<script>
	import { Navbar, Footer } from '$components';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import '../app.css';

	let { children } = $props();
</script>

<!--
	NOTE ON SEO TAGS:
	Do NOT add a default <title> or <meta name="description"> here.
	Every route must set its own via <svelte:head> in its +page.svelte.
	Because Svelte merges (not overrides) svelte:head blocks, putting
	defaults here previously caused every page to ship TWO <title> and
	TWO <meta name="description"> tags (this one + the page's own),
	which made search engines pick up the generic homepage title/
	description instead of each page's unique one.
	twitter:card is safe to default here (unlike title/description) —
	Twitter/X falls back to each page's own og:title / og:description /
	og:image automatically once twitter:card is present, with no
	duplicate-tag risk. og:image is NOT defaulted here on purpose: 3
	pages (home, calculator, projects) already set their own og:image,
	and a sitewide one here would create a second og:image tag on those
	pages — OG parsers use the first image, so it would silently show
	the generic homepage image instead of the page's own. Pages without
	a custom og:image now set one directly in their own svelte:head.
-->
<!-- svelte-ignore a11y_missing_attribute -->
<svelte:head>
	<meta property="og:site_name" content="Daystar Solar" />
	<meta name="twitter:card" content="summary_large_image" />

	<script
		defer
		src="https://cloud.umami.is/script.js"
		data-website-id="fdff27c2-0ba8-46a4-b288-e707835f30ac"
	></script>
	<script>
		!(function (f, b, e, v, n, t, s) {
			if (f.fbq) return;
			n = f.fbq = function () {
				n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
			};
			if (!f._fbq) f._fbq = n;
			n.push = n;
			n.loaded = !0;
			n.version = '2.0';
			n.queue = [];
			t = b.createElement(e);
			t.async = !0;
			t.src = v;
			s = b.getElementsByTagName(e)[0];
			s.parentNode.insertBefore(t, s);
		})(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
		fbq('init', '1774534922812759');
		fbq('track', 'PageView');
	</script>
	<noscript
		><img
			height="1"
			width="1"
			style="display:none"
			src="https://www.facebook.com/tr?id=1774534922812759&ev=PageView&noscript=1"
			alt="Facebook tracking pixel"
		/></noscript
	>
</svelte:head>

<!-- {#if $page.url.pathname == '/report-view' || $page.url.pathname == '/ar'} -->
{#if $page.url.pathname == '/report-view'}
	<div class="">
		{@render children()}
	</div>
{:else}
	<div class="">
		<Navbar isCalc={$page.url.pathname == '/calculator'} />
		<!-- <div class="relative">
		<Navbar isCalc={$page.url.pathname == '/calculator'} />
	</div> -->
		{@render children()}
		<Footer />
	</div>
{/if}
