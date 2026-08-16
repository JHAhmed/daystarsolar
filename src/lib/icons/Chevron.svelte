<script>
	import { cn } from '$lib/utils.js';

	let { strokeWidth = 1.5, color = 'currentColor', class: className = '', ...rest } = $props();
</script>

<svg {...rest}
	xmlns="http://www.w3.org/2000/svg"
	fill="none"
	viewBox="0 0 24 24"
	stroke-width={strokeWidth}
	stroke={color}
	class={cn('size-4', className)}
>
	<path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
</svg>
