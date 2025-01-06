<script>
	import * as Accordion from '$lib/components/ui/accordion';
	import { animate, inView, stagger, scroll } from 'motion';
	import snarkdown from 'snarkdown';

    import { animateIn } from '$lib';

	const services = [
		{
			title: 'Solar Power Plant Consultancy',
			description: `We are a solar consulting firm offering a wide range of services to help clients stay competitive. The Earth absorbs more solar energy in an hour than the world consumes annually. To harness this, we provide consulting, design, engineering, and maintenance services for solar power plants in India.

Key services include:<br>  

- **DPR Preparation** 
- **Solar Design** 
- **Consulting Engineering** 
- **Solar Power Consulting**`
		},
		{
			title: 'Engineering Procurement & Construction(EPC)',
			description: `Engineering, Procurement, and Construction (EPC) is a key contracting model in the construction industry. An EPC contractor manages everything from design and procurement to construction, commissioning, and handover to the owner. In solar projects, this approach ensures seamless execution, leveraging top-quality components and cutting-edge solutions handled by skilled professionals.
<br>  
We specialize in maximizing the energy potential of rooftop spaces, offering complete turnkey services. From feasibility studies and engineering to procurement, installation, and commissioning, we ensure your system is up and running efficiently and quickly.

`
		},
		{
			title: 'Solar Turnkey Solutions',
			description: `A turnkey solution is a complete, ready-to-implement system designed to integrate seamlessly into your business. Our Turnkey Solar PV Solutions provide adaptable, low-maintenance solar energy systems tailored to each project's needs, from stand-alone kits for remote sites to hybrid systems.
<br>  
We offer proven expertise in on- and off-grid installations, handling everything from concept to commissioning and lifetime operation and maintenance. Our services include real-time monitoring, performance alerts, and web-based data access. Additionally, we assist with government approvals, applications, and documentation, all while adhering to strict safety and environmental regulations.`
		},
		{
			title: 'Leading Manufacturing Distribution Boxes',
			description: `The Array Junction Box, also known as the Direct Current Distribution Box, is a key component of electrical systems. It divides power into secondary circuits, each protected by a circuit breaker to prevent damage. As a trusted name in the industry, we specialize in manufacturing, supplying, and trading high-quality distribution boxes known for their easy installation and reliability.
<br>  
For load-side protection during power failures, the AC Distribution Box (ACDB) provides surge protection and safeguards sensitive electronic equipment. It includes breakers, isolators, and monitoring tools for current and voltage, ensuring optimal performance and flexible operation of various loads, such as home, office, or streetlights.
<br>  
In larger solar PV power plants with multiple inverters, ACDBs are replaced by AC Combiner Boxes (ACCBs). ACCBs feature one MCCB per inverter and a master MCCB for outgoing power, offering all the functionalities of an ACDB with enhanced load management.`
		},
		{
			title: 'Global Trading',
			description: `International trade challenges in the renewable energy technology sector were relatively rare until mid-2010. However, the sector's rapid evolution, growing scale, and increasing market value have made it potentially vulnerable to high-profile WTO disputes. This section examines key cases involving the wind and solar industries, analyzing the context behind each dispute and exploring the interconnections between various cases. To facilitate cross-case comparison, the discussion is organized by dispute type rather than by country or individual case.`
		},
		{
			title: 'Operation & Maintenance',
			description: `Operation & Maintenance (O&M) is essential for maximizing a solar power system's generation capacity. Uninterrupted solar power delivery maintains a steady stream of economic value from each kilowatt-hour produced, and proper maintenance is crucial for ensuring optimal performance while minimizing downtime risks. A well-maintained solar installation can perform 10-30% better than a poorly maintained one. However, installation is just the beginning—without proper O&M, system components may lose their warranty coverage.
A comprehensive maintenance contract should include these essential services:
<br>  
- **Regular Site Inspections**: *Maintenance technicians should conduct on-site inspections to verify that the installation is meeting promised power production levels.* <br>  
- **Array Cleaning**: *Professional cleaning services can increase annual solar energy production by 5-10%, particularly in regions with dry seasons.* <br>  
- **Electrical System Inspection**: *Qualified technicians should perform thorough electrical system checks and make necessary adjustments to ensure proper performance.* <br>  
- **Solar Inverter Maintenance**: *Preventative maintenance and regular inspection of solar inverters should be conducted to maintain system efficiency.*`
		},
		{
			title: 'Research & Development',
			description: `The Photovoltaics (PV) team supports research and development initiatives focused on lowering manufacturing costs, increasing efficiency and performance, and improving reliability of PV technologies. These efforts aim to promote the widespread adoption of electricity produced directly from sunlight.
<br>  
				The Future of Solar Energy study focuses on two primary solar energy conversion technologies: photovoltaics (PV) and concentrated solar power (CSP, also known as solar thermal). The analysis examines these technologies in both their current state and potential future forms. Given that energy supply facilities typically operate for several decades, these two technologies will dominate solar power generation through 2050, which serves as the study's temporal limit.`
		},
		{
			title: 'Solar Audit & Liaisoning Works',
			description: `**Solar Audit Objectives:** <br>  

Determine required solar power capacity\n
Meet documentation requirements for tax credits, rebates, and loans\n
Lower monthly utility bills by identifying and eliminating inefficient energy consumption\n  <br>  

**Liaison Services:**
For on-grid systems, Daystar Solar manages all aspects of Electric Board (EB) department coordination and obtains necessary approvals for solar rooftop system commissioning. The company's dedicated government liaison team oversees the entire process until the first accurate post-commissioning bill is generated.
EB department approval is mandatory as they must conduct a feasibility study to assess: <br>  

*Feeder line capacity* \n
*Transformer capacity* \n
*Sanctioned load* \n
*Other technical requirements* \n
<br>  
Daystar Solar provides customers with clear guidance on the approval procedure and required documentation for submission to their state EB department.
				
				`
		}
	];

function truncateText(text, maxLength = 40) {
		if (text.length > maxLength) {
			return text.slice(0, maxLength) + '...';
		}
		return text;
	}
</script>

<div class="mx-auto max-w-7xl p-4 text-left">
	<h2
		use:animateIn
		class="mt-8 text-left text-3xl font-semibold tracking-tighter opacity-0 md:text-5xl"
	>
		Our Services
	</h2>
	<p
		use:animateIn
		class="my-4 text-left text-xl font-normal tracking-tighter opacity-0 md:text-3xl"
	>
		What we offer.
	</p>

	<div class="my-12 grid grid-cols-2 gap-4">
		{#each services as item, i}
			<div use:animateIn={{ delay: i / 5, blur: 8, y: 20, amount: 0.1 }} class="flex opacity-0">
				<Accordion.Root class="flex w-full p-2 hover:bg-gray-50">
					<Accordion.Item class="w-full" value="item-1">
						<Accordion.Trigger
							class="w-full text-left text-lg font-semibold tracking-tight md:text-2xl [&[data-state=open]>p]:opacity-0 "
						>
							{item.title}
							<!-- <h2 class=""></h2> -->
							<!-- <div class="grow"></div> -->
							<p class="mx-4 mr-8 text-sm font-light text-gray-600 transition-all duration-100">
								{@html snarkdown(truncateText(item.description))}
							</p>
						</Accordion.Trigger>
						<Accordion.Content>
							<div class="flex">
								<p class="md:text-md py-2 text-sm text-gray-600">
									{@html snarkdown(item.description)}
								</p>
							</div>
						</Accordion.Content>
					</Accordion.Item>
				</Accordion.Root>
			</div>
		{/each}
	</div>
</div>