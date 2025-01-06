<script>
	import { animate, inView } from 'motion';
	import { ChevronIcon, ArrowIcon } from '$icons';
    import { CTABG } from '$lib';
	import { CTA } from '$components';

	function animateIn(
		element,
		args = { duration: 0.5, delay: 0.4, scale: 1, x: 0, y: 10, blur: 0, amount: 0.6 }
	) {
		inView(
			element,
			() => {
				const animation = animate(
					element,
					{
						opacity: 1,
						scale: [args.scale, 1],
						x: [args.x, 0],
						y: [args.y, 0],
						filter: [`blur(${args.blur}px)`, 'blur(0px)'] // Add blur animation
					},
					{
						duration: args.duration,
						delay: args.delay
					}
				);
			},
			{ amount: args.amount }
		);
	}
</script>

<div class="mx-4">
    <div
        use:animateIn
        class="group/card relative md:mx-auto my-16 flex w-full md:max-w-7xl flex-col space-y-12 rounded-xl bg-gray-50 p-6 md:p-12 opacity-0 clip"
    >
        <!-- <div
            class="absolute left-0 top-0 h-full w-full scale-0 rounded-full z- bg-white opacity-0 transition-all duration-100 delay-75 group-hover/card:scale-100 group-hover/card:rounded-xl group-hover/card:opacity-100"
        ></div> -->

        <div
            class="absolute right-0 top-0 h-full w-full img-clip rounded-xl"
        >
            <img src={CTABG} class="object-none  absolute right-0 z-40 img-clip rounded-xl opacity-60 md:opacity-100" alt="">
        </div>
    
        <div class="flex flex-col space-y-2 z-20 ">
            <h2 class="text-3xl md:text-6xl font-semibold tracking-tighter text-gray-800">
                Still have <span class="text-orange-300">questions</span>?
            </h2>
            <p class="text-xl md:text-2xl font-normal tracking-tighter text-gray-800">Get in touch.</p>
        </div>
    
        <div class="flex space-x-2 md:space-x-8 z-20">
            <a href="/contact" class="flex w-fit items-center group/button gap-2 rounded-full hover:bg-orange-200 bg-orange-100 transition-all duration-100 p-2 md:p-4 pl-4 md:pl-8">
                <p class="text-md md:text-lg font-medium  tracking-tighter">Contact Us</p>
                <div
                    class="flex ml-4 shadow-sm transition-all duration-100 group-hover/button:ml-8 cursor-pointer items-center justify-center rounded-full bg-white p-2 text-black"
                >
                    <ArrowIcon className="size-5 stroke-2 -rotate-90" />
                </div>
            </a>
    
            <a href="/gallery" class="flex items-center gap-2 group/explore rounded-md ml-8 bg-none text-white md:text-black">
                <p class="text-md md:text-lg font-medium tracking-tighter">Explore</p>
                <div
                    class="flex cursor-pointer items-center duration-100 group-hover/explore:ml-2 justify-center rounded-md p-2 "
                >
                    <ArrowIcon className="size-5 stroke-2 -rotate-90" />
                </div>
            </a>
        </div>
    </div>
</div>

<style>
     .img-clip {
        clip-path: polygon(50% 0, 100% 0, 100% 100%, 0 100%);

    }

    /*.cta-bg {
        background-image: url(CTABG);
    } */
</style>