<script>
	import { toast } from 'svelte-sonner';
	import { Seo, Button } from '$components';
	import ReportDocument from '$lib/report/ReportDocument.svelte';

	let { data } = $props();
	let downloading = $state(false);

	const report = $derived(data.report);
	const rows = $derived(Array.isArray(report.data) ? report.data : []);

	async function downloadPdf() {
		if (downloading) return;
		downloading = true;

		try {
			const response = await fetch(`/api/report/pdf?id=${report.id}`);
			if (!response.ok) throw new Error('PDF generation failed');

			const blob = await response.blob();
			const url = URL.createObjectURL(blob);

			const link = document.createElement('a');
			link.href = url;
			link.download = 'Daystar Solar Report.pdf';
			document.body.append(link);
			link.click();
			link.remove();
			URL.revokeObjectURL(url);
		} catch {
			toast.error('Could not generate the PDF. Please try again.');
		} finally {
			downloading = false;
		}
	}
</script>

<Seo
	title="Your Solar Report | Daystar Solar"
	description="Your personalised solar savings report from Daystar Solar."
	path="/report"
	robots="noindex, nofollow"
/>

<div class="border-b border-ink-200 bg-white">
	<div class="container-page flex flex-wrap items-center justify-between gap-4 py-6">
		<div>
			<h1 class="font-display text-heading text-night-900">Your solar report</h1>
			<p class="mt-1 text-sm text-ink-500">Prepared for {report.name}</p>
		</div>

		<div class="flex gap-3">
			<Button href="/contact" variant="subtle" size="md">Talk to us</Button>
			<Button variant="primary" size="md" chip onclick={downloadPdf} disabled={downloading}>
				{downloading ? 'Generating…' : 'Download PDF'}
			</Button>
		</div>
	</div>
</div>

{#if rows.length}
	<ReportDocument name={report.name} {rows} reportType={report.type ?? 'domestic'} />
{:else}
	<div class="container-page py-24 text-center">
		<p class="text-lead text-ink-600">
			This report has no billing data attached. Please generate a new one.
		</p>
		<div class="mt-6 flex justify-center">
			<Button href="/calculator" variant="primary" size="lg" chip>Back to the calculator</Button>
		</div>
	</div>
{/if}
