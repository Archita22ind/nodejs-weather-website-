
const weatherForm=document.querySelector('form');
const searchElement= document.querySelector('input');
const messageOne= document.querySelector('#message-1')  ; //classname starts with . n id value starts with #
const messageTwo= document.querySelector('#message-2') ;



weatherForm.addEventListener('submit',(e)=>{
   e.preventDefault();
   const location= searchElement.value;
   
   messageOne.textContent ='Loading..';
   messageTwo.textContent ='';

   fetch('http://localhost:3000/weather?address='+ location).then((response)=>{
   response.json().then((data)=>{
       if(data.error)
       { 
           messageOne.textContent = 'Error : ' + data.error;
       }
    else{
      messageOne.textContent = 'Location : '+ data.location;
      messageTwo.textContent = 'Forecast : ' + data.forecast;
    }
   })
})
})