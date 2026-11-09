import {createVendors,availability,matches} from './data.js';

const $ = selector => document.querySelector(selector);
let vendors = [], loadState='loading', demoSnapshot=null;
let category = 'all', savedOnly = location.pathname==='/saved', toastTimer;
let saved = [];
try { const value = JSON.parse(localStorage.getItem('thelaradar-favourites') || '[]'); if (Array.isArray(value)) saved = value.filter(id => typeof id === 'string'); } catch { /* Browsing remains usable without storage. */ }
const profile = $('#profile-dialog'), dashboard = $('#dashboard-dialog');
const escape = value => String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const clock = timestamp => new Intl.DateTimeFormat('en-IN',{hour:'numeric',minute:'2-digit',timeZone:'Asia/Kolkata'}).format(timestamp);

function foodArt(type) {
  const base = '<ellipse cx="100" cy="96" rx="77" ry="34" fill="#faf2d9"/><ellipse cx="100" cy="91" rx="66" ry="27" fill="#d9dbc1"/>';
  const art = {
    vada:'<path d="M45 90Q42 65 69 60H131Q159 65 155 90Z" fill="#d79742" stroke="#9e6229" stroke-width="2"/><path d="M45 94H154L147 110H52Z" fill="#efc573"/><path d="M44 91L157 89L147 99L52 101Z" fill="#69833e"/><ellipse cx="100" cy="87" rx="47" ry="12" fill="#bf7337"/><path d="M59 67L63 73M79 63L81 69M105 64L106 70M128 66L125 72" stroke="#f8deb0" stroke-width="3" stroke-linecap="round"/><path d="M148 118Q173 105 172 89" fill="none" stroke="#4c793b" stroke-width="5"/>',
    chai:'<path d="M60 58H127L118 116Q94 128 69 115Z" fill="#d89864" stroke="#a2683f" stroke-width="2"/><ellipse cx="93" cy="58" rx="34" ry="11" fill="#f3dfb2"/><ellipse cx="93" cy="59" rx="28" ry="7" fill="#956540"/><path d="M126 69Q155 60 149 85Q146 99 124 98" fill="none" stroke="#d89864" stroke-width="9"/><path d="M83 42Q72 31 82 21M106 42Q95 31 105 21" stroke="#fff8e7" stroke-width="4" fill="none" stroke-linecap="round"/>',
    poha:'<ellipse cx="100" cy="85" rx="61" ry="25" fill="#dcb84a"/><path d="M39 85Q48 126 100 126Q153 126 161 85" fill="#e6e8cf" stroke="#73886b" stroke-width="2"/><ellipse cx="100" cy="85" rx="61" ry="25" fill="#e5bc49"/><path d="M55 83L73 79M83 91L98 93M111 77L130 82M130 92L146 89M88 70L104 73" stroke="#f6db7e" stroke-width="4" stroke-linecap="round"/><g fill="#54794b"><ellipse cx="77" cy="85" rx="7" ry="3"/><ellipse cx="115" cy="88" rx="7" ry="3"/><ellipse cx="102" cy="74" rx="6" ry="3"/></g><circle cx="136" cy="79" r="6" fill="#c76c38"/><circle cx="64" cy="91" r="6" fill="#c76c38"/><path d="M148 71L162 53L170 69Z" fill="#eddf80"/>',
    dosa:'<path d="M40 96L137 49L163 79L69 121Z" fill="#d4a153" stroke="#a57938" stroke-width="2"/><path d="M51 98L144 59M60 107L151 69" stroke="#eac17b" stroke-width="4"/><ellipse cx="145" cy="112" rx="20" ry="12" fill="#f8f0d6"/><ellipse cx="145" cy="109" rx="15" ry="7" fill="#a3b888"/><ellipse cx="39" cy="118" rx="18" ry="10" fill="#f8f0d6"/><ellipse cx="39" cy="116" rx="13" ry="6" fill="#b97340"/>',
    idli:'<ellipse cx="68" cy="82" rx="29" ry="18" fill="#fff8e6" stroke="#ddd8b9" stroke-width="1.5"/><ellipse cx="116" cy="75" rx="29" ry="18" fill="#fff8e6" stroke="#ddd8b9" stroke-width="1.5"/><ellipse cx="101" cy="103" rx="29" ry="18" fill="#fff8e6" stroke="#ddd8b9" stroke-width="1.5"/><ellipse cx="151" cy="111" rx="20" ry="12" fill="#f8f0d6"/><ellipse cx="151" cy="108" rx="15" ry="7" fill="#99ad77"/>'
  };
  return `<svg class="food-svg" viewBox="0 0 200 150" aria-hidden="true">${base}${art[type]||art.poha}</svg>`;
}
function toast(message) { $('#toast').textContent=message; $('#toast').hidden=false; clearTimeout(toastTimer); toastTimer=setTimeout(()=>$('#toast').hidden=true,4500); }
function save(id) {
  const next = saved.includes(id) ? saved.filter(item=>item!==id) : [...saved,id];
  try { localStorage.setItem('thelaradar-favourites',JSON.stringify(next)); saved=next; toast(saved.includes(id)?'Saved in this browser. Your next little detour.':'Removed from saved favourites.'); }
  catch { toast('Browser storage is unavailable. This favourite could not be saved.'); }
  render();
}
function reset() { category='all'; savedOnly=false; $('#search').value=''; $('#area').value='nerul'; $('#available').checked=false; render(); }
function render() {
  $('#load-state').hidden=loadState==='ready';
  $('#load-message').textContent=loadState==='error'?'Could not load the sample vendors. Check your connection and retry.':'Loading sample vendors…';
  $('#retry-vendors').hidden=loadState!=='error';
  $('#vendor-grid').setAttribute('aria-busy',String(loadState==='loading'));
  if(loadState!=='ready'){$('#vendor-grid').innerHTML='';$('#empty-state').hidden=true;$('#result-count').textContent='';return;}

  const filters={query:$('#search').value,category,confirmed:$('#available').checked,savedOnly,saved};
  const result = $('#area').value==='nerul' ? vendors.filter(v=>matches(v,filters)) : [];
  $('#saved-count').textContent=saved.length;
  $('#saved-nav').removeAttribute('aria-pressed');if(savedOnly)$('#saved-nav').setAttribute('aria-current','page');else $('#saved-nav').removeAttribute('aria-current');
  document.querySelectorAll('[data-category]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.category===category)));
  $('#result-count').textContent=`${result.length} fictional ${result.length===1?'vendor':'vendors'}${savedOnly?' · saved favourites':''} · illustrated menus`;
  $('#empty-state').hidden=result.length!==0;
  $('#empty-copy').textContent=$('#area').value!=='nerul'?'This prototype has no listings for this area. Try Nerul’s fictional sample set.':savedOnly?'No saved vendors match these filters. Save a favourite or reset to explore.':'Try another dish or category, or turn off the demo confirmation filter.';
  $('#vendor-grid').innerHTML=result.map(v=>{
    const status=availability(v);
    return `<article class="vendor-card"><div class="card-art" style="--dish-bg:${v.color}">${foodArt(v.art)}<button class="save-button" data-save="${v.id}" aria-label="${saved.includes(v.id)?'Unsave':'Save'} ${escape(v.name)}" aria-pressed="${saved.includes(v.id)}">${saved.includes(v.id)?'♥':'♡'}</button><span class="art-tag">${v.tag}</span></div><div class="card-content"><div class="card-heading"><h3 class="card-title">${escape(v.name)}</h3><span class="price">From ₹${Math.min(...v.items.map(i=>i.price))}</span></div><p class="landmark">⌖ ${escape(v.landmark)}</p><p class="dish-summary">${v.items.map(i=>i.name).join(' · ')}</p><span class="status ${status.kind}">${status.label}</span><div class="card-bottom"><span>${escape(v.hours)}</span><button class="profile-button" data-profile="${v.id}">Meet the thela ↗</button></div></div></article>`;
  }).join('');
}
function openProfile(id) {
  const v=vendors.find(v=>v.id===id); if(!v || v.state==='hidden'){ if(profile.open)profile.close(); toast('This vendor is unavailable or no longer sharing.'); return; }
  const status=availability(v),hidden=v.state==='hidden';
  profile.dataset.vendor=id;
  profile.innerHTML=`<div class="dialog-header"><span>THELARADAR / SAMPLE VENDOR</span><button class="close-dialog" aria-label="Close vendor profile">×</button></div><div class="dialog-body"><div class="card-art" style="--dish-bg:${v.color}">${foodArt(v.art)}</div><div class="eyebrow">${v.tag}</div><h2>${escape(v.name)}</h2><p>${hidden?'Location hidden in this preview.':`⌖ ${escape(v.landmark)}`}</p><span class="status ${status.kind}">${status.label}</span><div class="detail-meta"><strong>${escape(v.hours)} · illustrative schedule</strong>${status.live?`Sample confirmation expires at ${clock(v.expiresAt)} IST. Item stock is separate.`:'Usual hours do not confirm attendance today.'}</div><h3>On the sample menu</h3><p>Illustrative prices · fixture date 7 November 2026</p><ul class="menu-list">${v.items.map(i=>`<li><span>${i.name}${i.soldOut?' <small>· Demo sold out</small>':''}</span><span>₹${i.price}</span></li>`).join('')}</ul><div class="dialog-actions"><button class="button" disabled aria-describedby="directions-note">Directions unavailable</button><button class="button outline" data-save="${v.id}">${saved.includes(v.id)?'Remove favourite':'Save this thela'}</button></div><p id="directions-note" class="demo-callout">Fictional vendor. No real location, live stock, review score or business verification. Directions are not connected.</p><details class="report-form"><summary>Something looks off? Save a local correction</summary><form id="report-form"><label for="report-type">What needs correcting?</label><select id="report-type"><option>Location or landmark</option><option>Timings or attendance</option><option>Menu or price</option><option>Duplicate listing</option></select><label for="report-note">Details (sample text only)</label><textarea id="report-note" maxlength="300" required placeholder="Try a sample correction. Do not enter personal details."></textarea><button class="button" type="submit">Save report locally</button></form><p id="report-result" role="status"></p></details></div>`;
  if(!profile.open) profile.showModal();
}
function openDashboard(id='vada') {
  if(loadState!=='ready'||!vendors.length){toast('Load the sample vendors first.');return;}
  const v=vendors.find(v=>v.id===id)||vendors[0], status=availability(v);
  dashboard.dataset.vendor=v.id;
  dashboard.innerHTML=`<div class="dialog-header"><span>FOR VENDORS / INTERACTIVE PREVIEW</span><button class="close-dialog" aria-label="Close vendor dashboard">×</button></div><div class="dialog-body"><div class="eyebrow">A LITTLE UPDATE. A BIG HELP.</div><h2>Hello, neighbourhood.</h2><p>Try a sample update and see the discovery cards change.</p><p class="demo-callout">No sign-in or real account. Demo changes persist in this browser. Clearing site storage removes them. No real account or cross-device sync.</p><label for="dashboard-vendor">Sample vendor</label><select id="dashboard-vendor" class="dashboard-select">${vendors.map(item=>`<option value="${item.id}" ${item.id===v.id?'selected':''}>${escape(item.name)}</option>`).join('')}</select><span class="status ${status.kind}">${status.label}</span><div class="metric-row"><div><strong>—</strong><small>Visits · not measured</small></div><div><strong>${v.items.length}</strong><small>Sample menu items</small></div><div><strong>2 hr</strong><small>Demo expiry ceiling</small></div></div><details class="report-form"><summary>Edit sample profile</summary><form id="vendor-edit-form"><p>Sample details only. Usual hours do not confirm attendance.</p><label for="edit-name">Stall name</label><input id="edit-name" name="name" required maxlength="100" value="${escape(v.name)}"><label for="edit-landmark">Public selling landmark</label><input id="edit-landmark" name="landmark" required maxlength="200" value="${escape(v.landmark)}"><label for="edit-hours">Usual hours (IST)</label><input id="edit-hours" name="hours" required maxlength="100" value="${escape(v.hours)}"><button class="button" type="submit">Save sample profile</button><p id="vendor-edit-result" role="status"></p></form></details><h3>Today’s sample menu</h3><ul class="menu-list">${v.items.map((item,index)=>`<li><span>${escape(item.name)} · ₹${item.price}</span><button class="button outline" data-stock="${index}" aria-label="${escape(item.name)}: ${item.soldOut?'sold out, restore availability':'available, mark sold out'}" aria-pressed="${!!item.soldOut}">${item.soldOut?'Sold out · restore':'Available · mark sold out'}</button></li>`).join('')}</ul><div class="dashboard-controls"><button class="button" data-update="serving">I’m serving · demo</button><button class="button outline" data-update="finished">Finished for today</button><button class="button outline" data-update="hidden">Stop location sharing</button></div><p>“Finished” ends the sample session. “Stop location sharing” also removes this sample from discovery. “I’m serving” explicitly republishes this fictional location.</p><button class="text-button" data-reset-demo>Reset all sample vendors ↻</button></div>`;
  if(location.pathname==='/vendors'){dashboard.setAttribute('open','');dashboard.classList.add('page-panel');}else if(!dashboard.open) dashboard.showModal();
}
function profileFields(value){
 const result={};
 for(const [key,max] of [['name',100],['landmark',200],['hours',100]]){
  if(typeof value[key]!=='string'||!value[key].trim()||value[key].trim().length>max)throw new Error('Complete all profile fields within their character limits.');
  result[key]=value[key].trim();
 }
 return result;
}
dashboard.addEventListener('submit',event=>{
 if(event.target.id!=='vendor-edit-form')return;
 event.preventDefault();
 try{
  const fields=profileFields(Object.fromEntries(new FormData(event.target)));
  const next=structuredClone(vendors),vendor=next.find(v=>v.id===dashboard.dataset.vendor);
  Object.assign(vendor,fields);
  if(!persistDemo(next)){$('#vendor-edit-result').textContent='Not saved. Your draft is still here; check the message below.';return;}
  vendors=next;render();openDashboard(vendor.id);
  if(profile.open)openProfile(profile.dataset.vendor);
  toast('Sample profile saved in this browser.');
 }catch(error){$('#vendor-edit-result').textContent=error.message;}
});
$('#hero-search').addEventListener('submit',event=>{event.preventDefault();render();$('#discover').scrollIntoView();});
$('#search').addEventListener('input',render);
$('#area').addEventListener('change',render);
$('#available').addEventListener('change',render);
$('#categories').addEventListener('click',event=>{const button=event.target.closest('[data-category]');if(button){category=button.dataset.category;render();}});
$('#clear-filters').addEventListener('click',reset);
$('#empty-reset').addEventListener('click',reset);
$('#saved-nav').addEventListener('click',()=>{location.href='/saved';});
$('#vendor-nav').addEventListener('click',()=>{location.href='/vendors';});
$('#vendor-cta').addEventListener('click',()=>openDashboard());
$('#dashboard-dialog').addEventListener('change',event=>{if(event.target.id==='dashboard-vendor')openDashboard(event.target.value);});
document.addEventListener('click',event=>{
  const saveButton=event.target.closest('[data-save]');
  if(saveButton){save(saveButton.dataset.save);if(profile.open)openProfile(profile.dataset.vendor);}
  const view=event.target.closest('[data-profile]');if(view)location.hash='vendor/'+encodeURIComponent(view.dataset.profile);
  if(event.target.closest('.close-dialog'))event.target.closest('dialog').close();
  if(event.target.closest('[data-demo-directions]'))toast('Directions preview only. No real location is attached to this fictional vendor.');
  const stock=event.target.closest('[data-stock]');
  if(stock){
    const next=structuredClone(vendors),v=next.find(item=>item.id===dashboard.dataset.vendor),index=Number(stock.dataset.stock);
    if(v&&Number.isInteger(index)&&v.items[index]){v.items[index].soldOut=!v.items[index].soldOut;if(persistDemo(next)){vendors=next;render();openDashboard(v.id);toast('Item availability saved in this browser.');}}
  }
  const update=event.target.closest('[data-update]');
  if(update){
    const previous=structuredClone(vendors);
    const v=vendors.find(item=>item.id===dashboard.dataset.vendor), action=update.dataset.update;
    if(action==='soldout')v.items[0].soldOut=!v.items[0].soldOut;
    else {v.state=action;if(action==='serving'){v.confirmedAt=Date.now();v.expiresAt=v.confirmedAt+120*60000;v.items.forEach(i=>i.soldOut=false);}}
    if(!persistDemo(vendors)){vendors=previous;return;}
    render();openDashboard(v.id);toast('Demo changes saved in this browser.');
  }
  if(event.target.closest('[data-reset-demo]')){const next=createVendors();if(persistDemo(next)){vendors=next;render();openDashboard();toast('Saved sample vendors reset.');}}
});
profile.addEventListener('submit',event=>{
 if(event.target.id!=='report-form')return;
 event.preventDefault();
 const note=$('#report-note').value.trim(),type=$('#report-type').value,vendor=profile.dataset.vendor;
 if(!note){$('#report-result').textContent='Add a short correction first.';return;}
 try{
  const rows=readReports();
  if(rows.length>=100)throw new Error('Queue full (100 reports). Review existing reports first.');
  if(rows.some(r=>r.vendor===vendor&&r.note===note&&r.type===type&&r.status==='pending'))throw new Error('This correction is already pending locally.');
  rows.push({id:crypto.randomUUID(),vendor,type,note:note.slice(0,300),status:'pending',createdAt:Date.now()});
  localStorage.setItem('thelaradar-reports-v1',JSON.stringify(rows));
  $('#report-result').textContent='Saved in this browser only. Open Local review demo in the footer. Nothing was sent to a vendor or moderator.';event.target.reset();
 }catch(error){$('#report-result').textContent='Not saved. '+error.message;}
});
for(const dialog of [profile,dashboard])dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});
setInterval(()=>{render();for(const dialog of [profile,dashboard]){const badge=dialog.querySelector('.status');if(dialog.open&&badge){const status=availability(vendors.find(v=>v.id===dialog.dataset.vendor));badge.className=`status ${status.kind}`;badge.textContent=status.label;}}},30000);
render();

