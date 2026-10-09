import { useEffect } from "react";
import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, Globe2, ShieldCheck } from "lucide-react";
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

function About() {
  const hash = useRouterState({ select: (state) => state.location.hash });

  useEffect(() => {
    if (!hash) return;
    document
      .getElementById(hash.replace(/^#/, ""))
      ?.scrollIntoView({ behavior: "instant", block: "start" });
  }, [hash]);

  return (
    <>
      <section className="hero about-hero">
        <img
          src={factory}
          width={1920}
          height={1024}
          className="hero-image"
          alt="Illustrative heavy engineering fabrication workshop"
        />
        <div className="site-container hero-content">
          <Eyebrow>Established in {capabilities.established}</Eyebrow>
          <h1>
            Saghai <span>Engineering</span>
          </h1>
          <p className="hero-description">
            Custom-engineered products and industrial fabrication, shaped by decades of
            manufacturing experience and a customer-focused approach.
          </p>
          <div className="hero-actions">
            <Button asChild size="lg">
              <Link to="/contact">
                Request a Quote
                <ArrowRight size={16} />
              </Link>
            </Button>
            <Button asChild variant="heroOutline" size="lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
          <div className="about-hero-note">
            COIMBATORE, INDIA <span /> ENGINEERING SINCE {capabilities.established}
          </div>
        </div>
      </section>

      <section className="section" id="story">
        <div className="site-container story-grid">
          <div>
            <Eyebrow>Our story</Eyebrow>
            <h2>Built through experience. Focused on what comes next.</h2>
            <p className="section-intro">
              Founded in {capabilities.established} by Maria Irudayaraj, Saghai Engineering has
              developed decades of experience in metal fabrication and engineered products.
            </p>
            <p className="section-intro">
              The company’s product experience includes pressure vessels, heat exchangers,
              earthmoving equipment components, storage tanks, process plant components, sheet metal
              components and other custom-engineered requirements.
            </p>
            <p className="section-intro">
              Each requirement starts with understanding customer drawings, specifications and
              intended application, then aligning manufacturing to the needs of the project.
            </p>
          </div>
          <div className="story-visual">
            <img
              src={vessels}
              width={1200}
              height={800}
              loading="lazy"
              className="story-image"
              alt="Illustrative custom fabricated stainless steel vessels"
            />
            <div className="since-label">EST. {capabilities.established}</div>
          </div>
        </div>
      </section>

      <section className="section section-soft" id="infrastructure">
        <div className="site-container">
          <div className="story-grid">
            <div>
              <Eyebrow>Infrastructure</Eyebrow>
              <h2>A dedicated facility for demanding fabrication requirements.</h2>
              <p className="section-intro">
                Saghai Engineering operates from a covered fabrication facility designed to support
                custom-engineered products and industrial manufacturing requirements.
              </p>
              <CheckList
                items={[
                  "Manufacturing equipment for cutting, forming and pressing",
                  "Welding, finishing, inspection and testing capabilities",
                  "Fabrication infrastructure for customer-specific products",
                ]}
              />
            </div>
            <div className="about-facility-visual">
              <img
                src={factory}
                width={1920}
                height={1024}
                loading="lazy"
                className="story-image"
                alt="Illustrative industrial manufacturing facility"
              />
              <span>Industrial fabrication infrastructure</span>
            </div>
          </div>
          <div className="about-stat-grid">
            <article>
              <strong>{capabilities.facilityArea.toLocaleString("en-IN")}+</strong>
              <span>Sq. ft. covered fabrication area</span>
            </article>
            <article>
              <strong>{capabilities.bays}</strong>
              <span>Fabrication bays</span>
            </article>
            <article>
              <strong>{capabilities.pressing} T</strong>
              <span>Hydraulic press capacity</span>
            </article>
            <article>
              <strong>{capabilities.oxyfuel} mm</strong>
              <span>Documented oxyfuel cutting capability</span>
            </article>
          </div>
        </div>
      </section>

      <section className="section" id="capabilities">
        <div className="site-container">
          <div className="section-heading">
            <div>
              <Eyebrow>Manufacturing capabilities</Eyebrow>
              <h2>Processes to support custom-engineered products.</h2>
              <p className="section-intro">
                Manufacturing capabilities support multiple stages of industrial fabrication. Scope
                and specifications are confirmed against each customer requirement.
              </p>
            </div>
          </div>
          <div className="about-capability-grid">
            {manufacturingCapabilities.map((capability) => (
              <article className="about-capability-card" key={capability.name}>
                <span className="about-card-rule" />
                <h3>{capability.name}</h3>
                <p>{capability.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft" id="quality">
        <div className="site-container quality-layout">
          <div>
            <Eyebrow>Quality & testing</Eyebrow>
            <h2>Quality-focused manufacturing, supported by inspection.</h2>
            <p className="section-intro">
              Inspection and testing capabilities are applied according to project requirements and
              specifications.
            </p>
          </div>
          <div className="quality-panel">
            <ShieldCheck size={34} strokeWidth={1.4} />
            <h3>Inspection & testing capabilities</h3>
            <CheckList items={[...testingMethods]} />
          </div>
        </div>
      </section>

      <section className="section" id="industries">
        <div className="site-container">
          <div className="section-heading">
            <div>
              <Eyebrow>Industries & applications</Eyebrow>
              <h2>Fabrication experience across industrial sectors.</h2>
            </div>
          </div>
          <div className="about-industry-grid">
            {industries.map(([name, description]) => (
              <article key={name}>
                <h3>{name.replace(" Industry", "")}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft" id="global-markets">
        <div className="site-container">
          <div className="section-heading">
            <div>
              <Eyebrow>Global markets</Eyebrow>
              <h2>Serving global industrial markets.</h2>
              <p className="section-intro">
                Saghai Engineering is targeting international B2B opportunities across these
                markets.
              </p>
            </div>
            <Globe2 className="text-primary" size={72} strokeWidth={1} />
          </div>
          <div className="about-market-grid">
            {globalMarkets.map((market) => (
              <article key={market.name}>
                <h3>{market.name}</h3>
                <p>{market.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container why-about">
          <div>
            <Eyebrow>Why Saghai Engineering</Eyebrow>
            <h2>Experience and capability, grounded in customer requirements.</h2>
          </div>
          <CheckList
            items={[
              `Established in ${capabilities.established} with decades of manufacturing experience`,
              "Custom-engineered products developed to customer drawings and specifications",
              `${capabilities.facilityArea.toLocaleString("en-IN")}+ sq. ft. covered fabrication area across ${capabilities.bays} bays`,
              "Industrial fabrication infrastructure and multiple manufacturing capabilities",
              "Quality-focused approach supported by inspection and testing",
            ]}
          />
        </div>
      </section>

      <section className="section section-soft">
        <div className="site-container">
          <Eyebrow>Leadership & company experience</Eyebrow>
          <h2>Leadership shaped by manufacturing and industry experience.</h2>
          <div className="leader-grid">
            <article className="leader">
              <h3>Maria Irudayaraj</h3>
              <span className="text-primary text-xs font-semibold">Founder & CEO</span>
              <p>
                Founded Saghai Engineering in {capabilities.established}; technical experience and a
                hands-on approach helped shape the company’s fabrication expertise and manufacturing
                foundation.
              </p>
            </article>
            <article className="leader">
              <h3>Daniel Irudayaraj</h3>
              <span className="text-primary text-xs font-semibold">Director</span>
              <p>
                Joined the family business in 2023 after international experience with Automotive
                Tier-1 suppliers in Detroit, Michigan. His supplier development and commodity
                management background contributes a strategic perspective to the company.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="site-container cta-inner about-cta">
          <div>
            <h2>Have an Engineering Requirement?</h2>
            <p>Share your drawings and specifications to discuss a fabrication solution.</p>
          </div>
          <div className="about-cta-actions">
            <Button asChild variant="inverse" size="lg">
              <Link to="/contact">
                Request a Quote
                <ArrowRight size={16} />
              </Link>
            </Button>
            <Button asChild variant="heroOutline" size="lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
