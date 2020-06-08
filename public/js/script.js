
 document.getElementById('send').onsubmit = sendM;
 function sendM(e){ //запис комментарий в бд
     e.preventDefault();
     var formData = new FormData(this);
    console.log(formData);
    fetch('/send', {
      method: 'POST',
      body: formData
    })
      .then(function (response) {
        return response.text();
      })
      .then(function (body1){
        console.log(body1);
       showCom(JSON.parse(body1));
      });
    }
    
   function getCom(){ //получаем комменты из бд
      fetch('/comments', {
        method: 'POST'
      })
      .then(function (response) {
        return response.text();
      })
      .then(function (body){
        console.log(body);
       showCom(JSON.parse(body));
      });
    }

   function showCom(com){ //запис комменты на стр
   
      let p = document.getElementById('com');
      let out = '';
      for(let i=0; i<com.length;i++){
      out+=`<div class="block">`  
      out+=`<div><img class="image" src="/uploads/${com[i]["image"]}"></div>`;  
      out+=`<div class="text"><div>NAME: ${com[i]["name"]}</div>`;
      out+=`<div>COMMENT: ${com[i]["comment"]}</div></div>`;
      out+=`</div>`;
      out+="<hr>";
      }
      p.innerHTML = out;
      document.getElementById('name').value = '';
      document.getElementById('comment').value = '';
      document.getElementById('file').value = '';
    }

   getCom();