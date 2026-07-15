<script>
  let bill = $state(3000);

  function formatInr(n) {
    return '₹' + n.toLocaleString('en-IN');
  }

  const calc = $derived.by(() => {
    const kw = Math.max(1, Math.ceil(bill / 750));
    const savings = Math.round(bill * 0.82);
    const subsidy = kw <= 2 ? 60000 : 78000;
    const systemCost = kw * 62000;
    const netCost = Math.max(0, systemCost - subsidy);
    const payback = (netCost / (savings * 12)).toFixed(1);

    return {
      kw,
      savings: formatInr(savings),
      subsidy: formatInr(subsidy),
      payback: `${payback} yrs`
    };
  });

  const rows = $derived([
    { label: 'Recommended Capacity', value: `${calc.kw} kW`, accent: false },
    { label: 'Monthly Savings', value: calc.savings, accent: false },
    { label: 'Government Subsidy', value: calc.subsidy, accent: true },
    { label: 'Payback Period', value: calc.payback, accent: false }
  ]);
</script>

<section id="calculator" class="bg-warm px-6 py-24 md:px-8 md:py-32">
  <div class="mx-auto max-w-[1020px]">
    <span class="mb-8 block text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-primary">
      Savings Estimator
    </span>
    <h2 class="text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
      How much could<br />you be saving?
    </h2>

    <div
      class="mt-16 grid overflow-hidden rounded border border-line bg-white md:grid-cols-2"
    >
      <div class="border-line p-10 md:border-r md:p-14 max-md:border-b">
        <span
          class="mb-6 block text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted"
        >
          Monthly Electricity Bill
        </span>
        <p class="mb-9 text-[3.75rem] font-bold leading-none tracking-[-0.055em] text-body">
          {formatInr(bill)}
        </p>

        <input
          class="h-[3px] w-full cursor-pointer appearance-none rounded-sm bg-line outline-none
            [&::-webkit-slider-thumb]:size-[18px] [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[2.5px]
            [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-primary
            [&::-webkit-slider-thumb]:shadow-[0_0_0_1px_var(--color-primary)]
            [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:border-[2.5px] [&::-moz-range-thumb]:border-white
            [&::-moz-range-thumb]:bg-primary"
          type="range"
          min="1000"
          max="15000"
          step="500"
          bind:value={bill}
          aria-label="Monthly electricity bill"
        />
        <div class="mt-3 flex justify-between text-[0.72rem] text-muted">
          <span>₹1,000</span>
          <span>₹15,000</span>
        </div>
      </div>

      <div class="bg-ink p-10 md:p-14">
        {#each rows as row, i}
          <div
            class="flex items-baseline justify-between border-b border-surface/[0.06] py-5
              first:pt-0 last:border-b-0 last:pb-0"
          >
            <span class="text-[0.8rem] text-surface/40">{row.label}</span>
            <span
              class="text-[1.25rem] font-bold tracking-[-0.03em] {row.accent
                ? 'text-primary'
                : 'text-surface'}"
            >
              {row.value}
            </span>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>