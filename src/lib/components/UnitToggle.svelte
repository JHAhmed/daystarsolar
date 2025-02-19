<script>
	import * as Tabs from '$lib/components/ui/tabs';
	let {
        text = 'Billing Cycle',
        vertical = false,
		required = true,
        triggers = {'sqmt': 'Sq. M', 'sqft': 'Sq. Ft' },
		onUnitChange = (e) => {},
        className = "w-[400px]",
		value = $bindable()
	} = $props();
</script>

<div class=" w-full { vertical ? '' : 'flex-col'}">
    <p class="text-lg font-medium my-2">{text}</p>
    <Tabs.Root
        onValueChange={(e) => {
            onUnitChange(e);
        }}
        value={Object.keys(triggers)[0]}
        class={className}
    >
        <Tabs.List class="">
            {#each Object.keys(triggers) as trigger}
                <Tabs.Trigger class="h-full p-6 rounded-lg text-md" value={trigger}>{triggers[trigger]}</Tabs.Trigger>
            {/each}
        </Tabs.List>
    </Tabs.Root>
</div>
