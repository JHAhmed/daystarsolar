<script>
	import { cn } from '$lib/utils.js';

	/**
	 * Text input with a label, optional prefix, hint and error message.
	 *
	 * The old forms used bare inputs with placeholder-only labelling — a
	 * placeholder disappears the moment someone types, so anyone returning to a
	 * half-filled form had no idea what each box was for, and screen readers
	 * had nothing to announce. Errors are wired through aria-describedby and
	 * aria-invalid rather than only turning the border red.
	 */
	let {
		label,
		value = $bindable(''),
		type = 'text',
		error = '',
		hint = '',
		prefix = '',
		placeholder = '',
		required = false,
		textarea = false,
		rows = 5,
		class: className = '',
		...rest
	} = $props();

	const uid = $props.id();
	const inputId = `${uid}-input`;
	const errorId = `${uid}-error`;
	const hintId = `${uid}-hint`;

	const describedBy = $derived(
		[error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ') || undefined
	);

	const fieldClasses = $derived(
		cn(
			'w-full rounded-xl border bg-white px-4 py-3 text-base text-night-900 placeholder:text-ink-400',
			'transition-[border-color,box-shadow] duration-160 ease-out',
			'focus:outline-none focus:ring-2 focus:ring-night-900/15',
			error ? 'border-red-400 focus:border-red-500' : 'border-ink-200 focus:border-night-900',
			prefix && 'pl-14'
		)
	);
</script>

<div class={cn('w-full', className)}>
	<label for={inputId} class="mb-2 block text-sm font-medium text-ink-700">
		{label}
		{#if required}<span class="text-solar-600" aria-hidden="true">*</span>{/if}
	</label>

	<div class="relative">
		{#if prefix}
			<span
				class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-base text-ink-500"
				aria-hidden="true">
				{prefix}
			</span>
		{/if}

		{#if textarea}
			<textarea
				id={inputId}
				bind:value
				{rows}
				{placeholder}
				{required}
				aria-invalid={error ? 'true' : undefined}
				aria-describedby={describedBy}
				class={cn(fieldClasses, 'resize-none')}
				{...rest}></textarea>
		{:else}
			<input
				id={inputId}
				{type}
				bind:value
				{placeholder}
				{required}
				aria-invalid={error ? 'true' : undefined}
				aria-describedby={describedBy}
				class={fieldClasses}
				{...rest} />
		{/if}
	</div>

	{#if error}
		<p id={errorId} class="mt-1.5 text-sm text-red-600">{error}</p>
	{:else if hint}
		<p id={hintId} class="mt-1.5 text-sm text-ink-500">{hint}</p>
	{/if}
</div>
