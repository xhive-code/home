var h=document.documentElement;h.classList.add('js');
;(function(){var tl=document.getElementById('tline');if(!tl)return;var R=window.matchMedia('(prefers-reduced-motion: reduce)').matches;var bar=tl.querySelector('.tbar i'),it=tl.querySelectorAll('.ti');
function up(){var vh=window.innerHeight,r=tl.getBoundingClientRect(),y=vh*0.65;var p=R?1:Math.max(0,Math.min(1,(y-r.top)/(r.height-40)));bar.style.height=(p*100)+'%';for(var k=0;k<it.length;k++){if(R||it[k].getBoundingClientRect().top+20<y)it[k].classList.add('on');else it[k].classList.remove('on');}}
var tk=false;window.addEventListener('scroll',function(){if(!tk){tk=true;requestAnimationFrame(function(){tk=false;up();});}},{passive:true});window.addEventListener('resize',up);up();})();
;(function(){var R=window.matchMedia('(prefers-reduced-motion: reduce)').matches;var IDLE=8000,LA=Date.now();
function idx(l){[].forEach.call(l,function(c,i){c.style.setProperty('--i',i)})}
document.querySelectorAll('.stg').forEach(function(p){idx(p.children)});
document.querySelectorAll('.who2,.ev').forEach(function(p){idx(p.querySelectorAll('tr,.row'))});
document.querySelectorAll('.evc .big,.ps b').forEach(function(b){var m=b.textContent.trim().match(/^(\d{1,4})(%?)$/);if(m){b.setAttribute('data-n',m[1]);b.setAttribute('data-s',m[2]);}});
var UNITS='.reveal,.hero2,#kmap,[data-n]',LOOPS='#kmap,.ev,.chain,.chat,.stg,[data-n]';
function count(b){var n=+b.getAttribute('data-n'),s=b.getAttribute('data-s'),t0=null,tok=b._k=(b._k||0)+1;function f(t){if(tok!=b._k)return;if(!t0)t0=t;var p=Math.min(1,(t-t0)/1200);p=1-Math.pow(1-p,3);b.textContent=Math.round(n*p)+s;if(p<1)requestAnimationFrame(f);}requestAnimationFrame(f);}
function done(el){if(el.hasAttribute('data-n'))el.textContent=el.getAttribute('data-n')+el.getAttribute('data-s');else{el.classList.add('show');if(el.id=='kmap')el.classList.add('on');}}
function reset(el){el._k=(el._k||0)+1;el.classList.add('rs');if(el.hasAttribute('data-n'))el.textContent='0'+el.getAttribute('data-s');else{el.classList.remove('show');el.classList.remove('on');}void el.offsetWidth;el.classList.remove('rs');}
function play(el){if(el.hasAttribute('data-n'))count(el);else{requestAnimationFrame(function(){el.classList.add('show');if(el.id=='kmap')el.classList.add('on');});}}
function stop(el){if(el._t){clearInterval(el._t);el._t=null;}}
var io=('IntersectionObserver' in window)&&!R?new IntersectionObserver(function(es){es.forEach(function(e){var el=e.target;
if(e.isIntersecting&&e.intersectionRatio>=.2){if(el._in)return;el._in=true;play(el);}
else if(!e.isIntersecting&&el._in){el._in=false;stop(el);reset(el);}});},{threshold:[0,.2]}):null;
['scroll','wheel','mousemove','touchstart','keydown'].forEach(function(t){window.addEventListener(t,function(){LA=Date.now()},{passive:true})});
if(io)setInterval(function(){if(document.hidden||Date.now()-LA<IDLE)return;LA=Date.now();document.querySelectorAll(LOOPS).forEach(function(el){if(el._in){reset(el);play(el);}})},1000);
window.arm=function(root){if(!root)return;document.querySelectorAll(UNITS).forEach(function(el){if(!root.contains(el)){stop(el);el._in=false;}});
root.querySelectorAll(UNITS).forEach(function(el){if(!io){done(el);return;}stop(el);el._in=false;reset(el);io.unobserve(el);io.observe(el);});};})();
;(function(){var V=document.querySelectorAll('.view');var CUR=null;
function show(v){var ok=false;V.forEach(function(x){if(x.getAttribute('data-v')==v)ok=true});if(!ok)v='home';V.forEach(function(x){x.hidden=x.getAttribute('data-v')!=v});document.querySelectorAll('nav a[data-v],.mnav a[data-v]').forEach(function(a){a.classList.toggle('cur',a.getAttribute('data-v')==v)});if(v!=CUR){CUR=v;if(window.arm)window.arm(document.querySelector(".view[data-v='"+v+"']"));}}
function route(){var hs=location.hash;if(hs.indexOf('#/')==0){show(hs.slice(2)||'home');window.scrollTo(0,0);}else if(hs.length>1&&hs!='#en'&&hs!='#et'){var t=document.getElementById(hs.slice(1));if(t){var p=t.closest('.view');show(p?p.getAttribute('data-v'):'home');t.scrollIntoView();}else show('home');}else show('home');window.dispatchEvent(new Event('resize'));}
window.addEventListener('hashchange',route);route();})();

document.querySelectorAll('form[data-mailto]').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();var d=new FormData(f),g=function(k){return (d.get(k)||'').toString().trim()};if(g('_gotcha'))return;var b=[f.querySelector('[name=name]').parentNode.firstChild.textContent.trim()+': '+g('name'),f.querySelector('[name=company]').parentNode.firstChild.textContent.trim()+': '+g('company'),f.querySelector('[name=phone]').parentNode.firstChild.textContent.trim()+': '+g('phone'),'',g('message')].join('\n');location.href='mailto:'+f.dataset.mailto+'?subject='+encodeURIComponent(g('_subject'))+'&body='+encodeURIComponent(b);});});
