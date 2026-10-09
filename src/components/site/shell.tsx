import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Brand, QuoteLink } from "./shared";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/products", label: "Products" },
  { to: "/industries", label: "Industries" },
  { to: "/about", hash: "capabilities", label: "Capabilities" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="topbar">
        <div className="site-container topbar-inner">
          <span className="flex items-center gap-2">
            <MapPin size={12} />
            Coimbatore, Tamil Nadu, India <span className="mx-2">|</span> Engineering since 1978
          </span>
          <div className="flex items-center gap-6">
            <a
              href="mailto:Saghaiengg1978@gmail.com"
              className="topbar-email flex items-center gap-2"
            >
              <Mail size={12} />
              Saghaiengg1978@gmail.com
            </a>
            <a href="tel:+919585953545" className="flex items-center gap-2">
              <Phone size={12} />
              +91 95859 53545
            </a>
          </div>
        </div>
      </div>
      <header className="site-header">
        <div className="site-container nav-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            {navLinks.map((item) => {
              const activeOptions =
                item.label === "Home" || item.label === "About Us"
                  ? { exact: true, includeHash: false }
                  : item.label === "Capabilities"
                    ? { exact: true, includeHash: true }
                    : undefined;

              return (
                <Link
                  key={item.label}
                  to={item.to}
                  {...("hash" in item ? { hash: item.hash } : {})}
                  {...(activeOptions ? { activeOptions } : {})}
                  className="nav-link"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="header-quote">
            <QuoteLink />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="mobile-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
        {open && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {navLinks.map((item) => (
              <Link
                to={item.to}
                key={item.label}
                {...("hash" in item ? { hash: item.hash } : {})}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
      <main>{children}</main>
      <footer className="footer">
        <div className="site-container">
          <div className="footer-grid">
            <div>
              <Brand />
              <p>
                Custom-engineered products. Precision fabrication. Decades of manufacturing
                experience.
              </p>
              <div className="mt-5 text-xs text-inverse-muted">EST. 1978 · COIMBATORE, INDIA</div>
            </div>
            <div>
              <h3>Explore</h3>
              <div className="footer-links">
                <Link to="/about">About Us</Link>
                <Link to="/projects">Selected Projects</Link>
              </div>
            </div>
            <div>
              <h3>Our Expertise</h3>
              <div className="footer-links">
                <Link to="/services/$service" params={{ service: "laser-cutting" }}>
                  Laser Cutting
                </Link>
                <Link to="/services/$service" params={{ service: "bending" }}>
                  Bending
                </Link>
                <Link to="/products">
                  Compression Dish Ends
                </Link>
                <Link to="/products">Engineered Products</Link>
                <Link to="/industries">Industries We Serve</Link>
              </div>
            </div>
            <div>
              <h3>Let’s Connect</h3>
              <div className="footer-links">
                <span>
                  540/1 Vellakinar, Coimbatore – 641029,
                  <br />
                  Tamil Nadu, India
                </span>
                <a href="tel:+919585953545">+91 95859 53545</a>
                <a href="mailto:Saghaiengg1978@gmail.com" className="break-all">
                  Saghaiengg1978@gmail.com
                </a>
                <Link to="/contact" className="flex items-center gap-2">
                  Send Your Requirement <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Saghai Engineering. All rights reserved.</span>
            <span>Industrial imagery is illustrative.</span>
            <span>Precision in every detail.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
