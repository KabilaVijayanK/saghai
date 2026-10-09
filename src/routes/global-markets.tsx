import { createFileRoute } from '@tanstack/react-router';
import { Globe2 } from 'lucide-react';
import { PageBanner, Eyebrow, QuoteLink, CTA } from '@/components/site/shared';
import { globalMarkets, pageHead } from '@/lib/engineering';

export const Route = createFileRoute('/global-markets')({
  head: () =>
    pageHead(
      'Global Markets',
      'Saghai Engineering is targeting international B2B fabrication opportunities in Saudi Arabia, the Middle East, Europe and Latin America.'
    ),
  component: Markets,
});

function Markets() {
  return (
    <>
      <PageBanner
        title="Engineering Beyond Boundaries"
        category="Global markets"
        description="Saghai Engineering is targeting international B2B opportunities across key industrial markets, bringing decades of fabrication experience to global industrial requirements."
      />

      <section className="section">
        <div className="site-container">
          <div className="section-heading">
            <div>
              <Eyebrow>International opportunities</Eyebrow>
              <h2>Local expertise. Global perspective.</h2>
              <p className="section-intro">
                Custom-engineered products and fabricated components for industrial buyers and engineering applications.
              </p>
            </div>
            <Globe2 size={90} strokeWidth={1} className="text-primary" />
          </div>

          {/* Image cards (replaces the old product-grid) */}
          <div className="grid gap-4 sm:grid-cols-2">
            {globalMarkets.map(({ name, description, image, imageAlt }) => (
              <article
                key={name}
                className="group relative isolate flex min-h-[320px] flex-col justify-end overflow-hidden border border-border bg-card transition-colors hover:border-primary/60 md:min-h-[380px]"
              >
                <img
                  src={image}
                  alt={imageAlt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/45 to-black/10 transition-opacity duration-500 group-hover:from-black/90"
                />
                <div className="p-8 md:p-10">
                  <h3 className="mb-3 text-2xl font-semibold text-white">{name}</h3>
                  <span aria-hidden className="mb-4 block h-px w-12 bg-primary transition-all duration-500 group-hover:w-24" />
                  <p className="max-w-sm text-sm text-white/80">{description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10">
            <QuoteLink>Send Your International Requirement</QuoteLink>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}