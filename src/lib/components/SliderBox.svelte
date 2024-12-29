<script>
    import { ChevronIcon } from '$icons';
    import { Slider } from "$lib/components/ui/slider/index.js";

    // let cost = 5;
    let cost = $state(5);
    let units = $state(50);
    let ac = $state(1);
    // let savings = 35000;

    let savings = $derived((cost * units * 10) + ac * 3000)

    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    function onSliderChange(e, value) {

        if (value === "cost") {
            cost = e;
        } else if (value === "units") {
            units = e;
        } else if (value === "ac") {
            ac = e;
        }

        console.log(savings)
        // savings = (cost * units) + ac * 5000;
    }

</script>
 
<div class="bg-orange-100 w-full grid grid-cols-2 rounded-xl p-16 my-32">

    <div class="w-full flex flex-col space-y-16 items-left justify-center">

        <div class="">
            <p class="text-lg font-medium">Electricty Cost Per kWh</p>
            <div class="flex space-x-2 my-2">
                <p class="text-black font-medium text-sm">₹1<span class="text-black/70">/kWh</span></p>
                <Slider value={[5]} min={1} max={10} step={1} class="max-w-[70%]"     onValueChange={(e) => {onSliderChange(e, "cost")}} >
            
                </Slider>
                <p class="text-black font-medium text-sm">₹10<span class="text-black/70">/kWh</span></p>
            </div>
        </div>

        <div class="">
            <p class="text-lg font-medium">Units Consumed Per Month</p>
            <div class="flex space-x-2 my-2">
                <p class="text-black font-medium text-sm">50 <span class="text-black/70">kWh</span></p>
                <Slider value={[150]} min={50} max={500} step={25} class="max-w-[70%]"     onValueChange={(e) => {onSliderChange(e, "units")}} >
            
                </Slider>
                <p class="text-black font-medium text-sm">500 <span class="text-black/70">kWh</span></p>
            </div>
        </div>

        <div class="">
            <p class="text-lg font-medium">No. Of AC Units</p>
            <div class="flex space-x-2 my-2">
                <p class="text-black font-medium text-sm">1 <span class="text-black/70">AC</span></p>
                <Slider value={[3]} min={0} max={10} step={1} class="max-w-[70%]"     onValueChange={(e) => {onSliderChange(e, "ac")}} >
            
                </Slider>
                <p class="text-black font-medium text-sm">10 <span class="text-black/70">AC</span></p>
            </div>
        </div>

    </div>

    <div class="flex flex-col items-center justify-center w-full space-y-4">

        <div class="flex grow flex-col items-center justify-center space-y-4">
            <p class="uppercase font-light text-md tracking-[0.25em]">Annual Savings</p>
            <h1 class="font-semibold text-8xl"><span class="font-medium text-black/80">₹</span>{formatNumber(savings)}</h1>
        </div>

        <div class="flex items-center bg-white rounded-lg max-w-md p-2">
            <p class="tracking-tight grow mx-8">Advanced Calculator</p>
            <button
                class="bg-black text-white rounded-md p-2 flex items-center justify-center cursor-pointer">
                <ChevronIcon />
            </button>
        </div>

    </div>

</div>