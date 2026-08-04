(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`en-AU`,t=new Map;function n(e,n){let r=`${e}|${JSON.stringify(n)}`,i=t.get(r);return i||(i=new Intl.NumberFormat(e,n),t.set(r,i)),i}function r(t,r=`AUD`,i={}){let{locale:a=e,...o}=i;return Number.isFinite(t)?n(a,{style:`currency`,currency:r,...o}).format(t):`—`}function i(e,t,n){return Math.min(Math.max(e,t),n)}function a(e,t=0){let n=10**t;return Math.round((e+2**-52)*n)/n}function o(e,t=NaN){if(typeof e!=`string`)return t;let n=e.replace(/[^0-9.eE+-]/g,``);if(n===``)return t;let r=Number(n);return Number.isFinite(r)?r:t}async function s(e){if(typeof navigator<`u`&&navigator.clipboard&&window.isSecureContext)try{return await navigator.clipboard.writeText(e),!0}catch{}if(typeof document>`u`)return!1;try{let t=document.createElement(`textarea`);t.value=e,t.setAttribute(`readonly`,``),t.style.position=`fixed`,t.style.top=`-9999px`,t.style.opacity=`0`,document.body.appendChild(t),t.select();let n=document.execCommand(`copy`);return document.body.removeChild(t),n}catch{return!1}}function c(e={}){return{url:e.url??window.location.href,title:e.title??document.title,text:e.text??e.title??document.title}}function l(){return typeof navigator<`u`&&typeof navigator.share==`function`&&navigator.maxTouchPoints>0}async function u(e={}){let{url:t,title:n,text:r}=c(e);if(l()){let e=Date.now();try{return await navigator.share({title:n,text:r,url:t}),`shared`}catch(t){if(t instanceof Error&&t.name===`AbortError`&&Date.now()-e>250)return`shared`}}return await s(t)?`copied`:`menu`}function d(e=window.location.search){let t=new URLSearchParams(e),n={};for(let[e,r]of t)n[e]=r;return n}function f(e,t=!1){let n=new URLSearchParams(window.location.search);for(let[t,r]of Object.entries(e))r==null||r===``?n.delete(t):n.set(t,String(r));let r=n.toString(),i=`${window.location.pathname}${r?`?${r}`:``}${window.location.hash}`;t?window.history.pushState(null,``,i):window.history.replaceState(null,``,i)}function p(e,t=window.location.search){let n=d(t),r={};for(let t of Object.keys(e))r[t]=e[t](n[t]);return r}function m(e){return t=>{if(t===void 0)return e;let n=Number(t);return Number.isFinite(n)?n:e}}var h=[0,5,10,15,20],g=p({bill:m(100),tip:m(10),people:m(2),round:m(0)}),_=g.bill,v=g.tip,y=i(Math.round(g.people)||1,1,999),b=g.round===1,x=document.querySelector(`#app`);function S(){let e=Number.isFinite(_)?Math.max(_,0):0,t=e*v/100,n=e+t,r=n/y,i=b?Math.ceil(r*100)/100:r;return{tipAmount:t,total:n,perPerson:i,overage:b?a(i*y-n,2):0}}function C(){f({bill:_,tip:v,people:y,round:+!!b})}function w(){let{tipAmount:e,total:t,perPerson:n,overage:i}=S();x.innerHTML=`
    <main class="bg-top-light page-pad min-h-dvh">
      <div class="mx-auto w-full max-w-lg">
        <header class="standalone-only mb-8">
          <h1 class="text-3xl font-semibold tracking-tight">Tip &amp; Bill Splitter</h1>
        </header>

        <div class="bg-card space-y-5 rounded-xl border p-5 shadow-sm sm:p-6">
          <div>
            <label for="bill" class="mb-1.5 block text-sm font-medium">Bill amount</label>
            <input
              id="bill" inputmode="decimal" autocomplete="off" value="${_}"
              class="bg-background focus:ring-ring w-full rounded-md border px-3 py-2 text-lg tabular-nums outline-none focus:ring-2"
            />
          </div>

          <div>
            <label for="tip" class="mb-1.5 flex items-baseline justify-between text-sm font-medium">
              <span>Tip</span>
              <span id="tip-label" class="text-muted-foreground tabular-nums">${v}%</span>
            </label>
            <input id="tip" type="range" min="0" max="30" step="1" value="${v}" class="accent-primary w-full" />
            <div class="mt-2 flex flex-wrap gap-1.5">
              ${h.map(e=>`
                <button type="button" data-tip="${e}"
                  class="rounded-md px-2.5 py-1 text-xs font-medium transition ${e===v?`bg-primary text-primary-foreground`:`bg-secondary text-secondary-foreground hover:bg-accent`}">${e}%</button>`).join(``)}
            </div>
          </div>

          <div>
            <label for="people" class="mb-1.5 block text-sm font-medium">Split between</label>
            <div class="flex items-center gap-2">
              <button type="button" id="minus" aria-label="One fewer person"
                class="bg-secondary hover:bg-accent rounded-md border px-3 py-2 text-sm transition">−</button>
              <input id="people" inputmode="numeric" value="${y}"
                class="bg-background focus:ring-ring w-20 rounded-md border px-3 py-2 text-center text-lg tabular-nums outline-none focus:ring-2" />
              <button type="button" id="plus" aria-label="One more person"
                class="bg-secondary hover:bg-accent rounded-md border px-3 py-2 text-sm transition">+</button>
              <span class="text-muted-foreground text-sm">${y===1?`person`:`people`}</span>
            </div>
          </div>

          <label class="flex cursor-pointer items-center gap-2 text-sm">
            <input type="checkbox" id="roundup" ${b?`checked`:``} class="accent-primary" />
            Round each share up to the nearest cent
          </label>
        </div>

        <div class="bg-secondary mt-4 rounded-xl border p-5 sm:p-6">
          <div class="flex items-baseline justify-between gap-4">
            <span class="text-sm font-medium">Each person pays</span>
            <span id="per-person" class="text-3xl font-semibold tabular-nums">${r(n)}</span>
          </div>
          <div class="mt-4 flex justify-end border-t pt-4">
            <button
              id="share"
              type="button"
              class="bg-secondary hover:bg-accent shrink-0 rounded-md border px-3 py-1.5 text-sm font-medium transition"
            >Share</button>
          </div>
          <dl class="text-muted-foreground mt-3 space-y-1 text-sm">
            <div class="flex justify-between"><dt>Tip</dt><dd id="tip-amount" class="tabular-nums">${r(e)}</dd></div>
            <div class="flex justify-between"><dt>Total</dt><dd id="total" class="tabular-nums">${r(t)}</dd></div>
            <div class="flex justify-between${i>0?``:` hidden`}" id="overage-row">
              <dt>Collected over</dt><dd id="overage" class="tabular-nums">${r(i)}</dd>
            </div>
          </dl>
        </div>
      </div>
    </main>
  `,E()}function T(){let{tipAmount:e,total:t,perPerson:n,overage:i}=S();x.querySelector(`#per-person`).textContent=r(n),x.querySelector(`#tip-amount`).textContent=r(e),x.querySelector(`#total`).textContent=r(t),x.querySelector(`#overage`).textContent=r(i),x.querySelector(`#overage-row`).classList.toggle(`hidden`,i<=0)}function E(){let e=x.querySelector(`#bill`);e.addEventListener(`input`,()=>{_=o(e.value,0),C(),T()});let t=x.querySelector(`#tip`);t.addEventListener(`input`,()=>{v=Number(t.value),C(),w()});for(let e of x.querySelectorAll(`[data-tip]`))e.addEventListener(`click`,()=>{v=Number(e.dataset.tip),C(),w()});let n=x.querySelector(`#people`);n.addEventListener(`input`,()=>{y=i(Math.round(o(n.value,1))||1,1,999),C(),T()});let a=e=>()=>{y=i(y+e,1,999),C(),w()};x.querySelector(`#minus`).addEventListener(`click`,a(-1)),x.querySelector(`#plus`).addEventListener(`click`,a(1)),x.querySelector(`#roundup`).addEventListener(`change`,e=>{b=e.target.checked,C(),w()});let s=x.querySelector(`#share`);s.addEventListener(`click`,async()=>{let{perPerson:e}=S(),t=await u({title:`Tip & Bill Splitter`,text:`${r(e)} each, ${y} ${y===1?`person`:`people`}`});s.textContent={shared:`Share`,copied:`Link copied`,menu:`Copy failed`,failed:`Copy failed`}[t],setTimeout(()=>{s.textContent=`Share`},1600)})}C(),w();