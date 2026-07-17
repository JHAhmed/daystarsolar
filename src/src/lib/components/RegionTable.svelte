<script>
	const regions = [
		{
			code: '01',
			name: 'Chennai North',
			districts:
				'Thiruvotriyur, Manali, Madhavaram, Tondiyarpet, Royapuram, Thiru-Vi-Ka Nagar, Teynampet, Ambattur Zones, p/o Tiruvallur',
		},
		{
			code: '02',
			name: 'Villupuram',
			districts: 'Cuddalore, Kallakurichi, Tiruvannamalai, Villupuram',
		},
		{
			code: '03',
			name: 'Coimbatore',
			districts: 'Coimbatore, Tiruppur, Nilgiris',
		},
		{
			code: '04',
			name: 'Erode',
			districts: 'Erode, Namakkal, Salem',
		},
		{
			code: '05',
			name: 'Madurai',
			districts: 'Madurai, Dindigul, Ramanathapuram, Sivagangai, Theni',
		},
		{
			code: '06',
			name: 'Trichy',
			districts:
				'Ariyalur, Karur, Mayiladuthurai, Nagapattinam, Perambalur, Pudukkottai, Thanjavur, Thiruvarur, Tiruchirappalli',
		},
		{
			code: '07',
			name: 'Tirunelveli',
			districts: 'Kanniyakumari, Thoothukudi, Tirunelveli, Tenkasi, Virudhunagar',
		},
		{
			code: '08',
			name: 'Vellore',
			districts:
				'Dharmapuri, Krishnagiri, Tirupathur, Ranipet, Vellore, p/o Kanchipuram, p/o Tiruvallur',
		},
		{
			code: '09',
			name: 'Chennai South',
			districts:
				'Ambattur, Anna Nagar, Kodambakkam, Valasaravakkam, Alandur, Adyar, Perungudi, Sholinganallur, Chengalpattu, p/o Kanchipuram, p/o Tiruvallur',
		}
	];
</script>

<div class="flex items-center justify-center">
	<table
		class="max-w-5xl  border-collapse bg-white text-left text-xs md:text-sm text-gray-800 mb-16"
	>
		<thead class="bg-gray-100 font-semibold uppercase">
			<tr>
				<th class="border px-4 py-3">Region Code</th>
				<th class="border px-4 py-3">Region Name</th>
				<th class="border px-4 py-3">Districts / Zones Covered</th>
			</tr>
		</thead>
		<tbody>
			{#each regions as region}
				<tr class="transition hover:bg-gray-50">
					<td class="border px-2 md:px-4 py-1 md:py-3 font-medium">{region.code}</td>
					<td class="border px-2 md:px-4 py-1 md:py-3">{region.name}</td>
					<td class="border px-2 md:px-4 py-1 md:py-3">{region.districts}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

