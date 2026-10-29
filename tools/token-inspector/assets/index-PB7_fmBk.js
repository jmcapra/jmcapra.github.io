(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={iss:`Issuer — who minted this token`,sub:`Subject — who the token is about`,aud:`Audience — who is meant to accept it`,exp:`Expires at`,nbf:`Not valid before`,iat:`Issued at`,jti:`Token ID, for replay detection`,alg:`Signing algorithm`,typ:`Token type`,kid:`Key ID — which key signed it`,scope:`Granted scopes`,azp:`Authorised party — the client it was issued to`},t=new Set([`exp`,`nbf`,`iat`,`auth_time`,`updated_at`]);function n(e){let t=e.replace(/-/g,`+`).replace(/_/g,`/`),n=t.padEnd(t.length+(4-t.length%4)%4,`=`),r=atob(n),i=Uint8Array.from(r,e=>e.charCodeAt(0));return new TextDecoder(`utf-8`,{fatal:!0}).decode(i)}function r(e){let t=e.trim().replace(/^bearer\s+/i,``);if(t===``)return{ok:!1,error:`Paste a token to decode it.`};let r=t.split(`.`);if(r.length!==3)return{ok:!1,error:r.length===5?`This has five segments, so it is a JWE — an encrypted token. There are no claims to read without the decryption key.`:`A JWT has three dot-separated segments. This has ${r.length}.`};let i,a;try{i=JSON.parse(n(r[0]))}catch{return{ok:!1,error:`The header is not valid base64url-encoded JSON.`}}try{a=JSON.parse(n(r[1]))}catch{return{ok:!1,error:`The payload is not valid base64url-encoded JSON.`}}return typeof a!=`object`||!a||Array.isArray(a)?{ok:!1,error:`The payload decoded, but it is not a JSON object.`}:{ok:!0,jwt:{header:i,payload:a,signature:r[2],signedPart:`${r[0]}.${r[1]}`}}}function i(n){return Object.entries(n).map(([n,r])=>{let i={key:n,value:r};return e[n]&&(i.meaning=e[n]),t.has(n)&&typeof r==`number`&&Number.isFinite(r)&&(i.instant=new Date(r*1e3)),i})}function a(e,t=new Date){let n=typeof e.exp==`number`?new Date(e.exp*1e3):null,r=typeof e.nbf==`number`?new Date(e.nbf*1e3):null;return n&&t>=n?{state:`expired`,expiresAt:n}:r&&t<r?{state:`not-yet`,notBefore:r}:!n&&!r?{state:`unknown`}:{state:`valid`,expiresAt:n,notBefore:r}}async function o(e,t){let n=new TextEncoder,r=await crypto.subtle.importKey(`raw`,n.encode(t),{name:`HMAC`,hash:`SHA-256`},!1,[`sign`]),i=await crypto.subtle.sign(`HMAC`,r,n.encode(e.signedPart));return btoa(String.fromCharCode(...new Uint8Array(i))).replace(/\+/g,`-`).replace(/\//g,`_`).replace(/=+$/,``)===e.signature}var s=[`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImRlbW8tMjAyNCJ9`,`eyJpc3MiOiJodHRwczovL2F1dGguZXhhbXBsZS5jb20iLCJzdWIiOiJ1c2VyXzQ5MjEiLCJhdWQiOiJhcGkuZXhhbXBsZS5jb20iLCJuYW1lIjoiSm9zw6kgTcO8bGxlciIsInJvbGVzIjpbImVkaXRvciIsImJpbGxpbmciXSwiaWF0IjoxNzE5ODM5NDAwLCJleHAiOjE3MTk4NDMwMDB9`,`vZ-7CE66QokeBIufeF50q0P-eAXNuOU_n35jC9BSuNk`].join(`.`),c=`demo-secret`,l=``,u=``,d=`untested`,f=document.querySelector(`#app`);function p(e){return e.replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]??e)}function m(e,t){let n=Math.round((e.getTime()-t.getTime())/1e3),r=[[`year`,31536e3],[`month`,2592e3],[`day`,86400],[`hour`,3600],[`minute`,60]],i=new Intl.RelativeTimeFormat(void 0,{numeric:`auto`});for(let[e,t]of r)if(Math.abs(n)>=t)return i.format(Math.round(n/t),e);return i.format(n,`second`)}function h(e){return new Intl.DateTimeFormat(void 0,{dateStyle:`medium`,timeStyle:`short`}).format(e)}function g(e,t){return e.instant?`
      <span class="font-medium">${p(h(e.instant))}</span>
      <span class="text-muted-foreground"> · ${p(m(e.instant,t))}</span>`:typeof e.value==`string`?p(e.value):`<span class="font-mono text-[13px]">${p(JSON.stringify(e.value))}</span>`}function _(e,t){return e.length===0?`<p class="text-muted-foreground text-sm">No claims.</p>`:`
    <dl class="divide-y">
      ${e.map(e=>`
        <div class="grid grid-cols-[minmax(5rem,9rem)_1fr] gap-3 py-2.5">
          <dt>
            <span class="font-mono text-sm font-semibold">${p(e.key)}</span>
            ${e.meaning?`<span class="text-muted-foreground block text-xs">${p(e.meaning)}</span>`:``}
          </dt>
          <dd class="text-[15px] break-words">${g(e,t)}</dd>
        </div>`).join(``)}
    </dl>`}function v(e,t){let n=(e,t)=>`<div class="rounded-lg border-l-4 px-4 py-3 text-[15px] font-medium ${e}">${t}</div>`;switch(e.state){case`expired`:return n(`border-destructive bg-destructive/10 text-destructive`,`Expired ${p(m(e.expiresAt,t))}, at ${p(h(e.expiresAt))}.`);case`not-yet`:return n(`border-pastel-butter-fg bg-pastel-butter text-pastel-butter-fg`,`Not valid yet — starts ${p(m(e.notBefore,t))}, at ${p(h(e.notBefore))}.`);case`valid`:return n(`border-success bg-success/10`,e.expiresAt?`In date — expires ${p(m(e.expiresAt,t))}, at ${p(h(e.expiresAt))}.`:`In date, and carries no expiry at all.`);default:return n(`border-muted-foreground/40 bg-secondary/60`,`No exp or nbf claim, so this token never expires on its own.`)}}function y(e){let t=String(e.header.alg??``),n=t.toUpperCase()===`HS256`,r={untested:``,match:`<span class="text-success font-medium">Signature matches.</span>`,mismatch:`<span class="text-destructive font-medium">Signature does not match this secret.</span>`,unsupported:``}[d];return n?`
    <div class="flex flex-wrap items-center gap-2">
      <label for="secret" class="sr-only">Shared secret</label>
      <input
        id="secret"
        type="password"
        autocomplete="off"
        placeholder="Shared secret"
        value="${p(u)}"
        class="bg-background focus:ring-primary/40 min-w-0 flex-1 rounded-md border px-3 py-2 font-mono text-sm focus:ring-2 focus:outline-none"
      />
      <button
        type="button"
        id="verify"
        class="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-medium transition hover:opacity-90"
      >Check signature</button>
    </div>
    ${r?`<p class="mt-3 text-sm">${r}</p>`:``}`:`
      <p class="text-muted-foreground text-sm">
        <strong>${p(t||`This token`)}</strong> is signed with a private key. Checking it
        needs the issuer's public key, published at their JWKS endpoint.
      </p>`}function b(){let e=new Date,t=r(l),n=t.ok?`
      <div class="mt-5">${v(a(t.jwt.payload,e),e)}</div>

      <section class="bg-card mt-5 rounded-xl border p-5 shadow-sm sm:p-6">
        <h2 class="mb-3 text-lg font-semibold">Payload</h2>
        ${_(i(t.jwt.payload),e)}
      </section>

      <section class="bg-card mt-5 rounded-xl border p-5 shadow-sm sm:p-6">
        <h2 class="mb-3 text-lg font-semibold">Header</h2>
        ${_(i(t.jwt.header),e)}
      </section>

      <section class="bg-card mt-5 rounded-xl border p-5 shadow-sm sm:p-6">
        <h2 class="mb-3 text-lg font-semibold">Signature</h2>
        ${y(t.jwt)}
      </section>`:l.trim()===``?``:`<div class="bg-card rounded-xl border p-5 shadow-sm sm:p-6">
           <p class="text-destructive text-[15px] font-medium">${p(t.error)}</p>
         </div>`;f.innerHTML=`
    <main class="bg-top-light page-pad min-h-dvh">
      <div class="mx-auto w-full max-w-3xl">
        <header class="standalone-only mb-8">
          <h1 class="text-3xl font-semibold tracking-tight">Token Inspector</h1>
        </header>

        <div class="bg-card rounded-xl border p-5 shadow-sm sm:p-6">
          <label for="token" class="sr-only">JWT</label>
          <textarea
            id="token"
            rows="5"
            spellcheck="false"
            autocapitalize="off"
            autocomplete="off"
            placeholder="Paste a JWT"
            class="bg-background focus:ring-primary/40 w-full resize-y rounded-lg border px-3 py-2.5 font-mono text-[13px] break-all focus:ring-2 focus:outline-none"
          >${p(l)}</textarea>

          <div class="mt-3 flex flex-wrap gap-2">
            <button type="button" id="sample" class="bg-secondary text-secondary-foreground hover:bg-accent rounded-md px-3 py-1.5 text-sm font-medium transition">Load a sample</button>
            <button type="button" id="clear" class="bg-secondary text-secondary-foreground hover:bg-accent rounded-md px-3 py-1.5 text-sm font-medium transition">Clear</button>
          </div>
        </div>

        ${n}
      </div>
    </main>`,x()}function x(){let e=f.querySelector(`#token`);e.addEventListener(`input`,()=>{l=e.value,d=`untested`;let t=e.selectionStart;b();let n=f.querySelector(`#token`);n.focus(),n.setSelectionRange(t,t)}),f.querySelector(`#sample`).addEventListener(`click`,()=>{l=s,u=c,d=`untested`,b()}),f.querySelector(`#clear`).addEventListener(`click`,()=>{l=``,u=``,d=`untested`,b(),f.querySelector(`#token`).focus()});let t=f.querySelector(`#secret`);t?.addEventListener(`input`,()=>{u=t.value}),f.querySelector(`#verify`)?.addEventListener(`click`,async()=>{let e=r(l);e.ok&&(d=await o(e.jwt,u)?`match`:`mismatch`,b(),f.querySelector(`#secret`)?.focus())})}b(),window.setInterval(()=>{let e=document.activeElement?.id;e!==`token`&&e!==`secret`&&l.trim()!==``&&b()},1e3);