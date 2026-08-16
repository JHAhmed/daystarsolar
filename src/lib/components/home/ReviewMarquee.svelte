<script>
	import { REVIEWS } from '$data/reviews.js';
	import { StarIcon, GoogleIcon, ArrowIcon } from '$icons';

	/**
	 * Continuous marquee of Google reviews.
	 *
	 * Replaces a setInterval carousel that jumped back to the start every
	 * eighth slide. This runs as a single CSS animation — constant motion, so
	 * linear timing — which keeps running smoothly while the main thread is
	 * busy, and pauses on hover so a review can actually be read.
	 *
	 * The track holds two copies of the list. Spacing is padding on each card
	 * rather than a flex gap, so translating the track by exactly -50% lands on
	 * the duplicate seamlessly; a flex gap would leave one gap's worth of drift.
	 */
	const track = [...REVIEWS, ...REVIEWS];
</script>

<div class="marquee">
	<ul class="marquee__track">
		{#each track as review, i (`${review.name}-${i}`)}
			<li class="w-[19rem] shrink-0 pr-4 sm:w-[22rem] sm:pr-5">
				<a
					href={review.link}
					target="_blank"
					rel="noopener noreferrer"
					aria-hidden={i >= REVIEWS.length ? 'true' : undefined}
					tabindex={i >= REVIEWS.length ? -1 : undefined}
					class="group/review flex h-full flex-col rounded-card border border-ink-200 bg-white p-6 transition-[border-color,box-shadow,transform] duration-[200ms] ease-out hover:-translate-y-0.5 hover:border-ink-300 hover:shadow-lift"
				>
					<div class="mb-5 flex items-center justify-between">
						<div class="flex gap-0.5" aria-label="{review.rating} out of 5 stars">
							{#each { length: review.rating } as _, star (star)}
								<StarIcon class="size-4 text-solar-400" color="none" />
							{/each}
						</div>
						<GoogleIcon class="size-4" />
					</div>

					<p class="mb-6 grow text-sm leading-relaxed text-ink-600">{review.text}</p>

					<div class="mt-auto flex items-center justify-between gap-3">
						<p class="text-sm font-medium text-night-900">{review.name}</p>
						<span
							class="flex size-7 items-center justify-center rounded-full bg-ink-100 text-ink-500 transition-[background-color,color] duration-[200ms] ease-out group-hover/review:bg-solar-400 group-hover/review:text-white"
						>
							<ArrowIcon class="size-3.5 -rotate-[135deg]" strokeWidth="2" />
						</span>
					</div>
				</a>
			</li>
		{/each}
	</ul>
</div>

<style>
	.marquee {
		overflow: hidden;
		/* Softens both ends so cards enter and leave rather than being clipped. */
		mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent);
	}

	.marquee__track {
		display: flex;
		width: max-content;
		align-items: stretch;
		animation: marquee-scroll 80s linear infinite;
	}

	.marquee:hover .marquee__track,
	.marquee:focus-within .marquee__track {
		animation-play-state: paused;
	}

	@keyframes marquee-scroll {
		to {
			transform: translateX(-50%);
		}
	}

	/* Reduced motion turns it into an ordinary horizontally scrollable row. */
	@media (prefers-reduced-motion: reduce) {
		.marquee {
			overflow-x: auto;
			mask-image: none;
		}

		.marquee__track {
			animation: none;
		}
	}
</style>
