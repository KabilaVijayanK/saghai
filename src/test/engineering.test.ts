import { describe, it, expect } from 'vitest';
import { capabilities, manufacturingCapabilities, products, services } from '@/lib/engineering';
describe('Documented fabrication capabilities',()=>{
 it('limits laser cutting to 0.7–20 mm',()=>expect(capabilities.laser).toEqual({min:0.7,max:20}));
 it('limits bending to 3–50 mm',()=>expect(capabilities.bending).toEqual({min:3,max:50}));
 it('documents pressing up to 600 tonnes',()=>expect(capabilities.pressing).toBe(600));
 it('documents oxyfuel cutting up to 150 mm',()=>expect(capabilities.oxyfuel).toBe(150));
 it('documents a 30000 sq. ft. covered facility',()=>expect(capabilities.facilityArea).toBe(30000));
 it('documents three fabrication bays',()=>expect(capabilities.bays).toBe(3));
 it('keeps the Services offering limited to laser cutting and bending',()=>expect(services.map(service=>service.name)).toEqual(['Laser Cutting','Bending']));
 it('classifies Compression Dish Ends as a product component',()=>expect(products.find(product=>product.name==='Compression Dish Ends')).toMatchObject({description:'Formed end components for industrial vessels, tanks and engineered equipment, manufactured according to customer drawings and specifications.',examples:['Industrial vessels','Tanks','Process equipment','Custom fabricated products']}));
 it('includes the requested manufacturing capabilities',()=>expect(manufacturingCapabilities.map(capability=>capability.name)).toEqual(['Hydraulic Pressing','CNC Laser Cutting','CNC Oxyfuel Cutting','Plate Forming / Bending','Welding','Blasting & Painting','Inspection & Testing']));
});
