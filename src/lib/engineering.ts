export const capabilities = { laser: { min: 0.7, max: 20 }, bending: { min: 3, max: 50 }, pressing: 600, oxyfuel: 150, facilityArea: 30000, bays: 3 };
export const services = [
 { slug: 'laser-cutting', name: 'Laser Cutting', tagline: 'Precision CNC Laser Cutting for Industrial Components', description: 'Precision CNC laser cutting for industrial components and custom fabrication requirements.', range: '0.7–20 mm', applications: ['Industrial components', 'Sheet metal components', 'Fabricated parts', 'Engineering components', 'Custom-cut profiles'], cta: 'Send Your Drawing' },
 { slug: 'bending', name: 'Bending', tagline: 'Industrial Plate Bending for Fabricated Components', description: 'Industrial plate bending for components and fabricated products requiring controlled forming and accurate geometry.', range: '3–50 mm', applications: ['Industrial components', 'Fabricated structures', 'Tank components', 'Engineering components', 'Custom-formed parts'], cta: 'Discuss Your Bending Requirement' },
 { slug: 'compression-dish-end', name: 'Compression Dish End', tagline: 'Compression Dish End Manufacturing', description: 'Compression dish end manufacturing for industrial tanks, vessels and other fabricated products requiring formed end components.', range: null, applications: ['Tanks', 'Vessels', 'Industrial equipment', 'Process equipment', 'Custom fabricated products'], cta: 'Send Your Dish End Requirement' },
] as const;
export const products = [
 { name: 'Pressure Vessels', description: 'Fabricated vessels for industrial and process applications, including jacketed vessels and chemical storage vessels.' },
 { name: 'Storage Tanks', description: 'Industrial tanks fabricated according to application requirements, including chemical storage tanks, RO water treatment tanks and large-capacity tanks.' },
 { name: 'Heat Exchangers', description: 'Custom-engineered fabricated products for industrial process applications.' },
 { name: 'Earthmoving Equipment Components', description: 'Heavy fabricated components including dozer axle housings, motor grader drawbars, front axle components, dozer C-frames, dozer blades and equipment chassis.' },
 { name: 'Industrial Structures', description: 'Custom fabricated structures and components for heavy engineering and industrial applications.' },
 { name: 'Process Plant Components', description: 'Fabricated components for process plants, including applications in chemical and textile industries.' },
 { name: 'Sheet Metal Components', description: 'Custom sheet metal components manufactured according to customer requirements.' },
];
export const industries = [
 ['Heavy Engineering', 'Custom fabricated components and engineered products for heavy industrial applications.'],
 ['Chemical Industry', 'Fabricated vessels, tanks and process-related components.'],
 ['Textile Industry', 'Custom components for textile-related process applications.'],
 ['Construction Equipment', 'Fabricated components for earthmoving equipment such as dozers and motor graders.'],
 ['Water Treatment', 'Storage and treatment-related tanks and fabricated products.'],
 ['Defense', 'Custom fabricated components for specialized applications.'],
 ['Marine', 'Fabricated structures and components for marine applications.'],
 ['Manufacturing', 'Custom engineered products and fabricated components for manufacturing applications.'],
];
export const projects = [
 { name: 'Chemical Storage Vessel', category: 'Process equipment', details: ['Material: SA516', 'Approximate weight: 8 tonnes', 'Jacketed vessel with inner and outer tanks'] },
 { name: 'SS304 Process Vessel', category: 'Process equipment', details: ['Application: Chemical plant', 'Material: SS304', '2,000 mm diameter × 9,000 mm long'] },
 { name: 'Dozer Axle Housing', category: 'Heavy equipment', details: ['Material: Mild steel', 'Weight: 3 tonnes'] },
 { name: 'Motor Grader Drawbar', category: 'Heavy equipment', details: ['Material: Mild steel', 'Weight: 1.5 tonnes', 'Plate thickness: 22 mm', 'Length: 4 m'] },
 { name: 'Water Sprinkler Tank', category: 'Tanks & structures', details: ['Capacity: 28,000 L', 'Material: Mild steel', 'Weight: 9 tonnes'] },
 { name: '20 KL Tank & Cone Structure', category: 'Tanks & structures', details: ['Material: Mild steel'] },
 { name: '32 KL Tank', category: 'Tanks & structures', details: ['Material: Mild steel'] },
];
export function pageHead(title: string, description: string) { const full = `${title} | Saghai Engineering`; return { meta: [{ title: full }, { name: 'description', content: description }, { property: 'og:title', content: full }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }; }
