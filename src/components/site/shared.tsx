import { Link } from '@tanstack/react-router';
import { ArrowRight, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import factory from '@/assets/factory.jpg';
import laser from '@/assets/laser.jpg';
import vessels from '@/assets/vessels.jpg';
import { capabilities, services } from '@/lib/engineering';
export { factory, laser, vessels };
export function Brand() { return <Link to="/" className="brand" aria-label="Saghai Engineering home"><img src="/logo.png" alt="Saghai Engineering" className="brand-logo" width={2172} height={724}/></Link>; }
export function Eyebrow({children}:{children:React.ReactNode}) { return <div className="eyebrow">{children}</div>; }
export function QuoteLink({ children = 'Get a Quote', inverse = false }:{children?:React.ReactNode;inverse?:boolean}) { return <Button asChild variant={inverse ? 'inverse':'default'} size="lg"><Link to="/contact">{children}<ArrowRight size={16}/></Link></Button>; }
export function PageBanner({title,description,category='Company'}:{title:string;description:string;category?:string}) { return <section className="page-banner"><div className="site-container"><div className="breadcrumbs"><Link to="/">Home</Link><ChevronRight size={12}/><span>{title}</span></div><Eyebrow>{category}</Eyebrow><h1>{title}</h1><p>{description}</p></div></section>; }
export function CTA() { return <section className="cta-band"><div className="site-container cta-inner"><div><h2>Have a requirement? Let’s engineer it.</h2><p>Share your drawings and specifications. We’ll discuss the right fabrication solution.</p></div><QuoteLink inverse>Discuss Your Project</QuoteLink></div></section>; }
export function CheckList({items}:{items:readonly string[]}) { return <div className="check-list">{items.map(item=><div className="check-item" key={item}><Check/><span>{item}</span></div>)}</div>; }
export function Stats() { return <div className="stat-strip"><div className="site-container stats">{[[String(capabilities.established),'Established in'],[capabilities.facilityArea.toLocaleString('en-IN'),'Sq. ft. covered facility'],[String(capabilities.pressing),'Tonnes pressing capacity'],[String(capabilities.bays),'Dedicated fabrication bays']].map(([value,label],i)=><div className="stat" key={label}><div className="stat-value">{value}{i===1&&<span> sq. ft.</span>}{i===2&&<span> T</span>}</div><div className="stat-label">{label}</div></div>)}</div></div>; }
export function ServiceCards() { return <div className="service-grid">{services.map((service,i)=><Link to="/services/$service" params={{service:service.slug}} className="service-card" key={service.slug}><div className="overflow-hidden"><img src={[laser,factory,vessels][i]} alt={service.name+' — illustrative industrial photograph'} width={1200} height={800} loading="lazy" className="service-card-image"/></div><div className="service-card-body"><span className="service-number">0{i+1}</span><h3>{service.name}</h3><p>{service.description}</p><div className="service-card-bottom"><span>{service.range ? `${service.range} thickness` : 'Custom formed components'}</span><ArrowRight size={17}/></div></div></Link>)}</div>; }
