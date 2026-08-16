<script>
	import { cn } from '$lib/utils.js';
	import { reveal } from '$motion';

	/**
	 * The large page title used across every interior page.
	 *
	 * Each page previously rewrote the same heading by hand, which is why the
	 * old site had four different tracking values and three different sizes for
	 * what was meant to be one treatment. The eyebrow can sit above or below
	 * the title because the old pages did both — About put "Daystar Solar"
	 * above, FAQ and Contact put their label underneath.
	 */
	let {
		eyebrow = '',
		eyebrowPosition = 'below',
		align = 'left',
		lead = '',
		class: className = '',
		children
	} = $props();

	const centred = $derived(align === 'center');
</script>

<header class={cn(centred && 'text-center', className)}>
	{#if eyebrow && eyebrowPosition === 'above'}
		<p
			data-reveal
			{@attach reveal({ trigger: 'load', delay: 0.05, y: 10 })}
			class="mb-3 text-eyebrow text-ink-500 uppercase">
			{eyebrow}
		</p>
	{/if}

	<h1
		data-reveal
		{@attach reveal({ variant: 'blur', trigger: 'load', duration: 0.9 })}
		class="font-display text-display-lg text-night-900 md:text-display-xl">
		{@render children?.()}
	</h1>

	{#if eyebrow && eyebrowPosition === 'below'}
		<p
			data-reveal
			{@attach reveal({ trigger: 'load', delay: 0.12, y: 10 })}
			class="mt-4 text-eyebrow text-ink-500 uppercase">
			{eyebrow}
		</p>
	{/if}

	{#if lead}
		<p
			data-reveal
			{@attach reveal({ trigger: 'load', delay: 0.18, y: 12 })}
			class={cn('mt-6 max-w-2xl text-lead text-ink-600', centred && 'mx-auto')}>
			{lead}
		</p>
	{/if}
</header>
