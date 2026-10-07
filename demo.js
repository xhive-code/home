
(()=>{
const root=document.getElementById('xhive-demo'); if(!root)return;
const $=s=>root.querySelector(s), $$=s=>[...root.querySelectorAll(s)];
let lang='en', scenario='knowledge', elapsed=0, paused=matchMedia('(prefers-reduced-motion: reduce)').matches, visible=true, last=performance.now(), rendered=-1;
let renderedResultKey="";
const duration=102000;
const text={en:{
brand:'/ company memory',cases:['Could you really switch off?','The shortcut nobody talks about'],steps:['The conversation','What it reveals','What could change'],
disclaimer:'Fictional backend developer interviews, created to illustrate Xhive’s approach.',
pause:'Pause',play:'Continue',replay:'Replay',status:['At your own pace','From the conversation','For the team to discuss'],eyebrow:['Alex · Backend developer','Beyond the first answer','Make work easier to hand over'],
asideTitle:'Behind the answer',asideBottom:['Listen. Pick up the detail. Ask again.','Based on this person’s account','A suggestion to explore together'],
caption:['Start with a real experience. Give the next answer room to be honest.','The first answer rarely tells the whole story.','An honest conversation becomes a practical place to start.'],ai:'Xhive · AI interviewer',person:'Alex · Backend developer',action:'Suggested next step',
know:{
q1:'How was your work covered during your last holiday?',
a1:'Mostly fine. The team took over. I did jump online a couple of times, but nothing major.',
q2:'What was happening on those couple of occasions?',
a2:'The payment queue got stuck. I’m the only one who knows which jobs are safe to retry. Honestly, I checked Slack every morning. I said I was fine with it, but <mark>it didn’t really feel like time off.</mark>',
q3:'That sounds hard to switch off from. We could start with a recovery guide and a practice run with a teammate. <mark>What would make that realistic for you?</mark>',
a3:'Time set aside for it. I keep saying I’ll document it, then another feature comes first. <mark>I don’t want to be indispensable. I just want to know someone else can handle it.</mark>',
compareTitle:'“Mostly fine” had <em>more behind it.</em>',quote1:'“The team took over. I did jump online a couple of times.”',quote2:'“I checked Slack every morning. It didn’t really feel like time off.”',
note:'Recovery knowledge sits with one developer. Making it shareable needs protected time, not just another task on their list.',
mapTitle:'Make it possible to <em>actually take time off.</em>',nodes:['Capture the judgement','Practise the handover'],nodeSub:['Which payment jobs are safe to retry?','Can a teammate recover the queue?'],mapNote:'Ask the team to validate the gap and agree time for the handover.',
actionText:'Set aside time in a sprint for Alex and a teammate to document the recovery decisions, then practise them safely in a test environment.',round:'A useful follow-up: “If this happened next week while you were away, what would still need your help?”',
signals:[['The first answer','“Mostly fine.”','The team covered the work, with a couple of interruptions.'],['What the follow-up uncovered','Time off still depended on Alex','Knowing which jobs are safe to retry lives with one person.'],['What would make a difference','Time to share the knowledge','Alex wants reliable cover, not to be indispensable.']],resolved:['What to check next','Can someone else take over?','A written guide is a starting point. A safe practice run tests the handover.']},
cust:{
q1:'Tell me about the last time you did something differently from the instructions. Was it worth it?',
a1:'During a release, I skipped one of the checks. Nothing broke, and we shipped on time.',
q2:'What made skipping it feel like the right call that day?',
a2:'That test fails even when nothing’s wrong. Everyone reruns it until it goes green. We had a deadline, so I bypassed it. <mark>I wouldn’t tell someone new to do that, though.</mark>',
q3:'It sounds like experience is filling in for a check the team no longer trusts. One option is to fix or replace it. <mark>What has kept that from happening?</mark>',
a3:'There’s always something more urgent. Honestly, I stopped raising it. <mark>Last time I brought it up, I ended up owning the fix on top of my sprint.</mark>',
compareTitle:'A shortcut reveals <em>more than a skipped check.</em>',quote1:'“Nothing broke, and we shipped on time.”',quote2:'“I stopped raising it. I ended up owning the fix on top of my sprint.”',
note:'The account suggests an unreliable check and a cost to speaking up. Discuss both with the team before deciding what to change.',
mapTitle:'Make the safer way <em>the workable way.</em>',nodes:['Restore a useful check','Make room for the fix'],nodeSub:['Find out why the test fails unpredictably','Agree an owner and planned capacity'],mapNote:'A successful release does not prove that bypassing the check was safe.',
actionText:'Review the unreliable test with the team. Agree how to handle failures while it is repaired, and plan the work instead of adding it to someone’s existing sprint.',round:'A useful follow-up: “What happened the next time someone raised a problem like this?”',
signals:[['The first answer','“We shipped on time.”','The shortcut appears to have worked on this occasion.'],['What the follow-up uncovered','A check people work around','Experience is compensating for a test they do not trust.'],['What made the person stop raising it','The fix became extra work','Surfacing a problem felt like volunteering for another task.']],resolved:['What to check next','Is it easier to raise the next problem?','Check whether the test improved and whether repair work gets planned.']}
}};
const message=(who,initial,body,answer=false)=>`<div class="pd-message ${answer?'answer':''}"><div class="pd-who"><span class="pd-avatar">${initial}</span>${who}</div><div class="pd-bubble">${body}</div></div>`;
const signal=s=>`<div class="pd-signal"><small>${s[0]}</small><strong>${s[1]}</strong><p>${s[2]}</p></div>`;
const resultData={
knowledge:{
 title:'The team covers the work.<br><em>The recovery still depends on Alex.</em>',
 planTitle:'Move the recovery knowledge<br><em>from one person to the team.</em>',
 nodes:[
  {id:'team',x:19,y:18,title:'The team',sub:'Routine cover',quote:'“The team took over.”'},
  {id:'alex',x:50,y:46,title:'Alex',sub:'Recovery know-how',type:'hub',quote:'“I’m the only one who knows which jobs are safe to retry.”'},
  {id:'retry',x:81,y:18,title:'Safe retries',sub:'Decisions in Alex’s head',quote:'“I’m the only one who knows which jobs are safe to retry.”'},
  {id:'queue',x:19,y:79,title:'Payment queue',sub:'Gets stuck',quote:'“The payment queue got stuck.”'},
  {id:'guide',x:81,y:79,title:'Recovery guide',sub:'Not yet written',type:'gap',quote:'“I keep saying I’ll document it, then another feature comes first.”'}
 ],
 edges:[['team','alex','risk'],['queue','alex','risk'],['alex','retry',''],['alex','guide','gap']],
 matrixTitle:'Where the knowledge sits',headers:['Task','Alex','Shared cover'],
 rows:[['Routine work',['known','Can cover'],['known','Team covers']],['Safe retry decisions',['known','Knows how'],['gap','Only Alex, in this account']],['Recovery guide',['gap','Not written'],['unknown','Practice not checked']]],
 matrixNote:'From Alex’s account. Validate team capability in follow-up interviews.',
 findingNumber:'1',findingTitle:'identified holder of safe-retry knowledge',findingText:'Routine cover exists. Independent recovery has not been demonstrated.',
 laneTitle:'Where the handover breaks',lanes:[['Routine cover',['Alex away','Team takes over','Work continues'],false],['When it fails',['Queue stalls','Alex gets called','Holiday interrupted'],true]],
 laneNote:'The second path appears only after the follow-up question.',
 planNodes:[
  {id:'alex',x:19,y:20,title:'Alex',sub:'Share the judgement',type:'hub',quote:'“I don’t want to be indispensable.”'},
  {id:'guide',x:50,y:20,title:'Recovery guide',sub:'Proposed',type:'proposed',quote:'Proposed: record which jobs can be retried safely and why.'},
  {id:'team',x:81,y:20,title:'Teammate',sub:'Practise safely',type:'proposed',quote:'Proposed: a teammate works through recovery in a test environment.'},
  {id:'time',x:19,y:79,title:'Sprint time',sub:'Must be agreed',type:'proposed',quote:'“Time set aside for it.”'},
  {id:'queue',x:81,y:79,title:'Payment queue',sub:'Cover to verify',type:'proposed',quote:'To verify: can the teammate recover the queue without calling Alex?'}
 ],
 planEdges:[['alex','guide','proposed'],['guide','team','proposed'],['team','queue','proposed'],['time','alex','proposed']],
 actions:[['Protect the time','Choose capacity in a sprint before adding handover work.','Team lead + Alex'],['Capture the decisions','Write the safe-retry rules with the person who uses them.','Alex + a teammate'],['Test the handover','Practise in a safe environment without Alex taking over.','Teammate, with Alex observing']],
 milestones:[['Gap identified','From the interview'],['Guide written','To do'],['Cover practised','To do'],['Time off protected','To verify']],
 follow:'“If this happened next week while you were away, what would still need your help?”'
},
customer:{
 title:'The release went out.<br><em>The unreliable check stayed.</em>',
 planTitle:'Repair the control.<br><em>Make room for the repair.</em>',
 nodes:[
  {id:'test',x:19,y:18,title:'Release check',sub:'Unreliable signal',type:'gap',quote:'“That test fails even when nothing’s wrong.”'},
  {id:'alex',x:50,y:46,title:'Alex',sub:'Personal judgement',type:'hub',quote:'“We had a deadline, so I bypassed it.”'},
  {id:'release',x:81,y:18,title:'Release',sub:'Shipped on time',quote:'“Nothing broke, and we shipped on time.”'},
  {id:'deadline',x:19,y:79,title:'Deadline',sub:'Pressure to ship',quote:'“We had a deadline, so I bypassed it.”'},
  {id:'repair',x:81,y:79,title:'Repair work',sub:'Added to the sprint',type:'gap',quote:'“I ended up owning the fix on top of my sprint.”'}
 ],
 edges:[['test','alex','risk'],['deadline','alex','risk'],['alex','release','risk'],['alex','repair','gap']],
 matrixTitle:'Where the process diverges',headers:['Area','Needed','In this account'],
 rows:[['Release check',['known','Useful signal'],['gap','Rerun or bypass']],['Decision to ship',['known','Clear exception path'],['gap','Personal judgement']],['Repair work',['known','Planned capacity'],['gap','Extra sprint work']]],
 matrixNote:'“Needed” describes the proposed control, not a verified current policy.',
 findingNumber:'2',findingTitle:'issues to resolve together',findingText:'An unreliable check—and a repair process that makes raising it feel like extra work.',
 laneTitle:'How the workaround becomes the process',lanes:[['Normal route',['Run check','Review result','Release'],false],['Reported route',['Test fails','Rerun / bypass','Release anyway'],true]],
 laneNote:'“Nothing broke” describes one release; it does not validate the shortcut.',
 planNodes:[
  {id:'alex',x:19,y:20,title:'Alex + team',sub:'Review the failure',type:'hub',quote:'“That test fails even when nothing’s wrong.”'},
  {id:'repair',x:50,y:20,title:'Repair owner',sub:'Agree capacity',type:'proposed',quote:'Proposed: assign planned repair time, rather than extra unplanned work.'},
  {id:'test',x:81,y:20,title:'Reliable check',sub:'To demonstrate',type:'proposed',quote:'To verify: does the check produce a useful, trusted signal?'},
  {id:'route',x:19,y:79,title:'Exception route',sub:'Agree while fixing',type:'proposed',quote:'Proposed: agree how failed checks are handled while the test is repaired.'},
  {id:'release',x:81,y:79,title:'Release decision',sub:'Uses the check',type:'proposed',quote:'To verify: does the next release follow the agreed route?'}
 ],
 planEdges:[['alex','repair','proposed'],['repair','test','proposed'],['test','release','proposed'],['alex','route','proposed'],['route','release','proposed']],
 actions:[['Review what failed','Investigate the test and how release decisions are made.','Alex + the release team'],['Plan the repair','Agree an owner and capacity; remove or reprioritise other work.','Team lead + repair owner'],['Check the next release','Verify the signal and the route used when it fails.','Release team']],
 milestones:[['Gap identified','From the interview'],['Repair planned','To do'],['Check trusted','To verify'],['Route followed','To verify']],
 follow:'“What happened the next time someone raised a problem like this?”'
}
};
let selectedNode='alex';
const cell=([status,label])=>`<span class="pr-cell"><i class="pr-state ${status}" aria-hidden="true"></i><span>${label}</span></span>`;
function mapHTML(nodes,plan){return `<div class="pr-map" role="group" aria-label="${plan?'Proposed knowledge handover':'Current dependency map'}. Select a node to see its evidence."><svg class="pr-lines" aria-hidden="true"></svg>${nodes.map(n=>`<button type="button" class="pr-node ${n.type||''}" data-map-node="${n.id}" style="left:${n.x}%;top:${n.y}%" aria-pressed="${n.id===selectedNode}"><strong>${n.title}</strong><small>${n.sub}</small></button>`).join('')}</div><div class="pr-legend">${plan?'<span><i class="proposed"></i> Proposed connection</span>':'<span><i></i> Reliance described</span><span><i class="gap"></i> Gap / unplanned work</span>'}</div><div class="pr-evidence" aria-live="polite"><small>${plan?'Evidence / proposed change':'Source · Alex’s interview'}</small><span>${(nodes.find(n=>n.id===selectedNode)||nodes.find(n=>n.id==='alex')).quote}</span></div>`}
function resultsHTML(plan){const r=resultData[scenario],nodes=plan?r.planNodes:r.nodes;return `<section class="pr-results"><div class="pr-intro"><h3 class="pd-title">${plan?r.planTitle:r.title}</h3><span class="pr-tag ${plan?'plan':''}">${plan?'Proposed · not yet verified':'Interview findings'}</span></div><div class="pr-grid"><div class="pr-panel"><div class="pr-label">${plan?'How knowledge could move':'Who the work depends on'}<small>Select a node</small></div>${mapHTML(nodes,plan)}</div><div class="pr-panel">${plan?`<div class="pr-label">Turn the finding into work</div><div class="pr-actions">${r.actions.map((a,i)=>`<div class="pr-action-row" style="--pr-delay:${i*.2}s"><div><strong>${a[0]}</strong><p>${a[1]}</p><small>Proposed owner · ${a[2]}</small></div></div>`).join('')}</div><div class="pr-matrix-note">Owners and capacity must be agreed with the team.</div>`:`<div class="pr-label">${r.matrixTitle}</div><table class="pr-matrix"><thead><tr>${r.headers.map(h=>`<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${r.rows.map(row=>`<tr><td>${row[0]}</td><td>${cell(row[1])}</td><td>${cell(row[2])}</td></tr>`).join('')}</tbody></table><div class="pr-matrix-note">${r.matrixNote}</div><div class="pr-finding"><span class="pr-finding-num">${r.findingNumber}</span><div><strong>${r.findingTitle}</strong><p>${r.findingText}</p></div></div>`}</div></div>${plan?`<div class="pr-process"><div class="pr-label">Track evidence of progress<small>Current position</small></div><div class="pr-milestones">${r.milestones.map((m,i)=>`<div class="pr-milestone ${i===0?'done':''}">${m[0]}<small>${m[1]}</small></div>`).join('')}</div><div class="pr-followup"><small>Next interview</small>${r.follow}</div></div>`:`<div class="pr-process"><div class="pr-label">${r.laneTitle}</div>${r.lanes.map(l=>`<div class="pr-lane"><span class="pr-lane-label">${l[0]}</span><div class="pr-lane-track">${l[1].map((s,i)=>`${i?'<span class="pr-flow-arrow" aria-hidden="true">→</span>':''}<span class="pr-flow-step ${l[2]?'problem':'neutral'}" style="--pr-delay:${i*.16}s">${s}</span>`).join('')}</div></div>`).join('')}<div class="pr-process-foot">${r.laneNote}</div></div>`}</section>`}
let mapObserver=null, mapBound=null, mapPlan=null;
function wireMap(plan){const graph=$('.pr-map');if(!graph)return;if(graph===mapBound&&plan===mapPlan)return;mapBound=graph;mapPlan=plan;if(mapObserver)mapObserver.disconnect();const r=resultData[scenario],nodes=plan?r.planNodes:r.nodes,edges=plan?r.planEdges:r.edges;
 const draw=()=>{const w=graph.clientWidth,h=graph.clientHeight;if(!w||!h)return;const svg=graph.querySelector('.pr-lines');svg.setAttribute('viewBox',`0 0 ${w} ${h}`);const boxes={};graph.querySelectorAll('[data-map-node]').forEach(button=>{const n=nodes.find(n=>n.id===button.dataset.mapNode);boxes[n.id]={x:w*n.x/100,y:h*n.y/100,w:button.offsetWidth,h:button.offsetHeight}});const trim=(a,b,pad)=>{const dx=b.x-a.x,dy=b.y-a.y;const t=Math.min((a.w/2+pad)/(Math.abs(dx)||1e-6),(a.h/2+pad)/(Math.abs(dy)||1e-6));return [a.x+dx*t,a.y+dy*t]};svg.innerHTML=`<defs><marker id="pr-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 1 L 9 5 L 0 9" fill="none" stroke="#8eaa93" stroke-width="1.6"/></marker></defs>`+edges.map(([a,b,type])=>{const from=trim(boxes[a],boxes[b],5),to=trim(boxes[b],boxes[a],8);return `<path class="pr-edge ${type}" d="M${from[0]},${from[1]} L${to[0]},${to[1]}" marker-end="url(#pr-arrow)"/>`}).join('')};
 graph.querySelectorAll('[data-map-node]').forEach(button=>button.addEventListener('click',()=>{selectedNode=button.dataset.mapNode;graph.querySelectorAll('[data-map-node]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mapNode===selectedNode)));$('.pr-evidence span').textContent=nodes.find(n=>n.id===selectedNode).quote;paused=true;setControls()}));mapObserver=new ResizeObserver(draw);mapObserver.observe(graph);draw();
}

function frame(){const sec=elapsed/1000;return sec<4?0:sec<9.5?1:sec<13?2:sec<24?3:sec<33?4:sec<44?5:sec<52?6:sec<60?7:sec<70?8:sec<80?9:sec<90?10:11}
function render(force=false){const f=frame();if(f===rendered&&!force)return;rendered=f;const t=text[lang],d=scenario==='knowledge'?t.know:t.cust;const stage=f<6?0:f<9?1:2;
 root.dataset.lang=lang;root.dataset.stage=String(stage);root.dataset.paused=String(paused);$('.pd-muted').textContent=t.brand;$$('[data-case]').forEach((b,i)=>{b.textContent=t.cases[i];b.setAttribute('aria-pressed',String(b.dataset.case===scenario))});$$('[data-stage]').forEach((b,i)=>{b.querySelector('b').textContent=t.steps[i];b.setAttribute('aria-pressed',String(i===stage))});
 for(const [k,v]of Object.entries({eyebrow:t.eyebrow[stage],status:t.status[stage],asideTitle:t.asideTitle,asideBottom:t.asideBottom[stage],caption:t.caption[stage],disclaimer:t.disclaimer}))root.querySelector(`[data-label="${k}"]`).textContent=v;
 let content='';
 if(stage===0){
 const chat=[message(t.ai,'P',d.q1),message(t.person,'A',d.a1,true),message(t.ai,'P',d.q2),message(t.person,'A',d.a2,true),message(t.ai,'P',d.q3),message(t.person,'A',d.a3,true)];
 if(f<4)content=chat.slice(0,f+1).join('');
 else content=`<details class="pd-history"><summary>Earlier in the conversation</summary>${chat.slice(0,2).join('')}</details>`+chat.slice(2,f+1).join('');
 if(f<5)content+='<div class="pd-typing" aria-hidden="true"><i></i><i></i><i></i></div>';
 }else{content=resultsHTML(stage===2);}

 const resultKey=scenario+'-'+stage;if(stage===0||resultKey!==renderedResultKey){updateHTML($('.pd-scene'),content);renderedResultKey=stage>0?resultKey:'';}
 if(stage>0)wireMap(stage===2);else if(mapObserver)mapObserver.disconnect();
 let count=f===0?0:f<3?1:f<5?2:3;
 $('.pd-insights').innerHTML=count?d.signals.slice(0,count).map(signal).join(''):`<div class="pd-empty">An everyday question. A detail worth following up.<div class="pd-chain"><span>?</span><i></i><span>…</span><i></i><span>✳</span></div></div>`;
 if(f>=11)$('.pd-insights').innerHTML=d.signals.slice(0,2).map(signal).join('')+signal(d.resolved);
 setControls();}
function updateHTML(el,html){const temp=document.createElement('template');temp.innerHTML=html;const nodes=[...temp.content.children];nodes.forEach((node,i)=>{const old=el.children[i];if(!old)el.appendChild(node);else if(old.outerHTML!==node.outerHTML)old.replaceWith(node)});while(el.children.length>nodes.length)el.lastElementChild.remove()}
function setControls(){const t=text[lang];$('.pd-pause').textContent=paused?'▶':'Ⅱ';$('.pd-pause').setAttribute('aria-label',paused?t.play:t.pause);$('.pd-replay').setAttribute('aria-label',t.replay);root.dataset.paused=String(paused)}
$$('[data-case]').forEach(b=>b.addEventListener('click',()=>{scenario=b.dataset.case;selectedNode='alex';elapsed=0;paused=false;render(true)}));$$('[data-stage]').forEach(b=>b.addEventListener('click',()=>{selectedNode='alex';elapsed=[0,53000,80000][Number(b.dataset.stage)];paused=Number(b.dataset.stage)>0;render(true)}));$('.pd-pause').addEventListener('click',()=>{paused=!paused;setControls()});$('.pd-replay').addEventListener('click',()=>{elapsed=0;paused=false;render(true)});
new IntersectionObserver(entries=>{visible=entries[0].isIntersecting},{threshold:.15}).observe(root);
document.addEventListener('visibilitychange',()=>{last=performance.now()});
function tick(now){const delta=Math.min(now-last,150);last=now;if(!paused&&visible&&!document.hidden){elapsed+=delta;if(elapsed>=duration)elapsed=0;render()}$('.pd-track>div').style.width=(elapsed/duration*100)+'%';requestAnimationFrame(tick)}
if(paused)elapsed=90000;if(root.dataset.previewResults==='true'){elapsed=53000;paused=true;}render(true);requestAnimationFrame(tick);
})();
