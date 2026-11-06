import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createVendors,availability,matches} from './data.js';

test('availability expires exactly at the boundary, without assuming closure',()=>{
  const now=1000000000, v=createVendors(now)[0];
  assert.equal(availability(v,v.expiresAt-1).live,true);
  assert.equal(availability(v,v.expiresAt).live,false);
  assert.equal(availability(v,v.expiresAt).kind,'unknown');
  assert.equal(availability({...v,state:'finished'},now).live,false);
  assert.equal(availability({...v,state:'hidden'},now).live,false);
});
test('combined search filters never turn schedules or expired evidence into confirmation',()=>{
  const now=1000000000, data=createVendors(now);
  assert.equal(data.filter(v=>matches(v,{query:'  VADA PAV ',category:'snacks',confirmed:true},now)).length,1);
  assert.equal(matches(data[2],{confirmed:true},now),false);
  assert.equal(matches(data[4],{confirmed:true},now),false);
  assert.equal(matches(data[0],{savedOnly:true,saved:[]},now),false);
  assert.equal(matches(data[0],{savedOnly:true,saved:['vada']},now),true);
  assert.equal(matches({...data[0],state:'hidden'},{},now),false);
});
