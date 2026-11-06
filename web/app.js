import {createVendors,availability,matches} from './data.js';

const $ = selector => document.querySelector(selector);
let vendors = createVendors();
let category = 'all', savedOnly = false, toastTimer;
let saved = [];
try { const value = JSON.parse(localStorage.getItem('thelaradar-favourites') || '[]'); if (Array.isArray(value)) saved = value.filter(id => vendors.some(v=>v.id===id)); } catch { /* Browsing remains usable without storage. */ }
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
  const filters={query:$('#search').value,category,confirmed:$('#available').checked,savedOnly,saved};
  const result = $('#area').value==='nerul' ? vendors.filter(v=>matches(v,filters)) : [];
  $('#saved-count').textContent=saved.length;
  $('#saved-nav').setAttribute('aria-pressed',String(savedOnly));
  document.querySelectorAll('[data-category]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.category===category)));
  $('#result-count').textContent=`${result.length} fictional ${result.length===1?'vendor':'vendors'}${savedOnly?' · saved favourites':''} · illustrated menus`;
  $('#empty-state').hidden=result.length!==0;
  $('#empty-copy').textContent=$('#area').value!=='nerul'?'This prototype has no listings for this area. Try Nerul’s fictional sample set.':savedOnly?'No saved vendors match these filters. Save a favourite or reset to explore.':'Try another dish or category, or turn off the demo confirmation filter.';
  $('#vendor-grid').innerHTML=result.map(v=>{
    const status=availability(v);
    return `<article class="vendor-card"><div class="card-art" style="--dish-bg:${v.color}">${foodArt(v.art)}<button class="save-button" data-save="${v.id}" aria-label="${saved.includes(v.id)?'Unsave':'Save'} ${escape(v.name)}" aria-pressed="${saved.includes(v.id)}">${saved.includes(v.id)?'♥':'♡'}</button><span class="art-tag">${v.tag}</span></div><div class="card-content"><div class="card-heading"><h3 class="card-title">${escape(v.name)}</h3><span class="price">From ₹${Math.min(...v.items.map(i=>i.price))}</span></div><p class="landmark">⌖ ${v.landmark}</p><p class="dish-summary">${v.items.map(i=>i.name).join(' · ')}</p><span class="status ${status.kind}">${status.label}</span><div class="card-bottom"><span>${v.hours}</span><button class="profile-button" data-profile="${v.id}">Meet the thela ↗</button></div></div></article>`;
  }).join('');
}
function openProfile(id) {
  const v=vendors.find(v=>v.id===id); if(!v) return;
  const status=availability(v),hidden=v.state==='hidden';
  profile.dataset.vendor=id;
  profile.innerHTML=`<div class="dialog-header"><span>THELARADAR / SAMPLE VENDOR</span><button class="close-dialog" aria-label="Close vendor profile">×</button></div><div class="dialog-body"><div class="card-art" style="--dish-bg:${v.color}">${foodArt(v.art)}</div><div class="eyebrow">${v.tag}</div><h2>${escape(v.name)}</h2><p>${hidden?'Location hidden in this preview.':`⌖ ${v.landmark}`}</p><span class="status ${status.kind}">${status.label}</span><div class="detail-meta"><strong>${v.hours} · illustrative schedule</strong>${status.live?`Sample confirmation expires at ${clock(v.expiresAt)} IST. Item stock is separate.`:'Usual hours do not confirm attendance today.'}</div><h3>On the sample menu</h3><p>Illustrative prices · fixture date 7 November 2026</p><ul class="menu-list">${v.items.map(i=>`<li><span>${i.name}${i.soldOut?' <small>· Demo sold out</small>':''}</span><span>₹${i.price}</span></li>`).join('')}</ul><div class="dialog-actions"><button class="button" data-demo-directions ${hidden?'disabled':''}>Directions preview ↗</button><button class="button outline" data-save="${v.id}">${saved.includes(v.id)?'Remove favourite':'Save this thela'}</button></div><p class="demo-callout">Fictional vendor. No real location, live stock, review score or business verification. Directions are not connected.</p><details class="report-form"><summary>Something looks off? Preview a correction</summary><form id="report-form"><label for="report-type">What needs correcting?</label><select id="report-type"><option>Location or landmark</option><option>Timings or attendance</option><option>Menu or price</option><option>Duplicate listing</option></select><label for="report-note">Details (sample text only)</label><textarea id="report-note" maxlength="300" required placeholder="Try a sample correction. Do not enter personal details."></textarea><button class="button" type="submit">Preview report</button></form><p id="report-result" role="status"></p></details></div>`;
  if(!profile.open) profile.showModal();
}
function openDashboard(id='vada') {
  const v=vendors.find(v=>v.id===id)||vendors[0], status=availability(v);
  dashboard.dataset.vendor=v.id;
  dashboard.innerHTML=`<div class="dialog-header"><span>FOR VENDORS / INTERACTIVE PREVIEW</span><button class="close-dialog" aria-label="Close vendor dashboard">×</button></div><div class="dialog-body"><div class="eyebrow">A LITTLE UPDATE. A BIG HELP.</div><h2>Hello, neighbourhood.</h2><p>Try a sample update and see the discovery cards change.</p><p class="demo-callout">No sign-in or real account. Changes affect this browser session’s fictional fixtures only and reset on reload.</p><label for="dashboard-vendor">Sample vendor</label><select id="dashboard-vendor" class="dashboard-select">${vendors.map(item=>`<option value="${item.id}" ${item.id===v.id?'selected':''}>${escape(item.name)}</option>`).join('')}</select><span class="status ${status.kind}">${status.label}</span><div class="metric-row"><div><strong>—</strong><small>Visits · not measured</small></div><div><strong>${v.items.length}</strong><small>Sample menu items</small></div><div><strong>2 hr</strong><small>Demo expiry ceiling</small></div></div><div class="dashboard-controls"><button class="button" data-update="serving">I’m serving · demo</button><button class="button outline" data-update="soldout">Toggle first item sold out</button><button class="button outline" data-update="finished">Finished for today</button><button class="button outline" data-update="hidden">Stop location sharing</button></div><p>“Finished” ends the sample session. “Stop location sharing” also removes this sample from discovery. “I’m serving” explicitly republishes this fictional location.</p><button class="text-button" data-reset-demo>Reset all sample vendors ↻</button></div>`;
  if(!dashboard.open) dashboard.showModal();
}
$('#hero-search').addEventListener('submit',event=>{event.preventDefault();render();$('#discover').scrollIntoView();});
$('#search').addEventListener('input',render);
$('#area').addEventListener('change',render);
$('#available').addEventListener('change',render);
$('#categories').addEventListener('click',event=>{const button=event.target.closest('[data-category]');if(button){category=button.dataset.category;render();}});
$('#clear-filters').addEventListener('click',reset);
$('#empty-reset').addEventListener('click',reset);
$('#saved-nav').addEventListener('click',()=>{savedOnly=!savedOnly;render();$('#discover').scrollIntoView();});
$('#vendor-nav').addEventListener('click',()=>openDashboard());
$('#vendor-cta').addEventListener('click',()=>openDashboard());
$('#dashboard-dialog').addEventListener('change',event=>{if(event.target.id==='dashboard-vendor')openDashboard(event.target.value);});
document.addEventListener('click',event=>{
  const saveButton=event.target.closest('[data-save]');
  if(saveButton){save(saveButton.dataset.save);if(profile.open)openProfile(profile.dataset.vendor);}
  const view=event.target.closest('[data-profile]');if(view)openProfile(view.dataset.profile);
  if(event.target.closest('.close-dialog'))event.target.closest('dialog').close();
  if(event.target.closest('[data-demo-directions]'))toast('Directions preview only. No real location is attached to this fictional vendor.');
  const update=event.target.closest('[data-update]');
  if(update){
    const v=vendors.find(item=>item.id===dashboard.dataset.vendor), action=update.dataset.update;
    if(action==='soldout')v.items[0].soldOut=!v.items[0].soldOut;
    else {v.state=action;if(action==='serving'){v.confirmedAt=Date.now();v.expiresAt=v.confirmedAt+120*60000;v.items.forEach(i=>i.soldOut=false);}}
    render();openDashboard(v.id);toast('Sample updated locally. No real vendor information changed.');
  }
  if(event.target.closest('[data-reset-demo]')){vendors=createVendors();render();openDashboard();toast('Sample vendor sessions reset.');}
});
profile.addEventListener('submit',event=>{if(event.target.id==='report-form'){event.preventDefault();$('#report-result').textContent='Preview complete. This report was not sent or stored; no moderation service is connected.';event.target.reset();}});
for(const dialog of [profile,dashboard])dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});
setInterval(()=>{render();for(const dialog of [profile,dashboard]){const badge=dialog.querySelector('.status');if(dialog.open&&badge){const status=availability(vendors.find(v=>v.id===dialog.dataset.vendor));badge.className=`status ${status.kind}`;badge.textContent=status.label;}}},30000);
render();

// Reuse authored food illustrations in the hero.
document.querySelectorAll('.hero-food').forEach(panel => { panel.innerHTML = foodArt(panel.dataset.art); });
