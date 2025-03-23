<script>
	import { ArrowIcon } from '$icons';

	export let title = 'Marina Mall';
	export let summary =
		'A short description on the project. Location, amount of KWh, and such maybe.';
	export let image = '/placeholder-image.jpg';
	export let slug = '/projects/marina-mall';
	export let id = '';
</script>

<div class="flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-gray-100 md:flex-row">
	<div class="flex flex-col justify-center p-8 md:w-1/2 space-y-8">
		<h2 class="text-4xl font-normal tracking-tighter">{title}</h2>

		<p class="text-gray-700">{summary}</p>

		<div>
			<a href="/projects/{slug}?id={id}" class="inline-flex items-center rounded-lg bg-white p-3">
				<span class="mr-6 ml-2 tracking-tighter">View More</span>
				<span class="flex items-center justify-center rounded-lg bg-orange-400 p-2 drop-shadow-md">
					<ArrowIcon className="-rotate-90 size-4 text-white" strokeWidth=2/>
				</span> 
			</a>
		</div>
	</div>

	<!-- Image Section -->
	<div class="md:w-1/2 p-4">
		<img src={image} alt={title} class="h-full w-full object-cover rounded-lg" />
	</div>
</div>
