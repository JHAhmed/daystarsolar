<script>
	import { onMount } from 'svelte';
	import { ADDRESS, CONTACT } from '$data/site.js';
	import { buildReport, formatIndianNumber, formatLongDate } from './calculations.js';
	import logo from '$lib/assets/logo.png';

	/**
	 * The four-page solar report, shared by the on-screen view and the print
	 * target the PDF renderer loads. One component means the download can never
	 * disagree with what was on screen — previously two routes each assembled
	 * their own copy of the pages.
	 *
	 * Pages are fixed at A4 (595pt x 842pt) so Puppeteer's `preferCSSPageSize`
	 * maps one page element to one PDF page.
	 */
	let { name = 'there', rows = [], reportType = 'domestic' } = $props();

	const report = $derived(buildReport(rows));
	const today = formatLongDate();
	const cycle = $derived(reportType === 'domestic' ? 'bimonthly' : 'monthly');

	/**
	 * The two halves of the history, paired with the figures already computed
	 * for them. `buildReport` drops the odd row before splitting; page 3's
	 * charts used to split the full list instead, so an odd number of readings
	 * gave the second chart one more bar than the statistics beside it
	 * described.
	 */
	const halves = $derived.by(() => {
		const even = report.rows.length % 2 === 0 ? report.rows : report.rows.slice(0, -1);
		const mid = even.length / 2;

		// Rows run newest first, so the range reads oldest to newest.
		const range = (slice) =>
			slice.length ? `${slice.at(-1).formattedDate} – ${slice[0].formattedDate}` : '';

		return [
			{ stats: report.recent, rows: even.slice(0, mid) },
			{ stats: report.earlier, rows: even.slice(mid) }
		].map((half) => ({ ...half, range: range(half.rows) }));
	});

	let overviewCanvas = $state();
	let comparisonCanvas = $state();
	let halfCanvases = $state([]);

	const PALETTE = {
		units: 'rgba(54, 162, 235, 0.6)',
		unitsLine: 'rgba(54, 162, 235, 1)',
		cost: 'rgba(255, 99, 132, 0.6)',
		costLine: 'rgba(255, 99, 132, 1)',
		bars: [
			'rgb(255, 99, 132)',
			'rgb(54, 162, 235)',
			'rgb(255, 205, 86)',
			'rgb(75, 192, 192)',
			'rgb(153, 102, 255)',
			'rgb(255, 159, 64)'
		]
	};

	onMount(async () => {
		const { default: Chart } = await import('chart.js/auto');

		// The PDF renderer waits for #chart before printing, so animation has to
		// be off — an animating chart is still empty on the frame it captures.
		Chart.defaults.animation = false;
		Chart.defaults.font.family = 'Satoshi, Poppins, sans-serif';

		// Every chart sits in a fixed-height box on a fixed-height page, so the
		// aspect ratio has to give. Left on, Chart.js honoured the 2:1 default
		// and drew a 512x256 chart into the 708pt-wide canvas, leaving a third
		// of every box empty on the right — which is what made the charts look
		// as though they were pushed off-centre.
		Chart.defaults.responsive = true;
		Chart.defaults.maintainAspectRatio = false;

		const labels = report.rows.map((row) => row.formattedDate);
		const units = report.rows.map((row) => row.consumptionUnits);
		const charges = report.rows.map((row) => row.totalCharges);

		const charts = [];

		charts.push(
			new Chart(overviewCanvas, {
				type: 'bar',
				data: {
					labels,
					datasets: [
						{
							label: 'Electricity Usage (Units)',
							data: units,
							backgroundColor: 'rgba(75, 192, 192, 0.5)'
						}
					]
				},
				options: { plugins: { legend: { display: true } } }
			})
		);

		const percentChange = (series) => {
			const base = series[0] || 1;
			return series.map((value) => ((value - base) / base) * 100);
		};

		charts.push(
			new Chart(comparisonCanvas, {
				type: 'bar',
				data: {
					labels,
					datasets: [
						{
							label: `Total units ${cycle}`,
							data: units,
							backgroundColor: PALETTE.units,
							borderColor: PALETTE.unitsLine,
							borderWidth: 1,
							order: 3
						},
						{
							label: `Total cost ${cycle}`,
							data: charges,
							backgroundColor: PALETTE.cost,
							borderColor: PALETTE.costLine,
							borderWidth: 1,
							order: 4
						},
						{
							type: 'line',
							label: 'Unit % Change',
							data: percentChange(units),
							borderColor: PALETTE.unitsLine,
							borderWidth: 2,
							fill: false,
							pointRadius: 3,
							tension: 0.1,
							yAxisID: 'y1',
							order: 2
						},
						{
							type: 'line',
							label: 'Cost % Change',
							data: percentChange(charges),
							borderColor: PALETTE.costLine,
							borderWidth: 2,
							fill: false,
							pointRadius: 3,
							tension: 0.1,
							yAxisID: 'y1',
							order: 1
						}
					]
				},
				options: {
					scales: {
						y: { beginAtZero: true, title: { display: true, text: 'Absolute Values' } },
						y1: {
							position: 'right',
							grid: { drawOnChartArea: false },
							title: { display: true, text: 'Percentage Change (%)' }
						}
					},
					interaction: { mode: 'index', intersect: false }
				}
			})
		);

		halves.forEach((half, i) => {
			charts.push(
				new Chart(halfCanvases[i], {
					type: 'bar',
					data: {
						labels: half.rows.map((row) => row.formattedDate),
						datasets: [
							{
								label: 'Units',
								data: half.rows.map((row) => row.consumptionUnits),
								backgroundColor: PALETTE.bars
							}
						]
					},
					options: { plugins: { legend: { display: false } } }
				})
			);
		});

		return () => charts.forEach((chart) => chart.destroy());
	});