// Reuse authored food illustrations in the hero.
document.querySelectorAll('.hero-food').forEach(panel => { panel.innerHTML = foodArt(panel.dataset.art); });

// Bookmarkable consumer profiles; withdrawn fixture locations never reopen.
function syncProfileRoute(){
  if(loadState!=='ready')return;
  if(!location.hash.startsWith('#vendor/')){if(profile.open)profile.close();return;}
  let id;try{id=decodeURIComponent(location.hash.slice(8));}catch{toast('Invalid vendor link.');return;}
  openProfile(id);
}
window.addEventListener('hashchange',syncProfileRoute);
profile.addEventListener('close',()=>{if(location.hash.startsWith('#vendor/'))history.replaceState(null,'','#discover');});
function connectivity(){
  const offline=!navigator.onLine;
  $('#connection-note').hidden=!offline;
  document.querySelectorAll('[data-profile]').forEach(button=>button.setAttribute('aria-label',button.textContent+(offline?' — offline sample data':'')));
}
window.addEventListener('online',connectivity);window.addEventListener('offline',connectivity);
window.addEventListener('pageshow',()=>{render();connectivity();});
document.addEventListener('visibilitychange',()=>{if(!document.hidden){render();if(profile.open)openProfile(profile.dataset.vendor);}});
syncProfileRoute();connectivity();
// Failed remote photos retain their panel shape and a useful textual fallback.
document.querySelectorAll('.hero-tile img').forEach(img=>{
  const fallback=()=>{img.hidden=true;img.parentElement.classList.add('photo-unavailable');img.parentElement.setAttribute('aria-label',img.alt+' — explore sample vendors');img.parentElement.dataset.fallback=img.alt;};
  img.addEventListener('error',fallback);if(img.complete&&!img.naturalWidth)fallback();
});

