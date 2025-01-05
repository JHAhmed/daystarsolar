<script>
    let products = [
        {
            name: 'Solar Distribution Boxes',
            link: '/shop/solar-distribution-boxes',
        },
        {
            name: 'Solar Street Lights',
            link: '/shop/solar-street-lights',
        },
        {
            name: 'Solar Panels',
            link: '/shop/solar-panels',
        },
        
    ]
</script>

<div class="mx-auto max-w-7xl px-4 py-12">
    <div class="mb-16 text-center">
        <h1 class="mb-4 text-5xl font-medium text-orange-300 md:text-6xl">Shop</h1>
        <p class="uppercase tracking-wider text-gray-500">Our Products</p>
    </div>

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-3">
        {#each products as product}
            <a href={product.link} class="flex flex-col items-center justify-center rounded-2xl border-2 border-teal-200 bg-gray-50/50 p-6 transition-colors hover:border-teal-300 motion-preset-focus motion-duration-700 motion-delay-[100ms]">
                <h3 class="mb-4 font-medium">{product.name}</h3>
            </a>
        {/each}
    </div>
</div>