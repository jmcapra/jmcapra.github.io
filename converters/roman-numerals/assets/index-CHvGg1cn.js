(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e=window.location.search){let t=new URLSearchParams(e),n={};for(let[e,r]of t)n[e]=r;return n}function t(e,t=!1){let n=new URLSearchParams(window.location.search);for(let[t,r]of Object.entries(e))r==null||r===``?n.delete(t):n.set(t,String(r));let r=n.toString(),i=`${window.location.pathname}${r?`?${r}`:``}${window.location.hash}`;t?window.history.pushState(null,``,i):window.history.replaceState(null,``,i)}function n(t,n=window.location.search){let r=e(n),i={};for(let e of Object.keys(t))i[e]=t[e](r[e]);return i}function r(e){return t=>t??e}var i=[[1e3,`M`],[900,`CM`],[500,`D`],[400,`CD`],[100,`C`],[90,`XC`],[50,`L`],[40,`XL`],[10,`X`],[9,`IX`],[5,`V`],[4,`IV`],[1,`I`]],a={I:1,V:5,X:10,L:50,C:100,D:500,M:1e3};function o(e){if(!Number.isInteger(e)||e<1||e>3999)return null;let t=e,n=``;for(let[e,r]of i)for(;t>=e;)n+=r,t-=e;return n}function s(e){let t=e.toUpperCase().trim();if(!t||!/^[IVXLCDM]+$/.test(t))return null;let n=0;for(let e=0;e<t.length;e+=1){let r=a[t[e]],i=a[t[e+1]];n+=i&&r<i?-r:r}return o(n)===t?n:null}var c=n({v:r(`2026`)}).v,l=document.querySelector(`#app`);function u(){let e=c.trim();if(!e)return{output:`—`,note:`Enter a number or a numeral`,valid:!0};if(/^\d+$/.test(e)){let t=o(Number(e));return t?{output:t,note:`${Number(e).toLocaleString()} in Roman numerals`,valid:!0}:{output:`—`,note:`Roman numerals cover 1 to 3999`,valid:!1}}let t=s(e);return t?{output:t.toLocaleString(),note:`${e.toUpperCase()} as a decimal number`,valid:!0}:{output:`—`,note:`“${e}” is not a valid Roman numeral`,valid:!1}}function d(){let{output:e,note:n,valid:r}=u();l.innerHTML=`
    <main class="bg-top-light min-h-dvh px-4 py-10 sm:py-16">
      <div class="mx-auto w-full max-w-md">
        <header class="mb-8">
          <h1 class="text-3xl font-semibold tracking-tight">Roman Numeral Converter</h1>
          <p class="text-muted-foreground mt-1 text-sm">
            Type a number or a numeral — it converts whichever way makes sense.
          </p>
        </header>

        <div class="bg-card rounded-xl border p-5 shadow-sm sm:p-6">
          <label for="value" class="mb-1.5 block text-sm font-medium">Number or numeral</label>
          <input
            id="value" value="${c.replace(/"/g,`&quot;`)}" spellcheck="false" autocomplete="off"
            class="bg-background focus:ring-ring w-full rounded-md border px-3 py-2 text-lg uppercase outline-none focus:ring-2 ${r?``:`border-destructive`}"
          />

          <p class="mt-5 break-all text-center text-4xl font-semibold tracking-wide">${e}</p>
          <p class="text-muted-foreground mt-2 text-center text-sm">${n}</p>
        </div>
      </div>
    </main>
  `;let i=l.querySelector(`#value`);i.addEventListener(`input`,()=>{c=i.value,t({v:c});let e=u();l.querySelector(`p.text-4xl`).textContent=e.output,l.querySelector(`p.text-sm.text-center, p.text-center.text-sm`).textContent=e.note,i.classList.toggle(`border-destructive`,!e.valid)})}t({v:c}),d();