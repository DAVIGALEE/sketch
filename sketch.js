const DEFAULT_COLOR = '#333333'
let currentColor = DEFAULT_COLOR
let parent = document.querySelector(".parent");
let color = document.getElementById("color")
let eraseBtn = document.getElementById("eraseBtn")
let eraser = document.getElementById("eraser")
let drawBtn = document.getElementById("draw")
let range = document.querySelector("#range")
let output = document.querySelector("#output")
let rangeValue=16;
let currentMode = 'draw';
let mouseDown =  false;
 document.addEventListener('dragstart', (e) => {
  e.preventDefault()
})
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

const clearContainer = () =>{
  parent.innerHTML = ""
}
color.onchange = (e) => {currentColor=e.target.value}

eraser.onclick = (e)=>{
  eraser.classList.toggle("active")
  if(drawBtn.classList.contains("active")){
    drawBtn.classList.remove("active")
  }
  currentMode = "eraser"
}
drawBtn.onclick = () =>{
  drawBtn.classList.toggle("active")
  if(eraser.classList.contains("active")){
    eraser.classList.remove("active")
  }
  currentMode = "draw"
}
eraseBtn.onclick = (e) =>{ 
 
  let block = document.querySelectorAll(".Block")
  block.forEach(e=>{
    e.style.backgroundColor="#FFFFFF"
    return e
  })
}
//retrieving range value 
range.addEventListener('input', function () {
  rangeValue = range.value;
  output.innerHTML = range.value + "x" + range.value;
  clearContainer();
  generateGrid(rangeValue)
}, true);
//generating the grid elements
const generateGrid = (value) => {
  parent.style.gridTemplateColumns = `repeat(${value},1fr)`
  parent.style.gridTemplateRows = `repeat(${value},1fr)`
  console.log(value)
    for(let i=1;i<=value*value;i++){
        let cell = document.createElement("div");
        cell.className="Block"
        cell.addEventListener('dragstart', (e) => {
          e.preventDefault()
        })
        cell.addEventListener('drop', (e) => {
          e.preventDefault()
        })
        cell.addEventListener("mouseover",draw);
        cell.addEventListener("mousedown",draw); 
        parent.appendChild(cell)
    }
}
// drawing 
const draw = (e) => {
    if (e.type == 'mouseover' && mouseDown==false) return
      if (currentMode == "draw") {
      e.target.style.backgroundColor = currentColor;
    } else if (currentMode == "eraser") {
      e.target.style.backgroundColor = '#fefefe'
    }
  }
window.onload = () => {
  generateGrid(rangeValue);
}