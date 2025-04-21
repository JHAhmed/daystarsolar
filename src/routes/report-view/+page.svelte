<script>
	import { Page1, Page2, Page3, Page4 } from '$lib/report';
	import { dataState } from '$lib/state.svelte.js'; // Real data for prod
	import { dataOld } from '$lib/state.svelte.js'; // Dummy data for testing
	import { dev } from '$app/environment';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';

	export let data;
	let userName = data.report.name;

	data = data.report.data;

	data.forEach((entry) => {
		entry.consumptionUnits = parseInt(entry.consumptionUnits);
		entry.totalCharges = parseInt(entry.totalCharges);
	});

	function formatDateToMonthRange(dateString) {
		dateString === '' ? (dateString = '01/01/1970') : dateString;
		const [day, month, year] = dateString.split('/').map((part) => parseInt(part, 10));
		const currentMonth = new Date(year, month - 3, 1).toLocaleString('en-US', { month: 'short' });
		const nextMonth = new Date(year, month - 2, 1).toLocaleString('en-US', { month: 'short' });
		return `${currentMonth}-${nextMonth} ${year}`;
	}

	const formattedData = data.map((entry) => {
		return {
			...entry,
			formattedDate: formatDateToMonthRange(entry.assessmentDate)
		};
	});
</script>

<svelte:head>
	<title>Solar Energy Report</title>
</svelte:head>

<div class="pdf-container">
	<Page1 data={formattedData} name={userName} />
	<Page2 data={formattedData} />
	<Page3 data={formattedData} />
	<Page4 data={formattedData} />
</div>

<style>
	/* PDF-specific styles */
	:global(body) {
		margin: 0;
		padding: 0;
		background-color: white;
	}

	:global(.reportContainer) {
		page-break-after: always;
		page-break-inside: avoid;
		margin: 0 !important;
		box-shadow: none;
	}

	:global(.reportContainer:last-child) {
		page-break-after: auto;
	}
</style>
