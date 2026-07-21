<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    import { ArrowIcon, StarIcon, GoogleIcon } from '$icons';
    import { Calculator, HeroButton, CTA, ScrollingReviews, Carousel } from '$components';

    import { sampleImage1, animateIn } from '$lib';
    import {
        landingImage1,
        landingImage2,
        landingImage3,
        landingImage4,
        landingImage5,
        quotationMark
    } from '$lib';

    import { animate, inView } from 'motion';
    import { goto } from '$app/navigation';

    let calculator;

    const usps = [
        '₹78k Subsidy Support',
        'Free Site Inspection',
        '0% EMI Options',
        '25-Year Panel Warranty'
    ];

    const stats = [
        { number: '1000', label: 'Customers Served' },
        { number: '13k', label: 'Megawatt Hours Generated' },
        { number: '14', label: 'Years Experience' }
    ];
    const reviews = [
        {
            name: 'Abdul Gani',
            text: 'I had a great experience with Daystar for my home solar installation. The team was professional, the process was smooth, and the system is working perfectly. Highly recommend them for both home and commercial solar solutions',
            rating: 5,
            link: 'https://maps.app.goo.gl/FMAS3THVZiBGdDpy7'
        },
        {
            name: 'Ramesh Kothandapany',
            text: 'I have installed 3.2 kv capacity solar panels through daystar solar team. They have provided good support in inspecting, recommending appropriate installation design, completed the core installation process in 2 to 3 days, taken care of end to end process to go via surya ghar scheme.',
            rating: 5,
            link: 'https://maps.app.goo.gl/Y7d3TS5oRV3grdsD9'
        },
        {
            name: 'Bhuvaneshwar C',
            text: 'I had a wonderful experience with Daystar for my solar installation at home. The staff was highly professional, the process was effortless, and the system is running smoothly. I definitely recommend them for both residential and commercial solar needs.',
            rating: 5,
            link: 'https://maps.app.goo.gl/j3aucsbyhs9GDVxNA'
        }
    ];
    function scrollToView() {
        if (browser) {
            calculator.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const imageModules = import.meta.glob('/src/lib/images/hero-images/*.webp', {
        eager: true,
        query: '?url', // Use query instead of as
        import: 'default' // Import the default export (the URL string)
    });
    const heroProjects = Object.entries(imageModules).map(([path, src]) => {
        const pathSegments = path.split('/');
        let text = pathSegments.length > 2 ? pathSegments[pathSegments.length - 1] : null;

        const projectSegments = path.split('/');
        let href = projectSegments.length > 2 ? projectSegments[projectSegments.length - 1] : null;

        text = text
            .split('.')[0]
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (c) => c.toUpperCase());
        href = '/projects/' + href.split('.')[0];

        return { src, text, href };
    });
    let vid;

    function toggle() {
        vid.paused ? vid.play() : vid.pause();
    }

    // FAQ Data for SEO content expansion
    const faqs = [
        {
            question: 'How much does a 5kW solar system cost in Chennai?',
            answer:
                'The cost depends on the panels (monocrystalline vs polycrystalline) and inverter brand. Generally, a 5kW system ranges from ₹2.5L to ₹3.5L. Contact us for a precise quote including subsidy calculations.'
        },
        {
            question: 'Is government subsidy available for home solar?',
            answer:
                'Yes, under the PM Surya Ghar Muft Bijli Yojana, subsidies are available for residential rooftop solar. We handle the entire documentation process for you.'
        },
        {
            question: 'What is the warranty on Panasonic solar panels?',
            answer:
                'We offer a 25-year linear power output warranty on Panasonic solar panels, ensuring your system generates efficient power for decades.'
        }
    ];
</script>

<svelte:head>
    <title>Solar Plant Company in Chennai | Daystar Solar </title>
    <meta
        name="description"
        content= Discover Day Star Solar's solar solutions, products, projects, and services for homes, businesses, and industries.
    />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://daystarsolar.co.in/" />
    <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Daystar Solar",
            "description": "Solar power plant integrator in Chennai",
            "image": "https://daystarsolar.co.in/oghome.png",
            "url": "https://daystarsolar.co.in/",
            "priceRange": "₹₹",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "H-5, Second floor, Third avenue, Anna nagar east",
                "addressLocality": "Chennai",
                "postalCode": "600102",
                "addressCountry": "IN"
            },
            "telephone": "+91 91766 68617",
            "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                "opens": "09:30",
                "closes": "18:30"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "120"
            },
            "review": [
                {
                    "@type": "Review",
                    "author": {
                        "@type": "Person",
                        "name": "Abdul Gani"
                    },
                    "reviewBody": "I had a great experience with Daystar for my home solar installation. The team was professional, the process was smooth, and the system is working perfectly. Highly recommend them for both home and commercial solar solutions.",
                    "reviewRating": {
                        "@type": "Rating",
                        "ratingValue": "5",
                        "bestRating": "5"
                    },
                    "url": "https://maps.app.goo.gl/FMAS3THVZiBGdDpy7"
                },
                {
                    "@type": "Review",
                    "author": {
                        "@type": "Person",
                        "name": "Ramesh Kothandapany"
                    },
                    "reviewBody": "I have installed 3.2 kv capacity solar panels through Daystar Solar team. They have provided good support in inspecting, recommending appropriate installation design, completed the core installation process in 2 to 3 days, and taken care of the end to end process to go via Surya Ghar scheme.",
                    "reviewRating": {
                        "@type": "Rating",
                        "ratingValue": "5",
                        "bestRating": "5"
                    },
                    "url": "https://maps.app.goo.gl/Y7d3TS5oRV3grdsD9"
                },
                {
                    "@type": "Review",
                    "author": {
                        "@type": "Person",
                        "name": "Bhuvaneshwar C"
                    },
                    "reviewBody": "I had a wonderful experience with Daystar for my solar installation at home. The staff was highly professional, the process was effortless, and the system is running smoothly. I definitely recommend them for both residential and commercial solar needs.",
                    "reviewRating": {
                        "@type": "Rating",
                        "ratingValue": "5",
                        "bestRating": "5"
                    },
                    "url": "https://maps.app.goo.gl/j3aucsbyhs9GDVxNA"
                },
                {
                    "@type": "Review",
                    "author": {
                        "@type": "Person",
                        "name": "Sujith D"
                    },
                    "reviewBody": "Perfect in everything, especially competitive in costing. Their service is top notch. Genuine people. Actually I thought of adding solar for me and my parents, but by looking at the EB bill, they suggested to take solar only for me (generally no one does this). I was impressed by this behaviour.",
                    "reviewRating": {
                        "@type": "Rating",
                        "ratingValue": "5",
                        "bestRating": "5"
                    },
                    "url": "https://maps.app.goo.gl/jJjuFT6JXm6t5CVv7"
                },
                {
                    "@type": "Review",
                    "author": {
                        "@type": "Person",
                        "name": "Pradap"
                    },
                    "reviewBody": "I have installed a 3 kW plant from Daystar Solar and was satisfied with their technical expertise and customer support. Keep up the good work.",
                    "reviewRating": {
                        "@type": "Rating",
                        "ratingValue": "5",
                        "bestRating": "5"
                    },
                    "url": "https://maps.app.goo.gl/XuVuwXmeNbirBbXbA"
                },
                {
                    "@type": "Review",
                    "author": {
                        "@type": "Person",
                        "name": "Lokesh T M"
                    },
                    "reviewBody": "Installation of 3 kW done by them was the best in standards and I got the subsidy of 78k via PM Surya Ghar scheme. Recommending the seller.",
                    "reviewRating": {
                        "@type": "Rating",
                        "ratingValue": "5",
                        "bestRating": "5"
                    },
                    "url": "https://maps.app.goo.gl/siikLWwVQqgzgEN17"
                },
                {
                    "@type": "Review",
                    "author": {
                        "@type": "Person",
                        "name": "Venki Abi"
                    },
                    "reviewBody": "I have installed a 3.3 kVA solar panel at my home. Daystar team from the beginning provided very good service and very good support and follow up till the subsidy was credited.",
                    "reviewRating": {
                        "@type": "Rating",
                        "ratingValue": "5",
                        "bestRating": "5"
                    },
                    "url": "https://maps.app.goo.gl/95o7GHkHYEZRko9r9"
                },
                {
                    "@type": "Review",
                    "author": {
                        "@type": "Person",
                        "name": "Arumugam K"
                    },
                    "reviewBody": "Technically strong and clear communication to customers with very precise information about panels and customer needs. Great customer support, timely completion of all tasks and follow-ups with all departments for the completion. Highly recommended.",
                    "reviewRating": {
                        "@type": "Rating",
                        "ratingValue": "5",
                        "bestRating": "5"
                    },
                    "url": "https://maps.app.goo.gl/BGhJd65bqhr7abqy7"
                }
            ]
        }
    </script>

    <meta
        property="og:title"
        content="Solar Plant Company in Chennai | Daystar Solar"/>
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://daystarsolar.co.in/oghome.png" />
    <meta property="og:url" content="https://daystarsolar.co.in/" />
    <meta
        property="og:description"
        content= "The sun sends the bill, we make it free". 
    />
