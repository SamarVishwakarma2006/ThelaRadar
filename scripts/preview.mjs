import {createVendors} from '../web/data.js';
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';

const files={'/':'index.html','/index.html':'index.html','/styles.css':'styles.css','/app.js':'app.js','/data.js':'data.js'};
Object.assign(files,{'/discover':'index.html','/saved':'index.html','/vendors':'index.html','/review':'index.html','/login':'auth.html','/register':'auth.html','/auth.css':'auth.css','/auth.js':'auth.js'});
const types={html:'text/html; charset=utf-8',css:'text/css; charset=utf-8',js:'text/javascript; charset=utf-8'};
// Opt-in one-shot HTTP failure for local retry QA; never active by default.
let delayNextDemo=process.env.THELARADAR_DELAY_ONCE==='1';
let failNextDemo=process.env.THELARADAR_FAIL_ONCE==='1';
const server=createServer(async(req,res)=>{
  const path=new URL(req.url,'http://127.0.0.1').pathname;
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{'Allow':'GET, HEAD'}).end();return;}
  if(path==='/api/demo/vendors' && req.method==='GET' && delayNextDemo){delayNextDemo=false;await new Promise(resolve=>setTimeout(resolve,12000));}
  if(path==='/api/demo/vendors' && req.method==='GET' && failNextDemo){failNextDemo=false;res.writeHead(503,{'Content-Type':'application/json','Cache-Control':'no-store'}).end(JSON.stringify({error:'Intentional local QA failure'}));return;}
  if(path==='/api/demo/vendors'){res.writeHead(200,{'Content-Type':'application/json','Cache-Control':'no-store'}).end(req.method==='HEAD'?undefined:JSON.stringify({demo:true,vendors:createVendors()}));return;}
  const file=files[path];
  if(!file){res.writeHead(404).end('Not found');return;}
  try{const body=await readFile(fileURLToPath(new URL(`../web/${file}`,import.meta.url)));res.writeHead(200,{'Content-Type':types[file.split('.').pop()],'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(req.method==='HEAD'?undefined:body);}
  catch{res.writeHead(500).end('Preview file unavailable');}
});
server.on('error',error=>{console.error(`Preview could not start: ${error.code}`);process.exitCode=1;});
server.listen(5190,'127.0.0.1',()=>console.log('ThelaRadar local preview: http://127.0.0.1:5190'));