async function loadVendors(){
  if(loadVendors.pending)return;
  loadVendors.pending=true;loadState='loading';render();
  try{
    const response=await fetch('/api/demo/vendors',{cache:'no-store',signal:AbortSignal.timeout(10000)});
    if(!response.ok)throw new Error('Load failed');
    const data=await response.json();
    // This endpoint is deliberately restricted to our known fictional fixture set.
    const expected=createVendors();
    if(data.demo!==true||!Array.isArray(data.vendors)||data.vendors.length!==expected.length||data.vendors.some((v,i)=>JSON.stringify({...v,confirmedAt:expected[i].confirmedAt,expiresAt:expected[i].expiresAt})!==JSON.stringify(expected[i])||![v.confirmedAt,v.expiresAt].every(t=>t===null||Number.isFinite(t))))throw new Error('Invalid demo data');
    vendors=restoreDemo(data.vendors);loadState='ready';render();syncProfileRoute();connectivity();if(location.pathname==='/vendors')openDashboard();if(location.pathname==='/review')openReview();
  }catch{loadState='error';render();}
  finally{loadVendors.pending=false;}
}
$('#retry-vendors').addEventListener('click',loadVendors);
loadVendors();

function persistDemo(next){
 try{
  if(localStorage.getItem('thelaradar-demo-v1')!==demoSnapshot){toast('Another tab changed the demo. Reload before saving; your update was not saved.');return false;}
  const encoded=JSON.stringify(next);localStorage.setItem('thelaradar-demo-v1',encoded);demoSnapshot=encoded;return true;
 }
 catch{toast('Could not save changes: browser storage is blocked or full. Nothing changed.');return false;}
}
function restoreDemo(base){
 try{
  const raw=localStorage.getItem('thelaradar-demo-v1');demoSnapshot=raw;
  if(raw===null){persistDemo(base);return base;}
  const rows=JSON.parse(raw);
  if(!Array.isArray(rows)||rows.length!==base.length)throw new Error();
  return base.map((v,i)=>{
   const r=rows[i];
   if(!r||r.id!==v.id||!['serving','unknown','finished','hidden'].includes(r.state)||![r.confirmedAt,r.expiresAt].every(t=>t===null||(Number.isFinite(t)&&t>=0))||!Array.isArray(r.items)||r.items.length!==v.items.length)throw new Error();
   if(r.state==='serving'&&(!Number.isFinite(r.confirmedAt)||!Number.isFinite(r.expiresAt)||r.expiresAt<r.confirmedAt||r.expiresAt-r.confirmedAt>7200000))throw new Error();
   return {...v,...profileFields(r),state:r.state,confirmedAt:r.confirmedAt,expiresAt:r.expiresAt,items:v.items.map((item,j)=>{if(r.items[j].soldOut!==undefined&&typeof r.items[j].soldOut!=='boolean')throw new Error();return {...item,soldOut:!!r.items[j].soldOut};})};
  });
 }catch{toast('Saved demo data could not be read. Fresh samples shown; reset the demo to replace saved data.');return base;}
}

