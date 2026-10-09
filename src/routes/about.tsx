import { useEffect, useRef, type ReactNode } from "react";
import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowDown, ArrowRight, Globe2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckList, Eyebrow, factory, vessels } from "@/components/site/shared";
import {
  capabilities,
  globalMarkets,
  industries,
  manufacturingCapabilities,
  pageHead,
  testingMethods,
} from "@/lib/engineering";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead(
      "About Us — Engineering Since 1978",
      "Learn about Saghai Engineering’s manufacturing experience, industrial infrastructure, quality approach and global markets.",
    ),
  component: About,
});

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } };

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
      {children}
    </motion.div>
  );
}

function Heading({ eyebrow, title, intro, aside }: { eyebrow: string; title: ReactNode; intro?: string; aside?: ReactNode }) {
  return (
    <Reveal className="mb-12 flex items-end justify-between gap-6 md:mb-16">
      <div className="max-w-3xl">
        <div className="mb-4"><Eyebrow>{eyebrow}</Eyebrow></div>
        <h2>{title}</h2>
        {intro && <p className="section-intro">{intro}</p>}
      </div>
      {aside}
    </Reveal>
  );
}

function Blueprint({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)] ${className}`}
    />
  );
}

function Brackets() {
  return (
    <>
      <span aria-hidden className="absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-primary" />
      <span aria-hidden className="absolute right-3 top-3 h-5 w-5 border-r-2 border-t-2 border-primary" />
      <span aria-hidden className="absolute bottom-3 left-3 h-5 w-5 border-b-2 border-l-2 border-primary" />
      <span aria-hidden className="absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-primary" />
    </>
  );
}

function ParallaxImg({ src, alt, className = "", width, height }: { src: string; alt: string; className?: string; width?: number; height?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "8%"]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img src={src} alt={alt} width={width} height={height} loading="lazy" style={{ y, scale: 1.18 }} className="h-full w-full object-cover" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Leadership data. Add `photo: "/team/maria.webp"` when you have real */
/* portraits; until then a monogram is shown (no invented photos).     */
/* ------------------------------------------------------------------ */
const leaders = [
  {
    name: "Maria Irudayaraj",
    initials: "MI",
    role: "Founder & CEO",
    photo: undefined as string | undefined,
    body: `Founded Saghai Engineering in ${capabilities.established}; technical experience and a hands-on approach helped shape the company’s fabrication expertise and manufacturing foundation.`,
  },
  {
    name: "Daniel Irudayaraj",
    initials: "DI",
    role: "Director",
    photo: undefined as string | undefined,
    body: "Joined the family business in 2023 after international experience with Automotive Tier-1 suppliers in Detroit, Michigan. His supplier development and commodity management background contributes a strategic perspective to the company.",
  },
];

function Avatar({ l, size }: { l: (typeof leaders)[number]; size: string }) {
  return l.photo ? (
    <img src={l.photo} alt={l.name} loading="lazy" className={`${size} object-cover`} />
  ) : (
    <div aria-hidden className={`${size} flex items-center justify-center bg-primary font-semibold text-primary-foreground`}>
      {l.initials}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
function About() {
  const hash = useRouterState({ select: (state) => state.location.hash });
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "22%"]);
  const heroFade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    if (!hash) return;
    document.getElementById(hash.replace(/^#/, ""))?.scrollIntoView({ behavior: "instant", block: "start" });
  }, [hash]);

  const stats = [
    [`${capabilities.facilityArea.toLocaleString("en-IN")}+`, "Sq. ft. covered fabrication area"],
    [`${capabilities.bays}`, "Fabrication bays"],
    [`${capabilities.pressing} T`, "Hydraulic press capacity"],
    [`${capabilities.oxyfuel} mm`, "Documented oxyfuel cutting capability"],
  ];

  return (
    <>
      {/* 1 ── Hero ─────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative isolate flex min-h-[85svh] flex-col justify-end overflow-hidden bg-neutral-950 text-white">
        <motion.img
          src={factory}
          width={1920}
          height={1024}
          fetchPriority="high"
          style={{ y: heroY }}
          initial={reduce ? false : { scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease }}
          className="absolute inset-0 -z-20 h-[118%] w-full object-cover"
          alt="Illustrative heavy engineering fabrication workshop"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/60 to-black/10" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-transparent to-black/50" />

        <motion.div style={{ opacity: heroFade }} className="site-container pb-16 pt-40 md:pb-24">
          <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-4xl">
            <motion.div variants={fadeUp}><Eyebrow>Established in {capabilities.established}</Eyebrow></motion.div>
            <motion.h1 variants={fadeUp} className="mt-5 text-5xl font-semibold leading-[1.02] tracking-tight text-white md:text-7xl lg:text-8xl">
              Saghai <span className="text-primary">Engineering</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg text-white/75">
              Custom-engineered products and industrial fabrication, shaped by decades of manufacturing experience and a customer-focused approach.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row [&>*]:w-full sm:[&>*]:w-auto">
              <Button asChild size="lg"><Link to="/contact">Request a Quote<ArrowRight size={16} /></Link></Button>
              <Button asChild variant="heroOutline" size="lg"><Link to="/contact">Contact Us</Link></Button>
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="border-t border-white/15 bg-black/45 backdrop-blur-md">
          <div className="site-container flex items-center justify-between py-4 text-sm text-white/70">
            <span>Coimbatore, India</span>
            <span className="flex items-center gap-2">
              Our story
              <motion.span animate={reduce ? undefined : { y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}><ArrowDown size={14} /></motion.span>
            </span>
            <span>Engineering since {capabilities.established}</span>
          </div>
        </div>
      </section>

      {/* 2 ── Story ────────────────────────────────────────────── */}
      <section className="section scroll-mt-24" id="story">
        <div className="site-container grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="mb-4"><Eyebrow>Our story</Eyebrow></div>
            <h2>Built through experience. Focused on what comes next.</h2>
            <p className="section-intro">
              Founded in {capabilities.established} by Maria Irudayaraj, Saghai Engineering has developed decades of experience in metal fabrication and engineered products.
            </p>
            <p className="section-intro">
              The company’s product experience includes pressure vessels, heat exchangers, earthmoving equipment components, storage tanks, process plant components, sheet metal components and other custom-engineered requirements.
            </p>
            <p className="section-intro">
              Each requirement starts with understanding customer drawings, specifications and intended application, then aligning manufacturing to the needs of the project.
            </p>
          </Reveal>
          <div className="relative">
            <ParallaxImg src={vessels} width={1200} height={800} alt="Illustrative custom fabricated stainless steel vessels" className="aspect-[4/5] md:aspect-[3/4]" />
            <Brackets />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
              <span className="text-sm text-white/80">Established</span>
              <span className="text-6xl font-semibold leading-none md:text-7xl">{capabilities.established}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3 ── Founder & leadership (moved up) ──────────────────── */}
      <section className="section section-soft relative scroll-mt-24 overflow-hidden" id="leadership">
        <Blueprint />
        <div className="site-container relative">
          <Heading
            eyebrow="Leadership & company experience"
            title="Leadership shaped by manufacturing and industry experience."
          />

          <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr]">
            {/* Founder: the feature card */}
            <Reveal className="relative isolate overflow-hidden bg-neutral-950 p-8 text-white md:p-12">
              <span aria-hidden className="pointer-events-none absolute -bottom-10 -right-4 -z-10 select-none text-[9rem] font-semibold leading-none text-white/[0.05] md:text-[14rem]">
                {capabilities.established}
              </span>
              <img src={factory} alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-20" />
              <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-br from-neutral-950 via-neutral-950/90 to-neutral-950/60" />
              <Brackets />
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <Avatar l={leaders[0]} size="h-24 w-24 shrink-0 text-3xl md:h-32 md:w-32 md:text-4xl" />
                <div>
                  <span className="inline-block border border-primary/60 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">{leaders[0].role}</span>
                  <h3 className="mt-3 text-3xl font-semibold text-white md:text-4xl">{leaders[0].name}</h3>
                </div>
              </div>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">{leaders[0].body}</p>
              <div className="mt-8 flex items-center gap-3 text-sm text-white/60">
                <span className="h-px w-10 bg-primary" />
                Founded the company in {capabilities.established}
              </div>
            </Reveal>

            {/* Director */}
            <Reveal className="relative flex flex-col border border-border border-t-2 border-t-primary bg-background p-8 md:p-10">
              <div className="flex items-center gap-5">
                <Avatar l={leaders[1]} size="h-20 w-20 shrink-0 text-2xl md:h-24 md:w-24 md:text-3xl" />
                <div>
                  <span className="text-sm font-medium text-primary">{leaders[1].role}</span>
                  <h3 className="mt-1 text-2xl font-semibold">{leaders[1].name}</h3>
                </div>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">{leaders[1].body}</p>
              <div className="mt-auto flex items-center gap-3 pt-8 text-sm text-muted-foreground">
                <span className="h-px w-10 bg-primary" />
                Joined the company in 2023
              </div>
            </Reveal>
          </div>

          {/* Timeline of facts already on the page */}
          <Reveal className="relative mt-12 grid grid-cols-2 gap-6 border-t border-border pt-8 md:mt-16">
            <div className="relative">
              <span aria-hidden className="absolute -top-[2.05rem] left-0 h-3 w-3 border border-primary bg-background" />
              <div className="text-3xl font-semibold md:text-4xl">{capabilities.established}</div>
              <p className="mt-1 text-sm text-muted-foreground">Saghai Engineering founded by Maria Irudayaraj</p>
            </div>
            <div className="relative text-right md:text-left">
              <span aria-hidden className="absolute -top-[2.05rem] right-0 h-3 w-3 border border-primary bg-primary md:left-0 md:right-auto" />
              <div className="text-3xl font-semibold md:text-4xl">2023</div>
              <p className="mt-1 text-sm text-muted-foreground">Daniel Irudayaraj joins the family business</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4 ── Infrastructure ───────────────────────────────────── */}
      <section className="section scroll-mt-24" id="infrastructure">
        <div className="site-container">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div className="relative order-2 lg:order-1">
              <ParallaxImg src={factory} width={1920} height={1024} alt="Illustrative industrial manufacturing facility" className="aspect-[4/3]" />
              <Brackets />
              <span className="absolute bottom-5 left-5 text-sm text-white/85">Industrial fabrication infrastructure</span>
            </div>
            <Reveal className="order-1 lg:order-2">
              <div className="mb-4"><Eyebrow>Infrastructure</Eyebrow></div>
              <h2>A dedicated facility for demanding fabrication requirements.</h2>
              <p className="section-intro">
                Saghai Engineering operates from a covered fabrication facility designed to support custom-engineered products and industrial manufacturing requirements.
              </p>
              <CheckList
                items={[
                  "Manufacturing equipment for cutting, forming and pressing",
                  "Welding, finishing, inspection and testing capabilities",
                  "Fabrication infrastructure for customer-specific products",
                ]}
              />
            </Reveal>
          </div>

          <Reveal className="mt-14 grid grid-cols-2 border-l border-t border-border lg:grid-cols-4">
            {stats.map(([v, l]) => (
              <div key={l} className="border-b border-r border-border bg-background p-6 md:p-8">
                <strong className="block text-3xl font-semibold tracking-tight md:text-5xl">{v}</strong>
                <span className="mt-3 block h-px w-10 bg-primary" />
                <span className="mt-3 block text-sm text-muted-foreground">{l}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 5 ── Capabilities ─────────────────────────────────────── */}
      <section className="section section-soft relative scroll-mt-24 overflow-hidden" id="capabilities">
        <Blueprint />
        <div className="site-container relative">
          <Heading
            eyebrow="Manufacturing capabilities"
            title="Processes to support custom-engineered products."
            intro="Manufacturing capabilities support multiple stages of industrial fabrication. Scope and specifications are confirmed against each customer requirement."
          />
          <Reveal className="grid border-l border-t border-border bg-background sm:grid-cols-2 lg:grid-cols-3">
            {manufacturingCapabilities.map((capability) => (
              <article key={capability.name} className="group border-b border-r border-border p-7 transition-colors hover:bg-primary hover:text-primary-foreground">
                <span aria-hidden className="mb-5 block h-0.5 w-10 bg-primary transition-all duration-500 group-hover:w-20 group-hover:bg-primary-foreground" />
                <h3 className="mb-2 text-lg font-semibold">{capability.name}</h3>
                <p className="text-sm text-muted-foreground transition-colors group-hover:text-primary-foreground/85">{capability.description}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 6 ── Quality ──────────────────────────────────────────── */}
      <section className="section scroll-mt-24" id="quality">
        <div className="site-container grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="mb-4"><Eyebrow>Quality & testing</Eyebrow></div>
            <h2>Quality-focused manufacturing, supported by inspection.</h2>
            <p className="section-intro">
              Inspection and testing capabilities are applied according to project requirements and specifications.
            </p>
          </Reveal>
          <Reveal className="relative isolate overflow-hidden bg-neutral-950 p-8 text-white md:p-10">
            <img src={vessels} alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-20" />
            <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-neutral-950/70 to-neutral-950" />
            <ShieldCheck className="text-primary" size={36} strokeWidth={1.4} />
            <h3 className="mb-5 mt-4 text-2xl font-semibold text-white">Inspection & testing capabilities</h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {[...testingMethods].map((m) => (
                <li key={m} className="flex items-center gap-3 border border-white/15 bg-white/5 px-4 py-3 text-sm backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 shrink-0 bg-primary" />{m}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 7 ── Industries ───────────────────────────────────────── */}
      <section className="section section-soft scroll-mt-24" id="industries">
        <div className="site-container">
          <Heading eyebrow="Industries & applications" title="Fabrication experience across industrial sectors." />
          <Reveal className="grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-4">
            {industries.map(([name, description]) => (
              <article key={name} className="group border border-border bg-background p-6 transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-lg">
                <span aria-hidden className="mb-4 block h-0.5 w-8 bg-primary transition-all duration-500 group-hover:w-16" />
                <h3 className="mb-2 text-lg font-semibold">{name.replace(" Industry", "")}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

    {/* 8 ── Global markets ───────────────────────────────────── */}
<section className="section scroll-mt-24" id="global-markets">
  <div className="site-container">
    <Heading
      eyebrow="Global markets"
      title="Serving global industrial markets."
      intro="Saghai Engineering is targeting international B2B opportunities across these markets."
      aside={<Globe2 aria-hidden className="hidden shrink-0 text-primary md:block" size={84} strokeWidth={1} />}
    />
    <Reveal className="grid gap-4 sm:grid-cols-2">
      {globalMarkets.map((market) => (
        <article
          key={market.name}
          className="group relative isolate flex min-h-[320px] flex-col justify-end overflow-hidden border border-border bg-card transition-colors hover:border-primary/60 md:min-h-[380px]"
        >
          <img
            src={market.image}
            alt={market.imageAlt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* legibility overlay */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/45 to-black/10 transition-opacity duration-500 group-hover:from-black/90"
          />

          <div className="p-8 md:p-10">
            <h3 className="mb-3 text-2xl font-semibold text-white">{market.name}</h3>
            <span aria-hidden className="mb-4 block h-px w-12 bg-primary transition-all duration-500 group-hover:w-24" />
            <p className="max-w-sm text-sm text-white/80">{market.description}</p>
          </div>
        </article>
      ))}
    </Reveal>
  </div>
</section>
      {/* 9 ── Why Saghai ───────────────────────────────────────── */}
      <section className="section section-soft">
        <div className="site-container grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <div className="mb-4"><Eyebrow>Why Saghai Engineering</Eyebrow></div>
            <h2>Experience and capability, grounded in customer requirements.</h2>
          </Reveal>
          <Reveal className="relative bg-background p-8 md:p-10">
            <span aria-hidden className="absolute left-0 top-0 h-full w-1 bg-primary" />
            <CheckList
              items={[
                `Established in ${capabilities.established} with decades of manufacturing experience`,
                "Custom-engineered products developed to customer drawings and specifications",
                `${capabilities.facilityArea.toLocaleString("en-IN")}+ sq. ft. covered fabrication area across ${capabilities.bays} bays`,
                "Industrial fabrication infrastructure and multiple manufacturing capabilities",
                "Quality-focused approach supported by inspection and testing",
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* 10 ── CTA ─────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-neutral-950 py-20 text-white md:py-28">
        <img src={vessels} alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-25" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-neutral-950 via-neutral-950/85 to-neutral-950/40" />
        <div className="site-container flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <Reveal className="max-w-xl">
            <h2 className="text-white">Have an engineering requirement?</h2>
            <p className="mt-3 text-white/70">Share your drawings and specifications to discuss a fabrication solution.</p>
          </Reveal>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row [&>*]:w-full sm:[&>*]:w-auto">
            <Button asChild variant="inverse" size="lg"><Link to="/contact">Request a Quote<ArrowRight size={16} /></Link></Button>
            <Button asChild variant="heroOutline" size="lg"><Link to="/contact">Contact Us</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}