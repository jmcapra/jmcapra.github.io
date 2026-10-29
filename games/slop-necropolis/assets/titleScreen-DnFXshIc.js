import{a as e}from"./math.vector-DL9SqqAO.js";import{n as t,t as n}from"./math.color-G5PZYCO5.js";import{t as r}from"./scene-BHSVY2hP.js";import{V as i,t as a}from"./index-C5mS4eAm.js";import{o}from"./boxBuilder-BJ7aRdOk.js";import{t as s}from"./skybox-DaGloj43.js";var c=[`PLAY`,`MAP EDITOR`,`SETTINGS`,`CREDITS`],l=`SLOP NECROPOLIS

Developed for Slop Jam May 2026

Babylon.js · TypeScript · Vite

Thanks for playing!`;async function u(u,d){let f=new r(u);f.clearColor=new t(.04,.01,.12,1);let p=new i(`title-cam`,new e(0,1.6,0),f);p.setTarget(new e(0,1.6,1)),p.inputs.clear();let m=new o(`title-hemi`,new e(0,1,0),f);m.intensity=.4,m.diffuse=new n(.7,.55,.85),m.groundColor=new n(.15,.05,.18),f.fogMode=r.FOGMODE_LINEAR,f.fogStart=72,f.fogEnd=1400,f.fogColor=new n(.06,.02,.11),s(f),u.runRenderLoop(()=>f.render());let h=document.createElement(`div`);h.id=`title-screen`,h.style.cssText=`
        position: absolute;
        inset: 0;
        background: rgba(4, 1, 18, 0.82);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 100;
        font-family: "Courier New", Courier, monospace;
        user-select: none;
        gap: 0;
    `,h.innerHTML=`
        <h1 id="ts-title" style="
            font-size: clamp(2rem, 6vw, 4.5rem);
            font-weight: 900;
            letter-spacing: 0.18em;
            margin: 0 0 0.15em 0;
            background: linear-gradient(90deg, #ff00cc 0%, #00f5ff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: none;
            filter: drop-shadow(0 0 18px rgba(255, 0, 204, 0.7));
        ">SLOP NECROPOLIS</h1>
        <p id="ts-subtitle" style="
            font-size: 0.75rem;
            color: #00f5ff;
            letter-spacing: 0.38em;
            margin: 0 0 3em 0;
            text-shadow: 0 0 8px #00f5ff;
            opacity: 0.8;
        ">A VAPORWAVE HORROR SHOOTER</p>
        <nav id="ts-menu" style="
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.6em;
            list-style: none;
            padding: 0;
            margin: 0;
        ">
            ${c.map((e,t)=>`
            <button
                class="ts-menu-item"
                data-index="${t}"
                style="
                    font-family: 'Courier New', Courier, monospace;
                    font-size: 1.1rem;
                    font-weight: bold;
                    letter-spacing: 0.2em;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    padding: 0.35em 1.2em;
                    color: #e8e0ff;
                    border-left: 3px solid transparent;
                    transition: color 80ms, border-color 80ms, text-shadow 80ms;
                    outline: none;
                "
            >${e}</button>`).join(``)}
        </nav>
        <div id="ts-hint" style="
            margin-top: 3em;
            font-size: 0.65rem;
            color: rgba(232, 224, 255, 0.38);
            letter-spacing: 0.14em;
        ">ARROW KEYS / WASD &middot; ENTER / SPACE TO SELECT</div>
        <div id="ts-credits-overlay" style="
            display: none;
            position: absolute;
            inset: 0;
            background: rgba(4, 1, 18, 0.94);
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 10;
        ">
            <pre style="
                color: #e8e0ff;
                font-family: 'Courier New', Courier, monospace;
                font-size: 1rem;
                letter-spacing: 0.1em;
                line-height: 2;
                text-align: center;
                white-space: pre-wrap;
            ">${l}</pre>
            <button id="ts-credits-close" style="
                margin-top: 2em;
                font-family: 'Courier New', Courier, monospace;
                font-size: 0.9rem;
                font-weight: bold;
                letter-spacing: 0.18em;
                background: transparent;
                color: #ff00cc;
                border: 2px solid #ff00cc;
                border-radius: 6px;
                padding: 0.5em 2em;
                cursor: pointer;
                text-shadow: 0 0 8px #ff00cc;
                box-shadow: 0 0 14px rgba(255, 0, 204, 0.5);
            ">BACK</button>
        </div>
    `,document.body.appendChild(h);let g=Array.from(h.querySelectorAll(`.ts-menu-item`)),_=h.querySelector(`#ts-credits-overlay`),v=h.querySelector(`#ts-credits-close`),y=0,b=!1;function x(){g.forEach((e,t)=>{let n=t===y;e.style.color=n?`#ff00cc`:`#e8e0ff`,e.style.borderLeftColor=n?`#ff00cc`:`transparent`,e.style.textShadow=n?`0 0 10px #ff00cc, 0 0 20px rgba(255,0,204,0.4)`:`none`})}function S(e){let t=h.querySelector(`.ts-toast`);t&&t.remove();let n=document.createElement(`div`);n.className=`ts-toast`,n.textContent=e,n.style.cssText=`
            position: absolute;
            bottom: 8em;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(4,1,18,0.92);
            border: 1px solid #ff00cc;
            color: #e8e0ff;
            font-family: 'Courier New', Courier, monospace;
            font-size: 0.8rem;
            letter-spacing: 0.1em;
            padding: 0.6em 1.8em;
            border-radius: 4px;
            pointer-events: none;
        `,h.appendChild(n),setTimeout(()=>n.remove(),2500)}function C(e){if(b)return;let t=c[e];t===`PLAY`?(b=!0,a(`game`,u,d)):t===`MAP EDITOR`?(b=!0,a(`editor`,u,d)):t===`SETTINGS`?S(`Settings — Coming Soon!`):t===`CREDITS`&&(_.style.display=`flex`)}x();let w=new AbortController,{signal:T}=w;return window.addEventListener(`keydown`,e=>{if(_.style.display!==`none`){(e.code===`Escape`||e.code===`Space`||e.code===`Enter`)&&(e.preventDefault(),_.style.display=`none`);return}e.code===`ArrowUp`||e.code===`KeyW`?(e.preventDefault(),y=(y-1+c.length)%c.length,x()):e.code===`ArrowDown`||e.code===`KeyS`?(e.preventDefault(),y=(y+1)%c.length,x()):(e.code===`Enter`||e.code===`Space`)&&(e.preventDefault(),C(y))},{signal:T}),g.forEach((e,t)=>{e.addEventListener(`mouseenter`,()=>{y=t,x()},{signal:T}),e.addEventListener(`click`,()=>{y=t,x(),C(t)},{signal:T})}),v.addEventListener(`click`,()=>{_.style.display=`none`},{signal:T}),{dispose(){w.abort(),u.stopRenderLoop(),f.dispose(),h.remove()}}}export{u as mountTitleScreen};