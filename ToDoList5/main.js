document.querySelector('#addItems').onclick = newItem
document.querySelector('#clearAll').onclick = clearAll
const ul = document.querySelector("ul")
const clearCompleted = document.querySelector('#clearCompleted')
let taskTotal = document.querySelector("span")

function newItem(){
  const item = document.querySelector("#addInput").value
  console.log("this is the value of the input", item)
  let itemAdd = document.createElement("li")
  console.log("this is the innerText", itemAdd.innerText)
  itemAdd.innerText=item
  console.log("this the li", itemAdd)
  //mark helped with this
  ul.appendChild(itemAdd)
  document.querySelector("#addInput").value = ""
  whatsLeft();
}

ul.addEventListener('click', (done) => {
  done = done.target
  done.classList.toggle('crossOut')
  whatsLeft();
})

// ul.addEventListener('dblclick', (edit) => {
//   edit = edit.target
//   edit.innerText=""
// })


function clearAll(){
  const liArray = document.querySelectorAll('li')
  console.log("this is the liArray",liArray)
  for( let i = 0; i < liArray.length; i++){
    ul.removeChild(liArray[i])
    console.log("removed child i",i)
  }
  whatsLeft();
}

clearCompleted.addEventListener('click', () => {
  const li = document.querySelectorAll('li')
  for( let i = 0; i < li.length; i++){
    if (li[i].classList.contains('crossOut'))
  {
      ul.removeChild(li[i])
  }
  }
  whatsLeft();
})
// editButton.addEventListener('click', () =>{
//   const li = document.querySelectorAll('li')
//   for ( let i = 0; i < li.length; i++){
//     ul.text(li[i])
//   }
// })
function whatsLeft(){
  let count = 0
  const li = document.querySelectorAll('li')
  for ( let i = 0; i < li.length; i++){
    if (!(li[i].classList.contains('crossOut'))){
      count++
    }
  }
  taskTotal.innerHTML = count
}
