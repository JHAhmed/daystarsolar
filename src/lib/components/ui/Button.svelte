<script>
	import { cn } from '$lib/utils.js';
	import { ArrowIcon } from '$icons';

	/**
	 * The site had roughly nine different button treatments, all written inline.
	 * This is the same visual language, resolved into one component: a label,
	 * optionally followed by the arrow chip that was Daystar's signature detail.
	 *
	 * Renders an <a> when given `href`, a <button> otherwise.
	 */
	let {
		variant = 'primary',
		size = 'md',
		/** Adds the trailing arrow chip. 'diagonal' points out-of-page, for external links. */
		chip = false,
		shape = 'rounded',
		href = undefined,
		type = 'button',
		disabled = false,
		class: className = '',
		children,
		...rest
	} = $props();

	const variants = {
		/** Near-black. Primary page action. */
		primary: 'bg-night-900 text-white hover:bg-night-800',
		/** Pale blue pill. The nav and CTA action. */
		accent: 'bg-sky-100 text-night-900 hover:bg-sky-200',
		/** Orange. Reserved for the calculator's commit action. */
		solar: 'bg-solar-400 text-night-900 hover:bg-solar-500',
		/** Light grey. Secondary navigation, "View More", "Back". */
		subtle: 'bg-ink-100 text-night-900 hover:bg-ink-200',
		/** Bordered. Sits on photography and coloured panels. */
		outline: 'border border-ink-300 bg-white text-night-900 hover:border-ink-400',
		/** No surface. Tertiary links that still want button hit area. */
		ghost: 'text-ink-600 hover:text-night-900'
	};

	/** The chip colour is picked per variant so it always has contrast. */
	const chipTones = {
		primary: 'bg-solar-400 text-night-900',
		accent: 'bg-white text-night-900',
		solar: 'bg-white text-night-900',
		subtle: 'bg-solar-400 text-white',
		outline: 'bg-night-900 text-white',
		ghost: 'bg-transparent text-current'
	};

	const sizes = {
		sm: chip ? 'gap-2 py-1.5 pl-4 pr-1.5 text-sm' : 'px-4 py-2 text-sm',
		md: chip ? 'gap-3 py-2 pl-5 pr-2 text-sm' : 'px-5 py-2.5 text-sm',
		lg: chip ? 'gap-4 py-2.5 pl-7 pr-2.5 text-base' : 'px-7 py-3.5 text-base'
	};

	const chipSizes = { sm: 'size-6', md: 'size-7', lg: 'size-9' };

	const classes = $derived(
		cn(
			'group/btn relative inline-flex shrink-0 items-center justify-center font-medium',
			'transition-[background-color,border-color,color,transform,box-shadow] duration-[160ms] ease-out',
			'active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50',
			shape === 'pill' ? 'rounded-full' : 'rounded-xl',
			variants[variant],
			sizes[size],
			className
		)
	);

	const chipClasses = $derived(
		cn(
			'flex items-center justify-center transition-transform duration-[220ms] ease-out',
			'group-hover/btn:translate-x-0.5',
			shape === 'pill' ? 'rounded-full' : 'rounded-lg',
			chipSizes[size],
			chipTones[variant]
		)
	);
</script>

{#snippet inner()}
	<span>{@render children?.()}</span>
	{#if chip}
		<span class={chipClasses} aria-hidden="true">
			<ArrowIcon
				class={cn('size-4', chip === 'diagonal' ? '-rotate-[135deg]' : '-rotate-90')}
				strokeWidth="2"
			/>
		</span>
	{/if}
{/snippet}

{#if href}
	<a {href} class={classes} {...rest}>{@render inner()}</a>
{:else}
	<button {type} {disabled} class={classes} {...rest}>{@render inner()}</button>
{/if}
