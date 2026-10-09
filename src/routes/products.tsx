import { createFileRoute } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { PageBanner, Eyebrow, vessels, CTA, QuoteLink } from '@/components/site/shared';
import { pageHead, products } from '@/lib/engineering';

export const Route = createFileRoute('/products')({
  head: () =>
    pageHead(
      'Custom Engineered Products',
      'Pressure vessels, storage and water treatment tanks, heat exchangers, earthmoving equipment components, industrial structures, process plant components and custom sheet metal products.',
    ),
  component: Products,
});

function Products() {
  return (
    <>
      <PageBanner
        title="Custom Engineered Products"
        category="Built to your specifications"
        description="Custom-engineered products and fabricated components for a wide range of industrial applications. Manufactured according to customer drawings, specifications and requirements."
      />
      <section className="section">
        <div className="site-container">
          <div className="story-grid mb-12">
            <div>
              <Eyebrow>From drawing to delivery</Eyebrow>
              <h2>Built around your application.</h2>
              <p className="section-intro">
                From pressure vessels and storage tanks to heavy equipment components, our experience
                supports diverse custom fabrication requirements.
              </p>
              <div className="mt-7">
                <QuoteLink>Discuss Your Product</QuoteLink>
              </div>
            </div>
            <img
              src={vessels}
              width={1200}
              height={800}
              loading="lazy"
              className="story-image"
              alt="Illustrative fabricated stainless steel pressure vessels"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <article
                className="group border border-border bg-background p-6 transition-colors hover:border-primary/50"
                key={product.name}
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <span className="service-number">0{index + 1}</span>
                    <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
                  </div>
                  <ArrowUpRight
                    className="mt-1 shrink-0 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    size={18}
                    aria-hidden="true"
                  />
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
                {product.examples && (
                  <div className="mt-5 border-t border-border pt-4">
                    <h4 className="font-mono text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                      Selected Examples
                    </h4>
                    <ul className="mt-3 grid gap-2 text-xs leading-relaxed text-foreground/80 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                      {product.examples.map((example) => (
                        <li className="flex items-start gap-2" key={example}>
                          <span
                            aria-hidden="true"
                            className="mt-1.5 h-1 w-1 shrink-0 bg-primary"
                          />
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