</svelte:head>

<section class="mx-auto px-6 py-12 md:px-16 lg:px-32">
    <div class="grid grid-cols-12 gap-8 md:gap-12 lg:gap-16">
        <div class="col-span-12 lg:col-span-5">
            <div class="mb-16">
                <h1 class="mb-6 text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
                    Solar<span class="text-orange-500">Plant</span>Company
                </h1>
                <p class="mb-8 text-lg text-gray-600">
                    Premium sustainable energy solutions for homes and businesses.
                </p>

                <div class="flex flex-col gap-3 sm:flex-row">
                    <HeroButton button={true} action={scrollToView} />
                    <HeroButton button={true} text="View in AR" alt={true} href="/ar2" />
                </div>
            </div>
            
            <div class="border-l-2 border-gray-200 pl-6">
                <h2 class="mb-3 text-sm font-medium text-gray-500">Trusted Solar Integrators</h2>
                <p class="text-sm text-gray-600 leading-relaxed">
                    Sustainable development is the creed that underpins Daystar Solar's bespoke initiatives to
                    protect the environment, strengthen communities and propel responsible growth.
                </p>
            </div>
        </div>

        <div class="col-span-12 lg:col-span-7">
            <Carousel {heroProjects} />
        </div>
    </div>

    <div class="mt-24 grid grid-cols-1 gap-8 md:grid-cols-3">
        {#each stats as stat, i}
            <div
                use:animateIn={{ y: 10, blur: 4, delay: i / 3 }}
                class="flex flex-col items-center gap-2 text-center opacity-0">
                <p class="text-5xl font-semibold md:text-6xl">
                    {stat.number}<span class="font-normal text-gray-300">+</span>
                </p>
                <p class="text-sm text-gray-500">{stat.label}</p>
            </div>
        {/each}
    </div>
</section>

<div
    class="mx-auto px-6 py-12 opacity-0 md:px-16 lg:px-32"
    use:animateIn={{ y: 25 }}
    bind:this={calculator}>
    <Calculator />
</div>

<section class="py-16">
    <div class="container mx-auto px-6 md:px-16 lg:px-32">
        <h2 class="mb-12 text-center text-2xl font-semibold tracking-tight md:text-3xl">
            Customer Testimonials
        </h2>
        <ScrollingReviews />
    </div>
</section>

<section class="py-16 md:py-24">
    <div class="container mx-auto max-w-3xl px-6 text-center">
        <p class="text-lg font-light leading-relaxed text-gray-700 md:text-xl">
            <span class="font-medium">We specialize in end-to-end solar power plant projects.</span> Since
            2012, we've been a trusted solar power integrator, partnering with Panasonic Solar for premium
            panels and using top-quality imported inverters.
            <span class="font-medium">
                Our focus on exceptional design and engineering ensures long-lasting, reliable systems.
            </span>
        </p>
    </div>
</section>

<section class="py-16">
    <div class="container mx-auto grid grid-cols-1 gap-12 px-6 md:grid-cols-2 md:px-16 lg:grid-cols-3 lg:px-32">
        <div use:animateIn={{ blur: 8, duration: 0.5, delay: 0.1 }} class="space-y-6 opacity-0">
            <h3 class="text-xl font-semibold">Comprehensive Solar Services</h3>
            <p class="text-gray-600 leading-relaxed">
                From initial consulting and innovative concept design to flawless execution and ongoing
                maintenance, we handle every aspect of your solar journey. Our bespoke solutions are tailored
                for residential villas, apartments, and commercial industries.
            </p>

            <div class="overflow-hidden rounded-lg">
                <img
                    src={landingImage1}
                    alt="Rooftop solar panel installation in Chennai by Daystar Solar"
                    class="h-[240px] w-full object-cover" />
            </div>
        </div>

        <div
            use:animateIn={{ blur: 8, duration: 0.5, delay: 0.5 }}
            class="flex flex-col items-center justify-center text-center opacity-0">
            <div class="mb-6 rounded-full bg-gray-100 p-4">
                <img src={quotationMark} class="h-4 w-4 text-gray-600" alt="quote" />
            </div>
            <h2 class="mb-8 text-2xl font-semibold md:text-3xl lg:text-4xl">
                Power your future with
                <span class="text-orange-500">solar</span> energy
            </h2>
            <div class="mb-8 rounded-full bg-gray-100 p-4">
                <img src={quotationMark} class="h-4 w-4 rotate-180 text-gray-600" alt="quote" />
            </div>
            <a href="/products" class="text-sm font-medium text-gray-600 hover:text-gray-900"
                >Explore our Solar Products &rarr;</a>
        </div>

        <div use:animateIn={{ blur: 8, duration: 0.5, delay: 0.9 }} class="space-y-6 opacity-0">
            <div class="overflow-hidden rounded-lg">
                <img
                    loading="lazy"
                    src={landingImage3}
                    alt="Commercial solar plant installation surrounded by nature"
                    class="h-[240px] w-full object-cover" />
            </div>

            <h3 class="text-xl font-semibold">Quality Components</h3>
            <p class="text-gray-600 leading-relaxed">
                We refuse to compromise on quality. By using Panasonic Solar panels and premium inverters, we
                set the industry benchmark for design and engineering, ensuring your investment pays off for
                decades.
            </p>
        </div>
    </div>
</section>

<section class="py-16">
    <div class="container mx-auto px-6 md:px-16 lg:px-32">
        <div
            use:animateIn={{ blur: 8, duration: 0.5, delay: 0.1 }}
            class="flex flex-col gap-6 rounded-lg bg-gray-50 p-8 opacity-0 md:flex-row md:items-center md:gap-12 md:p-12">
            <img
                loading="lazy"
                src={sampleImage1}
                class="hidden h-48 w-48 rounded-lg object-cover md:block"
                alt="High efficiency solar inverter system" />
            <div class="grid grid-cols-1 gap-8 md:grid-cols-4">
                <div
                    use:animateIn={{ blur: 4, delay: 0.2 }}
                    class="text-center opacity-0">
                    <p class="text-sm font-medium text-gray-700">
                        Zero pollution with high efficiency for maximum positive impact
                    </p>
                </div>
                <div
                    use:animateIn={{ blur: 4, delay: 0.5 }}
                    class="text-center opacity-0">
                    <p class="text-sm font-medium text-gray-700">
                        100% fully automatic operation in sync with all power sources
                    </p>
                </div>
                <div
                    use:animateIn={{ blur: 4, delay: 0.7 }}
                    class="text-center opacity-0">
                    <p class="text-sm font-medium text-gray-700">
                        Rugged heavy-duty design to produce power for years to come
                    </p>
                </div>
                <div
                    use:animateIn={{ blur: 4, delay: 1.4 }}
                    class="text-center opacity-0">
                    <p class="text-sm font-medium text-gray-700">
                        Built-in MPPT & battery-less system with Zero recurring costs
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="py-16">
    <div class="container mx-auto grid grid-cols-1 gap-12 px-6 md:grid-cols-2 md:px-16 lg:px-32">
        <div>
            <h2 class="mb-8 text-2xl font-semibold">Why Choose Daystar Solar In Chennai ?</h2>
            <ul class="space-y-6">
                <li class="flex items-start gap-4">
                    <span class="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-700">
                        ✓
                    </span>
                    <div>
                        <p class="font-medium">Government Subsidy Experts</p>
                        <p class="mt-1 text-sm text-gray-600">
                            We guide you through the Surya Ghar scheme to maximize your savings.
                        </p>
                    </div>
                </li>
                <li class="flex items-start gap-4">
                    <span class="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-700">
                        ✓
                    </span>
                    <div>
                        <p class="font-medium">Premium Partnerships</p>
                        <p class="mt-1 text-sm text-gray-600">
                            Authorized partners for Panasonic panels, ensuring Tier-1 quality.
                        </p>
                    </div>
                </li>
                <li class="flex items-start gap-4">
                    <span class="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-700">
                        ✓
                    </span>
                    <div>
                        <p class="font-medium">20+ Year Warranty</p>
                        <p class="mt-1 text-sm text-gray-600">
                            Peace of mind with long-term performance guarantees.
                        </p>
                    </div>
                </li>
            </ul>
            <div class="mt-8">
                <a
                    href="/projects"
                    class="inline-block rounded-md bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                    >View Our Projects</a>
            </div>
        </div>
        <div>
            <h2 class="mb-8 text-2xl font-semibold">Our 4-Step Installation Process</h2>
            <div class="space-y-6">
                <div class="flex gap-4">
                    <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-medium text-orange-600">
                        1
                    </div>
                    <div>
                        <h3 class="font-medium">Site Survey & Consultation</h3>
                        <p class="mt-1 text-sm text-gray-600">
                            We analyze your roof and energy bills to recommend the perfect KW capacity.
                        </p>
                    </div>
                </div>
                <div class="flex gap-4">
                    <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-medium text-orange-600">
                        2
                    </div>
                    <div>
                        <h3 class="font-medium">Design & Subsidy Approval</h3>
                        <p class="mt-1 text-sm text-gray-600">
                            We create the structural design and handle all TNEB/Government paperwork.
                        </p>
                    </div>
                </div>
                <div class="flex gap-4">
                    <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-medium text-orange-600">
                        3
                    </div>
                    <div>
                        <h3 class="font-medium">Installation & Commissioning</h3>
                        <p class="mt-1 text-sm text-gray-600">
                            Our expert team installs the panels, inverters, and net metering system.
                        </p>
                    </div>
                </div>
                <div class="flex gap-4">
                    <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-medium text-orange-600">
                        4
                    </div>
                    <div>
                        <h3 class="font-medium">Lifetime Support</h3>
                        <p class="mt-1 text-sm text-gray-600">
                            Remote monitoring setup and regular maintenance services.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="py-16">
    <div class="container mx-auto grid grid-cols-1 gap-6 px-6 md:grid-cols-2 md:px-16 lg:px-32">
        <div
            use:animateIn={{ blur: 8, duration: 0.5, delay: 0.1 }}
            class="relative overflow-hidden rounded-lg opacity-0">
            <img
                src={landingImage3}
                class="h-96 w-full object-cover"
                alt="High output solar panels working on a cloudy day"
                loading="lazy" />
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <p class="text-sm font-medium text-white">
                    Our panels provide maximum energy output even on cloudy days.
                </p>
            </div>
        </div>

        <div
            use:animateIn={{ blur: 8, duration: 0.5, delay: 0.3 }}
            class="relative overflow-hidden rounded-lg opacity-0">
            <img
                src={landingImage4}
                class="h-96 w-full object-cover"
                alt="Residential rooftop solar installation reducing grid dependency"
                loading="lazy" />
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <p class="text-sm font-medium text-white">
                    Our solar panels are designed to generate maximum energy output, allowing you to rely less
                    on grid power and more on renewable solar energy.
                </p>
            </div>
        </div>

        <div
            use:animateIn={{ blur: 8, duration: 0.5, delay: 0.5 }}
            class="relative overflow-hidden rounded-lg opacity-0 md:col-span-2">
            <img
                src={landingImage5}
                class="h-64 w-full object-cover md:h-80"
                alt="Durable solar panels capable of withstanding harsh weather"
                loading="lazy" />
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <p class="text-sm font-medium text-white">
                    Built to withstand the harshest weather conditions, our solar panels are incredibly
                    durable and come with a 20-year warranty.
                </p>
            </div>
        </div>
    </div>
</section>

<section class="py-16">
    <div class="container mx-auto px-6 md:px-16 lg:px-32">
        <h2 class="mb-10 text-center text-2xl font-semibold">Got Questions ?</h2>
        <div class="mx-auto max-w-3xl space-y-4">
            {#each faqs as faq}
                <div class="rounded-lg border border-gray-100 p-6">
                    <h3 class="mb-3 font-medium">{faq.question}</h3>
                    <p class="text-sm text-gray-600">{faq.answer}</p>
                </div>
            {/each}
            <div class="pt-4 text-center">
                <a href="/faq" class="text-sm font-medium text-gray-600 hover:text-gray-900">Read more FAQs &rarr;</a>
            </div>
        </div>
    </div>
</section>

<section class="py-16">
    <div class="container mx-auto px-6 md:px-16 lg:px-32">
        <video
            bind:this={vid}
            autoplay
            muted
            playsinline
            loop
            preload="metadata"
            on:click={toggle}
            poster={sampleImage1} aria-label="Daystar Solar projects showreel" title="Daystar Solar projects showreel"
            class="mx-auto h-auto w-full cursor-pointer rounded-lg object-cover">
            <source
                src="https://res.cloudinary.com/dlq8wuvji/video/upload/v1745575578/Daystar_Projects_Showreel_esvxpw.mp4"
                type="video/mp4" />
        </video>
    </div>
</section>


<section class="py-16">
    <div class="container mx-auto max-w-5xl px-6 md:px-16">
        <div class="space-y-6 text-center">
            <h2 class="text-3xl font-semibold">Complete Solar Solutions for Homes and Businesses</h2>
            <p class="mx-auto max-w-3xl text-gray-600">
                Daystar Solar provides reliable solar energy solutions for residential, commercial, and industrial
                customers across Chennai and Tamil Nadu. Our team helps you choose the right solar system based on
                your electricity consumption, available space, energy goals, and budget.
            </p>
            <p class="mx-auto max-w-3xl text-gray-600">
                From residential rooftop solar installations to large commercial and industrial solar projects, we
                manage the complete process from consultation and system design to installation, commissioning, and
                after-sales support. Our solar experts focus on safe installation, efficient system performance, and
                dependable long-term service.
            </p>
            <p class="mx-auto max-w-3xl text-gray-600">
                A professionally designed solar power system can help reduce dependence on conventional electricity,
                improve energy efficiency, and support a cleaner future. We provide practical guidance on solar
                panels, inverters, mounting structures, net metering, government subsidy assistance, and maintenance
                requirements.
            </p>
        </div>
        <div class="mt-10 grid gap-6 md:grid-cols-3">
            <div class="rounded-lg border border-gray-100 p-6">
                <h3 class="mb-3 text-lg font-medium">Residential Rooftop Solar</h3>
                <p class="text-sm text-gray-600">
                    Generate clean electricity for your home with a rooftop solar system designed around your
                    household power consumption and available roof area.
                </p>
            </div>
            <div class="rounded-lg border border-gray-100 p-6">
                <h3 class="mb-3 text-lg font-medium">Commercial Solar Systems</h3>
                <p class="text-sm text-gray-600">
                    Reduce operating costs and improve energy efficiency with scalable solar solutions for offices,
                    shops, institutions, and commercial buildings.
                </p>
            </div>
            <div class="rounded-lg border border-gray-100 p-6">
                <h3 class="mb-3 text-lg font-medium">Industrial Solar Projects</h3>
                <p class="text-sm text-gray-600">
                    Power large facilities with engineered solar projects designed for high energy demand, reliable
                    performance, and long-term operational efficiency.
                </p>
            </div>
        </div>
    </div>
</section>

<CTA />