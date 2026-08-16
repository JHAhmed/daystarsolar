<script>
	import { cn } from '$lib/utils.js';

	/**
	 * X (formerly Twitter). Path from Simple Icons (CC0).
	 *
	 * The previous version was a 1200×1227 mark with `fill="#fff"` baked into
	 * the path and `fill="none"` on the svg, so it rendered white-on-white and
	 * was invisible in the footer. Now it takes its colour from the parent like
	 * every other icon here.
	 */
	let { color = 'currentColor', class: className = '', ...rest } = $props();
</script>

<svg
	{...rest}
	xmlns="http://www.w3.org/2000/svg"
	fill={color}
	viewBox="0 0 24 24"
	class={cn('size-12', className)}
>
	<path
		d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
	/>
</svg>
