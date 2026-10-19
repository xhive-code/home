(()=>{
const root=document.getElementById('xhive-demo');if(!root)return;
const $=s=>root.querySelector(s),$$=s=>[...root.querySelectorAll(s)];
const lang=root.dataset.lang==='et'?'et':'en';
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
let elapsed=0,paused=reduce,visible=true,last=performance.now(),rendered=-1;
const duration=60000,jumps=[0,30000,45000];
const T={en:{brand:'/ demo',steps:['We ask','Key things','Digitised'],disclaimer:'A made-up interview with a company owner, to show how Xhive works.',pause:'Pause',play:'Continue',replay:'Replay',earlier:'Earlier in the conversation',
status:['Interview','Key things','Digitised'],eyebrow:['Toomas · Founder and owner','What only experience holds','From interview to process'],asideTitle:'What we noticed',asideBottom:['Listen. Ask again.','From the conversation','Reviewed with the team'],
caption:['We ask what the person really does.','We find the tasks the business depends on.','The knowledge becomes a process the team can use.'],
ai:'Xhive',person:'Toomas · Founder and owner',
chat:['Walk me through a normal week. What do you do yourself?','Customer calls, supplier orders, pricing. And I approve every larger offer.','Which of these would stop if you were away for a month?','Supplier prices. <mark>I negotiate them every year and the terms are in my head.</mark>','How do you decide which price to accept?','I know each supplier’s limit from experience. <mark>Nobody else has done it.</mark>'],
signals:[['Tasks','Four things he does himself.'],['Key thing','Yearly supplier price negotiations.'],['Where it sits','Only in his experience.']],
find:{title:'Four tasks.<br><em>One of them is key.</em>',cards:[['Key task','Yearly supplier price negotiations.'],['Where it sits','In the owner’s head and old emails.'],['For the deal','Plan the handover before the owner leaves.']]},
plan:{title:'From interview<br><em>to a digital process.</em>',steps:[['Written down','The negotiation steps and price limits as a process.'],['Checked','Compared with contracts and with the finance lead.'],['In the system','The team finds it in Xhive and uses it next year.']],note:'A suggestion. The owner and the team review every step.'}},
et:{brand:'/ näidis',steps:['Küsime','Võtmeasjad','Digitaalseks'],disclaimer:'Väljamõeldud intervjuu ettevõtte omanikuga. Näitab, kuidas Xhive töötab.',pause:'Paus',play:'Jätka',replay:'Uuesti',earlier:'Vestluse algus',
status:['Intervjuu','Võtmeasjad','Digitaalseks'],eyebrow:['Toomas · Asutaja ja omanik','Mis on ainult kogemuses','Intervjuust protsessiks'],asideTitle:'Mida märkasime',asideBottom:['Kuula. Küsi uuesti.','Vestluse põhjal','Tiimiga üle vaadatud'],
caption:['Küsime, mida inimene päriselt teeb.','Leiame tegevused, millest äri sõltub.','Teadmisest saab protsess, mida tiim kasutab.'],
ai:'Xhive',person:'Toomas · Asutaja ja omanik',
chat:['Kirjeldage tavalist nädalat. Mida te ise teete?','Kliendikõned, tarnijate tellimused, hinnad. Ja kinnitan iga suurema pakkumise.','Mis neist seisma jääks, kui te oleksite kuu aega ära?','Tarnijate hinnad. <mark>Pean neid läbirääkimisi igal aastal ja tingimused on mul peas.</mark>','Kuidas otsustate, millise hinnaga nõustuda?','Tean kogemusest iga tarnija piiri. <mark>Keegi teine pole seda teinud.</mark>'],
signals:[['Tegevused','Neli asja, mida ta teeb ise.'],['Võtmeasi','Iga-aastased hinnaläbirääkimised tarnijatega.'],['Kus see on','Ainult tema kogemuses.']],
find:{title:'Neli tegevust.<br><em>Üks neist on võtmeasi.</em>',cards:[['Võtmetegevus','Iga-aastased hinnaläbirääkimised tarnijatega.'],['Kus see on','Omaniku peas ja vanades e-kirjades.'],['Tehingu jaoks','Planeeri üleandmine enne, kui omanik lahkub.']]},
plan:{title:'Intervjuust<br><em>digitaalseks protsessiks.</em>',steps:[['Kirja pandud','Läbirääkimise sammud ja hinnapiirid protsessina.'],['Kontrollitud','Võrreldud lepingute ja finantsjuhiga.'],['Süsteemis','Tiim leiab selle Xhive’ist ja kasutab järgmisel aastal.']],note:'Ettepanek. Omanik ja tiim vaatavad iga sammu üle.'}}}[lang];
const msg=(i,body)=>{const ai=i%2===0;return `<div class="pd-message ${ai?'':'answer'}"><div class="pd-who"><span class="pd-avatar">${ai?'X':'T'}</span>${ai?T.ai:T.person}</div><div class="pd-bubble">${body}</div></div>`};
function frame(){const s=elapsed/1000;return s<3?0:s<7?1:s<10?2:s<18?3:s<23?4:s<30?5:s<45?6:7}
function updateHTML(el,html){const t=document.createElement('template');t.innerHTML=html;const nodes=[...t.content.children];nodes.forEach((node,i)=>{const old=el.children[i];if(!old)el.appendChild(node);else if(old.outerHTML!==node.outerHTML)old.replaceWith(node)});while(el.children.length>nodes.length)el.lastElementChild.remove()}
function render(force){const f=frame();if(f===rendered&&!force)return;rendered=f;const stage=f<6?0:f<7?1:2;
root.dataset.stage=String(stage);$('.pd-muted').textContent=T.brand;
$$('[data-stage]').forEach((b,i)=>{b.querySelector('b').textContent=T.steps[i];b.setAttribute('aria-pressed',String(i===stage))});
for(const [k,v] of Object.entries({eyebrow:T.eyebrow[stage],status:T.status[stage],asideTitle:T.asideTitle,asideBottom:T.asideBottom[stage],caption:T.caption[stage],disclaimer:T.disclaimer})){const el=root.querySelector(`[data-label="${k}"]`);if(el)el.textContent=v}
let html='';
if(stage===0){const chat=T.chat.slice(0,f+1).map((c,i)=>msg(i,c));html=f<4?chat.join(''):`<details class="pd-history"><summary>${T.earlier}</summary>${chat.slice(0,2).join('')}</details>`+chat.slice(2).join('');if(f<5)html+='<div class="pd-typing" aria-hidden="true"><i></i><i></i><i></i></div>'}
else if(stage===1){html=`<section class="sx"><h3 class="pd-title">${T.find.title}</h3><div class="sx-steps">${T.find.cards.map((c,i)=>`<div class="sx-card ${i===0?'key':''}" style="--d:${i*.3}s"><small>${c[0]}</small><strong>${c[1]}</strong></div>`).join('')}</div></section>`}
else{html=`<section class="sx"><h3 class="pd-title">${T.plan.title}</h3><div class="sx-steps">${T.plan.steps.map((c,i)=>`<div class="sx-card" style="--d:${i*.3}s"><span class="sx-num">${i+1}</span><strong>${c[0]}</strong><p>${c[1]}</p></div>`).join('')}</div><p class="sx-note">${T.plan.note}</p></section>`}
updateHTML($('.pd-scene'),html);
const n=f===0?0:f<3?1:f<5?2:3;$('.pd-insights').innerHTML=T.signals.slice(0,n).map(s=>`<div class="pd-signal"><small>${s[0]}</small><strong>${s[1]}</strong></div>`).join('');
setControls()}
function setControls(){$('.pd-pause').textContent=paused?'▶':'Ⅱ';$('.pd-pause').setAttribute('aria-label',paused?T.play:T.pause);$('.pd-replay').setAttribute('aria-label',T.replay);root.dataset.paused=String(paused)}
$$('[data-stage]').forEach(b=>b.addEventListener('click',()=>{elapsed=jumps[Number(b.dataset.stage)];paused=Number(b.dataset.stage)>0;render(true)}));
$('.pd-pause').addEventListener('click',()=>{paused=!paused;setControls()});
$('.pd-replay').addEventListener('click',()=>{elapsed=0;paused=false;render(true)});
new IntersectionObserver(e=>{visible=e[0].isIntersecting},{threshold:.15}).observe(root);
document.addEventListener('visibilitychange',()=>{last=performance.now()});
function tick(now){const d=Math.min(now-last,150);last=now;if(!paused&&visible&&!document.hidden){elapsed+=d;if(elapsed>=duration)elapsed=0;render()}const tr=$('.pd-track>div');if(tr)tr.style.width=(elapsed/duration*100)+'%';requestAnimationFrame(tick)}
if(reduce)elapsed=50000;render(true);requestAnimationFrame(tick);
})();
