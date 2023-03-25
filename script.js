var contain=document.createElement('div');
contain.className="container";
var row=document.createElement('div');
row.classList.add("row","m-3");
contain.appendChild(row);
document.body.appendChild(contain);

async function country(){
    var api=await fetch("https://restcountries.com/v2/all");
    var res=await api.json();
    for(var i=0;i<res.length;i++){
        var c=res[i].name.split(" ");
        var country=c[0];
        try{
            var lat=res[i].latlng[0];
            var lon=res[i].latlng[1];
        }catch{
            var lat=0;
            var lon=0;
        }
        row.innerHTML+=
        `<div class="col-md-4">
        <div class="card" style="height:420px; width:18rem; margin:10px; border:1px solid">
    <img src="${res[i].flag}" class="card-img-top" alt="..." style=height:180px;>
    <div class="card-body">
      <h5 class="card-title">${res[i].name}</h5>
      <p class="card-text">Capital : ${res[i].capital}</p>
      <p class="card-text">Population : ${res[i].population}</p>
      <p id="${country}"></p>
      <buttuon class="btn btn-primary" style=margin-Left: 50px; onclick=getweather(${lat},${lon},"${country}")>Weather</button>
      
      </div>

  </div>
        </div>`
    }
}
async function getweather(lat,lon,country){
    var t;
try{
    if(lat!==0){
        var url=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9d8c7c37242dafa04f231daf20f8a2c5`);
        var dup=await url.json();
        t=dup.main.temp;
        
    }
    else{
        t="unavailable";
    }
}catch{
    t="unavailable";
}
document.getElementById(country).innerHTML=`Temprature :  ${t}`;     
}
country();