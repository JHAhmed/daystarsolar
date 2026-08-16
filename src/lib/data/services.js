/**
 * Service descriptions for /services, carried over verbatim.
 *
 * These are hand-authored HTML strings, exactly as they were on the old site,
 * rendered through the accordion's `html` mode. Nothing here is user-supplied
 * and nothing reaches this file from a request, so the markup is trusted.
 */

export const SERVICES = [
	{
		title: 'Solar Power Plant Consultancy',
		description: `
			<p>We are a solar consulting firm offering a wide range of services to help clients stay competitive.
			The Earth absorbs more solar energy in an hour than the world consumes annually. To harness this,
			we provide consulting, design, engineering, and maintenance services for solar power plants in India.</p>
			<p>Key services include:</p>
			<ul>
				<li><strong>DPR Preparation</strong></li>
				<li><strong>Solar Design</strong></li>
				<li><strong>Consulting Engineering</strong></li>
				<li><strong>Solar Power Consulting</strong></li>
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
			<p>For load-side protection during power failures, the AC Distribution Box (ACDB) provides surge protection and safeguards
			sensitive electronic equipment. It includes breakers, isolators, and monitoring tools for current and voltage, ensuring
			optimal performance and flexible operation of various loads, such as home, office, or streetlights.</p>
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
			<p>This section examines key cases involving the wind and solar industries, analyzing the context behind each dispute and exploring
			the interconnections between various cases. To facilitate cross-case comparison, the discussion is organized by dispute type
			rather than by country or individual case.</p>
		`
	},
	{
		title: 'Operation & Maintenance',
		description: `
			<p>Operation &amp; Maintenance (O&amp;M) is essential for maximizing a solar power system's generation capacity.
			Uninterrupted solar power delivery maintains a steady stream of economic value from each kilowatt-hour produced,
			and proper maintenance is crucial for ensuring optimal performance while minimizing downtime risks.</p>
			<p>A well-maintained solar installation can perform 10-30% better than a poorly maintained one.
			However, installation is just the beginning—without proper O&amp;M, system components may lose their warranty coverage.</p>
			<p>A comprehensive maintenance contract should include these essential services:</p>
			<ul>
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
			<p>The <strong>Future of Solar Energy</strong> study focuses on two primary solar energy conversion technologies:
			photovoltaics (PV) and concentrated solar power (CSP, also known as solar thermal).
			The analysis examines these technologies in both their current state and potential future forms.</p>
			<p>Given that energy supply facilities typically operate for several decades, these two technologies
			will dominate solar power generation through 2050, which serves as the study's temporal limit.</p>
		`
	},
	{
		title: 'Solar Audit & Liaisoning Works',
		description: `
			<p><strong>Solar Audit Objectives:</strong></p>
			<ul>
				<li>Determine required solar power capacity</li>
				<li>Meet documentation requirements for tax credits, rebates, and loans</li>
				<li>Lower monthly utility bills by identifying and eliminating inefficient energy consumption</li>
			</ul>
			<p><strong>Liaison Services:</strong></p>
			<p>For on-grid systems, Daystar Solar manages all aspects of Electric Board (EB) department coordination and obtains
			necessary approvals for solar rooftop system commissioning. The company's dedicated government liaison team oversees the
			entire process until the first accurate post-commissioning bill is generated.</p>
			<p>EB department approval is mandatory as they must conduct a feasibility study to assess:</p>
			<ul>
				<li>Feeder line capacity</li>
				<li>Transformer capacity</li>
				<li>Sanctioned load</li>
				<li>Other technical requirements</li>
			</ul>
			<p>Daystar Solar provides customers with clear guidance on the approval procedure and required documentation for submission
			to their state EB department.</p>
		`
	}
];

/** The eight-step delivery process shown lower down /services. */
export const PROCESS_STEPS = [
	{
		title: 'Customer Interaction',
		description: 'Understand pain points and offer tailored solutions to meet client needs.'
	},
	{
		title: 'Site Digitisation',
		description:
			'Conduct site visits to gather parameters for precise simulation and performance verification.'
	},
	{
		title: 'Design and Approvals',
		description:
			'Create initial designs based on site data, balancing cost and design challenges. Obtain statutory approvals and permissions within a clear timeline.'
	},
	{
		title: 'Procurement and Installation',
		description:
			'Procure materials and validate designs before starting the installation with precision and efficiency.'
	},
	{
		title: 'Testing and Commissioning',
		description:
			'Perform rigorous testing, wiring, and structural integrity checks to ensure seamless commissioning.'
	},
	{
		title: 'Handover and Training',
		description:
			'Deliver the completed plant and provide operational support during a dedicated “hand-holding” period.'
	},
	{
		title: 'Performance Monitoring',
		description:
			'Track plant performance remotely and through inspections, ensuring peak operation and maintenance schedules.'
	},
	{
		title: 'Service and Support',
		description:
			'Offer ongoing service and reliable after-sales support to keep your plant efficient for years.'
	}
];

/** The three "Why Choose Us?" cards. */
export const WHY_US = [
	{
		title: 'Installation by Project Management',
		body: 'Putting together the solar plant becomes an easy process once perfectly engineered plans are executed. Our team excels at site installations by the very nature of their vast experience in the field.',
		alt: 'Solar power plant installation project'
	},
	{
		title: 'Architectural & Engineering Design',
		body: 'Our experienced team will visit your site and give you the optimal solution for your solar plant. Engineering designs are perfected after your approval on the preliminary specifications.',
		alt: 'Solar architectural and engineering design'
	},
	{
		title: 'Turn Key Projects',
		body: 'Our main focus and the best for our customers is to let us be the single point of contact for a turn key solution. Just give us the responsibility and enjoy a fully customized and high quality power plant.',
		alt: 'Turnkey solar power plant project'
	}
];