function readReports(){
 const rows=JSON.parse(localStorage.getItem('thelaradar-reports-v1')||'[]');
 if(!Array.isArray(rows)||rows.length>100||rows.some(r=>!r||typeof r.id!=='string'||typeof r.vendor!=='string'||typeof r.type!=='string'||typeof r.note!=='string'||r.note.length>300||!['pending','reviewed','dismissed'].includes(r.status)||!Number.isFinite(r.createdAt)))throw new Error('Local report data is unreadable.');
 return rows;
}
function openReview(){
 const dialog=$('#review-dialog');
 let body;
 try{const rows=readReports();body=rows.length?rows.map(r=>'<article class="review-entry"><h3>'+escape(vendors.find(v=>v.id===r.vendor)?.name||'Unavailable sample vendor')+'</h3><p>'+escape(r.type)+' · '+escape(r.status)+'</p><p>'+escape(r.note)+'</p><small>'+escape(new Date(r.createdAt).toLocaleString('en-IN',{timeZone:'Asia/Kolkata'}))+' IST</small><div class="dialog-actions">'+(r.status==='pending'?'<button class="button" data-report-id="'+escape(r.id)+'" data-decision="reviewed">Mark reviewed</button><button class="button outline" data-report-id="'+escape(r.id)+'" data-decision="dismissed">Dismiss</button>':'<button class="text-button" data-report-id="'+escape(r.id)+'" data-decision="pending">Reopen</button>')+'</div></article>').join(''):'<p>No local corrections yet. Add one from a vendor profile.</p>';}
 catch{body='<p role="alert">Cannot read local reports. No records were overwritten.</p>';}
 dialog.innerHTML='<div class="dialog-header"><span>LOCAL REVIEW DEMO</span><button class="close-dialog" aria-label="Close review queue">×</button></div><div class="dialog-body"><h2>Neighbourhood notes.</h2><p class="demo-callout">Browser-only demonstration. Anyone using this browser can review these notes. This is not an authenticated admin panel. Reviewing never changes vendor details automatically.</p>'+body+'</div>';
 if(location.pathname==='/review'){dialog.setAttribute('open','');dialog.classList.add('page-panel');}else if(!dialog.open)dialog.showModal();
}
$('#review-demo').addEventListener('click',()=>{location.href='/review';});
$('#review-dialog').addEventListener('click',event=>{
 const button=event.target.closest('[data-decision]');if(!button)return;
 try{const rows=readReports(),row=rows.find(r=>r.id===button.dataset.reportId);if(!row)return;row.status=button.dataset.decision;row.reviewedAt=Date.now();localStorage.setItem('thelaradar-reports-v1',JSON.stringify(rows));openReview();toast('Review decision saved locally.');}catch{toast('Could not save the review decision.');}
});

