import { createFileRoute, Link } from '@tanstack/react-router';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { PageBanner, Eyebrow, QuoteLink, CTA } from '@/components/site/shared';
import { Button } from '@/components/ui/button';
import { pageHead } from '@/lib/engineering';

export const Route = createFileRoute('/services/')({
  head: () =>
    pageHead(
      'Fabrication Services | Laser Cutting, Bending & Compression Dish End | Saghai Engineering',
      "Explore Saghai Engineering's precision fabrication services including CNC laser cutting, plate bending and compression dish end manufacturing for industrial applications."
    ),
  component: Services,
});

/* ── Data (confirmed scope only) ─────────────────────────── */

const trust = [
  'Established 1978',
  'Industrial Manufacturing Experience',
  'Custom Requirements',
  'Quality-Focused Production',
];

const services = [
  {
    id: 'laser-cutting',
    to: '/services/laser-cutting',
    number: '01',
    title: 'Laser Cutting',
    description:
      'Precision CNC laser cutting for industrial and engineering components, produced according to customer drawings and dimensional requirements.',
    spec: { label: 'Cutting Thickness', value: '0.7 – 20 mm' },
    points: [
      'CNC laser cutting',
      'Precision profile cutting',
      'Drawing-based production',
      'Consistent dimensional accuracy',
      'Suitable for custom industrial components',
    ],
    cta: 'Enquire About Laser Cutting',
  },
  {
    id: 'bending',
    to: '/services/bending',
    number: '02',
    title: 'Bending',
    description:
      'Controlled plate bending for forming industrial components according to required dimensions, geometry and engineering specifications.',
    spec: { label: 'Bending Thickness', value: '3 – 50 mm' },
    points: [
      'Plate bending',
      'Custom forming',
      'Drawing-based fabrication',
      'Controlled dimensions',
      'Industrial component forming',
    ],
    cta: 'Enquire About Bending',
  },
  {
    id: 'compression-dish-end',
    to: '/services/compression-dish-end',
    number: '03',
    title: 'Compression Dish End',
    description:
      'Compression dish end manufacturing for industrial vessels, tanks and engineered components requiring formed end sections.',
    spec: { label: 'Manufactured To', value: 'Your drawing & specification' },
    points: [
      'Compression forming',
      'Custom dimensions',
      'Drawing/specification-based manufacturing',
      'Industrial vessel and tank applications',
      'Component-level manufacturing support',
    ],
    cta: 'Enquire About Compression Dish Ends',
  },
] as const;

const steps = [
  { n: '01', title: 'Share Your Requirement', text: 'Send your drawing, dimensions, material requirements or project specifications.' },
  { n: '02', title: 'Requirement Review', text: 'Our team reviews the technical requirements and production scope.' },
  { n: '03', title: 'Fabrication', text: 'The component is produced using the required fabrication process.' },
  { n: '04', title: 'Inspection & Delivery', text: 'Completed components undergo the applicable inspection process before delivery.' },
];

const reasons = [
  { title: 'Drawing-Based Manufacturing', text: 'Components produced to your drawings and dimensional requirements.' },
  { title: 'Industrial Fabrication Experience', text: 'Manufacturing experience built since 1978.' },
  { title: 'Controlled Production Processes', text: 'Defined processes for cutting, forming and finishing work.' },
  { title: 'Custom Component Manufacturing', text: 'Built around your specification rather than a fixed catalogue.' },
  { title: 'Quality-Focused Approach', text: 'Applicable inspection before components are delivered.' },
  { title: 'Support for Industrial Applications', text: 'Components for a range of engineering and industrial uses.' },
];

const applications = [
  { name: 'Heavy Engineering', text: 'Fabricated components for heavy engineering equipment.' },
  { name: 'Chemical', text: 'Formed and cut parts for chemical process equipment.' },
  { name: 'Textile', text: 'Custom components for textile machinery and plants.' },
  { name: 'Construction Equipment', text: 'Plate components for construction machinery.' },
  { name: 'Water Treatment', text: 'Components for water treatment systems and tanks.' },
  { name: 'Manufacturing', text: 'Custom parts supporting manufacturing operations.' },
  { name: 'Defense', text: 'Fabricated components for defense-related requirements.' },
  { name: 'Marine', text: 'Plate components for marine applications.' },
];

/* ── Motion helper ───────────────────────────────────────── */

function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
}

/* ── Page ────────────────────────────────────────────────── */

