<script>
	import { Navbar, Footer } from '$components';
	import { page } from '$app/stores';
	import { metaHome } from '$lib';

	import { onMount } from 'svelte';
	import '../app.css';

	let { children } = $props();
	console.log($page.url.pathname);
</script>

<!-- svelte-ignore a11y_missing_attribute -->
<svelte:head>
	<title>Daystar Solar</title>
	<meta
		name="description"
		content="Daystar Solar is a leading solar energy solutions provider in South India. We offer solar panels, street lights, and distribution boxes for residential and commercial use."
	/>
	<meta name="robots" content="index, follow" />

	<!-- Open Graph tags for social sharing -->
	<meta property="og:title" content="Daystar Solar" />
	<meta
		property="og:description"
		content="Daystar Solar is a leading solar energy solutions provider in South India. We offer solar panels, street lights, and distribution boxes for residential and commercial use."
	/>
	<meta property="og:image" content={metaHome} />

	<script
		defer
		src="https://cloud.umami.is/script.js"
		data-website-id="fdff27c2-0ba8-46a4-b288-e707835f30ac"
	></script>
	<script async src="https://www.googletagmanager.com/gtag/js?id=GT-PHX5SXCT"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());
		gtag('config', 'GT-PHX5SXCT');
	</script>
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
		/></noscript
	>
</svelte:head>

{#if $page.url.pathname == '/report-view' || $page.url.pathname == '/ar'}
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
