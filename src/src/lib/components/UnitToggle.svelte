<script>
	import * as Tabs from '$lib/components/ui/tabs';
    import { Label } from '$lib/components/ui/label/index.js';

	let {
        vertical = false,
        label = "Connection type",
        triggers = {'domestic': 'Domestic', 'commercial': 'Commercial' },
		onToggle = (e) => {},
        className = "w-full md:w-[400px]", // Responsive width
		value = $bindable()
	} = $props();
</script>

<div class="w-full {vertical ? '' : 'flex flex-col'}">
    <Label for="custom-toggle" class="my-1 text-xs md:text-sm">{label}</Label>
    <div class="" name="custom-toggle">
        <Tabs.Root
            onValueChange={(e) => {
                onToggle(e);
            }}
            value={Object.keys(triggers)[0]}
            class={className}
        >
            <Tabs.List class="flex rounded-lg bg-gray-200"> 
                {#each Object.keys(triggers) as trigger}
                    <Tabs.Trigger class="flex-1 h-full p-2 md:p-6 rounded-lg text-sm" value={trigger}>{triggers[trigger]}</Tabs.Trigger> 
                {/each}
            </Tabs.List>
        </Tabs.Root>
    </div>
</div>
