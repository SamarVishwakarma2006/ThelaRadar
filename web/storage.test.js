import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
// Exercise the shipped persistence function with faulting Storage implementations.
const app=readFileSync(new URL('./app.js',import.meta.url),'utf8');
const start=app.indexOf('function persistDemo(next){');
const source=app.slice(start,app.indexOf('function restoreDemo(base)',start));
for(const operation of ['getItem','setItem'])test(`blocked storage ${operation} never reports success`,()=>{
 let message='',writes=0;
 const context={demoSnapshot:'old',localStorage:{getItem(){if(operation==='getItem')throw new Error('denied');return 'old';},setItem(){writes++;throw new Error('quota');}},toast(value){message=value;}};
 assert.equal(runInNewContext(source+';persistDemo([{state:"finished"}])',context),false);
 assert.equal(context.demoSnapshot,'old');
 assert.match(message,/blocked or full/);
 assert.equal(writes,operation==='getItem'?0:1);
});
test('stale vendor snapshot cannot overwrite a newer value',()=>{
 let writes=0;
 const context={demoSnapshot:'old',localStorage:{getItem:()=> 'new',setItem(){writes++;}},toast(){}};
 assert.equal(runInNewContext(source+';persistDemo([])',context),false);
 assert.equal(writes,0);
});

test('edited profile survives restore without changing attendance, and invalid edits are rejected',async()=>{
 const {createVendors}=await import('./data.js');
 const fields=app.slice(app.indexOf('function menuFields('),app.indexOf("dashboard.addEventListener('submit'"));
 const restore=app.slice(app.indexOf('function restoreDemo('),app.indexOf('function readReports('));
 const base=createVendors(),edited=structuredClone(base);
 Object.assign(edited[0],{name:'QA sample stall',landmark:'QA public landmark',hours:'9 am – 11 am IST'});
 const context={base,localStorage:{getItem:()=>JSON.stringify(edited)},toast(){},persistDemo(){}};
 const result=runInNewContext(fields+restore+';restoreDemo(base)',context);
 assert.equal(result[0].name,edited[0].name);
 assert.equal(result[0].landmark,edited[0].landmark);
 assert.equal(result[0].hours,edited[0].hours);
 assert.equal(result[0].state,base[0].state);
 assert.equal(result[0].expiresAt,base[0].expiresAt);
 for(const name of ['   ','x'.repeat(101),null]){
  context.input={name,landmark:'Public landmark',hours:'9 am'};
  assert.throws(()=>runInNewContext(fields+';profileFields(input)',context),/Complete all profile/);
 }
});

test('menu prices and names validate and edited items survive reload',async()=>{
 const {createVendors}=await import('./data.js');
 const helpers=app.slice(app.indexOf('function menuFields('),app.indexOf("dashboard.addEventListener('submit'"));
 const restore=app.slice(app.indexOf('function restoreDemo('),app.indexOf('function readReports('));
 const base=createVendors(),edited=structuredClone(base);
 Object.assign(edited[0].items[0],{name:'QA snack <special>',price:25.50,soldOut:true});
 const context={base,localStorage:{getItem:()=>JSON.stringify(edited)},toast(){},persistDemo(){}};
 const result=runInNewContext(helpers+restore+';restoreDemo(base)',context);
 assert.equal(result[0].items[0].name,'QA snack <special>');
 assert.equal(result[0].items[0].price,25.5);
 assert.equal(result[0].items[0].soldOut,true);
 assert.equal(result[0].state,base[0].state);
 for(const price of [0,-1,NaN,Infinity,10001,1.001]){
  context.items=[{name:'Snack',price}];
  assert.throws(()=>runInNewContext(helpers+';menuFields(items)',context),/Prices must/);
 }
 for(const items of [[{name:' ',price:10}],[{name:'Snack',price:10},{name:' snack ',price:20}]]){
  context.items=items;
  assert.throws(()=>runInNewContext(helpers+';menuFields(items)',context));
 }
});
