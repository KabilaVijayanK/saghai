import { describe, it, expect } from 'vitest';
import { capabilities, manufacturingCapabilities, services } from '@/lib/engineering';
describe('Documented fabrication capabilities',()=>{
 it('limits laser cutting to 0.7–20 mm',()=>expect(capabilities.laser).toEqual({min:0.7,max:20}));
 it('limits bending to 3–50 mm',()=>expect(capabilities.bending).toEqual({min:3,max:50}));
 it('does not invent a dish-end numerical capacity',()=>expect(services.find(s=>s.slug==='compression-dish-end')?.range).toBeNull());
 it('documents pressing up to 600 tonnes',()=>expect(capabilities.pressing).toBe(600));
 it('documents oxyfuel cutting up to 150 mm',()=>expect(capabilities.oxyfuel).toBe(150));
 it('documents a 30000 sq. ft. covered facility',()=>expect(capabilities.facilityArea).toBe(30000));
 it('documents three fabrication bays',()=>expect(capabilities.bays).toBe(3));
 it('keeps the Services offering limited to the three published services',()=>expect(services.map(service=>service.name)).toEqual(['Laser Cutting','Bending','Compression Dish End']));
 it('includes the requested manufacturing capabilities',()=>expect(manufacturingCapabilities.map(capability=>capability.name)).toEqual(['Hydraulic Pressing','CNC Laser Cutting','CNC Oxyfuel Cutting','Plate Forming / Bending','Welding','Blasting & Painting','Inspection & Testing']));
});
