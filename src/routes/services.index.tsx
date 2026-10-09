import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight, ArrowUpRight, Check, Anchor, Cog, Construction,
  Droplets, Factory, FlaskConical, Shirt, ShieldCheck,
} from 'lucide-react';
import { Eyebrow, QuoteLink, CTA } from '@/components/site/shared';
import { Button } from '@/components/ui/button';
import { pageHead } from '@/lib/engineering';

export const Route = createFileRoute('/services/')({
  head: () =>
    pageHead(
    'Fabrication Services | Laser Cutting & Bending',
    "Explore Saghai Engineering's CNC laser cutting and plate bending services for industrial applications."
    ),
  component: Services,
});

/* ── Images (Unsplash) ──────────────────────────────────────
   Paste the full image address of each photo you pick
   (images.unsplash.com/photo-…). The helper adds size/format params. */
const unsplash = (url: string, w = 1400) => {
  const u = new URL(url);
  u.searchParams.set('auto', 'format');
  u.searchParams.set('fit', 'crop');
  u.searchParams.set('w', String(w));
  u.searchParams.set('q', '80');
  return u.toString();
};

const images = {
  hero: {
    src: unsplash('https://plus.unsplash.com/premium_photo-1664910255137-5462726ff06b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1600),
    alt: 'Fabricated steel plate components in an industrial workshop',
  },
  laser: {
    src: unsplash('https://images.unsplash.com/photo-1738162837451-2041c1418f54?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
    alt: 'CNC laser cutting machine cutting a metal plate with bright sparks',
  },
  bending: {
    src: unsplash('https://plus.unsplash.com/premium_photo-1682144577628-72dec59f91aa?q=80&w=1153&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
    alt: 'Press brake forming a heavy steel plate in a fabrication shop',
  },
} as const;
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
    short: 'Precision CNC plate cutting to your drawings.',
    description:
      'Precision CNC laser cutting for industrial and engineering components, produced according to customer drawings and dimensional requirements.',
    spec: { label: 'Cutting Thickness', value: '0.7 – 20 mm' },
    image: images.laser,
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
    short: 'Controlled plate forming to required geometry.',
    description:
      'Controlled plate bending for forming industrial components according to required dimensions, geometry and engineering specifications.',
    spec: { label: 'Bending Thickness', value: '3 – 50 mm' },
    image: images.bending,
    points: [
      'Plate bending',
      'Custom forming',
      'Drawing-based fabrication',
      'Controlled dimensions',
      'Industrial component forming',
    ],
    cta: 'Enquire About Bending',
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
  { name: 'Heavy Engineering', text: 'Fabricated components for heavy engineering equipment.', Icon: Factory },
  { name: 'Chemical', text: 'Formed and cut parts for chemical process equipment.', Icon: FlaskConical },
  { name: 'Textile', text: 'Custom components for textile machinery and plants.', Icon: Shirt },
  { name: 'Construction Equipment', text: 'Plate components for construction machinery.', Icon: Construction },
  { name: 'Water Treatment', text: 'Components for water treatment systems and tanks.', Icon: Droplets },
  { name: 'Manufacturing', text: 'Custom parts supporting manufacturing operations.', Icon: Cog },
  { name: 'Defense', text: 'Fabricated components for defense-related requirements.', Icon: ShieldCheck },
  { name: 'Marine', text: 'Plate components for marine applications.', Icon: Anchor },
];

/* ── Helpers ─────────────────────────────────────────────── */

function FadeIn({
  children, className, delay = 0,
}: { children: React.ReactNode; className?: string; delay?: number }) {
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

/** Image with a blueprint-grid fallback so a bad URL never looks broken. */
function Photo({
  src, alt, className = '', priority = false,
}: { src: string; alt: string; className?: string; priority?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`bg-muted ${className}`}
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,.06) 1px,transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

/* ── Page ────────────────────────────────────────────────── */

function Services() {
  return (
    <>
      {/* 01 Hero */}
      <section className="relative overflow-hidden border-b border-border bg-background">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,.04) 1px,transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="site-container relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <FadeIn>
            <Eyebrow>Precision fabrication services</Eyebrow>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.05] md:text-6xl">
              Fabrication Services Built Around Your Requirements
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Saghai Engineering provides specialized fabrication services for industrial and engineering applications,
              developed around customer drawings, specifications and material requirements.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <QuoteLink>Request a Quote</QuoteLink>
              <Button asChild variant="outline">
                <a href="#core-services">
                  Explore Services <ArrowRight aria-hidden size={16} className="ml-2" />
                </a>
              </Button>
            </div>
          </FadeIn>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span aria-hidden className="absolute -bottom-4 -right-4 hidden h-full w-full border border-primary/40 md:block" />
            <div className="relative overflow-hidden border border-border bg-card">
              <Photo
                src={images.hero.src}
                alt={images.hero.alt}
                priority
                className="aspect-[4/5] w-full object-cover md:aspect-[5/5]"
              />
            </div>
            {/* floating spec chips */}
            <div className="absolute -left-4 bottom-8 hidden border border-border bg-card px-5 py-4 shadow-sm md:block">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Laser cutting</p>
              <p className="text-xl font-semibold text-primary">0.7 – 20 mm</p>
            </div>
            <div className="absolute -right-2 top-8 hidden border border-border bg-card px-5 py-4 shadow-sm md:block">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Bending</p>
              <p className="text-xl font-semibold text-primary">3 – 50 mm</p>
            </div>
          </motion.div>
        </div>

        {/* trust row */}
        <ul className="site-container relative grid grid-cols-2 gap-x-6 gap-y-3 border-t border-border py-5 text-sm font-medium md:grid-cols-4">
          {trust.map((t) => (
            <li key={t} className="flex items-center gap-2">
              <Check aria-hidden size={16} className="shrink-0 text-primary" />
              {t}
            </li>
          ))}
        </ul>
      </section>

      {/* 02 Overview with image cards */}
      <section className="section scroll-mt-24" id="core-services">
        <div className="site-container">
          <FadeIn>
            <div className="section-heading">
              <div>
                <Eyebrow>Our core services</Eyebrow>
                <h2>Precision processes for demanding industrial applications.</h2>
                <p className="section-intro">
                  From precision plate cutting to controlled forming, our services support custom-engineered
                  components and industrial equipment requirements.
                </p>
              </div>
            </div>
          </FadeIn>
          <div className="grid gap-5 md:grid-cols-2">
            {services.map((s, i) => (
              <FadeIn key={s.id} delay={i * 0.08}>
                <Link
                  to={s.to}
                  className="group flex h-full flex-col overflow-hidden border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-primary/60"
                >
                  <div className="overflow-hidden">
                    <Photo
                      src={s.image.src}
                      alt={s.image.alt}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <span className="mb-3 text-sm font-semibold tracking-widest text-primary">{s.number}</span>
                    <h3 className="mb-2 text-2xl font-semibold">{s.title}</h3>
                    <p className="mb-6 text-sm text-muted-foreground">{s.short}</p>
                    <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold">
                      View service
                      <ArrowRight aria-hidden size={16} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 03–04 Detailed services, alternating */}
      {services.map((s, i) => {
        const flip = i % 2 === 1;
        return (
          <section key={s.id} id={s.id} className={`section scroll-mt-24 ${flip ? 'bg-muted/40' : ''}`}>
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

              <FadeIn delay={0.1} className={flip ? 'lg:order-1' : ''}>
                <div className="group relative">
                  <span
                    aria-hidden
                    className={`absolute hidden h-full w-full border border-primary/40 md:block ${
                      flip ? '-bottom-4 -left-4' : '-bottom-4 -right-4'
                    }`}
                  />
                  <div className="relative overflow-hidden border border-border bg-card">
                    <Photo
                      src={s.image.src}
                      alt={s.image.alt}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 max-w-[80%] border-r border-t border-border bg-card/95 px-6 py-4">
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                        {s.spec.label}
                      </p>
                      <p className="text-xl font-semibold text-primary md:text-2xl">{s.spec.value}</p>
                    </div>
                  </div>
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
                className="group bg-card p-8 transition-colors hover:bg-muted/40"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <span className="mb-6 block text-5xl font-semibold text-primary/30 transition-colors group-hover:text-primary">
                  {s.n}
                </span>
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
            <div className="mt-8 flex flex-wrap gap-6 text-sm font-semibold">
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
                <article className="h-full border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/60">
                  <span aria-hidden className="mb-4 block h-px w-8 bg-primary" />
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
            {applications.map(({ name, text, Icon }, i) => (
              <FadeIn key={name} delay={(i % 4) * 0.06}>
                <article className="group h-full border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/60">
                  <Icon
                    aria-hidden
                    size={30}
                    strokeWidth={1.25}
                    className="mb-5 text-primary transition-transform duration-500 group-hover:scale-110"
                  />
                  <h3 className="mb-2 font-semibold">{name}</h3>
                  <p className="text-sm text-muted-foreground">{text}</p>
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