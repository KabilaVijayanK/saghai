import { createFileRoute } from '@tanstack/react-router';
import { Factory, FlaskConical, Droplets, HardHat, Shield, Ship, Settings2, Layers } from 'lucide-react';
import { PageBanner, CTA } from '@/components/site/shared';
import { pageHead, industries } from '@/lib/engineering';
export const Route=createFileRoute('/industries')({head:()=>pageHead('Industries We Serve','Fabrication applications across heavy engineering, chemicals, textiles, construction equipment, water treatment, defense, marine and manufacturing.'),component:Industries});
const icons=[Factory,FlaskConical,Layers,HardHat,Droplets,Shield,Ship,Settings2];
function Industries(){return <><PageBanner title="Applications Across Industrial Sectors" category="Industries we serve" description="Saghai Engineering’s documented products and applications span multiple industrial sectors, with custom fabrication developed for specific application requirements."/><section className="section"><div className="site-container product-grid">{industries.map(([name,description],i)=>{const Icon=icons[i]??Factory;return <article className="product-item" key={name}><Icon className="text-primary" size={28}/><h3>{name}</h3><p>{description}</p></article>;})}</div></section><CTA/></>;}
