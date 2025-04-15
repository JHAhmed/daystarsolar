<script>
	import { onMount } from 'svelte';

	export let data = [];
	export let reportContainer4;

	onMount(() => {
		let labels = [];
		let values = [];

		data.forEach((element) => {
			labels.push(element.formattedDate);
			values.push(element.consumptionUnits);
		});
	});

	let avgConsumption = data.reduce((acc, val) => acc + val.consumptionUnits, 0) / data.length || 0;
	let avgKWHr = avgConsumption / 60 / 4;
</script>

<div
	id="Page4"
	bind:this={reportContainer4}
	class="reportContainer mx-auto my-12 flex h-[842pt] w-[595pt] flex-col space-y-8  p-8 text-base text-gray-800"
>
	<p>
		<strong>Conclusion & Recommendation</strong> <br />
	</p>
	<p>
		This study was carried out on data gathered from actual facts and numbers. The rise in
		electricity bills has to do with the fact that our earth is running out of fossil fuel based
		energy sources. And prices rise when a particular commodity becomes scarce. But the good news is
		that the technology which helps us and our earth is here, using the suns boundless free power is
		the best source of energy one can get. With Daystar Solar implementing this technology with
		expertise becomes as easy as a phone call.
	</p>

	<p>
		On a general note rise in power costs occur due to the fact that you are dependent on external
		factors such as diesel generators, batery based UPS and grid energy, the eventual costs of which
		are decided based on market factors. Hence rendering power saving plans ineffective if prices of
		non-renewable energy sources continue to rise. As of now, your premises requires on average,
		<strong>{avgKWHr.toFixed(1)} KW/Hr</strong> of power everyday during sunshine hours. Dependence on
		solar power will reduce this risk of electricity price escalation which is the greatest threat to
		your costs. Since most of the power consumption hours are during the peak power production of solar
		power plants, there arises a salient need to generate your own power using the suns unbounded and
		free energy for years to come.
	</p>

	<p>
		Henceforth having collected, analysed and processed the data, we are able to qualitatively prove
		that you stand to benefit greatly if a solar power plant is commissioned for captive power use.
		We hope you take into consideration all our research and base a decision for the benefit of
		yourself and the environment to become a leading example for sustainability in Chennai.
	</p>

	<p>
		We are always available for any queries or clarifications you may require. Please feel free to
		contact us at <a href="mailto:info@daystarsolar.co.in"
			><span class="text-blue-600">info@daystarsolar.co.in</span></a
		>
		or
		<a href="tel:+91 91766 68617">
			<span class="text-blue-600">+91 91766 68617/30/34/50/51/57/64</span>.
		</a>
	</p>

	<div class="flex grow flex-col">
		<div class="grow"></div>
		<p class="my-4 mt-auto text-sm italic">
			<strong>Standard Disclaimer:</strong> This is a computer-generated report. No warranty or responsibility
			is expressed or implied by way of Daystar Solar or its representatives. This information is property
			of Daystar Solar and not to be used for commercial purposes. This is a guideline calculation, contact
			our representatives for an exact and best estimate on your power requirements.
		</p>
		<p class=" border-t p-2 text-center text-sm italic">
			Registered office at H-5, Second Floor, Third Avenue, Anna Nagar East, Chennai - 600102, Tamil
			Nadu <br />
			info@daystarsolar.co.in or +91 91766 68617/30/34/50/51/57/64
		</p>
	</div>
</div>
