<script>
	import { blur } from 'svelte/transition';
	import { Toaster, toast } from 'svelte-sonner';
	import { Tooltip } from 'bits-ui';
	import {
		HomeIcon,
		ChevronRightIcon,
		BuildingOfficeIcon,
		BuildingOffice2Icon,
		BoltIcon
	} from '@fvilers/heroicons-svelte/24/outline';

	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { CustomInput } from '$components';
	import CustomDropdown from '$components/CustomDropdown.svelte';

	let currentStep = 0;

	function nextStep() {

		if (currentStep < 2) {
			if (validate()) {
				steps[currentStep].isActive = false;
				currentStep++;
				steps[currentStep].isActive = true;
				console.log(steps);
			} else {
				toast.warning('Please fill in all details properly!');
			}
		} else {
			alert('Form submitted');
		}
	}

	function prevStep() {
		if (currentStep > 0) {
			currentStep--;
		}
	}

	function validate() {
		if (
			details.fullName.length < 5 ||
			details.phoneNumber.length != 10 ||
			isNaN(parseInt(details.phoneNumber)) ||
			!states.some((state) => state.label == details.state) ||
			!consumerTypes.some((el) => el.label == details.consumerType) ||
			!voltageType.some((el) => el.value == details.voltageTypeValue)
		) {
			return false;
		}
		return true;
	}

	const states = [
		{ value: 'andhra-pradesh', label: 'Andhra Pradesh' },
		{ value: 'arunachal-pradesh', label: 'Arunachal Pradesh' },
		{ value: 'assam', label: 'Assam' },
		{ value: 'bihar', label: 'Bihar' },
		{ value: 'chhattisgarh', label: 'Chhattisgarh' },
		{ value: 'goa', label: 'Goa' },
		{ value: 'gujarat', label: 'Gujarat' },
		{ value: 'haryana', label: 'Haryana' },
		{ value: 'himachal-pradesh', label: 'Himachal Pradesh' },
		{ value: 'jharkhand', label: 'Jharkhand' },
		{ value: 'karnataka', label: 'Karnataka' },
		{ value: 'kerala', label: 'Kerala' },
		{ value: 'madhya-pradesh', label: 'Madhya Pradesh' },
		{ value: 'maharashtra', label: 'Maharashtra' },
		{ value: 'manipur', label: 'Manipur' },
		{ value: 'meghalaya', label: 'Meghalaya' },
		{ value: 'mizoram', label: 'Mizoram' },
		{ value: 'nagaland', label: 'Nagaland' },
		{ value: 'odisha', label: 'Odisha' },
		{ value: 'punjab', label: 'Punjab' },
		{ value: 'rajasthan', label: 'Rajasthan' },
		{ value: 'sikkim', label: 'Sikkim' },
		{ value: 'tamil-nadu', label: 'Tamil Nadu' },
		{ value: 'telangana', label: 'Telangana' },
		{ value: 'tripura', label: 'Tripura' },
		{ value: 'uttar-pradesh', label: 'Uttar Pradesh' },
		{ value: 'uttarakhand', label: 'Uttarakhand' },
		{ value: 'west-bengal', label: 'West Bengal' },
		{ value: 'andaman-and-nicobar', label: 'Andaman and Nicobar' },
		{ value: 'chandigarh', label: 'Chandigarh' },
		{ value: 'daman-and-diu', label: 'Daman and Diu' },
		{ value: 'delhi', label: 'Delhi' },
		{ value: 'jammu-and-kashmir', label: 'Jammu and Kashmir' },
		{ value: 'ladakh', label: 'Ladakh' },
		{ value: 'lakshadweep', label: 'Lakshadweep' },
		{ value: 'puducherry', label: 'Puducherry' }
	];

	const terraceTypes = [
		{ value: 'shed', label: 'Shed' },
		{ value: 'ground-mount', label: 'Ground Mount' },
		{ value: 'low-rise-REC', label: 'Low Rise (REC)' },
		{ value: 'high-rise-REC', label: 'High Rise (REC)' },
	]

	const residenceType = [
		{
			name: 'House (Own)',
			value: 'house-own',
			icon: HomeIcon
		},
		{
			name: 'House (Rented)',
			value: 'house-rent',
			icon: BuildingOffice2Icon
		},
		{
			name: 'Flat (Rented)',
			value: 'flat-rent',
			icon: BuildingOfficeIcon
		}
	];

	const voltageType = [
		{
			name: 'Low Tension (LT)',
			value: 'lt',
			icon: BoltIcon
		},
		{
			name: 'Low Tension (LTCT)',
			value: 'ltct',
			icon: BoltIcon
		},
		{
			name: 'High Tension (HT)',
			value: 'ht',
			icon: BoltIcon
		}
	];

	const consumerTypes = [
		{
			label: 'Domestic',
			value: 'domestic'
		},
		{
			label: 'Industrial',
			value: 'industrial'
		},
		{
			label: 'Commercial',
			value: 'commercial'
		},
		{
			label: 'Institutional (Public/Private)',
			value: 'institutional'
		},
	];

	const steps = [
		{
			title: 'Demographic',
			icon: HomeIcon,
			isActive: true
		},
		{
			title: 'Policy',
			icon: HomeIcon,
			isActive: false
		},
		{
			title: 'Consumption',
			icon: HomeIcon,
			isActive: false
		}
	];

	const meteringType = [
		{
			name: 'Net Metering',
			value: 'net-metering',
			icon: BoltIcon,
			tooltipText: "Under net metering mechanism, solar generation is used to meet your electricity demand; any excess solar generation exported to the grid is balanced against import of electricity from the grid during the billing period. Any excess generation still remaining at the end of the month is treated as per existing regulations in your state."
		},
		{
			name: 'Net Feed-In',
			value: 'net-feed-in',
			icon: BoltIcon,
			tooltipText: "Solar generation is used to meet your electricity demand. However, unlike net metering, any excess generation that is exported to the grid is compensated at a predetermined tariff as per existing regulations in the state"
		},
		{
			name: 'Gross Metering',
			value: 'gross-metering',
			icon: BoltIcon,
			tooltipText: "Gross metering is a combination of net metering and net feed-in. Under gross metering, all solar generation is exported to the grid and compensated at a predetermined tariff as per existing regulations in the state. The consumer continues to import electricity from the grid to meet their electricity demand."
		}
	];

	const technologyType = [
		{
			name: 'Solar On-Grid',
			value: 'solar-on-grid',
			icon: BoltIcon,
			tooltipText: "Use this  option to determine the size of a grid-interactive solar and battery storage system, which will allow you to store excess solar generation and consume it at a later stage"
		},
		{
			name: 'Solar Off-Grid',
			value: 'solar-off-grid',
			icon: BoltIcon,
			tooltipText: "Use this  option to determine the size (in kW) of a grid-connected solar system for maximum savings on electricity bills. The optimum solar PV size will depend on your electricity consumption, state-specific tariff and rooftop solar regulations."
		},
		{
			name: 'Solar Hybrid',
			value: 'solar-hybrid',
			icon: BoltIcon,
			tooltipText: "Solar hybrid systems are a combination of solar and battery storage systems. The battery storage system allows you to store excess solar generation and consume it at a later stage."
		}
	];

	let detailsStep1 = {
		meteringTypeValue: 'net-metering',
		technologyValue: 'solar-off-grid'
	};

	let details = {
		fullName: '',
		phoneNumber: '',
		state: '',
		consumerType: '',
		residenceTypeValue: '',
		voltageTypeValue: 'lt',
		sanctionedLoad: '',
		ebNumber: '',
		ebRegNumber: '',
		terraceArea: '',
		terraceTypeValue: '',
		unit: 'sqmt'
	};


