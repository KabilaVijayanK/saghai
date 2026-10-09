import { createFileRoute } from '@tanstack/react-router';
import { PageBanner, ServiceCards, CTA } from '@/components/site/shared';
import { pageHead } from '@/lib/engineering';
export const Route=createFileRoute('/services/')({head:()=>pageHead('Fabrication Services','CNC laser cutting, industrial plate bending and compression dish end manufacturing for engineering applications.'),component:Services});
function Services(){return <><PageBanner title="Our Services" category="Precision fabrication" description="Saghai Engineering provides specialized fabrication services for industrial and engineering applications, developed around your drawings and specifications."/><section className="section"><div className="site-container"><ServiceCards/></div></section><CTA/></>;}
