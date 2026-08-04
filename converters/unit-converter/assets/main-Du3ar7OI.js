import{a as e,i as t,n,o as r,r as i,t as a}from"./units-Da2v4PON.js";async function o(e){if(typeof navigator<`u`&&navigator.clipboard&&window.isSecureContext)try{return await navigator.clipboard.writeText(e),!0}catch{}if(typeof document>`u`)return!1;try{let t=document.createElement(`textarea`);t.value=e,t.setAttribute(`readonly`,``),t.style.position=`fixed`,t.style.top=`-9999px`,t.style.opacity=`0`,document.body.appendChild(t),t.select();let n=document.execCommand(`copy`);return document.body.removeChild(t),n}catch{return!1}}function s(e={}){return{url:e.url??window.location.href,title:e.title??document.title,text:e.text??e.title??document.title}}function c(){return typeof navigator<`u`&&typeof navigator.share==`function`&&navigator.maxTouchPoints>0}async function l(e={}){let{url:t,title:n,text:r}=s(e);if(c()){let e=Date.now();try{return await navigator.share({title:n,text:r,url:t}),`shared`}catch(t){if(t instanceof Error&&t.name===`AbortError`&&Date.now()-e>250)return`shared`}}return await o(t)?`copied`:`menu`}function u(e=window.location.search){let t=new URLSearchParams(e),n={};for(let[e,r]of t)n[e]=r;return n}function d(e,t=!1){let n=new URLSearchParams(window.location.search);for(let[t,r]of Object.entries(e))r==null||r===``?n.delete(t):n.set(t,String(r));let r=n.toString(),i=`${window.location.pathname}${r?`?${r}`:``}${window.location.hash}`;t?window.history.pushState(null,``,i):window.history.replaceState(null,``,i)}function f(e,t=window.location.search){let n=u(t),r={};for(let t of Object.keys(e))r[t]=e[t](n[t]);return r}function p(e){return t=>{if(t===void 0)return e;let n=Number(t);return Number.isFinite(n)?n:e}}function m(e){return t=>t??e}var h=0;function g(e){return e.replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]??e)}function _(e,t){let n=e.label.toLowerCase(),r=`${n} ${e.keywords??``}`.toLowerCase();return!t||n===t?0:n.startsWith(t)?1:(n.split(`/`).pop()??n).startsWith(t)?2:n.includes(t)?3:r.includes(t)?4:-1}function v(e){h+=1;let t=`combo-${h}`,n=document.createElement(`div`);n.className=`relative`;let r=document.createElement(`input`);r.type=`text`,r.id=t,r.role=`combobox`,r.autocomplete=`off`,r.spellcheck=!1,r.setAttribute(`aria-expanded`,`false`),r.setAttribute(`aria-controls`,`${t}-list`),r.setAttribute(`aria-autocomplete`,`list`),r.setAttribute(`aria-label`,e.label),r.placeholder=e.placeholder??``;let i=e.options().find(t=>t.value===e.value);r.value=e.clearOnSelect?``:i?.label??``,r.className=`bg-background focus:ring-primary/40 w-full rounded-md border px-2 py-1.5 text-sm focus:ring-2 focus:outline-none`;let a=document.createElement(`ul`);a.id=`${t}-list`,a.role=`listbox`,a.hidden=!0,a.className=`bg-card absolute z-30 mt-1 max-h-64 w-max min-w-full overflow-y-auto rounded-md border py-1 shadow-lg`,n.append(r,a);let o=e.value??``,s=i?.label??``,c=[],l=-1,u=!1;function d(){let t=r.value.trim().toLowerCase();return t===``||t===s.toLowerCase()?e.options():e.options().map(e=>({option:e,rank:_(e,t)})).filter(e=>e.rank>=0).sort((e,t)=>e.rank-t.rank||e.option.label.localeCompare(t.option.label)).map(e=>e.option)}function f(){if(c.length===0){a.innerHTML=`<li class="text-muted-foreground px-3 py-2 text-sm">No match</li>`;return}a.innerHTML=c.map((e,n)=>`
        <li
          id="${t}-opt-${n}"
          role="option"
          aria-selected="${n===l}"
          data-value="${g(e.value)}"
          class="flex cursor-pointer items-baseline justify-between gap-3 px-3 py-1.5 text-sm ${n===l?`bg-accent text-accent-foreground`:``}"
        >
          <span>${g(e.label)}</span>
          ${e.hint?`<span class="text-muted-foreground shrink-0 text-xs">${g(e.hint)}</span>`:``}
        </li>`).join(``),r.setAttribute(`aria-activedescendant`,l>=0?`${t}-opt-${l}`:``),a.children[l]?.scrollIntoView({block:`nearest`})}function p(){c=d(),l=Math.max(0,c.findIndex(e=>e.value===o)),u=!0,a.hidden=!1,r.setAttribute(`aria-expanded`,`true`),f()}function m(t){u=!1,a.hidden=!0,r.setAttribute(`aria-expanded`,`false`),r.removeAttribute(`aria-activedescendant`),t&&(r.value=e.clearOnSelect?``:s)}function v(t){t&&(r.value=e.clearOnSelect?``:t.label,m(!1),e.onSelect(t.value))}return r.addEventListener(`focus`,p),r.addEventListener(`input`,()=>{c=d(),l=c.length>0?0:-1,u||(u=!0,a.hidden=!1,r.setAttribute(`aria-expanded`,`true`)),f()}),r.addEventListener(`keydown`,e=>{switch(e.key){case`ArrowDown`:case`ArrowUp`:{if(e.preventDefault(),!u)return p();let t=e.key===`ArrowDown`?1:-1;return l=(l+t+c.length)%c.length,f()}case`Home`:return u?(e.preventDefault(),l=0,f()):void 0;case`End`:return u?(e.preventDefault(),l=c.length-1,f()):void 0;case`Enter`:return u?(e.preventDefault(),v(c[l])):void 0;case`Escape`:return u?(e.preventDefault(),m(!0)):void 0;case`Tab`:return m(!0)}}),a.addEventListener(`pointerdown`,e=>{let t=e.target.closest(`li[data-value]`);t&&(e.preventDefault(),v(c.find(e=>e.value===t.getAttribute(`data-value`))))}),document.addEventListener(`pointerdown`,e=>{u&&(n.contains(e.target)||m(!0))}),{element:n,focus:()=>r.focus()}}var y=f({d:m(`length`),from:m(``),to:m(``),v:p(1)}),b=i(y.d).id,x=i(b),S=y.from&&t(x,y.from).id||x.units[0].id,C=y.to&&t(x,y.to).id||x.units[1].id,w=String(y.v),T=document.querySelector(`#app`);function E(){d({d:b,from:S,to:C,v:w})}function D(){let i=e(w);if(!Number.isFinite(i))return{text:`—`,detail:`Enter a number`};let a=t(x,S),o=t(x,C),s=n(i,a,o),c=r(s,{maximumSignificantDigits:6}),l=`${r(i,{maximumSignificantDigits:6})} ${a.symbol} = ${c} ${o.symbol}`;return{text:`${c} ${o.symbol}`,detail:l}}function O(){return x.units.map(e=>({value:e.id,label:`${e.name} (${e.symbol})`,keywords:`${e.id} ${e.symbol}`}))}function k(){let{text:e,detail:t}=D();T.innerHTML=`
    <main class="bg-top-light page-pad min-h-dvh">
      <div class="mx-auto w-full max-w-2xl">
        <header class="standalone-only mb-8">
          <h1 class="text-3xl font-semibold tracking-tight">Unit Converter</h1>
        </header>

        <div class="bg-card rounded-xl border p-5 shadow-sm sm:p-6">
          <div class="mb-5 flex flex-wrap gap-2" role="tablist" aria-label="Dimension">
            ${a.map(e=>`
              <button
                type="button"
                role="tab"
                data-dimension="${e.id}"
                aria-selected="${e.id===b}"
                class="rounded-md px-3 py-1.5 text-sm font-medium transition ${e.id===b?`bg-primary text-primary-foreground`:`bg-secondary text-secondary-foreground hover:bg-accent`}"
              >${e.name}</button>`).join(``)}
          </div>

          <div class="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
            <div>
              <label for="value" class="text-muted-foreground mb-1.5 block text-xs font-medium uppercase tracking-wide">From</label>
              <input
                id="value"
                inputmode="decimal"
                autocomplete="off"
                value="${w.replace(/"/g,`&quot;`)}"
                class="bg-background focus:ring-ring mb-2 w-full rounded-md border px-3 py-2 text-lg tabular-nums outline-none focus:ring-2"
              />
              <div id="mount-from"></div>
            </div>

            <button
              id="swap"
              type="button"
              title="Swap units"
              aria-label="Swap units"
              class="bg-secondary hover:bg-accent mx-auto rounded-md border px-3 py-2 text-sm transition sm:mb-0"
            >⇅</button>

            <div>
              <label class="text-muted-foreground mb-1.5 block text-xs font-medium uppercase tracking-wide">To</label>
              <output
                class="bg-muted mb-2 block w-full truncate rounded-md border px-3 py-2 text-lg font-medium tabular-nums"
                title="${e}"
              >${e}</output>
              <div id="mount-to"></div>
            </div>
          </div>

          <div class="mt-5 flex items-center justify-between gap-3 border-t pt-4">
            <p class="text-muted-foreground truncate text-sm" title="${t}">${t}</p>
            <button
              id="share"
              type="button"
              class="bg-secondary hover:bg-accent shrink-0 rounded-md border px-3 py-1.5 text-sm font-medium transition"
            >Share</button>
          </div>
        </div>
      </div>
    </main>
  `,A()}function A(){for(let e of T.querySelectorAll(`[data-dimension]`))e.addEventListener(`click`,()=>{b=e.dataset.dimension,x=i(b),S=x.units[0].id,C=x.units[1].id,E(),k()});let e=T.querySelector(`#value`);e.addEventListener(`input`,()=>{w=e.value,E();let{text:t,detail:n}=D();T.querySelector(`output`).textContent=t,T.querySelector(`p.truncate`).textContent=n});let t=O();T.querySelector(`#mount-from`).append(v({label:`Convert from`,options:()=>t,value:S,onSelect:e=>{S=e,E(),k()}}).element),T.querySelector(`#mount-to`).append(v({label:`Convert to`,options:()=>t,value:C,onSelect:e=>{C=e,E(),k()}}).element),T.querySelector(`#swap`).addEventListener(`click`,()=>{[S,C]=[C,S],E(),k()});let n=T.querySelector(`#share`);n.addEventListener(`click`,async()=>{let{detail:e}=D(),t=await l({title:`Unit Converter`,text:e});n.textContent={shared:`Share`,copied:`Link copied`,menu:`Copy failed`,failed:`Copy failed`}[t],setTimeout(()=>{n.textContent=`Share`},1600)})}E(),k();