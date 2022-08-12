(()=>{"use strict";const e=function(e){return{info:e,coords:e.coords,hit:[],processHit:function(e){this.hit.push(e)},isSunk:function(){return this.hit.length===this.coords.length},contains:function(e,t){return this[t].some((t=>JSON.stringify(t)===JSON.stringify(e)))}}};class t{constructor(t="player"){this.myBoard=function(){let t=[],o=[];for(let e=0;e<10;e++)for(let r=0;r<10;r++)t.push([e,r]),o.push([e,r]);return{ships:[],missed:[],types:[{type:"Carrier",len:5},{type:"Battleship",len:4},{type:"Destroyer",len:3},{type:"Submarine",len:3},{type:"Patrol Boat",len:2}],legalPlacements:o,legalMoves:t,automaticShips:function(){this.types.forEach((t=>{const o=["x","y"][Math.floor(2*Math.random())];let r=[];for(;!this.canPlaceShip(r);){r=[];let[e,n]=this.legalPlacements[Math.floor(Math.random()*this.legalPlacements.length)];if("x"===o)for(let o=n;o<n+t.len;o++)r.push([e,o]);else for(let o=e;o<e+t.len;o++)r.push([o,n])}let n={coords:r,axis:o};this.ships.push(e(n)),this.updateLegalPlacements(n)}))},placeShip:function(t){this.ships.push(e(t)),this.updateLegalPlacements(t)},canPlaceShip:function(e){return!(e.length<2)&&e.every((e=>this.legalPlacements.some((t=>JSON.stringify(e)===JSON.stringify(t)))))},updateLegalPlacements:function(e){let t=JSON.parse(JSON.stringify(e.coords)),[o,r]=e.coords[0],[n,s]=e.coords[e.coords.length-1];"y"===e.axis?(t.push([o-1,r],[n+1,s]),t.forEach((([e,o])=>{t.push([e,o-1],[e,o+1])})),e.coords.forEach((([e,o])=>{t.push([e,o-1],[e,o+1])}))):(t.push([o,r-1],[n,s+1]),t.forEach((([e,o])=>{t.push([e-1,o],[e+1,o])})),e.coords.forEach((([e,o])=>{t.push([e-1,o],[e+1,o])})));let i=this.legalPlacements.filter((e=>t.every((t=>JSON.stringify(e)!==JSON.stringify(t)))));this.legalPlacements=i},receiveAttack:function(e,t){let o=!1;return this.ships.every((r=>!r.contains([e,t],"coords")||(r.processHit([e,t]),o=!0,!1))),!1===o&&this.missed.push([e,t]),this.updateLegal(e,t),o},allSunk:function(){return this.ships.every((e=>e.isSunk()))},updateLegal:function(e,t){let o=this.legalMoves.filter((o=>JSON.stringify(o)!==JSON.stringify([e,t])));this.legalMoves=o},isIllegal:function(e,t){return this.legalMoves.every((o=>JSON.stringify(o)!==JSON.stringify([e,t])))}}}(),this.enemy,this.id=t,this.currentTurn=!1}setEnemy(e){this.enemy=e}setCurrent(e){this.currentTurn=e}attack(e,t){return this.enemy.receive(e,t)}compShips(){"comp"===this.id&&this.myBoard.automaticShips()}compAttack(){if("comp"!==this.id)return;let e=this.enemy.myBoard.legalMoves,[t,o]=e[Math.floor(Math.random()*e.length)];return this.enemy.receive(t,o)}receive(e,t){if(this.myBoard.isIllegal(e,t))return"Illegal Move";!0!==this.myBoard.receiveAttack(e,t)&&(this.currentTurn=!0,this.enemy.setCurrent(!1))}}const o=function(){const e=document.querySelector(".board-one"),t=document.querySelector(".board-two"),o=document.querySelector(".placing-board"),n=document.querySelector(".rotate-btn");let s=[],i="y";n.addEventListener("click",(e=>{i="y"===i?"x":"y"}));for(let o=0;o<10;o++)for(let r=0;r<10;r++){const n=document.createElement("div");n.classList.add("board-item"),n.dataset.coord=[o,r].join(""),e.appendChild(n),t.appendChild(n.cloneNode())}const a=function(e,t){!function(e){o.innerHTML="";for(let e=0;e<10;e++)for(let t=0;t<10;t++){const r=document.createElement("div");r.classList.add("board-item","cant-place"),r.dataset.coord=[e,t].join(""),o.appendChild(r)}e.myBoard.legalPlacements.forEach((([e,t])=>{document.querySelector(`.placing-board > [data-coord="${e}${t}"`).classList.remove("cant-place")})),e.myBoard.ships.forEach((e=>{e.coords.forEach((([e,t])=>{const o=document.querySelector(`.placing-board > [data-coord="${e}${t}"`);o.classList.remove("cant-place"),o.classList.add("ship")}))}))}(e);const r=document.querySelectorAll(".placing-board > .board-item"),n=document.querySelector(".card-text"),s=e.myBoard.types[t];n.textContent=`Place your ${s.type}`,r.forEach((o=>{o.addEventListener("mouseover",c.bind(null,o,s,e)),o.addEventListener("mouseout",l),o.addEventListener("click",d.bind(null,e,s,t))}))},c=function(e,t,o){const[r,n]=e.dataset.coord.split("").map(Number);let a=[];if("x"===i)for(let e=r;e<r+t.len;e++)a.push([e,n]);else for(let e=n;e<n+t.len;e++)a.push([r,e]);o.myBoard.canPlaceShip(a)?(a.forEach((([e,t])=>{document.querySelector(`.placing-board > [data-coord="${[e,t].join("")}"]`).classList.add("hover")})),s=a):s=[]},l=function(){document.querySelectorAll(".hover").forEach((e=>e.classList.remove("hover")))},d=function(e,t,o){e.myBoard.canPlaceShip(s)&&(e.myBoard.placeShip({coords:s,axis:t.axis}),"Patrol Boat"===t.type?(document.querySelector(".overlay").remove(),r.gameLoop()):a(e,o+1))},u=function(e){let t;t="player"===e.id?"one":"two",e.myBoard.missed.forEach((e=>{document.querySelector(`.board-${t} > [data-coord="${e.join("")}"]`).classList.add("missed")})),e.myBoard.ships.forEach((e=>{e.hit.forEach((e=>{document.querySelector(`.board-${t} > [data-coord="${e.join("")}"]`).classList.add("hit")}))}))};return{render:function(e,t){u(e),u(t)},renderPlacingBoard:function(e){a(e,0)}}}(),r=function(){const e=new t,r=new t("comp"),n=function(){o.render(e,r),!0!==e.currentTurn?s():r.myBoard.legalMoves.forEach((e=>{document.querySelector(`.board-two > [data-coord="${e.join("")}"]`).addEventListener("click",s)}))},s=function(t="null"){if(!0===e.currentTurn){let[o,r]=t.target.dataset.coord.split("").map(Number);e.attack(o,r)}else r.compAttack();n()};return{initialize:function(){e.setEnemy(r),r.setEnemy(e),e.setCurrent(!0),r.compShips(),o.renderPlacingBoard(e)},gameLoop:n}}();r.initialize()})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RSxNQUFNeUYsTUFBTSxJQUFJQyxJQUFJQyxRQUNsRHZDLEVBQU9HLE9BQU90QyxFQUFHQyxFQUNuQixNQUNFa0YsRUFBUzFDLGFBRVhtQyxHQUNGLEVBSUEsTUFBTyxDQUNMVyxXQTVDaUIsV0FDakJwRCxFQUFPRCxTQUFTaUQsR0FDaEJBLEVBQVNqRCxTQUFTQyxHQUNsQkEsRUFBT0MsWUFBVyxHQUtsQitDLEVBQVMzQyxZQUNURSxFQUFXd0MsbUJBQW1CL0MsRUFKaEMsRUF3Q0V5QyxXQUVILENBbkRlLEdDRGhCRCxFQUFRWSxZIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL1NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL1BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvR2FtZUJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9yZW5kZXJHYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9ydW5HYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgU2hpcCA9IGZ1bmN0aW9uIChpbmZvKSB7XG4gIHJldHVybiB7XG4gICAgaW5mbyxcbiAgICBjb29yZHM6IGluZm8uY29vcmRzLFxuICAgIGhpdDogW10sXG4gICAgcHJvY2Vzc0hpdDogZnVuY3Rpb24gKGNvb3JkKSB7XG4gICAgICB0aGlzLmhpdC5wdXNoKGNvb3JkKTtcbiAgICB9LFxuICAgIGlzU3VuazogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGl0Lmxlbmd0aCA9PT0gdGhpcy5jb29yZHMubGVuZ3RoID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH0sXG4gICAgY29udGFpbnM6IGZ1bmN0aW9uIChjb29yZCwgb2JqKSB7XG4gICAgICByZXR1cm4gdGhpc1tvYmpdLnNvbWUoXG4gICAgICAgIChpdGVtKSA9PiBKU09OLnN0cmluZ2lmeShpdGVtKSA9PT0gSlNPTi5zdHJpbmdpZnkoY29vcmQpXG4gICAgICApO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgeyBTaGlwIH07XG4iLCJpbXBvcnQgeyBHYW1lQm9hcmQgfSBmcm9tIFwiLi9HYW1lQm9hcmRcIjtcblxuY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IoaWQgPSBcInBsYXllclwiKSB7XG4gICAgdGhpcy5teUJvYXJkID0gR2FtZUJvYXJkKCk7XG4gICAgdGhpcy5lbmVteTtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy5jdXJyZW50VHVybiA9IGZhbHNlO1xuICB9XG5cbiAgc2V0RW5lbXkocGxheWVyKSB7XG4gICAgdGhpcy5lbmVteSA9IHBsYXllcjtcbiAgfVxuXG4gIHNldEN1cnJlbnQodHVybikge1xuICAgIHRoaXMuY3VycmVudFR1cm4gPSB0dXJuO1xuICB9XG5cbiAgYXR0YWNrKHgsIHkpIHtcbiAgICByZXR1cm4gdGhpcy5lbmVteS5yZWNlaXZlKHgsIHkpO1xuICB9XG5cbiAgY29tcFNoaXBzKCkge1xuICAgIGlmICh0aGlzLmlkICE9PSBcImNvbXBcIikgcmV0dXJuO1xuICAgIHRoaXMubXlCb2FyZC5hdXRvbWF0aWNTaGlwcygpO1xuICB9XG5cbiAgY29tcEF0dGFjaygpIHtcbiAgICBpZiAodGhpcy5pZCAhPT0gXCJjb21wXCIpIHJldHVybjtcbiAgICBsZXQgbGVnYWxNb3ZlcyA9IHRoaXMuZW5lbXkubXlCb2FyZC5sZWdhbE1vdmVzO1xuICAgIGxldCBbeCwgeV0gPSBsZWdhbE1vdmVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxlZ2FsTW92ZXMubGVuZ3RoKV07XG4gICAgcmV0dXJuIHRoaXMuZW5lbXkucmVjZWl2ZSh4LCB5KTtcbiAgfVxuXG4gIHJlY2VpdmUoeCwgeSkge1xuICAgIGlmICh0aGlzLm15Qm9hcmQuaXNJbGxlZ2FsKHgsIHkpKSByZXR1cm4gXCJJbGxlZ2FsIE1vdmVcIjtcbiAgICBsZXQgaGl0ID0gdGhpcy5teUJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XG4gICAgaWYgKGhpdCAhPT0gdHJ1ZSkge1xuICAgICAgdGhpcy5jdXJyZW50VHVybiA9IHRydWU7XG4gICAgICB0aGlzLmVuZW15LnNldEN1cnJlbnQoZmFsc2UpO1xuICAgIH1cbiAgICByZXR1cm4gXG4gIH1cbn1cblxuZXhwb3J0IHsgUGxheWVyIH07XG4iLCJpbXBvcnQgeyBTaGlwIH0gZnJvbSBcIi4vU2hpcFwiO1xuXG5jb25zdCBHYW1lQm9hcmQgPSBmdW5jdGlvbiAoKSB7XG4gIGxldCBsZWdhbE1vdmVzID0gW107XG4gIGxldCBsZWdhbFBsYWNlbWVudHMgPSBbXTtcbiAgZm9yIChsZXQgeCA9IDA7IHggPCAxMDsgeCsrKSB7XG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCAxMDsgeSsrKSB7XG4gICAgICBsZWdhbE1vdmVzLnB1c2goW3gsIHldKTtcbiAgICAgIGxlZ2FsUGxhY2VtZW50cy5wdXNoKFt4LCB5XSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzaGlwczogW10sXG4gICAgbWlzc2VkOiBbXSxcbiAgICB0eXBlczogW1xuICAgICAgeyB0eXBlOiBcIkNhcnJpZXJcIiwgbGVuOiA1IH0sXG4gICAgICB7IHR5cGU6IFwiQmF0dGxlc2hpcFwiLCBsZW46IDQgfSxcbiAgICAgIHsgdHlwZTogXCJEZXN0cm95ZXJcIiwgbGVuOiAzIH0sXG4gICAgICB7IHR5cGU6IFwiU3VibWFyaW5lXCIsIGxlbjogMyB9LFxuICAgICAgeyB0eXBlOiBcIlBhdHJvbCBCb2F0XCIsIGxlbjogMiB9LFxuICAgIF0sXG4gICAgbGVnYWxQbGFjZW1lbnRzLFxuICAgIGxlZ2FsTW92ZXMsXG5cbiAgICBhdXRvbWF0aWNTaGlwczogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy50eXBlcy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICAgIGNvbnN0IGF4aXMgPSBbXCJ4XCIsIFwieVwiXVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKV07XG4gICAgICAgIGxldCBjb29yZHMgPSBbXTtcbiAgICAgICAgd2hpbGUgKCF0aGlzLmNhblBsYWNlU2hpcChjb29yZHMpKSB7XG4gICAgICAgICAgY29vcmRzID0gW107XG4gICAgICAgICAgbGV0IFt4LCB5XSA9XG4gICAgICAgICAgICB0aGlzLmxlZ2FsUGxhY2VtZW50c1tcbiAgICAgICAgICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5sZWdhbFBsYWNlbWVudHMubGVuZ3RoKVxuICAgICAgICAgICAgXTtcbiAgICAgICAgICBpZiAoYXhpcyA9PT0gXCJ4XCIpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSB5OyBpIDwgeSArIHR5cGUubGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgY29vcmRzLnB1c2goW3gsIGldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHg7IGkgPCB4ICsgdHlwZS5sZW47IGkrKykge1xuICAgICAgICAgICAgICBjb29yZHMucHVzaChbaSwgeV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgaW5mbyA9IHtcbiAgICAgICAgICBjb29yZHMsXG4gICAgICAgICAgYXhpcyxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zaGlwcy5wdXNoKFNoaXAoaW5mbykpO1xuICAgICAgICB0aGlzLnVwZGF0ZUxlZ2FsUGxhY2VtZW50cyhpbmZvKTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBwbGFjZVNoaXA6IGZ1bmN0aW9uIChpbmZvKSB7XG4gICAgICB0aGlzLnNoaXBzLnB1c2goU2hpcChpbmZvKSk7XG4gICAgICB0aGlzLnVwZGF0ZUxlZ2FsUGxhY2VtZW50cyhpbmZvKTtcbiAgICB9LFxuXG4gICAgY2FuUGxhY2VTaGlwOiBmdW5jdGlvbiAoY29vcmRzKSB7XG4gICAgICBpZiAoY29vcmRzLmxlbmd0aCA8IDIpIHJldHVybiBmYWxzZTtcbiAgICAgIHJldHVybiBjb29yZHMuZXZlcnkoKGNvb3JkKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmxlZ2FsUGxhY2VtZW50cy5zb21lKChsZWdhbFBsYWNlKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGNvb3JkKSA9PT0gSlNPTi5zdHJpbmdpZnkobGVnYWxQbGFjZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIHVwZGF0ZUxlZ2FsUGxhY2VtZW50czogZnVuY3Rpb24gKGluZm8pIHtcbiAgICAgIGxldCBsaXN0ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShpbmZvLmNvb3JkcykpO1xuICAgICAgbGV0IFthLCBiXSA9IGluZm8uY29vcmRzWzBdO1xuICAgICAgbGV0IFt5LCB6XSA9IGluZm8uY29vcmRzW2luZm8uY29vcmRzLmxlbmd0aCAtIDFdO1xuXG4gICAgICBpZiAoaW5mby5heGlzID09PSBcInlcIikge1xuICAgICAgICBsaXN0LnB1c2goW2EgLSAxLCBiXSwgW3kgKyAxLCB6XSk7XG4gICAgICAgIGxpc3QuZm9yRWFjaCgoW3gsIHldKSA9PiB7XG4gICAgICAgICAgbGlzdC5wdXNoKFt4LCB5IC0gMV0sIFt4LCB5ICsgMV0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaW5mby5jb29yZHMuZm9yRWFjaCgoW3gsIHldKSA9PiB7XG4gICAgICAgICAgbGlzdC5wdXNoKFt4LCB5IC0gMV0sIFt4LCB5ICsgMV0pO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxpc3QucHVzaChbYSwgYiAtIDFdLCBbeSwgeiArIDFdKTtcbiAgICAgICAgbGlzdC5mb3JFYWNoKChbeCwgeV0pID0+IHtcbiAgICAgICAgICBsaXN0LnB1c2goW3ggLSAxLCB5XSwgW3ggKyAxLCB5XSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpbmZvLmNvb3Jkcy5mb3JFYWNoKChbeCwgeV0pID0+IHtcbiAgICAgICAgICBsaXN0LnB1c2goW3ggLSAxLCB5XSwgW3ggKyAxLCB5XSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBsZXQgYXJyID0gdGhpcy5sZWdhbFBsYWNlbWVudHMuZmlsdGVyKChjb29yZCkgPT4ge1xuICAgICAgICByZXR1cm4gbGlzdC5ldmVyeShcbiAgICAgICAgICAoaXRlbSkgPT4gSlNPTi5zdHJpbmdpZnkoY29vcmQpICE9PSBKU09OLnN0cmluZ2lmeShpdGVtKVxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMubGVnYWxQbGFjZW1lbnRzID0gYXJyO1xuICAgIH0sXG5cbiAgICByZWNlaXZlQXR0YWNrOiBmdW5jdGlvbiAoeCwgeSkge1xuICAgICAgbGV0IGhpdCA9IGZhbHNlO1xuICAgICAgdGhpcy5zaGlwcy5ldmVyeSgoc2hpcCkgPT4ge1xuICAgICAgICBpZiAoc2hpcC5jb250YWlucyhbeCwgeV0sIFwiY29vcmRzXCIpKSB7XG4gICAgICAgICAgc2hpcC5wcm9jZXNzSGl0KFt4LCB5XSk7XG4gICAgICAgICAgaGl0ID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9KTtcblxuICAgICAgaWYgKGhpdCA9PT0gZmFsc2UpIHRoaXMubWlzc2VkLnB1c2goW3gsIHldKTtcbiAgICAgIHRoaXMudXBkYXRlTGVnYWwoeCwgeSk7XG4gICAgICByZXR1cm4gaGl0O1xuICAgIH0sXG5cbiAgICBhbGxTdW5rOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5zaGlwcy5ldmVyeSgoc2hpcCkgPT4ge1xuICAgICAgICByZXR1cm4gc2hpcC5pc1N1bmsoKTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICB1cGRhdGVMZWdhbDogZnVuY3Rpb24gKHgsIHkpIHtcbiAgICAgIGxldCBhcnIgPSB0aGlzLmxlZ2FsTW92ZXMuZmlsdGVyKFxuICAgICAgICAoY29vcmQpID0+IEpTT04uc3RyaW5naWZ5KGNvb3JkKSAhPT0gSlNPTi5zdHJpbmdpZnkoW3gsIHldKVxuICAgICAgKTtcblxuICAgICAgdGhpcy5sZWdhbE1vdmVzID0gYXJyO1xuICAgIH0sXG5cbiAgICBpc0lsbGVnYWw6IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICByZXR1cm4gdGhpcy5sZWdhbE1vdmVzLmV2ZXJ5KChjb29yZCkgPT4ge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoY29vcmQpICE9PSBKU09OLnN0cmluZ2lmeShbeCwgeV0pO1xuICAgICAgfSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCB7IEdhbWVCb2FyZCB9O1xuIiwiaW1wb3J0IHsgcnVuR2FtZSB9IGZyb20gXCIuL3J1bkdhbWVcIjtcblxuY29uc3QgcmVuZGVyR2FtZSA9IChmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGJvYXJkT25lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ib2FyZC1vbmVcIik7XG4gIGNvbnN0IGJvYXJkVHdvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ib2FyZC10d29cIik7XG4gIGNvbnN0IHBsYWNpbmdCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxhY2luZy1ib2FyZFwiKTtcbiAgY29uc3Qgcm90YXRlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yb3RhdGUtYnRuXCIpO1xuICBsZXQgZnJlc2hDb29yZHMgPSBbXTtcblxuICBsZXQgYXhpcyA9IFwieVwiO1xuICByb3RhdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgYXhpcyA9PT0gXCJ5XCIgPyAoYXhpcyA9IFwieFwiKSA6IChheGlzID0gXCJ5XCIpO1xuICB9KTtcblxuICBmb3IgKGxldCB4ID0gMDsgeCA8IDEwOyB4KyspIHtcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IDEwOyB5KyspIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiYm9hcmQtaXRlbVwiKTtcbiAgICAgIGl0ZW0uZGF0YXNldC5jb29yZCA9IFt4LCB5XS5qb2luKFwiXCIpO1xuICAgICAgYm9hcmRPbmUuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gICAgICBib2FyZFR3by5hcHBlbmRDaGlsZChpdGVtLmNsb25lTm9kZSgpKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBsb2FkUGxhY2luZ0JvYXJkID0gZnVuY3Rpb24gKHAxKSB7XG4gICAgcGxhY2luZ0JvYXJkLmlubmVySFRNTCA9IFwiXCI7XG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCAxMDsgeCsrKSB7XG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IDEwOyB5KyspIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcImJvYXJkLWl0ZW1cIiwgXCJjYW50LXBsYWNlXCIpO1xuICAgICAgICBpdGVtLmRhdGFzZXQuY29vcmQgPSBbeCwgeV0uam9pbihcIlwiKTtcbiAgICAgICAgcGxhY2luZ0JvYXJkLmFwcGVuZENoaWxkKGl0ZW0pO1xuICAgICAgfVxuICAgIH1cbiAgICBwMS5teUJvYXJkLmxlZ2FsUGxhY2VtZW50cy5mb3JFYWNoKChbeCwgeV0pID0+IHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBgLnBsYWNpbmctYm9hcmQgPiBbZGF0YS1jb29yZD1cIiR7eH0ke3l9XCJgXG4gICAgICApO1xuICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiY2FudC1wbGFjZVwiKTtcbiAgICB9KTtcblxuICAgIHAxLm15Qm9hcmQuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgc2hpcC5jb29yZHMuZm9yRWFjaCgoW3gsIHldKSA9PiB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGAucGxhY2luZy1ib2FyZCA+IFtkYXRhLWNvb3JkPVwiJHt4fSR7eX1cImBcbiAgICAgICAgKTtcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiY2FudC1wbGFjZVwiKTtcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHJlbmRlclBsYWNpbmdCb2FyZCA9IGZ1bmN0aW9uIChwMSkge1xuICAgIHBsYWNlU2hpcChwMSwgMCk7XG4gIH07XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gZnVuY3Rpb24gKHAxLCBpbmRleCkge1xuICAgIGxvYWRQbGFjaW5nQm9hcmQocDEpO1xuICAgIGNvbnN0IGJvYXJkSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgXCIucGxhY2luZy1ib2FyZCA+IC5ib2FyZC1pdGVtXCJcbiAgICApO1xuICAgIGNvbnN0IGNhcmRUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkLXRleHRcIik7XG4gICAgY29uc3QgdHlwZSA9IHAxLm15Qm9hcmQudHlwZXNbaW5kZXhdO1xuICAgIGNhcmRUZXh0LnRleHRDb250ZW50ID0gYFBsYWNlIHlvdXIgJHt0eXBlLnR5cGV9YDtcblxuICAgIGJvYXJkSXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICBcIm1vdXNlb3ZlclwiLFxuICAgICAgICBoYW5kbGVNb3VzZU92ZXIuYmluZChudWxsLCBpdGVtLCB0eXBlLCBwMSlcbiAgICAgICk7XG4gICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCBoYW5kbGVNb3VzZU91dCk7XG4gICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVDbGljay5iaW5kKG51bGwsIHAxLCB0eXBlLCBpbmRleCkpO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZU1vdXNlT3ZlciA9IGZ1bmN0aW9uIChpdGVtLCB0eXBlLCBwMSkge1xuICAgIGNvbnN0IFt4LCB5XSA9IGl0ZW0uZGF0YXNldC5jb29yZC5zcGxpdChcIlwiKS5tYXAoTnVtYmVyKTtcbiAgICBsZXQgY29vcmRzID0gW107XG4gICAgaWYgKGF4aXMgPT09IFwieFwiKSB7XG4gICAgICBmb3IgKGxldCBpID0geDsgaSA8IHggKyB0eXBlLmxlbjsgaSsrKSB7XG4gICAgICAgIGNvb3Jkcy5wdXNoKFtpLCB5XSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSB5OyBpIDwgeSArIHR5cGUubGVuOyBpKyspIHtcbiAgICAgICAgY29vcmRzLnB1c2goW3gsIGldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHAxLm15Qm9hcmQuY2FuUGxhY2VTaGlwKGNvb3JkcykpIHtcbiAgICAgIGNvb3Jkcy5mb3JFYWNoKChbaSwgeV0pID0+IHtcbiAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAucXVlcnlTZWxlY3RvcihgLnBsYWNpbmctYm9hcmQgPiBbZGF0YS1jb29yZD1cIiR7W2ksIHldLmpvaW4oXCJcIil9XCJdYClcbiAgICAgICAgICAuY2xhc3NMaXN0LmFkZChcImhvdmVyXCIpO1xuICAgICAgfSk7XG4gICAgICBmcmVzaENvb3JkcyA9IGNvb3JkcztcbiAgICB9IGVsc2Uge1xuICAgICAgZnJlc2hDb29yZHMgPSBbXTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlTW91c2VPdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiLmhvdmVyXCIpXG4gICAgICAuZm9yRWFjaCgoaXRlbSkgPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiaG92ZXJcIikpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUNsaWNrID0gZnVuY3Rpb24gKHAxLCB0eXBlLCBpbmRleCkge1xuICAgIGlmICghcDEubXlCb2FyZC5jYW5QbGFjZVNoaXAoZnJlc2hDb29yZHMpKSByZXR1cm47XG5cbiAgICBwMS5teUJvYXJkLnBsYWNlU2hpcCh7XG4gICAgICBjb29yZHM6IGZyZXNoQ29vcmRzLFxuICAgICAgYXhpczogdHlwZS5heGlzLFxuICAgIH0pO1xuXG4gICAgaWYgKHR5cGUudHlwZSA9PT0gXCJQYXRyb2wgQm9hdFwiKSB7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm92ZXJsYXlcIikucmVtb3ZlKCk7XG4gICAgICBydW5HYW1lLmdhbWVMb29wKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBsYWNlU2hpcChwMSwgaW5kZXggKyAxKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcmVuZGVyID0gZnVuY3Rpb24gKHAxLCBwMikge1xuICAgIHJlbmRlclBsYXllcihwMSk7XG4gICAgcmVuZGVyUGxheWVyKHAyKTtcbiAgfTtcblxuICBjb25zdCByZW5kZXJQbGF5ZXIgPSBmdW5jdGlvbiAocGxheWVyKSB7XG4gICAgbGV0IG51bTtcbiAgICBpZiAocGxheWVyLmlkID09PSBcInBsYXllclwiKSB7XG4gICAgICBudW0gPSBcIm9uZVwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBudW0gPSBcInR3b1wiO1xuICAgIH1cblxuICAgIHBsYXllci5teUJvYXJkLm1pc3NlZC5mb3JFYWNoKChtaXNzKSA9PiB7XG4gICAgICBkb2N1bWVudFxuICAgICAgICAucXVlcnlTZWxlY3RvcihgLmJvYXJkLSR7bnVtfSA+IFtkYXRhLWNvb3JkPVwiJHttaXNzLmpvaW4oXCJcIil9XCJdYClcbiAgICAgICAgLmNsYXNzTGlzdC5hZGQoXCJtaXNzZWRcIik7XG4gICAgfSk7XG5cbiAgICBwbGF5ZXIubXlCb2FyZC5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICBzaGlwLmhpdC5mb3JFYWNoKChoaXQpID0+IHtcbiAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAucXVlcnlTZWxlY3RvcihgLmJvYXJkLSR7bnVtfSA+IFtkYXRhLWNvb3JkPVwiJHtoaXQuam9pbihcIlwiKX1cIl1gKVxuICAgICAgICAgIC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICByZW5kZXIsXG4gICAgcmVuZGVyUGxhY2luZ0JvYXJkLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IHsgcmVuZGVyR2FtZSB9O1xuIiwiaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vUGxheWVyXCI7XG5pbXBvcnQgeyByZW5kZXJHYW1lIH0gZnJvbSBcIi4vcmVuZGVyR2FtZVwiO1xuXG5jb25zdCBydW5HYW1lID0gKGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgcGxheWVyID0gbmV3IFBsYXllcigpO1xuICBjb25zdCBjb21wdXRlciA9IG5ldyBQbGF5ZXIoXCJjb21wXCIpO1xuXG4gIGNvbnN0IGluaXRpYWxpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcGxheWVyLnNldEVuZW15KGNvbXB1dGVyKTtcbiAgICBjb21wdXRlci5zZXRFbmVteShwbGF5ZXIpO1xuICAgIHBsYXllci5zZXRDdXJyZW50KHRydWUpO1xuICAgIHBsYWNlU2hpcHMoKTtcbiAgfTtcblxuICBjb25zdCBwbGFjZVNoaXBzID0gZnVuY3Rpb24oKSB7XG4gICAgY29tcHV0ZXIuY29tcFNoaXBzKCk7XG4gICAgcmVuZGVyR2FtZS5yZW5kZXJQbGFjaW5nQm9hcmQocGxheWVyKTtcbiAgICAvLyBsZXQgaW5mb3MgPSByZW5kZXJHYW1lLnJlbmRlclBsYWNpbmdCb2FyZChwbGF5ZXIpO1xuICAgIC8vIGluZm9zLmZvckVhY2goaW5mbyA9PiB7XG4gICAgLy8gICBwbGF5ZXIubXlCb2FyZC5wbGFjZVNoaXAoaW5mbylcbiAgICAvLyB9KVxuICB9O1xuXG4gIGNvbnN0IGdhbWVMb29wID0gZnVuY3Rpb24gKCkge1xuICAgIHJlbmRlckdhbWUucmVuZGVyKHBsYXllciwgY29tcHV0ZXIpO1xuXG4gICAgaWYgKHBsYXllci5jdXJyZW50VHVybiA9PT0gdHJ1ZSkge1xuICAgICAgY29tcHV0ZXIubXlCb2FyZC5sZWdhbE1vdmVzLmZvckVhY2goKGxlZ2FsTW92ZSkgPT4ge1xuICAgICAgICBkb2N1bWVudFxuICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKGAuYm9hcmQtdHdvID4gW2RhdGEtY29vcmQ9XCIke2xlZ2FsTW92ZS5qb2luKFwiXCIpfVwiXWApXG4gICAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwcm9jZXNzQ2xpY2spO1xuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcHJvY2Vzc0NsaWNrKCk7XG4gIH07XG5cbiAgY29uc3QgcHJvY2Vzc0NsaWNrID0gZnVuY3Rpb24gKGUgPSBcIm51bGxcIikge1xuICAgIGlmIChwbGF5ZXIuY3VycmVudFR1cm4gPT09IHRydWUpIHtcbiAgICAgIGxldCBbeCwgeV0gPSBlLnRhcmdldC5kYXRhc2V0LmNvb3JkLnNwbGl0KFwiXCIpLm1hcChOdW1iZXIpO1xuICAgICAgcGxheWVyLmF0dGFjayh4LCB5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29tcHV0ZXIuY29tcEF0dGFjaygpO1xuICAgIH1cbiAgICBnYW1lTG9vcCgpO1xuICB9O1xuXG4gIGNvbnN0IGVuZEdhbWUgPSBmdW5jdGlvbiAoKSB7fTtcblxuICByZXR1cm4ge1xuICAgIGluaXRpYWxpemUsXG4gICAgZ2FtZUxvb3AsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgeyBydW5HYW1lIH07XG4iLCJpbXBvcnQgeyBydW5HYW1lIH0gZnJvbSBcIi4vbW9kdWxlcy9ydW5HYW1lXCI7XG5cbnJ1bkdhbWUuaW5pdGlhbGl6ZSgpOyJdLCJuYW1lcyI6WyJTaGlwIiwiaW5mbyIsImNvb3JkcyIsImhpdCIsInByb2Nlc3NIaXQiLCJjb29yZCIsInRoaXMiLCJwdXNoIiwiaXNTdW5rIiwibGVuZ3RoIiwiY29udGFpbnMiLCJvYmoiLCJzb21lIiwiaXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJQbGF5ZXIiLCJjb25zdHJ1Y3RvciIsImlkIiwibXlCb2FyZCIsImxlZ2FsTW92ZXMiLCJsZWdhbFBsYWNlbWVudHMiLCJ4IiwieSIsInNoaXBzIiwibWlzc2VkIiwidHlwZXMiLCJ0eXBlIiwibGVuIiwiYXV0b21hdGljU2hpcHMiLCJmb3JFYWNoIiwiYXhpcyIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImNhblBsYWNlU2hpcCIsImkiLCJ1cGRhdGVMZWdhbFBsYWNlbWVudHMiLCJwbGFjZVNoaXAiLCJldmVyeSIsImxlZ2FsUGxhY2UiLCJsaXN0IiwicGFyc2UiLCJhIiwiYiIsInoiLCJhcnIiLCJmaWx0ZXIiLCJyZWNlaXZlQXR0YWNrIiwic2hpcCIsInVwZGF0ZUxlZ2FsIiwiYWxsU3VuayIsImlzSWxsZWdhbCIsIkdhbWVCb2FyZCIsImVuZW15IiwiY3VycmVudFR1cm4iLCJzZXRFbmVteSIsInBsYXllciIsInNldEN1cnJlbnQiLCJ0dXJuIiwiYXR0YWNrIiwicmVjZWl2ZSIsImNvbXBTaGlwcyIsImNvbXBBdHRhY2siLCJyZW5kZXJHYW1lIiwiYm9hcmRPbmUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJib2FyZFR3byIsInBsYWNpbmdCb2FyZCIsInJvdGF0ZUJ0biIsImZyZXNoQ29vcmRzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiZGF0YXNldCIsImpvaW4iLCJhcHBlbmRDaGlsZCIsImNsb25lTm9kZSIsInAxIiwiaW5kZXgiLCJpbm5lckhUTUwiLCJyZW1vdmUiLCJsb2FkUGxhY2luZ0JvYXJkIiwiYm9hcmRJdGVtcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjYXJkVGV4dCIsInRleHRDb250ZW50IiwiaGFuZGxlTW91c2VPdmVyIiwiYmluZCIsImhhbmRsZU1vdXNlT3V0IiwiaGFuZGxlQ2xpY2siLCJzcGxpdCIsIm1hcCIsIk51bWJlciIsInJ1bkdhbWUiLCJnYW1lTG9vcCIsInJlbmRlclBsYXllciIsIm51bSIsIm1pc3MiLCJyZW5kZXIiLCJwMiIsInJlbmRlclBsYWNpbmdCb2FyZCIsImNvbXB1dGVyIiwicHJvY2Vzc0NsaWNrIiwibGVnYWxNb3ZlIiwidGFyZ2V0IiwiaW5pdGlhbGl6ZSJdLCJzb3VyY2VSb290IjoiIn0=