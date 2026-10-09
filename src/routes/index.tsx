import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, createFileRoute } from '@tanstack/react-router';
import { AnimatePresence, animate, motion, useInView, type Variants } from 'framer-motion';
import {
  ArrowRight, ArrowDown, Anchor, Check, Cog, Droplets, Factory, FlaskConical, Flame, Gauge, Globe, Hammer,
  Layers, Paintbrush, ScanSearch, Scissors, Settings2, Shield, ShieldCheck, Shirt, Truck, Boxes, Wrench,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Eyebrow, CheckList, QuoteLink, factory, vessels } from '@/components/site/shared';
import { manufacturingCapabilities, pageHead } from '@/lib/engineering';

/* ------------------------------------------------------------------ */
/* Motion primitives                                                   */
/* ------------------------------------------------------------------ */
const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
      {children}
    </motion.div>
  );
}

function Stagger({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
      {children}
    </motion.div>
  );
}

function Item({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <motion.div className={className} variants={fadeUp}>{children}</motion.div>;
}

export function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.4, ease, onUpdate: (v) => setVal(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{val.toLocaleString('en-IN')}{suffix}</span>;
}

function SectionNo({ n }: { n: string }) {
  void n;
  return null;
}

function Heading({ n, eyebrow, title, intro, action }: { n: string; eyebrow: string; title: ReactNode; intro?: string; action?: ReactNode }) {
  return (
    <Reveal className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <div className="mb-4 flex items-center gap-4"><SectionNo n={n} /><Eyebrow>{eyebrow}</Eyebrow></div>
        <h2>{title}</h2>
        {intro && <p className="section-intro">{intro}</p>}
      </div>
      {action}
    </Reveal>
  );
}

function Blueprint() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
    />
  );
}

