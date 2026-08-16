<script>
	import ReportDocument from '$lib/report/ReportDocument.svelte';

	/**
	 * The print target. The root layout renders this route without any chrome,
	 * because it exists only for the headless browser behind /api/report/pdf to
	 * load and print. It is noindex for the same reason.
	 */
	let { data } = $props();

	const report = $derived(data.report);
	const rows = $derived(Array.isArray(report.data) ? report.data : []);
</script>

<svelte:head>
	<title>Solar Report</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<ReportDocument name={report.name} {rows} reportType={report.type ?? 'domestic'} />