function Services() {
  return (
    <>
      {/* 01 Banner + trust row */}
      <PageBanner
        title="Fabrication Services Built Around Your Requirements"
        category="Precision fabrication services"
        description="Saghai Engineering provides specialized fabrication services for industrial and engineering applications, developed around customer drawings, specifications and material requirements."
      />
      <div className="border-b border-border bg-card">
        <ul className="site-container grid grid-cols-2 gap-x-6 gap-y-3 py-5 text-sm font-medium md:grid-cols-4">
          {trust.map((t) => (
            <li key={t} className="flex items-center gap-2">
              <Check aria-hidden size={16} className="shrink-0 text-primary" />
              {t}
            </li>
          ))}
        </ul>
      </div>

      {/* 02 Overview */}
      <section className="section">
        <div className="site-container">
          <FadeIn>
            <div className="section-heading">
              <div>
                <Eyebrow>Our core services</Eyebrow>
                <h2>Precision processes for demanding industrial applications.</h2>
                <p className="section-intro">
                  From precision plate cutting to controlled forming and compression dish end manufacturing, our services are
                  designed to support custom-engineered components and industrial equipment requirements.
                </p>
              </div>
            </div>
          </FadeIn>
          <div className="grid gap-4 md:grid-cols-3">
            {services.map((s, i) => (
              <FadeIn key={s.id} delay={i * 0.08}>
                <Link
                  to={s.to}
                  className="group flex h-full flex-col border border-border bg-card p-8 transition-all hover:-translate-y-0.5 hover:border-primary/60"
                >
                  <span className="mb-6 text-sm font-semibold tracking-widest text-primary">{s.number}</span>
                  <h3 className="mb-3 text-2xl font-semibold">{s.title}</h3>
                  <p className="mb-6 text-sm text-muted-foreground">{s.description}</p>
                  <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold">
                    View service
                    <ArrowRight aria-hidden size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 03–05 Detailed services, alternating */}
      {services.map((s, i) => {
        const flip = i % 2 === 1;
        return (
          <section
            key={s.id}
            id={s.id}
            className={`section scroll-mt-24 ${flip ? 'bg-muted/40' : ''}`}
          >
            <div className="site-container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <FadeIn className={flip ? 'lg:order-2' : ''}>
                <span className="mb-4 block text-sm font-semibold tracking-widest text-primary">{s.number}</span>
                <h2 className="mb-4 text-3xl font-semibold md:text-5xl">{s.title}</h2>
                <p className="mb-8 max-w-xl text-muted-foreground">{s.description}</p>
                <ul className="mb-8 grid gap-3 sm:grid-cols-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm">
                      <Check aria-hidden size={16} className="mt-0.5 shrink-0 text-primary" />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap items-center gap-4">
                  <Button asChild>
                    <Link to="/contact">{s.cta}</Link>
                  </Button>
                  <Link to={s.to} className="inline-flex items-center gap-1 text-sm font-semibold hover:text-primary">
                    Service details <ArrowUpRight aria-hidden size={16} />
                  </Link>
                </div>
              </FadeIn>

              {/* Spec panel (swap for an existing project image later if available) */}
              <FadeIn delay={0.1} className={flip ? 'lg:order-1' : ''}>
                <div className="relative overflow-hidden border border-border bg-card p-10 md:p-14">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-4 -top-8 select-none text-[10rem] font-bold leading-none text-primary/5"
                  >
                    {s.number}
                  </span>
                  <p className="relative mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {s.spec.label}
                  </p>
                  <p className="relative text-4xl font-semibold text-primary md:text-5xl">{s.spec.value}</p>
                  <span aria-hidden className="relative mt-6 block h-px w-16 bg-primary" />
                </div>
              </FadeIn>
            </div>
          </section>
        );
      })}

      {/* 06 Process */}
      <section className="section">
        <div className="site-container">
          <FadeIn>
            <div className="section-heading">
              <div>
                <Eyebrow>Our process</Eyebrow>
                <h2>From drawing to finished component.</h2>
              </div>
            </div>
          </FadeIn>
          <ol className="grid gap-px border border-border bg-border md:grid-cols-4">
            {steps.map((s, i) => (
              <motion.li
                key={s.n}
                className="bg-card p-8"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <span className="mb-6 block text-5xl font-semibold text-primary/30">{s.n}</span>
                <h3 className="mb-2 text-lg font-semibold">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* 07 Why choose */}
      <section className="section bg-muted/40">
        <div className="site-container grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <FadeIn>
            <Eyebrow>Why choose our services</Eyebrow>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Fabrication you can specify precisely.</h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Every service is built around your drawings, materials and requirements.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold">
              <Link to="/capabilities" className="inline-flex items-center gap-1 hover:text-primary">
                Capabilities <ArrowUpRight aria-hidden size={16} />
              </Link>
              <Link to="/products" className="inline-flex items-center gap-1 hover:text-primary">
                Products <ArrowUpRight aria-hidden size={16} />
              </Link>
            </div>
          </FadeIn>
          <div className="grid gap-4 sm:grid-cols-2">
            {reasons.map((r, i) => (
              <FadeIn key={r.title} delay={(i % 2) * 0.08}>
                <article className="h-full border border-border bg-card p-6 transition-colors hover:border-primary/60">
                  <h3 className="mb-2 font-semibold">{r.title}</h3>
                  <p className="text-sm text-muted-foreground">{r.text}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 08 Applications */}
      <section className="section">
        <div className="site-container">
          <FadeIn>
            <div className="section-heading">
              <div>
                <Eyebrow>Applications</Eyebrow>
                <h2>Supporting Industrial Applications</h2>
                <p className="section-intro">
                  Our services support requirements across these industries.{' '}
                  <Link to="/industries" className="font-semibold text-primary hover:underline">
                    View all industries
                  </Link>
                  .
                </p>
              </div>
            </div>
          </FadeIn>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {applications.map((a, i) => (
              <FadeIn key={a.name} delay={(i % 4) * 0.06}>
                <article className="h-full border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/60">
                  <h3 className="mb-2 font-semibold">{a.name}</h3>
                  <p className="text-sm text-muted-foreground">{a.text}</p>
                </article>
              </FadeIn>
            ))}
          </div>
          <FadeIn className="mt-8">
            <Link to="/projects" className="inline-flex items-center gap-1 text-sm font-semibold hover:text-primary">
              See project experience <ArrowUpRight aria-hidden size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* 09 Technical CTA */}
      <section className="section border-y border-border bg-card">
        <FadeIn className="site-container grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Eyebrow>Working from your requirements</Eyebrow>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Have a drawing or fabrication requirement?</h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Share your component drawings, specifications or project requirements with our team.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 lg:justify-end">
            <QuoteLink>Request a Quote</QuoteLink>
            <Button asChild variant="outline">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </FadeIn>
      </section>

      {/* 10 Final CTA */}
      <CTA
        title="Discuss Your Fabrication Requirement"
        description="Tell us what you need to manufacture and our team can review your requirement."
        button="Request a Quote"
      />
    </>
  );
}