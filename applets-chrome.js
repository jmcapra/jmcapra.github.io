(()=>{var g=document.getElementById("applets-chrome-script"),m=g?.dataset.base??"/",u=`
  :host {
    /* color-scheme is inherited, so it crosses the shadow boundary: whatever
       the page resolved to (OS preference, or a .light/.dark pin from the
       shared theme) resolves these pairs too. No observer, no duplication, and
       the nav can never disagree with the page it sits on. */
    --nav-bg: light-dark(#ffffff, #242220);
    --nav-fg: light-dark(#2b2620, #f3efe6);
    --nav-muted: light-dark(#7a7268, #a79e8f);
    --nav-border: light-dark(#e7e0d2, #3a362f);
    --nav-hover: light-dark(#f1ece2, #2f2c27);
    --nav-accent: #c9a86a;

    position: fixed;
    bottom: 1rem;
    left: 1rem;
    z-index: 2147483000;
    font: 500 14px/1.4 ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
    color: var(--nav-fg);

    /* A row of pills. Both popovers are position:absolute against this box, so
       they anchor to the bar's left edge and stay on screen on a phone. */
    display: flex;
    align-items: center;
    gap: .4rem;
  }

  * { box-sizing: border-box; }

  button, a {
    font: inherit;
    color: inherit;
    cursor: pointer;
  }

  .trigger {
    display: flex;
    align-items: center;
    gap: .5rem;
    padding: .5rem .8rem;
    border: 1px solid var(--nav-border);
    border-radius: 999px;
    background: var(--nav-bg);
    box-shadow: 0 2px 10px rgb(0 0 0 / .08), 0 1px 2px rgb(0 0 0 / .04);
    opacity: .75;
    transition: opacity .15s ease, transform .15s ease, box-shadow .15s ease;
  }
  .trigger:hover, .trigger:focus-visible, .trigger[aria-expanded="true"] {
    opacity: 1;
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgb(0 0 0 / .12), 0 1px 2px rgb(0 0 0 / .05);
    outline: none;
  }
  .trigger:focus-visible { box-shadow: 0 0 0 3px color-mix(in srgb, var(--nav-accent) 45%, transparent); }

  .grid { width: 14px; height: 14px; flex: none; }
  .label { font-weight: 600; letter-spacing: .01em; }

  .panel {
    position: absolute;
    bottom: calc(100% + .5rem);
    left: 0;
    width: min(19rem, calc(100vw - 2rem));
    max-height: min(26rem, calc(100vh - 5rem));
    overflow-y: auto;
    padding: .4rem;
    border: 1px solid var(--nav-border);
    border-radius: .9rem;
    background: var(--nav-bg);
    box-shadow: 0 12px 40px rgb(0 0 0 / .16), 0 2px 6px rgb(0 0 0 / .06);
    transform-origin: bottom left;
    animation: pop .13s ease-out;
  }
  @keyframes pop {
    from { opacity: 0; transform: scale(.96) translateY(4px); }
    to   { opacity: 1; transform: none; }
  }
  @media (prefers-reduced-motion: reduce) {
    .panel { animation: none; }
    .trigger { transition: none; }
  }

  .home {
    display: flex;
    align-items: center;
    gap: .5rem;
    padding: .5rem .6rem;
    margin-bottom: .25rem;
    border-radius: .6rem;
    text-decoration: none;
    font-weight: 600;
  }
  .home:hover, .home:focus-visible { background: var(--nav-hover); outline: none; }

  .sep { height: 1px; margin: .25rem .3rem .35rem; background: var(--nav-border); }

  .group { font-size: 10px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;
           color: var(--nav-muted); padding: .5rem .6rem .25rem; }

  .item {
    display: flex;
    align-items: center;
    gap: .55rem;
    padding: .45rem .6rem;
    border-radius: .6rem;
    text-decoration: none;
  }
  .item:hover, .item:focus-visible { background: var(--nav-hover); outline: none; }
  .item[aria-current="page"] { background: var(--nav-hover); }
  .item[aria-current="page"] .name::after {
    content: "";
    display: inline-block;
    width: 5px; height: 5px;
    margin-left: .4rem;
    border-radius: 50%;
    background: var(--nav-accent);
    vertical-align: middle;
  }
  .emoji { width: 1.2rem; text-align: center; flex: none; font-size: 15px; }
  .name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .tag { font-size: 10px; color: var(--nav-muted); text-transform: uppercase; letter-spacing: .08em; }

  .empty { padding: .75rem .6rem; color: var(--nav-muted); }

  .theme { display: flex; gap: .25rem; padding: .1rem .6rem .35rem; }
  .theme button {
    flex: 1;
    padding: .35rem .2rem;
    border: 1px solid var(--nav-border);
    border-radius: .5rem;
    background: transparent;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: .04em;
  }
  .theme button:hover, .theme button:focus-visible { background: var(--nav-hover); outline: none; }
  .theme button[aria-pressed="true"] {
    background: var(--nav-hover);
    border-color: var(--nav-accent);
  }
  .pinned { padding: .1rem .6rem .5rem; font-size: 11px; color: var(--nav-muted); }
`,v=`<svg class="grid" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
  <rect x="1" y="1" width="5" height="5" rx="1.4"/><rect x="10" y="1" width="5" height="5" rx="1.4"/>
  <rect x="1" y="10" width="5" height="5" rx="1.4"/><rect x="10" y="10" width="5" height="5" rx="1.4"/>
</svg>`,f=`<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor"
  stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M9.5 3.5 5 8l4.5 4.5"/>
</svg>`,s="applets:theme";function b(){try{let t=localStorage.getItem(s);return t==="light"||t==="dark"?t:"system"}catch{return"system"}}function x(t){try{t==="system"?localStorage.removeItem(s):localStorage.setItem(s,t)}catch{}let e=document.documentElement;e.classList.remove("light","dark"),t!=="system"&&e.classList.add(t)}function y(){let t=document.documentElement.classList;return t.contains("dark")?"dark":t.contains("light")?"light":window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function o(t){return t.replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}var l=class extends HTMLElement{root=this.attachShadow({mode:"open"});open=!1;manifest=null;connectedCallback(){let e=document.createElement("style");e.textContent=u,this.root.append(e),this.renderTrigger(),document.addEventListener("click",this.onDocumentClick),document.addEventListener("keydown",this.onKeyDown)}disconnectedCallback(){document.removeEventListener("click",this.onDocumentClick),document.removeEventListener("keydown",this.onKeyDown)}onDocumentClick=e=>{e.composedPath().includes(this)||this.open&&this.close()};onKeyDown=e=>{e.key==="Escape"&&this.open&&(this.close(),this.trigger?.focus())};get trigger(){return this.root.querySelector(".trigger")}renderTrigger(){let e=document.createElement("button");e.className="trigger",e.type="button",e.setAttribute("aria-expanded","false"),e.setAttribute("aria-haspopup","true"),e.setAttribute("aria-label","Browse applets"),e.innerHTML=`${v}<span class="label">Applets</span>`,e.addEventListener("click",()=>this.open?this.close():this.show()),this.root.append(e)}async show(){if(this.open=!0,this.trigger?.setAttribute("aria-expanded","true"),!this.manifest)try{let e=await fetch(`${m}manifest.json`);e.ok&&(this.manifest=await e.json())}catch{}this.renderPanel()}close(){this.open=!1,this.trigger?.setAttribute("aria-expanded","false"),this.root.querySelector(".panel")?.remove()}renderPanel(){this.root.querySelector(".panel")?.remove();let e=document.createElement("div");e.className="panel",e.setAttribute("role","menu");let a=window.location.pathname.replace(/\/+$/,"/"),h=this.manifest?.site.title??"Applets",r=`<a class="home" href="${m}" role="menuitem">${f}<span>All of ${o(h)}</span></a>`,c=(this.manifest?.applets??[]).filter(n=>n.status==="live");if(c.length===0)r+=`<div class="empty">Couldn't load the applet list.</div>`;else{r+='<div class="sep"></div>';for(let n of this.manifest.categories){let d=c.filter(i=>i.category===n.id);if(d.length!==0){r+=`<div class="group">${o(n.title)}</div>`;for(let i of d){let p=i.url.replace(/\/+$/,"/")===a;r+=`<a class="item" href="${i.url}" role="menuitem"${p?' aria-current="page"':""}><span class="emoji" aria-hidden="true">${o(i.icon??"\u25AA")}</span><span class="name">${o(i.title)}</span>${p?'<span class="tag">here</span>':""}</a>`}}}}r+='<div class="sep"></div>',r+=this.themeSectionHtml(),e.innerHTML=r,this.root.append(e);for(let n of e.querySelectorAll(".theme button"))n.addEventListener("click",()=>{x(n.dataset.theme),this.renderPanel()});e.querySelector("a")?.focus()}themeSectionHtml(){if(document.documentElement.dataset.appletsThemePinned!==void 0)return`<div class="pinned">This applet is always ${y()} \u2014 it has one art direction.</div>`;let e=b();return'<div class="theme" role="group" aria-label="Colour theme">'+["system","light","dark"].map(a=>`<button type="button" data-theme="${a}" aria-pressed="${a===e}">${a[0].toUpperCase()}${a.slice(1)}</button>`).join("")+"</div>"}};function w(){try{return window.self!==window.top}catch{return!0}}!w()&&!customElements.get("applets-nav")&&customElements.define("applets-nav",l);})();
