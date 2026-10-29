(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();async function e(e){if(typeof navigator<`u`&&navigator.clipboard&&window.isSecureContext)try{return await navigator.clipboard.writeText(e),!0}catch{}if(typeof document>`u`)return!1;try{let t=document.createElement(`textarea`);t.value=e,t.setAttribute(`readonly`,``),t.style.position=`fixed`,t.style.top=`-9999px`,t.style.opacity=`0`,document.body.appendChild(t),t.select();let n=document.execCommand(`copy`);return document.body.removeChild(t),n}catch{return!1}}function t(){try{let e=`__applets_probe__`;return localStorage.setItem(e,e),localStorage.removeItem(e),localStorage}catch{return null}}function n(e,n){let r=t(),i=new Set,a=n;function o(){if(!r)return a;try{let t=r.getItem(e);return t===null?n:JSON.parse(t)}catch{return n}}function s(t){a=t;try{r?.setItem(e,JSON.stringify(t))}catch{}for(let e of i)e(t)}function c(){a=n;try{r?.removeItem(e)}catch{}for(let e of i)e(n)}function l(t){i.add(t);let n=n=>{n.key===e&&t(o())};return window.addEventListener(`storage`,n),()=>{i.delete(t),window.removeEventListener(`storage`,n)}}return{get:o,set:s,clear:c,subscribe:l}}function r(e={}){return{url:e.url??window.location.href,title:e.title??document.title,text:e.text??e.title??document.title}}function i(){return typeof navigator<`u`&&typeof navigator.share==`function`&&navigator.maxTouchPoints>0}async function a(t={}){let{url:n,title:a,text:o}=r(t);if(i()){let e=Date.now();try{return await navigator.share({title:a,text:o,url:n}),`shared`}catch(t){if(t instanceof Error&&t.name===`AbortError`&&Date.now()-e>250)return`shared`}}return await e(n)?`copied`:`menu`}var o=0;function s(e){return e.replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]??e)}function c(e,t){let n=e.label.toLowerCase(),r=`${n} ${e.keywords??``}`.toLowerCase();return!t||n===t?0:n.startsWith(t)?1:(n.split(`/`).pop()??n).startsWith(t)?2:n.includes(t)?3:r.includes(t)?4:-1}function l(e){o+=1;let t=`combo-${o}`,n=document.createElement(`div`);n.className=`relative`;let r=document.createElement(`input`);r.type=`text`,r.id=t,r.role=`combobox`,r.autocomplete=`off`,r.spellcheck=!1,r.setAttribute(`aria-expanded`,`false`),r.setAttribute(`aria-controls`,`${t}-list`),r.setAttribute(`aria-autocomplete`,`list`),r.setAttribute(`aria-label`,e.label),r.placeholder=e.placeholder??``;let i=e.options().find(t=>t.value===e.value);r.value=e.clearOnSelect?``:i?.label??``,r.className=`bg-background focus:ring-primary/40 w-full rounded-md border px-2 py-1.5 text-sm focus:ring-2 focus:outline-none`;let a=document.createElement(`ul`);a.id=`${t}-list`,a.role=`listbox`,a.hidden=!0,a.className=`bg-card absolute z-30 mt-1 max-h-64 w-max min-w-full overflow-y-auto rounded-md border py-1 shadow-lg`,n.append(r,a);let l=e.value??``,u=i?.label??``,d=[],f=-1,p=!1;function m(){let t=r.value.trim().toLowerCase();return t===``||t===u.toLowerCase()?e.options():e.options().map(e=>({option:e,rank:c(e,t)})).filter(e=>e.rank>=0).sort((e,t)=>e.rank-t.rank||e.option.label.localeCompare(t.option.label)).map(e=>e.option)}function h(){if(d.length===0){a.innerHTML=`<li class="text-muted-foreground px-3 py-2 text-sm">No match</li>`;return}a.innerHTML=d.map((e,n)=>`
        <li
          id="${t}-opt-${n}"
          role="option"
          aria-selected="${n===f}"
          data-value="${s(e.value)}"
          class="flex cursor-pointer items-baseline justify-between gap-3 px-3 py-1.5 text-sm ${n===f?`bg-accent text-accent-foreground`:``}"
        >
          <span>${s(e.label)}</span>
          ${e.hint?`<span class="text-muted-foreground shrink-0 text-xs">${s(e.hint)}</span>`:``}
        </li>`).join(``),r.setAttribute(`aria-activedescendant`,f>=0?`${t}-opt-${f}`:``),a.children[f]?.scrollIntoView({block:`nearest`})}function g(){d=m(),f=Math.max(0,d.findIndex(e=>e.value===l)),p=!0,a.hidden=!1,r.setAttribute(`aria-expanded`,`true`),h()}function _(t){p=!1,a.hidden=!0,r.setAttribute(`aria-expanded`,`false`),r.removeAttribute(`aria-activedescendant`),t&&(r.value=e.clearOnSelect?``:u)}function v(t){t&&(r.value=e.clearOnSelect?``:t.label,_(!1),e.onSelect(t.value))}return r.addEventListener(`focus`,g),r.addEventListener(`input`,()=>{d=m(),f=d.length>0?0:-1,p||(p=!0,a.hidden=!1,r.setAttribute(`aria-expanded`,`true`)),h()}),r.addEventListener(`keydown`,e=>{switch(e.key){case`ArrowDown`:case`ArrowUp`:{if(e.preventDefault(),!p)return g();let t=e.key===`ArrowDown`?1:-1;return f=(f+t+d.length)%d.length,h()}case`Home`:return p?(e.preventDefault(),f=0,h()):void 0;case`End`:return p?(e.preventDefault(),f=d.length-1,h()):void 0;case`Enter`:return p?(e.preventDefault(),v(d[f])):void 0;case`Escape`:return p?(e.preventDefault(),_(!0)):void 0;case`Tab`:return _(!0)}}),a.addEventListener(`pointerdown`,e=>{let t=e.target.closest(`li[data-value]`);t&&(e.preventDefault(),v(d.find(e=>e.value===t.getAttribute(`data-value`))))}),document.addEventListener(`pointerdown`,e=>{p&&(n.contains(e.target)||_(!0))}),{element:n,focus:()=>r.focus()}}var u={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};function d(e,t){let n=new Intl.DateTimeFormat(`en-GB`,{timeZone:t,weekday:`short`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(e),r=e=>Number(n.find(t=>t.type===e).value),i=n.find(e=>e.type===`weekday`).value;return{hour:r(`hour`),minute:r(`minute`),day:r(`day`),weekday:u[i]??0}}function f(e,t,n,r){if(r.includes(e.weekday))return!1;let i=e.hour*60+e.minute;return i>=t*60&&i<n*60}function p(e,t){let n=new Intl.DateTimeFormat(`en-GB`,{timeZone:t,year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(e),r=e=>Number(n.find(t=>t.type===e).value);return(Date.UTC(r(`year`),r(`month`)-1,r(`day`),r(`hour`),r(`minute`))-Math.floor(e.getTime()/6e4)*6e4)/6e4}function m(e){return e.split(`/`).pop().replace(/_/g,` `)}function h(e,t){let n=p(e,t),r=n<0?`-`:`+`,i=Math.abs(n);return`${r}${String(Math.floor(i/60)).padStart(2,`0`)}:${String(i%60).padStart(2,`0`)}`}function g(e,t){let n=new Date(e.getTime()+864e5);return p(e,t)!==p(n,t)}function _(e,t,n,r,i=[],a=48,o=30){let s=[];for(let c=0;c<a;c+=1){let a=new Date(e.getTime()+c*o*6e4),l=t.map(e=>d(a,e)),u=l.filter(e=>f(e,n,r,i)).length;s.push({instant:a,local:l,inHours:u})}return s}function v(e,t=30){let n=Math.max(0,...e.map(e=>e.inHours));if(n===0)return[];let r=[],i=null;for(let t of e)t.inHours===n?i??=t:i&&=(r.push({start:i.instant,end:t.instant,count:n}),null);if(i){let a=e[e.length-1];r.push({start:i.instant,end:new Date(a.instant.getTime()+t*6e4),count:n})}return r.sort((e,t)=>t.end.getTime()-t.start.getTime()-(e.end.getTime()-e.start.getTime()))}var y=[{id:`sat-sun`,label:`Sat + Sun`,days:[6,0]},{id:`fri-sat`,label:`Fri + Sat`,days:[5,6]},{id:`sun`,label:`Sun only`,days:[0]},{id:`none`,label:`None`,days:[]}],b=30,x=48,S=[`Sun`,`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`];function C(){return Intl.DateTimeFormat().resolvedOptions().timeZone||`UTC`}function w(){let e=Intl.supportedValuesOf?.(`timeZone`),t=e?.length?[...e]:[`UTC`];for(let e of[C(),`UTC`])t.includes(e)||t.push(e);return t.sort()}var T=w();function E(e){try{return new Intl.DateTimeFormat(`en`,{timeZone:e}).resolvedOptions().timeZone}catch{return null}}function D(e){let t=E(e);return t?(T.includes(t)||(T.push(t),T.sort()),t):null}function O(){let e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`}var k=n(`overlap:setup`,null),A=new URLSearchParams(window.location.search),j=k.get(),M=A.has(`z`)||A.has(`d`)||A.has(`ws`)||A.has(`wk`),N=[...new Set((A.get(`z`)??``).split(`,`).map(e=>D(e.trim())).filter(e=>e!==null))];N.length===0&&!M&&j&&(N=j.zones.map(e=>D(e)).filter(e=>e!==null)),N.length===0&&(N=[...new Set([C(),`America/New_York`,`Europe/London`,`Asia/Kolkata`].map(e=>D(e)).filter(e=>e!==null))].slice(0,4));var P=/^\d{4}-\d{2}-\d{2}$/.test(A.get(`d`)??``)?A.get(`d`):O(),F=y.some(e=>e.id===A.get(`wk`))?A.get(`wk`):!M&&j&&y.some(e=>e.id===j.weekendId)?j.weekendId:`sat-sun`,I=R(A.get(`ws`),!M&&j?j.workStart:9),L=R(A.get(`we`),!M&&j?j.workEnd:17);function R(e,t){if(e===null||e.trim()===``)return t;let n=Number(e);return Number.isFinite(n)&&Math.abs(n*2-Math.round(n*2))<1e-9&&n>=0&&n<=24?n:t}L<=I&&(I=9,L=17);var z=document.querySelector(`#app`);function B(){let[e,t,n]=P.split(`-`).map(Number);return new Date(Date.UTC(e,t-1,n,0,0,0))}function V(){let e=new URLSearchParams({z:N.join(`,`),d:P,ws:String(I),we:String(L),wk:F});window.history.replaceState(null,``,`${window.location.pathname}?${e}${window.location.hash}`),k.set({zones:N,date:P,workStart:I,workEnd:L,weekendId:F})}function H(e){return e.replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]??e)}function U(){return y.find(e=>e.id===F).days}function W(e){return`${String(e.hour).padStart(2,`0`)}:${String(e.minute).padStart(2,`0`)}`}function G(e){if(f(e,I,L,U()))return`bg-pastel-mint text-pastel-mint-fg`;if(U().includes(e.weekday))return`bg-pastel-lilac text-pastel-lilac-fg`;let t=e.hour*60+e.minute;return t>=(I-2)*60&&t<(L+3)*60?`bg-pastel-butter text-pastel-butter-fg`:`bg-secondary/40 text-muted-foreground`}function K(e){return`
    <div class="overflow-x-auto">
      <table class="w-max border-collapse text-sm">
        <tbody>${N.map((t,n)=>{let r=e.map((t,r)=>{let i=t.local[n],a=i.minute===0;return`<td class="border-b border-r px-1 py-1.5 text-center text-[11px] whitespace-nowrap ${r>0&&e[r-1].local[n].day!==i.day?`border-l-foreground/40 border-l-2 `:``}${G(i)}">${a?H(W(i)):``}</td>`}).join(``),i=e[0].local[n].weekday;return`
      <tr>
        <th scope="row" class="bg-card sticky left-0 z-10 border-b border-r py-1.5 pr-2 pl-1 text-left text-xs font-medium whitespace-nowrap">
          <span class="flex items-center gap-1.5">
            <button
              type="button"
              data-remove="${H(t)}"
              aria-label="Remove ${H(m(t))}"
              class="text-muted-foreground hover:text-destructive hover:bg-accent shrink-0 rounded px-1 leading-none"
            >×</button>
            <span>
              ${H(m(t))}
              <span class="text-muted-foreground block text-[10px] font-normal">
                ${H(h(e[0].instant,t))} ·
                ${H(S[i])}${g(e[0].instant,t)?` · clocks change`:``}
              </span>
            </span>
          </span>
        </th>
        ${r}
      </tr>`}).join(``)}
          <tr>
            <th scope="row" class="bg-card sticky left-0 z-10 border-r px-2 py-1 text-left text-[10px] font-medium">in hours</th>
            ${e.map(e=>`<td class="border-r px-1 py-1 text-center text-[10px] ${e.inHours===N.length?`text-success font-bold`:`text-muted-foreground`}">${e.inHours}</td>`).join(``)}
          </tr>
        </tbody>
      </table>
    </div>`}function q(e){let t=v(e,b);if(N.length===0&&!M&&j&&(N=j.zones.map(e=>D(e)).filter(e=>e!==null)),N.length===0)return`<p class="text-muted-foreground text-sm">Add a timezone to compare.</p>`;if(t.length===0)return`<p class="text-lg font-medium text-pastel-butter-fg">${U().length>0&&e.every(e=>e.inHours===0)?`Nobody is working on this date. Pick a weekday, or change the weekend setting.`:`No working hours on this date for anyone listed.`}</p>`;let n=t[0],r=n.count===N.length,i=N.map(e=>{let t=d(n.start,e),r=d(n.end,e);return`<li class="flex justify-between gap-4 border-b py-1.5 last:border-b-0">
        <span>${H(m(e))}</span>
        <span class="font-mono text-[13px]">${H(W(t))}–${H(W(r))}</span>
      </li>`}).join(``);return`
    <p class="text-lg font-medium ${r?``:`text-pastel-butter-fg`}">
      ${r?`All ${N.length} are free together for ${H(J(n.start,n.end))}.`:`No hour suits all ${N.length}. The best is ${n.count} of them, for ${H(J(n.start,n.end))}.`}
    </p>
    <ul class="mt-3 text-[15px]">${i}</ul>`}function J(e,t){let n=(t.getTime()-e.getTime())/6e4,r=Math.floor(n/60),i=n%60;return r===0?`${i} minutes`:i===0?`${r} hour${r===1?``:`s`}`:`${r}h ${i}m`}function Y(e){return T.filter(e=>!N.includes(e)).map(t=>({value:t,label:t.replace(/_/g,` `),hint:h(e,t),keywords:`${m(t)} ${X[t]??``}`}))}var X={"America/New_York":`nyc new york eastern est edt`,"America/Los_Angeles":`la pacific pst pdt california`,"America/Chicago":`central cst cdt`,"America/Denver":`mountain mst mdt`,"Europe/London":`uk britain gmt bst`,"Europe/Paris":`france cet cest`,"Europe/Berlin":`germany cet cest`,"Asia/Kolkata":`india ist bangalore mumbai delhi`,"Asia/Calcutta":`india ist bangalore mumbai delhi`,"Asia/Tokyo":`japan jst`,"Asia/Shanghai":`china cst beijing`,"Asia/Singapore":`sgt`,"Asia/Dubai":`uae gst`,"Australia/Sydney":`aest aedt nsw`,"Australia/Brisbane":`aest queensland`,"Pacific/Auckland":`nz new zealand nzst`,UTC:`gmt zulu universal`};function Z(){let e=[];for(let t=0;t<=48;t+=1){let n=Math.floor(t/2),r=t%2==0?0:30;if(n===24&&r!==0)break;let i=String(n+r/60),a=`${String(n).padStart(2,`0`)}:${String(r).padStart(2,`0`)}`,o=n%12==0?12:n%12,s=n<12||n===24?`am`:`pm`;e.push({value:i,label:a,keywords:`${n} ${o}${s} ${o}:${String(r).padStart(2,`0`)}${s}`})}return e}function Q(){let e=_(B(),N,I,L,U(),x,b);z.innerHTML=`
    <main class="bg-top-light page-pad min-h-dvh">
      <div class="mx-auto w-full max-w-5xl">
        <header class="standalone-only mb-8">
          <h1 class="text-3xl font-semibold tracking-tight">Overlap</h1>
        </header>

        <div class="bg-card rounded-xl border p-5 shadow-sm sm:p-6">
          <div class="flex flex-wrap items-end gap-3">
            <div>
              <label for="date" class="text-muted-foreground mb-1 block text-xs">Date</label>
              <input id="date" type="date" value="${H(P)}" class="bg-background focus:ring-primary/40 rounded-md border px-2 py-1.5 text-sm focus:ring-2 focus:outline-none" />
            </div>
            <div>
              <span class="text-muted-foreground mb-1 block text-xs">Working hours</span>
              <div class="flex items-center gap-1">
                <div id="mount-work-start" class="w-24"></div>
                <span class="text-muted-foreground text-sm">to</span>
                <div id="mount-work-end" class="w-24"></div>
              </div>
            </div>
            <div>
              <span class="text-muted-foreground mb-1 block text-xs">Weekend</span>
              <div class="flex flex-wrap gap-1" role="group" aria-label="Weekend days">
                ${y.map(e=>`
                  <button
                    type="button"
                    data-weekend="${e.id}"
                    aria-pressed="${e.id===F}"
                    class="rounded-md px-2.5 py-1.5 text-sm font-medium transition ${e.id===F?`bg-primary text-primary-foreground`:`bg-secondary text-secondary-foreground hover:bg-accent`}"
                  >${e.label}</button>`).join(``)}
              </div>
            </div>
            <div>
              <span class="text-muted-foreground mb-1 block text-xs">Timezones</span>
              <div id="mount-add-zone" class="w-56"></div>
            </div>
          </div>
        </div>

        <div class="bg-card mt-5 rounded-xl border p-5 shadow-sm sm:p-6">
          ${q(e)}
        </div>

        <div class="bg-card mt-5 rounded-xl border p-4 shadow-sm">
          ${N.length>0?K(e):`<p class="text-muted-foreground text-sm">No timezones yet.</p>`}
        </div>

        <div class="mt-5 flex justify-end">
          <button type="button" id="share" class="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-medium transition hover:opacity-90">Share</button>
        </div>
      </div>
    </main>`,$(e)}function $(e){z.querySelector(`#date`).addEventListener(`change`,e=>{P=e.target.value||O(),V(),Q()});let t=Z();z.querySelector(`#mount-work-start`).append(l({label:`Working hours start`,options:()=>t,value:String(I),onSelect:e=>{I=Number(e),L<=I&&(L=Math.min(24,I+1)),V(),Q()}}).element),z.querySelector(`#mount-work-end`).append(l({label:`Working hours end`,options:()=>t,value:String(L),onSelect:e=>{L=Number(e),L<=I&&(I=Math.max(0,L-.5)),V(),Q()}}).element),z.querySelector(`#mount-add-zone`).append(l({label:`Add a timezone`,placeholder:`Add a timezone…`,clearOnSelect:!0,options:()=>Y(new Date),onSelect:e=>{let t=D(e);t&&!N.includes(t)&&N.push(t),V(),Q()}}).element),z.querySelectorAll(`[data-weekend]`).forEach(e=>{e.addEventListener(`click`,()=>{F=e.dataset.weekend,V(),Q()})}),z.querySelectorAll(`[data-remove]`).forEach(e=>{e.addEventListener(`click`,()=>{N=N.filter(t=>t!==e.dataset.remove),V(),Q()})}),z.querySelector(`#share`).addEventListener(`click`,async t=>{let n=t.currentTarget,r=v(e,b);await a({title:`Overlap`,text:r.length>0?`${N.map(m).join(`, `)} on ${P}: best window ${W(d(r[0].start,N[0]))}–${W(d(r[0].end,N[0]))} in ${m(N[0])}`:`${N.map(m).join(`, `)} on ${P}`})===`copied`&&(n.textContent=`Link copied`,window.setTimeout(()=>{n.textContent=`Share`},1600))})}V(),Q();