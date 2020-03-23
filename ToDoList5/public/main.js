var crossOut = document.querySelectorAll('li');
var trash = document.getElementsByClassName("fa-trash");
var btn = document.querySelector("#clearAll").addEventListener("click", onClick)


function onClick(){

  const msg = this.nextSibling.nextSibling.childNodes[1].innerText

  console.log(msg)

  fetch('clearall', {
    method: 'delete',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'msg': msg,
     
    })
  })
  .then(response => {
    if (response.ok) return response.json()
  })
  .then(data => {
    console.log(data)
    window.location.reload(true)
  })
}



Array.from(crossOut).forEach(function(element) {
      element.addEventListener('click', function(event){
        // const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.childNodes[3].innerText
       // const crossOut = crossOut
       console.log(msg)
        //parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('messages', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            // 'name': name,
            'msg': msg,
            'strike': " "
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data) //from server.js responds on line 59
         let styleThis= data.value.strike
        console.log(styleThis)
        event.target.classList.add(styleThis)
          //window.location.reload(true)  
        })
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        fetch('messages', { 
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'msg': msg
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
