<script>
	import * as Accordion from '$lib/components/ui/accordion';
	import { animate, inView, stagger, scroll } from 'motion';
	import { animateIn } from '$lib';

	const services = [
		{
			title: 'Solar Power Plant Consultancy',
			description: `
            <p>We are a solar consulting firm offering a wide range of services to help clients stay competitive. 
            The Earth absorbs more solar energy in an hour than the world consumes annually. To harness this, 
            we provide consulting, design, engineering, and maintenance services for solar power plants in India.</p>
            <p>Key services include:</p>
			<br/>
            <ul>
                <li class="ml-4 my-1"><strong>- DPR Preparation</strong></li>
                <li class="ml-4 my-1"><strong>- Solar Design</strong></li>
                <li class="ml-4 my-1"><strong>- Consulting Engineering</strong></li>
                <li class="ml-4 my-1"><strong>- Solar Power Consulting</strong></li>
            </ul>
        `
		},
		{
			title: 'Engineering Procurement & Construction(EPC)',
			description: `
            <p>Engineering, Procurement, and Construction (EPC) is a key contracting model in the construction 
            industry. An EPC contractor manages everything from design and procurement to construction, 
            commissioning, and handover to the owner. In solar projects, this approach ensures seamless execution, 
            leveraging top-quality components and cutting-edge solutions handled by skilled professionals.</p>
			<br/>
            <p>We specialize in maximizing the energy potential of rooftop spaces, offering complete turnkey services. 
            From feasibility studies and engineering to procurement, installation, and commissioning, we ensure 
            your system is up and running efficiently and quickly.</p>
        `
		},
		{
			title: 'Solar Turnkey Solutions',
			description: `
            <p>A turnkey solution is a complete, ready-to-implement system designed to integrate seamlessly into your business. 
            Our Turnkey Solar PV Solutions provide adaptable, low-maintenance solar energy systems tailored to each project's needs, 
            from stand-alone kits for remote sites to hybrid systems.</p>
			<br/>
            <p>We offer proven expertise in on- and off-grid installations, handling everything from concept to commissioning 
            and lifetime operation and maintenance. Our services include real-time monitoring, performance alerts, 
            and web-based data access. Additionally, we assist with government approvals, applications, and documentation, 
            all while adhering to strict safety and environmental regulations.</p>
        `
		},
		{
			title: 'Leading Manufacturing Distribution Boxes',
			description: `
            <p>The Array Junction Box, also known as the Direct Current Distribution Box, is a key component of electrical systems. 
            It divides power into secondary circuits, each protected by a circuit breaker to prevent damage. 
            As a trusted name in the industry, we specialize in manufacturing, supplying, and trading high-quality 
            distribution boxes known for their easy installation and reliability.</p>
			<br/>
            <p>For load-side protection during power failures, the AC Distribution Box (ACDB) provides surge protection and safeguards 
            sensitive electronic equipment. It includes breakers, isolators, and monitoring tools for current and voltage, ensuring 
            optimal performance and flexible operation of various loads, such as home, office, or streetlights.</p>
			<br/>
            <p>In larger solar PV power plants with multiple inverters, ACDBs are replaced by AC Combiner Boxes (ACCBs). 
            ACCBs feature one MCCB per inverter and a master MCCB for outgoing power, 
            offering all the functionalities of an ACDB with enhanced load management.</p>
        `
		},
		{
			title: 'Global Trading',
			description: `
            <p>International trade challenges in the renewable energy technology sector were relatively rare until mid-2010. However, 
            the sector's rapid evolution, growing scale, and increasing market value have made it potentially vulnerable to 
            high-profile WTO disputes.</p>
			<br/>
            <p>This section examines key cases involving the wind and solar industries, analyzing the context behind each dispute and exploring 
            the interconnections between various cases. To facilitate cross-case comparison, the discussion is organized by dispute type 
            rather than by country or individual case.</p>
        `
		},
		{
			title: 'Operation & Maintenance',
			description: `
            <p>Operation & Maintenance (O&M) is essential for maximizing a solar power system's generation capacity. 
            Uninterrupted solar power delivery maintains a steady stream of economic value from each kilowatt-hour produced, 
            and proper maintenance is crucial for ensuring optimal performance while minimizing downtime risks.</p>
            <p>A well-maintained solar installation can perform 10-30% better than a poorly maintained one. 
            However, installation is just the beginning—without proper O&M, system components may lose their warranty coverage.</p>
			<br/>
            <p>A comprehensive maintenance contract should include these essential services:</p>
			<br/>
            <ul class="space-y-2">
                <li><strong>Regular Site Inspections</strong>: <em>Maintenance technicians should conduct on-site inspections to verify that the installation is meeting promised power production levels.</em></li>
                <li><strong>Array Cleaning</strong>: <em>Professional cleaning services can increase annual solar energy production by 5-10%, particularly in regions with dry seasons.</em></li>
                <li><strong>Electrical System Inspection</strong>: <em>Qualified technicians should perform thorough electrical system checks and make necessary adjustments to ensure proper performance.</em></li>
                <li><strong>Solar Inverter Maintenance</strong>: <em>Preventative maintenance and regular inspection of solar inverters should be conducted to maintain system efficiency.</em></li>
            </ul>
        `
		},
		{
			title: 'Research & Development',
			description: `
            <p>The Photovoltaics (PV) team supports research and development initiatives focused on lowering manufacturing costs, 
            increasing efficiency and performance, and improving reliability of PV technologies. These efforts aim to promote 
            the widespread adoption of electricity produced directly from sunlight.</p>
			<br/>
            <p>The <strong>Future of Solar Energy</strong> study focuses on two primary solar energy conversion technologies: 
            photovoltaics (PV) and concentrated solar power (CSP, also known as solar thermal). 
            The analysis examines these technologies in both their current state and potential future forms.</p>
            <br/>
			<p>Given that energy supply facilities typically operate for several decades, these two technologies 
            will dominate solar power generation through 2050, which serves as the study's temporal limit.</p>
        `
		},
		{
			title: 'Solar Audit & Liaisoning Works',
			description: `
            <p><strong>Solar Audit Objectives:</strong></p>
			<br/>
            <ul class="space-y-2">
                <li>-Determine required solar power capacity</li>
                <li>-Meet documentation requirements for tax credits, rebates, and loans</li>
                <li>-Lower monthly utility bills by identifying and eliminating inefficient energy consumption</li>
            </ul>
			<br/>
            <p><strong>Liaison Services:</strong></p>
			<br/>
            <p>For on-grid systems, Daystar Solar manages all aspects of Electric Board (EB) department coordination and obtains 
            necessary approvals for solar rooftop system commissioning. The company's dedicated government liaison team oversees the 
            entire process until the first accurate post-commissioning bill is generated.</p>
            <p>EB department approval is mandatory as they must conduct a feasibility study to assess:</p>
			<br/>
            <ul class="space-y-2">
                <li>-Feeder line capacity</li>
                <li>-Transformer capacity</li>
                <li>-Sanctioned load</li>
                <li>-Other technical requirements</li>
            </ul>
			<br/>
            <p>Daystar Solar provides customers with clear guidance on the approval procedure and required documentation for submission 
            to their state EB department.</p>
        `
		}
	];

	function truncateText(text, maxLength = 40) {
		return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
	}
</script>

<div class="mx-auto max-w-7xl p-4 text-left">
	<h1  class="mt-8 text-3xl font-semibold tracking-tight md:text-5xl">
		Our Services
	</h1>
	<p  class="my-4 text-xl font-normal tracking-tight md:text-3xl">
		What we offer
	</p>

	<section class="my-12 grid grid-cols-1 gap-6 md:grid-cols-2">
		{#each services as { title, description }, i}
			<article use:animateIn={{ delay: i / 5, blur: 8, y: 20, amount: 0.1 }} class="opacity-0">
				<Accordion.Root class="w-full p-4 bg-white rounded-md">
					<Accordion.Item class="w-full" value={`item-${i}`}>
						<Accordion.Trigger class="w-full text-left text-lg font-semibold tracking-tight md:text-2xl">
							{title}
						</Accordion.Trigger>
						<Accordion.Content>
							<div class="py-2 text-sm text-gray-600 md:text-base">
								{@html description}
							</div>
						</Accordion.Content>
					</Accordion.Item>
				</Accordion.Root>
			</article>
		{/each}
	</section>
</div>
