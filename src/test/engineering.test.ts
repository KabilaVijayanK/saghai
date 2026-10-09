import { describe, it, expect } from 'vitest';
import { capabilities, services } from '@/lib/engineering';
describe('Documented fabrication capabilities',()=>{
 it('limits laser cutting to 0.7–20 mm',()=>expect(capabilities.laser).toEqual({min:0.7,max:20}));
 it('limits bending to 3–50 mm',()=>expect(capabilities.bending).toEqual({min:3,max:50}));
 it('does not invent a dish-end numerical capacity',()=>expect(services.find(s=>s.slug==='compression-dish-end')?.range).toBeNull());
 it('documents pressing up to 600 tonnes',()=>expect(capabilities.pressing).toBe(600));
 it('documents oxyfuel cutting up to 150 mm',()=>expect(capabilities.oxyfuel).toBe(150));
 it('documents a 30000 sq. ft. covered facility',()=>expect(capabilities.facilityArea).toBe(30000));
 it('documents three fabrication bays',()=>expect(capabilities.bays).toBe(3));
});