</script>

{#snippet footer()}
	<div class="mt-auto border-t border-ink-300 pt-2 text-center text-[9pt] text-ink-600 italic">
		Registered office at {ADDRESS.full}
		<br />
		{CONTACT.emails.service} or {CONTACT.reportPhones}
	</div>
{/snippet}

<div class="report font-report">
	<!-- ── Page 1 ─────────────────────────────────────────────────────── -->
	<section class="page" id="Page1">
		<img src={logo} width="440" height="119" alt="Daystar Solar" class="mx-auto my-4 w-56" />
		<p class="ml-auto text-sm">{today}</p>

		<h1 class="mt-4 text-xl font-bold">Hey {name},</h1>
		<p class="mt-3">
			Based on our analysis, if you had switched to solar energy two years back, your savings and
			requirement would have been,
		</p>

		<div class="my-5 flex flex-col items-center gap-3">
			<div
				class="flex w-2/3 items-center justify-between rounded-xl border border-ink-300 px-5 py-3">
				<p class="text-sm font-semibold tracking-wider text-ink-700 uppercase">Total savings</p>
				<p class="text-3xl font-medium text-solar-600">
					₹{formatIndianNumber(report.totalSavings)}
				</p>
			</div>

			<div
				class="flex w-2/3 items-center justify-between rounded-xl border border-ink-300 px-5 py-3">
				<p class="text-sm font-semibold tracking-wider text-ink-700 uppercase">Required solar kW</p>
				<p class="text-3xl font-medium text-solar-600">
					{report.requiredKw}<span class="ml-1 text-xl text-ink-700">kW</span>
				</p>
			</div>
		</div>

		<p>
			As you will see, installation of a boundless source of free energy such as solar power will
			amount to momentous savings as shown with the help of actual data from the past 12 months in
			the case study report. Below is a chart detailing your consumption over the last 24 months, in
			{cycle} cycles.
		</p>

		<!-- `flex-1` rather than a fixed height: the page is a fixed A4 sheet, so
		     whatever the text above does not use belongs to the chart. Pooling it
		     above the footer instead is what left every page half empty.
		     `position: relative` is Chart.js's requirement for a responsive
		     canvas, and the explicit min-height stops the flex item's automatic
		     min-content floor from being driven by the canvas it contains. -->
		<div class="relative my-4 min-h-64 flex-1">
			<canvas bind:this={overviewCanvas} id="chart"></canvas>
		</div>

		{@render footer()}
	</section>

	<!-- ── Page 2 ─────────────────────────────────────────────────────── -->
	<section class="page" id="Page2">
		<p>
			Below is a comparison of power consumption in KWh (units) versus the cost incurred. Notice how
			cost increases a lot more in relation to a small increase in consumption.
		</p>

		<div class="relative my-4 min-h-64 flex-1">
			<canvas bind:this={comparisonCanvas}></canvas>
		</div>

		<p>
			Also note how the consumption and cost peaks in the summer months. Massive savings can be
			gained once the power consumption falls below a certain threshold.
		</p>

		<table class="my-5 w-full border-collapse text-[10pt]">
			<thead>
				<tr class="bg-solar-200 text-left">
					<th class="p-1.5">Period</th>
					<th class="p-1.5 text-right">No. of Units consumed</th>
					<th class="p-1.5 text-right">Bill Amount (Rs.)</th>
					<th class="p-1.5 text-right">Savings w/ Solar</th>
				</tr>
			</thead>
			<tbody>
				{#each report.quarters as quarter, i (quarter.period)}
					<tr class={i % 2 === 0 ? 'bg-solar-100' : 'bg-solar-50'}>
						<td class="p-1.5">{quarter.period}</td>
						<td class="p-1.5 text-right tabular-nums">{quarter.consumptionUnits}</td>
						<td class="p-1.5 text-right tabular-nums">{quarter.totalCharges}</td>
						<td class="p-1.5 text-right tabular-nums">{quarter.savings}</td>
					</tr>
				{/each}
				<tr class="bg-solar-200 font-bold">
					<td class="p-1.5">Totals</td>
					<td class="p-1.5 text-right tabular-nums">
						{formatIndianNumber(report.quarterTotals.units)}
					</td>
					<td class="p-1.5 text-right tabular-nums">
						₹{formatIndianNumber(report.quarterTotals.charges)}
					</td>
					<td class="p-1.5 text-right tabular-nums">
						₹{formatIndianNumber(report.quarterTotals.savings)}
					</td>
				</tr>
			</tbody>
		</table>

		{@render footer()}
	</section>

	<!-- ── Page 3 ─────────────────────────────────────────────────────── -->
	<section class="page" id="Page3">
		<p>
			The data consists of energy consumption during the past 24 months. The aim of this table is to
			show the power requirement (Consumption in kilowatt per hour) of the premises during the past
			two year period. As this parameter varies depending on many factors such as climate, holidays,
			religious festivals, power efficiency of electrical appliances used etc, we can calculate an
			average of <strong>{report.averageKwHr.toFixed(1)} KW/Hr</strong> over past two years as the minimum
			power requirement of the premises to reduce power consumption by 100% as of the last billing cycle.
		</p>

		<!-- Side by side, the two charts were 346pt wide and 176pt tall and the
		     page still ran out of content 400pt short of the footer. Stacked,
		     each half gets a chart wide enough to read and a figures panel
		     beside it, and the two rows share out everything the prose leaves. -->
		<div class="my-3 flex flex-1 flex-col gap-4">
			{#each halves as half, i (i)}
				<div class="flex flex-1 gap-4">
					<div class="relative min-h-32 flex-1">
						<canvas bind:this={halfCanvases[i]}></canvas>
					</div>

					<!-- Label over value rather than "label: value" on one line: at this
					     column width the run-on version broke every figure across two
					     or three lines and the numbers stopped lining up. -->
					<div class="w-52 self-center rounded-xl border border-ink-300 px-4 py-4">
						<p class="text-[8pt] font-semibold tracking-wider text-ink-600 uppercase">
							{half.range}
						</p>

						<dl class="mt-2.5 flex flex-col gap-2.5">
							{#each [{ label: 'Max Consumption', value: `${half.stats.peak?.consumptionUnits ?? 0} Units` }, { label: 'Min Consumption', value: `${half.stats.min?.consumptionUnits ?? 0} Units` }, { label: 'Avg Consumption', value: `${half.stats.avgUnits.toFixed(0)} Units` }, { label: 'Avg Cost', value: `₹${formatIndianNumber(half.stats.avgCost)}` }, { label: 'Avg Cost w/ Solar', value: `₹${formatIndianNumber(half.stats.avgUnits * 4)}` }] as figure (figure.label)}
								<div class="flex items-baseline justify-between gap-2">
									<dt class="text-[9pt] text-ink-600">{figure.label}</dt>
									<dd class="text-[10pt] font-bold whitespace-nowrap">{figure.value}</dd>
								</div>
							{/each}
						</dl>
					</div>
				</div>
			{/each}
		</div>

		{#if report.recent.peak && report.earlier.peak}
			<p>
				Note how the electricy usage peaks in the months of
				<strong>{report.recent.peak.formattedDate}</strong>
				and <strong>{report.earlier.peak.formattedDate}</strong>.
			</p>
		{/if}

		<p>Kindly find the conclusion and recommendation on the next page!</p>

		{@render footer()}
	</section>

	<!-- ── Page 4 ─────────────────────────────────────────────────────── -->
	<section class="page" id="Page4">
		<h2 class="text-xl font-bold">Conclusion &amp; Recommendation</h2>

		<!-- The two headline figures again, laid out along the page rather than
		     down it so the recap reads as a summary of the conclusion and not as
		     a reprint of page 1. Three pages of working sit between them. -->
		<div class="my-1 flex gap-3">
			<div class="flex-1 rounded-xl border border-ink-300 px-4 py-3">
				<p class="text-[8pt] font-semibold tracking-wider text-ink-600 uppercase">Total savings</p>
				<p class="mt-1 text-2xl font-medium text-solar-600">
					₹{formatIndianNumber(report.totalSavings)}
				</p>
			</div>
			<div class="flex-1 rounded-xl border border-ink-300 px-4 py-3">
				<p class="text-[8pt] font-semibold tracking-wider text-ink-600 uppercase">
					Required solar kW
				</p>
				<p class="mt-1 text-2xl font-medium text-solar-600">
					{report.requiredKw}<span class="ml-1 text-base text-ink-700">kW</span>
				</p>
			</div>
		</div>

		<p>
			This study was carried out on data gathered from actual facts and numbers. The rise in
			electricity bills has to do with the fact that our earth is running out of fossil fuel based
			energy sources. And prices rise when a particular commodity becomes scarce. But the good news
			is that the technology which helps us and our earth is here, using the suns boundless free
			power is the best source of energy one can get. With Daystar Solar implementing this
			technology with expertise becomes as easy as a phone call.
		</p>

		<p>
			On a general note rise in power costs occur due to the fact that you are dependent on external
			factors such as diesel generators, batery based UPS and grid energy, the eventual costs of
			which are decided based on market factors. Hence rendering power saving plans ineffective if
			prices of non-renewable energy sources continue to rise. As of now, your premises requires on
			average, <strong>{report.averageKwHr.toFixed(1)} KW/Hr</strong> of power everyday during sunshine
			hours. Dependence on solar power will reduce this risk of electricity price escalation which is
			the greatest threat to your costs. Since most of the power consumption hours are during the peak
			power production of solar power plants, there arises a salient need to generate your own power using
			the suns unbounded and free energy for years to come.
		</p>

		<p>
			Henceforth having collected, analysed and processed the data, we are able to qualitatively
			prove that you stand to benefit greatly if a solar power plant is commissioned for captive
			power use. We hope you take into consideration all our research and base a decision for the
			benefit of yourself and the environment to become a leading example for sustainability in
			Chennai.
		</p>

		<!-- The closing paragraph is the one thing on this page a reader is meant
		     to act on, so it gets a panel rather than being the fourth block of
		     body text. Wording unchanged. -->
		<p class="mt-2 rounded-xl border border-ink-300 bg-solar-50 px-5 py-4">
			We are always available for any queries or clarifications you may require. Please feel free to
			contact us at
			<a href="mailto:{CONTACT.emails.service}" class="text-sky-600">{CONTACT.emails.service}</a>
			or
			<a href="tel:{CONTACT.primaryPhone}" class="text-sky-600">{CONTACT.reportPhones}</a>.
		</p>

		<!-- Disclaimer and footer travel together. Given `mt-auto` each, they
		     split the leftover space between them and the disclaimer ended up
		     floating in the middle of the empty half of the page. What is left
		     over now falls at the very foot of the last page, where a margin is
		     what a reader expects. -->
		<div class="mt-auto flex flex-col gap-3">
			<p class="text-[9pt] italic">
				<strong>Standard Disclaimer:</strong> This is a computer-generated report. No warranty or responsibility
				is expressed or implied by way of Daystar Solar or its representatives. This information is property
				of Daystar Solar and not to be used for commercial purposes. This is a guideline calculation,
				contact our representatives for an exact and best estimate on your power requirements.
			</p>

			{@render footer()}
		</div>
	</section>
</div>

<style>
	.report {
		color: var(--color-ink-800);
		background: var(--color-ink-100);
	}

	.page {
		box-sizing: border-box;
		margin-inline: auto;
		display: flex;
		width: 595pt;
		height: 842pt;
		flex-direction: column;
		gap: 0.6rem;
		background: white;
		padding: 32pt;
		font-size: 11pt;
		line-height: 1.65;
	}

	/* On screen the pages sit apart on a grey field; in print they must butt up
	   against each other so one page element becomes exactly one PDF page. */
	@media screen {
		.page {
			margin-block: 2rem;
			box-shadow: var(--shadow-soft);
		}
	}

	@page {
		size: A4;
		margin: 0;
	}

	@media print {
		.report {
			background: white;
		}

		.page {
			margin: 0;
			box-shadow: none;
			break-after: page;
		}

		.page:last-child {
			break-after: auto;
		}
	}
</style>