</script>

<Toaster richColors expand={true} />

<!-- <div class="absolute right-12 top-12 h-48 w-96 rounded-lg bg-gray-600 p-4 font-medium text-white">
	<p>Name: {details.fullName}</p>
	<p>Phone: {details.phoneNumber}</p>
	<p>State: {details.state}</p>
	<p>Consumer Type: {details.consumerType}</p>
	<p>Residence Type: {details.residenceTypeValue}</p>
	<p>Voltage Type: {details.voltageTypeValue}</p>
</div> -->

<section class="mx-auto w-full max-w-4xl px-4 py-12">
	<div class="mb-12 text-center">
		<h1 class="mb-4 text-5xl font-medium tracking-tight">Solar Calculator</h1>
		<p class="text-xl text-gray-600">Calculate your cost, savings, ROI, and more!</p>
	</div>

	{#key currentStep}
		<div class="flex max-w-7xl items-center justify-center">
			{#each steps as step, i}
				{#if step.isActive}
					<div class="flex items-center">
						<div class="flex items-center gap-2 rounded-full border-2 border-orange-400 p-4">
							<span
								class="flex h-6 w-6 items-center justify-center rounded-full bg-orange-400 text-sm text-white"
								>{i + 1}</span
							>
							<span class="mx-4 text-gray-800">{step.title}</span>
						</div>
					</div>
					<div class="mx-4 h-px w-24 bg-gray-400 {i === 2 ? 'hidden' : ''}"></div>
				{:else}
					<div class="flex items-center">
						<div class="flex items-center gap-2 rounded-full border-2 border-gray-300 p-4">
							<span
								class="flex h-6 w-6 items-center justify-center rounded-full bg-gray-300 text-sm text-white"
								>{i + 1}</span
							>
							<span class="mx-4 text-gray-800">{step.title}</span>
						</div>
						<div class="mx-4 h-px w-24 bg-gray-400 {i === 2 ? 'hidden' : ''}"></div>
					</div>
				{/if}
			{/each}
		</div>
	{/key}
</section>

<form on:submit|preventDefault={nextStep} class="mx-auto w-full max-w-5xl px-4 py-12">
	{#if currentStep == 0}
		<div class="">
			<div class="my-8 flex w-full space-x-4">
				<CustomInput bind:value={details.fullName} label="Full Name" maxlength="20" />
				<CustomInput
					bind:value={details.phoneNumber}
					label="Phone Number"
					hasPrefix
					placeholder="00000 00000"
				/>
			</div>

			<div class="my-8 flex w-full flex-col space-y-8">
				<CustomDropdown bind:value={details.state} options={states} />
				<CustomDropdown
					bind:value={details.consumerType}
					label="Consumer Type"
					placeholder="Select consumer type"
					options={consumerTypes}
				/>
			</div>

			{#if details.consumerType == 'Domestic'}
				<div class="my-8" in:blur out:blur>
					<Label for="residence-type" class="my-2">Residence Type</Label>
					<RadioGroup.Root
						id="residence-type"
						value={details.residenceTypeValue}
						class="flex items-center justify-between space-x-2"
						onValueChange={(e) => {
							details.residenceTypeValue = e;
						}}
					>
						{#each residenceType as option, i}
							<div
								class="flex w-full items-center space-x-6 rounded-lg border-2 {details.residenceTypeValue ==
								option.value
									? 'border-orange-400'
									: 'border-gray-600'} p-4"
							>
								<option.icon
									class="size-6 {details.residenceTypeValue == option.value
										? 'text-orange-400'
										: ''}"
								/>
								<Label class="flex grow cursor-pointer text-gray-800" for={`r${i}`}
									>{option.name}</Label
								>
								<RadioGroup.Item
									value={option.value}
									class={details.residenceTypeValue == option.value ? 'text-orange-400' : ''}
									id={`r${i}`}
								/>
							</div>
						{/each}
						<RadioGroup.Input name="spacing" />
					</RadioGroup.Root>
				</div>
			{/if}

			<div class="my-8">
				<Label for="voltage-type" class="my-2">Voltage Type</Label>
				<RadioGroup.Root
					id="voltage-type"
					value={details.voltageTypeValue}
					class="flex items-center justify-between space-x-2"
					onValueChange={(e) => {
						details.voltageTypeValue = e;
					}}
				>
					{#each voltageType as option, i}
						<div
							class="flex w-full items-center space-x-6 rounded-lg border-2 {details.voltageTypeValue ==
							option.value
								? 'border-orange-400'
								: 'border-gray-600'} p-4"
						>
							<option.icon
								class="size-6 {details.voltageTypeValue == option.value ? 'text-orange-400' : ''}"
							/>
							<Label class="flex grow cursor-pointer text-gray-800" for={`r-${option.value}-${i}`}
								>{option.name}</Label
							>
							<RadioGroup.Item
								value={option.value}
								class={details.voltageTypeValue == option.value ? 'text-orange-400' : ''}
								id={`r-${option.value}-${i}`}
							/>
						</div>
					{/each}
					<RadioGroup.Input name="spacing" />
					<Tooltip.Root openDelay={100}>
						<Tooltip.Trigger class="">
							<p
								class=" m-2 inline-flex size-6 items-center justify-center rounded-full bg-gray-300 p-2 text-xs text-black"
							>
								i
							</p>
						</Tooltip.Trigger>
						<Tooltip.Content>
							<div class="bg-background">
								<Tooltip.Arrow class="border-dark-10 rounded-[2px] border-l border-t" />
							</div>
							<div
								class="border-dark-10 max-w-md flex items-center justify-center rounded-lg  border bg-background p-3 text-sm shadow-popover outline-none"
							>
							This is the voltage level for your connection: HT means high tension or high voltage and LT means low tension or low voltage. The voltage level at which electricity is supplied depends on the sanctioned (contract) load of the consumer. All domestic consumers come under LT. The tariff in most states are different for LT and HT consumers.
							</div>
						</Tooltip.Content>
					</Tooltip.Root>
				</RadioGroup.Root>
			</div>
		</div>
	{:else if currentStep == 1}
		<div class="">
			<div class="my-8">
				<Label for="technology-type" class="my-2">Technology Type</Label>
				<RadioGroup.Root
					id="technology-type"
					value={detailsStep1.technologyValue}
					class="flex items-center justify-between space-x-2"
					onValueChange={(e) => {
						detailsStep1.technologyValue = e;
					}}
				>
					{#each technologyType as option, i}
						<div
							class="flex w-full items-center space-x-6 rounded-lg border-2 {detailsStep1.technologyValue ==
							option.value
								? 'border-orange-400'
								: 'border-gray-600'} p-4"
						>
							<option.icon
								class="size-6 {detailsStep1.technologyValue == option.value
									? 'text-orange-400'
									: ''}"
							/>
							<Label class="flex grow cursor-pointer text-gray-800" for={`r-${option.value}-${i}`}
								>{option.name}</Label
							>
							<RadioGroup.Item
								value={option.value}
								class={detailsStep1.technologyValue == option.value ? 'text-orange-400' : ''}
								id={`r-${option.value}-${i}`}
							/>
							<Tooltip.Root openDelay={100}>
								<Tooltip.Trigger class="">
									<p
										class=" m-2 inline-flex size-6 items-center justify-center rounded-full bg-gray-300 p-2 text-xs text-black"
									>
										i
									</p>
								</Tooltip.Trigger>
								<Tooltip.Content>
									<div class="bg-background">
										<Tooltip.Arrow class="border-dark-10 rounded-[2px] border-l border-t" />
									</div>
									<div
										class="border-dark-10 max-w-md flex items-center justify-center rounded-lg  border bg-background p-3 text-sm shadow-popover outline-none"
									>
									{option.tooltipText}
								</div>
								</Tooltip.Content>
							</Tooltip.Root>
						</div>
					{/each}
					<RadioGroup.Input name="spacing" />
				</RadioGroup.Root>
			</div>

			<div class="my-8 {detailsStep1.technologyValue === 'solar-off-grid' ? 'hidden' : ''}">
				<Label for="metering-type" class="my-2">Metering Type</Label>
				<RadioGroup.Root
					id="metering-type"
					value={detailsStep1.meteringTypeValue}
					class="flex items-center justify-between space-x-2"
					onValueChange={(e) => {
						detailsStep1.meteringTypeValue = e;
					}}
				>
					{#each meteringType as option, i}
						<div
							class="flex w-full items-center space-x-6 rounded-lg border-2 {detailsStep1.meteringTypeValue ==
							option.value
								? 'border-orange-400'
								: 'border-gray-600'} p-4"
						>
							<option.icon
								class="size-6 {detailsStep1.meteringTypeValue == option.value
									? 'text-orange-400'
									: ''}"
							/>
							<Label class="flex grow cursor-pointer text-gray-800" for={`r-${option.value}-${i}`}
								>{option.name}</Label
							>
							<RadioGroup.Item
								value={option.value}
								class={detailsStep1.meteringTypeValue == option.value ? 'text-orange-400' : ''}
								id={`r-${option.value}-${i}`}
							/>
							<Tooltip.Root openDelay={100}>
								<Tooltip.Trigger class="">
									<p
										class=" m-2 inline-flex size-6 items-center justify-center rounded-full bg-gray-300 p-2 text-xs text-black"
									>
										i
									</p>
								</Tooltip.Trigger>
								<Tooltip.Content>
									<div class="bg-background">
										<Tooltip.Arrow class="border-dark-10 rounded-[2px] border-l border-t" />
									</div>
									<div
										class="border-dark-10 max-w-md flex items-center justify-center rounded-lg  border bg-background p-3 text-sm shadow-popover outline-none"
									>
									{option.tooltipText}
								</div>
								</Tooltip.Content>
							</Tooltip.Root>
						</div>
					{/each}
					<RadioGroup.Input name="spacing" />

				</RadioGroup.Root>
			</div>
		</div>
	{:else if currentStep == 2}
		<section class="my-8">
			<div class="my-8 max-w-60 space-x-4">
				<CustomInput
					bind:value={details.sanctionedLoad}
					label="Sanctioned Load"
					hasSuffix
					placeholder="000"
				/>
			</div>
			<div class="w-1/2 space-y-8">
				<CustomInput bind:value={details.ebNumber} label="EB Number" placeholder="0000000000" />
				<CustomInput
					bind:value={details.ebRegNumber}
					label="EB Registered Phone Number"
					hasPrefix
					placeholder="00000 00000"
				/>
				<CustomInput
					onUnitChange={(e) => (details.unit = e)}
					bind:value={details.terraceArea}
					label="Available Terrace Area"
					showUnits
					placeholder="000"
				/>
				<CustomDropdown
					bind:value={details.terraceTypeValue}
					label="Terrace Type"
					placeholder="Select terrace type"
					options={terraceTypes}
				/>
			</div>
		</section>
	{/if}

	<!-- <input
		type="submit"
		class="cursor-pointer rounded-full bg-blue-300 p-4 px-8 text-lg font-medium tracking-tight text-black"
		value="Next"
	/> -->
<div class="flex space-x-4">
	
		<button on:click={prevStep} type="button" class="flex group/calc max-w-md items-center rounded-lg bg-white border-2 hover:bg-gray-200 p-3 px-4 shadow-soft">
			<div
				class="flex cursor-pointer items-center  transition-all duration-100 justify-center rounded-md bg-white p-1 text-black"
			>
				<ChevronRightIcon class="size-5 font-semibold rotate-180"/>
			</div>
			<p class="mx-6 grow tracking-tight text-lg">Back</p>
		</button>
		<button type="submit" class="flex group/calc max-w-md items-center rounded-lg bg-orange-400 hover:bg-orange-500 p-3 px-4 shadow-soft">
			<p class="mx-6 grow tracking-tight text-lg">Next</p>
			<div
				class="flex cursor-pointer items-center  transition-all duration-100 justify-center rounded-md bg-white p-1 text-black"
			>
				<ChevronRightIcon class="size-5 font-semibold"/>
			</div>
		</button>
</div>
</form>
