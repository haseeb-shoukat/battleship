(()=>{"use strict";const e=function(e){return{info:e,coords:e.coords,hit:[],processHit:function(e){this.hit.push(e)},isSunk:function(){return this.hit.length===this.coords.length},contains:function(e,t){return this[t].some((t=>JSON.stringify(t)===JSON.stringify(e)))}}};class t{constructor(t="player"){this.myBoard=function(){let t=[],o=[];for(let e=0;e<10;e++)for(let n=0;n<10;n++)t.push([e,n]),o.push([e,n]);return{ships:[],missed:[],types:[{type:"Carrier",len:5},{type:"Battleship",len:4},{type:"Destroyer",len:3},{type:"Submarine",len:3},{type:"Patrol Boat",len:2}],legalPlacements:o,legalMoves:t,automaticShips:function(){this.types.forEach((t=>{const o=["x","y"][Math.floor(2*Math.random())];let n=[];for(;!this.canPlaceShip(n);){n=[];let[e,r]=this.legalPlacements[Math.floor(Math.random()*this.legalPlacements.length)];if("x"===o)for(let o=r;o<r+t.len;o++)n.push([e,o]);else for(let o=e;o<e+t.len;o++)n.push([o,r])}let r={coords:n,axis:o};this.ships.push(e(r)),this.updateLegalPlacements(r)}))},placeShip:function(t){this.ships.push(e(t)),this.updateLegalPlacements(t)},canPlaceShip:function(e){return!(e.length<2)&&e.every((e=>this.legalPlacements.some((t=>JSON.stringify(e)===JSON.stringify(t)))))},updateLegalPlacements:function(e){let t=JSON.parse(JSON.stringify(e.coords)),[o,n]=e.coords[0],[r,a]=e.coords[e.coords.length-1];"y"===e.axis?(t.push([o-1,n],[r+1,a]),t.forEach((([e,o])=>{t.push([e,o-1],[e,o+1])})),e.coords.forEach((([e,o])=>{t.push([e,o-1],[e,o+1])}))):(t.push([o,n-1],[r,a+1]),t.forEach((([e,o])=>{t.push([e-1,o],[e+1,o])})),e.coords.forEach((([e,o])=>{t.push([e-1,o],[e+1,o])})));let i=this.legalPlacements.filter((e=>t.every((t=>JSON.stringify(e)!==JSON.stringify(t)))));this.legalPlacements=i},receiveAttack:function(e,t){let o=!1;return this.ships.every((n=>!n.contains([e,t],"coords")||(n.processHit([e,t]),o=!0,!1))),!1===o&&this.missed.push([e,t]),this.updateLegal(e,t),o},allSunk:function(){return this.ships.every((e=>e.isSunk()))},updateLegal:function(e,t){let o=this.legalMoves.filter((o=>JSON.stringify(o)!==JSON.stringify([e,t])));this.legalMoves=o},isIllegal:function(e,t){return this.legalMoves.every((o=>JSON.stringify(o)!==JSON.stringify([e,t])))}}}(),this.enemy,this.id=t,this.currentTurn=!1}setEnemy(e){this.enemy=e}setCurrent(e){this.currentTurn=e}attack(e,t){return this.enemy.receive(e,t)}compShips(){"comp"===this.id&&this.myBoard.automaticShips()}compAttack(){if("comp"!==this.id)return;let e=this.enemy.myBoard.legalMoves,[t,o]=e[Math.floor(Math.random()*e.length)];return this.enemy.receive(t,o)}receive(e,t){if(this.myBoard.isIllegal(e,t))return"Illegal Move";!0!==this.myBoard.receiveAttack(e,t)&&(this.currentTurn=!0,this.enemy.setCurrent(!1))}}const o=function(){const e=function(e,n){!function(e){placingBoard.innerHTML="";for(let e=0;e<10;e++)for(let t=0;t<10;t++){const o=document.createElement("div");o.classList.add("board-item","invalid-placement"),o.dataset.coord=[t,e].join(""),placingBoard.appendChild(o)}e.myBoard.legalPlacements.forEach((([e,t])=>{document.querySelector(`.placing-board > [data-coord="${e}${t}"`).classList.remove("invalid-placement")})),e.myBoard.ships.forEach((e=>{e.coords.forEach((([e,t])=>{const o=document.querySelector(`.placing-board > [data-coord="${e}${t}"`);o.classList.remove("invalid-placement"),o.classList.add("ship")}))}))}(e);const a=document.querySelectorAll(".placing-board > .board-item"),i=document.querySelector(".card-text"),s=e.myBoard.types[n];i.textContent=`Place your ${s.type}`,a.forEach((a=>{a.addEventListener("mouseover",t.bind(null,a,s,e)),a.addEventListener("mouseout",o),a.addEventListener("click",r.bind(null,e,s,n))}))},t=function(e,t,o){const[n,r]=e.dataset.coord.split("").map(Number);let a=[];if("y"===axis)for(let e=n;e<n+t.len;e++)a.push([e,r]);else for(let e=r;e<r+t.len;e++)a.push([n,e]);if(o.myBoard.canPlaceShip(a))a.forEach((([e,t])=>{document.querySelector(`.placing-board > [data-coord="${[e,t].join("")}"]`).classList.add("hover")})),freshCoords=a;else{let[e,t]=a[0];document.querySelector(`.placing-board > [data-coord="${[e,t].join("")}"]`).classList.add("invalid-hover"),freshCoords=[]}},o=function(e){document.querySelectorAll(".hover").forEach((e=>e.classList.remove("hover"))),document.querySelectorAll(".invalid-hover").forEach((e=>e.classList.remove("invalid-hover")))},r=function(t,o,r){t.myBoard.canPlaceShip(freshCoords)&&(t.myBoard.placeShip({coords:freshCoords,axis}),"Patrol Boat"===o.type?(document.querySelector(".overlay").remove(),n.gameLoop()):e(t,r+1))},a=function(e){let t;"player"===e.id?(t="one",e.myBoard.ships.forEach((e=>{e.coords.forEach((e=>{document.querySelector(`.board-${t} > [data-coord="${e.join("")}"]`).classList.add("ship")}))}))):t="two",e.myBoard.missed.forEach((e=>{document.querySelector(`.board-${t} > [data-coord="${e.join("")}"]`).classList.add("missed")})),e.myBoard.ships.forEach((e=>{e.hit.forEach((e=>{document.querySelector(`.board-${t} > [data-coord="${e.join("")}"]`).classList.add("hit")}))}))},i=function(){document.body.innerHTML="",n.initialize()};return{render:function(e,t){a(e),a(t)},renderPlacingBoard:function(t){!function(){document.body.innerHTML='<div class="main-title">Battleship</div>\n    <div class="board">\n        <div class="board-one"></div>\n    </div>\n    <div class="board">\n        <div class="board-two"></div>\n    </div>\n    <div class="overlay">\n        <div class="card">\n            <div class="card-heading">Welcome to Battleship!</div>\n            <div class="card-text"></div>\n            <button class="rotate-btn">Rotate</button>\n            <div class="placing-board"></div>\n        </div>\n    </div>',window.boardOne=document.querySelector(".board-one"),window.boardTwo=document.querySelector(".board-two"),window.placingBoard=document.querySelector(".placing-board"),window.rotateBtn=document.querySelector(".rotate-btn"),window.freshCoords=[],window.axis="x",rotateBtn.addEventListener("click",(e=>{"y"===axis?axis="x":axis="y"}));for(let e=0;e<10;e++)for(let t=0;t<10;t++){const o=document.createElement("div");o.classList.add("board-item"),o.dataset.coord=[t,e].join(""),boardOne.appendChild(o),boardTwo.appendChild(o.cloneNode())}}(),e(t,0)},endGame:function(e){const t=document.createElement("div");t.classList.add("overlay"),t.innerHTML=`\n    <div class="overlay">\n        <div class="end-card">\n            <div class="card-heading">${e}</div>\n            <button class="restart-btn">Play Again</button>\n        </div>\n    </div>`,document.body.appendChild(t),document.querySelector(".restart-btn").addEventListener("click",i)}}}(),n=function(){let e,n;const r=function(){o.render(e,n),!0!==e.currentTurn?a():n.myBoard.legalMoves.forEach((e=>{document.querySelector(`.board-two > [data-coord="${e.join("")}"]`).addEventListener("click",a)}))},a=function(t="null"){if(!0===e.currentTurn){let[o,n]=t.target.dataset.coord.split("").map(Number);e.attack(o,n)}else n.compAttack();let a=i();a?o.endGame(a):r()},i=function(){let t;return t=e.myBoard.allSunk()?"Computer Wins! Better luck next time.":!!n.myBoard.allSunk()&&"Congratulations! You win.",t};return{initialize:function(){e=new t,n=new t("comp"),e.setEnemy(n),n.setEnemy(e),e.setCurrent(!0),n.compShips(),o.renderPlacingBoard(e)},gameLoop:r}}();n.initialize()})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQVcsSUFBSWhHLEVBQU8sUUFDdEJ5QyxFQUFPRCxTQUFTd0QsR0FDaEJBLEVBQVN4RCxTQUFTQyxHQUNsQkEsRUFBT0MsWUFBVyxHQUtsQnNELEVBQVNsRCxZQUNURSxFQUFXdUMsbUJBQW1COUMsRUFKaEMsRUFpREVxQyxXQUVILENBOURlLEdDRGhCRCxFQUFRTyxZIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL1NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL1BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvR2FtZUJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9yZW5kZXJHYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9ydW5HYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgU2hpcCA9IGZ1bmN0aW9uIChpbmZvKSB7XG4gIHJldHVybiB7XG4gICAgaW5mbyxcbiAgICBjb29yZHM6IGluZm8uY29vcmRzLFxuICAgIGhpdDogW10sXG4gICAgcHJvY2Vzc0hpdDogZnVuY3Rpb24gKGNvb3JkKSB7XG4gICAgICB0aGlzLmhpdC5wdXNoKGNvb3JkKTtcbiAgICB9LFxuICAgIGlzU3VuazogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGl0Lmxlbmd0aCA9PT0gdGhpcy5jb29yZHMubGVuZ3RoID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH0sXG4gICAgY29udGFpbnM6IGZ1bmN0aW9uIChjb29yZCwgb2JqKSB7XG4gICAgICByZXR1cm4gdGhpc1tvYmpdLnNvbWUoXG4gICAgICAgIChpdGVtKSA9PiBKU09OLnN0cmluZ2lmeShpdGVtKSA9PT0gSlNPTi5zdHJpbmdpZnkoY29vcmQpXG4gICAgICApO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgeyBTaGlwIH07XG4iLCJpbXBvcnQgeyBHYW1lQm9hcmQgfSBmcm9tIFwiLi9HYW1lQm9hcmRcIjtcblxuY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IoaWQgPSBcInBsYXllclwiKSB7XG4gICAgdGhpcy5teUJvYXJkID0gR2FtZUJvYXJkKCk7XG4gICAgdGhpcy5lbmVteTtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy5jdXJyZW50VHVybiA9IGZhbHNlO1xuICB9XG5cbiAgc2V0RW5lbXkocGxheWVyKSB7XG4gICAgdGhpcy5lbmVteSA9IHBsYXllcjtcbiAgfVxuXG4gIHNldEN1cnJlbnQodHVybikge1xuICAgIHRoaXMuY3VycmVudFR1cm4gPSB0dXJuO1xuICB9XG5cbiAgYXR0YWNrKHgsIHkpIHtcbiAgICByZXR1cm4gdGhpcy5lbmVteS5yZWNlaXZlKHgsIHkpO1xuICB9XG5cbiAgY29tcFNoaXBzKCkge1xuICAgIGlmICh0aGlzLmlkICE9PSBcImNvbXBcIikgcmV0dXJuO1xuICAgIHRoaXMubXlCb2FyZC5hdXRvbWF0aWNTaGlwcygpO1xuICB9XG5cbiAgY29tcEF0dGFjaygpIHtcbiAgICBpZiAodGhpcy5pZCAhPT0gXCJjb21wXCIpIHJldHVybjtcbiAgICBsZXQgbGVnYWxNb3ZlcyA9IHRoaXMuZW5lbXkubXlCb2FyZC5sZWdhbE1vdmVzO1xuICAgIGxldCBbeCwgeV0gPSBsZWdhbE1vdmVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxlZ2FsTW92ZXMubGVuZ3RoKV07XG4gICAgcmV0dXJuIHRoaXMuZW5lbXkucmVjZWl2ZSh4LCB5KTtcbiAgfVxuXG4gIHJlY2VpdmUoeCwgeSkge1xuICAgIGlmICh0aGlzLm15Qm9hcmQuaXNJbGxlZ2FsKHgsIHkpKSByZXR1cm4gXCJJbGxlZ2FsIE1vdmVcIjtcbiAgICBsZXQgaGl0ID0gdGhpcy5teUJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XG4gICAgaWYgKGhpdCAhPT0gdHJ1ZSkge1xuICAgICAgdGhpcy5jdXJyZW50VHVybiA9IHRydWU7XG4gICAgICB0aGlzLmVuZW15LnNldEN1cnJlbnQoZmFsc2UpO1xuICAgIH1cbiAgICByZXR1cm4gXG4gIH1cbn1cblxuZXhwb3J0IHsgUGxheWVyIH07XG4iLCJpbXBvcnQgeyBTaGlwIH0gZnJvbSBcIi4vU2hpcFwiO1xuXG5jb25zdCBHYW1lQm9hcmQgPSBmdW5jdGlvbiAoKSB7XG4gIGxldCBsZWdhbE1vdmVzID0gW107XG4gIGxldCBsZWdhbFBsYWNlbWVudHMgPSBbXTtcbiAgZm9yIChsZXQgeCA9IDA7IHggPCAxMDsgeCsrKSB7XG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCAxMDsgeSsrKSB7XG4gICAgICBsZWdhbE1vdmVzLnB1c2goW3gsIHldKTtcbiAgICAgIGxlZ2FsUGxhY2VtZW50cy5wdXNoKFt4LCB5XSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzaGlwczogW10sXG4gICAgbWlzc2VkOiBbXSxcbiAgICB0eXBlczogW1xuICAgICAgeyB0eXBlOiBcIkNhcnJpZXJcIiwgbGVuOiA1IH0sXG4gICAgICB7IHR5cGU6IFwiQmF0dGxlc2hpcFwiLCBsZW46IDQgfSxcbiAgICAgIHsgdHlwZTogXCJEZXN0cm95ZXJcIiwgbGVuOiAzIH0sXG4gICAgICB7IHR5cGU6IFwiU3VibWFyaW5lXCIsIGxlbjogMyB9LFxuICAgICAgeyB0eXBlOiBcIlBhdHJvbCBCb2F0XCIsIGxlbjogMiB9LFxuICAgIF0sXG4gICAgbGVnYWxQbGFjZW1lbnRzLFxuICAgIGxlZ2FsTW92ZXMsXG5cbiAgICBhdXRvbWF0aWNTaGlwczogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy50eXBlcy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICAgIGNvbnN0IGF4aXMgPSBbXCJ4XCIsIFwieVwiXVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKV07XG4gICAgICAgIGxldCBjb29yZHMgPSBbXTtcbiAgICAgICAgd2hpbGUgKCF0aGlzLmNhblBsYWNlU2hpcChjb29yZHMpKSB7XG4gICAgICAgICAgY29vcmRzID0gW107XG4gICAgICAgICAgbGV0IFt4LCB5XSA9XG4gICAgICAgICAgICB0aGlzLmxlZ2FsUGxhY2VtZW50c1tcbiAgICAgICAgICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5sZWdhbFBsYWNlbWVudHMubGVuZ3RoKVxuICAgICAgICAgICAgXTtcbiAgICAgICAgICBpZiAoYXhpcyA9PT0gXCJ4XCIpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSB5OyBpIDwgeSArIHR5cGUubGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgY29vcmRzLnB1c2goW3gsIGldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHg7IGkgPCB4ICsgdHlwZS5sZW47IGkrKykge1xuICAgICAgICAgICAgICBjb29yZHMucHVzaChbaSwgeV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgaW5mbyA9IHtcbiAgICAgICAgICBjb29yZHMsXG4gICAgICAgICAgYXhpcyxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zaGlwcy5wdXNoKFNoaXAoaW5mbykpO1xuICAgICAgICB0aGlzLnVwZGF0ZUxlZ2FsUGxhY2VtZW50cyhpbmZvKTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBwbGFjZVNoaXA6IGZ1bmN0aW9uIChpbmZvKSB7XG4gICAgICB0aGlzLnNoaXBzLnB1c2goU2hpcChpbmZvKSk7XG4gICAgICB0aGlzLnVwZGF0ZUxlZ2FsUGxhY2VtZW50cyhpbmZvKTtcbiAgICB9LFxuXG4gICAgY2FuUGxhY2VTaGlwOiBmdW5jdGlvbiAoY29vcmRzKSB7XG4gICAgICBpZiAoY29vcmRzLmxlbmd0aCA8IDIpIHJldHVybiBmYWxzZTtcbiAgICAgIHJldHVybiBjb29yZHMuZXZlcnkoKGNvb3JkKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmxlZ2FsUGxhY2VtZW50cy5zb21lKChsZWdhbFBsYWNlKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGNvb3JkKSA9PT0gSlNPTi5zdHJpbmdpZnkobGVnYWxQbGFjZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIHVwZGF0ZUxlZ2FsUGxhY2VtZW50czogZnVuY3Rpb24gKGluZm8pIHtcbiAgICAgIGxldCBsaXN0ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShpbmZvLmNvb3JkcykpO1xuICAgICAgbGV0IFthLCBiXSA9IGluZm8uY29vcmRzWzBdO1xuICAgICAgbGV0IFt5LCB6XSA9IGluZm8uY29vcmRzW2luZm8uY29vcmRzLmxlbmd0aCAtIDFdO1xuXG4gICAgICBpZiAoaW5mby5heGlzID09PSBcInlcIikge1xuICAgICAgICBsaXN0LnB1c2goW2EgLSAxLCBiXSwgW3kgKyAxLCB6XSk7XG4gICAgICAgIGxpc3QuZm9yRWFjaCgoW3gsIHldKSA9PiB7XG4gICAgICAgICAgbGlzdC5wdXNoKFt4LCB5IC0gMV0sIFt4LCB5ICsgMV0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaW5mby5jb29yZHMuZm9yRWFjaCgoW3gsIHldKSA9PiB7XG4gICAgICAgICAgbGlzdC5wdXNoKFt4LCB5IC0gMV0sIFt4LCB5ICsgMV0pO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxpc3QucHVzaChbYSwgYiAtIDFdLCBbeSwgeiArIDFdKTtcbiAgICAgICAgbGlzdC5mb3JFYWNoKChbeCwgeV0pID0+IHtcbiAgICAgICAgICBsaXN0LnB1c2goW3ggLSAxLCB5XSwgW3ggKyAxLCB5XSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpbmZvLmNvb3Jkcy5mb3JFYWNoKChbeCwgeV0pID0+IHtcbiAgICAgICAgICBsaXN0LnB1c2goW3ggLSAxLCB5XSwgW3ggKyAxLCB5XSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBsZXQgYXJyID0gdGhpcy5sZWdhbFBsYWNlbWVudHMuZmlsdGVyKChjb29yZCkgPT4ge1xuICAgICAgICByZXR1cm4gbGlzdC5ldmVyeShcbiAgICAgICAgICAoaXRlbSkgPT4gSlNPTi5zdHJpbmdpZnkoY29vcmQpICE9PSBKU09OLnN0cmluZ2lmeShpdGVtKVxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMubGVnYWxQbGFjZW1lbnRzID0gYXJyO1xuICAgIH0sXG5cbiAgICByZWNlaXZlQXR0YWNrOiBmdW5jdGlvbiAoeCwgeSkge1xuICAgICAgbGV0IGhpdCA9IGZhbHNlO1xuICAgICAgdGhpcy5zaGlwcy5ldmVyeSgoc2hpcCkgPT4ge1xuICAgICAgICBpZiAoc2hpcC5jb250YWlucyhbeCwgeV0sIFwiY29vcmRzXCIpKSB7XG4gICAgICAgICAgc2hpcC5wcm9jZXNzSGl0KFt4LCB5XSk7XG4gICAgICAgICAgaGl0ID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9KTtcblxuICAgICAgaWYgKGhpdCA9PT0gZmFsc2UpIHRoaXMubWlzc2VkLnB1c2goW3gsIHldKTtcbiAgICAgIHRoaXMudXBkYXRlTGVnYWwoeCwgeSk7XG4gICAgICByZXR1cm4gaGl0O1xuICAgIH0sXG5cbiAgICBhbGxTdW5rOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5zaGlwcy5ldmVyeSgoc2hpcCkgPT4ge1xuICAgICAgICByZXR1cm4gc2hpcC5pc1N1bmsoKTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICB1cGRhdGVMZWdhbDogZnVuY3Rpb24gKHgsIHkpIHtcbiAgICAgIGxldCBhcnIgPSB0aGlzLmxlZ2FsTW92ZXMuZmlsdGVyKFxuICAgICAgICAoY29vcmQpID0+IEpTT04uc3RyaW5naWZ5KGNvb3JkKSAhPT0gSlNPTi5zdHJpbmdpZnkoW3gsIHldKVxuICAgICAgKTtcblxuICAgICAgdGhpcy5sZWdhbE1vdmVzID0gYXJyO1xuICAgIH0sXG5cbiAgICBpc0lsbGVnYWw6IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICByZXR1cm4gdGhpcy5sZWdhbE1vdmVzLmV2ZXJ5KChjb29yZCkgPT4ge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoY29vcmQpICE9PSBKU09OLnN0cmluZ2lmeShbeCwgeV0pO1xuICAgICAgfSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCB7IEdhbWVCb2FyZCB9O1xuIiwiaW1wb3J0IHsgcnVuR2FtZSB9IGZyb20gXCIuL3J1bkdhbWVcIjtcblxuY29uc3QgcmVuZGVyR2FtZSA9IChmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGluaXRpYWxpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGh0bWwgPSBgPGRpdiBjbGFzcz1cIm1haW4tdGl0bGVcIj5CYXR0bGVzaGlwPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImJvYXJkXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJib2FyZC1vbmVcIj48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiYm9hcmRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJvYXJkLXR3b1wiPjwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJvdmVybGF5XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1oZWFkaW5nXCI+V2VsY29tZSB0byBCYXR0bGVzaGlwITwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtdGV4dFwiPjwvZGl2PlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInJvdGF0ZS1idG5cIj5Sb3RhdGU8L2J1dHRvbj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwbGFjaW5nLWJvYXJkXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PmA7XG5cbiAgICBkb2N1bWVudC5ib2R5LmlubmVySFRNTCA9IGh0bWw7XG4gICAgaW5pdGlhbGl6ZVZhcmlhYmxlcygpO1xuXG4gICAgcm90YXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgYXhpcyA9PT0gXCJ5XCIgPyAoYXhpcyA9IFwieFwiKSA6IChheGlzID0gXCJ5XCIpO1xuICAgIH0pO1xuXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCAxMDsgeCsrKSB7XG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IDEwOyB5KyspIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcImJvYXJkLWl0ZW1cIik7XG4gICAgICAgIGl0ZW0uZGF0YXNldC5jb29yZCA9IFt5LCB4XS5qb2luKFwiXCIpO1xuICAgICAgICBib2FyZE9uZS5hcHBlbmRDaGlsZChpdGVtKTtcbiAgICAgICAgYm9hcmRUd28uYXBwZW5kQ2hpbGQoaXRlbS5jbG9uZU5vZGUoKSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGluaXRpYWxpemVWYXJpYWJsZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgd2luZG93LmJvYXJkT25lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ib2FyZC1vbmVcIik7XG4gICAgd2luZG93LmJvYXJkVHdvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ib2FyZC10d29cIik7XG4gICAgd2luZG93LnBsYWNpbmdCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxhY2luZy1ib2FyZFwiKTtcbiAgICB3aW5kb3cucm90YXRlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yb3RhdGUtYnRuXCIpO1xuICAgIHdpbmRvdy5mcmVzaENvb3JkcyA9IFtdO1xuICAgIHdpbmRvdy5heGlzID0gXCJ4XCI7XG4gIH07XG5cbiAgY29uc3QgbG9hZFBsYWNpbmdCb2FyZCA9IGZ1bmN0aW9uIChwMSkge1xuICAgIHBsYWNpbmdCb2FyZC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGZvciAobGV0IHggPSAwOyB4IDwgMTA7IHgrKykge1xuICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCAxMDsgeSsrKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJib2FyZC1pdGVtXCIsIFwiaW52YWxpZC1wbGFjZW1lbnRcIik7XG4gICAgICAgIGl0ZW0uZGF0YXNldC5jb29yZCA9IFt5LCB4XS5qb2luKFwiXCIpO1xuICAgICAgICBwbGFjaW5nQm9hcmQuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gICAgICB9XG4gICAgfVxuICAgIHAxLm15Qm9hcmQubGVnYWxQbGFjZW1lbnRzLmZvckVhY2goKFt4LCB5XSkgPT4ge1xuICAgICAgY29uc3QgaXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIGAucGxhY2luZy1ib2FyZCA+IFtkYXRhLWNvb3JkPVwiJHt4fSR7eX1cImBcbiAgICAgICk7XG4gICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJpbnZhbGlkLXBsYWNlbWVudFwiKTtcbiAgICB9KTtcblxuICAgIHAxLm15Qm9hcmQuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgc2hpcC5jb29yZHMuZm9yRWFjaCgoW3gsIHldKSA9PiB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGAucGxhY2luZy1ib2FyZCA+IFtkYXRhLWNvb3JkPVwiJHt4fSR7eX1cImBcbiAgICAgICAgKTtcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiaW52YWxpZC1wbGFjZW1lbnRcIik7XG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCByZW5kZXJQbGFjaW5nQm9hcmQgPSBmdW5jdGlvbiAocDEpIHtcbiAgICBpbml0aWFsaXplKCk7XG4gICAgcGxhY2VTaGlwKHAxLCAwKTtcbiAgfTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSBmdW5jdGlvbiAocDEsIGluZGV4KSB7XG4gICAgbG9hZFBsYWNpbmdCb2FyZChwMSk7XG4gICAgY29uc3QgYm9hcmRJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICBcIi5wbGFjaW5nLWJvYXJkID4gLmJvYXJkLWl0ZW1cIlxuICAgICk7XG4gICAgY29uc3QgY2FyZFRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmQtdGV4dFwiKTtcbiAgICBjb25zdCB0eXBlID0gcDEubXlCb2FyZC50eXBlc1tpbmRleF07XG4gICAgY2FyZFRleHQudGV4dENvbnRlbnQgPSBgUGxhY2UgeW91ciAke3R5cGUudHlwZX1gO1xuXG4gICAgYm9hcmRJdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgIFwibW91c2VvdmVyXCIsXG4gICAgICAgIGhhbmRsZU1vdXNlT3Zlci5iaW5kKG51bGwsIGl0ZW0sIHR5cGUsIHAxKVxuICAgICAgKTtcbiAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIGhhbmRsZU1vdXNlT3V0KTtcbiAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUNsaWNrLmJpbmQobnVsbCwgcDEsIHR5cGUsIGluZGV4KSk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlTW91c2VPdmVyID0gZnVuY3Rpb24gKGl0ZW0sIHR5cGUsIHAxKSB7XG4gICAgY29uc3QgW3gsIHldID0gaXRlbS5kYXRhc2V0LmNvb3JkLnNwbGl0KFwiXCIpLm1hcChOdW1iZXIpO1xuICAgIGxldCBjb29yZHMgPSBbXTtcbiAgICBpZiAoYXhpcyA9PT0gXCJ5XCIpIHtcbiAgICAgIGZvciAobGV0IGkgPSB4OyBpIDwgeCArIHR5cGUubGVuOyBpKyspIHtcbiAgICAgICAgY29vcmRzLnB1c2goW2ksIHldKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IHk7IGkgPCB5ICsgdHlwZS5sZW47IGkrKykge1xuICAgICAgICBjb29yZHMucHVzaChbeCwgaV0pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocDEubXlCb2FyZC5jYW5QbGFjZVNoaXAoY29vcmRzKSkge1xuICAgICAgY29vcmRzLmZvckVhY2goKFtpLCB5XSkgPT4ge1xuICAgICAgICBkb2N1bWVudFxuICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKGAucGxhY2luZy1ib2FyZCA+IFtkYXRhLWNvb3JkPVwiJHtbaSwgeV0uam9pbihcIlwiKX1cIl1gKVxuICAgICAgICAgIC5jbGFzc0xpc3QuYWRkKFwiaG92ZXJcIik7XG4gICAgICB9KTtcbiAgICAgIGZyZXNoQ29vcmRzID0gY29vcmRzO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgW3gsIHldID0gY29vcmRzWzBdO1xuICAgICAgZG9jdW1lbnRcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoYC5wbGFjaW5nLWJvYXJkID4gW2RhdGEtY29vcmQ9XCIke1t4LCB5XS5qb2luKFwiXCIpfVwiXWApXG4gICAgICAgIC5jbGFzc0xpc3QuYWRkKFwiaW52YWxpZC1ob3ZlclwiKTtcbiAgICAgIGZyZXNoQ29vcmRzID0gW107XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZU1vdXNlT3V0ID0gZnVuY3Rpb24gKGUpIHtcbiAgICBkb2N1bWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaG92ZXJcIilcbiAgICAgIC5mb3JFYWNoKChpdGVtKSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJob3ZlclwiKSk7XG4gICAgZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiLmludmFsaWQtaG92ZXJcIilcbiAgICAgIC5mb3JFYWNoKChpdGVtKSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJpbnZhbGlkLWhvdmVyXCIpKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVDbGljayA9IGZ1bmN0aW9uIChwMSwgdHlwZSwgaW5kZXgpIHtcbiAgICBpZiAoIXAxLm15Qm9hcmQuY2FuUGxhY2VTaGlwKGZyZXNoQ29vcmRzKSkgcmV0dXJuO1xuXG4gICAgcDEubXlCb2FyZC5wbGFjZVNoaXAoe1xuICAgICAgY29vcmRzOiBmcmVzaENvb3JkcyxcbiAgICAgIGF4aXMsXG4gICAgfSk7XG5cbiAgICBpZiAodHlwZS50eXBlID09PSBcIlBhdHJvbCBCb2F0XCIpIHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3ZlcmxheVwiKS5yZW1vdmUoKTtcbiAgICAgIHJ1bkdhbWUuZ2FtZUxvb3AoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGxhY2VTaGlwKHAxLCBpbmRleCArIDEpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCByZW5kZXIgPSBmdW5jdGlvbiAocDEsIHAyKSB7XG4gICAgcmVuZGVyUGxheWVyKHAxKTtcbiAgICByZW5kZXJQbGF5ZXIocDIpO1xuICB9O1xuXG4gIGNvbnN0IHJlbmRlclBsYXllciA9IGZ1bmN0aW9uIChwbGF5ZXIpIHtcbiAgICBsZXQgbnVtO1xuICAgIGlmIChwbGF5ZXIuaWQgPT09IFwicGxheWVyXCIpIHtcbiAgICAgIG51bSA9IFwib25lXCI7XG4gICAgICBwbGF5ZXIubXlCb2FyZC5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICAgIHNoaXAuY29vcmRzLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKGAuYm9hcmQtJHtudW19ID4gW2RhdGEtY29vcmQ9XCIke2Nvb3JkLmpvaW4oXCJcIil9XCJdYClcbiAgICAgICAgICAgIC5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbnVtID0gXCJ0d29cIjtcbiAgICB9XG5cbiAgICBwbGF5ZXIubXlCb2FyZC5taXNzZWQuZm9yRWFjaCgobWlzcykgPT4ge1xuICAgICAgZG9jdW1lbnRcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoYC5ib2FyZC0ke251bX0gPiBbZGF0YS1jb29yZD1cIiR7bWlzcy5qb2luKFwiXCIpfVwiXWApXG4gICAgICAgIC5jbGFzc0xpc3QuYWRkKFwibWlzc2VkXCIpO1xuICAgIH0pO1xuXG4gICAgcGxheWVyLm15Qm9hcmQuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgc2hpcC5oaXQuZm9yRWFjaCgoaGl0KSA9PiB7XG4gICAgICAgIGRvY3VtZW50XG4gICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoYC5ib2FyZC0ke251bX0gPiBbZGF0YS1jb29yZD1cIiR7aGl0LmpvaW4oXCJcIil9XCJdYClcbiAgICAgICAgICAuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGVuZEdhbWUgPSBmdW5jdGlvbiAod2lubmVyKSB7XG4gICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgb3ZlcmxheS5jbGFzc0xpc3QuYWRkKFwib3ZlcmxheVwiKTtcbiAgICBvdmVybGF5LmlubmVySFRNTCA9IGBcbiAgICA8ZGl2IGNsYXNzPVwib3ZlcmxheVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZW5kLWNhcmRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWhlYWRpbmdcIj4ke3dpbm5lcn08L2Rpdj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJyZXN0YXJ0LWJ0blwiPlBsYXkgQWdhaW48L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+YDtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG92ZXJsYXkpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzdGFydC1idG5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJlc3RhcnQpO1xuICB9O1xuXG4gIGNvbnN0IHJlc3RhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPSBcIlwiO1xuICAgIHJ1bkdhbWUuaW5pdGlhbGl6ZSgpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgcmVuZGVyLFxuICAgIHJlbmRlclBsYWNpbmdCb2FyZCxcbiAgICBlbmRHYW1lLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IHsgcmVuZGVyR2FtZSB9O1xuIiwiaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vUGxheWVyXCI7XG5pbXBvcnQgeyByZW5kZXJHYW1lIH0gZnJvbSBcIi4vcmVuZGVyR2FtZVwiO1xuXG5jb25zdCBydW5HYW1lID0gKGZ1bmN0aW9uICgpIHtcbiAgbGV0IHBsYXllcjtcbiAgbGV0IGNvbXB1dGVyO1xuXG4gIGNvbnN0IGluaXRpYWxpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcGxheWVyID0gbmV3IFBsYXllcigpO1xuICAgIGNvbXB1dGVyID0gbmV3IFBsYXllcihcImNvbXBcIik7XG4gICAgcGxheWVyLnNldEVuZW15KGNvbXB1dGVyKTtcbiAgICBjb21wdXRlci5zZXRFbmVteShwbGF5ZXIpO1xuICAgIHBsYXllci5zZXRDdXJyZW50KHRydWUpO1xuICAgIHBsYWNlU2hpcHMoKTtcbiAgfTtcblxuICBjb25zdCBwbGFjZVNoaXBzID0gZnVuY3Rpb24gKCkge1xuICAgIGNvbXB1dGVyLmNvbXBTaGlwcygpO1xuICAgIHJlbmRlckdhbWUucmVuZGVyUGxhY2luZ0JvYXJkKHBsYXllcik7XG4gIH07XG5cbiAgY29uc3QgZ2FtZUxvb3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmVuZGVyR2FtZS5yZW5kZXIocGxheWVyLCBjb21wdXRlcik7XG5cbiAgICBpZiAocGxheWVyLmN1cnJlbnRUdXJuID09PSB0cnVlKSB7XG4gICAgICBjb21wdXRlci5teUJvYXJkLmxlZ2FsTW92ZXMuZm9yRWFjaCgobGVnYWxNb3ZlKSA9PiB7XG4gICAgICAgIGRvY3VtZW50XG4gICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoYC5ib2FyZC10d28gPiBbZGF0YS1jb29yZD1cIiR7bGVnYWxNb3ZlLmpvaW4oXCJcIil9XCJdYClcbiAgICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHByb2Nlc3NDbGljayk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBwcm9jZXNzQ2xpY2soKTtcbiAgfTtcblxuICBjb25zdCBwcm9jZXNzQ2xpY2sgPSBmdW5jdGlvbiAoZSA9IFwibnVsbFwiKSB7XG4gICAgaWYgKHBsYXllci5jdXJyZW50VHVybiA9PT0gdHJ1ZSkge1xuICAgICAgbGV0IFt4LCB5XSA9IGUudGFyZ2V0LmRhdGFzZXQuY29vcmQuc3BsaXQoXCJcIikubWFwKE51bWJlcik7XG4gICAgICBwbGF5ZXIuYXR0YWNrKHgsIHkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb21wdXRlci5jb21wQXR0YWNrKCk7XG4gICAgfVxuICAgIGxldCB3aW5uZXIgPSBlbmRHYW1lKCk7XG4gICAgaWYgKHdpbm5lcikge1xuICAgICAgcmVuZGVyR2FtZS5lbmRHYW1lKHdpbm5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdhbWVMb29wKCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGVuZEdhbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IHdpbm5lcjtcbiAgICBpZiAocGxheWVyLm15Qm9hcmQuYWxsU3VuaygpKSB7XG4gICAgICB3aW5uZXIgPSBcIkNvbXB1dGVyIFdpbnMhIEJldHRlciBsdWNrIG5leHQgdGltZS5cIjtcbiAgICB9IGVsc2UgaWYgKGNvbXB1dGVyLm15Qm9hcmQuYWxsU3VuaygpKSB7XG4gICAgICB3aW5uZXIgPSBcIkNvbmdyYXR1bGF0aW9ucyEgWW91IHdpbi5cIjtcbiAgICB9IGVsc2Ugd2lubmVyID0gZmFsc2U7XG4gICAgcmV0dXJuIHdpbm5lcjtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGluaXRpYWxpemUsXG4gICAgZ2FtZUxvb3AsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgeyBydW5HYW1lIH07XG4iLCJpbXBvcnQgeyBydW5HYW1lIH0gZnJvbSBcIi4vbW9kdWxlcy9ydW5HYW1lXCI7XG5cbnJ1bkdhbWUuaW5pdGlhbGl6ZSgpOyJdLCJuYW1lcyI6WyJTaGlwIiwiaW5mbyIsImNvb3JkcyIsImhpdCIsInByb2Nlc3NIaXQiLCJjb29yZCIsInRoaXMiLCJwdXNoIiwiaXNTdW5rIiwibGVuZ3RoIiwiY29udGFpbnMiLCJvYmoiLCJzb21lIiwiaXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJQbGF5ZXIiLCJjb25zdHJ1Y3RvciIsImlkIiwibXlCb2FyZCIsImxlZ2FsTW92ZXMiLCJsZWdhbFBsYWNlbWVudHMiLCJ4IiwieSIsInNoaXBzIiwibWlzc2VkIiwidHlwZXMiLCJ0eXBlIiwibGVuIiwiYXV0b21hdGljU2hpcHMiLCJmb3JFYWNoIiwiYXhpcyIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImNhblBsYWNlU2hpcCIsImkiLCJ1cGRhdGVMZWdhbFBsYWNlbWVudHMiLCJwbGFjZVNoaXAiLCJldmVyeSIsImxlZ2FsUGxhY2UiLCJsaXN0IiwicGFyc2UiLCJhIiwiYiIsInoiLCJhcnIiLCJmaWx0ZXIiLCJyZWNlaXZlQXR0YWNrIiwic2hpcCIsInVwZGF0ZUxlZ2FsIiwiYWxsU3VuayIsImlzSWxsZWdhbCIsIkdhbWVCb2FyZCIsImVuZW15IiwiY3VycmVudFR1cm4iLCJzZXRFbmVteSIsInBsYXllciIsInNldEN1cnJlbnQiLCJ0dXJuIiwiYXR0YWNrIiwicmVjZWl2ZSIsImNvbXBTaGlwcyIsImNvbXBBdHRhY2siLCJyZW5kZXJHYW1lIiwicDEiLCJpbmRleCIsInBsYWNpbmdCb2FyZCIsImlubmVySFRNTCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImRhdGFzZXQiLCJqb2luIiwiYXBwZW5kQ2hpbGQiLCJxdWVyeVNlbGVjdG9yIiwicmVtb3ZlIiwibG9hZFBsYWNpbmdCb2FyZCIsImJvYXJkSXRlbXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiY2FyZFRleHQiLCJ0ZXh0Q29udGVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGVNb3VzZU92ZXIiLCJiaW5kIiwiaGFuZGxlTW91c2VPdXQiLCJoYW5kbGVDbGljayIsInNwbGl0IiwibWFwIiwiTnVtYmVyIiwiZnJlc2hDb29yZHMiLCJlIiwicnVuR2FtZSIsImdhbWVMb29wIiwicmVuZGVyUGxheWVyIiwibnVtIiwibWlzcyIsInJlc3RhcnQiLCJib2R5IiwiaW5pdGlhbGl6ZSIsInJlbmRlciIsInAyIiwicmVuZGVyUGxhY2luZ0JvYXJkIiwid2luZG93IiwiYm9hcmRPbmUiLCJib2FyZFR3byIsInJvdGF0ZUJ0biIsImNsb25lTm9kZSIsImVuZEdhbWUiLCJ3aW5uZXIiLCJvdmVybGF5IiwiY29tcHV0ZXIiLCJwcm9jZXNzQ2xpY2siLCJsZWdhbE1vdmUiLCJ0YXJnZXQiXSwic291cmNlUm9vdCI6IiJ9