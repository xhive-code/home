(()=>{
const root=document.getElementById('xhive-demo');if(!root)return;
const $=s=>root.querySelector(s),$$=s=>[...root.querySelectorAll(s)];
const lang=root.dataset.lang==='et'?'et':'en';
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
let elapsed=0,paused=reduce,visible=true,last=performance.now(),rendered=-1;
const duration=60000,jumps=[0,30000,45000];
const T={en:{brand:'/ demo',steps:['We ask','We find','What to do'],disclaimer:'A made-up interview with a sales manager, to show how Xhive works.',pause:'Pause',play:'Continue',replay:'Replay',earlier:'Earlier in the conversation',
status:['Interview','Finding','Suggestion'],eyebrow:['Mari · Sales manager','What we found','How the knowledge moves on'],asideTitle:'What we noticed',asideBottom:['Listen. Ask again.','From the conversation','To agree with the team'],
caption:['The first answer is rarely the whole story.','One follow-up question shows the real risk.','A simple step moves the knowledge to the team.'],
ai:'Xhive',person:'Mari · Sales manager',
chat:['How was your work covered during your last holiday?','Mostly fine. A colleague took over. I answered a few calls.','What were those calls about?','Our largest customer wanted a quote. <mark>The big-customer discounts are all in my head.</mark>','What would make it easier to hand that over?','Time to write it down. <mark>I’d like someone else to know this too.</mark>'],
signals:[['First answer','“Mostly fine.”'],['Follow-up','The big-customer discounts aren’t written down.'],['What she wants','Time to share what she knows.']],
find:{title:'The everyday work is covered.<br><em>The big customers depend on Mari.</em>',cards:[['Risk','If Mari is away, the largest customer waits for a quote.'],['Why','The discounts are not written down anywhere.'],['Good news','Mari wants to hand it over. She needs time.']]},
plan:{title:'Move the knowledge<br><em>from one person to the team.</em>',steps:[['Write it down','Mari writes down each big customer’s discount.'],['Try it','A colleague makes one real quote. Mari checks it.'],['Check','The next holiday goes without calls.']],note:'A suggestion. Owners and timing are agreed with the team.'}},
et:{brand:'/ näidis',steps:['Küsime','Leiame','Mida teha'],disclaimer:'Väljamõeldud intervjuu müügijuhiga. Näitab, kuidas Xhive töötab.',pause:'Paus',play:'Jätka',replay:'Uuesti',earlier:'Vestluse algus',
status:['Intervjuu','Leid','Ettepanek'],eyebrow:['Mari · Müügijuht','Mida leidsime','Kuidas teadmine edasi liigub'],asideTitle:'Mida märkasime',asideBottom:['Kuula. Küsi uuesti.','Vestluse põhjal','Tiimiga kokku leppida'],
caption:['Esimene vastus räägib harva kogu loo.','Üks jätkuküsimus näitab päris riski.','Lihtne samm viib teadmise tiimile.'],
ai:'Xhive',person:'Mari · Müügijuht',
chat:['Kuidas teie töö viimase puhkuse ajal kaetud oli?','Enamasti hästi. Kolleeg võttis üle. Paar kõnet vastasin ise.','Millest need kõned olid?','Suurim klient tahtis pakkumist. <mark>Suurklientide allahindlused on mul peas.</mark>','Mis teeks selle üleandmise lihtsamaks?','Aeg see kirja panna. <mark>Tahaksin, et keegi teine ka seda teaks.</mark>'],
signals:[['Esimene vastus','„Enamasti hästi.“'],['Jätkuküsimus','Suurklientide allahindlused pole kirjas.'],['Mida ta tahab','Aega oma teadmisi jagada.']],
find:{title:'Igapäevane töö on kaetud.<br><em>Suurkliendid sõltuvad Marist.</em>',cards:[['Risk','Kui Mari on ära, ootab suurim klient pakkumist.'],['Miks','Allahindlusi pole kuskile kirja pandud.'],['Hea uudis','Mari tahab teadmisi jagada. Tal on vaja aega.']]},
plan:{title:'Vii teadmine<br><em>ühelt inimeselt tiimile.</em>',steps:[['Pane kirja','Mari paneb iga suurkliendi allahindluse kirja.'],['Proovi','Kolleeg teeb ühe päris pakkumise. Mari kontrollib.'],['Kontrolli','Järgmine puhkus möödub ilma kõnedeta.']],note:'Ettepanek. Vastutajad ja aeg lepitakse tiimiga kokku.'}}}[lang];
const msg=(i,body)=>{const ai=i%2===0;return `<div class="pd-message ${ai?'':'answer'}"><div class="pd-who"><span class="pd-avatar">${ai?'X':'M'}</span>${ai?T.ai:T.person}</div><div class="pd-bubble">${body}</div></div>`};
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
