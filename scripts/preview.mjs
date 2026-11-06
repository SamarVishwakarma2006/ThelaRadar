import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';

const files={'/':'index.html','/index.html':'index.html','/styles.css':'styles.css','/app.js':'app.js','/data.js':'data.js'};
const types={html:'text/html; charset=utf-8',css:'text/css; charset=utf-8',js:'text/javascript; charset=utf-8'};
const server=createServer(async(req,res)=>{
  const path=new URL(req.url,'http://127.0.0.1').pathname;
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{'Allow':'GET, HEAD'}).end();return;}
  const file=files[path];
  if(!file){res.writeHead(404).end('Not found');return;}
  try{const body=await readFile(fileURLToPath(new URL(`../web/${file}`,import.meta.url)));res.writeHead(200,{'Content-Type':types[file.split('.').pop()],'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(req.method==='HEAD'?undefined:body);}
  catch{res.writeHead(500).end('Preview file unavailable');}
});
server.on('error',error=>{console.error(`Preview could not start: ${error.code}`);process.exitCode=1;});
server.listen(5190,'127.0.0.1',()=>console.log('ThelaRadar local preview: http://127.0.0.1:5190'));
