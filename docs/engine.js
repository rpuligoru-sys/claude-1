(()=>{
const D=JSON.parse(document.getElementById('d').textContent),T=D.themeCfg||{},B=document.body;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';');
const okI=s=>/^data:image\/[a-z+]+;base64,[A-Za-z0-9+\/=]+$/.test(s||'');
const img=(s,c='')=>okI(s)?`<img class="${c}" src="${s}" alt="">`:'';
const fmt=d=>d?new Date(d+'T00:00').toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'}):'';
Object.entries({bg:T.bg,fg:T.fg,ac:T.ac,veil:T.veil,card:T.card,sz:T.sz||1,script:`'${T.script}',serif`,body:`'${T.body}',serif`}).forEach(([k,v])=>B.style.setProperty('--'+k,v));
document.head.insertAdjacentHTML('beforeend',`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${[T.script,T.body].map(f=>'family='+String(f).replace(/ /g,'+')).join('&')}&display=swap">`);
const names=`${esc(D.gname)} &amp; ${esc(D.bname)}`,g=(i,k)=>D['e'+i+k];
const ev=[0,1,2].filter(i=>g(i,'venue')||g(i,'title')).map(i=>`<div class="card"><h2>${esc(g(i,'title'))}</h2><p><b>${esc(g(i,'venue'))}</b></p><p>${esc(g(i,'addr'))}</p><p>${esc(fmt(g(i,'date')))}${g(i,'time')?' · '+esc(g(i,'time')):''}</p>${/^https?:\/\//.test(g(i,'map')||'')?`<a class="btn" target="_blank" rel="noopener" href="${esc(g(i,'map'))}">View on Google Maps</a>`:''}</div>`).join('');
const wa=String(D.whatsapp||'').replace(/\D/g,'');
B.insertAdjacentHTML('beforeend',`<div id="splash"><h1>The Wedding Of</h1>${img(D.couplePhoto,'ph')}<h2>${names}</h2><button class="btn" id="open">Open invitation</button></div>
<main hidden><section><h1>Wedding Invitation</h1>${img(D.couplePhoto,'ph')}<h2>${names}</h2><p>${esc(fmt(D.e0date||D.e1date))}</p></section>
<section><h2>Bride &amp; Groom</h2>${img(D.groomPhoto,'ph')}<h2>${esc(D.gname)}</h2><p>Son of<br><b>${esc(D.gparents)}</b></p><h2>&amp;</h2>${img(D.bridePhoto,'ph')}<h2>${esc(D.bname)}</h2><p>Daughter of<br><b>${esc(D.bparents)}</b></p></section>
<section><h2>Venue details</h2>${ev}</section>
<section><h2>We are getting married</h2><div class="cd" id="cd"></div><p class="msg" style="margin-top:1.5rem">${esc(D.message)}</p><h2>${names}</h2></section>
${(D.gallery||[]).some(okI)?`<section><h2>Happy moments</h2><div class="gal">${D.gallery.map(x=>img(x)).join('')}</div></section>`:''}
${wa?`<section><h2>Send your wishes</h2><a class="btn" target="_blank" rel="noopener" href="https://wa.me/${wa}?text=${encodeURIComponent(`Hi ${D.gname} & ${D.bname}, congratulations! 🎉`)}">Wish us on WhatsApp</a></section>`:''}</main>`);
// motion settings
const lvl=D.mo_level||'rich',sp=+D.mo_speed||1,mv=lvl!='off'&&!matchMedia('(prefers-reduced-motion:reduce)').matches,k=mv?(lvl=='soft'?.5:1)*sp:0;
// scene layers: uploaded ones win over theme ones
const up=(D.layers||[]).map((s,i)=>okI(s)?{img:s,speed:[.2,.5,.9][i]}:0).filter(Boolean);
const LY=up.length?up:(T.layers||[]).map(l=>({img:`themes/${T.id}/${l.img}`,speed:l.speed}));
const st=document.createElement('div');st.className='stage';
st.innerHTML=LY.filter(l=>okI(l.img)||/^themes\/[\w\/.-]+$/.test(l.img)).map(l=>`<div class="ly" data-s="${+l.speed}" style="height:${100*(1+l.speed)}vh;background-image:url('${l.img}')"></div>`).join('');
B.prepend(st);
const Z=D.mo_zoom=='off'?0:(T.zoom??.3)*k;
const upd=()=>{const m=document.documentElement.scrollHeight-innerHeight,p=m>0?Math.min(1,scrollY/m):0,vh=innerHeight;
 [...st.children].forEach(e=>{const s=+e.dataset.s;e.style.transformOrigin=`50% ${50*vh/100+p*s*vh}px`;e.style.transform=`translate3d(0,${-p*s*vh*(k?1:0)}px,0) scale(${1+Z*p*(s+.3)})`})};
addEventListener('scroll',()=>requestAnimationFrame(upd),{passive:true});addEventListener('resize',upd);upd();
// reveal on scroll
B.dataset.rv=mv?(D.mo_reveal&&D.mo_reveal!='theme'?D.mo_reveal:T.reveal||'rise'):'none';B.style.setProperty('--rvd',(.9/(sp||1))+'s');
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('section').forEach(s=>[...s.children].forEach((e,i)=>{e.classList.add('rv');e.style.transitionDelay=i*.08+'s';io.observe(e)}));
// floating particles
const pt=D.mo_particles&&D.mo_particles!='theme'?D.mo_particles:T.particles||'none';
if(mv&&pt!='none'){const c=document.createElement('canvas');c.className='fx';B.append(c);const x=c.getContext('2d');let W,H;const rs=()=>{W=c.width=innerWidth;H=c.height=innerHeight};rs();addEventListener('resize',rs);
 const ps=Array.from({length:lvl=='soft'?14:32},(_,i)=>({x:Math.random()*W,y:Math.random()*H,r:3+Math.random()*6,v:.4+Math.random(),a:Math.random()*6.3,i}));
 (function f(){x.clearRect(0,0,W,H);for(const q of ps){q.a+=.02*sp;
  if(pt=='petals'){q.y+=q.v*sp;q.x+=Math.sin(q.a)*.8;x.fillStyle=q.i%2?'rgba(255,157,181,.8)':'rgba(255,190,90,.8)';x.beginPath();x.ellipse(q.x,q.y,q.r,q.r/2,q.a,0,6.3);x.fill();if(q.y>H+10){q.y=-10;q.x=Math.random()*W}}
  else if(pt=='diyas'){q.y-=q.v*.5*sp;q.x+=Math.sin(q.a)*.3;const gr=x.createRadialGradient(q.x,q.y,0,q.x,q.y,q.r*3);gr.addColorStop(0,`rgba(255,200,90,${.6+.3*Math.sin(q.a*3)})`);gr.addColorStop(1,'rgba(255,140,0,0)');x.fillStyle=gr;x.fillRect(q.x-q.r*3,q.y-q.r*3,q.r*6,q.r*6);if(q.y<-20){q.y=H+10;q.x=Math.random()*W}}
  else{x.fillStyle=`rgba(255,236,170,${Math.abs(Math.sin(q.a))})`;x.fillRect(q.x-1,q.y-q.r,2,q.r*2);x.fillRect(q.x-q.r,q.y-1,q.r*2,2)}}
  requestAnimationFrame(f)})()}
// song and open button
const song=/^data:audio\//.test(D.song||'')||/^music\/[\w .-]+$/.test(D.song||'')?D.song:'',au=song&&Object.assign(new Audio(song),{loop:true});
document.getElementById('open').onclick=()=>{document.getElementById('splash').classList.add('hide');document.querySelector('main').hidden=false;scrollTo(0,0);
 if(au){au.play().catch(()=>{});const m=document.createElement('button');m.id='mu';m.textContent='♪';m.setAttribute('aria-label','Music on or off');m.onclick=()=>{au.paused?au.play():au.pause();m.style.opacity=au.paused?.5:1};B.append(m)}};
const t=new Date(D.countdown||'').getTime(),cd=document.getElementById('cd');
if(t)(function tick(){const s=Math.max(0,(t-Date.now())/1000|0);cd.innerHTML=[['Days',86400,1e9],['Hrs',3600,24],['Min',60,60],['Sec',1,60]].map(([n,m,r])=>`<div><b>${String((s/m|0)%r).padStart(2,'0')}</b>${n}</div>`).join('');setTimeout(tick,1000)})();
})();
