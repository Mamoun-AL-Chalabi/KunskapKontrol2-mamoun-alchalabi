
window.addEventListener('load', ()=>{
  let long;
  let lat;
/*...............Function to get the current loctioan ...............*/
  if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(pos=>{
          long = pos.coords.longitude;
          lat = pos.coords.latitude;

          const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`


          fetch(api)
          .then(response =>{
            return response.json();
          })

          .then(data =>{
            console.log(data);
                 /*...............bring all informatino from Html and rpalce it with data we get it from server...............*/       
                 let cit =document.querySelector('.city');
                 cit.innerHTML=`${data.name}`;
   
                 let today = new Date();
   
                 let date = document.querySelector('.date');
                 date.innerHTML=dateToday(today);
   
                 let temp=document.querySelector('.temp');
   
                 temp.innerHTML=`${Math.round(data.main.temp)}<span>°c</span>`;
                 
                 let tempcolor=data.main.temp;
   
   
    /*...............if statment for color change depend on the temp ..............*/  
   
                 if(tempcolor <= 5) {
                   body.style.background = 'radial-gradient(circle, rgba(124,180,246,1) 4%, rgba(226,227,237,1) 94%)';
               } 
               
                   else if (tempcolor <=10) {
                       body.style.background = 'radial-gradient(circle, rgba(1,108,233,1) 4%, rgba(226,227,237,1) 94%)';
                   }
   
                   else if(tempcolor >10 && tempcolor <=20) {
                       body.style.background ='linear-gradient(0deg, rgba(34,193,195,1) 13%, rgba(253,187,45,1) 89%)'
                   }
   
               else {
                   body.style.background = 'linear-gradient(90deg, rgba(217,91,32,1) 8%, rgba(222,6,6,1) 100%)';
               } 
   
   
   
                 let weather =document.querySelector('.weather');
   
                 weather.innerHTML = `${data.weather[0].description}`;
                 
                 let winhum = document.querySelector('.win-hum'
                 );
                 
                 winhum.innerHTML=`💨 ${Math.round(data.wind.speed)} m/s 💧 ${Math.round(data.main.humidity)} %`;
                 
                 let icon =document.querySelector('.tem')
                 
                 icon.src=`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`
          })



        });




  }else{
    
    console.log('hi')
  }

});

/*...............Select Basic Element in html...............*/


let body = document.querySelector('body');
let searchbox=document.querySelector('.search-box')
const apiKey = '370bc470627a692530c68225e4e26880';

/*...............Add event listener to Search Box...............*/

searchbox.addEventListener('keypress',setQuery)


/*...............Function for the event listener...............*/

function setQuery(evt) {
    if (evt.keyCode == 13) {
      getWeather(searchbox.value);
      
    }
  }


  
/*...............Function for get the informtion from our Url after we write a city...............*/

  function getWeather (city){
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
      .then(function(response){
    /*...............if statment for if somthing wrong with the input ..............*/      
        if(response.status >= 200 && response.status <300){
            return response.json();
        }
        


        
        else if(response.status === 400){
          throw  'Please write City';
      }


        //kod 401 "if the server down
        
        else if(response.status === 401){
          throw  'Server is down';
      }
        

        //kod 404 "not found" we get an error
        
        else if(response.status === 404){
            throw ' The name of city is wrong';
        }




      })
      .then(
     /*...............Function for get the all informtion from our Url ...............*/
          function(data){
    


     /*...............brig all informatino from Html and rpalce it with data we get it from server...............*/       
              let cit =document.querySelector('.city');
              cit.innerHTML=`${data.name}`;

              let today = new Date();

              let date = document.querySelector('.date');
              date.innerHTML=dateToday(today);

              let temp=document.querySelector('.temp');

              temp.innerHTML=`${Math.round(data.main.temp)}<span>°c</span>`;
              
              let tempcolor=data.main.temp;


 /*...............if statment for color change depend on the temp ..............*/  

              if(tempcolor <= 5) {
                body.style.background = 'radial-gradient(circle, rgba(124,180,246,1) 4%, rgba(226,227,237,1) 94%)';
            } 
            
                else if (tempcolor <=10) {
                    body.style.background = 'radial-gradient(circle, rgba(1,108,233,1) 4%, rgba(226,227,237,1) 94%)';
                }

                else if(tempcolor >10 && tempcolor <=20) {
                    body.style.background ='linear-gradient(0deg, rgba(34,193,195,1) 13%, rgba(253,187,45,1) 89%)'
                }

            else {
                body.style.background = 'linear-gradient(90deg, rgba(217,91,32,1) 8%, rgba(222,6,6,1) 100%)';
            } 



              let weather =document.querySelector('.weather');

              weather.innerHTML = `${data.weather[0].description}`;
              
              let winhum = document.querySelector('.win-hum'
              );
              
              winhum.innerHTML=`💨 ${Math.round(data.wind.speed)} m/s 💧 ${Math.round(data.main.humidity)} %`;
              
              let icon =document.querySelector('.tem')
              
              icon.src=`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`

          }
      ).catch(


     /*...............function for the error we get ..............*/      
        function(error){
            let cit =document.querySelector('.city');
            cit.innerHTML='';

            let date = document.querySelector('.date');
            date.innerHTML=error;

            let temp=document.querySelector('.temp');
            temp.innerHTML='';


            let weather =document.querySelector('.weather');

            weather.innerHTML = '';

            let winhum = document.querySelector('.win-hum'
            );
            
            winhum.innerHTML='';

            let icon =document.querySelector('.tem')
              
            icon.src='';
        }
      )
  }




/*...............Function to get the date of today...............*/


  function dateToday (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }