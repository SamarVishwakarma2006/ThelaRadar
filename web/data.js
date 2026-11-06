// Fictional fixtures only; no real vendors, coordinates, reviews or user counts.
export function createVendors(now = Date.now()) {
  return [
    {id:'vada',name:'Kaka’s Vada Pav',category:'snacks',tag:'The everyday favourite',landmark:'Sample lane · Nerul',hours:'Usually 4–9 pm',items:[{name:'Vada pav',price:20},{name:'Mirchi bhaji',price:30}],color:'#e8bc77',art:'vada',confirmedAt:now-12*60000,expiresAt:now+108*60000,state:'serving'},
    {id:'chai',name:'Chai & Gappa',category:'chai',tag:'A moment to slow down',landmark:'Sample square · Nerul',hours:'Usually 7 am–8 pm',items:[{name:'Cutting chai',price:15},{name:'Masala chai',price:20}],color:'#bfd0bb',art:'chai',confirmedAt:now-26*60000,expiresAt:now+94*60000,state:'serving'},
    {id:'poha',name:'Aai’s Poha Corner',category:'breakfast',tag:'Mornings, made better',landmark:'Sample garden road · Nerul',hours:'Usually 7–11 am',items:[{name:'Kanda poha',price:30},{name:'Sheera',price:35}],color:'#e9d28c',art:'poha',confirmedAt:null,expiresAt:null,state:'unknown'},
    {id:'dosa',name:'Anna’s Little Tawa',category:'meals',tag:'Fresh off the tawa',landmark:'Sample market lane · Nerul',hours:'Usually 5–10 pm',items:[{name:'Plain dosa',price:50},{name:'Masala dosa',price:70}],color:'#c9c6aa',art:'dosa',confirmedAt:now-8*60000,expiresAt:now+112*60000,state:'serving'},
    {id:'bhel',name:'Bhel on the Corner',category:'snacks',tag:'A little crunch, a little joy',landmark:'Sample corner · Nerul',hours:'Usually 4–9 pm',items:[{name:'Sukha bhel',price:30},{name:'Sev puri',price:40}],color:'#d9bca5',art:'poha',confirmedAt:now-180*60000,expiresAt:now-60*60000,state:'serving'},
    {id:'idli',name:'The Idli Stop',category:'breakfast',tag:'Soft landings for busy days',landmark:'Sample junction · Nerul',hours:'Usually 7 am–noon',items:[{name:'Idli plate',price:40},{name:'Medu vada',price:45}],color:'#b9c9c5',art:'idli',confirmedAt:now-60*60000,expiresAt:now,state:'finished'}
  ];
}
export function availability(vendor, now = Date.now()) {
  if (vendor.state === 'hidden') return {kind:'unknown',label:'Location sharing stopped',live:false};
  if (vendor.state === 'finished') return {kind:'finished',label:'Finished · demo session',live:false};
  if (vendor.state === 'serving' && Number.isFinite(vendor.expiresAt) && vendor.expiresAt > now) {
    const age = Math.max(0,Math.floor((now-vendor.confirmedAt)/60000));
    return {kind:'confirmed',label:`Demo confirmed · ${age} min ago`,live:true};
  }
  return {kind:'unknown',label:vendor.confirmedAt ? 'Confirmation expired · demo' : 'Usual hours · unconfirmed',live:false};
}
export function matches(vendor, {query='',category='all',confirmed=false,savedOnly=false,saved=[]}={}, now=Date.now()) {
  const text = [vendor.name,...vendor.items.map(item=>item.name)].join(' ').toLocaleLowerCase();
  return vendor.state !== 'hidden' && text.includes(query.trim().toLocaleLowerCase()) && (category==='all'||vendor.category===category) && (!confirmed||availability(vendor,now).live) && (!savedOnly||saved.includes(vendor.id));
}
