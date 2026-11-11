import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const source=readFileSync(new URL('./community.js',import.meta.url),'utf8');
function mount(raw){
 const elements=new Map();
 const element=selector=>{
  if(!elements.has(selector))elements.set(selector,{innerHTML:'',textContent:'',addEventListener(){}});
  return elements.get(selector);
 };
 let stored=raw;
 const context={document:{querySelector:element},localStorage:{getItem(){if(stored instanceof Error)throw stored;return stored;}},window:{addEventListener(){}},setInterval(){}};
 runInNewContext(source,context);
 return {element,refresh(value){stored=value;runInNewContext('render()',context);}};
}
const row=reports=>JSON.stringify([{id:'qa',name:'<QA stall>',landmark:'Public test spot',food:'Snacks',reports}]);
test('unreadable storage clears stale suggestions without overwriting data',()=>{
 const page=mount(row([]));
 assert.match(page.element('#suggestions').innerHTML,/&lt;QA stall&gt;/);
 for(const value of ['{broken',new Error('Storage denied'),row([null])]){
  page.refresh(value);
  assert.match(page.element('#suggestions').innerHTML,/Suggestions unavailable/);
  assert.doesNotMatch(page.element('#suggestions').innerHTML,/QA stall/);
  assert.ok(page.element('#community-status').textContent);
 }
});
test('expired and future sightings cannot imply recent presence',()=>{
 const page=mount(row([{kind:'seen',at:Date.now()-7200001},{kind:'seen',at:Date.now()+600000}]));
 assert.match(page.element('#suggestions').innerHTML,/No recent report/);
});
test('opposing recent reports remain conflicting',()=>{
 const page=mount(row([{kind:'seen',at:Date.now()-1000},{kind:'absent',at:Date.now()-500}]));
 assert.match(page.element('#suggestions').innerHTML,/Conflicting local reports/);
});
