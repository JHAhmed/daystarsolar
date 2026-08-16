/** TNEB region codes — the first two digits of a consumer number. Verbatim. */
export const REGIONS = [
	{
		code: '01',
		name: 'Chennai North',
		districts:
			'Thiruvotriyur, Manali, Madhavaram, Tondiyarpet, Royapuram, Thiru-Vi-Ka Nagar, Teynampet, Ambattur Zones, p/o Tiruvallur'
	},
	{
		code: '02',
		name: 'Villupuram',
		districts: 'Cuddalore, Kallakurichi, Tiruvannamalai, Villupuram'
	},
	{ code: '03', name: 'Coimbatore', districts: 'Coimbatore, Tiruppur, Nilgiris' },
	{ code: '04', name: 'Erode', districts: 'Erode, Namakkal, Salem' },
	{
		code: '05',
		name: 'Madurai',
		districts: 'Madurai, Dindigul, Ramanathapuram, Sivagangai, Theni'
	},
	{
		code: '06',
		name: 'Trichy',
		districts:
			'Ariyalur, Karur, Mayiladuthurai, Nagapattinam, Perambalur, Pudukkottai, Thanjavur, Thiruvarur, Tiruchirappalli'
	},
	{
		code: '07',
		name: 'Tirunelveli',
		districts: 'Kanniyakumari, Thoothukudi, Tirunelveli, Tenkasi, Virudhunagar'
	},
	{
		code: '08',
		name: 'Vellore',
		districts:
			'Dharmapuri, Krishnagiri, Tirupathur, Ranipet, Vellore, p/o Kanchipuram, p/o Tiruvallur'
	},
	{
		code: '09',
		name: 'Chennai South',
		districts:
			'Ambattur, Anna Nagar, Kodambakkam, Valasaravakkam, Alandur, Adyar, Perungudi, Sholinganallur, Chengalpattu, p/o Kanchipuram, p/o Tiruvallur'
	}
];

export const REGION_CODES = REGIONS.map((region) => region.code);

/** Shown while a TNEB lookup is running. Verbatim. */
export const FUN_FACTS = [
	"Solar energy is the Earth's most abundant energy resource; the sun provides more energy in an hour than the world consumes in a year.",
	'Solar panels can generate electricity using daylight, not just direct sunlight, including on cloudy days or in the shade.',
	'Solar energy prices have dropped significantly, making it cheaper than gas power in places like the U.S.',
	'The principle behind solar energy (the photovoltaic effect) was discovered nearly 200 years ago, with the first solar cell created in the 1800s.',
	'The typical energy efficiency of most commercial solar panels is between 11% and 15%.',
	'Solar energy helps reduce climate change as it generates electricity without producing emissions or pollution.',
	'Installing solar panels can increase the resale value of a home.',
	'Most solar panels are made from silicon, a semiconductor material used in photovoltaic cells.',
	'Technology is being developed to harness solar energy in space and wirelessly transmit it back to Earth.',
	"It is forecasted that solar panels could supply 25% of the world's electricity needs by the year 2050."
];

export const CONSUMER_TYPES = [
	{ value: 'domestic', label: 'Domestic' },
	{ value: 'commercial', label: 'Commercial' },
	{ value: 'industrial', label: 'Industrial' }
];
