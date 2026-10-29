import{n as e}from"./store-Dh34A1qb.js";var t=document.querySelector(`#gadget`);t.innerHTML=`
  <div class="g">
    <div class="top"><span>Turn <b id="turn">1</b></span><span id="threat"></span></div>
    <div class="life"><output id="life">40</output><span>your life</span></div>
    <div class="row">
      <button type="button" id="end" class="end">End turn</button>
      <a href="../" target="_top">Open</a>
    </div>
  </div>
`;var n=t.querySelector(`#turn`),r=t.querySelector(`#threat`),i=t.querySelector(`#life`),a=t.querySelector(`#end`);function o(){let t=e.getState();n.textContent=String(t.turn),i.textContent=String(t.playerLife),i.classList.toggle(`low`,t.playerLife<=10),r.textContent=t.isRolling?`rolling`:t.lastHazard?.label??``,a.disabled=t.isRolling,a.textContent=t.isRolling?`…`:`End turn`}a.addEventListener(`click`,()=>e.getState().advanceTurn()),e.subscribe(o),o();