function DrawLine({ className = '' }: { className?: string }) {
  return (
    <motion.span
      aria-hidden
      className={`block h-px origin-left bg-primary ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* 01 Hero technical strip (render inside the existing hero)           */
/* ------------------------------------------------------------------ */
export function HeroInfoStrip() {
  const items = ['Engineering since 1978', '30,000+ sq. ft. fabrication area', '3 fabrication bays', 'Industrial manufacturing capability'];
  return (
    <div className="site-container">
      <ul className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-white/20 py-4 font-mono text-[11px] uppercase tracking-widest md:grid-cols-4">
        {items.map((t) => <li key={t} className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-primary" />{t}</li>)}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 02 Snapshot                                                         */
/* ------------------------------------------------------------------ */
export function Snapshot() {
  const stats = [
    { to: 1978, label: 'Established', raw: true },
    { to: 30000, suffix: '+', label: 'Sq. Ft. Covered Fabrication Area' },
    { to: 3, label: 'Fabrication Bays' },
    { to: 600, suffix: ' T', label: 'Hydraulic Press Capacity' },
  ];
  return (
    <section className="section relative overflow-hidden">
      <Blueprint />
      <div className="site-container relative">
        <Heading n="01" eyebrow="Company snapshot" title="Experience That Supports Every Project" intro="Saghai Engineering operates from a dedicated fabrication facility designed to support custom-engineered products and industrial fabrication requirements." />
        <Stagger className="grid grid-cols-2 border-l border-t border-border bg-background lg:grid-cols-4">
          {stats.map((s) => (
            <Item key={s.label} className="border-b border-r border-border p-6 md:p-8">
              <div className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                {s.raw ? s.to : <Counter to={s.to} {...(s.suffix !== undefined ? { suffix: s.suffix } : {})} />}
              </div>
              <DrawLine className="my-4 w-10" />
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 03 About                                                            */
/* ------------------------------------------------------------------ */
export function About() {
  return (
    <section className="section section-soft">
      <div className="site-container story-grid">
        <motion.div className="story-visual overflow-hidden" initial={{ clipPath: 'inset(0 100% 0 0)' }} whileInView={{ clipPath: 'inset(0 0% 0 0)' }} viewport={{ once: true }} transition={{ duration: 1, ease }}>
          <img src={vessels} width={1200} height={800} loading="lazy" className="story-image" alt="Illustrative custom fabricated stainless steel vessels" />
          <div className="since-label">ENGINEERING SINCE 1978</div>
        </motion.div>
        <Reveal>
          <div className="mb-4 flex items-center gap-4"><SectionNo n="02" /><Eyebrow>Built on experience</Eyebrow></div>
          <h2>Engineering experience that has evolved since 1978.</h2>
          <p className="section-intro">Saghai Engineering was established in 1978 and has built decades of experience in custom metal fabrication and engineered products.</p>
          <p className="section-intro">The company's documented product experience includes pressure vessels, heat exchangers, earthmoving equipment components, storage tanks, process plant components, sheet metal components and other custom-engineered requirements.</p>
          <p className="section-intro">Our manufacturing approach is focused on understanding customer drawings, specifications and application requirements before delivering fabricated products suited to their intended use.</p>
          <CheckList items={['Custom manufacturing based on customer requirements', 'Decades of metal fabrication experience', 'Dedicated industrial fabrication infrastructure', 'Quality-focused manufacturing approach']} />
          <Link to="/about" className="text-link">About Saghai Engineering<ArrowRight size={17} /></Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 04 Core services (exactly three)                                    */
/* ------------------------------------------------------------------ */
const services = [
  { n: '01', icon: Scissors, name: 'Laser Cutting', badge: '0.7 mm – 20 mm', body: 'Precision CNC laser cutting for industrial components and custom fabrication requirements.', extra: 'Suitable for custom-cut profiles, industrial components, sheet metal components and fabricated parts.', cta: 'Explore Laser Cutting' },
  { n: '02', icon: Hammer, name: 'Bending', badge: '3 mm – 50 mm', body: 'Industrial plate bending for components and fabricated products requiring controlled forming and accurate geometry.', extra: 'Suitable for formed components, tank-related components, fabricated structures and engineering requirements.', cta: 'Explore Bending' },
  { n: '03', icon: Layers, name: 'Compression Dish End', badge: null, body: 'Compression dish end manufacturing for fabricated products requiring formed end components.', extra: 'Used in applications involving tanks, vessels and other industrial fabricated products, depending on project requirements.', cta: 'Explore Compression Dish End' },
];

export function CoreServices() {
  return (
    <section className="section relative overflow-hidden">
      <div className="site-container relative">
        <Heading n="03" eyebrow="Our services" title="Precision processes for industrial fabrication." intro="Our core fabrication services support component manufacturing and formed products across a range of industrial applications."
          action={<Link to="/services" className="text-link">View All Services<ArrowRight size={17} /></Link>} />
        <Stagger className="grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <Item key={s.name} className="group relative flex flex-col border border-border bg-card p-7 transition-colors duration-300 hover:border-primary/50">
              <span aria-hidden className="absolute right-0 top-0 h-6 w-6 border-r border-t border-primary/60" />
              <span aria-hidden className="absolute bottom-0 left-0 h-6 w-6 border-b border-l border-primary/60" />
              <div className="mb-6 flex items-center justify-between">
                <span className="font-mono text-sm text-muted-foreground">{s.n}</span>
                <s.icon className="text-primary" size={26} strokeWidth={1.5} />
              </div>
              <h3 className="mb-3 text-xl font-semibold">{s.name}</h3>
              {s.badge && <span className="mb-4 w-fit border border-primary/40 px-3 py-1 font-mono text-xs tracking-wide text-primary">{s.badge}</span>}
              <p className="mb-3 text-sm text-foreground/80">{s.body}</p>
              <p className="mb-6 text-sm text-muted-foreground">{s.extra}</p>
              <Link to="/services" className="text-link mt-auto">{s.cta}<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></Link>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 05 Manufacturing capabilities                                       */
/* ------------------------------------------------------------------ */
const capabilityIcons = {
  'Hydraulic Pressing': Gauge,
  'CNC Laser Cutting': Scissors,
  'CNC Oxyfuel Cutting': Flame,
  'Plate Forming / Bending': Layers,
  Welding: Wrench,
  'Blasting & Painting': Paintbrush,
  'Inspection & Testing': ScanSearch,
} as const;

export function Capabilities() {
  return (
    <section className="section section-soft relative overflow-hidden">
      <Blueprint />
      <div className="site-container relative">
        <Heading n="04" eyebrow="Manufacturing capabilities" title="Industrial infrastructure for demanding requirements." intro="Saghai Engineering combines fabrication infrastructure, forming equipment, cutting capabilities, welding processes, finishing and inspection facilities to support custom-engineered manufacturing requirements." />
        <Stagger className="grid grid-cols-1 border-l border-t border-border bg-background min-[480px]:grid-cols-2 lg:grid-cols-4">
          {manufacturingCapabilities.map((capability) => {
            const Icon = capabilityIcons[capability.name];
            return (
              <Item key={capability.name} className="border-b border-r border-border p-6 transition-colors hover:bg-muted/40">
                <Icon className="mb-5 text-primary" size={24} strokeWidth={1.5} />
                <h3 className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest">{capability.name}</h3>
                <p className="text-sm text-muted-foreground">{capability.description}</p>
              </Item>
            );
          })}
          <Item className="border-b border-r border-border p-6 transition-colors hover:bg-muted/40">
            <Boxes className="mb-5 text-primary" size={24} strokeWidth={1.5} />
            <h3 className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest">Material Experience</h3>
            <p className="text-sm text-muted-foreground">Documented capability across Mild Steel, Stainless Steel and Aluminium.</p>
          </Item>
        </Stagger>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Products: photo tiles                                               */
/* Paste an Unsplash photo ID into `id`. It is the last part of the    */
/* photo URL: unsplash.com/photos/photo-of-white-and-green-steel-tank- */
/* IUwLkxL49co  ->  IUwLkxL49co                                        */
/* ------------------------------------------------------------------ */
const unsplash = (id: string, w = 1200) => `https://unsplash.com/photos/${id}/download?force=true&w=${w}`;

type Product = { t: string; d: string; span: string; big?: boolean; id?: string; fallback: string; search: string };

const productList: Product[] = [
  { t: 'Pressure Vessels', d: 'Fabricated vessels for industrial and process applications.', span: '', fallback: vessels, search: 'stainless steel pressure vessel' },
  { t: 'Storage Tanks', d: 'Industrial tanks designed and fabricated according to application requirements.', span: '', id: 'IUwLkxL49co', fallback: vessels, search: 'industrial storage tank' },
  { t: 'Heat Exchangers', d: 'Custom-engineered fabricated products for industrial process applications.', span: '', fallback: factory, search: 'heat exchanger industrial' },
  { t: 'Earthmoving Equipment Components', d: 'Heavy fabricated components for earthmoving and construction equipment.', span: '', fallback: factory, search: 'excavator bulldozer' },
  { t: 'Industrial Structures', d: 'Custom fabricated structures and components for heavy engineering and industrial applications.', span: '', fallback: factory, search: 'steel structure fabrication' },
  { t: 'Process Plant Components', d: 'Fabricated components for process plants, including chemical and textile applications.', span: '', fallback: vessels, search: 'chemical plant piping' },
  // last one: full-width landscape banner
  { t: 'Sheet Metal Components', d: 'Custom sheet metal components manufactured according to customer requirements.', span: 'sm:col-span-2 lg:col-span-3', big: true, fallback: factory, search: 'sheet metal fabrication' },
];

function ProductImg({ p }: { p: Product }) {
  const [src, setSrc] = useState(p.id ? unsplash(p.id, p.big ? 1400 : 900) : p.fallback);
  return (
    <img
      src={src}
      alt={`Illustrative image: ${p.t}`}
      loading="lazy"
      onError={() => setSrc(p.fallback)}
      className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
    />
  );
}

export function Products() {
  return (
    <section className="section">
      <div className="site-container">
        <Heading n="" eyebrow="Engineered products" title="Products developed around real industrial applications." intro="Saghai Engineering manufactures custom-engineered products and fabricated components according to customer requirements."
          action={<Link to="/products" className="text-link">Explore All Products<ArrowRight size={17} /></Link>} />

       <Reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {productList.map((p) => (
    <Link
      key={p.t}
      to="/products"
      className={`group relative isolate flex flex-col justify-end overflow-hidden bg-neutral-950 p-6 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${p.span} ${p.big ? 'h-[16rem] md:h-[20rem] lg:p-10' : 'h-[18rem]'}`}
    >
      <ProductImg p={p} />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-500 group-hover:from-black/95" />
      {p.big && <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />}
      <span aria-hidden className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-500 group-hover:w-full" />

      <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center bg-white/10 text-white backdrop-blur-md transition-colors group-hover:bg-primary">
        <ArrowRight size={18} className="transition-transform group-hover:-rotate-45" />
      </span>

      <div className="relative max-w-xl">
        <h3 className={`font-semibold leading-tight text-white ${p.big ? 'text-3xl md:text-4xl' : 'text-xl'}`}>{p.t}</h3>
        <div className={`grid transition-all duration-500 ${p.big ? 'mt-3 grid-rows-[1fr]' : 'grid-rows-[1fr] md:grid-rows-[0fr] md:group-hover:mt-2 md:group-hover:grid-rows-[1fr] md:group-focus-visible:grid-rows-[1fr]'}`}>
          <p className="overflow-hidden text-sm text-white/80">{p.d}</p>
        </div>
      </div>
    </Link>
  ))}
</Reveal>
    
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 07 Industries                                                       */
/* ------------------------------------------------------------------ */
const industries = [
  { icon: Factory, t: 'Heavy Engineering', d: 'Custom-engineered products and fabricated components for heavy industrial applications.' },
  { icon: FlaskConical, t: 'Chemical Industry', d: 'Vessels, tanks and fabricated components for chemical and process applications.' },
  { icon: Shirt, t: 'Textile Industry', d: 'Fabricated components for textile-related process applications.' },
  { icon: Truck, t: 'Construction Equipment', d: 'Heavy fabricated components for earthmoving and construction equipment.' },
  { icon: Droplets, t: 'Water Treatment', d: 'Tank and fabricated product applications for water treatment requirements.' },
  { icon: Shield, t: 'Defense', d: 'Custom fabricated components for specialized applications.' },
  { icon: Anchor, t: 'Marine', d: 'Fabricated structures and components for marine applications.' },
  { icon: Cog, t: 'Manufacturing', d: 'Custom-engineered products and fabricated components for manufacturing requirements.' },
];

export function Industries() {
  return (
    <section className="section section-soft">
      <div className="site-container">
        <Heading n="06" eyebrow="Industries & applications" title="Engineering solutions across industrial sectors." intro="The company's documented product and project experience spans multiple industrial applications." />
        <Stagger className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
          {industries.map((i) => (
            <Item key={i.t} className="border border-border bg-background p-4 transition-colors hover:border-primary/50 md:p-6">
              <i.icon className="mb-4 text-primary" size={24} strokeWidth={1.5} />
              <h3 className="mb-2 text-base font-semibold md:text-lg">{i.t}</h3>
              <p className="text-xs text-muted-foreground md:text-sm">{i.d}</p>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 08 Why Saghai – vertical engineering line                           */
/* ------------------------------------------------------------------ */
const why = [
  ['Established Experience', 'Founded in 1978 with decades of metal fabrication experience.'],
  ['Custom Manufacturing', 'Products are developed around customer drawings, specifications and application requirements.'],
  ['Dedicated Infrastructure', '30,000+ sq. ft. covered fabrication area across three bays.'],
  ['Heavy Manufacturing Capability', 'Hydraulic pressing, cutting, forming and fabrication infrastructure for demanding applications.'],
  ['Multiple Welding Processes', 'FCAW, GMAW, SMAW and GTAW capabilities.'],
  ['Inspection & Testing', 'Ultrasonic testing, liquid penetrant testing, radiography and hydrostatic testing.'],
];

export function WhySaghai() {
  return (
    <section className="section">
      <div className="site-container grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <div className="mb-4 flex items-center gap-4"><SectionNo n="07" /><Eyebrow>Why Saghai</Eyebrow></div>
          <h2>Built around experience, capability and customer requirements.</h2>
        </Reveal>
        <div className="relative pl-10 md:pl-14">
          <motion.span aria-hidden className="absolute bottom-2 left-3 top-2 w-px origin-top bg-primary/60 md:left-5" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease }} />
          <Stagger className="space-y-8">
            {why.map(([t, d], i) => (
              <Item key={t} className="relative">
                <span aria-hidden className="absolute -left-[2.05rem] top-1.5 h-3 w-3 border border-primary bg-background md:-left-[2.55rem]" />
                <span className="font-mono text-xs text-primary">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mb-1 text-lg font-semibold">{t}</h3>
                <p className="text-sm text-muted-foreground">{d}</p>
              </Item>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 09 Facility                                                         */
/* ------------------------------------------------------------------ */
const facilityStats = [
  ['30,000+', 'Covered fabrication area'], ['3', 'Fabrication bays'], ['600 T', 'Hydraulic press capacity'],
  ['20 mm', 'Current laser cutting thickness'], ['50 mm', 'Current bending thickness'], ['150 mm', 'Documented oxyfuel cutting capability'],
];

export function Facility() {
  return (
    <section className="section section-soft">
      <div className="site-container grid items-center gap-10 lg:grid-cols-2">
        <motion.div className="overflow-hidden" initial={{ clipPath: 'inset(0 0 100% 0)' }} whileInView={{ clipPath: 'inset(0 0 0% 0)' }} viewport={{ once: true }} transition={{ duration: 1, ease }}>
          <img src={factory} width={1920} height={1024} loading="lazy" className="h-full w-full object-cover" alt="Illustrative heavy engineering fabrication workshop with steel vessels and industrial machinery" />
        </motion.div>
        <Reveal>
          <div className="mb-4 flex items-center gap-4"><SectionNo n="08" /><Eyebrow>Our facility</Eyebrow></div>
          <h2>Built for industrial fabrication.</h2>
          <p className="section-intro">Saghai Engineering operates from approximately 30,000 sq. ft. of covered fabrication area across three fabrication bays.</p>
          <p className="section-intro">Industrial equipment and fabrication infrastructure support cutting, forming, welding, finishing, inspection and testing activities.</p>
          <dl className="mt-8 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3">
            {facilityStats.map(([v, l]) => (
              <div key={l} className="bg-background p-4">
                <dt className="text-2xl font-semibold">{v}</dt>
                <dd className="mt-1 text-xs text-muted-foreground">{l}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 10 Project experience – interactive showcase (no invented photos)   */
/* ------------------------------------------------------------------ */
const projects = [
  { t: 'Chemical Storage Vessel', specs: [['Material', 'SA516'], ['Approx. Weight', '8 tonnes']], d: 'Jacketed chemical storage vessel with inner and outer tank construction.' },
  { t: 'SS304 Process Vessel', specs: [['Application', 'Chemical Plant'], ['Material', 'SS304'], ['Size', '2,000 mm diameter × 9,000 mm long']] },
  { t: 'Dozer Axle Housing', specs: [['Material', 'Mild Steel'], ['Weight', '3 tonnes']] },
  { t: 'Motor Grader Drawbar', specs: [['Material', 'Mild Steel'], ['Weight', '1.5 tonnes'], ['Plate', '22 mm thick'], ['Length', '4 m']] },
  { t: 'Water Sprinkler Tank', specs: [['Capacity', '28,000 L'], ['Material', 'Mild Steel'], ['Weight', '9 tonnes']] },
  { t: '20 KL Tank & Cone Structure', specs: [['Material', 'Mild Steel']] },
  { t: '32 KL Tank', specs: [['Material', 'Mild Steel']] },
] as { t: string; specs: string[][]; d?: string }[];

export function ProjectExperience() {
  const [active, setActive] = useState(0);
  const p = projects[active];
  if (!p) return null;

  return (
    <section className="section">
      <div className="site-container">
        <Heading n="09" eyebrow="Project experience" title="Fabrication experience across demanding applications." intro="Our documented project experience includes vessels, tanks, earthmoving equipment components and other custom-engineered products."
          action={<Link to="/projects" className="text-link">View Project Experience<ArrowRight size={17} /></Link>} />
        <Reveal className="grid gap-6 lg:grid-cols-[0.9fr_1.4fr]">
          <div role="tablist" aria-label="Projects" className="flex flex-col border border-border">
            {projects.map((x, i) => (
              <button key={x.t} role="tab" aria-selected={i === active} onClick={() => setActive(i)}
                className={`flex items-center gap-4 border-b border-border px-4 py-3 text-left text-sm transition-colors last:border-b-0 ${i === active ? 'bg-primary/5 font-semibold text-primary' : 'hover:bg-muted/40'}`}>
                <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>{x.t}
              </button>
            ))}
          </div>
          <div className="relative min-h-[20rem] overflow-hidden border border-border bg-muted/30 p-6 md:p-8">
            <Blueprint />
            <AnimatePresence mode="wait">
              <motion.div key={active} className="relative" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease }}>
                <span className="font-mono text-xs uppercase tracking-widest text-primary">Project {String(active + 1).padStart(2, '0')}</span>
                <h3 className="mb-4 mt-2 text-2xl font-semibold">{p.t}</h3>
                {p.d && <p className="mb-6 max-w-lg text-sm text-foreground/80">{p.d}</p>}
                <dl className="grid gap-px border border-border bg-border sm:grid-cols-2">
                  {p.specs.map(([k, v]) => (
                    <div key={k} className="bg-background p-4"><dt className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{k}</dt><dd className="mt-1 font-medium">{v}</dd></div>
                  ))}
                </dl>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 11 Quality & testing                                                */
/* ------------------------------------------------------------------ */
function Chips({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">{title}</h3>
      <div className="flex flex-wrap gap-2">{items.map((i) => <span key={i} className="border border-border bg-background px-3 py-1.5 font-mono text-xs">{i}</span>)}</div>
    </div>
  );
}

export function Quality() {
  return (
    <section className="section section-soft">
      <div className="site-container">
        <Heading n="10" eyebrow="Quality & testing" title="Quality-focused manufacturing with inspection capabilities." intro="Saghai Engineering follows a quality-focused approach to fabrication, supported by inspection and testing capabilities for industrial applications." />
        <Stagger className="mb-10 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-4">
          {['Ultrasonic Testing', 'Liquid Penetrant Testing', 'Radiography', 'Hydrostatic Testing'].map((t) => (
            <Item key={t} className="flex items-center gap-3 border border-border bg-background p-5"><ShieldCheck className="shrink-0 text-primary" size={22} strokeWidth={1.5} /><span className="font-medium">{t}</span></Item>
          ))}
        </Stagger>
        <Reveal className="grid gap-8 md:grid-cols-2">
          <Chips title="Welding processes" items={['FCAW', 'GMAW', 'SMAW', 'GTAW']} />
          <Chips title="Materials" items={['Mild Steel', 'Stainless Steel', 'Aluminium']} />
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 12 Global markets                                                   */
/* ------------------------------------------------------------------ */
const markets = [
  ['Saudi Arabia', 'Industrial and engineering opportunities across the Saudi market.'],
  ['Middle East', 'Custom-engineered products and fabricated components for industrial requirements.'],
  ['Europe', 'Engineering and fabricated product opportunities across European industrial markets.'],
  ['Latin America', 'Custom-engineered products and fabricated components for industrial requirements.'],
];

export function GlobalMarkets() {
  return (
    <section className="section">
      <div className="site-container">
        <Heading n="11" eyebrow="Global markets" title="Building opportunities across international industrial markets." intro="Saghai Engineering is positioned to pursue international B2B opportunities across key industrial markets."
          action={<Link to="/contact" className="text-link">Discuss an International Requirement<ArrowRight size={17} /></Link>} />
        <Stagger className="grid gap-4 sm:grid-cols-2">
          {markets.map(([t, d]) => (
            <Item key={t} className="group relative overflow-hidden border border-border bg-card p-8 transition-colors hover:border-primary/50 md:p-10">
              <Globe aria-hidden className="absolute -right-6 -top-6 text-primary/10" size={140} strokeWidth={1} />
              <h3 className="relative mb-3 text-2xl font-semibold">{t}</h3>
              <DrawLine className="relative mb-4 w-12" />
              <p className="relative max-w-sm text-sm text-muted-foreground">{d}</p>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 13 RFQ CTA                                                          */
/* ------------------------------------------------------------------ */
export function RfqCta() {
  return (
    <section className="section section-soft">
      <div className="site-container">
        <Reveal className="relative overflow-hidden border border-border bg-background p-8 text-center md:p-16">
          <Blueprint />
          <div className="relative mx-auto max-w-2xl">
            <Settings2 className="mx-auto mb-5 text-primary" size={28} strokeWidth={1.5} />
            <h2>Have a drawing or fabrication requirement?</h2>
            <p className="section-intro mx-auto">Share your drawing, specifications or project requirements with our team. We can review your requirement and understand the right fabrication approach for your application.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row [&>*]:w-full sm:[&>*]:w-auto">
              <QuoteLink />
              <Button asChild variant="outline" size="lg"><Link to="/contact">Contact Saghai Engineering</Link></Button>
            </div>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Custom requirements · Industrial applications · Engineering-focused manufacturing</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 14 Final contact CTA                                                */
/* ------------------------------------------------------------------ */
export function FinalCta() {
  return (
    <section className="section">
      <Reveal className="site-container text-center">
        <div className="mx-auto max-w-2xl">
          <Eyebrow>Start a conversation</Eyebrow>
          <h2>Let's discuss your next engineering requirement.</h2>
          <p className="section-intro mx-auto">Tell us what you need to manufacture. Share your requirement with Saghai Engineering.</p>
          <div className="mt-8 [&>*]:w-full sm:[&>*]:w-auto"><Button asChild size="lg"><Link to="/contact">Send Your Requirement<ArrowRight /></Link></Button></div>
        </div>
      </Reveal>
    </section>
  );
}

export const Route = createFileRoute('/')({
  head: () => pageHead('Saghai Engineering', 'Custom-engineered products and precision industrial fabrication since 1978.'),
  component: Home,
});

function Home() {
  return (
    <>
      <section className="hero">
        <img
          src={factory}
          width={1920}
          height={1024}
          className="hero-image"
          alt="Illustrative heavy engineering fabrication workshop with steel vessels and industrial machinery"
          fetchPriority="high"
        />
        <div className="site-container hero-content">
          <Eyebrow>Saghai Engineering · Established 1978</Eyebrow>
          <h1>
            Custom engineered<br />products.<br />
            <span>Built for industry.</span>
          </h1>
          <p className="hero-description">
            Precision fabrication solutions for heavy engineering and industrial applications. Backed by decades of manufacturing experience.
          </p>
          <div className="hero-actions">
            <QuoteLink />
            <Button asChild variant="heroOutline" size="lg">
              <Link to="/products">Explore Our Products<ArrowRight /></Link>
            </Button>
          </div>
        </div>
        <div className="site-container hero-bottom">
          <span>CUSTOM FABRICATION. PROVEN EXPERIENCE.</span>
          <span className="hero-scroll">EXPLORE OUR EXPERTISE<ArrowDown size={15} /></span>
          <span>01 <span className="mx-2 text-primary">━━━</span> ENGINEERED TO YOUR REQUIREMENTS</span>
        </div>
      </section>
      <Snapshot />
      <About />
      <CoreServices />
      <Capabilities />
      <Products />
      <Industries />
      <WhySaghai />
      <Facility />
      <ProjectExperience />
      <Quality />
      <GlobalMarkets />
      <RfqCta />
      <FinalCta />
    </>
  );
}