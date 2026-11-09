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