const page=location.pathname;
if(page!=='/'&&page!=='/index.html'){
 document.body.classList.add('inner-page');
 document.querySelectorAll('#home,.trust-strip,.vendor-banner,.how-it-works').forEach(el=>el.hidden=true);
 if(page==='/vendors'||page==='/review')$('#discover').hidden=true;
 if(page==='/saved')document.querySelector('.section-top h2').textContent='Your saved thelas.';
}

// Keep standalone tools inside main content, before the footer.
if(page==='/vendors'||page==='/review')document.querySelector('main').append($(page==='/vendors'?'#dashboard-dialog':'#review-dialog'));
const pageTitles={'/discover':'Discover','/saved':'Saved vendors','/vendors':'Vendor demo','/review':'Local review'};
if(pageTitles[page])document.title='ThelaRadar — '+pageTitles[page];

// Synchronise idle views when another tab updates browser-local demo data.
window.addEventListener('storage',event=>{
 if(event.key==='thelaradar-demo-v1'&&loadState==='ready'){
  if(dashboard.querySelector('#vendor-edit-form')?.closest('details').open){toast('Another tab changed the demo. Copy your draft and reload before saving.');return;}
  vendors=restoreDemo(createVendors());render();
  if(dashboard.open)openDashboard(dashboard.dataset.vendor);
  if(profile.open)openProfile(profile.dataset.vendor);
 }
 if(event.key==='thelaradar-reports-v1'&&$('#review-dialog').open)openReview();
});
